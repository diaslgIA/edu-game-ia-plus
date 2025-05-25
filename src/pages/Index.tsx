
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
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
          <Logo size="lg" showText={true} className="mb-8" />
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
