
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useQuizScore = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveQuizScore = async (
    subject: string,
    score: number,
    totalQuestions: number,
    timeSpent?: number,
    topic?: string
  ) => {
    setIsLoading(true);
    
    try {
      console.log('Iniciando salvamento da pontuação:', { subject, score, totalQuestions, timeSpent, topic });
      
      // Verificar se o usuário está autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error('Erro de autenticação:', authError);
        throw new Error('Usuário não autenticado');
      }

      // 1. Salvar pontuação do quiz
      const { error: scoreError } = await supabase
        .from('quiz_scores')
        .insert({
          user_id: user.id,
          subject,
          score,
          total_questions: totalQuestions,
          time_spent: timeSpent || 0
        });

      if (scoreError) {
        console.error('Erro ao salvar pontuação:', scoreError);
        throw scoreError;
      }

      console.log('Pontuação salva com sucesso');

      // 2. Atualizar pontos do perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('points, level')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        throw profileError;
      }

      const currentPoints = profile?.points || 0;
      const newPoints = currentPoints + (score * 10); // 10 pontos por acerto
      const newLevel = Math.max(1, Math.floor(newPoints / 100) + 1);

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
        throw updateError;
      }

      console.log('Perfil atualizado com sucesso:', { newPoints, newLevel });

      // 3. Registrar atividade recente
      const { error: activityError } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'quiz_complete',
          subject,
          topic: topic || 'Quiz Geral',
          points_earned: score * 10,
          time_spent: timeSpent || 0,
          metadata: {
            score,
            total_questions: totalQuestions,
            accuracy: (score / totalQuestions) * 100
          }
        });

      if (activityError) {
        console.error('Erro ao registrar atividade:', activityError);
        // Não falhar por causa da atividade, apenas logar
      } else {
        console.log('Atividade registrada com sucesso');
      }

      // 4. Atualizar progresso da matéria
      const { data: subjectProgress, error: progressFetchError } = await supabase
        .from('subject_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('subject', subject)
        .maybeSingle();

      if (progressFetchError) {
        console.error('Erro ao buscar progresso da matéria:', progressFetchError);
      } else {
        const currentActivities = subjectProgress?.completed_activities || 0;
        const newCompletedActivities = currentActivities + 1;
        const progressPercentage = Math.min(100, (newCompletedActivities / 50) * 100);

        if (subjectProgress) {
          // Atualizar progresso existente
          const { error: progressUpdateError } = await supabase
            .from('subject_progress')
            .update({
              completed_activities: newCompletedActivities,
              progress_percentage: progressPercentage,
              last_activity_date: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('id', subjectProgress.id);

          if (progressUpdateError) {
            console.error('Erro ao atualizar progresso:', progressUpdateError);
          }
        } else {
          // Criar novo progresso
          const { error: progressCreateError } = await supabase
            .from('subject_progress')
            .insert({
              user_id: user.id,
              subject,
              completed_activities: newCompletedActivities,
              progress_percentage: progressPercentage,
              last_activity_date: new Date().toISOString()
            });

          if (progressCreateError) {
            console.error('Erro ao criar progresso:', progressCreateError);
          }
        }
      }

      toast.success(`Parabéns! Você ganhou ${score * 10} pontos!`);
      return { success: true, pointsEarned: score * 10 };

    } catch (error) {
      console.error('Erro detalhado ao salvar pontuação:', error);
      toast.error('Erro ao salvar pontuação - Tente novamente');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveQuizScore,
    isLoading
  };
};
