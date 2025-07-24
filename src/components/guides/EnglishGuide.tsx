
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const EnglishGuide: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Inglês</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Inglês no ENEM foca na sua capacidade de leitura e interpretação de textos autênticos, 
            como artigos de jornal, trechos literários, letras de música e anúncios. O vocabulário é inferido 
            pelo contexto, e a gramática é cobrada de forma funcional, ou seja, aplicada à compreensão.
          </p>
        </div>
      </div>

      {/* Tema 1: Leitura e Interpretação de Textos */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Leitura e Interpretação de Textos</h2>
          <p className="text-white/90 leading-relaxed">
            A habilidade mais importante para a prova de Inglês é a compreensão global e específica de diferentes tipos textuais.
          </p>
        </div>

        {/* Tópicos do Tema 1 */}
        <div className="space-y-4">
          {/* Estratégias de Leitura */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('skimming-scanning')}
            >
              <h3 className="text-lg font-semibold">Estratégias de Leitura (Skimming e Scanning)</h3>
              {expandedTopics['skimming-scanning'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['skimming-scanning'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Skimming é a leitura rápida para ter uma ideia geral do texto (tema central, ideia principal). 
                        Scanning é a leitura para localizar informações específicas (datas, nomes, números, palavras-chave).
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
                        O ENEM exige que você saiba usar essas estratégias para otimizar seu tempo. Muitas questões podem 
                        ser respondidas identificando apenas a ideia central ou localizando um detalhe específico sem ler 
                        o texto na íntegra.
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
                        Ao ler um anúncio sobre um evento, usar o skimming para entender o tipo de evento e o scanning 
                        para encontrar a data e o local.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Identificação de Gêneros Textuais */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('generos-textuais')}
            >
              <h3 className="text-lg font-semibold">Identificação de Gêneros Textuais</h3>
              {expandedTopics['generos-textuais'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['generos-textuais'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Reconhecer se um texto é uma notícia, poema, propaganda, e-mail, receita, tirinha, etc. 
                        Cada gênero tem características e propósitos comunicativos específicos.
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
                        Compreender o gênero textual ajuda a inferir o propósito do autor, o público-alvo e a estrutura 
                        esperada do texto, facilitando a interpretação. Tiras e charges são muito comuns, exigindo 
                        interpretação da linguagem verbal e não verbal.
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
                        Dada uma tirinha, identificar que ela usa humor para criticar um comportamento social, 
                        baseado na imagem e no diálogo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reconhecimento de Vocabulário */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('vocabulario-contexto')}
            >
              <h3 className="text-lg font-semibold">Reconhecimento de Vocabulário e Contexto</h3>
              {expandedTopics['vocabulario-contexto'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['vocabulario-contexto'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Inferir o significado de palavras desconhecidas a partir do contexto (palavras vizinhas, 
                        tema geral do texto, sentido da frase).
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
                        É raro o ENEM cobrar o significado isolado de uma palavra. O mais comum é apresentar uma palavra 
                        sublinhada ou em destaque e perguntar seu sentido no trecho específico. Foco em cognatos 
                        (palavras parecidas em português e inglês) e falsos cognatos.
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
                        Em um texto sobre saúde, inferir o significado de 'pain' (dor) ou 'assist' (ajudar), 
                        mesmo que você não conheça a palavra previamente, pelo contexto da doença ou tratamento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interpretação de Ideias */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('ideias-principais')}
            >
              <h3 className="text-lg font-semibold">Interpretação de Ideias Principais e Detalhes</h3>
              {expandedTopics['ideias-principais'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['ideias-principais'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Capacidade de distinguir o assunto central de um texto (main idea) dos detalhes específicos 
                        que o apoiam.
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
                        Muitas questões do ENEM pedem a ideia central do texto ou de um parágrafo. Outras solicitam 
                        informações pontuais, como a opinião do autor sobre determinado tema ou a causa/consequência 
                        de um evento mencionado.
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
                        Após ler um artigo sobre os benefícios da meditação, identificar que a ideia principal é 
                        'meditação pode reduzir o estresse', enquanto os detalhes são exemplos de como ela atua no corpo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Aspectos Gramaticais */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Aspectos Gramaticais e Estruturais (uso funcional)</h2>
          <p className="text-white/90 leading-relaxed">
            A gramática não é cobrada de forma isolada, mas como ferramenta para a compreensão textual.
          </p>
        </div>

        <div className="space-y-4">
          {/* Tempos Verbais */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('tempos-verbais')}
            >
              <h3 className="text-lg font-semibold">Tempos Verbais e Modal Verbs</h3>
              {expandedTopics['tempos-verbais'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['tempos-verbais'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Reconhecer verbos no presente, passado, futuro e 'modal verbs' (can, could, may, might, 
                        should, must, will, would) que expressam possibilidade, obrigação, permissão, etc.
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
                        Entender a função dos tempos verbais para situar eventos no tempo (passado simples para ações 
                        concluídas, presente contínuo para ações em andamento). 'Modal verbs' são frequentemente usados 
                        para expressar a intenção ou a perspectiva do autor.
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
                        Em uma frase como 'You should study harder', reconhecer que 'should' expressa uma recomendação, 
                        não uma obrigação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Conectivos */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('conectivos')}
            >
              <h3 className="text-lg font-semibold">Conectivos (Conjunctions e Linkers)</h3>
              {expandedTopics['conectivos'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['conectivos'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Palavras e frases que ligam ideias, parágrafos e sentenças, estabelecendo relações de causa, 
                        consequência, adição, contraste, tempo, etc. (ex: 'but', 'however', 'because', 'therefore', 
                        'although', 'in addition').
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
                        Crucial para a coesão e coerência textual. O ENEM frequentemente pede para identificar a 
                        relação que um conectivo estabelece entre duas partes do texto.
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
                        Em 'It was raining, so we stayed home', identificar que 'so' indica uma consequência.
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
              onClick={() => toggleTopic('pronomes')}
            >
              <h3 className="text-lg font-semibold">Pronomes e Referência Textual</h3>
              {expandedTopics['pronomes'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['pronomes'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Pronomes (he, she, it, they, this, that, which, who) que se referem a substantivos ou ideias 
                        já mencionados, evitando repetições.
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
                        Saber a que um pronome se refere é fundamental para não se perder na leitura e entender a quem 
                        ou o que o texto está se referindo. Questões podem pedir para identificar o referente de um pronome.
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
                        Em 'João bought a new car. He loves it.', identificar que 'He' se refere a João e 'it' se 
                        refere ao carro.
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

export default EnglishGuide;
