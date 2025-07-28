
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  full_name: string;
  email: string;
}

interface GuildInviteModalProps {
  guildId: string;
  guildName: string;
  isOpen: boolean;
  onClose: () => void;
}

const GuildInviteModal: React.FC<GuildInviteModalProps> = ({
  guildId,
  guildName,
  isOpen,
  onClose
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviting, setInviting] = useState<string | null>(null);

  // Função de busca com debounce
  const searchUsers = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      console.log('Buscando usuários com termo:', term);
      
      // Primeiro, buscar IDs de usuários que já são membros
      const { data: existingMembers } = await supabase
        .from('guild_members')
        .select('profile_id')
        .eq('guild_id', guildId);

      // Buscar IDs de usuários que foram convidados
      const { data: invitedUsers } = await supabase
        .from('guild_invites')
        .select('invited_user_id')
        .eq('guild_id', guildId)
        .eq('status', 'pending');

      // Criar array de IDs para excluir
      const excludeIds = [
        user?.id, // Excluir o próprio usuário
        ...(existingMembers || []).map(u => u.profile_id),
        ...(invitedUsers || []).map(u => u.invited_user_id)
      ].filter(Boolean);

      console.log('IDs para excluir:', excludeIds);

      // Buscar usuários que não são membros nem foram convidados
      let query = supabase
        .from('profiles')
        .select('id, full_name, email')
        .ilike('full_name', `%${term}%`)
        .limit(10);

      // Excluir usuários já relacionados à guilda
      if (excludeIds.length > 0) {
        query = query.not('id', 'in', `(${excludeIds.map(id => `"${id}"`).join(',')})`);
      }

      const { data: profiles, error } = await query;

      if (error) {
        console.error('Erro na busca de usuários:', error);
        throw error;
      }

      console.log('Usuários encontrados:', profiles);
      setSearchResults(profiles || []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro na busca",
        description: "Não foi possível buscar usuários.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [guildId, user?.id, toast]);

  // Debounce para busca em tempo real
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchUsers(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchUsers]);

  const sendInvite = async (userId: string) => {
    if (!user) return;

    try {
      setInviting(userId);
      
      const { error } = await supabase
        .from('guild_invites')
        .insert({
          guild_id: guildId,
          inviter_id: user.id,
          invited_user_id: userId
        });

      if (error) throw error;

      toast({
        title: "Convite enviado!",
        description: "O convite foi enviado com sucesso.",
      });

      // Remover usuário dos resultados
      setSearchResults(prev => prev.filter(p => p.id !== userId));
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      toast({
        title: "Erro ao enviar convite",
        description: "Não foi possível enviar o convite.",
        variant: "destructive"
      });
    } finally {
      setInviting(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Convidar para {guildName}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do usuário..."
            className="pl-10"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {searchTerm ? 
                (loading ? 'Buscando...' : 'Nenhum usuário encontrado') : 
                'Digite para buscar usuários'
              }
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{profile.full_name}</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                  <Button
                    onClick={() => sendInvite(profile.id)}
                    disabled={inviting === profile.id}
                    size="sm"
                  >
                    {inviting === profile.id ? (
                      'Enviando...'
                    ) : (
                      <>
                        <UserPlus size={14} className="mr-1" />
                        Convidar
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuildInviteModal;
