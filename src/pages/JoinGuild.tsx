
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';

const JoinGuild = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/guilds')}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Entrar em Guilda</span>
            <UserPlus size={20} />
          </h1>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 text-center">
            <p className="text-white">Busca de guilds em desenvolvimento</p>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default JoinGuild;
