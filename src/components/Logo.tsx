
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
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-float' : ''} transition-all duration-3000 hover:scale-102`}>
        {/* Efeito de brilho suave e colorido */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-3000"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-3000"></div>
        
        {/* Container da Logo sem borda preta */}
        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl w-full h-full flex items-center justify-center p-3 group-hover:bg-white/15 transition-all duration-3000 border border-white/20">
          <img 
            src="/lovable-uploads/200f2456-0066-4697-99f3-2260b38b409a.png" 
            alt="EdugameIA Logo - Cérebro com Quebra-cabeça" 
            className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-101 transition-transform duration-3000"
          />
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} transition-all duration-3000 group-hover:scale-101`}>
          <span 
            className="bg-gradient-to-r from-purple-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-blue-600 group-hover:to-cyan-500 transition-all duration-3000"
            style={{
              textShadow: '0 0 20px rgba(147, 51, 234, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            Edugame
          </span>
          <span 
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:via-orange-400 group-hover:to-red-400 transition-all duration-3000"
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
