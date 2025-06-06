
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationFooter from '@/components/registration/RegistrationFooter';

const Register = () => {
  return (
    <MobileContainer background="gradient">
      <div className="min-h-screen flex flex-col">
        {/* Header ultra compacto */}
        <div className="flex-shrink-0 pt-2 pb-1 px-4">
          <div className="flex justify-center">
            <Logo size="sm" showText={true} />
          </div>
          <div className="text-center">
            <h1 className="text-white text-xs font-medium">Crie sua conta gratuita</h1>
          </div>
        </div>

        {/* Área scrollável com padding mínimo */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-2">
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
