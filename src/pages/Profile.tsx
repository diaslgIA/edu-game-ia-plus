
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import AvatarSelector from '@/components/AvatarSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, User, Trophy, Target, BookOpen, Star, Settings, Edit3, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    school_year: profile?.school_year || '',
    profile_picture_url: profile?.profile_picture_url || '👤'
  });

  const stats = [
    { icon: Trophy, label: 'Pontos', value: profile?.points || 0, color: 'text-yellow-500' },
    { icon: Target, label: 'Nível', value: profile?.level || 1, color: 'text-blue-500' },
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

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
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
    // Aqui você implementaria o upload da foto para o Supabase Storage
    // Por agora, vamos usar um placeholder
    const imageUrl = URL.createObjectURL(file);
    setFormData({ ...formData, profile_picture_url: imageUrl });
    
    toast({
      title: "Foto carregada!",
      description: "Sua foto de perfil foi atualizada.",
    });
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header - Fixed */}
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
              <span>Perfil</span>
            </h1>
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

        {/* Content - Scrollable with proper padding */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="p-4 space-y-4">
            {/* Profile Info */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <div className="text-center mb-4">
                <AvatarSelector
                  currentAvatar={formData.profile_picture_url}
                  onAvatarChange={handleAvatarChange}
                  onPhotoUpload={handlePhotoUpload}
                />
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="full_name" className="text-white text-sm">Nome Completo</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 disabled:opacity-60"
                  />
                </div>

                <div>
                  <Label htmlFor="school_year" className="text-white text-sm">Ano Escolar</Label>
                  <Input
                    id="school_year"
                    value={formData.school_year}
                    onChange={(e) => setFormData({...formData, school_year: e.target.value})}
                    disabled={!isEditing}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 disabled:opacity-60"
                  />
                </div>

                <div>
                  <Label className="text-white text-sm">Email</Label>
                  <Input
                    value={user?.email || ''}
                    disabled
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 disabled:opacity-60"
                  />
                </div>
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 p-3 text-white">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`${stat.color} w-5 h-5`} />
                    <div>
                      <p className="text-xs opacity-80">{stat.label}</p>
                      <p className="text-sm font-bold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Achievements - Now properly scrollable */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <h3 className="text-white font-semibold mb-3 text-sm">Conquistas</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    <div className="text-xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-xs">{achievement.name}</h4>
                      <p className="text-[10px] opacity-80">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-yellow-400">
                        <Trophy size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Languages - Now properly visible */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <h3 className="text-white font-semibold mb-3 text-sm">Idiomas</h3>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <div
                    key={language.code}
                    className="flex items-center space-x-2 p-2 bg-white/20 rounded-lg text-white cursor-pointer hover:bg-white/30 transition-colors"
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="text-xs font-medium">{language.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Settings */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4">
              <h3 className="text-white font-semibold mb-3 text-sm flex items-center space-x-2">
                <Settings size={16} />
                <span>Configurações</span>
              </h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/20 text-sm"
                  onClick={() => navigate('/settings')}
                >
                  Configurações do App
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/20 text-sm"
                  onClick={() => navigate('/privacy')}
                >
                  Privacidade
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/20 text-sm"
                  onClick={() => navigate('/help')}
                >
                  Ajuda e Suporte
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Profile;
