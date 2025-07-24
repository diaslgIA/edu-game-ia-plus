
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: { code: Language; name: string; flag: string }[];
  t: (key: string, params?: Record<string, any>) => string;
}

const translations = {
  pt: {
    // Navegação
    'nav.dashboard': 'Dashboard',
    'nav.subjects': 'Matérias',
    'nav.exercises': 'Exercícios',
    'nav.profile': 'Perfil',
    'nav.support': 'Suporte',
    'nav.ranking': 'Ranking',
    'nav.progress': 'Progresso',
    'nav.guilds': 'Guildas',
    
    // Perfil
    'profile.title': 'Perfil',
    'profile.language': 'Idioma',
    'profile.avatar': 'Avatar',
    'profile.upload_photo': 'Enviar Foto',
    'profile.save': 'Salvar',
    'profile.updated': 'Perfil atualizado com sucesso!',
    
    // Suporte
    'support.title': 'Suporte',
    'support.how_can_help': 'Como podemos ajudar você',
    'support.faq': 'Perguntas Frequentes',
    'support.contact': 'Entre em Contato',
    'support.request_type': 'Tipo de Solicitação',
    'support.subject': 'Assunto',
    'support.message': 'Mensagem',
    'support.send': 'Enviar Mensagem',
    'support.sent': 'Mensagem enviada! Responderemos em breve.',
    'support.question': 'Dúvida',
    'support.bug': 'Problema técnico',
    'support.suggestion': 'Sugestão',
    'support.other': 'Outro',
    
    // Configurações
    'settings_title': 'Configurações',
    'theme': 'Tema',
    'dark_mode': 'Modo Escuro',
    'enabled': 'Ativado',
    'disabled': 'Desativado',
    'language': 'Idioma',
    'sound': 'Som',
    'silent_mode': 'Modo Silencioso',
    'volume': 'Volume: {{value}}%',
    'app_settings': 'Configurações do App',
    'notifications': 'Notificações',
    'notifications_desc': 'Gerenciar notificações do aplicativo',
    'auto_backup': 'Backup Automático',
    'auto_backup_desc': 'Backup automático dos dados',
    'privacy': 'Privacidade',
    'data_usage': 'Uso de Dados',
    'data_usage_desc': 'Como seus dados são utilizados',
    'public_profile': 'Perfil Público',
    'public_profile_desc': 'Visibilidade do seu perfil',
    'help_support': 'Ajuda e Suporte',
    'help_center': 'Central de Ajuda',
    'help_center_desc': 'Encontre respostas para suas dúvidas',
    'contact': 'Contato',
    'contact_desc': 'Entre em contato conosco',
    'report_problem': 'Reportar Problema',
    'report_problem_desc': 'Relate problemas técnicos',
    'save_settings': 'Salvar Configurações',
    
    // Matérias
    'subject_math_name': 'Matemática',
    'subject_math_desc': 'Álgebra, geometria e cálculo',
    'subject_portuguese_name': 'Português',
    'subject_portuguese_desc': 'Gramática, literatura e redação',
    'subject_physics_name': 'Física',
    'subject_physics_desc': 'Mecânica, termodinâmica e ótica',
    'subject_chemistry_name': 'Química',
    'subject_chemistry_desc': 'Química orgânica e inorgânica',
    'subject_biology_name': 'Biologia',
    'subject_biology_desc': 'Genética, ecologia e anatomia',
    'subject_history_name': 'História',
    'subject_history_desc': 'História do Brasil e mundial',
    'subject_geography_name': 'Geografia',
    'subject_geography_desc': 'Geografia física e humana',
    'subject_philosophy_name': 'Filosofia',
    'subject_philosophy_desc': 'Filosofia clássica e contemporânea',
    'subject_sociology_name': 'Sociologia',
    'subject_sociology_desc': 'Sociedade, cultura e política',
    
    // Exercícios
    'exercises_title': 'Exercícios',
    'select_subject': 'Selecione uma matéria',
    'exercises_count': '{{count}} exercícios',
    'quiz_title': 'Quiz - {{subject}}',
    'activity_quiz_name': 'Quiz',
    'activity_quiz_desc': 'Teste seus conhecimentos',
    'difficulty_easy': 'Fácil',
    'difficulty_medium': 'Médio',
    'difficulty_hard': 'Difícil',
    
    // Geral
    'general.loading': 'Carregando...',
    'general.error': 'Erro',
    'general.success': 'Sucesso',
    'general.cancel': 'Cancelar',
    'general.confirm': 'Confirmar',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.subjects': 'Subjects',
    'nav.exercises': 'Exercises',
    'nav.profile': 'Profile',
    'nav.support': 'Support',
    'nav.ranking': 'Ranking',
    'nav.progress': 'Progress',
    'nav.guilds': 'Guilds',
    
    // Profile
    'profile.title': 'Profile',
    'profile.language': 'Language',
    'profile.avatar': 'Avatar',
    'profile.upload_photo': 'Upload Photo',
    'profile.save': 'Save',
    'profile.updated': 'Profile updated successfully!',
    
    // Support
    'support.title': 'Support',
    'support.how_can_help': 'How can we help you',
    'support.faq': 'Frequently Asked Questions',
    'support.contact': 'Contact Us',
    'support.request_type': 'Request Type',
    'support.subject': 'Subject',
    'support.message': 'Message',
    'support.send': 'Send Message',
    'support.sent': 'Message sent! We will respond soon.',
    'support.question': 'Question',
    'support.bug': 'Technical issue',
    'support.suggestion': 'Suggestion',
    'support.other': 'Other',
    
    // Settings
    'settings_title': 'Settings',
    'theme': 'Theme',
    'dark_mode': 'Dark Mode',
    'enabled': 'Enabled',
    'disabled': 'Disabled',
    'language': 'Language',
    'sound': 'Sound',
    'silent_mode': 'Silent Mode',
    'volume': 'Volume: {{value}}%',
    'app_settings': 'App Settings',
    'notifications': 'Notifications',
    'notifications_desc': 'Manage app notifications',
    'auto_backup': 'Auto Backup',
    'auto_backup_desc': 'Automatic data backup',
    'privacy': 'Privacy',
    'data_usage': 'Data Usage',
    'data_usage_desc': 'How your data is used',
    'public_profile': 'Public Profile',
    'public_profile_desc': 'Your profile visibility',
    'help_support': 'Help & Support',
    'help_center': 'Help Center',
    'help_center_desc': 'Find answers to your questions',
    'contact': 'Contact',
    'contact_desc': 'Get in touch with us',
    'report_problem': 'Report Problem',
    'report_problem_desc': 'Report technical issues',
    'save_settings': 'Save Settings',
    
    // Subjects
    'subject_math_name': 'Mathematics',
    'subject_math_desc': 'Algebra, geometry and calculus',
    'subject_portuguese_name': 'Portuguese',
    'subject_portuguese_desc': 'Grammar, literature and writing',
    'subject_physics_name': 'Physics',
    'subject_physics_desc': 'Mechanics, thermodynamics and optics',
    'subject_chemistry_name': 'Chemistry',
    'subject_chemistry_desc': 'Organic and inorganic chemistry',
    'subject_biology_name': 'Biology',
    'subject_biology_desc': 'Genetics, ecology and anatomy',
    'subject_history_name': 'History',
    'subject_history_desc': 'Brazilian and world history',
    'subject_geography_name': 'Geography',
    'subject_geography_desc': 'Physical and human geography',
    'subject_philosophy_name': 'Philosophy',
    'subject_philosophy_desc': 'Classical and contemporary philosophy',
    'subject_sociology_name': 'Sociology',
    'subject_sociology_desc': 'Society, culture and politics',
    
    // Exercises
    'exercises_title': 'Exercises',
    'select_subject': 'Select a subject',
    'exercises_count': '{{count}} exercises',
    'quiz_title': 'Quiz - {{subject}}',
    'activity_quiz_name': 'Quiz',
    'activity_quiz_desc': 'Test your knowledge',
    'difficulty_easy': 'Easy',
    'difficulty_medium': 'Medium',
    'difficulty_hard': 'Hard',
    
    // General
    'general.loading': 'Loading...',
    'general.error': 'Error',
    'general.success': 'Success',
    'general.cancel': 'Cancel',
    'general.confirm': 'Confirm',
  },
  es: {
    // Navegación
    'nav.dashboard': 'Dashboard',
    'nav.subjects': 'Materias',
    'nav.exercises': 'Ejercicios',
    'nav.profile': 'Perfil',
    'nav.support': 'Soporte',
    'nav.ranking': 'Ranking',
    'nav.progress': 'Progreso',
    'nav.guilds': 'Gremios',
    
    // Perfil
    'profile.title': 'Perfil',
    'profile.language': 'Idioma',
    'profile.avatar': 'Avatar',
    'profile.upload_photo': 'Subir Foto',
    'profile.save': 'Guardar',
    'profile.updated': '¡Perfil actualizado con éxito!',
    
    // Soporte
    'support.title': 'Soporte',
    'support.how_can_help': 'Cómo podemos ayudarte',
    'support.faq': 'Preguntas Frecuentes',
    'support.contact': 'Contáctanos',
    'support.request_type': 'Tipo de Solicitud',
    'support.subject': 'Asunto',
    'support.message': 'Mensaje',
    'support.send': 'Enviar Mensaje',
    'support.sent': '¡Mensaje enviado! Responderemos pronto.',
    'support.question': 'Pregunta',
    'support.bug': 'Problema técnico',
    'support.suggestion': 'Sugerencia',
    'support.other': 'Otro',
    
    // Configuraciones
    'settings_title': 'Configuraciones',
    'theme': 'Tema',
    'dark_mode': 'Modo Oscuro',
    'enabled': 'Activado',
    'disabled': 'Desactivado',
    'language': 'Idioma',
    'sound': 'Sonido',
    'silent_mode': 'Modo Silencioso',
    'volume': 'Volumen: {{value}}%',
    'app_settings': 'Configuraciones de la App',
    'notifications': 'Notificaciones',
    'notifications_desc': 'Gestionar notificaciones de la aplicación',
    'auto_backup': 'Respaldo Automático',
    'auto_backup_desc': 'Respaldo automático de datos',
    'privacy': 'Privacidad',
    'data_usage': 'Uso de Datos',
    'data_usage_desc': 'Cómo se usan tus datos',
    'public_profile': 'Perfil Público',
    'public_profile_desc': 'Visibilidad de tu perfil',
    'help_support': 'Ayuda y Soporte',
    'help_center': 'Centro de Ayuda',
    'help_center_desc': 'Encuentra respuestas a tus preguntas',
    'contact': 'Contacto',
    'contact_desc': 'Ponte en contacto con nosotros',
    'report_problem': 'Reportar Problema',
    'report_problem_desc': 'Reportar problemas técnicos',
    'save_settings': 'Guardar Configuraciones',
    
    // Materias
    'subject_math_name': 'Matemáticas',
    'subject_math_desc': 'Álgebra, geometría y cálculo',
    'subject_portuguese_name': 'Portugués',
    'subject_portuguese_desc': 'Gramática, literatura y redacción',
    'subject_physics_name': 'Física',
    'subject_physics_desc': 'Mecánica, termodinámica y óptica',
    'subject_chemistry_name': 'Química',
    'subject_chemistry_desc': 'Química orgánica e inorgánica',
    'subject_biology_name': 'Biología',
    'subject_biology_desc': 'Genética, ecología y anatomía',
    'subject_history_name': 'Historia',
    'subject_history_desc': 'Historia de Brasil y mundial',
    'subject_geography_name': 'Geografía',
    'subject_geography_desc': 'Geografía física y humana',
    'subject_philosophy_name': 'Filosofía',
    'subject_philosophy_desc': 'Filosofía clásica y contemporánea',
    'subject_sociology_name': 'Sociología',
    'subject_sociology_desc': 'Sociedad, cultura y política',
    
    // Ejercicios
    'exercises_title': 'Ejercicios',
    'select_subject': 'Selecciona una materia',
    'exercises_count': '{{count}} ejercicios',
    'quiz_title': 'Quiz - {{subject}}',
    'activity_quiz_name': 'Quiz',
    'activity_quiz_desc': 'Prueba tus conocimientos',
    'difficulty_easy': 'Fácil',
    'difficulty_medium': 'Medio',
    'difficulty_hard': 'Difícil',
    
    // General
    'general.loading': 'Cargando...',
    'general.error': 'Error',
    'general.success': 'Éxito',
    'general.cancel': 'Cancelar',
    'general.confirm': 'Confirmar',
  }
};

const availableLanguages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string, params?: Record<string, any>): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    // Handle template variables like {{count}} or {{subject}}
    if (params && typeof translation === 'string') {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), params[paramKey]);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: availableLanguages, t }}>
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

export default LanguageProvider;
