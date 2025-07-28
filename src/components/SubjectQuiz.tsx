import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSubjectQuestions } from '@/hooks/useSubjectQuestions';
import { useQuizScore } from '@/hooks/useQuizScore';
import { useUserActivities } from '@/hooks/useUserActivities';
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
import { QuizFlorestenFeedback } from './quiz/QuizFlorestenFeedback';
import { QuizRuiBarbosaFeedback } from './quiz/QuizRuiBarbosaFeedback';
import { QuizZumbiFeedback } from './quiz/QuizZumbiFeedback';
import QuizMentorHint from './quiz/QuizMentorHint';
import ZumbiProfile from './ZumbiProfile';

interface SubjectQuizProps {
  subject: string;
  topic?: string;
  onComplete: (score: number, timeSpent: number) => void;
  onBack: () => void;
}

const SubjectQuiz: React.FC<SubjectQuizProps> = ({ subject, topic, onComplete, onBack }) => {
  const { questions, loading } = useSubjectQuestions(subject);
  const { saveQuizScore, saving } = useQuizScore();
  const { recordQuizQuestion, recordQuizComplete } = useUserActivities();
  const { playSound } = useSound();
  
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  // Estados dos mentores
  const [showMentorGuide, setShowMentorGuide] = useState(false);
  const [showMentorHint, setShowMentorHint] = useState(false);
  const [showMentorFeedback, setShowMentorFeedback] = useState(false);
  const [showMentorProfile, setShowMentorProfile] = useState(false);
  
  const [affinityLevel, setAffinityLevel] = useState(1);
  const [experience, setExperience] = useState(30);

  useEffect(() => {
    if (questions.length > 0) {
      console.log('Processando questões:', questions.length);
      
      let filteredQuestions = questions;
      if (topic) {
        filteredQuestions = questions.filter(q => q.topic === topic);
      }
      
      const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, Math.min(15, filteredQuestions.length));
      
      const formattedQuestions = selectedQuestions.map(q => {
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
        }
        
        const difficultyMap: { [key: string]: string } = {
          'easy': 'Fácil', 'medium': 'Médio', 'hard': 'Difícil',
          'facil': 'Fácil', 'medio': 'Médio', 'dificil': 'Difícil'
        };
        
        return {
          id: q.id,
          question: q.question,
          options: optionsArray,
          correctAnswer: q.correct_answer,
          explanation: q.explanation || "Explicação não disponível.",
          topic: q.topic || subject,
          difficulty: difficultyMap[q.difficulty_level?.toLowerCase()] || 'Médio'
        };
      });
      
      setQuizQuestions(formattedQuestions);
    }
  }, [questions, subject, topic]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmitAnswer();
    }
  }, [timeLeft, gameStarted, showResult, gameCompleted]);

  useEffect(() => {
    if (gameStarted && !showResult && quizQuestions.length > 0 && currentQuestion < quizQuestions.length) {
      const question = quizQuestions[currentQuestion];
      if (question.difficulty === 'Difícil' && timeLeft < 120) {
        setShowMentorGuide(true);
      }
    }
  }, [gameStarted, showResult, currentQuestion, timeLeft, quizQuestions]);

  const startGame = () => {
    setGameStarted(true);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setTimeLeft(180);
    if (playSound) playSound('click');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
      if (playSound) playSound('click');
    }
  };

  const handleSubmitAnswer = async () => {
    setShowResult(true);
    setShowMentorGuide(false);
    
    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const questionScore = isCorrect ? 10 : 0;
    const timeSpentOnQuestion = Math.round((Date.now() - questionStartTime) / 1000);
    
    // Registrar atividade da questão
    try {
      await recordQuizQuestion(
        subject,
        question.topic,
        question.id || `${subject}-${currentQuestion}`,
        selectedAnswer || -1,
        question.correctAnswer,
        timeSpentOnQuestion
      );
    } catch (error) {
      console.error('Erro ao registrar atividade da questão:', error);
    }
    
    if (isCorrect) {
      setScore(score + questionScore);
      setExperience(prev => Math.min(prev + 10, 100));
    } else {
      setExperience(prev => Math.min(prev + 3, 100));
    }
    
    if (experience >= 100) {
      setAffinityLevel(prev => prev + 1);
      setExperience(0);
    }
    
    setShowMentorFeedback(true);
  };

  const handleNextQuestion = async () => {
    setShowMentorFeedback(false);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(180);
      setQuestionStartTime(Date.now());
    } else {
      setGameCompleted(true);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const finalScore = score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 10 : 0);
      
      console.log('🎯 Finalizando quiz:', { subject, finalScore, timeSpent });
      
      try {
        // Registrar conclusão do quiz
        await recordQuizComplete(subject, finalScore, quizQuestions.length, timeSpent);
        
        // Salvar pontuação
        const saveSuccess = await saveQuizScore(subject, finalScore, quizQuestions.length, timeSpent);
        
        if (saveSuccess) {
          console.log('✅ Quiz finalizado com sucesso!');
          if (playSound) playSound('success');
        }
        
        onComplete(finalScore, timeSpent);
      } catch (error) {
        console.error('❌ Erro ao finalizar quiz:', error);
        // Mesmo com erro, finalizar o quiz
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

  const handleShowMentorProfile = () => {
    setShowMentorProfile(true);
  };

  const handleCloseMentorProfile = () => {
    setShowMentorProfile(false);
  };

  const handleStartQuizFromProfile = () => {
    setShowMentorProfile(false);
    setGameStarted(true);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setTimeLeft(180);
    if (playSound) playSound('click');
  };

  const handleStartQuizFromIntro = () => {
    if (subject.toLowerCase() === 'história') {
      handleShowMentorProfile();
    } else {
      startGame();
    }
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
    if (subject.toLowerCase() === 'história' && showMentorProfile) {
      return (
        <ZumbiProfile
          onClose={handleCloseMentorProfile}
          onStartQuiz={handleStartQuizFromProfile}
          affinityLevel={affinityLevel}
          experience={experience}
        />
      );
    }
    
    return (
      <QuizIntro 
        subject={subject}
        totalQuestions={quizQuestions.length}
        onStart={subject.toLowerCase() === 'história' ? handleShowMentorProfile : startGame}
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
      {showMentorGuide && (
        <QuizMentorGuide
          subject={subject}
          questionDifficulty={question.difficulty}
          isVisible={showMentorGuide}
          onClose={() => setShowMentorGuide(false)}
          onHintRequest={handleHintRequest}
        />
      )}

      {showMentorHint && (
        <QuizMentorHint
          subject={subject}
          hint={question.explanation || "Esta questão requer atenção aos detalhes. Analise cada opção cuidadosamente."}
          onUseHint={handleUseHint}
          onClose={() => setShowMentorHint(false)}
          isVisible={showMentorHint}
        />
      )}

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
            ) : subject.toLowerCase() === 'sociologia' ? (
              <QuizFlorestenFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                points={xpGained}
                affinityLevel={1}
                affinityProgress={25}
              />
            ) : subject.toLowerCase() === 'português' ? (
              <QuizRuiBarbosaFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                points={xpGained}
                affinityLevel={1}
                affinityProgress={40}
              />
            ) : subject.toLowerCase() === 'história' ? (
              <QuizZumbiFeedback
                isCorrect={isCorrect}
                explanation={question.explanation}
                points={xpGained}
                affinityLevel={1}
                affinityProgress={30}
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

        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border-2 border-blue-500 rounded-lg">
          <div className="text-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Pontos: </span>
            <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{score}</span>
          </div>
        </div>
      </div>

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
