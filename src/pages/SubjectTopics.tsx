
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import ContentViewer from '@/components/ContentViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Play, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
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
  content_data?: any;
  detailed_explanation?: string;
  explanation?: string;
  examples?: string;
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
          .select('id, title, description, difficulty_level, estimated_time, grande_tema, content_data, detailed_explanation, explanation, examples')
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
              grande_tema: topic.grande_tema || 'Outros',
              content_data: topic.content_data,
              detailed_explanation: topic.detailed_explanation,
              explanation: topic.explanation,
              examples: topic.examples
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

  // Função para analisar o status do conteúdo
  const getContentStatus = (topic: Topic) => {
    let hasStructuredContent = false;
    let hasBasicContent = false;

    // Verificar se há content_data estruturado
    if (topic.content_data) {
      if ((topic.content_data.sections && Array.isArray(topic.content_data.sections)) ||
          (topic.content_data.slides && Array.isArray(topic.content_data.slides))) {
        hasStructuredContent = true;
      }
    }

    // Verificar se há conteúdo básico
    if (topic.detailed_explanation || topic.explanation || topic.description || topic.examples) {
      hasBasicContent = true;
    }

    if (hasStructuredContent) {
      return {
        status: 'complete',
        label: 'Completo',
        icon: BookOpen,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20'
      };
    }

    if (hasBasicContent) {
      return {
        status: 'basic',
        label: 'Básico',
        icon: FileText,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
      };
    }

    return {
      status: 'developing',
      label: 'Em desenvolvimento',
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    };
  };

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
                    const contentStatus = getContentStatus(topic);
                    const StatusIcon = contentStatus.icon;
                    
                    return (
                      <div 
                        key={topic.id} 
                        onClick={() => handleTopicClick(topic.id)} 
                        className="bg-white/15 backdrop-blur-md rounded-2xl p-5 cursor-pointer hover:bg-white/25 transition-all hover:scale-[1.02] shadow-lg border border-white/10"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg relative flex-shrink-0">
                            <StatusIcon size={24} />
                            {progress && progress.completed && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle size={16} className="text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-bold text-white text-base leading-tight">{topic.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${contentStatus.bgColor} ${contentStatus.color}`}>
                                {contentStatus.label}
                              </span>
                            </div>
                            
                            <p className="text-white/80 text-sm mb-3 leading-relaxed break-words">
                              {topic.description && topic.description.length > 80 
                                ? `${topic.description.substring(0, 80)}...` 
                                : topic.description || 'Descrição em breve...'}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
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
                          
                          <div className="text-white/60 flex-shrink-0 mt-1">
                            <Play size={20} />
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
