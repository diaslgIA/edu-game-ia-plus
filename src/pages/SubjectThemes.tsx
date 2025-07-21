
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/contexts/SoundContext';

interface Theme {
  grande_tema: string;
}

const SubjectThemes = () => {
  const { subject = '' } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  const [themes, setThemes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
  };

  const capitalizedSubject = subjectNames[subject.toLowerCase()] || subject;

  useEffect(() => {
    const loadThemes = async () => {
      if (!subject) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .eq('subject', capitalizedSubject)
        .not('grande_tema', 'is', null);

      if (error) {
        console.error("Error loading themes:", error);
        setThemes([]);
      } else {
        const uniqueThemes = [...new Set(data.map(item => item.grande_tema).filter(Boolean) as string[])];
        setThemes(uniqueThemes);
      }
      setLoading(false);
    };

    loadThemes();
  }, [subject, capitalizedSubject]);

  const handleThemeClick = (theme: string) => {
    if (!isMuted) playSound('click');
    const encodedTheme = encodeURIComponent(theme);
    navigate(`/subjects/${subject}/${encodedTheme}`);
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button variant="ghost" size="sm" onClick={() => navigate('/subjects')} className="text-white p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">{capitalizedSubject}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-white text-lg font-semibold mb-4 flex items-center"><Layers className="mr-2" />Grandes Temas</h2>
          {loading ? (
            <p className="text-white/80 text-center">Carregando temas...</p>
          ) : themes.length === 0 ? (
            <div className="text-center text-white/80 py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum tema encontrado para "{capitalizedSubject}".</p>
              <p className="text-xs mt-2">Verifique se o conteúdo foi inserido corretamente no banco de dados.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {themes.map((tema) => (
                <div key={tema} onClick={() => handleThemeClick(tema)} className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg">{tema}</h3>
                    <ChevronRight className="text-white/60" size={24} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectThemes;
