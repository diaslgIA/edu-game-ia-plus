
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VoiceMapping {
  [key: string]: string;
}

const mentorVoices: VoiceMapping = {
  'pitagoras': 'onwK4e9ZLuTAKqWW03F9', // Daniel - voz masculina sábia
  'einstein': 'CwhRBWXzGAHq8TQ4Fs17', // Roger - voz masculina intelectual
  'marie_curie': 'EXAVITQu4vr4xnSDxMaL', // Sarah - voz feminina determinada
  'darwin': 'TX3LPaxmHKxFdv7VOQHJ', // Liam - voz masculina curiosa
  'camoes': 'bIHbv24MWmeRgasZH58o', // Will - voz masculina poética
  'herodoto': 'nPczCjzI2devNBz1zQrb' // Brian - voz masculina narrativa
};

export const useTextToSpeech = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speak = async (text: string, mentorId: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Parar áudio atual se estiver tocando
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const voiceId = mentorVoices[mentorId] || mentorVoices['pitagoras'];
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { 
          text,
          voiceId,
          model: 'eleven_multilingual_v2'
        }
      });

      if (error) {
        console.error('Erro ao gerar fala:', error);
        return;
      }

      if (data?.audioContent) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        setCurrentAudio(audio);
        await audio.play();
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return {
    speak,
    stop,
    isLoading,
    isPlaying
  };
};
