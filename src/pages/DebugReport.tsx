
import React from 'react';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import DebugAnalyzer from '@/components/DebugAnalyzer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DebugReport = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')} 
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Debug Report</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <DebugAnalyzer />
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default DebugReport;
