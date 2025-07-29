
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Trophy, X } from 'lucide-react';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useGameification } from '@/hooks/useGameification';
import { conteudoEducacional } from '@/data/conteudoLocal';
import MentorReaction from '@/components/MentorReaction';

const LessonViewer: React.FC = () => {
  const { subject, lessonId } = useParams<{ subject: string; lessonId: string }>();
  const navigate = useNavigate();
  const { updateProgress, getLessonProgress } = useLessonProgress(subject || '');
  const { awardXP, updateDailyGoal, unlockAchievement } = useGameification();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [showMentorReaction, setShowMentorReaction] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  // Find the lesson content
  const lessonIndex = parseInt(lessonId?.replace('lesson_', '') || '0');
  const lessons = conteudoEducacional.conteudos.filter(c => c.materia === subject);
  const lesson = lessons[lessonIndex];

  const lessonProgress = getLessonProgress(lessonId || '');

  useEffect(() => {
    if (lessonProgress) {
      setHearts(lessonProgress.hearts_remaining);
      setScore(lessonProgress.score);
    }
  }, [lessonProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  if (!lesson || !subject || !lessonId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Lição não encontrada</h2>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </div>
    );
  }

  const sections = [
    { title: 'O que é?', content: lesson.explicacao || lesson.detalhes?.['O que é?'] || '' },
    { title: 'Conceitos Principais', content: lesson.detalhes?.['Conceitos Principais'] || '' },
    { title: 'Exemplo Prático', content: lesson.detalhes?.['Exemplo Prático'] || '' },
    { title: 'Exercício', content: '', type: 'exercise' }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect);
    setShowMentorReaction(true);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      awardXP(10);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  const handleMentorReactionComplete = () => {
    setShowMentorReaction(false);
    
    if (hearts <= 1 && !lastAnswerCorrect) {
      // Game over
      handleLessonComplete(false);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      // Lesson completed
      handleLessonComplete(true);
    }
  };

  const handleLessonComplete = async (completed: boolean) => {
    const finalScore = completed ? score : 0;
    const perfectScore = completed && hearts === 3 && score >= 30; // Max possible score

    await updateProgress(lessonId, {
      completed,
      score: finalScore,
      max_score: 40,
      attempts: (lessonProgress?.attempts || 0) + 1,
      time_spent: timeSpent,
      hearts_remaining: hearts,
      perfect_score: perfectScore,
    });

    if (completed) {
      await updateDailyGoal('lessons');
      await updateDailyGoal('xp', finalScore);
      
      if (perfectScore) {
        await unlockAchievement({
          achievement_id: `perfect_${subject}_${lessonId}`,
          achievement_name: 'Execução Perfeita',
          achievement_description: `Completou ${lesson.titulo} sem errar!`,
          achievement_icon: '👑',
          points_awarded: 20,
          subject: subject,
        });
      }
    }

    navigate(`/subjects/${subject}`);
  };

  const renderExercise = () => {
    // Simple multiple choice question based on lesson content
    const question = `Qual é o conceito principal de ${lesson.titulo}?`;
    const options = [
      lesson.explicacao?.substring(0, 50) + '...',
      'Uma alternativa incorreta relacionada ao tema',
      'Outra opção incorreta mas plausível',
      'Uma quarta opção também incorreta'
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <div className="space-y-3">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index === 0)}
              className="w-full text-left p-4 h-auto bg-white border-2 border-gray-200 hover:border-blue-400 text-gray-800"
              variant="outline"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const currentSectionData = sections[currentSection];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        
        <div className="flex items-center space-x-4">
          {/* Hearts */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                size={16}
                className={i < hearts ? 'text-red-500 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          
          {/* Score */}
          <div className="flex items-center space-x-1 text-yellow-600">
            <Trophy size={16} />
            <span className="font-semibold">{score}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-gray-600"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 pb-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
        <div className="text-center text-sm text-gray-600 mt-1">
          {currentSection + 1} de {sections.length}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {lesson.titulo}
          </h2>
          
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            {currentSectionData.title}
          </h3>
          
          {currentSectionData.type === 'exercise' ? (
            renderExercise()
          ) : (
            <div className="prose prose-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {currentSectionData.content}
              </p>
            </div>
          )}
          
          {/* Navigation */}
          {currentSectionData.type !== 'exercise' && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => {
                  if (currentSection < sections.length - 1) {
                    setCurrentSection(prev => prev + 1);
                  } else {
                    handleLessonComplete(true);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
              >
                {currentSection < sections.length - 1 ? 'Continuar' : 'Finalizar'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mentor Reaction */}
      {showMentorReaction && (
        <MentorReaction
          subject={subject}
          isCorrect={lastAnswerCorrect}
          onComplete={handleMentorReactionComplete}
        />
      )}
    </div>
  );
};

export default LessonViewer;
