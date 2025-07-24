
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';
import AvatarSelector from '@/components/AvatarSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Globe, Upload, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { uploadImage, uploading } = useImageUpload();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    school_year: profile?.school_year || '',
    phone_number: profile?.phone_number || '',
    profile_picture_url: profile?.profile_picture_url || ''
  });

  const [selectedAvatar, setSelectedAvatar] = useState(profile?.profile_picture_url || '');

  const handleAvatarSelect = (avatar: string) => {
    console.log('Avatar selected:', avatar);
    setSelectedAvatar(avatar);
    setFormData(prev => ({ ...prev, profile_picture_url: avatar }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file, 'profile-pictures');
      if (imageUrl) {
        setSelectedAvatar(imageUrl);
        setFormData(prev => ({ ...prev, profile_picture_url: imageUrl }));
        toast({
          title: t('general.success'),
          description: "Foto de perfil carregada com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: t('general.error'),
        description: "Erro ao carregar a foto de perfil",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await updateProfile({
      ...formData,
      profile_picture_url: selectedAvatar
    });

    if (success) {
      toast({
        title: t('general.success'),
        description: t('profile.updated'),
      });
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'pt' | 'en' | 'es');
    toast({
      title: t('general.success'),
      description: `Idioma alterado para ${newLanguage === 'pt' ? 'Português' : newLanguage === 'en' ? 'English' : 'Español'}`,
    });
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-b-3xl flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <Logo size="md" showText={false} />
            <div className="w-10" />
          </div>
          <h1 className="text-lg font-bold">{t('profile.title')}</h1>
          <p className="text-white/80 text-xs">Gerencie suas informações pessoais</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 py-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Avatar Section */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <User size={16} />
                  <h2 className="text-sm font-semibold">{t('profile.avatar')}</h2>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-white/30 overflow-hidden">
                    <img
                      src={selectedAvatar || '/placeholder.svg'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xs mb-3"
                  >
                    {uploading ? (
                      <>
                        <Upload size={12} className="mr-1 animate-spin" />
                        {t('general.loading')}
                      </>
                    ) : (
                      <>
                        <Camera size={12} className="mr-1" />
                        {t('profile.upload_photo')}
                      </>
                    )}
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <AvatarSelector
                  selectedAvatar={selectedAvatar}
                  onAvatarSelect={handleAvatarSelect}
                />
              </div>

              {/* Personal Information */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                <h2 className="text-sm font-semibold mb-3">Informações Pessoais</h2>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="full_name" className="text-white text-xs">Nome Completo</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white text-xs">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="school_year" className="text-white text-xs">Série Escolar</Label>
                    <Select value={formData.school_year} onValueChange={(value) => setFormData(prev => ({ ...prev, school_year: value }))}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white text-xs">
                        <SelectValue placeholder="Selecione sua série" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1º ano">1º ano</SelectItem>
                        <SelectItem value="2º ano">2º ano</SelectItem>
                        <SelectItem value="3º ano">3º ano</SelectItem>
                        <SelectItem value="Pré-vestibular">Pré-vestibular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="phone_number" className="text-white text-xs">Telefone</Label>
                    <Input
                      id="phone_number"
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Language Settings */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={16} />
                  <h2 className="text-sm font-semibold">{t('profile.language')}</h2>
                </div>
                
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Save Button */}
              <Button 
                type="submit"
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold text-sm"
              >
                {t('profile.save')}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Profile;
