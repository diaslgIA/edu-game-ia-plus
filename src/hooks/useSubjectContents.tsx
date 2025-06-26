
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (subject) {
      loadContents();
    }
  }, [subject]);

  const loadContents = async () => {
    try {
      setLoading(true);
      
      // Load subject contents
      const { data: contentsData, error: contentsError } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', subject)
        .order('order_index', { ascending: true });

      if (contentsError) {
        console.error('Error loading contents:', contentsError);
        return;
      }

      setContents(contentsData || []);

      // Load user progress
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('content_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) {
          console.error('Error loading progress:', progressError);
        } else {
          setProgress(progressData || []);
        }
      }
    } catch (error) {
      console.error('Error loading contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContentProgress = async (contentId: string, progressData: Partial<ContentProgress>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Use upsert to handle duplicates
      const { error } = await supabase
        .from('content_progress')
        .upsert({
          user_id: user.id,
          content_id: contentId,
          ...progressData,
          last_accessed: new Date().toISOString()
        }, {
          onConflict: 'user_id,content_id'
        });

      if (error) {
        console.error('Error updating progress:', error);
        return;
      }

      // Refresh progress
      await loadContents();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getContentProgress = (contentId: string) => {
    return progress.find(p => p.content_id === contentId);
  };

  return {
    contents,
    progress,
    loading,
    updateContentProgress,
    getContentProgress,
    refreshContents: loadContents
  };
};
