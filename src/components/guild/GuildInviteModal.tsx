
import React, { useState } from 'react';
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

  const searchUsers = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      
      // Buscar usuários que não são membros da guilda
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .or(`full_name.ilike.%${searchTerm}%, email.ilike.%${searchTerm}%`)
        .not('id', 'in', `(
          SELECT profile_id FROM guild_members WHERE guild_id = '${guildId}'
          UNION
          SELECT invited_user_id FROM guild_invites WHERE guild_id = '${guildId}' AND status = 'pending'
        )`)
        .limit(10);

      if (error) throw error;
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
  };

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
            onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
            placeholder="Buscar usuários por nome ou email..."
            className="pl-10"
          />
          <Button 
            onClick={searchUsers}
            disabled={loading || !searchTerm.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-2"
          >
            Buscar
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-4">Buscando...</div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {searchTerm ? 'Nenhum usuário encontrado' : 'Digite para buscar usuários'}
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
