
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Lightbulb, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubjectContent } from '@/types/subject-content';

interface ContentSlidesProps {
  content: SubjectContent;
  onComplete: () => void;
}

const ContentSlides: React.FC<ContentSlidesProps> = ({ content, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gerar slides dinamicamente baseado no conteúdo
  const generateSlides = () => {
    const slides = [];

    // Slide de introdução
    slides.push({
      type: 'intro',
      title: content.title,
      content: content.description || 'Vamos explorar este tópico importante!',
      icon: <BookOpen size={48} className="text-blue-400" />
    });

    // Slide de explicação detalhada (se existir)
    if (content.detailed_explanation) {
      slides.push({
        type: 'explanation',
        title: 'Entendendo o Conceito',
        content: content.detailed_explanation,
        icon: <Lightbulb size={48} className="text-yellow-400" />
      });
    }

    // Slide de conceitos-chave (se existirem)
    if (content.key_concepts && Array.isArray(content.key_concepts) && content.key_concepts.length > 0) {
      slides.push({
        type: 'concepts',
        title: 'Conceitos Importantes',
        content: content.key_concepts,
        icon: <Target size={48} className="text-green-400" />
      });
    }

    // Slide de exemplos (se existirem)
    if (content.examples) {
      slides.push({
        type: 'examples',
        title: 'Exemplos Práticos',
        content: content.examples,
        icon: <Zap size={48} className="text-purple-400" />
      });
    }

    // Slide de aplicações práticas (se existirem)
    if (content.practical_applications) {
      slides.push({
        type: 'applications',
        title: 'Aplicações Práticas',
        content: content.practical_applications,
        icon: <Target size={48} className="text-orange-400" />
      });
    }

    // Slide de dicas de estudo (se existirem)
    if (content.study_tips) {
      slides.push({
        type: 'tips',
        title: 'Dicas de Estudo',
        content: content.study_tips,
        icon: <Lightbulb size={48} className="text-cyan-400" />
      });
    }

    return slides;
  };

  const slides = generateSlides();

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

  const renderSlideContent = (slide: any) => {
    switch (slide.type) {
      case 'concepts':
        return (
          <div className="space-y-4">
            {Array.isArray(slide.content) ? (
              <ul className="space-y-3">
                {slide.content.map((concept: any, index: number) => (
                  <li key={index} className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-white/90 leading-relaxed">
                      {typeof concept === 'string' ? concept : concept.name || concept.title || JSON.stringify(concept)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/90 text-lg leading-relaxed">{slide.content}</p>
            )}
          </div>
        );
      
      default:
        return (
          <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">
            {slide.content}
          </p>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Progress bar */}
      <div className="w-full bg-black/20 h-1">
        <div 
          className="h-1 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {slides[currentSlide] && (
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                {slides[currentSlide].icon}
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">
                {slides[currentSlide].title}
              </h2>
              <div className="text-left">
                {renderSlideContent(slides[currentSlide])}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-black/20">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <ChevronLeft size={20} className="mr-2" />
            Anterior
          </Button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            {currentSlide === slides.length - 1 ? 'Finalizar' : 'Próximo'}
            <ChevronRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentSlides;
