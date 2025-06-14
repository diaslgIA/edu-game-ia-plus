
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationFooter from '@/components/registration/RegistrationFooter';

const Register = () => {
  return (
    <MobileContainer background="gradient">
      <div className="min-h-screen flex flex-col">
        {/* Header ainda mais compacto */}
        <div className="flex-shrink-0 pt-1 pb-1 px-3">
          <div className="flex justify-center">
            <Logo size="sm" showText={false} />
          </div>
          <div className="text-center mt-1">
            <h1 className="text-white text-xs font-medium">Crie sua conta gratuita</h1>
          </div>
        </div>

        {/* Área scrollável com padding ultra mínimo */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 pb-1">
            <div className="max-w-sm mx-auto">
              <RegistrationForm />
              <RegistrationFooter />
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
