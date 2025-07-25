import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Subject {
  id: number;
  nome: string;
  description: string;
}

const Subjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('id, nome, description');

      if (error) {
        console.error("Erro ao buscar matérias:", error);
      } else if (data) {
        setSubjects(data);
      }
      setLoading(false);
    };

    fetchSubjects();
  }, []);

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
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
              {subjects.map((subject) => (
                // CORREÇÃO PRINCIPAL AQUI: O Link agora leva para o URL correto
                <Link
                  key={subject.id}
                  to={`/subjects/${subject.id}/topics`} 
                  className="block bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-lg">{subject.nome}</h4>
                    <ChevronRight size={20} className="text-white/60" />
                  </div>
                  <p className="text-white/80 text-sm mt-1">{subject.description}</p>
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

export default Subjects;
