
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import GuildCard from '@/components/guild/GuildCard';
import GuildDiscoveryTab from '@/components/guild/GuildDiscoveryTab';
import GuildInvites from '@/components/guild/GuildInvites';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Users, Search, Mail, Shield } from 'lucide-react';
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
  user_role?: string;
}

const Guilds = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [userGuilds, setUserGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserGuilds = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Buscar guildas onde o usuário é membro
      const { data: membershipData, error: membershipError } = await supabase
        .from('guild_members')
        .select(`
          role,
          guilds (
            id,
            name,
            description,
            guild_code,
            owner_id,
            total_points,
            is_public,
            created_at
          )
        `)
        .eq('profile_id', user.id);

      if (membershipError) {
        console.error('Erro ao buscar guildas do usuário:', membershipError);
        return;
      }

      if (!membershipData) {
        setUserGuilds([]);
        return;
      }

      // Processar dados das guildas
      const guildsWithRole = await Promise.all(
        membershipData.map(async (membership) => {
          const guild = membership.guilds;
          if (!guild) return null;

          // Contar membros
          const { count } = await supabase
            .from('guild_members')
            .select('*', { count: 'exact', head: true })
            .eq('guild_id', guild.id);

          return {
            ...guild,
            member_count: count || 0,
            user_role: membership.role
          };
        })
      );

      setUserGuilds(guildsWithRole.filter(Boolean) as Guild[]);
    } catch (error) {
      console.error('Erro inesperado ao buscar guildas:', error);
      toast({
        title: "Erro ao carregar guildas",
        description: "Não foi possível carregar suas guildas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserGuilds();
  }, [user]);

  const handleGuildClick = (guildId: string) => {
    navigate(`/guild/${guildId}`);
  };

  if (!user) {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full pb-20">
          <div className="flex items-center justify-between p-4 bg-white shadow-sm">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Guildas</h1>
            <div className="w-8" />
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <Shield size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">Faça login para acessar as guildas</p>
              <Button onClick={() => navigate('/auth')}>Fazer Login</Button>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Guildas</h1>
            <Button
              variant="ghost"
              onClick={() => navigate('/create-guild')}
              className="text-white p-2"
            >
              <Plus size={20} />
            </Button>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="text-white" size={20} />
                <div>
                  <span className="font-semibold">{userGuilds.length}</span>
                  <p className="text-xs opacity-80">Suas Guildas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="my-guilds" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-2">
              <TabsTrigger value="my-guilds" className="text-xs">
                <Users size={16} className="mr-1" />
                Minhas
              </TabsTrigger>
              <TabsTrigger value="discover" className="text-xs">
                <Search size={16} className="mr-1" />
                Descobrir
              </TabsTrigger>
              <TabsTrigger value="invites" className="text-xs">
                <Mail size={16} className="mr-1" />
                Convites
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="my-guilds" className="h-full m-0 p-4 overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Carregando suas guildas...</p>
                  </div>
                ) : userGuilds.length === 0 ? (
                  <div className="text-center py-8">
                    <Users size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-gray-600 mb-4">Você ainda não faz parte de nenhuma guilda</p>
                    <Button onClick={() => navigate('/create-guild')}>
                      <Plus size={16} className="mr-2" />
                      Criar Guilda
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userGuilds.map((guild) => (
                      <GuildCard
                        key={guild.id}
                        guild={guild}
                        onClick={() => handleGuildClick(guild.id)}
                        showRole={true}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="discover" className="h-full m-0 p-4 overflow-y-auto">
                <GuildDiscoveryTab />
              </TabsContent>

              <TabsContent value="invites" className="h-full m-0 p-4 overflow-y-auto">
                <GuildInvites showReceivedInvites={true} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Guilds;
