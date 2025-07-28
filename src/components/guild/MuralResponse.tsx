
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Pin, User, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MuralResponseData {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  is_pinned: boolean;
  likes_count: number;
  created_at: string;
  author_name: string;
  user_liked?: boolean;
}

interface MuralResponseProps {
  postId: string;
  guildId: string;
  isOwner: boolean;
  isLeader: boolean;
  onResponseAdded: () => void;
}

const MuralResponse: React.FC<MuralResponseProps> = ({ 
  postId, 
  guildId, 
  isOwner, 
  isLeader, 
  onResponseAdded 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [responses, setResponses] = useState<MuralResponseData[]>([]);
  const [newResponse, setNewResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);

  const fetchResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_mural_responses')
        .select(`
          *,
          profiles!guild_mural_responses_author_id_fkey(full_name)
        `)
        .eq('post_id', postId)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;

      const responsesWithLikes = await Promise.all(
        (data || []).map(async (response) => {
          // Verificar se o usuário curtiu
          const { data: likeData } = await supabase
            .from('guild_mural_response_likes')
            .select('id')
            .eq('response_id', response.id)
            .eq('user_id', user?.id)
            .single();

          return {
            ...response,
            author_name: response.profiles?.full_name || 'Usuário',
            user_liked: !!likeData
          };
        })
      );

      setResponses(responsesWithLikes);
    } catch (error) {
      console.error('Erro ao buscar respostas:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async () => {
    if (!newResponse.trim() || !user) return;

    try {
      setSubmitting(true);
      
      const { error } = await supabase
        .from('guild_mural_responses')
        .insert({
          post_id: postId,
          author_id: user.id,
          content: newResponse.trim()
        });

      if (error) throw error;

      toast({
        title: "Resposta enviada!",
        description: "Sua resposta foi adicionada ao mural.",
      });

      setNewResponse('');
      setShowResponseForm(false);
      fetchResponses();
      onResponseAdded();
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      toast({
        title: "Erro ao enviar resposta",
        description: "Não foi possível enviar sua resposta.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLike = async (responseId: string) => {
    if (!user) return;

    try {
      const response = responses.find(r => r.id === responseId);
      if (!response) return;

      if (response.user_liked) {
        // Remover curtida
        await supabase
          .from('guild_mural_response_likes')
          .delete()
          .eq('response_id', responseId)
          .eq('user_id', user.id);

        // Atualizar contador
        await supabase
          .from('guild_mural_responses')
          .update({ likes_count: Math.max(0, response.likes_count - 1) })
          .eq('id', responseId);
      } else {
        // Adicionar curtida
        await supabase
          .from('guild_mural_response_likes')
          .insert({
            response_id: responseId,
            user_id: user.id
          });

        // Atualizar contador
        await supabase
          .from('guild_mural_responses')
          .update({ likes_count: response.likes_count + 1 })
          .eq('id', responseId);
      }

      fetchResponses();
    } catch (error) {
      console.error('Erro ao curtir resposta:', error);
    }
  };

  const togglePin = async (responseId: string) => {
    if (!isOwner && !isLeader) return;

    try {
      const response = responses.find(r => r.id === responseId);
      if (!response) return;

      await supabase
        .from('guild_mural_responses')
        .update({ is_pinned: !response.is_pinned })
        .eq('id', responseId);

      fetchResponses();
      
      toast({
        title: response.is_pinned ? "Resposta despinada" : "Resposta fixada",
        description: response.is_pinned ? 
          "A resposta foi removida do topo." : 
          "A resposta foi fixada no topo.",
      });
    } catch (error) {
      console.error('Erro ao fixar resposta:', error);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, [postId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3">
      {/* Responses List */}
      {loading ? (
        <div className="text-center text-white/80 py-2">
          Carregando respostas...
        </div>
      ) : (
        <div className="space-y-2">
          {responses.map((response) => (
            <div
              key={response.id}
              className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border-l-2 ${
                response.is_pinned ? 'border-yellow-400' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <User size={12} className="text-white/60" />
                  <span className="text-white/80 text-xs font-medium">
                    {response.author_name}
                  </span>
                  {response.is_pinned && (
                    <Pin size={12} className="text-yellow-400" />
                  )}
                </div>
                <span className="text-white/50 text-xs">
                  {formatDate(response.created_at)}
                </span>
              </div>
              
              <p className="text-white/90 text-sm mb-3">{response.content}</p>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleLike(response.id)}
                  className={`flex items-center space-x-1 text-xs ${
                    response.user_liked ? 'text-red-400' : 'text-white/60'
                  } hover:text-red-400 transition-colors`}
                >
                  <Heart size={12} fill={response.user_liked ? 'currentColor' : 'none'} />
                  <span>{response.likes_count}</span>
                </button>
                
                {(isOwner || isLeader) && (
                  <button
                    onClick={() => togglePin(response.id)}
                    className={`text-xs ${
                      response.is_pinned ? 'text-yellow-400' : 'text-white/60'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <Pin size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Response Form */}
      <div className="border-t border-white/10 pt-3">
        {!showResponseForm ? (
          <Button
            onClick={() => setShowResponseForm(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
          >
            <MessageCircle size={14} className="mr-2" />
            Responder
          </Button>
        ) : (
          <div className="space-y-2">
            <textarea
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              placeholder="Escreva sua resposta..."
              className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white placeholder:text-white/60 text-sm resize-none"
              rows={3}
            />
            <div className="flex space-x-2">
              <Button
                onClick={submitResponse}
                disabled={!newResponse.trim() || submitting}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm"
              >
                {submitting ? 'Enviando...' : 'Enviar'}
              </Button>
              <Button
                onClick={() => {
                  setShowResponseForm(false);
                  setNewResponse('');
                }}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 text-sm"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuralResponse;
