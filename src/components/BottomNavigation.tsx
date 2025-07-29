
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, User, Settings } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound, isMuted } = useSound();

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/guilds', icon: Users, label: 'Guildas' },
    { path: '/rankings', icon: Trophy, label: 'Ranking' },
    { path: '/profile', icon: User, label: 'Perfil' },
    { path: '/settings', icon: Settings, label: 'Config' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/15 backdrop-blur-md border-t border-white/10 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                active 
                  ? 'text-white bg-white/20 scale-110' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
