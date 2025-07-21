
import React from 'react';
import { Clock, Target, Star, Play, CheckCircle } from 'lucide-react';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    difficulty_level: string;
    estimated_time: number;
    key_concepts?: any; // Changed to any to handle Json type from Supabase
    explanation?: string;
  };
  index: number;
  progress: any;
  onTopicClick: (topicId: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, index, progress, onTopicClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Médio';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '●';
      case 'medium': return '●●';
      case 'hard': return '●●●';
      default: return '●●';
    }
  };

  const parseKeyConcepts = (concepts: any): string[] => {
    if (!concepts) return [];
    if (Array.isArray(concepts)) return concepts;
    if (typeof concepts === 'string') {
      try {
        const parsed = JSON.parse(concepts);
        return Array.isArray(parsed) ? parsed : [concepts];
      } catch {
        return [concepts];
      }
    }
    return [];
  };

  const keyConcepts = parseKeyConcepts(topic.key_concepts);

  return (
    <div
      onClick={() => onTopicClick(topic.id)}
      className="bg-white/15 backdrop-blur-md rounded-2xl p-5 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
    >
      {/* Topic Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg relative flex-shrink-0">
          <span className="font-bold text-lg">{index + 1}</span>
          {progress && progress.completed && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={12} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">{topic.title}</h3>
          <p className="text-white/80 text-sm mb-3 line-clamp-2">{topic.description}</p>
          
          {/* Explanation Preview */}
          {topic.explanation && (
            <div className="bg-blue-500/20 rounded-lg p-3 mb-3 border border-blue-500/30">
              <p className="text-blue-100 text-xs line-clamp-3">{topic.explanation}</p>
            </div>
          )}
          
          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock size={12} className="text-blue-400" />
                <span className="text-white/80">{topic.estimated_time || 15} min</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Target size={12} className="text-purple-400" />
                <span className={`${getDifficultyColor(topic.difficulty_level || 'medium')} font-medium`}>
                  {getDifficultyText(topic.difficulty_level || 'medium')}
                </span>
                <span className={getDifficultyColor(topic.difficulty_level || 'medium')}>
                  {getDifficultyIcon(topic.difficulty_level || 'medium')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Play size={12} className="text-white/60" />
              <span className="text-white/60">Estudar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      {keyConcepts.length > 0 && (
        <div className="border-t border-white/10 pt-3">
          <div className="flex items-center mb-2">
            <Star size={12} className="text-yellow-400 mr-1" />
            <span className="text-white/70 text-xs font-medium">Conceitos principais:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {keyConcepts.slice(0, 4).map((concept, idx) => (
              <span 
                key={idx} 
                className="bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs border border-white/10"
              >
                {concept}
              </span>
            ))}
            {keyConcepts.length > 4 && (
              <span className="text-white/60 text-xs px-2 py-1">
                +{keyConcepts.length - 4} mais
              </span>
            )}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {progress && progress.progress_percentage > 0 && (
        <div className="border-t border-white/10 pt-3 mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-xs">Progresso</span>
            <span className="text-green-400 text-xs font-medium">
              {progress.progress_percentage}%
            </span>
          </div>
          <div className="bg-white/20 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress.progress_percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
