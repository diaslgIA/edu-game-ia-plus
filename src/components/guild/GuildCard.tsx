
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Crown } from 'lucide-react';

interface Guild {
  id: string;
  name: string;
  description: string;
  member_count: number;
  max_members: number;
  owner_id: string;
  created_at: string;
  is_public: boolean;
}

interface GuildCardProps {
  guild: Guild;
  showRole?: boolean;
  onClick?: () => void;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, showRole = false, onClick }) => {
  return (
    <Card 
      className={`transition-all hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{guild.name}</h3>
          {showRole && (
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Crown size={16} />
              <span>Líder</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {guild.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-500">
            <Users size={16} />
            <span>{guild.member_count}/{guild.max_members}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {guild.is_public ? (
              <span className="text-green-600 text-xs">Pública</span>
            ) : (
              <div className="flex items-center space-x-1 text-orange-600">
                <Shield size={12} />
                <span className="text-xs">Privada</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuildCard;
