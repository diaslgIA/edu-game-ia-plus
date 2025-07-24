
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const SociologyGuide: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Sociologia</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Sociologia no ENEM exige a compreensão das dinâmicas sociais, das relações de poder, das desigualdades 
            e das instituições que moldam a sociedade. Prioriza a análise crítica de fenômenos sociais contemporâneos a partir 
            de diferentes perspectivas teóricas.
          </p>
        </div>
      </div>

      {/* Tema 1: Clássicos da Sociologia */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Clássicos da Sociologia e Seus Conceitos</h2>
          <p className="text-white/90 leading-relaxed">
            Os pilares do pensamento sociológico, com seus conceitos fundamentais para a análise da sociedade.
          </p>
        </div>

        <div className="space-y-4">
          {/* Émile Durkheim */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('durkheim')}
            >
              <h3 className="text-lg font-semibold">Émile Durkheim (Fato Social, Solidariedade)</h3>
              {expandedTopics['durkheim'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['durkheim'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Fato Social: toda forma de agir, pensar e sentir que exerce coerção social sobre o indivíduo, é geral na sociedade 
                        e existe independentemente da vontade individual. Solidariedade Mecânica (sociedades tradicionais) e Orgânica 
                        (sociedades modernas, com divisão do trabalho).
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
                        O caráter coercitivo dos fatos sociais (regras, costumes, leis). A anomia (ausência de normas) como causa de problemas sociais. 
                        A análise da divisão do trabalho e suas consequências para a coesão social.
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
                        Explicar como a moda ou as leis de trânsito podem ser consideradas fatos sociais, exercendo pressão sobre o comportamento individual.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Max Weber */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('weber')}
            >
              <h3 className="text-lg font-semibold">Max Weber (Ação Social, Tipo Ideal, Burocracia)</h3>
              {expandedTopics['weber'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['weber'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Ação Social: todo comportamento humano dotado de sentido que se refere à ação de outros. 
                        Tipos de Ação Social (racional com relação a fins, racional com relação a valores, afetiva, tradicional). 
                        Tipo Ideal: ferramenta metodológica para analisar a realidade. Burocracia: organização racional do poder.
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
                        A compreensão da intenção dos indivíduos nas ações sociais. A burocracia como a forma mais eficiente de administração, 
                        mas com seus 'engessamentos'. O conceito de poder e dominação (tradicional, carismática, racional-legal).
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
                        Diferenciar uma ação social racional (estudar para passar no ENEM) de uma ação social afetiva (abraçar alguém por carinho).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Karl Marx */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('marx')}
            >
              <h3 className="text-lg font-semibold">Karl Marx (Luta de Classes, Mais-Valia, Ideologia)</h3>
              {expandedTopics['marx'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['marx'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Luta de Classes: o motor da história, conflito entre burguesia (detentora dos meios de produção) e proletariado 
                        (vende sua força de trabalho). Mais-Valia: o valor do trabalho não pago ao trabalhador. 
                        Ideologia: sistema de ideias que oculta as contradições sociais e legitima o poder da classe dominante.
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
                        A crítica ao capitalismo, a exploração do trabalho e a alienação. O conceito de infraestrutura (base econômica) 
                        e superestrutura (Estado, leis, cultura, religião) e a relação entre elas. A consciência de classe e a revolução 
                        como formas de superação das desigualdades.
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
                        Explicar como a propaganda de produtos de luxo pode ser vista como uma forma de ideologia, 
                        incentivando o consumo e ocultando as desigualdades sociais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Estrutura e Dinâmicas Sociais Contemporâneas */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Estrutura e Dinâmicas Sociais Contemporâneas</h2>
          <p className="text-white/90 leading-relaxed">
            Análise de temas atuais como desigualdade, globalização, cultura, e movimentos sociais.
          </p>
        </div>

        <div className="space-y-4">
          {/* Desigualdade Social */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('desigualdade-social')}
            >
              <h3 className="text-lg font-semibold">Desigualdade Social e Estratificação</h3>
              {expandedTopics['desigualdade-social'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['desigualdade-social'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        A forma como a riqueza, o poder e o prestígio são distribuídos de forma desigual na sociedade. 
                        Estratificação: a organização da sociedade em camadas (classes sociais, castas, estamentos).
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
                        As diferentes dimensões da desigualdade (renda, educação, saúde, gênero, raça). 
                        Mobilidade social (capacidade de ascensão ou declínio nas camadas sociais). 
                        Problemas sociais decorrentes da desigualdade.
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
                        Discutir como a falta de acesso a saneamento básico em comunidades periféricas é uma manifestação da desigualdade social no Brasil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cultura e Indústria Cultural */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('cultura-industria')}
            >
              <h3 className="text-lg font-semibold">Cultura, Indústria Cultural e Meios de Comunicação</h3>
              {expandedTopics['cultura-industria'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['cultura-industria'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Cultura: conjunto de valores, crenças, práticas de um grupo social. 
                        Indústria Cultural (Escola de Frankfurt): produção em massa de bens culturais que visam ao lucro e podem gerar conformismo. 
                        Meios de Comunicação: jornais, rádio, TV, internet e seu papel na formação de opinião e na sociedade.
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
                        A diversidade cultural brasileira, o hibridismo cultural. A crítica à padronização e alienação pela indústria cultural. 
                        O papel das redes sociais na formação de comunidades, mas também na disseminação de notícias falsas (fake news).
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
                        Analisar como um 'reality show' televisivo pode ser interpretado como um produto da indústria cultural 
                        que reforça determinados valores sociais.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cidadania e Direitos Humanos */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('cidadania-direitos')}
            >
              <h3 className="text-lg font-semibold">Cidadania e Direitos Humanos</h3>
              {expandedTopics['cidadania-direitos'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['cidadania-direitos'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Cidadania: condição de quem possui direitos e deveres em uma sociedade. 
                        Direitos Humanos: direitos universais inerentes a todos os seres humanos (civis, políticos, sociais, econômicos, culturais, ambientais).
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
                        A evolução histórica dos direitos (gerações de direitos). A relação entre cidadania e participação social. 
                        Os desafios da efetivação dos direitos humanos no Brasil, como o combate ao racismo, à homofobia e à violência de gênero.
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
                        Discutir a importância das cotas raciais como uma política de ação afirmativa para promover a igualdade de oportunidades e o acesso a direitos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Movimentos Sociais */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('movimentos-sociais')}
            >
              <h3 className="text-lg font-semibold">Movimentos Sociais e Novas Questões Sociais</h3>
              {expandedTopics['movimentos-sociais'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['movimentos-sociais'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Movimentos Sociais: grupos organizados que buscam transformações sociais. 
                        Novas Questões Sociais: temas que ganham relevância na agenda contemporânea 
                        (gênero, sexualidade, meio ambiente, identidades étnicas, direitos dos animais).
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
                        O papel dos movimentos sociais na pressão por direitos e mudanças (ex: feminismo, movimento negro, LGBTQIA+, ambientalistas). 
                        A luta por reconhecimento e redistribuição. A importância da participação cívica.
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
                        Analisar as reivindicações do movimento feminista por igualdade de direitos e combate à violência de gênero.
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

export default SociologyGuide;
