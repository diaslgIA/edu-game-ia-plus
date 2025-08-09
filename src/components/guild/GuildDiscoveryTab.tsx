
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Unlock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { createTimeoutController } from '@/utils/withTimeout';

interface Guild {
  id: string;
  name: string;
  description: string;
  guild_code: string;
  owner_id: string;
  total_points: number;
  is_public: boolean;
  created_at: string;
  member_count?: number;
}

const GuildDiscoveryTab: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [publicGuilds, setPublicGuilds] = useState<Guild[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [requesting, setRequesting] = useState<string | null>(null);

  const fetchPublicGuilds = async () => {
    if (!user) return;

    const { controller, cancel } = createTimeoutController(10000);
    try {
      setLoading(true);
      
      // Buscar guildas públicas
      let query = supabase
        .from('guilds')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .abortSignal(controller.signal);

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data: guilds, error } = await query;
      cancel();

      if (error) throw error;

      if (!guilds) {
        setPublicGuilds([]);
        return;
      }

      // Buscar guildas onde o usuário é membro (pode ler suas próprias linhas)
      const { data: userGuilds } = await supabase
        .from('guild_members')
        .select('guild_id')
        .eq('profile_id', user.id);

      const userGuildIds = new Set(userGuilds?.map(g => g.guild_id) || []);

      // Filtrar guildas onde o usuário não é membro
      const availableGuilds = guilds.filter(guild => !userGuildIds.has(guild.id));

      // Contar membros de cada guilda (pode falhar por RLS quando usuário não é membro)
      const guildsWithCount = await Promise.all(
        availableGuilds.map(async (guild) => {
          try {
            const { count } = await supabase
              .from('guild_members')
              .select('*', { count: 'exact', head: true })
              .eq('guild_id', guild.id);

            return { ...guild, member_count: count || 0 };
          } catch (error) {
            console.warn(`Erro ao contar membros da guilda ${guild.id}:`, error);
            return { ...guild, member_count: 0 };
          }
        })
      );

      setPublicGuilds(guildsWithCount);
    } catch (error: any) {
      cancel();
      console.error('Erro ao buscar guildas públicas:', error);
      toast({
        title: error?.name === 'AbortError' ? "Tempo esgotado" : "Erro ao carregar guildas",
        description: error?.name === 'AbortError'
          ? "A requisição demorou demais. Tente novamente."
          : "Não foi possível carregar as guildas públicas.",
        variant: "destructive"
      });
      setPublicGuilds([]);
    } finally {
      setLoading(false);
    }
  };

  const requestToJoin = async (guildId: string, guildName: string) => {
    if (!user) return;

    try {
      setRequesting(guildId);
      
      const { error } = await supabase
        .from('guild_join_requests')
        .insert({
          guild_id: guildId,
          requester_id: user.id,
          message: `Olá! Gostaria de participar da guilda ${guildName}.`
        });

      if (error) {
        if ((error as any).code === '23505') {
          toast({
            title: "Solicitação já enviada",
            description: "Você já enviou uma solicitação para esta guilda.",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Solicitação enviada!",
        description: "Sua solicitação foi enviada para o líder da guilda.",
      });

      // Remover guilda da lista
      setPublicGuilds(prev => prev.filter(g => g.id !== guildId));
    } catch (error) {
      console.error('Erro ao solicitar entrada:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a solicitação.",
        variant: "destructive"
      });
    } finally {
      setRequesting(null);
    }
  };

  useEffect(() => {
    fetchPublicGuilds();
  }, [searchQuery, user]);

  if (!user) {
    return (
      <div className="text-center py-8 text-white/80">
        <p>Faça login para descobrir guildas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar guildas públicas..."
          className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-white/80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p>Buscando guildas...</p>
        </div>
      ) : publicGuilds.length === 0 ? (
        <div className="text-center py-8 text-white/80">
          <Users size={48} className="mx-auto mb-4 opacity-50" />
          <p>{searchQuery ? 'Nenhuma guilda encontrada' : 'Nenhuma guilda pública disponível'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {publicGuilds.map((guild) => (
            <div
              key={guild.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{guild.name}</h3>
                  <Unlock size={14} className="text-green-400" />
                </div>
                <Button
                  onClick={() => requestToJoin(guild.id, guild.name)}
                  disabled={requesting === guild.id || (guild.member_count || 0) >= 20}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                >
                  {requesting === guild.id ? (
                    'Enviando...'
                  ) : (guild.member_count || 0) >= 20 ? (
                    'Lotada'
                  ) : (
                    <>
                      <Plus size={14} className="mr-1" />
                      Solicitar Entrada
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-white/80 text-sm mb-2">{guild.description}</p>
              
              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Users size={12} />
                    <span>{guild.member_count ?? 0}/20 membros</span>
                  </div>
                  <span>{guild.total_points} pontos</span>
                </div>
                <span>Código: {guild.guild_code}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuildDiscoveryTab;
