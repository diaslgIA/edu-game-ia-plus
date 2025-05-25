
import React from 'react';

interface InteractiveBackgroundProps {
  isDark?: boolean;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ isDark = false }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900'
          : 'bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600'
      }`}>
        {/* Animated Gradient Overlay */}
        <div className={`absolute inset-0 animate-pulse transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-tr from-gray-700/30 via-slate-600/20 to-gray-800/30'
            : 'bg-gradient-to-tr from-purple-400/30 via-pink-300/20 to-blue-400/30'
        }`}></div>
      </div>

      {/* Floating Brain Elements */}
      <div className="absolute top-10 left-8 w-16 h-16 opacity-20 animate-float">
        <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-500 ${
          isDark ? 'text-gray-300' : 'text-white'
        }`}>
          <path d="M50 10c-5.5 0-10 4.5-10 10 0 2.8 1.1 5.3 3 7.1-1.9 1.8-3 4.3-3 7.1 0 5.5 4.5 10 10 10s10-4.5 10-10c0-2.8-1.1-5.3-3-7.1 1.9-1.8 3-4.3 3-7.1 0-5.5-4.5-10-10-10z" fill="currentColor"/>
          <circle cx="45" cy="25" r="3" fill="currentColor"/>
          <circle cx="55" cy="25" r="3" fill="currentColor"/>
          <path d="M40 35c2 3 6 5 10 5s8-2 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="absolute top-32 right-12 w-12 h-12 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-500 ${
          isDark ? 'text-blue-300' : 'text-yellow-200'
        }`}>
          <path d="M50 10c-5.5 0-10 4.5-10 10 0 2.8 1.1 5.3 3 7.1-1.9 1.8-3 4.3-3 7.1 0 5.5 4.5 10 10 10s10-4.5 10-10c0-2.8-1.1-5.3-3-7.1 1.9-1.8 3-4.3 3-7.1 0-5.5-4.5-10-10-10z" fill="currentColor"/>
        </svg>
      </div>

      <div className="absolute bottom-20 left-16 w-20 h-20 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" className={`w-full h-full transition-colors duration-500 ${
          isDark ? 'text-purple-300' : 'text-cyan-200'
        }`}>
          <path d="M50 10c-5.5 0-10 4.5-10 10 0 2.8 1.1 5.3 3 7.1-1.9 1.8-3 4.3-3 7.1 0 5.5 4.5 10 10 10s10-4.5 10-10c0-2.8-1.1-5.3-3-7.1 1.9-1.8 3-4.3 3-7.1 0-5.5-4.5-10-10-10z" fill="currentColor"/>
        </svg>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute top-48 left-8 w-8 h-8 opacity-20 animate-pulse">
        <div className={`w-full h-full rounded-full transition-colors duration-500 ${
          isDark ? 'bg-gray-300' : 'bg-white'
        }`}></div>
      </div>

      <div className="absolute top-64 right-20 w-6 h-6 opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}>
        <div className={`w-full h-full transform rotate-45 transition-colors duration-500 ${
          isDark ? 'bg-blue-300' : 'bg-yellow-200'
        }`}></div>
      </div>

      <div className="absolute bottom-40 right-8 w-10 h-10 opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }}>
        <div className={`w-full h-full rounded-lg transform rotate-12 transition-colors duration-500 ${
          isDark ? 'bg-purple-300' : 'bg-pink-200'
        }`}></div>
      </div>

      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id={`brain-pattern-${isDark ? 'dark' : 'light'}`} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="2" fill={isDark ? '#d1d5db' : 'white'}/>
            <circle cx="80" cy="40" r="2" fill={isDark ? '#d1d5db' : 'white'}/>
            <circle cx="50" cy="70" r="2" fill={isDark ? '#d1d5db' : 'white'}/>
            <line x1="20" y1="20" x2="80" y2="40" stroke={isDark ? '#d1d5db' : 'white'} strokeWidth="1"/>
            <line x1="80" y1="40" x2="50" y2="70" stroke={isDark ? '#d1d5db' : 'white'} strokeWidth="1"/>
            <line x1="50" y1="70" x2="20" y2="20" stroke={isDark ? '#d1d5db' : 'white'} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#brain-pattern-${isDark ? 'dark' : 'light'})`}/>
      </svg>

      {/* Particle Effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-30 animate-ping transition-colors duration-500 ${
              isDark ? 'bg-gray-300' : 'bg-white'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InteractiveBackground;
