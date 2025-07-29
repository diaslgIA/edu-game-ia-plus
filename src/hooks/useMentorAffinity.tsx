
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MentorAffinity {
  mentor_id: string;
  affinity_level: number;
  experience_points: number;
  last_interaction: string;
  unlocked_content: string[];
}

export const useMentorAffinity = () => {
  const { user } = useAuth();
  const [affinities, setAffinities] = useState<Record<string, MentorAffinity>>({});

  useEffect(() => {
    if (user) {
      loadAffinities();
    }
  }, [user]);

  const loadAffinities = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mentor_affinities')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading mentor affinities:', error);
        return;
      }

      const affinityMap: Record<string, MentorAffinity> = {};
      data?.forEach(affinity => {
        // Safely handle the unlocked_content field which comes as Json from Supabase
        let unlockedContent: string[] = [];
        if (affinity.unlocked_content) {
          if (Array.isArray(affinity.unlocked_content)) {
            unlockedContent = affinity.unlocked_content.filter((item): item is string => 
              typeof item === 'string'
            );
          }
        }

        affinityMap[affinity.mentor_id] = {
          mentor_id: affinity.mentor_id,
          affinity_level: affinity.affinity_level,
          experience_points: affinity.experience_points,
          last_interaction: affinity.last_interaction,
          unlocked_content: unlockedContent
        };
      });

      setAffinities(affinityMap);
    } catch (error) {
      console.error('Error loading mentor affinities:', error);
    }
  };

  const getMentorAffinity = (mentorId: string): MentorAffinity => {
    return affinities[mentorId] || {
      mentor_id: mentorId,
      affinity_level: 1,
      experience_points: 0,
      last_interaction: new Date().toISOString(),
      unlocked_content: []
    };
  };

  const updateAffinity = async (mentorId: string, xpGained: number) => {
    if (!user || !mentorId || xpGained <= 0) return;

    try {
      const currentAffinity = getMentorAffinity(mentorId);
      const newXP = currentAffinity.experience_points + xpGained;
      const newLevel = Math.floor(newXP / 100) + 1;

      const { data, error } = await supabase
        .from('mentor_affinities')
        .upsert({
          user_id: user.id,
          mentor_id: mentorId,
          affinity_level: newLevel,
          experience_points: newXP,
          last_interaction: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating mentor affinity:', error);
        return;
      }

      // Update local state
      setAffinities(prev => ({
        ...prev,
        [mentorId]: {
          mentor_id: mentorId,
          affinity_level: newLevel,
          experience_points: newXP,
          last_interaction: new Date().toISOString(),
          unlocked_content: currentAffinity.unlocked_content
        }
      }));

    } catch (error) {
      console.error('Error updating mentor affinity:', error);
    }
  };

  const getAffinityTitle = (mentorId: string): string => {
    const affinity = getMentorAffinity(mentorId);
    const level = affinity.affinity_level;
    
    if (level >= 10) return 'Mestre';
    if (level >= 7) return 'Especialista';
    if (level >= 5) return 'Avançado';
    if (level >= 3) return 'Intermediário';
    return 'Iniciante';
  };

  return {
    affinities,
    getMentorAffinity,
    updateAffinity,
    getAffinityTitle,
    loadAffinities
  };
};
