
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import ContentViewer from '@/components/ContentViewer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Play, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    if (!subject || !theme) {
      console.log('⚠️ SubjectTopics: subject ou theme não fornecidos');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const decodedTheme = decodeURIComponent(theme || '').replace(/-/g, ' ');
      console.log(`🔍 SubjectTopics: Carregando tópicos para "${capitalizedSubject}" - tema: "${decodedTheme}"`);
      
      // Tentar diferentes variações de busca
      let data = null;
      let error = null;

      // Primeira tentativa: busca exata
      const result1 = await supabase
        .from('subject_contents')
        .select('id, title, description, difficulty_level, estimated_time, grande_tema')
        .eq('subject', capitalizedSubject)
        .ilike('grande_tema', `%${decodedTheme}%`)
        .order('order_index', { ascending: true });

      data = result1.data;
      error = result1.error;

      // Se não encontrar, tentar com o subject original
      if (!data || data.length === 0) {
        console.log(`⚠️ Tentando com subject original: "${subject}"`);
        const result2 = await supabase
          .from('subject_contents')
          .select('id, title, description, difficulty_level, estimated_time, grande_tema')
          .eq('subject', subject)
          .ilike('grande_tema', `%${decodedTheme}%`)
          .order('order_index', { ascending: true });
        
        data = result2.data;
        error = result2.error;
      }

      // Se ainda não encontrar, buscar por tema sem filtrar por disciplina
      if (!data || data.length === 0) {
        console.log(`⚠️ Tentando busca ampla por tema: "${decodedTheme}"`);
        const result3 = await supabase
          .from('subject_contents')
          .select('id, title, description, difficulty_level, estimated_time, grande_tema, subject')
          .ilike('grande_tema', `%${decodedTheme}%`)
          .order('order_index', { ascending: true });
        
        // Filtrar manualmente os resultados
        const filtered = result3.data?.filter(item => 
          item.subject?.toLowerCase().includes(subject?.toLowerCase() || '') ||
          subject?.toLowerCase().includes(item.subject?.toLowerCase() || '')
        );
        
        data = filtered;
        error = result3.error;
      }

      if (error) {
        console.error('❌ Erro ao carregar tópicos:', error);
        setError(`Erro ao carregar tópicos: ${error.message}`);
        return;
      }

      console.log(`✅ Tópicos encontrados: ${data?.length || 0}`);
      console.log('📄 Primeiros tópicos:', data?.slice(0, 3));

      setTopics(data || []);

      if (!data || data.length === 0) {
        setError(`Nenhum tópico encontrado para o tema "${decodedTheme}" em ${capitalizedSubject}`);
      }

    } catch (error) {
      console.error('❌ Erro geral ao carregar tópicos:', error);
      setError('Erro inesperado ao carregar tópicos');
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
    return (
      <MobileContainer background="gradient">
        <div className="text-white text-center py-8">
          <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>Parâmetros inválidos</p>
        </div>
      </MobileContainer>
    );
  }

  if (selectedTopicId) {
    return (
      <MobileContainer background="gradient">
        <ContentViewer
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
          <div className="space-y-4">
            <h2 className="text-white text-lg font-semibold mb-4 flex items-center space-x-2">
              <BookOpen size={20} />
              <span>Tópicos de Estudo</span>
            </h2>

            {loading ? (
              <div className="text-center text-white py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                <p>Carregando tópicos...</p>
              </div>
            ) : error ? (
              <div className="text-center text-white py-8">
                <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-red-300 mb-4">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadTopics}
                  className="text-white border-white hover:bg-white/20"
                >
                  Tentar Novamente
                </Button>
              </div>
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
