
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart, Star } from 'lucide-react';
import { getMentorBySubject } from '@/data/subjectMentors';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';
import { useSound } from '@/contexts/SoundContext';

interface MentorWelcomeProps {
  subject: string;
  onClose: () => void;
}

const MentorWelcome: React.FC<MentorWelcomeProps> = ({ subject, onClose }) => {
  const mentor = getMentorBySubject(subject);
  const { getMentorAffinity, getAffinityTitle, updateAffinity } = useMentorAffinity();
  const { playSound } = useSound();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (mentor) {
      setShowMessage(true);
      updateAffinity(mentor.id, 5); // XP por interação
      playSound('success');
    }
  }, [mentor]);

  if (!mentor) return null;

  const affinity = getMentorAffinity(mentor.id);
  const title = getAffinityTitle(mentor.id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${
        showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`} style={{ backgroundColor: mentor.backgroundColor }}>
        
        {/* Header */}
        <div className="relative p-6 text-center" style={{ background: `linear-gradient(135deg, ${mentor.color}20 0%, ${mentor.color}10 100%)` }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </Button>

          {/* Avatar do Mentor */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-white" 
               style={{ backgroundColor: mentor.color, color: 'white' }}>
            {mentor.avatar}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">{mentor.name}</h2>
          <p className="text-gray-600 font-medium">{mentor.title}</p>
          
          {/* Nível de Afinidade */}
          <div className="mt-3 flex items-center justify-center space-x-2">
            <Heart size={16} className="text-red-500" />
            <span className="text-sm font-medium" style={{ color: mentor.color }}>
              Nível {affinity.affinity_level}
            </span>
            <div className="flex space-x-1">
              {[...Array(Math.min(affinity.affinity_level, 5))].map((_, i) => (
                <Star key={i} size={12} className="text-yellow-500 fill-current" />
              ))}
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mt-1">{title}</p>
        </div>

        {/* Mensagem do Mentor */}
        <div className="p-6">
          <div className="bg-white/70 rounded-xl p-4 border-l-4" style={{ borderColor: mentor.color }}>
            <p className="text-gray-700 leading-relaxed italic">
              "{mentor.welcomeMessage}"
            </p>
          </div>

          {/* Frase Marcante */}
          <div className="mt-4 text-center">
            <p className="font-bold text-lg" style={{ color: mentor.color }}>
              {mentor.catchPhrase}
            </p>
          </div>

          {/* Progresso XP */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Experiência</span>
              <span>{affinity.experience_points % 100}/100 XP</span>
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

        {/* Botão de Ação */}
        <div className="p-6 pt-0">
          <Button 
            onClick={onClose}
            className="w-full py-3 font-bold text-white"
            style={{ backgroundColor: mentor.color }}
          >
            Vamos começar a estudar!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorWelcome;
