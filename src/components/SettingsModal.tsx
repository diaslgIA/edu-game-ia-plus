
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
  const { language, setLanguage, languages, t } = useLanguage();
  const { isMuted, volume, toggleMute, setVolume } = useSound();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-300 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold dark:text-white">{t('settings_title')}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="dark:text-white">
            <X size={20} />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center dark:text-white">
              {theme === 'dark' ? <Moon className="mr-2" size={18} /> : <Sun className="mr-2" size={18} />}
              {t('theme')}
            </h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <div>
                <span className="text-sm font-medium dark:text-gray-300">{t('dark_mode')}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? t('enabled') : t('disabled')}
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
              {t('language')}
            </h4>
            <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
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
              {t('sound')}
            </h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <div>
                <span className="text-sm font-medium dark:text-gray-300">{t('silent_mode')}</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isMuted ? t('enabled') : t('disabled')}
                </p>
              </div>
              <Switch checked={isMuted} onCheckedChange={toggleMute} />
            </div>
            {!isMuted && (
              <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                <span className="text-sm dark:text-gray-300">{t('volume', { value: Math.round(volume * 100) })}</span>
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
            <h4 className="font-semibold dark:text-white">{t('app_settings')}</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('notifications')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('notifications_desc')}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('auto_backup')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('auto_backup_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-3">
            <h4 className="font-semibold dark:text-white">{t('privacy')}</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('data_usage')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('data_usage_desc')}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('public_profile')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('public_profile_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="space-y-3">
            <h4 className="font-semibold dark:text-white">{t('help_support')}</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('help_center')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('help_center_desc')}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('contact')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('contact_desc')}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium dark:text-white">{t('report_problem')}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('report_problem_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
        >
          {t('save_settings')}
        </Button>
      </div>
    </div>
  );
};

export default SettingsModal;
