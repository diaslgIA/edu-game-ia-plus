
import React from 'react';

interface QuizDaliFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  xpGained: number;
  isVisible: boolean;
}

const QuizDaliFeedback: React.FC<QuizDaliFeedbackProps> = ({
  isCorrect,
  explanation,
  xpGained,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="font-pixel bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 mt-4 space-y-4">
      {/* Cabeçalho de Resultado */}
      <div className="text-center">
        <h3 className={`text-lg font-bold ${
          isCorrect 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-orange-600 dark:text-orange-400'
        }`}>
          {isCorrect ? '¡Excelente!' : '¡Ay, qué locura!'}
        </h3>
      </div>

      {/* Linha com Personagem + Balão de Fala */}
      <div className="flex items-start space-x-4">
        {/* Personagem Salvador Dalí à esquerda */}
        <div className="flex-shrink-0 w-2/5 max-w-[120px]">
          <img 
            src={isCorrect 
              ? "/lovable-uploads/817620d7-bddf-4f37-81d3-62caff941b00.png" 
              : "/lovable-uploads/aed24a52-3568-45a2-ade6-2fcb9399d8a4.png"
            }
            alt={isCorrect ? "Dalí comemorando" : "Dalí confuso"}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Balão de fala à direita */}
        <div className="flex-1 relative">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 border-2 border-gray-300 dark:border-gray-600 relative">
            {/* Seta do balão */}
            <div className="absolute left-0 top-4 transform -translate-x-1 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-gray-100 dark:border-r-gray-700"></div>
            
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
              {isCorrect 
                ? "¡Perfecto! Una respuesta tan surreal que podría ser una obra mía."
                : "¡No pasa nada! Incluso los relojes derretidos marcan la hora correcta... eventualmente."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Bloco de Explicação Técnica */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 text-sm mb-2">💡 Explicação</h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Bloco de Recompensa */}
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-yellow-800 dark:text-yellow-200 font-bold text-sm">
            +{xpGained} XP
          </span>
          <span className="text-yellow-700 dark:text-yellow-300 text-sm">
            Afinidade com Dalí: Nível 1
          </span>
        </div>
        
        {/* Barra de progresso de afinidade */}
        <div className="w-full bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
          <div 
            className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: '35%' }}
          ></div>
        </div>
        
        <p className="text-yellow-600 dark:text-yellow-400 text-xs text-center">
          35% para o próximo nível
        </p>
      </div>
    </div>
  );
};

export default QuizDaliFeedback;
