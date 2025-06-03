
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

interface QuizResultsProps {
  subject: string;
  score: number;
  totalQuestions: number;
  saving: boolean;
  onBack: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  subject, 
  score, 
  totalQuestions, 
  saving, 
  onBack 
}) => {
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
      <Trophy className="mx-auto mb-4 text-yellow-500" size={64} />
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Quiz de {subject} Concluído!
      </h3>
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-4 mb-6">
        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{score} pontos</div>
        <div className="text-lg text-orange-700 dark:text-orange-300">{percentage}% de acertos em {subject}</div>
        <div className="text-sm text-orange-600 dark:text-orange-400 mt-2">
          {saving ? 'Salvando pontos...' : 'Pontos salvos na sua conta!'}
        </div>
      </div>
      
      {/* Informações adicionais sobre desempenho */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}/{totalQuestions * 10}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Pontuação</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(score / 10)}/{totalQuestions}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Acertos</div>
        </div>
      </div>
      
      <Button 
        onClick={onBack}
        className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
      >
        Voltar aos Exercícios
      </Button>
    </div>
  );
};

export default QuizResults;
