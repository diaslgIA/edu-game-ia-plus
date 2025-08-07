
export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  backgroundColor: string;
  subject: string;
  description: string;
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
    description: 'Filósofo e matemático grego, fundador da escola pitagórica. Acreditava que os números eram a essência de todas as coisas e que a harmonia matemática governava o universo.',
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
    description: 'Físico teórico alemão, desenvolveu a teoria da relatividade e revolucionou nossa compreensão do espaço, tempo e gravidade. Ganhador do Prêmio Nobel de Física.',
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
    description: 'Física e química polonesa, primeira mulher a ganhar um Prêmio Nobel e única pessoa a ganhar Nobel em duas áreas científicas diferentes. Pioneira no estudo da radioatividade.',
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
    description: 'Naturalista britânico que propôs a teoria da evolução por seleção natural, revolucionando nossa compreensão sobre a origem e desenvolvimento das espécies.',
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
    id: 'rui_barbosa',
    name: 'Rui Barbosa',
    title: 'O Guardião da Língua',
    avatar: '⚖️',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    subject: 'Português',
    description: 'Jurista, diplomata e escritor brasileiro, conhecido como "Águia de Haia". Era um mestre da língua portuguesa, valorizando a precisão, a clareza e a eloquência.',
    welcomeMessage: 'Prezado(a) estudante, a precisão da linguagem é o pilar do pensamento. Vamos começar?',
    catchPhrase: 'A palavra é a ferramenta mais poderosa.',
    hintStyle: 'Analise a estrutura da frase com a precisão de um jurista.',
    encouragementMessages: [
      'Irretocável! Uma construção frasal digna de um mestre.',
      'Magnífico! A clareza do seu raciocínio é evidente.',
      'Excelente! Você domina as nuances do nosso idioma.'
    ]
  },
  {
    id: 'zumbi_palmares',
    name: 'Zumbi dos Palmares',
    title: 'O Líder da Liberdade',
    avatar: '🛡️',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    subject: 'História',
    description: 'Último dos líderes do Quilombo dos Palmares, o maior dos quilombos do período colonial. Um símbolo de resistência e luta pela liberdade contra a escravidão.',
    welcomeMessage: 'A liberdade se conquista a cada dia. Conhecer nossa história é o primeiro passo. Vamos à luta?',
    catchPhrase: 'A resistência é a nossa maior força.',
    hintStyle: 'Analise o campo de batalha e as estratégias de cada lado.',
    encouragementMessages: [
      'Vitória! Você tem a estratégia e a coragem de um líder.',
      'Resistência! Continue firme em seu propósito.',
      'Forte! Seu conhecimento do passado ilumina o futuro.'
    ]
  },
  {
    id: 'pedro_teixeira',
    name: 'Pedro Teixeira',
    title: 'O Desbravador Cartógrafo',
    avatar: '🗺️',
    color: '#16A34A',
    backgroundColor: '#F0FFF4',
    subject: 'Geografia',
    description: 'Explorador português do século XVII que liderou a primeira expedição a percorrer todo o rio Amazonas, mapeando e garantindo vastos territórios para o Brasil.',
    welcomeMessage: 'Olá, explorador(a)! Temos novos territórios do conhecimento para mapear hoje. Pronto?',
    catchPhrase: 'Para entender o mundo, é preciso explorá-lo.',
    hintStyle: 'Observe o relevo, os rios... a resposta está na paisagem.',
    encouragementMessages: [
      'Território conquistado! Você leu o mapa com perfeição.',
      'Excelente! Sua visão geográfica é ampla.',
      'Descoberta! Você encontrou o caminho certo.'
    ]
  },
  {
    id: 'machado_assis',
    name: 'Machado de Assis',
    title: 'O Mestre da Ironia',
    avatar: '🧐',
    color: '#A16207',
    backgroundColor: '#FFFBEB',
    subject: 'Literatura',
    description: 'Considerado por muitos o maior nome da literatura brasileira. Mestre do realismo, da ironia e da análise psicológica dos personagens e da sociedade de sua época.',
    welcomeMessage: 'Meu caro, que bom vê-lo. Temos algumas aparências para analisar hoje...',
    catchPhrase: 'A verdade, muitas vezes, reside no que é omitido.',
    hintStyle: 'Leia nas entrelinhas. O que o narrador não está dizendo?',
    encouragementMessages: [
      'Arguto. Uma observação digna de nota de rodapé.',
      'Sublime. Você capturou a essência da alma humana.',
      'Perspicaz! Nem mesmo Capitu dissimularia tão bem.'
    ]
  },
  {
    id: 'socrates',
    name: 'Sócrates',
    title: 'O Eterno Questionador',
    avatar: '🤔',
    color: '#8B5CF6',
    backgroundColor: '#F5F3FF',
    subject: 'Filosofia',
    description: 'Filósofo grego de Atenas, um dos fundadores da filosofia ocidental. Famoso por seu método de questionamento (maiêutica) e por sua frase "Só sei que nada sei".',
    welcomeMessage: 'Olá. Venho em paz. Mas tenho perguntas. Você também tem?',
    catchPhrase: 'Uma vida não examinada não vale a pena ser vivida.',
    hintStyle: 'Não aceite a primeira resposta. Pergunte o porquê do porquê.',
    encouragementMessages: [
      'Interessante! Sua pergunta é melhor que a resposta.',
      'Veja só! Ao questionar, você encontrou um caminho.',
      'Conhece-te a ti mesmo. Você está no caminho certo.'
    ]
  },
  {
    id: 'florestan_fernandes',
    name: 'Florestan Fernandes',
    title: 'O Sociólogo Crítico',
    avatar: '👥',
    color: '#4B5563',
    backgroundColor: '#F3F4F6',
    subject: 'Sociologia',
    description: 'Um dos mais importantes sociólogos brasileiros, conhecido por sua análise crítica da sociedade de classes e das relações raciais no Brasil. Defendia uma sociologia engajada.',
    welcomeMessage: 'Vamos analisar as estruturas que nos cercam? A sociedade é o nosso laboratório.',
    catchPhrase: 'A sociologia serve para transformar a realidade.',
    hintStyle: 'Olhe para além do indivíduo. Quais são as forças sociais em jogo?',
    encouragementMessages: [
      'Análise crítica! Você desvendou a estrutura social.',
      'Exato! Você enxergou o padrão coletivo.',
      'Excelente! Uma observação sociológica precisa.'
    ]
  },
  {
    id: 'shakespeare',
    name: 'William Shakespeare',
    title: 'O Bardo Imortal',
    avatar: '🎭',
    color: '#4338CA',
    backgroundColor: '#EEF2FF',
    subject: 'Inglês',
    description: 'Poeta e dramaturgo inglês, considerado o maior escritor do idioma inglês. Suas obras, como "Hamlet" e "Romeu e Julieta", são encenadas há mais de 400 anos.',
    welcomeMessage: 'Greetings! O mundo é um palco, e hoje, o conhecimento é a nossa peça. Vamos começar?',
    catchPhrase: 'Ser ou não ser, eis a questão.',
    hintStyle: 'Analise o contexto. As palavras mudam de sentido como atores.',
    encouragementMessages: [
      'Well said! Digno do Globe Theatre!',
      'Brilhante! Uma performance de mestre.',
      'Bravo! O aplauso é todo seu.'
    ]
  },
  {
    id: 'dali',
    name: 'Salvador Dalí',
    title: 'O Artista Surreal',
    avatar: '🎨',
    color: '#BE123C',
    backgroundColor: '#FFF1F2',
    subject: 'Espanhol',
    description: 'Artista espanhol e um dos mais importantes representantes do surrealismo. Famoso por suas imagens bizarras e oníricas, e por sua personalidade excêntrica.',
    welcomeMessage: '¡Hola! A realidade é mole! Vamos pintá-la com palavras?',
    catchPhrase: 'A diferença entre mim e um louco, é que não sou louco.',
    hintStyle: 'Não busque a lógica. Abrace o absurdo para memorizar.',
    encouragementMessages: [
      '¡Sublime! Uma resposta tão perfeita que parece um sonho.',
      '¡Genial! A persistência da sua memória é notável.',
      '¡Perfecto! Uma obra de arte de resposta.'
    ]
  }
];

