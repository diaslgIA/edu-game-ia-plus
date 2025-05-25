
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Headphones } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Support = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Lara Gidi',
    email: user?.email || 'larinha07@gmail.com',
    phone: '71-996894503',
    description: 'O app fecha sozinho quando acerto as questões de matemática nos desafios. Já tentei várias vezes e não consigo avançar. Podem ajudar?'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

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
          <h1 className="text-lg font-semibold">Suporte</h1>
        </div>

        {/* Support form */}
        <div className="p-6">
          {/* Support icon */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Headphones size={40} className="text-white" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Seu nome</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-0 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">E-mail</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-0 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Número de telefone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white border-0 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Descrição do problema</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-white border-0 rounded-xl min-h-[120px] resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 rounded-2xl text-lg"
            >
              Conversar agora
            </Button>
          </form>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Support;
