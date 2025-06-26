
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Crown, Lock, Unlock } from 'lucide-react';

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

interface GuildCardProps {
  guild: Guild;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/guilda/${guild.id}`);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow bg-white/10 backdrop-blur-md border-white/20 text-white"
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">{guild.name}</CardTitle>
          <div className="flex items-center gap-1">
            {guild.is_public ? (
              <Unlock size={16} className="text-green-400" />
            ) : (
              <Lock size={16} className="text-orange-400" />
            )}
          </div>
        </div>
        <CardDescription className="text-white/70 line-clamp-2">
          {guild.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-white/60" />
            <span className="text-sm text-white/80">
              {guild.member_count || 0} membros
            </span>
          </div>
          <Badge variant="outline" className="text-white border-white/30">
            {guild.total_points} pts
          </Badge>
        </div>
        <div className="mt-2 text-xs text-white/60">
          Código: {guild.guild_code}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuildCard;
