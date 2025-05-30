
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
            <div className="w-20 h-20 relative">
              <img 
                src="/lovable-uploads/08babff9-54df-4763-8eb1-122f7d168e73.png" 
                alt="EdugameIA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-bold text-3xl">
              <span className="text-blue-200">Edugame</span>
              <span className="text-yellow-300">iA</span>
            </div>
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
              onClick={() => navigate('/auth?tab=login')}
              className="w-full btn-primary bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 rounded-2xl shadow-lg"
            >
              Entrar na minha conta
            </Button>
            
            <Button 
              onClick={() => navigate('/auth?tab=register')}
              className="w-full bg-white/20 text-white hover:bg-white/30 border-white/30 font-bold py-4 rounded-2xl backdrop-blur-sm"
              variant="outline"
            >
              Criar conta gratuita
            </Button>
          </div>

          <div className="mt-8 text-sm opacity-75 space-y-2">
            <p>✓ Conteúdo focado no ENEM</p>
            <p>✓ Atividades gamificadas</p>
            <p>✓ Simulados realistas</p>
            <p>✓ Acompanhamento de progresso</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Index;
