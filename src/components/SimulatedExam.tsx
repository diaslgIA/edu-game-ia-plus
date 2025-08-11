
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, CheckCircle, XCircle, Trophy, BookOpen } from 'lucide-react';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useAllSubjectQuestions } from '@/hooks/useAllSubjectQuestions';

interface SimulatedExamProps {
  subject: string;
  duration: number; // duração em minutos
  questionCount?: number; // número de questões (padrão: 10)
  onComplete: (score: number, timeSpent: number) => void;
  isEnemMode?: boolean; // novo prop para modo ENEM
}

const SimulatedExam: React.FC<SimulatedExamProps> = ({ 
  subject, 
  duration, 
  questionCount = 10, 
  onComplete,
  isEnemMode = false
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // converter para segundos
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const { saveQuizScore } = useQuizScore();
  const { playSound } = useSound();
  
  // Hooks condicionais baseados no modo
  const { questions: subjectQuestions, loading: subjectLoading } = useSubjectQuestions(isEnemMode ? '' : subject);
  const { getRandomQuestions: getAllRandomQuestions, loading: allLoading } = useAllSubjectQuestions();
  
  // Selecionar questões baseado no modo
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (isEnemMode) {
      // Modo ENEM - buscar questões de todas as matérias
      if (!allLoading) {
        const questions = getAllRandomQuestions(questionCount);
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
      }
    } else {
      // Modo matéria específica
      if (subjectQuestions.length > 0 && selectedQuestions.length === 0) {
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
  }, [subjectQuestions, questionCount, subject, selectedQuestions.length, isEnemMode, allLoading, getAllRandomQuestions]);

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
    
    // Calcular pontuação
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
  const isLoading = isEnemMode ? allLoading : subjectLoading;
  if (isLoading || selectedQuestions.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Carregando questões do simulado...</p>
            <p className="text-gray-500 text-sm mt-2">
              {isEnemMode ? 'Selecionando questões multidisciplinares' : `Preparando questões de ${subject}`}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
  const timeProgress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  if (!isStarted) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <Clock className="text-white" size={32} />
            {isEnemMode ? 'Simulado ENEM' : `Simulado ENEM - ${subject}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-4 text-xl">📋 Instruções do Simulado</h3>
              <ul className="text-blue-700 space-y-3 text-left max-w-md mx-auto">
                <li className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" />
                  <span><strong>Duração:</strong> {duration} minutos</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-600" />
                  <span><strong>{selectedQuestions.length} questões</strong> {isEnemMode ? 'multidisciplinares' : `de ${subject}`}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Trophy size={16} className="text-blue-600" />
                  <span><strong>Pontuação:</strong> 10 pontos por acerto</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-orange-600" />
                  <span>Não é possível voltar às questões anteriores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span>O simulado será finalizado automaticamente</span>
                </li>
              </ul>
            </div>
            
            <Button onClick={startExam} className="w-full max-w-md mx-auto" size="lg">
              <Clock className="mr-3" size={24} />
              🚀 Iniciar Simulado
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / (selectedQuestions.length * 10)) * 100);
    const correctAnswers = answers.filter((answer, index) => answer === selectedQuestions[index]?.correctAnswer).length;
    const wrongAnswers = selectedQuestions.length - correctAnswers;
    
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <Trophy className="text-yellow-300" size={32} />
            🎉 Simulado Concluído!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
              <div className="text-5xl font-bold text-green-600 mb-3">{score} pontos</div>
              <div className="text-2xl text-blue-600 mb-4">{percentage}% de aproveitamento</div>
              <div className="text-gray-600 mb-4">
                ⏱️ Tempo utilizado: <strong>{formatTime((duration * 60) - timeLeft)}</strong>
              </div>
              <div className="text-sm text-gray-500">
                {isEnemMode ? 'Simulado ENEM Multidisciplinar' : `Simulado de ${subject}`}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="text-center bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  ✅ {correctAnswers}
                </div>
                <div className="text-sm text-green-700 font-medium">Acertos</div>
              </div>
              <div className="text-center bg-red-50 p-4 rounded-xl border border-red-200">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  ❌ {wrongAnswers}
                </div>
                <div className="text-sm text-red-700 font-medium">Erros</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = selectedQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
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
          <Progress value={progress} className="h-3 bg-white/20" />
          <Progress value={timeProgress} className="h-2 bg-white/10" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 p-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <BookOpen size={14} />
              {currentQ.subject}
              {currentQ.topic && (
                <>
                  <span className="text-blue-600">•</span>
                  <span className="text-blue-600">{currentQ.topic}</span>
                </>
              )}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-6 leading-relaxed text-gray-800">{currentQ.question}</h3>
        </div>

        <div className="space-y-4">
          {currentQ.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => selectAnswer(index)}
              className={`w-full p-5 text-left border-2 rounded-xl transition-all duration-200 ${
                answers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center">
                <span className={`font-bold text-lg mr-4 w-8 h-8 rounded-full flex items-center justify-center ${
                  answers[currentQuestion] === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-800 leading-relaxed">{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-sm">
            {answers[currentQuestion] !== undefined ? (
              <span className="text-green-600 font-medium flex items-center gap-2">
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
            size="lg"
            className="px-8"
          >
            {currentQuestion === selectedQuestions.length - 1 ? '🏁 Finalizar' : 'Próxima →'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedExam;
