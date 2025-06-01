
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, BookOpen } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: string;
  image?: string;
  concepts: string[];
}

interface ContentSlidesProps {
  subject: string;
  onComplete: () => void;
}

const ContentSlides: React.FC<ContentSlidesProps> = ({ subject, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: `Introdução à ${subject}`,
      content: `Bem-vindos ao estudo de ${subject}! Nesta aula, vamos explorar os conceitos fundamentais que são essenciais para o ENEM.`,
      concepts: ['Conceitos básicos', 'Aplicações práticas', 'Exercícios resolvidos']
    },
    {
      id: 2,
      title: 'Conceitos Fundamentais',
      content: `Os principais conceitos de ${subject} incluem teorias e práticas que são frequentemente cobradas no ENEM.`,
      concepts: ['Teoria base', 'Fórmulas importantes', 'Métodos de resolução']
    },
    {
      id: 3,
      title: 'Aplicações Práticas',
      content: `Vamos ver como aplicar os conhecimentos de ${subject} em situações reais e exercícios do ENEM.`,
      concepts: ['Exercícios práticos', 'Dicas de resolução', 'Estratégias de prova']
    },
    {
      id: 4,
      title: 'Exercícios e Exemplos',
      content: `Agora que conhecemos a teoria, vamos praticar com exercícios típicos do ENEM.`,
      concepts: ['Exercícios resolvidos', 'Gabarito comentado', 'Dicas importantes']
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <BookOpen size={20} />
            <h3 className="font-bold">{subject}</h3>
          </div>
          <div className="text-sm bg-white/20 px-2 py-1 rounded-full">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
            {currentSlideData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            {currentSlideData.content}
          </p>
        </div>

        {/* Concepts */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 mb-6 transition-colors duration-300">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-300">
            Pontos Principais:
          </h4>
          <div className="space-y-2">
            {currentSlideData.concepts.map((concept, index) => (
              <div key={index} className="flex items-center text-blue-700 dark:text-blue-300 transition-colors duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progresso</span>
            <span>{Math.round(((currentSlide + 1) / slides.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-colors duration-300">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between transition-colors duration-300">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
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
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
        >
          <span>{currentSlide === slides.length - 1 ? 'Começar Atividade' : 'Próximo'}</span>
          {currentSlide === slides.length - 1 ? <Play size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default ContentSlides;
