
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

      const transformedData: MentorAffinity[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        mentor_id: item.mentor_id,
        affinity_level: item.affinity_level,
        experience_points: item.experience_points,
        unlocked_content: Array.isArray(item.unlocked_content) ? item.unlocked_content : [],
        last_interaction: item.last_interaction,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setAffinities(transformedData);
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

      const affinityData = {
        user_id: user.id,
        mentor_id: mentorId,
        experience_points: newXP,
        affinity_level: newLevel,
        last_interaction: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Tentar primeiro com upsert
      const { error: upsertError } = await supabase
        .from('mentor_affinities')
        .upsert(affinityData, {
          onConflict: 'user_id,mentor_id'
        });

      if (upsertError) {
        console.error('Erro no upsert, tentando update:', upsertError);
        
        // Se o upsert falhar, tentar update direto
        if (existing) {
          const { error: updateError } = await supabase
            .from('mentor_affinities')
            .update({
              experience_points: newXP,
              affinity_level: newLevel,
              last_interaction: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', existing.id);

          if (updateError) {
            console.error('Erro no update de afinidade:', updateError);
            return;
          }
        } else {
          // Se não existe, tentar insert simples
          const { error: insertError } = await supabase
            .from('mentor_affinities')
            .insert(affinityData);

          if (insertError) {
            console.error('Erro no insert de afinidade:', insertError);
            return;
          }
        }
      }

      // Atualizar estado local
      await fetchAffinities();
    } catch (error) {
      console.error('Erro ao criar afinidade de mentor:', error);
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
