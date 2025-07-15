
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import ContentViewer from '@/components/ContentViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Play, CheckCircle } from 'lucide-react';
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
}

const SubjectTopics = () => {
  const { subject, theme } = useParams<{ subject: string; theme: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  const { getContentProgress } = useSubjectContents(subject || '');
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

  useEffect(() => {
    if (subject && theme) {
      loadTopics();
    }
  }, [subject, theme]);

  const loadTopics = async () => {
    try {
      setLoading(true);
      
      // Decodificar o tema da URL
      const decodedTheme = decodeURIComponent(theme || '').replace(/-/g, ' ');
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('id, title, description, difficulty_level, estimated_time, grande_tema')
        .eq('subject', subject)
        .ilike('grande_tema', `%${decodedTheme}%`)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error loading topics:', error);
        return;
      }

      setTopics(data || []);
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setLoading(false);
    }
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
    return <div>Parâmetros inválidos</div>;
  }

  // Se um tópico foi selecionado, mostrar o ContentViewer
  if (selectedTopicId) {
    return (
      <MobileContainer background="gradient">
        <ContentViewer
          subject={subject}
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
            <p className="text-white/80 text-sm">{subjectNames[subject]}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <h2 className="text-white text-lg font-semibold mb-4 flex items-center space-x-2">
              <BookOpen size={20} />
              <span>Tópicos de Estudo</span>
            </h2>

            {loading ? (
              <div className="text-white text-center py-8">Carregando tópicos...</div>
            ) : topics.length === 0 ? (
              <div className="text-white text-center py-8">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhum tópico encontrado para este tema ainda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topics.map((topic) => {
                  const progress = getContentProgress(topic.id);
                  
                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleTopicClick(topic.id)}
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
                          <h3 className="font-bold text-white text-lg mb-1">{topic.title}</h3>
                          <p className="text-white/80 text-sm mb-2">{topic.description}</p>
                          
                          <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <Clock size={12} className="text-blue-400" />
                              <span className="text-white/80">{topic.estimated_time} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className={`text-xs ${getDifficultyColor(topic.difficulty_level)}`}>
                                {getDifficultyText(topic.difficulty_level)}
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
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectTopics;
