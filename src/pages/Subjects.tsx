import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Star, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client'; // Importante: Importar o Supabase

// Interface para definir o tipo de um Subject vindo do banco
interface Subject {
  id: number;
  name: string;
  icon: string;
  difficulty: string;
}

const Subjects = () => {
  const navigate = useNavigate();
  const { getSubjectProgress } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  
  // Estado para armazenar as matérias que vêm do Supabase
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);

  // useEffect para buscar os dados quando o componente carregar
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      // Busca na tabela 'subjects' do seu banco de dados
      const { data, error } = await supabase
        .from('subjects')
        .select('id, name, icon, difficulty'); // Peça as colunas que você tem

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
                const subjectProgress = getSubjectProgress(subject.name);
                
                return (
                  <div
                    key={index}
                    onClick={() => handleNavigation(`/subjects/${subject.id}`)}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl shadow-lg`}>
                        {subject.icon || '📚'}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg mb-1">{subject.name}</h4>
                        <p className="text-white/80 text-sm mb-2">Conteúdo direto do seu banco de dados!</p>
                        
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} className="text-green-400" />
                            <span className="text-white/80">{subject.difficulty || 'Normal'}</span>
                          </div>
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
