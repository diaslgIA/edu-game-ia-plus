
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useSound } from '@/contexts/SoundContext';
import { useRankings } from '@/hooks/useRankings';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Crown, Loader2, RefreshCw } from 'lucide-react';

const Ranking = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const { rankings, loading, fetchRankings } = useRankings();

  const handleBack = () => {
    playSound('click');
    navigate(-1);
  };

  const handleContinue = () => {
    playSound('click');
    navigate(-1);
  };

  const handleRetry = () => {
    playSound('click');
    fetchRankings();
  };

  if (loading) {
    return (
      <MobileContainer background="light">
        <div className="flex flex-col h-full pb-20 items-center justify-center">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
          <p className="text-gray-600 mb-4">Carregando ranking...</p>
          <Button 
            onClick={handleRetry}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw size={16} />
            <span>Tentar novamente</span>
          </Button>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBack}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Ranking de jogadores</span>
            <div className="flex items-center space-x-1">
              <Trophy size={20} className="text-yellow-400" />
              <Crown size={16} className="text-yellow-400" />
            </div>
          </h1>
        </div>

        {/* Ranking content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {rankings.length === 0 ? (
            <div className="text-center py-8">
              <Trophy className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 mb-2">Nenhum jogador no ranking ainda.</p>
              <p className="text-gray-500 text-sm mb-4">Seja o primeiro a pontuar!</p>
              <Button 
                onClick={handleRetry}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RefreshCw size={16} />
                <span>Atualizar</span>
              </Button>
            </div>
          ) : (
            <>
              {/* Ranking table header */}
              <div className="flex justify-between items-center mb-6 text-gray-600 font-medium">
                <span>Posição</span>
                <span>Usuário</span>
                <span>Pontos</span>
              </div>

              {/* Players list */}
              <div className="space-y-4">
                {rankings.map((player) => (
                  <div 
                    key={player.id} 
                    className={`rounded-2xl p-6 shadow-sm flex items-center justify-between ${
                      player.position === 1 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' 
                        : 'bg-white'
                    }`}
                  >
                    {/* Position with badge */}
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="text-3xl">
                          {player.badge || '📚'}
                        </div>
                        {player.position === 1 && (
                          <>
                            <div className="absolute -top-1 -left-1 text-yellow-600 text-xs">🌿</div>
                            <div className="absolute -top-1 -right-1 text-yellow-600 text-xs">🌿</div>
                          </>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{player.position}°</div>
                        {player.title && (
                          <div className={`text-xs font-medium ${
                            player.position === 1 ? 'text-yellow-700' : 'text-gray-600'
                          }`}>
                            {player.title}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User info */}
                    <div className="flex items-center space-x-3 flex-1 justify-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        player.position === 1 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                          : player.position === 2
                          ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                          : player.position === 3
                          ? 'bg-gradient-to-br from-orange-300 to-orange-500'
                          : 'bg-gradient-to-br from-blue-400 to-purple-600'
                      }`}>
                        {player.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-center">
                        <span className="font-semibold text-gray-800 block">{player.full_name}</span>
                        {player.position === 1 && (
                          <span className="text-xs text-yellow-700 font-medium">
                            👑 Herói da Educação
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <span className={`text-xl font-bold ${
                        player.position === 1 ? 'text-yellow-700' : 'text-gray-800'
                      }`}>
                        {player.total_points.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 block">pontos</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Continue button */}
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handleContinue}
              className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-2xl"
            >
              <span className="text-2xl">»</span>
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Ranking;
