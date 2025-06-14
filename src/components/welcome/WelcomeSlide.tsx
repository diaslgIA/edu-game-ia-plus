
import React from 'react';
import { SlideData } from './slideData';

interface WelcomeSlideProps {
  slide: SlideData;
}

const WelcomeSlide: React.FC<WelcomeSlideProps> = ({ slide }) => {
  return (
    <div className="flex-1 flex flex-col justify-center space-y-4">
      {/* Título principal */}
      <h1 className="text-xl font-bold tracking-wider">
        {slide.title}
      </h1>
      
      {/* Subtítulo */}
      <p className="text-sm opacity-90">{slide.subtitle}</p>

      {/* Ícone central */}
      <div className="flex justify-center my-4">
        <div className="relative">
          <div className="w-20 h-20 bg-cyan-300 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
              {slide.icon}
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do slide */}
      <div className="flex-1">
        {slide.content}
      </div>
    </div>
  );
};

export default WelcomeSlide;
