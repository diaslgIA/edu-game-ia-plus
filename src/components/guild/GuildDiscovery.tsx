
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Users, Trophy, UserPlus, Check, Clock } from 'lucide-react';
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
  created_at: string;
  member_count?: number;
  owner_name?: string;
  has_requested?: boolean;
  is_member?: boolean;
}

interface GuildDiscoveryProps {
  onJoinRequest?: () => void;
}

const GuildDiscovery: React.FC<GuildDiscoveryProps> = ({ onJoinRequest }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestingJoin, setRequestingJoin] = useState<string | null>(null);

  const fetchPublicGuilds = async () => {
    try {
      setLoading(true);
      
      // Buscar guildas públicas
      const { data: guildData, error: guildError } = await supabase
        .from('guilds')
        .select(`
          *,
          profiles!guilds_owner_id_fkey(full_name)
        `)
        .eq('is_public', true)
        .order('total_points', { ascending: false });

      if (guildError) throw guildError;

      // Processar dados para incluir informações adicionais
      const processedGuilds = await Promise.all(
        guildData.map(async (guild) => {
          // Contar membros
          const { count: memberCount } = await supabase
            .from('guild_members')
            .select('*', { count: 'exact', head: true })
            .eq('guild_id', guild.id);

          // Verificar se o usuário já é membro
          const { data: memberData } = await supabase
            .from('guild_members')
            .select('profile_id')
            .eq('guild_id', guild.id)
            .eq('profile_id', user?.id)
            .single();

          // Verificar se já há solicitação pendente
          const { data: requestData } = await supabase
            .from('guild_join_requests')
            .select('id')
            .eq('guild_id', guild.id)
            .eq('requester_id', user?.id)
            .eq('status', 'pending')
            .single();

          return {
            ...guild,
            member_count: memberCount || 0,
            owner_name: guild.profiles?.full_name || 'Usuário',
            is_member: !!memberData,
            has_requested: !!requestData
          };
        })
      );

      setGuilds(processedGuilds);
    } catch (error) {
      console.error('Erro ao buscar guildas públicas:', error);
      toast({
        title: "Erro ao carregar guildas",
        description: "Não foi possível carregar as guildas públicas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const requestToJoinGuild = async (guildId: string, guildName: string) => {
    if (!user) return;

    try {
      setRequestingJoin(guildId);

      const { error } = await supabase
        .from('guild_join_requests')
        .insert({
          guild_id: guildId,
          requester_id: user.id,
          message: `Gostaria de fazer parte da guilda ${guildName}`
        });

      if (error) throw error;

      toast({
        title: "Solicitação enviada!",
        description: `Sua solicitação para entrar na guilda "${guildName}" foi enviada.`,
      });

      // Atualizar lista
      await fetchPublicGuilds();
      onJoinRequest?.();
    } catch (error: any) {
      console.error('Erro ao solicitar entrada na guilda:', error);
      
      let errorMessage = "Não foi possível enviar a solicitação.";
      if (error.message?.includes('duplicate')) {
        errorMessage = "Você já enviou uma solicitação para esta guilda.";
      }
      
      toast({
        title: "Erro ao solicitar entrada",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setRequestingJoin(null);
    }
  };

  useEffect(() => {
    fetchPublicGuilds();
  }, []);

  const filteredGuilds = guilds.filter(guild =>
    guild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guild.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guild.guild_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, descrição ou código..."
          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm pl-10"
        />
      </div>

      {/* Help Text */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-white text-xs">
        <p className="mb-1">💡 <strong>Como funciona:</strong></p>
        <p>• Todas as guildas são visíveis, mas privadas</p>
        <p>• Solicite entrada e aguarde aprovação do líder</p>
        <p>• Use o código da guilda para encontrar rapidamente</p>
      </div>

      {/* Guilds List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-white">Carregando guildas...</div>
        ) : filteredGuilds.length === 0 ? (
          <div className="text-center text-white/80 py-8">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhuma guilda encontrada</p>
            <p className="text-sm opacity-75">Tente uma busca diferente</p>
          </div>
        ) : (
          filteredGuilds.map((guild) => (
            <div
              key={guild.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-white text-sm">{guild.name}</h3>
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded">
                      {guild.guild_code}
                    </span>
                  </div>
                  <p className="text-white/80 text-xs mb-2">{guild.description || 'Sem descrição'}</p>
                  
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>{guild.member_count}/20 membros</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy size={12} />
                        <span>{guild.total_points} pontos</span>
                      </div>
                    </div>
                    <span className="text-xs">por {guild.owner_name}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-3 flex justify-end">
                {guild.is_member ? (
                  <Button 
                    disabled 
                    className="bg-green-500/50 text-white text-xs px-3 py-1 rounded"
                  >
                    <Check size={12} className="mr-1" />
                    Membro
                  </Button>
                ) : guild.has_requested ? (
                  <Button 
                    disabled 
                    className="bg-yellow-500/50 text-white text-xs px-3 py-1 rounded"
                  >
                    <Clock size={12} className="mr-1" />
                    Pendente
                  </Button>
                ) : (guild.member_count || 0) >= 20 ? (
                  <Button 
                    disabled 
                    className="bg-gray-500/50 text-white text-xs px-3 py-1 rounded"
                  >
                    Lotada
                  </Button>
                ) : (
                  <Button
                    onClick={() => requestToJoinGuild(guild.id, guild.name)}
                    disabled={requestingJoin === guild.id}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                  >
                    <UserPlus size={12} className="mr-1" />
                    {requestingJoin === guild.id ? 'Enviando...' : 'Solicitar Entrada'}
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuildDiscovery;
