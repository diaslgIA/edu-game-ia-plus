
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';
import QuizHeader from './quiz/QuizHeader';
import QuizQuestion from './quiz/QuizQuestion';
import QuizExplanation from './quiz/QuizExplanation';
import QuizIntro from './quiz/QuizIntro';
import QuizResults from './quiz/QuizResults';
import QuizMentorGuide from './quiz/QuizMentorGuide';
import QuizMentorFeedback from './quiz/QuizMentorFeedback';
import QuizMentorHint from './quiz/QuizMentorHint';

interface SubjectQuizProps {
  subject: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, onComplete, onBack }) => {
  const { questions, loading } = useSubjectQuestions(subject);
  const { saveQuizScore, saving } = useQuizScore();
  const { playSound } = useSound();
  
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  // Estados dos mentores
  const [showMentorGuide, setShowMentorGuide] = useState(false);
  const [showMentorHint, setShowMentorHint] = useState(false);
  const [showMentorFeedback, setShowMentorFeedback] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      // Selecionar 10 questões aleatórias
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(10, questions.length));
      
      // Converter para o formato esperado pelo quiz
      const formattedQuestions = selectedQuestions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        topic: q.topic,
        difficulty: q.difficulty_level
      }));
      
      setQuizQuestions(formattedQuestions);
    }
  }, [questions]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  // Mostrar guia do mentor nas questões difíceis
  useEffect(() => {
    if (gameStarted && !showResult && quizQuestions.length > 0 && currentQuestion < quizQuestions.length) {
      const question = quizQuestions[currentQuestion];
      if (question.difficulty === 'hard' && timeLeft < 120) {
        setShowMentorGuide(true);
      }
    }
  }, [gameStarted, showResult, currentQuestion, timeLeft, quizQuestions]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setTimeLeft(180);
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
      setShowMentorGuide(false);
      
      const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
      const questionScore = isCorrect ? 10 : 0;
      
      if (isCorrect) {
        setScore(score + questionScore);
      }
      
      setShowMentorFeedback(true);
    }
  };

  const handleNextQuestion = async () => {
    setShowMentorFeedback(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(180);
    } else {
      setGameCompleted(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 10 : 0);
      
      await saveQuizScore(subject, finalScore, quizQuestions.length, timeSpent);
      onComplete(finalScore, timeSpent);
      playSound('success');
    }
  };

  const handleHintRequest = () => {
    setShowMentorGuide(false);
    setShowMentorHint(true);
  };

  const handleUseHint = () => {
    setShowMentorHint(false);
  };

  if (loading) {
    return (
      <div className="font-pixel bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-4 border-gray-300 dark:border-gray-700 p-6 text-center rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          Carregando questões de {subject}...
        </h3>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="font-pixel bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-4 border-gray-300 dark:border-gray-700 p-6 text-center rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          Nenhuma questão disponível para {subject}
        </h3>
        <Button onClick={onBack} className="mt-4">
          Voltar
        </Button>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="font-pixel bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-4 border-gray-300 dark:border-gray-700 p-6 text-center rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          Preparando questões...
        </h3>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <QuizIntro 
        subject={subject}
        totalQuestions={quizQuestions.length}
        onStart={startGame}
        onBack={onBack}
      />
    );
  }

  if (gameCompleted) {
    const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 10 : 0);
    
    return (
      <QuizResults 
        subject={subject}
        score={finalScore}
        totalQuestions={quizQuestions.length}
        saving={saving}
        onBack={onBack}
      />
    );
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const xpGained = isCorrect ? 10 : 3;

  return (
    <div className="font-pixel bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 h-full flex flex-col rounded-lg relative">
      {/* Guia do Mentor */}
      <QuizMentorGuide
        subject={subject}
        questionDifficulty={question.difficulty}
        isVisible={showMentorGuide}
        onClose={() => setShowMentorGuide(false)}
        onHintRequest={handleHintRequest}
      />

      {/* Dica do Mentor */}
      <QuizMentorHint
        subject={subject}
        hint={question.explanation || "Esta questão requer atenção aos detalhes. Analise cada opção cuidadosamente."}
        onUseHint={handleUseHint}
        onClose={() => setShowMentorHint(false)}
        isVisible={showMentorHint}
      />

      {/* Scrollable Content */}
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
          onAnswerSelect={handleAnswerSelect}
        />

        {showMentorFeedback && showResult && (
          <div className="mt-4">
            <QuizMentorFeedback
              subject={subject}
              isCorrect={isCorrect}
              explanation={question.explanation}
              xpGained={xpGained}
              isVisible={showMentorFeedback}
            />
          </div>
        )}

        {showResult && !showMentorFeedback && (
          <QuizExplanation 
            explanation={question.explanation}
            isCorrect={isCorrect}
          />
        )}

        {/* Pontuação Atual */}
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border-2 border-blue-500 rounded-lg">
          <div className="text-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Pontos: </span>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{score}</span>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex space-x-3">
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 border-2 border-b-4 border-r-4 border-blue-700 active:border-b-2 active:border-r-2 disabled:opacity-50"
            >
              Confirmar
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              disabled={saving}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 border-2 border-b-4 border-r-4 border-green-700 active:border-b-2 active:border-r-2"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Próxima' : 'Finalizar Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectQuiz;
