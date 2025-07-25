import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Star, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Interface ajustada para corresponder às suas colunas
interface Subject {
  id: number;
  nome: string; // Corrigido de 'name' para 'nome'
  description: string; // Adicionada a coluna 'description'
}

const Subjects = () => {
  const navigate = useNavigate();
  const { getSubjectProgress } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      // CORREÇÃO FINAL: Pedindo exatamente as colunas que você tem
      const { data, error } = await supabase
        .from('subjects')
        .select('id, name, description'); 

      if (error) {
        console.error("Erro ao buscar matérias:", error);
      } else {
        setSubjects(data);
      }
      setLoading(false);
    };

    fetchSubjects();
  }, []);


  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <BookOpen size={20} />
            <span>{t('subjects')}</span>
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-white text-center">Carregando matérias...</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject, index) => {
                const subjectProgress = getSubjectProgress(subject.nome); // Corrigido para usar subject.nome
                
                return (
                  <div
                    key={index}
                    onClick={() => handleNavigation(`/subjects/${subject.id}`)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl shadow-lg`}>
                        📚 {/* Ícone fixo, pois não temos essa coluna */}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg mb-1">{subject.nome}</h4> {/* Exibe o nome da sua tabela */}
                        <p className="text-white/80 text-sm mb-2">{subject.description}</p> {/* Exibe a descrição da sua tabela */}
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400" />
                            <span className="text-white/80">{subjectProgress.progress_percentage}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-white/60 text-2xl">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subjects;
