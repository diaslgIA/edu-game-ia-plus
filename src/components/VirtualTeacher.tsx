import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, User } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

interface VirtualTeacherProps {
  subject: string;
  topic: string;
  onComplete: () => void;
}

const VirtualTeacher: React.FC<VirtualTeacherProps> = ({ subject, topic, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isMuted } = useSound();

  const teacherContent = {
    Matemática: {
      text: "Olá, pessoal! Eu sou o Professor Virtual e hoje vamos estudar matemática. A matemática é fundamental para o ENEM e está presente em muitas situações do nosso dia a dia. Vamos começar entendendo os conceitos básicos e como aplicá-los nas questões da prova. Prestem atenção às fórmulas e aos métodos de resolução que vou apresentar.",
      duration: 30
    },
    Português: {
      text: "Bem-vindos à nossa aula de português! Sou seu professor virtual e vou ajudá-los a dominar a língua portuguesa para o ENEM. Hoje vamos trabalhar interpretação de texto, gramática e redação. A língua portuguesa é nossa ferramenta de comunicação mais importante, então vamos aprender a usá-la corretamente.",
      duration: 28
    },
    Física: {
      text: "Olá, estudantes! Eu sou seu professor virtual de física. A física explica como o mundo funciona ao nosso redor. No ENEM, vocês encontrarão questões sobre mecânica, eletricidade, óptica e muito mais. Vamos estudar as leis fundamentais e aprender a resolver problemas passo a passo.",
      duration: 32
    },
    Química: {
      text: "Saudações, turma! Sou o professor virtual de química. A química estuda a matéria e suas transformações. Para o ENEM, é importante entender as reações químicas, a tabela periódica e os cálculos químicos. Vamos explorar esse mundo microscópico fascinante juntos!",
      duration: 29
    }
  };

  const currentContent = teacherContent[subject as keyof typeof teacherContent] || teacherContent.Matemática;

  useEffect(() => {
    if (isPlaying && !isMuted) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          const newProgress = (newTime / currentContent.duration) * 100;
          setProgress(newProgress);

          // Simular fala do professor
          const words = currentContent.text.split(' ');
          const wordsPerSecond = words.length / currentContent.duration;
          const currentWordIndex = Math.floor(newTime * wordsPerSecond);
          const currentWords = words.slice(0, currentWordIndex + 1);
          setCurrentText(currentWords.join(' '));

          if (newProgress >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            onComplete();
            return currentContent.duration;
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isMuted, currentContent, onComplete]);

  const handlePlayPause = () => {
    if (isMuted) {
      onComplete();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
      {/* Teacher Avatar */}
      <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
            <User className="w-12 h-12" />
          </div>
          <h3 className="text-xl font-bold mb-2">Professor Virtual</h3>
          <p className="text-sm opacity-90">{subject} - {topic}</p>
        </div>

        {/* Play Button Overlay */}
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all">
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </div>
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="w-full bg-white/20 rounded-full h-1 mb-2">
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-2">
              {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{formatTime(currentTime)} / {formatTime(currentContent.duration)}</span>
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Teacher Speech */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
          O que o professor está dizendo:
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[120px] transition-colors duration-300">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            {isPlaying ? currentText : currentContent.text}
            {isPlaying && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {isMuted && (
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg transition-colors duration-300">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm transition-colors duration-300">
              Som desabilitado. Clique em "Play" para pular para a atividade.
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onComplete}
            className="text-sm"
          >
            Pular Aula
          </Button>
          <Button
            onClick={handlePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isPlaying ? 'Pausar' : 'Iniciar'} Aula
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTeacher;
