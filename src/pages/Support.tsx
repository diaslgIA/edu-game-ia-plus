
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageCircle, HelpCircle, Bug, Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    type: 'question'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportTypes = [
    { id: 'question', label: t('support.question'), icon: HelpCircle },
    { id: 'bug', label: t('support.bug'), icon: Bug },
    { id: 'suggestion', label: t('support.suggestion'), icon: Star },
    { id: 'other', label: t('support.other'), icon: MessageCircle }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: t('general.error'),
        description: "Você precisa estar logado para enviar uma solicitação de suporte.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: t('general.error'),
        description: "Por favor, preencha o assunto e a mensagem.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Enviando solicitação de suporte:', {
        user_id: user.id,
        request_type: formData.type,
        subject: formData.subject,
        message: formData.message,
        user_email: user.email,
        user_name: profile?.full_name
      });

      // Chamar a edge function para enviar email e salvar no banco
      const { data, error } = await supabase.functions.invoke('send-support-email', {
        body: {
          user_id: user.id,
          request_type: formData.type,
          subject: formData.subject,
          message: formData.message,
          user_email: user.email,
          user_name: profile?.full_name
        }
      });

      if (error) {
        console.error('Erro ao enviar solicitação:', error);
        throw error;
      }

      console.log('Solicitação enviada com sucesso:', data);

      toast({
        title: t('general.success'),
        description: t('support.sent'),
      });

      // Limpar formulário
      setFormData({ subject: '', message: '', type: 'question' });

    } catch (error: any) {
      console.error('Erro ao enviar solicitação de suporte:', error);
      
      toast({
        title: t('general.error'),
        description: error.message || "Erro ao enviar a solicitação. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      question: 'O app não está funcionando corretamente. O que fazer?',
      answer: 'Tente atualizar para a versão mais recente ou reinstalar o app. Se o problema persistir, contate o suporte.'
    }
  ];

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full">
        {/* Header */}
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
          <h1 className="text-lg font-bold">{t('support.title')}</h1>
          <p className="text-white/80 text-xs">
            {t('support.how_can_help')}, {profile?.full_name || 'estudante'}?
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 py-3 space-y-4">
            {/* FAQ Section */}
            <div>
              <h2 className="text-white text-sm font-semibold mb-3">{t('support.faq')}</h2>
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
              <h2 className="text-white text-sm font-semibold mb-3">{t('support.contact')}</h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <Label className="text-white text-xs">{t('support.request_type')}</Label>
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
                    <Label htmlFor="subject" className="text-white text-xs">{t('support.subject')}</Label>
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
                    <Label htmlFor="message" className="text-white text-xs">{t('support.message')}</Label>
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
                    disabled={isSubmitting}
                    className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Send size={14} className="mr-1 animate-pulse" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={14} className="mr-1" />
                        {t('support.send')}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-white">
              <h3 className="font-semibold mb-2 text-xs">Outras formas de contato</h3>
              <div className="space-y-1 text-[10px] text-white/80">
                <p>📧 iaedugame@gmail.com</p>
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
