
import React from 'react';
import FloatingElements from './FloatingElements';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'gradient' | 'light' | 'white';
}

const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  className = '', 
  background = 'gradient' 
}) => {
  const backgroundClass = {
    gradient: 'gradient-bg',
    light: 'bg-gradient-to-br from-blue-50 to-purple-50',
    white: 'bg-white'
  };

  return (
    <div className={`mobile-container ${backgroundClass[background]} ${className}`}>
      {background === 'gradient' && <FloatingElements />}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
