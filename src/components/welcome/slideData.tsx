import React from 'react';
import { GraduationCap, Users, Star, BookOpen, Target, Heart } from 'lucide-react';

export interface SlideData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const createSlides = (userName: string): SlideData[] => [
  {
    title: "SEJA BEM-VINDO",
    subtitle: `Olá, ${userName}!`,
    icon: <GraduationCap className="w-12 h-12 text-yellow-400" />,
    content: (
      <div className="space-y-3">
        <p className="text-sm font-medium leading-relaxed">
          Bem-vindo ao EduGameIA! Uma plataforma criada especialmente para estudantes como você.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-semibold">Nossa Missão</span>
          </div>
          <p className="text-xs text-left">
            Democratizar o acesso ao ensino superior de qualidade através de uma educação gamificada e acessível.
          </p>
        </div>
      </div>
    )
  },
  {
    title: "NOSSO PROPÓSITO",
    subtitle: "Por que criamos este app?",
    icon: <Heart className="w-12 h-12 text-red-400" />,
    content: (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed">
          Este aplicativo foi criado para melhorar o desempenho de estudantes do ensino médio, especialmente de baixa renda, no ENEM e vestibulares.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="text-xs">Foco no ENEM e vestibulares</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-xs">Educação acessível para todos</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-xs">Aprendizado gamificado</span>
          </div>
        </div>
        <p className="text-xs opacity-90">
          Superando barreiras socioeconômicas através de material de alta qualidade.
        </p>
      </div>
    )
  },
  {
    title: "COMO FUNCIONA",
    subtitle: "Sua jornada de aprendizado",
    icon: <GraduationCap className="w-12 h-12 text-cyan-400" />,
    content: (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed">
          Uma experiência completa de aprendizado com gamificação integrada para manter você motivado!
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 space-y-2">
          <div className="text-left space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-gray-800 text-xs font-bold">1</div>
              <span className="text-xs">Estude com conteúdo interativo e slides dinâmicos</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
              <span className="text-xs">Complete quizzes e ganhe pontos</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
              <span className="text-xs">Suba de nível e desbloqueie conquistas</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
              <span className="text-xs">Compare seu progresso no ranking</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "NOSSOS FUNDADORES",
    subtitle: "Quem está por trás do projeto",
    icon: <Users className="w-12 h-12 text-pink-400" />,
    content: (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed">
          Conheça os criadores que tornaram este sonho realidade:
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 space-y-3">
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-white font-bold text-sm">LG</span>
            </div>
            <h4 className="text-xs font-semibold">Luis Gabriel Dias Gonçalves</h4>
            <p className="text-xs opacity-80">Co-fundador</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-white font-bold text-sm">LG</span>
            </div>
            <h4 className="text-xs font-semibold">Lara Gidi</h4>
            <p className="text-xs opacity-80">Co-fundadora</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-white font-bold text-sm">PC</span>
            </div>
            <h4 className="text-xs font-semibold">Pauline Cintra Gomes</h4>
            <p className="text-xs opacity-80">Co-fundadora</p>
          </div>
        </div>
        <p className="text-xs opacity-90">
          Unidos pela paixão em transformar vidas através da educação.
        </p>
      </div>
    )
  }
];
