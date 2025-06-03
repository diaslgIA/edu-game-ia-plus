
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '', 
  animated = false 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-pulse' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-40 animate-pulse"></div>
        <div className="relative bg-white rounded-full p-2 shadow-2xl border-4 border-blue-500/30 backdrop-blur-sm">
          <img 
            src="/lovable-uploads/08babff9-54df-4763-8eb1-122f7d168e73.png" 
            alt="EdugameIA Logo" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''} drop-shadow-2xl`}>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg text-shadow-lg">
            Edugame
          </span>
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg text-shadow-lg">
            iA
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
