
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Check } from 'lucide-react';

const StudyRecommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    'Participação Ativa na Comunidade',
    'Estabelecimento de Metas Claras',
    'Criação de um Cronograma de Estudos',
    'Técnicas de Estudo Ativas',
    'Revisão Contínua',
    'Cuidado com a Saúde Mental e Física'
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
            <span>Recomendações de estudo</span>
            <BookOpen size={20} />
          </h1>
        </div>

        {/* Recommendations list */}
        <div className="p-6 space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="bg-slate-800 rounded-2xl p-4 flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
              <span className="text-white font-medium flex-1 text-left">
                {recommendation}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default StudyRecommendations;
