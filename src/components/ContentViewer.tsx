import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Definimos o tipo para um único item de conteúdo
type Content = Database['public']['Tables']['subject_contents']['Row'];

interface ContentViewerProps {
  contentId: string;
  onBack: () => void;
  onComplete?: (contentId: string) => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  contentId,
  onBack,
  onComplete
}) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  // Efeito que busca o conteúdo específico quando o componente é exibido
  useEffect(() => {
    if (!contentId) {
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      // Busca diretamente no Supabase pelo ID específico
      const { data, error } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('id', contentId)
        .single(); // .single() é crucial para buscar apenas um registro

      if (error) {
        console.error("Erro ao buscar o conteúdo específico:", error);
        setContent(null);
      } else {
        setContent(data);
      }
      setLoading(false);
    };

    fetchContent();
  }, [contentId]); // Garante que a busca acontece se o ID mudar

  const handleSectionComplete = () => {
    if (!content) return;
    const sections = content.content_data?.sections || [];
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      if (onComplete) {
        onComplete(contentId);
      }
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
            style={{ width: `${sections.length > 0 ? ((currentSection + 1) / sections.length) * 100 : 0}%` }}
          />
        </div>
        <p className="text-white/80 text-sm text-center">
          Seção {currentSection + 1} de {sections.length}
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
          <div className="text-white text-center">Nenhuma seção de conteúdo encontrada.</div>
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
