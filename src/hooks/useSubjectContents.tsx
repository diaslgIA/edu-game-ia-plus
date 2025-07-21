
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
  explanation?: string;
  detailed_explanation?: string;
  examples?: string;
  practical_applications?: string;
  study_tips?: string;
  key_concepts?: any; // Changed to any to handle Json type from Supabase
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

  const loadContents = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data: contentsData, error: contentsError } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', subject)
        .order('order_index', { ascending: true });

      if (contentsError) throw contentsError;
      
      console.log(`Loaded ${contentsData?.length || 0} contents for ${subject}`);
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
      
      const temasUnicos = [...new Set(data.map(item => item.grande_tema).filter(Boolean) as string[])];
      console.log(`Found ${temasUnicos.length} unique themes for ${subject}:`, temasUnicos);
      return temasUnicos;

    } catch (error) {
      console.error('Erro na função getGrandesTemas:', error);
      return [];
    }
  }, [subject]);

  const getContentsByTheme = useCallback((theme: string) => {
    return contents.filter(content => content.grande_tema === theme);
  }, [contents]);

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
    getGrandesTemas,
    getContentsByTheme,
    updateContentProgress,
    getContentProgress,
    refreshContents: loadContents
  };
};
