
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Crown } from 'lucide-react';

const Ranking = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleBack = () => {
    playSound('click');
    navigate(-1); // Voltar para a página anterior
  };

  const players = [
    { position: 1, name: 'Marcela', points: 12500, avatar: '👩‍🦱', color: 'text-yellow-500' },
    { position: 2, name: 'Paulo', points: 9800, avatar: '👨‍💼', color: 'text-gray-400' },
    { position: 3, name: 'Roberta', points: 7050, avatar: '👩‍🎓', color: 'text-orange-500' },
  ];

  const handleContinue = () => {
    playSound('click');
    navigate(-1);
  };

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

        {/* Ranking table header */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 text-gray-600 font-medium">
            <span>Posição</span>
            <span>Usuário</span>
            <span>Pontos</span>
          </div>

          {/* Players list */}
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
                {/* Position with laurel */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`text-3xl ${player.color}`}>
                      {player.position === 1 && '🥇'}
                      {player.position === 2 && '🥈'}
                      {player.position === 3 && '🥉'}
                    </div>
                    <div className="absolute -top-1 -left-1 text-yellow-600 text-xs">
                      🌿
                    </div>
                    <div className="absolute -top-1 -right-1 text-yellow-600 text-xs">
                      🌿
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{player.position}</span>
                </div>

                {/* User info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-xl">
                    {player.avatar}
                  </div>
                  <span className="font-semibold text-gray-800">{player.name}</span>
                </div>

                {/* Points */}
                <div className="text-right">
                  <span className="text-xl font-bold text-gray-800">
                    {player.points.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

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
