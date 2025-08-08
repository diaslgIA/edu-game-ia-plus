
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QuizOption {
  id: string;
  option_text: string;
  is_correct: boolean;
  feedback_image_url?: string;
  option_order: number;
}

interface QuizQuestion {
  id: string;
  subject_id: string;
  question_text: string;
  question_type: string;
  image_url?: string;
  difficulty_level: string;
  topic?: string;
  explanation?: string;
  order_index: number;
  options: QuizOption[];
}

interface UseQuizQuestionsReturn {
  questions: QuizQuestion[];
  loading: boolean;
  error: string | null;
  getQuestionsByTopic: (topic: string) => QuizQuestion[];
  getRandomQuestions: (count: number) => QuizQuestion[];
  refreshQuestions: () => Promise<void>;
}

export const useQuizQuestions = (subject: string): UseQuizQuestionsReturn => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading questions for subject:', subject);
      
      // Primeiro, buscar o subject_id
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select('id')
        .ilike('nome', subject)
        .single();

      if (subjectError) {
        console.error('Error finding subject:', subjectError);
        setError('Matéria não encontrada');
        return;
      }

      // Buscar questões da matéria
      const { data: questionsData, error: questionsError } = await supabase
        .from('quiz_questions')
        .select(`
          id,
          subject_id,
          question_text,
          question_type,
          image_url,
          difficulty_level,
          topic,
          explanation,
          order_index
        `)
        .eq('subject_id', subjectData.id)
        .order('order_index', { ascending: true });

      if (questionsError) {
        console.error('Error loading questions:', questionsError);
        setError('Erro ao carregar questões');
        return;
      }

      if (!questionsData || questionsData.length === 0) {
        console.log('No questions found for subject:', subject);
        setQuestions([]);
        return;
      }

      // Buscar opções para cada questão
      const questionsWithOptions = await Promise.all(
        questionsData.map(async (question) => {
          const { data: optionsData, error: optionsError } = await supabase
            .from('quiz_options')
            .select('*')
            .eq('question_id', question.id)
            .order('option_order', { ascending: true });

          if (optionsError) {
            console.error('Error loading options for question:', question.id, optionsError);
            return { ...question, options: [] };
          }

          return {
            ...question,
            options: optionsData || []
          };
        })
      );

      console.log('Loaded questions from database:', questionsWithOptions.length);
      setQuestions(questionsWithOptions);
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Erro inesperado ao carregar questões');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subject) {
      loadQuestions();
    }
  }, [subject]);

  const getQuestionsByTopic = (topic: string) => {
    return questions.filter(q => q.topic === topic);
  };

  const getRandomQuestions = (count: number = 10) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return {
    questions,
    loading,
    error,
    getQuestionsByTopic,
    getRandomQuestions,
    refreshQuestions: loadQuestions
  };
};
