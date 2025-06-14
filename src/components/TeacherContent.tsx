
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, ChevronLeft, ChevronRight, BookOpen, Award, Lock } from 'lucide-react';
import TeacherVideo from './TeacherVideo';

interface TeacherContentProps {
  teacher: string;
  subject: string;
  contentType: 'video' | 'slides';
  isPremium: boolean;
  onContentComplete: () => void;
}

// Conteúdo específico por matéria
const getSubjectContent = (subject: string) => {
  const contentMap: { [key: string]: any } = {
    'Matemática': [
      {
        title: "Funções Quadráticas",
        content: "As funções quadráticas são fundamentais no ENEM. Vamos explorar como identificar, analisar e resolver problemas envolvendo parábolas.",
        points: ["y = ax² + bx + c", "Vértice da parábola", "Discriminante (Δ)", "Raízes e intersecções"]
      },
      {
        title: "Propriedades e Gráficos",
        content: "O gráfico de uma função quadrática é uma parábola. Vamos aprender a determinar concavidade, vértice e pontos importantes.",
        points: ["Concavidade (a > 0 ou a < 0)", "Coordenadas do vértice", "Eixo de simetria", "Valor máximo/mínimo"]
      },
      {
        title: "Aplicações Práticas",
        content: "Funções quadráticas aparecem em problemas de otimização, movimento uniformemente variado e geometria analítica.",
        points: ["Problemas de área máxima", "Lançamento de projéteis", "Receita e lucro", "Problemas geométricos"]
      }
    ],
    'Física': [
      {
        title: "Mecânica Clássica",
        content: "A mecânica estuda o movimento dos corpos. Vamos abordar cinemática, dinâmica e suas aplicações no ENEM.",
        points: ["Movimento uniforme (MU)", "Movimento uniformemente variado (MUV)", "Leis de Newton", "Energia mecânica"]
      },
      {
        title: "Eletromagnetismo",
        content: "Fenômenos elétricos e magnéticos são interconectados. Estudaremos campos, forças e indução eletromagnética.",
        points: ["Lei de Coulomb", "Campo elétrico", "Corrente elétrica", "Lei de Faraday"]
      },
      {
        title: "Ondas e Óptica",
        content: "As ondas transportam energia sem transportar matéria. Vamos estudar suas propriedades e fenômenos ópticos.",
        points: ["Características das ondas", "Reflexão e refração", "Interferência", "Espectro eletromagnético"]
      }
    ],
    'Química': [
      {
        title: "Estrutura Atômica",
        content: "O átomo é a unidade fundamental da matéria. Vamos estudar sua estrutura e as propriedades periódicas.",
        points: ["Prótons, nêutrons e elétrons", "Número atômico e massa", "Configuração eletrônica", "Tabela periódica"]
      },
      {
        title: "Ligações Químicas",
        content: "Os átomos se unem através de ligações para formar compostos. Estudaremos os principais tipos de ligação.",
        points: ["Ligação iônica", "Ligação covalente", "Ligação metálica", "Forças intermoleculares"]
      },
      {
        title: "Reações Químicas",
        content: "As reações químicas transformam reagentes em produtos. Vamos aprender a balancear equações e calcular quantidades.",
        points: ["Balanceamento de equações", "Estequiometria", "Rendimento de reação", "Tipos de reação"]
      }
    ],
    'Biologia': [
      {
        title: "Citologia",
        content: "A célula é a unidade básica da vida. Vamos estudar sua estrutura e funcionamento.",
        points: ["Célula procariota vs eucariota", "Organelas celulares", "Membrana plasmática", "Metabolismo celular"]
      },
      {
        title: "Genética",
        content: "A genética estuda a hereditariedade. Vamos abordar as leis de Mendel e conceitos modernos.",
        points: ["Primeira Lei de Mendel", "Segunda Lei de Mendel", "DNA e RNA", "Mutações genéticas"]
      },
      {
        title: "Ecologia",
        content: "A ecologia estuda as relações entre os seres vivos e o ambiente. Vamos ver cadeias alimentares e ecossistemas.",
        points: ["Cadeia e teia alimentar", "Pirâmides ecológicas", "Ciclos biogeoquímicos", "Sucessão ecológica"]
      }
    ],
    'História': [
      {
        title: "Brasil Colonial",
        content: "O período colonial brasileiro (1500-1822) foi marcado pela exploração portuguesa e formação da sociedade brasileira.",
        points: ["Pacto Colonial", "Ciclo do açúcar", "Ciclo do ouro", "Escravidão colonial"]
      },
      {
        title: "República Brasileira",
        content: "A República no Brasil passou por diferentes fases, desde a Proclamação até os dias atuais.",
        points: ["República Velha", "Era Vargas", "Regime Militar", "Nova República"]
      },
      {
        title: "Século XX Mundial",
        content: "O século XX foi marcado por duas guerras mundiais, Guerra Fria e transformações sociais.",
        points: ["Primeira Guerra Mundial", "Segunda Guerra Mundial", "Guerra Fria", "Descolonização"]
      }
    ],
    'Geografia': [
      {
        title: "Geografia Física",
        content: "A geografia física estuda os aspectos naturais da Terra: relevo, clima, hidrografia e vegetação.",
        points: ["Estrutura geológica", "Tipos de clima", "Bacias hidrográficas", "Biomas brasileiros"]
      },
      {
        title: "Geografia Humana",
        content: "A geografia humana analisa a ocupação do espaço pelo homem e suas atividades econômicas.",
        points: ["Demografia", "Urbanização", "Atividades econômicas", "Globalização"]
      },
      {
        title: "Geopolítica",
        content: "A geopolítica estuda as relações de poder no espaço geográfico e conflitos territoriais.",
        points: ["Blocos econômicos", "Conflitos territoriais", "Recursos naturais", "Fronteiras"]
      }
    ],
    'Português': [
      {
        title: "Interpretação de Texto",
        content: "A interpretação textual é fundamental no ENEM. Vamos desenvolver estratégias de leitura e análise.",
        points: ["Ideia principal", "Inferências", "Linguagem figurada", "Gêneros textuais"]
      },
      {
        title: "Gramática",
        content: "O domínio gramatical é essencial para a redação e questões de língua portuguesa.",
        points: ["Classes gramaticais", "Sintaxe", "Concordância", "Regência verbal e nominal"]
      },
      {
        title: "Literatura",
        content: "A literatura brasileira reflete nossa história e cultura. Vamos estudar os principais movimentos.",
        points: ["Barroco", "Romantismo", "Realismo/Naturalismo", "Modernismo"]
      }
    ]
  };

  return contentMap[subject] || contentMap['Matemática'];
};

