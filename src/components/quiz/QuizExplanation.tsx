
import React from 'react';

interface QuizExplanationProps {
  explanation: string;
  isCorrect: boolean;
}

const QuizExplanation: React.FC<QuizExplanationProps> = ({ explanation, isCorrect }) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
        {isCorrect ? '🎉 Correto!' : '📚 Explicação:'}
      </h4>
      <p className="text-blue-700 dark:text-blue-300 text-sm">{explanation}</p>
    </div>
  );
};

export default QuizExplanation;
