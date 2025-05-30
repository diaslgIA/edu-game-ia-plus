
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import EducationalGame from '@/components/EducationalGame';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Gamepad2, Trophy, Target, Clock, Star, Brain, Zap } from 'lucide-react';

const Exercises = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleGameComplete = (score: number, timeSpent: number) => {
    console.log(`Jogo concluído! Pontos: ${score}, Tempo: ${timeSpent}s`);
    setShowGame(false);
  };

  const subjects = [
    {
      name: 'Matemática',
      icon: '🧮',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-100',
      topics: [
        { name: 'Funções Quadráticas', difficulty: 'Médio', questions: 15, time: '20 min' },
        { name: 'Geometria Analítica', difficulty: 'Difícil', questions: 20, time: '25 min' },
        { name: 'Estatística Básica', difficulty: 'Fácil', questions: 12, time: '15 min' },
        { name: 'Trigonometria', difficulty: 'Médio', questions: 18, time: '22 min' },
        { name: 'Logaritmos', difficulty: 'Difícil', questions: 16, time: '20 min' },
        { name: 'Análise Combinatória', difficulty: 'Médio', questions: 14, time: '18 min' }
      ]
    },
    {
      name: 'Português',
      icon: '📚',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-100',
      topics: [
        { name: 'Interpretação de Textos', difficulty: 'Médio', questions: 12, time: '18 min' },
        { name: 'Figuras de Linguagem', difficulty: 'Fácil', questions: 10, time: '12 min' },
        { name: 'Sintaxe e Semântica', difficulty: 'Difícil', questions: 15, time: '20 min' },
        { name: 'Literatura Brasileira', difficulty: 'Médio', questions: 14, time: '17 min' },
        { name: 'Gêneros Textuais', difficulty: 'Fácil', questions: 8, time: '10 min' },
        { name: 'Variação Linguística', difficulty: 'Médio', questions: 11, time: '15 min' }
      ]
    },
    {
      name: 'Ciências da Natureza',
      icon: '🧪',
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-100',
      topics: [
        { name: 'Mecânica Clássica', difficulty: 'Difícil', questions: 18, time: '25 min' },
        { name: 'Química Orgânica', difficulty: 'Médio', questions: 16, time: '22 min' },
        { name: 'Genética e Hereditariedade', difficulty: 'Médio', questions: 14, time: '18 min' },
        { name: 'Eletromagnetismo', difficulty: 'Difícil', questions: 20, time: '28 min' },
        { name: 'Ecologia e Meio Ambiente', difficulty: 'Fácil', questions: 12, time: '15 min' },
        { name: 'Termoquímica', difficulty: 'Médio', questions: 15, time: '20 min' }
      ]
    },
    {
      name: 'Ciências Humanas',
      icon: '🌍',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-100',
      topics: [
        { name: 'História do Brasil República', difficulty: 'Médio', questions: 16, time: '20 min' },
        { name: 'Geografia Física', difficulty: 'Fácil', questions: 12, time: '15 min' },
        { name: 'Filosofia Moderna', difficulty: 'Difícil', questions: 14, time: '18 min' },
        { name: 'Sociologia Contemporânea', difficulty: 'Médio', questions: 13, time: '17 min' },
        { name: 'Geopolítica Mundial', difficulty: 'Médio', questions: 15, time: '19 min' },
        { name: 'História Antiga e Medieval', difficulty: 'Fácil', questions: 11, time: '14 min' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-100';
      case 'Médio': return 'text-yellow-600 bg-yellow-100';
      case 'Difícil': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (showGame) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-3xl">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowGame(false)}
                className="text-white p-2"
              >
                <ArrowLeft size={20} />
              </Button>
              <Logo size="sm" showText={false} />
              <div className="w-10" />
            </div>
            <div className="flex items-center space-x-2">
              <Gamepad2 size={24} />
              <h1 className="text-2xl font-bold">Quiz Interativo</h1>
            </div>
          </div>

          <div className="p-6">
            <EducationalGame onGameComplete={handleGameComplete} />
          </div>
        </div>
        
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size="sm" showText={false} />
            <div className="w-10" />
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
              PRATICAR
            </div>
            <h1 className="text-2xl font-bold">Exercícios</h1>
          </div>
          <p className="text-white/80 text-sm mt-2">
            Treine com questões no estilo ENEM
          </p>
        </div>

        {/* Quick Start Game Section */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden">
            {/* Floating elements */}
            <div className="absolute top-4 right-4 text-yellow-300 text-2xl animate-pulse">
              <Brain />
            </div>
            <div className="absolute bottom-4 left-4 text-cyan-300 text-lg animate-pulse">
              <Zap />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <Gamepad2 size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Quiz Inteligente</h2>
                  <p className="text-white/80 text-sm">Questões adaptadas ao seu nível</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Trophy className="mx-auto mb-1 text-yellow-300" size={20} />
                    <div className="text-xs text-white/80">Pontos</div>
                    <div className="font-bold">10-50</div>
                  </div>
                  <div>
                    <Target className="mx-auto mb-1 text-green-300" size={20} />
                    <div className="text-xs text-white/80">Precisão</div>
                    <div className="font-bold">Tempo Real</div>
                  </div>
                  <div>
                    <Brain className="mx-auto mb-1 text-blue-300" size={20} />
                    <div className="text-xs text-white/80">Adaptativo</div>
                    <div className="font-bold">IA</div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowGame(true)}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
              >
                <Gamepad2 size={20} />
                <span>Iniciar Quiz Inteligente</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="px-6 flex-1 overflow-y-auto">
          <h2 className="text-white text-lg font-semibold mb-4">Exercícios por Matéria</h2>
          
          <div className="space-y-6">
            {subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex}>
                {/* Subject header */}
                <div className={`bg-gradient-to-r ${subject.color} text-white p-4 rounded-t-2xl flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{subject.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{subject.name}</h3>
                      <p className="text-sm opacity-90">{subject.topics.length} simulados disponíveis</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
                    className="bg-white/20 hover:bg-white/30 text-white border-none"
                    size="sm"
                  >
                    {selectedSubject === subject.name ? 'Ocultar' : 'Ver Tudo'}
                  </Button>
                </div>

                {/* Topics */}
                <div className="bg-white rounded-b-2xl shadow-sm">
                  {subject.topics.slice(0, selectedSubject === subject.name ? subject.topics.length : 3).map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <FileText size={16} className="text-gray-600" />
                            <h4 className="font-medium text-gray-800">{topic.name}</h4>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </span>
                            <div className="flex items-center space-x-1">
                              <FileText size={12} />
                              <span>{topic.questions} questões</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span>{topic.time}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => setShowGame(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium"
                          size="sm"
                        >
                          Praticar
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {selectedSubject !== subject.name && subject.topics.length > 3 && (
                    <div className="p-4 text-center">
                      <Button
                        onClick={() => setSelectedSubject(subject.name)}
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Ver mais {subject.topics.length - 3} simulados
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Study tip */}
          <div className="mt-6 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <Star className="mr-2 text-yellow-400" size={20} />
                Dica do Professor
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Pratique regularmente! Fazer exercícios diariamente é mais eficaz 
                que estudar por longas horas esporadicamente. Comece com 15-20 
                minutos por dia.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
