
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
    emoji: '🧬',
  },
  geografia: {
    emoji: '🌍',
  },
  sociologia: {
    emoji: '👥',
  },
  portugues: {
    emoji: '📝',
  },
  literatura: {
    emoji: '📚',
  },
  ingles: {
    emoji: '🇬🇧',
  },
  espanhol: {
    emoji: '🇪🇸',
  },
  filosofia: {
    emoji: '🤔',
  },
  historia: {
    emoji: '📜',
  },
};

export const getSubjectLogo = (subject: string): string | null => {
  // Return null to force using only emojis
  return null;
};

export const getSubjectEmoji = (subject: string): string => {
  const subjectKey = subject.toLowerCase();
  const logoData = subjectLogos[subjectKey];
  return logoData?.emoji || '📚';
};

export const getSubjectFeedbackImage = (subject: string, isCorrect: boolean): string | null => {
  const subjectKey = subject.toLowerCase();
  const imageMap: Record<string, { correct: string; incorrect: string }> = {
    biologia: {
      correct: '/lovable-uploads/darwin_acerto.png',
      incorrect: '/lovable-uploads/darwin_erro.png'
    },
    sociologia: {
      correct: '/lovable-uploads/florestan_acerto.png',
      incorrect: '/lovable-uploads/florestan_erro.png'
    },
    portugues: {
      correct: '/lovable-uploads/rui_barbosa_acerto.png',
      incorrect: '/lovable-uploads/rui_barbosa_erro.png'
    },
    ingles: {
      correct: '/lovable-uploads/shakespeare_acerto.png',
      incorrect: '/lovable-uploads/shakespeare_erro.png'
    },
    filosofia: {
      correct: '/lovable-uploads/socrates_acerto.png',
      incorrect: '/lovable-uploads/socrates_erro.png'
    },
    historia: {
      correct: '/lovable-uploads/zumbi_acerto.png',
      incorrect: '/lovable-uploads/zumbi_erro.png'
    },
    matematica: {
      correct: '/lovable-uploads/16c5ab46-fefb-4500-b014-61ad1a76ecdb.png',
      incorrect: '/lovable-uploads/aa8608bd-977f-4477-bc38-567090ca4dd5.png'
    },
    geografia: {
      correct: '/lovable-uploads/4a6ab076-c5a3-4e8d-88e1-247c45c5c7b8.png',
      incorrect: '/lovable-uploads/839f35ec-89e3-4693-ba7d-ad97d81aa349.png'
    }
  };

  const images = imageMap[subjectKey];
  if (images) {
    return isCorrect ? images.correct : images.incorrect;
  }
  return null;
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
