
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserStreak {
  current_streak: number;
  longest_streak: number;
  last_study_date: string | null;
  streak_frozen: boolean;
  freeze_count: number;
}

interface Achievement {
  id: string;
  achievement_id: string;
  achievement_name: string;
  achievement_description: string;
  achievement_icon: string;
  points_awarded: number;
  earned_at: string;
  subject: string;
}

interface DailyGoal {
  id: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  date: string;
  completed: boolean;
}

export const useGameification = () => {
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, refreshProfile } = useAuth();

  useEffect(() => {
    const fetchGameificationData = async () => {
      if (!user) return;

      try {
        // Fetch streak
        const { data: streakData } = await supabase
          .from('user_streaks')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setStreak(streakData);

        // Fetch achievements
        const { data: achievementsData } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false });

        setAchievements(achievementsData || []);

        // Fetch daily goals
        const today = new Date().toISOString().split('T')[0];
        const { data: goalsData } = await supabase
          .from('daily_goals')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today);

        setDailyGoals(goalsData || []);
      } catch (error) {
        console.error('Error fetching gamification data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameificationData();
  }, [user]);

  const updateStreak = async () => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('user_streaks')
        .upsert({
          user_id: user.id,
          current_streak: (streak?.current_streak || 0) + 1,
          longest_streak: Math.max((streak?.longest_streak || 0), (streak?.current_streak || 0) + 1),
          last_study_date: today,
        })
        .select();

      if (error) throw error;
      setStreak(data[0]);
      return true;
    } catch (error) {
      console.error('Error updating streak:', error);
      return false;
    }
  };

  const awardXP = async (amount: number) => {
    if (!user || !profile) return false;

    try {
      const currentXP = profile.xp_points || profile.points || 0;
      const newXP = currentXP + amount;
      const newLevel = Math.floor(newXP / 100) + 1;

      const { error } = await supabase
        .from('profiles')
        .update({
          xp_points: newXP,
          global_level: newLevel,
        })
        .eq('id', user.id);

      if (error) throw error;
      await refreshProfile();
      return true;
    } catch (error) {
      console.error('Error awarding XP:', error);
      return false;
    }
  };

  const unlockAchievement = async (achievementData: {
    achievement_id: string;
    achievement_name: string;
    achievement_description: string;
    achievement_icon: string;
    points_awarded: number;
    subject: string;
  }) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          ...achievementData,
        })
        .select();

      if (error) throw error;
      
      setAchievements(prev => [data[0], ...prev]);
      await awardXP(achievementData.points_awarded);
      return true;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      return false;
    }
  };

  const updateDailyGoal = async (goalType: string, increment: number = 1) => {
    if (!user) return false;

    try {
      const today = new Date().toISOString().split('T')[0];
      const existingGoal = dailyGoals.find(g => g.goal_type === goalType);
      
      if (existingGoal) {
        const newValue = existingGoal.current_value + increment;
        const isCompleted = newValue >= existingGoal.target_value;

        const { error } = await supabase
          .from('daily_goals')
          .update({
            current_value: newValue,
            completed: isCompleted,
          })
          .eq('id', existingGoal.id);

        if (error) throw error;

        setDailyGoals(prev =>
          prev.map(goal =>
            goal.id === existingGoal.id
              ? { ...goal, current_value: newValue, completed: isCompleted }
              : goal
          )
        );
      } else {
        // Create new daily goal
        const targetValue = goalType === 'lessons' ? 3 : goalType === 'xp' ? 50 : 15; // Default targets
        const { data, error } = await supabase
          .from('daily_goals')
          .insert({
            user_id: user.id,
            goal_type: goalType,
            target_value: targetValue,
            current_value: increment,
            date: today,
            completed: increment >= targetValue,
          })
          .select();

        if (error) throw error;
        setDailyGoals(prev => [...prev, data[0]]);
      }

      return true;
    } catch (error) {
      console.error('Error updating daily goal:', error);
      return false;
    }
  };

  return {
    streak,
    achievements,
    dailyGoals,
    loading,
    updateStreak,
    awardXP,
    unlockAchievement,
    updateDailyGoal,
  };
};
