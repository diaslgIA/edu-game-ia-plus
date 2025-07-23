
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubjectQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[] | any;
  correct_answer: number;
  explanation: string;
  difficulty_level: string;
  quiz_title?: string;
  grande_tema?: string;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  answers: {
    id: string;
    answer_text: string;
    is_correct: boolean;
  }[];
}

export const useSubjectQuestions = (subject: string) => {
  const [questions, setQuestions] = useState<SubjectQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subject) {
      loadQuestions();
    }
  }, [subject]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      console.log('Loading questions for subject:', subject);
      
      // Primeiro tenta buscar da estrutura nova (Questions + Answers)
      const { data: newQuizzes, error: quizzesError } = await supabase
        .from('Quizzes')
        .select(`
          id,
          title,
          Questions (
            id,
            question_text,
            Answers (
              id,
              answer_text,
              is_correct
            )
          ),
          Topics (
            name,
            Themes (
              name,
              Subjects (
                name
              )
            )
          )
        `);

      if (!quizzesError && newQuizzes && newQuizzes.length > 0) {
        // Filtra quizzes pela matéria e converte para formato compatível
        const filteredQuizzes = newQuizzes.filter(quiz => 
          quiz.Topics?.Themes?.Subjects?.name?.toLowerCase().includes(subject.toLowerCase())
        );

        if (filteredQuizzes.length > 0) {
          const convertedQuestions = filteredQuizzes.flatMap(quiz => 
            quiz.Questions?.map((question: any, index: number) => ({
              id: question.id,
              subject: quiz.Topics?.Themes?.Subjects?.name || subject,
              topic: quiz.Topics?.name || 'Tópico Geral',
              question: question.question_text,
              options: question.Answers?.map((answer: any) => answer.answer_text) || [],
              correct_answer: question.Answers?.findIndex((answer: any) => answer.is_correct) || 0,
              explanation: `Questão do quiz: ${quiz.title}`,
              difficulty_level: 'medium',
              quiz_title: quiz.title,
              grande_tema: quiz.Topics?.Themes?.name
            })) || []
          );

          console.log('Usando questões da nova estrutura:', convertedQuestions);
          setQuestions(convertedQuestions);
          return;
        }
      }

      // Fallback para a estrutura antiga
      console.log('Fallback: buscando na estrutura antiga (subject_questions)');
      const { data: legacyData, error: legacyError } = await supabase
        .from('subject_questions')
        .select('*')
        .ilike('subject', subject);

      if (legacyError) {
        console.error('Error loading questions from legacy table:', legacyError);
        setQuestions([]);
        return;
      }

      console.log('Loaded questions from legacy structure:', legacyData);
      
      // Converte opções se necessário (pode vir como objeto ou array)
      const processedQuestions = legacyData?.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : Object.values(q.options || {})
      })) || [];

      setQuestions(processedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionsByTopic = (topic: string) => {
    return questions.filter(q => 
      q.topic?.toLowerCase().includes(topic.toLowerCase()) ||
      q.grande_tema?.toLowerCase().includes(topic.toLowerCase())
    );
  };

  const getQuestionsByTheme = (theme: string) => {
    return questions.filter(q => 
      q.grande_tema?.toLowerCase().includes(theme.toLowerCase()) ||
      q.topic?.toLowerCase().includes(theme.toLowerCase())
    );
  };

  const getRandomQuestions = (count: number = 10) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return {
    questions,
    loading,
    getQuestionsByTopic,
    getQuestionsByTheme,
    getRandomQuestions,
    refreshQuestions: loadQuestions
  };
};
