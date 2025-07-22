
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubjects } from '@/hooks/useContentLoader';

const Subjects = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: subjects, isLoading, isError, error } = useSubjects();

  const handleSubjectClick = (subjectName: string) => {
    // Encode para lidar com acentos e caracteres especiais
    const encodedName = encodeURIComponent(subjectName);
    navigate(`/subjects/${encodedName}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl bg-white/20" />
      ));
    }
    
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-white/80 h-64">
          <BookOpen size={48} className="mb-4 opacity-50" />
          <h2 className="text-lg font-semibold">Erro ao carregar matérias</h2>
          <p className="text-sm mt-2">{error?.message}</p>
        </div>
      );
    }
    
    if (!subjects || subjects.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-white/80 h-64">
          <BookOpen size={48} className="mb-4 opacity-50" />
          <h2 className="text-lg font-semibold">Nenhuma matéria encontrada</h2>
          <p className="text-sm mt-2">As matérias estão sendo carregadas. Tente novamente em instantes.</p>
        </div>
      );
    }

    return subjects.map((subject) => (
      <div 
        key={subject.id} 
        onClick={() => handleSubjectClick(subject.name)}
        className="bg-white/15 backdrop-blur-md rounded-xl p-4 cursor-pointer hover:bg-white/25 transition-all flex items-center justify-between"
      >
        <div className="flex-1">
          <h3 className="font-semibold text-white text-lg">{subject.name}</h3>
          {subject.description && (
            <p className="text-white/70 text-sm mt-1">{subject.description}</p>
          )}
        </div>
        <ChevronRight size={20} className="text-white/60" />
      </div>
    ));
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 rounded-b-3xl shadow-xl">
          <h1 className="text-2xl font-bold">Matérias</h1>
          <p className="text-white/80 text-sm">Escolha uma matéria para começar a estudar</p>
        </div>
        
        <div className="p-6 space-y-3 flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subjects;
