
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Trophy, Brain } from 'lucide-react';

interface MentorEncouragementProps {
  sectionsCompleted: number;
  totalSections: number;
  xpEarned: number;
  onContinue: () => void;
}

const MentorEncouragement: React.FC<MentorEncouragementProps> = ({
  sectionsCompleted,
  totalSections,
  xpEarned,
  onContinue
}) => {
  const progressPercentage = (sectionsCompleted / totalSections) * 100;

  const encouragementMessages = [
    "Excelente progresso! Você está absorvendo o conhecimento de forma consistente.",
    "Muito bem! Sua dedicação aos estudos é inspiradora. Continue assim!",
    "Fantástico! Cada seção completada é um passo a mais na sua jornada de aprendizado.",
    "Parabéns! Você demonstra perseverança e foco. O conhecimento é seu maior tesouro!"
  ];

  const message = encouragementMessages[sectionsCompleted % encouragementMessages.length];

  return (
    <div className="p-6 space-y-6">
      {/* Mentor Avatar */}
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl border-4 border-white/20">
          <Brain size={36} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Mentor Pitágoras</h2>
        <p className="text-white/70">Seu guia no conhecimento</p>
      </div>

      {/* Encouragement Message */}
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative">
        {/* Speech bubble pointer */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/15 border-l border-t border-white/10 rotate-45"></div>
        
        <p className="text-white text-center leading-relaxed text-lg">
          "{message}"
        </p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-xl p-4 border border-green-500/30 text-center">
          <Trophy size={24} className="text-green-400 mx-auto mb-2" />
          <p className="text-green-300 font-bold text-lg">{sectionsCompleted}</p>
          <p className="text-green-200/80 text-sm">Seções</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 rounded-xl p-4 border border-yellow-500/30 text-center">
          <Star size={24} className="text-yellow-400 mx-auto mb-2" />
          <p className="text-yellow-300 font-bold text-lg">{xpEarned}</p>
          <p className="text-yellow-200/80 text-sm">XP Ganho</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl p-4 border border-purple-500/30 text-center">
          <Brain size={24} className="text-purple-400 mx-auto mb-2" />
          <p className="text-purple-300 font-bold text-lg">{Math.round(progressPercentage)}%</p>
          <p className="text-purple-200/80 text-sm">Completo</p>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">Progresso do Estudo</span>
          <span className="text-white/70">{sectionsCompleted}/{totalSections}</span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
          </div>
        </div>
        
        <p className="text-white/60 text-sm text-center">
          {totalSections - sectionsCompleted} seções restantes
        </p>
      </div>

      {/* Motivation Quote */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
        <p className="text-blue-200 text-center italic">
          "O conhecimento é a única riqueza que aumenta quando compartilhada."
        </p>
        <p className="text-blue-300/60 text-center text-sm mt-2">- Pitágoras</p>
      </div>

      {/* Continue Button */}
      <Button 
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 text-lg shadow-lg"
      >
        <ArrowRight className="mr-2" size={20} />
        Continuar Estudando
      </Button>
    </div>
  );
};

export default MentorEncouragement;
