
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <Logo size="lg" className="mb-4" />
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 text-yellow-400">
                ⭐
              </div>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Entrar</h1>
          <p className="text-white/80 text-sm">Entre para continuar.</p>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  NOME
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="lluisig"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/90 border-0 rounded-xl py-3 text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-sm font-medium">
                  SENHA
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/90 border-0 rounded-xl py-3 text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, rememberMe: checked as boolean })
                  }
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
                />
                <Label htmlFor="remember" className="text-white text-sm">
                  LEMBRAR A MINHA SENHA
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button
              onClick={() => navigate('/register')}
              className="text-white underline text-sm"
            >
              Criar nova conta
            </button>
            <br />
            <button className="text-white underline text-sm">
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Login;
