
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

export const useUserStreaks = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState<UserStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStreak();
    }
  }, [user]);

  const loadStreak = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Não existe registro, criar um novo usando upsert
        await createInitialStreak();
      } else if (error) {
        console.error('Error loading user streak:', error);
      } else if (data) {
        setStreak({
          current_streak: data.current_streak || 0,
          longest_streak: data.longest_streak || 0,
          last_study_date: data.last_study_date,
          streak_frozen: data.streak_frozen || false,
          freeze_count: data.freeze_count || 0
        });
      }
    } catch (error) {
      console.error('Error in loadStreak:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInitialStreak = async () => {
    if (!user) return;

    try {
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
        .single();

      if (error) {
        console.error('Error creating initial streak:', error);
        return;
      }

      if (data) {
        setStreak({
          current_streak: 0,
          longest_streak: 0,
          last_study_date: null,
          streak_frozen: false,
          freeze_count: 0
        });
      }
    } catch (error) {
      console.error('Error in createInitialStreak:', error);
    }
  };

  const updateStreak = async () => {
    if (!user || !streak) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      let newCurrentStreak = streak.current_streak;
      
      if (!streak.last_study_date || streak.last_study_date === yesterday) {
        newCurrentStreak = streak.current_streak + 1;
      } else if (streak.last_study_date !== today) {
        newCurrentStreak = 1;
      }

      const newLongestStreak = Math.max(streak.longest_streak, newCurrentStreak);

      const { data, error } = await supabase
        .from('user_streaks')
        .upsert({
          user_id: user.id,
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_study_date: today,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating streak:', error);
        return;
      }

      if (data) {
        setStreak({
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_study_date: today,
          streak_frozen: data.streak_frozen || false,
          freeze_count: data.freeze_count || 0
        });
      }
    } catch (error) {
      console.error('Error in updateStreak:', error);
    }
  };

  return {
    streak,
    loading,
    updateStreak,
    loadStreak
  };
};
