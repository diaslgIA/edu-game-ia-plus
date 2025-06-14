
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizResultsProps {
  subject: string;
  score: number;
  totalQuestions: number;
  saving: boolean;
  onBack: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  subject, 
  score, 
  totalQuestions, 
  saving, 
  onBack 
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

    const speak = () => {
        const voices = window.speechSynthesis.getVoices();
        const voiceForLang = voices.find(voice => voice.lang === utterance.lang);
        if (voiceForLang) {
            utterance.voice = voiceForLang;
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
          {saving ? t('quiz_results_saving') : t('quiz_results_saved')}
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
      
      <Button 
        onClick={onBack}
        className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl"
      >
        {t('quiz_results_back')}
      </Button>
    </div>
  );
};

export default QuizResults;
