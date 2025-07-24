
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, Lightbulb } from 'lucide-react';

const MathGuide: React.FC = () => {
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
        <h1 className="text-3xl font-bold mb-4">Guia de Estudos - Matemática</h1>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Visão Geral da Matéria</h2>
          <p className="text-white/90 leading-relaxed">
            A prova de Matemática no ENEM não exige apenas a aplicação de fórmulas, mas principalmente a capacidade de 
            interpretar problemas do cotidiano, gráficos, tabelas e situações-problema complexas. O foco é na resolução 
            de problemas, raciocínio lógico e contextualização.
          </p>
        </div>
      </div>

      {/* Tema 1: Aritmética e Funções */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Aritmética e Funções</h2>
          <p className="text-white/90 leading-relaxed">
            A base da matemática, essencial para qualquer cálculo e interpretação de dados.
          </p>
        </div>

        <div className="space-y-4">
          {/* Proporcionalidade */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('proporcionalidade')}
            >
              <h3 className="text-lg font-semibold">Proporcionalidade (razão, proporção, regra de três)</h3>
              {expandedTopics['proporcionalidade'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['proporcionalidade'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Razão é a comparação entre duas grandezas. Proporção é a igualdade entre duas razões. 
                        A regra de três simples e composta é a aplicação prática para resolver problemas com grandezas 
                        direta ou inversamente proporcionais.
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
                        Muito cobrado em problemas de escala (mapas, maquetes), misturas, velocidades, consumo. 
                        Saber identificar se as grandezas são diretas ou inversamente proporcionais é crucial.
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
                        Se 3 torneiras enchem uma caixa d'água em 2 horas, quanto tempo 6 torneiras levariam? (Regra de três inversa).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Porcentagem e Juros */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('porcentagem-juros')}
            >
              <h3 className="text-lg font-semibold">Porcentagem e Juros (Simples e Composto)</h3>
              {expandedTopics['porcentagem-juros'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['porcentagem-juros'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Porcentagem é uma fração de 100. Juros simples (calculado sobre o capital inicial) e juros compostos 
                        (calculado sobre o montante anterior, ou seja, juros sobre juros).
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
                        Presente em problemas de aumentos/descontos, lucros/prejuízos, impostos, inflação, financiamentos. 
                        O ENEM adora comparar situações de juros simples e compostos para mostrar a diferença do rendimento ao longo do tempo.
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
                        Calcular o valor final de uma compra com um desconto de 15% ou comparar dois investimentos, 
                        um com juros simples e outro com juros compostos, para um dado período.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Funções */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('funcoes')}
            >
              <h3 className="text-lg font-semibold">Funções (1º e 2º grau, Exponencial, Logarítmica)</h3>
              {expandedTopics['funcoes'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['funcoes'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Função do 1º grau (reta) e 2º grau (parábola) modelam situações de variação linear e quadrática. 
                        Funções exponenciais modelam crescimentos/decaimentos rápidos (população, juros compostos, desintegração radioativa). 
                        Funções logarítmicas são inversas às exponenciais (usadas em escalas como pH, terremotos, som).
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
                        O foco é a interpretação de gráficos e a aplicação das funções em contextos reais, como custo de produção, 
                        trajetória de projéteis, crescimento de bactérias ou decaimento de substâncias.
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
                        Analisar o gráfico de uma função do 2º grau que representa a altura de um foguete em relação ao tempo 
                        para encontrar a altura máxima atingida.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 2: Geometria e Medidas */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Geometria e Medidas</h2>
          <p className="text-white/90 leading-relaxed">
            O estudo das formas, tamanhos e posições no espaço, com forte aplicação em problemas práticos.
          </p>
        </div>

        <div className="space-y-4">
          {/* Áreas e Perímetros */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('areas-perimetros')}
            >
              <h3 className="text-lg font-semibold">Áreas e Perímetros (formas planas)</h3>
              {expandedTopics['areas-perimetros'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['areas-perimetros'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Perímetro é a medida do contorno de uma figura. Área é a medida da superfície. 
                        Cálculo para quadrado, retângulo, triângulo, círculo, trapézio, etc.
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
                        Muito presente em problemas de construção, agricultura, planejamento urbano. 
                        Questões de otimização (como usar o mínimo de material para cercar uma área máxima) são comuns.
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
                        Calcular a quantidade de grama para cobrir um terreno em formato de trapézio ou a área de uma pizza.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Volumes e Capacidades */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('volumes-capacidades')}
            >
              <h3 className="text-lg font-semibold">Volumes e Capacidades (sólidos geométricos)</h3>
              {expandedTopics['volumes-capacidades'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['volumes-capacidades'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Volume é a medida do espaço ocupado por um corpo. Cálculo para cubo, paralelepípedo, cilindro, cone, esfera, pirâmide.
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
                        Aplicado em problemas de armazenamento de líquidos, embalagens, construção civil (quantidade de concreto). 
                        O ENEM adora questões que envolvem a relação entre volume e capacidade (1L = 1dm³).
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
                        Calcular quantos litros de água cabem em uma piscina cilíndrica ou o volume de concreto necessário para uma laje.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Escalas */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('escalas')}
            >
              <h3 className="text-lg font-semibold">Escalas e Proporcionalidade em Desenhos/Mapas</h3>
              {expandedTopics['escalas'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['escalas'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Escala é a relação entre a medida no desenho/mapa e a medida real 
                        (ex: 1:100.000 significa que 1 cm no mapa equivale a 100.000 cm na realidade).
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
                        Essencial para interpretar mapas, plantas baixas, maquetes. O ENEM costuma apresentar um mapa com escala 
                        e pedir a distância real entre dois pontos ou a área real de uma região.
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
                        Dado um mapa com escala 1:50.000 e a distância de 5 cm entre duas cidades no mapa, calcular a distância real em km.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tema 3: Estatística e Probabilidade */}
      <div className="mb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-4">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Estatística e Probabilidade</h2>
          <p className="text-white/90 leading-relaxed">
            Análise de dados, gráficos, médias e a chance de eventos ocorrerem, muito presente em notícias e pesquisas.
          </p>
        </div>

        <div className="space-y-4">
          {/* Análise de Gráficos */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('analise-graficos')}
            >
              <h3 className="text-lg font-semibold">Análise de Gráficos e Tabelas</h3>
              {expandedTopics['analise-graficos'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['analise-graficos'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Interpretar diferentes tipos de gráficos (barras, setores, linhas, histogramas) e tabelas para extrair informações, 
                        identificar tendências e fazer comparações.
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
                        Este é um dos temas mais recorrentes. O ENEM apresenta dados em gráficos e tabelas e pede para calcular médias, 
                        modas, medianas, ou para identificar a informação mais relevante, a maior variação, etc.
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
                        Dado um gráfico de barras com a produção de soja em diferentes anos, identificar o ano de maior ou menor produção 
                        e a variação percentual entre dois anos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medidas de Tendência Central */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('medidas-tendencia')}
            >
              <h3 className="text-lg font-semibold">Medidas de Tendência Central (Média, Mediana, Moda)</h3>
              {expandedTopics['medidas-tendencia'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['medidas-tendencia'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        Média (soma de todos os valores dividida pela quantidade de valores). 
                        Mediana (valor central de um conjunto ordenado de dados). 
                        Moda (valor que mais se repete).
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
                        Saber calcular e, principalmente, interpretar essas medidas em diferentes contextos. 
                        O ENEM adora questões que pedem a medida mais adequada para representar um conjunto de dados, 
                        considerando a presença de 'outliers'.
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
                        Calcular a média, mediana e moda das notas de uma turma e interpretar qual medida representa melhor 
                        o desempenho geral, caso haja notas muito discrepantes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Análise Combinatória */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('analise-combinatoria')}
            >
              <h3 className="text-lg font-semibold">Princípio Fundamental da Contagem (PFC), Permutação, Arranjo e Combinação</h3>
              {expandedTopics['analise-combinatoria'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['analise-combinatoria'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        PFC: Multiplicação das possibilidades. Permutação: Ordem importa, todos os elementos são usados. 
                        Arranjo: Ordem importa, parte dos elementos são usados. 
                        Combinação: Ordem NÃO importa, parte dos elementos são usados.
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
                        Aplicado em problemas que envolvem a formação de senhas, placas de carro, número de maneiras de organizar pessoas, 
                        ou escolher um grupo sem se preocupar com a ordem. Diferenciar arranjo de combinação é essencial.
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
                        Calcular quantas senhas de 4 dígitos podem ser formadas com algarismos distintos (arranjo) ou quantas duplas 
                        podem ser formadas a partir de um grupo de 10 pessoas (combinação).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Probabilidade */}
          <div className="bg-white/15 backdrop-blur-md rounded-xl border border-white/10">
            <div 
              className="p-4 cursor-pointer flex items-center justify-between"
              onClick={() => toggleTopic('probabilidade')}
            >
              <h3 className="text-lg font-semibold">Probabilidade</h3>
              {expandedTopics['probabilidade'] ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {expandedTopics['probabilidade'] && (
              <div className="px-4 pb-4 space-y-4">
                <div className="bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <BookOpen className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-blue-300">O que é?</h4>
                      <p className="text-white/90 mt-1">
                        A chance de um evento ocorrer (número de casos favoráveis / número de casos possíveis). 
                        Inclui eventos independentes, dependentes, união e interseção de eventos.
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
                        Cálculo de probabilidade em situações cotidianas, como jogos de azar, sorteios, resultados de exames. 
                        A probabilidade condicional (chance de um evento A ocorrer dado que o evento B já ocorreu) também pode ser cobrada.
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
                        Calcular a probabilidade de tirar duas faces 'coroa' em dois lançamentos de moeda ou a probabilidade de um aluno 
                        ser sorteado para uma bolsa, dados os critérios.
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

export default MathGuide;
