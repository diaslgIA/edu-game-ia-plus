
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MentorAffinity {
  mentor_id: string;
  affinity_level: number;
  experience_points: number;
  unlocked_content: string[];
  last_interaction: string;
}

export const useMentorAffinity = () => {
  const { user } = useAuth();
  const [affinities, setAffinities] = useState<MentorAffinity[]>([]);
  const [loading, setLoading] = useState(true);

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

      setAffinities(data || []);
    } catch (error) {
      console.error('Error loading mentor affinities:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAffinity = async (mentorId: string, experienceGained: number) => {
    if (!user) return;

    try {
      const currentAffinity = affinities.find(a => a.mentor_id === mentorId);
      const newExperience = (currentAffinity?.experience_points || 0) + experienceGained;
      const newLevel = Math.floor(newExperience / 100) + 1; // 100 XP por nível

      const { error } = await supabase
        .from('mentor_affinities')
        .upsert({
          user_id: user.id,
          mentor_id: mentorId,
          affinity_level: newLevel,
          experience_points: newExperience,
          last_interaction: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating mentor affinity:', error);
        return;
      }

      await loadAffinities();
    } catch (error) {
      console.error('Error updating mentor affinity:', error);
    }
  };

  const getMentorAffinity = (mentorId: string) => {
    return affinities.find(a => a.mentor_id === mentorId) || {
      mentor_id: mentorId,
      affinity_level: 1,
      experience_points: 0,
      unlocked_content: [],
      last_interaction: ''
    };
  };

  const getAffinityTitle = (mentorId: string) => {
    const affinity = getMentorAffinity(mentorId);
    const level = affinity.affinity_level;

    const titles: { [key: string]: string[] } = {
      'pitagoras': ['Iniciante dos Números', 'Discípulo de Pitágoras', 'Mestre da Harmonia'],
      'einstein': ['Curioso Científico', 'Aprendiz de Einstein', 'Gênio da Física'],
      'marie_curie': ['Jovem Cientista', 'Discípulo de Marie', 'Pioneiro da Química'],
      'darwin': ['Observador da Natureza', 'Aprendiz de Darwin', 'Naturalista Evoluído'],
      'zumbi': ['Guerreiro Iniciante', 'Seguidor de Zumbi', 'Líder da História'],
      'rui_barbosa': ['Estudante das Palavras', 'Discípulo da Eloquência', 'Águia das Letras'],
      'pedro_teixeira': ['Explorador Novato', 'Bandeirante Aprendiz', 'Desbravador Mestre'],
      'socrates': ['Questionador Iniciante', 'Discípulo de Sócrates', 'Filósofo Sábio'],
      'florestan': ['Observador Social', 'Aprendiz Sociólogo', 'Transformador da Sociedade']
    };

    const mentorTitles = titles[mentorId] || ['Iniciante', 'Aprendiz', 'Mestre'];
    return mentorTitles[Math.min(level - 1, mentorTitles.length - 1)];
  };

  return {
    affinities,
    loading,
    updateAffinity,
    getMentorAffinity,
    getAffinityTitle,
    refreshAffinities: loadAffinities
  };
};
