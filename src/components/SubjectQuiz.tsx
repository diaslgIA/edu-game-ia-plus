import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useUserActivities } from '@/hooks/useUserActivities';
import { useSound } from '@/contexts/SoundContext';
import QuizHeader from './quiz/QuizHeader';
import QuizQuestion from './quiz/QuizQuestion';
import QuizExplanation from './quiz/QuizExplanation';
import QuizIntro from './quiz/QuizIntro';
import QuizResults from './quiz/QuizResults';
import QuizMentorGuide from './quiz/QuizMentorGuide';
import QuizMentorHint from './quiz/QuizMentorHint';
// CORREÇÃO: Importamos APENAS o componente de feedback genérico
import QuizMentorFeedback from './quiz/QuizMentorFeedback';

interface SubjectQuizProps {
  subject: string;
  topic?: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, topic, onComplete, onBack }) => {
  const { questions, loading } = useSubjectQuestions(subject);
  const { saveQuizScore, saving } = useQuizScore();
  const { recordQuizQuestion, recordQuizComplete } = useUserActivities();
  const { playSound } = useSound();
  
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [finalScore, setFinalScore] = useState(0);
  const [hasLimitedQuestions, setHasLimitedQuestions] = useState(false);
  
  // Estados dos mentores
  const [showMentorGuide, setShowMentorGuide] = useState(false);
  const [showMentorHint, setShowMentorHint] = useState(false);
  const [showMentorFeedback, setShowMentorFeedback] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      let filteredQuestions = questions;
      if (topic) {
        filteredQuestions = questions.filter(q => q.topic === topic);
      }
      
      const isLimited = filteredQuestions.length < 10;
      setHasLimitedQuestions(isLimited);
      
      const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(15, filteredQuestions.length));
      
      const formattedQuestions = selectedQuestions.map(q => {
        let optionsArray = [];
        if (Array.isArray(q.options)) {
          optionsArray = q.options;
        } else if (typeof q.options === 'string') {
          try {
            const parsed = JSON.parse(q.options);
            optionsArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
          } catch {
            optionsArray = ['Opção A', 'Opção B', 'Opção C', 'Opção D'];
          }
        }
        
        const difficultyMap: { [key: string]: string } = {
          'easy': 'Fácil', 'medium': 'Médio', 'hard': 'Difícil'
        };
        
        return {
          id: q.id,
          question: q.question,
          options: optionsArray,
          correctAnswer: q.correct_answer,
          explanation: q.explanation || "Explicação não disponível.",
          topic: q.topic || subject,
          difficulty: difficultyMap[q.difficulty_level?.toLowerCase()] || 'Médio'
        };
      });
      
      setQuizQuestions(formattedQuestions);
    }
  }, [questions, subject, topic]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmitAnswer();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setTimeLeft(180);
    if (playSound) playSound('click');
  };

  const handleSubmitAnswer = async () => {
    setShowResult(true);
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const questionScore = isCorrect ? 10 : 0;
    
    setScore(prev => prev + questionScore);
    setShowMentorFeedback(true);
    // Outras lógicas de registro...
  };

  const handleNextQuestion = async () => {
    setShowMentorFeedback(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(180);
      setQuestionStartTime(Date.now());
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      setFinalScore(score);
      setGameCompleted(true);
      onComplete(score, timeSpent);
      // Lógica de salvar score...
    }
  };

  // ... (Outras funções de handle como handleHintRequest, etc., podem ser mantidas)

  if (loading || quizQuestions.length === 0 && !hasLimitedQuestions) {
    return <div className="text-center p-6">Carregando questões...</div>;
  }
  
  if (questions.length === 0 && hasLimitedQuestions) {
     return (
       <div className="text-center p-6">
         <h3 className="text-xl font-bold mb-4">📚 Conteúdo em Desenvolvimento</h3>
         <p className="mb-4">As questões para {subject} estão a ser preparadas.</p>
         <Button onClick={onBack}>Voltar</Button>
       </div>
     );
  }

  if (!gameStarted) {
    return <QuizIntro subject={subject} totalQuestions={quizQuestions.length} onStart={startGame} onBack={onBack} />;
  }

  if (gameCompleted) {
    return <QuizResults subject={subject} score={finalScore} totalQuestions={quizQuestions.length} onBack={onBack} />;
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const xpGained = isCorrect ? 10 : 3;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto min-h-0">
        <QuizHeader 
          subject={subject} 
          topic={question.topic}
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          timeLeft={timeLeft}
          onBack={onBack}
        />
        <QuizQuestion 
          question={question}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={setSelectedAnswer}
        />
        {showMentorFeedback && showResult && (
          <div className="mt-4">
            {/* CORREÇÃO PRINCIPAL: Uma única chamada para o componente inteligente */}
            <QuizMentorFeedback
              subject={subject}
              isCorrect={isCorrect}
              explanation={question.explanation}
              xpGained={xpGained}
              isVisible={showMentorFeedback}
            />
          </div>
        )}
      </div>
      <div className="pt-4 border-t border-gray-300">
        {!showResult ? (
          <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="w-full">
            Confirmar
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestion < quizQuestions.length - 1 ? 'Próxima' : 'Finalizar Quiz'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubjectQuiz;
