
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageCircle, HelpCircle, Bug, Star } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    type: 'question'
  });

  const supportTypes = [
    { id: 'question', label: 'Dúvida', icon: HelpCircle },
    { id: 'bug', label: 'Problema técnico', icon: Bug },
    { id: 'suggestion', label: 'Sugestão', icon: Star },
    { id: 'other', label: 'Outro', icon: MessageCircle }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria o envio do ticket de suporte
    alert('Mensagem enviada! Responderemos em breve.');
    setFormData({ subject: '', message: '', type: 'question' });
  };

  const faqItems = [
    {
      question: 'Como funciona o sistema de pontos?',
      answer: 'Você ganha pontos completando atividades, assistindo vídeos e participando de simulados. Os pontos ajudam a subir de nível e desbloquear conteúdos.'
    },
    {
      question: 'Posso estudar offline?',
      answer: 'Alguns conteúdos podem ser baixados para estudo offline. Verifique o ícone de download nas atividades disponíveis.'
    },
    {
      question: 'Como funciona a assinatura premium?',
      answer: 'A assinatura premium oferece acesso ilimitado a todos os conteúdos, simulados exclusivos e suporte prioritário.'
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-b-3xl">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <Logo size="sm" showText={false} />
            <div className="w-10" />
          </div>
          <h1 className="text-2xl font-bold">Suporte</h1>
          <p className="text-white/80">Como podemos ajudar você, {profile?.full_name || 'estudante'}?</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {/* FAQ Section */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Perguntas Frequentes</h2>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-sm text-white/80">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">Entre em Contato</h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-white">Tipo de Solicitação</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {supportTypes.map((type) => (
                      <Button
                        key={type.id}
                        type="button"
                        variant={formData.type === type.id ? "default" : "outline"}
                        className={`h-auto p-3 ${
                          formData.type === type.id 
                            ? 'bg-white text-purple-600' 
                            : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                        }`}
                        onClick={() => setFormData({...formData, type: type.id})}
                      >
                        <type.icon size={16} className="mr-2" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white">Assunto</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Descreva brevemente sua solicitação"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Descreva sua dúvida ou problema em detalhes"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[100px]"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-2">Outras formas de contato</h3>
            <div className="space-y-1 text-sm text-white/80">
              <p>📧 suporte@edugameia.com</p>
              <p>📱 WhatsApp: (11) 99999-9999</p>
              <p>🕒 Atendimento: Seg-Sex, 9h às 18h</p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Support;
