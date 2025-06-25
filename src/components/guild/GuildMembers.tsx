
import React, { useState, useEffect } from 'react';
import { Crown, User, UserMinus, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface GuildMember {
  profile_id: string;
  guild_id: string;
  role: string;
  joined_at: string;
  full_name: string;
  points: number;
  level: number;
}

interface GuildMembersProps {
  guildId: string;
}

const GuildMembers: React.FC<GuildMembersProps> = ({ guildId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_members')
        .select(`
          *,
          profiles!guild_members_profile_id_fkey(full_name, points, level)
        `)
        .eq('guild_id', guildId)
        .order('role', { ascending: false }) // Líderes primeiro
        .order('joined_at', { ascending: true });

      if (error) throw error;

      const processedMembers = data.map(member => ({
        ...member,
        full_name: member.profiles?.full_name || 'Usuário',
        points: member.profiles?.points || 0,
        level: member.profiles?.level || 1
      }));

      setMembers(processedMembers);

      // Verificar se o usuário é dono da guilda
      const { data: guildData } = await supabase
        .from('guilds')
        .select('owner_id')
        .eq('id', guildId)
        .single();

      setIsOwner(guildData?.owner_id === user?.id);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId: string) => {
    if (!isOwner || memberId === user?.id) return;

    try {
      const { error } = await supabase
        .from('guild_members')
        .delete()
        .eq('guild_id', guildId)
        .eq('profile_id', memberId);

      if (error) throw error;

      toast({
        title: "Membro removido",
        description: "O membro foi removido da guilda.",
      });

      fetchMembers();
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      toast({
        title: "Erro ao remover membro",
        description: "Não foi possível remover o membro.",
        variant: "destructive"
      });
    }
  };

  const promoteToModerator = async (memberId: string) => {
    if (!isOwner) return;

    try {
      const { error } = await supabase
        .from('guild_members')
        .update({ role: 'moderador' })
        .eq('guild_id', guildId)
        .eq('profile_id', memberId);

      if (error) throw error;

      toast({
        title: "Membro promovido",
        description: "O membro foi promovido a moderador.",
      });

      fetchMembers();
    } catch (error) {
      console.error('Erro ao promover membro:', error);
      toast({
        title: "Erro ao promover",
        description: "Não foi possível promover o membro.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [guildId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'líder':
        return <Crown size={16} className="text-yellow-400" />;
      case 'moderador':
        return <Shield size={16} className="text-purple-400" />;
      default:
        return <User size={16} className="text-gray-400" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'líder':
        return 'Líder';
      case 'moderador':
        return 'Moderador';
      default:
        return 'Membro';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 bg-white/10 backdrop-blur-md">
        <h2 className="text-white font-semibold text-sm">
          Membros ({members.length})
        </h2>
      </div>

      {/* Members List */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {loading ? (
          <div className="text-center text-white/80">Carregando membros...</div>
        ) : members.length === 0 ? (
          <div className="text-center text-white/80 py-8">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum membro encontrado</p>
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.profile_id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(member.role)}
                    <div>
                      <h3 className="font-medium text-white text-sm">{member.full_name}</h3>
                      <p className="text-white/60 text-xs">{getRoleLabel(member.role)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white text-sm font-medium">
                    Nível {member.level}
                  </div>
                  <div className="text-white/60 text-xs">
                    {member.points} pontos
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-white/60">
                <span>Membro desde {formatDate(member.joined_at)}</span>
                
                {isOwner && member.profile_id !== user?.id && (
                  <div className="flex space-x-1">
                    {member.role === 'membro' && (
                      <Button
                        onClick={() => promoteToModerator(member.profile_id)}
                        size="sm"
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 px-2 py-1 h-auto text-xs"
                      >
                        Promover
                      </Button>
                    )}
                    <Button
                      onClick={() => removeMember(member.profile_id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 px-2 py-1 h-auto text-xs"
                    >
                      <UserMinus size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuildMembers;
