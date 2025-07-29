// Áreas de conhecimento
export const areasConhecimento = [
  'Ciências da Natureza',
  'Ciências Humanas',
  'Linguagens',
  'Matemática'
];

// Matérias por área de conhecimento
export const materias = [
  // Ciências da Natureza
  { id: 'matematica', name: 'Matemática', area_conhecimento: 'Matemática', icon: '📊', difficulty: 'medium', topics: 25 },
  { id: 'fisica', name: 'Física', area_conhecimento: 'Ciências da Natureza', icon: '⚡', difficulty: 'hard', topics: 20 },
  { id: 'quimica', name: 'Química', area_conhecimento: 'Ciências da Natureza', icon: '🧪', difficulty: 'hard', topics: 22 },
  { id: 'biologia', name: 'Biologia', area_conhecimento: 'Ciências da Natureza', icon: '🧬', difficulty: 'medium', topics: 30 },
  
  // Ciências Humanas  
  { id: 'historia', name: 'História', area_conhecimento: 'Ciências Humanas', icon: '📜', difficulty: 'medium', topics: 35 },
  { id: 'geografia', name: 'Geografia', area_conhecimento: 'Ciências Humanas', icon: '🌍', difficulty: 'medium', topics: 28 },
  { id: 'filosofia', name: 'Filosofia', area_conhecimento: 'Ciências Humanas', icon: '🤔', difficulty: 'medium', topics: 18 },
  { id: 'sociologia', name: 'Sociologia', area_conhecimento: 'Ciências Humanas', icon: '👥', difficulty: 'medium', topics: 16 },
  
  // Linguagens
  { id: 'portugues', name: 'Português', area_conhecimento: 'Linguagens', icon: '📚', difficulty: 'medium', topics: 32 }
];

// Tópicos de estudo organizados por matéria
export const topicos = [
  // Matemática
  {
    id: 'mat_001',
    titulo: 'Números e Operações',
    title: 'Números e Operações',
    description: 'Fundamentos dos sistemas numéricos e operações básicas',
    subject_id: 'Matemática',
    materia: 'Matemática',
    grande_tema: 'Aritmética Básica',
    difficulty_level: 'easy',
    estimated_time: 45,
    explicacao: 'Os números são a base de toda a matemática. Começando pelos números naturais (1, 2, 3...), passando pelos inteiros (...-2, -1, 0, 1, 2...) até os racionais e irracionais.',
    detalhes: {
      'O que é?': 'Sistemas de numeração e operações fundamentais',
      'Conceitos Principais': 'Números naturais, inteiros, racionais, operações básicas',
      'Exemplo Prático': 'Cálculos do dia a dia, como troco, porcentagens, divisões'
    },
    content_data: {
      sections: [
        { title: 'Introdução aos Números', content: 'Os números são símbolos usados para representar quantidades...' },
        { title: 'Operações Básicas', content: 'Adição, subtração, multiplicação e divisão...' }
      ]
    }
  },
  
  // Física  
  {
    id: 'fis_001',
    titulo: 'Cinemática',
    title: 'Cinemática',
    description: 'Estudo do movimento dos corpos sem considerar suas causas',
    subject_id: 'Física',
    materia: 'Física',
    grande_tema: 'Mecânica',
    difficulty_level: 'medium',
    estimated_time: 60,
    explicacao: 'A cinemática estuda o movimento dos corpos, descrevendo posição, velocidade e aceleração ao longo do tempo, sem se preocupar com as causas do movimento.',
    detalhes: {
      'O que é?': 'Ramo da física que descreve o movimento',
      'Conceitos Principais': 'Posição, deslocamento, velocidade, aceleração',
      'Exemplo Prático': 'Movimento de um carro na estrada, queda livre de objetos'
    },
    content_data: {
      sections: [
        { title: 'Conceitos Fundamentais', content: 'Posição, velocidade e aceleração...' },
        { title: 'Movimento Uniforme', content: 'Quando a velocidade é constante...' }
      ]
    }
  }
];

// Create the unified structure expected by components
export const conteudoEducacional = {
  materias: materias,
  conteudos: topicos,
  areas: areasConhecimento
};

