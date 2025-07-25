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

      const { error } = await supabase.rpc('register_quiz_question_activity', {
        p_subject: subject,
        p_topic: topic,
        p_question_id: questionId,
        p_user_answer: userAnswer,
        p_correct_answer: correctAnswer,
        p_time_spent: timeSpent
      });

      if (error) {
        console.error('Erro ao registrar atividade:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao registrar atividade:', error);
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
            average_time_per_question: totalTimeSpent / totalQuestions
          }
        });

      if (error) {
        console.error('Erro ao registrar conclusão do quiz:', error);
        return false;
      }

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
      const avgTimePerQuestion = activities.reduce((sum, a) => sum + (a.time_spent || 0), 0) / totalQuestions;

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