
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, Trophy } from 'lucide-react';

interface InlineChallengeQuestionProps {
  question: string;
  expectedAnswer?: string;
  onComplete: (points: number) => void;
}

const InlineChallengeQuestion: React.FC<InlineChallengeQuestionProps> = ({ 
  question, 
  expectedAnswer, 
  onComplete 
}) => {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleSubmit = () => {
    if (answer.trim().length < 10) return;
    
    setShowResult(true);
    const points = answer.trim().length >= 50 ? 25 : 15; // Mais pontos para respostas elaboradas
    
    setTimeout(() => {
      setAnswered(true);
      onComplete(points);
    }, 2000);
  };

  if (answered) {
    return (
      <Card className="p-4 bg-yellow-50 border-yellow-200 mb-4">
        <div className="text-center">
          <Trophy className="mx-auto mb-2 text-yellow-500" size={24} />
          <p className="text-yellow-700 font-medium">Desafio concluído!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 mb-4">
      <div className="text-center mb-4">
        <Star className="mx-auto mb-2 text-yellow-500" size={24} />
        <h4 className="font-semibold text-gray-800">🏆 Desafio do Conhecimento</h4>
        <p className="text-gray-600 text-sm">Demonstre sua compreensão com uma resposta elaborada</p>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-800 font-medium text-lg mb-4">{question}</p>
        
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Digite sua resposta detalhada aqui..."
          className="min-h-[100px] resize-none"
          disabled={showResult}
        />
        
        <p className="text-gray-500 text-sm mt-2">
          Mínimo: 10 caracteres | Atual: {answer.length}
        </p>
      </div>

      <div className="text-center">
        {!showResult ? (
          <Button 
            onClick={handleSubmit}
            disabled={answer.trim().length < 10}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-gray-900 font-bold"
          >
            Enviar Resposta
          </Button>
        ) : (
          <div className="text-lg font-medium">
            <span className="text-yellow-600">
              ✨ Resposta enviada! +{answer.trim().length >= 50 ? 25 : 15} pontos
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Parabéns por se dedicar ao aprendizado!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default InlineChallengeQuestion;
