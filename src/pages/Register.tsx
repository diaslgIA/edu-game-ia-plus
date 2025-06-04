
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import AvatarSelector from '@/components/AvatarSelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const { t } = useLanguage();
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
      alert('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      playSound('error');
      alert('A senha deve ter pelo menos 8 caracteres');
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
      navigate('/verification');
    } else {
      playSound('error');
    }
  };

  const handleAvatarChange = (avatar: string) => {
    setFormData({...formData, avatar});
    playSound('click');
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header compacto */}
        <div className="flex-shrink-0 flex items-center p-3 pb-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              playSound('click');
              navigate('/');
            }}
            className="text-white p-2 mr-2"
          >
            <ArrowLeft size={16} />
          </Button>
          <div className="flex-1 flex justify-center">
            <Logo size="sm" />
          </div>
        </div>

        {/* Conteúdo scrollável com melhor espaçamento */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="max-w-sm mx-auto space-y-3">
            {/* Título mais compacto */}
            <div className="text-center py-1">
              <h1 className="text-xl font-bold text-white mb-1">Criar Conta</h1>
              <p className="text-white/80 text-xs">Comece sua jornada rumo ao ENEM!</p>
            </div>

            {/* Avatar Selector mais compacto */}
            <div className="flex justify-center py-2">
              <div className="scale-75">
                <AvatarSelector
                  currentAvatar={formData.avatar}
                  onAvatarChange={handleAvatarChange}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <Label htmlFor="fullName" className="text-white text-xs">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Seu nome completo"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-8 text-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white text-xs">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="seu@email.com"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-8 text-sm"
                  required
                />
              </div>

              <div>
                <Label htmlFor="schoolYear" className="text-white text-xs">Ano Escolar</Label>
                <Select 
                  value={formData.schoolYear} 
                  onValueChange={(value) => {
                    setFormData({...formData, schoolYear: value});
                    playSound('click');
                  }}
                  required
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white h-8 text-sm">
                    <SelectValue placeholder="Selecione seu ano escolar" />
                  </SelectTrigger>
                  <SelectContent className="max-h-32 overflow-y-auto">
                    {schoolYearOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-sm">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-xs">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Mínimo 8 caracteres"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-8 h-8 text-sm"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2 text-white/60 hover:text-white"
                    onClick={() => {
                      setShowPassword(!showPassword);
                      playSound('click');
                    }}
                  >
                    {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white text-xs">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirme sua senha"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-8 h-8 text-sm"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2 text-white/60 hover:text-white"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                      playSound('click');
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                  </Button>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-2 text-sm"
                  disabled={loading}
                  onClick={() => playSound('click')}
                >
                  {loading ? 'Criando conta...' : 'Criar conta'}
                </Button>
              </div>
            </form>

            {/* Termos mais compactos */}
            <div className="text-center text-xs text-white/80 py-1">
              <p className="mb-1">Ao criar uma conta, você concorda com nossos</p>
              <p>
                <Link to="#" className="underline">Termos de Uso</Link> e{' '}
                <Link to="#" className="underline">Política de Privacidade</Link>
              </p>
            </div>

            {/* Link para login */}
            <div className="text-center pb-2">
              <span className="text-white/80 text-xs">Já tem uma conta? </span>
              <Link 
                to="/auth?tab=login" 
                className="text-white font-semibold hover:underline text-xs"
                onClick={() => playSound('click')}
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
