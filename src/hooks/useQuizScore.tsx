
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
      console.error('❌ Usuário não autenticado');
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para salvar pontuações.",
        variant: "destructive"
      });
      return false;
    }

    try {
      setSaving(true);
      
      console.log('🎯 Salvando pontuação do quiz:', { 
        user_id: user.id, 
        subject, 
        score, 
        totalQuestions, 
        timeSpent 
      });

      // Salvar pontuação com tratamento de erro melhorado
      const { data: quizData, error: quizError } = await supabase
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

      if (quizError) {
        console.error('❌ Erro ao salvar pontuação:', quizError);
        
        // Tratamento específico para diferentes tipos de erro
        if (quizError.code === '23505') {
          toast({
            title: "Dados duplicados",
            description: "Esta pontuação já foi salva anteriormente.",
            variant: "destructive"
          });
        } else if (quizError.code === '42501') {
          toast({
            title: "Erro de permissão",
            description: "Você não tem permissão para salvar pontuações.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro ao salvar pontuação",
            description: "Não foi possível salvar sua pontuação. Tente novamente.",
            variant: "destructive"
          });
        }
        return false;
      }

      console.log('✅ Pontuação salva com sucesso:', quizData);
      
      // Tentar atualizar o perfil, mas não falhar se der erro
      try {
        await refreshProfile();
        console.log('✅ Perfil atualizado com sucesso');
      } catch (refreshError) {
        console.error('⚠️ Erro ao atualizar perfil (não crítico):', refreshError);
      }
      
      toast({
        title: "Quiz concluído!",
        description: `Parabéns! Você ganhou ${score} pontos!`,
      });

      return true;

    } catch (error) {
      console.error('❌ Erro inesperado ao salvar pontuação:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao salvar sua pontuação.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saveQuizScore, saving };
};
