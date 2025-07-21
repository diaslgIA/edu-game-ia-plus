
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Clock, CheckCircle, Target, ChevronDown, ChevronRight } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import ContentViewer from './ContentViewer';
import SubjectQuiz from './SubjectQuiz';

interface SubjectContentProps {
  subject: string;
  onBack: () => void;
}

const SubjectContent: React.FC<SubjectContentProps> = ({ subject, onBack }) => {
  const { contents, loading, getContentProgress, getGrandesTemas, getContentsByTheme } = useSubjectContents(subject);
  const { questions } = useSubjectQuestions(subject);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [grandesTemas, setGrandesTemas] = useState<string[]>([]);
  const [expandedThemes, setExpandedThemes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadTemas = async () => {
      const temas = await getGrandesTemas();
      setGrandesTemas(temas);
      // Expandir o primeiro tema por padrão
      if (temas.length > 0) {
        setExpandedThemes(new Set([temas[0]]));
      }
    };
    
    if (!loading) {
      loadTemas();
    }
  }, [loading, getGrandesTemas]);

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

  const toggleTheme = (theme: string) => {
    const newExpanded = new Set(expandedThemes);
    if (newExpanded.has(theme)) {
      newExpanded.delete(theme);
    } else {
      newExpanded.add(theme);
    }
    setExpandedThemes(newExpanded);
  };

  if (selectedContent) {
    return (
      <ContentViewer
        subject={subject}
        contentId={selectedContent}
        onBack={() => setSelectedContent(null)}
        onComplete={() => setSelectedContent(null)}
      />
    );
  }

  if (showQuiz) {
    return (
      <SubjectQuiz
        subject={subject}
        onComplete={() => setShowQuiz(false)}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  const getSubjectDisplayName = (subjectName: string) => {
    switch (subjectName.toLowerCase()) {
      case 'ingles': return 'Inglês';
      case 'matematica': return 'Matemática';
      case 'portugues e literatura': return 'Português';
      case 'fisica': return 'Física';
      case 'quimica': return 'Química';
      case 'biologia': return 'Biologia';
      case 'historia': return 'História';
      case 'geografia': return 'Geografia';
      case 'filosofia': return 'Filosofia';
      case 'sociologia': return 'Sociologia';
      case 'espanhol': return 'Espanhol';
      default: return subjectName.charAt(0).toUpperCase() + subjectName.slice(1);
    }
  };

  const displayName = getSubjectDisplayName(subject);

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
        <h1 className="text-lg font-semibold flex items-center space-x-2">
          <BookOpen size={20} />
          <span>{displayName}</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quiz Section */}
        {questions.length > 0 && (
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quiz da Matéria</h2>
            <div
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all shadow-lg border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  <Target size={24} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">Quiz de {displayName}</h3>
                  <p className="text-white/80 text-sm mb-2">Teste seus conhecimentos</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                      {questions.length} questões
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                      Quiz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theory Contents by Theme */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Conteúdos Teóricos</h2>
          {loading ? (
            <div className="text-white text-center py-8">Carregando conteúdos...</div>
          ) : grandesTemas.length === 0 ? (
            <div className="text-white text-center py-8">Nenhum conteúdo disponível ainda.</div>
          ) : (
            <div className="space-y-4">
              {grandesTemas.map((tema) => {
                const themeContents = getContentsByTheme(tema);
                const isExpanded = expandedThemes.has(tema);
                
                return (
                  <div key={tema} className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    {/* Theme Header */}
                    <button
                      onClick={() => toggleTheme(tema)}
                      className="w-full flex items-center justify-between text-white hover:bg-white/10 rounded-xl p-2 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <BookOpen size={16} className="text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg">{tema}</h3>
                          <p className="text-white/70 text-sm">{themeContents.length} tópicos</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>

                    {/* Theme Contents */}
                    {isExpanded && (
                      <div className="mt-4 space-y-3 pl-4">
                        {themeContents.map((content) => {
                          const progress = getContentProgress(content.id);
                          
                          return (
                            <div
                              key={content.id}
                              onClick={() => setSelectedContent(content.id)}
                              className="bg-white/10 backdrop-blur-md rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-all hover:scale-[1.02] border border-white/5"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg relative">
                                  <BookOpen size={16} />
                                  {progress && progress.completed && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                      <CheckCircle size={12} className="text-white" />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white text-sm mb-1">{content.title}</h4>
                                  <p className="text-white/70 text-xs mb-2 line-clamp-2">{content.description}</p>
                                  
                                  <div className="flex items-center space-x-3 text-xs">
                                    <div className="flex items-center space-x-1">
                                      <Clock size={10} className="text-blue-400" />
                                      <span className="text-white/80">{content.estimated_time} min</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <span className={`text-xs ${getDifficultyColor(content.difficulty_level)}`}>
                                        {getDifficultyText(content.difficulty_level)}
                                      </span>
                                    </div>
                                    {progress && progress.progress_percentage > 0 && (
                                      <div className="flex items-center space-x-1">
                                        <span className="text-green-400 text-xs">
                                          {progress.progress_percentage}% concluído
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="text-white/60">
                                  <Play size={16} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectContent;
