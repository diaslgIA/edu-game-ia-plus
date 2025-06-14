import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectQuiz from '@/components/SubjectQuiz';
import ContentSlides from '@/components/ContentSlides';
import VirtualTeacher from '@/components/VirtualTeacher';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Target, Trophy, Clock, Play, Star, CheckCircle } from 'lucide-react';

type ExerciseMode = 'selection' | 'slides' | 'teacher' | 'quiz';

const Exercises = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getSubjectProgress, updateProgress } = useUserProgress();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('selection');
  const [currentActivity, setCurrentActivity] = useState<'slides' | 'teacher' | 'quiz' | null>(null);

  useEffect(() => {
    const subjectFromUrl = searchParams.get('subject');
    if (subjectFromUrl) {
      setSelectedSubject(subjectFromUrl);
    }
  }, [searchParams]);

  const subjects = useMemo(() => [
    { id: 'matematica', name: t('subject_math_name'), description: t('subject_math_desc'), color: 'from-blue-500 to-blue-700', icon: '📐', difficulty: t('difficulty_medium'), exercises: 45 },
    { id: 'portugues', name: t('subject_portuguese_name'), description: t('subject_portuguese_desc'), color: 'from-green-500 to-green-700', icon: '📚', difficulty: t('difficulty_easy'), exercises: 52 },
    { id: 'fisica', name: t('subject_physics_name'), description: t('subject_physics_desc'), color: 'from-purple-500 to-purple-700', icon: '⚡', difficulty: t('difficulty_hard'), exercises: 38 },
    { id: 'quimica', name: t('subject_chemistry_name'), description: t('subject_chemistry_desc'), color: 'from-orange-500 to-orange-700', icon: '🧪', difficulty: t('difficulty_medium'), exercises: 41 },
    { id: 'biologia', name: t('subject_biology_name'), description: t('subject_biology_desc'), color: 'from-teal-500 to-teal-700', icon: '🧬', difficulty: t('difficulty_medium'), exercises: 47 },
    { id: 'historia', name: t('subject_history_name'), description: t('subject_history_desc'), color: 'from-amber-500 to-amber-700', icon: '🏛️', difficulty: t('difficulty_easy'), exercises: 36 },
    { id: 'geografia', name: t('subject_geography_name'), description: t('subject_geography_desc'), color: 'from-emerald-500 to-emerald-700', icon: '🌍', difficulty: t('difficulty_easy'), exercises: 33 },
    { id: 'filosofia', name: t('subject_philosophy_name'), description: t('subject_philosophy_desc'), color: 'from-indigo-500 to-indigo-700', icon: '🤔', difficulty: t('difficulty_medium'), exercises: 24 },
    { id: 'sociologia', name: t('subject_sociology_name'), description: t('subject_sociology_desc'), color: 'from-pink-500 to-pink-700', icon: '👥', difficulty: t('difficulty_easy'), exercises: 28 }
  ], [t]);

  const activities = useMemo(() => [
    { id: 'slides', name: t('activity_slides_name'), icon: BookOpen, color: 'bg-blue-500', description: t('activity_slides_desc') },
    { id: 'teacher', name: t('activity_teacher_name'), icon: Play, color: 'bg-green-500', description: t('activity_teacher_desc') },
    { id: 'quiz', name: t('activity_quiz_name'), icon: Trophy, color: 'bg-yellow-500', description: t('activity_quiz_desc') }
  ], [t]);

  const handleSubjectSelect = (subjectName: string) => {
    setSelectedSubject(subjectName);
  };

  const handleActivitySelect = (activity: 'slides' | 'teacher' | 'quiz') => {
    setCurrentActivity(activity);
    setExerciseMode(activity);
  };

  const handleActivityComplete = async (activity: 'slides' | 'teacher' | 'quiz') => {
    if (selectedSubject) {
      await updateProgress(selectedSubject, 1);
    }
    
    // Avançar para próxima atividade automaticamente
    if (activity === 'slides') {
      setExerciseMode('teacher');
      setCurrentActivity('teacher');
    } else if (activity === 'teacher') {
      setExerciseMode('quiz');
      setCurrentActivity('quiz');
    } 
    // Para 'quiz', não fazemos nada para evitar o redirecionamento automático.
    // O usuário permanecerá na tela de resultados e navegará clicando no botão.
  };

  const handleQuizComplete = (score: number, timeSpent: number) => {
    handleActivityComplete('quiz');
  };

  const handleBackToSelection = () => {
    setExerciseMode('selection');
    setCurrentActivity(null);
    // O `selectedSubject` não é limpo para que o usuário retorne
    // à tela de seleção de atividades da matéria atual.
  };

  const currentSubject = subjects.find(s => s.name === selectedSubject);

  if (exerciseMode === 'slides' && selectedSubject && currentSubject) {
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
            <h1 className="text-lg font-semibold">{t('content_title', { subject: currentSubject.name })}</h1>
          </div>
          
          <div className="p-6 flex-1 flex items-center justify-center min-h-0">
            <ContentSlides 
              subject={currentSubject.name}
              onComplete={() => handleActivityComplete('slides')}
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
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSelection}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">{t('virtual_teacher_title', { subject: currentSubject.name })}</h1>
          </div>
          
          <div className="p-6 flex-1 flex items-center justify-center min-h-0">
            <VirtualTeacher 
              subject={currentSubject.name}
              topic={currentSubject.description}
              onComplete={() => handleActivityComplete('teacher')}
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
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToSelection}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">{t('quiz_title', { subject: currentSubject.name })}</h1>
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
            <span>{selectedSubject ? t('activities_title', { subject: selectedSubject }) : t('exercises_title')}</span>
            <Target size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {!selectedSubject ? (
            <>
              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-3">
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
                        onClick={() => handleSubjectSelect(subject.name)}
                        className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
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
                                <span className="text-white/80">{t('exercises_count', { count: subject.exercises })}</span>
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
            </>
          ) : (
            <>
              {/* Subject Header */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-xl font-bold mb-2">{selectedSubject}</h2>
                <p className="text-white/80 mb-4">{t('select_activity')}</p>
                
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${getSubjectProgress(selectedSubject).progress_percentage}%` }}
                  />
                </div>
                <p className="text-sm text-white/80">
                  {t('progress')} {getSubjectProgress(selectedSubject).progress_percentage}%
                </p>
              </div>

              {/* Activities Selection */}
              <div className="grid grid-cols-1 gap-4">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    onClick={() => handleActivitySelect(activity.id as 'slides' | 'teacher' | 'quiz')}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-6 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl ${activity.color} flex items-center justify-center text-white shadow-lg`}>
                        <activity.icon size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{activity.name}</h3>
                        <p className="text-white/80 text-sm">{activity.description}</p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                            {t('step', { number: index + 1 })}
                          </span>
                          {currentActivity === activity.id && (
                            <CheckCircle size={16} className="text-green-400" />
                          )}
                        </div>
                      </div>
                      
                      <div className="text-white/60 text-2xl">
                        →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setSelectedSubject(null)}
                variant="outline"
                className="w-full text-white border-white/20 hover:bg-white/20"
              >
                {t('back_to_subjects')}
              </Button>
            </>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
