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
    
    // Criar música de piano ambiente programaticamente
    const musicBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 120, audioContext.sampleRate);
    
    // Notas de piano em Hz (escala de Dó maior)
    const pianoNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // C4 to C5
    
    for (let channel = 0; channel < musicBuffer.numberOfChannels; channel++) {
      const channelData = musicBuffer.getChannelData(channel);
      
      for (let i = 0; i < channelData.length; i++) {
        const time = i / audioContext.sampleRate;
        let sample = 0;
        
        // Criar acordes de piano suaves com envelope ADSR
        const noteIndex = Math.floor((time * 0.25) % pianoNotes.length);
        const freq = pianoNotes[noteIndex];
        const chordFreq1 = pianoNotes[(noteIndex + 2) % pianoNotes.length]; // Terça
        const chordFreq2 = pianoNotes[(noteIndex + 4) % pianoNotes.length]; // Quinta
        
        // Envelope ADSR para simular piano
        const noteTime = (time * 0.25) % 4;
        let envelope = 1;
        if (noteTime < 0.1) {
          envelope = noteTime / 0.1; // Attack
        } else if (noteTime < 0.3) {
          envelope = 1 - (noteTime - 0.1) / 0.2 * 0.3; // Decay
        } else if (noteTime < 3.5) {
          envelope = 0.7; // Sustain
        } else {
          envelope = 0.7 * (1 - (noteTime - 3.5) / 0.5); // Release
        }
        
        // Misturar as frequências do acorde
        sample += Math.sin(2 * Math.PI * freq * time) * 0.3 * envelope;
        sample += Math.sin(2 * Math.PI * chordFreq1 * time) * 0.2 * envelope;
        sample += Math.sin(2 * Math.PI * chordFreq2 * time) * 0.1 * envelope;
        
        // Adicionar reverb simples
        const delayTime = 0.1;
        const delaySamples = Math.floor(delayTime * audioContext.sampleRate);
        if (i > delaySamples) {
          sample += channelData[i - delaySamples] * 0.2;
        }
        
        channelData[i] = sample * 0.3; // Volume geral
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

      // Sons de piano para diferentes tipos
      const pianoSounds = {
        success: [523.25, 659.25, 783.99], // C5, E5, G5 (acorde maior)
        error: [220, 196, 174.61], // A3, G3, F3 (descendente)
        click: [440], // A4 (nota única)
        notification: [523.25, 659.25] // C5, E5
      };

      const frequencies = pianoSounds[soundType];
      
      // Simular timbre de piano com ondas senoidais e envelope
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequencies[0], audioContext.currentTime);
      
      if (frequencies.length > 1) {
        oscillator.frequency.setValueAtTime(frequencies[1], audioContext.currentTime + 0.15);
      }
      if (frequencies.length > 2) {
        oscillator.frequency.setValueAtTime(frequencies[2], audioContext.currentTime + 0.3);
      }

      // Envelope tipo piano (ataque rápido, decaimento)
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.4, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(volume * 0.1, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
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
