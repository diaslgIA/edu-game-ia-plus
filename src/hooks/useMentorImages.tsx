
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useMentorImages = () => {
  const [loading, setLoading] = useState(false);

  const generateMentorImage = async (mentorName: string, description: string): Promise<string | null> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('generate-mentor-image', {
        body: { mentorName, description }
      });

      if (error) {
        console.error('Erro ao gerar imagem:', error);
        return null;
      }

      return data.imageUrl;
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateMentorImage,
    loading
  };
};
