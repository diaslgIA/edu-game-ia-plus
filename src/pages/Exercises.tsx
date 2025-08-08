import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectQuiz from '@/components/SubjectQuiz';
import MentorWelcome from '@/components/MentorWelcome';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Trophy, Clock, Play, Star, CheckCircle } from 'lucide-react';

type ExerciseMode = 'selection' | 'quiz' | 'mentor-welcome';

const Exercises = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getSubjectProgress, updateProgress } = useUserProgress();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('selection');
  const [showMentorWelcome, setShowMentorWelcome] = useState(false);

  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject');
    if (subjectFromUrl) {
      setSelectedSubject(subjectFromUrl);
    }
  }, [searchParams]);

  const subjects = useMemo(() => [
    { id: 'matematica', name: 'Matemática', description: 'Números, álgebra, geometria e cálculos', color: 'from-blue-500 to-blue-700', icon: '📐', difficulty: 'Difícil', exercises: 65 },
    { id: 'portugues', name: 'Português', description: 'Gramática, literatura e redação', color: 'from-green-500 to-green-700', icon: '📚', difficulty: 'Médio', exercises: 72 },
    { id: 'fisica', name: 'Física', description: 'Mecânica, eletricidade e termodinâmica', color: 'from-purple-500 to-purple-700', icon: '⚡', difficulty: 'Difícil', exercises: 58 },
    { id: 'quimica', name: 'Química', description: 'Átomos, moléculas e reações químicas', color: 'from-orange-500 to-orange-700', icon: '🧪', difficulty: 'Difícil', exercises: 61 },
    { id: 'biologia', name: 'Biologia', description: 'Vida, células e evolução', color: 'from-teal-500 to-teal-700', icon: '🧬', difficulty: 'Médio', exercises: 67 },
    { id: 'historia', name: 'História', description: 'Civilizações, eventos e culturas', color: 'from-amber-500 to-amber-700', icon: '🏛️', difficulty: 'Médio', exercises: 56 },
    { id: 'geografia', name: 'Geografia', description: 'Países, climas e relevos', color: 'from-emerald-500 to-emerald-700', icon: '🌍', difficulty: 'Fácil', exercises: 53 },
    { id: 'filosofia', name: 'Filosofia', description: 'Pensamento crítico e reflexão', color: 'from-indigo-500 to-indigo-700', icon: '🤔', difficulty: 'Difícil', exercises: 44 },
    { id: 'sociologia', name: 'Sociologia', description: 'Sociedade e relações humanas', color: 'from-pink-500 to-pink-700', icon: '👥', difficulty: 'Médio', exercises: 48 },
    { id: 'ingles', name: 'Inglês', description: 'Gramática, vocabulário e conversação', color: 'from-blue-600 to-indigo-600', icon: '🇺🇸', difficulty: 'Médio', exercises: 35 },
    { id: 'espanhol', name: 'Espanhol', description: 'Idioma, cultura e comunicação', color: 'from-red-500 to-red-700', icon: '🇪🇸', difficulty: 'Médio', exercises: 28 },
    { id: 'literatura', name: 'Literatura', description: 'Obras clássicas e análise textual', color: 'from-violet-500 to-violet-700', icon: '📖', difficulty: 'Médio', exercises: 32 }
  ], []);

  const activities = useMemo(() => [
    { id: 'quiz', name: t('activity_quiz_name'), icon: Trophy, color: 'bg-yellow-500', description: t('activity_quiz_desc') }
  ], [t]);

  const handleSubjectSelect = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setShowMentorWelcome(true);
    setExerciseMode('mentor-welcome');
  };

  const handleMentorWelcomeClose = () => {
    setShowMentorWelcome(false);
    setExerciseMode('quiz');
  };

  const handleQuizComplete = async (score?: number, timeSpent?: number) => {
    if (selectedSubject) {
      await updateProgress(selectedSubject, 1);
    }
    setExerciseMode('selection');
    setSelectedSubject(null);
  };

  const handleBackToSelection = () => {
    setExerciseMode('selection');
    setSelectedSubject(null);
  };

  const currentSubject = subjects.find(s => s.name === selectedSubject);

  if (exerciseMode === 'mentor-welcome' && selectedSubject && currentSubject) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <MentorWelcome
            subject={selectedSubject}
            onClose={handleMentorWelcomeClose}
          />
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (exerciseMode === 'quiz' && selectedSubject && currentSubject) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSelection}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Quiz - {currentSubject.name}</h1>
          </div>
          
          <div className="p-6 flex-1 min-h-0">
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
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>{t('exercises_title')}</span>
            <Target size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-3">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white/15 backdrop-blur-md rounded-xl p-3 text-center shadow-lg">
                <activity.icon className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white text-xs font-medium">{activity.name}</p>
                <p className="text-white/80 text-xs">{activity.description}</p>
              </div>
            ))}
          </div>

          {/* Enhanced difficulty notice */}
          <div className="bg-red-500/20 backdrop-blur-md rounded-xl p-4 text-center shadow-lg border border-red-400/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">🔥</span>
              <h3 className="text-white font-bold">Nível Aumentado!</h3>
            </div>
            <p className="text-white/90 text-sm">
              Questões mais desafiadoras foram adicionadas para melhorar seu aprendizado
            </p>
          </div>

          {/* Subjects Grid */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">{t('select_subject')}</h2>
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject) => {
                const subjectProgress = getSubjectProgress(subject.name);
                
                return (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject.name)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10 relative"
                  >
                    {/* Enhanced difficulty indicator */}
                    <div className="absolute top-2 right-2">
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                        subject.difficulty === 'Difícil' ? 'bg-red-500/80 text-red-100' :
                        subject.difficulty === 'Médio' ? 'bg-yellow-500/80 text-yellow-100' :
                        'bg-green-500/80 text-green-100'
                      }`}>
                        {subject.difficulty}
                      </div>
                    </div>
                    
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
                            <Trophy size={12} className="text-yellow-400" />
                            <span className="text-white/80">Aprimorado</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400" />
                            <span className="text-white/80">{subjectProgress.progress_percentage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-white/60 text-2xl">
                        →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
