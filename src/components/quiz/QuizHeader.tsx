
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock } from 'lucide-react';

interface QuizHeaderProps {
  subject: string;
  topic: string;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  onBack: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  subject,
  topic,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onBack
}) => {
  return (
    <>
      {/* Header do Quiz */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white">
            <ArrowLeft size={16} />
          </Button>
          <span className="bg-blue-500 text-white px-3 py-1 text-xs font-medium truncate max-w-xs">
            {subject} - {topic}
          </span>
          <span className="text-gray-400 text-sm">
            {currentQuestion + 1}/{totalQuestions}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-yellow-400">
          <Clock size={18} />
          <span className="font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-gray-700 h-2 mb-6">
        <div 
          className="bg-blue-500 h-2 transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
    </>
  );
};

export default QuizHeader;
