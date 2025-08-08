
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useUserActivities } from '@/hooks/useUserActivities';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SettingsModal from '@/components/SettingsModal';
import SoundControlPanel from '@/components/SoundControlPanel';
import UserRankingCard from '@/components/UserRankingCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Target, BookOpen, Users, Brain, Star, Settings, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  const { getTotalProgress } = useUserProgress();
  const { getUserActivities } = useUserActivities();
  const [showSettings, setShowSettings] = useState(false);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  // Fetch recent activities
  useEffect(() => {
    const fetchRecentActivities = async () => {
      if (!user) return;
      
      setActivitiesLoading(true);
      try {
        const activities = await getUserActivities(undefined, 5);
        setRecentActivities(activities);
      } catch (error) {
        console.error('Erro ao buscar atividades recentes:', error);
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchRecentActivities();
  }, [user, getUserActivities]);

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
  const currentStreak = profile?.login_streak || 0;

  const stats = [
    { icon: Trophy, label: 'Pontos', value: profile?.points || 0, color: 'text-yellow-500' },
    { icon: Target, label: 'Nível', value: profile?.level || 1, color: 'text-blue-500' },
    { icon: BookOpen, label: 'Progresso', value: `${totalProgress}%`, color: 'text-green-500' },
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
      title: 'Guildas',
      description: 'Colabore e compita',
      icon: '⚔️',
      color: 'from-purple-400 to-purple-600',
      path: '/guilds'
    },
    {
      title: 'Ranking',
      description: 'Veja sua posição',
      icon: '🏆',
      color: 'from-yellow-400 to-yellow-600',
      path: '/ranking'
    }
  ];

  const getActivityLabel = (activityType: string) => {
    switch (activityType) {
      case 'quiz_complete':
        return 'Quiz';
      case 'quiz_question':
        return 'Questão';
      case 'interactive_activity':
        return 'Atividade Interativa';
      default:
        return 'Atividade';
    }
  };

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'quiz_complete':
      case 'quiz_question':
        return Star;
      case 'interactive_activity':
        return BookOpen;
      default:
        return Star;
    }
  };

  const getActivityIconColor = (activityType: string) => {
    switch (activityType) {
      case 'quiz_complete':
      case 'quiz_question':
        return 'text-yellow-400';
      case 'interactive_activity':
        return 'text-blue-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full min-h-screen">
        {/* Header Compacto e Responsivo */}
        <div className="bg-white/20 backdrop-blur-lg text-white p-2 sm:p-3 rounded-b-2xl shadow-xl flex-shrink-0 border-b border-white/10">
          <div className="flex items-center justify-between">
            {/* Logo e saudação */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20 flex-shrink-0">
                <Logo size="sm" showText={false} className="transform hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-xs sm:text-sm font-bold truncate">
                  Olá, {profile?.full_name?.split(' ')[0] || 'Estudante'}!
                </h1>
                <p className="text-white/90 text-xs truncate">
                  Vamos aprender?
                </p>
              </div>
            </div>
            
            {/* Controles no lado direito */}
            <div className="flex items-center space-x-1 flex-shrink-0">
              <SoundControlPanel />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSettingsClick}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 min-w-0"
              >
                <Settings size={12} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                className="text-white bg-red-500/40 hover:bg-red-500/60 border border-red-300/50 rounded-lg px-1.5 py-1 text-xs font-medium shadow-md min-w-0"
              >
                <LogOut size={10} className="mr-0.5" />
                <span className="hidden xs:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Stats Cards */}
          <div className="px-2 sm:px-3 py-2 sm:py-3">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <stat.icon className={`${stat.color} w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs opacity-80 truncate">{stat.label}</p>
                      <p className="text-xs sm:text-sm font-bold truncate">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Ranking Card - Novo componente em tempo real */}
          <div className="px-2 sm:px-3 py-1 sm:py-2">
            <UserRankingCard />
          </div>

          {/* Quick Actions */}
          <div className="px-2 sm:px-3 py-1 sm:py-2">
            <h2 className="text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3 flex items-center">
              <Brain className="mr-1.5 sm:mr-2 flex-shrink-0" size={14} />
              Área de Estudos
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => handleNavigation(action.path)}
                  className={`bg-gradient-to-br ${action.color} text-white p-3 sm:p-4 rounded-lg h-auto hover:scale-105 transition-all duration-200 shadow-lg border border-white/10`}
                >
                  <div className="text-center w-full">
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{action.icon}</div>
                    <h3 className="font-bold text-xs sm:text-sm truncate">{action.title}</h3>
                    <p className="text-xs opacity-90 line-clamp-2">{action.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Study Streak */}
          <div className="px-2 sm:px-3 py-1 sm:py-2">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-xs sm:text-sm truncate">Sequência de Estudos</h3>
                  <p className="text-xs opacity-80 truncate">Mantenha o ritmo!</p>
                </div>
                <div className="text-center flex-shrink-0">
                  <div className="text-sm sm:text-lg font-bold">{currentStreak}</div>
                  <div className="text-xs opacity-80">dias</div>
                </div>
              </div>
              <div className="flex space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i < Math.min(currentStreak, 7) ? 'bg-yellow-400 shadow-lg' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-2 sm:px-3 py-1 sm:py-2 mb-3">
            <h2 className="text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3">Atividade Recente</h2>
            <div className="space-y-1.5 sm:space-y-2">
              {activitiesLoading ? (
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
                  <p className="text-xs opacity-80">Carregando atividades...</p>
                </div>
              ) : recentActivities.length === 0 ? (
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
                  <p className="text-xs opacity-80">Você ainda não tem atividades recentes</p>
                </div>
              ) : (
                recentActivities.map((activity: any) => {
                  const ActivityIcon = getActivityIcon(activity.activity_type);
                  const iconColor = getActivityIconColor(activity.activity_type);
                  const activityLabel = getActivityLabel(activity.activity_type);
                  
                  return (
                    <div key={activity.id} className="bg-white/20 backdrop-blur-md rounded-lg p-2 sm:p-3 text-white shadow-lg border border-white/10">
                      <div className="flex items-center space-x-2">
                        <ActivityIcon className={`${iconColor} flex-shrink-0`} size={14} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs sm:text-sm truncate">
                            {activity.subject} - {activityLabel}
                            {activity.topic && ` - ${activity.topic}`}
                          </p>
                          <p className="text-xs opacity-80 truncate">
                            Concluído • +{activity.points_earned || 0} pontos
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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
