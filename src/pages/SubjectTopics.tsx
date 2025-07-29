
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

// Database row type for subject_contents
interface SubjectContentRow {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  estimated_time: number;
  grande_tema: string;
}

// Fixed interface to match database schema (UUID strings)
interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  estimated_time: number;
  grande_tema: string;
}

// Interface for grouping topics by theme
interface GroupedTopics {
  [key: string]: Topic[];
}

const SubjectTopics = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  
  // States for managing data
  const [groupedTopics, setGroupedTopics] = useState<GroupedTopics>({});
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Keep for progress logic
  const { getContentProgress } = useSubjectContents(subjectName || '');

  useEffect(() => {
    if (!subjectId) return;

    const fetchAndGroupTopics = async () => {
      setLoading(true);
      
      // 1. Fetch subject name for header display
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select('nome')
        .eq('id', subjectId)
        .single();
      
      if (subjectError) {
        console.error('Erro ao buscar o nome da matéria:', subjectError);
      } else if (subjectData) {
        setSubjectName(subjectData.nome);
      }
      
      // 2. Fetch all topics belonging to this subject with explicit typing
      const { data: topicsData, error: topicsError } = await supabase
        .from('subject_contents')
        .select('id, title, description, difficulty_level, estimated_time, grande_tema')
        .eq('subject_id', subjectId)
        .returns<SubjectContentRow[]>();

      if (topicsError) {
        console.error('Erro ao buscar tópicos:', topicsError);
      } else if (topicsData) {
        // 3. Group topics by "grande_tema" with explicit typing
        const groups: GroupedTopics = {};
        
        topicsData.forEach((dbTopic: SubjectContentRow) => {
          const theme = dbTopic.grande_tema;
          if (!groups[theme]) {
            groups[theme] = [];
          }
          
          // Explicit mapping from database row to Topic interface
          const topicItem: Topic = {
            id: dbTopic.id,
            title: dbTopic.title,
            description: dbTopic.description,
            difficulty_level: dbTopic.difficulty_level,
            estimated_time: dbTopic.estimated_time,
            grande_tema: dbTopic.grande_tema
          };
          
          groups[theme].push(topicItem);
        });
        
        setGroupedTopics(groups);
      }
      setLoading(false);
    };
    
    fetchAndGroupTopics();
  }, [subjectId]);

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
      navigate('/subjects');
    }
  };

  // If a topic was selected, show ContentViewer
  if (selectedTopicId) {
    return (
      <MobileContainer background="gradient">
        <ContentViewer
          subject={subjectName}
          contentId={selectedTopicId}
          onBack={handleBack}
          onComplete={() => setSelectedTopicId(null)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  // Main rendering with grouped data
  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-white p-2 hover:bg-white/20 rounded-xl">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{subjectName || "Carregando..."}</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-white text-center py-8">Carregando tópicos...</div>
          ) : Object.keys(groupedTopics).length === 0 ? (
            <div className="text-white text-center py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum tópico encontrado para esta matéria ainda.</p>
            </div>
          ) : (
            Object.keys(groupedTopics).map(theme => (
              <div key={theme} className="mb-6">
                <h2 className="text-white text-xl font-bold mb-4 flex items-center space-x-2">
                  <BookOpen size={20} />
                  <span>{theme}</span>
                </h2>
                <div className="space-y-4">
                  {groupedTopics[theme].map((topic) => {
                    const progress = getContentProgress(topic.id);
                    return (
                      <div key={topic.id} onClick={() => handleTopicClick(topic.id)} className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105">
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
                                <span className={`text-xs ${getDifficultyColor(topic.difficulty_level)}`}>{getDifficultyText(topic.difficulty_level)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-white/60"><Play size={20} /></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectTopics;
