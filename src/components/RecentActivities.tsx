
import React, { useState, useEffect } from 'react';
import { useUserActivities } from '@/hooks/useUserActivities';
import { Star, Trophy, Clock } from 'lucide-react';

const RecentActivities = () => {
  const { getUserActivities } = useUserActivities();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await getUserActivities(undefined, 5); // Últimas 5 atividades
        const recentActivities = data.filter(activity => 
          activity.activity_type === 'quiz_complete'
        );
        setActivities(recentActivities);
      } catch (error) {
        console.error('Erro ao carregar atividades recentes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [getUserActivities]);

  if (loading) {
    return (
      <div className="space-y-1.5 sm:space-y-2">
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 animate-pulse">
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-3 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-400 flex-shrink-0" size={14} />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-xs sm:text-sm truncate">Nenhuma atividade recente</p>
            <p className="text-xs opacity-80 truncate">Complete um quiz para ver suas atividades</p>
          </div>
        </div>
      </div>
    );
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {activities.map((activity, index) => {
        const scorePercentage = activity.metadata?.score_percentage || 0;
        const isGoodScore = scorePercentage >= 70;
        
        return (
          <div key={activity.id || index} className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
            <div className="flex items-center space-x-2">
              {isGoodScore ? (
                <Trophy className="text-yellow-400 flex-shrink-0" size={14} />
              ) : (
                <Star className="text-blue-400 flex-shrink-0" size={14} />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-xs sm:text-sm truncate">
                  {activity.subject} - Quiz Completo
                </p>
                <div className="flex items-center space-x-2 text-xs opacity-80">
                  <span>{activity.points_earned} pontos</span>
                  <span>•</span>
                  <span>{scorePercentage}% acertos</span>
                  <span>•</span>
                  <span>{formatTimeAgo(activity.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivities;
