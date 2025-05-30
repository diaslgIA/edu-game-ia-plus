
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-white">
        <div className="animate-scale-in">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 relative">
              <img 
                src="/lovable-uploads/21637d78-a84d-46c7-9307-1bd4869cd140.png" 
                alt="EdugameIA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-bold text-2xl">
              <span className="text-blue-200">Edugame</span>
              <span className="text-purple-200">IA</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Bem-vindo ao EduGameIA
            </h1>
            <p className="text-lg opacity-90">
              Sua jornada educacional gamificada começa aqui
            </p>
          </div>

          <div className="space-y-4 mt-12">
            <Button 
              onClick={() => navigate('/auth?tab=login')}
              className="w-full btn-primary"
            >
              Entrar
            </Button>
            
            <Button 
              onClick={() => navigate('/auth?tab=register')}
              className="w-full btn-secondary"
              variant="outline"
            >
              Criar conta
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>Educação acessível e engajadora</p>
            <p>para estudantes do ensino médio</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Index;
