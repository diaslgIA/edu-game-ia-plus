
import React from 'react';
import { Volume2, VolumeX, Music, Settings, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useSound } from '@/contexts/SoundContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const SoundControlPanel: React.FC = () => {
  const { 
    isMuted, 
    volume, 
    isMusicPlaying,
    musicVolume,
    toggleMute, 
    setVolume, 
    toggleMusic,
    setMusicVolume,
    playSound 
  } = useSound();

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVolume(value[0]);
  };

  const testSound = (type: 'success' | 'error' | 'click' | 'notification') => {
    // VERIFICAÇÃO DUPLA: Só testar som se não estiver silenciado
    if (!isMuted) {
      playSound(type);
    } else {
      console.log('Sistema silenciado - teste de som bloqueado');
    }
  };

  const handleToggleMute = () => {
    const wasGroupWoRectiveMuted = isMuted;
    toggleMute();
    
    // Som de feedback apenas quando SAINDO do modo silencioso
    if (wasGroupWoRectiveMuted) {
      // Pequeno delay para garantir que o estado foi atualizado
      setTimeout(() => {
        if (!isMuted) { // Verificar novamente se não está mais silenciado
          playSound('click');
        }
      }, 100);
    }
  };

  const handleToggleMusic = () => {
    // Som de feedback apenas se não estiver silenciado
    if (!isMuted) {
      playSound('click');
    }
    toggleMusic();
  };

  const handleOpenPopover = () => {
    // Som de abertura apenas se não estiver silenciado
    if (!isMuted) {
      playSound('click');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
          onClick={handleOpenPopover}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white/95 backdrop-blur-md border border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Controles de Som</h3>
            <Music className="text-blue-500" size={20} />
          </div>
          
          {/* Alerta de Modo Silencioso */}
          {isMuted && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 font-medium flex items-center">
                <VolumeX size={16} className="mr-2" />
                MODO SILENCIOSO ATIVO
              </p>
              <p className="text-xs text-red-500 mt-1">
                Todos os sons estão desabilitados
              </p>
            </div>
          )}
          
          {/* Controle Principal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Volume Principal</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleMute}
                className={`h-8 w-8 p-0 ${isMuted ? 'bg-red-50 border-red-200' : ''}`}
              >
                {isMuted ? <VolumeX size={16} className="text-red-500" /> : <Volume2 size={16} />}
              </Button>
            </div>
            
            <div className="px-2">
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={1}
                min={0}
                step={0.05}
                disabled={isMuted}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className={isMuted ? 'text-red-500' : ''}>{Math.round(volume * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Controle de Música de Fundo */}
          <div className="space-y-3 border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Música Ambiente</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleMusic}
                className="h-8 w-8 p-0"
                disabled={isMuted}
              >
                {isMusicPlaying && !isMuted ? <Pause size={16} className="text-green-500" /> : <Play size={16} />}
              </Button>
            </div>
            
            <div className="px-2">
              <Slider
                value={[musicVolume]}
                onValueChange={handleMusicVolumeChange}
                max={1}
                min={0}
                step={0.05}
                disabled={isMuted || !isMusicPlaying}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className={isMuted ? 'text-red-500' : ''}>{Math.round(musicVolume * 100)}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Teste de Sons */}
          <div className="space-y-2 border-t pt-3">
            <h4 className="text-sm font-medium text-gray-700">Testar Sons</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => testSound('success')}
                disabled={isMuted}
                className="text-xs"
              >
                🎉 Sucesso
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testSound('error')}
                disabled={isMuted}
                className="text-xs"
              >
                ❌ Erro
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testSound('click')}
                disabled={isMuted}
                className="text-xs"
              >
                👆 Click
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testSound('notification')}
                disabled={isMuted}
                className="text-xs"
              >
                🔔 Notificação
              </Button>
            </div>
            {isMuted && (
              <p className="text-xs text-red-500 text-center mt-2">
                Desative o modo silencioso para testar os sons
              </p>
            )}
          </div>

          {/* Status */}
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <p className="flex items-center justify-between">
              <span>🎵 Música ambiente: Piano Suave</span>
              <span className={`font-medium ${isMuted ? 'text-red-500' : isMusicPlaying ? 'text-green-500' : 'text-gray-500'}`}>
                {isMuted ? 'SILENCIADO' : isMusicPlaying ? 'TOCANDO' : 'PAUSADO'}
              </span>
            </p>
            <p>💡 Sons otimizados para uma experiência agradável!</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SoundControlPanel;
