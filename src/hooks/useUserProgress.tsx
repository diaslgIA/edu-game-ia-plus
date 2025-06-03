
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProgress {
  subject: string;
  completed_activities: number;
  total_activities: number;
  progress_percentage: number;
  last_activity_date: string;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
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
      
      // Buscar progresso do usuário
      const { data: progressData, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading progress:', error);
        return;
      }

      if (progressData && progressData.length > 0) {
        setProgress(progressData);
      } else {
        // Criar progresso inicial para novo usuário
        await initializeUserProgress();
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeUserProgress = async () => {
    if (!user) return;

    const subjects = [
      'Matemática',
      'Português', 
      'Física',
      'Química',
      'Biologia',
      'História',
      'Geografia',
      'Filosofia',
      'Sociologia'
    ];

    const initialProgress = subjects.map(subject => ({
      user_id: user.id,
      subject,
      completed_activities: 0,
      total_activities: 50, // Número padrão de atividades por matéria
      progress_percentage: 0,
      last_activity_date: new Date().toISOString()
    }));

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .insert(initialProgress)
        .select();

      if (error) {
        console.error('Error initializing progress:', error);
        return;
      }

      if (data) {
        setProgress(data);
      }
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };

  const updateProgress = async (subject: string, increment: number = 1) => {
    if (!user) return;

    try {
      // Buscar progresso atual da matéria
      const currentProgress = progress.find(p => p.subject === subject);
      if (!currentProgress) return;

      const newCompletedActivities = currentProgress.completed_activities + increment;
      const newProgressPercentage = Math.round((newCompletedActivities / currentProgress.total_activities) * 100);

      const { data, error } = await supabase
        .from('user_progress')
        .update({
          completed_activities: newCompletedActivities,
          progress_percentage: newProgressPercentage,
          last_activity_date: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('subject', subject)
        .select()
        .single();

      if (error) {
        console.error('Error updating progress:', error);
        return;
      }

      if (data) {
        setProgress(prev => prev.map(p => 
          p.subject === subject ? data : p
        ));
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getSubjectProgress = (subject: string) => {
    return progress.find(p => p.subject === subject) || {
      subject,
      completed_activities: 0,
      total_activities: 50,
      progress_percentage: 0,
      last_activity_date: new Date().toISOString()
    };
  };

  const getTotalProgress = () => {
    if (progress.length === 0) return 0;
    const totalPercentage = progress.reduce((sum, p) => sum + p.progress_percentage, 0);
    return Math.round(totalPercentage / progress.length);
  };

  return {
    progress,
    loading,
    updateProgress,
    getSubjectProgress,
    getTotalProgress,
    refreshProgress: loadUserProgress
  };
};
