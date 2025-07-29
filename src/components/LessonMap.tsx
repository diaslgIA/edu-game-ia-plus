
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock, Star, Check, Crown, Play } from 'lucide-react';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { conteudoEducacional } from '@/data/conteudoLocal';

interface LessonMapProps {
  subject: string;
  onBack: () => void;
}

const LessonMap: React.FC<LessonMapProps> = ({ subject, onBack }) => {
  const navigate = useNavigate();
  const { progress, isLessonUnlocked, getLessonProgress } = useLessonProgress(subject);

  // Get lessons for this subject
  const lessons = conteudoEducacional.conteudos.filter(c => c.subject_id === subject);

  const getLessonStatus = (lessonIndex: number, lessonId: string) => {
    const lessonProgress = getLessonProgress(lessonId);
    
    if (!isLessonUnlocked(lessonIndex)) return 'locked';
    if (lessonProgress?.perfect_score) return 'perfect';
    if (lessonProgress?.completed) return 'completed';
    return 'available';
  };

  const getLessonIcon = (status: string) => {
    switch (status) {
      case 'locked': return <Lock size={20} className="text-gray-400" />;
      case 'perfect': return <Crown size={20} className="text-yellow-500" />;
      case 'completed': return <Check size={20} className="text-green-500" />;
      case 'available': return <Play size={20} className="text-blue-500" />;
      default: return <Star size={20} className="text-gray-400" />;
    }
  };

  const getLessonColor = (status: string) => {
    switch (status) {
      case 'locked': return 'bg-gray-200 border-gray-300';
      case 'perfect': return 'bg-yellow-100 border-yellow-400 shadow-yellow-200';
      case 'completed': return 'bg-green-100 border-green-400 shadow-green-200';
      case 'available': return 'bg-blue-100 border-blue-400 shadow-blue-200';
      default: return 'bg-gray-200 border-gray-300';
    }
  };

  const handleLessonClick = (lessonIndex: number, lessonId: string) => {
    if (isLessonUnlocked(lessonIndex)) {
      navigate(`/lesson/${subject}/${lessonId}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Voltar
        </Button>
        <h1 className="text-xl font-bold text-gray-800">{subject}</h1>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Lesson Map */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-6">
          {lessons.map((lesson, index) => {
            const lessonId = `lesson_${index}`;
            const status = getLessonStatus(index, lessonId);
            const lessonProgress = getLessonProgress(lessonId);
            
            return (
              <div
                key={lesson.id}
                className={`relative ${index % 2 === 0 ? 'ml-0' : 'ml-8'}`}
              >
                {/* Connecting Line */}
                {index < lessons.length - 1 && (
                  <div className="absolute top-20 left-1/2 w-0.5 h-12 bg-gray-300 transform -translate-x-1/2 z-0" />
                )}
                
                {/* Lesson Circle */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => handleLessonClick(index, lessonId)}
                    disabled={!isLessonUnlocked(index)}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-200 hover:scale-105 ${getLessonColor(status)} ${
                      status !== 'locked' ? 'cursor-pointer shadow-lg' : 'cursor-not-allowed'
                    }`}
                  >
                    {getLessonIcon(status)}
                  </button>
                  
                  {/* Lesson Info */}
                  <div className="mt-2 text-center max-w-32">
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                      {lesson.title}
                    </h3>
                    
                    {lessonProgress && (
                      <div className="mt-1">
                        <div className="text-xs text-gray-600">
                          {lessonProgress.score}/{lessonProgress.max_score} pts
                        </div>
                        {lessonProgress.attempts > 1 && (
                          <div className="text-xs text-orange-500">
                            {lessonProgress.attempts} tentativas
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Hearts indicator for current lesson */}
                  {status === 'available' && lessonProgress && lessonProgress.hearts_remaining < 3 && (
                    <div className="flex mt-1 space-x-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 ${
                            i < lessonProgress.hearts_remaining
                              ? 'text-red-500'
                              : 'text-gray-300'
                          }`}
                        >
                          ❤️
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Completion Message */}
          {lessons.length > 0 && progress.filter(p => p.completed).length === lessons.length && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Parabéns!
              </h2>
              <p className="text-gray-600">
                Você completou todas as lições de {subject}!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonMap;
