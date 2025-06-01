
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

  const handleThemeToggle = (checked: boolean) => {
    toggleTheme();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto transition-colors duration-300">
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
                onCheckedChange={handleThemeToggle}
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
              <SelectTrigger className="dark:bg-gray-700 dark:text-white transition-colors duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
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
