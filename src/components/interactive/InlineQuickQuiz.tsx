
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Target } from 'lucide-react';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface InlineQuickQuizProps {
  question: string;
  options: QuizOption[];
  onComplete: (correct: boolean) => void;
}

const InlineQuickQuiz: React.FC<InlineQuickQuizProps> = ({ question, options, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setShowResult(true);
    const isCorrect = options[selectedOption].isCorrect;
    
    setTimeout(() => {
      setAnswered(true);
      onComplete(isCorrect);
    }, 2000);
  };

  if (answered) {
    return (
      <Card className="p-4 bg-green-50 border-green-200 mb-4">
        <div className="text-center">
          <CheckCircle className="mx-auto mb-2 text-green-500" size={24} />
          <p className="text-green-700 font-medium">Quiz concluído!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-purple-50 border-purple-200 mb-4">
      <div className="text-center mb-4">
        <Target className="mx-auto mb-2 text-purple-500" size={24} />
        <h4 className="font-semibold text-gray-800">⚡ Quiz Rápido</h4>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-800 font-medium text-lg mb-4">{question}</p>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                selectedOption === index
                  ? showResult
                    ? option.isCorrect
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : 'border-red-500 bg-red-100 text-red-800'
                    : 'border-purple-500 bg-purple-100'
                  : showResult && option.isCorrect
                  ? 'border-green-500 bg-green-100 text-green-800'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {showResult && (
                  <>
                    {option.isCorrect && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                    {selectedOption === index && !option.isCorrect && (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        {!showResult ? (
          <Button 
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
          >
            Responder
          </Button>
        ) : (
          <div className="text-lg font-medium">
            {options[selectedOption!]?.isCorrect ? (
              <span className="text-green-600">🎉 Correto! +10 pontos</span>
            ) : (
              <span className="text-red-600">❌ Incorreto. Continue estudando!</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default InlineQuickQuiz;
