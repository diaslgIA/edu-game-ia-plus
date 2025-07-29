
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, DollarSign, Headphones, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [{
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/dashboard'
  }, {
    id: 'assinaturas',
    label: 'Assinaturas',
    icon: DollarSign,
    path: '/subscriptions'
  }, {
    id: 'suporte',
    label: 'Suporte',
    icon: Headphones,
    path: '/support'
  }, {
    id: 'perfil',
    label: 'Perfil',
    icon: User,
    path: '/profile'
  }];
  
  return <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-slate-800 text-white z-50">
      <div className="flex justify-around items-center py-0">
        {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return <button key={item.id} onClick={() => navigate(item.path)} className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${isActive ? 'text-blue-400 bg-slate-700' : 'text-gray-400 hover:text-white'}`}>
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>;
      })}
      </div>
    </div>;
};

export default BottomNavigation;
