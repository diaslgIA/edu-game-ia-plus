
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
    lg: 'w-28 h-28',
    xl: 'w-40 h-40'
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
        {/* Efeito de brilho melhorado */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-2xl opacity-40 animate-pulse animation-delay-1000"></div>
        
        {/* Logo com melhor qualidade */}
        <div className="relative bg-white rounded-full p-2 shadow-2xl border-4 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full p-3 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300">
            <img 
              src="/lovable-uploads/08babff9-54df-4763-8eb1-122f7d168e73.png" 
              alt="EdugameIA Logo" 
              className="w-full h-full object-contain rounded-full filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              style={{
                imageRendering: 'crisp-edges',
                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.7)) contrast(1.2) brightness(1.2)'
              }}
            />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} hover:scale-105 transition-transform duration-300`}>
          <span 
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300"
            style={{
              textShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
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
