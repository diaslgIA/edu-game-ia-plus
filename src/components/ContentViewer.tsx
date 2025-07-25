import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ContentSection {
  title: string;
  content: string;
}

interface ContentData {
  sections: ContentSection[];
}

interface Content {
  id: string;
  title: string;
  description?: string;
  content_data?: ContentData;
  difficulty_level: string;
  estimated_time: number;
}

interface ContentViewerProps {
  contentId: string;
  onBack: () => void;
  onComplete?: (contentId: string) => void;
}

// Helper function to safely parse content_data
const parseContentData = (content_data: any): ContentData | undefined => {
  if (!content_data) return undefined;
  
  // If it's already an object with sections, return it
  if (typeof content_data === 'object' && content_data.sections && Array.isArray(content_data.sections)) {
    return content_data as ContentData;
  }
  
  // If it's a string, try to parse it as JSON
  if (typeof content_data === 'string') {
    try {
      const parsed = JSON.parse(content_data);
      if (parsed.sections && Array.isArray(parsed.sections)) {
        return parsed as ContentData;
      }
    } catch (e) {
      console.error('Failed to parse content_data as JSON:', e);
    }
  }
  
  return undefined;
};

const ContentViewer: React.FC<ContentViewerProps> = ({
  contentId,
  onBack,
  onComplete
}) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (!contentId) {
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('subject_contents')
          .select('id, title, description, content_data, difficulty_level, estimated_time')
          .eq('id', contentId)
          .single();

        if (error) {
          console.error("Error fetching content:", error);
          setContent(null);
        } else {
          // Parse the content_data safely
          const parsedContentData = parseContentData(data.content_data);

          const contentItem: Content = {
            id: data.id,
            title: data.title,
            description: data.description,
            content_data: parsedContentData,
            difficulty_level: data.difficulty_level || 'medium',
            estimated_time: data.estimated_time || 15
          };

          setContent(contentItem);
        }
      } catch (error) {
        console.error("Error in fetchContent:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  const handleSectionComplete = () => {
    if (!content || !content.content_data) return;
    
    const sections = content.content_data.sections || [];
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      if (onComplete) {
        onComplete(contentId);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-white">
        Carregando conteúdo...
      </div>
    );
  }

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
            style={{ width: `${sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0}%` }}
          />
        </div>
        <p className="text-white/80 text-sm text-center">
          {sections.length > 0 ? `Seção ${currentSection + 1} de ${sections.length}` : 'Conteúdo disponível'}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentSectionData ? (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">{currentSectionData.title}</h2>
            <div className="text-white/90 text-base leading-relaxed whitespace-pre-line">
              {currentSectionData.content}
            </div>
          </div>
        ) : (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">{content.title}</h2>
            <div className="text-white/90 text-base leading-relaxed">
              {content.description || 'Conteúdo em desenvolvimento'}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {sections.length > 0 && (
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
      )}
    </div>
  );
};

export default ContentViewer;
