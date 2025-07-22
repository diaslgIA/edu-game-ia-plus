
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  grande_tema?: string;
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
  const [error, setError] = useState<string | null>(null);

  const loadContents = useCallback(async () => {
    if (!subject) {
      console.log('⚠️ useSubjectContents: subject é vazio ou undefined');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔍 Buscando conteúdos para: "${subject}"`);
      
      const { data: contentsData, error: contentsError } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', subject)
        .order('order_index', { ascending: true });

      if (contentsError) {
        console.error('❌ Erro ao buscar conteúdos:', contentsError);
        setError(`Erro ao carregar conteúdos: ${contentsError.message}`);
        throw contentsError;
      }

      console.log(`✅ Conteúdos encontrados para "${subject}":`, contentsData?.length || 0);
      console.log('📄 Primeiros conteúdos:', contentsData?.slice(0, 3));
      
      setContents(contentsData || []);

      // Buscar progresso do usuário
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('content_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) {
          console.error('⚠️ Erro ao buscar progresso:', progressError);
        } else {
          console.log(`📊 Progresso encontrado: ${progressData?.length || 0} registros`);
          setProgress(progressData || []);
        }
      } else {
        console.log('👤 Usuário não autenticado - progresso não carregado');
      }
    } catch (error) {
      console.error('❌ Erro geral ao carregar conteúdos:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [subject]);

  const getGrandesTemas = useCallback(async (): Promise<string[]> => {
    if (!subject) return [];
    
    try {
      console.log(`🏷️ Buscando grandes temas para: "${subject}"`);
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .eq('subject', subject)
        .not('grande_tema', 'is', null);

      if (error) {
        console.error('❌ Erro ao buscar grandes temas:', error);
        return [];
      }
      
      const temasUnicos = [...new Set(data.map(item => item.grande_tema).filter(Boolean) as string[])];
      console.log(`✅ Grandes temas encontrados para "${subject}":`, temasUnicos);
      return temasUnicos;

    } catch (error) {
      console.error('❌ Erro na função getGrandesTemas:', error);
      return [];
    }
  }, [subject]);

  useEffect(() => {
    if (subject) {
      console.log(`🚀 useSubjectContents iniciado para: "${subject}"`);
      loadContents();
    } else {
      console.log('⚠️ useSubjectContents: subject não fornecido');
      setLoading(false);
    }
  }, [subject, loadContents]);

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
      
      await loadContents();
    } catch (error) {
      console.error('Erro ao atualizar progresso do conteúdo:', error);
    }
  };

  const getContentProgress = (contentId: string): ContentProgress | null => {
    return progress.find(p => p.content_id === contentId) || null;
  };

  return {
    contents,
    progress,
    loading,
    error,
    getGrandesTemas,
    updateContentProgress,
    getContentProgress,
    refreshContents: loadContents
  };
};
