
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // TODO: Implement password reset logic
    console.log('Reset password for:', email);
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
            <h1 className="text-lg font-semibold">Recuperar Senha</h1>
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
          <div className="text-center text-white space-y-2">
            <Mail size={48} className="mx-auto opacity-80" />
            <h2 className="text-xl font-semibold">Esqueceu sua senha?</h2>
            <p className="text-white/80">Digite seu email para receber as instruções de recuperação</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white font-medium">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                placeholder={t('email')}
              />
            </div>

            <Button 
              onClick={handleResetPassword}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
            >
              Enviar Instruções
            </Button>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-white hover:bg-white/20"
            >
              Voltar ao Login
            </Button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default ForgotPassword;
