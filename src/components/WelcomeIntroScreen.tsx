
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Heart, Star, ArrowRight, BookOpen, Trophy } from 'lucide-react';

interface WelcomeIntroScreenProps {
  onComplete: () => void;
  userName: string;
}

const WelcomeIntroScreen: React.FC<WelcomeIntroScreenProps> = ({ onComplete, userName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <GraduationCap className="w-20 h-20 text-yellow-400" />,
      title: `Seja bem-vindo, ${userName}!`,
      description: "O estudo é a salvação para uma vida melhor. Transforme seu futuro através do conhecimento!",
      background: "from-purple-600 via-blue-600 to-indigo-700"
    },
    {
      icon: <BookOpen className="w-20 h-20 text-blue-400" />,
      title: "Como Funciona Nosso App",
      description: "Aprenda através de conteúdos interativos, jogos educativos e simulados completos do ENEM.",
      background: "from-blue-600 via-cyan-600 to-teal-700"
    },
    {
      icon: <Trophy className="w-20 h-20 text-yellow-400" />,
      title: "Gamificação do Aprendizado",
      description: "Ganhe pontos, suba de nível, desbloqueie conquistas e compete com outros estudantes!",
      background: "from-yellow-500 via-orange-500 to-red-600"
    },
    {
      icon: <Heart className="w-20 h-20 text-pink-400" />,
      title: "Seu Futuro Começa Aqui",
      description: "Cada questão respondida, cada conteúdo estudado te aproxima dos seus sonhos. Vamos juntos!",
      background: "from-pink-500 via-purple-500 to-indigo-600"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${currentSlideData.background} flex items-center justify-center z-50`}>
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl border border-white/20">
        {/* Indicadores de progresso */}
        <div className="flex justify-center space-x-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Ícone */}
        <div className="mb-8 flex justify-center">
          <div className="p-6 rounded-full bg-white/20 backdrop-blur-sm">
            {currentSlideData.icon}
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white mb-6">
          {currentSlideData.title}
        </h2>

        {/* Descrição */}
        <p className="text-white/90 mb-8 leading-relaxed text-lg">
          {currentSlideData.description}
        </p>

        {/* Botão */}
        <Button
          onClick={nextSlide}
          className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold py-4 rounded-xl text-lg transition-all duration-200 shadow-lg"
        >
          {currentSlide === slides.length - 1 ? (
            <>
              <Star className="mr-2 w-5 h-5" />
              Começar Minha Jornada
            </>
          ) : (
            <>
              Próximo
              <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>

        {/* Pular tutorial */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="mt-4 text-white/70 text-sm hover:text-white transition-colors"
          >
            Pular introdução
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeIntroScreen;
