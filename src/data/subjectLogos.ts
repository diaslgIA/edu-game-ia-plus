
import { getMentorBySubject } from './subjectMentors';

interface SubjectLogoData {
  imageUrl?: string;
  mentorAvatar?: string;
  emoji: string;
  color?: string;
  backgroundColor?: string;
}

const subjectLogos: Record<string, SubjectLogoData> = {
  matematica: {
    emoji: '🔢',
  },
  fisica: {
    emoji: '⚛️',
  },
  quimica: {
    emoji: '🧪',
  },
  biologia: {
    imageUrl: '/lovable-uploads/darwin_acerto.png',
    emoji: '🧬',
  },
  geografia: {
    emoji: '🌍',
  },
  sociologia: {
    imageUrl: '/lovable-uploads/florestan_acerto.png',
    emoji: '👥',
  },
  portugues: {
    imageUrl: '/lovable-uploads/rui_barbosa_acerto.png',
    emoji: '📝',
  },
  literatura: {
    emoji: '📚',
  },
  ingles: {
    imageUrl: '/lovable-uploads/shakespeare_acerto.png',
    emoji: '🇬🇧',
  },
  espanhol: {
    emoji: '🇪🇸',
  },
  filosofia: {
    imageUrl: '/lovable-uploads/socrates_acerto.png',
    emoji: '🤔',
  },
  historia: {
    imageUrl: '/lovable-uploads/zumbi_acerto.png',
    emoji: '📜',
  },
};

export const getSubjectLogo = (subject: string): string | null => {
  const subjectKey = subject.toLowerCase();
  const logoData = subjectLogos[subjectKey];
  
  if (logoData?.imageUrl) {
    return logoData.imageUrl;
  }
  
  return null;
};

export const getSubjectEmoji = (subject: string): string => {
  const subjectKey = subject.toLowerCase();
  const logoData = subjectLogos[subjectKey];
  return logoData?.emoji || '📚';
};

export const getSubjectMentorAvatar = (subject: string): string => {
  const mentor = getMentorBySubject(subject);
  return mentor?.avatar || '📚';
};

export const getSubjectStyle = (subject: string) => {
  const mentor = getMentorBySubject(subject);
  return {
    color: mentor?.color || '#3B82F6',
    backgroundColor: mentor?.backgroundColor || '#EBF8FF',
  };
};

export const getSubjectDisplayName = (subject: string): string => {
  const displayNames: Record<string, string> = {
    portugues: 'Português',
    matematica: 'Matemática',
    historia: 'História',
    geografia: 'Geografia',
    fisica: 'Física',
    quimica: 'Química',
    biologia: 'Biologia',
    filosofia: 'Filosofia',
    sociologia: 'Sociologia',
    ingles: 'Inglês',
    espanhol: 'Espanhol',
    literatura: 'Literatura',
  };
  
  return displayNames[subject.toLowerCase()] || subject;
};
