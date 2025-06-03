
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Star, ArrowLeft } from 'lucide-react';

interface QuizIntroProps {
  subject: string;
  totalQuestions: number;
  onStart: () => void;
  onBack: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ subject, totalQuestions, onStart, onBack }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
      <div className="mb-6">
        <Trophy className="mx-auto mb-4 text-yellow-500" size={48} />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          Quiz de {subject}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Teste seus conhecimentos específicos em {subject}!
        </p>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Informações:</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• {totalQuestions} questões específicas de {subject}</li>
          <li>• 45 segundos por questão</li>
          <li>• 10 pontos por resposta correta</li>
          <li>• Explicações detalhadas</li>
          <li>• Pontos salvos automaticamente</li>
        </ul>
      </div>
      <div className="flex space-x-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2" size={16} />
          Voltar
        </Button>
        <Button 
          onClick={onStart}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
        >
          <Star className="mr-2" size={20} />
          Começar
        </Button>
      </div>
    </div>
  );
};

export default QuizIntro;
