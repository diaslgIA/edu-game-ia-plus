
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectContent from '@/components/SubjectContent';
import HistoryThemes from '@/components/HistoryThemes';
import HistoryTopics from '@/components/HistoryTopics';
import TopicContent from '@/components/TopicContent';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Star, ChevronRight } from 'lucide-react';

const Subjects = () => {
  const navigate = useNavigate();
  const { getSubjectProgress } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [historyTheme, setHistoryTheme] = useState<string | null>(null);
  const [historyTopic, setHistoryTopic] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    if (!isMuted) playSound('click');
    navigate(path);
  };

  // Áreas do conhecimento com suas respectivas matérias
  const knowledgeAreas = [
    {
      id: 'linguagens',
      name: 'Linguagens e Códigos',
      icon: '📝',
      color: 'from-blue-500 to-blue-700',
      subjects: [
        { id: 'portugues', name: 'Português', icon: '📚', difficulty: 'Fácil', topics: 42 },
        { id: 'ingles', name: 'Inglês', icon: '🌎', difficulty: 'Médio', topics: 28 },
        { id: 'espanhol', name: 'Espanhol', icon: '🇪🇸', difficulty: 'Médio', topics: 24 },
        { id: 'literatura', name: 'Literatura', icon: '📖', difficulty: 'Médio', topics: 36 },
        { id: 'redacao', name: 'Redação', icon: '✍️', difficulty: 'Difícil', topics: 20 }
      ]
    },
    {
      id: 'matematica',
      name: 'Matemática',
      icon: '📐',
      color: 'from-purple-500 to-purple-700',
      subjects: [
        { id: 'matematica', name: 'Matemática', icon: '🔢', difficulty: 'Médio', topics: 48 }
      ]
    },
    {
      id: 'natureza',
      name: 'Ciências da Natureza',
      icon: '🔬',
      color: 'from-green-500 to-green-700',
      subjects: [
        { id: 'fisica', name: 'Física', icon: '⚡', difficulty: 'Difícil', topics: 38 },
        { id: 'quimica', name: 'Química', icon: '🧪', difficulty: 'Médio', topics: 41 },
        { id: 'biologia', name: 'Biologia', icon: '🧬', difficulty: 'Médio', topics: 47 }
      ]
    },
    {
      id: 'humanas',
      name: 'Ciências Humanas',
      icon: '🌍',
      color: 'from-orange-500 to-orange-700',
      subjects: [
        { id: 'historia', name: 'História', icon: '🏛️', difficulty: 'Fácil', topics: 36 },
        { id: 'geografia', name: 'Geografia', icon: '🌍', difficulty: 'Fácil', topics: 33 },
        { id: 'filosofia', name: 'Filosofia', icon: '🤔', difficulty: 'Médio', topics: 24 },
        { id: 'sociologia', name: 'Sociologia', icon: '👥', difficulty: 'Fácil', topics: 28 }
      ]
    }
  ];

  // Navegação hierárquica para História
  if (historyTopic) {
    return (
      <MobileContainer background="gradient">
        <TopicContent 
          topic={historyTopic}
          onBack={() => setHistoryTopic(null)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (historyTheme) {
    return (
      <MobileContainer background="gradient">
        <HistoryTopics 
          theme={historyTheme}
          onBack={() => setHistoryTheme(null)}
          onSelectTopic={(topic) => setHistoryTopic(topic)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  // Para História, mostrar grandes temas
  if (selectedSubject === 'historia') {
    return (
      <MobileContainer background="gradient">
        <HistoryThemes 
          onBack={() => setSelectedSubject(null)}
          onSelectTheme={(theme) => setHistoryTheme(theme)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  // Para outras matérias, manter comportamento original
  if (selectedSubject) {
    return (
      <MobileContainer background="gradient">
        <SubjectContent 
          subject={selectedSubject}
          onBack={() => setSelectedSubject(null)}
        />
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (selectedArea) {
    const area = knowledgeAreas.find(area => area.id === selectedArea);
    
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          {/* Header */}
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedArea(null)}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">{area?.name}</h1>
          </div>

          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {area?.subjects.map((subject, index) => {
              const subjectProgress = getSubjectProgress(subject.name);
              
              return (
                <div
                  key={index}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {subject.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{subject.name}</h3>
                      <p className="text-white/80 text-sm mb-2">Conteúdos e quizzes disponíveis</p>
                      
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Clock size={12} className="text-green-400" />
                          <span className="text-white/80">{subject.difficulty}</span>
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
        <BottomNavigation />
      </MobileContainer>
    );
  }

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
                <div
                  key={index}
                  onClick={() => setSelectedArea(area.id)}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {area.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{area.name}</h3>
                      <p className="text-white/80 text-sm mb-2">{area.subjects.length} matérias disponíveis</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {area.subjects.slice(0, 3).map((subject, idx) => (
                          <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                            {subject.name}
                          </span>
                        ))}
                        {area.subjects.length > 3 && (
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                            +{area.subjects.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-white/60 text-2xl">
                      <ChevronRight size={20} />
                    </div>
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
