
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Trophy, Clock, Star } from 'lucide-react';

const Exercises = () => {
  const navigate = useNavigate();
  const { updateProgress } = useUserProgress();
  const { t } = useLanguage();

  const subjects = useMemo(() => [
    { id: 'matematica', name: 'Matemática', description: 'Números, álgebra e geometria', color: 'from-blue-500 to-blue-700', icon: '📐', difficulty: 'Médio', exercises: 45 },
    { id: 'portugues', name: 'Português', description: 'Gramática, literatura e redação', color: 'from-green-500 to-green-700', icon: '📚', difficulty: 'Fácil', exercises: 52 },
    { id: 'fisica', name: 'Física', description: 'Mecânica, termodinâmica e óptica', color: 'from-purple-500 to-purple-700', icon: '⚡', difficulty: 'Difícil', exercises: 38 },
    { id: 'quimica', name: 'Química', description: 'Átomos, moléculas e reações', color: 'from-orange-500 to-orange-700', icon: '🧪', difficulty: 'Médio', exercises: 41 },
    { id: 'biologia', name: 'Biologia', description: 'Células, genética e evolução', color: 'from-teal-500 to-teal-700', icon: '🧬', difficulty: 'Médio', exercises: 47 },
    { id: 'historia', name: 'História', description: 'Civilizações e eventos históricos', color: 'from-amber-500 to-amber-700', icon: '🏛️', difficulty: 'Fácil', exercises: 36 },
    { id: 'geografia', name: 'Geografia', description: 'Países, capitais e relevo', color: 'from-emerald-500 to-emerald-700', icon: '🌍', difficulty: 'Fácil', exercises: 33 },
    { id: 'filosofia', name: 'Filosofia', description: 'Pensamento crítico e ética', color: 'from-indigo-500 to-indigo-700', icon: '🤔', difficulty: 'Médio', exercises: 24 },
    { id: 'sociologia', name: 'Sociologia', description: 'Sociedade e comportamento', color: 'from-pink-500 to-pink-700', icon: '👥', difficulty: 'Fácil', exercises: 28 }
  ], []);

  const activities = useMemo(() => [
    { id: 'quiz', name: 'Quiz Interativo', icon: Trophy, color: 'bg-yellow-500', description: 'Teste seus conhecimentos' }
  ], []);

  const handleSubjectSelect = (subjectName: string) => {
    // Placeholder for future implementation
    console.log('Subject selected:', subjectName);
  };

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
            <span>Exercícios</span>
            <Target size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-3">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white/15 backdrop-blur-md rounded-xl p-3 text-center shadow-lg">
                <activity.icon className="w-6 h-6 text-white mx-auto mb-1" />
                <p className="text-white text-xs font-medium">{activity.name}</p>
                <p className="text-white/80 text-xs">{activity.description}</p>
              </div>
            ))}
          </div>

          {/* Subjects Grid */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Selecione uma Matéria</h2>
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  onClick={() => handleSubjectSelect(subject.name)}
                  className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {subject.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{subject.name}</h3>
                      <p className="text-white/80 text-sm mb-2">{subject.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <Target size={12} className="text-blue-400" />
                          <span className="text-white/80">{subject.exercises} exercícios</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={12} className="text-green-400" />
                          <span className="text-white/80">{subject.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-400" />
                          <span className="text-white/80">0%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-white/60 text-2xl">
                      →
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

export default Exercises;
