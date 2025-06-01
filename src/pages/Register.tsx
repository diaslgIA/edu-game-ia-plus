
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    schoolYear: ''
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
      alert('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 8) {
      alert('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    const success = await signUp(
      formData.email, 
      formData.password, 
      {
        full_name: formData.fullName,
        school_year: formData.schoolYear
      }
    );
    
    if (success) {
      navigate('/verification');
    }
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full p-6 text-white">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-white p-2 mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <Logo size="md" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Criar Conta</h1>
              <p className="text-white/80">Comece sua jornada rumo ao ENEM!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-white">Nome Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder="Seu nome completo"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="seu@email.com"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>

              <div>
                <Label htmlFor="schoolYear" className="text-white">Ano Escolar</Label>
                <Select 
                  value={formData.schoolYear} 
                  onValueChange={(value) => setFormData({...formData, schoolYear: value})}
                  required
                >
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
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
                <Label htmlFor="password" className="text-white">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Mínimo 8 caracteres"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirme sua senha"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="text-center text-sm text-white/80">
              <p>Ao criar uma conta, você concorda com nossos</p>
              <p>
                <Link to="#" className="underline">Termos de Uso</Link> e{' '}
                <Link to="#" className="underline">Política de Privacidade</Link>
              </p>
            </div>

            <div className="text-center">
              <span className="text-white/80">Já tem uma conta? </span>
              <Link to="/auth?tab=login" className="text-white font-semibold hover:underline">
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
