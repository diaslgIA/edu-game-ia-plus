
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, BookOpen, Award, Lock } from 'lucide-react';
import TeacherVideo from './TeacherVideo';

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
      content: "A física quântica revolucionou nossa compreensão do universo microscópico. Nesta aula, vamos explorar os conceitos fundamentais que aparecem no ENEM.",
      points: ["Dualidade onda-partícula", "Princípio da incerteza", "Quantização de energia"]
    },
    {
      title: "Princípios Fundamentais",
      content: "Os principais conceitos incluem dualidade onda-partícula e incerteza. Estes temas são recorrentes em questões de física moderna.",
      points: ["Efeito fotoelétrico", "Modelo atômico de Bohr", "Espectro eletromagnético"]
    },
    {
      title: "Aplicações Práticas",
      content: "Tecnologias modernas como lasers e computadores quânticos são baseadas nestes princípios que estudamos.",
      points: ["Laser e suas aplicações", "Tecnologia LED", "Medicina nuclear"]
    }
  ];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
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
    <div className="space-y-6">
      {contentType === 'video' ? (
        <TeacherVideo
          teacher={teacher}
          subject={subject}
          topic="Física Quântica"
          duration="15:30"
          isPremium={isPremium}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold">{teacher}</h3>
                <p className="text-blue-100 text-sm">{subject}</p>
              </div>
              {!isPremium && (
                <div className="flex items-center space-x-1 bg-orange-500 px-2 py-1 rounded-full">
                  <Lock size={12} />
                  <span className="text-xs font-medium">Premium</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                Slide {currentSlide + 1} de {slides.length}
              </span>
            </div>
          </div>

          {/* Slide Content */}
          <div className="p-6">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">{slides[currentSlide].title}</h4>
              <p className="text-gray-600 leading-relaxed">{slides[currentSlide].content}</p>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">Pontos Principais:</h5>
                <ul className="space-y-1">
                  {slides[currentSlide].points.map((point, index) => (
                    <li key={index} className="flex items-center text-blue-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 bg-gray-50 flex items-center justify-between">
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
                  className={`w-3 h-3 rounded-full transition-colors ${
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
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Lock size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-orange-800">Conteúdo Premium</h4>
              <p className="text-orange-600 text-sm">
                Desbloqueie todos os vídeos dos professores
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-orange-700">
            <div className="flex items-center">
              <Award size={16} className="mr-2" />
              <span>Acesso a todos os professores especialistas</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-2" />
              <span>Conteúdo completo sem limitações</span>
            </div>
            <div className="flex items-center">
              <Play size={16} className="mr-2" />
              <span>Vídeos em alta qualidade</span>
            </div>
          </div>

          <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            Assinar Premium por R$ 19,90/mês
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeacherContent;
