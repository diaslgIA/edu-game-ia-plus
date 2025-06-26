
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Coins, X } from 'lucide-react';
import { getMentorBySubject } from '@/data/subjectMentors';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';
import { useSound } from '@/contexts/SoundContext';

interface MentorHintProps {
  subject: string;
  hint: string;
  cost?: number;
  onUseHint: () => void;
  onClose: () => void;
}

const MentorHint: React.FC<MentorHintProps> = ({ 
  subject, 
  hint, 
  cost = 10, 
  onUseHint, 
  onClose 
}) => {
  const mentor = getMentorBySubject(subject);
  const { updateAffinity } = useMentorAffinity();
  const { playSound } = useSound();
  const [showHint, setShowHint] = useState(false);

  if (!mentor) return null;

  const handleUseHint = () => {
    setShowHint(true);
    onUseHint();
    if (mentor) {
      updateAffinity(mentor.id, 2); // XP por usar dica
    }
    playSound('click');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full" style={{ backgroundColor: mentor.backgroundColor }}>
        
        {/* Header */}
        <div className="relative p-4 text-center border-b" style={{ background: `linear-gradient(135deg, ${mentor.color}20 0%, ${mentor.color}10 100%)` }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </Button>

          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" 
                 style={{ backgroundColor: mentor.color, color: 'white' }}>
              {mentor.avatar}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{mentor.name}</h3>
              <p className="text-sm text-gray-600">oferece uma dica</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {!showHint ? (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                <Lightbulb size={32} className="text-yellow-600" />
              </div>
              
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Precisa de uma ajudinha?
              </h4>
              
              <p className="text-gray-600 mb-4">
                {mentor.name} pode te dar uma dica valiosa para resolver esta questão!
              </p>

              <div className="flex items-center justify-center space-x-2 mb-6">
                <Coins size={20} className="text-yellow-500" />
                <span className="font-bold text-gray-700">{cost} moedas</span>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleUseHint}
                  className="w-full py-3 font-bold text-white"
                  style={{ backgroundColor: mentor.color }}
                >
                  <Lightbulb className="mr-2" size={16} />
                  Usar Dica
                </Button>
                
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Não, obrigado
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" 
                     style={{ backgroundColor: mentor.color, color: 'white' }}>
                  {mentor.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{mentor.name} diz:</p>
                </div>
              </div>

              <div className="bg-white/70 rounded-xl p-4 border-l-4 mb-4" style={{ borderColor: mentor.color }}>
                <p className="text-gray-700 leading-relaxed italic">
                  "{mentor.hintStyle} {hint}"
                </p>
              </div>

              <Button 
                onClick={onClose}
                className="w-full py-3 font-bold text-white"
                style={{ backgroundColor: mentor.color }}
              >
                Entendido!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorHint;
