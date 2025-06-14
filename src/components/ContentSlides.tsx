
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, BookOpen } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  content: string;
  image?: string;
  concepts: string[];
}

interface ContentSlidesProps {
  subject: string;
  onComplete: () => void;
}

// Conteúdo específico por matéria para os slides introdutórios
const getIntroductoryContent = (subject: string): Slide[] => {
  const contentMap: { [key: string]: Slide[] } = {
    'Matemática': [
      {
        id: 1,
        title: `Introdução à ${subject}`,
        content: `Bem-vindos ao estudo de Matemática! Nesta aula, vamos explorar conceitos fundamentais que são essenciais para o ENEM, incluindo funções, geometria e estatística.`,
        concepts: ['Funções e equações', 'Geometria plana e espacial', 'Estatística e probabilidade']
      },
      {
        id: 2,
        title: 'Álgebra e Funções',
        content: `A álgebra é a base da matemática moderna. Vamos dominar equações, sistemas e funções que aparecem frequentemente no ENEM.`,
        concepts: ['Equações do 1º e 2º grau', 'Sistemas lineares', 'Funções quadráticas e exponenciais']
      },
      {
        id: 3,
        title: 'Geometria Aplicada',
        content: `A geometria nos ajuda a compreender o mundo ao nosso redor. Estudaremos áreas, volumes e relações espaciais.`,
        concepts: ['Áreas de figuras planas', 'Volumes de sólidos', 'Teorema de Pitágoras']
      },
      {
        id: 4,
        title: 'Estatística e Probabilidade',
        content: `Em um mundo de dados, saber interpretar gráficos e calcular probabilidades é essencial para o ENEM e para a vida.`,
        concepts: ['Medidas de tendência central', 'Gráficos e tabelas', 'Cálculo de probabilidades']
      }
    ],
    'Física': [
      {
        id: 1,
        title: `Introdução à ${subject}`,
        content: `A Física explica os fenômenos naturais através de leis e princípios. Vamos estudar mecânica, termodinâmica e eletromagnetismo.`,
        concepts: ['Mecânica clássica', 'Termodinâmica', 'Eletromagnetismo']
      },
      {
        id: 2,
        title: 'Mecânica e Movimento',
        content: `O estudo do movimento é fundamental na Física. Analisaremos velocidade, aceleração e as leis de Newton.`,
        concepts: ['Cinemática', 'Dinâmica', 'Energia e trabalho']
      },
      {
        id: 3,
        title: 'Ondas e Óptica',
        content: `As ondas estão presentes no som, na luz e nas comunicações. Vamos entender suas propriedades e comportamentos.`,
        concepts: ['Ondas mecânicas', 'Ondas eletromagnéticas', 'Reflexão e refração']
      },
      {
        id: 4,
        title: 'Eletricidade e Magnetismo',
        content: `A eletricidade e o magnetismo são fundamentais na tecnologia moderna. Estudaremos circuitos e campos.`,
        concepts: ['Circuitos elétricos', 'Campo elétrico e magnético', 'Indução eletromagnética']
      }
    ],
    'Química': [
      {
        id: 1,
        title: `Introdução à ${subject}`,
        content: `A Química estuda a matéria e suas transformações. Vamos explorar átomos, moléculas e reações químicas.`,
        concepts: ['Estrutura atômica', 'Ligações químicas', 'Reações químicas']
      },
      {
        id: 2,
        title: 'Estrutura da Matéria',
        content: `Compreender a estrutura dos átomos e moléculas é essencial para entender as propriedades da matéria.`,
        concepts: ['Modelo atômico atual', 'Tabela periódica', 'Propriedades periódicas']
      },
      {
        id: 3,
        title: 'Reações e Estequiometria',
        content: `As reações químicas seguem leis de conservação. Vamos aprender a balancear equações e calcular quantidades.`,
        concepts: ['Balanceamento de equações', 'Cálculos estequiométricos', 'Rendimento de reação']
      },
      {
        id: 4,
        title: 'Química Orgânica',
        content: `A química orgânica estuda os compostos de carbono, base da vida e de muitos materiais importantes.`,
        concepts: ['Hidrocarbonetos', 'Funções orgânicas', 'Reações orgânicas']
      }
    ],
    'Biologia': [
      {
        id: 1,
        title: `Introdução à ${subject}`,
        content: `A Biologia é a ciência da vida. Vamos estudar desde células até ecossistemas, passando por genética e evolução.`,
        concepts: ['Citologia', 'Genética', 'Ecologia']
      },
      {
        id: 2,
        title: 'Citologia e Histologia',
        content: `A célula é a unidade básica da vida. Estudaremos sua estrutura e funcionamento em organismos unicelulares e multicelulares.`,
        concepts: ['Organelas celulares', 'Metabolismo celular', 'Divisão celular']
      },
      {
        id: 3,
        title: 'Genética e Hereditariedade',
        content: `A genética explica como as características são transmitidas. Vamos estudar DNA, genes e hereditariedade.`,
        concepts: ['Leis de Mendel', 'DNA e RNA', 'Mutações genéticas']
      },
      {
        id: 4,
        title: 'Ecologia e Meio Ambiente',
        content: `A ecologia estuda as relações entre os seres vivos e o ambiente. Um tema muito importante no ENEM.`,
        concepts: ['Cadeias alimentares', 'Ciclos biogeoquímicos', 'Problemas ambientais']
      }
    ]
  };

  return contentMap[subject] || contentMap['Matemática'];
};

const ContentSlides: React.FC<ContentSlidesProps> = ({ subject, onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = getIntroductoryContent(subject);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <BookOpen size={20} />
            <h3 className="font-bold">{subject}</h3>
          </div>
          <div className="text-sm bg-white/20 px-2 py-1 rounded-full">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
            {currentSlideData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            {currentSlideData.content}
          </p>
        </div>

        {/* Concepts */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 mb-6 transition-colors duration-300">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 transition-colors duration-300">
            Pontos Principais:
          </h4>
          <div className="space-y-2">
            {currentSlideData.concepts.map((concept, index) => (
              <div key={index} className="flex items-center text-blue-700 dark:text-blue-300 transition-colors duration-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progresso</span>
            <span>{Math.round(((currentSlide + 1) / slides.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-colors duration-300">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 flex items-center justify-between transition-colors duration-300">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </Button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
        >
          <span>{currentSlide === slides.length - 1 ? 'Começar Atividade' : 'Próximo'}</span>
          {currentSlide === slides.length - 1 ? <Play size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default ContentSlides;
