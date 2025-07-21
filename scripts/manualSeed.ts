
// Script manual para inserir conteúdo sem IA (para testes ou backup)
import { educationalContent } from './educationalContent';

export function generateManualSeed(): string {
  let sqlOutput = '';
  
  // Header
  sqlOutput += `-- Conteúdo educacional manual para EduGameIA Plus\n`;
  sqlOutput += `-- Gerado em: ${new Date().toISOString()}\n\n`;
  
  // Inserir apenas os conteúdos (sem quizzes)
  for (const subject of educationalContent) {
    for (const theme of subject.themes) {
      for (const topic of subject.topics) {
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
      }
    }
  }
  
  // Adicionar algumas questões de exemplo manuais
  sqlOutput += `
-- Questões de exemplo para demonstração
INSERT INTO "public"."subject_questions"
(subject, topic, question, options, correct_answer, explanation, difficulty_level, quiz_title, grande_tema)
VALUES 
('Matemática', 'Operações com números reais', 'Qual é o resultado de 2 + 3 × 4?', 
 '["14", "20", "18", "24"]'::jsonb, 0, 'Ordem das operações: multiplicação antes da adição', 'easy', 'Quiz sobre Operações com números reais', 'Matemática Básica e Aritmética'),

('Física', 'Cinemática', 'Um objeto em queda livre parte do repouso. Após 2 segundos, qual é sua velocidade? (g = 10 m/s²)', 
 '["10 m/s", "20 m/s", "40 m/s", "5 m/s"]'::jsonb, 1, 'v = v₀ + gt = 0 + 10 × 2 = 20 m/s', 'medium', 'Quiz sobre Cinemática', 'Mecânica'),

('Química', 'Estrutura Atômica', 'Qual é o número de prótons no átomo de carbono?', 
 '["6", "12", "8", "14"]'::jsonb, 0, 'O carbono tem número atômico 6, logo 6 prótons', 'easy', 'Quiz sobre Estrutura Atômica', 'Química Geral');
`;
  
  return sqlOutput;
}

// Função para executar o seed manual
export function runManualSeed() {
  const sqlContent = generateManualSeed();
  
  console.log('=== CONTEÚDO SQL MANUAL GERADO ===');
  console.log(sqlContent);
  console.log('=== FIM DO CONTEÚDO SQL ===');
  
  console.log('\n📋 INSTRUÇÕES:');
  console.log('1. Copie todo o conteúdo SQL acima');
  console.log('2. Acesse o editor SQL do Supabase');
  console.log('3. Cole e execute o script');
  console.log('4. Verifique se todos os dados foram inseridos corretamente');
}

// Para executar o script manual, descomente:
// runManualSeed();
