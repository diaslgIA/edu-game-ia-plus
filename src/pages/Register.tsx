
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import RegistrationHeader from '@/components/registration/RegistrationHeader';
import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationFooter from '@/components/registration/RegistrationFooter';

const Register = () => {
  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-screen">
        <RegistrationHeader />
        
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-8">
            <RegistrationForm />
            <RegistrationFooter />
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
