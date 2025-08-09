
import React from 'react';

interface QuizMachadoFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  xpGained: number;
  isVisible: boolean;
}

const QuizMachadoFeedback: React.FC<QuizMachadoFeedbackProps> = ({
  isCorrect,
  explanation,
  xpGained,
  isVisible
}) => {
  if (!isVisible) return null;

  const resultHeader = isCorrect ? "Muito bem!" : "Quase lá!";
  const machadoImage = isCorrect ? "/lovable-uploads/fe72a735-094c-46ff-8830-994d997f7c5c.png" : "/lovable-uploads/3fb221c3-93fd-48f3-8e2b-2b84d56faaaa.png";
  const speechText = isCorrect 
    ? "Definiste a alma do personagem com a argúcia de um leitor de memórias póstumas."
    : "Não se apresse. Até Bentinho confundiu as pistas. Leia outra vez, com olhos mais atentos ao silêncio das entrelinhas.";

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
      <div className="flex items-center gap-3">
        {/* Imagem do Machado de Assis */}
        <div className="w-32 h-32 flex-shrink-0 p-1">
          <img 
            src={machadoImage} 
            alt="Machado de Assis" 
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
                Machado diz:
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
          {explanation || "Machado de Assis era mestre da ironia e da ambiguidade narrativa. Muitas vezes, o narrador não é confiável, e a interpretação exige leitura crítica."}
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
            Afinidade com Machado de Assis: Nível 1
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

export default QuizMachadoFeedback;
