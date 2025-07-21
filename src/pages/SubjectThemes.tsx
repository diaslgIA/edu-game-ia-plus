
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/contexts/SoundContext';

const SubjectThemes = () => {
  const { subject = '' } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();

  const subjectNames: { [key: string]: string } = {
    'matematica': 'Matemática',
    'portugues': 'Português e Literatura',
    'fisica': 'Física',
    'quimica': 'Química',
    'biologia': 'Biologia',
    'historia': 'História',
    'geografia': 'Geografia',
    'filosofia': 'Filosofia',
    'sociologia': 'Sociologia',
    'ingles': 'Inglês',
    'espanhol': 'Espanhol',
  };

  const capitalizedSubject = subjectNames[subject.toLowerCase()] || subject;

  // Query to fetch unique themes (grande_tema) for the selected subject
  const { data: themes = [], isLoading, error } = useQuery({
    queryKey: ['themes', capitalizedSubject],
    queryFn: async () => {
      console.log('Fetching themes for subject:', capitalizedSubject);
      
      // Get unique themes (grande_tema) from subject_contents
      const { data: themesData, error: themesError } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .eq('subject', capitalizedSubject)
        .not('grande_tema', 'is', null);

      if (themesError) {
        console.error('Error fetching themes:', themesError);
        throw themesError;
      }

      console.log('Raw themes data:', themesData);

      // Extract unique themes
      const uniqueThemes = Array.from(
        new Set(themesData?.map(item => item.grande_tema).filter(Boolean))
      ).map(themeName => ({
        id: themeName, // Use theme name as ID since we don't have separate theme table
        name: themeName,
        subject: capitalizedSubject
      }));

      console.log('Unique themes found:', uniqueThemes);
      return uniqueThemes;
    },
    enabled: !!capitalizedSubject,
  });

  const handleThemeClick = (theme: { id: string; name: string; subject: string }) => {
    if (!isMuted) playSound('click');
    const encodedTheme = encodeURIComponent(theme.name);
    navigate(`/subjects/${subject}/${encodedTheme}`);
  };

  if (error) {
    console.error('Error loading themes:', error);
  }

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
          <h2 className="text-white text-lg font-semibold mb-4 flex items-center">
            <Layers className="mr-2" />
            Grandes Temas
          </h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/15" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-white/80 py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Erro ao carregar temas para "{capitalizedSubject}".</p>
              <p className="text-xs mt-2">Verifique sua conexão com a internet.</p>
            </div>
          ) : themes.length === 0 ? (
            <div className="text-center text-white/80 py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum tema encontrado para "{capitalizedSubject}".</p>
              <p className="text-xs mt-2">Os temas para esta matéria ainda estão sendo preparados.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {themes.map((theme) => (
                <div 
                  key={theme.id} 
                  onClick={() => handleThemeClick(theme)} 
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-lg">{theme.name}</h3>
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
