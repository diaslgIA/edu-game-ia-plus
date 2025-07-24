import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Star, ChevronRight } from 'lucide-react';
import { getAllMentors, Mentor } from '@/data/subjectMentors';

const Subjects = () => {
  const navigate = useNavigate();
  const { getSubjectProgress } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  const subjectToAreaMap: { [key: string]: string } = {
    'Português': 'linguagens',
    'Inglês': 'linguagens',
    'Espanhol': 'linguagens',
    'Literatura': 'linguagens',
    'Redação': 'linguagens',
    'Matemática': 'matematica',
    'Física': 'natureza',
    'Química': 'natureza',
    'Biologia': 'natureza',
    'História': 'humanas',
    'Geografia': 'humanas',
    'Filosofia': 'humanas',
    'Sociologia': 'humanas'
  };

  const areaDetails = {
    linguagens: { name: 'Linguagens e Códigos', icon: '📝', color: 'from-blue-500 to-blue-700' },
    matematica: { name: 'Matemática', icon: '📐', color: 'from-purple-500 to-purple-700' },
    natureza: { name: 'Ciências da Natureza', icon: '🔬', color: 'from-green-500 to-green-700' },
    humanas: { name: 'Ciências Humanas', icon: '🌍', color: 'from-orange-500 to-orange-700' }
  };

  const allMentors = getAllMentors();

  // ==================================================================
  // CORREÇÃO APLICADA AQUI
  // Adicionamos uma verificação para garantir que 'allMentors' é um array antes de usar '.filter()'
  // ==================================================================
  const knowledgeAreas = Object.keys(areaDetails).map(areaKey => {
    const areaInfo = areaDetails[areaKey as keyof typeof areaDetails];
    return {
      id: areaKey,
      name: areaInfo.name,
      icon: areaInfo.icon,
      color: areaInfo.color,
      subjects: Array.isArray(allMentors) ? allMentors.filter(mentor => subjectToAreaMap[mentor.subject] === areaKey) : [] // AQUI ESTÁ A MUDANÇA
    };
  }).filter(area => area.subjects.length > 0);

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
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Áreas do Conhecimento</h2>
            <div className="grid grid-cols-1 gap-4">
              {knowledgeAreas.map((area, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-white text-md font-medium flex items-center space-x-2">
                    <span className="text-xl">{area.icon}</span>
                    <span>{area.name}</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {area.subjects.map((subject, subIndex) => {
                      const subjectProgress = getSubjectProgress(subject.subject);
                      
                      return (
                        <div
                          key={subIndex}
                          onClick={() => handleNavigation(`/subjects/${subject.id}`)}
                          className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-xl shadow-lg`}>
                              {subject.avatar}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-bold text-white text-lg mb-1">{subject.subject}</h4>
                              <p className="text-white/80 text-sm mb-2">{subject.description.substring(0, 40)}...</p>
                              
                              <div className="flex items-center space-x-4 text-xs">
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} className="text-green-400" />
                                  <span className="text-white/80">Nível Médio</span>
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
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subjects;
