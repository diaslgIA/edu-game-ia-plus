
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, UserPlus, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useDebounce } from '@/hooks/useDebounce';

interface User {
  id: string;
  full_name: string;
  email: string;
}

interface GuildInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  guildId: string;
  guildName: string;
}

const GuildInviteModal: React.FC<GuildInviteModalProps> = ({
  isOpen,
  onClose,
  guildId,
  guildName
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [inviting, setInviting] = useState<string | null>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const searchUsers = async (term: string) => {
    if (!term.trim() || term.length < 2) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      
      // Buscar usuários que não são membros da guilda
      const { data: allUsers, error: usersError } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .ilike('full_name', `%${term}%`)
        .limit(10);

      if (usersError) throw usersError;

      if (!allUsers || allUsers.length === 0) {
        setUsers([]);
        return;
      }

      // Buscar membros atuais da guilda
      const { data: guildMembers, error: membersError } = await supabase
        .from('guild_members')
        .select('profile_id')
        .eq('guild_id', guildId);

      if (membersError) throw membersError;

      // Buscar convites pendentes
      const { data: pendingInvites, error: invitesError } = await supabase
        .from('guild_invites')
        .select('invited_user_id')
        .eq('guild_id', guildId)
        .eq('status', 'pending');

      if (invitesError) throw invitesError;

      const memberIds = new Set(guildMembers?.map(m => m.profile_id) || []);
      const invitedIds = new Set(pendingInvites?.map(i => i.invited_user_id) || []);

      // Filtrar usuários que não são membros e não têm convites pendentes
      const availableUsers = allUsers.filter(user => 
        !memberIds.has(user.id) && 
        !invitedIds.has(user.id) &&
        user.id !== user?.id // Excluir o próprio usuário
      );

      setUsers(availableUsers);
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
  };

  const sendInvite = async (userId: string, userName: string) => {
    if (!user) return;

    try {
      setInviting(userId);
      
      const { error } = await supabase
        .from('guild_invites')
        .insert({
          guild_id: guildId,
          inviter_id: user.id,
          invited_user_id: userId,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Convite enviado!",
        description: `Convite enviado para ${userName}.`,
      });

      // Remover usuário da lista
      setUsers(prev => prev.filter(u => u.id !== userId));
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

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchUsers(debouncedSearchTerm);
    } else {
      setUsers([]);
    }
  }, [debouncedSearchTerm, guildId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convidar para {guildName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar usuários pelo nome..."
              className="pl-10"
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="text-center py-4 text-gray-500">
                Buscando usuários...
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                {searchTerm.length >= 2 ? 'Nenhum usuário encontrado' : 'Digite pelo menos 2 caracteres para buscar'}
              </div>
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Button
                      onClick={() => sendInvite(user.id, user.full_name)}
                      disabled={inviting === user.id}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {inviting === user.id ? (
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
      </DialogContent>
    </Dialog>
  );
};

export default GuildInviteModal;
