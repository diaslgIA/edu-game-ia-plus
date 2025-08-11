
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, BookOpen, Trophy } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
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
  const navigate = useNavigate();
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
    <MobileContainer background="gradient">
      <div className="p-4 space-y-6 pb-20">
        <div className="text-center pt-6">
          <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">📚 Exercícios & Simulados</h1>
          <p className="text-white/90 text-base drop-shadow leading-relaxed">Pratique com exercícios específicos ou faça simulados completos</p>
        </div>

        {/* ENEM Simulation Section */}
        <Card className="bg-white/98 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl text-green-800 font-bold">
              <Trophy className="text-green-600" size={28} />
              🎯 Simulado ENEM
            </CardTitle>
            <p className="text-green-700 text-base font-medium mt-2">Questões de todas as matérias para preparação completa</p>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <div className="grid grid-cols-3 gap-4">
              {getQuestionCountForEnem().map((count) => (
                <Button
                  key={count}
                  onClick={() => {
                    setSelectedQuestionCount(count);
                    setShowSimulationModal(true);
                    setSelectedSubject('todas');
                  }}
                  className="h-16 text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {count} questões
                </Button>
              ))}
            </div>
            <div className="text-center bg-green-50 p-4 rounded-xl border border-green-200">
              <p className="text-green-700 text-sm font-semibold">
                ⏱️ Tempo: 3 min/questão • 🎯 Multidisciplinar • 🏆 Formato ENEM
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subject-specific exercises */}
        <div className="grid gap-6">
          {subjects.map((subject) => {
            const questionCounts = getAvailableQuestionCounts(subject.name);
            
            return (
              <Card key={subject.name} className="bg-white/98 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-3xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-gray-800 font-bold">{subject.displayName}</CardTitle>
                      <p className="text-gray-600 text-sm font-medium">Exercícios específicos da matéria</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="flex gap-3">
                    {questionCounts.map((count) => (
                      <Button
                        key={count}
                        onClick={() => handleStartQuiz(subject.name, count)}
                        variant="outline"
                        className="flex-1 h-12 text-base font-semibold hover:bg-blue-50 hover:border-blue-400 border-2 transition-all duration-200 hover:shadow-md"
                      >
                        {count} questões
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium">📊 Questões por matéria</span>
                    <span className="font-medium">⏱️ 2 min/questão</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Simulation Modal */}
        <Dialog open={showSimulationModal} onOpenChange={setShowSimulationModal}>
          <DialogContent className="w-[95%] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl text-center font-bold">
                {selectedSubject === 'todas' ? '🎯 Simulado ENEM' : `📚 Simulado - ${subjects.find(s => s.name === selectedSubject)?.displayName}`}
              </DialogTitle>
              <DialogDescription className="text-center text-base font-medium">
                {selectedSubject === 'todas' 
                  ? `${selectedQuestionCount} questões multidisciplinares` 
                  : `${selectedQuestionCount} questões de ${subjects.find(s => s.name === selectedSubject)?.displayName}`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-4 text-base">⏱️ Duração do Simulado</h4>
                <div className="grid grid-cols-1 gap-4">
                  {selectedSubject === 'todas' ? (
                    [
                      { questions: 10, duration: 30 },
                      { questions: 20, duration: 60 },
                      { questions: 30, duration: 90 }
                    ].filter(option => option.questions === selectedQuestionCount).map((option) => (
                      <div key={option.duration} className="text-center bg-white p-4 rounded-lg border border-blue-300 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{option.duration} min</div>
                        <div className="text-blue-700 text-sm font-medium">{option.questions} questões</div>
                      </div>
                    ))
                  ) : (
                    [
                      { questions: 10, duration: 20 },
                      { questions: 20, duration: 40 },
                      { questions: 30, duration: 60 }
                    ].filter(option => option.questions === selectedQuestionCount).map((option) => (
                      <div key={option.duration} className="text-center bg-white p-4 rounded-lg border border-blue-300 shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{option.duration} min</div>
                        <div className="text-blue-700 text-sm font-medium">{option.questions} questões</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 text-base">📋 Informações do Simulado</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <BookOpen size={16} className="text-blue-600" />
                    <span className="font-medium">{selectedQuestionCount} questões</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <Trophy size={16} className="text-green-600" />
                    <span className="font-medium">10 pontos por acerto</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <Clock size={16} className="text-orange-600" />
                    <span className="font-medium">Tempo limitado</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                    <CheckCircle size={16} className="text-purple-600" />
                    <span className="font-medium">Resultado imediato</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-4">
              <Button variant="outline" onClick={() => setShowSimulationModal(false)} className="flex-1 h-12 text-base font-medium">
                Cancelar
              </Button>
              <Button 
                onClick={startSimulation} 
                className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Clock className="mr-2" size={18} />
                Iniciar Simulado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* SimulatedExam Component */}
        {showExam && (
          <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 z-50 overflow-auto">
            <SimulatedExam
              subject={selectedSubject}
              duration={getSimulationDuration()}
              questionCount={selectedQuestionCount}
              isEnemMode={selectedSubject === 'todas'}
              onComplete={handleExamComplete}
            />
          </div>
        )}
      </div>
    </MobileContainer>
  );
};

export default Exercises;
