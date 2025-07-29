
// Updated mentor mapping to match standardized subject names
export const subjectMentors: Record<string, string> = {
  'Matemática': 'pitagoras',
  'Português': 'ruibarbosa',
  'Física': 'einstein',
  'Química': 'marie-curie',
  'Biologia': 'darwin',
  'História': 'florestan',
  'Geografia': 'florestan', // Using Florestan for Geography as well
  'Filosofia': 'florestan', // Using Florestan for Philosophy as well
  'Sociologia': 'florestan' // Using Florestan for Sociology as well
};

export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  backgroundColor: string;
  welcomeMessage: string;
  catchPhrase: string;
  encouragementMessages: string[];
  hintStyle: string;
}

export const mentorInfo: Record<string, { name: string; expertise: string; description: string }> = {
  'pitagoras': {
    name: 'Pitágoras',
    expertise: 'Matemática',
    description: 'O grande matemático grego que nos ensina os fundamentos da matemática com sabedoria milenar.'
  },
  'ruibarbosa': {
    name: 'Rui Barbosa',
    expertise: 'Português',
    description: 'O águia de Haia, mestre das letras e da eloquência da língua portuguesa.'
  },
  'einstein': {
    name: 'Albert Einstein',
    expertise: 'Física',
    description: 'O gênio da física moderna que revolucionou nossa compreensão do universo.'
  },
  'marie-curie': {
    name: 'Marie Curie',
    expertise: 'Química',
    description: 'A pioneira da química e física, primeira mulher a ganhar um Nobel.'
  },
  'darwin': {
    name: 'Charles Darwin',
    expertise: 'Biologia',
    description: 'O naturalista que transformou nossa compreensão da vida e evolução.'
  },
  'florestan': {
    name: 'Florestan Fernandes',
    expertise: 'Ciências Humanas',
    description: 'O sociólogo brasileiro que nos ajuda a entender a sociedade e a história.'
  }
};

const mentorsData: Record<string, Mentor> = {
  'pitagoras': {
    id: 'pitagoras',
    name: 'Pitágoras',
    title: 'O Matemático Grego',
    avatar: '🧙‍♂️',
    color: '#3B82F6',
    backgroundColor: '#EBF8FF',
    welcomeMessage: 'Salve, jovem aprendiz! Sou Pitágoras e vou te guiar pelo mundo fascinante dos números e formas geométricas.',
    catchPhrase: 'Tudo é número!',
    encouragementMessages: [
      'Excelente! A matemática flui através de você!',
      'Perfeito! Os números dançam em harmonia!',
      'Magnífico! A geometria sorri para você!'
    ],
    hintStyle: 'Pense nos fundamentos... Como diria meu teorema:'
  },
  'ruibarbosa': {
    id: 'ruibarbosa',
    name: 'Rui Barbosa',
    title: 'O Águia de Haia',
    avatar: '👨‍💼',
    color: '#10B981',
    backgroundColor: '#F0FDF4',
    welcomeMessage: 'Saudações! Sou Rui Barbosa, e juntos exploraremos a beleza e precisão da língua portuguesa.',
    catchPhrase: 'A palavra é a mais bela das artes!',
    encouragementMessages: [
      'Sublime! Sua eloquência impressiona!',
      'Brilhante! As palavras obedecem ao seu comando!',
      'Esplêndido! A gramática se curva à sua sabedoria!'
    ],
    hintStyle: 'Observe a estrutura da frase... Lembre-se:'
  },
  'einstein': {
    id: 'einstein',
    name: 'Albert Einstein',
    title: 'O Gênio da Física',
    avatar: '👨‍🔬',
    color: '#8B5CF6',
    backgroundColor: '#FAF5FF',
    welcomeMessage: 'Olá! Sou Einstein, e hoje vamos desvendar os mistérios do universo através da física!',
    catchPhrase: 'A imaginação é mais importante que o conhecimento!',
    encouragementMessages: [
      'Fantástico! O universo se revela para você!',
      'Genial! A física não tem segredos para você!',
      'Extraordinário! As leis da natureza são suas amigas!'
    ],
    hintStyle: 'Pense fora da caixa... Como sempre digo:'
  },
  'marie-curie': {
    id: 'marie-curie',
    name: 'Marie Curie',
    title: 'A Pioneira da Química',
    avatar: '👩‍🔬',
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    welcomeMessage: 'Bonjour! Sou Marie Curie, e vamos explorar os segredos da matéria e suas transformações!',
    catchPhrase: 'Nada na vida deve ser temido, apenas compreendido!',
    encouragementMessages: [
      'Magnífico! Os elementos se curvam à sua vontade!',
      'Perfeito! A química flui em suas veias!',
      'Extraordinário! As reações obedecem ao seu comando!'
    ],
    hintStyle: 'Observe as reações... Lembre-se:'
  },
  'darwin': {
    id: 'darwin',
    name: 'Charles Darwin',
    title: 'O Naturalista',
    avatar: '👨‍🌾',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    welcomeMessage: 'Saudações, jovem naturalista! Sou Darwin, e vamos explorar os mistérios da vida!',
    catchPhrase: 'A natureza não dá saltos!',
    encouragementMessages: [
      'Esplêndido! A vida se revela em toda sua complexidade!',
      'Magnífico! A evolução sorri para você!',
      'Perfeito! A natureza não tem segredos para você!'
    ],
    hintStyle: 'Observe a natureza... Como sempre notei:'
  },
  'florestan': {
    id: 'florestan',
    name: 'Florestan Fernandes',
    title: 'O Sociólogo Brasileiro',
    avatar: '👨‍🏫',
    color: '#DC2626',
    backgroundColor: '#FEF2F2',
    welcomeMessage: 'Salve! Sou Florestan Fernandes, e vamos compreender a sociedade e suas transformações!',
    catchPhrase: 'A educação é a alavanca da transformação social!',
    encouragementMessages: [
      'Excelente! A sociedade se revela em suas múltiplas facetas!',
      'Brilhante! A história não tem segredos para você!',
      'Magnífico! O conhecimento liberta!'
    ],
    hintStyle: 'Reflita sobre o contexto social... Como sempre analiso:'
  }
};

export const getMentorBySubject = (subject: string): Mentor | null => {
  const mentorId = subjectMentors[subject];
  return mentorId ? mentorsData[mentorId] : null;
};

export const getAllMentors = (): Mentor[] => {
  return Object.values(mentorsData);
};

export const getMentorById = (mentorId: string): Mentor | null => {
  return mentorsData[mentorId] || null;
};
