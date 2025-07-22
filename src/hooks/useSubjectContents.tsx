
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// (Mantenha as interfaces SubjectContent e ContentProgress como estão)
interface SubjectContent {
  id: string;
  subject: string;
  title: string;
  description?: string;
  content_type: string;
  content_data?: any;
  difficulty_level?: string;
  estimated_time?: number;
  is_premium?: boolean;
  order_index?: number;
  created_at: string;
  updated_at: string;
  grande_tema?: string; // Garanta que esta propriedade exista
}

interface ContentProgress {
  id: string;
  user_id: string;
  content_id: string;
  completed: boolean;
  progress_percentage: number;
  time_spent: number;
  last_accessed: string;
  created_at: string;
}

export const useSubjectContents = (subject: string) => {
  const [contents, setContents] = useState<SubjectContent[]>([]);
  const [progress, setProgress] = useState<ContentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // (A função loadContents continua a mesma)
  const loadContents = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data: contentsData, error: contentsError } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', subject)
        .order('order_index', { ascending: true });

      if (contentsError) throw contentsError;
      setContents(contentsData || []);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('content_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;
        setProgress(progressData || []);
      }
    } catch (error) {
      console.error('Error loading contents:', error);
    } finally {
      setLoading(false);
    }
  }, [subject]);

  useEffect(() => {
    if (subject) {
      loadContents();
    }
  }, [subject, loadContents]);
  
  // NOVA FUNÇÃO ADICIONADA AQUI
  const getGrandesTemas = useCallback(async (): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .eq('subject', subject)
        .not('grande_tema', 'is', null);

      if (error) {
        console.error('Erro ao buscar grandes temas:', error);
        return [];
      }
      
      // Filtra para retornar apenas os temas únicos
      const temasUnicos = [...new Set(data.map(item => item.grande_tema).filter(Boolean) as string[])];
      return temasUnicos;

    } catch (error) {
      console.error('Erro na função getGrandesTemas:', error);
      return [];
    }
  }, [subject]);

  const updateContentProgress = async (contentId: string, progressData: Partial<ContentProgress>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('content_progress')
        .upsert({
          user_id: user.id,
          content_id: contentId,
          ...progressData
        });

      if (error) throw error;
      
      // Reload progress after update
      await loadContents();
    } catch (error) {
      console.error('Error updating content progress:', error);
    }
  };

  const getContentProgress = (contentId: string): ContentProgress | null => {
    return progress.find(p => p.content_id === contentId) || null;
  };

  return {
    contents,
    progress,
    loading,
    getGrandesTemas, // EXPORTAMOS A NOVA FUNÇÃO
    updateContentProgress,
    getContentProgress,
    refreshContents: loadContents
  };
};
