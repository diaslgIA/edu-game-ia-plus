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

  const containerPaddingClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-3'
  };

  const imageContainerPaddingClasses = {
    xs: 'p-1',
    sm: 'p-1',
    md: 'p-1.5',
    lg: 'p-2',
    xl: 'p-2'
  };

  return (
    <div 
      className={`flex items-center gap-4 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-pulse' : ''} transition-all duration-300 hover:scale-110`}>
        {/* Efeito de brilho aprimorado para destacar a nova logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-500 rounded-xl blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-500 rounded-xl blur-2xl opacity-30 animate-pulse animation-delay-1000"></div>
        
        {/* Container da Logo com melhor destaque visual */}
        <div className={`relative bg-white/20 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300 hover:bg-white/30 ${containerPaddingClasses[size]}`}>
          <div className={`bg-gradient-to-br from-white/90 to-white/70 rounded-lg hover:from-white hover:to-white/80 transition-all duration-300 ${imageContainerPaddingClasses[size]}`}>
            <img 
              src="/lovable-uploads/200f2456-0066-4697-99f3-2260b38b409a.png" 
              alt="EdugameIA Logo - Cérebro com Quebra-cabeça" 
              className="w-full h-full object-contain rounded-lg filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              style={{
                imageRendering: 'crisp-edges',
                filter: 'drop-shadow(0 0 10px rgba(128, 90, 213, 0.6)) contrast(1.1) brightness(1.1)'
              }}
            />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} hover:scale-105 transition-transform duration-300`}>
          <span 
            className="bg-gradient-to-r from-purple-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent hover:from-purple-500 hover:via-blue-600 hover:to-cyan-500 transition-all duration-300"
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            Edugame
          </span>
          <span 
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 transition-all duration-300"
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
