
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useQuizScore = () => {
  const [saving, setSaving] = useState(false);
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const saveQuizScore = async (subject: string, score: number, totalQuestions: number, timeSpent: number) => {
    if (!user) {
      console.error('Usuário não autenticado');
      return false;
    }

    try {
      setSaving(true);
      
      console.log('Salvando pontuação do quiz:', { subject, score, totalQuestions, timeSpent });
      
      const { data, error } = await supabase
        .from('quiz_scores')
        .insert({
          user_id: user.id,
          subject,
          score,
          total_questions: totalQuestions,
          time_spent: timeSpent
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar pontuação:', error);
        toast({
          title: "Erro ao salvar pontuação",
          description: "Não foi possível salvar sua pontuação. Tente novamente.",
          variant: "destructive"
        });
        return false;
      }

      console.log('Pontuação salva com sucesso:', data);

      // Atualizar o perfil para mostrar os novos pontos
      await refreshProfile();
      
      toast({
        title: "Pontuação salva!",
        description: `+${score} pontos adicionados à sua conta!`,
      });

      return true;
    } catch (error) {
      console.error('Erro inesperado ao salvar pontuação:', error);
      toast({
        title: "Erro ao salvar pontuação",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saveQuizScore, saving };
};
