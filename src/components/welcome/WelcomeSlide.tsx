
import React from 'react';
import { SlideData } from './slideData';

interface WelcomeSlideProps {
  slide: SlideData;
}

const WelcomeSlide: React.FC<WelcomeSlideProps> = ({ slide }) => {
  return (
    <div className="flex flex-col justify-center space-y-4 px-2">
      {/* Título principal */}
      <h1 className="text-lg font-bold tracking-wider text-center">
        {slide.title}
      </h1>
      
      {/* Subtítulo */}
      <p className="text-sm opacity-90 text-center">{slide.subtitle}</p>

      {/* Ícone central */}
      <div className="flex justify-center my-6">
        <div className="relative">
          <div className="w-16 h-16 bg-cyan-300 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              {slide.icon}
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 border border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do slide */}
      <div className="text-center text-sm leading-relaxed">
        {slide.content}
      </div>
    </div>
  );
};

export default WelcomeSlide;
