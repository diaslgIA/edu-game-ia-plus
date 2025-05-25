
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Search, Menu, BarChart3, BookOpen, FileText, Award, Trophy, Zap, Target } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userPoints, setUserPoints] = useState(1234567);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [completedToday, setCompletedToday] = useState(3);

  // Simulação de interação - pontos aumentando
  useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      title: 'Resumo do progresso',
      icon: BarChart3,
      path: '/progress',
      color: 'from-blue-500 to-purple-600',
      description: 'Veja seu desempenho'
    },
    {
      title: 'Recomendações de estudo',
      icon: BookOpen,
      path: '/recommendations',
      color: 'from-purple-500 to-pink-600',
      description: 'Conteúdo personalizado'
    },
    {
      title: 'Matérias',
      icon: FileText,
      path: '/subjects',
      color: 'from-pink-500 to-red-600',
      description: 'Explore todos os tópicos'
    },
    {
      title: 'Exercícios',
      icon: Award,
      path: '/exercises',
      color: 'from-orange-500 to-yellow-600',
      description: 'Pratique e jogue',
      highlight: true
    }
  ];

  const achievements = [
    { name: 'Primeira semana', icon: '🎯', unlocked: true },
    { name: 'Quiz master', icon: '🧠', unlocked: true },
    { name: 'Estudante dedicado', icon: '📚', unlocked: false },
    { name: 'ENEM ready', icon: '🎓', unlocked: false }
  ];

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-600 p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
              </div>
              <span className="text-white text-lg font-medium">Olá, {user?.name || 'Usuário'}!</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white">
              <Menu size={20} />
            </Button>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="pesquise aqui"
              className="w-full bg-white rounded-2xl py-3 pl-10 pr-4 text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Categories button */}
          <Button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 rounded-2xl backdrop-blur-md">
            <Menu size={20} className="mr-2" />
            Categorias
          </Button>
        </div>

        {/* Stats section */}
        <div className="p-6">
          {/* Points and streak */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💎</span>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 text-sm font-medium">pontos</div>
                <div className="text-white text-lg font-bold animate-pulse">
                  {userPoints.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔥</span>
              </div>
              <div className="text-right">
                <div className="text-orange-400 text-sm font-medium">sequência</div>
                <div className="text-white text-lg font-bold">
                  {dailyStreak} dias
                </div>
              </div>
            </div>
          </div>

          {/* Daily progress */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
              <Target className="text-green-500" size={20} />
              <span>Progresso de Hoje</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Exercícios completados</span>
                <span className="font-bold text-green-600">{completedToday}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedToday / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs">Continue assim para manter sua sequência!</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
              <Trophy className="text-yellow-500" size={20} />
              <span>Conquistas</span>
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`text-center p-2 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-yellow-50 border border-yellow-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`text-2xl mb-1 ${!achievement.unlocked && 'opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <span className={`text-xs font-medium ${
                    achievement.unlocked ? 'text-yellow-700' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu items */}
          <div className="space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {item.highlight && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 animate-pulse">
                      NOVO!
                    </div>
                  )}
                  <Button
                    onClick={() => navigate(item.path)}
                    className={`w-full bg-gradient-to-r ${item.color} text-white font-semibold py-4 rounded-2xl text-left justify-start space-x-3 hover:scale-105 transition-all duration-200 shadow-lg`}
                  >
                    <Icon size={24} />
                    <div className="text-left">
                      <div>{item.title}</div>
                      <div className="text-xs opacity-80">{item.description}</div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Dashboard;
