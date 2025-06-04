
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
  const { signIn, signInWithGmail, loading } = useAuth();
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

  const handleGoogleLogin = async () => {
    playSound('click');
    const success = await signInWithGmail();
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-lg">
                <span className="bg-transparent px-2 text-white/80">ou</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={loading}
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar com Google
            </Button>

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
