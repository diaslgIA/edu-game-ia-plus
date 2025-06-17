
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
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-float' : ''} transition-all duration-300 hover:scale-110`}>
        {/* Efeito de brilho ao hover */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
        
        {/* Container da Logo com efeitos de hover */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-xl w-full h-full flex items-center justify-center p-2 group-hover:bg-white/20 transition-all duration-300 group-hover:shadow-2xl group-active:scale-95">
          <img 
            src="/lovable-uploads/22e933d7-f88f-48ef-8b09-db0f38f02d37.png"
            alt="EdugameIA Logo" 
            className="w-full h-full object-contain filter drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300 group-hover:brightness-110"
          />
          
          {/* Overlay com efeito ripple no click */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-20 bg-white transition-opacity duration-150"></div>
        </div>

        {/* Particulas decorativas */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-ping"></div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} transition-all duration-300 group-hover:scale-105`}>
          <span 
            className="bg-gradient-to-r from-purple-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-600 group-hover:to-cyan-500 transition-all duration-300"
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            Edugame
          </span>
          <span 
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:via-orange-400 group-hover:to-red-400 transition-all duration-300"
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
