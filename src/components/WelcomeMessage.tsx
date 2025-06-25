
import React, { useState } from 'react';
import { createSlides } from './welcome/slideData';
import WelcomeProgressIndicator from './welcome/WelcomeProgressIndicator';
import WelcomeSlide from './welcome/WelcomeSlide';
import WelcomeNavigation from './welcome/WelcomeNavigation';

interface WelcomeMessageProps {
  onComplete: () => void;
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onComplete, userName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = createSlides(userName);

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
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center z-50 p-4">
      <div className="text-center text-white w-full max-w-sm mx-auto h-full flex flex-col justify-between py-6 overflow-y-auto">
        <div className="flex-shrink-0">
          <WelcomeProgressIndicator 
            totalSlides={slides.length}
            currentSlide={currentSlide}
          />
        </div>

        <div className="flex-1 flex flex-col justify-center min-h-0 overflow-y-auto">
          <WelcomeSlide slide={slides[currentSlide]} />
        </div>

        <div className="flex-shrink-0 mt-4">
          <WelcomeNavigation
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onPrevious={prevSlide}
            onNext={nextSlide}
            onSkip={onComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
