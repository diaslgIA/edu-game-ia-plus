
import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  background?: 'default' | 'gradient';
}

const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  background = 'default' 
}) => {
  const getBackgroundClass = () => {
    if (background === 'gradient') {
      return 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-black';
    }
    return 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:bg-gray-900';
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} transition-colors duration-300`}>
      <div className="max-w-md mx-auto h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
