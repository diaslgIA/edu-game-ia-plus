
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ActivityResult {
  activityType: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
}

export const useInteractiveActivities = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const recordActivityResult = async (
    contentId: string,
    subject: string,
    result: ActivityResult
  ) => {
    if (!user) return false;

    try {
      setLoading(true);

      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'interactive_activity',
          activity_subtype: result.activityType,
          subject,
          points_earned: result.score,
          time_spent: result.timeSpent,
          interaction_data: {
            total_questions: result.totalQuestions,
            accuracy: (result.score / (result.totalQuestions * 10)) * 100
          },
          metadata: {
            content_id: contentId
          }
        });

      if (error) throw error;

      toast({
        title: "Atividade concluída!",
        description: `Você ganhou ${result.score} pontos!`,
      });

      return true;
    } catch (error) {
      console.error('Erro ao registrar atividade:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const awardBadge = async (
    badge: {
      badge_id: string;
      badge_name: string;
      badge_description: string;
      badge_icon: string;
      subject: string;
      content_id: string;
      points_awarded: number;
    }
  ) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_badges')
        .insert({
          user_id: user.id,
          ...badge
        });

      if (error) {
        // Se for erro de badge já existente, ignora
        if (error.code === '23505') return true;
        throw error;
      }

      toast({
        title: "Conquista desbloqueada!",
        description: `${badge.badge_icon} ${badge.badge_name} - +${badge.points_awarded} pontos!`,
      });

      return true;
    } catch (error) {
      console.error('Erro ao dar badge:', error);
      return false;
    }
  };

  return {
    recordActivityResult,
    awardBadge,
    loading
  };
};
