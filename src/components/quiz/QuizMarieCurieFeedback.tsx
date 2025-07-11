import React from 'react';

interface QuizMarieCurieFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  xpGained: number;
  isVisible: boolean;
}

const QuizMarieCurieFeedback: React.FC<QuizMarieCurieFeedbackProps> = ({
  isCorrect,
  explanation,
  xpGained,
  isVisible
}) => {
  if (!isVisible) return null;

  const resultMessage = isCorrect ? "Muito bem!" : "Quase lá!";
  const marieCurieMessage = isCorrect 
    ? "Preciso! Você conduziu o experimento com a exatidão que leva a grandes descobertas."
    : "Nada de desânimo. Toda falha é um dado novo. Vamos revisar o procedimento com mais precisão.";
  
  const marieCurieImage = isCorrect 
    ? "/lovable-uploads/eb2d2834-cfb2-4f35-8087-c5e578814082.png"
    : "/lovable-uploads/c08c2f04-2e89-4f04-86bc-004882ea1414.png";

  return (
    <div className="font-pixel bg-white dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4 animate-fade-in">
      {/* Cabeçalho de Resultado */}
      <div className="text-center mb-4">
        <h3 className={`text-xl font-bold ${
          isCorrect ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
        }`}>
          {resultMessage}
        </h3>
      </div>

      {/* Linha com Personagem + Balão de Fala */}
      <div className="flex items-start gap-3 mb-4">
        {/* Personagem Marie Curie à esquerda */}
        <div className="flex-shrink-0 w-28 h-28 p-2">
          <img 
            src={marieCurieImage}
            alt="Marie Curie"
            className="w-full h-full object-cover pixelated"
          />
        </div>

        {/* Balão de fala à direita */}
        <div className="flex-1 relative">
          <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 relative">
            {/* Seta do balão apontando para o personagem */}
            <div className="absolute left-0 top-4 transform -translate-x-1 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-transparent border-r-gray-100 dark:border-r-gray-800"></div>
            <div className="absolute left-0 top-4 transform -translate-x-2 w-0 h-0 border-t-[10px] border-b-[10px] border-r-[10px] border-transparent border-r-gray-300 dark:border-r-gray-600"></div>
            
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
              {marieCurieMessage}
            </p>
          </div>
        </div>
      </div>

      {/* Bloco de Explicação Técnica */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-4">
        <h4 className="text-blue-800 dark:text-blue-300 font-bold text-sm mb-2">Explicação:</h4>
        <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Bloco de Recompensa */}
      <div className="bg-purple-50 dark:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-purple-800 dark:text-purple-300 font-bold text-sm">
            +{xpGained} XP
          </span>
          <span className="text-purple-700 dark:text-purple-200 text-sm">
            Afinidade com Marie Curie: Nível 1
          </span>
        </div>
        
        {/* Barra de progresso de afinidade */}
        <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
          <div 
            className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((xpGained * 10), 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuizMarieCurieFeedback;