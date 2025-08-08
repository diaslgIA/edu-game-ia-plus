
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Trophy, Clock } from 'lucide-react';
import FlashcardGame from './FlashcardGame';
import DragDropActivity from './DragDropActivity';
import FillBlanksGame from './FillBlanksGame';
import { useInteractiveActivities } from '@/hooks/useInteractiveActivities';

interface InteractiveSectionProps {
  contentId: string;
  subject: string;
  activities: any;
  onComplete: (...args: any[]) => void | Promise<void>; // ampliado para compatibilidade
}

const InteractiveSection: React.FC<InteractiveSectionProps> = ({
  contentId,
  subject,
  activities,
  onComplete
}) => {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [totalScore, setTotalScore] = useState(0);
  const { recordActivityResult, loading } = useInteractiveActivities();

  const handleActivityComplete = async (activityType: string, score: number, timeSpent: number) => {
    // Registrar resultado da atividade
    await recordActivityResult(contentId, subject, {
      activityType,
      score,
      totalQuestions: getActivityQuestionCount(activityType),
      timeSpent
    });

    // Marcar atividade como concluída
    setCompletedActivities(prev => new Set(prev).add(activityType));
    setTotalScore(prev => prev + score);
    setCurrentActivity(null);

    // Se todas as atividades foram concluídas, finalizar seção
    if (completedActivities.size + 1 >= getAvailableActivities().length) {
      setTimeout(() => {
        void onComplete();
      }, 1000);
    }
  };

  const getActivityQuestionCount = (activityType: string) => {
    switch (activityType) {
      case 'flashcards':
        return activities.flashcards?.length || 0;
      case 'drag_drop':
        return activities.drag_drop?.items?.length || 0;
      case 'fill_blanks':
        return activities.fill_blanks?.questions?.reduce((total: number, q: any) => total + q.blanks.length, 0) || 0;
      default:
        return 0;
    }
  };

  const getAvailableActivities = () => {
    const available = [];
    
    if (activities.flashcards?.length > 0) {
      available.push({
        type: 'flashcards',
        name: 'Flashcards',
        description: 'Teste sua memória com cartões de estudo',
        icon: '🃏',
        color: 'from-blue-500 to-blue-700'
      });
    }
    
    if (activities.drag_drop?.items?.length > 0) {
      available.push({
        type: 'drag_drop',
        name: 'Arrastar e Soltar',
        description: 'Categorize os elementos arrastando para o lugar correto',
        icon: '🎯',
        color: 'from-green-500 to-green-700'
      });
    }
    
    if (activities.fill_blanks?.questions?.length > 0) {
      available.push({
        type: 'fill_blanks',
        name: 'Preencher Lacunas',
        description: 'Complete o texto com as palavras corretas',
        icon: '📝',
        color: 'from-purple-500 to-purple-700'
      });
    }
    
    return available;
  };

  const renderCurrentActivity = () => {
    switch (currentActivity) {
      case 'flashcards':
        return (
          <FlashcardGame
            flashcards={activities.flashcards}
            onComplete={(score, timeSpent) => handleActivityComplete('flashcards', score, timeSpent)}
          />
        );
      
      case 'drag_drop':
        return (
          <DragDropActivity
            items={activities.drag_drop.items}
            categories={activities.drag_drop.categories}
            title={activities.drag_drop.title}
            onComplete={(score, timeSpent) => handleActivityComplete('drag_drop', score, timeSpent)}
          />
        );
      
      case 'fill_blanks':
        return (
          <FillBlanksGame
            questions={activities.fill_blanks.questions}
            title={activities.fill_blanks.title}
            onComplete={(score, timeSpent) => handleActivityComplete('fill_blanks', score, timeSpent)}
          />
        );
      
      default:
        return null;
    }
  };

  if (currentActivity) {
    return (
      <div>
        <Button 
          onClick={() => setCurrentActivity(null)}
          variant="ghost"
          className="mb-4 text-white hover:bg-white/10"
        >
          ← Voltar às Atividades
        </Button>
        {renderCurrentActivity()}
      </div>
    );
  }

  const availableActivities = getAvailableActivities();
  const allCompleted = completedActivities.size >= availableActivities.length;

  if (allCompleted) {
    return (
      <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl">
        <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
        <h3 className="text-2xl font-bold text-white mb-4">
          Seção Interativa Concluída! 🎉
        </h3>
        <p className="text-white/80 mb-4">
          Pontuação total: {totalScore} pontos
        </p>
        <p className="text-white/60 text-sm">
          Avançando para a próxima seção...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Gamepad2 className="mx-auto mb-4 text-cyan-400" size={48} />
        <h2 className="text-2xl font-bold text-white mb-2">Fixação Interativa</h2>
        <p className="text-white/80 mb-4">
          Pratique e internalize o conteúdo com atividades gamificadas
        </p>
        
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="text-cyan-400" size={16} />
            <span className="text-white/80">5-7 minutos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-400" size={16} />
            <span className="text-white/80">Pontos: {totalScore}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableActivities.map((activity) => (
          <div
            key={activity.type}
            onClick={() => !completedActivities.has(activity.type) && setCurrentActivity(activity.type)}
            className={`bg-gradient-to-br ${activity.color} rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 shadow-lg ${
              completedActivities.has(activity.type) ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">{activity.icon}</div>
              {completedActivities.has(activity.type) && (
                <div className="text-2xl">✅</div>
              )}
            </div>
            
            <h3 className="font-bold text-white text-lg mb-2">
              {activity.name}
            </h3>
            
            <p className="text-white/80 text-sm">
              {activity.description}
            </p>
            
            {completedActivities.has(activity.type) && (
              <p className="text-white/60 text-xs mt-2">
                Concluída ✓
              </p>
            )}
          </div>
        ))}
      </div>
      
      {loading && (
        <div className="text-center">
          <p className="text-white/80">Salvando progresso...</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveSection;
