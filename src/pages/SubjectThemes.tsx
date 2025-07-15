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
  content_count: number;
}

const SubjectThemes = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  // O mapa de nomes e ícones continua perfeito, não precisa mexer.
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

  const subjectIcons: { [key: string]: string } = {
    'matematica': '🔢',
    'portugues': '📚',
    'fisica': '⚡',
    'quimica': '🧪',
    'biologia': '🧬',
    'historia': '🏛️',
    'geografia': '🌍',
    'filosofia': '🤔',
    'sociologia': '👥',
    'ingles': '🌎',
    'espanhol': '🇪🇸',
    'literatura': '📖',
    'redacao': '✍️'
  };

  const themeColors: { [key: string]: string } = {
    'Mecânica': 'from-blue-500 to-blue-700',
    'Termologia': 'from-red-500 to-red-700',
    'Eletricidade': 'from-yellow-500 to-yellow-700',
    'Ondulatória': 'from-purple-500 to-purple-700',
    'Química Geral': 'from-green-500 to-green-700',
    'Físico-Química': 'from-indigo-500 to-indigo-700',
    'Química Orgânica': 'from-pink-500 to-pink-700',
    'Biologia Celular': 'from-teal-500 to-teal-700',
    'Genética e Evolução': 'from-orange-500 to-orange-700',
    'Ecologia': 'from-emerald-500 to-emerald-700',
    'Corpo Humano': 'from-rose-500 to-rose-700',
    'Geografia Geral': 'from-cyan-500 to-cyan-700',
    'Geografia do Brasil': 'from-lime-500 to-lime-700',
    'História da Filosofia': 'from-violet-500 to-violet-700',
    'Ética e Política': 'from-amber-500 to-amber-700',
    'Teoria Sociológica': 'from-slate-500 to-slate-700',
    'Cultura e Sociedade': 'from-stone-500 to-stone-700',
    'Sociedade Brasileira': 'from-neutral-500 to-neutral-700'
  };

  useEffect(() => {
    if (subject) {
      loadThemes();
    }
  }, [subject]);

  const loadThemes = async () => {
    if (!subject) return; // Garante que subject não é undefined
    
    setLoading(true);
    // **A CORREÇÃO ESTÁ AQUI**
    // Usamos o mapa para obter o nome capitalizado antes de fazer a busca.
    const capitalizedSubject = subjectNames[subject];

    try {
      const { data, error } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .eq('subject', capitalizedSubject) // <-- Usando o nome corrigido!
        .not('grande_tema', 'is', null);

      if (error) {
        console.error('Error loading themes:', error);
        return;
      }

      // O resto da lógica para contar e organizar os temas está perfeita.
      const themeCounts: { [key: string]: number } = {};
      data?.forEach(item => {
        if (item.grande_tema) {
          themeCounts[item.grande_tema] = (themeCounts[item.grande_tema] || 0) + 1;
        }
      });

      const uniqueThemes = Object.keys(themeCounts).map(theme => ({
        grande_tema: theme,
        content_count: themeCounts[theme]
      }));

      setThemes(uniqueThemes);
    } catch (error) {
      console.error('Error loading themes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThemeClick = (theme: string) => {
    if (!isMuted) playSound('click');
    const encodedTheme = encodeURIComponent(theme.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/subjects/${subject}/${encodedTheme}`);
  };

  const handleBack = () => {
    if (!isMuted) playSound('click');
    navigate('/subjects');
  };

  if (!subject) {
    return <div>Matéria não encontrada</div>;
  }

  // O resto do código (a parte de renderização/JSX) pode continuar exatamente igual.
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
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{subjectIcons[subject]}</span>
            <h1 className="text-lg font-semibold">{subjectNames[subject]}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <h2 className="text-white text-lg font-semibold mb-4 flex items-center space-x-2">
              <Layers size={20} />
              <span>Grandes Temas</span>
            </h2>

            {loading ? (
              <div className="text-white text-center py-8">Carregando temas...</div>
            ) : themes.length === 0 ? (
              <div className="text-white text-center py-8">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nenhum tema encontrado para esta matéria ainda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {themes.map((theme, index) => (
                  <div
                    key={index}
                    onClick={() => handleThemeClick(theme.grande_tema)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${themeColors[theme.grande_tema] || 'from-gray-500 to-gray-700'} flex items-center justify-center text-white shadow-lg`}>
                        <Layers size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{theme.grande_tema}</h3>
                        <p className="text-white/80 text-sm mb-2">
                          {theme.content_count} {theme.content_count === 1 ? 'tópico disponível' : 'tópicos disponíveis'}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                            {subjectNames[subject]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-white/60">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default SubjectThemes;
