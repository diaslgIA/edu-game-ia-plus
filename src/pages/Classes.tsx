
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Users, MessageSquare, User, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isTeacher: boolean;
  avatar?: string;
}

interface ClassRoom {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  studentCount: number;
  description: string;
}

const Classes = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const classRooms: ClassRoom[] = [
    {
      id: '1',
      name: 'Matemática - 2º Ano',
      subject: 'Matemática',
      teacher: 'Prof. Ana Silva',
      studentCount: 32,
      description: 'Álgebra e Geometria para ENEM'
    },
    {
      id: '2',
      name: 'Português - Literatura',
      subject: 'Português',
      teacher: 'Prof. Carlos Santos',
      studentCount: 28,
      description: 'Literatura Brasileira e Redação'
    },
    {
      id: '3',
      name: 'Física - Mecânica',
      subject: 'Física',
      teacher: 'Prof. Maria Oliveira',
      studentCount: 25,
      description: 'Mecânica Clássica e Cinemática'
    },
    {
      id: '4',
      name: 'Química Orgânica',
      subject: 'Química',
      teacher: 'Prof. João Costa',
      studentCount: 30,
      description: 'Compostos Orgânicos e Reações'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Prof. Ana Silva',
      message: 'Boa tarde, turma! Hoje vamos revisar equações do segundo grau. Alguém tem dúvidas sobre a aula anterior?',
      timestamp: '14:30',
      isTeacher: true
    },
    {
      id: '2',
      sender: 'João Pedro',
      message: 'Professor, eu não entendi muito bem o delta negativo. Pode explicar novamente?',
      timestamp: '14:32',
      isTeacher: false
    },
    {
      id: '3',
      sender: 'Prof. Ana Silva',
      message: 'Claro, João! Quando o delta é negativo, significa que a equação não tem raízes reais. Vou fazer um exemplo no quadro virtual.',
      timestamp: '14:35',
      isTeacher: true
    },
    {
      id: '4',
      sender: 'Maria Clara',
      message: 'Obrigada pela explicação! Agora ficou mais claro.',
      timestamp: '14:40',
      isTeacher: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada para a turma!",
      });
      setNewMessage('');
    }
  };

  const filteredClasses = classRooms.filter(classRoom =>
    classRoom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classRoom.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classRoom.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedClass) {
    const currentClass = classRooms.find(c => c.id === selectedClass);
    
    return (
      <MobileContainer background="gradient">
        <div className="flex flex-col h-full">
          {/* Header - Fixo */}
          <div className="bg-white/10 backdrop-blur-md text-white p-3 flex items-center space-x-3 rounded-b-3xl flex-shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedClass(null)}
              className="text-white p-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="flex-1">
              <h1 className="text-sm font-semibold">{currentClass?.name}</h1>
              <p className="text-white/80 text-xs">{currentClass?.teacher} • {currentClass?.studentCount} alunos</p>
            </div>
            <Users size={18} className="text-white/80" />
          </div>

          {/* Messages - Scrollable */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === profile?.full_name ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-2 rounded-xl text-xs ${
                  message.isTeacher 
                    ? 'bg-yellow-500 text-black' 
                    : message.sender === profile?.full_name
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                }`}>
                  <div className="flex items-center space-x-1 mb-1">
                    {message.isTeacher && <Crown size={10} className="text-yellow-800" />}
                    <span className="font-semibold text-[10px]">{message.sender}</span>
                    <span className="text-[9px] opacity-70">{message.timestamp}</span>
                  </div>
                  <p className="text-[11px]">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input - Fixo */}
          <div className="p-3 bg-white/10 backdrop-blur-md flex-shrink-0 pb-20">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <BottomNavigation />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header - Fixo */}
        <div className="bg-white/10 backdrop-blur-md text-white p-3 flex items-center space-x-3 rounded-b-3xl flex-shrink-0">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-base font-semibold flex items-center space-x-2">
            <span>Turmas</span>
            <Users size={18} />
          </h1>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4 space-y-4">
            {/* Search */}
            <div>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar turmas..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm"
              />
            </div>

            {/* Class Rooms */}
            <div className="space-y-3">
              {filteredClasses.map((classRoom) => (
                <div
                  key={classRoom.id}
                  onClick={() => setSelectedClass(classRoom.id)}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-sm mb-1">{classRoom.name}</h3>
                      <p className="text-white/80 text-xs">{classRoom.description}</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2">
                      <MessageSquare size={16} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{classRoom.teacher}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{classRoom.studentCount} alunos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Classes;
