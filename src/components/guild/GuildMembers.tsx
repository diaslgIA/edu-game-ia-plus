
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Crown, Shield, User, MoreVertical, UserMinus, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GuildMember {
  profile_id: string;
  role: string;
  joined_at: string;
  full_name: string;
  points: number;
}

interface GuildMembersProps {
  guildId: string;
  isOwner?: boolean;
  onMemberUpdate?: () => void;
}

const GuildMembers: React.FC<GuildMembersProps> = ({ 
  guildId, 
  isOwner = false,
  onMemberUpdate 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<GuildMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMember, setActionMember] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_members')
        .select(`
          profile_id,
          role,
          joined_at,
          profiles!guild_members_profile_id_fkey(full_name, points)
        `)
        .eq('guild_id', guildId)
        .order('joined_at', { ascending: true });

      if (error) throw error;

      const processedMembers = data?.map(member => ({
        profile_id: member.profile_id,
        role: member.role,
        joined_at: member.joined_at,
        full_name: member.profiles?.full_name || 'Usuário',
        points: member.profiles?.points || 0
      })) || [];

      setMembers(processedMembers);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('guild_members')
        .update({ role: newRole })
        .eq('guild_id', guildId)
        .eq('profile_id', memberId);

      if (error) throw error;

      toast({
        title: "Cargo atualizado",
        description: `Membro promovido/rebaixado para ${newRole}.`,
      });

      fetchMembers();
      onMemberUpdate?.();
    } catch (error) {
      console.error('Erro ao atualizar cargo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cargo.",
        variant: "destructive"
      });
    }
  };

  const removeMember = async (memberId: string) => {
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
      onMemberUpdate?.();
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o membro.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [guildId]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'líder':
        return <Crown size={14} className="text-yellow-400" />;
      case 'moderador':
        return <Shield size={14} className="text-blue-400" />;
      default:
        return <User size={14} className="text-gray-400" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'líder':
        return 'text-yellow-400';
      case 'moderador':
        return 'text-blue-400';
      default:
        return 'text-white/80';
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-white/80">Carregando membros...</div>;
  }

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <Users size={20} className="text-white" />
        <h3 className="text-white font-semibold">Membros ({members.length}/20)</h3>
      </div>

      {members.length === 0 ? (
        <div className="text-center py-8">
          <Users size={48} className="mx-auto mb-4 opacity-50 text-white/50" />
          <p className="text-white/80">Nenhum membro encontrado</p>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.profile_id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRoleIcon(member.role)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{member.full_name}</span>
                      <span className={`text-xs ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-white/60">
                      <span>{member.points} pontos</span>
                      <span>Entrou em {new Date(member.joined_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Ações do dono */}
                {isOwner && member.profile_id !== user?.id && (
                  <div className="flex items-center space-x-1">
                    {member.role === 'membro' && (
                      <Button
                        onClick={() => updateMemberRole(member.profile_id, 'moderador')}
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs"
                      >
                        <UserCheck size={12} className="mr-1" />
                        Promover
                      </Button>
                    )}
                    {member.role === 'moderador' && (
                      <Button
                        onClick={() => updateMemberRole(member.profile_id, 'membro')}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs"
                      >
                        Rebaixar
                      </Button>
                    )}
                    <Button
                      onClick={() => removeMember(member.profile_id)}
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs"
                    >
                      <UserMinus size={12} className="mr-1" />
                      Remover
                    </Button>
                  </div>
                )}

                {/* Indicador de você mesmo */}
                {member.profile_id === user?.id && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                    Você
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuildMembers;
