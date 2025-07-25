import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';

interface Subject { id: number; nome: string; knowledge_area_id: number; }
interface KnowledgeArea { id: number; name: string; icon: string; color: string; subjects: Subject[]; }

const Subjects = () => {
  console.log("PISTA 1: Componente Subjects iniciou.");

  const navigate = useNavigate();
  const { t } = useLanguage();
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("PISTA 2: useEffect foi ativado, vai começar a buscar os dados.");

    const fetchData = async () => {
      setLoading(true);
      console.log("PISTA 3: Dentro de fetchData. Buscando 'knowledge_areas'...");
      
      const { data: areasData, error: areasError } = await supabase.from('knowledge_areas').select('*');
      
      console.log("PISTA 4: Busca por 'knowledge_areas' concluída.");
      if (areasError) console.error("ERRO em knowledge_areas:", areasError);


      console.log("PISTA 5: Buscando 'subjects'...");
      const { data: subjectsData, error: subjectsError } = await supabase.from('subjects').select('id, nome, knowledge_area_id');

      console.log("PISTA 6: Busca por 'subjects' concluída.");
      if (subjectsError) console.error("ERRO em subjects:", subjectsError);


      if (areasData && subjectsData) {
        console.log("PISTA 7: Agrupando os dados...");
        const groupedData = areasData.map(area => ({
          ...area,
          subjects: subjectsData.filter(subject => subject.knowledge_area_id === area.id)
        }));
        console.log("PISTA 8: Dados agrupados com sucesso.", groupedData);
        setKnowledgeAreas(groupedData);
      } else {
        console.log("AVISO: 'areasData' ou 'subjectsData' vieram vazios ou nulos.");
      }

      setLoading(false);
      console.log("PISTA 9: Fetching concluído, loading definido como false.");
    };
    
    fetchData();
  }, []);

  console.log("PISTA 10: Componente vai renderizar o HTML. Loading está:", loading);

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="text-white p-2 hover:bg-white/20 rounded-xl"><ArrowLeft size={20} /></Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2"><BookOpen size={20} /><span>{t('subjects')}</span></h1>
        </div>
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {loading ? <p className="text-white text-center">Carregando...</p> : (
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">Áreas do Conhecimento</h2>
              <div className="grid grid-cols-1 gap-4">
                {knowledgeAreas.map((area) => (
                  <div key={area.id} className="space-y-3">
                    <h3 className="text-white text-md font-medium flex items-center space-x-2"><span className="text-xl">{area.icon}</span> <span>{area.name}</span></h3>
                    <div className="grid grid-cols-1 gap-3">
                      {area.subjects.map((subject) => (
                        <Link key={subject.id} to={`/subjects/${subject.id}/topics`} className="block bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10">
                          <div className="flex items-center space-x-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-xl shadow-lg`}>
                              📚
                            </div>
                            <div className="flex-1"><h4 className="font-bold text-white text-lg">{subject.nome}</h4></div>
                            <ChevronRight size={20} className="text-white/60" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};
export default Subjects;
