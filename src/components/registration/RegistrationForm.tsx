
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSound } from '@/contexts/SoundContext';
import AvatarSelector from '@/components/AvatarSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const { playSound } = useSound();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolYear: '',
    avatar: '👤'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schoolYearOptions = [
    { value: '1º Ano Ensino Médio', label: '1º Ano do Ensino Médio' },
    { value: '2º Ano Ensino Médio', label: '2º Ano do Ensino Médio' },
    { value: '3º Ano Ensino Médio', label: '3º Ano do Ensino Médio' },
    { value: 'Ensino Médio Concluído', label: 'Ensino Médio Concluído' },
    { value: 'Cursinho Pré-Vestibular', label: 'Cursinho Pré-Vestibular' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      playSound('error');
      toast.error('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      playSound('error');
      toast.error('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    playSound('click');
    const success = await signUp(
      formData.email, 
      formData.password, 
      {
        full_name: formData.fullName,
        school_year: formData.schoolYear,
        profile_picture_url: formData.avatar
      }
    );
    
    if (success) {
      playSound('success');
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/auth?tab=login');
      }, 2000);
    } else {
      playSound('error');
    }
  };

  const handleAvatarChange = (avatar: string) => {
    setFormData({...formData, avatar});
    playSound('click');
  };

  return (
    <div className="w-full space-y-4 p-1">
      {/* Avatar Selector */}
      <div className="flex justify-center py-2">
        <AvatarSelector
          selectedAvatar={formData.avatar}
          onAvatarSelect={handleAvatarChange}
        />
      </div>

      {/* Formulário com espaçamento adequado */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white text-sm font-medium">Nome Completo *</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Seu nome completo"
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolYear" className="text-white text-sm font-medium">Ano Escolar *</Label>
          <Select 
            value={formData.schoolYear} 
            onValueChange={(value) => {
              setFormData({...formData, schoolYear: value});
              playSound('click');
            }}
            required
          >
            <SelectTrigger className="bg-white/20 border-white/30 text-white h-12 text-sm">
              <SelectValue placeholder="Selecione seu ano escolar" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg max-h-40 overflow-y-auto z-50">
              {schoolYearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm text-gray-800 hover:bg-gray-100 py-3">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="seu@email.com"
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white text-sm font-medium">Senha *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Mínimo 8 caracteres"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-12 h-12 text-sm"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 px-0 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => {
                setShowPassword(!showPassword);
                playSound('click');
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">Confirmar Senha *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirme sua senha"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-12 h-12 text-sm"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 px-0 text-white/60 hover:text-white hover:bg-white/10"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
                playSound('click');
              }}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 text-sm h-12 rounded-lg transition-all duration-300 hover:scale-105"
            disabled={loading}
            onClick={() => playSound('click')}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
