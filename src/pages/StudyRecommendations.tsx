
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Check, Target, Brain, Clock } from 'lucide-react';

const StudyRecommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: 'Participação Ativa na Comunidade',
      description: 'Engaje-se com outros estudantes e compartilhe conhecimentos',
      icon: '👥',
      completed: true
    },
    {
      title: 'Estabelecimento de Metas Claras',
      description: 'Defina objetivos específicos e mensuráveis para seus estudos',
      icon: '🎯',
      completed: true
    },
    {
      title: 'Criação de um Cronograma de Estudos',
      description: 'Organize seu tempo de forma eficiente e consistente',
      icon: '📅',
      completed: false
    },
    {
      title: 'Técnicas de Estudo Ativas',
      description: 'Use métodos como resumos, mapas mentais e questões práticas',
      icon: '📝',
      completed: false
    },
    {
      title: 'Revisão Contínua',
      description: 'Revise o conteúdo regularmente para fixar o aprendizado',
      icon: '🔄',
      completed: false
    },
    {
      title: 'Cuidado com a Saúde Mental e Física',
      description: 'Mantenha uma rotina saudável com exercícios e descanso',
      icon: '💪',
      completed: false
    }
  ];

  const tips = [
    {
      icon: Brain,
      title: 'Estude em Blocos',
      description: 'Faça pausas de 15 min a cada 45 min de estudo'
    },
    {
      icon: Target,
      title: 'Foque no Essencial',
      description: 'Priorize matérias com maior peso no ENEM'
    },
    {
      icon: Clock,
      title: 'Seja Consistente',
      description: 'Estude um pouco todos os dias ao invés de maratonas'
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Recomendações de Estudo</span>
            <BookOpen size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Quick Tips */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/10">
            <h2 className="font-bold text-lg mb-4 flex items-center">
              <Brain className="mr-2 text-yellow-400" size={20} />
              Dicas Rápidas
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {tips.map((tip, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <tip.icon className="text-blue-400" size={20} />
                    <div>
                      <p className="font-medium text-sm">{tip.title}</p>
                      <p className="text-xs opacity-80">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations list */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Recomendações Personalizadas</h2>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="bg-white/15 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        recommendation.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/20 text-white'
                      }`}>
                        {recommendation.completed ? (
                          <Check size={20} />
                        ) : (
                          <span className="text-xl">{recommendation.icon}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 text-white">
                      <h3 className="font-semibold text-base mb-1">
                        {recommendation.title}
                      </h3>
                      <p className="text-sm opacity-80 leading-relaxed">
                        {recommendation.description}
                      </p>
                      
                      {recommendation.completed && (
                        <div className="mt-2">
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-lg">
                            ✓ Concluído
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg border border-white/10">
            <h3 className="font-bold text-lg mb-3 flex items-center">
              <Target className="mr-2 text-purple-400" size={20} />
              Seu Progresso
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Recomendações Seguidas</span>
                <span className="font-bold">2/6</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full w-1/3 transition-all duration-500"></div>
              </div>
              <p className="text-xs opacity-80">
                Continue seguindo as recomendações para maximizar seu aprendizado!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default StudyRecommendations;
