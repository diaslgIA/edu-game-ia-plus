
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const GeographyGuide: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Geografia</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Geografia no ENEM é bastante interdisciplinar, conectando aspectos físicos, humanos, ambientais, 
            econômicos e políticos. Exige a interpretação de mapas, gráficos, imagens e textos, relacionando-os com o 
            espaço geográfico global e brasileiro.
          </p>
        </div>
      </div>

      {/* Tema 1: Geografia Física e Meio Ambiente */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Geografia Física e Meio Ambiente</h2>
          <p className="text-white/90 leading-relaxed">
            O estudo dos elementos naturais do planeta e a interação com as atividades humanas, especialmente os impactos ambientais.
          </p>
        </div>

        <div className="space-y-4">
          {/* Clima e Biomas */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('clima-biomas')}
            >
              <h3 className="text-lg font-semibold">Clima e Biomas Brasileiros</h3>
              {expandedTopics['clima-biomas'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['clima-biomas'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Clima: condições atmosféricas em longo prazo (temperatura, umidade, pressão). 
                        Biomas: grandes ecossistemas caracterizados por vegetação e clima específicos 
                        (Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa, Pantanal).
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
                        Relação entre os tipos climáticos (equatorial, tropical, semiárido, subtropical) e os biomas, 
                        seus problemas ambientais (desmatamento, queimadas) e as formas de preservação. 
                        Questões sobre o impacto do El Niño/La Niña no clima brasileiro.
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
                        Analisar um mapa de biomas e associar a Caatinga ao clima semiárido e aos desafios de desertificação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Relevo, Hidrografia e Solos */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('relevo-hidrografia')}
            >
              <h3 className="text-lg font-semibold">Relevo, Hidrografia e Solos</h3>
              {expandedTopics['relevo-hidrografia'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['relevo-hidrografia'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Relevo: formas da superfície terrestre (planaltos, planícies, depressões). 
                        Hidrografia: estudo das águas (rios, lagos, oceanos, aquíferos). 
                        Solos: camada superficial da crosta terrestre.
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
                        Processos de formação e modificação do relevo (erosão, intemperismo). 
                        Bacias hidrográficas brasileiras (importância econômica, hidrelétricas, problemas de poluição e assoreamento). 
                        Tipos de solos e sua relação com a agricultura.
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
                        Discutir como a construção de hidrelétricas altera o regime dos rios e a vida das populações ribeirinhas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Questões Ambientais */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('questoes-ambientais')}
            >
              <h3 className="text-lg font-semibold">Questões Ambientais Globais e Locais</h3>
              {expandedTopics['questoes-ambientais'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['questoes-ambientais'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Problemas como aquecimento global, efeito estufa, chuva ácida, camada de ozônio, inversão térmica, 
                        ilhas de calor, poluição da água/ar/solo, desmatamento e perda de biodiversidade.
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
                        Compreender as causas, consequências e possíveis soluções (desenvolvimento sustentável, energias renováveis, reciclagem). 
                        Muito cobrado em sua dimensão interdisciplinar, relacionando com Química e Biologia.
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
                        Explicar como a queima de combustíveis fósseis contribui para o efeito estufa e a elevação da temperatura média do planeta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Geografia Humana e Econômica */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Geografia Humana e Econômica</h2>
          <p className="text-white/90 leading-relaxed">
            O estudo da população, das atividades econômicas, do espaço urbano e rural, e das relações de poder que moldam o território.
          </p>
        </div>

        <div className="space-y-4">
          {/* Demografia */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('demografia')}
            >
              <h3 className="text-lg font-semibold">Demografia e População Brasileira</h3>
              {expandedTopics['demografia'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['demografia'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Demografia: estudo das dinâmicas populacionais (crescimento, natalidade, mortalidade, migrações). 
                        População Brasileira: sua distribuição, estrutura etária, transição demográfica e movimentos migratórios (internos e externos).
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
                        Análise de pirâmides etárias (jovem, adulta, idosa), taxas de urbanização e seus impactos (favelização, mobilidade), 
                        e as causas e consequências dos fluxos migratórios (êxodo rural, migração de retorno).
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
                        Analisar uma pirâmide etária de um país desenvolvido e de um em desenvolvimento e inferir tendências 
                        populacionais e seus desafios (previdência, mercado de trabalho).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Urbanização */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('urbanizacao')}
            >
              <h3 className="text-lg font-semibold">Urbanização e Questões Urbanas</h3>
              {expandedTopics['urbanizacao'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['urbanizacao'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Processo de crescimento das cidades. Questões urbanas: problemas decorrentes da urbanização acelerada 
                        (transporte, moradia, saneamento básico, violência, segregação socioespacial).
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
                        Causas e consequências do inchaço urbano, formação de metrópoles, conurbação, megalópoles. 
                        O ENEM aborda a desigualdade urbana, a gentrificação e a necessidade de planejamento urbano.
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
                        Discutir as soluções para os problemas de mobilidade urbana em grandes cidades, 
                        como o investimento em transporte público e ciclovias.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Indústria e Economia */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('industria-economia')}
            >
              <h3 className="text-lg font-semibold">Indústria e Setores da Economia</h3>
              {expandedTopics['industria-economia'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['industria-economia'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Indústria: processos de transformação de matérias-primas. 
                        Setores da economia: primário (agricultura, pecuária), secundário (indústria), terciário (serviços e comércio).
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
                        Evolução industrial (1ª, 2ª, 3ª Revoluções Industriais), modelos de produção (fordismo, toyotismo), 
                        localização das indústrias e seus impactos socioeconômicos. A importância dos diferentes setores no PIB brasileiro e suas dinâmicas.
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
                        Explicar como a automação na indústria (ligada à 3ª Revolução Industrial) afeta o mercado de trabalho.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Globalização e Geopolítica */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('globalizacao-geopolitica')}
            >
              <h3 className="text-lg font-semibold">Globalização e Geopolítica</h3>
              {expandedTopics['globalizacao-geopolitica'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['globalizacao-geopolitica'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Globalização: interconexão econômica, cultural e política em escala mundial. 
                        Geopolítica: relação entre geografia e poder político, estudando as relações internacionais e os conflitos.
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
                        Fluxos de capital, mercadorias, informações e pessoas. Blocos econômicos (Mercosul, União Europeia), 
                        organismos internacionais (ONU, FMI). Conflitos regionais, questões de soberania e territorialidade. 
                        O papel do Brasil no cenário global.
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
                        Discutir o papel das redes sociais e da internet na intensificação da globalização cultural ou as causas do conflito israelo-palestino.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Geografia Agrária */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('geografia-agraria')}
            >
              <h3 className="text-lg font-semibold">Geografia Agrária e Questões do Campo</h3>
              {expandedTopics['geografia-agraria'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['geografia-agraria'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        O estudo das atividades no espaço rural (agricultura, pecuária) e suas dinâmicas sociais e econômicas.
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
                        Sistemas agrícolas (plantation, agricultura familiar, agronegócio), estrutura fundiária no Brasil (concentração de terras), 
                        movimentos sociais do campo (MST). Questões como o uso de agrotóxicos e a segurança alimentar.
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
                        Comparar as características do agronegócio exportador e da agricultura familiar no Brasil, 
                        destacando seus impactos socioambientais.
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

export default GeographyGuide;
