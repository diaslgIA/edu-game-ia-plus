
import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating crosses/plus symbols */}
      <div className="floating-cross top-10 left-8 text-yellow-300 text-xl animate-pulse-glow" style={{ animationDelay: '0s' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2v6H2v4h6v6h4v-6h6V8h-6V2H8z"/>
        </svg>
      </div>
      
      <div className="floating-cross top-32 right-12 text-cyan-300 text-lg animate-pulse-glow" style={{ animationDelay: '1s' }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2v6H2v4h6v6h4v-6h6V8h-6V2H8z"/>
        </svg>
      </div>

      <div className="floating-cross top-48 left-16 text-purple-300 text-sm animate-pulse-glow" style={{ animationDelay: '2s' }}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2v6H2v4h6v6h4v-6h6V8h-6V2H8z"/>
        </svg>
      </div>

      <div className="floating-cross top-64 right-6 text-blue-300 text-lg animate-pulse-glow" style={{ animationDelay: '3s' }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2v6H2v4h6v6h4v-6h6V8h-6V2H8z"/>
        </svg>
      </div>

      <div className="floating-cross bottom-32 left-10 text-pink-300 text-xl animate-pulse-glow" style={{ animationDelay: '4s' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2v6H2v4h6v6h4v-6h6V8h-6V2H8z"/>
        </svg>
      </div>

      <div className="floating-cross bottom-48 right-8 text-green-300 text-sm animate-pulse-glow" style={{ animationDelay: '5s' }}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2v6H2v4h6v6h4v-6h6V8h-6V2H8z"/>
        </svg>
      </div>

      {/* Sparkle elements */}
      <div className="absolute top-20 right-20 text-white animate-pulse" style={{ animationDelay: '0.5s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>

      <div className="absolute bottom-20 left-20 text-white animate-pulse" style={{ animationDelay: '2.5s' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
    </div>
  );
};

export default FloatingElements;
