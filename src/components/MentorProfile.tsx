
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Heart, Trophy, BookOpen } from 'lucide-react';
import { getMentorBySubject, getAllMentors } from '@/data/subjectMentors';
import { useMentorAffinity } from '@/hooks/useMentorAffinity';

interface MentorProfileProps {
  mentorId: string;
  onBack: () => void;
}

const MentorProfile: React.FC<MentorProfileProps> = ({ mentorId, onBack }) => {
  const mentor = getAllMentors().find(m => m.id === mentorId);
  const { getMentorAffinity, getAffinityTitle } = useMentorAffinity();

  if (!mentor) return null;

  const affinity = getMentorAffinity(mentor.id);
  const title = getAffinityTitle(mentor.id);

  const getUnlockedBiography = (level: number) => {
    const biographies = {
      1: "Um grande pensador que mudou a história...",
      2: `${mentor.name} viveu em uma época de grandes transformações...`,
      3: `A contribuição de ${mentor.name} para ${mentor.subject} foi revolucionária...`,
    };
    
    return biographies[Math.min(level, 3) as keyof typeof biographies] || biographies[1];
  };

  const achievements = [
    { level: 1, title: "Primeiro Encontro", description: "Conheceu seu mentor", unlocked: affinity.affinity_level >= 1 },
    { level: 2, title: "Estudante Dedicado", description: "Alcançou nível 2 de afinidade", unlocked: affinity.affinity_level >= 2 },
    { level: 3, title: "Discípulo Fiel", description: "Alcançou nível 3 de afinidade", unlocked: affinity.affinity_level >= 3 },
    { level: 5, title: "Seguidor Exemplar", description: "Alcançou nível 5 de afinidade", unlocked: affinity.affinity_level >= 5 },
  ];

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: mentor.backgroundColor }}>
      {/* Header */}
      <div className="p-4 flex items-center space-x-3" style={{ background: `linear-gradient(135deg, ${mentor.color}20 0%, ${mentor.color}10 100%)` }}>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="text-gray-700 p-2 hover:bg-white/20 rounded-xl"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-lg font-semibold text-gray-800">Perfil do Mentor</h1>
      </div>

      {/* Perfil do Mentor */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 text-center" style={{ background: `linear-gradient(135deg, ${mentor.color} 0%, ${mentor.color}80 100%)` }}>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-white bg-white/20">
              {mentor.avatar}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">{mentor.name}</h2>
            <p className="text-white/90 font-medium mb-2">{mentor.title}</p>
            <p className="text-white/80 text-sm">{mentor.description}</p>
            
            {/* Status de Afinidade */}
            <div className="mt-4 bg-white/20 rounded-xl p-3">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart size={16} className="text-white" />
                <span className="text-white font-bold">Nível {affinity.affinity_level}</span>
                <div className="flex space-x-1">
                  {[...Array(Math.min(affinity.affinity_level, 5))].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-300 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-white/90 text-sm font-medium">{title}</p>
              
              {/* Barra de Progresso */}
              <div className="mt-2">
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(affinity.experience_points % 100)}%` }}
                  />
                </div>
                <p className="text-white/80 text-xs mt-1">
                  {affinity.experience_points % 100}/100 XP para o próximo nível
                </p>
              </div>
            </div>
          </div>

          {/* Frase Marcante */}
          <div className="p-4 bg-gray-50 border-l-4" style={{ borderColor: mentor.color }}>
            <p className="text-gray-700 font-medium italic text-center">
              "{mentor.catchPhrase}"
            </p>
          </div>
        </div>

        {/* Biografia */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-2" style={{ color: mentor.color }} />
            Biografia
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {getUnlockedBiography(affinity.affinity_level)}
          </p>
        </div>

        {/* Conquistas */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Trophy className="mr-2" style={{ color: mentor.color }} />
            Conquistas
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.level} className={`flex items-center space-x-3 p-3 rounded-lg ${
                achievement.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  {achievement.unlocked ? '🏆' : '🔒'}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.unlocked ? 'text-green-800' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Estatísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: mentor.color }}>
                {affinity.experience_points}
              </div>
              <div className="text-sm text-gray-600">XP Total</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: mentor.color }}>
                {affinity.affinity_level}
              </div>
              <div className="text-sm text-gray-600">Nível</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