const TeacherContent: React.FC<TeacherContentProps> = ({ 
  teacher, 
  subject, 
  contentType, 
  isPremium,
  onContentComplete 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = getSubjectContent(subject);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            onContentComplete();
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onContentComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {contentType === 'video' ? (
        <TeacherVideo
          teacher={teacher}
          subject={subject}
          topic={slides[0]?.title || "Conteúdo da Aula"}
          duration="15:30"
          isPremium={isPremium}
        />
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold">{teacher}</h3>
                <p className="text-blue-100 text-sm">{subject}</p>
              </div>
              {!isPremium && (
                <div className="flex items-center space-x-1 bg-orange-500 px-2 py-1 rounded-full">
                  <Lock size={12} />
                  <span className="text-xs font-medium">Premium</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                Slide {currentSlide + 1} de {slides.length}
              </span>
            </div>
          </div>

          {/* Slide Content */}
          <div className="p-6">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800">{slides[currentSlide].title}</h4>
              <p className="text-gray-600 leading-relaxed">{slides[currentSlide].content}</p>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">Pontos Principais:</h5>
                <ul className="space-y-1">
                  {slides[currentSlide].points.map((point: string, index: number) => (
                    <li key={index} className="flex items-center text-blue-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 bg-gray-50 flex items-center justify-between">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0 || !isPremium}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ChevronLeft size={16} />
              <span>Anterior</span>
            </Button>

            <div className="flex space-x-2">
              {slides.map((_: any, index: number) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              disabled={!isPremium}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
            >
              <span>{currentSlide === slides.length - 1 ? 'Concluir' : 'Próximo'}</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {!isPremium && (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Lock size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-orange-800">Conteúdo Premium</h4>
              <p className="text-orange-600 text-sm">
                Desbloqueie todos os vídeos dos professores
              </p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-orange-700">
            <div className="flex items-center">
              <Award size={16} className="mr-2" />
              <span>Acesso a todos os professores especialistas</span>
            </div>
            <div className="flex items-center">
              <BookOpen size={16} className="mr-2" />
              <span>Conteúdo completo sem limitações</span>
            </div>
            <div className="flex items-center">
              <Play size={16} className="mr-2" />
              <span>Vídeos em alta qualidade</span>
            </div>
          </div>

          <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            Assinar Premium por R$ 19,90/mês
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeacherContent;
