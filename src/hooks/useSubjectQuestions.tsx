
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
      
      // Process questions to ensure proper format
      const processedQuestions: SubjectQuestion[] = (data || []).map(question => {
        let options: string[] = [];
        
        // Handle different option formats from database
        if (Array.isArray(question.options)) {
          options = question.options.map(opt => String(opt));
        } else if (typeof question.options === 'object' && question.options !== null) {
          // If it's an object with numeric keys, convert to array
          const optionsObj = question.options as Record<string, any>;
          if ('0' in optionsObj) {
            options = Object.keys(optionsObj).sort().map(key => String(optionsObj[key]));
          } else {
            options = Object.values(optionsObj).map(opt => String(opt));
          }
        }
        
        return {
          id: question.id,
          subject: question.subject,
          topic: question.topic,
          question: question.question,
          options,
          correct_answer: question.correct_answer,
          explanation: question.explanation || '',
          difficulty_level: question.difficulty_level || 'medium'
        };
      });
      
      setQuestions(processedQuestions);
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
