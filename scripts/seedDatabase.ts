
import { educationalContent } from './educationalContent';

// Estrutura para armazenar os dados dos quizzes gerados
interface QuizData {
  quiz_title: string;
  questions: Array<{
    question_text: string;
    answers: Array<{
      answer_text: string;
      is_correct: boolean;
    }>;
  }>;
}

// Função principal para gerar todo o conteúdo e quizzes
export async function generateCompleteContent(openaiApiKey: string): Promise<string> {
  let sqlOutput = '';
  
  // Header do arquivo SQL
  sqlOutput += `-- Conteúdo educacional gerado automaticamente para EduGameIA Plus\n`;
  sqlOutput += `-- Gerado em: ${new Date().toISOString()}\n\n`;
  
  console.log('Iniciando geração de conteúdo educacional...');
  
  // Inserir conteúdos primeiro (usando a tabela existente subject_contents)
  for (const subject of educationalContent) {
    console.log(`Processando matéria: ${subject.subjectName}`);
    
    for (const theme of subject.themes) {
      console.log(`  Processando tema: ${theme.themeName}`);
      
      for (const topic of subject.topics) {
        console.log(`    Processando tópico: ${topic.topicName}`);
        
        // Inserir conteúdo na tabela subject_contents
        const contentSql = `
INSERT INTO "public"."subject_contents" 
(subject, title, description, content_type, difficulty_level, grande_tema, explanation, estimated_time, is_premium, order_index)
VALUES (
  '${subject.subjectName}',
  '${topic.topicName.replace(/'/g, "''")}',
  'Conteúdo detalhado sobre ${topic.topicName.replace(/'/g, "''")}',
  'theory',
  'medium',
  '${theme.themeName.replace(/'/g, "''")}',
  '${topic.explanation.replace(/'/g, "''")}',
  30,
  false,
  0
);
`;
        sqlOutput += contentSql;
        
        // Gerar quiz para este tópico
        try {
          console.log(`    Gerando quiz para: ${topic.topicName}`);
          const quizData = await generateQuizWithAI(openaiApiKey, topic.topicName, topic.explanation);
          
          if (quizData) {
            // Gerar SQL para as questões do quiz
            for (const question of quizData.questions) {
              // Preparar as opções como array JSON
              const optionsArray = question.answers.map(answer => answer.answer_text);
              const correctAnswerIndex = question.answers.findIndex(answer => answer.is_correct);
              
              const questionSql = `
INSERT INTO "public"."subject_questions"
(subject, topic, question, options, correct_answer, explanation, difficulty_level, quiz_title, grande_tema)
VALUES (
  '${subject.subjectName}',
  '${topic.topicName.replace(/'/g, "''")}',
  '${question.question_text.replace(/'/g, "''")}',
  '${JSON.stringify(optionsArray).replace(/'/g, "''")}'::jsonb,
  ${correctAnswerIndex},
  'Questão baseada no conteúdo de ${topic.topicName.replace(/'/g, "''")}',
  'medium',
  '${quizData.quiz_title.replace(/'/g, "''")}',
  '${theme.themeName.replace(/'/g, "''")}'
);
`;
              sqlOutput += questionSql;
            }
          }
        } catch (error) {
          console.error(`Erro ao gerar quiz para ${topic.topicName}:`, error);
          // Continuar com o próximo tópico mesmo se houver erro
        }
        
        // Pequena pausa para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  console.log('Geração de conteúdo concluída!');
  return sqlOutput;
}

// Função para gerar quiz usando IA
async function generateQuizWithAI(apiKey: string, topicName: string, explanation: string): Promise<QuizData | null> {
  const prompt = `Com base no seguinte texto explicativo sobre o tópico de '${topicName}', crie 5 questões de múltipla escolha para uma prova do ENEM. As questões devem ser desafiadoras, contextualizadas e baseadas *exclusivamente* no conteúdo do texto fornecido. Para cada questão, forneça 4 alternativas, onde apenas uma é correta. Retorne o resultado em um formato JSON como este:

{
  "quiz_title": "Quiz sobre ${topicName}",
  "questions": [
    {
      "question_text": "Texto da primeira pergunta...",
      "answers": [
        { "answer_text": "Texto da alternativa 1.", "is_correct": false },
        { "answer_text": "Texto da alternativa 2.", "is_correct": true },
        { "answer_text": "Texto da alternativa 3.", "is_correct": false },
        { "answer_text": "Texto da alternativa 4.", "is_correct": false }
      ]
    }
  ]
}

Texto Explicativo:
---
${explanation}
---`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em educação que cria questões de alta qualidade para o ENEM. Sempre retorne respostas em formato JSON válido.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Tentar fazer parse do JSON retornado
    try {
      const quizData = JSON.parse(content);
      return quizData;
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON da IA:', parseError);
      console.error('Conteúdo retornado:', content);
      return null;
    }
    
  } catch (error) {
    console.error('Erro ao chamar API OpenAI:', error);
    return null;
  }
}

// Função para executar o script
export async function runSeedScript() {
  const apiKey = prompt('Digite sua chave da API OpenAI:');
  
  if (!apiKey) {
    console.error('Chave da API OpenAI é obrigatória!');
    return;
  }
  
  try {
    const sqlContent = await generateCompleteContent(apiKey);
    
    // Salvar em arquivo (em um ambiente real, você salvaria em um arquivo)
    console.log('=== CONTEÚDO SQL GERADO ===');
    console.log(sqlContent);
    console.log('=== FIM DO CONTEÚDO SQL ===');
    
    // Instruções para o usuário
    console.log('\n📋 INSTRUÇÕES:');
    console.log('1. Copie todo o conteúdo SQL acima');
    console.log('2. Acesse o editor SQL do Supabase');
    console.log('3. Cole e execute o script');
    console.log('4. Verifique se todos os dados foram inseridos corretamente');
    
  } catch (error) {
    console.error('Erro durante a execução:', error);
  }
}

// Para executar o script, descomente a linha abaixo:
// runSeedScript();
