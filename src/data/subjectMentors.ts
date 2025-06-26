
export interface SubjectMentor {
  id: string;
  name: string;
  subject: string;
  title: string;
  description: string;
  personality: string;
  catchPhrase: string;
  welcomeMessage: string;
  encouragementMessages: string[];
  hintStyle: string;
  celebrationStyle: string;
  avatar: string;
  color: string;
  backgroundColor: string;
}

export const SUBJECT_MENTORS: SubjectMentor[] = [
  {
    id: 'pitagoras',
    name: 'Pitágoras',
    subject: 'matematica',
    title: 'O Mestre dos Números',
    description: 'Filósofo e matemático grego, criador do famoso teorema.',
    personality: 'Sábio, místico e apaixonado por padrões geométricos.',
    catchPhrase: 'A harmonia está nos números!',
    welcomeMessage: 'Olá, jovem aprendiz! Bem-vindo ao reino dos números e da harmonia. Aqui descobriremos que a matemática é a linguagem do universo!',
    encouragementMessages: [
      'Excelente! Você está encontrando a harmonia nos números.',
      'Magnífico! A beleza da matemática se revela para você.',
      'Perfeito! Como uma melodia, seus cálculos fluem naturalmente.'
    ],
    hintStyle: 'Pense geometricamente... visualize os padrões.',
    celebrationStyle: 'Uma reverência sábia com símbolos geométricos dançando ao redor',
    avatar: '🧙‍♂️',
    color: '#3B82F6',
    backgroundColor: '#EBF8FF'
  },
  {
    id: 'einstein',
    name: 'Albert Einstein',
    subject: 'fisica',
    title: 'O Gênio da Relatividade',
    description: 'Físico alemão que revolucionou nossa compreensão do universo.',
    personality: 'Curioso, brincalhão e sempre questionando.',
    catchPhrase: 'A imaginação é mais importante que o conhecimento!',
    welcomeMessage: 'Olá! Pronto para desvendar os segredos do universo? A imaginação é nossa maior ferramenta aqui!',
    encouragementMessages: [
      'Fantástico! Você está pensando como um verdadeiro físico.',
      'Excelente! A curiosidade é o motor da descoberta.',
      'Brilhante! O universo está revelando seus segredos para você.'
    ],
    hintStyle: 'Faça um experimento mental... o que aconteceria se...?',
    celebrationStyle: 'Mexe o cabelo bagunçado e pisca com um sorrisinho maroto',
    avatar: '👨‍🔬',
    color: '#8B5CF6',
    backgroundColor: '#F3E8FF'
  },
  {
    id: 'marie_curie',
    name: 'Marie Curie',
    subject: 'quimica',
    title: 'A Pioneira da Radioatividade',
    description: 'Primeira mulher a ganhar um Prêmio Nobel e única a ganhar em duas áreas.',
    personality: 'Determinada, persistente e pioneira.',
    catchPhrase: 'A persistência é o caminho para a descoberta!',
    welcomeMessage: 'Bem-vinda ao laboratório! Aqui, cada experimento é uma jornada de descoberta. Vamos explorar o mundo molecular juntos!',
    encouragementMessages: [
      'Excelente trabalho! Cada tópico que você domina é um passo à frente na fronteira do conhecimento.',
      'Magnífico! A persistência sempre leva à descoberta.',
      'Brilhante! Você está dominando os elementos como uma verdadeira cientista.'
    ],
    hintStyle: 'Observe as reações... cada elemento tem sua personalidade.',
    celebrationStyle: 'Ergue o frasco com substância brilhante em comemoração',
    avatar: '👩‍🔬',
    color: '#10B981',
    backgroundColor: '#ECFDF5'
  },
  {
    id: 'darwin',
    name: 'Charles Darwin',
    subject: 'biologia',
    title: 'O Naturalista Evolucionista',
    description: 'Naturalista inglês que desenvolveu a teoria da evolução.',
    personality: 'Observador, paciente e fascinado pela natureza.',
    catchPhrase: 'A vida encontra sempre um caminho!',
    welcomeMessage: 'Olá, jovem naturalista! Prepare-se para uma jornada fascinante pelo mundo dos seres vivos. A natureza tem milhões de histórias para contar!',
    encouragementMessages: [
      'Excelente observação! Você está desenvolvendo o olhar de um naturalista.',
      'Fantástico! A natureza está revelando seus segredos para você.',
      'Brilhante! Cada descoberta é um passo na evolução do conhecimento.'
    ],
    hintStyle: 'Pense nisto: que vantagem adaptativa isso ofereceria?',
    celebrationStyle: 'Observa através da lupa com um passarinho pousado no ombro',
    avatar: '🔬',
    color: '#059669',
    backgroundColor: '#D1FAE5'
  },
  {
    id: 'zumbi',
    name: 'Zumbi dos Palmares',
    subject: 'historia',
    title: 'O Líder Quilombola',
    description: 'Líder do Quilombo dos Palmares e símbolo da resistência.',
    personality: 'Corajoso, líder nato e defensor da liberdade.',
    catchPhrase: 'A liberdade não se dá, se conquista!',
    welcomeMessage: 'Salve, jovem guerreiro do saber! Vamos juntos desbravar os caminhos da nossa história. Cada lição é uma batalha conquistada!',
    encouragementMessages: [
      'Guerreiro! Você está conquistando o conhecimento como um verdadeiro líder.',
      'Excelente! A história está sendo desvendada por suas próprias mãos.',
      'Magnífico! Cada resposta certa é uma vitória na batalha do saber.'
    ],
    hintStyle: 'Pense como um líder... que estratégias foram usadas?',
    celebrationStyle: 'Levanta a lança em sinal de vitória com um grito de guerra',
    avatar: '🗡️',
    color: '#DC2626',
    backgroundColor: '#FEF2F2'
  },
  {
    id: 'rui_barbosa',
    name: 'Rui Barbosa',
    subject: 'portugues',
    title: 'A Águia de Haia',
    description: 'Jurista, político e grande orador brasileiro.',
    personality: 'Eloquente, erudito e defensor da educação.',
    catchPhrase: 'A palavra bem colocada é a chave do conhecimento!',
    welcomeMessage: 'Meu caro estudante, bem-vindo ao universo da nossa bela língua portuguesa! Aqui, cada palavra tem poder e cada frase constrói o futuro.',
    encouragementMessages: [
      'Excelente! Sua eloquência está se desenvolvendo magnificamente.',
      'Brilhante! As palavras fluem de você como de um verdadeiro orador.',
      'Magnífico! A língua portuguesa está sendo honrada por você.'
    ],
    hintStyle: 'Uma pequena imprecisão, meu caro. Vamos revisar a regra para garantir a clareza.',
    celebrationStyle: 'Faz uma reverência elegante ajustando o pince-nez',
    avatar: '🎩',
    color: '#7C2D12',
    backgroundColor: '#FEF7ED'
  },
  {
    id: 'pedro_teixeira',
    name: 'Pedro Teixeira',
    subject: 'geografia',
    title: 'O Desbravador do Brasil',
    description: 'Bandeirante e explorador que mapeou o território brasileiro.',
    personality: 'Aventureiro, corajoso e conhecedor das terras.',
    catchPhrase: 'Cada lugar tem sua história para contar!',
    welcomeMessage: 'Salve, jovem explorador! Vamos juntos desbravar os mistérios da Terra. Cada mapa é uma nova aventura esperando!',
    encouragementMessages: [
      'Excelente navegação! Você está se tornando um verdadeiro explorador.',
      'Fantástico! Seus conhecimentos geográficos estão se expandindo como um mapa.',
      'Brilhante! Você está dominando os territórios do saber.'
    ],
    hintStyle: 'Observe o terreno... que pistas a geografia nos dá?',
    celebrationStyle: 'Aponta para o horizonte com o mapa desenrolado ao vento',
    avatar: '🗺️',
    color: '#0D9488',
    backgroundColor: '#F0FDFA'
  },
  {
    id: 'socrates',
    name: 'Sócrates',
    subject: 'filosofia',
    title: 'O Pai da Filosofia',
    description: 'Filósofo grego criador do método socrático de ensino.',
    personality: 'Questionador, humilde e sempre em busca da verdade.',
    catchPhrase: 'Só sei que nada sei!',
    welcomeMessage: 'Olá, jovem pensador! Bem-vindo ao mundo das grandes questões. Aqui, cada pergunta é mais valiosa que mil respostas prontas.',
    encouragementMessages: [
      'Excelente reflexão! Você está questionando como um verdadeiro filósofo.',
      'Magnífico! O pensamento crítico está florescendo em você.',
      'Brilhante! Cada questão que você faz expande os horizontes da mente.'
    ],
    hintStyle: 'Interessante. Por que você chegou a essa conclusão? Vamos reexaminar suas premissas.',
    celebrationStyle: 'Gesticula pensativo com o dedo no queixo, em posição de reflexão',
    avatar: '🤔',
    color: '#6366F1',
    backgroundColor: '#EEF2FF'
  },
  {
    id: 'florestan',
    name: 'Florestan Fernandes',
    subject: 'sociologia',
    title: 'O Sociólogo do Povo',
    description: 'Sociólogo brasileiro e defensor da educação pública.',
    personality: 'Crítico, engajado e dedicado à educação.',
    catchPhrase: 'A educação transforma a sociedade!',
    welcomeMessage: 'Olá, jovem sociólogo! Vamos juntos entender como a sociedade funciona. Cada conceito é uma ferramenta para transformar o mundo!',
    encouragementMessages: [
      'Excelente análise! Você está desenvolvendo um olhar sociológico aguçado.',
      'Fantástico! A sociedade se revela através do seu conhecimento.',
      'Brilhante! Cada conceito que você aprende é um passo rumo à transformação.'
    ],
    hintStyle: 'Pense criticamente... como isso afeta a estrutura social?',
    celebrationStyle: 'Levanta o punho em sinal de luta pela educação',
    avatar: '📊',
    color: '#BE185D',
    backgroundColor: '#FDF2F8'
  }
];

export const getMentorBySubject = (subject: string): SubjectMentor | undefined => {
  return SUBJECT_MENTORS.find(mentor => mentor.subject === subject);
};

export const getAllMentors = (): SubjectMentor[] => {
  return SUBJECT_MENTORS;
};
