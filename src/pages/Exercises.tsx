
import React, { useState } from 'react';
import { ArrowLeft, Book, Target, Trophy, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DynamicSubjectQuiz from '@/components/DynamicSubjectQuiz';

const Exercises = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const subjects = [
    { 
      id: 'matemática', 
      name: 'Matemática', 
      icon: '📊', 
      color: 'bg-blue-500',
      description: 'Álgebra, Geometria e Cálculo'
    },
    { 
      id: 'física', 
      name: 'Física', 
      icon: '⚡', 
      color: 'bg-purple-500',
      description: 'Mecânica, Eletricidade e Óptica'
    },
    { 
      id: 'química', 
      name: 'Química', 
      icon: '🧪', 
      color: 'bg-green-500',
      description: 'Orgânica, Inorgânica e Físico-Química'
    },
    { 
      id: 'biologia', 
      name: 'Biologia', 
      icon: '🧬', 
      color: 'bg-emerald-500',
      description: 'Genética, Ecologia e Evolução'
    },
    { 
      id: 'história', 
      name: 'História', 
      icon: '📚', 
      color: 'bg-amber-500',
      description: 'Brasil, Mundial e Contemporânea'
    },
    { 
      id: 'sociologia', 
      name: 'Sociologia', 
      icon: '👥', 
      color: 'bg-teal-500',
      description: 'Sociedade, Cultura e Política'
    },
    { 
      id: 'português', 
      name: 'Português', 
      icon: '📝', 
      color: 'bg-rose-500',
      description: 'Gramática, Literatura e Redação'
    },
    { 
      id: 'inglês', 
      name: 'Inglês', 
      icon: '🇺🇸', 
      color: 'bg-indigo-500',
      description: 'Grammar, Reading e Vocabulary'
    },
    { 
      id: 'espanhol', 
      name: 'Espanhol', 
      icon: '🇪🇸', 
      color: 'bg-red-500',
      description: 'Gramática, Conversação e Literatura'
    },
    { 
      id: 'literatura', 
      name: 'Literatura', 
      icon: '📖', 
      color: 'bg-violet-500',
      description: 'Clássicos, Modernos e Análise'
    }
  ];

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setShowResult(false);
    setQuizScore(null);
  };

  const handleQuizComplete = (score: number, timeSpent: number) => {
    setQuizScore(score);
    setShowResult(true);
    console.log('Quiz completed:', { score, timeSpent });
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setShowResult(false);
    setQuizScore(null);
  };

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
        <DynamicSubjectQuiz
          subject={selectedSubject}
          onComplete={handleQuizComplete}
          onBack={handleBackToSubjects}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="text-yellow-500 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Exercícios Práticos
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Teste seus conhecimentos com questões dinâmicas e personalizadas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                <Target className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">Questões Dinâmicas</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Sistema inteligente de exercícios</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <Zap className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">Feedback Imediato</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Respostas com explicações detalhadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                <Star className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">Mentores Virtuais</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Orientação personalizada por matéria</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectSelect(subject.id)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 hover:scale-105 group"
            >
              <div className="text-center">
                <div className={`${subject.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl text-white">{subject.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {subject.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {subject.description}
                </p>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Book className="mr-1" size={12} />
                    Questões Dinâmicas
                  </span>
                  <span className="flex items-center">
                    <Target className="mr-1" size={12} />
                    15 mins
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Sistema de Quiz Dinâmico</h2>
          <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
            Nosso novo sistema carrega questões dinamicamente do banco de dados, proporcionando uma experiência 
            mais rica e atualizada. Cada exercício é personalizado com mentores virtuais especializados em cada matéria.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold mb-1">Questões Inteligentes</h4>
              <p className="text-sm text-blue-100">Algoritmo que adapta a dificuldade</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">🤖</div>
              <h4 className="font-semibold mb-1">Mentores Virtuais</h4>
              <p className="text-sm text-blue-100">Feedback personalizado por IA</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold mb-1">Análise Detalhada</h4>
              <p className="text-sm text-blue-100">Relatórios de desempenho completos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
