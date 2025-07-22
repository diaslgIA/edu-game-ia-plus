
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight, Layers, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/contexts/SoundContext';

const SubjectThemes = () => {
  const { subject = '' } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  const [themes, setThemes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapeamento padronizado de nomes de disciplinas
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
    'literatura': 'Literatura',
    'ingles': 'Inglês',
    'espanhol': 'Espanhol',
    'redacao': 'Redação'
  };

  const capitalizedSubject = subjectNames[subject.toLowerCase()] || subject;

  useEffect(() => {
    const loadThemes = async () => {
      if (!subject) {
        console.log('⚠️ SubjectThemes: subject não fornecido');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      console.log(`🔍 SubjectThemes: Carregando temas para "${subject}" (${capitalizedSubject})`);
      
      try {
        // Tentar buscar com o nome padronizado primeiro
        let { data, error } = await supabase
          .from('subject_contents')
          .select('grande_tema')
          .eq('subject', capitalizedSubject)
          .not('grande_tema', 'is', null);

        // Se não encontrar, tentar com o nome original
        if (!data || data.length === 0) {
          console.log(`⚠️ Nenhum tema encontrado para "${capitalizedSubject}", tentando "${subject}"`);
          const result = await supabase
            .from('subject_contents')
            .select('grande_tema')
            .eq('subject', subject)
            .not('grande_tema', 'is', null);
          data = result.data;
          error = result.error;
        }

        // Se ainda não encontrar, tentar variações comuns
        if (!data || data.length === 0) {
          const variations = [
            subject.toLowerCase(),
            subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase(),
            subject.toUpperCase()
          ];
          
          for (const variation of variations) {
            console.log(`🔄 Tentando variação: "${variation}"`);
            const result = await supabase
              .from('subject_contents')
              .select('grande_tema')
              .eq('subject', variation)
              .not('grande_tema', 'is', null);
            
            if (result.data && result.data.length > 0) {
              data = result.data;
              error = result.error;
              console.log(`✅ Encontrado com variação: "${variation}"`);
              break;
            }
          }
        }

        if (error) {
          console.error('❌ Erro ao carregar temas:', error);
          setError(`Erro ao carregar temas: ${error.message}`);
        } else {
          const uniqueThemes = [...new Set(data?.map(item => item.grande_tema).filter(Boolean) as string[])];
          console.log(`✅ Temas encontrados para "${capitalizedSubject}":`, uniqueThemes);
          setThemes(uniqueThemes);
          
          if (uniqueThemes.length === 0) {
            setError(`Nenhum tema encontrado para a disciplina "${capitalizedSubject}". Verifique se o conteúdo foi inserido corretamente no banco de dados.`);
          }
        }
      } catch (err) {
        console.error('❌ Erro geral ao carregar temas:', err);
        setError('Erro inesperado ao carregar temas');
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  }, [subject, capitalizedSubject]);

  const handleThemeClick = (theme: string) => {
    if (!isMuted) playSound('click');
    const encodedTheme = encodeURIComponent(theme);
    navigate(`/subjects/${subject}/${encodedTheme}`);
  };

  const handleBack = () => {
    if (!isMuted) playSound('click');
    navigate('/subjects');
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button variant="ghost" size="sm" onClick={handleBack} className="text-white p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">{capitalizedSubject}</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-white text-lg font-semibold mb-4 flex items-center">
            <Layers className="mr-2" />
            Grandes Temas
          </h2>
          
          {loading ? (
            <div className="text-center text-white/80 py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Carregando temas...</p>
            </div>
          ) : error ? (
            <div className="text-center text-white/80 py-8">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-red-300 mb-2">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="text-white border-white hover:bg-white/20"
              >
                Tentar Novamente
              </Button>
            </div>
          ) : themes.length === 0 ? (
            <div className="text-center text-white/80 py-8">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhum tema encontrado para "{capitalizedSubject}".</p>
              <p className="text-xs mt-2">Verifique se o conteúdo foi inserido corretamente no banco de dados.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {themes.map((tema, index) => (
                <div 
                  key={`${tema}-${index}`}
                  onClick={() => handleThemeClick(tema)} 
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{tema}</h3>
                      <p className="text-white/60 text-sm mt-1">Explore os conteúdos deste tema</p>
                    </div>
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
