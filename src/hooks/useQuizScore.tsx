
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useQuizScore = () => {
  const [saving, setSaving] = useState(false);
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const saveQuizScore = async (subject: string, score: number, totalQuestions: number, timeSpent: number) => {
    if (!user) return false;

    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('quiz_scores')
        .insert({
          user_id: user.id,
          subject,
          score,
          total_questions: totalQuestions,
          time_spent: timeSpent
        });

      if (error) {
        console.error('Erro ao salvar pontuação:', error);
        toast({
          title: "Erro ao salvar pontuação",
          description: "Não foi possível salvar sua pontuação.",
          variant: "destructive"
        });
        return false;
      }

      // Atualizar o perfil para mostrar os novos pontos
      await refreshProfile();
      
      toast({
        title: "Pontuação salva!",
        description: `+${score} pontos adicionados à sua conta!`,
      });

      return true;
    } catch (error) {
      console.error('Erro ao salvar pontuação:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saveQuizScore, saving };
};
