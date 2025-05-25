
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Verification = () => {
  const navigate = useNavigate();
  const [verificationData, setVerificationData] = useState({
    email: 'larinha07@gmail.com',
    phone: '71-996894503',
    code: ['', '', '', '']
  });

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationData.code];
      newCode[index] = value;
      setVerificationData({ ...verificationData, code: newCode });
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = verificationData.code.join('');
    if (code.length === 4) {
      toast.success('Verificação realizada com sucesso!');
      navigate('/welcome');
    } else {
      toast.error('Por favor, insira o código completo');
    }
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-8">
          <Logo size="lg" className="mb-6" />
          
          <h1 className="text-xl font-bold text-black mb-8">
            verificar o e-mail
          </h1>

          {/* Email verification */}
          <div className="w-full bg-white rounded-xl p-4 mb-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-gray-600">
                ✉️
              </div>
              <span className="text-gray-800 font-medium">{verificationData.email}</span>
            </div>
            <div className="text-gray-600">
              ▶️
            </div>
          </div>

          <h2 className="text-xl font-bold text-black mb-6">
            verificar o número de telefone
          </h2>

          {/* Phone verification */}
          <div className="w-full bg-white rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-gray-600">
                📱
              </div>
              <span className="text-gray-800 font-medium">{verificationData.phone}</span>
            </div>
            <div className="text-gray-600">
              ▶️
            </div>
          </div>

          {/* Code input */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 text-gray-600 flex items-center justify-center">
              💬
            </div>
            {verificationData.code.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold bg-gray-100 border-0 rounded-lg"
                maxLength={1}
              />
            ))}
          </div>
        </div>

        {/* Verify button */}
        <div className="flex-1 flex flex-col justify-end pb-8">
          <Button
            onClick={handleVerify}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-xl text-lg flex items-center justify-center space-x-2"
          >
            <span>verificar</span>
            <span className="text-2xl">✓</span>
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Verification;
