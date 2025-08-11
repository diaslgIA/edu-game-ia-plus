
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

export const useAllSubjectQuestions = () => {
  const [questions, setQuestions] = useState<SubjectQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllQuestions();
  }, []);

  const loadAllQuestions = async () => {
    try {
      setLoading(true);
      console.log('Loading questions from all subjects...');
      
      const { data, error } = await supabase
        .from('subject_questions')
        .select('*');

      if (error) {
        console.error('Error loading all questions:', error);
        return;
      }

      console.log('Loaded questions from all subjects:', data?.length);
      setQuestions(data || []);
    } catch (error) {
      console.error('Error loading all questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomQuestions = (count: number = 10) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questions.length));
  };

  const getAvailableCount = () => questions.length;

  return {
    questions,
    loading,
    getRandomQuestions,
    getAvailableCount,
    refreshQuestions: loadAllQuestions
  };
};
