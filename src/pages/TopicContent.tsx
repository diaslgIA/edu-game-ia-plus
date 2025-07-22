
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen, Play } from 'lucide-react';
import { useTopicContent } from '@/hooks/useContentLoader';

const TopicContent = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const { data: topic, isLoading, isError, error } = useTopicContent(topicId || null);

  const handleStartQuiz = () => {
    if (topicId) {
      navigate(`/quiz/${topicId}`);
    }
  };

  if (isLoading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <Skeleton className="h-6 w-32 bg-white/20" />
          </div>
          
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-full bg-white/20" />
            <Skeleton className="h-32 w-full bg-white/20" />
            <Skeleton className="h-12 w-full bg-white/20" />
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (isError || !topic) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Erro</h1>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center text-white/80 h-64">
            <BookOpen size={48} className="mb-4 opacity-50" />
            <h2 className="text-lg font-semibold">Conteúdo não encontrado</h2>
            <p className="text-sm mt-2">{error?.message || 'Não foi possível carregar o conteúdo.'}</p>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{topic.name}</h1>
            <p className="text-xs text-white/80">Conteúdo de estudo</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen size={24} className="text-white" />
              <h2 className="text-xl font-bold text-white">{topic.name}</h2>
            </div>
            
            {topic.explanation ? (
              <div className="text-white/90 leading-relaxed">
                <p>{topic.explanation}</p>
              </div>
            ) : (
              <div className="text-white/70 italic">
                <p>Conteúdo em desenvolvimento. Em breve, mais detalhes estarão disponíveis.</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleStartQuiz}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2"
            >
              <Play size={20} />
              <span>Fazer Quiz sobre este tópico</span>
            </Button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default TopicContent;
