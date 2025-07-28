
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, MessageSquare, CheckCircle, User, MessageCircleReply } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import MuralResponse from './MuralResponse';

interface MuralPost {
  id: string;
  guild_id: string;
  author_id: string;
  title: string;
  body: string;
  is_answered: boolean;
  created_at: string;
  author_name: string;
  response_count?: number;
}

interface GuildMuralProps {
  guildId: string;
}

const GuildMural: React.FC<GuildMuralProps> = ({ guildId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<MuralPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('membro');

  const fetchUserRole = async () => {
    try {
      const { data } = await supabase
        .from('guild_members')
        .select('role')
        .eq('guild_id', guildId)
        .eq('profile_id', user?.id)
        .single();

      setUserRole(data?.role || 'membro');
    } catch (error) {
      console.error('Erro ao buscar papel do usuário:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_mural_posts')
        .select(`
          *,
          profiles!guild_mural_posts_author_id_fkey(full_name)
        `)
        .eq('guild_id', guildId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Buscar contagem de respostas para cada post
      const postsWithResponseCount = await Promise.all(
        (data || []).map(async (post) => {
          const { count } = await supabase
            .from('guild_mural_responses')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id);

          return {
            ...post,
            author_name: post.profiles?.full_name || 'Usuário',
            response_count: count || 0
          };
        })
      );

      setPosts(postsWithResponseCount);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPostTitle.trim() || !newPostBody.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('guild_mural_posts')
        .insert({
          guild_id: guildId,
          author_id: user.id,
          title: newPostTitle.trim(),
          body: newPostBody.trim()
        });

      if (error) throw error;

      toast({
        title: "Post criado!",
        description: "Sua dúvida foi postada no mural.",
      });

      setShowCreateModal(false);
      setNewPostTitle('');
      setNewPostBody('');
      fetchPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast({
        title: "Erro ao criar post",
        description: "Não foi possível criar o post.",
        variant: "destructive"
      });
    }
  };

  const markAsAnswered = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('guild_mural_posts')
        .update({ is_answered: true })
        .eq('id', postId)
        .eq('author_id', user?.id);

      if (error) throw error;

      toast({
        title: "Marcado como respondido",
        description: "A dúvida foi marcada como respondida.",
      });

      fetchPosts();
    } catch (error) {
      console.error('Erro ao marcar como respondido:', error);
    }
  };

  const togglePostExpansion = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  useEffect(() => {
    fetchPosts();
    fetchUserRole();
  }, [guildId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOwner = userRole === 'dono';
  const isLeader = userRole === 'líder';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 bg-white/10 backdrop-blur-md flex items-center justify-between">
        <h2 className="text-white font-semibold text-sm">Mural de Dúvidas</h2>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs"
        >
          <Plus size={14} className="mr-1" />
          Nova Dúvida
        </Button>
      </div>

      {/* Posts */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {loading ? (
          <div className="text-center text-white/80">Carregando posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-white/80 py-8">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhuma dúvida postada ainda</p>
            <p className="text-sm opacity-75">Seja o primeiro a fazer uma pergunta!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-3 ${
                post.is_answered ? 'border border-green-400' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-white text-sm">{post.title}</h3>
                    {post.is_answered && (
                      <CheckCircle size={14} className="text-green-400" />
                    )}
                  </div>
                  <p className="text-white/80 text-xs mb-2">{post.body}</p>
                  
                  <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{post.author_name}</span>
                    </div>
                    <span>{formatDate(post.created_at)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => togglePostExpansion(post.id)}
                      className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <MessageCircleReply size={12} />
                      <span>{post.response_count || 0} respostas</span>
                    </button>
                    
                    {!post.is_answered && post.author_id === user?.id && (
                      <Button
                        onClick={() => markAsAnswered(post.id)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2"
                      >
                        Marcar como Respondido
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Expanded Responses */}
              {expandedPost === post.id && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <MuralResponse
                    postId={post.id}
                    guildId={guildId}
                    isOwner={isOwner}
                    isLeader={isLeader}
                    onResponseAdded={fetchPosts}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Nova Dúvida</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título da Dúvida</label>
                <Input
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="Qual é sua dúvida?"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  value={newPostBody}
                  onChange={(e) => setNewPostBody(e.target.value)}
                  placeholder="Descreva sua dúvida em detalhes..."
                  className="w-full h-24 p-2 border rounded-md resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={createPost}
                disabled={!newPostTitle.trim() || !newPostBody.trim()}
                className="flex-1"
              >
                Postar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildMural;
