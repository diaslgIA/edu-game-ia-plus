
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
        <div className="flex flex-col h-full pb-20">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedClass(null)}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{currentClass?.name}</h1>
              <p className="text-white/80 text-sm">{currentClass?.teacher} • {currentClass?.studentCount} alunos</p>
            </div>
            <Users size={20} className="text-white/80" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === profile?.full_name ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isTeacher 
                    ? 'bg-yellow-500 text-black' 
                    : message.sender === profile?.full_name
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.isTeacher && <Crown size={14} className="text-yellow-800" />}
                    <span className="font-semibold text-sm">{message.sender}</span>
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white/10 backdrop-blur-md">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4"
              >
                <Send size={18} />
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
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-white p-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Turmas</span>
            <Users size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Search */}
          <div className="space-y-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar turmas..."
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
          </div>

          {/* Class Rooms */}
          <div className="space-y-4">
            {filteredClasses.map((classRoom) => (
              <div
                key={classRoom.id}
                onClick={() => setSelectedClass(classRoom.id)}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 cursor-pointer hover:bg-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg mb-1">{classRoom.name}</h3>
                    <p className="text-white/80 text-sm">{classRoom.description}</p>
                  </div>
                  <div className="bg-white/20 rounded-full p-2">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{classRoom.teacher}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{classRoom.studentCount} alunos</span>
                  </div>
                </div>
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
