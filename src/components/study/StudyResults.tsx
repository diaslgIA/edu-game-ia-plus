
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Clock, CheckCircle, Award, Brain } from 'lucide-react';

interface StudyResultsProps {
  title: string;
  sectionsCompleted: number;
  totalXP: number;
  timeSpent: number;
  onFinish: () => void;
}

const StudyResults: React.FC<StudyResultsProps> = ({
  title,
  sectionsCompleted,
  totalXP,
  timeSpent,
  onFinish
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = (xp: number) => {
    if (xp >= 80) return { level: 'Excepcional', color: 'from-purple-500 to-pink-500', icon: '🌟' };
    if (xp >= 60) return { level: 'Excelente', color: 'from-blue-500 to-purple-500', icon: '⭐' };
    if (xp >= 40) return { level: 'Muito Bom', color: 'from-green-500 to-blue-500', icon: '🎯' };
    return { level: 'Bom', color: 'from-yellow-500 to-green-500', icon: '👍' };
  };

  const performance = getPerformanceLevel(totalXP);

  return (
    <div className="p-6 space-y-6">
      {/* Success Animation */}
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse">
          <Trophy size={36} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Estudo Concluído!</h2>
        <p className="text-white/80">Parabéns por completar: <strong>{title}</strong></p>
      </div>

      {/* Performance Level */}
      <div className={`bg-gradient-to-r ${performance.color} rounded-2xl p-6 text-center shadow-2xl`}>
        <div className="text-4xl mb-2">{performance.icon}</div>
        <h3 className="text-white font-bold text-xl mb-1">Desempenho {performance.level}</h3>
        <p className="text-white/90">Você demonstrou dedicação e foco excepcionais!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">{sectionsCompleted}</p>
          <p className="text-white/70 text-sm">Seções Concluídas</p>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <Star size={24} className="text-yellow-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">{totalXP}</p>
          <p className="text-white/70 text-sm">XP Ganho</p>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <Clock size={24} className="text-blue-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">{formatTime(timeSpent)}</p>
          <p className="text-white/70 text-sm">Tempo Estudado</p>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
          <Brain size={24} className="text-purple-400 mx-auto mb-2" />
          <p className="text-white font-bold text-lg">+1</p>
          <p className="text-white/70 text-sm">Tópico Dominado</p>
        </div>
      </div>

      {/* Achievement Unlocked */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Award size={24} className="text-yellow-400" />
          <div>
            <p className="text-yellow-300 font-semibold">Conquista Desbloqueada!</p>
            <p className="text-yellow-200/80 text-sm">Estudioso Dedicado - Complete um tópico de estudos</p>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h4 className="text-white font-semibold mb-2 text-center">📚 Reflexão Final</h4>
        <p className="text-white/80 text-sm text-center leading-relaxed">
          "O conhecimento que você adquiriu hoje é um investimento para toda a vida. 
          Continue explorando e descobrindo novas possibilidades!"
        </p>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
        <h4 className="text-blue-300 font-semibold mb-2">🎯 Próximos Passos</h4>
        <ul className="text-blue-200/80 text-sm space-y-1">
          <li>• Explore outros tópicos relacionados</li>
          <li>• Teste seu conhecimento com quizzes</li>
          <li>• Compartilhe seu progresso com amigos</li>
          <li>• Defina novos objetivos de estudo</li>
        </ul>
      </div>

      {/* Finish Button */}
      <Button 
        onClick={onFinish}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 text-lg shadow-lg"
      >
        <Trophy className="mr-2" size={20} />
        Voltar aos Tópicos
      </Button>
    </div>
  );
};

export default StudyResults;
