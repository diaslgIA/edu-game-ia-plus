
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const LiteratureGuide: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Literatura</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Literatura no ENEM vai além da memorização de autores e obras. Ela exige a interpretação de 
            textos literários de diferentes épocas e estilos, a identificação de características de escolas literárias, 
            a relação entre texto e contexto histórico-social, e a análise da função da linguagem.
          </p>
        </div>
      </div>

      {/* Tema 1: Gêneros e Funções da Linguagem */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Gêneros e Funções da Linguagem</h2>
          <p className="text-white/90 leading-relaxed">
            A base para a análise textual, compreendendo as diferentes formas que a literatura assume e seus objetivos comunicativos.
          </p>
        </div>

        <div className="space-y-4">
          {/* Gêneros Literários */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('generos-literarios')}
            >
              <h3 className="text-lg font-semibold">Gêneros Literários (Lírico, Épico/Narrativo, Dramático)</h3>
              {expandedTopics['generos-literarios'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['generos-literarios'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Lírico (subjetividade, expressa sentimentos, poemas). Épico/Narrativo (conta uma história, narrador, 
                        personagens, enredo - contos, romances, novelas). Dramático (destinado à encenação, com diálogo e ação - peças de teatro).
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
                        Reconhecer as características de cada gênero para entender a estrutura e a intenção do texto. 
                        Por exemplo, a presença de um narrador e seu tipo (observador, personagem) em textos narrativos.
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
                        Diferenciar um soneto de um capítulo de romance, baseando-se em sua estrutura e propósito.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Funções da Linguagem */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('funcoes-linguagem')}
            >
              <h3 className="text-lg font-semibold">Funções da Linguagem</h3>
              {expandedTopics['funcoes-linguagem'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['funcoes-linguagem'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        As seis funções: Referencial (informar, objetiva), Emotiva (expressar sentimentos do emissor), 
                        Conativa/Apelativa (influenciar o receptor), Fática (testar canal de comunicação), 
                        Metalinguística (linguagem falando da própria linguagem), Poética (valorização da mensagem, estética).
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
                        Identificar a função predominante da linguagem em um texto, o que revela a intenção do autor e a natureza do texto. 
                        Textos literários frequentemente priorizam a função poética e emotiva.
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
                        Em um poema, identificar a função poética pelo uso de rimas e figuras de linguagem, e a função emotiva 
                        pela expressão de sentimentos do eu lírico.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Figuras de Linguagem */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('figuras-linguagem')}
            >
              <h3 className="text-lg font-semibold">Figuras de Linguagem</h3>
              {expandedTopics['figuras-linguagem'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['figuras-linguagem'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Recursos expressivos que desviam o uso comum da língua para intensificar o sentido ou a beleza da mensagem 
                        (metáfora, comparação, personificação, hipérbole, ironia, eufemismo, paradoxo, etc.).
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
                        Reconhecer e interpretar o efeito de sentido das figuras de linguagem. Elas são essenciais para a compreensão 
                        da profundidade e das múltiplas camadas de um texto literário.
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
                        Em 'Meus olhos são dois rios', identificar uma metáfora; em 'Sua boca é um túmulo', identificar uma hipérbole.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Escolas Literárias */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Escolas Literárias e Contextos Históricos</h2>
          <p className="text-white/90 leading-relaxed">
            Compreender como os movimentos literários se desenvolveram em diferentes épocas, refletindo e influenciando 
            seus respectivos contextos sociais, políticos e culturais.
          </p>
        </div>

        <div className="space-y-4">
          {/* Classicismo e Barroco */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('classicismo-barroco')}
            >
              <h3 className="text-lg font-semibold">Classicismo e Barroco</h3>
              {expandedTopics['classicismo-barroco'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['classicismo-barroco'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Classicismo (século XVI): retorno aos valores greco-latinos, racionalismo, universalismo. 
                        Barroco (século XVII): conflito entre fé e razão, dualismo, cultismo (jogo de palavras) e conceptismo (jogo de ideias).
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
                        Do Classicismo, Camões é o expoente. Do Barroco, o conflito existencial, a efemeridade da vida e a valorização 
                        do 'carpe diem' em Gregório de Matos e Padre Antônio Vieira (sermões).
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
                        Analisar um poema barroco e identificar o uso de antíteses e paradoxos que expressam o conflito entre o terreno e o celestial.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Arcadismo e Romantismo */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('arcadismo-romantismo')}
            >
              <h3 className="text-lg font-semibold">Arcadismo e Romantismo</h3>
              {expandedTopics['arcadismo-romantismo'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['arcadismo-romantismo'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Arcadismo (século XVIII): retorno à natureza, vida bucólica, pseudônimos pastoris. 
                        Romantismo (século XIX): subjetivismo, nacionalismo, idealização do amor/mulher/natureza, indianismo, mal do século.
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
                        Arcadismo foca na simplicidade e no 'fugere urbem'. Romantismo é muito cobrado em suas três gerações: 
                        Indianista/Nacionalista, Ultrarromântica (sofrimento, morte), Condoreira (social, abolicionista).
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
                        Comparar um poema romântico indianista de Gonçalves Dias com uma descrição idealizada da natureza.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Realismo/Naturalismo/Parnasianismo/Simbolismo */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('realismo-outros')}
            >
              <h3 className="text-lg font-semibold">Realismo, Naturalismo, Parnasianismo e Simbolismo</h3>
              {expandedTopics['realismo-outros'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['realismo-outros'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Realismo/Naturalismo (final do XIX): objetividade, crítica social, determinismo, zoomorfismo (Naturalismo). 
                        Parnasianismo (final do XIX): formalismo, 'arte pela arte', perfeição estética. 
                        Simbolismo (final do XIX): misticismo, subjetividade, sugestão, sinestesia.
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
                        Realismo/Naturalismo: Machado de Assis (realismo psicológico), Aluísio Azevedo (naturalismo social). 
                        Parnasianismo: Olavo Bilac e a busca pela forma perfeita. Simbolismo: Cruz e Sousa, com temas como a cor branca e a dor.
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
                        Analisar um trecho de Machado de Assis e identificar a ironia ou a crítica à sociedade da época.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pré-Modernismo e Modernismo */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('pre-modernismo')}
            >
              <h3 className="text-lg font-semibold">Pré-Modernismo e Modernismo (Fases)</h3>
              {expandedTopics['pre-modernismo'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['pre-modernismo'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Pré-Modernismo (início do XX): ruptura gradual, denúncia social. 
                        Modernismo (a partir de 1922): valorização da identidade brasileira, linguagem coloquial, verso livre, experimentação. 
                        Primeira fase (destruição), Segunda fase (geração de 30 - prosa e poesia), Terceira fase (pós-45).
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
                        Pré-Modernismo: Euclides da Cunha (Os Sertões), Lima Barreto (denúncia social). 
                        Modernismo: Semana de Arte Moderna. As fases do Modernismo são cruciais: 1ª (Andrade, Oswald), 
                        2ª (Drummond, Meireles, Ramos, Guimarães Rosa), 3ª (conflitos da 2ª GM, fragmentação).
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
                        Dada uma poesia modernista de Oswald de Andrade, identificar a quebra de padrões formais e a valorização do cotidiano brasileiro.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Literatura Contemporânea */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('literatura-contemporanea')}
            >
              <h3 className="text-lg font-semibold">Literatura Contemporânea (Pós-Modernismo)</h3>
              {expandedTopics['literatura-contemporanea'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['literatura-contemporanea'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        A partir da década de 1960, marcada pela fragmentação, metalinguagem, intertextualidade, desconstrução e crítica social.
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
                        O ENEM pode trazer textos de autores contemporâneos que refletem a complexidade do mundo atual, 
                        com a fusão de gêneros e a abordagem de temas urbanos, tecnológicos e de identidade. 
                        A prosa e a poesia contemporânea refletem a pluralidade de vozes.
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
                        Analisar um fragmento de um conto contemporâneo que mistura diferentes estilos narrativos ou que aborda questões de identidade de gênero.
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

export default LiteratureGuide;
