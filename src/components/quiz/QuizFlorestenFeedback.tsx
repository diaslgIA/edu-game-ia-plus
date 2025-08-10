
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface QuizFlorestenFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  points: number;
  affinityLevel: number;
  affinityProgress: number;
}

export const QuizFlorestenFeedback = ({ 
  isCorrect, 
  explanation, 
  points, 
  affinityLevel,
  affinityProgress 
}: QuizFlorestenFeedbackProps) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full bg-secondary/30 rounded-lg p-4 space-y-4 animate-fade-in">
      {/* Cabeçalho de Resultado */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-primary">
          {isCorrect ? "Muito bem!" : "Quase lá!"}
        </h3>
      </div>

      {/* Linha com Personagem + Balão de Fala */}
      <div className="flex items-start gap-4">
        {/* Personagem Florestan */}
        <div className="w-28 h-28 flex-shrink-0">
          {!imageError ? (
            <img 
              src={isCorrect ? "/lovable-uploads/bfcf895a-fb38-42bd-9792-8442f1483553.png" : "/lovable-uploads/f1bf8582-4a02-4023-9a67-953a2293f512.png"}
              alt={`Florestan ${isCorrect ? 'confiante' : 'reflexivo'}`}
              className="w-full h-full object-contain rounded-lg"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-red-100 dark:bg-red-900/30 rounded-lg border-2 border-red-300 dark:border-red-600 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-1">{isCorrect ? "📚" : "🤔"}</div>
                <div className="text-xs font-bold text-red-700 dark:text-red-300">Florestan</div>
              </div>
            </div>
          )}
        </div>

        {/* Balão de Fala */}
        <div className="flex-1 bg-background border-2 border-primary/20 rounded-xl p-3 relative">
          {/* Pontinha do balão */}
          <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-background transform -translate-x-2"></div>
          <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-primary/20 transform -translate-x-1"></div>
          
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {isCorrect 
              ? "Exato! Você desnaturalizou o que parecia óbvio e fez uma análise crítica. É assim que a consciência se expande."
              : "Não se acomode ao senso comum. Reflita sobre a estrutura e tente novamente com um olhar mais atento."
            }
          </p>
        </div>
      </div>

      {/* Bloco de Explicação Técnica */}
      <div className="bg-background/80 rounded-lg p-3 border border-primary/10">
        <h4 className="text-sm font-semibold text-primary mb-2">💡 Explicação:</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Bloco de Recompensa */}
      <div className="bg-primary/5 rounded-lg p-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-primary">
            +{points} XP
          </span>
          <span className="text-xs text-muted-foreground">
            Afinidade com Florestan: Nível {affinityLevel}
          </span>
        </div>
        
        {/* Barra de Progresso de Afinidade */}
        <div className="space-y-1">
          <Progress value={affinityProgress} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            Progresso da Afinidade: {affinityProgress}%
          </p>
        </div>
      </div>
    </div>
  );
};
