import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectQuiz from '@/components/SubjectQuiz';
import ContentSlides from '@/components/ContentSlides';
import VirtualTeacher from '@/components/VirtualTeacher';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Target, Trophy, Clock, Play } from 'lucide-react';

type ExerciseMode = 'selection' | 'slides' | 'teacher' | 'quiz';

const Exercises = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('selection');

  const subjects = [
    {
      id: 'matematica',
      name: 'Matemática',
      description: 'Álgebra, Geometria e Funções',
      color: 'from-blue-500 to-blue-700',
      icon: '📐',
      difficulty: 'Médio',
      exercises: 45
    },
    {
      id: 'portugues',
      name: 'Português',
      description: 'Interpretação, Gramática e Literatura',
      color: 'from-green-500 to-green-700',
      icon: '📚',
      difficulty: 'Fácil',
      exercises: 52
    },
    {
      id: 'fisica',
      name: 'Física',
      description: 'Mecânica, Eletricidade e Óptica',
      color: 'from-purple-500 to-purple-700',
      icon: '⚡',
      difficulty: 'Difícil',
      exercises: 38
    },
    {
      id: 'quimica',
      name: 'Química',
      description: 'Orgânica, Inorgânica e Físico-química',
      color: 'from-orange-500 to-orange-700',
      icon: '🧪',
      difficulty: 'Médio',
      exercises: 41
    },
    {
      id: 'biologia',
      name: 'Biologia',
      description: 'Ecologia, Genética e Citologia',
      color: 'from-teal-500 to-teal-700',
      icon: '🧬',
      difficulty: 'Médio',
      exercises: 47
    },
    {
      id: 'historia',
      name: 'História',
      description: 'Brasil, Mundo e Atualidades',
      color: 'from-amber-500 to-amber-700',
      icon: '🏛️',
      difficulty: 'Fácil',
      exercises: 36
    },
    {
      id: 'geografia',
      name: 'Geografia',
      description: 'Física, Humana e Cartografia',
      color: 'from-emerald-500 to-emerald-700',
      icon: '🌍',
      difficulty: 'Fácil',
      exercises: 33
    },
    {
      id: 'filosofia',
      name: 'Filosofia',
      description: 'Ética, Política e Metafísica',
      color: 'from-indigo-500 to-indigo-700',
      icon: '🤔',
      difficulty: 'Médio',
      exercises: 24
    },
    {
      id: 'sociologia',
      name: 'Sociologia',
      description: 'Sociedade, Cultura e Movimentos',
      color: 'from-pink-500 to-pink-700',
      icon: '👥',
      difficulty: 'Fácil',
      exercises: 28
    }
  ];

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setExerciseMode('slides');
  };

  const handleSlidesComplete = () => {
    setExerciseMode('teacher');
  };

  const handleTeacherComplete = () => {
    setExerciseMode('quiz');
  };

  const handleQuizComplete = () => {
    setExerciseMode('selection');
    setSelectedSubject(null);
  };

  const handleBackToSelection = () => {
    setExerciseMode('selection');
    setSelectedSubject(null);
  };

  const currentSubject = subjects.find(s => s.id === selectedSubject);

  if (exerciseMode === 'slides' && selectedSubject && currentSubject) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSelection}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Conteúdo - {currentSubject.name}</h1>
          </div>
          
          <div className="p-6 flex-1 flex items-center justify-center">
            <ContentSlides 
              subject={currentSubject.name}
              onComplete={handleSlidesComplete}
            />
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (exerciseMode === 'teacher' && selectedSubject && currentSubject) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSelection}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Professor Virtual - {currentSubject.name}</h1>
          </div>
          
          <div className="p-6 flex-1 flex items-center justify-center">
            <VirtualTeacher 
              subject={currentSubject.name}
              topic={currentSubject.description}
              onComplete={handleTeacherComplete}
            />
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (exerciseMode === 'quiz' && selectedSubject && currentSubject) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSelection}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Quiz - {currentSubject.name}</h1>
          </div>
          
          <div className="p-6 flex-1">
            <SubjectQuiz 
              subject={selectedSubject}
              onComplete={handleQuizComplete}
              onBack={handleBackToSelection}
            />
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
        <div className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Exercícios</span>
            <Target size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
              <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <p className="text-white text-xs font-medium">Conteúdo</p>
              <p className="text-white/80 text-xs">Slides</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
              <Play className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <p className="text-white text-xs font-medium">Professor</p>
              <p className="text-white/80 text-xs">IA Virtual</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-white text-xs font-medium">Quiz</p>
              <p className="text-white/80 text-xs">Atividades</p>
            </div>
          </div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 gap-4">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                onClick={() => handleSubjectSelect(subject.id)}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/20 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {subject.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{subject.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{subject.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Target size={12} className="text-blue-400" />
                        <span className="text-white/80">{subject.exercises} exercícios</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} className="text-green-400" />
                        <span className="text-white/80">{subject.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-white/60">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
