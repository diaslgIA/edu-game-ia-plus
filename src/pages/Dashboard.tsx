
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SettingsModal from '@/components/SettingsModal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Target, BookOpen, Users, Brain, Star, Settings } from 'lucide-react';
import Logo from '@/components/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();
  const { playSound } = useSound();
  const [showSettings, setShowSettings] = useState(false);

  const handleNavigation = (path: string) => {
    playSound('click');
    navigate(path);
  };

  const stats = [
    { icon: Trophy, label: 'Pontos', value: profile?.points || 0, color: 'text-yellow-500' },
    { icon: Target, label: 'Nível', value: profile?.level || 1, color: 'text-blue-500' },
    { icon: BookOpen, label: 'Módulos', value: '12', color: 'text-green-500' },
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
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <Logo size="md" showText={false} animated />
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-white/80 hover:text-white"
              >
                <Settings size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={signOut}
                className="text-white/80 hover:text-white"
              >
                Sair
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Olá, {profile?.full_name || 'Estudante'}! 👋
            </h1>
            <p className="text-white/80 text-sm">
              {profile?.school_year} • Pronto para aprender hoje?
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white">
                <div className="flex items-center space-x-3">
                  <stat.icon className={`${stat.color} w-6 h-6`} />
                  <div>
                    <p className="text-xs opacity-80">{stat.label}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-2">
          <h2 className="text-white text-lg font-semibold mb-4 flex items-center">
            <Brain className="mr-2" size={20} />
            Área de Estudos
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={() => handleNavigation(action.path)}
                className={`bg-gradient-to-br ${action.color} text-white p-6 rounded-2xl h-auto hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <h3 className="font-bold text-sm">{action.title}</h3>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <div className="px-6 py-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Sequência de Estudos</h3>
                <p className="text-sm opacity-80">Mantenha o ritmo!</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">7</div>
                <div className="text-xs opacity-80">dias</div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${
                    i < 5 ? 'bg-yellow-400' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-6 py-2 flex-1">
          <h2 className="text-white text-lg font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center space-x-3">
                <Star className="text-yellow-400" size={20} />
                <div>
                  <p className="font-medium">Matemática - Função Quadrática</p>
                  <p className="text-xs opacity-80">Concluído • 85 pontos</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
              <div className="flex items-center space-x-3">
                <Star className="text-blue-400" size={20} />
                <div>
                  <p className="font-medium">Português - Interpretação de Texto</p>
                  <p className="text-xs opacity-80">Em progresso • 42 pontos</p>
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
