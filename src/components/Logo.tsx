
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-7xl'
  };

  return (
    <div 
      className={`flex items-center gap-4 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-pulse' : ''} transition-all duration-300 hover:scale-110`}>
        {/* Efeito de brilho melhorado para destacar a nova logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 rounded-xl blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-600 rounded-xl blur-2xl opacity-50 animate-pulse animation-delay-1000"></div>
        
        {/* Container da logo com bordas arredondadas e sombra */}
        <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-3 shadow-2xl border-2 border-white/20 hover:shadow-3xl transition-all duration-300 hover:border-white/40">
          <div className="bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 rounded-lg p-2 hover:from-purple-500/30 hover:via-blue-500/30 hover:to-pink-500/30 transition-all duration-300">
            <img 
              src="/lovable-uploads/384d8f7a-49db-4d4e-aaf2-ae854b3e0bc8.png" 
              alt="EdugameIA Logo - Cérebro com Quebra-cabeça" 
              className="w-full h-full object-contain rounded-lg filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              style={{
                imageRendering: 'crisp-edges',
                filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4)) contrast(1.3) brightness(1.1) saturate(1.2)'
              }}
            />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} hover:scale-105 transition-transform duration-300`}>
          <span 
            className="bg-gradient-to-r from-purple-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent hover:from-purple-500 hover:via-blue-600 hover:to-indigo-700 transition-all duration-300"
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.4)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            Edugame
          </span>
          <span 
            className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-orange-400 hover:via-pink-400 hover:to-purple-400 transition-all duration-300"
            style={{
              textShadow: '0 0 20px rgba(251, 146, 60, 0.6), 0 0 40px rgba(251, 146, 60, 0.4)',
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
