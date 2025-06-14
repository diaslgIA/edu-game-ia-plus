
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import SoundControlPanel from '@/components/SoundControlPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();
  const { t } = useLanguage();
  const { playSound } = useSound();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    const success = await signIn(email, password);
    if (success) {
      playSound('success');
      navigate('/welcome');
    } else {
      playSound('error');
    }
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full p-6 text-white">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              playSound('click');
              navigate('/');
            }}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <SoundControlPanel />
        </div>

        {/* Logo Destacada e MAIOR com melhor qualidade */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-12">
            <div className="relative transform hover:scale-105 transition-transform duration-300">
              <Logo size="xl" animated={true} />
              {/* Efeitos de brilho múltiplos para melhor definição */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 rounded-full blur-2xl opacity-30 animate-pulse animation-delay-500"></div>
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl">
              EduGameIA
            </h1>
            <p className="text-2xl text-white/95 font-semibold drop-shadow-lg">
              {t('tagline')}
            </p>
            <div className="h-1 w-40 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mx-auto shadow-lg"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-3">{t('welcome_back')}</h2>
              <p className="text-white/90 text-lg">Entre na sua conta para continuar aprendendo</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white text-lg">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 text-lg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-lg">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-12 h-12 text-lg"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                    onClick={() => {
                      setShowPassword(!showPassword);
                      playSound('click');
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
                disabled={loading}
                onClick={() => playSound('click')}
              >
                {loading ? 'Entrando...' : t('enter')}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white text-lg"
                disabled={loading}
                onClick={() => playSound('click')}
              >
                Esqueceu sua senha?
              </Button>
            </div>

            <div className="text-center">
              <span className="text-white/80 text-lg">Não tem uma conta? </span>
              <Link 
                to="/auth?tab=register" 
                className="text-white font-semibold hover:underline text-lg"
                onClick={() => playSound('click')}
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Login;
