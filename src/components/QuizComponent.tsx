
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useTopicContent } from '@/hooks/useContentLoader';

const QuizComponent = () => {
  const navigate = useNavigate();
  const { topicId } = useParams<{ topicId: string }>();
  const { data: topic } = useTopicContent(topicId || null);
  
  // Determina a matéria baseada no tópico ou usa fallback
  const subjectName = topic ? extractSubjectFromTopic(topic) : 'História';
  const { questions, loading, getQuestionsByTheme, getRandomQuestions } = useSubjectQuestions(subjectName);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  // Função para extrair matéria do nome do tópico
  function extractSubjectFromTopic(topic: any): string {
    if (topic.name?.includes('História') || topic.name?.includes('Brasil')) return 'História';
    if (topic.name?.includes('Matemática') || topic.name?.includes('Álgebra')) return 'Matemática';
    if (topic.name?.includes('Português') || topic.name?.includes('Literatura')) return 'Português';
    if (topic.name?.includes('Física') || topic.name?.includes('Newton')) return 'Física';
    if (topic.name?.includes('Química') || topic.name?.includes('Átomo')) return 'Química';
    if (topic.name?.includes('Biologia') || topic.name?.includes('Célula')) return 'Biologia';
    if (topic.name?.includes('Geografia') || topic.name?.includes('Clima')) return 'Geografia';
    if (topic.name?.includes('Filosofia') || topic.name?.includes('Sócrates')) return 'Filosofia';
    if (topic.name?.includes('Sociologia') || topic.name?.includes('Social')) return 'Sociologia';
    return 'História'; // Fallback padrão
  }

  useEffect(() => {
    if (!loading && questions.length > 0) {
      // Tenta pegar questões do tema específico ou questões aleatórias
      const themeQuestions = topic ? getQuestionsByTheme(topic.name) : [];
      const selectedQuestions = themeQuestions.length > 0 
        ? themeQuestions.slice(0, 5) 
        : getRandomQuestions(5);
      
      console.log('Questões selecionadas para o quiz:', selectedQuestions);
      setQuizQuestions(selectedQuestions);
    }
  }, [loading, questions, topic]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion?.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz finalizado
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (loading) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Carregando Quiz...</h1>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Quiz</h1>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center text-white/80 h-64 p-6">
            <h2 className="text-lg font-semibold mb-2">Nenhuma questão disponível</h2>
            <p className="text-sm">Não há questões disponíveis para este tópico no momento.</p>
            <Button 
              onClick={() => navigate(-1)}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              Voltar
            </Button>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  if (showResult) {
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full pb-20">
          <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)} 
              className="text-white p-2 hover:bg-white/20 rounded-xl"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold">Resultado do Quiz</h1>
          </div>
          
          <div className="p-6 flex-1 flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-white/15 backdrop-blur-md border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">
                  {score === quizQuestions.length ? '🎉' : score >= quizQuestions.length / 2 ? '👍' : '📚'}
                </CardTitle>
                <div className="text-white">
                  <h2 className="text-xl font-bold">Quiz Concluído!</h2>
                  <p className="text-lg mt-2">
                    Você acertou {score} de {quizQuestions.length} questões
                  </p>
                  <div className="text-3xl font-bold mt-2">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleRestartQuiz}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Refazer Quiz
                </Button>
                <Button 
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full text-white border-white/30 hover:bg-white/10"
                >
                  Voltar ao Conteúdo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Quiz: {topic?.name || 'Questões Gerais'}</h1>
            <p className="text-xs text-white/80">
              Questão {currentQuestionIndex + 1} de {quizQuestions.length}
            </p>
          </div>
        </div>
        
        <div className="p-6 flex-1">
          <div className="mb-6">
            <Progress 
              value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} 
              className="h-2 bg-white/20"
            />
          </div>

          <Card className="bg-white/15 backdrop-blur-md border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                {currentQuestion?.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion?.options?.map((option: string, index: number) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto whitespace-normal ${
                    selectedAnswer === index 
                      ? 'bg-primary text-white' 
                      : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                  }`}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)})</span>
                  {option}
                </Button>
              ))}
            </CardContent>
          </Card>

          {selectedAnswer !== null && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${
                selectedAnswer === currentQuestion?.correct_answer 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : 'bg-red-500/20 border border-red-500/30'
              }`}>
                <div className="flex items-center space-x-2 text-white">
                  {selectedAnswer === currentQuestion?.correct_answer ? (
                    <>
                      <CheckCircle size={20} className="text-green-400" />
                      <span>Resposta correta!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} className="text-red-400" />
                      <span>Resposta incorreta. A resposta correta é: {String.fromCharCode(65 + currentQuestion?.correct_answer)}</span>
                    </>
                  )}
                </div>
                {currentQuestion?.explanation && (
                  <p className="text-white/80 text-sm mt-2">{currentQuestion.explanation}</p>
                )}
              </div>

              <Button 
                onClick={handleNextQuestion}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {currentQuestionIndex + 1 < quizQuestions.length ? 'Próxima Questão' : 'Finalizar Quiz'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default QuizComponent;
