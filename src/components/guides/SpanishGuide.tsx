
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const SpanishGuide: React.FC = () => {
  const [expandedTopics, setExpandedTopics] = useState<{ [key: string]: boolean }>({});

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Espanhol</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Espanhol no ENEM, assim como a de Inglês, prioriza a leitura e interpretação de textos autênticos. 
            O foco está na compreensão global e específica, na inferência de vocabulário pelo contexto e na identificação 
            de elementos socioculturais da língua espanhola.
          </p>
        </div>
      </div>

      {/* Tema 1: Leitura e Compreensão Textual */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Leitura e Compreensão Textual</h2>
          <p className="text-white/90 leading-relaxed">
            A capacidade de ler e interpretar diferentes tipos de textos em espanhol é a chave para o sucesso na prova.
          </p>
        </div>

        <div className="space-y-4">
          {/* Estratégias de Leitura */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('estrategias-leitura-esp')}
            >
              <h3 className="text-lg font-semibold">Estratégias de Leitura</h3>
              {expandedTopics['estrategias-leitura-esp'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['estrategias-leitura-esp'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Aplicação de técnicas como 'lectura rápida' (skimming para ideia geral) e 'lectura detallada' 
                        (scanning para informações específicas).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-300">Foco no ENEM</h4>
                      <p className="text-white/90 mt-1">
                        Otimizar a leitura para extrair as informações necessárias sem precisar traduzir palavra por palavra. 
                        A identificação do tema central e de detalhes importantes é essencial.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-purple-300">Exemplo Prático</h4>
                      <p className="text-white/90 mt-1">
                        Ler rapidamente um artigo sobre energias renováveis para identificar se ele é a favor ou contra, 
                        e depois procurar dados específicos sobre um tipo de energia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reconhecimento de Gêneros Textuais */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('generos-textuais-esp')}
            >
              <h3 className="text-lg font-semibold">Reconhecimento de Gêneros Textuais</h3>
              {expandedTopics['generos-textuais-esp'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['generos-textuais-esp'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Diferenciar um poema, uma notícia, um artigo de opinião, um cartaz publicitário, uma letra de música, etc. 
                        Cada gênero possui características e intenções comunicativas próprias.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-300">Foco no ENEM</h4>
                      <p className="text-white/90 mt-1">
                        Compreender o gênero textual ajuda a prever o estilo, o vocabulário e o propósito do texto, 
                        auxiliando na interpretação. Tiras e cartuns que exploram o humor e a crítica social são frequentes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-purple-300">Exemplo Prático</h4>
                      <p className="text-white/90 mt-1">
                        Analisar um poema e identificar sua estrutura, rima e métrica, além do tema lírico abordado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Vocabulário por Contexto */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('vocabulario-contexto-esp')}
            >
              <h3 className="text-lg font-semibold">Vocabulário por Contexto e Falsos Cognatos</h3>
              {expandedTopics['vocabulario-contexto-esp'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['vocabulario-contexto-esp'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Inferir o significado de palavras desconhecidas a partir das pistas fornecidas pelo próprio texto. 
                        Atenção especial aos 'falsos amigos' (falsos cognatos), palavras que se parecem com o português 
                        mas têm significado diferente (ex: 'exquisito' - delicioso, não esquisito).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-300">Foco no ENEM</h4>
                      <p className="text-white/90 mt-1">
                        O ENEM testa sua capacidade de inferência lexical. Dominar os falsos cognatos é crucial para evitar 
                        erros de interpretação comuns. O vocabulário específico de países hispânicos pode aparecer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-purple-300">Exemplo Prático</h4>
                      <p className="text-white/90 mt-1">
                        Em uma frase sobre uma 'taza de café', inferir que 'taza' significa xícara, e não taça.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Aspectos Linguísticos e Socioculturais */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Aspectos Linguísticos e Socioculturais</h2>
          <p className="text-white/90 leading-relaxed">
            Além da interpretação, a prova aborda elementos gramaticais e aspectos culturais que influenciam a língua.
          </p>
        </div>

        <div className="space-y-4">
          {/* Conectivos */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('conectivos-esp')}
            >
              <h3 className="text-lg font-semibold">Conectivos e Marcadores Textuais</h3>
              {expandedTopics['conectivos-esp'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['conectivos-esp'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Palavras e expressões que estabelecem relações lógicas entre as partes do texto 
                        (ex: 'sin embargo' - no entanto, 'además' - além disso, 'por lo tanto' - portanto, 'porque' - porque).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-300">Foco no ENEM</h4>
                      <p className="text-white/90 mt-1">
                        Essenciais para a compreensão da coesão e coerência textual. Questões podem pedir a função de um 
                        determinado conectivo dentro de uma frase ou parágrafo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-purple-300">Exemplo Prático</h4>
                      <p className="text-white/90 mt-1">
                        Identificar a relação de contraste estabelecida por 'pero' (mas) em uma frase como 
                        'Estudié mucho, pero no pasé el examen'.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pronomes */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('pronomes-esp')}
            >
              <h3 className="text-lg font-semibold">Pronomes Pessoais e de Tratamento</h3>
              {expandedTopics['pronomes-esp'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['pronomes-esp'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Compreender o uso de pronomes pessoais (yo, tú, él, ella, nosotros, vosotros/ustedes, ellos, ellas) 
                        e, principalmente, os pronomes de tratamento ('tú' vs. 'usted', 'vosotros' vs. 'ustedes'), 
                        que variam regionalmente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-300">Foco no ENEM</h4>
                      <p className="text-white/90 mt-1">
                        A diferença entre 'tú' (informal) e 'usted' (formal) é um ponto importante para entender o grau de 
                        formalidade e a relação entre os interlocutores no texto. O uso de 'vosotros' (plural informal da Espanha) 
                        versus 'ustedes' (plural formal e informal na América Latina) também pode ser relevante.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-purple-300">Exemplo Prático</h4>
                      <p className="text-white/90 mt-1">
                        Em um diálogo, identificar se os interlocutores têm uma relação de formalidade ou informalidade 
                        baseada no pronome de tratamento utilizado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Valores Culturais */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('valores-culturais')}
            >
              <h3 className="text-lg font-semibold">Valores e Aspectos Culturais da Língua</h3>
              {expandedTopics['valores-culturais'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['valores-culturais'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Entender como a língua espanhola reflete a cultura, história e valores dos países hispânicos. 
                        Isso inclui expressões idiomáticas, referências geográficas, históricas e sociais.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="text-green-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-green-300">Foco no ENEM</h4>
                      <p className="text-white/90 mt-1">
                        O ENEM gosta de textos que trazem elementos culturais, sociais ou ambientais de países de língua espanhola. 
                        Você deve estar atento a referências culturais que podem ajudar na interpretação.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Lightbulb className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-purple-300">Exemplo Prático</h4>
                      <p className="text-white/90 mt-1">
                        Um texto sobre o 'Día de Muertos' no México pode exigir que você reconheça aspectos dessa celebração 
                        cultural para compreender plenamente a mensagem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpanishGuide;
