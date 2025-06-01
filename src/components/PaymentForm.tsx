
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentFormProps {
  amount: string;
  plan: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, plan, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    cardType: 'credit', // credit or debit
    installments: '1'
  });

  const [cardBrand, setCardBrand] = useState('');

  const detectCardBrand = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    if (cleanNumber.startsWith('6')) return 'Discover';
    if (cleanNumber.startsWith('38') || cleanNumber.startsWith('60')) return 'Diners';
    if (cleanNumber.startsWith('35')) return 'JCB';
    if (cleanNumber.startsWith('4011') || cleanNumber.startsWith('4312')) return 'Elo';
    if (cleanNumber.startsWith('636368') || cleanNumber.startsWith('627780')) return 'Hipercard';
    
    return '';
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    const brand = detectCardBrand(formatted);
    
    setPaymentData({...paymentData, cardNumber: formatted});
    setCardBrand(brand);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentData({...paymentData, expiryDate: formatted});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos do cartão.",
        variant: "destructive",
      });
      return;
    }

    // Simular processamento do pagamento
    toast({
      title: "Processando pagamento...",
      description: "Aguarde enquanto processamos seu pagamento.",
    });

    setTimeout(() => {
      toast({
        title: "Pagamento aprovado!",
        description: `Seu plano ${plan} foi ativado com sucesso.`,
      });
      onSuccess();
    }, 3000);
  };

  const getInstallmentOptions = () => {
    if (paymentData.cardType === 'debit') return ['1'];
    
    const baseAmount = parseFloat(amount.replace('R$ ', '').replace(',', '.'));
    const options = [];
    
    for (let i = 1; i <= 12; i++) {
      const installmentAmount = baseAmount / i;
      options.push({
        value: i.toString(),
        label: i === 1 ? `À vista - ${amount}` : `${i}x de R$ ${installmentAmount.toFixed(2).replace('.', ',')}`
      });
    }
    
    return options;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-colors duration-300">
      <div className="flex items-center space-x-2 mb-6">
        <Lock className="text-green-500" size={20} />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white transition-colors duration-300">
          Pagamento Seguro
        </h3>
      </div>

      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Plano:</span>
          <span className="font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">{plan}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Valor:</span>
          <span className="font-bold text-green-600 dark:text-green-400 text-lg transition-colors duration-300">{amount}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo do Cartão */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Tipo do Cartão</Label>
          <Select value={paymentData.cardType} onValueChange={(value) => setPaymentData({...paymentData, cardType: value})}>
            <SelectTrigger className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit">Cartão de Crédito</SelectItem>
              <SelectItem value="debit">Cartão de Débito</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Número do Cartão */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Número do Cartão</Label>
          <div className="relative">
            <Input
              value={paymentData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="bg-gray-50 dark:bg-gray-700 pr-20 transition-colors duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {cardBrand && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded transition-colors duration-300">
                  {cardBrand}
                </span>
              )}
              <CreditCard className="text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Nome no Cartão */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Nome no Cartão</Label>
          <Input
            value={paymentData.cardName}
            onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value.toUpperCase()})}
            placeholder="NOME COMO ESTÁ NO CARTÃO"
            className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Data de Validade */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Validade</Label>
            <Input
              value={paymentData.expiryDate}
              onChange={handleExpiryChange}
              placeholder="MM/AA"
              maxLength={5}
              className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300"
            />
          </div>

          {/* CVV */}
          <div>
            <Label className="text-gray-700 dark:text-gray-300 transition-colors duration-300">CVV</Label>
            <Input
              value={paymentData.cvv}
              onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/\D/g, '')})}
              placeholder="000"
              maxLength={4}
              className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Parcelas (apenas para crédito) */}
        {paymentData.cardType === 'credit' && (
          <div>
            <Label className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Parcelas</Label>
            <Select value={paymentData.installments} onValueChange={(value) => setPaymentData({...paymentData, installments: value})}>
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getInstallmentOptions().map((option, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {typeof option === 'string' ? option : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
          >
            Confirmar Pagamento
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
        🔒 Pagamento 100% seguro e criptografado
      </div>
    </div>
  );
};

export default PaymentForm;
