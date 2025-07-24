
import React from 'react';
import { Check } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onAvatarSelect: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onAvatarSelect }) => {
  const avatars = [
    '/lovable-uploads/08babff9-54df-4763-8eb1-122f7d168e73.png',
    '/lovable-uploads/16c5ab46-fefb-4500-b014-61ad1a76ecdb.png',
    '/lovable-uploads/200f2456-0066-4697-99f3-2260b38b409a.png',
    '/lovable-uploads/21637d78-a84d-46c7-9307-1bd4869cd140.png',
    '/lovable-uploads/22e933d7-f88f-48ef-8b09-db0f38f02d37.png',
    '/lovable-uploads/7cf9ca74-de32-4ea9-8e98-263028a031a9.png',
    '/lovable-uploads/aa8608bd-977f-4477-bc38-567090ca4dd5.png',
    '/lovable-uploads/b7a051d0-0ee4-4b95-9f61-a7004c276894.png',
    '/lovable-uploads/c08c2f04-2e89-4f04-86bc-004882ea1414.png',
    '/lovable-uploads/eb2d2834-cfb2-4f35-8087-c5e578814082.png'
  ];

  return (
    <div className="grid grid-cols-5 gap-2 mt-3">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={`relative w-12 h-12 rounded-full border-2 cursor-pointer transition-all ${
            selectedAvatar === avatar
              ? 'border-purple-400 scale-110'
              : 'border-white/30 hover:border-white/60'
          }`}
          onClick={() => onAvatarSelect(avatar)}
        >
          <img
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className="w-full h-full rounded-full object-cover"
          />
          {selectedAvatar === avatar && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvatarSelector;
