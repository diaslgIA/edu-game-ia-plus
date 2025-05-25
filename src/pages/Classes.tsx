
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import TeacherContent from '@/components/TeacherContent';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Users, Play, BookOpen, Award, Crown, Star, Lock, CheckCircle } from 'lucide-react';

const Classes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<string[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [completedContent, setCompletedContent] = useState<string[]>([]);

  // Simular status de assinatura
  const isPremiumUser = false; // Mudar para true para testar como usuário premium

  const teachers = [
    { 
      id: 'marcia-math',
      name: 'Márcia Leal', 
      subject: 'Matemática', 
      avatar: '👩‍🏫',
      specialties: ['Álgebra', 'Geometria', 'Trigonometria'],
      students: 1250,
      rating: 4.9,
      modules: 12,
      contentType: 'video' as const,
      freeContent: 2
    },
    { 
      id: 'fabio-physics',
      name: 'Fábio Souza', 
      subject: 'Física', 
      avatar: '👨‍💼',
      specialties: ['Mecânica', 'Eletromagnetismo', 'Óptica'],
      students: 980,
      rating: 4.8,
      modules: 15,
      contentType: 'slides' as const,
      freeContent: 1
    },
    { 
      id: 'akita-chemistry',
      name: 'Akita Yang', 
      subject: 'Química', 
      avatar: '👩‍🔬',
      specialties: ['Química Orgânica', 'Físico-Química', 'Química Geral'],
      students: 756,
      rating: 4.7,
      modules: 10,
      contentType: 'video' as const,
      freeContent: 1
    }
  ];

  const handleEnroll = (teacherId: string) => {
    if (!enrolledClasses.includes(teacherId)) {
      setEnrolledClasses([...enrolledClasses, teacherId]);
    }
    setSelectedTeacher(teacherId);
    setShowContent(true);
  };

  const handleContentComplete = () => {
    if (selectedTeacher && !completedContent.includes(selectedTeacher)) {
      setCompletedContent([...completedContent, selectedTeacher]);
    }
    setShowContent(false);
  };

  const selectedTeacherData = teachers.find(t => t.id === selectedTeacher);

  if (showContent && selectedTeacherData) {
    return (
      <MobileContainer background="light">
        <div className="flex flex-col h-full pb-20">
          {/* Header */}
          <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowContent(false)}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size="sm" />
            <h1 className="text-lg font-semibold">Aula - {selectedTeacherData.subject}</h1>
          </div>

          <div className="p-6">
            <TeacherContent
              teacher={selectedTeacherData.name}
              subject={selectedTeacherData.subject}
              contentType={selectedTeacherData.contentType}
              isPremium={isPremiumUser}
              onContentComplete={handleContentComplete}
            />

            {/* Activity Button */}
            <div className="mt-6">
              <Button
                onClick={() => navigate('/exercises')}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2"
              >
                <Award size={20} />
                <span>Fazer Atividade da Aula</span>
              </Button>
            </div>
          </div>
        </div>
        
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="light">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <Logo size="sm" />
          <h1 className="text-lg font-semibold">Mural dos Professores</h1>
        </div>

        {/* Hero Section */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 text-yellow-300 text-3xl">🎓</div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Aprenda com os Melhores Professores</h2>
              <p className="text-white/80 text-sm mb-4">
                Inscreva-se nas salas de aula dos professores especialistas e tenha acesso a conteúdo exclusivo
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{teachers.length}</div>
                  <div className="text-xs opacity-80">Professores</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{teachers.reduce((acc, t) => acc + t.modules, 0)}</div>
                  <div className="text-xs opacity-80">Módulos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{teachers.reduce((acc, t) => acc + t.students, 0)}</div>
                  <div className="text-xs opacity-80">Alunos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar professor ou matéria..."
              className="w-full bg-gray-100 rounded-2xl py-3 pl-10 pr-4 text-gray-800"
            />
          </div>

          {/* Subscription Status */}
          {!isPremiumUser && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 rounded-full p-2">
                  <Crown className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800">Plano Gratuito</h3>
                  <p className="text-orange-600 text-sm">Acesso limitado ao conteúdo dos professores</p>
                </div>
                <Button
                  onClick={() => navigate('/subscriptions')}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-2"
                >
                  Upgrade
                </Button>
              </div>
            </div>
          )}

          {/* Teachers list */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center space-x-2">
              <Users size={20} />
              <span>Professores Disponíveis</span>
            </h3>
            
            {teachers.map((teacher) => {
              const isEnrolled = enrolledClasses.includes(teacher.id);
              const isCompleted = completedContent.includes(teacher.id);
              
              return (
                <div key={teacher.id} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl relative">
                      {teacher.avatar}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-500 fill-current" size={14} />
                          <span className="text-sm font-medium">{teacher.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{teacher.subject}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {teacher.specialties.slice(0, 2).map((specialty, index) => (
                          <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {teacher.specialties.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            +{teacher.specialties.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{teacher.students} alunos</span>
                        <span>{teacher.modules} módulos</span>
                        <span>
                          {isPremiumUser ? 'Acesso completo' : `${teacher.freeContent} aula${teacher.freeContent > 1 ? 's' : ''} grátis`}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {isEnrolled ? (
                          <Button
                            onClick={() => handleEnroll(teacher.id)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded-xl"
                          >
                            <Play size={14} className="mr-1" />
                            Continuar Aula
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleEnroll(teacher.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-xl"
                          >
                            Inscrever-se
                          </Button>
                        )}
                        
                        {!isPremiumUser && (
                          <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
                            <Lock size={10} className="text-orange-600" />
                            <span className="text-orange-600 text-xs">Premium</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to action */}
          {!isPremiumUser && (
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center">
              <h3 className="font-bold text-lg mb-2">Desbloqueie Todo o Conteúdo</h3>
              <p className="text-white/80 text-sm mb-4">
                Acesse todas as aulas dos professores, exercícios ilimitados e muito mais!
              </p>
              <Button
                onClick={() => navigate('/subscriptions')}
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl"
              >
                Ver Planos Premium
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Classes;
