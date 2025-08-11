
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getDbSubjects } from '@/utils/subjectMapping';

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
      
      const dbSubjects = getDbSubjects(subject);
      console.log('Mapped subject names:', dbSubjects);
      
      const { data, error } = await supabase
        .from('subject_questions')
        .select('*')
        .in('subject', dbSubjects);

      if (error) {
        console.error('Error loading questions:', error);
        return;
      }

      console.log('Loaded questions from database:', data?.length || 0, 'questions');
      console.log('Questions by subject:', data?.reduce((acc, q) => {
        acc[q.subject] = (acc[q.subject] || 0) + 1;
        return acc;
      }, {} as Record<string, number>));
      
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
