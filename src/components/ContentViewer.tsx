
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, AlertCircle, FileText } from 'lucide-react';
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

  // Função para processar e normalizar o conteúdo
  const processContentData = (content: any) => {
    if (!content) return null;

    // Verificar se há content_data com sections ou slides
    if (content.content_data) {
      if (content.content_data.sections && Array.isArray(content.content_data.sections)) {
        return {
          type: 'sections',
          data: content.content_data.sections,
          source: 'content_data.sections'
        };
      }
      
      if (content.content_data.slides && Array.isArray(content.content_data.slides)) {
        // Converter slides para formato de sections
        const convertedSections = content.content_data.slides.map((slide: any, index: number) => ({
          title: slide.title || slide.heading || `Seção ${index + 1}`,
          content: slide.content || slide.text || slide.body || ''
        }));
        return {
          type: 'sections',
          data: convertedSections,
          source: 'content_data.slides (converted)'
        };
      }
      
      // Se content_data existe mas não tem estrutura conhecida
      if (typeof content.content_data === 'string') {
        return {
          type: 'single',
          data: [{
            title: content.title || 'Conteúdo',
            content: content.content_data
          }],
          source: 'content_data (string)'
        };
      }
    }

    // Fallbacks para campos de texto
    const textContent = content.detailed_explanation || 
                       content.explanation || 
                       content.description || 
                       content.examples ||
                       '';

    if (textContent) {
      return {
        type: 'single',
        data: [{
          title: content.title || 'Conteúdo',
          content: textContent
        }],
        source: 'text fields fallback'
      };
    }

    return null;
  };

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
    if (!processedContent?.data) return;

    const sections = processedContent.data;
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

  const processedContent = processContentData(content);
  const currentSectionData = processedContent?.data[currentSection];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getContentStatusInfo = () => {
    if (!processedContent) {
      return {
        status: 'empty',
        message: 'Conteúdo em desenvolvimento',
        icon: AlertCircle,
        color: 'text-yellow-400'
      };
    }

    if (processedContent.source.includes('fallback')) {
      return {
        status: 'basic',
        message: 'Conteúdo básico disponível',
        icon: FileText,
        color: 'text-blue-400'
      };
    }

    return {
      status: 'complete',
      message: 'Conteúdo completo',
      icon: BookOpen,
      color: 'text-green-400'
    };
  };

  const statusInfo = getContentStatusInfo();

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
              <BookOpen size={14} />
              <span className={getDifficultyColor(content.difficulty_level || 'medium')}>
                {content.difficulty_level === 'easy' ? 'Fácil' : 
                 content.difficulty_level === 'medium' ? 'Médio' : 'Difícil'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <statusInfo.icon size={14} className={statusInfo.color} />
              <span className={statusInfo.color} title={statusInfo.message}>
                {statusInfo.status === 'complete' ? 'Completo' : 
                 statusInfo.status === 'basic' ? 'Básico' : 'Em desenvolvimento'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar - só mostrar se há conteúdo processado */}
      {processedContent?.data && (
        <div className="p-4">
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / processedContent.data.length) * 100}%` }}
            />
          </div>
          <p className="text-white/80 text-sm text-center">
            Seção {currentSection + 1} de {processedContent.data.length}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {!processedContent ? (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">Conteúdo em Desenvolvimento</h2>
            <div className="text-white/90 text-base leading-relaxed space-y-3">
              <p>Este conteúdo está sendo preparado pela nossa equipe pedagógica.</p>
              <p className="text-sm text-white/70">
                Em breve você terá acesso ao material completo com explicações detalhadas, 
                exemplos práticos e exercícios interativos.
              </p>
              {content.description && (
                <div className="mt-4 p-3 bg-white/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Sobre este tópico:</h3>
                  <p className="text-sm">{content.description}</p>
                </div>
              )}
            </div>
          </div>
        ) : currentSectionData ? (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-xl font-bold text-white">{currentSectionData.title}</h2>
              {statusInfo.status === 'basic' && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                  Versão Básica
                </span>
              )}
            </div>
            <div className="text-white/90 text-base leading-relaxed whitespace-pre-line">
              {currentSectionData.content || 'Conteúdo sendo preparado...'}
            </div>
            
            {/* Informações adicionais se disponíveis */}
            {processedContent.data.length === 1 && (
              <div className="mt-6 space-y-4">
                {content.examples && (
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h3 className="font-semibold text-white mb-2 flex items-center">
                      <BookOpen size={16} className="mr-2" />
                      Exemplos
                    </h3>
                    <p className="text-white/80 text-sm whitespace-pre-line">{content.examples}</p>
                  </div>
                )}
                
                {content.study_tips && (
                  <div className="p-4 bg-white/10 rounded-lg">
                    <h3 className="font-semibold text-white mb-2 flex items-center">
                      <FileText size={16} className="mr-2" />
                      Dicas de Estudo
                    </h3>
                    <p className="text-white/80 text-sm whitespace-pre-line">{content.study_tips}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-4">Erro ao Carregar Conteúdo</h2>
            <p className="text-white/90">Ocorreu um erro ao processar este conteúdo. Tente novamente.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {processedContent?.data && (
        <div className="p-6 border-t border-white/10">
          <div className="flex space-x-3">
            {currentSection < processedContent.data.length - 1 ? (
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
