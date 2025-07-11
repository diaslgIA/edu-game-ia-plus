import React from 'react';

interface QuizEinsteinFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  xpGained: number;
  isVisible: boolean;
}

const QuizEinsteinFeedback: React.FC<QuizEinsteinFeedbackProps> = ({
  isCorrect,
  explanation,
  xpGained,
  isVisible
}) => {
  if (!isVisible) return null;

  const resultHeader = isCorrect ? "Muito bem!" : "Quase lá!";
  const einsteinImage = isCorrect ? "/lovable-uploads/7cf9ca74-de32-4ea9-8e98-263028a031a9.png" : "/lovable-uploads/b7a051d0-0ee4-4b95-9f61-a7004c276894.png";
  const speechText = isCorrect 
    ? "Relativamente brilhante! Sua imaginação acabou de desvendar uma lei do universo."
    : "Não desista! Toda mente brilhante erra antes de entender como o mundo funciona.";

  const headerColor = isCorrect ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400";
  const headerIcon = isCorrect ? "✓" : "⚠";

  return (
    <div className="font-pixel bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-4">
      {/* 1. Cabeçalho de Resultado */}
      <div className="text-center">
        <div className={`text-2xl font-bold ${headerColor} flex items-center justify-center gap-2`}>
          <span className="text-3xl">{headerIcon}</span>
          {resultHeader}
        </div>
      </div>

      {/* 2. Linha com Personagem + Balão de Fala */}
      <div className="flex items-center gap-4">
        {/* Imagem do Einstein */}
        <div className="w-28 h-28 flex-shrink-0 p-1">
          <img 
            src={einsteinImage} 
            alt="Einstein" 
            className="w-full h-full object-cover pixel-art"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* Balão de Fala */}
        <div className="flex-1 relative">
          <div className="bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 rounded-lg p-3 shadow-lg relative">
            {/* Pontinha do balão */}
            <div className="absolute left-0 top-4 transform -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-white dark:border-r-gray-700"></div>
            
            <div className="text-sm">
              <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                Einstein diz:
              </div>
              <div className="text-gray-700 dark:text-gray-300 italic">
                "{speechText}"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bloco de Explicação Técnica */}
      <div className="bg-white dark:bg-gray-700 border-2 border-blue-300 dark:border-blue-600 rounded-lg p-3">
        <div className="font-bold text-blue-800 dark:text-blue-300 mb-2">
          Explicação:
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {explanation || "Explicação não disponível."}
        </div>
      </div>

      {/* 4. Bloco de Recompensa */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-2 border-purple-400 dark:border-purple-600 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-bold text-purple-800 dark:text-purple-300">
              +{xpGained} XP
            </span>
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-400">
            Afinidade com Einstein: Nível 2
          </div>
        </div>
        
        {/* Barra de progresso de afinidade */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: '55%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEinsteinFeedback;