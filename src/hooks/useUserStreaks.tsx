
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadStreak();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadStreak = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading streak for user:', user.id);
      
      // Usar maybeSingle() em vez de single() para evitar erro 406
      const { data, error } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading user streak:', error);
        setError('Erro ao carregar sequência de estudos');
        // Tentar criar registro inicial mesmo com erro
        await createInitialStreak();
        return;
      }

      if (data) {
        console.log('Streak data loaded:', data);
        setStreak({
          current_streak: data.current_streak || 0,
          longest_streak: data.longest_streak || 0,
          last_study_date: data.last_study_date,
          streak_frozen: data.streak_frozen || false,
          freeze_count: data.freeze_count || 0
        });
      } else {
        // Não existe registro, criar um novo
        console.log('No streak record found, creating initial streak');
        await createInitialStreak();
      }
    } catch (error) {
      console.error('Error in loadStreak:', error);
      setError('Erro inesperado ao carregar sequência');
      // Definir valores padrão em caso de erro
      setStreak({
        current_streak: 0,
        longest_streak: 0,
        last_study_date: null,
        streak_frozen: false,
        freeze_count: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const createInitialStreak = async () => {
    if (!user) return;

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
        // Mesmo com erro, definir valores padrão
        setStreak({
          current_streak: 0,
          longest_streak: 0,
          last_study_date: null,
          streak_frozen: false,
          freeze_count: 0
        });
        return;
      }

      if (data) {
        console.log('Initial streak created:', data);
        setStreak({
          current_streak: data.current_streak || 0,
          longest_streak: data.longest_streak || 0,
          last_study_date: data.last_study_date,
          streak_frozen: data.streak_frozen || false,
          freeze_count: data.freeze_count || 0
        });
      } else {
        // Se não retornou data, definir valores padrão
        setStreak({
          current_streak: 0,
          longest_streak: 0,
          last_study_date: null,
          streak_frozen: false,
          freeze_count: 0
        });
      }
      
      setError(null);
    } catch (error) {
      console.error('Error in createInitialStreak:', error);
      setError('Erro ao criar registro de sequência');
      // Definir valores padrão mesmo com erro
      setStreak({
        current_streak: 0,
        longest_streak: 0,
        last_study_date: null,
        streak_frozen: false,
        freeze_count: 0
      });
    }
  };

  const updateStreak = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      // Se não tem streak ainda, usar valores padrão
      const currentStreak = streak?.current_streak || 0;
      const longestStreak = streak?.longest_streak || 0;
      const lastStudyDate = streak?.last_study_date;
      
      let newCurrentStreak = currentStreak;
      
      if (!lastStudyDate || lastStudyDate === yesterday) {
        newCurrentStreak = currentStreak + 1;
      } else if (lastStudyDate !== today) {
        newCurrentStreak = 1;
      } else {
        // Já estudou hoje, não alterar
        return;
      }

      const newLongestStreak = Math.max(longestStreak, newCurrentStreak);

      console.log('Updating streak:', {
        currentStreak,
        newCurrentStreak,
        longestStreak,
        newLongestStreak,
        today
      });

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
        return;
      }

      if (data) {
        console.log('Streak updated:', data);
        setStreak({
          current_streak: data.current_streak || newCurrentStreak,
          longest_streak: data.longest_streak || newLongestStreak,
          last_study_date: data.last_study_date || today,
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
    error,
    updateStreak,
    loadStreak
  };
};
