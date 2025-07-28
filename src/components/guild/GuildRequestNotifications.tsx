
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GuildRequestNotificationsProps {
  userId: string;
}

const GuildRequestNotifications: React.FC<GuildRequestNotificationsProps> = ({ userId }) => {
  const [pendingRequests, setPendingRequests] = useState(0);

  const fetchPendingRequests = async () => {
    try {
      // Buscar solicitações pendentes para guildas onde o usuário é dono ou líder
      const { data: ownedGuilds } = await supabase
        .from('guilds')
        .select('id')
        .eq('owner_id', userId);

      const { data: ledGuilds } = await supabase
        .from('guild_members')
        .select('guild_id')
        .eq('profile_id', userId)
        .eq('role', 'líder');

      const guildIds = [
        ...(ownedGuilds || []).map(g => g.id),
        ...(ledGuilds || []).map(g => g.guild_id)
      ];

      if (guildIds.length === 0) {
        setPendingRequests(0);
        return;
      }

      const { count } = await supabase
        .from('guild_join_requests')
        .select('*', { count: 'exact', head: true })
        .in('guild_id', guildIds)
        .eq('status', 'pending');

      setPendingRequests(count || 0);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();

    // Configurar escuta em tempo real
    const channel = supabase
      .channel('guild_requests_notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guild_join_requests'
        },
        () => {
          fetchPendingRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (pendingRequests === 0) return null;

  return (
    <div className="relative">
      <Bell size={16} className="text-white" />
      <Badge 
        variant="destructive" 
        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
      >
        {pendingRequests}
      </Badge>
    </div>
  );
};

export default GuildRequestNotifications;
