
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import WelcomeScreen from '@/components/WelcomeScreen';

const Welcome = () => {
  const navigate = useNavigate();
  const { profile, markFirstLoginComplete } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (profile) {
      if (profile.first_login) {
        setShowWelcome(true);
      } else {
        navigate('/dashboard');
      }
    }
  }, [profile, navigate]);

  const handleWelcomeComplete = async () => {
    await markFirstLoginComplete();
    setShowWelcome(false);
    navigate('/dashboard');
  };

  if (showWelcome && profile) {
    return (
      <WelcomeScreen 
        onComplete={handleWelcomeComplete}
        userName={profile.full_name}
      />
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full p-6">
        {/* Loading state or redirect */}
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p>Preparando sua experiência...</p>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Welcome;
