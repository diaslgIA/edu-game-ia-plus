
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh' | 'ar' | 'ru' | 'hi';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Home/Welcome
  'welcome': {
    pt: 'Bem-vindo ao EduGameIA',
    en: 'Welcome to EduGameIA',
    es: 'Bienvenido a EduGameIA',
    fr: 'Bienvenue à EduGameIA',
    de: 'Willkommen bei EduGameIA',
    it: 'Benvenuto in EduGameIA',
    ja: 'EduGameIAへようこそ',
    ko: 'EduGameIA에 오신 것을 환영합니다',
    zh: '欢迎来到EduGameIA',
    ar: 'مرحبا بك في EduGameIA',
    ru: 'Добро пожаловать в EduGameIA',
    hi: 'EduGameIA में आपका स्वागत है'
  },
  'tagline': {
    pt: 'Sua jornada rumo ao ENEM começa aqui',
    en: 'Your journey to success starts here',
    es: 'Tu viaje hacia el éxito comienza aquí',
    fr: 'Votre voyage vers le succès commence ici',
    de: 'Ihre Reise zum Erfolg beginnt hier',
    it: 'Il tuo viaggio verso il successo inizia qui',
    ja: '成功への旅がここから始まります',
    ko: '성공으로의 여정이 여기서 시작됩니다',
    zh: '您的成功之旅从这里开始',
    ar: 'رحلتك نحو النجاح تبدأ هنا',
    ru: 'Ваш путь к успеху начинается здесь',
    hi: 'सफलता की आपकी यात्रा यहाँ से शुरू होती है'
  },
  'login': {
    pt: 'Entrar na minha conta',
    en: 'Login to my account',
    es: 'Iniciar sesión en mi cuenta',
    fr: 'Se connecter à mon compte',
    de: 'In mein Konto einloggen',
    it: 'Accedi al mio account',
    ja: 'アカウントにログイン',
    ko: '내 계정에 로그인',
    zh: '登录我的账户',
    ar: 'تسجيل الدخول إلى حسابي',
    ru: 'Войти в мой аккаунт',
    hi: 'मेरे खाते में लॉगिन करें'
  },
  'register': {
    pt: 'Criar conta gratuita',
    en: 'Create free account',
    es: 'Crear cuenta gratuita',
    fr: 'Créer un compte gratuit',
    de: 'Kostenloses Konto erstellen',
    it: 'Crea account gratuito',
    ja: '無料アカウントを作成',
    ko: '무료 계정 만들기',
    zh: '创建免费账户',
    ar: 'إنشاء حساب مجاني',
    ru: 'Создать бесплатный аккаунт',
    hi: 'मुफ्त खाता बनाएं'
  },
  // Navigation
  'dashboard': {
    pt: 'Painel',
    en: 'Dashboard',
    es: 'Panel',
    fr: 'Tableau de bord',
    de: 'Dashboard',
    it: 'Dashboard',
    ja: 'ダッシュボード',
    ko: '대시보드',
    zh: '仪表板',
    ar: 'لوحة القيادة',
    ru: 'Панель управления',
    hi: 'डैशबोर्ड'
  },
  'subjects': {
    pt: 'Matérias',
    en: 'Subjects',
    es: 'Materias',
    fr: 'Matières',
    de: 'Fächer',
    it: 'Materie',
    ja: '科目',
    ko: '과목',
    zh: '科目',
    ar: 'المواد',
    ru: 'Предметы',
    hi: 'विषय'
  },
  'exercises': {
    pt: 'Exercícios',
    en: 'Exercises',
    es: 'Ejercicios',
    fr: 'Exercices',
    de: 'Übungen',
    it: 'Esercizi',
    ja: '練習問題',
    ko: '연습문제',
    zh: '练习',
    ar: 'التمارين',
    ru: 'Упражнения',
    hi: 'अभ्यास'
  },
  'profile': {
    pt: 'Perfil',
    en: 'Profile',
    es: 'Perfil',
    fr: 'Profil',
    de: 'Profil',
    it: 'Profilo',
    ja: 'プロフィール',
    ko: '프로필',
    zh: '个人资料',
    ar: 'الملف الشخصي',
    ru: 'Профиль',
    hi: 'प्रोफाइल'
  }
};

const languages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' }
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
