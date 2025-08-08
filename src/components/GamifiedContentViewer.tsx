
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, Trophy, Star, Target } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import InteractiveSection from './interactive/InteractiveSection';
import ChallengeSection from './interactive/ChallengeSection';
import SubjectQuiz from './SubjectQuiz';
import { SubjectContent } from '@/types/subject-content';

interface GamifiedContentViewerProps {
  subject: string;
  contentId: string;
  onBack: () => void;
  onComplete?: (contentId: string) => void;
}

type SectionType = 'theory' | 'interactive' | 'quiz' | 'challenge' | 'completed';

const GamifiedContentViewer: React.FC<GamifiedContentViewerProps> = ({ 
  subject, 
  contentId, 
  onBack, 
  onComplete 
}) => {
  const { contents, updateContentProgress, getContentProgress } = useSubjectContents(subject);
  const [currentSection, setCurrentSection] = useState<SectionType>('theory');
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [completedSections, setCompletedSections] = useState<Set<SectionType>>(new Set());

  const content = contents.find(c => c.id === contentId) as SubjectContent | undefined;
  const progress = getContentProgress(contentId);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleSectionComplete = async (section: SectionType) => {
    const newCompleted = new Set(completedSections).add(section);
    setCompletedSections(newCompleted);

    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const progressPercentage = Math.round((newCompleted.size / 4) * 100);
    
    await updateContentProgress(contentId, {
      completed: progressPercentage === 100,
      progress_percentage: progressPercentage,
      time_spent: (progress?.time_spent || 0) + timeSpent
    });

    // Avançar para próxima seção
    if (section === 'theory') {
      setCurrentSection('interactive');
    } else if (section === 'interactive') {
      setCurrentSection('quiz');
    } else if (section === 'quiz') {
      setCurrentSection('challenge');
    } else if (section === 'challenge') {
      setCurrentSection('completed');
      if (onComplete) {
        setTimeout(() => onComplete(contentId), 2000);
      }
    }

    setStartTime(Date.now());
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

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSectionIcon = (section: SectionType) => {
    switch (section) {
      case 'theory': return <BookOpen size={20} />;
      case 'interactive': return <Play size={20} />;
      case 'quiz': return <Target size={20} />;
      case 'challenge': return <Star size={20} />;
      case 'completed': return <Trophy size={20} />;
    }
  };

  const sections = [
    { key: 'theory', name: 'Teoria', duration: '3-5 min' },
    { key: 'interactive', name: 'Fixação', duration: '5-7 min' },
    { key: 'quiz', name: 'Exercícios', duration: '5-8 min' },
    { key: 'challenge', name: 'Desafio', duration: '2-3 min' }
  ];

  const renderProgressBar = () => {
    const completedCount = completedSections.size;
    const currentIndex = sections.findIndex(s => s.key === currentSection);
    const totalSections = sections.length;
    
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold">Progresso do Módulo</span>
          <span className="text-white/80">{completedCount}/{totalSections} seções</span>
        </div>
        
        <div className="bg-white/20 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalSections) * 100}%` }}
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {sections.map((section, index) => (
            <div 
              key={section.key}
              className={`text-center p-2 rounded-lg ${
                completedSections.has(section.key as SectionType) 
                  ? 'bg-green-500/20 text-green-400' 
                  : section.key === currentSection
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              <div className="flex justify-center mb-1">
                {getSectionIcon(section.key as SectionType)}
              </div>
              <div className="text-xs font-semibold">{section.name}</div>
              <div className="text-xs opacity-75">{section.duration}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'theory':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <BookOpen className="mx-auto mb-4 text-blue-400" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Introdução Teórica</h2>
              <p className="text-white/80">
                Aprenda os conceitos fundamentais de forma clara e objetiva
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">{content.title}</h2>
              
              {content.infographic_url && (
                <div className="mb-6">
                  <img 
                    src={content.infographic_url} 
                    alt={`Infográfico - ${content.title}`}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}
              
              <div className="text-white/90 text-base leading-relaxed space-y-4">
                {content.content_data?.sections ? (
                  content.content_data.sections.map((section: any, index: number) => (
                    <div key={index} className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{section.title}</h3>
                      <div className="whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="whitespace-pre-line">
                    {content.description || 'Conteúdo teórico não disponível.'}
                  </div>
                )}
              </div>
              
              {content.examples && (
                <div className="mt-6 p-4 bg-blue-500/20 rounded-xl">
                  <h4 className="text-white font-semibold mb-2">💡 Exemplos Práticos:</h4>
                  <div className="text-white/90 whitespace-pre-line">
                    {content.examples}
                  </div>
                </div>
              )}
              
              {content.study_tips && (
                <div className="mt-4 p-4 bg-green-500/20 rounded-xl">
                  <h4 className="text-white font-semibold mb-2">📚 Dicas de Estudo:</h4>
                  <div className="text-white/90 whitespace-pre-line">
                    {content.study_tips}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <Button 
                onClick={() => handleSectionComplete('theory')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3"
              >
                <CheckCircle className="mr-2" size={16} />
                Continuar para Fixação
              </Button>
            </div>
          </div>
        );

      case 'interactive':
        if (!content.interactive_activities || Object.keys(content.interactive_activities).length === 0) {
          // Se não há atividades interativas, pular para quiz
          setTimeout(() => handleSectionComplete('interactive'), 100);
          return <div className="text-center text-white">Preparando exercícios...</div>;
        }
        
        return (
          <InteractiveSection
            contentId={contentId}
            subject={subject}
            activities={content.interactive_activities}
            onComplete={() => handleSectionComplete('interactive')}
          />
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Target className="mx-auto mb-4 text-orange-400" size={48} />
              <h2 className="text-2xl font-bold text-white mb-2">Exercícios Práticos</h2>
              <p className="text-white/80">
                Teste seus conhecimentos com questões direcionadas
              </p>
            </div>
            
            <SubjectQuiz
              subject={subject}
              topic={content.title}
              onComplete={() => handleSectionComplete('quiz')}
              onBack={() => setCurrentSection('interactive')}
            />
          </div>
        );

      case 'challenge':
        if (!content.challenge_question) {
          // Se não há desafio, finalizar
          setTimeout(() => handleSectionComplete('challenge'), 100);
          return <div className="text-center text-white">Finalizando módulo...</div>;
        }
        
        return (
          <ChallengeSection
            contentId={contentId}
            subject={subject}
            challenge={content.challenge_question}
            onComplete={() => handleSectionComplete('challenge')}
          />
        );

      case 'completed':
        return (
          <div className="text-center p-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl">
            <Trophy className="mx-auto mb-4 text-yellow-300" size={72} />
            <h2 className="text-3xl font-bold text-white mb-4">
              Módulo Concluído! 🎉
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Parabéns! Você dominou: <strong>{content.title}</strong>
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{completedSections.size}</div>
                  <div className="text-white/80 text-sm">Seções Concluídas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{Math.round(((progress?.time_spent || 0) / 60))}</div>
                  <div className="text-white/80 text-sm">Minutos Estudados</div>
                </div>
              </div>
            </div>
            
            <p className="text-white/70 text-sm">
              Voltando ao menu em instantes...
            </p>
          </div>
        );

      default:
        return null;
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
              <span>15-20 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className={getDifficultyColor(content.difficulty_level)}>
                {content.difficulty_level === 'easy' ? 'Fácil' : 
                 content.difficulty_level === 'medium' ? 'Médio' : 'Difícil'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderCurrentSection()}
      </div>
    </div>
  );
};

export default GamifiedContentViewer;
