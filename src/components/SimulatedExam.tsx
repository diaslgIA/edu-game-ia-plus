
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, CheckCircle, XCircle, Trophy, BookOpen } from 'lucide-react';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { getAllSubjectsQuestions } from '@/utils/generateQuestionsFromContent';

interface SimulatedExamProps {
  subject: string;
  duration: number;
  questionCount?: number;
  onComplete: (score: number, timeSpent: number) => void;
  isEnemMode?: boolean;
}

const SimulatedExam: React.FC<SimulatedExamProps> = ({ 
  subject, 
  duration, 
  questionCount = 10, 
  onComplete,
  isEnemMode = false
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { saveQuizScore } = useQuizScore();
  const { playSound } = useSound();
  
  // Only load subject questions when NOT in ENEM mode
  const { questions: subjectQuestions, loading: subjectLoading } = useSubjectQuestions(isEnemMode ? '' : subject);

  // Stable function to load questions
  const loadQuestions = useCallback(async () => {
    if (selectedQuestions.length > 0) return; // Prevent reloading if already loaded
    
    setLoading(true);
    
    try {
      if (isEnemMode) {
        // ENEM mode - get questions from all subjects
        const questions = await getAllSubjectsQuestions(questionCount);
        const formattedQuestions = questions.map(q => ({
          question: q.question,
          options: Array.isArray(q.options) ? q.options : [
            q.options?.a || '',
            q.options?.b || '',
            q.options?.c || '',
            q.options?.d || ''
          ].filter(opt => opt.length > 0),
          correctAnswer: q.correct_answer,
          subject: q.subject || 'Multidisciplinar',
          explanation: q.explanation || '',
          topic: q.topic || ''
        }));
        setSelectedQuestions(formattedQuestions);
      } else {
        // Subject specific mode
        if (subjectQuestions.length > 0) {
          const availableCount = Math.min(questionCount, subjectQuestions.length);
          const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, availableCount);
          
          const formattedQuestions = selected.map(q => ({
            question: q.question,
            options: Array.isArray(q.options) ? q.options : [
              q.options?.a || '',
              q.options?.b || '',
              q.options?.c || '',
              q.options?.d || ''
            ].filter(opt => opt.length > 0),
            correctAnswer: q.correct_answer,
            subject: q.subject || subject,
            explanation: q.explanation || '',
            topic: q.topic || ''
          }));
          
          setSelectedQuestions(formattedQuestions);
        }
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }, [isEnemMode, questionCount, subject, subjectQuestions, selectedQuestions.length]);

  // Load questions when component mounts or dependencies change
  useEffect(() => {
    if (isEnemMode || (!subjectLoading && subjectQuestions.length > 0)) {
      loadQuestions();
    }
  }, [isEnemMode, subjectLoading, subjectQuestions.length, loadQuestions]);

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft, isFinished]);

  const startExam = () => {
    setIsStarted(true);
    playSound('click');
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    playSound('click');
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(current => current + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = async () => {
    setIsFinished(true);
    
    let finalScore = 0;
    selectedQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        finalScore += 10;
      }
    });
    
    setScore(finalScore);
    const timeSpent = (duration * 60) - timeLeft;
    
    const examName = isEnemMode ? 'Simulado ENEM' : `Simulado ${subject}`;
    await saveQuizScore(examName, finalScore, selectedQuestions.length, timeSpent);
    onComplete(finalScore, timeSpent);
    playSound('success');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (loading || selectedQuestions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-2">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto"></div>
              <div className="space-y-2">
                <p className="text-gray-700 text-lg font-medium">Carregando questões do simulado...</p>
                <p className="text-gray-500 text-sm">
                  {isEnemMode ? 'Selecionando questões multidisciplinares' : `Preparando questões de ${subject}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
  const timeProgress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  if (!isStarted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-2">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white py-6">
            <CardTitle className="flex items-center justify-center gap-3 text-xl font-bold">
              <Clock className="text-white" size={28} />
              {isEnemMode ? 'Simulado ENEM' : `Simulado - ${subject}`}
            </CardTitle>
            <p className="text-blue-100 text-sm mt-2">
              {selectedQuestions.length} questões • {duration} minutos
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4 text-lg">📋 Instruções do Simulado</h3>
                <div className="grid gap-4 text-left max-w-lg mx-auto text-sm">
                  <div className="flex items-center gap-3 text-blue-800">
                    <Clock size={16} className="text-blue-600 flex-shrink-0" />
                    <span><strong>Duração:</strong> {duration} minutos</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-800">
                    <BookOpen size={16} className="text-blue-600 flex-shrink-0" />
                    <span><strong>{selectedQuestions.length} questões</strong> {isEnemMode ? 'multidisciplinares' : `de ${subject}`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-800">
                    <Trophy size={16} className="text-blue-600 flex-shrink-0" />
                    <span><strong>Pontuação:</strong> 10 pontos por acerto</span>
                  </div>
                  <div className="flex items-center gap-3 text-orange-700">
                    <AlertTriangle size={16} className="text-orange-600 flex-shrink-0" />
                    <span>Não é possível voltar às questões anteriores</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-700">
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                    <span>O simulado será finalizado automaticamente</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startExam} 
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12" 
                size="lg"
              >
                <Clock className="mr-2" size={20} />
                🚀 Iniciar Simulado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / (selectedQuestions.length * 10)) * 100);
    const correctAnswers = answers.filter((answer, index) => answer === selectedQuestions[index]?.correctAnswer).length;
    const wrongAnswers = selectedQuestions.length - correctAnswers;
    
    return (
      <div className="w-full max-w-2xl mx-auto px-2">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-600 text-white py-6">
            <CardTitle className="flex items-center justify-center gap-3 text-xl font-bold">
              <Trophy className="text-yellow-300" size={28} />
              🎉 Simulado Concluído!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">{score} pontos</div>
                <div className="text-2xl text-blue-600 mb-4">{percentage}% de aproveitamento</div>
                <div className="text-gray-700 mb-4 text-sm">
                  ⏱️ Tempo utilizado: <strong>{formatTime((duration * 60) - timeLeft)}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  {isEnemMode ? 'Simulado ENEM Multidisciplinar' : `Simulado de ${subject}`}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="text-center bg-green-50 p-4 rounded-xl border-2 border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ✅ {correctAnswers}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Acertos</div>
                </div>
                <div className="text-center bg-red-50 p-4 rounded-xl border-2 border-red-200">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    ❌ {wrongAnswers}
                  </div>
                  <div className="text-sm text-red-700 font-medium">Erros</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = selectedQuestions[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <Card className="shadow-xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                📊 Questão {currentQuestion + 1} de {selectedQuestions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`${timeLeft < 60 ? 'text-red-300' : 'text-white'}`} size={20} />
              <span className={`font-mono text-lg font-bold ${timeLeft < 60 ? 'text-red-300' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-blue-100">
              <span>Progresso da prova</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="flex justify-between text-xs text-blue-100">
              <span>Tempo decorrido</span>
              <span>{Math.round(timeProgress)}%</span>
            </div>
            <Progress value={timeProgress} className="h-1 bg-white/10" />
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  <BookOpen size={16} />
                  {currentQ.subject}
                  {currentQ.topic && (
                    <>
                      <span className="text-blue-600">•</span>
                      <span className="text-blue-600">{currentQ.topic}</span>
                    </>
                  )}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-6 leading-relaxed text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-200">
                {currentQ.question}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`font-bold text-lg mr-4 w-8 h-8 rounded-full flex items-center justify-center ${
                      answers[currentQuestion] === index 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-800 leading-relaxed">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
              <div className="text-sm">
                {answers[currentQuestion] !== undefined ? (
                  <span className="text-green-600 font-semibold flex items-center gap-2">
                    <CheckCircle size={16} />
                    Resposta selecionada
                  </span>
                ) : (
                  <span className="text-gray-500 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Selecione uma resposta
                  </span>
                )}
              </div>
              <Button 
                onClick={nextQuestion} 
                disabled={answers[currentQuestion] === undefined}
                size="sm"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentQuestion === selectedQuestions.length - 1 ? '🏁 Finalizar' : 'Próxima →'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulatedExam;
