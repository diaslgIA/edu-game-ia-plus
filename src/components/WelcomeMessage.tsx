
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Star, BookOpen, Target, Heart, ArrowRight } from 'lucide-react';

interface WelcomeMessageProps {
  onComplete: () => void;
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onComplete, userName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "SEJA BEM-VINDO",
      subtitle: `Olá, ${userName}!`,
      icon: <GraduationCap className="w-16 h-16 text-yellow-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-lg font-medium leading-relaxed">
            Bem-vindo ao EduGameIA! Uma plataforma criada especialmente para estudantes como você.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold">Nossa Missão</span>
            </div>
            <p className="text-sm text-left">
              Democratizar o acesso ao ensino superior de qualidade através de uma educação gamificada e acessível.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "NOSSO PROPÓSITO",
      subtitle: "Por que criamos este app?",
      icon: <Heart className="w-16 h-16 text-red-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            Este aplicativo foi criado para melhorar o desempenho de estudantes do ensino médio, especialmente de baixa renda, no ENEM e vestibulares.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Foco no ENEM e vestibulares</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-sm">Educação acessível para todos</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Aprendizado gamificado</span>
            </div>
          </div>
          <p className="text-sm opacity-90">
            Superando barreiras socioeconômicas através de material de alta qualidade.
          </p>
        </div>
      )
    },
    {
      title: "COMO FUNCIONA",
      subtitle: "Sua jornada de aprendizado",
      icon: <GraduationCap className="w-16 h-16 text-cyan-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            Uma experiência completa de aprendizado com gamificação integrada para manter você motivado!
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-3">
            <div className="text-left space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 text-xs font-bold">1</div>
                <span className="text-sm">Estude com conteúdo interativo e slides dinâmicos</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <span className="text-sm">Complete quizzes e ganhe pontos</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <span className="text-sm">Suba de nível e desbloqueie conquistas</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <span className="text-sm">Compare seu progresso no ranking</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "NOSSOS FUNDADORES",
      subtitle: "Quem está por trás do projeto",
      icon: <Users className="w-16 h-16 text-pink-400" />,
      content: (
        <div className="space-y-4">
          <p className="text-base leading-relaxed">
            Conheça os criadores que tornaram este sonho realidade:
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-lg">LG</span>
              </div>
              <h4 className="text-sm font-semibold">Luis Gabriel Dias Gonçalves</h4>
              <p className="text-xs opacity-80">Co-fundador</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-lg">LG</span>
              </div>
              <h4 className="text-sm font-semibold">Lara Gidi</h4>
              <p className="text-xs opacity-80">Co-fundadora</p>
            </div>
          </div>
          <p className="text-sm opacity-90">
            Unidos pela paixão em transformar vidas através da educação.
          </p>
        </div>
      )
    }
  ];

  const currentSlideData = slides[currentSlide];

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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center z-50">
      <div className="text-center text-white px-6 max-w-sm mx-auto">
        {/* Indicadores de progresso */}
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Título principal */}
        <h1 className="text-2xl font-bold mb-2 tracking-wider">
          {currentSlideData.title}
        </h1>
        
        {/* Subtítulo */}
        <p className="text-sm opacity-90 mb-6">{currentSlideData.subtitle}</p>

        {/* Ícone central */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-28 h-28 bg-cyan-300 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                {currentSlideData.icon}
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo do slide */}
        <div className="mb-8">
          {currentSlideData.content}
        </div>

        {/* Botões de navegação */}
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <Button
              onClick={prevSlide}
              variant="outline"
              className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Anterior
            </Button>
          )}
          
          <Button
            onClick={nextSlide}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 rounded-xl text-base shadow-lg flex items-center justify-center gap-2"
          >
            {currentSlide === slides.length - 1 ? (
              <>
                <GraduationCap className="w-5 h-5" />
                COMEÇAR JORNADA
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Pular tutorial */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={onComplete}
            className="mt-4 text-white/60 text-sm hover:text-white/80 transition-colors"
          >
            Pular apresentação
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeMessage;
