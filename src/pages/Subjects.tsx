
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import LessonMap from '@/components/LessonMap';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Flame, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGameification } from '@/hooks/useGameification';
import { conteudoEducacional } from '@/data/conteudoLocal';

const Subjects = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { streak, dailyGoals } = useGameification();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Group subjects by knowledge area
  const subjectsByArea: Record<string, string[]> = {};
  
  conteudoEducacional.materias.forEach(materia => {
    const area = materia.area_conhecimento;
    if (!subjectsByArea[area]) {
      subjectsByArea[area] = [];
    }
    subjectsByArea[area].push(materia.name);
  });

  if (selectedSubject) {
    return (
      <MobileContainer>
        <LessonMap 
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

  const getAreaColor = (area: string) => {
    const colors: Record<string, string> = {
      'Ciências da Natureza': 'bg-green-100 border-green-300',
      'Ciências Humanas': 'bg-blue-100 border-blue-300',
      'Linguagens': 'bg-purple-100 border-purple-300',
      'Matemática': 'bg-orange-100 border-orange-300',
    };
    return colors[area] || 'bg-gray-100 border-gray-300';
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-20">
        {/* Header with Gamification Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Matérias</h1>
            <div className="w-8" /> {/* Spacer */}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <div className="flex items-center space-x-2">
              <Flame className="text-orange-400" size={20} />
              <span className="font-semibold">{streak?.current_streak || 0}</span>
              <span className="text-sm opacity-80">dias</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={20} />
              <span className="font-semibold">{profile?.xp_points || profile?.points || 0} XP</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Target className="text-green-400" size={20} />
              <span className="font-semibold">Nível {profile?.global_level || profile?.level || 1}</span>
            </div>
          </div>

          {/* Daily Goals Progress */}
          {dailyGoals.length > 0 && (
            <div className="mt-3 space-y-2">
              {dailyGoals.map(goal => (
                <div key={goal.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Meta: {goal.goal_type === 'lessons' ? 'Lições' : goal.goal_type === 'xp' ? 'XP' : 'Tempo'}</span>
                    <span>{goal.current_value}/{goal.target_value}</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-1 mt-1">
                    <div
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((goal.current_value / goal.target_value) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject Areas */}
        <div className="flex-1 overflow-y-auto p-4">
          {Object.entries(subjectsByArea).map(([area, subjects]) => (
            <div key={area} className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {area}
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`${getAreaColor(area)} rounded-xl p-4 border-2 transition-all duration-200 hover:scale-105 hover:shadow-md`}
                  >
                    <div className="text-2xl mb-2">
                      {getSubjectIcon(subject)}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {subject}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {conteudoEducacional.conteudos.filter(c => c.subject_id === subject).length} lições
                    </p>
                  </button>
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

export default Subjects;
