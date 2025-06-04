
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import AvatarSelector from '@/components/AvatarSelector';
import SettingsModal from '@/components/SettingsModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User, Trophy, Target, BookOpen, Star, Settings, Edit3, Save, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { language, setLanguage, languages, t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [favoriteLanguages, setFavoriteLanguages] = useState(['pt', 'en']);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    school_year: profile?.school_year || '',
    profile_picture_url: profile?.profile_picture_url || '👤'
  });

  const stats = [
    { icon: Trophy, label: t('points') || 'Pontos', value: profile?.points || 0, color: 'text-yellow-500' },
    { icon: Target, label: t('level') || 'Nível', value: profile?.level || 1, color: 'text-blue-500' },
    { icon: BookOpen, label: 'Estudos', value: '12 dias', color: 'text-green-500' },
    { icon: Star, label: 'Conquistas', value: '8', color: 'text-purple-500' },
  ];

  const achievements = [
    { id: 1, name: 'Primeiro Quiz', description: 'Complete seu primeiro quiz', icon: '🎯', unlocked: true },
    { id: 2, name: 'Estudante Dedicado', description: 'Estude 5 dias seguidos', icon: '📚', unlocked: true },
    { id: 3, name: 'Matemático', description: 'Complete 10 quizzes de matemática', icon: '🧮', unlocked: true },
    { id: 4, name: 'Escritor', description: 'Complete 10 quizzes de português', icon: '✍️', unlocked: false },
    { id: 5, name: 'Cientista', description: 'Complete 10 quizzes de ciências', icon: '🔬', unlocked: false },
    { id: 6, name: 'Historiador', description: 'Complete 10 quizzes de história', icon: '🏛️', unlocked: false },
    { id: 7, name: 'Perfeccionista', description: 'Acerte 100% em um quiz', icon: '💯', unlocked: true },
    { id: 8, name: 'Maratonista', description: 'Estude por 2 horas seguidas', icon: '🏃', unlocked: true },
  ];

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  const handleAvatarChange = (avatar: string) => {
    setFormData({ ...formData, profile_picture_url: avatar });
  };

  const handlePhotoUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, profile_picture_url: imageUrl });
    
    // Salvar automaticamente
    try {
      await updateProfile({ ...formData, profile_picture_url: imageUrl });
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
  };

  const toggleFavoriteLanguage = (langCode: string) => {
    const newFavorites = favoriteLanguages.includes(langCode)
      ? favoriteLanguages.filter(l => l !== langCode)
      : [...favoriteLanguages, langCode];
    setFavoriteLanguages(newFavorites);
  };

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any);
    toast({
      title: "Idioma alterado!",
      description: `Idioma alterado para ${languages.find(l => l.code === langCode)?.name}`,
    });
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-b-3xl flex-shrink-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-base font-semibold flex items-center space-x-2">
              <User size={18} />
              <span>{t('profile') || 'Perfil'}</span>
            </h1>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSettings(true)}
                className="text-white p-2"
              >
                <Settings size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="text-white p-2"
              >
                {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-4 space-y-4">
            {/* Profile Info */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="text-center mb-6">
                <AvatarSelector
                  currentAvatar={formData.profile_picture_url}
                  onAvatarChange={handleAvatarChange}
                  onPhotoUpload={handlePhotoUpload}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name" className="text-white text-sm font-medium">Nome Completo</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 disabled:opacity-60"
                  />
                </div>

                <div>
                  <Label htmlFor="school_year" className="text-white text-sm font-medium">Ano Escolar</Label>
                  <Input
                    id="school_year"
                    value={formData.school_year}
                    onChange={(e) => setFormData({...formData, school_year: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 disabled:opacity-60"
                  />
                </div>

                <div>
                  <Label className="text-white text-sm font-medium">Email</Label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 disabled:opacity-60"
                  />
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <stat.icon className={`${stat.color} w-6 h-6`} />
                    <div>
                      <p className="text-xs opacity-80">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Achievements */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <h3 className="text-white font-semibold mb-4 text-base">🏆 Conquistas</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{achievement.name}</h4>
                      <p className="text-xs opacity-80">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-yellow-400">
                        <Trophy size={18} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Languages */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <h3 className="text-white font-semibold mb-4 text-base">🌍 Idiomas</h3>
              
              {/* Current Language */}
              <div className="mb-4 p-3 bg-white/20 rounded-lg">
                <h4 className="text-white text-sm font-medium mb-2">Idioma Atual:</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
                  <span className="text-white font-medium">{languages.find(l => l.code === language)?.name}</span>
                </div>
              </div>

              {/* Available Languages */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <h4 className="text-white text-sm font-medium mb-2">Todos os Idiomas:</h4>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center justify-between p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <div 
                      className="flex items-center space-x-2 cursor-pointer flex-1"
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-white text-sm">{lang.name}</span>
                      {language === lang.code && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Atual</span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavoriteLanguage(lang.code)}
                      className={`p-1 ${favoriteLanguages.includes(lang.code) ? 'text-red-400' : 'text-gray-400'}`}
                    >
                      <Heart size={14} fill={favoriteLanguages.includes(lang.code) ? 'currentColor' : 'none'} />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </MobileContainer>
  );
};

export default Profile;
