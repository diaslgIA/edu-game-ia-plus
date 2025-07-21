
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
      console.log('Salvando pontuação:', { subject, score, totalQuestions, timeSpent });
      
      // Salvar na tabela quiz_scores
      const { error: scoreError } = await supabase
        .from('quiz_scores')
        .insert({
          user_id: user.id,
          subject,
          score,
          total_questions: totalQuestions,
          time_spent: timeSpent
        });

      if (scoreError) {
        console.error('Erro ao salvar pontuação:', scoreError);
        toast({
          title: "Erro ao salvar pontuação",
          description: "Não foi possível salvar sua pontuação.",
          variant: "destructive"
        });
        return false;
      }

      // Atualizar pontos do usuário no perfil
      const { data: currentProfile, error: profileFetchError } = await supabase
        .from('profiles')
        .select('points, level')
        .eq('id', user.id)
        .single();

      if (profileFetchError) {
        console.error('Erro ao buscar perfil atual:', profileFetchError);
      }

      const currentPoints = currentProfile?.points || 0;
      const newPoints = currentPoints + score;
      const newLevel = Math.floor(newPoints / 100) + 1;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          points: newPoints,
          level: newLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Erro ao atualizar perfil:', updateError);
        toast({
          title: "Erro ao atualizar pontos",
          description: "Pontuação salva, mas não foi possível atualizar seus pontos.",
          variant: "destructive"
        });
        return false;
      }

      // Registrar atividade recente
      const { error: activityError } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'quiz_complete',
          subject,
          points_earned: score,
          time_spent: timeSpent,
          metadata: {
            total_questions: totalQuestions,
            score_percentage: Math.round((score / (totalQuestions * 10)) * 100)
          }
        });

      if (activityError) {
        console.error('Erro ao registrar atividade:', activityError);
      }

      // Atualizar o progresso da matéria
      const { data: existingProgress } = await supabase
        .from('subject_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('subject', subject)
        .single();

      if (existingProgress) {
        const newCompletedActivities = existingProgress.completed_activities + 1;
        const newProgressPercentage = Math.min(
          Math.round((newCompletedActivities / existingProgress.total_activities) * 100),
          100
        );

        await supabase
          .from('subject_progress')
          .update({
            completed_activities: newCompletedActivities,
            progress_percentage: newProgressPercentage,
            last_activity_date: new Date().toISOString()
          })
          .eq('id', existingProgress.id);
      } else {
        await supabase
          .from('subject_progress')
          .insert({
            user_id: user.id,
            subject,
            completed_activities: 1,
            total_activities: 50,
            progress_percentage: 2,
            last_activity_date: new Date().toISOString()
          });
      }

      // Atualizar o perfil para mostrar os novos pontos
      await refreshProfile();
      
      toast({
        title: "Pontuação salva!",
        description: `+${score} pontos adicionados à sua conta!`,
      });

      console.log('Pontuação salva com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao salvar pontuação:', error);
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
