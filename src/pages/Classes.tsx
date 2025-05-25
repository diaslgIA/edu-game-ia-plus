
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Users } from 'lucide-react';

const Classes = () => {
  const navigate = useNavigate();

  const teachers = [
    { name: 'Márcia Leal', subject: 'Matemática', avatar: '👩‍🏫' },
    { name: 'Fábio Souza', subject: 'Física', avatar: '👨‍💼' },
    { name: 'Akita Yang', subject: 'Química', avatar: '👩‍🔬' }
  ];

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
          <h1 className="text-lg font-semibold">Classe</h1>
        </div>

        {/* Classroom illustration */}
        <div className="p-6">
          <div className="bg-slate-800 rounded-2xl p-8 mb-6 flex justify-center">
            <div className="text-center text-white">
              <Users size={48} className="mx-auto mb-4" />
              <div className="text-6xl mb-4">👥</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              className="w-full bg-gray-100 rounded-2xl py-3 px-4 pr-10 text-gray-800"
              readOnly
            />
          </div>

          {/* Teachers list */}
          <div className="space-y-4">
            {teachers.map((teacher, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl">
                    {teacher.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                    <p className="text-gray-600 text-sm">{teacher.subject}</p>
                  </div>
                </div>
                <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-4 py-2 rounded-xl">
                  INSCREVA-SE
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Classes;
