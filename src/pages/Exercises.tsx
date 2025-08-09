
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectQuiz from '@/components/SubjectQuiz';
import MentorWelcome from '@/components/MentorWelcome';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Trophy, Clock, Play, Star, CheckCircle, RefreshCw } from 'lucide-react';

type ExerciseMode = 'selection' | 'quiz' | 'mentor-welcome';

const Exercises = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getSubjectProgress, updateProgress } = useUserProgress();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('selection');
  const [showMentorWelcome, setShowMentorWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject');
    if (subjectFromUrl) {
      setSelectedSubject(subjectFromUrl);
    }
    
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const subjects = useMemo(() => [
    { id: 'matematica', name: 'Matemática', description: 'Números, álgebra, geometria e cálculos', color: 'from-blue-500 to-blue-700', icon: '📐', difficulty: 'Médio', exercises: 45 },
    { id: 'portugues', name: 'Português', description: 'Gramática, literatura e redação', color: 'from-green-500 to-green-700', icon: '📚', difficulty: 'Fácil', exercises: 52 },
    { id: 'fisica', name: 'Física', description: 'Mecânica, eletricidade e termodinâmica', color: 'from-purple-500 to-purple-700', icon: '⚡', difficulty: 'Difícil', exercises: 38 },
    { id: 'quimica', name: 'Química', description: 'Átomos, moléculas e reações químicas', color: 'from-orange-500 to-orange-700', icon: '🧪', difficulty: 'Médio', exercises: 41 },
    { id: 'biologia', name: 'Biologia', description: 'Vida, células e evolução', color: 'from-teal-500 to-teal-700', icon: '🧬', difficulty: 'Médio', exercises: 47 },
    { id: 'historia', name: 'História', description: 'Civilizações, eventos e culturas', color: 'from-amber-500 to-amber-700', icon: '🏛️', difficulty: 'Fácil', exercises: 36 },
    { id: 'geografia', name: 'Geografia', description: 'Países, climas e relevos', color: 'from-emerald-500 to-emerald-700', icon: '🌍', difficulty: 'Fácil', exercises: 33 },
    { id: 'filosofia', name: 'Filosofia', description: 'Pensamento crítico e reflexão', color: 'from-indigo-500 to-indigo-700', icon: '🤔', difficulty: 'Médio', exercises: 24 },
    { id: 'sociologia', name: 'Sociologia', description: 'Sociedade e relações humanas', color: 'from-pink-500 to-pink-700', icon: '👥', difficulty: 'Fácil', exercises: 28 },
    { id: 'ingles', name: 'Inglês', description: 'Gramática, vocabulário e conversação', color: 'from-blue-600 to-indigo-600', icon: '🇺🇸', difficulty: 'Médio', exercises: 15 },
    { id: 'espanhol', name: 'Espanhol', description: 'Idioma, cultura e comunicação', color: 'from-red-500 to-red-700', icon: '🇪🇸', difficulty: 'Médio', exercises: 8 },
    { id: 'literatura', name: 'Literatura', description: 'Obras clássicas e análise textual', color: 'from-violet-500 to-violet-700', icon: '📖', difficulty: 'Médio', exercises: 12 }
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

  const handleQuizComplete = async (score: number, timeSpent: number) => {
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

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const currentSubject = subjects.find(s => s.name === selectedSubject);

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20 items-center justify-center">
          <div className="animate-spin text-white mb-4" style={{ fontSize: '48px' }}>📚</div>
          <p className="text-white mb-4">Carregando exercícios...</p>
          <Button 
            onClick={handleRetry}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Tentar novamente
          </Button>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (error) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20 items-center justify-center">
          <div className="text-red-300 mb-4" style={{ fontSize: '48px' }}>⚠️</div>
          <p className="text-white mb-2">Erro ao carregar exercícios</p>
          <p className="text-white/80 text-sm mb-4">{error}</p>
          <Button 
            onClick={handleRetry}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Tentar novamente
          </Button>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  // Tela de Boas-vindas do Mentor
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

          {/* Subjects Grid */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">{t('select_subject')}</h2>
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject) => {
                const subjectProgress = getSubjectProgress(subject.name);
                const hasLimitedContent = subject.exercises < 20;
                
                return (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject.name)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10 relative"
                  >
                    {hasLimitedContent && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-yellow-500/80 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                          Em desenvolvimento
                        </div>
                      </div>
                    )}
                    
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
