
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Crown, Shield, User, UserMinus, UserCheck, ArrowDown, Loader2 } from 'lucide-react';
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
  const [processingMember, setProcessingMember] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('membro');

  const fetchMembers = async () => {
    if (!guildId) return;
    
    try {
      console.log('Buscando membros da guilda:', guildId);
      setLoading(true);
      
      // Buscar membros de forma mais segura
      const { data: memberData, error: memberError } = await supabase
        .from('guild_members')
        .select('profile_id, role, joined_at')
        .eq('guild_id', guildId);

      if (memberError) {
        console.error('Erro ao buscar membros:', memberError);
        throw memberError;
      }

      if (!memberData || memberData.length === 0) {
        setMembers([]);
        return;
      }

      // Buscar perfis dos membros separadamente
      const profileIds = memberData.map(m => m.profile_id);
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, points')
        .in('id', profileIds);

      if (profileError) {
        console.error('Erro ao buscar perfis:', profileError);
        // Continuar mesmo se não conseguir buscar perfis
      }

      // Combinar dados
      const processedMembers = memberData.map(member => {
        const profile = profileData?.find(p => p.id === member.profile_id);
        return {
          profile_id: member.profile_id,
          role: member.role || 'membro',
          joined_at: member.joined_at,
          full_name: profile?.full_name || 'Usuário',
          points: profile?.points || 0
        };
      });

      console.log('Membros processados:', processedMembers);
      setMembers(processedMembers);

      // Encontrar papel do usuário atual
      const currentUserMember = processedMembers.find(m => m.profile_id === user?.id);
      if (currentUserMember) {
        setUserRole(currentUserMember.role);
      }
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      toast({
        title: "Erro ao carregar membros",
        description: "Não foi possível carregar os membros da guilda.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string, memberName: string) => {
    if (!isOwner && userRole !== 'líder') {
      toast({
        title: "Sem permissão",
        description: "Apenas donos e líderes podem promover/rebaixar membros.",
        variant: "destructive"
      });
      return;
    }

    try {
      setProcessingMember(memberId);
      console.log('Atualizando papel do membro:', { memberId, newRole });

      const { error } = await supabase
        .from('guild_members')
        .update({ role: newRole })
        .eq('guild_id', guildId)
        .eq('profile_id', memberId);

      if (error) {
        console.error('Erro ao atualizar cargo:', error);
        throw error;
      }

      toast({
        title: "Cargo atualizado",
        description: `${memberName} foi ${newRole === 'líder' ? 'promovido a' : 'rebaixado para'} ${newRole}.`,
      });

      await fetchMembers();
      onMemberUpdate?.();
    } catch (error) {
      console.error('Erro ao atualizar cargo:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cargo.",
        variant: "destructive"
      });
    } finally {
      setProcessingMember(null);
    }
  };

  const removeMember = async (memberId: string, memberName: string) => {
    if (!isOwner && userRole !== 'líder' && memberId !== user?.id) {
      toast({
        title: "Sem permissão",
        description: "Apenas donos e líderes podem remover membros.",
        variant: "destructive"
      });
      return;
    }

    try {
      setProcessingMember(memberId);
      console.log('Removendo membro:', { memberId, guildId });

      const { error } = await supabase
        .from('guild_members')
        .delete()
        .eq('guild_id', guildId)
        .eq('profile_id', memberId);

      if (error) {
        console.error('Erro ao remover membro:', error);
        throw error;
      }

      toast({
        title: memberId === user?.id ? "Você saiu da guilda" : "Membro removido",
        description: memberId === user?.id ? 
          "Você saiu da guilda com sucesso." : 
          `${memberName} foi removido da guilda.`,
      });

      await fetchMembers();
      onMemberUpdate?.();
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o membro.",
        variant: "destructive"
      });
    } finally {
      setProcessingMember(null);
    }
  };

  useEffect(() => {
    if (guildId) {
      fetchMembers();
    }
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

  const canManageMembers = isOwner || userRole === 'líder';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-white">
        <Loader2 className="animate-spin mr-2" size={20} />
        <span>Carregando membros...</span>
      </div>
    );
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
                      {member.profile_id === user?.id && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                          Você
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-white/60">
                      <span>{member.points} pontos</span>
                      <span>Entrou em {new Date(member.joined_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Ações disponíveis */}
                {canManageMembers && member.profile_id !== user?.id && (
                  <div className="flex items-center space-x-1">
                    {member.role === 'membro' && (
                      <Button
                        onClick={() => updateMemberRole(member.profile_id, 'líder', member.full_name)}
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-xs"
                        disabled={processingMember === member.profile_id}
                      >
                        <UserCheck size={12} className="mr-1" />
                        {processingMember === member.profile_id ? 'Processando...' : 'Promover'}
                      </Button>
                    )}
                    {member.role === 'líder' && (
                      <Button
                        onClick={() => updateMemberRole(member.profile_id, 'membro', member.full_name)}
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs"
                        disabled={processingMember === member.profile_id}
                      >
                        <ArrowDown size={12} className="mr-1" />
                        {processingMember === member.profile_id ? 'Processando...' : 'Rebaixar'}
                      </Button>
                    )}
                    <Button
                      onClick={() => removeMember(member.profile_id, member.full_name)}
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs"
                      disabled={processingMember === member.profile_id}
                    >
                      <UserMinus size={12} className="mr-1" />
                      {processingMember === member.profile_id ? 'Processando...' : 'Remover'}
                    </Button>
                  </div>
                )}

                {/* Botão de sair para o usuário */}
                {!isOwner && member.profile_id === user?.id && (
                  <Button
                    onClick={() => removeMember(member.profile_id, member.full_name)}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs"
                    disabled={processingMember === member.profile_id}
                  >
                    {processingMember === member.profile_id ? 'Saindo...' : 'Sair da Guilda'}
                  </Button>
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
