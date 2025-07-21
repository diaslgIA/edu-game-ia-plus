
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserActivities = () => {
  const [recording, setRecording] = useState(false);
  const { user } = useAuth();

  const recordQuizQuestion = async (
    subject: string,
    topic: string,
    questionId: string,
    userAnswer: number,
    correctAnswer: number,
    timeSpent: number
  ) => {
    if (!user) return false;

    try {
      setRecording(true);
      console.log('Registrando questão:', { subject, topic, questionId, userAnswer, correctAnswer, timeSpent });

      // Gerar UUID válido para a questão
      const questionUuid = crypto.randomUUID();

      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'quiz_question',
          subject,
          topic,
          question_id: questionUuid,
          user_answer: userAnswer,
          correct_answer: correctAnswer,
          is_correct: userAnswer === correctAnswer,
          points_earned: userAnswer === correctAnswer ? 10 : 0,
          time_spent: timeSpent,
          metadata: {
            question_text: questionId,
            topic: topic
          }
        });

      if (error) {
        console.error('Erro ao registrar atividade da questão:', error);
        return false;
      }

      console.log('Questão registrada com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao registrar atividade da questão:', error);
      return false;
    } finally {
      setRecording(false);
    }
  };

  const recordQuizComplete = async (
    subject: string,
    finalScore: number,
    totalQuestions: number,
    totalTimeSpent: number
  ) => {
    if (!user) return false;

    try {
      console.log('Registrando conclusão do quiz:', { subject, finalScore, totalQuestions, totalTimeSpent });

      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: 'quiz_complete',
          subject,
          points_earned: finalScore,
          time_spent: totalTimeSpent,
          metadata: {
            total_questions: totalQuestions,
            score_percentage: Math.round((finalScore / (totalQuestions * 10)) * 100),
            average_time_per_question: Math.round(totalTimeSpent / totalQuestions)
          }
        });

      if (error) {
        console.error('Erro ao registrar conclusão do quiz:', error);
        return false;
      }

      console.log('Conclusão do quiz registrada com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao registrar conclusão do quiz:', error);
      return false;
    }
  };

  const getUserActivities = async (subject?: string, limit: number = 50) => {
    if (!user) return [];

    try {
      let query = supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (subject) {
        query = query.eq('subject', subject);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar atividades:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      return [];
    }
  };

  const getUserStats = async (subject?: string) => {
    if (!user) return null;

    try {
      let query = supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_type', 'quiz_question');

      if (subject) {
        query = query.eq('subject', subject);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar estatísticas:', error);
        return null;
      }

      const activities = data || [];
      const totalQuestions = activities.length;
      const correctAnswers = activities.filter(a => a.is_correct).length;
      const totalPoints = activities.reduce((sum, a) => sum + (a.points_earned || 0), 0);
      const avgTimePerQuestion = totalQuestions > 0 
        ? activities.reduce((sum, a) => sum + (a.time_spent || 0), 0) / totalQuestions 
        : 0;

      return {
        totalQuestions,
        correctAnswers,
        accuracy: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
        totalPoints,
        avgTimePerQuestion: Math.round(avgTimePerQuestion)
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return null;
    }
  };

  return {
    recordQuizQuestion,
    recordQuizComplete,
    getUserActivities,
    getUserStats,
    recording
  };
};
