
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GuildInvite {
  id: string;
  guild_id: string;
  inviter_id: string;
  invited_user_id: string;
  status: string;
  created_at: string;
  guild_name?: string;
  inviter_name?: string;
}

interface GuildInvitesProps {
  guildId?: string;
  showReceivedInvites?: boolean;
}

const GuildInvites: React.FC<GuildInvitesProps> = ({ 
  guildId, 
  showReceivedInvites = false 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invites, setInvites] = useState<GuildInvite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvites = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('guild_invites')
        .select(`
          *,
          guilds!guild_invites_guild_id_fkey(name),
          profiles!guild_invites_inviter_id_fkey(full_name)
        `);

      if (showReceivedInvites) {
        // Convites recebidos pelo usuário
        query = query.eq('invited_user_id', user.id).eq('status', 'pending');
      } else if (guildId) {
        // Convites da guilda específica
        query = query.eq('guild_id', guildId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      const processedInvites = data?.map(invite => ({
        ...invite,
        guild_name: invite.guilds?.name || 'Guilda',
        inviter_name: invite.profiles?.full_name || 'Usuário'
      })) || [];

      setInvites(processedInvites);
    } catch (error) {
      console.error('Erro ao buscar convites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteResponse = async (inviteId: string, accept: boolean) => {
    try {
      const invite = invites.find(i => i.id === inviteId);
      if (!invite) return;

      if (accept) {
        // Aceitar convite - adicionar à guilda e atualizar status
        const { error: memberError } = await supabase
          .from('guild_members')
          .insert({
            guild_id: invite.guild_id,
            profile_id: user?.id
          });

        if (memberError) throw memberError;
      }

      // Atualizar status do convite
      const { error } = await supabase
        .from('guild_invites')
        .update({ status: accept ? 'accepted' : 'rejected' })
        .eq('id', inviteId);

      if (error) throw error;

      toast({
        title: accept ? "Convite aceito!" : "Convite recusado",
        description: accept 
          ? `Você agora faz parte da guilda "${invite.guild_name}".`
          : "O convite foi recusado.",
      });

      fetchInvites();
    } catch (error) {
      console.error('Erro ao responder convite:', error);
      toast({
        title: "Erro",
        description: "Não foi possível processar a resposta.",
        variant: "destructive"
      });
    }
  };

  const cancelInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from('guild_invites')
        .delete()
        .eq('id', inviteId);

      if (error) throw error;

      toast({
        title: "Convite cancelado",
        description: "O convite foi cancelado com sucesso.",
      });

      fetchInvites();
    } catch (error) {
      console.error('Erro ao cancelar convite:', error);
      toast({
        title: "Erro ao cancelar",
        description: "Não foi possível cancelar o convite.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchInvites();
  }, [user, guildId, showReceivedInvites]);

  if (loading) {
    return <div className="text-center py-4">Carregando convites...</div>;
  }

  if (invites.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <User size={48} className="mx-auto mb-4 opacity-50" />
        <p>{showReceivedInvites ? 'Nenhum convite recebido' : 'Nenhum convite pendente'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invites.map((invite) => (
        <div
          key={invite.id}
          className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Clock size={14} className="text-yellow-400" />
                <span className="text-sm font-medium">
                  {showReceivedInvites 
                    ? `Convite para ${invite.guild_name}`
                    : `Convite enviado`
                  }
                </span>
              </div>
              <p className="text-xs text-white/80">
                {showReceivedInvites 
                  ? `Enviado por ${invite.inviter_name}`
                  : `Status: ${invite.status === 'pending' ? 'Pendente' : invite.status}`
                }
              </p>
              <p className="text-xs text-white/60">
                {new Date(invite.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="flex space-x-2">
              {showReceivedInvites && invite.status === 'pending' ? (
                <>
                  <Button
                    onClick={() => handleInviteResponse(invite.id, true)}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1"
                  >
                    <Check size={14} />
                  </Button>
                  <Button
                    onClick={() => handleInviteResponse(invite.id, false)}
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1"
                  >
                    <X size={14} />
                  </Button>
                </>
              ) : (
                !showReceivedInvites && invite.status === 'pending' && (
                  <Button
                    onClick={() => cancelInvite(invite.id)}
                    size="sm"
                    variant="destructive"
                    className="px-2 py-1 text-xs"
                  >
                    Cancelar
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuildInvites;
