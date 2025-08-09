
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { createTimeoutController } from '@/utils/withTimeout';

interface MemberXP {
  user_id: string;
  xp_points: number;
  level: number;
  badges: string[];
  full_name: string;
  position: number;
}

interface GuildMemberXPProps {
  guildId: string;
}

const GuildMemberXP: React.FC<GuildMemberXPProps> = ({ guildId }) => {
  const { user } = useAuth();
  const [memberXP, setMemberXP] = useState<MemberXP[]>([]);
  const [loading, setLoading] = useState(true);
  const [userXP, setUserXP] = useState<MemberXP | null>(null);

  const fetchMemberXP = async () => {
    const { controller, cancel } = createTimeoutController(10000);
    try {
      // Evitar join com profiles por conta de RLS; buscar só XP
      const { data, error } = await supabase
        .from('guild_member_xp')
        .select('*')
        .eq('guild_id', guildId)
        .order('xp_points', { ascending: false })
        .abortSignal(controller.signal);

      cancel();

      if (error) throw error;

      const processedData = (data || []).map((item: any, index: number) => ({
        user_id: item.user_id,
        xp_points: item.xp_points,
        level: item.level,
        badges: Array.isArray(item.badges) ? item.badges.filter((badge): badge is string => typeof badge === 'string') : [],
        // Nome seguro (RLS pode impedir leitura de perfis de outros usuários)
        full_name: item.user_id === user?.id ? 'Você' : 'Membro',
        position: index + 1
      }));

      setMemberXP(processedData);
      
      // Encontrar XP do usuário atual
      const currentUserXP = processedData.find(item => item.user_id === user?.id) || null;
      setUserXP(currentUserXP);
    } catch (error) {
      cancel();
      console.error('Erro ao buscar XP dos membros:', error);
      setMemberXP([]);
      setUserXP(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberXP();
    
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchMemberXP, 30000);
    return () => clearInterval(interval);
  }, [guildId]);

  const getXPForNextLevel = (level: number) => {
    return level * 100;
  };

  const getXPProgress = (xp: number, level: number) => {
    const currentLevelXP = (level - 1) * 100;
    const nextLevelXP = level * 100;
    return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="text-yellow-400" size={16} />;
      case 2:
        return <Award className="text-gray-400" size={16} />;
      case 3:
        return <Star className="text-orange-400" size={16} />;
      default:
        return <TrendingUp className="text-blue-400" size={16} />;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-orange-400';
      default:
        return 'text-white';
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white/80 py-4">
        Carregando ranking de XP...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* User's XP Card */}
      {userXP && (
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getRankIcon(userXP.position)}
              <span className="text-white font-semibold">Seu XP</span>
            </div>
            <span className={`text-sm font-bold ${getRankColor(userXP.position)}`}>
              #{userXP.position}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-white/80 mb-2">
            <span>Nível {userXP.level}</span>
            <span>{userXP.xp_points} XP</span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getXPProgress(userXP.xp_points, userXP.level)}%` }}
            />
          </div>
          
          <div className="text-xs text-white/60 mt-1">
            {getXPForNextLevel(userXP.level + 1) - userXP.xp_points} XP para o próximo nível
          </div>
        </div>
      )}

      {/* Top Members */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Trophy size={16} className="mr-2 text-yellow-400" />
          Ranking de XP
        </h3>
        
        {memberXP.length === 0 ? (
          <div className="text-center text-white/60 py-4">
            Nenhum membro com XP ainda
          </div>
        ) : (
          <div className="space-y-2">
            {memberXP.slice(0, 10).map((member) => (
              <div
                key={member.user_id}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  member.user_id === user?.id ? 'bg-white/10' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {getRankIcon(member.position)}
                    <span className={`text-sm font-bold ${getRankColor(member.position)}`}>
                      #{member.position}
                    </span>
                  </div>
                  
                  <div>
                    <div className="text-white font-medium text-sm">
                      {member.full_name}
                      {member.user_id === user?.id && (
                        <span className="text-green-400 ml-1">(Você)</span>
                      )}
                    </div>
                    <div className="text-white/60 text-xs">
                      Nível {member.level}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">
                    {member.xp_points} XP
                  </div>
                  <div className="text-white/60 text-xs">
                    {member.badges.length > 0 && `${member.badges.length} badges`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuildMemberXP;
