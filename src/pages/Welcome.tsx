
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import WelcomeIntroScreen from '@/components/WelcomeIntroScreen';

const Welcome = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (profile) {
      // Sempre mostrar a tela de boas-vindas
      setShowWelcome(true);
    }
  }, [profile]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    navigate('/dashboard');
  };

  if (showWelcome && profile) {
    return (
      <WelcomeIntroScreen 
        onComplete={handleWelcomeComplete}
        userName={profile.full_name}
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
