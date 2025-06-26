
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, X, Heart } from 'lucide-react';
import { getMentorBySubject } from '@/data/subjectMentors';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';
import { useSound } from '@/contexts/SoundContext';

interface QuizMentorGuideProps {
  subject: string;
  questionDifficulty: string;
  isVisible: boolean;
  onClose: () => void;
  onHintRequest: () => void;
}

const QuizMentorGuide: React.FC<QuizMentorGuideProps> = ({
  subject,
  questionDifficulty,
  isVisible,
  onClose,
  onHintRequest
}) => {
  const mentor = getMentorBySubject(subject);
  const { getMentorAffinity, getAffinityTitle } = useMentorAffinity();
  const { playSound } = useSound();
  const [encouragementMessage, setEncouragementMessage] = useState('');

  useEffect(() => {
    if (mentor && isVisible) {
      // Mensagem baseada na dificuldade
      let message = '';
      if (questionDifficulty === 'hard') {
        message = "Este é um desafio interessante! Respire fundo e confie no seu conhecimento.";
      } else if (questionDifficulty === 'medium') {
        message = "Você está indo bem! Use tudo que aprendeu até aqui.";
      } else {
        message = "Comece com calma. Os fundamentos são sempre o melhor caminho.";
      }
      setEncouragementMessage(message);
      if (playSound) playSound('click');
    }
  }, [mentor, isVisible, questionDifficulty, playSound]);

  if (!mentor || !isVisible) return null;

  const affinity = getMentorAffinity(mentor.id);
  const title = getAffinityTitle(mentor.id);

  return (
    <div className="fixed top-4 right-4 z-40 max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl border-2" style={{ borderColor: mentor.color }}>
        {/* Header */}
        <div className="p-4 rounded-t-2xl" style={{ backgroundColor: mentor.backgroundColor }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 border-white"
                   style={{ backgroundColor: mentor.color, color: 'white' }}>
                {mentor.avatar}
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{mentor.name}</h4>
                <div className="flex items-center space-x-1">
                  <Heart size={12} className="text-red-500" />
                  <span className="text-xs" style={{ color: mentor.color }}>
                    Nível {affinity.affinity_level}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4">
          <div className="bg-gray-50 rounded-lg p-3 border-l-4 mb-3" style={{ borderColor: mentor.color }}>
            <p className="text-sm text-gray-700 italic">
              "{encouragementMessage}"
            </p>
          </div>

          <Button
            onClick={onHintRequest}
            className="w-full text-white font-medium"
            style={{ backgroundColor: mentor.color }}
          >
            <Lightbulb className="mr-2" size={16} />
            Pedir Dica ({mentor.name})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizMentorGuide;
