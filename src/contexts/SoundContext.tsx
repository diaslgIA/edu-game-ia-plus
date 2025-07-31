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
    return saved ? parseFloat(saved) : 0.5; // Volume mais baixo por padrão
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('musicPlaying');
    return saved === 'true';
  });

  const [musicVolume, setMusicVolumeState] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? parseFloat(saved) : 0.2; // Volume de música mais baixo
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundMusicRef = useRef<AudioContext | null>(null);
  const musicSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);

  const createBackgroundMusic = async () => {
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = backgroundMusicRef.current;
    const musicBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 60, audioContext.sampleRate);
    
    // Acordes mais suaves e agradáveis (progressão em Dó maior)
    const gentleChords = [
      [261.63, 329.63, 392.00], // C Major (C-E-G)
      [220.00, 277.18, 329.63], // A Minor (A-C-E)
      [349.23, 415.30, 493.88], // F Major (F-A-C)
      [392.00, 466.16, 554.37], // G Major (G-B-D)
      [246.94, 311.13, 369.99], // B Diminished (B-D-F)
      [261.63, 329.63, 392.00], // C Major (C-E-G) - volta ao início
    ];
    
    for (let channel = 0; channel < musicBuffer.numberOfChannels; channel++) {
      const channelData = musicBuffer.getChannelData(channel);
      
      for (let i = 0; i < channelData.length; i++) {
        const time = i / audioContext.sampleRate;
        let sample = 0;
        
        // Progressão mais lenta e suave
        const chordIndex = Math.floor((time * 0.15) % gentleChords.length);
        const currentChord = gentleChords[chordIndex];
        
        // Envelope mais suave para som ambiente
        const noteTime = (time * 0.15) % 6.67; // ~6.67 segundos por acorde
        let envelope = 0.3; // Volume base mais baixo
        
        if (noteTime < 1.0) {
          envelope = (noteTime / 1.0) * 0.3; // Attack mais lento
        } else if (noteTime < 5.0) {
          envelope = 0.3; // Sustain constante
        } else {
          envelope = 0.3 * (1 - (noteTime - 5.0) / 1.67); // Release suave
        }
        
        // Tocar acordes com volume mais baixo
        currentChord.forEach((freq, index) => {
          const harmonicWeight = [0.2, 0.15, 0.1][index] || 0.05; // Volumes muito mais baixos
          
          // Usar ondas mais suaves
          const wave1 = Math.sin(2 * Math.PI * freq * time);
          const wave2 = Math.sin(2 * Math.PI * freq * time * 1.005) * 0.3; // Ligeiro detuning para riqueza
          
          sample += (wave1 + wave2) * harmonicWeight * envelope;
        });
        
        // Filtro passa-baixa mais forte para som mais suave
        if (i > 1) {
          sample = sample * 0.4 + channelData[i - 1] * 0.4 + channelData[i - 2] * 0.2;
        }
        
        // Limitador suave para evitar distorção
        sample = Math.tanh(sample * 0.8) * 0.15; // Volume final muito baixo
        
        channelData[i] = sample;
      }
    }

    return musicBuffer;
  };

  const startBackgroundMusic = async () => {
    // VERIFICAÇÃO CRÍTICA: Não iniciar música se estiver silenciado
    if (isMuted) {
      console.log('Sistema silenciado - música não será iniciada');
      return;
    }
    
    try {
      if (!backgroundMusicRef.current) {
        backgroundMusicRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = backgroundMusicRef.current;
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Parar música anterior
      if (musicSourceRef.current) {
        try {
          musicSourceRef.current.stop();
        } catch (e) {
          // Ignorar erros ao parar
        }
      }

      const musicBuffer = await createBackgroundMusic();
      const source = audioContext.createBufferSource();
      const gainNode = audioContext.createGain();

      source.buffer = musicBuffer;
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Volume final muito baixo - corrigido para evitar valores próximos de zero
      const targetVolume = Math.max(0.001, musicVolume * 0.2);
      gainNode.gain.setValueAtTime(targetVolume, audioContext.currentTime);
      source.loop = true;
      source.start();

      musicSourceRef.current = source;
      musicGainRef.current = gainNode;
    } catch (error) {
      console.warn('Erro ao iniciar música de fundo:', error);
    }
  };

  const stopBackgroundMusic = () => {
    if (musicSourceRef.current) {
      try {
        musicSourceRef.current.stop();
      } catch (error) {
        // Ignorar erros
      }
      musicSourceRef.current = null;
    }
    if (musicGainRef.current) {
      musicGainRef.current = null;
    }
  };

  // Efeito para controlar música quando mudo/desmudo
  useEffect(() => {
    localStorage.setItem('soundMuted', isMuted.toString());
    
    if (isMuted) {
      // PARAR TUDO quando silenciado
      stopBackgroundMusic();
      console.log('Sistema silenciado - todos os sons parados');
    } else if (isMusicPlaying) {
      // Só iniciar música se não estiver silenciado E música estiver ativada
      startBackgroundMusic();
    }
  }, [isMuted]);

  // Outros useEffects para salvar configurações
  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('musicPlaying', isMusicPlaying.toString());
  }, [isMusicPlaying]);

  useEffect(() => {
    localStorage.setItem('musicVolume', musicVolume.toString());
  }, [musicVolume]);

  // Controlar música baseado no estado
  useEffect(() => {
    if (!isMuted && isMusicPlaying) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }

    return () => {
      stopBackgroundMusic();
    };
  }, [isMusicPlaying, isMuted]);

  // Ajustar volume da música - corrigido para evitar valores próximos de zero
  useEffect(() => {
    if (musicGainRef.current && !isMuted && isMusicPlaying) {
      const targetVolume = Math.max(0.001, musicVolume * 0.2);
      try {
        musicGainRef.current.gain.setValueAtTime(
          targetVolume, 
          backgroundMusicRef.current?.currentTime || 0
        );
      } catch (error) {
        console.warn('Erro ao ajustar volume da música:', error);
      }
    }
  }, [musicVolume, isMuted, isMusicPlaying]);

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
    // VERIFICAÇÃO ABSOLUTA: Não tocar NENHUM som se estiver silenciado
    if (isMuted) {
      console.log('Sistema silenciado - som bloqueado:', soundType);
      return;
    }

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Sons mais suaves e agradáveis
      const gentleSounds = {
        success: [523.25, 659.25, 783.99], // C5, E5, G5 (acorde maior suave)
        error: [349.23, 329.63, 311.13], // F4 para E4 para Eb4 (descida suave)
        click: [440.00, 493.88], // A4, B4 (intervalo suave)
        notification: [523.25, 587.33, 659.25] // C5, D5, E5 (melodia ascendente)
      };

      const frequencies = gentleSounds[soundType];
      
      oscillator.type = 'sine'; // Onda senoidal mais suave
      oscillator.frequency.setValueAtTime(frequencies[0], audioContext.currentTime);
      
      // Transições suaves entre notas
      frequencies.forEach((freq, index) => {
        if (index > 0) {
          try {
            oscillator.frequency.exponentialRampToValueAtTime(
              freq, 
              audioContext.currentTime + (index * 0.15)
            );
          } catch (error) {
            // Fallback para linear se exponential falhar
            oscillator.frequency.linearRampToValueAtTime(
              freq,
              audioContext.currentTime + (index * 0.15)
            );
          }
        }
      });

      // Envelope muito mais suave - valores corrigidos para evitar problemas
      const initialVolume = Math.max(0.001, volume * 0.15);
      const sustainVolume = Math.max(0.001, volume * 0.03);
      
      gainNode.gain.setValueAtTime(0.001, audioContext.currentTime); // Valor mínimo seguro
      gainNode.gain.linearRampToValueAtTime(initialVolume, audioContext.currentTime + 0.05);
      
      try {
        gainNode.gain.exponentialRampToValueAtTime(sustainVolume, audioContext.currentTime + 0.4);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
      } catch (error) {
        // Fallback para linear se exponential falhar
        gainNode.gain.linearRampToValueAtTime(sustainVolume, audioContext.currentTime + 0.4);
        gainNode.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
      }

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.warn('Erro ao reproduzir som:', error);
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
