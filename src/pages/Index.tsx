
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
              onClick={() => navigate('/login')}
              className="w-full btn-primary"
            >
              Entrar
            </Button>
            
            <Button 
              onClick={() => navigate('/register')}
              className="w-full btn-secondary"
              variant="outline"
            >
              Criar conta
            </Button>

            <Button 
              onClick={() => navigate('/login')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com Gmail
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
