
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundContextType {
  isMuted: boolean;
  volume: number;
  isMusicPlaying: boolean;
  musicVolume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  toggleMusic: () => void;
  setMusicVolume: (volume: number) => void;
  playSound: (soundType: 'success' | 'error' | 'click' | 'notification') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('soundMuted');
    return saved === 'true';
  });
  
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('soundVolume');
    return saved ? parseFloat(saved) : 0.7;
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    const saved = localStorage.getItem('musicPlaying');
    return saved === 'true';
  });

  const [musicVolume, setMusicVolumeState] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.3;
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicRef = useRef<AudioContext | null>(null);
  const musicSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    localStorage.setItem('soundMuted', isMuted.toString());
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('musicPlaying', isMusicPlaying.toString());
  }, [isMusicPlaying]);

  useEffect(() => {
    localStorage.setItem('musicVolume', musicVolume.toString());
  }, [musicVolume]);

  const createBackgroundMusic = async () => {
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = backgroundMusicRef.current;
    
    // Criar música ambiente programaticamente (simulando música licenciada)
    const musicBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 60, audioContext.sampleRate);
    
    // Gerar tons harmônicos suaves para música ambiente
    for (let channel = 0; channel < musicBuffer.numberOfChannels; channel++) {
      const channelData = musicBuffer.getChannelData(channel);
      const baseFreq = channel === 0 ? 220 : 330; // A3 e E4
      
      for (let i = 0; i < channelData.length; i++) {
        const time = i / audioContext.sampleRate;
        // Criar harmônicos suaves com fade in/out
        const envelope = Math.sin(time * 0.1) * 0.3 + 0.2;
        const wave1 = Math.sin(2 * Math.PI * baseFreq * time) * 0.3;
        const wave2 = Math.sin(2 * Math.PI * baseFreq * 1.5 * time) * 0.2;
        const wave3 = Math.sin(2 * Math.PI * baseFreq * 2 * time) * 0.1;
        
        channelData[i] = (wave1 + wave2 + wave3) * envelope;
      }
    }

    return musicBuffer;
  };

  const startBackgroundMusic = async () => {
    try {
      if (!backgroundMusicRef.current) {
        backgroundMusicRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = backgroundMusicRef.current;
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Parar música anterior se estiver tocando
      if (musicSourceRef.current) {
        musicSourceRef.current.stop();
      }

      const musicBuffer = await createBackgroundMusic();
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = musicBuffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      gainNode.gain.setValueAtTime(musicVolume * 0.5, audioContext.currentTime);
      source.loop = true;
      source.start();

      musicSourceRef.current = source;
      musicGainRef.current = gainNode;
    } catch (error) {
      console.warn('Não foi possível iniciar a música de fundo:', error);
    }
  };

  const stopBackgroundMusic = () => {
    if (musicSourceRef.current) {
      musicSourceRef.current.stop();
      musicSourceRef.current = null;
    }
  };

  useEffect(() => {
    if (isMusicPlaying && !isMuted) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }

    return () => {
      stopBackgroundMusic();
    };
  }, [isMusicPlaying, isMuted]);

  useEffect(() => {
    if (musicGainRef.current) {
      musicGainRef.current.gain.setValueAtTime(
        musicVolume * 0.5, 
        backgroundMusicRef.current?.currentTime || 0
      );
    }
  }, [musicVolume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const setMusicVolume = (newVolume: number) => {
    setMusicVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  const playSound = (soundType: 'success' | 'error' | 'click' | 'notification') => {
    if (isMuted) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Diferentes frequências para diferentes tipos de som
      const frequencies = {
        success: [523, 659, 784], // C, E, G
        error: [220, 196], // A, G (mais grave e sombrio)
        click: [800], // Click único
        notification: [523, 659] // C, E
      };

      const freq = frequencies[soundType];
      
      oscillator.frequency.setValueAtTime(freq[0], audioContext.currentTime);
      if (freq.length > 1) {
        oscillator.frequency.setValueAtTime(freq[1], audioContext.currentTime + 0.1);
      }
      if (freq.length > 2) {
        oscillator.frequency.setValueAtTime(freq[2], audioContext.currentTime + 0.2);
      }

      gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Não foi possível reproduzir o som:', error);
    }
  };

  return (
    <SoundContext.Provider value={{ 
      isMuted, 
      volume, 
      isMusicPlaying,
      musicVolume,
      toggleMute, 
      setVolume, 
      toggleMusic,
      setMusicVolume,
      playSound 
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
