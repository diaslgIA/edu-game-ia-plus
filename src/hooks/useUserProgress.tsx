
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

interface DashboardStats {
  todayXP: number;
  todayQuestions: number;
  totalPoints: number;
  level: number;
}

interface WeeklyGoal {
  completed: number;
  target: number;
}

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    todayXP: 0,
    todayQuestions: 0,
    totalPoints: 0,
    level: 1
  });
  const [weeklyGoal, setWeeklyGoal] = useState<WeeklyGoal>({
    completed: 0,
    target: 20
  });
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    if (user) {
      loadUserProgress();
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    if (!user) return;

    try {
      // Buscar estatísticas do perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('points, level, login_streak')
        .eq('id', user.id)
        .single();

      if (profile) {
        setStats({
          todayXP: 0, // Será calculado baseado nas atividades de hoje
          todayQuestions: 0, // Será calculado baseado nas atividades de hoje
          totalPoints: profile.points || 0,
          level: profile.level || 1
        });
        setCurrentStreak(profile.login_streak || 0);
      }

      // Buscar atividades de hoje para calcular XP e questões
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: todayActivities } = await supabase
        .from('user_activities')
        .select('points_earned, activity_type')
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString());

      if (todayActivities) {
        const todayXP = todayActivities.reduce((sum, activity) => sum + (activity.points_earned || 0), 0);
        const todayQuestions = todayActivities.filter(activity => activity.activity_type === 'quiz_question').length;
        
        setStats(prev => ({
          ...prev,
          todayXP,
          todayQuestions
        }));
      }

      // Calcular meta semanal baseada nas atividades da semana
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const { data: weekActivities } = await supabase
        .from('user_activities')
        .select('id')
        .eq('user_id', user.id)
        .gte('created_at', weekStart.toISOString());

      setWeeklyGoal({
        completed: weekActivities?.length || 0,
        target: 20
      });

    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const { data: progressData, error } = await supabase
        .from('subject_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading progress:', error);
        return;
      }

      if (progressData && progressData.length > 0) {
        const mappedProgress = progressData.map(item => ({
          subject: item.subject,
          completed_activities: item.completed_activities,
          total_activities: item.total_activities,
          progress_percentage: item.progress_percentage,
          last_activity_date: item.last_activity_date
        }));
        setProgress(mappedProgress);
      } else {
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
      total_activities: 50,
      progress_percentage: 0,
      last_activity_date: new Date().toISOString()
    }));

    try {
      const { data, error } = await supabase
        .from('subject_progress')
        .insert(initialProgress)
        .select();

      if (error) {
        console.error('Error initializing progress:', error);
        return;
      }

      if (data) {
        const mappedProgress = data.map(item => ({
          subject: item.subject,
          completed_activities: item.completed_activities,
          total_activities: item.total_activities,
          progress_percentage: item.progress_percentage,
          last_activity_date: item.last_activity_date
        }));
        setProgress(mappedProgress);
      }
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };

  const updateProgress = async (subject: string, increment: number = 1) => {
    if (!user) return;

    try {
      const currentProgress = progress.find(p => p.subject === subject);
      if (!currentProgress) return;

      const newCompletedActivities = currentProgress.completed_activities + increment;
      const newProgressPercentage = Math.round((newCompletedActivities / currentProgress.total_activities) * 100);

      const { data, error } = await supabase
        .from('subject_progress')
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
        const updatedProgress = {
          subject: data.subject,
          completed_activities: data.completed_activities,
          total_activities: data.total_activities,
          progress_percentage: data.progress_percentage,
          last_activity_date: data.last_activity_date
        };

        setProgress(prev => prev.map(p => 
          p.subject === subject ? updatedProgress : p
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

  // Criar recentProgress baseado no progresso atual
  const recentProgress = progress
    .filter(p => p.completed_activities > 0)
    .sort((a, b) => new Date(b.last_activity_date).getTime() - new Date(a.last_activity_date).getTime())
    .slice(0, 5);

  return {
    progress,
    loading,
    stats,
    recentProgress,
    weeklyGoal,
    currentStreak,
    updateProgress,
    getSubjectProgress,
    getTotalProgress,
    refreshProgress: loadUserProgress
  };
};
