
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
