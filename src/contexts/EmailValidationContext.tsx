
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface EmailValidationContextType {
  isEmailValidated: boolean;
  pendingGoogleAuth: boolean;
  validateEmail: (email: string) => Promise<boolean>;
  completeGoogleSignup: () => Promise<void>;
  sendValidationEmail: (email: string) => Promise<void>;
}

const EmailValidationContext = createContext<EmailValidationContextType | undefined>(undefined);

export const EmailValidationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [pendingGoogleAuth, setPendingGoogleAuth] = useState(false);
  const { toast } = useToast();

  const validateEmail = async (email: string): Promise<boolean> => {
    // Simular validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (isValid) {
      setIsEmailValidated(true);
      toast({
        title: "Email válido",
        description: "Seu email foi validado com sucesso!",
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
    // Simular envio de email de validação
    toast({
      title: "Email de validação enviado",
      description: `Um email de validação foi enviado para ${email}`,
    });
  };

  const completeGoogleSignup = async (): Promise<void> => {
    if (isEmailValidated) {
      setPendingGoogleAuth(false);
      toast({
        title: "Cadastro concluído",
        description: "Seu cadastro com Google foi concluído com sucesso!",
      });
    }
  };

  return (
    <EmailValidationContext.Provider value={{
      isEmailValidated,
      pendingGoogleAuth,
      validateEmail,
      completeGoogleSignup,
      sendValidationEmail
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
