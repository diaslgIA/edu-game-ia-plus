
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import FinalReport from '@/components/FinalReport';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FinalReportPage = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')} 
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Relatório Final</h1>
            <p className="text-xs text-white/80">Correções implementadas com sucesso</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white/10 backdrop-blur-sm rounded-t-3xl mt-4 mx-4 mb-4">
          <FinalReport />
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default FinalReportPage;
