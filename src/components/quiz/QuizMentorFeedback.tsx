
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { getMentorBySubject } from '@/data/subjectMentors';
import { getSubjectFeedbackImage, getSubjectEmoji } from '@/data/subjectLogos';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';
import { useSound } from '@/contexts/SoundContext';

interface QuizMentorFeedbackProps {
  subject: string;
  isCorrect: boolean;
  explanation: string;
  xpGained: number;
  isVisible: boolean;
}

const QuizMentorFeedback: React.FC<QuizMentorFeedbackProps> = ({
  subject,
  isCorrect,
  explanation,
  xpGained,
  isVisible
}) => {
  const mentor = getMentorBySubject(subject);
  const { getMentorAffinity, updateAffinity } = useMentorAffinity();
  const { playSound } = useSound();
  const [showAnimation, setShowAnimation] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (mentor && isVisible) {
      setShowAnimation(true);
      updateAffinity(mentor.id, xpGained);
      playSound(isCorrect ? 'success' : 'error');
    }
  }, [mentor, isVisible, isCorrect, xpGained]);

  if (!mentor || !isVisible) return null;

  const affinity = getMentorAffinity(mentor.id);
  const reactionMessage = isCorrect 
    ? mentor.encouragementMessages[Math.floor(Math.random() * mentor.encouragementMessages.length)]
    : "Não desanime! Cada erro é uma oportunidade de aprendizado. Vamos revisar juntos.";

  const feedbackImage = getSubjectFeedbackImage(subject, isCorrect);
  const subjectEmoji = getSubjectEmoji(subject);

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-500 ${
      showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`} style={{ backgroundColor: mentor.backgroundColor }}>
      
      {/* Status da Resposta */}
      <div className="flex items-center justify-center mb-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isCorrect ? 'bg-green-500' : 'bg-orange-500'
        } text-white shadow-lg`}>
          {isCorrect ? <CheckCircle size={32} /> : <XCircle size={32} />}
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
          {isCorrect ? 'Excelente!' : 'Quase lá!'}
        </h3>
      </div>

      {/* Mentor Reaction */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-white overflow-hidden"
             style={{ backgroundColor: mentor.color, color: 'white' }}>
          {feedbackImage && !imageError ? (
            <img 
              src={feedbackImage}
              alt={`${mentor.name} ${isCorrect ? 'satisfeito' : 'pensativo'}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <span className="text-lg">{mentor.avatar}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="bg-white/70 rounded-xl p-3 border-l-4" style={{ borderColor: mentor.color }}>
            <p className="text-gray-700 font-medium mb-1">{mentor.name} diz:</p>
            <p className="text-gray-700 italic">"{reactionMessage}"</p>
          </div>
        </div>
      </div>

      {/* Explicação */}
      {explanation && (
        <div className="bg-white/50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Explicação:</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{explanation}</p>
        </div>
      )}

      {/* XP Ganho */}
      <div className="flex items-center justify-center space-x-2 bg-white/70 rounded-lg p-3">
        <TrendingUp size={16} className="text-blue-500" />
        <span className="font-medium text-gray-700">+{xpGained} XP</span>
        <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: mentor.color }}></div>
      </div>

      {/* Progresso de Afinidade */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Afinidade com {mentor.name}</span>
          <span>Nível {affinity.affinity_level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              backgroundColor: mentor.color,
              width: `${(affinity.experience_points % 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizMentorFeedback;
