
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Trophy, MessageSquare, FileText, Crown, UserPlus, Settings, Trash2, LogOut, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GuildChat from '@/components/guild/GuildChat';
import GuildMural from '@/components/guild/GuildMural';
import GuildMembers from '@/components/guild/GuildMembers';
import GuildInviteModal from '@/components/guild/GuildInviteModal';
import GuildInvites from '@/components/guild/GuildInvites';
import GuildJoinRequests from '@/components/guild/GuildJoinRequests';

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
  const [activeTab, setActiveTab] = useState('chat');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

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

      // Verificar papel do usuário na guilda
      const { data: memberData } = await supabase
        .from('guild_members')
        .select('role')
        .eq('guild_id', id)
        .eq('profile_id', user?.id)
        .single();

      setGuild({
        ...guildData,
        member_count: memberCount || 0,
        owner_name: guildData.profiles?.full_name || 'Usuário',
        user_role: memberData?.role || 'não-membro'
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

  const deleteGuild = async () => {
    if (!guild || guild.owner_id !== user?.id) return;

    try {
      const { error } = await supabase
        .from('guilds')
        .delete()
        .eq('id', guild.id);

      if (error) throw error;

      toast({
        title: "Guilda excluída",
        description: "A guilda foi excluída com sucesso.",
      });

      navigate('/guilds');
    } catch (error) {
      console.error('Erro ao excluir guilda:', error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a guilda.",
        variant: "destructive"
      });
    }
  };

  const leaveGuild = async () => {
    if (!guild || !user) return;

    try {
      const { error } = await supabase
        .from('guild_members')
        .delete()
        .eq('guild_id', guild.id)
        .eq('profile_id', user.id);

      if (error) throw error;

      toast({
        title: "Saiu da guilda",
        description: "Você saiu da guilda com sucesso.",
      });

      navigate('/guilds');
    } catch (error) {
      console.error('Erro ao sair da guilda:', error);
      toast({
        title: "Erro ao sair",
        description: "Não foi possível sair da guilda.",
        variant: "destructive"
      });
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

  const isOwner = guild.owner_id === user?.id;
  const canInvite = isOwner || guild.user_role === 'líder' || guild.user_role === 'moderador';
  const canInviteMore = (guild.member_count || 0) < 20;
  const canManageRequests = isOwner || guild.user_role === 'líder' || guild.user_role === 'moderador';

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
              <p className="text-white/80 text-xs">{guild.description}</p>
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
              
              {/* Opções de gerenciamento */}
              {isOwner ? (
                <Button 
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3"
                >
                  <Trash2 size={16} />
                </Button>
              ) : (
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
            <TabsList className={`grid w-full ${canManageRequests ? 'grid-cols-5' : 'grid-cols-4'} bg-white/10 backdrop-blur-md mx-3 mt-3`}>
              <TabsTrigger value="chat" className="text-xs">
                <MessageSquare size={14} className="mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="mural" className="text-xs">
                <FileText size={14} className="mr-1" />
                Mural
              </TabsTrigger>
              <TabsTrigger value="membros" className="text-xs">
                <Users size={14} className="mr-1" />
                Membros
              </TabsTrigger>
              {canManageRequests && (
                <TabsTrigger value="solicitacoes" className="text-xs">
                  <UserCheck size={14} className="mr-1" />
                  Solicitações
                </TabsTrigger>
              )}
              {canInvite && (
                <TabsTrigger value="convites" className="text-xs">
                  Convites
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
              {canManageRequests && (
                <TabsContent value="solicitacoes" className="h-full m-0">
                  <div className="p-3">
                    <GuildJoinRequests guildId={guild.id} onRequestHandled={fetchGuildDetails} />
                  </div>
                </TabsContent>
              )}
              {canInvite && (
                <TabsContent value="convites" className="h-full m-0">
                  <div className="p-3">
                    <GuildInvites guildId={guild.id} />
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
