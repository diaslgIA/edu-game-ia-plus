
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/contexts/SoundContext';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { getMentorBySubject } from '@/data/subjectMentors';

interface VirtualTeacherProps {
  subject: string;
  topic: string;
  onComplete: () => void;
}

const VirtualTeacher: React.FC<VirtualTeacherProps> = ({ subject, topic, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const { isMuted } = useSound();
  const { speak, stop, isLoading, isPlaying } = useTextToSpeech();
  
  const mentor = getMentorBySubject(subject);

  const teacherContent = useMemo(() => {
    const contentMap: { [key: string]: { sections: string[], duration: number } } = {
      'Matemática': {
        sections: [
          "Olá, pessoal! Eu sou Pitágoras, e hoje vamos explorar os fundamentos da matemática. A matemática é a linguagem universal que nos permite compreender os padrões e a harmonia do universo.",
          "Vamos começar com conceitos básicos de álgebra e funções. Lembrem-se: tudo é número, proporção e harmonia. Cada equação conta uma história sobre as relações matemáticas.",
          "Agora, vamos estudar geometria analítica. Vejam como os números dançam no plano cartesiano, criando formas perfeitas e relações geométricas fascinantes.",
          "Para finalizar, vamos aplicar esses conceitos em problemas do ENEM. A matemática não é apenas teoria - ela resolve problemas reais do nosso cotidiano."
        ],
        duration: 240
      },
      'Português': {
        sections: [
          "Salve, amantes das letras! Sou Luís de Camões, e hoje navegaremos pelos mares da língua portuguesa. A palavra é nossa maior conquista como seres humanos.",
          "Vamos estudar interpretação de texto e análise literária. Cada texto é uma viagem, cada palavra uma descoberta. Prestem atenção aos detalhes e nas entrelinhas.",
          "Agora, vamos explorar a gramática normativa. As regras da língua são como as cordas de uma lira - cada uma tem seu lugar na sinfonia da comunicação.",
          "Para concluir, vamos praticar redação. Lembrem-se: escrever é arte, é técnica, é expressão da alma. Que suas palavras ecoem pelos séculos!"
        ],
        duration: 220
      },
      'Física': {
        sections: [
          "Ah, olá! Sou Albert Einstein, e hoje vamos desvendar os mistérios do universo através da física. A imaginação é mais importante que o conhecimento, lembrem-se disso!",
          "Começaremos com mecânica clássica - movimento, força e energia. Vejam como Newton descreveu o mundo com suas leis elegantes e precisas.",
          "Agora, vamos explorar eletromagnetismo. Maxwell nos mostrou que eletricidade e magnetismo são faces da mesma moeda cósmica. Fascinante, não acham?",
          "Para finalizar, vamos tocar na relatividade e física moderna. O tempo e o espaço não são absolutos - eles dançam juntos no teatro do cosmos!"
        ],
        duration: 260
      },
      'Química': {
        sections: [
          "Bonjour, jovens cientistas! Sou Marie Curie, e hoje vamos explorar os segredos da matéria. Nada na vida deve ser temido, apenas compreendido.",
          "Vamos começar estudando a estrutura atômica e a tabela periódica. Cada elemento conta uma história única sobre a formação do universo.",
          "Agora, investigaremos as ligações químicas e reações. Vejam como os átomos se unem e se separam, criando toda a diversidade material que conhecemos.",
          "Para concluir, estudaremos química orgânica e seus compostos. A química da vida está nas moléculas de carbono - somos todos feitos de estrelas!"
        ],
        duration: 230
      },
      'Biologia': {
        sections: [
          "Saudações, jovens naturalistas! Sou Charles Darwin, e hoje vamos explorar os mistérios da vida. A natureza é o maior livro já escrito.",
          "Começaremos com citologia - a célula é a unidade básica da vida. Vejam como esses pequenos mundos microscópicos sustentam toda a biodiversidade.",
          "Agora, vamos estudar genética e evolução. A vida se adapta, muda e evolui constantemente. Não é o mais forte que sobrevive, mas o que melhor se adapta.",
          "Para finalizar, exploraremos ecologia e meio ambiente. Todos os seres vivos estão conectados numa grande teia da vida. Cuidemos da nossa casa comum!"
        ],
        duration: 250
      },
      'História': {
        sections: [
          "Salve, jovens historiadores! Sou Heródoto, o pai da História, e hoje vamos viajar pelo tempo. A história é mestra da vida - dela aprendemos sobre o presente e o futuro.",
          "Vamos começar estudando o Brasil Colonial. Vejam como culturas se encontraram e se misturaram, criando a rica diversidade brasileira.",
          "Agora, exploraremos a formação da República e os grandes eventos do século XX. Cada período histórico tem suas lições e legados.",
          "Para concluir, analisaremos a história contemporânea e seus desafios. O passado nos ensina, o presente nos desafia, o futuro nos chama!"
        ],
        duration: 240
      }
    };

    return contentMap[subject] || contentMap['Matemática'];
  }, [subject]);

  const handlePlay = async () => {
    if (isMuted) {
      onComplete();
      return;
    }

    if (isPlaying) {
      stop();
      return;
    }

    if (mentor && currentSection < teacherContent.sections.length) {
      await speak(teacherContent.sections[currentSection], mentor.id);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isMuted) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / teacherContent.duration);
          
          // Avançar seção baseado no progresso
          const sectionProgress = (newProgress / 100) * teacherContent.sections.length;
          const newSection = Math.floor(sectionProgress);
          
          if (newSection > currentSection && newSection < teacherContent.sections.length) {
            setCurrentSection(newSection);
          }

          if (newProgress >= 100) {
            clearInterval(interval);
            onComplete();
            return 100;
          }
          
          return newProgress;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isMuted, currentSection, teacherContent, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = (progress / 100) * teacherContent.duration;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
      {/* Professor Avatar and Video Area */}
      <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 aspect-video flex items-center justify-center">
        {mentor && (
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center border-4 border-white/30 text-6xl"
                 style={{ backgroundColor: mentor.color + '20' }}>
              {mentor.avatar}
            </div>
            <h3 className="text-2xl font-bold mb-2">{mentor.name}</h3>
            <p className="text-lg opacity-90">{mentor.title}</p>
            <p className="text-sm opacity-80 mt-2">{subject} - {topic}</p>
          </div>
        )}

        {/* Play Button Overlay */}
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all disabled:opacity-50">
            {isLoading ? (
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-12 h-12 text-white" />
            ) : (
              <Play className="w-12 h-12 text-white ml-1" />
            )}
          </div>
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-2">
              {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{formatTime(currentTime)} / {formatTime(teacherContent.duration)}</span>
            </div>
            <span>Seção {currentSection + 1}/{teacherContent.sections.length}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
          O que {mentor?.name} está ensinando:
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 min-h-[120px] transition-colors duration-300">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            {teacherContent.sections[currentSection]}
            {isPlaying && <span className="animate-pulse ml-1">|</span>}
          </p>
        </div>

        {isMuted && (
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg transition-colors duration-300">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm transition-colors duration-300">
              Som desabilitado. Clique em "Play" para pular para a atividade.
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onComplete}
            className="text-sm"
          >
            Pular Aula
          </Button>
          <Button
            onClick={handlePlay}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isLoading ? 'Carregando...' : isPlaying ? 'Pausar' : 'Iniciar'} Aula
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTeacher;
