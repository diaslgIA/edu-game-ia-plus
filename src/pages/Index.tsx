
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSound } from '@/contexts/SoundContext';
import MobileContainer from '@/components/MobileContainer';
import SoundControlPanel from '@/components/SoundControlPanel';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const { playSound } = useSound();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleNavigation = (path: string) => {
    playSound('click');
    navigate(path);
  };

  if (loading) {
    return (
      <MobileContainer>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-white relative">
        {/* Controle de Som no canto superior direito */}
        <div className="absolute top-4 right-4">
          <SoundControlPanel />
        </div>

        <div className="animate-scale-in">
          {/* Logo Destacada e Bem Visível */}
          <div className="flex justify-center mb-8">
            <Logo size="xl" showText={true} animated className="transform hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
        
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Bem-vindo ao EduGameIA
            </h1>
            <p className="text-lg opacity-90">
              Sua jornada rumo ao ENEM começa aqui
            </p>
            <p className="text-sm opacity-75">
              Aprenda de forma gamificada e divertida
            </p>
          </div>

          <div className="space-y-4 mt-12">
            <Button 
              onClick={() => handleNavigation('/auth?tab=login')}
              className="w-full btn-primary bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 rounded-2xl shadow-lg"
            >
              Entrar na minha conta
            </Button>
            
            <Button 
              onClick={() => handleNavigation('/auth?tab=register')}
              className="w-full bg-white/20 text-white hover:bg-white/30 border-white/30 font-bold py-4 rounded-2xl backdrop-blur-sm"
              variant="outline"
            >
              Criar conta gratuita
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75 space-y-2">
            <p>🧠 Conteúdo focado no ENEM</p>
            <p>🧩 Atividades gamificadas</p>
            <p>🎯 Simulados realistas</p>
            <p>📊 Acompanhamento de progresso</p>
            <p>🎵 Experiência sonora imersiva</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Index;
