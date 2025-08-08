
import { useState, useEffect, useRef } from 'react';
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

// Cache em memória para evitar requisições repetidas
const questionsCache = new Map<string, SubjectQuestion[]>();
const cacheTimestamps = new Map<string, number>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const useSubjectQuestions = (subjectVariants: string[]) => {
  const [questions, setQuestions] = useState<SubjectQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 2;

  const cacheKey = subjectVariants.sort().join(',');

  useEffect(() => {
    if (subjectVariants.length > 0) {
      loadQuestions();
    }
  }, [subjectVariants]);

  const normalizeOptions = (options: any): string[] => {
    if (Array.isArray(options)) {
      return options;
    }
    
    if (typeof options === 'object' && options !== null) {
      // Se for um objeto, tentar extrair os valores
      const values = Object.values(options);
      if (values.length > 0) {
        return values.map(v => String(v));
      }
    }
    
    if (typeof options === 'string') {
      try {
        const parsed = JSON.parse(options);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // Se não for JSON válido, dividir por vírgula ou retornar como string única
        return options.includes(',') ? options.split(',').map(s => s.trim()) : [options];
      }
    }
    
    return ['Opção não disponível'];
  };

  const normalizeCorrectAnswer = (correctAnswer: any): number => {
    if (typeof correctAnswer === 'number') {
      return correctAnswer;
    }
    
    const parsed = parseInt(String(correctAnswer));
    return isNaN(parsed) ? 0 : parsed;
  };

  const isCache Valid = (timestamp: number) => {
    return Date.now() - timestamp < CACHE_DURATION;
  };

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar cache primeiro
      const cachedData = questionsCache.get(cacheKey);
      const cachedTimestamp = cacheTimestamps.get(cacheKey);
      
      if (cachedData && cachedTimestamp && isCacheValid(cachedTimestamp)) {
        console.log('Using cached questions for:', subjectVariants);
        setQuestions(cachedData);
        setLoading(false);
        return;
      }

      console.log('Loading questions for subject variants:', subjectVariants);
      
      const { data, error: fetchError } = await supabase
        .from('subject_questions')
        .select('*')
        .in('subject', subjectVariants);

      if (fetchError) {
        console.error('Error loading questions:', fetchError);
        throw fetchError;
      }

      if (data && data.length > 0) {
        console.log('Loaded questions from database:', data.length);
        
        // Normalizar os dados
        const normalizedQuestions: SubjectQuestion[] = data.map(q => ({
          ...q,
          options: normalizeOptions(q.options),
          correct_answer: normalizeCorrectAnswer(q.correct_answer)
        }));
        
        // Armazenar no cache
        questionsCache.set(cacheKey, normalizedQuestions);
        cacheTimestamps.set(cacheKey, Date.now());
        
        setQuestions(normalizedQuestions);
        retryCountRef.current = 0; // Reset retry count on success
      } else {
        console.log('No questions found for subjects:', subjectVariants);
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Erro ao carregar questões');
      
      // Retry logic
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`Retrying... attempt ${retryCountRef.current}`);
        setTimeout(() => loadQuestions(), 1000 * retryCountRef.current);
      }
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

  const retryLoad = () => {
    retryCountRef.current = 0;
    loadQuestions();
  };

  return {
    questions,
    loading,
    error,
    getQuestionsByTopic,
    getRandomQuestions,
    refreshQuestions: loadQuestions,
    retryLoad
  };
};
