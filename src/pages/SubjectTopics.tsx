
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import DetailedContentViewer from '@/components/DetailedContentViewer';
import TopicCard from '@/components/TopicCard';
import EmptyTopicsState from '@/components/EmptyTopicsState';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSound } from '@/contexts/SoundContext';

interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  estimated_time: number;
  grande_tema: string;
  key_concepts: any; // Changed to any to handle Json type from Supabase
  explanation?: string;
}

const SubjectTopics = () => {
  const { subject, theme } = useParams<{ subject: string; theme: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const subjectNames: { [key: string]: string } = {
    'matematica': 'Matemática',
    'portugues': 'Português', 
    'fisica': 'Física',
    'quimica': 'Química',
    'biologia': 'Biologia',
    'historia': 'História',
    'geografia': 'Geografia',
    'filosofia': 'Filosofia',
    'sociologia': 'Sociologia',
    'ingles': 'Inglês',
    'espanhol': 'Espanhol',
    'literatura': 'Literatura',
    'redacao': 'Redação'
  };

  const capitalizedSubject = subjectNames[subject?.toLowerCase() || ''] || subject;
  const { getContentProgress } = useSubjectContents(capitalizedSubject || '');

  useEffect(() => {
    if (subject && theme) {
      loadTopics();
    }
  }, [subject, theme]);

  const loadTopics = async () => {
    try {
      setLoading(true);
      
      const decodedTheme = decodeURIComponent(theme || '').replace(/-/g, ' ');
      console.log('Loading topics for theme:', decodedTheme, 'subject:', capitalizedSubject);
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('id, title, description, difficulty_level, estimated_time, grande_tema, key_concepts, explanation')
        .eq('subject', capitalizedSubject)
        .eq('grande_tema', decodedTheme)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error loading topics:', error);
        setTopics([]);
        return;
      }

      console.log('Loaded topics:', data);
      // Type assertion to handle the Json type conversion
      setTopics((data || []) as Topic[]);
    } catch (error) {
      console.error('Error loading topics:', error);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topicId: string) => {
    if (!isMuted) playSound('click');
    setSelectedTopicId(topicId);
  };

  const handleBack = () => {
    if (!isMuted) playSound('click');
    if (selectedTopicId) {
      setSelectedTopicId(null);
    } else {
      navigate(`/subjects/${subject}`);
    }
  };

  if (!subject || !theme) {
    return (
      <MobileContainer background="gradient">
        <div className="p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-4">Parâmetros inválidos</h2>
          <Button onClick={() => navigate('/subjects')} variant="outline">
            Voltar às Matérias
          </Button>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (selectedTopicId) {
    return (
      <MobileContainer background="gradient">
        <DetailedContentViewer
          subject={capitalizedSubject || ''}
          contentId={selectedTopicId}
          onBack={handleBack}
          onComplete={() => setSelectedTopicId(null)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  const themeDisplayName = topics.length > 0 ? topics[0].grande_tema : decodeURIComponent(theme).replace(/-/g, ' ');

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBack}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{themeDisplayName}</h1>
            <p className="text-white/80 text-sm">{capitalizedSubject}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-white text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Carregando tópicos...</p>
            </div>
          ) : topics.length === 0 ? (
            <EmptyTopicsState 
              themeName={themeDisplayName}
              subjectName={capitalizedSubject || ''}
              onBack={handleBack}
            />
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-white text-xl font-bold mb-2">Tópicos de Estudo</h2>
                <p className="text-white/80 text-sm">
                  Conteúdo completo para sua preparação no ENEM
                </p>
              </div>

              <div className="space-y-4">
                {topics.map((topic, index) => {
                  const progress = getContentProgress(topic.id);
                  
                  return (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      index={index}
                      progress={progress}
                      onTopicClick={handleTopicClick}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectTopics;
