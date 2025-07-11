
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
import QuizPythagorasFeedback from './quiz/QuizPythagorasFeedback';
import QuizEinsteinFeedback from './quiz/QuizEinsteinFeedback';
import QuizMarieCurieFeedback from './quiz/QuizMarieCurieFeedback';
import { QuizDarwinFeedback } from './quiz/QuizDarwinFeedback';
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
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutos por questão
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  // Estados dos mentores
  const [showMentorGuide, setShowMentorGuide] = useState(false);
  const [showMentorHint, setShowMentorHint] = useState(false);
  const [showMentorFeedback, setShowMentorFeedback] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      console.log('Raw questions from database:', questions);
      
      // Selecionar 15 questões aleatórias (aumentado de 10)
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(15, questions.length));
      
      // Converter para o formato esperado pelo quiz
      const formattedQuestions = selectedQuestions.map(q => {
        console.log('Processing question:', q);
        
        // Garantir que options seja um array
        let optionsArray = [];
        if (Array.isArray(q.options)) {
          optionsArray = q.options;
        } else if (typeof q.options === 'object' && q.options !== null) {
          optionsArray = Object.values(q.options);
        } else if (typeof q.options === 'string') {
          try {
            const parsed = JSON.parse(q.options);
            optionsArray = Array.isArray(parsed) ? parsed : Object.values(parsed);
          } catch {
            optionsArray = ['Opção A', 'Opção B', 'Opção C', 'Opção D'];
          }
        } else {
          console.error('Invalid options format for question:', q);
          optionsArray = ['Opção A', 'Opção B', 'Opção C', 'Opção D'];
        }
        
        // Mapear dificuldade
        const difficultyMap: { [key: string]: string } = {
          'easy': 'Fácil',
          'medium': 'Médio', 
          'hard': 'Difícil',
          'facil': 'Fácil',
          'medio': 'Médio',
          'dificil': 'Difícil'
        };
        
        const difficulty = difficultyMap[q.difficulty_level?.toLowerCase()] || 'Médio';
        
        const formattedQuestion = {
          question: q.question,
          options: optionsArray,
          correctAnswer: q.correct_answer,
          explanation: q.explanation || "Explicação não disponível.",
          topic: q.topic || subject,
          difficulty: difficulty
        };
        
        console.log('Formatted question:', formattedQuestion);
        return formattedQuestion;
      });
      
      console.log('Final formatted questions:', formattedQuestions);
      setQuizQuestions(formattedQuestions);
    }
  }, [questions, subject]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      // Tempo esgotado - submeter resposta automaticamente
      handleSubmitAnswer();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  // Mostrar guia do mentor nas questões difíceis
  useEffect(() => {
    if (gameStarted && !showResult && quizQuestions.length > 0 && currentQuestion < quizQuestions.length) {
      const question = quizQuestions[currentQuestion];
      if (question.difficulty === 'Difícil' && timeLeft < 120) {
        setShowMentorGuide(true);
      }
    }
  }, [gameStarted, showResult, currentQuestion, timeLeft, quizQuestions]);

  const startGame = () => {
    console.log('Starting game with questions:', quizQuestions);
    setGameStarted(true);
    setStartTime(Date.now());
    setTimeLeft(180); // 3 minutos por questão
    if (playSound) playSound('click');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('Answer selected:', answerIndex);
    if (!showResult) {
      setSelectedAnswer(answerIndex);
      if (playSound) playSound('click');
    }
  };

  const handleSubmitAnswer = () => {
    console.log('Submitting answer:', selectedAnswer);
    setShowResult(true);
    setShowMentorGuide(false);
    
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    const questionScore = isCorrect ? 10 : 0;
    
    console.log('Answer is correct:', isCorrect, 'Score:', questionScore);
    
    if (isCorrect) {
      setScore(score + questionScore);
    }
    
    setShowMentorFeedback(true);
  };

  const handleNextQuestion = async () => {
    setShowMentorFeedback(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(180); // Reset para 3 minutos
    } else {
      setGameCompleted(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 10 : 0);
      
      try {
        await saveQuizScore(subject, finalScore, quizQuestions.length, timeSpent);
        onComplete(finalScore, timeSpent);
        if (playSound) playSound('success');
      } catch (error) {
        console.error('Error saving quiz score:', error);
        onComplete(finalScore, timeSpent);
      }
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

  console.log('Current question:', question);
  console.log('Selected answer:', selectedAnswer);
  console.log('Show result:', showResult);

  return (
    <div className="font-pixel bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 h-full flex flex-col rounded-lg relative">
      {/* Guia do Mentor */}
      {showMentorGuide && (
        <QuizMentorGuide
          subject={subject}
          questionDifficulty={question.difficulty}
          isVisible={showMentorGuide}
          onClose={() => setShowMentorGuide(false)}
          onHintRequest={handleHintRequest}
        />
      )}

      {/* Dica do Mentor */}
      {showMentorHint && (
        <QuizMentorHint
          subject={subject}
          hint={question.explanation || "Esta questão requer atenção aos detalhes. Analise cada opção cuidadosamente."}
          onUseHint={handleUseHint}
          onClose={() => setShowMentorHint(false)}
          isVisible={showMentorHint}
        />
      )}

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
            {subject.toLowerCase() === 'matemática' ? (
              <QuizPythagorasFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                xpGained={xpGained}
                isVisible={showMentorFeedback}
              />
            ) : subject.toLowerCase() === 'física' ? (
              <QuizEinsteinFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                xpGained={xpGained}
                isVisible={showMentorFeedback}
              />
            ) : subject.toLowerCase() === 'química' ? (
              <QuizMarieCurieFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                xpGained={xpGained}
                isVisible={showMentorFeedback}
              />
            ) : subject.toLowerCase() === 'biologia' ? (
              <QuizDarwinFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                points={xpGained}
                affinityLevel={1}
                affinityProgress={35}
              />
            ) : (
              <QuizMentorFeedback
                subject={subject}
                isCorrect={isCorrect}
                explanation={question.explanation}
                xpGained={xpGained}
                isVisible={showMentorFeedback}
              />
            )}
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
              {timeLeft <= 10 ? `Confirmar (${timeLeft}s)` : 'Confirmar'}
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
