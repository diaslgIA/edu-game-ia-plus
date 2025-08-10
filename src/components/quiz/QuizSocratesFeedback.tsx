
import React, { useState } from 'react';

interface QuizSocratesFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  xpGained: number;
  isVisible: boolean;
}

const QuizSocratesFeedback: React.FC<QuizSocratesFeedbackProps> = ({
  isCorrect,
  explanation,
  xpGained,
  isVisible
}) => {
  const [imageError, setImageError] = useState(false);
  
  if (!isVisible) return null;

  const resultHeader = isCorrect ? "Muito bem!" : "Quase lá!";
  const socratesImage = isCorrect ? "/lovable-uploads/02c04813-5216-4329-8348-a221cf04a6be.png" : "/lovable-uploads/7e09bac1-4151-4eec-9ec8-4a6844132937.png";
  const speechText = isCorrect 
    ? "Veja só! Ao questionar, você mesmo encontrou um caminho. Talvez a jornada seja mais importante que o destino."
    : "Será que errar não seria o primeiro passo para a sabedoria? Vamos refletir juntos mais uma vez.";

  const headerColor = isCorrect ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400";
  const headerIcon = isCorrect ? "✓" : "⚠";

  const handleImageError = () => {
    setImageError(true);
  };

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
      <div className="flex items-center gap-3">
        {/* Imagem do Sócrates ou Avatar Emoji */}
        <div className="w-32 h-32 flex-shrink-0 p-1">
          {!imageError ? (
            <img 
              src={socratesImage} 
              alt="Sócrates" 
              className="w-full h-full object-cover pixel-art"
              style={{ imageRendering: 'pixelated' }}
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-blue-300 dark:border-blue-600 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-1">🏛️</div>
                <div className="text-xs font-bold text-blue-700 dark:text-blue-300">Sócrates</div>
              </div>
            </div>
          )}
        </div>

        {/* Balão de Fala */}
        <div className="flex-1 relative">
          <div className="bg-white dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 rounded-lg p-3 shadow-lg relative">
            {/* Pontinha do balão */}
            <div className="absolute left-0 top-4 transform -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-white dark:border-r-gray-700"></div>
            
            <div className="text-sm">
              <div className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                Sócrates diz:
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
          {explanation || "Para Sócrates, o conhecimento nasce do diálogo, da dúvida e do reconhecimento da própria ignorância."}
        </div>
      </div>

      {/* 4. Bloco de Recompensa */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-bold text-yellow-800 dark:text-yellow-300">
              +{xpGained} XP
            </span>
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-400">
            Afinidade com Sócrates: Nível 1
          </div>
        </div>
        
        {/* Barra de progresso de afinidade */}
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: '35%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSocratesFeedback;
