
import React from 'react';
import { Link } from 'react-router-dom';
import { useSound } from '@/contexts/SoundContext';

const RegistrationFooter: React.FC = () => {
  const { playSound } = useSound();

  return (
    <div className="text-center space-y-1 py-1">
      {/* Termos mais compactos */}
      <div className="text-xs text-white/80">
        <p className="mb-0.5">Ao criar uma conta, você concorda com nossos</p>
        <p>
          <Link to="#" className="underline">Termos de Uso</Link> e{' '}
          <Link to="#" className="underline">Política de Privacidade</Link>
        </p>
      </div>

      {/* Link para login */}
      <div>
        <span className="text-white/80 text-xs">Já tem uma conta? </span>
        <Link 
          to="/auth?tab=login" 
          className="text-white font-semibold hover:underline text-xs"
          onClick={() => playSound('click')}
        >
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default RegistrationFooter;
