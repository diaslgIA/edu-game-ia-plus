
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubjectQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[] | any; // Pode vir como array ou objeto do banco
  correct_answer: number;
  explanation: string;
  difficulty_level: string;
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
      
      const { data, error } = await supabase
        .from('subject_questions')
        .select('*')
        .eq('subject', subject);

      if (error) {
        console.error('Error loading questions:', error);
        return;
      }

      console.log('Loaded questions from database:', data);
      setQuestions(data || []);
    } catch (error) {
      console.error('Error loading questions:', error);
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
    getQuestionsByTopic,
    getRandomQuestions,
    refreshQuestions: loadQuestions
  };
};
