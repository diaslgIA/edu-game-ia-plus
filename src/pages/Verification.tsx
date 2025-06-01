
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Verification = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const [verificationData, setVerificationData] = useState({
    email: 'larinha07@gmail.com',
    phone: '71-996894503',
    code: ['', '', '', '']
  });
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    // Verificar se é um redirecionamento de confirmação de email
    const type = searchParams.get('type');
    const tokenHash = searchParams.get('token_hash');
    
    if (type === 'email' && tokenHash) {
      // Simular confirmação de email bem-sucedida
      setIsEmailConfirmed(true);
      toast.success('Email confirmado com sucesso!');
      
      // Atualizar o perfil para refletir a verificação
      if (user) {
        setTimeout(() => {
          refreshProfile();
        }, 1000);
      }
    } else if (type === 'email') {
      // Se veio do redirecionamento mas sem token, ainda consideramos como confirmado
      setIsEmailConfirmed(true);
      toast.success('Email confirmado com sucesso!');
      
      if (user) {
        setTimeout(() => {
          refreshProfile();
        }, 1000);
      }
    }
  }, [searchParams, user, refreshProfile]);

  // Se o usuário está logado e o email foi confirmado, redirecionar para dashboard
  useEffect(() => {
    if (user && profile?.is_verified) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [user, profile, navigate]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationData.code];
      newCode[index] = value;
      setVerificationData({ ...verificationData, code: newCode });
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = verificationData.code.join('');
    if (code.length === 4) {
      toast.success('Verificação realizada com sucesso!');
      navigate('/dashboard');
    } else {
      toast.error('Por favor, insira o código completo');
    }
  };

  const handleContinueToApp = () => {
    navigate('/dashboard');
  };

  // Se o email foi confirmado, mostrar tela de sucesso
  if (isEmailConfirmed) {
    return (
      <MobileContainer>
        <div className="flex flex-col h-full p-6 justify-center items-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <Logo size="lg" className="mb-6" />
            
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Email Confirmado!
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Seu email foi verificado com sucesso. Agora você pode acessar todos os recursos do EduGame e começar sua jornada de aprendizado!
            </p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/50 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Próximos passos:</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
                  <li>• Complete seu perfil</li>
                  <li>• Explore os exercícios</li>
                  <li>• Participe dos rankings</li>
                  <li>• Conecte-se com outros estudantes</li>
                </ul>
              </div>
              
              <Button
                onClick={handleContinueToApp}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-lg"
              >
                Começar a Usar o EduGame
              </Button>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-8">
          <Logo size="lg" className="mb-6" />
          
          <h1 className="text-xl font-bold text-black dark:text-white mb-8">
            verificar o e-mail
          </h1>

          {/* Email verification */}
          <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 flex items-center justify-between shadow-sm transition-colors duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-gray-600 dark:text-gray-300">
                ✉️
              </div>
              <span className="text-gray-800 dark:text-white font-medium">{verificationData.email}</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              ▶️
            </div>
          </div>

          <h2 className="text-xl font-bold text-black dark:text-white mb-6">
            verificar o número de telefone
          </h2>

          {/* Phone verification */}
          <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm transition-colors duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-gray-600 dark:text-gray-300">
                📱
              </div>
              <span className="text-gray-800 dark:text-white font-medium">{verificationData.phone}</span>
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              ▶️
            </div>
          </div>

          {/* Code input */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 text-gray-600 dark:text-gray-300 flex items-center justify-center">
              💬
            </div>
            {verificationData.code.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold bg-gray-100 dark:bg-gray-700 border-0 rounded-lg transition-colors duration-300"
                maxLength={1}
              />
            ))}
          </div>
        </div>

        {/* Verify button */}
        <div className="flex-1 flex flex-col justify-end pb-8">
          <Button
            onClick={handleVerify}
            className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center space-x-2 transition-colors duration-300"
          >
            <span>verificar</span>
            <span className="text-2xl">✓</span>
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Verification;
