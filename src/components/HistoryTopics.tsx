
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight, Clock, Target, Play, CheckCircle } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import GamifiedContentViewer from './GamifiedContentViewer';
import SubjectQuiz from './SubjectQuiz';

interface HistoryTopicsProps {
  theme: string;
  onBack: () => void;
  onSelectTopic: (topic: string) => void;
}

const HistoryTopics: React.FC<HistoryTopicsProps> = ({ theme, onBack, onSelectTopic }) => {
  const { contents, loading, getContentProgress } = useSubjectContents('História');
  const { getQuestionsByTopic } = useSubjectQuestions('História');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedTopicForQuiz, setSelectedTopicForQuiz] = useState<string>('');

  const getTopicsForTheme = (theme: string) => {
    if (theme === 'História do Brasil') {
      return [
        { id: 'Brasil Colônia', name: 'Brasil Colônia', icon: '⛵', description: 'Período colonial brasileiro (1500-1822)', difficulty: 'Médio' },
        { id: 'Brasil Império', name: 'Brasil Império', icon: '👑', description: 'Período imperial (1822-1889)', difficulty: 'Médio' },
        { id: 'República Velha', name: 'República Velha', icon: '🏛️', description: 'Primeira fase republicana (1889-1930)', difficulty: 'Médio' },
        { id: 'Era Vargas', name: 'Era Vargas', icon: '🎩', description: 'Governo de Getúlio Vargas (1930-1954)', difficulty: 'Difícil' },
        { id: 'Ditadura Militar', name: 'Ditadura Militar', icon: '🪖', description: 'Regime militar (1964-1985)', difficulty: 'Difícil' },
        { id: 'Nova República', name: 'Nova República', icon: '🗳️', description: 'Período democrático (1985-presente)', difficulty: 'Médio' }
      ];
    } else if (theme === 'História Geral') {
      return [
        { id: 'Antiguidade Clássica', name: 'Antiguidade Clássica', icon: '🏛️', description: 'Grécia e Roma antigas', difficulty: 'Médio' },
        { id: 'Idade Média', name: 'Idade Média', icon: '🏰', description: 'Período medieval (séc. V-XV)', difficulty: 'Médio' },
        { id: 'Idade Moderna', name: 'Idade Moderna', icon: '🚢', description: 'Descobrimentos e absolutismo (séc. XV-XVIII)', difficulty: 'Médio' },
        { id: 'Revolução Industrial', name: 'Revolução Industrial', icon: '🏭', description: 'Transformações econômicas (séc. XVIII-XIX)', difficulty: 'Difícil' },
        { id: 'Guerras Mundiais e Guerra Fria', name: 'Guerras Mundiais e Guerra Fria', icon: '⚔️', description: 'Conflitos do século XX', difficulty: 'Difícil' }
      ];
    }
    return [];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Médio': return 'text-yellow-400';
      case 'Difícil': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const topics = getTopicsForTheme(theme);

  if (selectedContent) {
    return (
      <GamifiedContentViewer
        subject="História"
        contentId={selectedContent}
        onBack={() => setSelectedContent(null)}
        onComplete={() => setSelectedContent(null)}
      />
    );
  }

  if (showQuiz) {
    return (
      <SubjectQuiz
        subject="História"
        topic={selectedTopicForQuiz}
        onComplete={() => setShowQuiz(false)}
        onBack={() => setShowQuiz(false)}
      />
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
        <h1 className="text-lg font-semibold flex items-center space-x-2">
          <BookOpen size={20} />
          <span>{theme}</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Tópicos</h2>
          <div className="space-y-4">
            {topics.map((topic) => {
              const topicContents = contents.filter(content => 
                content.title === topic.id || content.topic_name === topic.id
              );
              const topicQuestions = getQuestionsByTopic(topic.id);
              
              return (
                <div key={topic.id} className="space-y-3">
                  {/* Traditional topic overview */}
                  <div
                    onClick={() => onSelectTopic(topic.id)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-2xl shadow-lg">
                        {topic.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{topic.name}</h3>
                        <p className="text-white/80 text-sm mb-2">{topic.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Target size={12} className="text-blue-400" />
                            <span className="text-white/80">Quiz</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen size={12} className="text-green-400" />
                            <span className="text-white/80">Teoria</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                              {topic.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-white/60 text-2xl">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Topic Quiz */}
                  {topicQuestions.length > 0 && (
                    <div
                      onClick={() => {
                        setSelectedTopicForQuiz(topic.id);
                        setShowQuiz(true);
                      }}
                      className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl p-3 cursor-pointer hover:scale-105 transition-all shadow-lg ml-4"
                    >
                      <div className="flex items-center space-x-3">
                        <Target size={20} className="text-white" />
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-sm">Quiz: {topic.name}</h4>
                          <p className="text-white/80 text-xs">{topicQuestions.length} questões</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gamified Content Modules for this topic */}
                  {topicContents.map((content) => {
                    const progress = getContentProgress(content.id);
                    const hasInteractiveActivities = content.interactive_activities && 
                      Object.keys(content.interactive_activities).length > 0;
                    const hasChallenge = content.challenge_question;
                    
                    return (
                      <div
                        key={content.id}
                        onClick={() => setSelectedContent(content.id)}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-all hover:scale-105 shadow-lg ml-4 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white relative group-hover:scale-110 transition-all">
                            <BookOpen size={20} />
                            {progress && progress.completed && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle size={12} className="text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-sm mb-1">{content.title}</h4>
                            <p className="text-white/80 text-xs mb-2">{content.description}</p>
                            
                            {/* Gamification indicators */}
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-xs">
                                <BookOpen size={10} className="text-blue-400" />
                                <span className="text-white/80">Teoria</span>
                              </div>
                              
                              {hasInteractiveActivities && (
                                <div className="flex items-center space-x-1 text-xs">
                                  <Play size={10} className="text-green-400" />
                                  <span className="text-white/80">Interativo</span>
                                </div>
                              )}
                              
                              <div className="flex items-center space-x-1 text-xs">
                                <Target size={10} className="text-orange-400" />
                                <span className="text-white/80">Quiz</span>
                              </div>
                              
                              {hasChallenge && (
                                <div className="flex items-center space-x-1 text-xs">
                                  <CheckCircle size={10} className="text-purple-400" />
                                  <span className="text-white/80">Desafio</span>
                                </div>
                              )}
                              
                              {progress && progress.progress_percentage > 0 && (
                                <span className="text-green-400 text-xs">
                                  {progress.progress_percentage}%
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-white/60 group-hover:text-white transition-all">
                            <Play size={16} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTopics;
