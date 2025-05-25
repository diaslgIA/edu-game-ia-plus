
import React from 'react';
import InteractiveBackground from './InteractiveBackground';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'gradient' | 'light' | 'white';
  isDark?: boolean;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  className = '', 
  background = 'gradient',
  isDark = false
}) => {
  const backgroundClass = {
    gradient: 'relative',
    light: isDark ? 'bg-gradient-to-br from-gray-800 to-slate-800' : 'bg-gradient-to-br from-blue-50 to-purple-50',
    white: isDark ? 'bg-gray-900' : 'bg-white'
  };

  return (
    <div className={`mobile-container ${backgroundClass[background]} ${className} transition-colors duration-500`}>
      {background === 'gradient' && <InteractiveBackground isDark={isDark} />}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
