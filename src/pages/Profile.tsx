
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Trophy, Star, Target, BookOpen } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    school_year: profile?.school_year || '',
    phone_number: profile?.phone_number || ''
  });

  const schoolYearOptions = [
    { value: '1º Ano Ensino Médio', label: '1º Ano do Ensino Médio' },
    { value: '2º Ano Ensino Médio', label: '2º Ano do Ensino Médio' },
    { value: '3º Ano Ensino Médio', label: '3º Ano do Ensino Médio' },
    { value: 'Ensino Médio Concluído', label: 'Ensino Médio Concluído' },
    { value: 'Cursinho Pré-Vestibular', label: 'Cursinho Pré-Vestibular' }
  ];

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const achievements = [
    { icon: Trophy, label: 'Primeira Conquista', color: 'text-yellow-500' },
    { icon: Star, label: 'Estudante Dedicado', color: 'text-blue-500' },
    { icon: Target, label: 'Foco Total', color: 'text-green-500' },
    { icon: BookOpen, label: 'Leitor Assíduo', color: 'text-purple-500' },
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size="sm" showText={false} />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="text-white/80 hover:text-white text-sm"
            >
              Sair
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                  {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 p-0"
                >
                  <Camera size={14} />
                </Button>
              </div>
              <h2 className="text-xl font-bold mt-3">{profile?.full_name || 'Usuário'}</h2>
              <p className="text-white/80 text-sm">{user?.email}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{profile?.points || 0}</div>
                <div className="text-xs opacity-80">Pontos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{profile?.level || 1}</div>
                <div className="text-xs opacity-80">Nível</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">7</div>
                <div className="text-xs opacity-80">Sequência</div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button
              onClick={() => setIsEditing(true)}
              className="w-full bg-white/20 hover:bg-white/30 text-white border-none"
            >
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* Achievements */}
        <div className="px-6 py-2">
          <h3 className="text-white text-lg font-semibold mb-4">Conquistas</h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                <achievement.icon className={`${achievement.color} w-8 h-8 mb-2`} />
                <p className="text-sm font-medium">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Editar Perfil</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="school_year">Ano Escolar</Label>
                  <Select 
                    value={formData.school_year} 
                    onValueChange={(value) => setFormData({...formData, school_year: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu ano escolar" />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolYearOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone_number">Telefone (Opcional)</Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Profile;
