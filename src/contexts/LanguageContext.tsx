
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
  },
  'points': {
    pt: 'Pontos',
    en: 'Points',
    es: 'Puntos',
    fr: 'Points',
    de: 'Punkte',
    it: 'Punti',
    ja: 'ポイント',
    ko: '포인트',
    zh: '分数',
    ar: 'النقاط',
    ru: 'Очки',
    hi: 'अंक'
  },
  'level': {
    pt: 'Nível',
    en: 'Level',
    es: 'Nivel',
    fr: 'Niveau',
    de: 'Level',
    it: 'Livello',
    ja: 'レベル',
    ko: '레벨',
    zh: '等级',
    ar: 'المستوى',
    ru: 'Уровень',
    hi: 'स्तर'
  },
  'welcome_back': {
    pt: 'Bem-vindo de volta!',
    en: 'Welcome back!',
    es: '¡Bienvenido de vuelta!',
    fr: 'Bon retour!',
    de: 'Willkommen zurück!',
    it: 'Bentornato!',
    ja: 'おかえりなさい！',
    ko: '다시 오신 것을 환영합니다!',
    zh: '欢迎回来！',
    ar: 'مرحبا بعودتك!',
    ru: 'С возвращением!',
    hi: 'वापसी पर स्वागत है!'
  },
  'email': {
    pt: 'Email',
    en: 'Email',
    es: 'Correo',
    fr: 'Email',
    de: 'E-Mail',
    it: 'Email',
    ja: 'メール',
    ko: '이메일',
    zh: '电子邮件',
    ar: 'البريد الإلكتروني',
    ru: 'Электронная почта',
    hi: 'ईमेल'
  },
  'password': {
    pt: 'Senha',
    en: 'Password',
    es: 'Contraseña',
    fr: 'Mot de passe',
    de: 'Passwort',
    it: 'Password',
    ja: 'パスワード',
    ko: '비밀번호',
    zh: '密码',
    ar: 'كلمة المرور',
    ru: 'Пароль',
    hi: 'पासवर्ड'
  },
  'enter': {
    pt: 'Entrar',
    en: 'Login',
    es: 'Entrar',
    fr: 'Connexion',
    de: 'Anmelden',
    it: 'Accedi',
    ja: 'ログイン',
    ko: '로그인',
    zh: '登录',
    ar: 'تسجيل الدخول',
    ru: 'Войти',
    hi: 'लॉगिन'
  },
  'full_name': {
    pt: 'Nome Completo',
    en: 'Full Name',
    es: 'Nombre Completo',
    fr: 'Nom Complet',
    de: 'Vollständiger Name',
    it: 'Nome Completo',
    ja: '氏名',
    ko: '전체 이름',
    zh: '全名',
    ar: 'الاسم الكامل',
    ru: 'Полное имя',
    hi: 'पूरा नाम'
  },
  'school_year': {
    pt: 'Ano Escolar',
    en: 'School Year',
    es: 'Año Escolar',
    fr: 'Année Scolaire',
    de: 'Schuljahr',
    it: 'Anno Scolastico',
    ja: '学年',
    ko: '학년',
    zh: '学年',
    ar: 'السنة الدراسية',
    ru: 'Учебный год',
    hi: 'स्कूल वर्ष'
  },
  'create_account': {
    pt: 'Criar conta',
    en: 'Create account',
    es: 'Crear cuenta',
    fr: 'Créer un compte',
    de: 'Konto erstellen',
    it: 'Crea account',
    ja: 'アカウント作成',
    ko: '계정 만들기',
    zh: '创建账户',
    ar: 'إنشاء حساب',
    ru: 'Создать аккаунт',
    hi: 'खाता बनाएं'
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
    // Força re-render de todos os componentes quando o idioma muda
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
    
    // Atualiza o HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Força atualização imediata
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
