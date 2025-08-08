
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, Check, X } from 'lucide-react';

interface FlashcardItem {
  front: string;
  back: string;
}

interface InlineFlashcardProps {
  item: FlashcardItem;
  onComplete: (correct: boolean) => void;
}

const InlineFlashcard: React.FC<InlineFlashcardProps> = ({ item, onComplete }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleKnow = () => {
    setAnswered(true);
    onComplete(true);
  };

  const handleDontKnow = () => {
    setAnswered(true);
    onComplete(false);
  };

  if (answered) {
    return (
      <Card className="p-4 bg-green-50 border-green-200 mb-4">
        <div className="text-center">
          <Check className="mx-auto mb-2 text-green-500" size={24} />
          <p className="text-green-700 font-medium">Flashcard concluído!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-blue-50 border-blue-200 mb-4">
      <div className="text-center">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">🃏 Teste seu conhecimento</h4>
        </div>
        
        <div 
          className="bg-white rounded-lg p-6 cursor-pointer shadow-sm hover:shadow-md transition-all min-h-[120px] flex items-center justify-center"
          onClick={() => setShowAnswer(true)}
        >
          <div>
            <p className="text-gray-800 text-lg font-medium mb-2">
              {showAnswer ? item.back : item.front}
            </p>
            
            {!showAnswer && (
              <p className="text-gray-500 text-sm">
                Clique para ver a resposta
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          {!showAnswer ? (
            <Button 
              onClick={() => setShowAnswer(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Mostrar Resposta
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleDontKnow}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="mr-2" size={16} />
                Não Sabia
              </Button>
              <Button 
                onClick={handleKnow}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="mr-2" size={16} />
                Sabia
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default InlineFlashcard;
