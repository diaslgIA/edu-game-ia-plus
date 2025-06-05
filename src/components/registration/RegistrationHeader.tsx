
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSound } from '@/contexts/SoundContext';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const RegistrationHeader: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  return (
    <div className="flex-shrink-0 flex items-center p-4 pb-2">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => {
          playSound('click');
          navigate('/');
        }}
        className="text-white p-2 mr-2"
      >
        <ArrowLeft size={16} />
      </Button>
      <div className="flex-1 flex justify-center">
        <Logo size="sm" />
      </div>
    </div>
  );
};

export default RegistrationHeader;
