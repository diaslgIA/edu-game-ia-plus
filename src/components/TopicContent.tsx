
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Clock, CheckCircle, Target } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import GamifiedContentViewer from './GamifiedContentViewer';
import SubjectQuiz from './SubjectQuiz';

interface TopicContentProps {
  topic: string;
  onBack: () => void;
}

const TopicContent: React.FC<TopicContentProps> = ({ topic, onBack }) => {
  const { contents, loading, getContentProgress } = useSubjectContents('História');
  const { getQuestionsByTopic } = useSubjectQuestions('História');
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Filter contents and questions by topic
  const topicContents = contents.filter(content => content.title === topic);
  const topicQuestions = getQuestionsByTopic(topic);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyText = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Médio';
    }
  };

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
        topic={topic}
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
          <span>{topic}</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quiz Section */}
        {topicQuestions.length > 0 && (
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Quiz do Tópico</h2>
            <div
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-4 cursor-pointer hover:scale-105 transition-all shadow-lg border border-white/10"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                  <Target size={24} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">Quiz de {topic}</h3>
                  <p className="text-white/80 text-sm mb-2">Teste seus conhecimentos sobre este tópico</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                      {topicQuestions.length} questões
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

        {/* Gamified Learning Modules */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Módulos Gamificados</h2>
          {loading ? (
            <div className="text-white text-center py-8">Carregando conteúdos...</div>
          ) : topicContents.length === 0 ? (
            <div className="text-white text-center py-8">Nenhum conteúdo disponível para este tópico ainda.</div>
          ) : (
            <div className="space-y-4">
              {topicContents.map((content) => {
                const progress = getContentProgress(content.id);
                const hasInteractiveActivities = content.interactive_activities && 
                  Object.keys(content.interactive_activities).length > 0;
                const hasChallenge = content.challenge_question;
                
                return (
                  <div
                    key={content.id}
                    onClick={() => setSelectedContent(content.id)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg relative group-hover:scale-110 transition-all">
                        <BookOpen size={24} />
                        {progress && progress.completed && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{content.title}</h3>
                        <p className="text-white/80 text-sm mb-2">{content.description}</p>
                        
                        {/* Gamification indicators */}
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-1 text-xs">
                            <BookOpen size={12} className="text-blue-400" />
                            <span className="text-white/80">Teoria</span>
                          </div>
                          
                          {hasInteractiveActivities && (
                            <div className="flex items-center space-x-1 text-xs">
                              <Play size={12} className="text-green-400" />
                              <span className="text-white/80">Interativo</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-1 text-xs">
                            <Target size={12} className="text-orange-400" />
                            <span className="text-white/80">Quiz</span>
                          </div>
                          
                          {hasChallenge && (
                            <div className="flex items-center space-x-1 text-xs">
                              <CheckCircle size={12} className="text-purple-400" />
                              <span className="text-white/80">Desafio</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} className="text-blue-400" />
                            <span className="text-white/80">15-20 min</span>
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
                      
                      <div className="text-white/60 group-hover:text-white transition-all">
                        <Play size={20} />
                      </div>
                    </div>
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

export default TopicContent;
