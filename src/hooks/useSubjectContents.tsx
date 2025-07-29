import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SubjectContent } from '@/types/subject-content';

interface ContentProgress {
  content_id: string;
  progress_percentage: number | null;
  completed: boolean | null;
  time_spent: number | null;
  last_accessed: string | null;
}

export const useSubjectContents = (subject: string) => {
  const [contents, setContents] = useState<SubjectContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ContentProgress[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('subject_contents')
          .select('*')
          .eq('subject', subject)
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Erro ao buscar conteúdos:', error);
        }

        if (data) {
          setContents(data as SubjectContent[]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [subject]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('content_progress')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Erro ao buscar progresso:', error);
        }

        if (data) {
          setProgress(data as ContentProgress[]);
        }
      } catch (error) {
        console.error('Erro ao buscar progresso:', error);
      }
    };

    fetchProgress();
  }, [user]);

  const updateContentProgress = async (
    contentId: string,
    updates: Partial<ContentProgress>
  ) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('content_progress')
        .upsert(
          {
            user_id: user.id,
            content_id: contentId,
            ...updates,
            last_accessed: new Date().toISOString(),
          },
          { onConflict: 'user_id, content_id' }
        )
        .select()

      if (error) {
        console.error('Erro ao atualizar progresso:', error);
        return false;
      }

      // Update local state
      setProgress((prevProgress) => {
        const existingProgressIndex = prevProgress.findIndex(
          (p) => p.content_id === contentId
        );

        if (existingProgressIndex > -1) {
          const updatedProgress = [...prevProgress];
          updatedProgress[existingProgressIndex] = {
            ...updatedProgress[existingProgressIndex],
            ...updates,
            content_id: contentId
          };
          return updatedProgress;
        } else {
          return [...prevProgress, { content_id: contentId, ...updates }];
        }
      });

      return true;
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      return false;
    }
  };

  const getContentProgress = (contentId: string) => {
    return progress.find((p) => p.content_id === contentId) || {
      content_id: contentId,
      progress_percentage: 0,
      completed: false,
      time_spent: 0,
      last_accessed: null
    };
  };

  return {
    contents,
    loading,
    getContentProgress,
    updateContentProgress,
  };
};
