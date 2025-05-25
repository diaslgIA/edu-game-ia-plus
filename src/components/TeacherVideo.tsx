
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, Maximize, Clock, Lock } from 'lucide-react';
import { useContentLimits } from '@/hooks/useContentLimits';
import { useToast } from '@/hooks/use-toast';

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
  const [hasWatched, setHasWatched] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const { canWatchVideo, watchVideo, videosWatched, maxVideos } = useContentLimits();
  const { toast } = useToast();

  const canPlay = isPremium || canWatchVideo;

  const handlePlayPause = () => {
    if (!canPlay) {
      toast({
        title: "Limite atingido",
        description: `Você já assistiu ${videosWatched}/${maxVideos} vídeos gratuitos. Assine o Premium para acesso ilimitado!`,
        variant: "destructive",
      });
      return;
    }
    
    if (!hasWatched && !isPlaying) {
      watchVideo();
      setHasWatched(true);
    }

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-colors duration-300">
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

        {/* Limit Overlay for Free Users */}
        {!canPlay && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium">Limite de vídeos atingido</p>
              <p className="text-xs opacity-80">{videosWatched}/{maxVideos} vídeos assistidos</p>
              <p className="text-xs opacity-80 mt-2">Assine Premium para acesso ilimitado</p>
            </div>
          </div>
        )}

        {/* Premium Overlay */}
        {!isPremium && canPlay && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            Gratuito: {videosWatched + 1}/{maxVideos}
          </div>
        )}

        {/* Play Button */}
        <button
          onClick={handlePlayPause}
          disabled={!canPlay}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            canPlay 
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
        {canPlay && (
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
        <h3 className="font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">{topic}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 transition-colors duration-300">
          Nesta aula, o Professor {teacher} explica os conceitos fundamentais de {topic} 
          de forma didática e com exemplos práticos para o ENEM.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          
          {isPremium ? (
            <div className="text-green-600 text-sm font-medium">
              ✓ Acesso Liberado
            </div>
          ) : canPlay ? (
            <div className="text-orange-600 text-sm font-medium">
              🆓 Gratuito ({videosWatched + (hasWatched ? 0 : 1)}/{maxVideos})
            </div>
          ) : (
            <div className="text-red-600 text-sm font-medium">
              🔒 Limite atingido
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherVideo;
