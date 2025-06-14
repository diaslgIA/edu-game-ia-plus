
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
    alert('Mensagem enviada! Responderemos em breve.');
    setFormData({ subject: '', message: '', type: 'question' });
  };

  const faqItems = [
    {
      question: 'Como funciona o sistema de pontos?',
      answer: 'Você ganha pontos completando atividades, assistindo vídeos e participando de simulados.'
    },
    {
      question: 'Posso estudar offline?',
      answer: 'Alguns conteúdos podem ser baixados para estudo offline.'
    },
    {
      question: 'Como funciona a assinatura premium?',
      answer: 'A assinatura premium oferece acesso ilimitado a todos os conteúdos.'
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header - Fixo */}
        <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-b-3xl flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white p-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <Logo size="md" showText={false} />
            <div className="w-10" />
          </div>
          <h1 className="text-lg font-bold">Suporte</h1>
          <p className="text-white/80 text-xs">Como podemos ajudar você, {profile?.full_name || 'estudante'}?</p>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 py-3 space-y-4">
            {/* FAQ Section */}
            <div>
              <h2 className="text-white text-sm font-semibold mb-3">Perguntas Frequentes</h2>
              <div className="space-y-2">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-white">
                    <h3 className="font-semibold mb-1 text-xs">{item.question}</h3>
                    <p className="text-[11px] text-white/80">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-white text-sm font-semibold mb-3">Entre em Contato</h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label className="text-white text-xs">Tipo de Solicitação</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {supportTypes.map((type) => (
                        <Button
                          key={type.id}
                          type="button"
                          variant={formData.type === type.id ? "default" : "outline"}
                          className={`h-auto p-2 text-[10px] ${
                            formData.type === type.id 
                              ? 'bg-white text-purple-600' 
                              : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                          }`}
                          onClick={() => setFormData({...formData, type: type.id})}
                        >
                          <type.icon size={12} className="mr-1" />
                          <span>{type.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white text-xs">Assunto</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Descreva brevemente sua solicitação"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white text-xs">Mensagem</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Descreva sua dúvida ou problema em detalhes"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 min-h-[80px] text-xs"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold text-sm"
                  >
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-white">
              <h3 className="font-semibold mb-2 text-xs">Outras formas de contato</h3>
              <div className="space-y-1 text-[10px] text-white/80">
                <p>📧 suporte@edugameia.com</p>
                <p>📱 WhatsApp: (11) 99999-9999</p>
                <p>🕒 Atendimento: Seg-Sex, 9h às 18h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Support;
