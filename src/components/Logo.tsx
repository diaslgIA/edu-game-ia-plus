
import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '', 
  animated = false,
  onClick
}) => {
  const sizeClasses = {
    xs: 'w-10 h-10',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const textSizeClasses = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  return (
    <div 
      className={`flex items-center gap-4 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} relative group ${animated ? 'animate-float' : ''}`}>
        {/* Pixel-style border */}
        <div className="absolute -inset-1 bg-edu-purple"></div>
        
        {/* Container da Logo */}
        <div className="relative bg-black w-full h-full flex items-center justify-center p-2 border-2 border-black">
          <img 
            src="/lovable-uploads/200f2456-0066-4697-99f3-2260b38b409a.png" 
            alt="EdugameIA Logo - Cérebro com Quebra-cabeça" 
            className="w-full h-full object-contain pixelated group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} hover:scale-105 transition-transform duration-300`}>
          <span className="text-edu-purple">
            Edugame
          </span>
          <span className="text-edu-yellow">
            iA
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
