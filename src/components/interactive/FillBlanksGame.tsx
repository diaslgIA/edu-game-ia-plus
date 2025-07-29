
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle } from 'lucide-react';

interface BlankQuestion {
  id: string;
  text: string;
  blanks: { position: number; answer: string; alternatives?: string[] }[];
}

interface FillBlanksGameProps {
  questions: BlankQuestion[];
  onComplete: (score: number, timeSpent: number) => void;
  title: string;
}

const FillBlanksGame: React.FC<FillBlanksGameProps> = ({ 
  questions, 
  onComplete,
  title 
}) => {
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  const handleAnswerChange = (questionId: string, blankIndex: number, value: string) => {
    const key = `${questionId}-${blankIndex}`;
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    let totalBlanks = 0;

    questions.forEach(question => {
      question.blanks.forEach((blank, index) => {
        totalBlanks++;
        const key = `${question.id}-${index}`;
        const userAnswer = answers[key]?.toLowerCase().trim() || '';
        
        // Verifica se a resposta está correta (incluindo alternativas)
        const correctAnswers = [blank.answer, ...(blank.alternatives || [])];
        if (correctAnswers.some(answer => answer.toLowerCase() === userAnswer)) {
          correctCount++;
        }
      });
    });

    const newScore = correctCount * 10;
    setScore(newScore);
    setShowResults(true);
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    setTimeout(() => onComplete(newScore, timeSpent), 3000);
  };

  const isAnswerCorrect = (questionId: string, blankIndex: number) => {
    const key = `${questionId}-${blankIndex}`;
    const userAnswer = answers[key]?.toLowerCase().trim() || '';
    const question = questions.find(q => q.id === questionId);
    const blank = question?.blanks[blankIndex];
    
    if (!blank) return false;
    
    const correctAnswers = [blank.answer, ...(blank.alternatives || [])];
    return correctAnswers.some(answer => answer.toLowerCase() === userAnswer);
  };

  const renderTextWithBlanks = (question: BlankQuestion) => {
    const parts = question.text.split('____');
    
    return (
      <div className="text-lg leading-relaxed">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < question.blanks.length && (
              <span className="inline-block mx-2">
                <Input
                  value={answers[`${question.id}-${index}`] || ''}
                  onChange={(e) => handleAnswerChange(question.id, index, e.target.value)}
                  className={`w-32 text-center inline-block ${
                    showResults 
                      ? isAnswerCorrect(question.id, index)
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-white border-gray-300'
                  }`}
                  disabled={showResults}
                  placeholder="____"
                />
                {showResults && (
                  <span className="ml-2 inline-block">
                    {isAnswerCorrect(question.id, index) ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )}
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>
    );
  };

  const totalBlanks = questions.reduce((total, q) => total + q.blanks.length, 0);
  const filledBlanks = Object.values(answers).filter(answer => answer.trim()).length;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">
          Preencha as lacunas com as palavras corretas
        </p>
        <div className="text-white font-bold">
          Pontos: {score} | Progresso: {filledBlanks}/{totalBlanks}
        </div>
      </div>

      <div className="space-y-6">
        {questions.map(question => (
          <div key={question.id} className="bg-white/10 rounded-xl p-4">
            {renderTextWithBlanks(question)}
          </div>
        ))}
      </div>

      {showResults && (
        <div className="mt-6 p-4 bg-white/10 rounded-xl">
          <h4 className="text-white font-bold mb-3">Respostas Corretas:</h4>
          {questions.map(question => (
            <div key={`answers-${question.id}`} className="mb-2">
              {question.blanks.map((blank, index) => (
                <div key={index} className="text-white/80 text-sm">
                  Lacuna {index + 1}: <span className="font-semibold text-white">{blank.answer}</span>
                  {blank.alternatives && (
                    <span className="text-white/60"> (ou: {blank.alternatives.join(', ')})</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        {!showResults ? (
          <Button 
            onClick={checkAnswers}
            disabled={filledBlanks < totalBlanks}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
          >
            Verificar Respostas
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-white text-lg">
              Você acertou {score / 10} de {totalBlanks} lacunas! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillBlanksGame;
