
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register(formData);
      if (success) {
        toast.success('Conta criada com sucesso!');
        navigate('/verification');
      } else {
        toast.error('Erro ao criar conta');
      }
    } catch (error) {
      toast.error('Erro ao criar conta');
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
          
          {/* Ilustração de gaming */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">🎓</div>
            <div className="text-4xl">⭐</div>
            <div className="text-4xl">🎮</div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Criar uma nova conta
          </h1>
          <p className="text-white/80 text-sm text-center">
            Já está cadastrado? 
            <button 
              onClick={() => navigate('/login')}
              className="underline ml-1"
            >
              Faça login aqui.
            </button>
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white text-sm font-medium">
                  NOME
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Lara Gidi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/90 border-0 rounded-xl py-3 text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white text-sm font-medium">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="larinha07@gmail.com"
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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              {isLoading ? 'CRIANDO...' : 'ENTRAR'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6 flex justify-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-2xl">📧</span>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
