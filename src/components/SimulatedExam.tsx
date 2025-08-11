
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';

interface SimulatedExamProps {
  subject: string;
  duration: number; // duração em minutos
  questionCount?: number; // número de questões (padrão: 10)
  onComplete: (score: number, timeSpent: number) => void;
}

const SimulatedExam: React.FC<SimulatedExamProps> = ({ 
  subject, 
  duration, 
  questionCount = 10, 
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // converter para segundos
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const { saveQuizScore } = useQuizScore();
  const { playSound } = useSound();
  const { questions: allQuestions, loading } = useSubjectQuestions(subject);
  
  // Selecionar questões aleatórias do banco de dados
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (allQuestions.length > 0 && selectedQuestions.length === 0) {
      // Embaralhar e selecionar o número desejado de questões
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, questionCount);
      
      // Formatar as questões para o formato esperado
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
        explanation: q.explanation || ''
      }));
      
      setSelectedQuestions(formattedQuestions);
    }
  }, [allQuestions, questionCount, subject, selectedQuestions.length]);

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
    
    await saveQuizScore(`Simulado ${subject}`, finalScore, selectedQuestions.length, timeSpent);
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando questões do simulado...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
  const timeProgress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  if (!isStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Clock className="text-blue-500" />
            Simulado ENEM - {subject}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Instruções do Simulado</h3>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• Duração: {duration} minutos</li>
                <li>• {questionCount} questões de {subject}</li>
                <li>• Cada questão vale 10 pontos</li>
                <li>• Não é possível voltar às questões anteriores</li>
                <li>• O simulado será finalizado automaticamente</li>
              </ul>
            </div>
            <Button onClick={startExam} className="w-full" size="lg">
              <Clock className="mr-2" size={20} />
              Iniciar Simulado
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / (selectedQuestions.length * 10)) * 100);
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="text-yellow-500" />
            Simulado Concluído!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">{score} pontos</div>
              <div className="text-lg text-green-600">{percentage}% de acertos</div>
              <div className="text-sm text-gray-600 mt-2">
                Tempo utilizado: {formatTime((duration * 60) - timeLeft)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {answers.filter((answer, index) => answer === selectedQuestions[index]?.correctAnswer).length}
                </div>
                <div className="text-sm text-gray-600">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {selectedQuestions.length - answers.filter((answer, index) => answer === selectedQuestions[index]?.correctAnswer).length}
                </div>
                <div className="text-sm text-gray-600">Erros</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = selectedQuestions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Questão {currentQuestion + 1} de {selectedQuestions.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`${timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}`} size={16} />
            <span className={`font-mono ${timeLeft < 60 ? 'text-red-500' : 'text-blue-500'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <Progress value={timeProgress} className="h-1" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="text-sm text-blue-600 mb-2">{currentQ.subject}</div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => selectAnswer(index)}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="text-sm text-gray-600">
            {answers[currentQuestion] !== undefined ? 'Resposta selecionada' : 'Selecione uma resposta'}
          </div>
          <Button 
            onClick={nextQuestion} 
            disabled={answers[currentQuestion] === undefined}
            className="ml-auto"
          >
            {currentQuestion === selectedQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedExam;
