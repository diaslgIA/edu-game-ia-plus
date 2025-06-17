
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ size = 'md', className = '' }) => {
  const { profile } = useAuth();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };
  
  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const renderAvatar = () => {
    const avatarUrl = profile?.profile_picture_url;
    
    if (avatarUrl && avatarUrl !== '👤') {
      if (avatarUrl.length <= 4) {
        // É um emoji
        return <span className={textSizes[size]}>{avatarUrl}</span>;
      } else {
        // É uma foto
        return (
          <img 
            src={avatarUrl} 
            alt="Avatar do usuário" 
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-lg`}
            onError={(e) => {
              // Fallback para emoji se a imagem falhar
              console.log('Erro ao carregar imagem do avatar');
            }}
          />
        );
      }
    }
    
    // Avatar padrão
    return <span className={textSizes[size]}>👤</span>;
  };

  return (
    <div className={`${sizeClasses[size]} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 ${className}`}>
      {renderAvatar()}
    </div>
  );
};

export default UserAvatar;
