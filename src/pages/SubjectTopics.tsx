import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import DetailedContentViewer from '@/components/DetailedContentViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Play, CheckCircle, Target, Star } from 'lucide-react';
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
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('id, title, description, difficulty_level, estimated_time, grande_tema, key_concepts')
        .eq('subject', capitalizedSubject)
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

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '●';
      case 'medium': return '●●';
      case 'hard': return '●●●';
      default: return '●●';
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

  const parseKeyConcepts = (concepts: any): string[] => {
    if (Array.isArray(concepts)) return concepts;
    if (typeof concepts === 'string') {
      try {
        const parsed = JSON.parse(concepts);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  if (!subject || !theme) {
    return <div>Parâmetros inválidos</div>;
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
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-white text-xl font-bold mb-2">Tópicos de Estudo</h2>
              <p className="text-white/80 text-sm">
                Conteúdo completo para sua preparação no ENEM
              </p>
            </div>

            {loading ? (
              <div className="text-white text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Carregando tópicos...</p>
              </div>
            ) : topics.length === 0 ? (
              <div className="text-white text-center py-8">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">Nenhum tópico encontrado</p>
                <p className="text-white/70">Os conteúdos para este tema ainda estão sendo preparados.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topics.map((topic, index) => {
                  const progress = getContentProgress(topic.id);
                  const keyConcepts = parseKeyConcepts(topic.key_concepts);
                  
                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleTopicClick(topic.id)}
                      className="bg-white/15 backdrop-blur-md rounded-2xl p-5 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                    >
                      {/* Topic Header */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg relative flex-shrink-0">
                          <span className="font-bold text-lg">{index + 1}</span>
                          {progress && progress.completed && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">{topic.title}</h3>
                          <p className="text-white/80 text-sm mb-3 line-clamp-2">{topic.description}</p>
                          
                          {/* Stats Row */}
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock size={12} className="text-blue-400" />
                                <span className="text-white/80">{topic.estimated_time} min</span>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                <Target size={12} className="text-purple-400" />
                                <span className={`${getDifficultyColor(topic.difficulty_level)} font-medium`}>
                                  {getDifficultyText(topic.difficulty_level)}
                                </span>
                                <span className={getDifficultyColor(topic.difficulty_level)}>
                                  {getDifficultyIcon(topic.difficulty_level)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Play size={12} className="text-white/60" />
                              <span className="text-white/60">Estudar</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Concepts */}
                      {keyConcepts.length > 0 && (
                        <div className="border-t border-white/10 pt-3">
                          <div className="flex items-center mb-2">
                            <Star size={12} className="text-yellow-400 mr-1" />
                            <span className="text-white/70 text-xs font-medium">Conceitos principais:</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {keyConcepts.slice(0, 4).map((concept, idx) => (
                              <span 
                                key={idx} 
                                className="bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs border border-white/10"
                              >
                                {concept}
                              </span>
                            ))}
                            {keyConcepts.length > 4 && (
                              <span className="text-white/60 text-xs px-2 py-1">
                                +{keyConcepts.length - 4} mais
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Progress Bar */}
                      {progress && progress.progress_percentage > 0 && (
                        <div className="border-t border-white/10 pt-3 mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/70 text-xs">Progresso</span>
                            <span className="text-green-400 text-xs font-medium">
                              {progress.progress_percentage}%
                            </span>
                          </div>
                          <div className="bg-white/20 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${progress.progress_percentage}%` }}
                            />
                          </div>
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
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectTopics;
