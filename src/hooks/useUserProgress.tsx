import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProgressData {
  topic_id: string;
}

interface UserProgressStore {
  completedTopics: Set<string>;
  totalTopics: number;
  loading: boolean;
  fetchProgress: (userId: string) => Promise<void>;
  completeTopic: (topicId: string) => Promise<void>;
  getTotalProgress: () => number;
}

export const useUserProgress = create<UserProgressStore>((set, get) => ({
  completedTopics: new Set(),
  totalTopics: 0,
  loading: true,

  fetchProgress: async (userId: string) => {
    set({ loading: true });
    try {
      // Busca o número total de tópicos no app
      const { count: totalTopicsCount, error: countError } = await supabase
        .from('Topics')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      // Busca os tópicos que o utilizador já completou
      const { data, error } = await supabase
        .from('user_topic_progress')
        .select('topic_id')
        .eq('user_id', userId);

      if (error) throw error;

      const completedSet = new Set(data.map(item => item.topic_id));
      
      set({
        completedTopics: completedSet,
        totalTopics: totalTopicsCount || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao buscar progresso do utilizador:", error);
      set({ loading: false });
    }
  },

  completeTopic: async (topicId: string) => {
    const userId = useAuth.getState().user?.id;
    if (!userId || get().completedTopics.has(topicId)) {
      return; // Não faz nada se o utilizador não estiver logado ou já tiver completado o tópico
    }

    try {
      const { error } = await supabase
        .from('user_topic_progress')
        .insert({ user_id: userId, topic_id: topicId });

      if (error) throw error;

      // Atualiza o estado local para refletir a mudança imediatamente
      set((state) => ({
        completedTopics: new Set(state.completedTopics).add(topicId),
      }));

      // Opcional: Atualizar os pontos do perfil do utilizador
      // Esta é uma lógica mais avançada que pode ser adicionada aqui
      // Ex: await supabase.rpc('increment_points', { user_id: userId, amount: 10 });

    } catch (error) {
      console.error("Erro ao completar tópico:", error);
    }
  },

  getTotalProgress: () => {
    const { completedTopics, totalTopics } = get();
    if (totalTopics === 0) return 0;
    const progressPercentage = (completedTopics.size / totalTopics) * 100;
    return Math.round(progressPercentage);
  },
}));

// Adiciona um listener para buscar o progresso quando o utilizador faz login
useAuth.subscribe(
  (state) => state.user,
  (user) => {
    if (user) {
      useUserProgress.getState().fetchProgress(user.id);
    }
  }
);
