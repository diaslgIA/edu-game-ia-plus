
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import EnglishGuide from './guides/EnglishGuide';
import SpanishGuide from './guides/SpanishGuide';
import LiteratureGuide from './guides/LiteratureGuide';
import MathGuide from './guides/MathGuide';
import GeographyGuide from './guides/GeographyGuide';
import PhilosophyGuide from './guides/PhilosophyGuide';
import SociologyGuide from './guides/SociologyGuide';

const StudyGuide: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subjects = [
    { id: 'ingles', name: 'Inglês', component: EnglishGuide },
    { id: 'espanhol', name: 'Espanhol', component: SpanishGuide },
    { id: 'literatura', name: 'Literatura', component: LiteratureGuide },
    { id: 'matematica', name: 'Matemática', component: MathGuide },
    { id: 'geografia', name: 'Geografia', component: GeographyGuide },
    { id: 'filosofia', name: 'Filosofia', component: PhilosophyGuide },
    { id: 'sociologia', name: 'Sociologia', component: SociologyGuide }
  ];

  if (selectedSubject) {
    const subject = subjects.find(s => s.id === selectedSubject);
    const GuideComponent = subject?.component;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setSelectedSubject(null)}
            variant="ghost"
            className="mb-6 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2" size={20} />
            Voltar aos Guias
          </Button>
          {GuideComponent && <GuideComponent />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <BookOpen className="mx-auto mb-4" size={64} />
          <h1 className="text-4xl font-bold mb-4">Guias de Estudos ENEM</h1>
          <p className="text-xl text-white/80">
            Guias completos e didáticos para todas as matérias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className="bg-white/15 backdrop-blur-md rounded-2xl p-6 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
            >
              <div className="text-center">
                <BookOpen className="mx-auto mb-4 text-yellow-400" size={48} />
                <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                <p className="text-white/80 text-sm">
                  Guia completo com teoria e exercícios
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyGuide;
