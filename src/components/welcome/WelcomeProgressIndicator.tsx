
import React from 'react';

interface WelcomeProgressIndicatorProps {
  totalSlides: number;
  currentSlide: number;
}

const WelcomeProgressIndicator: React.FC<WelcomeProgressIndicatorProps> = ({
  totalSlides,
  currentSlide
}) => {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
          }`}
        />
      ))}
    </div>
  );
};

export default WelcomeProgressIndicator;
