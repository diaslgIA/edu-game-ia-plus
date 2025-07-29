
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trophy, Clock, Star, CheckCircle } from 'lucide-react';
import { useInteractiveActivities } from '@/hooks/useInteractiveActivities';

interface ChallengeSectionProps {
  contentId: string;
  subject: string;
  challenge: {
    question: string;
    type: 'open_question' | 'complex_quiz';
    expected_answer?: string;
    options?: string[];
    correct_answer?: number;
    points: number;
    badge?: {
      badge_id: string;
      name: string;
      description: string;
      icon: string;
    };
  };
  onComplete: () => void;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  contentId,
  subject,
  challenge,
  onComplete
}) => {
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  
  const { recordActivityResult, awardBadge, loading } = useInteractiveActivities();

  const handleSubmit = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    let isCorrect = false;
    let score = 0;

    if (challenge.type === 'complex_quiz' && challenge.options) {
      isCorrect = selectedOption === challenge.correct_answer;
      score = isCorrect ? challenge.points : 0;
    } else {
      // Para questões abertas, consideramos sempre corretas se o usuário respondeu
      isCorrect = answer.trim().length > 10; // Pelo menos 10 caracteres
      score = isCorrect ? challenge.points : Math.floor(challenge.points * 0.5);
    }

    // Registrar atividade
    await recordActivityResult(contentId, subject, {
      activityType: 'challenge',
      score,
      totalQuestions: 1,
      timeSpent
    });

    // Dar badge se mereceu
    if (isCorrect && challenge.badge) {
      await awardBadge({
        badge_id: challenge.badge.badge_id,
        badge_name: challenge.badge.name,
        badge_description: challenge.badge.description,
        badge_icon: challenge.badge.icon,
        subject,
        content_id: contentId,
        points_awarded: 25 // Pontos extras pela conquista
      });
    }

    setShowResult(true);
    setTimeout(() => {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }, 3000);
  };

  if (completed) {
    return (
      <div className="text-center p-8 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl">
        <Trophy className="mx-auto mb-4 text-white" size={64} />
        <h3 className="text-2xl font-bold text-white mb-4">
          Desafio Concluído! 🎉
        </h3>
        <p className="text-white/90 mb-4">
          Parabéns pela dedicação e esforço!
        </p>
        <div className="flex items-center justify-center space-x-4">
          <CheckCircle className="text-white" size={24} />
          <span className="text-white font-semibold">Módulo Finalizado</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Star className="mx-auto mb-4 text-yellow-400" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Desafio Final</h2>
        <p className="text-white/80 mb-4">
          Aplique seu conhecimento em um cenário mais complexo
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="text-cyan-400" size={16} />
            <span className="text-white/80">Sem limite de tempo</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-400" size={16} />
            <span className="text-white/80">+{challenge.points} pontos</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">
          {challenge.badge?.icon} Desafio: {challenge.badge?.name || 'Questão Avançada'}
        </h3>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
          <p className="text-white leading-relaxed">
            {challenge.question}
          </p>
        </div>

        {challenge.type === 'complex_quiz' && challenge.options ? (
          // Quiz de múltipla escolha complexo
          <div className="space-y-3 mb-6">
            {challenge.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && setSelectedOption(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  selectedOption === index
                    ? showResult
                      ? index === challenge.correct_answer
                        ? 'border-green-400 bg-green-500/20 text-white'
                        : 'border-red-400 bg-red-500/20 text-white'
                      : 'border-white bg-white/10 text-white'
                    : showResult && index === challenge.correct_answer
                    ? 'border-green-400 bg-green-500/20 text-white'
                    : 'border-white/30 bg-white/5 text-white/80 hover:border-white/60 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <>
                      {index === challenge.correct_answer && (
                        <CheckCircle className="text-green-400" size={20} />
                      )}
                      {selectedOption === index && selectedOption !== challenge.correct_answer && (
                        <div className="text-red-400">❌</div>
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Questão aberta
          <div className="mb-6">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Digite sua resposta detalhada aqui..."
              className="bg-white/10 border-white/30 text-white placeholder:text-white/50 min-h-[120px] resize-none"
              disabled={showResult}
            />
            <p className="text-white/60 text-sm mt-2">
              Mínimo: 10 caracteres | Atual: {answer.length}
            </p>
          </div>
        )}

        {showResult && (
          <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <h4 className="text-white font-bold mb-2">
              {challenge.type === 'complex_quiz' && selectedOption === challenge.correct_answer
                ? '🎉 Resposta Correta!'
                : challenge.type === 'open_question' && answer.trim().length > 10
                ? '✅ Resposta Registrada!'
                : '📝 Continue Praticando!'}
            </h4>
            <p className="text-white/80 text-sm">
              {challenge.badge && 'Parabéns! Você desbloqueou uma nova conquista!'}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          {!showResult ? (
            <Button 
              onClick={handleSubmit}
              disabled={
                loading ||
                (challenge.type === 'complex_quiz' ? selectedOption === null : answer.trim().length < 10)
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3"
            >
              {loading ? 'Processando...' : 'Finalizar Desafio'}
            </Button>
          ) : (
            <div className="text-center">
              <div className="text-white text-lg mb-2">
                Processando resultados...
              </div>
              {challenge.badge && (
                <div className="text-yellow-400 font-semibold">
                  {challenge.badge.icon} {challenge.badge.name}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeSection;
