
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { X, Sun, Moon, Globe, Volume2, VolumeX } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();
  const { isMuted, volume, toggleMute, setVolume } = useSound();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-300 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold dark:text-white">Configurações</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="dark:text-white">
            <X size={20} />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center dark:text-white">
              {theme === 'dark' ? <Moon className="mr-2" size={18} /> : <Sun className="mr-2" size={18} />}
              Tema
            </h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <div>
                <span className="text-sm font-medium dark:text-gray-300">Modo escuro</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? 'Ativado' : 'Desativado'}
                </p>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme}
              />
            </div>
          </div>

          {/* Language Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center dark:text-white">
              <Globe className="mr-2" size={18} />
              Idioma
            </h4>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="dark:bg-gray-700 dark:text-white transition-colors duration-300 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg max-h-60 overflow-y-auto z-[60]">
                {languages.map((lang) => (
                  <SelectItem 
                    key={lang.code} 
                    value={lang.code}
                    className="dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sound Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center dark:text-white">
              {isMuted ? <VolumeX className="mr-2" size={18} /> : <Volume2 className="mr-2" size={18} />}
              Som
            </h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <div>
                <span className="text-sm font-medium dark:text-gray-300">Modo silencioso</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isMuted ? 'Ativado' : 'Desativado'}
                </p>
              </div>
              <Switch checked={isMuted} onCheckedChange={toggleMute} />
            </div>
            {!isMuted && (
              <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <span className="text-sm dark:text-gray-300">Volume: {Math.round(volume * 100)}%</span>
                <Slider
                  value={[volume]}
                  onValueChange={([value]) => setVolume(value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* App Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold dark:text-white">Configurações do App</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Notificações</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receba lembretes para estudar diariamente
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Backup Automático</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Seus dados são salvos automaticamente na nuvem
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold dark:text-white">Privacidade</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Dados de Uso</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Coletamos dados para melhorar sua experiência de aprendizado
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Perfil Público</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Controle quais informações são visíveis para outros usuários
                </p>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <h4 className="font-semibold dark:text-white">Ajuda e Suporte</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Central de Ajuda</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Acesse tutoriais e guias de uso do aplicativo
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Contato</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Entre em contato conosco via email: suporte@edugameia.com
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">Reportar Problema</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Relate bugs ou problemas técnicos
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default SettingsModal;
