
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Settings, Key, Globe, Shield, FileText, Info, Share2, Check } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Settings, label: 'Modo', sublabel: 'Escuro e claro', hasToggle: true },
    { icon: Key, label: 'Alterar a senha', hasArrow: true },
    { icon: Globe, label: 'Idioma', hasArrow: true },
  ];

  const infoItems = [
    { icon: Shield, label: 'Política de Privacidade', hasArrow: true },
    { icon: FileText, label: 'Termos e Condições', hasArrow: true },
    { icon: Info, label: 'Sobre o aplicativo', hasArrow: true },
    { icon: Share2, label: 'Compartilhe este aplicativo', hasArrow: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between rounded-b-3xl">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Perfil</h1>
          </div>
          <div className="text-blue-400">
            <Check size={20} />
          </div>
        </div>

        {/* Profile info */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-4 relative">
              <User size={40} className="text-white" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✏️</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* General Configuration */}
          <div className="mb-8">
            <h3 className="text-gray-800 font-semibold mb-4">Configuração Geral</h3>
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-purple-100 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon size={20} className="text-gray-700" />
                      <div>
                        <span className="font-medium text-gray-800">{item.label}</span>
                        {item.sublabel && (
                          <p className="text-sm text-gray-600">{item.sublabel}</p>
                        )}
                      </div>
                    </div>
                    {item.hasToggle && (
                      <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    )}
                    {item.hasArrow && (
                      <span className="text-gray-600">›</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Information */}
          <div className="mb-8">
            <h3 className="text-gray-800 font-semibold mb-4">Informações</h3>
            <div className="space-y-2">
              {infoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-purple-100 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon size={20} className="text-gray-700" />
                      <span className="font-medium text-gray-800">{item.label}</span>
                    </div>
                    <span className="text-gray-600">›</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logout button */}
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-2xl"
          >
            Sair da conta
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Profile;
