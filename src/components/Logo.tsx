
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
          src="/lovable-uploads/08babff9-54df-4763-8eb1-122f7d168e73.png" 
          alt="EdugameIA Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div className={`font-bold ${textSizeClasses[size]}`}>
          <span className="text-blue-600">Edugame</span>
          <span className="text-yellow-500">iA</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
