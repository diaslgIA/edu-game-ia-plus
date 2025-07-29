
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface DragItem {
  id: string;
  text: string;
  correctCategory: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface DragDropActivityProps {
  items: DragItem[];
  categories: Category[];
  onComplete: (score: number, timeSpent: number) => void;
  title: string;
}

const DragDropActivity: React.FC<DragDropActivityProps> = ({ 
  items, 
  categories, 
  onComplete,
  title 
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    
    if (draggedItem) {
      setDroppedItems(prev => ({
        ...prev,
        [draggedItem]: categoryId
      }));
      setDraggedItem(null);
    }
  };

  const checkAnswers = () => {
    let correctCount = 0;
    
    items.forEach(item => {
      if (droppedItems[item.id] === item.correctCategory) {
        correctCount++;
      }
    });
    
    const newScore = correctCount * 10;
    setScore(newScore);
    setShowResults(true);
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    setTimeout(() => onComplete(newScore, timeSpent), 2000);
  };

  const resetActivity = () => {
    setDroppedItems({});
    setShowResults(false);
    setScore(0);
  };

  const isItemCorrect = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    return item && droppedItems[itemId] === item.correctCategory;
  };

  const availableItems = items.filter(item => !droppedItems[item.id]);
  const allItemsPlaced = Object.keys(droppedItems).length === items.length;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">
          Arraste os itens para as categorias corretas
        </p>
        <div className="text-white font-bold">
          Pontos: {score} | Progresso: {Object.keys(droppedItems).length}/{items.length}
        </div>
      </div>

      {/* Itens disponíveis para arrastar */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Itens:</h4>
        <div className="flex flex-wrap gap-3 min-h-[60px] p-3 bg-white/5 rounded-xl">
          {availableItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-move shadow-lg hover:scale-105 transition-all"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {categories.map(category => (
          <div
            key={category.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category.id)}
            className={`min-h-[120px] p-4 rounded-xl border-2 border-dashed ${category.color} transition-all`}
          >
            <h5 className="font-bold text-white text-center mb-3">
              {category.name}
            </h5>
            
            <div className="space-y-2">
              {items
                .filter(item => droppedItems[item.id] === category.id)
                .map(item => (
                  <div 
                    key={item.id}
                    className={`bg-white text-gray-800 px-3 py-2 rounded-lg text-center flex items-center justify-between ${
                      showResults ? (isItemCorrect(item.id) ? 'bg-green-100' : 'bg-red-100') : ''
                    }`}
                  >
                    <span>{item.text}</span>
                    {showResults && (
                      isItemCorrect(item.id) ? 
                        <CheckCircle className="text-green-500" size={16} /> : 
                        <XCircle className="text-red-500" size={16} />
                    )}
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        {!showResults ? (
          <>
            <Button 
              onClick={checkAnswers}
              disabled={!allItemsPlaced}
              className="bg-green-500 hover:bg-green-600 disabled:opacity-50"
            >
              Verificar Respostas
            </Button>
            <Button 
              onClick={resetActivity}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="mr-2" size={16} />
              Reiniciar
            </Button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-white text-lg mb-4">
              Você acertou {score / 10} de {items.length} itens! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropActivity;
