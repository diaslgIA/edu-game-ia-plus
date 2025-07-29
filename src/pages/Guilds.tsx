
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
    }
  }, [user]);

  const loadGuilds = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load user's guilds (owned or member)
      const { data: memberGuilds, error: memberError } = await supabase
        .from('guilds')
        .select(`
          id,
          name,
          description,
          owner_id,
          is_public,
          created_at,
          max_members,
          guild_members!inner (
            profile_id
          )
        `)
        .or(`owner_id.eq.${user.id},guild_members.profile_id.eq.${user.id}`);

      if (memberError) {
        console.error('Error loading member guilds:', memberError);
        // Try simpler query if complex one fails
        const { data: simpleGuilds } = await supabase
          .from('guilds')
          .select('*')
          .eq('owner_id', user.id);
        
        setMyGuilds(simpleGuilds?.map(guild => ({
          ...guild,
          member_count: 1,
          description: guild.description || ''
        })) || []);
      } else {
        // Remove duplicates and format data
        const uniqueGuilds = memberGuilds?.reduce((acc: any[], current) => {
          const existing = acc.find(item => item.id === current.id);
          if (!existing) {
            acc.push({
              ...current,
              member_count: 1, // Default value for now
              description: current.description || ''
            });
          }
          return acc;
        }, []);
        
        setMyGuilds(uniqueGuilds || []);
      }

      // Load public guilds for discovery
      const { data: discoverGuilds, error: discoverError } = await supabase
        .from('guilds')
        .select('*')
        .eq('is_public', true)
        .neq('owner_id', user.id) // Don't show user's own guilds
        .limit(10);

      if (!discoverError && discoverGuilds) {
        setPublicGuilds(discoverGuilds.map(guild => ({
          ...guild,
          member_count: 1,
          description: guild.description || ''
        })));
      }
      
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

  const handleGuildClick = (guildId: string) => {
    navigate(`/guilds/${guildId}`);
  };

  const handleCreateGuild = () => {
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
