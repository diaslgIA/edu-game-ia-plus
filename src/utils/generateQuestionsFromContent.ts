
import { supabase } from '@/integrations/supabase/client';
import { SubjectContent } from '@/types/subject-content';

interface GeneratedQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty_level: string;
}

export const generateQuestionsFromContent = async (subject: string, count: number): Promise<GeneratedQuestion[]> => {
  try {
    // Get content from the subject to generate questions
    const { data: contentData, error } = await supabase
      .from('subject_contents')
      .select('*')
      .eq('subject', subject)
      .limit(10);

    if (error || !contentData || contentData.length === 0) {
      console.log(`No content found for subject: ${subject}`);
      return [];
    }

    const generatedQuestions: GeneratedQuestion[] = [];

    for (let i = 0; i < count && i < contentData.length; i++) {
      const content = contentData[i % contentData.length];
      
      // Generate a simple question based on the content
      const question = generateQuestionFromContent(content, i);
      if (question) {
        generatedQuestions.push(question);
      }
    }

    return generatedQuestions;
  } catch (error) {
    console.error('Error generating questions from content:', error);
    return [];
  }
};

const generateQuestionFromContent = (content: any, index: number): GeneratedQuestion | null => {
  if (!content.title || !content.description) return null;

  // Convert key_concepts safely
  let keyConcepts: any[] = [];
  if (content.key_concepts) {
    try {
      keyConcepts = Array.isArray(content.key_concepts) ? content.key_concepts : 
                   typeof content.key_concepts === 'string' ? JSON.parse(content.key_concepts) : [];
    } catch {
      keyConcepts = [];
    }
  }

  const questionTemplates = [
    {
      question: `Sobre ${content.title}, qual das alternativas está correta?`,
      options: [
        content.description || 'Conceito fundamental do tema',
        'Alternativa incorreta A',
        'Alternativa incorreta B', 
        'Alternativa incorreta C'
      ],
      correct_answer: 0
    },
    {
      question: `Qual é o conceito principal relacionado a ${content.title}?`,
      options: [
        'Conceito incorreto A',
        content.description || 'Conceito correto do tema',
        'Conceito incorreto B',
        'Conceito incorreto C'
      ],
      correct_answer: 1
    },
    {
      question: `Em relação ao tema ${content.title}, podemos afirmar que:`,
      options: [
        'Afirmação incorreta A',
        'Afirmação incorreta B',
        content.description || 'Afirmação correta sobre o tema',
        'Afirmação incorreta C'
      ],
      correct_answer: 2
    }
  ];

  const template = questionTemplates[index % questionTemplates.length];

  return {
    id: `generated_${content.id}_${index}`,
    subject: content.subject,
    topic: content.topic_name || content.title,
    question: template.question,
    options: template.options,
    correct_answer: template.correct_answer,
    explanation: content.explanation || content.description || 'Explicação baseada no conteúdo estudado.',
    difficulty_level: content.difficulty_level || 'medium'
  };
};

export const getAllSubjectsQuestions = async (requestedCount: number) => {
  try {
    // First, try to get questions from database
    const { data: dbQuestions, error } = await supabase
      .from('subject_questions')
      .select('*');

    if (error) {
      console.error('Error fetching database questions:', error);
      return [];
    }

    const questions = dbQuestions || [];
    
    // If we have enough questions, return them shuffled
    if (questions.length >= requestedCount) {
      return [...questions].sort(() => Math.random() - 0.5).slice(0, requestedCount);
    }

    // If not enough, generate additional questions from content
    const subjects = ['matematica', 'portugues', 'historia', 'geografia', 'fisica', 'quimica', 'biologia', 'filosofia', 'sociologia', 'ingles'];
    const neededQuestions = requestedCount - questions.length;
    const questionsPerSubject = Math.ceil(neededQuestions / subjects.length);

    const generatedQuestions = [];
    for (const subject of subjects) {
      const generated = await generateQuestionsFromContent(subject, questionsPerSubject);
      generatedQuestions.push(...generated);
      
      if (generatedQuestions.length >= neededQuestions) break;
    }

    // Combine database and generated questions
    const allQuestions = [...questions, ...generatedQuestions.slice(0, neededQuestions)];
    return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, requestedCount);

  } catch (error) {
    console.error('Error getting all subjects questions:', error);
    return [];
  }
};
