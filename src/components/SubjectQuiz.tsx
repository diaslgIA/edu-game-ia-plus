
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Trophy, Clock, Star, ArrowLeft } from 'lucide-react';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useSound } from '@/contexts/SoundContext';

interface SubjectQuizProps {
  subject: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, onComplete, onBack }) => {
  const { generateQuiz } = useSubjectQuestions();
  const { playSound } = useSound();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    const quizQuestions = generateQuiz(subject, 5);
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
    setTimeLeft(30);
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
      if (isCorrect) {
        setScore(score + 10);
        playSound('success');
      } else {
        playSound('error');
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setGameCompleted(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 : 0);
      onComplete(finalScore, timeSpent);
      playSound('success');
    }
  };

  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Nenhuma questão disponível para {subject}
        </h3>
        <Button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 text-white">
          <ArrowLeft className="mr-2" size={16} />
          Voltar
        </Button>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
        <div className="mb-6">
          <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Quiz de {subject}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Teste seus conhecimentos específicos em {subject}!
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Informações:</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• {questions.length} questões específicas de {subject}</li>
            <li>• 30 segundos por questão</li>
            <li>• 10 pontos por resposta correta</li>
            <li>• Explicações detalhadas</li>
          </ul>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="mr-2" size={16} />
            Voltar
          </Button>
          <Button 
            onClick={startGame}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
          >
            <Star className="mr-2" size={20} />
            Começar
          </Button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 10 : 0);
    const percentage = Math.round((finalScore / (questions.length * 10)) * 100);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
        <Trophy className="mx-auto mb-4 text-yellow-500" size={64} />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Quiz de {subject} Concluído!
        </h3>
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-4 mb-6">
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{finalScore} pontos</div>
          <div className="text-lg text-orange-700 dark:text-orange-300">{percentage}% de acertos em {subject}</div>
        </div>
        <Button 
          onClick={onBack}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
        >
          Voltar aos Exercícios
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
      {/* Header do Quiz */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="dark:text-white">
            <ArrowLeft size={16} />
          </Button>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {subject} - {question.topic}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
          <Clock size={18} />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Pergunta */}
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">{question.question}</h3>

      {/* Opções de Resposta */}
      <div className="space-y-3 mb-6">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? showResult
                  ? isCorrect && selectedAnswer === index
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : selectedAnswer === index && !isCorrect
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                  : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                : showResult && index === question.correctAnswer
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && (
                <>
                  {index === question.correctAnswer && <CheckCircle className="text-green-500" size={20} />}
                  {selectedAnswer === index && selectedAnswer !== question.correctAnswer && <XCircle className="text-red-500" size={20} />}
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Explicação */}
      {showResult && (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            {isCorrect ? '🎉 Correto!' : '📚 Explicação:'}
          </h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">{question.explanation}</p>
        </div>
      )}

      {/* Botões de Ação */}
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
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
          >
            {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
          </Button>
        )}
      </div>

      {/* Pontuação Atual */}
      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-400">Pontuação atual: </span>
        <span className="font-bold text-blue-600 dark:text-blue-400">{score} pontos</span>
      </div>
    </div>
  );
};

export default SubjectQuiz;
