
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useInlineActivities = (contentId: string, subject: string) => {
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const recordActivity = async (
    activityType: string,
    activityId: string,
    points: number,
    timeSpent: number = 30
  ) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'inline_activity',
          activity_subtype: activityType,
          subject,
          points_earned: points,
          time_spent: timeSpent,
          metadata: {
            content_id: contentId,
            activity_id: activityId
          }
        });

      if (error) {
        console.error('Erro ao registrar atividade:', error);
        return false;
      }

      setCompletedActivities(prev => new Set(prev).add(activityId));
      return true;
    } catch (error) {
      console.error('Erro inesperado ao registrar atividade:', error);
      return false;
    }
  };

  return {
    completedActivities,
    recordActivity
  };
};
