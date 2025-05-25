
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Search, Menu, BarChart3, BookOpen, FileText, Award } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    {
      title: 'Resumo do progresso',
      icon: BarChart3,
      path: '/progress',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Recomendações de estudo',
      icon: BookOpen,
      path: '/recommendations',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Matérias',
      icon: FileText,
      path: '/subjects',
      color: 'from-pink-500 to-red-600'
    },
    {
      title: 'Exercícios',
      icon: Award,
      path: '/exercises',
      color: 'from-orange-500 to-yellow-600'
    }
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

        {/* Points section */}
        <div className="p-6">
          <div className="bg-slate-800 rounded-2xl p-4 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💎</span>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">★</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 text-sm font-medium">pontos</div>
              <div className="text-white text-xl font-bold">
                {user?.points?.toLocaleString() || '1.234.567'}
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="space-y-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`w-full bg-gradient-to-r ${item.color} text-white font-semibold py-4 rounded-2xl text-left justify-start space-x-3 hover:scale-105 transition-all duration-200 shadow-lg`}
                >
                  <Icon size={24} />
                  <span>{item.title}</span>
                </Button>
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
