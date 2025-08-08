
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizOption {
  id: string;
  option_text: string;
  is_correct: boolean;
  feedback_image_url?: string;
  option_order: number;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  image_url?: string;
  difficulty_level: string;
  topic?: string;
  explanation?: string;
  options: QuizOption[];
}

interface DynamicQuizQuestionProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
}

const DynamicQuizQuestion: React.FC<DynamicQuizQuestionProps> = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect
}) => {
  const correctAnswerIndex = question.options.findIndex(option => option.is_correct);
  const isCorrect = selectedAnswer === correctAnswerIndex;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
      case 'fácil':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard':
      case 'difícil':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    const difficultyMap: { [key: string]: string } = {
      'easy': 'Fácil',
      'medium': 'Médio', 
      'hard': 'Difícil',
      'fácil': 'Fácil',
      'médio': 'Médio',
      'difícil': 'Difícil'
    };
    return difficultyMap[difficulty.toLowerCase()] || difficulty;
  };

  return (
    <>
      {/* Pergunta */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white flex-1">
            {question.question_text}
          </h3>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty_level)}`}>
            {getDifficultyLabel(question.difficulty_level)}
          </span>
        </div>
        
        {/* Imagem da pergunta, se houver */}
        {question.image_url && (
          <div className="mb-4">
            <img 
              src={question.image_url} 
              alt="Imagem da pergunta" 
              className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-600"
            />
          </div>
        )}
      </div>

      {/* Opções de Resposta */}
      <div className="space-y-3 mb-6">
        {question.options.map((option: QuizOption, index: number) => (
          <button
            key={option.id}
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
                : showResult && index === correctAnswerIndex
                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option.option_text}</span>
              {showResult && (
                <>
                  {index === correctAnswerIndex && <CheckCircle className="text-green-500" size={20} />}
                  {selectedAnswer === index && selectedAnswer !== correctAnswerIndex && <XCircle className="text-red-500" size={20} />}
                </>
              )}
            </div>
            
            {/* Imagem de feedback da opção */}
            {showResult && selectedAnswer === index && option.feedback_image_url && (
              <div className="mt-2">
                <img 
                  src={option.feedback_image_url} 
                  alt="Feedback da resposta" 
                  className="max-w-full h-auto rounded border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default DynamicQuizQuestion;
