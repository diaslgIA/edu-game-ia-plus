
import React from 'react';

interface QuizPedroTeixeiraFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  points: number;
  affinityLevel: number;
  affinityProgress: number;
}

const QuizPedroTeixeiraFeedback: React.FC<QuizPedroTeixeiraFeedbackProps> = ({
  isCorrect,
  explanation,
  points,
  affinityLevel,
  affinityProgress
}) => {
  return (
    <div className="font-pixel space-y-4">
      {/* Cabeçalho de Resultado */}
      <div className="text-center">
        <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
          {isCorrect ? 'Muito bem!' : 'Quase lá!'}
        </h3>
      </div>

      {/* Linha com Personagem + Balão de Fala */}
      <div className="flex items-start space-x-4 bg-white/10 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Imagem do Pedro Teixeira */}
        <div className="flex-shrink-0 w-20 h-24">
          <img
            src={isCorrect ? "/lovable-uploads/4a6ab076-c5a3-4e8d-88e1-247c45c5c7b8.png" : "/lovable-uploads/839f35ec-89e3-4693-ba7d-ad97d81aa349.png"}
            alt={`Pedro Teixeira ${isCorrect ? 'contente' : 'preocupado'}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Balão de Fala */}
        <div className="flex-1 bg-white dark:bg-gray-100 p-3 rounded-2xl border-2 border-emerald-500 relative">
          {/* Seta do balão */}
          <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-emerald-500 -translate-x-2"></div>
          <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white dark:border-r-gray-100 -translate-x-1"></div>
          
          <p className="text-gray-800 dark:text-gray-800 text-sm leading-relaxed font-medium">
            {isCorrect 
              ? "Ótimo avanço! Você está navegando com precisão."
              : "Todo grande explorador enfrenta obstáculos. Vamos traçar esse caminho juntos."
            }
          </p>
        </div>
      </div>

      {/* Bloco de Explicação Técnica */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border-l-4 border-emerald-500">
        <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center">
          <span className="mr-2">🗺️</span>
          Conhecimento Geográfico
        </h4>
        <p className="text-emerald-800 dark:text-emerald-200 text-sm leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Bloco de Recompensa */}
      <div className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 p-4 rounded-xl border border-emerald-300 dark:border-emerald-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">
              +{points} XP
            </span>
          </div>
          <div className="text-right">
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              Afinidade com Pedro Teixeira: Nível {affinityLevel}
            </p>
          </div>
        </div>

        {/* Barra de Progresso de Afinidade */}
        <div className="w-full bg-emerald-200 dark:bg-emerald-800 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1"
            style={{ width: `${affinityProgress}%` }}
          >
            <span className="text-white text-xs font-bold">
              {affinityProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPedroTeixeiraFeedback;
