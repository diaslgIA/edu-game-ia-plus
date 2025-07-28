
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sword, Clock, Trophy, Users, Target, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Battle {
  id: string;
  challenger_guild_id: string;
  challenged_guild_id: string;
  battle_type: string;
  status: string;
  start_time: string;
  end_time: string;
  challenger_score: number;
  challenged_score: number;
  winner_guild_id: string | null;
  challenger_name: string;
  challenged_name: string;
}

interface GuildBattlesProps {
  guildId: string;
  isOwner: boolean;
  isLeader: boolean;
}

const GuildBattles: React.FC<GuildBattlesProps> = ({ guildId, isOwner, isLeader }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [battles, setBattles] = useState<Battle[]>([]);
  const [availableGuilds, setAvailableGuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<string>('');
  const [battleType, setBattleType] = useState<string>('quiz_rapido');

  const fetchBattles = async () => {
    try {
      const { data, error } = await supabase
        .from('guild_battles')
        .select(`
          *,
          challenger_guild:guilds!guild_battles_challenger_guild_id_fkey(name),
          challenged_guild:guilds!guild_battles_challenged_guild_id_fkey(name)
        `)
        .or(`challenger_guild_id.eq.${guildId},challenged_guild_id.eq.${guildId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedBattles = (data || []).map(battle => ({
        ...battle,
        challenger_name: battle.challenger_guild?.name || 'Guilda Desconhecida',
        challenged_name: battle.challenged_guild?.name || 'Guilda Desconhecida'
      }));

      setBattles(processedBattles);
    } catch (error) {
      console.error('Erro ao buscar batalhas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableGuilds = async () => {
    try {
      const { data, error } = await supabase
        .from('guilds')
        .select('*')
        .neq('id', guildId)
        .eq('is_public', true);

      if (error) throw error;

      setAvailableGuilds(data || []);
    } catch (error) {
      console.error('Erro ao buscar guildas disponíveis:', error);
    }
  };

  const createChallenge = async () => {
    if (!selectedGuild || !user) return;

    try {
      const { error } = await supabase
        .from('guild_battles')
        .insert({
          challenger_guild_id: guildId,
          challenged_guild_id: selectedGuild,
          battle_type: battleType,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Desafio enviado!",
        description: "O desafio foi enviado para a guilda selecionada.",
      });

      setShowChallengeModal(false);
      setSelectedGuild('');
      fetchBattles();
    } catch (error) {
      console.error('Erro ao criar desafio:', error);
      toast({
        title: "Erro ao criar desafio",
        description: "Não foi possível enviar o desafio.",
        variant: "destructive"
      });
    }
  };

  const acceptChallenge = async (battleId: string) => {
    try {
      const { error } = await supabase
        .from('guild_battles')
        .update({
          status: 'active',
          start_time: new Date().toISOString()
        })
        .eq('id', battleId);

      if (error) throw error;

      toast({
        title: "Desafio aceito!",
        description: "A batalha foi iniciada!",
      });

      fetchBattles();
    } catch (error) {
      console.error('Erro ao aceitar desafio:', error);
      toast({
        title: "Erro ao aceitar desafio",
        description: "Não foi possível aceitar o desafio.",
        variant: "destructive"
      });
    }
  };

  const rejectChallenge = async (battleId: string) => {
    try {
      const { error } = await supabase
        .from('guild_battles')
        .update({ status: 'cancelled' })
        .eq('id', battleId);

      if (error) throw error;

      toast({
        title: "Desafio rejeitado",
        description: "O desafio foi rejeitado.",
      });

      fetchBattles();
    } catch (error) {
      console.error('Erro ao rejeitar desafio:', error);
    }
  };

  useEffect(() => {
    fetchBattles();
    fetchAvailableGuilds();
  }, [guildId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'active':
        return 'text-green-400';
      case 'completed':
        return 'text-blue-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-white/60';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'active':
        return 'Ativa';
      case 'completed':
        return 'Concluída';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canManageBattles = isOwner || isLeader;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center">
          <Sword size={16} className="mr-2 text-red-400" />
          Batalhas de Conhecimento
        </h3>
        
        {canManageBattles && (
          <Button
            onClick={() => setShowChallengeModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
          >
            <Target size={14} className="mr-1" />
            Desafiar
          </Button>
        )}
      </div>

      {/* Battles List */}
      {loading ? (
        <div className="text-center text-white/80 py-4">
          Carregando batalhas...
        </div>
      ) : battles.length === 0 ? (
        <div className="text-center text-white/80 py-8">
          <Sword size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nenhuma batalha encontrada</p>
          <p className="text-sm opacity-75">Desafie outras guildas para batalhar!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {battles.map((battle) => (
            <div
              key={battle.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-bold ${getStatusColor(battle.status)}`}>
                    {getStatusText(battle.status)}
                  </span>
                  <span className="text-white/60 text-xs">
                    {battle.battle_type === 'quiz_rapido' ? 'Quiz Rápido' : battle.battle_type}
                  </span>
                </div>
                
                {battle.status === 'pending' && battle.challenged_guild_id === guildId && canManageBattles && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => acceptChallenge(battle.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs"
                    >
                      Aceitar
                    </Button>
                    <Button
                      onClick={() => rejectChallenge(battle.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs"
                    >
                      Rejeitar
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="text-white">
                  <div className="font-medium text-sm">{battle.challenger_name}</div>
                  <div className="text-xs text-white/60">Desafiante</div>
                </div>
                
                <div className="text-white/60 text-xs">
                  VS
                </div>
                
                <div className="text-white text-right">
                  <div className="font-medium text-sm">{battle.challenged_name}</div>
                  <div className="text-xs text-white/60">Desafiado</div>
                </div>
              </div>
              
              {battle.status === 'completed' && (
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-bold ${
                    battle.winner_guild_id === guildId ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {battle.challenger_score} x {battle.challenged_score}
                  </span>
                  
                  {battle.winner_guild_id && (
                    <div className="flex items-center space-x-1">
                      <Trophy size={12} className="text-yellow-400" />
                      <span className="text-yellow-400 text-xs">
                        {battle.winner_guild_id === guildId ? 'Vitória!' : 'Derrota'}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-white/50 mt-2">
                {battle.start_time && `Iniciada: ${formatDate(battle.start_time)}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Desafiar Guilda</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Selecionar Guilda</label>
                <select
                  value={selectedGuild}
                  onChange={(e) => setSelectedGuild(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Escolha uma guilda...</option>
                  {availableGuilds.map(guild => (
                    <option key={guild.id} value={guild.id}>
                      {guild.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Batalha</label>
                <select
                  value={battleType}
                  onChange={(e) => setBattleType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="quiz_rapido">Quiz Rápido (5 min)</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowChallengeModal(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={createChallenge}
                disabled={!selectedGuild}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Enviar Desafio
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildBattles;
