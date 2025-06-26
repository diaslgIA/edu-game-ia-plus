
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SubjectContent {
  id: string;
  subject: string;
  title: string;
  description: string;
  content_type: 'theory' | 'exercise' | 'video';
  content_data: any;
  difficulty_level: 'easy' | 'medium' | 'hard';
  estimated_time: number;
  is_premium: boolean;
  order_index: number;
}

interface ContentProgress {
  content_id: string;
  completed: boolean;
  progress_percentage: number;
  time_spent: number;
}

export const useSubjectContents = (subject: string) => {
  const { user } = useAuth();
  const [contents, setContents] = useState<SubjectContent[]>([]);
  const [progress, setProgress] = useState<ContentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subject) {
      loadContents();
      if (user) {
        loadProgress();
      }
    }
  }, [subject, user]);

  const loadContents = async () => {
    try {
      const { data, error } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', subject)
        .order('order_index');

      if (error) {
        console.error('Error loading contents:', error);
        return;
      }

      setContents(data || []);
    } catch (error) {
      console.error('Error loading contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('content_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading progress:', error);
        return;
      }

      setProgress(data || []);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const updateContentProgress = async (contentId: string, progressData: Partial<ContentProgress>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('content_progress')
        .upsert({
          user_id: user.id,
          content_id: contentId,
          ...progressData,
          last_accessed: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating progress:', error);
        return;
      }

      await loadProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getContentProgress = (contentId: string) => {
    return progress.find(p => p.content_id === contentId) || {
      content_id: contentId,
      completed: false,
      progress_percentage: 0,
      time_spent: 0
    };
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
