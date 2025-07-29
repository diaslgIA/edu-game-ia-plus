
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, Brain, Play, Trophy } from 'lucide-react';

interface StudyIntroProps {
  title: string;
  description: string;
  sectionsCount: number;
  estimatedTime: number;
  difficulty: string;
  onStart: () => void;
}

const StudyIntro: React.FC<StudyIntroProps> = ({
  title,
  description,
  sectionsCount,
  estimatedTime,
  difficulty,
  onStart
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 border-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 border-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 border-red-400 bg-red-500/20';
      default: return 'text-gray-400 border-gray-400 bg-gray-500/20';
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

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
          <BookOpen size={32} className="text-white" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/80 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Study Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Brain size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Seções</p>
              <p className="text-white font-bold">{sectionsCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Tempo</p>
              <p className="text-white font-bold">{estimatedTime}min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty & Rewards */}
      <div className="space-y-4">
        <div className={`border rounded-xl p-4 ${getDifficultyColor(difficulty)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-1">Nível de Dificuldade</p>
              <p className="text-sm opacity-80">
                {getDifficultyText(difficulty)} - {
                  difficulty === 'easy' ? 'Conceitos fundamentais' :
                  difficulty === 'medium' ? 'Conhecimento intermediário' :
                  'Tópico avançado'
                }
              </p>
            </div>
            <div className="text-2xl">
              {difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 font-semibold mb-1 flex items-center space-x-2">
                <Trophy size={18} />
                <span>Recompensas do Estudo</span>
              </p>
              <p className="text-yellow-200/80 text-sm">
                Ganhe XP por cada seção completada e desbloqueie conquistas!
              </p>
            </div>
            <div className="text-right">
              <p className="text-yellow-300 font-bold text-lg">
                {Math.floor(estimatedTime * 2)} XP
              </p>
              <p className="text-yellow-200/60 text-xs">máximo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Features */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Star size={18} className="text-yellow-400" />
          <span>O que você vai aprender:</span>
        </h4>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Conteúdo dividido em seções digestíveis</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Feedback do mentor a cada progresso</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Sistema de pontuação gamificado</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Progresso salvo automaticamente</span>
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <div className="pt-4">
        <Button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 text-lg shadow-lg"
        >
          <Play className="mr-2" size={20} />
          Começar Estudo
        </Button>
      </div>
    </div>
  );
};

export default StudyIntro;
