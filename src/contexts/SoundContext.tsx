
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
    if (typeof window === 'undefined') return false;
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
    
    // Notas de piano em Hz (escala de Dó maior e acordes)
    const pianoChords = [
      [261.63, 329.63, 392.00], // C Major (C-E-G)
      [293.66, 369.99, 440.00], // D Minor (D-F-A)
      [329.63, 415.30, 493.88], // E Minor (E-G-B)
      [349.23, 440.00, 523.25], // F Major (F-A-C)
      [392.00, 493.88, 587.33], // G Major (G-B-D)
      [440.00, 523.25, 659.25], // A Minor (A-C-E)
    ];
    
    for (let channel = 0; channel < musicBuffer.numberOfChannels; channel++) {
      const channelData = musicBuffer.getChannelData(channel);
      
      for (let i = 0; i < channelData.length; i++) {
        const time = i / audioContext.sampleRate;
        let sample = 0;
        
        // Progressão de acordes mais complexa
        const chordIndex = Math.floor((time * 0.2) % pianoChords.length);
        const currentChord = pianoChords[chordIndex];
        
        // Envelope ADSR para simular piano
        const noteTime = (time * 0.2) % 5;
        let envelope = 1;
        if (noteTime < 0.1) {
          envelope = noteTime / 0.1; // Attack
        } else if (noteTime < 0.5) {
          envelope = 1 - (noteTime - 0.1) / 0.4 * 0.4; // Decay
        } else if (noteTime < 4.0) {
          envelope = 0.6; // Sustain
        } else {
          envelope = 0.6 * (1 - (noteTime - 4.0) / 1.0); // Release
        }
        
        // Tocar o acorde completo
        currentChord.forEach((freq, index) => {
          const harmonicWeight = [0.4, 0.25, 0.15][index] || 0.1;
          sample += Math.sin(2 * Math.PI * freq * time) * harmonicWeight * envelope;
          
          // Adicionar harmônicos para enriquecer o som
          sample += Math.sin(2 * Math.PI * freq * 2 * time) * harmonicWeight * 0.1 * envelope;
        });
        
        // Adicionar reverb simples
        const delayTime = 0.15;
        const delaySamples = Math.floor(delayTime * audioContext.sampleRate);
        if (i > delaySamples) {
          sample += channelData[i - delaySamples] * 0.3;
        }
        
        // Filtro passa-baixa suave para ambiente
        if (i > 0) {
          sample = sample * 0.7 + channelData[i - 1] * 0.3;
        }
        
        channelData[i] = sample * 0.25; // Volume geral mais baixo
      }
    }

    return musicBuffer;
  };

  const startBackgroundMusic = async () => {
    // Verificar se está silenciado antes de iniciar
    if (isMuted) return;
    
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

      gainNode.gain.setValueAtTime(musicVolume * 0.4, audioContext.currentTime);
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
      try {
        musicSourceRef.current.stop();
      } catch (error) {
        // Ignorar erros ao parar a música
      }
      musicSourceRef.current = null;
    }
  };

  useEffect(() => {
    localStorage.setItem('soundMuted', isMuted.toString());
    
    // Parar música imediatamente quando silenciado
    if (isMuted) {
      stopBackgroundMusic();
    } else if (isMusicPlaying) {
      startBackgroundMusic();
    }
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
    if (musicGainRef.current && !isMuted) {
      musicGainRef.current.gain.setValueAtTime(
        musicVolume * 0.4, 
        backgroundMusicRef.current?.currentTime || 0
      );
    }
  }, [musicVolume, isMuted]);

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
    // VERIFICAÇÃO CRÍTICA: Não tocar som se estiver silenciado
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

      // Sons de piano melhorados para diferentes tipos
      const pianoSounds = {
        success: [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6 (acorde maior arpejado)
        error: [220, 207.65, 196, 185], // A3 descendente
        click: [440, 554.37], // A4, C#5 (quinta aumentada)
        notification: [523.25, 659.25, 523.25] // C5, E5, C5 (padrão)
      };

      const frequencies = pianoSounds[soundType];
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequencies[0], audioContext.currentTime);
      
      // Sequência melódica
      frequencies.forEach((freq, index) => {
        if (index > 0) {
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + (index * 0.1));
        }
      });

      // Envelope tipo piano melhorado
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(volume * 0.05, audioContext.currentTime + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.0);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.0);
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
