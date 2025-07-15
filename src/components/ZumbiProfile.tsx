import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Star, Trophy } from 'lucide-react';

interface ZumbiProfileProps {
  onClose: () => void;
  onStartQuiz: () => void;
  affinityLevel: number;
  experience: number;
}

const ZumbiProfile: React.FC<ZumbiProfileProps> = ({
  onClose,
  onStartQuiz,
  affinityLevel,
  experience
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-6 max-w-md w-full mx-4 relative border-2 border-amber-200 dark:border-amber-700">
        {/* Botão de fechar */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </Button>

        {/* Avatar e informações principais */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-4 border-amber-200 dark:border-amber-700">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center">
              <Trophy className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Zumbi dos Palmares
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            O Guardião da História
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="text-yellow-500 fill-current" size={20} />
            <span className="text-orange-600 dark:text-orange-400 font-bold">
              Nível {affinityLevel}
            </span>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Líder Guerreiro
          </p>
        </div>

        {/* Frase do personagem */}
        <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 mb-6 border-l-4 border-orange-500">
          <p className="text-gray-700 dark:text-gray-300 italic text-center">
            "Salve, jovem estudante! Que páginas do passado descobriremos hoje?"
          </p>
        </div>

        {/* Slogan */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
            A história é mestra da vida.
          </h3>
        </div>

        {/* Barra de experiência */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Experiência
            </span>
            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
              {experience}/100 XP
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-600 h-full transition-all duration-300"
              style={{ width: `${(experience % 100)}%` }}
            />
          </div>
        </div>

        {/* Botão para começar */}
        <Button
          onClick={onStartQuiz}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Trophy className="mr-2" size={20} />
          Vamos começar a estudar!
        </Button>
      </div>
    </div>
  );
};

export default ZumbiProfile;