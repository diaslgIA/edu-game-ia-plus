
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface EmptyTopicsStateProps {
  themeName: string;
  subjectName: string;
  onBack: () => void;
}

const EmptyTopicsState: React.FC<EmptyTopicsStateProps> = ({ themeName, subjectName, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="bg-white/10 rounded-full p-6 mb-6">
        <BookOpen size={48} className="text-white/60" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">
        Conteúdo em Preparação
      </h3>
      
      <p className="text-white/80 text-base mb-6 max-w-md leading-relaxed">
        Os tópicos de <span className="font-semibold text-blue-300">{themeName}</span> em{' '}
        <span className="font-semibold text-blue-300">{subjectName}</span> estão sendo preparados 
        pela nossa equipe pedagógica.
      </p>
      
      <div className="bg-blue-500/20 rounded-xl p-4 mb-6 border border-blue-500/30 max-w-md">
        <p className="text-blue-100 text-sm">
          💡 <strong>Dica:</strong> Enquanto isso, explore outros temas disponíveis ou 
          pratique com os quizzes da matéria!
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft size={16} />
          Voltar aos Temas
        </Button>
      </div>
    </div>
  );
};

export default EmptyTopicsState;
