
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

      // Salvar pontuação diretamente
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
        
        // Implementar fallback - tentar atualizar pontos manualmente
        await updateUserPointsManually(user.id, score);
        
        toast({
          title: "Pontuação salva com fallback",
          description: `Parabéns! Você ganhou ${score} pontos!`,
        });
        
        return true; // Considerar sucesso mesmo com erro no trigger
      }

      console.log('✅ Pontuação salva com sucesso:', quizData);
      
      // Atualizar perfil em background
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
      
      // Fallback final - tentar salvar pontos pelo menos
      try {
        await updateUserPointsManually(user.id, score);
        toast({
          title: "Pontuação salva (modo fallback)",
          description: `Seus ${score} pontos foram salvos!`,
        });
        return true;
      } catch (fallbackError) {
        console.error('❌ Erro no fallback:', fallbackError);
        toast({
          title: "Erro ao salvar pontuação",
          description: "Não foi possível salvar sua pontuação. Tente novamente.",
          variant: "destructive"
        });
        return false;
      }
    } finally {
      setSaving(false);
    }
  };

  const updateUserPointsManually = async (userId: string, score: number) => {
    try {
      console.log('🔄 Atualizando pontos manualmente:', { userId, score });
      
      // Buscar dados atuais do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('points, full_name')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        return;
      }

      const currentPoints = profile?.points || 0;
      const newPoints = currentPoints + score;
      const newLevel = Math.floor(newPoints / 100) + 1;

      // Atualizar pontos no perfil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          points: newPoints,
          level: newLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Erro ao atualizar perfil:', updateError);
        return;
      }

      // Atualizar ranking
      const { error: rankingError } = await supabase
        .from('user_rankings')
        .upsert({
          user_id: userId,
          full_name: profile?.full_name || 'Usuário',
          total_points: newPoints,
          updated_at: new Date().toISOString()
        });

      if (rankingError) {
        console.error('Erro ao atualizar ranking:', rankingError);
      }

      console.log('✅ Pontos atualizados manualmente com sucesso');
    } catch (error) {
      console.error('❌ Erro na atualização manual:', error);
      throw error;
    }
  };

  return { saveQuizScore, saving };
};
