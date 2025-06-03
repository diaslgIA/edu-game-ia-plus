
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <>
      {/* Pergunta */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex-1">{question.question}</h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            question.difficulty === 'Fácil' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
            question.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Opções de Resposta */}
      <div className="space-y-3 mb-6">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
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
    </>
  );
};

export default QuizQuestion;
