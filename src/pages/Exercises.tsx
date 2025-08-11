
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Trophy, Brain, Target } from 'lucide-react';
import SimulatedExam from '@/components/SimulatedExam';
import MobileContainer from '@/components/MobileContainer';
import { getSubjectLogo, getSubjectEmoji, getSubjectStyle, getSubjectDisplayName } from '@/data/subjectLogos';

const Exercises = () => {
  const [selectedExam, setSelectedExam] = useState<{
    subject: string;
    duration: number;
    questionCount: number;
    isEnemMode: boolean;
  } | null>(null);

  const subjects = [
    'matematica',
    'portugues', 
    'historia',
    'geografia',
    'fisica',
    'quimica',
    'biologia',
    'filosofia',
    'sociologia',
    'ingles',
    'espanhol',
    'literatura'
  ];

  const startExam = (subject: string, duration: number, questionCount: number = 10, isEnemMode: boolean = false) => {
    setSelectedExam({ subject, duration, questionCount, isEnemMode });
  };

  const handleExamComplete = (score: number, timeSpent: number) => {
    setSelectedExam(null);
  };

  if (selectedExam) {
    return (
      <SimulatedExam
        subject={selectedExam.subject}
        duration={selectedExam.duration}
        questionCount={selectedExam.questionCount}
        isEnemMode={selectedExam.isEnemMode}
        onComplete={handleExamComplete}
      />
    );
  }

  return (
    <MobileContainer>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <Target className="text-white" size={32} />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Exercícios & Simulados
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Teste seus conhecimentos com simulados específicos por matéria ou desafie-se com o ENEM completo!
            </p>
          </div>

          {/* ENEM Section */}
          <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <Trophy className="text-yellow-200" size={32} />
                🏆 Simulado ENEM
              </CardTitle>
              <p className="text-yellow-100">Teste completo multidisciplinar</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <p className="text-gray-700 text-lg font-medium">
                  Prepare-se para o ENEM com questões de todas as matérias!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { count: 10, duration: 30, label: 'Rápido' },
                    { count: 20, duration: 60, label: 'Médio' },
                    { count: 30, duration: 90, label: 'Completo' }
                  ].map((option) => (
                    <Button
                      key={option.count}
                      onClick={() => startExam('enem', option.duration, option.count, true)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-6 h-auto flex flex-col gap-2 shadow-lg"
                    >
                      <div className="text-lg font-bold">{option.count} questões</div>
                      <div className="text-sm flex items-center gap-1">
                        <Clock size={14} />
                        {option.duration} min • {option.label}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Specific Exams */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulados por Matéria</h2>
              <p className="text-gray-600">Foque em uma disciplina específica com 10 questões</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => {
                const logoUrl = getSubjectLogo(subject);
                const emoji = getSubjectEmoji(subject);
                const style = getSubjectStyle(subject);
                const displayName = getSubjectDisplayName(subject);

                return (
                  <Card key={subject} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 bg-white">
                    <CardHeader className="text-center pb-4">
                      <div className="flex flex-col items-center gap-3">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                          style={{ backgroundColor: style.backgroundColor }}
                        >
                          {logoUrl ? (
                            <img 
                              src={logoUrl} 
                              alt={`${displayName} mentor`}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl">{emoji}</span>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-800">{displayName}</CardTitle>
                          <p className="text-sm text-gray-500 mt-1">10 questões específicas</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Brain size={14} />
                              Questões
                            </span>
                            <span className="font-semibold">10</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              Duração
                            </span>
                            <span className="font-semibold">25 min</span>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => startExam(subject, 25, 10)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          <Play className="mr-2" size={16} />
                          Iniciar Simulado
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Exercises;
