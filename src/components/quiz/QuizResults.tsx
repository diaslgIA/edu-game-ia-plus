
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizResultsProps {
  subject: string;
  score: number;
  totalQuestions: number;
  onBack: () => void;
  restartQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  subject, 
  score, 
  totalQuestions, 
  onBack,
  restartQuiz
}) => {
  const { isMuted } = useSound();
  const { t, language } = useLanguage();
  const percentage = Math.round((score / (totalQuestions * 10)) * 100);
  
  useEffect(() => {
    if (isMuted) return;

    const correctAnswers = Math.round(score / 10);

    const getResultMessage = () => {
      const halfQuestions = totalQuestions / 2;
      
      if (correctAnswers > halfQuestions) {
        return t('quiz_feedback_good', { correct: correctAnswers, total: totalQuestions });
      } else {
        return t('quiz_feedback_bad', { correct: correctAnswers, total: totalQuestions });
      }
    };
    
    const message = getResultMessage();
    const utterance = new SpeechSynthesisUtterance(message);
    
    // Map context language to BCP 47 language tags for speech synthesis
    const langMap: { [key: string]: string } = {
        pt: 'pt-BR',
        en: 'en-US',
        es: 'es-ES',
        ja: 'ja-JP',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        ko: 'ko-KR',
        zh: 'zh-CN',
        ar: 'ar-SA',
        ru: 'ru-RU',
        hi: 'hi-IN',
    };
    utterance.lang = langMap[language] || 'en-US';
    
    // Configurações para voz feminina mais suave e natural
    utterance.rate = 0.8; // Um pouco mais devagar para soar mais natural
    utterance.pitch = 1.2; // Pitch um pouco mais alto para soar feminino
    utterance.volume = 0.8; // Volume moderado

    const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Procurar especificamente por vozes femininas
        const femaleVoices = voices.filter(voice => 
            voice.lang === utterance.lang && (
                voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('woman') ||
                voice.name.toLowerCase().includes('maria') ||
                voice.name.toLowerCase().includes('luciana') ||
                voice.name.toLowerCase().includes('ana') ||
                voice.name.toLowerCase().includes('samantha') ||
                voice.name.toLowerCase().includes('karen') ||
                voice.name.toLowerCase().includes('alice') ||
                voice.name.toLowerCase().includes('sarah') ||
                voice.name.toLowerCase().includes('amelie') ||
                voice.name.toLowerCase().includes('paulina') ||
                voice.name.toLowerCase().includes('monica') ||
                voice.name.toLowerCase().includes('kyoko') ||
                voice.name.toLowerCase().includes('li-mu') ||
                voice.name.toLowerCase().includes('fiona') ||
                voice.name.toLowerCase().includes('veena') ||
                voice.name.toLowerCase().includes('milena') ||
                voice.name.toLowerCase().includes('catherine') ||
                voice.name.toLowerCase().includes('zuzana') ||
                voice.name.toLowerCase().includes('tessa')
            )
        );
        
        // Se não encontrar vozes femininas específicas, usar as com qualidade mais alta
        const preferredVoice = femaleVoices.length > 0 
            ? femaleVoices[0] 
            : voices.find(voice => 
                voice.lang === utterance.lang && 
                voice.localService === false // Vozes de rede tendem a ser de melhor qualidade
              ) || voices.find(voice => voice.lang === utterance.lang);
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
    } else {
        speak();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [score, totalQuestions, isMuted, t, language]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
      <Trophy className="mx-auto mb-4 text-yellow-500" size={64} />
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {t('quiz_results_title', { subject })}
      </h3>
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-4 mb-6">
        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{t('quiz_results_points', { score })}</div>
        <div className="text-lg text-orange-700 dark:text-orange-300">{t('quiz_results_percentage', { percentage, subject })}</div>
        <div className="text-sm text-orange-600 dark:text-orange-400 mt-2">
          {t('quiz_results_saved')}
        </div>
      </div>
      
      {/* Informações adicionais sobre desempenho */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}/{totalQuestions * 10}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">{t('quiz_results_score')}</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(score / 10)}/{totalQuestions}</div>
          <div className="text-sm text-green-700 dark:text-green-300">{t('quiz_results_correct')}</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          onClick={restartQuiz}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl"
        >
          Tentar Novamente
        </Button>
        
        <Button 
          onClick={onBack}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
          variant="outline"
        >
          {t('quiz_results_back')}
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
