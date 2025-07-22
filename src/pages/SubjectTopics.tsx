
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookText, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTopics } from '@/hooks/useContentLoader';

const SubjectTopics = () => {
  const navigate = useNavigate();
  const { subject, theme } = useParams<{ subject: string; theme: string }>();
  const { t } = useLanguage();
  const { data: topics, isLoading, isError, error } = useTopics(theme);

  const handleTopicClick = (topicId: string) => {
    navigate(`/content/${topicId}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl bg-white/20" />
      ));
    }
    
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-white/80 h-64">
          <BookText size={48} className="mb-4 opacity-50" />
          <h2 className="text-lg font-semibold">Erro ao carregar tópicos</h2>
          <p className="text-sm mt-2">{error?.message}</p>
        </div>
      );
    }
    
    if (!topics || topics.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-white/80 h-64">
          <BookText size={48} className="mb-4 opacity-50" />
          <h2 className="text-lg font-semibold">Nenhum tópico encontrado</h2>
          <p className="text-sm mt-2">Este tema ainda não possui tópicos disponíveis.</p>
        </div>
      );
    }

    return topics.map((topic) => (
      <div 
        key={topic.id} 
        onClick={() => handleTopicClick(topic.id)}
        className="bg-white/15 backdrop-blur-md rounded-xl p-4 cursor-pointer hover:bg-white/25 transition-all flex items-center justify-between"
      >
        <span className="font-semibold text-white">{topic.name}</span>
        <ChevronRight size={20} className="text-white/60" />
      </div>
    ));
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(`/subjects/${subject}`)} 
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold capitalize">{theme}</h1>
            <p className="text-xs text-white/80">Selecione um tópico para estudar</p>
          </div>
        </div>
        
        <div className="p-6 space-y-3 flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectTopics;
