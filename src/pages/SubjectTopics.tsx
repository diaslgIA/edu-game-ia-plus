
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import StudyContentViewer from '@/components/StudyContentViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Play, CheckCircle, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSubjectContents } from '@/hooks/useSubjectContents';
import { useSound } from '@/contexts/SoundContext';

interface StudyTopic {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  estimated_time: number;
  grande_tema: string;
  explanation?: string;
}

interface GroupedTopics {
  [key: string]: StudyTopic[];
}

const SubjectTopics = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  
  const [groupedTopics, setGroupedTopics] = useState<GroupedTopics>({});
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const { getContentProgress } = useSubjectContents(subjectName || '');

  useEffect(() => {
    if (!subjectId) return;

    const fetchAndGroupTopics = async () => {
      setLoading(true);
      
      try {
        // Fetch subject name
        const { data: subjectData } = await supabase
          .from('subjects')
          .select('nome')
          .eq('id', subjectId)
          .single();
        
        if (subjectData) {
          setSubjectName(subjectData.nome);
        }
        
        // Fetch topics - avoid complex type inference
        const { data: rawTopicsData } = await supabase
          .from('subject_contents')
          .select('id, title, description, difficulty_level, estimated_time, grande_tema, explanation')
          .eq('subject_id', subjectId);

        if (rawTopicsData && Array.isArray(rawTopicsData)) {
          const groups: GroupedTopics = {};
          
          // Process each topic with explicit typing
          for (const rawItem of rawTopicsData) {
            const theme: string = rawItem.grande_tema || 'Outros Tópicos';
            
            if (!groups[theme]) {
              groups[theme] = [];
            }
            
            const topic: StudyTopic = {
              id: String(rawItem.id),
              title: String(rawItem.title || ''),
              description: String(rawItem.description || 'Explore este tópico interessante'),
              difficulty_level: String(rawItem.difficulty_level || 'medium'),
              estimated_time: Number(rawItem.estimated_time || 15),
              grande_tema: String(rawItem.grande_tema || ''),
              explanation: rawItem.explanation ? String(rawItem.explanation) : undefined
            };
            
            groups[theme].push(topic);
          }
          
          setGroupedTopics(groups);
        }
      } catch (error) {
        console.error('Erro ao processar tópicos:', error);
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

  // If a topic was selected, show StudyContentViewer
  if (selectedTopicId) {
    return (
      <MobileContainer background="gradient">
        <StudyContentViewer
          subject={subjectName}
          contentId={selectedTopicId}
          onBack={handleBack}
          onComplete={() => setSelectedTopicId(null)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

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
            <h1 className="text-lg font-semibold">{subjectName || "Carregando..."}</h1>
            <p className="text-white/70 text-sm">Explore os tópicos gamificados</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-white text-center py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50 animate-pulse" />
              <p>Preparando sua jornada de estudos...</p>
            </div>
          ) : Object.keys(groupedTopics).length === 0 ? (
            <div className="text-white text-center py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum tópico encontrado para esta matéria ainda.</p>
            </div>
          ) : (
            Object.keys(groupedTopics).map(theme => (
              <div key={theme} className="mb-6">
                <h2 className="text-white text-xl font-bold mb-4 flex items-center space-x-2">
                  <Star size={20} className="text-yellow-400" />
                  <span>{theme}</span>
                </h2>
                
                <div className="grid gap-4">
                  {groupedTopics[theme].map((topic) => {
                    const progress = getContentProgress(topic.id);
                    const isCompleted = progress && progress.completed;
                    
                    return (
                      <div 
                        key={topic.id} 
                        onClick={() => handleTopicClick(topic.id)}
                        className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 border border-white/10 relative overflow-hidden"
                      >
                        {/* Gamification overlay */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>
                        
                        <div className="flex items-center space-x-4">
                          {/* Icon with progress indicator */}
                          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg">
                            <BookOpen size={24} />
                            
                            {/* Completion badge */}
                            {isCompleted && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                <CheckCircle size={14} className="text-white" />
                              </div>
                            )}
                            
                            {/* Progress ring */}
                            {progress && progress.progress_percentage > 0 && !isCompleted && (
                              <div className="absolute -inset-1">
                                <div 
                                  className="w-full h-full rounded-xl border-2 border-yellow-400"
                                  style={{
                                    background: `conic-gradient(#facc15 ${progress.progress_percentage * 3.6}deg, transparent 0deg)`
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-lg mb-1 flex items-center space-x-2">
                              <span>{topic.title}</span>
                              {isCompleted && <Star size={16} className="text-yellow-400" />}
                            </h3>
                            
                            <p className="text-white/80 text-sm mb-3 line-clamp-2">
                              {topic.description}
                            </p>
                            
                            {/* Gamified info badges */}
                            <div className="flex items-center space-x-3 text-xs">
                              <div className="flex items-center space-x-1 bg-blue-500/20 px-2 py-1 rounded-lg">
                                <Clock size={12} className="text-blue-400" />
                                <span className="text-blue-300">{topic.estimated_time} min</span>
                              </div>
                              
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                                topic.difficulty_level === 'easy' ? 'bg-green-500/20' :
                                topic.difficulty_level === 'medium' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                              }`}>
                                <span className={getDifficultyColor(topic.difficulty_level)}>
                                  {getDifficultyText(topic.difficulty_level)}
                                </span>
                              </div>
                              
                              {progress && progress.progress_percentage > 0 && (
                                <div className="flex items-center space-x-1 bg-purple-500/20 px-2 py-1 rounded-lg">
                                  <span className="text-purple-300">
                                    {progress.progress_percentage}% concluído
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Action indicator */}
                          <div className="text-white/60 flex flex-col items-center space-y-1">
                            <Play size={20} />
                            <span className="text-xs">Estudar</span>
                          </div>
                        </div>
                        
                        {/* XP Preview */}
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star size={14} className="text-yellow-400" />
                            <span className="text-yellow-300 text-sm font-medium">
                              +{Math.floor(topic.estimated_time * 2)} XP
                            </span>
                          </div>
                          
                          <div className="text-white/50 text-xs">
                            {isCompleted ? 'Concluído' : 'Disponível'}
                          </div>
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
