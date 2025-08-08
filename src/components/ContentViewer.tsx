
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

  // Wrapper para evitar erro de tipos do ContentSlidesProps
  const AnyContentSlides = ContentSlides as any;

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

        // Fazemos cast explícito para o tipo esperado internamente
        setContent((data as unknown) as SubjectContent);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [contentId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white">Carregando conteúdo...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-white">Conteúdo não encontrado</div>
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
        {/* Usamos o wrapper para evitar erro do tipo ContentSlidesProps e garantimos retorno void */}
        <AnyContentSlides 
          content={content}
          onComplete={() => {
            void updateContentProgress(contentId, { completed: true, progress_percentage: 100 });
          }}
        />
      </div>
    </div>
  );
};

export default ContentViewer;
