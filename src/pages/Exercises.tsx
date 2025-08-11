import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, BookOpen, Trophy } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { MobileContainer } from '@/components/MobileContainer';
import SimulatedExam from '@/components/SimulatedExam';

const subjects = [
  { name: 'portugues', displayName: 'Português', icon: '🇵🇹' },
  { name: 'matematica', displayName: 'Matemática', icon: '➕' },
  { name: 'historia', displayName: 'História', icon: '🏛️' },
  { name: 'geografia', displayName: 'Geografia', icon: '🌍' },
  { name: 'fisica', displayName: 'Física', icon: '⚛️' },
  { name: 'quimica', displayName: 'Química', icon: '🧪' },
  { name: 'biologia', displayName: 'Biologia', icon: '🧬' },
   { name: 'filosofia', displayName: 'Filosofia', icon: '🤔' },
  { name: 'sociologia', displayName: 'Sociologia', icon: '🧑‍🤝‍🧑' },
  { name: 'ingles', displayName: 'Inglês', icon: '🇬🇧' },
];

const Exercises = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [showSimulationModal, setShowSimulationModal] = useState<boolean>(false);
  const [showExam, setShowExam] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [examTimeSpent, setExamTimeSpent] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (examScore > 0) {
      toast({
        title: "Simulado Concluído!",
        description: `Você obteve ${examScore} pontos em ${examTimeSpent} segundos.`,
      })
    }
  }, [examScore, examTimeSpent, toast]);

  const getAvailableQuestionCounts = (subject: string) => {
    // Always return the standard options for better UX
    return [10, 20, 30];
  };

  const getQuestionCountForEnem = () => {
    // Fixed options for ENEM simulation
    return [10, 20, 30];
  };

  const handleStartQuiz = (subject: string, count: number) => {
    setSelectedSubject(subject);
    setSelectedQuestionCount(count);
    setShowSimulationModal(true);
  };

  const startSimulation = () => {
    setShowSimulationModal(false);
    setShowExam(true);
  };

  const getSimulationDuration = () => {
    if (selectedSubject === 'todas') {
      // ENEM simulation
      switch (selectedQuestionCount) {
        case 10: return 30; // 30 minutes
        case 20: return 60; // 60 minutes
        case 30: return 90; // 90 minutes
        default: return 30;
      }
    } else {
      // Subject-specific simulation
      switch (selectedQuestionCount) {
        case 10: return 20; // 20 minutes
        case 20: return 40; // 40 minutes
        case 30: return 60; // 60 minutes
        default: return 20;
      }
    }
  };

  const handleExamComplete = (score: number, timeSpent: number) => {
    setExamScore(score);
    setExamTimeSpent(timeSpent);
    setShowExam(false);
  };

  return (
    <MobileContainer>
      <div className="p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">📚 Exercícios & Simulados</h1>
          <p className="text-gray-600">Pratique com exercícios específicos ou faça simulados completos</p>
        </div>

        {/* ENEM Simulation Section */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl text-green-800">
              <Trophy className="text-green-600" size={28} />
              🎯 Simulado ENEM
            </CardTitle>
            <p className="text-green-700 text-lg">Questões de todas as matérias para preparação completa</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {getQuestionCountForEnem().map((count) => (
                <Button
                  key={count}
                  onClick={() => {
                    setSelectedQuestionCount(count);
                    setShowSimulationModal(true);
                    setSelectedSubject('todas');
                  }}
                  className="h-16 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  {count} questões
                </Button>
              ))}
            </div>
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">
                ⏱️ Tempo: 3 minutos por questão • 🎯 Multidisciplinar
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subject-specific exercises */}
        <div className="grid gap-6">
          {subjects.map((subject) => {
            const questionCounts = getAvailableQuestionCounts(subject.name);
            
            return (
              <Card key={subject.name} className="hover:shadow-lg transition-all duration-200 border-gray-200">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-4xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-gray-800">{subject.displayName}</CardTitle>
                      <p className="text-gray-600 text-sm">Exercícios específicos da matéria</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    {questionCounts.map((count) => (
                      <Button
                        key={count}
                        onClick={() => handleStartQuiz(subject.name, count)}
                        variant="outline"
                        className="flex-1 h-12 text-base font-medium hover:bg-blue-50 hover:border-blue-300"
                      >
                        {count} questões
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>📊 Questões por matéria</span>
                    <span>⏱️ 2 min/questão</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Simulation Modal */}
        <Dialog open={showSimulationModal} onOpenChange={setShowSimulationModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">
                {selectedSubject === 'todas' ? '🎯 Simulado ENEM' : `📚 Simulado - ${subjects.find(s => s.name === selectedSubject)?.displayName}`}
              </DialogTitle>
              <DialogDescription className="text-center text-lg">
                {selectedSubject === 'todas' 
                  ? `${selectedQuestionCount} questões multidisciplinares` 
                  : `${selectedQuestionCount} questões de ${subjects.find(s => s.name === selectedSubject)?.displayName}`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">⏱️ Duração do Simulado</h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedSubject === 'todas' ? (
                    [
                      { questions: 10, duration: 30 },
                      { questions: 20, duration: 60 },
                      { questions: 30, duration: 90 }
                    ].filter(option => option.questions === selectedQuestionCount).map((option) => (
                      <div key={option.duration} className="text-center bg-white p-4 rounded-lg border border-blue-300">
                        <div className="text-2xl font-bold text-blue-600">{option.duration} min</div>
                        <div className="text-blue-700 text-sm">{option.questions} questões</div>
                      </div>
                    ))
                  ) : (
                    [
                      { questions: 10, duration: 20 },
                      { questions: 20, duration: 40 },
                      { questions: 30, duration: 60 }
                    ].filter(option => option.questions === selectedQuestionCount).map((option) => (
                      <div key={option.duration} className="text-center bg-white p-4 rounded-lg border border-blue-300">
                        <div className="text-2xl font-bold text-blue-600">{option.duration} min</div>
                        <div className="text-blue-700 text-sm">{option.questions} questões</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 text-lg">📋 Informações do Simulado</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-blue-600" />
                    <span>{selectedQuestionCount} questões</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-green-600" />
                    <span>10 pontos por acerto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-orange-600" />
                    <span>Tempo limitado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-purple-600" />
                    <span>Resultado imediato</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-4">
              <Button variant="outline" onClick={() => setShowSimulationModal(false)} className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={startSimulation} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Clock className="mr-2" size={18} />
                Iniciar Simulado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* SimulatedExam Component */}
        {showExam && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <div className="min-h-screen py-8">
              <SimulatedExam
                subject={selectedSubject}
                duration={getSimulationDuration()}
                questionCount={selectedQuestionCount}
                isEnemMode={selectedSubject === 'todas'}
                onComplete={handleExamComplete}
              />
            </div>
          </div>
        )}
      </div>
    </MobileContainer>
  );
};

export default Exercises;
