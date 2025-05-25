
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, Maximize, Clock } from 'lucide-react';

interface TeacherVideoProps {
  teacher: string;
  subject: string;
  topic: string;
  duration: string;
  isPremium: boolean;
}

const TeacherVideo: React.FC<TeacherVideoProps> = ({ 
  teacher, 
  subject, 
  topic, 
  duration,
  isPremium 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (!isPremium) return;
    
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / 900) * 100; // 15 minutos = 900 segundos
          setProgress(newProgress);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 900;
          }
          return newTime;
        });
      }, 100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      {/* Video Player */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 aspect-video">
        {/* Video Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 13.5V10C15 8.9 14.1 8 13 8H7V6C7 5.4 6.6 5 6 5S5 5.4 5 6V8H4C2.9 8 2 8.9 2 10V19C2 20.1 2.9 21 4 21H13C14.1 21 15 20.1 15 19V16.5L21 23V21C22.1 21 23 20.1 23 19V11C23 9.9 22.1 9 21 9Z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">{teacher}</h3>
              <p className="text-sm opacity-80">{subject} - {topic}</p>
            </div>
          </div>
        </div>

        {/* Premium Overlay */}
        {!isPremium && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18,8H17V6A5,5 0 0,0 12,1A5,5 0 0,0 7,6V8H6A2,2 0 0,0 4,10V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V10A2,2 0 0,0 18,8M12,3A3,3 0 0,1 15,6V8H9V6A3,3 0 0,1 12,3Z"/>
                </svg>
              </div>
              <p className="text-sm font-medium">Conteúdo Premium</p>
              <p className="text-xs opacity-80">Assine para assistir</p>
            </div>
          </div>
        )}

        {/* Play Button */}
        <button
          onClick={handlePlayPause}
          disabled={!isPremium}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isPremium 
              ? 'bg-white/20 group-hover:bg-white/30 group-hover:scale-110' 
              : 'bg-gray-500/50 cursor-not-allowed'
          }`}>
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </div>
        </button>

        {/* Video Controls */}
        {isPremium && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center space-x-3">
                <button onClick={handlePlayPause}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <Volume2 size={18} />
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{formatTime(currentTime)} / {duration}</span>
                </div>
              </div>
              <button>
                <Maximize size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{topic}</h3>
        <p className="text-gray-600 text-sm mb-3">
          Nesta aula, o Professor {teacher} explica os conceitos fundamentais de {topic} 
          de forma didática e com exemplos práticos para o ENEM.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          
          {isPremium ? (
            <div className="text-green-600 text-sm font-medium">
              ✓ Acesso Liberado
            </div>
          ) : (
            <div className="text-orange-600 text-sm font-medium">
              🔒 Premium
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherVideo;
