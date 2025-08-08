import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  school_year: string;
  phone_number?: string;
  profile_picture_url?: string;
  points: number;
  level: number;
  is_verified: boolean;
  subscription_type: string;
  first_login: boolean;
  last_login: string | null;
  login_streak: number | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, userData: { full_name: string; school_year: string; phone_number?: string; profile_picture_url?: string }) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signInWithGmail: () => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  markFirstLoginComplete: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  const updateLoginStreakIfNeeded = async (userId: string) => {
    try {
      console.log('Atualizando streak de login para usuário:', userId);
      
      // Buscar perfil atual
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('last_login, login_streak')
        .eq('id', userId)
        .single();

      if (fetchError) {
        console.error('Erro ao buscar perfil para streak:', fetchError);
        return;
      }

      const now = new Date();
      const lastLogin = currentProfile?.last_login ? new Date(currentProfile.last_login) : null;
      let newStreak = currentProfile?.login_streak || 0;

      if (lastLogin) {
        // Calcular diferença em dias
        const diffTime = now.getTime() - lastLogin.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        console.log('Diferença em dias desde último login:', diffDays);

        if (diffDays === 0) {
          // Mesmo dia, não altera streak
          console.log('Mesmo dia, mantendo streak:', newStreak);
          return;
        } else if (diffDays === 1) {
          // Dia consecutivo, incrementa
          newStreak = newStreak + 1;
          console.log('Dia consecutivo, incrementando streak para:', newStreak);
        } else {
          // Mais de 1 dia, reseta para 1
          newStreak = 1;
          console.log('Mais de 1 dia sem login, resetando streak para:', newStreak);
        }
      } else {
        // Primeiro login ou last_login null
        newStreak = 1;
        console.log('Primeiro login, definindo streak como:', newStreak);
      }

      // Atualizar no banco
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          last_login: now.toISOString(),
          login_streak: newStreak
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Erro ao atualizar streak:', updateError);
      } else {
        console.log('Streak atualizada com sucesso para:', newStreak);
      }

    } catch (error) {
      console.error('Erro inesperado ao atualizar streak:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  const markFirstLoginComplete = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ first_login: false })
          .eq('id', user.id);

        if (!error) {
          await refreshProfile();
        }
      } catch (error) {
        console.error('Erro ao marcar primeiro login como completo:', error);
      }
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          
          // Atualizar streak ao obter sessão inicial
          await updateLoginStreakIfNeeded(initialSession.user.id);
          
          const profileData = await fetchProfile(initialSession.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Atualizar streak quando houver mudança de autenticação (login/refresh)
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            await updateLoginStreakIfNeeded(session.user.id);
          }
          
          // Defer profile fetch to avoid potential deadlock
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: { full_name: string; school_year: string; phone_number?: string; profile_picture_url?: string }): Promise<boolean> => {
    try {
      setLoading(true);
      
      console.log('Iniciando cadastro com:', { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/welcome`
        }
      });

      if (error) {
        console.error('Erro no cadastro:', error);
        let errorMessage = 'Ocorreu um erro no cadastro.';
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'Este email já está cadastrado. Tente fazer login ou use outro email.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Email inválido. Verifique se o email está correto.';
        } else if (error.message.includes('Password')) {
          errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
        } else if (error.message.includes('captcha verification process failed')) {
          errorMessage = 'A verificação de segurança (Captcha) falhou. Por favor, desative a proteção de CAPTCHA nas configurações de autenticação do seu projeto Supabase. Isso é comum em ambiente de desenvolvimento.';
        }
        
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        });
        return false;
      }

      console.log('Cadastro realizado com sucesso:', data);

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Cadastro realizado!",
          description: "Enviamos um link de confirmação para seu email. Verifique sua caixa de entrada e clique no link para confirmar sua conta.",
        });
      } else if (data.user) {
        toast({
          title: "Cadastro realizado!",
          description: "Bem-vindo ao EduGame!",
        });
      }

      return true;
    } catch (error) {
      console.error('Erro inesperado no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente em alguns instantes.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      console.log('Iniciando login para:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro no login:', error);
        let errorMessage = 'Credenciais inválidas.';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Email não confirmado. Verifique sua caixa de entrada.';
        } else if (error.message.includes('captcha verification process failed')) {
            errorMessage = 'A verificação de segurança (Captcha) falhou. Por favor, desative a proteção de CAPTCHA nas configurações de autenticação do seu projeto Supabase. Isso é comum em ambiente de desenvolvimento.';
        }
        
        toast({
          title: "Erro no login",
          description: errorMessage,
          variant: "destructive",
        });
        return false;
      }

      console.log('Login realizado com sucesso para:', data.user?.email);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      });

      return true;
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGmail = async (): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/welcome`
        }
      });

      if (error) {
        console.error('Erro no login com Google:', error);
        
        // Verificar se é erro de provedor não habilitado
        if (error.message.includes('provider is not enabled') || 
            error.message.includes('Unsupported provider') ||
            error.message.includes('validation_failed')) {
          throw new Error('provider is not enabled');
        }
        
        toast({
          title: "Erro no login com Google",
          description: "Serviço temporariamente indisponível. Tente usar o cadastro por email.",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error: any) {
      console.error('Erro inesperado no login com Google:', error);
      
      // Re-throw provider errors for better error handling
      if (error.message?.includes('provider is not enabled') || 
          error.message?.includes('Unsupported provider') ||
          error.message?.includes('validation_failed')) {
        throw error;
      }
      
      toast({
        title: "Erro no login com Google",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Clear local state first
      setUser(null);
      setProfile(null);
      setSession(null);
      
      // Only attempt signout if we have a session
      if (session) {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          console.error('Signout error:', error);
          // Don't show error for session missing, as we already cleared state
          if (!error.message.includes('Auth session missing')) {
            toast({
              title: "Erro ao sair",
              description: error.message,
              variant: "destructive",
            });
            return;
          }
        }
      }
      
      toast({
        title: "Logout realizado com sucesso!",
        description: "Até logo!",
      });
      
      // Force redirect to home page
      window.location.href = '/';
    } catch (error: any) {
      console.error('Signout error:', error);
      
      // If it's just a session missing error, still consider it successful
      if (error?.message?.includes('Auth session missing')) {
        setUser(null);
        setProfile(null);
        setSession(null);
        
        toast({
          title: "Logout realizado com sucesso!",
          description: "Até logo!",
        });
        
        window.location.href = '/';
      } else {
        toast({
          title: "Erro ao sair",
          description: "Ocorreu um erro inesperado.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!user) return false;

    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        toast({
          title: "Erro ao atualizar perfil",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      // Refresh profile data
      await refreshProfile();
      
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });

      return true;
    } catch (error) {
      console.error('Erro inesperado ao atualizar perfil:', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user && !!session;

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      isAuthenticated,
      signUp,
      signIn,
      signInWithGmail,
      signOut,
      updateProfile,
      refreshProfile,
      markFirstLoginComplete
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
