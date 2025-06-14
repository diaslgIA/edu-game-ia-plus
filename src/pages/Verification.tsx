
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

const Verification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const type = searchParams.get('type');
      
      if (type === 'email') {
        try {
          // Verificar se há tokens de confirmação na URL
          const token_hash = searchParams.get('token_hash');
          const verification_type = searchParams.get('type');
          
          if (token_hash) {
            const { data, error } = await supabase.auth.verifyOtp({
              token_hash,
              type: 'email'
            });

            if (error) {
              console.error('Erro na verificação:', error);
              setVerificationStatus('error');
              toast.error('Erro ao confirmar email. Link pode ter expirado.');
            } else if (data.user) {
              console.log('Email confirmado com sucesso:', data.user.email);
              setVerificationStatus('success');
              toast.success('Email confirmado com sucesso!');
              
              // Redirecionar para tela de boas-vindas após 2 segundos
              setTimeout(() => {
                navigate('/welcome');
              }, 2000);
            }
          } else {
            // Se não há token, mostrar status pendente
            setVerificationStatus('pending');
          }
        } catch (error) {
          console.error('Erro inesperado na verificação:', error);
          setVerificationStatus('error');
          toast.error('Erro inesperado ao confirmar email.');
        }
      } else {
        setVerificationStatus('pending');
      }
    };

    // Se o usuário já está autenticado, redirecionar
    if (isAuthenticated) {
      navigate('/welcome');
      return;
    }

    handleEmailConfirmation();
  }, [searchParams, navigate, isAuthenticated]);

  const handleResendEmail = async () => {
    toast.info('Funcionalidade de reenvio em desenvolvimento');
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Verificando seu email...
            </h2>
            <p className="text-white/80">
              Aguarde enquanto confirmamos sua conta.
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Email confirmado!
            </h2>
            <p className="text-white/80 mb-4">
              Sua conta foi verificada com sucesso. Redirecionando...
            </p>
            <div className="animate-pulse">
              <Loader2 className="w-6 h-6 text-white/60 animate-spin mx-auto" />
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Erro na verificação
            </h2>
            <p className="text-white/80 mb-6">
              Não foi possível confirmar seu email. O link pode ter expirado ou ser inválido.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Reenviar email de confirmação
              </Button>
              <Button
                onClick={() => navigate('/auth?tab=register')}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                Voltar ao cadastro
              </Button>
            </div>
          </div>
        );

      case 'pending':
      default:
        return (
          <div className="text-center">
            <Mail className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Confirme seu email
            </h2>
            <p className="text-white/80 mb-6">
              Enviamos um link de confirmação para seu email. Clique no link para ativar sua conta.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Reenviar email
              </Button>
              <Button
                onClick={() => navigate('/auth?tab=login')}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                Já confirmei, fazer login
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col items-center justify-center min-h-full p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          {renderContent()}
        </div>
      </div>
    </MobileContainer>
  );
};

export default Verification;
