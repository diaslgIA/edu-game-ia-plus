
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
      <div className={`${sizeClasses[size]} relative brain-icon`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg p-1">
          <div className="w-full h-full bg-white rounded-md flex items-center justify-center">
            {/* Brain with circuits icon */}
            <svg viewBox="0 0 24 24" className="w-full h-full text-blue-600" fill="currentColor">
              <path d="M12 2C8.69 2 6 4.69 6 8v2c0 .55.45 1 1 1s1-.45 1-1V8c0-2.21 1.79-4 4-4s4 1.79 4 4v2c0 .55.45 1 1 1s1-.45 1-1V8c0-3.31-2.69-6-6-6z"/>
              <path d="M12 12c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2s2-.9 2-2v-6c0-1.1-.9-2-2-2z"/>
              <circle cx="8" cy="14" r="1"/>
              <circle cx="16" cy="14" r="1"/>
              <circle cx="8" cy="18" r="1"/>
              <circle cx="16" cy="18" r="1"/>
              <path d="M7 15h2M15 15h2M7 19h2M15 19h2" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>
        </div>
        {/* Puzzle pieces overlay */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded transform rotate-12">
          <svg viewBox="0 0 16 16" className="w-full h-full text-white" fill="currentColor">
            <path d="M3 1a1 1 0 000 2v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L6 8.586V3a1 1 0 000-2H3z"/>
          </svg>
        </div>
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
