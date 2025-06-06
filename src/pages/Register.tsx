
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationFooter from '@/components/registration/RegistrationFooter';

const Register = () => {
  return (
    <MobileContainer background="gradient">
      <div className="h-screen flex flex-col">
        {/* Header fixo */}
        <div className="flex-shrink-0 pt-6 pb-4 px-4">
          <div className="flex justify-center mb-3">
            <Logo size="sm" showText={true} />
          </div>
          <div className="text-center">
            <h1 className="text-white text-lg font-medium">Crie sua conta gratuita</h1>
          </div>
        </div>

        {/* Área scrollável */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-8">
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
