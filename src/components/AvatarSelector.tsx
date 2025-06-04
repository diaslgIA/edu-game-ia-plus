
import React, { useState } from 'react';
import { Camera, Upload, Heart, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AvatarSelectorProps {
  currentAvatar: string;
  onAvatarChange: (avatar: string) => void;
  onPhotoUpload?: (file: File) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  currentAvatar,
  onAvatarChange,
  onPhotoUpload
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { updateProfile } = useAuth();
  const { toast } = useToast();

  // Avatares emoji com melhor qualidade e variedade
  const emojiAvatars = [
    '👨‍🎓', '👩‍🎓', '🧑‍💼', '👨‍💼', '👩‍💼', '🧑‍🔬',
    '👨‍🔬', '👩‍🔬', '🧑‍🏫', '👨‍🏫', '👩‍🏫', '🧑‍💻',
    '👨‍💻', '👩‍💻', '🧑‍🎨', '👨‍🎨', '👩‍🎨', '🧑‍⚕️',
    '👨‍⚕️', '👩‍⚕️', '🧑‍🚀', '👨‍🚀', '👩‍🚀', '🧑‍🎤',
    '👨‍🎤', '👩‍🎤', '🤓', '😎', '🤔', '😊',
    '😁', '🙂', '😇', '🤗', '🤠', '🥳'
  ];

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        try {
          // Criar URL temporária para preview
          const imageUrl = URL.createObjectURL(file);
          onAvatarChange(imageUrl);
          
          // Salvar no perfil imediatamente
          await updateProfile({ profile_picture_url: imageUrl });
          
          if (onPhotoUpload) {
            onPhotoUpload(file);
          }
          
          setShowOptions(false);
          toast({
            title: "Foto atualizada!",
            description: "Sua foto de perfil foi salva com sucesso.",
          });
        } catch (error) {
          toast({
            title: "Erro ao salvar foto",
            description: "Não foi possível salvar sua foto.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione apenas arquivos de imagem.",
          variant: "destructive"
        });
      }
    }
  };

  const handleEmojiSelect = async (emoji: string) => {
    try {
      onAvatarChange(emoji);
      await updateProfile({ profile_picture_url: emoji });
      setShowOptions(false);
      toast({
        title: "Avatar atualizado!",
        description: "Seu avatar foi salvo com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar avatar",
        description: "Não foi possível salvar seu avatar.",
        variant: "destructive"
      });
    }
  };

  const renderCurrentAvatar = () => {
    if (currentAvatar && currentAvatar !== '👤') {
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
            onError={(e) => {
              // Fallback para emoji se a imagem falhar
              e.currentTarget.style.display = 'none';
            }}
          />
        );
      }
    }
    return <span className="text-6xl">👤</span>;
  };

  return (
    <div className="flex flex-col items-center space-y-4 relative">
      {/* Avatar Atual */}
      <div className="relative">
        <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
          {renderCurrentAvatar()}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setShowOptions(!showOptions)}
          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 p-0 shadow-lg border-2 border-white"
        >
          <Palette size={16} />
        </Button>
      </div>

      {/* Opções de Avatar */}
      {showOptions && (
        <div className="absolute z-50 top-32 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-600 max-w-sm w-full max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Personalize seu Avatar</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowOptions(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          
          {/* Upload de Foto */}
          <div className="mb-6">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 text-center hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg">
                <Upload size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Carregar Sua Foto</span>
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
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Ou escolha um avatar:
            </h4>
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto">
              {emojiAvatars.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors border-2 ${
                    currentAvatar === emoji 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarSelector;
