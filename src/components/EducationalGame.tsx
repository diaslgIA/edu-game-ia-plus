
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Trophy, Clock, Star } from 'lucide-react';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Qual é a fórmula da velocidade média?",
    options: ["v = s/t", "v = s*t", "v = t/s", "v = s+t"],
    correctAnswer: 0,
    explanation: "A velocidade média é calculada dividindo a distância percorrida pelo tempo gasto: v = s/t",
    subject: "Física"
  },
  {
    id: 2,
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"],
    correctAnswer: 1,
    explanation: "Dom Casmurro foi escrito por Machado de Assis em 1899, sendo uma de suas obras mais famosas.",
    subject: "Literatura"
  },
  {
    id: 3,
    question: "Qual é o resultado de 2³?",
    options: ["6", "8", "9", "12"],
    correctAnswer: 1,
    explanation: "2³ = 2 × 2 × 2 = 8. É a multiplicação do número 2 por ele mesmo 3 vezes.",
    subject: "Matemática"
  }
];

interface EducationalGameProps {
  onGameComplete: (score: number, timeSpent: number) => void;
}

const EducationalGame: React.FC<EducationalGameProps> = ({ onGameComplete }) => {
  const { saveQuizScore, saving } = useQuizScore();
  const { isMuted } = useSound();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  useEffect(() => {
    if (!gameCompleted || isMuted) return;

    const finalScore = score + (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer ? 10 : 0);
    const correctAnswers = Math.round(finalScore / 10);
    const totalQuestions = sampleQuestions.length;

    const getResultMessage = () => {
      const halfQuestions = totalQuestions / 2;
      if (correctAnswers > halfQuestions) {
        return `Você acertou ${correctAnswers} de ${totalQuestions} questões. Você está indo muito bem! Estude só um pouco mais para ser nota 10.`;
      } else {
        return `Você acertou ${correctAnswers} de ${totalQuestions} questões. Você precisa estudar muito para não perder os objetivos da vida, mas não desista! Com dedicação, você vai chegar lá. Continue firme!`;
      }
    };

    const message = getResultMessage();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'pt-BR';

    const speak = () => {
      const voices = window.speechSynthesis.getVoices();
      const portugueseVoice = voices.find(voice => voice.lang.startsWith('pt-BR') || voice.lang.startsWith('pt'));
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speak;
    } else {
      speak();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [gameCompleted, isMuted, score, selectedAnswer, currentQuestion]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
        setScore(score + 10);
      }
    }
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setGameCompleted(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer ? 10 : 0);
      
      // Salvar pontuação no banco de dados
      await saveQuizScore('Quiz Geral', finalScore, sampleQuestions.length, timeSpent);
      
      onGameComplete(finalScore, timeSpent);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setGameCompleted(false);
  };

  if (!gameStarted) {
    return (
      <div className="font-pixel bg-gray-900 text-white border-4 border-gray-700 p-6 text-center">
        <div className="mb-6">
          <Trophy className="mx-auto mb-4 text-yellow-400" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Quiz Educativo</h3>
          <p className="text-gray-400">Teste seus conhecimentos e ganhe pontos!</p>
        </div>
        <div className="bg-gray-800 border-2 border-gray-700 p-4 mb-6">
          <h4 className="font-semibold text-blue-400 mb-2">Como jogar:</h4>
          <ul className="text-sm text-blue-300 space-y-1 text-left">
            <li>- Responda em ate 30s</li>
            <li>- Ganhe 10 pts/acerto</li>
            <li>- Veja explicacoes</li>
            <li>- Complete para bonus!</li>
          </ul>
        </div>
        <Button 
          onClick={startGame}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 border-2 border-b-4 border-r-4 border-blue-700 active:border-b-2 active:border-r-2"
        >
          <Star className="mr-2" size={20} />
          Comecar Jogo
        </Button>
      </div>
    );
  }

  if (gameCompleted) {
    const finalScore = score + (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer ? 10 : 0);
    const percentage = Math.round((finalScore / (sampleQuestions.length * 10)) * 100);
    
    return (
      <div className="font-pixel bg-gray-900 text-white border-4 border-gray-700 p-6 text-center">
        <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
        <h3 className="text-2xl font-bold text-white mb-2">Quiz Concluído!</h3>
        <div className="bg-gray-800 border-2 border-yellow-500 p-4 mb-6">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{finalScore} pontos</div>
          <div className="text-lg text-yellow-300">{percentage}% de acertos</div>
          <div className="text-sm text-yellow-400 mt-2">
            {saving ? 'Salvando pontos...' : 'Pontos salvos na sua conta!'}
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <CheckCircle size={20} />
            <span>+{finalScore} pontos ganhos</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <Star size={20} />
            <span>Conquista: "Estudante Dedicado"</span>
          </div>
        </div>
        <Button 
          onClick={resetGame}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 border-2 border-b-4 border-r-4 border-green-700 active:border-b-2 active:border-r-2"
        >
          Jogar Novamente
        </Button>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="font-pixel bg-gray-900 text-white border-4 border-gray-700 p-6">
      {/* Header do Quiz */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-500 text-white px-3 py-1 text-sm font-medium">
            {question.subject}
          </span>
          <span className="text-gray-400 text-sm">
            {currentQuestion + 1}/{sampleQuestions.length}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-400">
          <Clock size={18} />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-gray-700 h-2 mb-6">
        <div 
          className="bg-blue-500 h-2 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
        ></div>
      </div>

      {/* Pergunta */}
      <h3 className="text-lg font-bold text-white mb-6 leading-tight">{question.question}</h3>

      {/* Opções de Resposta */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full p-4 text-left border-2 transition-all duration-200 text-sm ${
              selectedAnswer === index
                ? showResult
                  ? isCorrect && selectedAnswer === index
                    ? 'border-green-500 bg-green-900 text-white'
                    : selectedAnswer === index && !isCorrect
                    ? 'border-red-500 bg-red-900 text-white'
                    : 'border-blue-500 bg-blue-900 text-white'
                  : 'border-blue-500 bg-blue-900 text-white'
                : showResult && index === question.correctAnswer
                ? 'border-green-500 bg-green-900 text-white'
                : 'border-gray-600 bg-gray-800 text-white hover:border-blue-400 hover:bg-gray-700'
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

      {/* Explicação (apenas quando mostrar resultado) */}
      {showResult && (
        <div className="bg-gray-800 border-2 border-blue-500 p-4 mb-6">
          <h4 className="font-semibold text-blue-400 mb-2">
            {isCorrect ? '🎉 Correto!' : '📚 Explicacao:'}
          </h4>
          <p className="text-blue-300 text-sm leading-snug">{question.explanation}</p>
        </div>
      )}

      {/* Botões de Ação */}
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
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 border-2 border-b-4 border-r-4 border-green-700 active:border-b-2 active:border-r-2"
          >
            {currentQuestion < sampleQuestions.length - 1 ? 'Proxima' : 'Finalizar'}
          </Button>
        )}
      </div>

      {/* Pontuação Atual */}
      <div className="mt-4 text-center">
        <span className="text-gray-400 text-sm">Pontos: </span>
        <span className="font-bold text-blue-400">{score}</span>
      </div>
    </div>
  );
};

export default EducationalGame;
