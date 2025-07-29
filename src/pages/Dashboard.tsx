
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useRankings } from '@/hooks/useRankings';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Users, 
  BookOpen,
  Settings, 
  Crown,
  Zap,
  Target,
  Gamepad2,
  Star,
  TrendingUp,
  Circle,
  Play,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { getTotalProgress, loading } = useUserProgress();
  const { rankings } = useRankings();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();

  useEffect(() => {
    // Dashboard initialization
  }, [user]);

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  const totalProgress = loading ? 0 : getTotalProgress();

  // Encontrar dados do usuário no ranking
  const userRanking = rankings.find(r => r.user_id === user?.id);
  const totalUsers = rankings.length;

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header com estatísticas pequenas - 3 cards horizontais */}
        <div className="bg-white/10 backdrop-blur-md p-4 mx-4 mt-4 rounded-2xl">
          <div className="grid grid-cols-3 gap-4">
            {/* Pontos */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy size={20} className="text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{profile?.points || 270}</div>
              <div className="text-white/60 text-xs">Pontos</div>
            </div>
            
            {/* Nível */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Circle size={20} className="text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-white/60 text-xs">Nível</div>
            </div>
            
            {/* Progresso */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Target size={20} className="text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{totalProgress}%</div>
              <div className="text-white/60 text-xs">Progresso</div>
            </div>
          </div>
        </div>

        {/* Card de Ranking do Usuário - Fundo laranja */}
        <div className="mx-4 mt-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🏆</div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-white">
                    {userRanking ? `${userRanking.position}° de ${totalUsers}` : '3° de 12'}
                  </span>
                  <TrendingUp size={16} className="text-white" />
                </div>
                <p className="text-white/90 text-sm font-medium">
                  Mestre dos Estudos
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-lg text-white">
                {profile?.points || 270} pontos
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Área de Estudos - Grid 2x2 */}
          <div className="mb-6">
            <h2 className="text-white text-xl font-bold mb-4">Área de Estudos</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Exercícios - Verde */}
              <div
                onClick={() => handleNavigation('/exercises')}
                className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all shadow-lg"
              >
                <div className="text-white">
                  <BookOpen size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Exercícios</h3>
                  <p className="text-green-100 text-sm">Pratique com atividades</p>
                </div>
              </div>

              {/* Guildas - Roxo */}
              <div
                onClick={() => handleNavigation('/guilds')}
                className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all shadow-lg"
              >
                <div className="text-white">
                  <Users size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Guildas</h3>
                  <p className="text-purple-100 text-sm">Colabore e compita</p>
                </div>
              </div>

              {/* Ranking - Amarelo */}
              <div
                onClick={() => handleNavigation('/rankings')}
                className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all shadow-lg"
              >
                <div className="text-white">
                  <Trophy size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Ranking</h3>
                  <p className="text-yellow-100 text-sm">Veja sua posição</p>
                </div>
              </div>

              {/* Perfil - Azul */}
              <div
                onClick={() => handleNavigation('/profile')}
                className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all shadow-lg"
              >
                <div className="text-white">
                  <Settings size={32} className="mb-3" />
                  <h3 className="font-bold text-lg mb-1">Perfil</h3>
                  <p className="text-blue-100 text-sm">Suas configurações</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sequência de Estudos */}
          <div className="mb-6">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold text-lg">Sequência de Estudos</h3>
                  <p className="text-white/70 text-sm">Mantenha o ritmo!</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">7</div>
                  <div className="text-white/60 text-xs">dias</div>
                </div>
              </div>
              
              {/* Barra de progresso da sequência */}
              <div className="bg-white/20 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: '71%' }}
                />
              </div>
              <p className="text-white/80 text-sm">5 de 7 dias concluídos</p>
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="mb-6">
            <h2 className="text-white text-xl font-bold mb-4">Atividade Recente</h2>
            
            <div className="space-y-3">
              {/* Atividade 1 - Concluída */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400" size={24} />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">Matemática - Função Quadrática</h3>
                    <p className="text-green-400 text-sm">Concluído • 85 pontos</p>
                  </div>
                  <Star className="text-yellow-400" size={20} />
                </div>
              </div>

              {/* Atividade 2 - Em progresso */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <Play className="text-blue-400" size={24} />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">Português - Interpretação de Texto</h3>
                    <p className="text-blue-400 text-sm">Em progresso • 42 pontos</p>
                  </div>
                  <Star className="text-yellow-400" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Dashboard;
