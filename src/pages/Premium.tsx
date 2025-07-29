
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown, Star, Zap, Shield } from 'lucide-react';

const Premium = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const premiumFeatures = [
    {
      icon: Crown,
      title: 'Acesso Ilimitado',
      description: 'Todos os conteúdos e exercícios desbloqueados'
    },
    {
      icon: Star,
      title: 'Conteúdo Exclusivo',
      description: 'Materiais premium e simulados especiais'
    },
    {
      icon: Zap,
      title: 'Progresso Acelerado',
      description: 'XP em dobro e hearts infinitos'
    },
    {
      icon: Shield,
      title: 'Suporte Prioritário',
      description: 'Atendimento VIP e recursos avançados'
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
          <h1 className="text-lg font-bold">Premium</h1>
          <p className="text-white/80 text-xs">Desbloqueie todo o potencial do EduGame</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 py-6 space-y-6">
            {/* Premium Badge */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center">
              <Crown size={48} className="mx-auto mb-3 text-white" />
              <h2 className="text-white text-xl font-bold mb-2">EduGame Premium</h2>
              <p className="text-white/90 text-sm">A melhor experiência de aprendizado</p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm">Recursos Premium</h3>
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-3">
                  <div className="bg-white/30 rounded-lg p-2">
                    <feature.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-xs">{feature.title}</h4>
                    <p className="text-white/80 text-[10px]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Status */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-white font-semibold text-sm mb-2">Status Atual</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${profile?.subscription_type === 'premium' ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span className="text-white text-xs">
                  {profile?.subscription_type === 'premium' ? 'Premium Ativo' : 'Conta Gratuita'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            {profile?.subscription_type !== 'premium' && (
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl hover:opacity-90">
                Assinar Premium
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Premium;
