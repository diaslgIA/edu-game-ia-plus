
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface LessonProgress {
  id: string;
  lesson_id: string;
  subject: string;
  completed: boolean;
  score: number;
  max_score: number;
  attempts: number;
  time_spent: number;
  hearts_remaining: number;
  perfect_score: boolean;
  last_attempt_at: string;
}

export const useLessonProgress = (subject: string) => {
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('lesson_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('subject', subject);

        if (error) throw error;
        setProgress(data || []);
      } catch (error) {
        console.error('Error fetching lesson progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user, subject]);

  const updateProgress = async (
    lessonId: string,
    updates: Partial<Omit<LessonProgress, 'id' | 'lesson_id' | 'subject'>>
  ) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          subject,
          ...updates,
          last_attempt_at: new Date().toISOString(),
        })
        .select();

      if (error) throw error;

      // Update local state
      setProgress(prev => {
        const existingIndex = prev.findIndex(p => p.lesson_id === lessonId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], ...updates };
          return updated;
        }
        return [...prev, data[0]];
      });

      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      return false;
    }
  };

  const getLessonProgress = (lessonId: string): LessonProgress | null => {
    return progress.find(p => p.lesson_id === lessonId) || null;
  };

  const isLessonUnlocked = (lessonIndex: number): boolean => {
    if (lessonIndex === 0) return true; // First lesson is always unlocked
    
    // Check if previous lesson is completed
    const previousProgress = progress.find(p => p.lesson_id === `lesson_${lessonIndex - 1}`);
    return previousProgress?.completed || false;
  };

  return {
    progress,
    loading,
    updateProgress,
    getLessonProgress,
    isLessonUnlocked,
  };
};
