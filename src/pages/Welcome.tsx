
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex-1 flex flex-col items-center justify-center text-center text-white">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 tracking-wider">
              SEJA BEM VINDO
            </h1>
            
            {/* Graduation cap icon with circuit elements */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-4xl">🎓</div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-2 -left-2 w-6 h-6 bg-cyan-400 rounded-full"></div>
              </div>
              
              {/* Power button */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 text-white">⚡</div>
              </div>
            </div>
          </div>

          <div className="max-w-xs mx-auto space-y-4">
            <p className="text-lg leading-relaxed">
              Fico muito animado em fazer parte dessa iniciativa que busca transformar o futuro de tantos jovens talentosos
            </p>
          </div>
        </div>

        {/* Bottom button */}
        <div className="pb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-lg flex items-center justify-center space-x-3 shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>COMECE A SUA JORNADA</span>
            <div className="text-xl">👥</div>
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Welcome;
