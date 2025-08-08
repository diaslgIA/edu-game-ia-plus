
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubjectContent } from '@/types/subject-content';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, BookOpen, Target, Star } from 'lucide-react';
import ContentSlides from './ContentSlides';
import InteractiveSection from './interactive/InteractiveSection';
import ChallengeSection from './interactive/ChallengeSection';
import SubjectQuiz from './SubjectQuiz';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { toast } from '@/hooks/use-toast';
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
  const { getQuestionsByTopic } = useSubjectQuestions(subjectVariants);
  const [content, setContent] = useState<SubjectContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionCompleted, setSectionCompleted] = useState<boolean[]>([]);

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
        
        // Inicializar array de seções completadas baseado nas seções disponíveis
        const availableSections = getAvailableSections(data as SubjectContent);
        setSectionCompleted(new Array(availableSections.length).fill(false));
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
    if (!content) return;
    
    const availableSections = getAvailableSections(content);
    
    if (currentSection < availableSections.length - 1) {
      const nextSection = currentSection + 1;
      setCurrentSection(nextSection);

      // Update progress when moving to the next section
      const progressPercentage = ((nextSection) / availableSections.length) * 100;
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

  // Determinar quantas seções existem baseado no conteúdo disponível
  const getAvailableSections = (contentData: SubjectContent) => {
    const sections = [];
    
    // Seção 1: Sempre existe (teoria)
    sections.push({ type: 'theory', name: 'Teoria' });
    
    // Seção 2: Atividades interativas (se existirem)
    if (contentData?.interactive_activities && Object.keys(contentData.interactive_activities).length > 0) {
      sections.push({ type: 'interactive', name: 'Interativo' });
    }
    
    // Seção 3: Quiz (se existirem questões para o tópico)
    const topicQuestions = getQuestionsByTopic(contentData?.topic_name || contentData?.title || '');
    if (topicQuestions.length > 0) {
      sections.push({ type: 'quiz', name: 'Quiz' });
    }
    
    // Seção 4: Desafio (se existir)
    if (contentData?.challenge_question) {
      sections.push({ type: 'challenge', name: 'Desafio' });
    }
    
    return sections;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-center">
          <h2 className="text-xl font-bold mb-4">Conteúdo não encontrado</h2>
          <Button onClick={onBack} className="bg-blue-500 hover:bg-blue-600">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const availableSections = getAvailableSections(content);
  const currentSectionData = availableSections[currentSection];

  if (!currentSectionData) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-white text-center">
          <h2 className="text-xl font-bold mb-4">Seção não encontrada</h2>
          <Button onClick={onBack} className="bg-blue-500 hover:bg-blue-600">
            Voltar
          </Button>
        </div>
      </div>
    );
  }

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
        <h1 className="text-lg font-semibold">{content.title}</h1>
        
        {/* Progress indicator */}
        <div className="ml-auto flex items-center space-x-2">
          <div className="text-xs bg-white/20 px-2 py-1 rounded-lg">
            {currentSection + 1}/{availableSections.length}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="flex-1 overflow-hidden">
        {currentSectionData.type === 'theory' && (
          <ContentSlides 
            content={content} 
            onComplete={handleSectionComplete}
          />
        )}
        
        {currentSectionData.type === 'interactive' && content.interactive_activities && (
          <InteractiveSection
            contentId={contentId}
            subject={subject}
            activities={content.interactive_activities}
            onComplete={handleSectionComplete}
          />
        )}
        
        {currentSectionData.type === 'quiz' && (
          <div className="h-full">
            <SubjectQuiz
              subject={subject}
              topic={content.topic_name || content.title}
              onComplete={handleSectionComplete}
              onBack={() => {}} // Empty since we handle navigation here
            />
          </div>
        )}
        
        {currentSectionData.type === 'challenge' && content.challenge_question && (
          <ChallengeSection
            contentId={contentId}
            subject={subject}
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
            {availableSections.map((section, index) => (
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
            disabled={currentSection >= availableSections.length - 1 || !sectionCompleted[currentSection]}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800"
          >
            {currentSection === availableSections.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamifiedContentViewer;
