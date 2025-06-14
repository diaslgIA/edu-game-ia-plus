
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
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGmail, loading } = useAuth();
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
  const [googleAuthEnabled, setGoogleAuthEnabled] = useState(true);

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
      // Não redireciona imediatamente, aguarda confirmação por email
    } else {
      playSound('error');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      playSound('click');
      const success = await signInWithGmail();
      
      if (success) {
        playSound('success');
        // O redirecionamento será feito automaticamente pelo Google OAuth
      } else {
        playSound('error');
      }
    } catch (error: any) {
      console.error('Erro no Google Auth:', error);
      
      // Verificar se é erro de provedor não habilitado
      if (error.message?.includes('provider is not enabled') || 
          error.message?.includes('Unsupported provider')) {
        setGoogleAuthEnabled(false);
        toast.error('Login com Google não está disponível no momento. Use o cadastro por email.');
      } else {
        toast.error('Erro ao tentar fazer login com Google. Tente novamente.');
      }
      playSound('error');
    }
  };

  const handleAvatarChange = (avatar: string) => {
    setFormData({...formData, avatar});
    playSound('click');
  };

  return (
    <div className="w-full space-y-1">
      {/* Botão Google no topo - apenas se habilitado */}
      {googleAuthEnabled && (
        <div className="mb-2">
          <Button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-1.5 text-xs h-6 rounded-lg flex items-center justify-center gap-1.5"
            disabled={loading}
          >
            <FaGoogle className="w-3 h-3" />
            Continuar com Google
          </Button>
          
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-2 text-white/60 text-xs">ou</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
        </div>
      )}

      {/* Aviso se Google Auth não estiver disponível */}
      {!googleAuthEnabled && (
        <div className="mb-2 p-2 bg-yellow-500/20 rounded-lg">
          <p className="text-yellow-200 text-xs text-center">
            Login com Google temporariamente indisponível
          </p>
        </div>
      )}

      {/* Avatar Selector compacto */}
      <div className="flex justify-center py-0.5">
        <AvatarSelector
          currentAvatar={formData.avatar}
          onAvatarChange={handleAvatarChange}
        />
      </div>

      {/* Formulário com espaçamento ultra mínimo */}
      <form onSubmit={handleSubmit} className="space-y-1">
        <div className="space-y-0.5">
          <Label htmlFor="fullName" className="text-white text-xs font-medium">Nome Completo *</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="Seu nome completo"
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-6 text-xs"
            required
          />
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="schoolYear" className="text-white text-xs font-medium">Ano Escolar *</Label>
          <Select 
            value={formData.schoolYear} 
            onValueChange={(value) => {
              setFormData({...formData, schoolYear: value});
              playSound('click');
            }}
            required
          >
            <SelectTrigger className="bg-white/20 border-white/30 text-white h-6 text-xs">
              <SelectValue placeholder="Selecione seu ano escolar" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg max-h-24 overflow-y-auto z-50">
              {schoolYearOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs text-gray-800 hover:bg-gray-100">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="email" className="text-white text-xs font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="seu@email.com"
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-6 text-xs"
            required
          />
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="password" className="text-white text-xs font-medium">Senha *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Mínimo 8 caracteres"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-6 h-6 text-xs"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-1 text-white/60 hover:text-white"
              onClick={() => {
                setShowPassword(!showPassword);
                playSound('click');
              }}
            >
              {showPassword ? <EyeOff size={8} /> : <Eye size={8} />}
            </Button>
          </div>
        </div>

        <div className="space-y-0.5">
          <Label htmlFor="confirmPassword" className="text-white text-xs font-medium">Confirmar Senha *</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirme sua senha"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-6 h-6 text-xs"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-1 text-white/60 hover:text-white"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword);
                playSound('click');
              }}
            >
              {showConfirmPassword ? <EyeOff size={8} /> : <Eye size={8} />}
            </Button>
          </div>
        </div>

        <div className="pt-1">
          <Button 
            type="submit" 
            className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-1 text-xs h-6 rounded-lg"
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
