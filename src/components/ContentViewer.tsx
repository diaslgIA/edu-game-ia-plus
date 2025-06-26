
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';

interface ContentViewerProps {
  subject: string;
  contentId: string;
  onBack: () => void;
  onComplete?: (contentId: string) => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ 
  subject, 
  contentId, 
  onBack, 
  onComplete 
}) => {
  const { contents, updateContentProgress, getContentProgress } = useSubjectContents(subject);
  const [startTime, setStartTime] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState(0);

  const content = contents.find(c => c.id === contentId);
  const progress = getContentProgress(contentId);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    await updateContentProgress(contentId, {
      completed: true,
      progress_percentage: 100,
      time_spent: progress.time_spent + timeSpent
    });

    if (onComplete) {
      onComplete(contentId);
    }
  };

  const handleSectionComplete = async () => {
    if (!content) return;

    const sections = content.content_data?.sections || [];
    const progressPercentage = Math.round(((currentSection + 1) / sections.length) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    await updateContentProgress(contentId, {
      completed: progressPercentage === 100,
      progress_percentage: progressPercentage,
      time_spent: progress.time_spent + timeSpent
    });

    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setStartTime(Date.now());
    } else {
      handleComplete();
    }
  };

  if (!content) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-4">Conteúdo não encontrado</h3>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="mr-2" size={16} />
          Voltar
        </Button>
      </div>
    );
  }

  const sections = content.content_data?.sections || [];
  const currentSectionData = sections[currentSection];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="text-white p-2 hover:bg-white/20 rounded-xl"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{content.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{content.estimated_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen size={14} />
              <span className={getDifficultyColor(content.difficulty_level)}>
                {content.difficulty_level === 'easy' ? 'Fácil' : 
                 content.difficulty_level === 'medium' ? 'Médio' : 'Difícil'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4">
        <div className="bg-white/20 rounded-full h-2 mb-2">
          <div 
            className="bg-green-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
        <p className="text-white/80 text-sm text-center">
          Seção {currentSection + 1} de {sections.length}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentSectionData && (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">{currentSectionData.title}</h2>
            <div className="text-white/90 text-base leading-relaxed whitespace-pre-line">
              {currentSectionData.content}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-white/10">
        <div className="flex space-x-3">
          {currentSection < sections.length - 1 ? (
            <Button 
              onClick={handleSectionComplete}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
            >
              <Play className="mr-2" size={16} />
              Próxima Seção
            </Button>
          ) : (
            <Button 
              onClick={handleSectionComplete}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3"
            >
              <CheckCircle className="mr-2" size={16} />
              Concluir Conteúdo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;
