
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
      
      console.log('🎯 Iniciando salvamento de pontuação:', { 
        user_id: user.id, 
        subject, 
        score, 
        totalQuestions, 
        timeSpent 
      });

      // Verificar se o usuário tem perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, points')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('❌ Erro ao buscar perfil:', profileError);
        toast({
          title: "Erro de perfil",
          description: "Não foi possível acessar seu perfil. Tente fazer login novamente.",
          variant: "destructive"
        });
        return false;
      }

      console.log('✅ Perfil encontrado:', profile);

      // Tentar salvar a pontuação
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
        console.error('❌ Erro ao salvar pontuação no quiz_scores:', quizError);
        console.error('Detalhes do erro:', {
          code: quizError.code,
          message: quizError.message,
          details: quizError.details,
          hint: quizError.hint
        });
        
        toast({
          title: "Erro ao salvar pontuação",
          description: `Erro técnico: ${quizError.message}`,
          variant: "destructive"
        });
        return false;
      }

      console.log('✅ Pontuação salva com sucesso:', quizData);

      // Aguardar processamento do trigger
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar se o ranking foi atualizado
      const { data: ranking, error: rankingError } = await supabase
        .from('user_rankings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (rankingError) {
        console.error('⚠️ Erro ao verificar ranking:', rankingError);
      } else {
        console.log('✅ Ranking atualizado:', ranking);
      }

      // Atualizar o perfil
      await refreshProfile();
      
      toast({
        title: "Pontuação salva!",
        description: `+${score} pontos adicionados à sua conta!`,
      });

      return true;

    } catch (error) {
      console.error('❌ Erro inesperado ao salvar pontuação:', error);
      
      // Tentar identificar o tipo de erro
      if (error instanceof Error) {
        console.error('Mensagem do erro:', error.message);
        console.error('Stack trace:', error.stack);
      }
      
      toast({
        title: "Erro ao salvar pontuação",
        description: "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { saveQuizScore, saving };
};
