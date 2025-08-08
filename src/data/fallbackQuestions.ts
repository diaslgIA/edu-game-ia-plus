
export interface FallbackQuestion {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty_level: string;
}

export const fallbackQuestions: Record<string, FallbackQuestion[]> = {
  matematica: [
    {
      id: 'math-fallback-1',
      subject: 'matematica',
      topic: 'Álgebra',
      question: 'Qual é o resultado de 2x + 3 = 11?',
      options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
      correct_answer: 0,
      explanation: '2x + 3 = 11, então 2x = 8, logo x = 4',
      difficulty_level: 'medium'
    },
    {
      id: 'math-fallback-2',
      subject: 'matematica',
      topic: 'Geometria',
      question: 'Qual é a área de um círculo com raio 3?',
      options: ['6π', '9π', '12π', '18π'],
      correct_answer: 1,
      explanation: 'A área do círculo é πr², então π × 3² = 9π',
      difficulty_level: 'medium'
    }
  ],
  portugues: [
    {
      id: 'port-fallback-1',
      subject: 'portugues',
      topic: 'Gramática',
      question: 'Qual é a classe gramatical da palavra "rapidamente"?',
      options: ['Adjetivo', 'Advérbio', 'Substantivo', 'Verbo'],
      correct_answer: 1,
      explanation: 'Rapidamente é um advérbio de modo, pois modifica o verbo indicando como a ação é realizada',
      difficulty_level: 'easy'
    }
  ],
  historia: [
    {
      id: 'hist-fallback-1',
      subject: 'historia',
      topic: 'Brasil Colonial',
      question: 'Em que ano o Brasil foi descoberto pelos portugueses?',
      options: ['1498', '1500', '1502', '1504'],
      correct_answer: 1,
      explanation: 'O Brasil foi descoberto por Pedro Álvares Cabral em 22 de abril de 1500',
      difficulty_level: 'easy'
    }
  ],
  geografia: [
    {
      id: 'geo-fallback-1',
      subject: 'geografia',
      topic: 'Relevo',
      question: 'Qual é a maior cordilheira do mundo?',
      options: ['Himalaia', 'Andes', 'Alpes', 'Rochosas'],
      correct_answer: 1,
      explanation: 'A Cordilheira dos Andes é a maior do mundo em extensão, com aproximadamente 8.900 km',
      difficulty_level: 'medium'
    }
  ]
};

export const getFallbackQuestions = (subject: string, count: number = 5): FallbackQuestion[] => {
  const subjectQuestions = fallbackQuestions[subject.toLowerCase()] || [];
  return subjectQuestions.slice(0, count);
};
