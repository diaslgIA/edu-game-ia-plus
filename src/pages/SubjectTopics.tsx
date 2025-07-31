
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

// Interface corrigida para usar string (UUID) em vez de number
interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  estimated_time: number;
  grande_tema: string;
}

// Interface para agrupar os tópicos por tema
interface GroupedTopics {
  [key: string]: Topic[];
}

const SubjectTopics = () => {
  // Corrigido: pega subjectName da URL em vez de subjectId
  const { subjectName } = useParams<{ subjectName: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  
  // Estados para gerir os dados
  const [groupedTopics, setGroupedTopics] = useState<GroupedTopics>({});
  const [loading, setLoading] = useState(true);
  const [displaySubjectName, setDisplaySubjectName] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mapeamento dos IDs para nomes corretos das matérias
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

  const { getContentProgress } = useSubjectContents(displaySubjectName || '');

  useEffect(() => {
    const fetchAndGroupTopics = async () => {
      console.log('SubjectTopics - subjectName from URL:', subjectName);
      
      if (!subjectName) {
        console.error('SubjectTopics - No subjectName provided');
        setError('Nome da matéria não fornecido');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      // Define o nome da matéria baseado no ID da URL
      const mappedSubjectName = subjectNames[subjectName.toLowerCase()] || subjectName;
      console.log('SubjectTopics - Mapped subject name:', mappedSubjectName);
      setDisplaySubjectName(mappedSubjectName);
      
      try {
        // Busca todos os conteúdos que pertencem a esta matéria
        const { data: topicsData, error: topicsError } = await supabase
          .from('subject_contents')
          .select('id, title, description, difficulty_level, estimated_time, grande_tema')
          .eq('subject', mappedSubjectName);

        console.log('SubjectTopics - Query result:', { data: topicsData, error: topicsError });

        if (topicsError) {
          console.error('Erro ao buscar tópicos:', topicsError);
          setError('Erro ao carregar tópicos');
        } else if (topicsData) {
          console.log('SubjectTopics - Topics found:', topicsData.length);
          
          // Agrupa os tópicos pelo "grande_tema"
          const groups: GroupedTopics = topicsData.reduce((acc, topic) => {
            const theme = topic.grande_tema || 'Outros';
            if (!acc[theme]) {
              acc[theme] = [];
            }
            // Cast explícito para Topic já que sabemos que os tipos são compatíveis
            acc[theme].push({
              id: topic.id,
              title: topic.title,
              description: topic.description || '',
              difficulty_level: topic.difficulty_level || 'medium',
              estimated_time: topic.estimated_time || 15,
              grande_tema: topic.grande_tema || 'Outros'
            } as Topic);
            return acc;
          }, {} as GroupedTopics);
          
          console.log('SubjectTopics - Grouped topics:', groups);
          setGroupedTopics(groups);
        } else {
          console.log('SubjectTopics - No topics found');
          setGroupedTopics({});
        }
      } catch (error) {
        console.error('SubjectTopics - Exception during fetch:', error);
        setError('Erro inesperado ao carregar tópicos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAndGroupTopics();
  }, [subjectName]);

  // Suas funções de ajuda permanecem as mesmas
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
    console.log('SubjectTopics - Topic clicked:', topicId);
    if (!isMuted) playSound('click');
    setSelectedTopicId(topicId);
  };

  const handleBack = () => {
    console.log('SubjectTopics - Back button clicked');
    if (!isMuted) playSound('click');
    if (selectedTopicId) {
      setSelectedTopicId(null);
    } else {
      navigate('/subjects');
    }
  };

  // Se um tópico foi selecionado, mostrar o ContentViewer
  if (selectedTopicId) {
    return (
      <MobileContainer background="gradient">
        <ContentViewer
          subject={displaySubjectName}
          contentId={selectedTopicId}
          onBack={handleBack}
          onComplete={() => setSelectedTopicId(null)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  // A renderização principal, agora com os dados agrupados
  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-white p-2 hover:bg-white/20 rounded-xl">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{displaySubjectName || "Carregando..."}</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-white text-center py-8">Carregando tópicos...</div>
          ) : error ? (
            <div className="text-white text-center py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-red-400">{error}</p>
              <p className="text-xs mt-2 opacity-70">Tente novamente ou volte para a lista de matérias.</p>
            </div>
          ) : Object.keys(groupedTopics).length === 0 ? (
            <div className="text-white text-center py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum tópico encontrado para {displaySubjectName}.</p>
              <p className="text-xs mt-2 opacity-70">Verifique se o conteúdo foi inserido no banco de dados.</p>
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
