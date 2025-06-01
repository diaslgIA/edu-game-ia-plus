
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EmailValidationContextType {
  isEmailValidated: boolean;
  pendingGoogleAuth: boolean;
  validateEmail: (email: string) => Promise<boolean>;
  completeGoogleSignup: () => Promise<void>;
  sendValidationEmail: (email: string) => Promise<void>;
  setEmailValidated: (validated: boolean) => void;
}

const EmailValidationContext = createContext<EmailValidationContextType | undefined>(undefined);

export const EmailValidationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [pendingGoogleAuth, setPendingGoogleAuth] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  // Sincronizar com o status de verificação do perfil
  React.useEffect(() => {
    if (profile?.is_verified) {
      setIsEmailValidated(true);
    }
  }, [profile]);

  const validateEmail = async (email: string): Promise<boolean> => {
    // Verificar com o status real do Supabase
    if (profile?.is_verified) {
      setIsEmailValidated(true);
      toast({
        title: "Email válido",
        description: "Seu email foi validado com sucesso!",
      });
      return true;
    }

    // Validação local como fallback
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (isValid) {
      toast({
        title: "Email válido",
        description: "Por favor, verifique sua caixa de entrada para confirmar seu email.",
      });
    } else {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
    }
    
    return isValid;
  };

  const sendValidationEmail = async (email: string): Promise<void> => {
    // Integração real com Supabase seria feita aqui
    toast({
      title: "Email de validação enviado",
      description: `Um email de validação foi enviado para ${email}. Verifique sua caixa de entrada e clique no link para confirmar.`,
    });
  };

  const completeGoogleSignup = async (): Promise<void> => {
    if (isEmailValidated || profile?.is_verified) {
      setPendingGoogleAuth(false);
      toast({
        title: "Cadastro concluído",
        description: "Seu cadastro com Google foi concluído com sucesso!",
      });
    }
  };

  const setEmailValidated = (validated: boolean) => {
    setIsEmailValidated(validated);
  };

  return (
    <EmailValidationContext.Provider value={{
      isEmailValidated: isEmailValidated || !!profile?.is_verified,
      pendingGoogleAuth,
      validateEmail,
      completeGoogleSignup,
      sendValidationEmail,
      setEmailValidated
    }}>
      {children}
    </EmailValidationContext.Provider>
  );
};

export const useEmailValidation = () => {
  const context = useContext(EmailValidationContext);
  if (!context) {
    throw new Error('useEmailValidation must be used within EmailValidationProvider');
  }
  return context;
};
