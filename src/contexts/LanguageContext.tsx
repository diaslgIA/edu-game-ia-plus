
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
    
    // General
    'general.loading': 'Cargando...',
    'general.error': 'Error',
    'general.success': 'Éxito',
    'general.cancel': 'Cancelar',
    'general.confirm': 'Confirmar',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
</LanguageContext.Provider>

export default LanguageProvider;
