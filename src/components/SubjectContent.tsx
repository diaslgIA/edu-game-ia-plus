
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Clock, CheckCircle, Target } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import ContentViewer from './ContentViewer';
import SubjectQuiz from './SubjectQuiz';

interface SubjectContentProps {
  subject: string;
  onBack: () => void;
}

const SubjectContent: React.FC<SubjectContentProps> = ({ subject, onBack }) => {
  const { contents, loading, getContentProgress } = useSubjectContents(subject);
  const { questions } = useSubjectQuestions(subject);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

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

  if (selectedContent) {
    return (
      <ContentViewer
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
          <span>{subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
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
                  <h3 className="font-bold text-white text-lg mb-1">Quiz de {subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
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

        {/* Theory Contents */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Conteúdos Teóricos</h2>
          {loading ? (
            <div className="text-white text-center py-8">Carregando conteúdos...</div>
          ) : contents.length === 0 ? (
            <div className="text-white text-center py-8">Nenhum conteúdo disponível ainda.</div>
          ) : (
            <div className="space-y-4">
              {contents.map((content) => {
                const progress = getContentProgress(content.id);
                
                return (
                  <div
                    key={content.id}
                    onClick={() => setSelectedContent(content.id)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg relative">
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
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} className="text-blue-400" />
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

export default SubjectContent;
