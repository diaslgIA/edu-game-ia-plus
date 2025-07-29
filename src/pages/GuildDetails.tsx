
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Trophy, MessageSquare, FileText, Crown, UserPlus, Trash2, LogOut, UserCheck, Zap, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GuildChat from '@/components/guild/GuildChat';
import GuildMural from '@/components/guild/GuildMural';
import GuildMembers from '@/components/guild/GuildMembers';
import GuildInviteModal from '@/components/guild/GuildInviteModal';
import GuildInvites from '@/components/guild/GuildInvites';
import GuildJoinRequests from '@/components/guild/GuildJoinRequests';
import GuildMemberXP from '@/components/guild/GuildMemberXP';
import GuildBattles from '@/components/guild/GuildBattles';

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
  owner_name?: string;
  user_role?: string;
}

const GuildDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [guild, setGuild] = useState<Guild | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const fetchGuildDetails = async () => {
    if (!id || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching guild details for:', id);
      
      // Buscar detalhes da guilda com informações do owner
      const { data: guildData, error: guildError } = await supabase
        .from('guilds')
        .select(`
          id,
          name,
          description,
          guild_code,
          owner_id,
          total_points,
          is_public,
          created_at,
          profiles!guilds_owner_id_fkey(full_name)
        `)
        .eq('id', id)
        .maybeSingle();

      if (guildError) {
        console.error('Error fetching guild:', guildError);
        throw new Error('Erro ao carregar dados da guilda');
      }

      if (!guildData) {
        console.error('Guild not found:', id);
        throw new Error('Guilda não encontrada');
      }

      console.log('Guild data loaded:', guildData);

      // Contar membros de forma otimizada
      const { count: memberCount, error: countError } = await supabase
        .from('guild_members')
        .select('*', { count: 'exact', head: true })
        .eq('guild_id', id);

      if (countError) {
        console.error('Error counting members:', countError);
      }

      // Verificar papel do usuário na guilda
      const { data: memberData, error: memberError } = await supabase
        .from('guild_members')
        .select('role')
        .eq('guild_id', id)
        .eq('profile_id', user.id)
        .maybeSingle();

      if (memberError && memberError.code !== 'PGRST116') {
        console.error('Error checking user role:', memberError);
      }

      const isOwner = guildData.owner_id === user.id;
      const userRole = isOwner ? 'dono' : (memberData?.role || 'não-membro');

      console.log('User role determined:', { isOwner, userRole });

      setGuild({
        ...guildData,
        member_count: (memberCount || 0) + 1, // +1 para o owner
        owner_name: guildData.profiles?.full_name || 'Usuário',
        user_role: userRole
      });

    } catch (error: any) {
      console.error('Error in fetchGuildDetails:', error);
      const errorMessage = error.message || 'Erro ao carregar detalhes da guilda';
      setError(errorMessage);
      
      toast({
        title: "Erro ao carregar guilda",
        description: errorMessage,
        variant: "destructive"
      });
      
      // Não navegar de volta automaticamente, deixar o usuário decidir
      setTimeout(() => {
        navigate('/guilds');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const deleteGuild = async () => {
    if (!guild || guild.owner_id !== user?.id) return;

    try {
      console.log('Deleting guild:', guild.id);
      
      const { error } = await supabase
        .from('guilds')
        .delete()
        .eq('id', guild.id);

      if (error) {
        console.error('Error deleting guild:', error);
        throw error;
      }

      toast({
        title: "Guilda excluída",
        description: "A guilda foi excluída com sucesso.",
      });

      navigate('/guilds');
    } catch (error) {
      console.error('Error in deleteGuild:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a guilda.",
        variant: "destructive"
      });
    }
    setShowDeleteModal(false);
  };

  const leaveGuild = async () => {
    if (!guild || !user) return;

    try {
      console.log('Leaving guild:', guild.id);
      
      const { error } = await supabase
        .from('guild_members')
        .delete()
        .eq('guild_id', guild.id)
        .eq('profile_id', user.id);

      if (error) {
        console.error('Error leaving guild:', error);
        throw error;
      }

      toast({
        title: "Saiu da guilda",
        description: "Você saiu da guilda com sucesso.",
      });

      navigate('/guilds');
    } catch (error) {
      console.error('Error in leaveGuild:', error);
      toast({
        title: "Erro ao sair",
        description: "Não foi possível sair da guilda.",
        variant: "destructive"
      });
    }
    setShowLeaveModal(false);
  };

  useEffect(() => {
    fetchGuildDetails();
  }, [id, user]);

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Carregando guilda...</p>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (error || !guild) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col items-center justify-center h-full text-white p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-xl font-bold mb-2">Ops! Algo deu errado</h2>
            <p className="text-white/80 mb-6">{error || 'Guilda não encontrada'}</p>
            <Button 
              onClick={() => navigate('/guilds')} 
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2" size={16} />
              Voltar às Guildas
            </Button>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  const isOwner = guild.owner_id === user?.id;
  const canInvite = isOwner || guild.user_role === 'líder';
  const canInviteMore = (guild.member_count || 0) < 20;
  const canManageRequests = isOwner || guild.user_role === 'líder';
  const canManageBattles = isOwner || guild.user_role === 'líder';

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
                {isOwner && (
                  <Crown size={14} className="text-yellow-400" />
                )}
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded">
                  {guild.guild_code}
                </span>
              </div>
              <p className="text-white/80 text-xs">{guild.description || 'Sem descrição'}</p>
            </div>
            
            <div className="flex space-x-2">
              {canInvite && canInviteMore && (
                <Button 
                  onClick={() => setShowInviteModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3"
                >
                  <UserPlus size={16} />
                </Button>
              )}
              
              {isOwner ? (
                <Button 
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3"
                >
                  <Trash2 size={16} />
                </Button>
              ) : guild.user_role !== 'não-membro' && (
                <Button 
                  onClick={() => setShowLeaveModal(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3"
                >
                  <LogOut size={16} />
                </Button>
              )}
            </div>
          </div>
          
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
            <span>{guild.owner_name}</span>
          </div>
          
          {!canInviteMore && (
            <div className="mt-2 text-xs text-yellow-400">
              ⚠️ Guilda lotada (20/20 membros)
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-md mx-3 mt-3">
              <TabsTrigger value="chat" className="text-xs">
                <MessageSquare size={12} className="mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="mural" className="text-xs">
                <FileText size={12} className="mr-1" />
                Mural
              </TabsTrigger>
              <TabsTrigger value="membros" className="text-xs">
                <Users size={12} className="mr-1" />
                Membros
              </TabsTrigger>
              <TabsTrigger value="xp" className="text-xs">
                <Star size={12} className="mr-1" />
                XP
              </TabsTrigger>
              <TabsTrigger value="batalhas" className="text-xs">
                <Zap size={12} className="mr-1" />
                Batalhas
              </TabsTrigger>
              {canManageRequests && (
                <TabsTrigger value="solicitacoes" className="text-xs">
                  <UserCheck size={12} className="mr-1" />
                  Solicitações
                </TabsTrigger>
              )}
            </TabsList>
            
            <div className="flex-1 overflow-hidden">
              <TabsContent value="chat" className="h-full m-0">
                <GuildChat guildId={guild.id} />
              </TabsContent>
              <TabsContent value="mural" className="h-full m-0">
                <GuildMural guildId={guild.id} />
              </TabsContent>
              <TabsContent value="membros" className="h-full m-0">
                <GuildMembers guildId={guild.id} isOwner={isOwner} onMemberUpdate={fetchGuildDetails} />
              </TabsContent>
              <TabsContent value="xp" className="h-full m-0">
                <div className="p-3">
                  <GuildMemberXP guildId={guild.id} />
                </div>
              </TabsContent>
              <TabsContent value="batalhas" className="h-full m-0">
                <div className="p-3">
                  <GuildBattles 
                    guildId={guild.id} 
                    isOwner={isOwner} 
                    isLeader={guild.user_role === 'líder'}
                  />
                </div>
              </TabsContent>
              {canManageRequests && (
                <TabsContent value="solicitacoes" className="h-full m-0">
                  <div className="p-3">
                    <GuildJoinRequests guildId={guild.id} onRequestHandled={fetchGuildDetails} />
                  </div>
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>

        {/* Modals */}
        <GuildInviteModal
          guildId={guild.id}
          guildName={guild.name}
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />

        {/* Delete Guild Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-red-600">Excluir Guilda</h2>
              <p className="text-gray-700 mb-6">
                Tem certeza que deseja excluir a guilda "{guild.name}"? Esta ação não pode ser revertida.
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={deleteGuild}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Leave Guild Modal */}
        {showLeaveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4 text-orange-600">Sair da Guilda</h2>
              <p className="text-gray-700 mb-6">
                Tem certeza que deseja sair da guilda "{guild.name}"? Você precisará de um novo convite para retornar.
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowLeaveModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={leaveGuild}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default GuildDetails;
