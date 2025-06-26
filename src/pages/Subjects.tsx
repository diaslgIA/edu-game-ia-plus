
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, Target, Clock, Star, ChevronRight } from 'lucide-react';

const Subjects = () => {
  const navigate = useNavigate();
  const { getSubjectProgress } = useUserProgress();
  const { t } = useLanguage();
  const { playSound, isMuted } = useSound();
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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

  // Conteúdos para cada matéria
  const subjectContents = {
    'portugues': [
      { title: 'Interpretação de Texto', description: 'Técnicas de leitura e compreensão', type: 'content' },
      { title: 'Gramática', description: 'Sintaxe, morfologia e semântica', type: 'content' },
      { title: 'Literatura Brasileira', description: 'Escolas literárias e autores', type: 'content' },
      { title: 'Quiz de Português', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'matematica': [
      { title: 'Álgebra', description: 'Equações e funções', type: 'content' },
      { title: 'Geometria', description: 'Figuras planas e espaciais', type: 'content' },
      { title: 'Estatística', description: 'Análise de dados e probabilidade', type: 'content' },
      { title: 'Quiz de Matemática', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'fisica': [
      { title: 'Mecânica', description: 'Cinemática e dinâmica', type: 'content' },
      { title: 'Eletromagnetismo', description: 'Eletricidade e magnetismo', type: 'content' },
      { title: 'Ondas e Óptica', description: 'Propagação e fenômenos', type: 'content' },
      { title: 'Quiz de Física', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'quimica': [
      { title: 'Química Geral', description: 'Estrutura atômica e ligações', type: 'content' },
      { title: 'Química Orgânica', description: 'Compostos de carbono', type: 'content' },
      { title: 'Físico-Química', description: 'Termoquímica e cinética', type: 'content' },
      { title: 'Quiz de Química', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'biologia': [
      { title: 'Citologia', description: 'Estrutura e função celular', type: 'content' },
      { title: 'Genética', description: 'Hereditariedade e evolução', type: 'content' },
      { title: 'Ecologia', description: 'Meio ambiente e sustentabilidade', type: 'content' },
      { title: 'Quiz de Biologia', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'historia': [
      { title: 'História do Brasil', description: 'Colônia, Império e República', type: 'content' },
      { title: 'História Geral', description: 'Antiguidade aos tempos modernos', type: 'content' },
      { title: 'História Contemporânea', description: 'Século XX e XXI', type: 'content' },
      { title: 'Quiz de História', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'geografia': [
      { title: 'Geografia Física', description: 'Relevo, clima e hidrografia', type: 'content' },
      { title: 'Geografia Humana', description: 'População e urbanização', type: 'content' },
      { title: 'Geopolítica', description: 'Relações internacionais', type: 'content' },
      { title: 'Quiz de Geografia', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'filosofia': [
      { title: 'Filosofia Antiga', description: 'Pensadores gregos e romanos', type: 'content' },
      { title: 'Filosofia Moderna', description: 'Renascimento ao Iluminismo', type: 'content' },
      { title: 'Ética e Política', description: 'Moral e organização social', type: 'content' },
      { title: 'Quiz de Filosofia', description: 'Teste seus conhecimentos', type: 'quiz' }
    ],
    'sociologia': [
      { title: 'Teorias Sociológicas', description: 'Durkheim, Weber e Marx', type: 'content' },
      { title: 'Estrutura Social', description: 'Classes e estratificação', type: 'content' },
      { title: 'Movimentos Sociais', description: 'Cidadania e participação', type: 'content' },
      { title: 'Quiz de Sociologia', description: 'Teste seus conhecimentos', type: 'quiz' }
    ]
  };

  const handleContentClick = (subject: string, content: any) => {
    if (content.type === 'quiz') {
      handleNavigation(`/exercises?subject=${encodeURIComponent(subject)}`);
    } else {
      handleNavigation(`/exercises?subject=${encodeURIComponent(subject)}`);
    }
  };

  if (selectedSubject) {
    const contents = subjectContents[selectedSubject as keyof typeof subjectContents] || [];
    
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          {/* Header */}
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedSubject(null)}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">{selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)}</h1>
          </div>

          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {contents.map((content, index) => (
              <div
                key={index}
                onClick={() => handleContentClick(selectedSubject, content)}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${content.type === 'quiz' ? 'bg-yellow-500' : 'bg-blue-500'} flex items-center justify-center text-white shadow-lg`}>
                    {content.type === 'quiz' ? <Target size={20} /> : <BookOpen size={20} />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{content.title}</h3>
                    <p className="text-white/80 text-sm">{content.description}</p>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-lg text-white ${
                        content.type === 'quiz' ? 'bg-yellow-500/30' : 'bg-blue-500/30'
                      }`}>
                        {content.type === 'quiz' ? 'Quiz' : 'Conteúdo'}
                      </span>
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
                      <p className="text-white/80 text-sm mb-2">{subject.topics} tópicos disponíveis</p>
                      
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
