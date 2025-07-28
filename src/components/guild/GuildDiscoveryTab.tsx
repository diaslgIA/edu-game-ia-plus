
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Lock, Unlock, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

    try {
      setLoading(true);
      
      // Buscar guildas públicas onde o usuário não é membro
      const { data: userGuilds } = await supabase
        .from('guild_members')
        .select('guild_id')
        .eq('profile_id', user.id);

      const userGuildIds = userGuilds?.map(g => g.guild_id) || [];

      let query = supabase
        .from('guilds')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (userGuildIds.length > 0) {
        query = query.not('id', 'in', `(${userGuildIds.map(id => `"${id}"`).join(',')})`);
      }

      const { data: guilds, error } = await query;

      if (error) throw error;

      // Contar membros de cada guilda
      const guildsWithCount = await Promise.all(
        (guilds || []).map(async (guild) => {
          const { count } = await supabase
            .from('guild_members')
            .select('*', { count: 'exact', head: true })
            .eq('guild_id', guild.id);

          return { ...guild, member_count: count || 0 };
        })
      );

      setPublicGuilds(guildsWithCount);
    } catch (error) {
      console.error('Erro ao buscar guildas públicas:', error);
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

      if (error) throw error;

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
                  disabled={requesting === guild.id}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                >
                  {requesting === guild.id ? (
                    'Enviando...'
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
                    <span>{guild.member_count} membros</span>
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
