
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const PhilosophyGuide: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Filosofia</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Filosofia no ENEM exige a compreensão de conceitos filosóficos fundamentais, a capacidade de 
            identificar diferentes correntes de pensamento e de relacioná-las com problemas contemporâneos e com a 
            história do pensamento ocidental.
          </p>
        </div>
      </div>

      {/* Tema 1: Filosofia Antiga e Medieval */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Filosofia Antiga e Medieval</h2>
          <p className="text-white/90 leading-relaxed">
            As origens do pensamento filosófico ocidental, desde a Grécia Antiga até a Idade Média.
          </p>
        </div>

        <div className="space-y-4">
          {/* Período Clássico */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('periodo-classico')}
            >
              <h3 className="text-lg font-semibold">Período Clássico (Sócrates, Platão, Aristóteles)</h3>
              {expandedTopics['periodo-classico'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['periodo-classico'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Sócrates (método socrático, ironia e maiêutica, 'conhece-te a ti mesmo'). 
                        Platão (Mundo das Ideias, Alegoria da Caverna, teoria do conhecimento). 
                        Aristóteles (Lógica, Metafísica, Ética, Política, empirismo, teoria da potência e ato).
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
                        A crítica aos sofistas, a busca pela verdade e pelo autoconhecimento em Sócrates. 
                        A teoria das formas de governo em Platão e a sua Alegoria da Caverna. 
                        A ética e a política aristotélica, com o conceito de 'justo meio' e a classificação dos regimes políticos.
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
                        Analisar a Alegoria da Caverna de Platão e relacioná-la com a busca pelo conhecimento e a ilusão dos sentidos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filosofia Helenística e Medieval */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('helenistica-medieval')}
            >
              <h3 className="text-lg font-semibold">Filosofia Helenística e Medieval (Epicurismo, Estoicismo, Patrística, Escolástica)</h3>
              {expandedTopics['helenistica-medieval'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['helenistica-medieval'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Helenística: busca pela felicidade individual (Epicurismo - prazer moderado, Estoicismo - aceitação do destino). 
                        Medieval: Filosofia ligada à fé cristã. Patrística (Padres da Igreja, Santo Agostinho - fé e razão). 
                        Escolástica (filosofia nas escolas, São Tomás de Aquino - conciliação entre fé e razão, 'cinco vias' para provar a existência de Deus).
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
                        O hedonismo epicurista e a imperturbabilidade estóica. A relação entre fé e razão no pensamento cristão medieval, 
                        especialmente em Agostinho (predominância da fé) e Tomás de Aquino (possibilidade de conciliação).
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
                        Comparar as visões de Epicuro e do Estoicismo sobre a busca da felicidade e a forma de lidar com o sofrimento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Filosofia Moderna e Contemporânea */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Filosofia Moderna e Contemporânea</h2>
          <p className="text-white/90 leading-relaxed">
            A ruptura com a tradição medieval e o surgimento de novas correntes que moldaram o pensamento ocidental até os dias atuais.
          </p>
        </div>

        <div className="space-y-4">
          {/* Racionalismo e Empirismo */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('racionalismo-empirismo')}
            >
              <h3 className="text-lg font-semibold">Racionalismo e Empirismo (Descartes, Bacon, Locke, Hume)</h3>
              {expandedTopics['racionalismo-empirismo'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['racionalismo-empirismo'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Racionalismo (Descartes - 'Penso, logo existo', método da dúvida, valorização da razão). 
                        Empirismo (Bacon - método indutivo, Locke - 'tábula rasa', Hume - ceticismo, o conhecimento vem da experiência).
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
                        A centralidade do sujeito na modernidade. A busca por um método científico (Bacon) e a origem do conhecimento: 
                        inato (racionalismo) ou derivado da experiência (empirismo).
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
                        Discutir como a frase de Descartes 'Penso, logo existo' estabelece a fundação da filosofia moderna e a centralidade da razão.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Iluminismo e Contratualistas */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('iluminismo-contratualistas')}
            >
              <h3 className="text-lg font-semibold">Iluminismo e Contratualistas (Rousseau, Montesquieu, Voltaire)</h3>
              {expandedTopics['iluminismo-contratualistas'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['iluminismo-contratualistas'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Iluminismo: movimento que valorizou a razão, a liberdade, a igualdade e a crítica ao Antigo Regime. 
                        Contratualistas (Hobbes, Locke, Rousseau): teorias sobre a origem do Estado e da sociedade a partir de um 'contrato social'.
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
                        As ideias de liberdade e igualdade do Iluminismo e suas consequências para as revoluções liberais. 
                        As teorias sobre o Estado de Natureza e o Contrato Social em Hobbes (Estado forte), Locke (direitos naturais, propriedade) 
                        e Rousseau (vontade geral, soberania popular). Montesquieu e a separação dos poderes.
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
                        Comparar as ideias de Rousseau sobre a 'vontade geral' com o conceito de soberania popular em democracias modernas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Idealismo, Materialismo e Positivismo */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('idealismo-materialismo')}
            >
              <h3 className="text-lg font-semibold">Idealismo, Materialismo e Positivismo (Kant, Hegel, Marx, Comte)</h3>
              {expandedTopics['idealismo-materialismo'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['idealismo-materialismo'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Idealismo (Kant - Crítica da Razão Pura, distinção entre fenômeno e númeno; Hegel - dialética, o Espírito Absoluto). 
                        Materialismo (Marx - materialismo histórico e dialético, luta de classes, crítica ao capitalismo). 
                        Positivismo (Comte - 'Ordem e Progresso', ciência como única forma de conhecimento válido, estágios da humanidade).
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
                        A ética kantiana (imperativo categórico). A dialética hegeliana. A teoria marxista da mais-valia, da ideologia e da revolução social. 
                        O caráter científico e o progresso social no Positivismo de Comte e sua influência na bandeira brasileira.
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
                        Relacionar a influência do Positivismo na fundação da República no Brasil e no lema da bandeira 'Ordem e Progresso'.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filosofia Contemporânea */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('filosofia-contemporanea')}
            >
              <h3 className="text-lg font-semibold">Existencialismo, Escola de Frankfurt, Pós-Estruturalismo (Sartre, Adorno, Foucault)</h3>
              {expandedTopics['filosofia-contemporanea'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['filosofia-contemporanea'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Existencialismo (Sartre - 'existência precede a essência', liberdade, responsabilidade). 
                        Escola de Frankfurt (Adorno, Horkheimer - crítica à razão instrumental, indústria cultural). 
                        Pós-Estruturalismo (Foucault - poder, saber, biopoder, genealogia).
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
                        A angústia e a liberdade incondicional no existencialismo. A crítica da indústria cultural e da sociedade de consumo 
                        na Escola de Frankfurt. As relações de poder e saber, a normalização e o controle social em Foucault.
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
                        Discutir como a indústria cultural (música pop, filmes de massa) pode gerar conformismo, sob a ótica da Escola de Frankfurt.
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

export default PhilosophyGuide;
