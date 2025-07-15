import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';

interface HistoryThemesProps {
  onBack: () => void;
  onSelectTheme: (theme: string) => void;
}

const HistoryThemes: React.FC<HistoryThemesProps> = ({ onBack, onSelectTheme }) => {
  const themes = [
    {
      id: 'História do Brasil',
      name: 'História do Brasil',
      description: 'Desde o período colonial até os dias atuais',
      icon: '🇧🇷',
      color: 'from-green-500 to-green-700',
      topics: 6
    },
    {
      id: 'História Geral',
      name: 'História Geral',
      description: 'Grandes marcos da história mundial',
      icon: '🌍',
      color: 'from-blue-500 to-blue-700',
      topics: 5
    }
  ];

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
          <span>História</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Grandes Temas</h2>
          <div className="space-y-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/25 transition-all hover:scale-105 shadow-lg border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {theme.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{theme.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{theme.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-lg text-white">
                        {theme.topics} tópicos
                      </span>
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

export default HistoryThemes;