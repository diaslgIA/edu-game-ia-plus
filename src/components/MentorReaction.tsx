
import React, { useState, useEffect } from 'react';
import { getMentorBySubject } from '@/data/subjectMentors';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';
import { useSound } from '@/contexts/SoundContext';

interface MentorReactionProps {
  subject: string;
  isCorrect: boolean;
  onComplete: () => void;
}

const MentorReaction: React.FC<MentorReactionProps> = ({ 
  subject, 
  isCorrect, 
  onComplete 
}) => {
  const mentor = getMentorBySubject(subject);
  const { getMentorAffinity, updateAffinity } = useMentorAffinity();
  const { playSound } = useSound();
  const [showReaction, setShowReaction] = useState(false);

  useEffect(() => {
    if (mentor) {
      setShowReaction(true);
      
      // XP baseado na resposta
      const xpGained = isCorrect ? 10 : 3;
      updateAffinity(mentor.id, xpGained);
      
      // Som baseado na resposta
      playSound(isCorrect ? 'success' : 'error');

      // Auto-close após animação
      const timer = setTimeout(() => {
        setShowReaction(false);
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mentor, isCorrect]);

  if (!mentor) return null;

  const affinity = getMentorAffinity(mentor.id);
  const message = isCorrect 
    ? mentor.encouragementMessages[Math.floor(Math.random() * mentor.encouragementMessages.length)]
    : "Não se preocupe! Cada erro é um passo em direção ao aprendizado.";

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all duration-500 ${
      showReaction ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${
        showReaction ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`} style={{ backgroundColor: mentor.backgroundColor }}>
        
        {/* Reação do Mentor */}
        <div className="p-6 text-center">
          {/* Avatar Animado */}
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white transform transition-all duration-1000 ${
            isCorrect ? 'animate-bounce' : 'animate-pulse'
          }`} 
               style={{ backgroundColor: mentor.color, color: 'white' }}>
            {mentor.avatar}
          </div>

          {/* Resultado */}
          <div className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
            {isCorrect ? '🎉 Correto!' : '🤔 Quase lá!'}
          </div>

          {/* Mensagem do Mentor */}
          <div className="bg-white/70 rounded-xl p-4 border-l-4 mb-4" style={{ borderColor: mentor.color }}>
            <p className="text-gray-700 leading-relaxed italic">
              "{message}"
            </p>
          </div>

          {/* XP Ganho */}
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm font-medium text-gray-600">+{isCorrect ? 10 : 3} XP</span>
            <div className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: mentor.color }}></div>
          </div>

          {/* Barra de Progresso XP */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000"
                style={{ 
                  backgroundColor: mentor.color,
                  width: `${(affinity.experience_points % 100)}%`
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Nível {affinity.affinity_level} - {affinity.experience_points % 100}/100 XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorReaction;
