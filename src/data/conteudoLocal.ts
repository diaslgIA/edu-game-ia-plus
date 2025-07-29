
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
        { title: 'Introdução aos Números', content: 'Os números são símbolos usados para representar quantidades. Começamos pelos números naturais (1, 2, 3...), que são os primeiros que aprendemos na infância. Eles representam contagens simples de objetos.' },
        { title: 'Operações Básicas', content: 'As quatro operações fundamentais são: adição (+), subtração (-), multiplicação (×) e divisão (÷). Estas operações nos permitem resolver problemas matemáticos do cotidiano.' }
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
        { title: 'Conceitos Fundamentais', content: 'Posição é onde um objeto está localizado no espaço. Velocidade é a taxa de mudança da posição. Aceleração é a taxa de mudança da velocidade.' },
        { title: 'Movimento Uniforme', content: 'Quando a velocidade é constante, o objeto percorre distâncias iguais em tempos iguais. A fórmula básica é: distância = velocidade × tempo.' }
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
