import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubjectContent } from '@/types/subject-content';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, BookOpen, Target, Star } from 'lucide-react';
import ContentSlides from './ContentSlides';
import InteractiveSection from './interactive/InteractiveSection';
import ChallengeSection from './interactive/ChallengeSection';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { toast } from '@/components/ui/use-toast';
import { getSubjectVariants } from '@/utils/subjectMapping';

interface GamifiedContentViewerProps {
  contentId: string;
  onBack: () => void;
  onComplete: () => void;
  subject: string;
}

const GamifiedContentViewer: React.FC<GamifiedContentViewerProps> = ({ 
  contentId, 
  onBack, 
  onComplete, 
  subject 
}) => {
  const subjectVariants = getSubjectVariants(subject);
  const { updateContentProgress } = useSubjectContents(subjectVariants);
  const [content, setContent] = useState<SubjectContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState([false, false, false, false]);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('subject_contents')
          .select('*')
          .eq('id', contentId)
          .single();

        if (error) {
          console.error('Error loading content:', error);
          toast({
            title: "Erro ao carregar conteúdo",
            description: "Houve um problema ao carregar o conteúdo. Por favor, tente novamente.",
            variant: "destructive",
          });
          return;
        }

        setContent(data as SubjectContent);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId]);

  const handleSectionComplete = () => {
    const updatedSections = [...sectionCompleted];
    updatedSections[currentSection] = true;
    setSectionCompleted(updatedSections);
  };

  const handleNext = async () => {
    if (currentSection < 3) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);

      // Update progress when moving to the next section
      const progressPercentage = ((nextSection) / 4) * 100;
      await updateContentProgress(contentId, { progress_percentage: progressPercentage });
    } else {
      // Mark as complete and go back
      await updateContentProgress(contentId, { completed: true, progress_percentage: 100 });
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
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
        <h1 className="text-lg font-semibold">{content?.title || 'Carregando...'}</h1>
        
        {/* Progress indicator */}
        <div className="ml-auto flex items-center space-x-2">
          <div className="text-xs bg-white/20 px-2 py-1 rounded-lg">
            {currentSection + 1}/4
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="flex-1 overflow-hidden">
        {currentSection === 0 && content && (
          <ContentSlides 
            content={content} 
            onComplete={handleSectionComplete}
          />
        )}
        
        {currentSection === 1 && content?.interactive_activities && (
          <InteractiveSection
            activities={content.interactive_activities}
            onComplete={handleSectionComplete}
          />
        )}
        
        {currentSection === 2 && content?.quiz_questions && (
          <div className="p-6 h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Target className="mr-2" size={24} />
                Quiz de Verificação
              </h2>
              {/* Quiz implementation would go here */}
              <Button 
                onClick={handleSectionComplete}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Completar Quiz
              </Button>
            </div>
          </div>
        )}
        
        {currentSection === 3 && content?.challenge_question && (
          <ChallengeSection
            challenge={content.challenge_question}
            onComplete={handleSectionComplete}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="p-4 bg-white/10 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Anterior
          </Button>
          
          <div className="flex space-x-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index <= currentSection ? 'bg-yellow-400' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={currentSection >= 3 || !sectionCompleted[currentSection]}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800"
          >
            {currentSection === 3 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamifiedContentViewer;
