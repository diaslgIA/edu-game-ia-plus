
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface MentorAffinity {
  id: string;
  user_id: string;
  mentor_id: string;
  affinity_level: number;
  experience_points: number;
  unlocked_content: any[];
  last_interaction: string | null;
  created_at: string;
  updated_at: string;
}

export const useMentorAffinity = () => {
  const { user } = useAuth();
  const [affinities, setAffinities] = useState<MentorAffinity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAffinities = async () => {
    if (!user) {
      setAffinities([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mentor_affinities')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching mentor affinities:', error);
        return;
      }

      setAffinities(data as MentorAffinity[] || []);
    } catch (error) {
      console.error('Error fetching mentor affinities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffinities();
  }, [user]);

  const getMentorAffinity = (mentorId: string): MentorAffinity => {
    const existing = affinities.find(a => a.mentor_id === mentorId);
    if (existing) return existing;
    
    // Return default values if no affinity exists yet
    return {
      id: '',
      user_id: user?.id || '',
      mentor_id: mentorId,
      affinity_level: 1,
      experience_points: 0,
      unlocked_content: [],
      last_interaction: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  };

  const updateAffinity = async (mentorId: string, xpGained: number) => {
    if (!user) return;

    try {
      const existing = affinities.find(a => a.mentor_id === mentorId);
      const newXP = (existing?.experience_points || 0) + xpGained;
      const newLevel = Math.floor(newXP / 100) + 1;

      if (existing) {
        // Update existing affinity
        const { error } = await supabase
          .from('mentor_affinities')
          .update({
            experience_points: newXP,
            affinity_level: newLevel,
            last_interaction: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (error) {
          console.error('Error updating mentor affinity:', error);
          return;
        }
      } else {
        // Create new affinity
        const { error } = await supabase
          .from('mentor_affinities')
          .insert({
            user_id: user.id,
            mentor_id: mentorId,
            experience_points: newXP,
            affinity_level: newLevel,
            last_interaction: new Date().toISOString()
          });

        if (error) {
          console.error('Error creating mentor affinity:', error);
          return;
        }
      }

      // Refresh affinities
      await fetchAffinities();
    } catch (error) {
      console.error('Error updating mentor affinity:', error);
    }
  };

  const getAffinityTitle = (mentorId: string): string => {
    const affinity = getMentorAffinity(mentorId);
    const level = affinity.affinity_level;

    if (level >= 10) return 'Mestre Supremo';
    if (level >= 8) return 'Discípulo Iluminado';
    if (level >= 6) return 'Seguidor Dedicado';
    if (level >= 4) return 'Aprendiz Aplicado';
    if (level >= 2) return 'Estudante Interessado';
    return 'Novo Conhecedor';
  };

  return {
    affinities,
    loading,
    getMentorAffinity,
    updateAffinity,
    getAffinityTitle,
    refetch: fetchAffinities
  };
};
