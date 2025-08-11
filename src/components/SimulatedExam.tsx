
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertTriangle, CheckCircle, XCircle, Trophy, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useSound } from '@/contexts/SoundContext';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { getAllSubjectsQuestions, generateQuestionsFromContent } from '@/utils/generateQuestionsFromContent';
import { getSubjectEmoji, getSubjectStyle, getSubjectDisplayName } from '@/data/subjectLogos';
import QuizMentorFeedback from '@/components/quiz/QuizMentorFeedback';

interface SimulatedExamProps {
  subject: string;
  duration: number;
  questionCount?: number;
  onComplete: (score: number, timeSpent: number) => void;
  isEnemMode?: boolean;
}

const SimulatedExam: React.FC<SimulatedExamProps> = ({ 
  subject, 
  duration, 
  questionCount = 10, 
  onComplete,
  isEnemMode = false
}) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [finalTimeSpent, setFinalTimeSpent] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const { saveQuizScore } = useQuizScore();
  const { playSound } = useSound();
  
  // Only load subject questions when NOT in ENEM mode
  const { questions: subjectQuestions, loading: subjectLoading } = useSubjectQuestions(isEnemMode ? '' : subject);

  // Helper function to format options properly
  const formatOptions = (options: any): string[] => {
    if (Array.isArray(options)) {
      return options.filter(opt => opt && opt.length > 0);
    }
    
    if (options && typeof options === 'object') {
      return [
        options.a || '',
        options.b || '',
        options.c || '',
        options.d || ''
      ].filter(opt => opt.length > 0);
    }
    
    return [];
  };

  // Stable function to load questions
  const loadQuestions = useCallback(async () => {
    if (selectedQuestions.length > 0) return; // Prevent reloading if already loaded
    
    setLoading(true);
    setLoadingError('');
    
    try {
      if (isEnemMode) {
        // ENEM mode - get questions from all subjects
        console.log('Loading ENEM questions...');
        const questions = await getAllSubjectsQuestions(questionCount);
        
        if (questions.length === 0) {
          setLoadingError('Não foi possível carregar questões multidisciplinares. Tente novamente.');
          return;
        }
        
        const formattedQuestions = questions.map(q => ({
          question: q.question,
          options: formatOptions(q.options),
          correctAnswer: q.correct_answer,
          subject: q.subject || 'Multidisciplinar',
          explanation: q.explanation || '',
          topic: q.topic || ''
        }));
        setSelectedQuestions(formattedQuestions);
      } else {
        // Subject specific mode - always target 10 questions
        const targetCount = 10;
        console.log(`Loading ${targetCount} questions for subject:`, subject);
        
        let finalQuestions = [];
        
        // First try to use existing subject questions
        if (subjectQuestions.length > 0) {
          console.log(`Found ${subjectQuestions.length} questions in database for ${subject}`);
          const availableCount = Math.min(targetCount, subjectQuestions.length);
          const shuffled = [...subjectQuestions].sort(() => Math.random() - 0.5);
          const selected = shuffled.slice(0, availableCount);
          
          finalQuestions = selected.map(q => ({
            question: q.question,
            options: formatOptions(q.options),
            correctAnswer: q.correct_answer,
            subject: q.subject || subject,
            explanation: q.explanation || '',
            topic: q.topic || ''
          }));
          
          // If we have fewer than target, generate more from content
          if (finalQuestions.length < targetCount) {
            console.log(`Need ${targetCount - finalQuestions.length} more questions, generating from content...`);
            const generatedQuestions = await generateQuestionsFromContent(subject, targetCount - finalQuestions.length);
            
            const formattedGenerated = generatedQuestions.map(q => ({
              question: q.question,
              options: formatOptions(q.options),
              correctAnswer: q.correct_answer,
              subject: q.subject || subject,
              explanation: q.explanation || '',
              topic: q.topic || ''
            }));
            
            finalQuestions = [...finalQuestions, ...formattedGenerated];
            console.log(`Final mix: ${selected.length} from DB + ${formattedGenerated.length} generated = ${finalQuestions.length} total`);
          }
        } else {
          // No database questions, generate all from content
          console.log('No database questions found, generating all from content...');
          const generatedQuestions = await generateQuestionsFromContent(subject, targetCount);
          
          finalQuestions = generatedQuestions.map(q => ({
            question: q.question,
            options: formatOptions(q.options),
            correctAnswer: q.correct_answer,
            subject: q.subject || subject,
            explanation: q.explanation || '',
            topic: q.topic || ''
          }));
          
          console.log(`Generated ${finalQuestions.length} questions from content`);
        }
        
        if (finalQuestions.length === 0) {
          setLoadingError(`Não foi possível carregar questões de ${subject}. Tente outra matéria.`);
          return;
        }
        
        // Always ensure we have exactly targetCount questions (even if we have to repeat some)
        while (finalQuestions.length < targetCount && finalQuestions.length > 0) {
          const questionsToAdd = Math.min(targetCount - finalQuestions.length, finalQuestions.length);
          const additionalQuestions = finalQuestions.slice(0, questionsToAdd);
          finalQuestions = [...finalQuestions, ...additionalQuestions];
        }
        
        setSelectedQuestions(finalQuestions.slice(0, targetCount));
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      setLoadingError('Erro ao carregar questões. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [isEnemMode, questionCount, subject, subjectQuestions, selectedQuestions.length]);

  // Load questions when component mounts or dependencies change
  useEffect(() => {
    if (isEnemMode || !subjectLoading) {
      loadQuestions();
    }
  }, [isEnemMode, subjectLoading, loadQuestions]);

  useEffect(() => {
    if (isStarted && timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft, isFinished]);

  const startExam = () => {
    setIsStarted(true);
    playSound('click');
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    playSound('click');
  };

  const confirmAnswer = () => {
    setHasConfirmed(true);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setHasConfirmed(false);
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(current => current + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = async () => {
    setIsFinished(true);
    
    let finalScore = 0;
    selectedQuestions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        finalScore += 10;
      }
    });
    
    setScore(finalScore);
    const timeSpent = (duration * 60) - timeLeft;
    setFinalTimeSpent(timeSpent);
    
    const examName = isEnemMode ? 'Simulado ENEM' : `Simulado ${getSubjectDisplayName(subject)}`;
    await saveQuizScore(examName, finalScore, selectedQuestions.length, timeSpent);
    playSound('success');
  };

  const handleBackToExercises = () => {
    onComplete(score, finalTimeSpent);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 p-4 flex items-center justify-center z-50">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Preparando seu simulado...</h3>
                <p className="text-gray-600">
                  {isEnemMode 
                    ? `Selecionando ${questionCount} questões multidisciplinares` 
                    : `Carregando 10 questões de ${getSubjectDisplayName(subject)}`
                  }
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (loadingError) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 p-4 flex items-center justify-center z-50">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="text-red-500 mx-auto">
                <XCircle size={64} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Oops! Algo deu errado</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{loadingError}</p>
                <Button 
                  onClick={() => {
                    setLoadingError('');
                    setSelectedQuestions([]);
                    loadQuestions();
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Tentar Novamente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty questions state
  if (selectedQuestions.length === 0) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 p-4 flex items-center justify-center z-50">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="text-yellow-500 mx-auto">
                <AlertTriangle size={64} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">Nenhuma questão encontrada</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isEnemMode 
                    ? 'Não conseguimos encontrar questões multidisciplinares no momento.'
                    : `Não há questões disponíveis para ${getSubjectDisplayName(subject)} no momento.`
                  }
                </p>
                <Button 
                  onClick={() => onComplete(0, 0)}
                  className="w-full bg-gray-600 hover:bg-gray-700"
                >
                  Voltar aos Exercícios
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
  const timeProgress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  if (!isStarted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 p-4 flex items-center justify-center z-50">
        <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={() => onComplete(0, 0)}
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Voltar aos exercícios"
              >
                <ArrowLeft size={16} />
              </Button>
              <div className="flex-1" />
            </div>
            <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold">
              <Clock className="text-white" size={32} />
              {isEnemMode ? 'Simulado ENEM' : `Simulado ${getSubjectDisplayName(subject)}`}
            </CardTitle>
            <p className="text-blue-100 mt-2">
              {selectedQuestions.length} questões • {duration} minutos
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                <h3 className="font-bold text-blue-900 mb-6 text-lg">📋 Instruções do Simulado</h3>
                <div className="grid gap-4 text-left text-sm space-y-3">
                  <div className="flex items-center gap-3 text-blue-800">
                    <Clock size={18} className="text-blue-600 flex-shrink-0" />
                    <span><strong>Duração:</strong> {duration} minutos</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-800">
                    <BookOpen size={18} className="text-blue-600 flex-shrink-0" />
                    <span><strong>{selectedQuestions.length} questões</strong> {isEnemMode ? 'multidisciplinares' : `de ${getSubjectDisplayName(subject)}`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-800">
                    <Trophy size={18} className="text-blue-600 flex-shrink-0" />
                    <span><strong>Pontuação:</strong> 10 pontos por acerto</span>
                  </div>
                  <div className="flex items-center gap-3 text-orange-700">
                    <AlertTriangle size={18} className="text-orange-600 flex-shrink-0" />
                    <span>Não é possível voltar às questões anteriores</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-700">
                    <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                    <span>O simulado será finalizado automaticamente</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={startExam} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 text-lg font-semibold" 
                size="lg"
              >
                <Clock className="mr-2" size={24} />
                🚀 Iniciar Simulado
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / (selectedQuestions.length * 10)) * 100);
    const correctAnswers = answers.filter((answer, index) => answer === selectedQuestions[index]?.correctAnswer).length;
    const wrongAnswers = selectedQuestions.length - correctAnswers;
    
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 p-4 flex items-center justify-center z-50">
        <Card className="w-full max-w-md shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-600 text-white py-8">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold">
              <Trophy className="text-yellow-300" size={32} />
              🎉 Simulado Concluído!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200">
                <div className="text-5xl font-bold text-green-600 mb-3">{score} pontos</div>
                <div className="text-3xl text-blue-600 mb-6">{percentage}% de aproveitamento</div>
                <div className="text-gray-700 mb-4">
                  ⏱️ Tempo utilizado: <strong>{formatTime(finalTimeSpent)}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  {isEnemMode ? 'Simulado ENEM Multidisciplinar' : `Simulado de ${getSubjectDisplayName(subject)}`}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ✅ {correctAnswers}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Acertos</div>
                </div>
                <div className="text-center bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    ❌ {wrongAnswers}
                  </div>
                  <div className="text-sm text-red-700 font-medium">Erros</div>
                </div>
              </div>

              <Button 
                onClick={handleBackToExercises}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 text-lg font-semibold"
                size="lg"
              >
                <ArrowLeft className="mr-2" size={20} />
                Voltar aos Exercícios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = selectedQuestions[currentQuestion];
  const currentSubject = isEnemMode ? currentQ.subject : subject;
  const emoji = getSubjectEmoji(currentSubject);
  const subjectStyle = getSubjectStyle(currentSubject);
  const isCorrect = answers[currentQuestion] === currentQ.correctAnswer;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-purple-900 p-4 z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto min-h-full flex flex-col justify-center py-4">
        <Card className="shadow-2xl border-0 overflow-hidden bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => onComplete(0, 0)}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  aria-label="Voltar aos exercícios"
                >
                  <ArrowLeft size={16} />
                </Button>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                  📊 Questão {currentQuestion + 1} de {selectedQuestions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`${timeLeft < 60 ? 'text-red-300' : 'text-white'}`} size={20} />
                <span className={`font-mono text-lg font-bold ${timeLeft < 60 ? 'text-red-300' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-blue-100">
                <span>Progresso da prova</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-white/20" />
              <div className="flex justify-between text-xs text-blue-100">
                <span>Tempo decorrido</span>
                <span>{Math.round(timeProgress)}%</span>
              </div>
              <Progress value={timeProgress} className="h-2 bg-white/10" />
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 bg-blue-50 text-blue-800 px-4 py-3 rounded-full border border-blue-200">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                         style={{ backgroundColor: subjectStyle.backgroundColor }}>
                      <span className="text-lg">{emoji}</span>
                    </div>
                    <div className="text-sm font-semibold">
                      <span>{getSubjectDisplayName(currentSubject)}</span>
                      {currentQ.topic && (
                        <>
                          <span className="text-blue-600 mx-1">•</span>
                          <span className="text-blue-600">{currentQ.topic}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-8 leading-relaxed text-gray-800 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  {currentQ.question}
                </h3>
              </div>

              <div className="space-y-4">
                {currentQ.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={hasConfirmed}
                    className={`w-full p-6 text-left border-2 rounded-xl transition-all duration-200 ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                    } ${hasConfirmed ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center">
                      <span className={`font-bold text-lg mr-4 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        answers[currentQuestion] === index 
                          ? 'bg-blue-500 text-white shadow-md' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-800 leading-relaxed text-base">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Mentor Feedback with Explanation */}
              {showExplanation && answers[currentQuestion] !== undefined && (
                <div className="mt-6">
                  <QuizMentorFeedback
                    subject={currentSubject}
                    isCorrect={isCorrect}
                    explanation={currentQ.explanation || "Explicação não disponível no momento."}
                    xpGained={isCorrect ? 10 : 5}
                    isVisible={showExplanation}
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200">
                <div className="text-sm">
                  {answers[currentQuestion] !== undefined ? (
                    hasConfirmed ? (
                      <span className="text-green-600 font-semibold flex items-center gap-2">
                        <CheckCircle size={16} />
                        Resposta confirmada
                      </span>
                    ) : (
                      <span className="text-orange-600 font-semibold flex items-center gap-2">
                        <AlertTriangle size={16} />
                        Confirme sua resposta
                      </span>
                    )
                  ) : (
                    <span className="text-gray-500 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      Selecione uma resposta
                    </span>
                  )}
                </div>
                
                {!hasConfirmed ? (
                  <Button 
                    onClick={confirmAnswer} 
                    disabled={answers[currentQuestion] === undefined}
                    size="lg"
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-base font-semibold"
                  >
                    ✓ Confirmar Resposta
                  </Button>
                ) : (
                  <Button 
                    onClick={nextQuestion} 
                    size="lg"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base font-semibold"
                  >
                    {currentQuestion === selectedQuestions.length - 1 ? '🏁 Finalizar' : 'Próxima →'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulatedExam;
