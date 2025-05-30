
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, User } from 'lucide-react';

interface AvatarSelectorProps {
  currentAvatar?: string;
  onAvatarChange: (avatar: string) => void;
  onPhotoUpload: (file: File) => void;
}

const avatarOptions = [
  '👤', '👨‍🎓', '👩‍🎓', '🧑‍💻', '👨‍💻', '👩‍💻', 
  '🧑‍🔬', '👨‍🔬', '👩‍🔬', '🧑‍🏫', '👨‍🏫', '👩‍🏫',
  '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🥷', '👑',
  '🐶', '🐱', '🐻', '🦊', '🐼', '🐨',
  '🌟', '⚡', '🔥', '💎', '🏆', '🎯'
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  currentAvatar, 
  onAvatarChange, 
  onPhotoUpload 
}) => {
  const [selectedTab, setSelectedTab] = useState<'avatar' | 'photo'>('avatar');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button
          variant={selectedTab === 'avatar' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('avatar')}
          className="flex-1"
        >
          <User className="mr-2" size={16} />
          Avatar
        </Button>
        <Button
          variant={selectedTab === 'photo' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('photo')}
          className="flex-1"
        >
          <Camera className="mr-2" size={16} />
          Foto
        </Button>
      </div>

      {selectedTab === 'avatar' && (
        <div className="grid grid-cols-6 gap-3">
          {avatarOptions.map((avatar, index) => (
            <button
              key={index}
              onClick={() => onAvatarChange(avatar)}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl transition-all ${
                currentAvatar === avatar
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400'
              }`}
            >
              {avatar}
            </button>
          ))}
        </div>
      )}

      {selectedTab === 'photo' && (
        <div className="text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload">
            <Button asChild className="cursor-pointer">
              <div>
                <Camera className="mr-2" size={16} />
                Escolher Foto
              </div>
            </Button>
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Escolha uma foto do seu dispositivo
          </p>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