export const conteudoLocal = {
  areasConhecimento: [
    'Ciências da Natureza',
    'Ciências Humanas',
    'Linguagens',
    'Matemática'
  ],
  materias: [
    {
      id: 'matematica',
      nome: 'Matemática',
      area_conhecimento: 'Matemática',
      icon: '📊',
      difficulty: 'medium',
      topicos: 25
    },
    {
      id: 'fisica',
      nome: 'Física',
      area_conhecimento: 'Ciências da Natureza',
      icon: '⚡',
      difficulty: 'hard',
      topicos: 20
    },
    {
      id: 'quimica',
      nome: 'Química',
      area_conhecimento: 'Ciências da Natureza',
      icon: '🧪',
      difficulty: 'hard',
      topicos: 22
    },
    {
      id: 'biologia',
      nome: 'Biologia',
      area_conhecimento: 'Ciências da Natureza',
      icon: '🧬',
      difficulty: 'medium',
      topicos: 30
    },
    {
      id: 'historia',
      nome: 'História',
      area_conhecimento: 'Ciências Humanas',
      icon: '📜',
      difficulty: 'medium',
      topicos: 35
    },
    {
      id: 'geografia',
      nome: 'Geografia',
      area_conhecimento: 'Ciências Humanas',
      icon: '🌍',
      difficulty: 'medium',
      topicos: 28
    },
    {
      id: 'filosofia',
      nome: 'Filosofia',
      area_conhecimento: 'Ciências Humanas',
      icon: '🤔',
      difficulty: 'medium',
      topicos: 18
    },
    {
      id: 'sociologia',
      nome: 'Sociologia',
      area_conhecimento: 'Ciências Humanas',
      icon: '👥',
      difficulty: 'medium',
      topicos: 16
    },
    {
      id: 'portugues',
      nome: 'Português',
      area_conhecimento: 'Linguagens',
      icon: '📚',
      difficulty: 'medium',
      topicos: 32
    }
  ],
  topicos: [
    {
      id: 'mat_001',
      titulo: 'Números e Operações',
      title: 'Números e Operações',
      description: 'Fundamentos dos sistemas numéricos e operações básicas',
      subject_id: 'Matemática',
      materia: 'Matemática',
      grande_tema: 'Aritmética Básica',
      difficulty_level: 'easy',
      estimated_time: 45,
      explicacao:
        'Os números são a base de toda a matemática. Começando pelos números naturais (1, 2, 3...), passando pelos inteiros (...-2, -1, 0, 1, 2...) até os racionais e irracionais.',
      detalhes: {
        'O que é?': 'Sistemas de numeração e operações fundamentais',
        'Conceitos Principais':
          'Números naturais, inteiros, racionais, operações básicas',
        'Exemplo Prático':
          'Cálculos do dia a dia, como troco, porcentagens, divisões'
      },
      content_data: {
        sections: [
          {
            title: 'Introdução aos Números',
            content: 'Os números são símbolos usados para representar quantidades...'
          },
          {
            title: 'Operações Básicas',
            content: 'Adição, subtração, multiplicação e divisão...'
          }
        ]
      }
    },
    {
      id: 'fis_001',
      titulo: 'Cinemática',
      title: 'Cinemática',
      description: 'Estudo do movimento dos corpos sem considerar suas causas',
      subject_id: 'Física',
      materia: 'Física',
      grande_tema: 'Mecânica',
      difficulty_level: 'medium',
      estimated_time: 60,
      explicacao:
        'A cinemática estuda o movimento dos corpos, descrevendo posição, velocidade e aceleração ao longo do tempo, sem se preocupar com as causas do movimento.',
      detalhes: {
        'O que é?': 'Ramo da física que descreve o movimento',
        'Conceitos Principais':
          'Posição, deslocamento, velocidade, aceleração',
        'Exemplo Prático':
          'Movimento de um carro na estrada, queda livre de objetos'
      },
      content_data: {
        sections: [
          {
            title: 'Conceitos Fundamentais',
            content: 'Posição, velocidade e aceleração...'
          },
          {
            title: 'Movimento Uniforme',
            content: 'Quando a velocidade é constante...'
          }
        ]
      }
    }
  ],
  conteudos: [
    {
      id: '1',
      subject_id: 'Matemática',
      materia: 'Matemática',
      titulo: 'Introdução à Álgebra',
      title: 'Introdução à Álgebra',
      description: 'Conceitos básicos de álgebra',
      content_type: 'text',
      difficulty_level: 'easy',
      estimated_time: 30,
      is_premium: false,
      order_index: 1,
      key_concepts: ['variáveis', 'expressões', 'equações'],
      examples: '2x + 3 = 7',
      practical_applications: 'Resolução de problemas',
      study_tips: 'Pratique regularmente',
      infographic_url: 'url',
      interactive_activities: [],
      challenge_question: {},
      available_badges: [],
      detailed_explanation: 'A álgebra é...',
      grande_tema: 'Álgebra',
      topic_name: 'Introdução',
      explanation: 'Conceitos básicos',
      created_at: '2024-05-28T00:00:00Z',
      updated_at: '2024-05-28T00:00:00Z'
    },
    {
      id: '2',
      subject_id: 'Física',
      materia: 'Física',
      titulo: 'Mecânica Clássica',
      title: 'Mecânica Clássica',
      description: 'Princípios da mecânica newtoniana',
      content_type: 'text',
      difficulty_level: 'medium',
      estimated_time: 45,
      is_premium: true,
      order_index: 2,
      key_concepts: ['força', 'movimento', 'energia'],
      examples: 'F = ma',
      practical_applications: 'Engenharia',
      study_tips: 'Visualize os problemas',
      infographic_url: 'url',
      interactive_activities: [],
      challenge_question: {},
      available_badges: [],
      detailed_explanation: 'A mecânica clássica...',
      grande_tema: 'Mecânica',
      topic_name: 'Princípios',
      explanation: 'Leis de Newton',
      created_at: '2024-05-28T00:00:00Z',
      updated_at: '2024-05-28T00:00:00Z'
    },
    {
      id: '3',
      subject_id: 'Química',
      materia: 'Química',
      titulo: 'Tabela Periódica',
      title: 'Tabela Periódica',
      description: 'Organização dos elementos químicos',
      content_type: 'text',
      difficulty_level: 'medium',
      estimated_time: 40,
      is_premium: false,
      order_index: 3,
      key_concepts: ['elementos', 'períodos', 'grupos'],
      examples: 'H, O, C',
      practical_applications: 'Química',
      study_tips: 'Memorize os grupos',
      infographic_url: 'url',
      interactive_activities: [],
      challenge_question: {},
      available_badges: [],
      detailed_explanation: 'A tabela periódica...',
      grande_tema: 'Química Geral',
      topic_name: 'Elementos',
      explanation: 'Organização e propriedades',
      created_at: '2024-05-28T00:00:00Z',
      updated_at: '2024-05-28T00:00:00Z'
    }
  ]
};
