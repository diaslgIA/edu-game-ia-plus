
import React from 'react';
import InteractiveBackground from './InteractiveBackground';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileContainerProps {
  children: React.ReactNode;
  background?: 'default' | 'gradient' | 'light';
}

const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  background = 'default' 
}) => {
  const { theme } = useTheme();

  const getBackgroundClass = () => {
    if (background === 'gradient') {
      return 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-black';
    }
    if (background === 'light') {
      return 'bg-gray-50 dark:bg-gray-900';
    }
    return 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:bg-gray-900';
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-300 relative overflow-hidden`}>
      <InteractiveBackground isDark={theme === 'dark'} />
      <div className="max-w-md mx-auto h-screen overflow-y-auto relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
