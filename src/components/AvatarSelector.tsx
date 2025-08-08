
import React, { useState } from 'react';
import { Camera, Upload, Heart, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSound } from '@/contexts/SoundContext';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

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
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const { playSound } = useSound();
  const { uploadAvatar, uploading } = useAvatarUpload();

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
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      playSound('error');
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive"
      });
      return;
    }

    try {
      playSound('click');

      // Pré-visualização imediata
      const previewUrl = URL.createObjectURL(file);
      onAvatarChange(previewUrl);

      // Se o usuário não estiver autenticado (ex.: cadastro), apenas mantém o preview
      if (!user?.id) {
        console.log('[AvatarSelector] No user session. Showing preview only.');
        if (onPhotoUpload) {
          onPhotoUpload(file);
        }
        setShowOptions(false);
        toast({
          title: "Pré-visualização aplicada",
          description: "Finalize o login para salvar sua foto de perfil.",
        });
        return;
      }

      // Upload para o Storage e salvar URL pública no perfil
      const { publicUrl } = await uploadAvatar(user.id, file);
      console.log('[AvatarSelector] Avatar uploaded. Public URL:', publicUrl);

      // Atualiza o avatar exibido para a URL pública
      onAvatarChange(publicUrl);

      if (updateProfile) {
        await updateProfile({ profile_picture_url: publicUrl });
      }

      // Callback opcional (se necessário em outros fluxos)
      if (onPhotoUpload) {
        onPhotoUpload(file);
      }

      setShowOptions(false);
      playSound('success');
      toast({
        title: "Foto atualizada!",
        description: "Sua foto de perfil foi salva com sucesso.",
      });
    } catch (error) {
      playSound('error');
      console.error('Erro ao processar imagem:', error);
      toast({
        title: "Erro ao salvar foto",
        description: "Não foi possível processar sua foto.",
        variant: "destructive"
      });
    }
  };

  const handleEmojiSelect = async (emoji: string) => {
    try {
      playSound('click');
      onAvatarChange(emoji);
      
      // Salvar no perfil se updateProfile existir
      if (updateProfile) {
        await updateProfile({ profile_picture_url: emoji });
      }
      
      setShowOptions(false);
      playSound('success');
      toast({
        title: "Avatar atualizado!",
        description: "Seu avatar foi salvo com sucesso.",
      });
    } catch (error) {
      playSound('error');
      console.error('Erro ao salvar avatar:', error);
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
          disabled={uploading}
        >
          <Palette size={12} />
        </Button>
      </div>

      {/* Opções de Avatar */}
      {showOptions && (
        <div className="absolute z-50 top-24 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-gray-600 max-w-xs w-full max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              {uploading ? 'Enviando...' : 'Personalizar Avatar'}
            </h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowOptions(false);
                playSound('click');
              }}
              className="text-gray-500 hover:text-gray-700 p-1"
              disabled={uploading}
            >
              ✕
            </Button>
          </div>
          
          {/* Upload de Foto */}
          <div className="mb-4">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 text-center hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg">
                <Upload size={16} className="mx-auto mb-1" />
                <span className="text-xs font-medium">{uploading ? 'Enviando...' : 'Carregar Foto'}</span>
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
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
                  disabled={uploading}
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
