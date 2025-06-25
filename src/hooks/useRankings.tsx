
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_rankings')
        .select('*')
        .order('position', { ascending: true })
        .limit(50); // Top 50 usuários

      if (error) {
        console.error('Erro ao buscar rankings:', error);
        toast({
          title: "Erro ao carregar ranking",
          description: "Não foi possível carregar o ranking.",
          variant: "destructive"
        });
        return;
      }

      setRankings(data || []);
    } catch (error) {
      console.error('Erro ao buscar rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();

    // Configurar escuta em tempo real
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
