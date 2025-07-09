
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/contexts/SoundContext';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationFooter from '@/components/registration/RegistrationFooter';

const Register = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogoClick = () => {
    playSound('click');
    navigate('/');
  };

  return (
    <MobileContainer background="gradient">
      <div className="min-h-screen flex flex-col py-4">
        {/* Header com logo maior e interativa */}
        <div className="flex-shrink-0 pt-4 pb-6 px-4">
          <div className="flex justify-center">
            <Logo 
              size="lg" 
              showText={true} 
              animated={true}
              onClick={handleLogoClick}
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-white text-lg font-semibold">Crie sua conta gratuita</h1>
            <p className="text-white/80 text-sm mt-1">Junte-se à revolução da educação</p>
          </div>
        </div>

        {/* Área do formulário */}
        <div className="flex-1 px-4">
          <div className="max-w-sm mx-auto">
            <RegistrationForm />
            <RegistrationFooter />
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
