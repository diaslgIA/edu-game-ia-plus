
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  id: number;
  guild_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  sender_name: string;
  sender_role: string;
}

interface GuildChatProps {
  guildId: string;
}

const GuildChat: React.FC<GuildChatProps> = ({ guildId }) => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_chat_messages')
        .select(`
          *,
          profiles!guild_chat_messages_sender_id_fkey(full_name),
          guild_members!inner(role)
        `)
        .eq('guild_id', guildId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      const processedMessages = data.map(msg => ({
        ...msg,
        sender_name: msg.profiles?.full_name || 'Usuário',
        sender_role: Array.isArray(msg.guild_members) && msg.guild_members.length > 0 
          ? msg.guild_members[0].role 
          : 'membro'
      }));

      setMessages(processedMessages);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || sending) return;

    try {
      setSending(true);
      const { error } = await supabase
        .from('guild_chat_messages')
        .insert({
          guild_id: guildId,
          sender_id: user.id,
          content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Configurar escuta em tempo real aprimorada
    const channel = supabase
      .channel(`guild_chat_${guildId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guild_chat_messages',
          filter: `guild_id=eq.${guildId}`
        },
        (payload) => {
          console.log('Nova mensagem recebida:', payload);
          // Recarregar mensagens para garantir dados completos
          fetchMessages();
        }
      )
      .subscribe((status) => {
        console.log('Status do canal:', status);
        if (status === 'SUBSCRIBED') {
          console.log('Conectado ao chat em tempo real');
        }
      });

    return () => {
      console.log('Desconectando do chat');
      supabase.removeChannel(channel);
    };
  }, [guildId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        {loading ? (
          <div className="text-center text-white/80">Carregando mensagens...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-white/80 py-8">
            <Send size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhuma mensagem ainda</p>
            <p className="text-sm opacity-75">Seja o primeiro a enviar uma mensagem!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] p-2 rounded-xl text-xs ${
                message.sender_role === 'líder' 
                  ? 'bg-yellow-500 text-black' 
                  : message.sender_id === user?.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-white backdrop-blur-md'
              }`}>
                <div className="flex items-center space-x-1 mb-1">
                  {message.sender_role === 'líder' && <Crown size={10} className="text-yellow-800" />}
                  <span className="font-semibold text-[10px]">{message.sender_name}</span>
                  <span className="text-[9px] opacity-70">{formatTime(message.created_at)}</span>
                </div>
                <p className="text-[11px] break-words">{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white/10 backdrop-blur-md flex-shrink-0">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
            onKeyPress={handleKeyPress}
            disabled={sending}
            maxLength={500}
          />
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3"
          >
            <Send size={16} />
          </Button>
        </div>
        <div className="text-xs text-white/60 mt-1">
          {newMessage.length}/500 caracteres
        </div>
      </div>
    </div>
  );
};

export default GuildChat;
