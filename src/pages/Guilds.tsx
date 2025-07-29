
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Shield, Crown, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GuildCard from '@/components/guild/GuildCard';

// Define Guild interface to match what we expect
interface Guild {
  id: string;
  name: string;
  description: string;
  member_count: number;
  max_members: number; // This property is required
  owner_id: string;
  created_at: string;
  is_public: boolean;
}

const Guilds = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
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
      // Load guilds where user is a member or owner
      const { data: memberGuilds, error: memberError } = await supabase
        .from('guilds')
        .select(`
          id,
          name,
          description,
          owner_id,
          is_public,
          created_at,
          max_members:max_members,
          member_count:guild_members(count)
        `)
        .or(`owner_id.eq.${user.id},id.in.(${await getUserGuildIds()})`);

      if (memberError) {
        console.error('Error loading member guilds:', memberError);
        setMyGuilds([]);
      } else {
        // Process the data to ensure proper format
        const processedMyGuilds = (memberGuilds || []).map(guild => ({
          id: guild.id,
          name: guild.name,
          description: guild.description || '',
          member_count: Array.isArray(guild.member_count) ? guild.member_count.length : 1,
          max_members: guild.max_members || 50, // Provide default value
          owner_id: guild.owner_id,
          created_at: guild.created_at,
          is_public: guild.is_public || false
        }));
        setMyGuilds(processedMyGuilds);
      }

      // Load public guilds for discovery
      const { data: discoverGuilds, error: discoverError } = await supabase
        .from('guilds')
        .select(`
          id,
          name,
          description,
          owner_id,
          is_public,
          created_at,
          max_members,
          member_count:guild_members(count)
        `)
        .eq('is_public', true)
        .limit(10);

      if (discoverError) {
        console.error('Error loading public guilds:', discoverError);
        setPublicGuilds([]);
      } else {
        // Process the data to ensure proper format
        const processedPublicGuilds = (discoverGuilds || []).map(guild => ({
          id: guild.id,
          name: guild.name,
          description: guild.description || '',
          member_count: Array.isArray(guild.member_count) ? guild.member_count.length : 1,
          max_members: guild.max_members || 50, // Provide default value
          owner_id: guild.owner_id,
          created_at: guild.created_at,
          is_public: guild.is_public || false
        }));
        setPublicGuilds(processedPublicGuilds);
      }
      
    } catch (error) {
      console.error('Error loading guilds:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as guildas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get guild IDs where user is a member
  const getUserGuildIds = async (): Promise<string> => {
    if (!user) return '';
    
    const { data } = await supabase
      .from('guild_members')
      .select('guild_id')
      .eq('profile_id', user.id);
    
    if (!data || data.length === 0) return 'null'; // Return 'null' to avoid SQL error
    return data.map(item => item.guild_id).join(',');
  };

  const handleGuildClick = (guildId: string) => {
    // Navigate to guild details - for now just show a toast
    toast({
      title: "Guilda selecionada",
      description: "Funcionalidade de detalhes da guilda em desenvolvimento."
    });
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
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
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
