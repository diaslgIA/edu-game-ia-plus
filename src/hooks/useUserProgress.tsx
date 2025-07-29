
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProgress {
  total_activities: number;
  completed_activities: number;
  progress_percentage: number;
  last_activity_date: string;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>({
    total_activities: 0,
    completed_activities: 0,
    progress_percentage: 0,
    last_activity_date: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Buscar progresso geral do usuário baseado em quiz_scores e user_activities
      const { data: quizData } = await supabase
        .from('quiz_scores')
        .select('*')
        .eq('user_id', user.id);

      const { data: activityData } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id);

      const completedQuizzes = quizData?.length || 0;
      const completedActivities = activityData?.length || 0;
      const totalCompleted = completedQuizzes + completedActivities;
      
      // Calcular progresso baseado em atividades gerais
      const progressPercentage = totalCompleted > 0 ? Math.min(100, (totalCompleted / 50) * 100) : 0;

      setProgress({
        total_activities: 50, // Meta geral de atividades
        completed_activities: totalCompleted,
        progress_percentage: Math.round(progressPercentage),
        last_activity_date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (increment: number = 1) => {
    if (!user) return;

    try {
      const newCompletedActivities = progress.completed_activities + increment;
      const newProgressPercentage = Math.round((newCompletedActivities / progress.total_activities) * 100);

      setProgress(prev => ({
        ...prev,
        completed_activities: newCompletedActivities,
        progress_percentage: newProgressPercentage,
        last_activity_date: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getTotalProgress = () => {
    return progress.progress_percentage;
  };

  return {
    progress,
    loading,
    updateProgress,
    getTotalProgress,
    refreshProgress: loadUserProgress
  };
};
