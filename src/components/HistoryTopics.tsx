import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight, Clock, Target } from 'lucide-react';

interface HistoryTopicsProps {
  theme: string;
  onBack: () => void;
  onSelectTopic: (topic: string) => void;
}

const HistoryTopics: React.FC<HistoryTopicsProps> = ({ theme, onBack, onSelectTopic }) => {
  const getTopicsForTheme = (theme: string) => {
    if (theme === 'História do Brasil') {
      return [
        { id: 'Brasil Colônia', name: 'Brasil Colônia', icon: '⛵', description: 'Período colonial brasileiro (1500-1822)', difficulty: 'Médio' },
        { id: 'Brasil Império', name: 'Brasil Império', icon: '👑', description: 'Período imperial (1822-1889)', difficulty: 'Médio' },
        { id: 'República Velha', name: 'República Velha', icon: '🏛️', description: 'Primeira fase republicana (1889-1930)', difficulty: 'Médio' },
        { id: 'Era Vargas', name: 'Era Vargas', icon: '🎩', description: 'Governo de Getúlio Vargas (1930-1954)', difficulty: 'Difícil' },
        { id: 'Ditadura Militar', name: 'Ditadura Militar', icon: '🪖', description: 'Regime militar (1964-1985)', difficulty: 'Difícil' },
        { id: 'Nova República', name: 'Nova República', icon: '🗳️', description: 'Período democrático (1985-presente)', difficulty: 'Médio' }
      ];
    } else if (theme === 'História Geral') {
      return [
        { id: 'Antiguidade Clássica', name: 'Antiguidade Clássica', icon: '🏛️', description: 'Grécia e Roma antigas', difficulty: 'Médio' },
        { id: 'Idade Média', name: 'Idade Média', icon: '🏰', description: 'Período medieval (séc. V-XV)', difficulty: 'Médio' },
        { id: 'Idade Moderna', name: 'Idade Moderna', icon: '🚢', description: 'Descobrimentos e absolutismo (séc. XV-XVIII)', difficulty: 'Médio' },
        { id: 'Revolução Industrial', name: 'Revolução Industrial', icon: '🏭', description: 'Transformações econômicas (séc. XVIII-XIX)', difficulty: 'Difícil' },
        { id: 'Guerras Mundiais e Guerra Fria', name: 'Guerras Mundiais e Guerra Fria', icon: '⚔️', description: 'Conflitos do século XX', difficulty: 'Difícil' }
      ];
    }
    return [];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Médio': return 'text-yellow-400';
      case 'Difícil': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const topics = getTopicsForTheme(theme);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="text-white p-2 hover:bg-white/20 rounded-xl"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold flex items-center space-x-2">
          <BookOpen size={20} />
          <span>{theme}</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Tópicos</h2>
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-2xl shadow-lg">
                    {topic.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{topic.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{topic.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Target size={12} className="text-blue-400" />
                        <span className="text-white/80">Quiz</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen size={12} className="text-green-400" />
                        <span className="text-white/80">Teoria</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-white/60 text-2xl">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTopics;