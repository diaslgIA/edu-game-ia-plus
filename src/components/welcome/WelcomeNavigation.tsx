
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface WelcomeNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
}

const WelcomeNavigation: React.FC<WelcomeNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onSkip
}) => {
  const isLastSlide = currentSlide === totalSlides - 1;
  const isFirstSlide = currentSlide === 0;

  return (
    <div className="space-y-3 mt-6">
      <div className="flex gap-3">
        {!isFirstSlide && (
          <Button
            onClick={onPrevious}
            variant="outline"
            className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 py-2 text-sm"
          >
            Anterior
          </Button>
        )}
        
        <Button
          onClick={onNext}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2"
        >
          {isLastSlide ? (
            <>
              <GraduationCap className="w-4 h-4" />
              COMEÇAR
            </>
          ) : (
            <>
              Próximo
              <ArrowRight className="w-3 h-3" />
            </>
          )}
        </Button>
      </div>

      {/* Pular tutorial */}
      {!isLastSlide && (
        <button
          onClick={onSkip}
          className="text-white/60 text-xs hover:text-white/80 transition-colors"
        >
          Pular apresentação
        </button>
      )}
    </div>
  );
};

export default WelcomeNavigation;
