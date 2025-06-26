
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Users, Crown, Trophy, Search, Mail, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import GuildInvites from '@/components/guild/GuildInvites';
import GuildDiscovery from '@/components/guild/GuildDiscovery';

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
  is_member?: boolean;
  owner_name?: string;
}

const Guilds = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInvitesModal, setShowInvitesModal] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');
  const [newGuildDescription, setNewGuildDescription] = useState('');
  const [activeTab, setActiveTab] = useState('my-guilds');
  const [creating, setCreating] = useState(false);

  const fetchGuilds = async () => {
    if (!user?.id) {
      console.log('Usuário não autenticado');
      return;
    }

    try {
      setLoading(true);
      console.log('Buscando guildas para usuário:', user.id);
      
      // Buscar guildas onde o usuário é membro
      const { data: memberGuilds, error: memberError } = await supabase
        .from('guild_members')
        .select(`
          guild_id,
          guilds!inner(
            *,
            profiles!guilds_owner_id_fkey(full_name)
          )
        `)
        .eq('profile_id', user.id);

      if (memberError) {
        console.error('Erro ao buscar guildas como membro:', memberError);
        throw memberError;
      }

      console.log('Guildas encontradas como membro:', memberGuilds);

      // Processar dados para incluir contagem de membros
      const processedGuilds = await Promise.all(
        (memberGuilds || []).map(async (memberGuild) => {
          const guild = memberGuild.guilds;
          
          // Contar membros
          const { count: memberCount } = await supabase
            .from('guild_members')
            .select('*', { count: 'exact', head: true })
            .eq('guild_id', guild.id);

          return {
            ...guild,
            member_count: memberCount || 0,
            is_member: true,
            owner_name: guild.profiles?.full_name || 'Usuário'
          };
        })
      );

      console.log('Guildas processadas:', processedGuilds);
      setGuilds(processedGuilds);
    } catch (error) {
      console.error('Erro completo ao buscar guildas:', error);
      toast({
        title: "Erro ao carregar guildas",
        description: "Não foi possível carregar as guildas. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createGuild = async () => {
    if (!newGuildName.trim() || !user) {
      toast({
        title: "Erro de validação",
        description: "Nome da guilda é obrigatório e você precisa estar logado.",
        variant: "destructive"
      });
      return;
    }

    try {
      setCreating(true);
      console.log('Criando guilda...', { 
        userId: user.id, 
        guildName: newGuildName,
        description: newGuildDescription 
      });
      
      // Gerar código único para a guilda
      const guildCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Criar guilda
      const { data: guild, error: guildError } = await supabase
        .from('guilds')
        .insert({
          name: newGuildName.trim(),
          description: newGuildDescription.trim() || null,
          owner_id: user.id,
          is_public: true,
          total_points: 0,
          guild_code: guildCode
        })
        .select()
        .single();

      if (guildError) {
        console.error('Erro detalhado ao criar guilda:', guildError);
        throw guildError;
      }

      console.log('Guilda criada com sucesso:', guild);

      // Adicionar o criador como líder da guilda
      const { error: memberError } = await supabase
        .from('guild_members')
        .insert({
          guild_id: guild.id,
          profile_id: user.id,
          role: 'líder'
        });

      if (memberError) {
        console.error('Erro ao adicionar criador como membro:', memberError);
        // Tentar remover a guilda criada se falhar ao adicionar o membro
        await supabase.from('guilds').delete().eq('id', guild.id);
        throw new Error('Falha ao configurar a guilda. Tente novamente.');
      }

      toast({
        title: "Guilda criada com sucesso!",
        description: `A guilda "${newGuildName}" foi criada com código ${guildCode}.`,
      });

      setShowCreateModal(false);
      setNewGuildName('');
      setNewGuildDescription('');
      await fetchGuilds();
    } catch (error: any) {
      console.error('Erro completo ao criar guilda:', error);
      
      let errorMessage = "Não foi possível criar a guilda.";
      
      if (error.message?.includes('duplicate key')) {
        errorMessage = "Já existe uma guilda com este nome.";
      } else if (error.message?.includes('permission') || error.message?.includes('policy')) {
        errorMessage = "Erro de permissão. Verifique se você está logado corretamente.";
      } else if (error.code) {
        errorMessage = `Erro técnico: ${error.message || error.code}`;
      }
      
      toast({
        title: "Erro ao criar guilda",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchGuilds();
    }
  }, [user?.id]);

  const filteredGuilds = guilds.filter(guild =>
    guild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guild.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-3 flex items-center space-x-3 rounded-b-3xl flex-shrink-0">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-base font-semibold flex items-center space-x-2">
            <span>Guildas</span>
            <Users size={18} />
          </h1>
          <div className="flex-1" />
          <Button 
            onClick={() => setShowInvitesModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-3"
          >
            <Mail size={16} />
          </Button>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3"
            disabled={creating}
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md mx-3 mt-3">
              <TabsTrigger value="my-guilds" className="text-xs">
                <Users size={14} className="mr-1" />
                Minhas Guildas
              </TabsTrigger>
              <TabsTrigger value="discover" className="text-xs">
                <Globe size={14} className="mr-1" />
                Descobrir
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto pb-20">
              <TabsContent value="my-guilds" className="m-0">
                <div className="p-4 space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar minhas guildas..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm pl-10"
                    />
                  </div>

                  {/* My Guilds List */}
                  <div className="space-y-3">
                    {loading ? (
                      <div className="text-center text-white">Carregando guildas...</div>
                    ) : filteredGuilds.length === 0 ? (
                      <div className="text-center text-white/80 py-8">
                        <Users size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Você não faz parte de nenhuma guilda ainda</p>
                        <p className="text-sm opacity-75">Crie uma nova guilda ou descubra guildas existentes!</p>
                      </div>
                    ) : (
                      filteredGuilds.map((guild) => (
                        <div
                          key={guild.id}
                          className="bg-white/10 backdrop-blur-md rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-all"
                          onClick={() => navigate(`/guilda/${guild.id}`)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-bold text-white text-sm">{guild.name}</h3>
                                {guild.owner_id === user?.id && (
                                  <Crown size={14} className="text-yellow-400" />
                                )}
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
                                <span className="text-xs">{guild.owner_name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="discover" className="m-0">
                <div className="p-4">
                  <GuildDiscovery onJoinRequest={() => fetchGuilds()} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Create Guild Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Criar Nova Guilda</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome da Guilda *</label>
                  <Input
                    value={newGuildName}
                    onChange={(e) => setNewGuildName(e.target.value)}
                    placeholder="Digite o nome da guilda..."
                    className="w-full"
                    maxLength={50}
                    disabled={creating}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                  <Input
                    value={newGuildDescription}
                    onChange={(e) => setNewGuildDescription(e.target.value)}
                    placeholder="Descreva o propósito da guilda..."
                    className="w-full"
                    maxLength={200}
                    disabled={creating}
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    ℹ️ Sua guilda será visível para todos, mas apenas você poderá aprovar novos membros. Um código único será gerado para facilitar a descoberta.
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewGuildName('');
                    setNewGuildDescription('');
                  }}
                  className="flex-1"
                  disabled={creating}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={createGuild}
                  disabled={!newGuildName.trim() || creating}
                  className="flex-1"
                >
                  {creating ? 'Criando...' : 'Criar Guilda'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Invites Modal */}
        {showInvitesModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Convites Recebidos</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowInvitesModal(false)}
                  className="text-white"
                >
                  <ArrowLeft size={18} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <GuildInvites showReceivedInvites={true} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Guilds;
