import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Interface para os nossos tópicos/conteúdos
interface Topic {
  id: number;
  title: string;
}

const SubjectTopics = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  
  // Pega o ID da matéria da URL (ex: /subjects/1 -> subjectId será '1')
  const { subjectId } = useParams<{ subjectId: string }>();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectName, setSubjectName] = useState('');

  useEffect(() => {
    if (!subjectId) return;

    const fetchTopicsAndSubject = async () => {
      setLoading(true);

      // 1. Busca o nome da matéria para mostrar no título
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select('nome')
        .eq('id', subjectId)
        .single();

      if (subjectError) {
        console.error('Erro ao buscar nome da matéria:', subjectError);
      } else {
        setSubjectName(subjectData.nome);
      }

      // 2. Busca os tópicos/conteúdos que pertencem a essa matéria
      const { data: topicsData, error: topicsError } = await supabase
        .from('subject_contents')
        .select('id, title')
        .eq('subject_id', subjectId)
        .order('order', { ascending: true }); // Ordena pela coluna 'order'

      if (topicsError) {
        console.error('Erro ao buscar tópicos:', topicsError);
      } else {
        setTopics(topicsData);
      }

      setLoading(false);
    };

    fetchTopicsAndSubject();
  }, [subjectId]);

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/subjects')}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <BookOpen size={20} />
            <span>{subjectName || 'Carregando...'}</span>
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-white text-center">Carregando temas...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-white text-lg font-semibold mb-2">Temas de {subjectName}</h2>
              {topics.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/content/${topic.id}`} // Navega para a página de conteúdo com o ID do tópico
                  className="block bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-lg">{topic.title}</h4>
                    <ChevronRight size={20} className="text-white/60" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectTopics;
