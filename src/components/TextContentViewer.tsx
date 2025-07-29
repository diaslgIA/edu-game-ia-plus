
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, ChevronRight } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  estimated_time: number;
  grande_tema: string;
  explanation?: string;
}

interface TextContentViewerProps {
  topic: Topic;
  onBack: () => void;
  onComplete?: (topicId: string) => void;
}

interface ContentSection {
  title: string;
  content: string;
  order: number;
}

const TextContentViewer: React.FC<TextContentViewerProps> = ({ 
  topic, 
  onBack, 
  onComplete 
}) => {
  const { playSound, isMuted } = useSound();
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Processar o conteúdo em seções
    if (topic.explanation) {
      const processedSections = processContentIntoSections(topic.explanation);
      setSections(processedSections);
    }
    setStartTime(Date.now());
  }, [topic]);

  const processContentIntoSections = (content: string): ContentSection[] => {
    // Dividir o conteúdo em seções baseado em quebras de linha duplas ou títulos
    const parts = content.split(/\n\n+|\r\n\r\n+/);
    const processedSections: ContentSection[] = [];
    
    let currentTitle = `Introdução: ${topic.title}`;
    let currentContent = '';
    let sectionOrder = 1;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      
      if (!part) continue;
      
      // Se a parte parece ser um título (menos de 80 caracteres e sem ponto final)
      if (part.length < 80 && !part.endsWith('.') && !part.endsWith('!') && !part.endsWith('?')) {
        // Salvar seção anterior se houver conteúdo
        if (currentContent.trim()) {
          processedSections.push({
            title: currentTitle,
            content: currentContent.trim(),
            order: sectionOrder
          });
          sectionOrder++;
        }
        
        // Iniciar nova seção
        currentTitle = `Parte ${sectionOrder}: ${part}`;
        currentContent = '';
      } else {
        // Adicionar ao conteúdo atual
        currentContent += (currentContent ? '\n\n' : '') + part;
      }
    }
    
    // Adicionar última seção
    if (currentContent.trim()) {
      processedSections.push({
        title: currentTitle,
        content: currentContent.trim(),
        order: sectionOrder
      });
    }
    
    // Se não temos seções, criar uma seção única
    if (processedSections.length === 0) {
      processedSections.push({
        title: `Conteúdo: ${topic.title}`,
        content: content,
        order: 1
      });
    }
    
    return processedSections;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Médio';
    }
  };

  const handleStartStudy = () => {
    if (!isMuted) playSound('click');
    setShowIntro(false);
  };

  const handleNextSection = () => {
    if (!isMuted) playSound('click');
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Conteúdo completo
      if (onComplete) {
        onComplete(topic.id);
      }
    }
  };

  const handleBackToIntro = () => {
    if (!isMuted) playSound('click');
    setShowIntro(true);
    setCurrentSection(0);
  };

  // Tela de introdução (similar ao QuizIntro)
  if (showIntro) {
    return (
      <div className="flex flex-col h-full">
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
            <h1 className="text-lg font-semibold">{topic.grande_tema}</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg border border-white/10 max-w-md w-full">
            <div className="mb-6">
              <BookOpen className="mx-auto mb-4 text-blue-400" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">
                {topic.title}
              </h3>
              <p className="text-white/80">
                {topic.description}
              </p>
            </div>

            <div className="bg-blue-50/10 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-200 mb-2">Informações do Conteúdo:</h4>
              <ul className="text-sm text-blue-100 space-y-1 text-left">
                <li>• {sections.length} seções para estudar</li>
                <li>• Tempo estimado: {topic.estimated_time} minutos</li>
                <li>• Nível: {getDifficultyText(topic.difficulty_level)}</li>
                <li>• Explicações detalhadas</li>
                <li>• Progresso salvo automaticamente</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={onBack}
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2" size={16} />
                Voltar
              </Button>
              <Button 
                onClick={handleStartStudy}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
              >
                <BookOpen className="mr-2" size={20} />
                Começar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visualização do conteúdo
  const currentSectionData = sections[currentSection];
  
  if (!currentSectionData) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBackToIntro}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Conteúdo não encontrado</h1>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-white">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>Conteúdo não disponível para este tópico.</p>
            <Button 
              onClick={handleBackToIntro} 
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBackToIntro}
          className="text-white p-2 hover:bg-white/20 rounded-xl"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{topic.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{topic.estimated_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen size={14} />
              <span className={getDifficultyColor(topic.difficulty_level)}>
                {getDifficultyText(topic.difficulty_level)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Progresso */}
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

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
          {/* Título da Seção */}
          <h2 className="text-xl font-bold text-blue-200 mb-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {currentSection + 1}
            </div>
            <span>{currentSectionData.title}</span>
          </h2>
          
          {/* Conteúdo da Seção */}
          <div className="text-white/90 text-base leading-relaxed space-y-4">
            {currentSectionData.content.split('\n\n').map((paragraph, index) => (
              <div key={index}>
                {paragraph.includes('•') || paragraph.includes('-') ? (
                  // Lista com bullets
                  <ul className="space-y-2 ml-4">
                    {paragraph.split('\n').map((item, itemIndex) => {
                      const cleanItem = item.replace(/^[•\-\*]\s*/, '').trim();
                      if (!cleanItem) return null;
                      return (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{cleanItem}</span>
                        </li>
                      );
                    }).filter(Boolean)}
                  </ul>
                ) : (
                  // Parágrafo normal
                  <p className="text-justify">{paragraph}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="p-6 border-t border-white/10">
        <div className="flex space-x-3">
          {currentSection < sections.length - 1 ? (
            <Button 
              onClick={handleNextSection}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3"
            >
              <ChevronRight className="mr-2" size={16} />
              Próxima Seção
            </Button>
          ) : (
            <Button 
              onClick={handleNextSection}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3"
            >
              <CheckCircle className="mr-2" size={16} />
              Concluir Estudo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextContentViewer;
