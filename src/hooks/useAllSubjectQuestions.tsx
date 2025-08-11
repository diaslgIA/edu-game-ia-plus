
import { useState, useEffect } from 'react';
import { getAllSubjectsQuestions } from '@/utils/generateQuestionsFromContent';

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
      
      // Use the new utility that can generate questions when needed
      const allQuestions = await getAllSubjectsQuestions(100); // Load a good pool
      setQuestions(allQuestions);
      console.log('Loaded/generated questions from all subjects:', allQuestions.length);
    } catch (error) {
      console.error('Error loading all questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomQuestions = (count: number = 10) => {
    if (questions.length === 0) return [];
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
