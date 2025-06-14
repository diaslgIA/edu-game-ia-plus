
import React from 'react';
import { Link } from 'react-router-dom';
import { useSound } from '@/contexts/SoundContext';

const RegistrationFooter: React.FC = () => {
  const { playSound } = useSound();

  return (
    <div className="text-center space-y-4 py-6">
      {/* Termos */}
      <div className="text-xs text-white/80 leading-relaxed">
        <p className="mb-2">Ao criar uma conta, você concorda com nossos</p>
        <p>
          <Link to="#" className="underline hover:text-white transition-colors">Termos de Uso</Link> e{' '}
          <Link to="#" className="underline hover:text-white transition-colors">Política de Privacidade</Link>
        </p>
      </div>

      {/* Link para login */}
      <div className="pt-2">
        <span className="text-white/80 text-sm">Já tem uma conta? </span>
        <Link 
          to="/auth?tab=login" 
          className="text-white font-semibold hover:underline text-sm transition-all duration-300 hover:scale-105 inline-block"
          onClick={() => playSound('click')}
        >
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default RegistrationFooter;
