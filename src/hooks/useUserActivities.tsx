
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export interface UserActivity {
  id: string;
  activity_type: string;
  subject: string;
  topic?: string;
  points_earned: number;
  created_at: string;
  metadata?: any;
  is_correct?: boolean;
}

export const useUserActivities = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Erro ao buscar atividades:', error);
        return;
      }

      console.log('Atividades carregadas:', data);
      setActivities(data || []);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerQuizActivity = async (
    subject: string,
    topic: string,
    questionId: string,
    userAnswer: number,
    correctAnswer: number,
    timeSpent: number
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const isCorrect = userAnswer === correctAnswer;
      const pointsEarned = isCorrect ? 10 : 0;

      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'quiz_question',
          subject,
          topic,
          points_earned: pointsEarned,
          time_spent: timeSpent,
          metadata: {
            question_id: questionId,
            user_answer: userAnswer,
            correct_answer: correctAnswer,
            is_correct: isCorrect
          }
        });

      if (error) {
        console.error('Erro ao registrar atividade de questão:', error);
      } else {
        console.log('Atividade de questão registrada com sucesso');
        // Recarregar atividades para mostrar a mais recente
        fetchActivities();
      }
    } catch (error) {
      console.error('Erro ao registrar atividade:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return {
    activities,
    isLoading,
    fetchActivities,
    registerQuizActivity
  };
};
