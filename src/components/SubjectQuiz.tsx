import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, CheckCircle, XCircle, Trophy, Star } from 'lucide-react';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { toast } from '@/components/ui/use-toast';
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
  const { questions, loading, getQuestionsByTopic, getRandomQuestions } = useSubjectQuestions(subjectVariants);

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (topic) {
      const topicQuestions = getQuestionsByTopic(topic);
      setQuizQuestions(topicQuestions);
    } else {
      const randomQuestions = getRandomQuestions(10);
      setQuizQuestions(randomQuestions);
    }
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
  }, [subject, topic, questions, getQuestionsByTopic, getRandomQuestions]);

  const handleAnswer = (answerIndex: number) => {
    setUserAnswers([...userAnswers, answerIndex]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      showResultsAndCalculateScore();
    }
  };

  const showResultsAndCalculateScore = () => {
    setShowResults(true);
    let correctAnswersCount = 0;
    quizQuestions.forEach((question, index) => {
      if (question.correct_answer === userAnswers[index]) {
        correctAnswersCount++;
      }
    });
    setScore(correctAnswersCount);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);

    if (topic) {
      const topicQuestions = getQuestionsByTopic(topic);
      setQuizQuestions(topicQuestions);
    } else {
      const randomQuestions = getRandomQuestions(10);
      setQuizQuestions(randomQuestions);
    }
  };

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
          {loading ? (
            <div className="text-white text-center py-8">Carregando quiz...</div>
          ) : quizQuestions.length === 0 ? (
            <div className="text-white text-center py-8">
              <Target size={48} className="mx-auto mb-4 opacity-50" />
              <p>Nenhuma questão disponível para este tópico.</p>
            </div>
          ) : showResults ? (
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
                    <h3 className="font-semibold text-white">{question.question}</h3>
                    <p className="text-white/60 mt-2">
                      Resposta correta: {question.options[question.correct_answer]}
                    </p>
                    {userAnswers[index] !== question.correct_answer && (
                      <p className="text-red-400">
                        Sua resposta: {question.options[userAnswers[index]]}
                      </p>
                    )}
                    <p className="text-blue-300 mt-2">{question.explanation}</p>
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
                  {quizQuestions[currentQuestionIndex].question}
                </h2>
                <div className="space-y-4">
                  {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant="outline"
                      className="w-full justify-start text-white"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNextQuestion}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
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
