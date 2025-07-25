
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

interface Subject {
  id: string;
  name: string;
  display_name: string;
  description?: string;
}

interface KnowledgeArea {
  id: string;
  name: string;
  icon: string;
  color: string;
  subjects: Subject[];
}

const Subjects = () => {
  const navigate = useNavigate();
  const { getSubjectProgress } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Get all subjects first
        const { data: subjectsData, error: subjectsError } = await supabase
          .from('subjects')
          .select('id, name, display_name, description')
          .order('name');

        if (subjectsError) {
          console.error('Error fetching subjects:', subjectsError);
          setLoading(false);
          return;
        }

        // Create knowledge areas manually with the subjects grouped by category
        const knowledgeAreasData: KnowledgeArea[] = [
          {
            id: '1',
            name: 'Linguagens e Códigos',
            icon: '📝',
            color: 'from-blue-500 to-blue-700',
            subjects: subjectsData?.filter(subject => 
              ['Português', 'Inglês', 'Espanhol', 'Literatura', 'Redação'].includes(subject.name)
            ) || []
          },
          {
            id: '2',
            name: 'Matemática',
            icon: '📐',
            color: 'from-purple-500 to-purple-700',
            subjects: subjectsData?.filter(subject => 
              subject.name === 'Matemática'
            ) || []
          },
          {
            id: '3',
            name: 'Ciências da Natureza',
            icon: '🔬',
            color: 'from-green-500 to-green-700',
            subjects: subjectsData?.filter(subject => 
              ['Física', 'Química', 'Biologia'].includes(subject.name)
            ) || []
          },
          {
            id: '4',
            name: 'Ciências Humanas',
            icon: '🌍',
            color: 'from-orange-500 to-orange-700',
            subjects: subjectsData?.filter(subject => 
              ['História', 'Geografia', 'Filosofia', 'Sociologia'].includes(subject.name)
            ) || []
          }
        ];

        // Filter out empty areas
        const filteredAreas = knowledgeAreasData.filter(area => area.subjects.length > 0);
        setKnowledgeAreas(filteredAreas);
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <div className="text-white text-center py-8">Carregando...</div>
          ) : (
            <div>
              <h2 className="text-white text-lg font-semibold mb-4">Áreas do Conhecimento</h2>
              <div className="grid grid-cols-1 gap-4">
                {knowledgeAreas.map((area) => (
                  <div key={area.id} className="space-y-3">
                    <h3 className="text-white text-md font-medium flex items-center space-x-2">
                      <span className="text-xl">{area.icon}</span>
                      <span>{area.name}</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {area.subjects.map((subject) => {
                        const subjectProgress = getSubjectProgress(subject.display_name || subject.name);
                        
                        return (
                          <div
                            key={subject.id}
                            onClick={() => handleNavigation(`/subjects/${subject.id}/topics`)}
                            className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-xl shadow-lg`}>
                                {area.icon}
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-bold text-white text-lg mb-1">{subject.display_name || subject.name}</h4>
                                <p className="text-white/80 text-sm mb-2">{subject.description || 'Grandes temas e conteúdos organizados'}</p>
                                
                                <div className="flex items-center space-x-4 text-xs">
                                  <div className="flex items-center space-x-1">
                                    <Clock size={12} className="text-green-400" />
                                    <span className="text-white/80">Médio</span>
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
