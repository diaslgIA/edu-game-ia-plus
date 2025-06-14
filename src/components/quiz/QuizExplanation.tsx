
import React from 'react';

interface QuizExplanationProps {
  explanation: string;
  isCorrect: boolean;
}

const QuizExplanation: React.FC<QuizExplanationProps> = ({ explanation, isCorrect }) => {
  return (
    <div className="bg-gray-800 p-4 mb-6 border-2 border-blue-500">
      <h4 className="font-semibold text-blue-300 mb-2">
        {isCorrect ? '🎉 Correto!' : '📚 Explicacao:'}
      </h4>
      <p className="text-blue-200 text-sm leading-snug">{explanation}</p>
    </div>
  );
};

export default QuizExplanation;
