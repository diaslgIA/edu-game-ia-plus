
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import WelcomeMessage from '@/components/WelcomeMessage';

const Welcome = () => {
  const navigate = useNavigate();
  const { profile, isAuthenticated, markFirstLoginComplete } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (isAuthenticated && profile) {
      // Se não é o primeiro login, redireciona direto para o dashboard
      if (!profile.first_login) {
        navigate('/dashboard');
        return;
      }
      
      // Se é o primeiro login, mostra a tela de boas-vindas
      setShowWelcome(true);
    }
  }, [isAuthenticated, profile, navigate]);

  const handleWelcomeComplete = async () => {
    // Marca o primeiro login como completo
    await markFirstLoginComplete();
    setShowWelcome(false);
    navigate('/dashboard');
  };

  if (isAuthenticated && profile && showWelcome) {
    return (
      <WelcomeMessage 
        onComplete={handleWelcomeComplete}
        userName={profile.full_name || 'Estudante'}
      />
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Preparando sua experiência...</p>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Welcome;
