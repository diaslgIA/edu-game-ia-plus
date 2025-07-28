
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Search } from 'lucide-react';
import GuildCard from '@/components/guild/GuildCard';
import GuildCreateModal from '@/components/guild/GuildCreateModal';

interface Guild {
  id: string;
  name: string;
  description: string;
  guild_code: string;
  owner_id: string;
  total_points: number;
  is_public: boolean;
  created_at: string;
  member_count?: number;
}

const Guilds = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creatingGuild, setCreatingGuild] = useState(false);
  const [newGuildData, setNewGuildData] = useState({
    name: '',
    description: '',
    isPublic: true,
  });

  const fetchGuilds = async () => {
    try {
      setLoading(true);
      console.log('Buscando guildas...');

      // Buscar guildas com query otimizada
      let guildsQuery = supabase
        .from('guilds')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        guildsQuery = guildsQuery.ilike('name', `%${searchQuery}%`);
      }

      const { data: guildsData, error: guildsError } = await guildsQuery;

      if (guildsError) {
        console.error('Erro ao buscar guildas:', guildsError);
        throw guildsError;
      }

      console.log('Guildas encontradas:', guildsData);

      // Usar função segura para contar membros
      const guildsWithMemberCount = await Promise.all(
        (guildsData || []).map(async (guild) => {
          try {
            const { count, error: countError } = await supabase
              .rpc('is_guild_member_safe', { 
                target_guild_id: guild.id, 
                target_user_id: user?.id || '00000000-0000-0000-0000-000000000000'
              })
              .then(async () => {
                return await supabase
                  .from('guild_members')
                  .select('*', { count: 'exact', head: true })
                  .eq('guild_id', guild.id);
              });

            if (countError) {
              console.warn(`Erro ao contar membros da guilda ${guild.id}:`, countError);
              return { ...guild, member_count: 0 };
            }

            return { ...guild, member_count: count || 0 };
          } catch (error) {
            console.warn(`Erro ao buscar contagem para guilda ${guild.id}:`, error);
            return { ...guild, member_count: 0 };
          }
        })
      );

      setGuilds(guildsWithMemberCount);
    } catch (error) {
      console.error('Erro ao buscar guildas:', error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar a lista de guildas.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateGuildCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const createGuild = async () => {
    if (!user) {
      console.error('Usuário não autenticado');
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar uma guilda.",
        variant: "destructive"
      });
      return;
    }

    if (!newGuildData.name.trim() || !newGuildData.description.trim()) {
      toast({
        title: "Erro",
        description: "Nome e descrição são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      setCreatingGuild(true);
      console.log('Iniciando criação de guilda...', { 
        userId: user.id, 
        userEmail: user.email,
        guildData: newGuildData 
      });

      const guildCode = generateGuildCode();
      console.log('Código da guilda gerado:', guildCode);

      // Usar a função RPC para criar guilda e adicionar membro
      const { data: result, error: rpcError } = await supabase
        .rpc('create_guild_with_owner', {
          guild_name: newGuildData.name.trim(),
          guild_description: newGuildData.description.trim(),
          guild_code: guildCode,
          owner_id: user.id,
          is_public: newGuildData.isPublic
        });

      if (rpcError) {
        console.error('Erro na função RPC:', rpcError);
        throw rpcError;
      }

      console.log('Guilda criada com sucesso via RPC:', result);

      toast({
        title: "Guilda criada!",
        description: `A guilda "${newGuildData.name}" foi criada com sucesso.`,
      });

      setShowCreateModal(false);
      setNewGuildData({ name: '', description: '', isPublic: true });
      
      // Atualizar lista de guildas
      fetchGuilds();
    } catch (error: any) {
      console.error('Erro completo na criação da guilda:', error);
      
      toast({
        title: "Erro ao criar guilda",
        description: `Erro: ${error.message || 'Erro desconhecido'}`,
        variant: "destructive"
      });
    } finally {
      setCreatingGuild(false);
    }
  };

  // Buscar guildas quando o componente monta ou quando a busca muda
  useEffect(() => {
    fetchGuilds();
  }, [searchQuery]);

  // Atualizar lista a cada 30 segundos para mostrar novas guildas
  useEffect(() => {
    const interval = setInterval(fetchGuilds, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Carregando...</div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-b-3xl flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold">Guildas</h1>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={!user}
            >
              <Plus size={16} className="mr-2" />
              Criar Guilda
            </Button>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar guilda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
          </div>
        </div>

        {/* Guild List */}
        <div className="flex-1 overflow-y-auto p-4">
          {guilds.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-white/80 mb-4">
                {searchQuery ? 'Nenhuma guilda encontrada' : 'Nenhuma guilda disponível'}
              </div>
              {user && !searchQuery && (
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Criar primeira guilda
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {guilds.map((guild) => (
                <GuildCard key={guild.id} guild={guild} />
              ))}
            </div>
          )}
        </div>

        {/* Create Guild Modal */}
        <GuildCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={createGuild}
          creating={creatingGuild}
          newGuildData={newGuildData}
          setNewGuildData={setNewGuildData}
        />
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Guilds;
