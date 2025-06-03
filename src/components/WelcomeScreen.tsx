
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Trophy, Users, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
  userName: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, userName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Sparkles className="w-16 h-16 text-yellow-400" />,
      title: `Bem-vindo ao EduGameIA, ${userName}!`,
      description: "Sua jornada de aprendizado gamificada começa agora. Prepare-se para uma experiência única!",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BookOpen className="w-16 h-16 text-blue-400" />,
      title: "Aprenda com Diversão",
      description: "Conteúdo interativo, slides dinâmicos e professor virtual para uma aprendizagem completa.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Trophy className="w-16 h-16 text-yellow-400" />,
      title: "Ganhe Pontos e Evolua",
      description: "Complete quizzes, ganhe pontos, suba de nível e desbloqueie conquistas incríveis!",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-16 h-16 text-green-400" />,
      title: "Compete com Amigos",
      description: "Veja seu ranking, compare seu progresso e motive-se com outros estudantes!",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
        {/* Indicadores de progresso */}
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Ícone */}
        <div className="mb-6 flex justify-center">
          <div className={`p-4 rounded-full bg-gradient-to-r ${currentSlideData.color}`}>
            {currentSlideData.icon}
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {currentSlideData.title}
        </h2>

        {/* Descrição */}
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {currentSlideData.description}
        </p>

        {/* Botões */}
        <div className="flex space-x-3">
          {currentSlide > 0 && (
            <Button
              onClick={prevSlide}
              variant="outline"
              className="flex-1"
            >
              Anterior
            </Button>
          )}
          
          <Button
            onClick={nextSlide}
            className={`flex-1 bg-gradient-to-r ${currentSlideData.color} hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all duration-200`}
          >
            {currentSlide === slides.length - 1 ? (
              <>
                Começar Jornada
                <Sparkles className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Pular tutorial */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="mt-4 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Pular tutorial
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
