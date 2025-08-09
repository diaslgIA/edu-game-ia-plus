
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { createTimeoutController } from '@/utils/withTimeout';

export interface RankingUser {
  id: string;
  user_id: string;
  full_name: string;
  total_points: number;
  position: number;
  title: string | null;
  badge: string | null;
  updated_at: string;
}

export const useRankings = () => {
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRankings = async () => {
    const { controller, cancel } = createTimeoutController(10000);
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_rankings')
        .select('*')
        .order('position', { ascending: true })
        .limit(50)
        .abortSignal(controller.signal);

      cancel();

      if (error) {
        console.error('Erro ao buscar rankings:', error);
        toast({
          title: "Erro ao carregar ranking",
          description: "Não foi possível carregar o ranking agora.",
          variant: "destructive"
        });
        setRankings([]);
        return;
      }

      setRankings(data || []);
    } catch (error: any) {
      cancel();
      console.error('Erro ao buscar rankings:', error);
      const isAbort = error?.name === 'AbortError';
      toast({
        title: isAbort ? "Tempo esgotado" : "Erro ao carregar ranking",
        description: isAbort ? "A requisição demorou demais. Tente novamente." : "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();

    // Escuta em tempo real (ranking)
    const channel = supabase
      .channel('user_rankings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_rankings'
        },
        () => {
          console.log('Ranking atualizado em tempo real');
          fetchRankings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { rankings, loading, fetchRankings };
};
