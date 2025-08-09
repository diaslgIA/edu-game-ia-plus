
import React, { useState, useEffect } from 'react';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useUserActivities } from '@/hooks/useUserActivities';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import { Card } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Loader2, ArrowLeft } from 'lucide-react';

interface SubjectQuizProps {
  subject: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, onComplete, onBack }) => {
  const { questions, loading, error, refreshQuestions } = useSubjectQuestions(subject);
  const { recordQuizQuestion, recordQuizComplete } = useUserActivities();
  const { playSound } = useSound();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    if (questions.length > 0) {
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, questions.length]);

  const handleAnswerSelect = async (answerIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    playSound('click');
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    
    // Registrar atividade da questão
    await recordQuizQuestion(
      subject,
      currentQuestion.topic,
      currentQuestion.id,
      answerIndex,
      currentQuestion.correct_answer,
      timeSpent
    );

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1500);
    } else {
      // Quiz completed
      setTimeout(async () => {
        const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000);
        const correctAnswers = newAnswers.reduce((count, answer, index) => {
          return count + (answer === questions[index].correct_answer ? 1 : 0);
        }, 0);
        
        const finalScore = correctAnswers * 10;

        await recordQuizComplete(subject, finalScore, questions.length, totalTimeSpent);
        setQuizCompleted(true);
      }, 1500);
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct_answer ? 10 : 0);
    }, 0);
  };

  const handleQuizComplete = () => {
    const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000);
    onComplete(calculateScore(), totalTimeSpent);
  };

  const handleRetry = () => {
    playSound('click');
    refreshQuestions();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Loader2 className="animate-spin text-white" size={48} />
        <p className="text-white text-lg">Carregando questões...</p>
        <p className="text-white/80 text-sm">Preparando quiz de {subject}</p>
        <Button
          onClick={handleRetry}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <RefreshCw size={16} className="mr-2" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <AlertCircle className="text-red-300" size={48} />
        <p className="text-white text-lg">Erro ao carregar questões</p>
        <p className="text-white/80 text-sm text-center">{error}</p>
        <div className="flex space-x-3">
          <Button
            onClick={handleRetry}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Tentar novamente
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="text-white" style={{ fontSize: '48px' }}>📚</div>
        <p className="text-white text-lg">Nenhuma questão encontrada</p>
        <p className="text-white/80 text-sm text-center">
          Não há questões disponíveis para a matéria "{subject}" no momento.
        </p>
        <div className="flex space-x-3">
          <Button
            onClick={handleRetry}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <RefreshCw size={16} className="mr-2" />
            Tentar novamente
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <QuizResults
        score={calculateScore()}
        totalQuestions={questions.length}
        subject={subject}
        onComplete={handleQuizComplete}
        answers={answers}
        questions={questions}
      />
    );
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Progress indicator */}
      <div className="bg-white/15 backdrop-blur-md rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-sm">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </span>
          <span className="text-white text-sm">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1">
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswerSelect}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          showFeedback={true}
        />
      </div>
    </div>
  );
};

export default SubjectQuiz;
