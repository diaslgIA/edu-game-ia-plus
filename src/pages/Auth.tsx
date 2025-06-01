
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, Mail } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, signInWithGmail, isAuthenticated, loading } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  
  const activeTab = searchParams.get('tab') || 'login';

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setIsLoginMode(activeTab === 'login');
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formLoading) return;

    setFormLoading(true);
    const success = await signIn(loginEmail, loginPassword);
    if (success) {
      navigate('/dashboard');
    }
    setFormLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formLoading) return;

    if (registerPassword !== registerConfirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (registerPassword.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!fullName.trim() || !schoolYear) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setFormLoading(true);
    const success = await signUp(registerEmail, registerPassword, { full_name: fullName.trim(), school_year: schoolYear });
    if (success) {
      setIsLoginMode(true);
    }
    setFormLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (formLoading) return;
    setFormLoading(true);
    await signInWithGmail();
    setFormLoading(false);
  };

  const schoolYears = [
    '1º Ano - Ensino Médio',
    '2º Ano - Ensino Médio',
    '3º Ano - Ensino Médio',
    'Ensino Médio Concluído',
    'Cursinho Pré-Vestibular'
  ];

  if (loading) {
    return (
      <MobileContainer>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/21637d78-a84d-46c7-9307-1bd4869cd140.png" 
                alt="EduGameIA Logo" 
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold text-white">
                <span className="text-blue-200">Edugame</span>
                <span className="text-purple-200">IA</span>
              </h1>
            </div>
            <p className="text-white/80">
              {isLoginMode ? 'Entre na sua conta' : 'Crie sua conta gratuita'}
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <Tabs value={isLoginMode ? 'login' : 'register'} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="login" 
                    onClick={() => setIsLoginMode(true)}
                  >
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    onClick={() => setIsLoginMode(false)}
                  >
                    Registrar
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="space-y-4">
              {isLoginMode ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">Senha</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Sua senha"
                        required
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full btn-primary"
                      disabled={formLoading}
                    >
                      {formLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={formLoading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Entrar com Google
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-white">Nome Completo *</Label>
                    <Input
                      id="register-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Seu nome completo"
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-school-year" className="text-white">Ano Escolar *</Label>
                    <Select value={schoolYear} onValueChange={setSchoolYear} required>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Selecione seu ano escolar" />
                      </SelectTrigger>
                      <SelectContent>
                        {schoolYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">Email *</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">Senha *</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      required
                      minLength={6}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-white">Confirmar Senha *</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      placeholder="Digite a senha novamente"
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={formLoading}
                  >
                    {formLoading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Auth;
