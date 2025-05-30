
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, ArrowRight, Clock, Users, Trophy } from 'lucide-react';

const Subjects = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      title: 'Matemática e suas Tecnologias',
      icon: '🧮',
      color: 'from-blue-400 to-blue-600',
      topics: ['Álgebra', 'Geometria', 'Estatística', 'Funções', 'Trigonometria'],
      progress: 65,
      exercises: 45,
      time: '12h'
    },
    {
      title: 'Ciências da Natureza',
      icon: '🧪',
      color: 'from-green-400 to-green-600',
      topics: ['Física', 'Química', 'Biologia', 'Ecologia', 'Genética'],
      progress: 40,
      exercises: 38,
      time: '8h'
    },
    {
      title: 'Ciências Humanas',
      icon: '🗺️',
      color: 'from-purple-400 to-purple-600',
      topics: ['História', 'Geografia', 'Sociologia', 'Filosofia', 'Atualidades'],
      progress: 55,
      exercises: 42,
      time: '10h'
    },
    {
      title: 'Linguagens e Códigos',
      icon: '📖',
      color: 'from-pink-400 to-pink-600',
      topics: ['Português', 'Literatura', 'Inglês', 'Artes', 'Ed. Física'],
      progress: 70,
      exercises: 50,
      time: '15h'
    },
    {
      title: 'Redação',
      icon: '✍️',
      color: 'from-orange-400 to-orange-600',
      topics: ['Dissertação', 'Argumentação', 'Coesão', 'Coerência', 'Temas Atuais'],
      progress: 35,
      exercises: 25,
      time: '6h'
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size="sm" showText={false} />
            <div className="w-10" />
          </div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <FileText size={24} />
            <span>Matérias ENEM</span>
          </h1>
          <p className="text-white/80 text-sm mt-2">
            Escolha uma área de conhecimento para começar
          </p>
        </div>

        {/* Stats Overview */}
        <div className="px-6 py-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white">
            <h2 className="font-semibold mb-3">Seu Progresso Geral</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">55%</div>
                <div className="text-xs opacity-80">Concluído</div>
              </div>
              <div>
                <div className="text-2xl font-bold">200</div>
                <div className="text-xs opacity-80">Exercícios</div>
              </div>
              <div>
                <div className="text-2xl font-bold">51h</div>
                <div className="text-xs opacity-80">Estudadas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects list */}
        <div className="px-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${subject.color} rounded-2xl p-6 text-white shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{subject.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{subject.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm opacity-90">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{subject.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText size={14} />
                          <span>{subject.exercises}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate('/exercises')}
                    className="bg-white/20 hover:bg-white/30 text-white border-none p-2"
                    size="sm"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm opacity-90">Progresso</span>
                    <span className="text-sm font-bold">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <p className="text-sm opacity-90 mb-2">Principais tópicos:</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.slice(0, 3).map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="bg-white/20 px-2 py-1 rounded-lg text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {subject.topics.length > 3 && (
                      <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">
                        +{subject.topics.length - 3} mais
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Study Tips */}
          <div className="mt-6 mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <Trophy className="mr-2 text-yellow-400" size={20} />
                Dica de Estudo
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                Comece pelas matérias que você tem mais dificuldade. O EduGameIA 
                adapta o conteúdo ao seu ritmo de aprendizado para maximizar seus resultados!
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subjects;
