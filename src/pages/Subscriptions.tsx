
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DollarSign, Crown, Award, ChevronLeft, ChevronRight, Check, Star, Zap, Shield, Users, Gamepad2, BookOpen, Target, CreditCard, Smartphone } from 'lucide-react';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [selectedPayment, setSelectedPayment] = useState('credit');

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      color: 'from-gray-400 to-gray-600',
      features: [
        'Acesso limitado ao conteúdo',
        'Quiz básico',
        '5 exercícios por dia',
        'Progresso básico'
      ],
      limitations: [
        'Anúncios entre conteúdos',
        'Sem acesso a jogos avançados',
        'Sem suporte prioritário'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 19,90',
      period: '/mês',
      color: 'from-blue-500 to-purple-600',
      originalPrice: 'R$ 39,90',
      discount: '50% OFF',
      popular: true,
      features: [
        'Acesso ilimitado a todo conteúdo',
        'Jogos educativos avançados',
        'Exercícios ilimitados',
        'Acompanhamento detalhado',
        'Simulados completos do ENEM',
        'Planos de estudo personalizados',
        'Sem anúncios',
        'Suporte prioritário',
        'Estatísticas avançadas',
        'Modo offline'
      ]
    },
    {
      id: 'annual',
      name: 'Anual Premium',
      price: 'R$ 15,90',
      period: '/mês',
      color: 'from-green-500 to-emerald-600',
      originalPrice: 'R$ 239,80',
      yearlyPrice: 'R$ 190,80/ano',
      discount: '20% OFF',
      bestValue: true,
      features: [
        'Todos os benefícios Premium',
        'Desconto de 20%',
        'Acesso antecipado a novos recursos',
        'Consultoria educacional mensal',
        'Material extra exclusivo',
        'Aulas ao vivo mensais'
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo',
      installments: 'Em até 12x sem juros'
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: Smartphone,
      description: 'Aprovação instantânea',
      discount: '5% de desconto'
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      icon: DollarSign,
      description: 'Vencimento em 3 dias',
      discount: '3% de desconto'
    }
  ];

  const premiumBenefits = [
    {
      icon: Gamepad2,
      title: 'Jogos Educativos Avançados',
      description: 'Mais de 50 jogos interativos para tornar o aprendizado divertido'
    },
    {
      icon: Target,
      title: 'Simulados Completos',
      description: 'Simulados completos do ENEM com correção automática e feedback detalhado'
    },
    {
      icon: BookOpen,
      title: 'Conteúdo Ilimitado',
      description: 'Acesso total a todas as matérias, videoaulas e exercícios'
    },
    {
      icon: Star,
      title: 'Sem Anúncios',
      description: 'Estude sem interrupções e foque 100% no seu aprendizado'
    },
    {
      icon: Shield,
      title: 'Suporte Prioritário',
      description: 'Atendimento especial para dúvidas sobre conteúdo e plataforma'
    },
    {
      icon: Users,
      title: 'Grupos de Estudo',
      description: 'Participe de grupos exclusivos e troque experiências com outros estudantes'
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

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
          <h1 className="text-lg font-semibold flex items-center space-x-2">
            <span>Assinaturas</span>
            <DollarSign size={20} />
          </h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Comparison Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Por que escolher o Premium?
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                  <h3 className="font-semibold text-gray-600 mb-2">Gratuito</h3>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-center space-x-1">
                      <span>❌</span>
                      <span>Anúncios</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span>⏱️</span>
                      <span>5 exercícios/dia</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span>📚</span>
                      <span>Conteúdo limitado</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 mb-2 text-white">
                  <h3 className="font-semibold mb-2 flex items-center justify-center space-x-1">
                    <Crown size={16} />
                    <span>Premium</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center space-x-1">
                      <span>✅</span>
                      <span>Sem anúncios</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span>♾️</span>
                      <span>Ilimitado</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span>🎮</span>
                      <span>Jogos avançados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Benefits */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Crown className="text-yellow-500" size={20} />
              <span>Benefícios Premium</span>
            </h3>
            
            <div className="space-y-4">
              {premiumBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 rounded-lg p-2 text-white flex-shrink-0">
                    <benefit.icon size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{benefit.title}</h4>
                    <p className="text-gray-600 text-xs">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plan Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Escolha seu plano</h3>
            
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-4 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Mais Popular
                    </div>
                  )}
                  {plan.bestValue && (
                    <div className="absolute -top-2 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Melhor Custo-Benefício
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">{plan.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
                        <span className="text-gray-500 text-sm">{plan.period}</span>
                        {plan.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">{plan.originalPrice}</span>
                        )}
                      </div>
                      {plan.yearlyPrice && (
                        <p className="text-green-600 text-xs font-semibold">{plan.yearlyPrice}</p>
                      )}
                      {plan.discount && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {plan.discount}
                        </span>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPlan === plan.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {selectedPlan === plan.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          {selectedPlan !== 'free' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Forma de pagamento</h3>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-500 rounded-lg p-2 text-white">
                          <method.icon size={16} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{method.name}</h4>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                          {method.installments && (
                            <p className="text-blue-600 text-xs">{method.installments}</p>
                          )}
                          {method.discount && (
                            <p className="text-green-600 text-xs font-semibold">{method.discount}</p>
                          )}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedPayment === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      } flex items-center justify-center`}>
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscribe Button */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {selectedPlan === 'free' ? (
              <Button 
                className="w-full bg-gray-500 text-white font-bold py-4 rounded-xl"
                disabled
              >
                Plano Atual
              </Button>
            ) : (
              <>
                <div className="mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Plano selecionado:</span>
                    <span className="font-bold text-green-600">{selectedPlanData?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Forma de pagamento:</span>
                    <span className="font-bold text-green-600">
                      {paymentMethods.find(m => m.id === selectedPayment)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-green-600">{selectedPlanData?.price}{selectedPlanData?.period}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-4 rounded-xl text-lg flex items-center justify-center space-x-2 shadow-lg">
                  <span>ASSINAR AGORA</span>
                  <Award size={20} />
                </Button>
                
                <p className="text-center text-gray-500 text-xs mt-3">
                  Cancele a qualquer momento. Primeiro mês com garantia de reembolso.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </MobileContainer>
  );
};

export default Subscriptions;
