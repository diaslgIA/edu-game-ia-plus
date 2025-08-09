
import React from 'react';
import { useRankings } from '@/hooks/useRankings';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, Medal, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserRankingCard = () => {
  const { rankings, loading, fetchRankings } = useRankings();
  const { user } = useAuth();

  if (loading || !user) {
    return (
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <Button 
            onClick={fetchRankings}
            variant="outline" 
            size="sm"
            className="mt-2"
          >
            <RefreshCw size={12} className="mr-1" />
            Atualizar
          </Button>
        </div>
      </Card>
    );
  }

  const userRanking = rankings.find(r => r.user_id === user.id);
  const totalUsers = rankings.length;

  if (!userRanking) {
    return (
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Medal className="text-gray-400" size={24} />
            <div>
              <p className="text-sm text-gray-600">Sua Posição no Ranking</p>
              <p className="font-semibold text-gray-700">Ainda não classificado</p>
              <p className="text-xs text-gray-500">Complete um quiz para entrar no ranking!</p>
            </div>
          </div>
          <Button 
            onClick={fetchRankings}
            variant="outline" 
            size="sm"
          >
            <RefreshCw size={12} />
          </Button>
        </div>
      </Card>
    );
  }

  const getCardGradient = () => {
    if (userRanking.position === 1) return 'from-yellow-100 to-orange-100 border-yellow-300';
    if (userRanking.position === 2) return 'from-gray-100 to-gray-200 border-gray-300';
    if (userRanking.position === 3) return 'from-orange-100 to-orange-200 border-orange-300';
    if (userRanking.position <= 10) return 'from-blue-50 to-purple-50 border-blue-200';
    return 'from-gray-50 to-blue-50 border-gray-200';
  };

  return (
    <Card className={`p-4 bg-gradient-to-r ${getCardGradient()} border-2`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">
            {userRanking.badge || '📚'}
          </div>
          <div>
            <p className="text-sm text-gray-600">Sua Posição no Ranking</p>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-800">
                {userRanking.position}° de {totalUsers}
              </span>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            {userRanking.title && (
              <p className="text-xs font-medium text-blue-600">
                {userRanking.title}
              </p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <Trophy size={16} className="text-yellow-500" />
            <span className="font-bold text-lg text-gray-800">
              {userRanking.total_points}
            </span>
          </div>
          <p className="text-xs text-gray-600">pontos</p>
        </div>
      </div>
      
      {userRanking.position === 1 && (
        <div className="mt-2 text-center">
          <span className="inline-flex items-center space-x-1 bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            <span>👑</span>
            <span>Herói da Educação</span>
          </span>
        </div>
      )}
    </Card>
  );
};

export default UserRankingCard;
