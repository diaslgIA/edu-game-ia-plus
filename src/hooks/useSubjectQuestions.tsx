
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
}

export const useSubjectQuestions = (subject: string) => {
  const [questions, setQuestions] = useState<SubjectQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (subject) {
      loadQuestions();
    }
  }, [subject]);

  const loadQuestions = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading questions for subject:', subject, 'Attempt:', retryCount + 1);
      
      // Timeout de 10 segundos para evitar carregamento infinito
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const { data, error } = await supabase
        .from('subject_questions')
        .select('*')
        .eq('subject', subject)
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        console.error('Error loading questions:', error);
        throw error;
      }

      console.log('Loaded questions from database:', data?.length || 0);
      
      if (!data || data.length === 0) {
        console.warn('No questions found for subject:', subject);
        setQuestions([]);
      } else {
        setQuestions(data);
      }
    } catch (error: any) {
      console.error('Error loading questions:', error);
      
      if (error.name === 'AbortError') {
        setError('Timeout ao carregar questões. Tentando novamente...');
        
        // Retry uma vez em caso de timeout
        if (retryCount < 1) {
          setTimeout(() => loadQuestions(retryCount + 1), 2000);
          return;
        }
      } else {
        setError(`Erro ao carregar questões: ${error.message}`);
      }
      
      // Em caso de erro persistente, definir lista vazia
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

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
    refreshQuestions: () => loadQuestions(0)
  };
};
