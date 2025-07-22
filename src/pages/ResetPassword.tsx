
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleResetPassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    // TODO: Implement password reset logic
    console.log('Reset password');
    navigate('/login');
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/login')} 
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Nova Senha</h1>
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
          <div className="text-center text-white space-y-2">
            <Lock size={48} className="mx-auto opacity-80" />
            <h2 className="text-xl font-semibold">Criar Nova Senha</h2>
            <p className="text-white/80">Digite sua nova senha abaixo</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="newPassword" className="text-white font-medium">
                Nova {t('password')}
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                placeholder="Nova senha"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white font-medium">
                Confirmar {t('password')}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                placeholder="Confirmar senha"
              />
            </div>

            <Button 
              onClick={handleResetPassword}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl"
            >
              Alterar Senha
            </Button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default ResetPassword;
