import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectQuiz from '@/components/SubjectQuiz';
import MentorWelcome from '@/components/MentorWelcome';
import SimulatedExam from '@/components/SimulatedExam';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useAllSubjectQuestions } from '@/hooks/useAllSubjectQuestions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Trophy, Clock, Play, Star, CheckCircle, Timer, BookOpen } from 'lucide-react';

type ExerciseMode = 'selection' | 'quiz' | 'mentor-welcome' | 'simulado-setup' | 'simulado';

const Exercises = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getSubjectProgress, updateProgress } = useUserProgress();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('selection');
  const [showMentorWelcome, setShowMentorWelcome] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isEnemSimulado, setIsEnemSimulado] = useState(false);

  // Hooks para questões
  const { questions: subjectQuestions, loading: subjectLoading } = useSubjectQuestions(selectedSubject || '');
  const { questions: allQuestions, loading: allLoading, getAvailableCount } = useAllSubjectQuestions();

  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject');
    if (subjectFromUrl) {
      setSelectedSubject(subjectFromUrl);
    }
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
    { id: 'quiz', name: t('activity_quiz_name'), icon: Trophy, color: 'bg-yellow-500', description: t('activity_quiz_desc') },
    { id: 'simulado', name: 'Simulado', icon: Timer, color: 'bg-red-500', description: 'Teste cronometrado com questões da matéria' }
  ], [t]);

  const handleActivitySelect = (activityId: string, subjectName: string) => {
    setSelectedSubject(subjectName);
    setSelectedActivity(activityId);
    setIsEnemSimulado(false);
    
    if (activityId === 'quiz') {
      setShowMentorWelcome(true);
      setExerciseMode('mentor-welcome');
    } else if (activityId === 'simulado') {
      setExerciseMode('simulado-setup');
    }
  };

  const handleEnemSimuladoSelect = () => {
    setSelectedSubject('ENEM');
    setSelectedActivity('simulado');
    setIsEnemSimulado(true);
    setExerciseMode('simulado-setup');
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
    setSelectedActivity(null);
  };

  const handleSimuladoComplete = async (score: number, timeSpent: number) => {
    if (selectedSubject && !isEnemSimulado) {
      await updateProgress(selectedSubject, 1);
    }
    setExerciseMode('selection');
    setSelectedSubject(null);
    setSelectedActivity(null);
    setIsEnemSimulado(false);
  };

  const handleBackToSelection = () => {
    setExerciseMode('selection');
    setSelectedSubject(null);
    setSelectedActivity(null);
    setIsEnemSimulado(false);
  };

  const handleStartSimulado = () => {
    setExerciseMode('simulado');
  };

  const currentSubject = subjects.find(s => s.name === selectedSubject);
  
  // Determinar quantas questões estão disponíveis
  const getAvailableQuestions = () => {
    if (isEnemSimulado) {
      return getAvailableCount();
    }
    return subjectQuestions.length;
  };

  const getMaxQuestionCount = () => {
    const available = getAvailableQuestions();
    return Math.min(questionCount, available);
  };

  // Tela de Setup do Simulado
  if (exerciseMode === 'simulado-setup' && selectedSubject) {
    const availableQuestions = getAvailableQuestions();
    const isLoading = isEnemSimulado ? allLoading : subjectLoading;
    
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
            <h1 className="text-lg font-semibold">
              {isEnemSimulado ? 'Simulado ENEM' : `Simulado - ${currentSubject?.name}`}
            </h1>
          </div>
          
          <div className="p-6 flex-1 flex items-center justify-center">
            {isLoading ? (
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400 mx-auto mb-4"></div>
                <p className="text-white/80">Carregando questões...</p>
              </div>
            ) : (
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 w-full max-w-md text-center">
                <Timer className="mx-auto mb-4 text-red-400" size={48} />
                <h3 className="text-xl font-bold text-white mb-4">
                  Configurar Simulado
                </h3>
                
                <div className="mb-6">
                  <p className="text-white/80 mb-4">Escolha o número de questões:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[10, 20, 30].map((count) => {
                      const isAvailable = count <= availableQuestions;
                      const actualCount = Math.min(count, availableQuestions);
                      
                      return (
                        <button
                          key={count}
                          onClick={() => setQuestionCount(count)}
                          disabled={!isAvailable}
                          className={`p-3 rounded-xl border-2 transition-colors ${
                            questionCount === count
                              ? 'border-red-400 bg-red-400/20 text-white'
                              : isAvailable
                              ? 'border-white/30 bg-white/10 text-white/80 hover:border-red-300'
                              : 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'
                          }`}
                        >
                          <div className="font-bold text-lg">{actualCount}</div>
                          <div className="text-xs">questões</div>
                          {!isAvailable && (
                            <div className="text-xs text-red-300 mt-1">Indisponível</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {availableQuestions < 30 && (
                    <p className="text-yellow-300 text-xs mt-3">
                      Disponível: {availableQuestions} questões
                    </p>
                  )}
                </div>

                <div className="bg-red-50/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-red-200 mb-2">Informações:</h4>
                  <ul className="text-sm text-red-100 space-y-1 text-left">
                    <li>• Tempo total: 5 minutos</li>
                    <li>• {getMaxQuestionCount()} questões {isEnemSimulado ? 'multidisciplinares' : `de ${currentSubject?.name}`}</li>
                    <li>• 10 pontos por resposta correta</li>
                    <li>• Não é possível voltar às questões</li>
                    <li>• Resultado salvo automaticamente</li>
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={handleBackToSelection}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleStartSimulado}
                    disabled={availableQuestions === 0}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                  >
                    <Play className="mr-2" size={16} />
                    Iniciar
                  </Button>
                </div>
              </div>
            )}
          </div>
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

  // Tela do Simulado
  if (exerciseMode === 'simulado' && selectedSubject) {
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
            <h1 className="text-lg font-semibold">
              {isEnemSimulado ? 'Simulado ENEM' : `Simulado - ${currentSubject?.name}`}
            </h1>
          </div>
          
          <div className="p-4 flex-1 min-h-0">
            <SimulatedExam 
              subject={selectedSubject}
              duration={5}
              questionCount={getMaxQuestionCount()}
              onComplete={handleSimuladoComplete}
              isEnemMode={isEnemSimulado}
            />
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  // Tela do Quiz
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
          {/* Simulado ENEM Card */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-2xl shadow-lg">
                🎯
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg mb-1">Simulado ENEM</h3>
                <p className="text-white/90 text-sm mb-2">Teste completo com questões de todas as matérias</p>
                
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <BookOpen size={12} className="text-white" />
                    <span className="text-white/90">Multidisciplinar</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Timer size={12} className="text-white" />
                    <span className="text-white/90">5 minutos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target size={12} className="text-white" />
                    <span className="text-white/90">{getAvailableCount()} questões</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleEnemSimuladoSelect}
              className="w-full py-3 px-4 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors backdrop-blur-sm border border-white/20"
            >
              <Timer className="w-4 h-4 mx-auto mb-1" />
              Iniciar Simulado ENEM
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
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
                
                return (
                  <div
                    key={subject.id}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4 mb-4">
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
                    </div>
                    
                    {/* Atividades */}
                    <div className="flex space-x-2">
                      {activities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => handleActivitySelect(activity.id, subject.name)}
                          className={`flex-1 py-2 px-3 rounded-lg text-white text-sm font-medium transition-colors ${
                            activity.id === 'quiz' 
                              ? 'bg-yellow-500 hover:bg-yellow-600' 
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                        >
                          <activity.icon className="w-4 h-4 mx-auto mb-1" />
                          {activity.name}
                        </button>
                      ))}
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
