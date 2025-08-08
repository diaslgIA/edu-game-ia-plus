
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SubjectContent } from '@/types/subject-content';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ContentSlides from './ContentSlides';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { getSubjectVariants } from '@/utils/subjectMapping';

interface ContentViewerProps {
  contentId: string;
  onBack: () => void;
  subject: string;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ contentId, onBack, subject }) => {
  const [content, setContent] = useState<SubjectContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  const subjectVariants = getSubjectVariants(subject);
  const { updateContentProgress } = useSubjectContents(subjectVariants);

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
          return;
        }

        setContent(data as SubjectContent);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId]);

  const handleComplete = async () => {
    await updateContentProgress(contentId, { completed: true, progress_percentage: 100 });
    onBack();
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

  return (
    <div className="h-full flex flex-col">
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
      </div>
      
      <div className="flex-1">
        <ContentSlides 
          content={content}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
};

export default ContentViewer;
