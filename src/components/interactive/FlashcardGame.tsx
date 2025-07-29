
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Check, X } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardGameProps {
  flashcards: Flashcard[];
  onComplete: (score: number, timeSpent: number) => void;
}

const FlashcardGame: React.FC<FlashcardGameProps> = ({ flashcards, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentIndex];
  const isLastCard = currentIndex === flashcards.length - 1;
  const allCompleted = completedCards.size === flashcards.length;

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handleKnow = () => {
    if (!completedCards.has(currentIndex)) {
      setScore(prev => prev + 10);
      setCompletedCards(prev => new Set(prev).add(currentIndex));
    }
    nextCard();
  };

  const handleDontKnow = () => {
    setCompletedCards(prev => new Set(prev).add(currentIndex));
    nextCard();
  };

  const nextCard = () => {
    if (isLastCard) {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onComplete(score, timeSpent);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setScore(0);
    setCompletedCards(new Set());
  };

  if (allCompleted && isLastCard) {
    return (
      <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">
          Flashcards Concluídos! 🎉
        </h3>
        <p className="text-white/80 mb-4">
          Você acertou {score / 10} de {flashcards.length} cards
        </p>
        <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600">
          <RotateCcw className="mr-2" size={16} />
          Jogar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <div className="text-center mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/80">
            Card {currentIndex + 1} de {flashcards.length}
          </span>
          <span className="text-white font-bold">
            Pontos: {score}
          </span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      <div 
        className="bg-white rounded-xl p-8 text-center cursor-pointer shadow-lg min-h-[200px] flex items-center justify-center transition-all hover:scale-105"
        onClick={handleFlip}
      >
        <div>
          <p className="text-gray-800 text-lg font-medium mb-4">
            {showAnswer ? currentCard.back : currentCard.front}
          </p>
          
          {!showAnswer && (
            <p className="text-gray-500 text-sm">
              Clique para ver a resposta
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        {!showAnswer ? (
          <Button 
            onClick={handleFlip}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Mostrar Resposta
          </Button>
        ) : (
          <>
            <Button 
              onClick={handleDontKnow}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
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
  );
};

export default FlashcardGame;
