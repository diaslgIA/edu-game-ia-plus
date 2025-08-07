
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Target, Clock } from 'lucide-react';

interface QuizResultsProps {
  subject: string;
  score: number;
  totalQuestions: number;
  saving: boolean;
  onBack: () => void;
  hasLimitedQuestions?: boolean;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  subject,
  score,
  totalQuestions,
  saving,
  onBack,
  hasLimitedQuestions = false
}) => {
  const maxPossibleScore = totalQuestions * 10;
  const percentage = Math.round((score / maxPossibleScore) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Excelente! Você domina esta matéria!", icon: "🏆", color: "text-yellow-600" };
    if (percentage >= 70) return { message: "Muito bom! Continue praticando!", icon: "🌟", color: "text-green-600" };
    if (percentage >= 50) return { message: "Bom trabalho! Há espaço para melhoria.", icon: "👍", color: "text-blue-600" };
    return { message: "Continue estudando! A prática leva à perfeição.", icon: "📚", color: "text-orange-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="font-pixel bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-4 border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center min-h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="text-6xl mb-4">{performance.icon}</div>
        <h2 className="text-2xl font-bold mb-2">Quiz Finalizado!</h2>
        <h3 className="text-lg text-gray-600 dark:text-gray-400">{subject}</h3>
      </div>

      {/* Limited Questions Warning */}
      {hasLimitedQuestions && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6">
          <div className="text-yellow-800 dark:text-yellow-200">
            <p className="font-bold text-sm mb-1">⚠️ Versão Prévia</p>
            <p className="text-xs">
              Esta matéria possui conteúdo limitado. Mais questões serão adicionadas em atualizações futuras!
            </p>
          </div>
        </div>
      )}

      {/* Score Display */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-6 mb-6">
        <div className="flex justify-center items-center mb-4">
          <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">de {maxPossibleScore} pontos</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="text-2xl font-bold mb-2">{percentage}%</div>
      </div>

      {/* Performance Message */}
      <div className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6">
        <p className={`text-lg font-bold mb-2 ${performance.color}`}>
          {performance.message}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-2 text-blue-500" />
            <span>{totalQuestions} questões</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            <span>{Math.round(score / totalQuestions * 10)/10} pts/questão</span>
          </div>
        </div>
      </div>

      {/* Saving Status */}
      {saving && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-3 mb-4">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            💾 Salvando seu progresso...
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto pt-4">
        <Button 
          onClick={onBack}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 border-2 border-b-4 border-r-4 border-green-700 active:border-b-2 active:border-r-2"
        >
          Voltar aos Exercícios
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
