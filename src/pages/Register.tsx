
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationFooter from '@/components/registration/RegistrationFooter';

const Register = () => {
  return (
    <MobileContainer background="gradient">
      <div className="min-h-screen flex flex-col">
        {/* Header com Logo */}
        <div className="flex-shrink-0 pt-8 pb-4">
          <div className="flex justify-center">
            <Logo size="md" showText={true} />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-white text-lg font-medium">Crie sua conta gratuita</h1>
          </div>
        </div>

        {/* Formulário com scroll */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="max-w-sm mx-auto">
            <RegistrationForm />
            <RegistrationFooter />
          </div>
          {/* Espaço extra no final para garantir que o footer seja visível */}
          <div className="h-20"></div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
