
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Crown, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Subscriptions = () => {
  const navigate = useNavigate();

  const features = [
    'Acesso ilimitado a todos os formatos de conteúdo, maximizando as opções de aprendizado.',
    'Gamificação avançada para manter o engajamento a longo prazo e recompensar o progresso significativo.',
    'Ferramentas avançadas para organização e estudo (anotações aprimoradas).'
  ];

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Assinaturas</span>
            <DollarSign size={20} />
          </h1>
        </div>

        {/* Premium card */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-6 relative overflow-hidden">
            {/* Floating elements */}
            <div className="absolute top-4 left-4 text-yellow-400 text-lg animate-pulse">✨</div>
            <div className="absolute top-8 right-8 text-cyan-400 text-sm animate-pulse">+</div>
            <div className="absolute bottom-8 left-8 text-blue-400 text-lg animate-pulse">+</div>
            <div className="absolute bottom-4 right-4 text-yellow-400 text-xs animate-pulse">✨</div>

            {/* Navigation arrows */}
            <div className="flex justify-between items-start mb-6">
              <Button variant="ghost" size="sm" className="text-white">
                <ChevronLeft size={24} />
              </Button>
              <Button variant="ghost" size="sm" className="text-white">
                <ChevronRight size={24} />
              </Button>
            </div>

            {/* Premium badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-2xl font-bold text-lg mb-4">
                <Crown size={20} />
                <span>premium</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-600 rounded-2xl p-4 text-white text-sm leading-relaxed">
                  {feature}
                </div>
              ))}
            </div>

            {/* Subscribe button */}
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 rounded-2xl text-lg flex items-center justify-center space-x-2 shadow-lg">
              <span>ASSINAR</span>
              <Award size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subscriptions;
