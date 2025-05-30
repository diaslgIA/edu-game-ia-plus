
import { useState, useCallback } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  topic: string;
}

const subjectQuestions = {
  matematica: [
    {
      id: 1,
      question: "Qual é o valor de x na equação 2x + 5 = 13?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "2x + 5 = 13 → 2x = 13 - 5 → 2x = 8 → x = 4",
      subject: "Matemática",
      topic: "Equações do 1º grau"
    },
    {
      id: 2,
      question: "A função f(x) = x² - 4x + 3 tem vértice no ponto:",
      options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(-2, 1)"],
      correctAnswer: 0,
      explanation: "Para uma função quadrática f(x) = ax² + bx + c, o vértice tem coordenada x = -b/2a. Aqui: x = -(-4)/2(1) = 2. f(2) = 4 - 8 + 3 = -1",
      subject: "Matemática",
      topic: "Função Quadrática"
    },
    {
      id: 3,
      question: "O valor de sen(30°) é:",
      options: ["1/2", "√2/2", "√3/2", "1"],
      correctAnswer: 0,
      explanation: "O seno de 30° é um valor fundamental da trigonometria: sen(30°) = 1/2",
      subject: "Matemática",
      topic: "Trigonometria"
    },
    {
      id: 4,
      question: "Em uma progressão aritmética, o primeiro termo é 3 e a razão é 4. O 5º termo é:",
      options: ["17", "19", "21", "23"],
      correctAnswer: 1,
      explanation: "PA: an = a1 + (n-1).r → a5 = 3 + (5-1).4 = 3 + 16 = 19",
      subject: "Matemática",
      topic: "Progressões"
    }
  ],
  portugues: [
    {
      id: 5,
      question: "Qual figura de linguagem está presente em 'Suas palavras são punhais'?",
      options: ["Metáfora", "Metonímia", "Ironia", "Hipérbole"],
      correctAnswer: 0,
      explanation: "A metáfora é uma comparação implícita entre 'palavras' e 'punhais', indicando que as palavras machucam",
      subject: "Português",
      topic: "Figuras de Linguagem"
    },
    {
      id: 6,
      question: "O período 'Quando chegou, todos já haviam saído' é classificado como:",
      options: ["Simples", "Composto por coordenação", "Composto por subordinação", "Composto misto"],
      correctAnswer: 2,
      explanation: "O período é composto por subordinação, pois a oração 'Quando chegou' é subordinada adverbial temporal",
      subject: "Português",
      topic: "Sintaxe"
    },
    {
      id: 7,
      question: "Em 'O livro que comprei é interessante', o termo destacado é:",
      options: ["Sujeito", "Objeto direto", "Pronome relativo", "Adjunto adnominal"],
      correctAnswer: 2,
      explanation: "'Que' é um pronome relativo que retoma o antecedente 'livro' e inicia uma oração subordinada adjetiva",
      subject: "Português",
      topic: "Morfologia"
    }
  ],
  ciencias: [
    {
      id: 8,
      question: "A fórmula química da água é:",
      options: ["H₂O", "CO₂", "NaCl", "CH₄"],
      correctAnswer: 0,
      explanation: "A água é composta por dois átomos de hidrogênio e um de oxigênio: H₂O",
      subject: "Ciências",
      topic: "Química Básica"
    },
    {
      id: 9,
      question: "A lei da conservação da energia afirma que:",
      options: ["Energia pode ser criada", "Energia pode ser destruída", "Energia não pode ser criada nem destruída", "Energia sempre aumenta"],
      correctAnswer: 2,
      explanation: "A energia não pode ser criada nem destruída, apenas transformada de uma forma em outra",
      subject: "Ciências",
      topic: "Física"
    },
    {
      id: 10,
      question: "A mitose é um processo de:",
      options: ["Digestão celular", "Divisão celular", "Respiração celular", "Síntese proteica"],
      correctAnswer: 1,
      explanation: "A mitose é o processo de divisão celular que resulta em duas células filhas geneticamente idênticas",
      subject: "Ciências",
      topic: "Biologia"
    }
  ],
  historia: [
    {
      id: 11,
      question: "A independência do Brasil foi proclamada em:",
      options: ["1820", "1821", "1822", "1823"],
      correctAnswer: 2,
      explanation: "A independência do Brasil foi proclamada por Dom Pedro I em 7 de setembro de 1822",
      subject: "História",
      topic: "Brasil Imperial"
    },
    {
      id: 12,
      question: "A Revolução Francesa começou em:",
      options: ["1789", "1790", "1791", "1792"],
      correctAnswer: 0,
      explanation: "A Revolução Francesa iniciou-se em 1789 com a queda da Bastilha em 14 de julho",
      subject: "História",
      topic: "História Moderna"
    }
  ]
};

export const useSubjectQuestions = () => {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  const getQuestionsBySubject = useCallback((subject: string): Question[] => {
    const subjectKey = subject.toLowerCase().replace(/\s+/g, '').replace('ê', 'e').replace('á', 'a');
    return subjectQuestions[subjectKey as keyof typeof subjectQuestions] || [];
  }, []);

  const generateQuiz = useCallback((subject: string, count: number = 5): Question[] => {
    const questions = getQuestionsBySubject(subject);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, questions.length));
    setCurrentQuestions(selected);
    return selected;
  }, [getQuestionsBySubject]);

  return {
    currentQuestions,
    generateQuiz,
    getQuestionsBySubject
  };
};
