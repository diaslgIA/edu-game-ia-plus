
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, CheckCircle, XCircle, Trophy, AlertCircle, RefreshCw } from 'lucide-react';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { toast } from '@/hooks/use-toast';
import MobileContainer from './MobileContainer';
import { getSubjectVariants } from '@/utils/subjectMapping';

interface SubjectQuizProps {
  subject: string;
  topic?: string;
  onBack: () => void;
  onComplete: () => void;
}

interface Question {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty_level: string;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, topic, onBack, onComplete }) => {
  const subjectVariants = getSubjectVariants(subject);
  const { questions, loading, error, getQuestionsByTopic, getRandomQuestions, retryLoad } = useSubjectQuestions(subjectVariants);

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (!loading && !error) {
      initializeQuiz();
    }
  }, [subject, topic, questions, loading, error]);

  const initializeQuiz = () => {
    let questionsToUse: Question[] = [];
    
    if (topic) {
      questionsToUse = getQuestionsByTopic(topic);
    } else {
      questionsToUse = getRandomQuestions(10);
    }
    
    setQuizQuestions(questionsToUse);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      showResultsAndCalculateScore(newAnswers);
    }
  };

  const showResultsAndCalculateScore = (answers: number[]) => {
    setShowResults(true);
    let correctAnswersCount = 0;
    quizQuestions.forEach((question, index) => {
      if (question.correct_answer === answers[index]) {
        correctAnswersCount++;
      }
    });
    setScore(correctAnswersCount);
  };

  const handleRestartQuiz = () => {
    initializeQuiz();
  };

  // Loading state
  if (loading) {
    return (
      <MobileContainer>
        <div className="h-full flex flex-col">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Carregando Quiz...</h1>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Preparando suas questões...</p>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // Error state
  if (error) {
    return (
      <MobileContainer>
        <div className="h-full flex flex-col">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Erro no Quiz</h1>
          </div>
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-white max-w-md">
              <AlertCircle size={64} className="mx-auto mb-4 text-red-400" />
              <h2 className="text-xl font-bold mb-4">Erro ao Carregar Questões</h2>
              <p className="mb-6 text-white/80">
                Não foi possível carregar as questões do quiz. Verifique sua conexão com a internet.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={retryLoad}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Tentar Novamente
                </Button>
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="w-full"
                >
                  Voltar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  // No questions state
  if (quizQuestions.length === 0) {
    return (
      <MobileContainer>
        <div className="h-full flex flex-col">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Quiz {topic ? `- ${topic}` : `de ${subject}`}</h1>
          </div>
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-white">
              <Target size={48} className="mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-bold mb-4">Nenhuma Questão Disponível</h2>
              <p className="mb-6 text-white/80">
                {topic 
                  ? `Não há questões disponíveis para o tópico "${topic}" ainda.`
                  : `Não há questões disponíveis para ${subject} ainda.`
                }
              </p>
              <Button onClick={onBack} variant="outline">
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <Target size={20} />
            <span>Quiz {topic ? `- ${topic}` : `de ${subject}`}</span>
          </h1>
          <div className="ml-auto text-sm">
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </div>
        </div>

        {/* Quiz Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showResults ? (
            <div className="space-y-6">
              <div className="text-center">
                <Trophy size={48} className="mx-auto text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">
                  Quiz Concluído!
                </h2>
                <p className="text-white/80">
                  Você acertou {score} de {quizQuestions.length} questões.
                </p>
              </div>

              <div className="space-y-4">
                {quizQuestions.map((question, index) => (
                  <div key={question.id} className="bg-white/10 rounded-2xl p-4">
                    <h3 className="font-semibold text-white mb-2">{question.question}</h3>
                    
                    {/* Show all options with indicators */}
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`p-2 rounded-lg text-sm ${
                            optionIndex === question.correct_answer 
                              ? 'bg-green-500/30 text-green-200 border border-green-400' 
                              : userAnswers[index] === optionIndex 
                              ? 'bg-red-500/30 text-red-200 border border-red-400'
                              : 'bg-white/5 text-white/60'
                          }`}
                        >
                          {optionIndex === question.correct_answer && (
                            <CheckCircle size={16} className="inline mr-2" />
                          )}
                          {userAnswers[index] === optionIndex && optionIndex !== question.correct_answer && (
                            <XCircle size={16} className="inline mr-2" />
                          )}
                          {option}
                        </div>
                      ))}
                    </div>
                    
                    {question.explanation && (
                      <p className="text-blue-300 text-sm mt-2 italic">
                        💡 {question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <Button onClick={handleRestartQuiz} variant="outline">
                  Reiniciar Quiz
                </Button>
                <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 text-white">
                  Concluir
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  {quizQuestions[currentQuestionIndex]?.question}
                </h2>
                <div className="space-y-3">
                  {quizQuestions[currentQuestionIndex]?.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className={`w-full justify-start text-left p-4 h-auto ${
                        selectedAnswer === index 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'text-white border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)})</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
              >
                {currentQuestionIndex === quizQuestions.length - 1 ? 'Ver Resultados' : 'Próxima Pergunta'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
};

export default SubjectQuiz;
