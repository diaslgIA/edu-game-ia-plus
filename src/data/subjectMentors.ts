
export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  backgroundColor: string;
  subject: string;
  welcomeMessage: string;
  catchPhrase: string;
  hintStyle: string;
  encouragementMessages: string[];
}

const mentors: Mentor[] = [
  {
    id: 'pitagoras',
    name: 'Pitágoras',
    title: 'O Sábio Místico dos Números',
    avatar: '📐',
    color: '#3B82F6',
    backgroundColor: '#EBF8FF',
    subject: 'Matemática',
    welcomeMessage: 'Bem-vindo, buscador da ordem. Que segredo cósmico os números nos revelarão hoje?',
    catchPhrase: 'Tudo é número, proporção e harmonia.',
    hintStyle: 'Observe as proporções e padrões...',
    encouragementMessages: [
      'Harmonioso! Você ouviu a música dos números.',
      'Continue... a melodia está começando a se formar.',
      'Perfeito! A ordem do universo se revela para você.'
    ]
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    title: 'O Gênio Imaginativo',
    avatar: '⚛️',
    color: '#7C3AED',
    backgroundColor: '#F3E8FF',
    subject: 'Física',
    welcomeMessage: 'Ah, olá! Estava aqui pensando... que grande quebra-cabeça cósmico vamos tentar resolver juntos hoje?',
    catchPhrase: 'A imaginação é mais importante que o conhecimento.',
    hintStyle: 'Imagine um experimento mental...',
    encouragementMessages: [
      'Relativamente brilhante! Sua imaginação desvendou uma lei do universo.',
      'Fantástico! Uma pergunta maravilhosa!',
      'Excelente! Continue com essa curiosidade.'
    ]
  },
  {
    id: 'marie_curie',
    name: 'Marie Curie',
    title: 'A Pioneira Radiante',
    avatar: '🧪',
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    subject: 'Química',
    welcomeMessage: 'Olá, jovem cientista! Pronto para explorar os mistérios da matéria?',
    catchPhrase: 'Nada na vida deve ser temido, apenas compreendido.',
    hintStyle: 'Pense nas reações e transformações...',
    encouragementMessages: [
      'Brilhante! Você descobriu algo luminoso!',
      'Perfeito! A ciência está em suas mãos.',
      'Excelente trabalho, futuro cientista!'
    ]
  },
  {
    id: 'darwin',
    name: 'Charles Darwin',
    title: 'O Explorador da Vida',
    avatar: '🦎',
    color: '#10B981',
    backgroundColor: '#D1FAE5',
    subject: 'Biologia',
    welcomeMessage: 'Saudações, jovem naturalista! Vamos explorar os mistérios da vida juntos?',
    catchPhrase: 'Não é o mais forte que sobrevive, mas o que melhor se adapta.',
    hintStyle: 'Observe a natureza e suas adaptações...',
    encouragementMessages: [
      'Evolução em ação! Você se adaptou perfeitamente ao desafio.',
      'Natural! Sua compreensão está evoluindo.',
      'Selecionado! Você possui as melhores características.'
    ]
  },
  {
    id: 'camoes',
    name: 'Luís de Camões',
    title: 'O Poeta das Palavras',
    avatar: '📚',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    subject: 'Português',
    welcomeMessage: 'Salve, amante das letras! Que aventura literária viveremos hoje?',
    catchPhrase: 'Amor é fogo que arde sem se ver.',
    hintStyle: 'Preste atenção às palavras e seus significados...',
    encouragementMessages: [
      'Épico! Suas palavras ecoam pelos séculos.',
      'Lírico! Você dominou a arte da linguagem.',
      'Sublime! A literatura vive em você.'
    ]
  },
  {
    id: 'herodoto',
    name: 'Heródoto',
    title: 'O Pai da História',
    avatar: '🏛️',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    subject: 'História',
    welcomeMessage: 'Salve, jovem historiador! Que páginas do passado descobriremos hoje?',
    catchPhrase: 'A história é mestra da vida.',
    hintStyle: 'Conecte os eventos e suas consequências...',
    encouragementMessages: [
      'Histórico! Você desvendou os segredos do passado.',
      'Memorável! Seu conhecimento atravessa os tempos.',
      'Épico! A história vive através de você.'
    ]
  }
];

export const getMentorBySubject = (subject: string): Mentor | null => {
  // Mapear nomes de matérias para mentores
  const subjectMapping: { [key: string]: string } = {
    'Matemática': 'pitagoras',
    'matematica': 'pitagoras',
    'Física': 'einstein',
    'fisica': 'einstein',
    'Química': 'marie_curie',
    'quimica': 'marie_curie',
    'Biologia': 'darwin',
    'biologia': 'darwin',
    'Português': 'camoes',
    'portugues': 'camoes',
    'História': 'herodoto',
    'historia': 'herodoto'
  };

  const mentorId = subjectMapping[subject];
  return mentors.find(m => m.id === mentorId) || mentors[0]; // Fallback para Pitágoras
};

export const getAllMentors = (): Mentor[] => {
  return mentors;
};

export default mentors;
