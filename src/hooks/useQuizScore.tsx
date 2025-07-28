
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

      // Tentar salvar com retry em caso de erro
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
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
            console.error(`❌ Erro ao salvar pontuação (tentativa ${attempts + 1}):`, quizError);
            
            if (attempts === maxAttempts - 1) {
              // Última tentativa - mostrar erro
              if (quizError.code === '23505') {
                toast({
                  title: "Dados duplicados",
                  description: "Esta pontuação já foi salva anteriormente.",
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
            
            attempts++;
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
            continue;
          }

          console.log('✅ Pontuação salva com sucesso:', quizData);
          
          // Aguardar um pouco para o trigger processar
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Atualizar o perfil do usuário
          try {
            await refreshProfile();
          } catch (refreshError) {
            console.error('Erro ao atualizar perfil:', refreshError);
            // Não falhar por causa do refresh
          }
          
          toast({
            title: "Quiz concluído!",
            description: `Parabéns! Você ganhou ${score} pontos!`,
          });

          return true;
        } catch (innerError) {
          console.error(`❌ Erro inesperado na tentativa ${attempts + 1}:`, innerError);
          attempts++;
          
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          }
        }
      }

      // Se chegou aqui, todas as tentativas falharam
      toast({
        title: "Erro ao salvar pontuação",
        description: "Não foi possível salvar sua pontuação após várias tentativas.",
        variant: "destructive"
      });
      return false;

    } catch (error) {
      console.error('❌ Erro inesperado geral:', error);
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
