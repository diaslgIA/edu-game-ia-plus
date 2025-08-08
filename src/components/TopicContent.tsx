import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Clock, CheckCircle, Target } from 'lucide-react';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import GamifiedContentViewer from './GamifiedContentViewer';
import SubjectQuiz from './SubjectQuiz';
import MobileContainer from './MobileContainer';
import { getSubjectVariants, getSubjectDisplayName } from '@/utils/subjectMapping';

interface TopicContentProps {
  subject: string;
  topic: string;
  onBack: () => void;
}

const TopicContent: React.FC<TopicContentProps> = ({ subject, topic, onBack }) => {
  const subjectVariants = getSubjectVariants(subject);
  const displayName = getSubjectDisplayName(subject);
  const { contents, loading, getContentProgress } = useSubjectContents(subjectVariants);
  const { getQuestionsByTopic } = useSubjectQuestions(subjectVariants);

  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const filteredContents = contents.filter(content => content.topic_name === topic);

  if (selectedContent) {
    return (
      <MobileContainer>
        <GamifiedContentViewer
          subject={subject}
          contentId={selectedContent}
          onBack={() => setSelectedContent(null)}
          onComplete={() => setSelectedContent(null)}
        />
      </MobileContainer>
    );
  }

  if (showQuiz) {
    return (
      <MobileContainer>
        <SubjectQuiz
          subject={subject}
          topic={topic}
          onComplete={() => setShowQuiz(false)}
          onBack={() => setShowQuiz(false)}
        />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
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
          {loading ? (
            <div className="text-white text-center py-8">Carregando conteúdo...</div>
          ) : filteredContents.length === 0 ? (
            <div className="text-white text-center py-8">Nenhum conteúdo disponível para este tópico.</div>
          ) : (
            filteredContents.map((content) => (
              <div
                key={content.id}
                onClick={() => setSelectedContent(content.id)}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-2xl text-white shadow-md">
                    <BookOpen size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{content.title}</h3>
                    <p className="text-white/80 text-sm">{content.description}</p>
                  </div>
                  
                  <div className="text-white/60 text-2xl">
                    <Play size={20} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileContainer>
  );
};

export default TopicContent;
