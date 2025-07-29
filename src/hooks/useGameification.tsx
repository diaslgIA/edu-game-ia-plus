
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

  const createInitialStreak = async () => {
    if (!user) return null;

    try {
      console.log('Creating initial streak for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_streaks')
        .upsert({
          user_id: user.id,
          current_streak: 0,
          longest_streak: 0,
          last_study_date: null,
          streak_frozen: false,
          freeze_count: 0
        }, {
          onConflict: 'user_id'
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error creating initial streak:', error);
        return {
          current_streak: 0,
          longest_streak: 0,
          last_study_date: null,
          streak_frozen: false,
          freeze_count: 0
        };
      }

      return data ? {
        current_streak: data.current_streak || 0,
        longest_streak: data.longest_streak || 0,
        last_study_date: data.last_study_date,
        streak_frozen: data.streak_frozen || false,
        freeze_count: data.freeze_count || 0
      } : {
        current_streak: 0,
        longest_streak: 0,
        last_study_date: null,
        streak_frozen: false,
        freeze_count: 0
      };
    } catch (error) {
      console.error('Error in createInitialStreak:', error);
      return {
        current_streak: 0,
        longest_streak: 0,
        last_study_date: null,
        streak_frozen: false,
        freeze_count: 0
      };
    }
  };

  useEffect(() => {
    const fetchGameificationData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching gamification data for user:', user.id);

        // Fetch streak com maybeSingle para evitar erro 406
        const { data: streakData, error: streakError } = await supabase
          .from('user_streaks')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (streakError) {
          console.error('Error fetching streak:', streakError);
          // Criar streak inicial em caso de erro
          const initialStreak = await createInitialStreak();
          setStreak(initialStreak);
        } else if (streakData) {
          console.log('Streak data loaded:', streakData);
          setStreak({
            current_streak: streakData.current_streak || 0,
            longest_streak: streakData.longest_streak || 0,
            last_study_date: streakData.last_study_date,
            streak_frozen: streakData.streak_frozen || false,
            freeze_count: streakData.freeze_count || 0
          });
        } else {
          // Não existe registro, criar um novo
          console.log('No streak record found, creating initial streak');
          const initialStreak = await createInitialStreak();
          setStreak(initialStreak);
        }

        // Fetch achievements
        const { data: achievementsData, error: achievementsError } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false });

        if (achievementsError) {
          console.error('Error fetching achievements:', achievementsError);
        } else {
          setAchievements(achievementsData || []);
        }

        // Fetch daily goals
        const today = new Date().toISOString().split('T')[0];
        const { data: goalsData, error: goalsError } = await supabase
          .from('daily_goals')
          .select('*')
          .eq('user_id', user.id)
          .eq('date', today);

        if (goalsError) {
          console.error('Error fetching daily goals:', goalsError);
        } else {
          setDailyGoals(goalsData || []);
        }

      } catch (error) {
        console.error('Error fetching gamification data:', error);
        // Definir valores padrão em caso de erro geral
        const defaultStreak = {
          current_streak: 0,
          longest_streak: 0,
          last_study_date: null,
          streak_frozen: false,
          freeze_count: 0
        };
        setStreak(defaultStreak);
        setAchievements([]);
        setDailyGoals([]);
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
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const currentStreak = streak?.current_streak || 0;
      const longestStreak = streak?.longest_streak || 0;
      const lastStudyDate = streak?.last_study_date;
      
      let newCurrentStreak = currentStreak;
      
      if (!lastStudyDate || lastStudyDate === yesterday) {
        newCurrentStreak = currentStreak + 1;
      } else if (lastStudyDate !== today) {
        newCurrentStreak = 1;
      } else {
        // Já estudou hoje
        return true;
      }

      const newLongestStreak = Math.max(longestStreak, newCurrentStreak);

      const { data, error } = await supabase
        .from('user_streaks')
        .upsert({
          user_id: user.id,
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_study_date: today,
          streak_frozen: streak?.streak_frozen || false,
          freeze_count: streak?.freeze_count || 0,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error updating streak:', error);
        return false;
      }

      if (data) {
        setStreak({
          current_streak: data.current_streak || newCurrentStreak,
          longest_streak: data.longest_streak || newLongestStreak,
          last_study_date: data.last_study_date || today,
          streak_frozen: data.streak_frozen || false,
          freeze_count: data.freeze_count || 0
        });
      }
      
      return true;
    } catch (error) {
      console.error('Error in updateStreak:', error);
      return false;
    }
  };

  const awardXP = async (amount: number) => {
    if (!user || !profile) return false;

    try {
      const currentXP = profile.points || 0;
      const newXP = currentXP + amount;
      const newLevel = Math.floor(newXP / 100) + 1;

      const { error } = await supabase
        .from('profiles')
        .update({
          points: newXP,
          level: newLevel,
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
        const targetValue = goalType === 'lessons' ? 3 : goalType === 'xp' ? 50 : 15;
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
