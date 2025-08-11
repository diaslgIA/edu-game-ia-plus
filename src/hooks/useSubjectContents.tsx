import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SubjectContent } from '@/types/subject-content';
import { getDbSubjects } from '@/utils/subjectMapping';

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
        const dbSubjects = getDbSubjects(subject);
        console.log('Fetching contents for mapped subjects:', dbSubjects);
        
        const { data, error } = await supabase
          .from('subject_contents')
          .select('*')
          .in('subject', dbSubjects)
          .order('order_index', { ascending: true });

        if (error) {
          console.error('Erro ao buscar conteúdos:', error);
        }

        if (data) {
          console.log(`Found ${data.length} content items for ${subject}`);
          setContents(data as SubjectContent[]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, [subject]);

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

  useEffect(() => {
    fetchProgress();
  }, [user]);

  const updateContentProgress = async (
    contentId: string,
    updates: Partial<Omit<ContentProgress, 'content_id'>>
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
            content_id: contentId,
            progress_percentage: updates.progress_percentage ?? updatedProgress[existingProgressIndex].progress_percentage,
            completed: updates.completed ?? updatedProgress[existingProgressIndex].completed,
            time_spent: updates.time_spent ?? updatedProgress[existingProgressIndex].time_spent,
            last_accessed: new Date().toISOString()
          };
          return updatedProgress;
        } else {
          return [...prevProgress, { 
            content_id: contentId, 
            progress_percentage: updates.progress_percentage ?? null,
            completed: updates.completed ?? null,
            time_spent: updates.time_spent ?? null,
            last_accessed: new Date().toISOString()
          }];
        }
      });

      return true;
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      return false;
    }
  };

  const getContentProgress = (contentId: string): ContentProgress => {
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
