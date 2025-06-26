
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Clock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface JoinRequest {
  id: string;
  guild_id: string;
  requester_id: string;
  status: string;
  message: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

interface GuildJoinRequestsProps {
  guildId: string;
  onRequestHandled?: () => void;
}

const GuildJoinRequests: React.FC<GuildJoinRequestsProps> = ({ guildId, onRequestHandled }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);

  const fetchJoinRequests = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('guild_join_requests')
        .select(`
          *,
          profiles!guild_join_requests_requester_id_fkey(full_name)
        `)
        .eq('guild_id', guildId)
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setRequests(data || []);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
      toast({
        title: "Erro ao carregar solicitações",
        description: "Não foi possível carregar as solicitações de entrada.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRequest = async (requestId: string, action: 'approved' | 'rejected', requesterName: string) => {
    try {
      setProcessingRequest(requestId);

      // Atualizar status da solicitação
      const { error: updateError } = await supabase
        .from('guild_join_requests')
        .update({ status: action })
        .eq('id', requestId);

      if (updateError) throw updateError;

      // Se aprovado, adicionar como membro
      if (action === 'approved') {
        const request = requests.find(r => r.id === requestId);
        if (request) {
          const { error: memberError } = await supabase
            .from('guild_members')
            .insert({
              guild_id: guildId,
              profile_id: request.requester_id,
              role: 'membro'
            });

          if (memberError) {
            console.error('Erro ao adicionar membro:', memberError);
            // Reverter status se falhar ao adicionar
            await supabase
              .from('guild_join_requests')
              .update({ status: 'pending' })
              .eq('id', requestId);
            throw memberError;
          }
        }
      }

      toast({
        title: action === 'approved' ? "Solicitação aprovada!" : "Solicitação rejeitada",
        description: `${requesterName} foi ${action === 'approved' ? 'aceito na' : 'rejeitado da'} guilda.`,
      });

      // Atualizar lista
      await fetchJoinRequests();
      onRequestHandled?.();
    } catch (error) {
      console.error('Erro ao processar solicitação:', error);
      toast({
        title: "Erro ao processar solicitação",
        description: "Não foi possível processar a solicitação.",
        variant: "destructive"
      });
    } finally {
      setProcessingRequest(null);
    }
  };

  useEffect(() => {
    fetchJoinRequests();
  }, [guildId]);

  if (loading) {
    return (
      <div className="text-center text-white/80 py-4">
        <Clock className="animate-spin mx-auto mb-2" size={24} />
        <p>Carregando solicitações...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center text-white/80 py-8">
        <User size={48} className="mx-auto mb-4 opacity-50" />
        <p>Nenhuma solicitação pendente</p>
        <p className="text-sm opacity-75">As solicitações aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold text-sm mb-4">
        Solicitações Pendentes ({requests.length})
      </h3>
      
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">
                {request.profiles?.full_name || 'Usuário'}
              </h4>
              <p className="text-white/80 text-xs mb-2">
                {request.message || 'Gostaria de entrar na guilda'}
              </p>
              <p className="text-white/60 text-xs">
                Solicitado em {new Date(request.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          <div className="flex space-x-2 mt-3">
            <Button
              onClick={() => handleJoinRequest(request.id, 'approved', request.profiles?.full_name || 'Usuário')}
              disabled={processingRequest === request.id}
              className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded flex-1"
            >
              <Check size={12} className="mr-1" />
              {processingRequest === request.id ? 'Processando...' : 'Aprovar'}
            </Button>
            <Button
              onClick={() => handleJoinRequest(request.id, 'rejected', request.profiles?.full_name || 'Usuário')}
              disabled={processingRequest === request.id}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded flex-1"
            >
              <X size={12} className="mr-1" />
              {processingRequest === request.id ? 'Processando...' : 'Rejeitar'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuildJoinRequests;
