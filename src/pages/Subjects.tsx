
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, ArrowRight } from 'lucide-react';

const Subjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      title: 'Ciências da Natureza e suas Tecnologias (Química, Física e Biologia)',
      icon: '🧪',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      title: 'Ciências Humanas e suas Tecnologias (História, Geografia, Sociologia e Filosofia)',
      icon: '🗺️',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Matemática e suas Tecnologias',
      icon: '➕',
      color: 'from-green-400 to-cyan-500'
    },
    {
      title: 'Redação',
      icon: '✍️',
      color: 'from-purple-500 to-orange-500'
    },
    {
      title: 'Linguagens e Códigos e suas Tecnologias (Português, Literatura, Língua Estrangeira, Artes, Educação Física e TIC)',
      icon: '📖',
      color: 'from-blue-500 to-pink-500'
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
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Matérias</span>
            <FileText size={20} />
          </h1>
        </div>

        {/* Selection instruction */}
        <div className="p-6">
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex items-center space-x-3">
            <span className="text-gray-800 font-medium">
              SELECIONE A MATÉRIA QUE DESEJA APRENDER
            </span>
            <span className="text-2xl">👉</span>
          </div>

          {/* Subjects grid */}
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <Button
                key={index}
                className={`w-full bg-gradient-to-r ${subject.color} text-white p-6 rounded-2xl text-left hover:scale-105 transition-all duration-200 shadow-lg min-h-[100px] flex items-center space-x-4`}
              >
                <div className="text-3xl">{subject.icon}</div>
                <span className="font-semibold text-sm leading-tight flex-1">
                  {subject.title}
                </span>
              </Button>
            ))}
          </div>

          {/* More content button */}
          <div className="mt-8">
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-between">
              <span>Acesse carrossel de conteúdos mais relevantes</span>
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subjects;
