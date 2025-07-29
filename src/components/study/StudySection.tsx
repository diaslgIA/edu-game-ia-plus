
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, BookOpen, ArrowRight } from 'lucide-react';

interface StudySection {
  title: string;
  content: string;
  estimatedTime: number;
}

interface StudySectionProps {
  section: StudySection;
  sectionIndex: number;
  totalSections: number;
  onComplete: () => void;
}

const StudySection: React.FC<StudySectionProps> = ({
  section,
  sectionIndex,
  totalSections,
  onComplete
}) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [canComplete, setCanComplete] = useState(false);
  
  const minReadTime = Math.max(30, section.estimatedTime * 60); // minimum 30 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        if (newTime >= minReadTime && !canComplete) {
          setCanComplete(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minReadTime, canComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = Math.min((timeSpent / minReadTime) * 100, 100);

  return (
    <div className="p-6 space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
          <BookOpen size={16} className="text-blue-400" />
          <span className="text-blue-300 font-medium">
            {section.title} ({sectionIndex + 1}/{totalSections})
          </span>
        </div>
      </div>

      {/* Reading Timer */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-white/60" />
            <span className="text-white/80 text-sm">Tempo de leitura</span>
          </div>
          <span className="text-white font-mono">{formatTime(timeSpent)}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <p className="text-white/60 text-xs mt-2 text-center">
          {canComplete ? 'Pode avançar!' : `Leia por pelo menos ${Math.ceil(minReadTime / 60)} minutos`}
        </p>
      </div>

      {/* Content */}
      <div className="bg-white/15 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg">
        <div className="prose prose-invert max-w-none">
          <div className="text-white leading-relaxed text-base whitespace-pre-line">
            {section.content}
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-purple-500/30">
        <h4 className="text-purple-300 font-semibold mb-2">💡 Dica de Estudo</h4>
        <p className="text-purple-200/80 text-sm">
          Leia com atenção e tente relacionar o conteúdo com o que você já sabe. 
          Fazer pausas para refletir ajuda na memorização!
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <Button 
          onClick={onComplete}
          disabled={!canComplete}
          className={`w-full font-bold py-4 text-lg shadow-lg transition-all ${
            canComplete 
              ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {canComplete ? (
            <>
              <CheckCircle className="mr-2" size={20} />
              {sectionIndex === totalSections - 1 ? 'Finalizar Estudo' : 'Próxima Seção'}
            </>
          ) : (
            <>
              <Clock className="mr-2" size={20} />
              Continue lendo... ({Math.ceil((minReadTime - timeSpent) / 60)}min)
            </>
          )}
        </Button>
      </div>

      {/* XP Preview */}
      {canComplete && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
            <span className="text-yellow-300 text-sm">
              +{Math.max(10, Math.min(25, timeSpent))} XP por esta seção
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudySection;
