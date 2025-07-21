
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubjectQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty_level: string;
  quiz_title?: string;
  grande_tema?: string;
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

      // Normalizar as opções se vierem como objeto
      const normalizedQuestions = data?.map(q => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : Object.values(q.options || {})
      })) || [];

      console.log(`Loaded ${normalizedQuestions.length} questions for ${subject}`);
      setQuestions(normalizedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionsByTopic = (topic: string) => {
    return questions.filter(q => q.topic === topic);
  };

  const getQuestionsByTheme = (theme: string) => {
    return questions.filter(q => q.grande_tema === theme);
  };

  const getRandomQuestions = (count: number = 10) => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const getQuestionsByDifficulty = (difficulty: string) => {
    return questions.filter(q => q.difficulty_level === difficulty);
  };

  return {
    questions,
    loading,
    getQuestionsByTopic,
    getQuestionsByTheme,
    getQuestionsByDifficulty,
    getRandomQuestions,
    refreshQuestions: loadQuestions
  };
};
