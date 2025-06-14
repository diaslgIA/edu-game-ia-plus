
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useSound } from '@/contexts/SoundContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, BarChart3, ArrowRight } from 'lucide-react';

const Progress = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleBack = () => {
    playSound('click');
    navigate(-1); // Voltar para a página anterior
  };

  const handleRankingClick = () => {
    playSound('click');
    navigate('/ranking');
  };

  const subjects = [
    { name: 'Matemática', progress: 86, color: 'text-red-500', bgColor: 'bg-red-100' },
    { name: 'Português', progress: 60, color: 'text-gray-500', bgColor: 'bg-gray-100' },
    { name: 'História', progress: 64, color: 'text-gray-600', bgColor: 'bg-gray-200' },
    { name: 'Biologia', progress: 38, color: 'text-green-500', bgColor: 'bg-green-100' },
  ];

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBack}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Resumo do progresso</span>
            <BarChart3 size={20} />
          </h1>
        </div>

        {/* Progress cards */}
        <div className="p-6 space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                {/* Subject icon */}
                <div className={`w-16 h-16 ${subject.bgColor} rounded-2xl flex items-center justify-center`}>
                  {subject.name === 'Matemática' && (
                    <div className="text-2xl">📊</div>
                  )}
                  {subject.name === 'Português' && (
                    <div className="text-2xl">📚</div>
                  )}
                  {subject.name === 'História' && (
                    <div className="text-2xl">📜</div>
                  )}
                  {subject.name === 'Biologia' && (
                    <div className="text-2xl">🧬</div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{subject.name}</h3>
                  
                  {/* Progress bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          subject.progress >= 80 ? 'bg-red-500' :
                          subject.progress >= 60 ? 'bg-gray-500' :
                          subject.progress >= 40 ? 'bg-gray-600' : 'bg-green-500'
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${
                      subject.progress >= 80 ? 'bg-red-500' :
                      subject.progress >= 60 ? 'bg-gray-500' :
                      subject.progress >= 40 ? 'bg-gray-600' : 'bg-green-500'
                    } flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{subject.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Ranking access */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
            <Button 
              onClick={handleRankingClick}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-2xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Trophy size={24} className="text-yellow-500" />
                <span>Acesso ao Ranking</span>
              </div>
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Progress;
