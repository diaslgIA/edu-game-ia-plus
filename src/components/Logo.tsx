
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
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative ${animated ? 'animate-pulse' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30"></div>
        <div className="relative bg-white rounded-full p-1 shadow-lg border-2 border-blue-500/20">
          <img 
            src="/lovable-uploads/08babff9-54df-4763-8eb1-122f7d168e73.png" 
            alt="EdugameIA Logo" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]} ${animated ? 'animate-bounce' : ''}`}>
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-md">
            Edugame
          </span>
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-md">
            iA
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
