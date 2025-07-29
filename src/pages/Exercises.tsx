
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import SubjectQuiz from '@/components/SubjectQuiz';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Trophy, Target, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { conteudoEducacional } from '@/data/conteudoLocal';

const Exercises = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  if (selectedSubject) {
    return (
      <MobileContainer>
        <SubjectQuiz 
          subject={selectedSubject} 
          onBack={() => setSelectedSubject(null)} 
        />
      </MobileContainer>
    );
  }

  const getSubjectIcon = (subject: string) => {
    const icons: Record<string, string> = {
      'Matemática': '📊',
      'Português': '📚',
      'Física': '⚡',
      'Química': '🧪',
      'Biologia': '🧬',
      'História': '📜',
      'Geografia': '🌍',
      'Filosofia': '🤔',
      'Sociologia': '👥',
    };
    return icons[subject] || '📖';
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Exercícios</h1>
            <div className="w-8" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={20} />
              <div>
                <span className="font-semibold">{profile?.points || 0}</span>
                <p className="text-xs opacity-80">XP Total</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Target className="text-green-400" size={20} />
              <div>
                <span className="font-semibold">Nível {profile?.level || 1}</span>
                <p className="text-xs opacity-80">Atual</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-400" size={20} />
              <div>
                <span className="font-semibold">Pronto!</span>
                <p className="text-xs opacity-80">Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 mx-4 mt-4 rounded">
          <div className="flex items-start space-x-2">
            <BookOpen className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800">Como funciona?</h3>
              <p className="text-sm text-blue-700 mt-1">
                Escolha uma matéria e responda 10 questões. Ganhe 10 XP para cada resposta correta!
              </p>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {conteudoEducacional.materias.map(materia => (
              <button
                key={materia.id}
                onClick={() => setSelectedSubject(materia.name)}
                className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-100 hover:border-purple-300 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="text-3xl mb-2">
                  {getSubjectIcon(materia.name)}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {materia.name}
                </h3>
                <p className="text-xs text-gray-600">
                  Quiz Interativo
                </p>
                <div className="mt-2 text-xs text-purple-600 font-medium">
                  10 questões • +100 XP
                </div>
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2">Suas Conquistas</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-700">{profile?.points || 0}</div>
                <div className="text-xs text-green-600">XP Total</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-700">{profile?.level || 1}</div>
                <div className="text-xs text-green-600">Nível</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-700">0</div>
                <div className="text-xs text-green-600">Conquistas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Exercises;
