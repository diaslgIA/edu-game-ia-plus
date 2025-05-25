
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  avatar?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGmail: () => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updatePoints: (points: number) => void;
  updateAvatar: (avatar: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('eduGameUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: '1',
        name: 'Lara Gidi',
        email: email,
        points: 1234567,
        level: 15,
        isVerified: true
      };
      
      setUser(mockUser);
      localStorage.setItem('eduGameUser', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginWithGmail = async (): Promise<boolean> => {
    try {
      // Simulate Gmail login
      const mockUser: User = {
        id: 'gmail_' + Date.now(),
        name: 'Usuário Gmail',
        email: 'usuario@gmail.com',
        points: 0,
        level: 1,
        isVerified: false
      };
      
      setUser(mockUser);
      localStorage.setItem('eduGameUser', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Simulate API call
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        points: 0,
        level: 1,
        isVerified: false
      };
      
      setUser(newUser);
      localStorage.setItem('eduGameUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduGameUser');
  };

  const updatePoints = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints };
      setUser(updatedUser);
      localStorage.setItem('eduGameUser', JSON.stringify(updatedUser));
    }
  };

  const updateAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      localStorage.setItem('eduGameUser', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    loginWithGmail,
    register,
    logout,
    updatePoints,
    updateAvatar,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
