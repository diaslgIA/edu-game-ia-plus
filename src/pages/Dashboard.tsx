import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import WelcomeMessage from '@/components/WelcomeMessage';
import { RecentActivities } from '@/components/RecentActivities';
import DiagnosticReport from '@/components/DiagnosticReport';
import DetailedStats from '@/components/DetailedStats';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useUserActivities } from '@/hooks/useUserActivities';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  TrendingUp, 
  Users, 
  Calendar,
  ChevronRight,
  Play,
  Zap,
  Award,
  Brain,
  Settings,
  Database
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    stats, 
    recentProgress, 
    weeklyGoal, 
    currentStreak, 
    loading 
  } = useUserProgress();
  const { activities } = useUserActivities();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  const [showDiagnostic, setShowDiagnostic] = React.useState(false);

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  const quickActions = [
    {
      icon: BookOpen,
      title: 'Estudar',
      description: 'Continue seus estudos',
      action: () => handleNavigation('/subjects'),
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Target,
      title: 'Quiz',
      description: 'Teste seus conhecimentos',
      action: () => handleNavigation('/exercises'),
      color: 'from-green-500 to-green-700'
    },
    {
      icon: Users,
      title: 'Guildas',
      description: 'Estude com amigos',
      action: () => handleNavigation('/guilds'),
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: Trophy,
      title: 'Ranking',
      description: 'Veja sua posição',
      action: () => handleNavigation('/ranking'),
      color: 'from-yellow-500 to-yellow-700'
    }
  ];

  const todayStats = [
    {
      label: 'XP Ganho',
      value: stats.todayXP || 0,
      icon: Zap,
      color: 'text-yellow-500'
    },
    {
      label: 'Questões',
      value: stats.todayQuestions || 0,
      icon: Brain,
      color: 'text-blue-500'
    },
    {
      label: 'Sequência',
      value: currentStreak,
      icon: Award,
      color: 'text-green-500'
    }
  ];

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 rounded-b-3xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDiagnostic(!showDiagnostic)}
                className="text-white p-2 hover:bg-white/20 rounded-xl"
              >
                <Database size={20} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation('/profile')}
                className="text-white p-2 hover:bg-white/20 rounded-xl"
              >
                <Settings size={20} />
              </Button>
            </div>
          </div>
          <WelcomeMessage />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Diagnostic Panel */}
          {showDiagnostic && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">🔍 Diagnóstico do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <DiagnosticReport />
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            {todayStats.map((stat, index) => (
              <Card key={index} className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="p-3 text-center">
                  <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/80">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Weekly Goal Progress */}
          <Card className="bg-white/15 backdrop-blur-md border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Meta Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-white">
                  <span>Progresso</span>
                  <span>{weeklyGoal.completed}/{weeklyGoal.target}</span>
                </div>
                <Progress 
                  value={(weeklyGoal.completed / weeklyGoal.target) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-white/80">
                  {weeklyGoal.target - weeklyGoal.completed} atividades restantes
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="bg-white/15 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/25 transition-all hover:scale-105"
                  onClick={action.action}
                >
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-1">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Progress */}
          {recentProgress.length > 0 && (
            <Card className="bg-white/15 backdrop-blur-md border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center justify-between">
                  <span className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Progresso Recente
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/progress')}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentProgress.slice(0, 3).map((progress, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{progress.subject}</div>
                        <div className="text-white/60 text-xs">{progress.completed_activities} atividades concluídas</div>
                      </div>
                      <div className="text-green-400 text-sm font-medium">
                        {progress.progress_percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activities */}
          <RecentActivities activities={activities} />

          {/* Detailed Stats */}
          <DetailedStats />
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Dashboard;
