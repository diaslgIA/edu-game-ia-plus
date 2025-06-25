
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Trophy, MessageSquare, FileText, Library, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GuildChat from '@/components/guild/GuildChat';
import GuildMural from '@/components/guild/GuildMural';
import GuildLibrary from '@/components/guild/GuildLibrary';
import GuildMembers from '@/components/guild/GuildMembers';

interface Guild {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  total_points: number;
  is_public: boolean;
  created_at: string;
  member_count?: number;
  owner_name?: string;
}

const GuildDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [guild, setGuild] = useState<Guild | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mural');

  const fetchGuildDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      
      const { data: guildData, error } = await supabase
        .from('guilds')
        .select(`
          *,
          profiles!guilds_owner_id_fkey(full_name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Contar membros
      const { count: memberCount } = await supabase
        .from('guild_members')
        .select('*', { count: 'exact', head: true })
        .eq('guild_id', id);

      setGuild({
        ...guildData,
        member_count: memberCount || 0,
        owner_name: guildData.profiles?.full_name || 'Usuário'
      });
    } catch (error) {
      console.error('Erro ao buscar detalhes da guilda:', error);
      toast({
        title: "Erro ao carregar guilda",
        description: "Não foi possível carregar os detalhes da guilda.",
        variant: "destructive"
      });
      navigate('/guilds');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuildDetails();
  }, [id]);

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Carregando...</div>
        </div>
      </MobileContainer>
    );
  }

  if (!guild) {
    return (
      <MobileContainer background="gradient">
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Guilda não encontrada</div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-3 rounded-b-3xl flex-shrink-0">
          <div className="flex items-center space-x-3 mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/guilds')}
              className="text-white p-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-semibold">{guild.name}</h1>
                {guild.owner_id === user?.id && (
                  <Crown size={14} className="text-yellow-400" />
                )}
              </div>
              <p className="text-white/80 text-xs">{guild.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/80">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users size={12} />
                <span>{guild.member_count} membros</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy size={12} />
                <span>{guild.total_points} pontos</span>
              </div>
            </div>
            <span>{guild.owner_name}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md mx-3 mt-3">
              <TabsTrigger value="mural" className="text-xs">
                <FileText size={14} className="mr-1" />
                Mural
              </TabsTrigger>
              <TabsTrigger value="chat" className="text-xs">
                <MessageSquare size={14} className="mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="biblioteca" className="text-xs">
                <Library size={14} className="mr-1" />
                Biblioteca
              </TabsTrigger>
              <TabsTrigger value="membros" className="text-xs">
                <Users size={14} className="mr-1" />
                Membros
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="mural" className="h-full m-0">
                <GuildMural guildId={guild.id} />
              </TabsContent>
              <TabsContent value="chat" className="h-full m-0">
                <GuildChat guildId={guild.id} />
              </TabsContent>
              <TabsContent value="biblioteca" className="h-full m-0">
                <GuildLibrary guildId={guild.id} />
              </TabsContent>
              <TabsContent value="membros" className="h-full m-0">
                <GuildMembers guildId={guild.id} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default GuildDetails;
