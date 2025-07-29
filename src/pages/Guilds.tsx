
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Users, Plus, Shield, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuildCard from '@/components/guild/GuildCard';

interface Guild {
  id: string;
  name: string;
  description: string;
  member_count: number;
  max_members: number;
  owner_id: string;
  created_at: string;
  is_public: boolean;
}

const Guilds = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [myGuilds, setMyGuilds] = useState<Guild[]>([]);
  const [publicGuilds, setPublicGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my-guilds' | 'discover'>('my-guilds');

  useEffect(() => {
    if (user) {
      loadGuilds();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadGuilds = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      console.log('Loading guilds for user:', user.id);
      
      // Carregar guildas do usuário de forma otimizada
      await Promise.all([
        loadMyGuilds(),
        loadPublicGuilds()
      ]);
      
    } catch (error) {
      console.error('Error loading guilds:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as guildas. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMyGuilds = async () => {
    if (!user) return;

    try {
      // Buscar guildas onde o usuário é owner
      const { data: ownedGuilds, error: ownedError } = await supabase
        .from('guilds')
        .select(`
          id,
          name,
          description,
          owner_id,
          created_at,
          is_public,
          max_members
        `)
        .eq('owner_id', user.id);

      if (ownedError) {
        console.error('Error loading owned guilds:', ownedError);
      }

      // Buscar guildas onde o usuário é membro (mas não owner)
      const { data: membershipData, error: memberError } = await supabase
        .from('guild_members')
        .select(`
          guild_id,
          guilds!inner (
            id,
            name,
            description,
            owner_id,
            created_at,
            is_public,
            max_members
          )
        `)
        .eq('profile_id', user.id)
        .neq('guilds.owner_id', user.id);

      if (memberError) {
        console.error('Error loading member guilds:', memberError);
      }

      // Combinar e processar guildas
      const allMyGuilds: Guild[] = [];
      
      // Adicionar guildas próprias
      if (ownedGuilds) {
        for (const guild of ownedGuilds) {
          const memberCount = await getGuildMemberCount(guild.id);
          allMyGuilds.push({
            ...guild,
            member_count: memberCount,
            description: guild.description || ''
          });
        }
      }

      // Adicionar guildas onde é membro
      if (membershipData) {
        for (const membership of membershipData) {
          const guild = (membership as any).guilds;
          if (guild) {
            const memberCount = await getGuildMemberCount(guild.id);
            allMyGuilds.push({
              ...guild,
              member_count: memberCount,
              description: guild.description || ''
            });
          }
        }
      }

      console.log('My guilds loaded:', allMyGuilds.length);
      setMyGuilds(allMyGuilds);

    } catch (error) {
      console.error('Error in loadMyGuilds:', error);
    }
  };

  const loadPublicGuilds = async () => {
    if (!user) return;

    try {
      // Buscar guildas públicas que o usuário não faz parte
      const { data: publicGuildsData, error: publicError } = await supabase
        .from('guilds')
        .select(`
          id,
          name,
          description,
          owner_id,
          created_at,
          is_public,
          max_members
        `)
        .eq('is_public', true)
        .neq('owner_id', user.id)
        .limit(10);

      if (publicError) {
        console.error('Error loading public guilds:', publicError);
        return;
      }

      if (publicGuildsData) {
        // Filtrar guildas onde o usuário não é membro
        const filteredGuilds: Guild[] = [];
        
        for (const guild of publicGuildsData) {
          // Verificar se o usuário já é membro
          const { data: membership } = await supabase
            .from('guild_members')
            .select('guild_id')
            .eq('guild_id', guild.id)
            .eq('profile_id', user.id)
            .maybeSingle();

          if (!membership) {
            const memberCount = await getGuildMemberCount(guild.id);
            filteredGuilds.push({
              ...guild,
              member_count: memberCount,
              description: guild.description || ''
            });
          }
        }

        console.log('Public guilds loaded:', filteredGuilds.length);
        setPublicGuilds(filteredGuilds);
      }
      
    } catch (error) {
      console.error('Error in loadPublicGuilds:', error);
    }
  };

  const getGuildMemberCount = async (guildId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from('guild_members')
        .select('*', { count: 'exact', head: true })
        .eq('guild_id', guildId);

      if (error) {
        console.error('Error counting guild members:', error);
        return 1; // Pelo menos o owner
      }

      return (count || 0) + 1; // +1 para incluir o owner
    } catch (error) {
      console.error('Error in getGuildMemberCount:', error);
      return 1;
    }
  };

  const handleGuildClick = (guildId: string) => {
    console.log('Navigating to guild:', guildId);
    navigate(`/guilds/${guildId}`);
  };

  const handleCreateGuild = () => {
    console.log('Navigating to create guild');
    navigate('/guilds/create');
  };

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <Loader2 className="animate-spin mx-auto mb-4" size={32} />
              <p>Carregando guildas...</p>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 rounded-b-3xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4 flex items-center">
            <Shield className="mr-3" size={24} />
            Guildas
          </h1>
          
          {/* Tabs */}
          <div className="flex space-x-4">
            <Button
              variant={activeTab === 'my-guilds' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('my-guilds')}
              className="text-white hover:bg-white/20"
            >
              <Users className="mr-2" size={16} />
              Minhas Guildas
            </Button>
            <Button
              variant={activeTab === 'discover' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('discover')}
              className="text-white hover:bg-white/20"
            >
              <Search className="mr-2" size={16} />
              Descobrir
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'my-guilds' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-lg font-semibold">Suas Guildas</h2>
                <Button 
                  onClick={handleCreateGuild}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                >
                  <Plus className="mr-2" size={16} />
                  Criar Guilda
                </Button>
              </div>

              {myGuilds.length === 0 ? (
                <div className="text-center text-white/80 py-12">
                  <Shield size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma guilda encontrada</h3>
                  <p className="text-sm mb-4">Crie sua primeira guilda ou junte-se a uma existente!</p>
                  <Button 
                    onClick={handleCreateGuild}
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <Plus className="mr-2" size={16} />
                    Criar Primeira Guilda
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myGuilds.map((guild) => (
                    <GuildCard
                      key={guild.id}
                      guild={guild}
                      showRole={guild.owner_id === user?.id}
                      onClick={() => handleGuildClick(guild.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-white text-lg font-semibold mb-6">Descobrir Guildas</h2>
              
              {publicGuilds.length === 0 ? (
                <div className="text-center text-white/80 py-12">
                  <Search size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma guilda pública encontrada</h3>
                  <p className="text-sm">Seja o primeiro a criar uma guilda pública!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {publicGuilds.map((guild) => (
                    <GuildCard
                      key={guild.id}
                      guild={guild}
                      onClick={() => handleGuildClick(guild.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Guilds;
