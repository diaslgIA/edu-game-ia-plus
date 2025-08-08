
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useInlineActivities } from '@/hooks/useInlineActivities';
import InlineFlashcard from './interactive/InlineFlashcard';
import InlineQuickQuiz from './interactive/InlineQuickQuiz';
import InlineChallengeQuestion from './interactive/InlineChallengeQuestion';
import SubjectQuiz from './SubjectQuiz';

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
  const { completedActivities, recordActivity } = useInlineActivities(contentId, subject);
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const content = contents.find(c => c.id === contentId);
  const progress = getContentProgress(contentId);

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

  // Generate inline activities from content
  const generateInlineActivities = () => {
    const activities = [];
    
    // Create flashcards from key concepts
    if (content.key_concepts && Array.isArray(content.key_concepts)) {
      content.key_concepts.forEach((concept: any, index: number) => {
        if (typeof concept === 'object' && concept.term && concept.definition) {
          activities.push({
            id: `flashcard-${index}`,
            type: 'flashcard',
            data: {
              front: concept.term,
              back: concept.definition
            }
          });
        }
      });
    }

    // Create quick quiz from interactive activities
    if (content.interactive_activities?.quiz?.questions) {
      content.interactive_activities.quiz.questions.forEach((question: any, index: number) => {
        if (question.question && question.options) {
          activities.push({
            id: `quiz-${index}`,
            type: 'quiz',
            data: {
              question: question.question,
              options: question.options.map((opt: any) => ({
                text: opt.text || opt,
                isCorrect: opt.isCorrect || false
              }))
            }
          });
        }
      });
    }

    return activities;
  };

  const handleActivityComplete = async (activityId: string, correct: boolean, points?: number) => {
    const finalPoints = points || (correct ? 10 : 0);
    await recordActivity('interaction', activityId, finalPoints);
  };

  const handleSectionComplete = async () => {
    const newSection = currentSection + 1;
    const totalSections = content.content_data?.sections?.length || 1;
    
    if (newSection >= totalSections) {
      // Show quiz before completing
      setShowQuiz(true);
    } else {
      setCurrentSection(newSection);
    }

    // Update progress
    const progressPercentage = Math.round(((newSection) / (totalSections + 1)) * 100);
    await updateContentProgress(contentId, {
      progress_percentage: progressPercentage,
      completed: false
    });
  };

  const handleQuizComplete = async () => {
    await updateContentProgress(contentId, {
      progress_percentage: 100,
      completed: true
    });
    
    if (onComplete) {
      onComplete(contentId);
    }
  };

  if (showQuiz) {
    return (
      <div className="h-full">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowQuiz(false)}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Quiz - {content.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <SubjectQuiz
            subject={subject}
            topic={content.title}
            onComplete={handleQuizComplete}
            onBack={() => setShowQuiz(false)}
          />
        </div>
      </div>
    );
  }

  const sections = content.content_data?.sections || [
    {
      title: content.title,
      content: content.description || content.detailed_explanation || 'Conteúdo em desenvolvimento.'
    }
  ];

  const currentSectionData = sections[currentSection];
  const inlineActivities = generateInlineActivities();
  
  // Show activities after every 2 sections
  const shouldShowActivity = (currentSection + 1) % 2 === 0 && inlineActivities.length > 0;
  const activityIndex = Math.floor(currentSection / 2) % inlineActivities.length;

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
            <span>
              Seção {currentSection + 1} de {sections.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4">
        <div className="bg-white/20 rounded-full h-2">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">{currentSectionData.title}</h2>
          
          {content.infographic_url && currentSection === 0 && (
            <div className="mb-6">
              <img 
                src={content.infographic_url} 
                alt={`Infográfico - ${content.title}`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
          
          <div className="text-white/90 text-base leading-relaxed space-y-4 mb-6">
            <div className="whitespace-pre-line">
              {currentSectionData.content}
            </div>
          </div>

          {/* Show inline activity after content */}
          {shouldShowActivity && inlineActivities[activityIndex] && (
            <div className="my-6">
              {inlineActivities[activityIndex].type === 'flashcard' && (
                <InlineFlashcard
                  item={inlineActivities[activityIndex].data}
                  onComplete={(correct) => handleActivityComplete(
                    inlineActivities[activityIndex].id, 
                    correct
                  )}
                />
              )}
              
              {inlineActivities[activityIndex].type === 'quiz' && (
                <InlineQuickQuiz
                  question={inlineActivities[activityIndex].data.question}
                  options={inlineActivities[activityIndex].data.options}
                  onComplete={(correct) => handleActivityComplete(
                    inlineActivities[activityIndex].id, 
                    correct
                  )}
                />
              )}
            </div>
          )}

          {/* Challenge question at the end */}
          {currentSection === sections.length - 1 && content.challenge_question && (
            <div className="mt-6">
              <InlineChallengeQuestion
                question={content.challenge_question.question || "Explique com suas palavras o que você aprendeu nesta seção."}
                onComplete={(points) => handleActivityComplete('challenge', true, points)}
              />
            </div>
          )}

          <div className="text-center mt-6">
            <Button 
              onClick={handleSectionComplete}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3"
            >
              {currentSection === sections.length - 1 ? (
                <>
                  <CheckCircle className="mr-2" size={16} />
                  Finalizar com Quiz
                </>
              ) : (
                <>
                  Próxima Seção
                  <ArrowLeft className="ml-2 rotate-180" size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;
