
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeMessageProps {
  onComplete: () => void;
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onComplete, userName }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onComplete();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center z-50">
      <div className="text-center text-white px-6 max-w-sm mx-auto">
        {/* Texto principal */}
        <h1 className="text-3xl font-bold mb-8 tracking-wider">
          SEJA BEM-VINDO
        </h1>

        {/* Ícone central */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Círculo de fundo */}
            <div className="w-32 h-32 bg-cyan-300 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            {/* Botão de power */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem de boas-vindas */}
        <p className="text-lg mb-8 leading-relaxed">
          Fico muito animado em fazer parte dessa iniciativa que busca transformar o futuro de tantos jovens talentosos
        </p>

        {/* Botão de ação */}
        <Button
          onClick={handleStart}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 rounded-2xl text-lg shadow-lg flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5" />
          COMECE A SUA JORNADA
        </Button>
      </div>
    </div>
  );
};

export default WelcomeMessage;
