
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Users, Crown, Trophy, Search, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import GuildInvites from '@/components/guild/GuildInvites';

interface Guild {
  id: string;
  name: string;
  description: string;
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

  const fetchGuilds = async () => {
    try {
      setLoading(true);
      
      // Buscar guildas públicas
      const { data: guildsData, error } = await supabase
        .from('guilds')
        .select(`
          *,
          profiles!guilds_owner_id_fkey(full_name)
        `)
        .eq('is_public', true);

      if (error) throw error;

      // Processar dados para incluir contagem de membros e verificar se usuário é membro
      const processedGuilds = await Promise.all(
        guildsData.map(async (guild) => {
          // Contar membros
          const { count: memberCount } = await supabase
            .from('guild_members')
            .select('*', { count: 'exact', head: true })
            .eq('guild_id', guild.id);

          // Verificar se usuário é membro
          const { data: membership } = await supabase
            .from('guild_members')
            .select('profile_id')
            .eq('guild_id', guild.id)
            .eq('profile_id', user?.id)
            .single();

          return {
            ...guild,
            member_count: memberCount || 0,
            is_member: !!membership,
            owner_name: guild.profiles?.full_name || 'Usuário'
          };
        })
      );

      setGuilds(processedGuilds);
    } catch (error) {
      console.error('Erro ao buscar guildas:', error);
      toast({
        title: "Erro ao carregar guildas",
        description: "Não foi possível carregar as guildas.",
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
      console.log('Criando guilda...', { userId: user.id, guildName: newGuildName });
      
      // Criar guilda
      const { data: guild, error: guildError } = await supabase
        .from('guilds')
        .insert({
          name: newGuildName.trim(),
          description: newGuildDescription.trim() || null,
          owner_id: user.id,
          is_public: true,
          total_points: 0
        })
        .select()
        .single();

      if (guildError) {
        console.error('Erro detalhado ao criar guilda:', guildError);
        throw guildError;
      }

      console.log('Guilda criada com sucesso:', guild);

      // Adicionar o criador como membro
      const { error: memberError } = await supabase
        .from('guild_members')
        .insert({
          guild_id: guild.id,
          profile_id: user.id,
          role: 'líder'
        });

      if (memberError) {
        console.error('Erro ao adicionar criador como membro:', memberError);
        // Não falhar aqui, pois a guilda já foi criada
        console.warn('Guilda criada mas não foi possível adicionar como membro automaticamente');
      }

      toast({
        title: "Guilda criada com sucesso!",
        description: `A guilda "${newGuildName}" foi criada.`,
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
        errorMessage = "Erro de permissão. Tente fazer logout e login novamente.";
      } else if (error.code) {
        errorMessage = `Erro técnico: ${error.code}`;
      }
      
      toast({
        title: "Erro ao criar guilda",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const joinGuild = async (guildId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('guild_members')
        .insert({
          guild_id: guildId,
          profile_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Ingressou na guilda!",
        description: "Você agora faz parte desta guilda.",
      });

      await fetchGuilds();
    } catch (error) {
      console.error('Erro ao ingressar na guilda:', error);
      toast({
        title: "Erro ao ingressar",
        description: "Não foi possível ingressar na guilda.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

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
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar guildas..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm pl-10"
              />
            </div>

            {/* Guilds List */}
            <div className="space-y-3">
              {loading ? (
                <div className="text-center text-white">Carregando...</div>
              ) : filteredGuilds.length === 0 ? (
                <div className="text-center text-white/80 py-8">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Nenhuma guilda encontrada</p>
                  <p className="text-sm opacity-75">Seja o primeiro a criar uma!</p>
                </div>
              ) : (
                filteredGuilds.map((guild) => (
                  <div
                    key={guild.id}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-all"
                    onClick={() => guild.is_member ? navigate(`/guilda/${guild.id}`) : null}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-white text-sm">{guild.name}</h3>
                          {guild.owner_id === user?.id && (
                            <Crown size={14} className="text-yellow-400" />
                          )}
                        </div>
                        <p className="text-white/80 text-xs mb-2">{guild.description || 'Sem descrição'}</p>
                        
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
                          <span className="text-xs">{guild.owner_name}</span>
                        </div>
                      </div>
                    </div>
                    
                    {!guild.is_member && (
                      <div className="mt-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            joinGuild(guild.id);
                          }}
                          className="w-full bg-green-500 hover:bg-green-600 text-white text-xs py-1"
                        >
                          Ingressar
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
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
                  />
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
                >
                  Cancelar
                </Button>
                <Button
                  onClick={createGuild}
                  disabled={!newGuildName.trim()}
                  className="flex-1"
                >
                  Criar Guilda
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
