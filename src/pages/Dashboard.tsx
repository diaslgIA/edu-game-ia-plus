
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
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
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, updateLastLogin } = useAuth();
  const { getTotalProgress, loading } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();

  useEffect(() => {
    if (user) {
      updateLastLogin();
    }
  }, [user, updateLastLogin]);

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  const totalProgress = loading ? 0 : getTotalProgress();

  // Menu principal com foco em guilds, rankings e configurações
  const mainMenuItems = [
    {
      id: 'guilds',
      title: 'Guildas',
      description: 'Junte-se a outros estudantes',
      icon: Users,
      color: 'from-blue-500 to-blue-700',
      path: '/guilds',
      isNew: false
    },
    {
      id: 'rankings',
      title: 'Rankings',
      description: 'Veja sua posição no ranking',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-700',
      path: '/rankings',
      isNew: false
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Personalize sua experiência',
      icon: Settings,
      color: 'from-gray-500 to-gray-700',
      path: '/settings',
      isNew: false
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header com saudação */}
        <div className="bg-white/15 backdrop-blur-md text-white p-6 rounded-b-3xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">
                Olá, {user?.user_metadata?.full_name || 'Estudante'}! 👋
              </h1>
              <p className="text-white/80">Pronto para estudar hoje?</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Crown size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">Nível 1</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap size={16} className="text-blue-400" />
                <span className="text-sm">0 pontos</span>
              </div>
            </div>
          </div>
          
          {/* Barra de progresso geral */}
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <p className="text-white/80 text-sm">Progresso geral: {totalProgress}%</p>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Menu principal */}
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center space-x-2">
              <Gamepad2 size={24} />
              <span>Menu Principal</span>
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {mainMenuItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10 relative"
                >
                  {item.isNew && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      NOVO
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                      <item.icon size={28} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                    
                    <div className="text-white/60 text-2xl">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estatísticas rápidas */}
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center space-x-2">
              <TrendingUp size={24} />
              <span>Suas Estatísticas</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
                <div className="text-white/80 text-sm">Quizzes Concluídos</div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">0</div>
                <div className="text-white/80 text-sm">Pontos Ganhos</div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
                <div className="text-white/80 text-sm">Guildas Ativas</div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">-</div>
                <div className="text-white/80 text-sm">Posição Ranking</div>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="mb-6">
            <h2 className="text-white text-xl font-bold mb-4 flex items-center space-x-2">
              <Target size={24} />
              <span>Ações Rápidas</span>
            </h2>
            
            <div className="space-y-3">
              <Button
                onClick={() => handleNavigation('/profile')}
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                variant="outline"
              >
                <BookOpen className="mr-2" size={20} />
                Ver Meu Perfil
              </Button>
              
              <Button
                onClick={() => handleNavigation('/subscription')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Star className="mr-2" size={20} />
                Upgrade Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Dashboard;