export const getMentorBySubject = (subject: string): Mentor | null => {
  const subjectMapping: { [key: string]: string } = {
    'Matemática': 'pitagoras',
    'matematica': 'pitagoras',
    'Física': 'einstein',
    'fisica': 'einstein',
    'Química': 'marie_curie',
    'quimica': 'marie_curie',
    'Biologia': 'darwin',
    'biologia': 'darwin',
    'Português': 'rui_barbosa',
    'portugues': 'rui_barbosa',
    'História': 'zumbi_palmares',
    'historia': 'zumbi_palmares',
    'Geografia': 'pedro_teixeira',
    'geografia': 'pedro_teixeira',
    'Literatura': 'machado_assis',
    'literatura': 'machado_assis',
    'Filosofia': 'socrates',
    'filosofia': 'socrates',
    'Sociologia': 'florestan_fernandes',
    'sociologia': 'florestan_fernandes',
    'Inglês': 'shakespeare',
    'ingles': 'shakespeare',
    'Espanhol': 'dali',
    'espanhol': 'dali'
  };

  const mentorId = subjectMapping[subject] || subjectMapping[subject.toLowerCase()];
  return mentors.find(m => m.id === mentorId) || mentors[0]; // Fallback para Pitágoras
};

export const getAllMentors = (): Mentor[] => {
  return mentors;
};

export default mentors;
