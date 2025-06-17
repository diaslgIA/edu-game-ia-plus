
import React, { useState } from 'react';
import { Camera, Upload, Heart, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/contexts/SoundContext';

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
  const { playSound } = useSound();

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
          playSound('click');
          
          // Criar URL temporária para preview imediato
          const imageUrl = URL.createObjectURL(file);
          
          // Atualizar estado local imediatamente
          onAvatarChange(imageUrl);
          
          // Salvar no banco de dados
          if (updateProfile) {
            const success = await updateProfile({ profile_picture_url: imageUrl });
            if (success) {
              playSound('success');
              toast({
                title: "Foto atualizada!",
                description: "Sua foto de perfil foi salva com sucesso.",
              });
            } else {
              throw new Error('Falha ao salvar no banco');
            }
          }
          
          if (onPhotoUpload) {
            onPhotoUpload(file);
          }
          
          setShowOptions(false);
        } catch (error) {
          playSound('error');
          console.error('Erro ao processar imagem:', error);
          toast({
            title: "Erro ao salvar foto",
            description: "Não foi possível salvar sua foto. Tente novamente.",
            variant: "destructive"
          });
          // Reverter para avatar anterior em caso de erro
          onAvatarChange('👤');
        }
      } else {
        playSound('error');
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
      playSound('click');
      
      // Atualizar estado local imediatamente
      onAvatarChange(emoji);
      
      // Salvar no banco de dados
      if (updateProfile) {
        const success = await updateProfile({ profile_picture_url: emoji });
        if (success) {
          playSound('success');
          toast({
            title: "Avatar atualizado!",
            description: "Seu avatar foi salvo com sucesso.",
          });
        } else {
          throw new Error('Falha ao salvar no banco');
        }
      }
      
      setShowOptions(false);
    } catch (error) {
      playSound('error');
      console.error('Erro ao salvar avatar:', error);
      toast({
        title: "Erro ao salvar avatar",
        description: "Não foi possível salvar seu avatar. Tente novamente.",
        variant: "destructive"
      });
      // Reverter para avatar anterior em caso de erro
      onAvatarChange('👤');
    }
  };

  const renderCurrentAvatar = () => {
    if (currentAvatar && currentAvatar !== '👤') {
      if (currentAvatar.length <= 4) {
        // É um emoji
        return <span className="text-4xl">{currentAvatar}</span>;
      } else {
        // É uma foto
        return (
          <img 
            src={currentAvatar} 
            alt="Avatar" 
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
            onError={(e) => {
              // Fallback para emoji se a imagem falhar
              console.log('Erro ao carregar imagem, usando fallback');
              onAvatarChange('👤');
            }}
          />
        );
      }
    }
    return <span className="text-4xl">👤</span>;
  };

  return (
    <div className="flex flex-col items-center space-y-2 relative">
      {/* Avatar Atual */}
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
          {renderCurrentAvatar()}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            setShowOptions(!showOptions);
            playSound('click');
          }}
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 p-0 shadow-lg border-2 border-white"
        >
          <Palette size={12} />
        </Button>
      </div>

      {/* Opções de Avatar */}
      {showOptions && (
        <div className="absolute z-50 top-24 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-gray-600 max-w-xs w-full max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Personalizar Avatar</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowOptions(false);
                playSound('click');
              }}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              ✕
            </Button>
          </div>
          
          {/* Upload de Foto */}
          <div className="mb-4">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 text-center hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg">
                <Upload size={16} className="mx-auto mb-1" />
                <span className="text-xs font-medium">Carregar Foto</span>
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
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ou escolha um avatar:
            </h4>
            <div className="grid grid-cols-6 gap-1 max-h-40 overflow-y-auto">
              {emojiAvatars.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors border ${
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
