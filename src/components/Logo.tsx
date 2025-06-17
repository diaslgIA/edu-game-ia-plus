
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
      className={`flex items-center gap-4 ${className} ${onClick ? 'cursor-pointer' : ''} group`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-float' : ''} transition-all duration-1000 hover:scale-102`}>
        {/* Efeito de brilho suave */}
        <div className="absolute -inset-1 bg-gradient-to-r from-edu-purple via-edu-pink to-edu-yellow rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
        
        {/* Container da Logo */}
        <div className="relative bg-black/40 backdrop-blur-md rounded-xl shadow-lg w-full h-full flex items-center justify-center p-2 group-hover:bg-black/50 transition-colors duration-1000">
          <img 
            src="/lovable-uploads/200f2456-0066-4697-99f3-2260b38b409a.png" 
            alt="EdugameIA Logo - Cérebro com Quebra-cabeça" 
            className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-101 transition-transform duration-1000"
          />
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} transition-all duration-1000 group-hover:scale-101`}>
          <span 
            className="bg-gradient-to-r from-purple-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-600 group-hover:to-cyan-500 transition-all duration-1000"
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            Edugame
          </span>
          <span 
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:via-orange-400 group-hover:to-red-400 transition-all duration-1000"
            style={{
              textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            iA
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
