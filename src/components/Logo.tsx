
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <img 
          src="/lovable-uploads/c89e1be7-9a09-4ae6-8521-2966b9b1bb58.png" 
          alt="EdugameIA Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]}`}>
          <span className="text-blue-600">Edugame</span>
          <span className="text-purple-600">IA</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
