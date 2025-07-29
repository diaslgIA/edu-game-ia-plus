import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trophy, Clock, Heart } from 'lucide-react';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizResults from '@/components/quiz/QuizResults';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useUserActivities } from '@/hooks/useUserActivities';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  topic?: string;
}

interface SubjectQuizProps {
  subject: string;
  topic?: string;
  onBack: () => void;
  onComplete?: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, topic, onBack, onComplete }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { questions: dbQuestions, loading } = useSubjectQuestions(subject);
  const { saveQuizScore, saving } = useQuizScore();
  const { recordQuizQuestion } = useUserActivities();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [hearts, setHearts] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (dbQuestions.length > 0) {
      // Filter by topic if provided, otherwise use all questions
      const filteredQuestions = topic 
        ? dbQuestions.filter(q => q.topic === topic)
        : dbQuestions;
        
      // Convert database questions to quiz format
      const convertedQuestions: Question[] = filteredQuestions.slice(0, 10).map(q => ({
        id: q.id,
        question: q.question,
        options: Array.isArray(q.options) ? q.options : [],
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        difficulty: mapDifficulty(q.difficulty_level),
        topic: q.topic
      }));

      setQuestions(convertedQuestions);
      setSelectedAnswers(new Array(convertedQuestions.length).fill(null));
    }
  }, [dbQuestions, topic]);

  const mapDifficulty = (level: string): 'Fácil' | 'Médio' | 'Difícil' => {
    switch (level.toLowerCase()) {
      case 'easy': return 'Fácil';
      case 'hard': return 'Difícil';
      default: return 'Médio';
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (!isCorrect) {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      
      if (newHearts <= 0) {
        setGameOver(true);
        toast({
          title: "Game Over!",
          description: "Você perdeu todos os corações. Tente novamente!",
          variant: "destructive"
        });
        return;
      }
    }

    // Record the question activity
    await recordQuizQuestion(
      subject,
      currentQuestion.topic || 'Geral',
      currentQuestion.id,
      answerIndex,
      currentQuestion.correctAnswer,
      5 // approximate time per question
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = async () => {
    const finalTimeSpent = Math.floor((Date.now() - startTime) / 1000);
    setTimeSpent(finalTimeSpent);
    
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === questions[index]?.correctAnswer ? count + 1 : count;
    }, 0);
    
    const finalScore = correctAnswers * 10;
    setScore(finalScore);
    setShowResults(true);

    // Save quiz score
    await saveQuizScore(subject, finalScore, questions.length, finalTimeSpent);
    
    // Call onComplete if provided
    if (onComplete) {
      onComplete();
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setScore(0);
    setTimeSpent(0);
    setHearts(3);
    setGameOver(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Quiz de {subject}</h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando questões...</p>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Quiz de {subject}</h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Nenhuma questão disponível para esta matéria.</p>
            <Button onClick={onBack}>Voltar</Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        subject={subject}
        onBack={onBack}
        restartQuiz={restartQuiz}
      />
    );
  }

  if (gameOver) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Game Over</h1>
          <div className="w-10" />
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold mb-4">Você perdeu todos os corações!</h2>
            <p className="text-gray-600 mb-6">Não desanime, tente novamente e conquiste sua vitória!</p>
            <div className="space-y-3">
              <Button onClick={restartQuiz} className="w-full">
                Tentar Novamente
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full">
                Voltar ao Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Heart className="text-red-500" size={20} />
            <span className="font-semibold">{hearts}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="text-yellow-500" size={20} />
            <span className="font-semibold">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-white">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Questão {currentQuestionIndex + 1} de {questions.length}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          <QuizQuestion
            question={{
              question: currentQuestion.question,
              options: currentQuestion.options,
              correctAnswer: currentQuestion.correctAnswer,
              difficulty: currentQuestion.difficulty
            }}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            showResult={false}
            onAnswerSelect={handleAnswerSelect}
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 bg-white border-t">
        <div className="flex justify-between max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === null}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubjectQuiz;
