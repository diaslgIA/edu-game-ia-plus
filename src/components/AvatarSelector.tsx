
import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AvatarSelectorProps {
  currentAvatar: string;
  onAvatarChange: (avatar: string) => void;
  onPhotoUpload: (file: File) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  currentAvatar,
  onAvatarChange,
  onPhotoUpload
}) => {
  const [showOptions, setShowOptions] = useState(false);

  // Avatares emoji com melhor qualidade e variedade
  const emojiAvatars = [
    '👨‍🎓', '👩‍🎓', '🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍🔬',
    '👨‍🔬', '👩‍🔬', '🧑‍🏫', '👨‍🏫', '👩‍🏫', '🧑‍💻',
    '👨‍💻', '👩‍💻', '🧑‍🎨', '👨‍🎨', '👩‍🎨', '🧑‍⚕️',
    '👨‍⚕️', '👩‍⚕️', '🧑‍🚀', '👨‍🚀', '👩‍🚀', '🧑‍🎤',
    '👨‍🎤', '👩‍🎤', '🤓', '😎', '🤔', '😊',
    '😁', '🙂', '😇', '🤗', '🤠', '🥳'
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar se é uma imagem
      if (file.type.startsWith('image/')) {
        onPhotoUpload(file);
        setShowOptions(false);
      } else {
        alert('Por favor, selecione apenas arquivos de imagem.');
      }
    }
  };

  const renderCurrentAvatar = () => {
    if (currentAvatar) {
      if (currentAvatar.length <= 4) {
        // É um emoji
        return <span className="text-6xl">{currentAvatar}</span>;
      } else {
        // É uma foto
        return (
          <img 
            src={currentAvatar} 
            alt="Avatar" 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
        );
      }
    }
    return <span className="text-6xl">👤</span>;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Atual */}
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          {renderCurrentAvatar()}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowOptions(!showOptions)}
          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 p-0 shadow-lg"
        >
          <Camera size={14} />
        </Button>
      </div>

      {/* Opções de Avatar */}
      {showOptions && (
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-200 max-w-sm w-full">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">Escolha seu Avatar</h3>
          
          {/* Upload de Foto */}
          <div className="mb-4">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-3 text-center hover:from-blue-600 hover:to-purple-700 transition-colors">
                <Upload size={20} className="mx-auto mb-1" />
                <span className="text-sm font-medium">Carregar Foto</span>
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Avatares Emoji */}
          <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
            {emojiAvatars.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onAvatarChange(emoji);
                  setShowOptions(false);
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl hover:bg-blue-100 transition-colors border-2 ${
                  currentAvatar === emoji 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowOptions(false)}
            className="w-full mt-4 text-gray-600 border-gray-300"
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
