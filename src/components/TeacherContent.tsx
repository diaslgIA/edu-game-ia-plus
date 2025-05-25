
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, BookOpen, Award, Lock } from 'lucide-react';

interface TeacherContentProps {
  teacher: string;
  subject: string;
  contentType: 'video' | 'slides';
  isPremium: boolean;
  onContentComplete: () => void;
}

const TeacherContent: React.FC<TeacherContentProps> = ({ 
  teacher, 
  subject, 
  contentType, 
  isPremium,
  onContentComplete 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      title: "Introdução à Física Quântica",
      content: "A física quântica revolucionou nossa compreensão do universo microscópico..."
    },
    {
      title: "Princípios Fundamentais",
      content: "Os principais conceitos incluem dualidade onda-partícula e incerteza..."
    },
    {
      title: "Aplicações Práticas",
      content: "Tecnologias modernas como lasers e computadores quânticos..."
    }
  ];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simular progresso do vídeo
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            onContentComplete();
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onContentComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-800">{teacher}</h3>
          <p className="text-gray-600 text-sm">{subject}</p>
        </div>
        {!isPremium && (
          <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
            <Lock size={12} className="text-orange-600" />
            <span className="text-orange-600 text-xs font-medium">Premium</span>
          </div>
        )}
      </div>

      {contentType === 'video' ? (
        <div className="space-y-4">
          {/* Video Player Simulation */}
          <div className="bg-slate-800 rounded-xl p-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">🎬</div>
              <h4 className="font-semibold mb-2">Aula de {subject}</h4>
              <p className="text-sm opacity-80 mb-4">Duração: 15 minutos</p>
              
              <Button
                onClick={handlePlay}
                disabled={!isPremium}
                className="bg-white text-slate-800 hover:bg-gray-100 rounded-full p-4"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progresso</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Slides Presentation */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100">
            <div className="text-center mb-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Slide {currentSlide + 1} de {slides.length}
              </span>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">{slides[currentSlide].title}</h4>
              <p className="text-gray-600 leading-relaxed">{slides[currentSlide].content}</p>
            </div>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center justify-between">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0 || !isPremium}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </Button>

            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              disabled={!isPremium}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
            >
              <span>{currentSlide === slides.length - 1 ? 'Concluir' : 'Próximo'}</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {!isPremium && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-2 text-orange-700">
            <Lock size={16} />
            <span className="font-medium text-sm">Conteúdo Premium</span>
          </div>
          <p className="text-orange-600 text-xs mt-1">
            Assine o plano Premium para acessar todas as aulas dos professores
          </p>
        </div>
      )}
    </div>
  );
};

export default TeacherContent;
