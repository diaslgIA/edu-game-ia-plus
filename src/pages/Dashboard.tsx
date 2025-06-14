
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SettingsModal from '@/components/SettingsModal';
import SoundControlPanel from '@/components/SoundControlPanel';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Target, BookOpen, Users, Brain, Star, Settings, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  const { getTotalProgress } = useUserProgress();
  const [showSettings, setShowSettings] = useState(false);

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  const handleSignOut = () => {
    if (!isMuted) playSound('click');
    signOut();
  };

  const handleSettingsClick = () => {
    if (!isMuted) playSound('click');
    setShowSettings(true);
  };

  const totalProgress = getTotalProgress();

  const stats = [
    { icon: Trophy, label: 'Pontos', value: profile?.points || 0, color: 'text-yellow-500' },
    { icon: Target, label: 'Nível', value: profile?.level || 1, color: 'text-blue-500' },
    { icon: BookOpen, label: 'Progresso', value: `${totalProgress}%`, color: 'text-green-500' },
    { icon: Users, label: 'Ranking', value: '#45', color: 'text-purple-500' },
  ];

  const quickActions = [
    {
      title: t('subjects'),
      description: 'Explore conteúdos por área',
      icon: '📚',
      color: 'from-blue-400 to-blue-600',
      path: '/subjects'
    },
    {
      title: t('exercises'),
      description: 'Pratique com atividades',
      icon: '✏️',
      color: 'from-green-400 to-green-600',
      path: '/exercises'
    },
    {
      title: 'Simulados',
      description: 'Teste seus conhecimentos',
      icon: '🎯',
      color: 'from-purple-400 to-purple-600',
      path: '/exercises'
    },
    {
      title: 'Ranking',
      description: 'Veja sua posição',
      icon: '🏆',
      color: 'from-yellow-400 to-yellow-600',
      path: '/ranking'
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header com Logo MUITO Destacada */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 rounded-b-2xl shadow-xl flex-shrink-0">
          {/* Logo Principal - SUPER DESTACADA */}
          <div className="flex justify-center mb-6 relative">
            {/* Efeito de destaque extra para a logo */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse scale-150"></div>
            <Logo 
              size="xl" 
              showText={true} 
              animated={true}
              className="transform hover:scale-110 transition-transform duration-500 relative z-10" 
            />
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-lg font-bold">
                Olá, {profile?.full_name?.split(' ')[0] || 'Estudante'}! 👋
              </h1>
              <p className="text-white/90 text-sm">
                {profile?.school_year} • Pronto para aprender?
              </p>
            </div>
            <div className="flex space-x-2">
              <SoundControlPanel />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSettingsClick}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2"
              >
                <Settings size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="text-white bg-red-500/40 hover:bg-red-500/60 border border-red-300/50 rounded-lg px-3 py-2 text-sm font-medium shadow-md"
              >
                <LogOut size={14} className="mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Stats Cards */}
          <div className="px-3 py-3">
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-white shadow-lg border border-white/10">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`${stat.color} w-5 h-5`} />
                    <div>
                      <p className="text-xs opacity-80">{stat.label}</p>
                      <p className="text-sm font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2">
            <h2 className="text-white text-sm font-semibold mb-3 flex items-center">
              <Brain className="mr-2" size={16} />
              Área de Estudos
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => handleNavigation(action.path)}
                  className={`bg-gradient-to-br ${action.color} text-white p-4 rounded-lg h-auto hover:scale-105 transition-all duration-200 shadow-lg border border-white/10`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <h3 className="font-bold text-sm">{action.title}</h3>
                    <p className="text-xs opacity-90">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Study Streak */}
          <div className="px-3 py-2">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-white shadow-lg border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Sequência de Estudos</h3>
                  <p className="text-xs opacity-80">Mantenha o ritmo!</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">7</div>
                  <div className="text-xs opacity-80">dias</div>
                </div>
              </div>
              <div className="flex space-x-1 mt-2">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i < 5 ? 'bg-yellow-400 shadow-lg' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-3 py-2 mb-3">
            <h2 className="text-white text-sm font-semibold mb-3">Atividade Recente</h2>
            <div className="space-y-2">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-white shadow-lg border border-white/10">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400" size={16} />
                  <div>
                    <p className="font-medium text-sm">Matemática - Função Quadrática</p>
                    <p className="text-xs opacity-80">Concluído • 85 pontos</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 text-white shadow-lg border border-white/10">
                <div className="flex items-center space-x-2">
                  <Star className="text-blue-400" size={16} />
                  <div>
                    <p className="font-medium text-sm">Português - Interpretação de Texto</p>
                    <p className="text-xs opacity-80">Em progresso • 42 pontos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </MobileContainer>
  );
};

export default Dashboard;
