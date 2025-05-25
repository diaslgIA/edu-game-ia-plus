
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText } from 'lucide-react';

const Exercises = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      name: 'Português',
      topics: [
        'Figuras de Linguagem',
        'Interpretação de Textos',
        'Gêneros Textuais',
        'Funções da Linguagem',
        'Gramática',
        'Coesão e Coerência Textual'
      ],
      color: 'from-pink-400 to-purple-500',
      bgColor: 'bg-pink-100'
    },
    {
      name: 'Matemática',
      topics: [
        'Álgebra',
        'Análise Combinatória'
      ],
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center space-x-2">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
              START
            </span>
            <h1 className="text-lg font-semibold">Exercícios</h1>
            <FileText size={20} />
          </div>
        </div>

        {/* Subjects */}
        <div className="p-6 space-y-6">
          {subjects.map((subject, subjectIndex) => (
            <div key={subjectIndex}>
              {/* Subject header */}
              <div className={`bg-gradient-to-r ${subject.color} text-white p-4 rounded-t-2xl`}>
                <h2 className="font-bold text-lg">{subject.name}</h2>
                <p className="text-sm opacity-90">Selecione o assunto que deseja praticar</p>
              </div>

              {/* Topics */}
              <div className="bg-white rounded-b-2xl shadow-sm">
                {subject.topics.map((topic, topicIndex) => (
                  <Button
                    key={topicIndex}
                    className="w-full bg-gradient-to-r from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300 text-gray-800 font-medium py-4 px-6 justify-start border-b border-pink-100 last:border-b-0 first:rounded-t-none last:rounded-b-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">👆</span>
                      <span>{topic}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
