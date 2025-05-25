
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import EducationalGame from '@/components/EducationalGame';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Gamepad2, Trophy, Target } from 'lucide-react';

const Exercises = () => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [userPoints, setUserPoints] = useState(1234567);

  const handleGameComplete = (score: number, timeSpent: number) => {
    setUserPoints(prev => prev + score);
    // Aqui você poderia salvar o progresso no backend
    console.log(`Jogo concluído! Pontos: ${score}, Tempo: ${timeSpent}s`);
  };

  const subjects = [
    {
      name: 'Português',
      topics: [
        'Figuras de Linguagem',
        'Interpretação de Textos',
        'Gêneros Textuais',
        'Funções da Linguagem',
        'Gramática',
        'Coesão e Coerência Textual'
      ],
      color: 'from-pink-400 to-purple-500',
      bgColor: 'bg-pink-100'
    },
    {
      name: 'Matemática',
      topics: [
        'Álgebra',
        'Análise Combinatória'
      ],
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-100'
    }
  ];

  if (showGame) {
    return (
      <MobileContainer background="light">
        <div className="flex flex-col h-full pb-20">
          {/* Header */}
          <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowGame(false)}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <Gamepad2 size={20} />
              <h1 className="text-lg font-semibold">Quiz Interativo</h1>
            </div>
          </div>

          {/* Game Container */}
          <div className="p-6">
            <EducationalGame onGameComplete={handleGameComplete} />
          </div>
        </div>
        
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
              START
            </span>
            <h1 className="text-lg font-semibold">Exercícios</h1>
            <FileText size={20} />
          </div>
        </div>

        {/* Game Section */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
            {/* Floating elements */}
            <div className="absolute top-4 right-4 text-yellow-300 text-2xl animate-pulse">🎮</div>
            <div className="absolute bottom-4 left-4 text-cyan-300 text-lg animate-pulse">⭐</div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Quiz Interativo</h2>
                  <p className="text-white/80 text-sm">Aprenda jogando e ganhe pontos!</p>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Trophy className="mx-auto mb-1 text-yellow-300" size={20} />
                    <div className="text-xs text-white/80">Pontos</div>
                    <div className="font-bold">+10-30</div>
                  </div>
                  <div>
                    <Target className="mx-auto mb-1 text-green-300" size={20} />
                    <div className="text-xs text-white/80">Precisão</div>
                    <div className="font-bold">Real-time</div>
                  </div>
                  <div>
                    <FileText className="mx-auto mb-1 text-blue-300" size={20} />
                    <div className="text-xs text-white/80">Matérias</div>
                    <div className="font-bold">Todas</div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowGame(true)}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg"
              >
                <Gamepad2 size={20} />
                <span>Começar Quiz Interativo</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="px-6 space-y-6">
          {subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex}>
              {/* Subject header */}
              <div className={`bg-gradient-to-r ${subject.color} text-white p-4 rounded-t-2xl`}>
                <h2 className="font-bold text-lg">{subject.name}</h2>
                <p className="text-sm opacity-90">Selecione o assunto que deseja praticar</p>
              </div>

              {/* Topics */}
              <div className="bg-white rounded-b-2xl shadow-sm">
                {subject.topics.map((topic, topicIndex) => (
                  <Button
                    key={topicIndex}
                    className="w-full bg-gradient-to-r from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300 text-gray-800 font-medium py-4 px-6 justify-start border-b border-pink-100 last:border-b-0 first:rounded-t-none last:rounded-b-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">👆</span>
                      <span>{topic}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
