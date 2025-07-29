
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, Trophy, Star, Brain, Award } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';
import { useSound } from '@/contexts/SoundContext';
import StudyIntro from './study/StudyIntro';
import StudySection from './study/StudySection';
import StudyResults from './study/StudyResults';
import MentorEncouragement from './study/MentorEncouragement';

interface StudyContentViewerProps {
  subject: string;
  contentId: string;
  onBack: () => void;
  onComplete?: (contentId: string) => void;
}

type StudyPhase = 'intro' | 'studying' | 'mentor' | 'results';

const StudyContentViewer: React.FC<StudyContentViewerProps> = ({ 
  subject, 
  contentId, 
  onBack, 
  onComplete 
}) => {
  const { contents, updateContentProgress, getContentProgress } = useSubjectContents(subject);
  const { updateAffinity } = useMentorAffinity();
  const { playSound, isMuted } = useSound();
  
  const [currentPhase, setCurrentPhase] = useState<StudyPhase>('intro');
  const [currentSectionIndex, setSectionIndex] = useState(0);
  const [sectionsCompleted, setSectionsCompleted] = useState<number[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [sectionStartTime, setSectionStartTime] = useState<number>(0);

  const content = contents.find(c => c.id === contentId);
  const progress = getContentProgress(contentId);

  // Parse content into sections
  const sections = React.useMemo(() => {
    if (!content?.explanation) return [];
    
    const text = content.explanation;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());
    
    // Group paragraphs into sections (every 2-3 paragraphs)
    const sections = [];
    for (let i = 0; i < paragraphs.length; i += 2) {
      const sectionText = paragraphs.slice(i, i + 2).join('\n\n');
      sections.push({
        title: `Seção ${sections.length + 1}`,
        content: sectionText,
        estimatedTime: Math.max(1, Math.ceil(sectionText.length / 200)) // ~200 chars per minute
      });
    }
    
    return sections;
  }, [content]);

  useEffect(() => {
    if (currentPhase === 'studying') {
      setStartTime(Date.now());
      setSectionStartTime(Date.now());
    }
  }, [currentPhase]);

  const handleStartStudy = () => {
    if (!isMuted) playSound('click');
    setCurrentPhase('studying');
    setStartTime(Date.now());
    setSectionStartTime(Date.now());
  };

  const handleSectionComplete = async () => {
    if (!isMuted) playSound('click');
    
    const timeSpent = Math.round((Date.now() - sectionStartTime) / 1000);
    const sectionXP = Math.max(10, Math.min(25, timeSpent)); // 10-25 XP based on time spent
    
    setSectionsCompleted(prev => [...prev, currentSectionIndex]);
    setTotalXP(prev => prev + sectionXP);
    
    // Update progress
    const progressPercentage = Math.round(((sectionsCompleted.length + 1) / sections.length) * 100);
    await updateContentProgress(contentId, {
      completed: progressPercentage === 100,
      progress_percentage: progressPercentage,
      time_spent: (progress?.time_spent || 0) + timeSpent
    });
    
    // Check if study is complete
    if (currentSectionIndex >= sections.length - 1) {
      // Update mentor affinity
      await updateAffinity('pitagoras', sectionXP);
      setCurrentPhase('results');
    } else {
      // Show mentor encouragement every 2 sections
      if ((sectionsCompleted.length + 1) % 2 === 0) {
        setCurrentPhase('mentor');
      } else {
        setSectionIndex(prev => prev + 1);
        setSectionStartTime(Date.now());
      }
    }
  };

  const handleMentorContinue = () => {
    if (!isMuted) playSound('click');
    setSectionIndex(prev => prev + 1);
    setSectionStartTime(Date.now());
    setCurrentPhase('studying');
  };

  const handleFinish = () => {
    if (!isMuted) playSound('click');
    if (onComplete) {
      onComplete(contentId);
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
              <span>{content.estimated_time || 15} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className={getDifficultyColor(content.difficulty_level)}>
                {content.difficulty_level === 'easy' ? 'Fácil' : 
                 content.difficulty_level === 'medium' ? 'Médio' : 'Difícil'}
              </span>
            </div>
            {totalXP > 0 && (
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-400" />
                <span className="text-yellow-300">{totalXP} XP</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {currentPhase !== 'intro' && (
        <div className="p-4">
          <div className="bg-white/20 rounded-full h-3 mb-2 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500 relative"
              style={{ width: `${(sectionsCompleted.length / sections.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-white/80 text-sm text-center">
            {sectionsCompleted.length} de {sections.length} seções concluídas
          </p>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {currentPhase === 'intro' && (
          <StudyIntro
            title={content.title}
            description={content.description || ''}
            sectionsCount={sections.length}
            estimatedTime={content.estimated_time || 15}
            difficulty={content.difficulty_level || 'medium'}
            onStart={handleStartStudy}
          />
        )}

        {currentPhase === 'studying' && sections[currentSectionIndex] && (
          <StudySection
            section={sections[currentSectionIndex]}
            sectionIndex={currentSectionIndex}
            totalSections={sections.length}
            onComplete={handleSectionComplete}
          />
        )}

        {currentPhase === 'mentor' && (
          <MentorEncouragement
            sectionsCompleted={sectionsCompleted.length}
            totalSections={sections.length}
            xpEarned={totalXP}
            onContinue={handleMentorContinue}
          />
        )}

        {currentPhase === 'results' && (
          <StudyResults
            title={content.title}
            sectionsCompleted={sectionsCompleted.length}
            totalXP={totalXP}
            timeSpent={Math.round((Date.now() - startTime) / 1000)}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
};

export default StudyContentViewer;
