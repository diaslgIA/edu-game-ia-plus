
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, User, Settings, Key, Globe, Shield, FileText, Info, Share2, Check, Moon, Sun } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Português');

  const languages = [
    'Português', 'English', 'Español', 'Français', 'Deutsch', 'Italiano', 
    '中文', '日本語', '한국어', 'العربية', 'Русский', 'Nederlands', 'Polski'
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'EduGameIA',
        text: 'Descubra o melhor app educacional para o ENEM!',
        url: window.location.origin,
      });
    } else {
      // Fallback para dispositivos que não suportam Web Share API
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleChangePassword = () => {
    // Simular mudança de senha
    const newPassword = prompt('Digite sua nova senha:');
    if (newPassword) {
      alert('Senha alterada com sucesso!');
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    alert(`Idioma alterado para ${language}`);
  };

  const handlePrivacyPolicy = () => {
    alert('Política de Privacidade:\n\nNós respeitamos sua privacidade e protegemos seus dados pessoais. Coletamos apenas informações necessárias para melhorar sua experiência de aprendizado. Seus dados nunca são vendidos a terceiros.');
  };

  const handleTermsConditions = () => {
    alert('Termos e Condições:\n\nAo usar o EduGameIA, você concorda com nossos termos de uso. O app é destinado para fins educacionais. É proibido compartilhar contas ou usar o conteúdo comercialmente.');
  };

  const handleAboutApp = () => {
    alert('Sobre o EduGameIA:\n\nVersão 1.0.0\n\nO EduGameIA é um aplicativo educacional gamificado focado em preparar estudantes para o ENEM e vestibulares. Desenvolvido com amor para democratizar a educação de qualidade.');
  };

  const menuItems = [
    { 
      icon: darkMode ? Sun : Moon, 
      label: 'Modo', 
      sublabel: darkMode ? 'Claro' : 'Escuro', 
      hasToggle: true,
      action: () => setDarkMode(!darkMode)
    },
    { 
      icon: Key, 
      label: 'Alterar a senha', 
      hasArrow: true,
      action: handleChangePassword
    },
    { 
      icon: Globe, 
      label: 'Idioma', 
      sublabel: selectedLanguage,
      hasArrow: true,
      action: () => {
        const language = prompt(`Idiomas disponíveis:\n${languages.join('\n')}\n\nDigite o idioma desejado:`);
        if (language && languages.includes(language)) {
          handleLanguageChange(language);
        }
      }
    },
    { 
      icon: Share2, 
      label: 'Compartilhar aplicativo', 
      hasArrow: true,
      action: handleShare
    },
  ];

  const infoItems = [
    { 
      icon: Shield, 
      label: 'Política de Privacidade', 
      hasArrow: true,
      action: handlePrivacyPolicy
    },
    { 
      icon: FileText, 
      label: 'Termos e Condições', 
      hasArrow: true,
      action: handleTermsConditions
    },
    { 
      icon: Info, 
      label: 'Sobre o aplicativo', 
      hasArrow: true,
      action: handleAboutApp
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <MobileContainer background="gradient">
      <div className={`flex flex-col h-full pb-20 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {/* Header */}
        <div className={`p-4 flex items-center justify-between rounded-b-3xl transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-white/90 backdrop-blur-md'
        }`}>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className={`p-2 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}`}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Perfil</h1>
          </div>
          <div className="text-blue-400">
            <Check size={20} />
          </div>
        </div>

        {/* Profile info */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 relative transition-colors duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-400 to-purple-500'
            }`}>
              <User size={40} className="text-white" />
              <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                darkMode ? 'bg-gray-600' : 'bg-white'
              }`}>
                <span className="text-xs">✏️</span>
              </div>
            </div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user?.email}</p>
          </div>

          {/* General Configuration */}
          <div className="mb-8">
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Configuração Geral
            </h3>
            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-105 ${
                      darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'
                    }`}
                    onClick={item.action}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                        <Icon size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                      </div>
                      <div>
                        <span className="font-medium">{item.label}</span>
                        {item.sublabel && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.sublabel}
                          </p>
                        )}
                      </div>
                    </div>
                    {item.hasToggle && (
                      <Switch 
                        checked={darkMode} 
                        onCheckedChange={setDarkMode}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    )}
                    {item.hasArrow && (
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>›</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Information */}
          <div className="mb-8">
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Informações
            </h3>
            <div className="space-y-3">
              {infoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-105 ${
                      darkMode ? 'bg-gray-800/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'
                    }`}
                    onClick={item.action}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-100'}`}>
                        <Icon size={20} className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>›</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logout button */}
          <Button
            onClick={handleLogout}
            className={`w-full font-semibold py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Sair da conta
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Profile;
