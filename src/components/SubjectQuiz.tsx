import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useExpandedQuestions } from '@/hooks/useExpandedQuestions';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';
import QuizHeader from './quiz/QuizHeader';
import QuizQuestion from './quiz/QuizQuestion';
import QuizExplanation from './quiz/QuizExplanation';
import QuizIntro from './quiz/QuizIntro';
import QuizResults from './quiz/QuizResults';

interface SubjectQuizProps {
  subject: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, onComplete, onBack }) => {
  const { generateQuiz } = useExpandedQuestions();
  const { saveQuizScore, saving } = useQuizScore();
  const { playSound } = useSound();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // Alterado para 3 minutos (180 segundos)
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    const quizQuestions = generateQuiz(subject, 10);
    setQuestions(quizQuestions);
  }, [subject, generateQuiz]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setTimeLeft(180); // 3 minutos para cada questão
    playSound('click');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
      playSound('click');
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
      const questionScore = isCorrect ? 10 : 0;
      
      if (isCorrect) {
        setScore(score + questionScore);
        playSound('success');
      } else {
        playSound('error');
      }
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(180); // Resetar para 3 minutos
    } else {
      setGameCompleted(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 : 0);
      
      await saveQuizScore(subject, finalScore, questions.length, timeSpent);
      onComplete(finalScore, timeSpent);
      playSound('success');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Carregando questões de {subject}...
        </h3>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <QuizIntro 
        subject={subject}
        totalQuestions={questions.length}
        onStart={startGame}
        onBack={onBack}
      />
    );
  }

  if (gameCompleted) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 : 0);
    
    return (
      <QuizResults 
        subject={subject}
        score={finalScore}
        totalQuestions={questions.length}
        saving={saving}
        onBack={onBack}
      />
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 h-full flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <QuizHeader 
          subject={subject}
          topic={question.topic}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          timeLeft={timeLeft}
          onBack={onBack}
        />

        <QuizQuestion 
          question={question}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
        />

        {showResult && (
          <QuizExplanation 
            explanation={question.explanation}
            isCorrect={isCorrect}
          />
        )}

        {/* Pontuação Atual - Sempre visível */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl">
          <div className="text-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Pontuação atual: </span>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{score} pontos</span>
          </div>
        </div>
      </div>

      {/* Botões de Ação - Sempre visíveis no final */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-3">
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
            >
              Confirmar Resposta
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectQuiz;
