// scripts/educationalContent.ts

export interface Topic {
  topicName: string;
  explanation: string;
}

export interface Theme {
  themeName: string;
  topics: Topic[];
}

export interface Subject {
  subjectName: string;
  themes: Theme[];
}

export const contentData: Subject[] = [
  // =================================================================
  // 1. MATEMÁTICA
  // =================================================================
  {
    subjectName: 'Matemática',
    themes: [
      {
        themeName: 'Matemática Básica e Aritmética',
        topics: [
          {
            topicName: 'Operações com números reais',
            explanation: 'Os números reais (ℝ) englobam todos os números que você conhece: positivos, negativos, inteiros, frações (decimais) e até os irracionais (como π e √2). As operações são as quatro básicas: adição, subtração, multiplicação e divisão. O ENEM testa sua habilidade com as regras de sinais e a ordem correta das operações (PEMDAS: Parênteses, Expoentes, Multiplicação/Divisão, Adição/Subtração). Muitas questões apresentam um texto longo descrevendo uma situação cotidiana e pedem que você modele essa situação com operações básicas para encontrar a resposta.'
          },
          {
            topicName: 'Razão e Proporção',
            explanation: 'Razão é a divisão entre duas grandezas (a/b). Proporção é a igualdade entre duas razões (a/b = c/d). A propriedade fundamental é a "multiplicação em cruz": a * d = b * c. Este tópico aparece em escalas de mapas, densidade demográfica, velocidade média e problemas de comparação de grandezas.'
          },
          {
            topicName: 'Regra de três simples e composta',
            explanation: 'É a ferramenta para resolver problemas de proporção. A simples envolve duas grandezas. A composta envolve três ou mais. É crucial saber identificar se as grandezas são diretamente proporcionais (ambas aumentam ou diminuem juntas) ou inversamente proporcionais (uma aumenta enquanto a outra diminui). O erro mais comum é não inverter a razão da grandeza inversa antes de calcular.'
          },
          {
            topicName: 'Porcentagem',
            explanation: 'Porcentagem é uma razão com denominador 100. Representa uma parte de um todo. "25%" é o mesmo que 25/100 ou 0,25. Aparece em descontos, acréscimos, lucros e matemática financeira. É fundamental saber calcular aumentos e descontos sucessivos e variações percentuais.'
          },
          {
            topicName: 'Juros simples e compostos',
            explanation: 'São formas de calcular o rendimento de um capital. Juros Simples: o rendimento é sempre sobre o valor inicial (J = C * i * t). Juros Compostos: o rendimento é calculado sobre o valor do mês anterior, "juros sobre juros" (M = C * (1 + i)^t). O ENEM foca mais em juros compostos, pois é o que se aplica no mundo real.'
          },
        ],
      },
      {
        themeName: 'Funções',
        topics: [
            {
                topicName: 'Função de 1º e 2º grau',
                explanation: 'Função de 1º Grau (Função Afim): f(x) = ax + b, seu gráfico é uma reta. Função de 2º Grau (Função Quadrática): f(x) = ax² + bx + c, seu gráfico é uma parábola. O ENEM cobra a montagem da lei de formação para o 1º grau e, para o 2º grau, o significado dos vértices (ponto de máximo ou mínimo) em problemas de otimização.'
            },
            {
                topicName: 'Análise de gráficos',
                explanation: 'É a habilidade de "ler" as informações contidas em um gráfico (linhas, barras, pizza, etc.). O ENEM te dá um gráfico e faz perguntas sobre ele. Você precisa identificar intervalos de crescimento, pontos de máximo e mínimo, e relacionar as informações dos eixos com o contexto do problema. É pura interpretação.'
            },
            {
                topicName: 'Função Exponencial',
                explanation: 'Uma função onde a variável está no expoente: f(x) = a^x. Descreve crescimentos ou decrescimentos muito rápidos, como crescimento de populações, juros compostos e decaimento radioativo. O ENEM geralmente fornece a fórmula e pede para você aplicá-la.'
            },
            {
                topicName: 'Função Logarítmica',
                explanation: 'É a função inversa da exponencial: f(x) = log_a(x). Logaritmos são usados para trabalhar com números muito grandes ou muito pequenos, transformando multiplicações em somas e potências em multiplicações. Aparecem em escalas como a Richter (terremotos) e pH (acidez).'
            }
        ]
      },
      {
        themeName: 'Geometria',
        topics: [
            {
                topicName: 'Geometria Plana',
                explanation: 'O estudo de figuras em duas dimensões (2D). Perímetro é a soma dos lados. Área é a medida da superfície. É preciso saber as fórmulas de área das principais figuras: quadrado, retângulo, triângulo, trapézio, losango e círculo. Questões com figuras compostas são comuns.'
            },
            {
                topicName: 'Geometria Espacial',
                explanation: 'O estudo de sólidos em 3D. O volume é o espaço que um sólido ocupa. A fórmula para prismas e cilindros é Área da Base x Altura. Para cones e pirâmides, é (Área da Base x Altura) / 3. O ENEM adora problemas sobre a capacidade de recipientes.'
            },
            {
                topicName: 'Trigonometria no triângulo retângulo',
                explanation: 'O estudo das relações entre os ângulos e os lados de um triângulo retângulo. As três razões básicas são: Seno (Cateto Oposto / Hipotenusa), Cosseno (Cateto Adjacente / Hipotenusa) e Tangente (Cateto Oposto / Cateto Adjacente). É usada para resolver problemas de altura e distância inacessíveis.'
            }
        ]
      },
      {
        themeName: 'Estatística e Probabilidade',
        topics: [
            {
                topicName: 'Medidas de tendência central',
                explanation: 'São valores que representam um conjunto de dados. Média Aritmética: soma de todos os valores dividida pelo número de valores. Moda: o valor que mais se repete. Mediana: o valor central dos dados em ordem crescente. O ENEM cobra a diferença conceitual e a interpretação de qual medida é mais adequada para cada situação.'
            },
            {
                topicName: 'Análise e interpretação de gráficos e tabelas',
                explanation: 'Habilidade fundamental no ENEM. O trabalho é ler com atenção o título, as legendas, os eixos e o enunciado para responder à pergunta. Não exige cálculos complexos, mas sim atenção aos detalhes e capacidade de conectar as informações visuais com o problema.'
            },
            {
                topicName: 'Cálculo de probabilidade',
                explanation: 'É a chance de um determinado evento ocorrer. A fórmula básica é: P = (Número de Casos Favoráveis) / (Número de Casos Possíveis). O ENEM aborda desde o cálculo simples até a probabilidade condicional e de eventos sucessivos.'
            },
            {
                topicName: 'Análise Combinatória',
                explanation: 'É a área que estuda as técnicas de contagem. As ferramentas são o Princípio Fundamental da Contagem (PFC), Arranjo (a ordem importa), Combinação (a ordem não importa) e Permutação (reorganizar elementos). O grande desafio é saber qual ferramenta usar em cada problema (formação de senhas, comissões, pódios, etc.).'
            }
        ]
      }
    ],
  },
  // =================================================================
  // 2. PORTUGUÊS E LITERATURA
  // =================================================================
  {
    subjectName: 'Português e Literatura',
    themes: [
      {
        themeName: 'Interpretação e Análise Textual',
        topics: [
          {
            topicName: 'Leitura e interpretação de textos (verbais e não-verbais)',
            explanation: 'É a habilidade de extrair informações e sentidos de diferentes formas de comunicação. Textos verbais usam a palavra escrita. Textos não-verbais usam imagens. O ENEM ama textos mistos (charges, tirinhas, anúncios), que combinam os dois. O segredo é entender não apenas o que está dito, mas por que está dito daquela forma, identificando a ideia principal, a opinião do autor, ironias e ambiguidades.'
          },
          {
            topicName: 'Gêneros textuais',
            explanation: 'São as "formas" que os textos assumem na sociedade para cumprir uma função. Você precisa reconhecer a função de cada gênero: uma notícia informa, uma propaganda persuade, uma receita instrui, um poema emociona. O ENEM cobra que você identifique o gênero para entender seu objetivo, público-alvo e linguagem.'
          },
          {
            topicName: 'Funções da linguagem',
            explanation: 'São as diferentes intenções de um ato de comunicação. Referencial (informar), Emotiva (expressar sentimentos), Apelativa (convencer), Poética (foco na forma), Fática (testar o canal) e Metalinguística (língua explicando a si mesma). Identificar a função predominante ajuda a desvendar a intenção do autor.'
          },
          {
            topicName: 'Variação linguística',
            explanation: 'É o reconhecimento de que a língua muda de acordo com a região (dialetos), grupo social (gírias), situação (formal/informal) e tempo (histórica). O ENEM combate o preconceito linguístico, valorizando a diversidade e cobrando a adequação da linguagem ao contexto, não um suposto "certo" ou "errado".'
          },
        ],
      },
      {
        themeName: 'Gramática e Norma Culta',
        topics: [
            {
                topicName: 'Coesão e coerência',
                explanation: 'Coesão é a "costura" gramatical do texto, a ligação entre as partes feita por conectivos, pronomes, etc. Coerência é a lógica, o sentido do texto. O ENEM adora questões sobre o papel dos conectivos (mas, portanto, embora), exigindo que você identifique o sentido que eles estabelecem entre as frases.'
            },
            {
                topicName: 'Pontuação',
                explanation: 'A prova não cobra regras isoladas, mas o efeito de sentido criado pela pontuação. O travessão pode indicar uma explicação; as aspas podem indicar uma citação, ironia ou gíria. O foco é na função expressiva dos sinais de pontuação.'
            },
            {
                topicName: 'Concordância e Regência (Verbal e Nominal)',
                explanation: 'Concordância é a harmonia entre os termos. Regência é a relação de dependência entre eles, exigindo ou não preposição. As questões costumam apresentar trechos que fogem à norma-padrão (de músicas, por exemplo) e pedem para você reescrevê-los ou analisar o efeito expressivo do "desvio".'
            },
            {
                topicName: 'Classes de palavras',
                explanation: 'O ENEM quer que você entenda o valor semântico e a função de uma palavra no contexto. Uma mesma palavra pode mudar de classe e de sentido dependendo da frase. O foco é entender como a escolha de um adjetivo, por exemplo, constrói a imagem de um personagem.'
            }
        ]
      },
      {
        themeName: 'Literatura Brasileira',
        topics: [
            {
                topicName: 'Modernismo (1ª, 2ª e 3ª fases)',
                explanation: 'O movimento mais cobrado. 1ª Fase (1922-30): Ruptura, experimentalismo, versos livres, linguagem coloquial (Mário de Andrade, Oswald de Andrade). 2ª Fase (1930-45): Consolidação, poesia reflexiva (Drummond) e prosa regionalista de denúncia social (Graciliano Ramos, Jorge Amado). 3ª Fase (Pós-1945): Experimentalismo na prosa (Clarice Lispector, Guimarães Rosa) e rigor formal na poesia (João Cabral de Melo Neto).'
            },
            {
                topicName: 'Romantismo e Realismo',
                explanation: 'Movimentos opostos do século XIX. Romantismo: visão idealizada, sentimentalismo, nacionalismo (índio como herói), escapismo. Realismo/Naturalismo: reação ao Romantismo, com visão objetiva e crítica da sociedade burguesa, análise psicológica e denúncia social. Autor-chave do Realismo: Machado de Assis.'
            },
            {
                topicName: 'Literatura Contemporânea',
                explanation: 'A produção literária a partir da segunda metade do século XX. Marcada pela diversidade, dialoga com a realidade urbana, a violência, a memória da ditadura e questões de identidade. O ENEM adora textos contemporâneos, principalmente poemas e crônicas, focando na interpretação e na conexão com o mundo atual.'
            },
            {
                topicName: 'Figuras de Linguagem',
                explanation: 'Recursos expressivos que criam novos efeitos de sentido. Essenciais para interpretar textos literários. Principais: Metáfora (comparação implícita), Comparação (explícita), Metonímia (parte pelo todo), Ironia (dizer o contrário), Hipérbole (exagero) e Personificação (características humanas a seres inanimados).'
            }
        ]
      }
    ],
  },
  // =================================================================
  // 3. FÍSICA
  // =================================================================
  {
    subjectName: 'Física',
    themes: [
        {
            themeName: 'Mecânica',
            topics: [
                {
                    topicName: 'Cinemática',
                    explanation: 'Descreve o movimento. Foco na interpretação de gráficos (posição x tempo, velocidade x tempo). A inclinação do gráfico v x t é a aceleração, e a área sob ele é o deslocamento. As funções horárias (sorvete, sorvetão) modelam situações-problema.'
                },
                {
                    topicName: 'Leis de Newton e Dinâmica',
                    explanation: 'Estuda as causas do movimento. 1ª Lei (Inércia - muito cobrada conceitualmente, ex: cinto de segurança). 2ª Lei (F=ma - principal ferramenta de cálculo). 3ª Lei (Ação e Reação - conceitual, pares atuam em corpos diferentes).'
                },
                {
                    topicName: 'Trabalho e Energia',
                    explanation: 'Trabalho é transferência de energia. Tipos de energia: Cinética (movimento), Potencial Gravitacional (altura), Potencial Elástica (molas). O conceito de Conservação da Energia Mecânica é fundamental: em sistemas sem atrito, a energia total (cinética + potencial) se mantém constante.'
                },
                {
                    topicName: 'Gravitação Universal',
                    explanation: 'Estudo da atração entre massas e do movimento de planetas. As Leis de Kepler são cobradas de forma conceitual (órbitas elípticas; áreas iguais em tempos iguais). A Lei da Gravitação de Newton pode aparecer em questões comparativas.'
                }
            ]
        },
        {
            themeName: 'Eletricidade e Magnetismo',
            topics: [
                {
                    topicName: 'Eletrodinâmica',
                    explanation: 'O assunto de física que mais cai. Foco em análise de circuitos com resistores em série e paralelo. 1ª Lei de Ohm (U = R.i) e Potência Elétrica (P = U.i) são essenciais. Questões sobre chuveiros, consumo de energia (kWh) e aparelhos domésticos são muito comuns.'
                },
                {
                    topicName: 'Eletrostática',
                    explanation: 'Estudo das cargas em repouso. O foco é conceitual: processos de eletrização (atrito, contato, indução) e o conceito de campo elétrico. Cálculos com a Lei de Coulomb são menos frequentes.'
                },
                {
                    topicName: 'Magnetismo',
                    explanation: 'Foco conceitual na relação entre eletricidade e magnetismo: corrente elétrica gera campo magnético (eletroímãs) e a variação do campo magnético gera corrente elétrica (base dos geradores e usinas de energia).'
                }
            ]
        },
        {
            themeName: 'Termologia e Ondulatória',
            topics: [
                {
                    topicName: 'Calorimetria',
                    explanation: 'Estudo das trocas de calor. Calor Sensível (causa variação de temperatura, Q=mcΔT) e Calor Latente (causa mudança de estado físico, Q=mL). O ENEM cobra o entendimento desses conceitos em situações práticas, como a evaporação do suor.'
                },
                {
                    topicName: 'Termodinâmica',
                    explanation: 'Estudo das relações entre calor, trabalho e energia em gases. A 1ª Lei da Termodinâmica (conservação de energia) e a análise de máquinas térmicas em gráficos PxV são os pontos principais.'
                },
                {
                    topicName: 'Ondulatória',
                    explanation: 'O mais importante é entender os fenômenos ondulatórios: Reflexão (eco), Refração (luz mudando de meio), Difração (onda contornando obstáculos), Interferência (fones com cancelamento de ruído) e Polarização. O ENEM cobra a identificação desses fenômenos no cotidiano.'
                },
                {
                    topicName: 'Óptica',
                    explanation: 'Estudo da luz. Formação de imagens em espelhos e lentes. O ENEM adora questões sobre o olho humano e seus defeitos: Miopia (dificuldade de ver de longe, corrigida com lente divergente) e Hipermetropia (dificuldade de ver de perto, corrigida com lente convergente).'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 4. QUÍMICA
  // =================================================================
  {
    subjectName: 'Química',
    themes: [
        {
            themeName: 'Química Geral e Físico-Química',
            topics: [
                {
                    topicName: 'Estrutura atômica e Tabela Periódica',
                    explanation: 'Compreender a distribuição eletrônica e as propriedades periódicas (raio atômico, eletronegatividade) é fundamental para prever como os átomos se ligam e se comportam.'
                },
                {
                    topicName: 'Ligações químicas e Forças intermoleculares',
                    explanation: 'Crucial para entender as propriedades das substâncias. A polaridade de uma molécula determina o tipo de força intermolecular (Ligação de Hidrogênio, Dipolo-dipolo, etc.), que por sua vez explica o ponto de ebulição e a solubilidade ("semelhante dissolve semelhante").'
                },
                {
                    topicName: 'Soluções e Cálculo de concentração',
                    explanation: 'O cálculo das diferentes formas de concentração (comum, molaridade, título, ppm) é muito cobrado em contextos como medicina, indústria de alimentos ou controle de poluição.'
                },
                {
                    topicName: 'Termoquímica',
                    explanation: 'O estudo do calor nas reações. Reações exotérmicas (liberam calor, ΔH < 0) e endotérmicas (absorvem calor, ΔH > 0). O ENEM cobra a identificação desses processos no cotidiano (combustão, fotossíntese).'
                },
                {
                    topicName: 'Cinética e Equilíbrio químico',
                    explanation: 'Cinética estuda a velocidade das reações (influenciada por temperatura, concentração, etc.). Equilíbrio é o estado onde as velocidades das reações direta e inversa se igualam. O Princípio de Le Chatelier é a estrela: como um sistema em equilíbrio reage a perturbações.'
                }
            ]
        },
        {
            themeName: 'Química Orgânica',
            topics: [
                {
                    topicName: 'Funções Orgânicas',
                    explanation: 'O mais importante é reconhecer as principais funções: hidrocarbonetos, álcool, fenol, aldeído, cetona, ácido carboxílico, éster, amina e amida, e associá-las a suas propriedades básicas.'
                },
                {
                    topicName: 'Reações Orgânicas Principais',
                    explanation: 'O foco é em reações de grande importância: Combustão (de combustíveis), Esterificação (formação de essências), Saponificação (produção de sabão), Oxidação (teste do bafômetro) e Polimerização.'
                },
                {
                    topicName: 'Isomeria',
                    explanation: 'O fenômeno de compostos com mesma fórmula molecular terem estruturas e propriedades diferentes. Isomeria geométrica (cis-trans) é importante em gorduras. Isomeria óptica (quiralidade) é fundamental em fármacos.'
                },
                {
                    topicName: 'Polímeros',
                    explanation: 'Macromoléculas do dia a dia: plásticos (PET, PVC), borrachas, nylon, e também polímeros naturais como carboidratos e proteínas. É importante saber reconhecer a unidade de repetição (monômero).'
                }
            ]
        },
        {
            themeName: 'Química Ambiental e Inorgânica',
            topics: [
                {
                    topicName: 'Poluição',
                    explanation: 'Tema interdisciplinar. Conceitos importantes: Efeito Estufa, Chuva Ácida (causada por óxidos de enxofre e nitrogênio), Destruição da Camada de Ozônio e Eutrofização dos rios.'
                },
                {
                    topicName: 'Lixo e Reciclagem',
                    explanation: 'Entender os diferentes tipos de materiais (metais, vidros, plásticos, papel) e os processos básicos de sua reciclagem. A simbologia da reciclagem é um tema recorrente.'
                },
                {
                    topicName: 'Funções Inorgânicas',
                    explanation: 'Foco no comportamento e aplicações de Ácidos, Bases (conceito de Arrhenius, escala de pH, neutralização), Sais e Óxidos em produtos de limpeza, alimentos, chuva ácida, etc.'
                },
                {
                    topicName: 'Estequiometria',
                    explanation: 'A "matemática da química". É o cálculo das quantidades de reagentes e produtos em uma reação. Você precisa saber balancear uma equação e usar a proporção em mols para calcular massas e volumes. Casos de reagente limitante e pureza são comuns.'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 5. BIOLOGIA
  // =================================================================
  {
    subjectName: 'Biologia',
    themes: [
        {
            themeName: 'Ecologia e Meio Ambiente',
            topics: [
                {
                    topicName: 'Cadeias e teias alimentares',
                    explanation: 'Representação do fluxo de energia nos ecossistemas. É preciso saber identificar os níveis tróficos (produtores, consumidores, decompositores). Questões sobre bioacumulação (acúmulo de compostos tóxicos ao longo da cadeia) são muito comuns.'
                },
                {
                    topicName: 'Ciclos biogeoquímicos',
                    explanation: 'O caminho dos elementos químicos entre os seres vivos e o ambiente. O Ciclo do Carbono é fundamental para entender o aquecimento global. O Ciclo do Nitrogênio é importante pela ação das bactérias no solo, essencial para a agricultura.'
                },
                {
                    topicName: 'Relações ecológicas',
                    explanation: 'As interações entre os seres vivos. O ENEM apresenta um cenário e pede para você identificar a relação: Mutualismo (+/+), Predatismo (+/-), Parasitismo (+/-), Competição (-/-), Comensalismo (+/0), etc.'
                },
                {
                    topicName: 'Impactos ambientais e Desequilíbrios',
                    explanation: 'Tema interdisciplinar. É preciso entender as causas e consequências de problemas como desmatamento, poluição, introdução de espécies exóticas, aquecimento global e eutrofização (excesso de nutrientes na água que leva à morte de peixes).'
                }
            ]
        },
        {
            themeName: 'Citologia, Histologia e Bioquímica',
            topics: [
                {
                    topicName: 'Membrana plasmática e organelas celulares',
                    explanation: 'Foco na função de cada organela: Mitocôndria (respiração e energia), Ribossomos (síntese de proteínas), Cloroplastos (fotossíntese). O modelo do mosaico fluido da membrana e seus transportes (osmose, difusão) também são importantes.'
                },
                {
                    topicName: 'Bioenergética',
                    explanation: 'Como os seres vivos obtêm energia. Respiração Celular (consome glicose e O₂ para produzir ATP) e Fotossíntese (usa CO₂, água e luz para produzir glicose). Entender que são processos interdependentes é crucial.'
                },
                {
                    topicName: 'Histologia',
                    explanation: 'O estudo dos tecidos. O foco é na relação entre a estrutura e a função: Tecido Epitelial (revestimento), Conjuntivo (sustentação), Muscular (movimento) e Nervoso (impulsos).'
                },
                {
                    topicName: 'Bioquímica Celular',
                    explanation: 'O estudo das moléculas da vida. Carboidratos (energia), Lipídios (reserva energética, hormônios), Proteínas (enzimas, anticorpos, estrutura) e Vitaminas (coenzimas).'
                }
            ]
        },
        {
            themeName: 'Genética e Evolução',
            topics: [
                {
                    topicName: 'Leis de Mendel',
                    explanation: 'As leis básicas da hereditariedade. O ENEM cobra a aplicação dessas leis na resolução de problemas de heredogramas (árvores genealógicas), para descobrir genótipos e probabilidades.'
                },
                {
                    topicName: 'Engenharia genética e Biotecnologia',
                    explanation: 'Tema moderno e relevante. Conceitos importantes: Transgênicos (organismos que recebem um gene de outra espécie), Clonagem e Terapia Gênica. As questões abordam as aplicações (produção de insulina, plantas resistentes) e as implicações éticas.'
                },
                {
                    topicName: 'Teorias evolutivas (Lamarck e Darwin)',
                    explanation: 'A principal tarefa é diferenciar Lamarck (Lei do uso e desuso, herança de caracteres adquiridos - errado) de Darwin (Seleção Natural - o meio seleciona os mais aptos, que sobrevivem e se reproduzem mais).'
                },
                {
                    topicName: 'Hereditariedade e Grupos sanguíneos',
                    explanation: 'O sistema ABO é o mais cobrado. É um caso de alelos múltiplos e codominância. Você precisa saber determinar o tipo sanguíneo dos filhos a partir dos pais e entender as regras de transfusão.'
                }
            ]
        },
        {
            themeName: 'Fisiologia Humana e Saúde',
            topics: [
                {
                    topicName: 'Sistemas do corpo humano',
                    explanation: 'O ENEM cobra a integração entre os sistemas: Digestório (enzimas), Respiratório (trocas gasosas), Circulatório (transporte), Excretor (filtração), Endócrino (hormônios) e Nervoso.'
                },
                {
                    topicName: 'Imunologia',
                    explanation: 'A diferença entre vacina e soro é um clássico. Vacina: imunização ativa e preventiva (seu corpo produz anticorpos). Soro: imunização passiva e de emergência (você recebe os anticorpos prontos).'
                },
                {
                    topicName: 'Parasitologia e principais doenças',
                    explanation: 'O foco é na profilaxia (prevenção). Para cada doença, saiba o agente causador, o vetor e como evitá-la. Doenças relacionadas a saneamento básico (cólera) e a vetores (dengue, malária, Chagas) são as mais comuns.'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 6. HISTÓRIA
  // =================================================================
  {
    subjectName: 'História',
    themes: [
        {
            themeName: 'História do Brasil',
            topics: [
                {
                    topicName: 'Brasil Colônia',
                    explanation: 'Entender a lógica do Pacto Colonial e da economia baseada no plantation (latifúndio, monocultura, mão de obra escrava, exportação). A sociedade era patriarcal e escravista. A mineração no século XVIII deslocou o eixo econômico para o Sudeste.'
                },
                {
                    topicName: 'Brasil Império',
                    explanation: 'Primeiro Reinado (autoritário), Período Regencial (instável) e Segundo Reinado (estabilidade baseada no café e no "parlamentarismo às avessas"). O processo de abolição da escravatura e a Guerra do Paraguai são temas centrais que levaram à queda da monarquia.'
                },
                {
                    topicName: 'República Velha e Era Vargas',
                    explanation: 'A República Velha (1889-1930) foi marcada pelo domínio das oligarquias ("café com leite") e coronelismo. A Era Vargas (1930-1945) foi um período de centralização do poder, industrialização, criação da CLT e forte propaganda política (Estado Novo).'
                },
                {
                    topicName: 'Ditadura Militar e Redemocratização',
                    explanation: 'A Ditadura Militar (1964-1985) foi um regime autoritário com repressão e censura. A Redemocratização foi o processo de transição para a democracia, marcado pelas "Diretas Já" e pela Constituição de 1988, a "Constituição Cidadã".'
                }
            ]
        },
        {
            themeName: 'História Geral',
            topics: [
                {
                    topicName: 'Idade Antiga (Grécia e Roma)',
                    explanation: 'Da Grécia, o conceito de democracia (ateniense, direta mas excludente) e cidadania são os mais importantes. De Roma, a estrutura da República e do Império e o legado do Direito Romano são os pontos principais.'
                },
                {
                    topicName: 'Idade Média (Feudalismo)',
                    explanation: 'Entender a estrutura da sociedade feudal: estamental (clero, nobreza, servos), com poder político descentralizado e forte domínio ideológico da Igreja Católica. A economia era agrária e de subsistência.'
                },
                {
                    topicName: 'Idade Moderna (Absolutismo, Iluminismo)',
                    explanation: 'O Absolutismo (poder concentrado no rei) e o Mercantilismo foram o contexto da colonização. O Iluminismo (século XVIII) é fundamental: a "luz da razão" contra o Antigo Regime, defendendo liberdade, igualdade e a divisão de poderes.'
                },
                {
                    topicName: 'Idade Contemporânea',
                    explanation: 'O período mais cobrado. Revolução Industrial (transformações no trabalho), Revolução Francesa (queda do Absolutismo), Imperialismo (dominação da África e Ásia), Primeira e Segunda Guerras Mundiais e a Guerra Fria (disputa EUA x URSS).'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 7. GEOGRAFIA
  // =================================================================
  {
    subjectName: 'Geografia',
    themes: [
        {
            themeName: 'Geografia do Brasil',
            topics: [
                {
                    topicName: 'Urbanização brasileira',
                    explanation: 'O intenso crescimento das cidades no Brasil. É preciso entender a rede urbana e os problemas socioambientais urbanos: segregação socioespacial (favelas x condomínios), mobilidade, violência e gestão do lixo.'
                },
                {
                    topicName: 'Agropecuária e Estrutura fundiária',
                    explanation: 'A dualidade do campo brasileiro: o agronegócio (moderno, exportador) versus a agricultura familiar (mercado interno, base da nossa alimentação). A concentração de terras e os conflitos no campo são temas recorrentes.'
                },
                {
                    topicName: 'Industrialização',
                    explanation: 'O processo de desenvolvimento industrial no Brasil foi tardio e concentrado. Recentemente, ocorre uma desconcentração industrial, com fábricas saindo do eixo Rio-SP em busca de incentivos em outras regiões.'
                },
                {
                    topicName: 'Fontes de energia e Recursos naturais',
                    explanation: 'A matriz energética brasileira é predominantemente renovável, com destaque para as hidrelétricas. As questões abordam as vantagens e desvantagens de cada fonte e os impactos ambientais de sua exploração (ex: usinas, mineração).'
                }
            ]
        },
        {
            themeName: 'Geografia Geral e Geopolítica',
            topics: [
                {
                    topicName: 'Globalização e Blocos econômicos',
                    explanation: 'A intensificação dos fluxos de mercadorias, capitais e informações em escala mundial. É um processo contraditório, que conecta o mundo mas também acentua desigualdades. Blocos Econômicos (Mercosul, UE) são acordos para facilitar o comércio.'
                },
                {
                    topicName: 'Questões Ambientais',
                    explanation: 'Problemas ambientais em escala global: aquecimento global, efeito estufa, chuva ácida, ilhas de calor. A importância das conferências climáticas (Acordo de Paris) é fundamental.'
                },
                {
                    topicName: 'Cartografia e Climatologia',
                    explanation: 'Cartografia: saber ler mapas, entender escalas (quanto maior o denominador, menor a escala) e projeções. Climatologia: entender os fatores climáticos (latitude, altitude) e fenômenos como El Niño.'
                },
                {
                    topicName: 'Geopolítica mundial e Conflitos',
                    explanation: 'O estudo das relações de poder no espaço mundial. A transição da Velha Ordem (Guerra Fria) para a Nova Ordem (multipolar). Questões sobre conflitos atuais (Oriente Médio) e a crise dos refugiados são comuns.'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 8. FILOSOFIA
  // =================================================================
  {
    subjectName: 'Filosofia',
    themes: [
        {
            themeName: 'Filosofia Antiga e Medieval',
            topics: [
                {
                    topicName: 'Pré-socráticos, Sócrates, Platão e Aristóteles',
                    explanation: 'Os pilares da filosofia. Pré-socráticos (natureza). Sócrates (ser humano). Platão (Mundo das Ideias x Mundo Sensível, Mito da Caverna). Aristóteles (ética, política, lógica). O ENEM adora o Mito da Caverna como alegoria sobre conhecimento e ignorância.'
                },
                {
                    topicName: 'Filosofia Helenística, Patrística e Escolástica',
                    explanation: 'Helenismo (busca da paz interior). Na Idade Média, o tema central é a relação entre fé e razão. Patrística (Santo Agostinho) concilia fé e Platão. Escolástica (São Tomás de Aquino) concilia fé e Aristóteles.'
                }
            ]
        },
        {
            themeName: 'Filosofia Moderna e Contemporânea',
            topics: [
                {
                    topicName: 'Racionalismo e Empirismo',
                    explanation: 'O debate sobre a origem do conhecimento. Racionalismo (Descartes): a razão é a fonte. Empirismo (Locke, Hume): a experiência sensível é a fonte.'
                },
                {
                    topicName: 'Iluminismo e Contratualismo',
                    explanation: 'O Iluminismo valoriza a razão. Os Contratualistas explicam a origem do Estado. Hobbes (Estado forte para conter o "lobo do homem"). Locke (direitos naturais). Rousseau (contrato social baseado na vontade geral).'
                },
                {
                    topicName: 'Kant e o Criticismo',
                    explanation: 'Kant superou a briga entre racionalismo e empirismo. Seu conceito de Imperativo Categórico é o mais relevante: uma ética baseada no dever e na razão universal.'
                },
                {
                    topicName: 'Existencialismo e Escola de Frankfurt',
                    explanation: 'A Escola de Frankfurt critica a sociedade capitalista e a "indústria cultural". O Existencialismo (Sartre) foca na liberdade e na responsabilidade individual ("a existência precede a essência").'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 9. SOCIOLOGIA
  // =================================================================
  {
    subjectName: 'Sociologia',
    themes: [
        {
            themeName: 'Conceitos Fundamentais e Clássicos',
            topics: [
                {
                    topicName: 'Fato Social (Durkheim)',
                    explanation: 'A sociologia estuda os fatos sociais: maneiras de agir exteriores, gerais e coercitivas que a sociedade impõe ao indivíduo. A moda, a língua e as leis são exemplos.'
                },
                {
                    topicName: 'Ação Social (Weber)',
                    explanation: 'A sociologia deve compreender o sentido que os indivíduos dão às suas próprias ações. O foco é na intencionalidade do indivíduo.'
                },
                {
                    topicName: 'Luta de Classes (Marx)',
                    explanation: 'A história da sociedade é a história da luta de classes (burguesia x proletariado). Conceitos como mais-valia, alienação e ideologia são usados para analisar as desigualdades do capitalismo.'
                },
                {
                    topicName: 'Indústria Cultural e Cultura de Massa',
                    explanation: 'Conceito da Escola de Frankfurt. É a transformação da cultura em mercadoria padronizada para gerar lucro, desestimulando o pensamento crítico. Tema muito recorrente no ENEM.'
                }
            ]
        },
        {
            themeName: 'Sociedade, Cidadania e Política',
            topics: [
                {
                    topicName: 'Movimentos Sociais',
                    explanation: 'Ações coletivas que buscam mudanças sociais. O ENEM valoriza os movimentos feminista, negro e ambientalista como agentes de conquista de direitos.'
                },
                {
                    topicName: 'Estado, Direitos e Cidadania',
                    explanation: 'Cidadania é o conjunto de direitos (civis, políticos, sociais) e deveres. A Constituição de 1988 é um marco na garantia dos direitos sociais no Brasil.'
                },
                {
                    topicName: 'Estratificação social e Desigualdade',
                    explanation: 'A divisão da sociedade em camadas. O ENEM foca na imensa desigualdade social no Brasil, analisando seus recortes de classe, gênero e raça.'
                },
                {
                    topicName: 'Democracia e Políticas Públicas',
                    explanation: 'Democracia é o poder que emana do povo. Políticas Públicas são as ações do governo para atender a sociedade. Ações afirmativas (cotas) são um exemplo muito discutido.'
                }
            ]
        },
        {
            themeName: 'Cultura e Identidade',
            topics: [
                {
                    topicName: 'Cultura Material e Imaterial',
                    explanation: 'Cultura Material (objetos). Cultura Imaterial (saberes, práticas, tradições). O ENEM valoriza o patrimônio cultural brasileiro, especialmente o imaterial (frevo, capoeira, etc.).'
                },
                {
                    topicName: 'Etnocentrismo e Relativismo Cultural',
                    explanation: 'Etnocentrismo é julgar outras culturas a partir da sua, considerando-a superior. Relativismo Cultural é entender cada cultura em seus próprios termos. O ENEM espera uma postura de relativismo e crítica ao etnocentrismo.'
                },
                {
                    topicName: 'Diversidade Cultural e Identidade',
                    explanation: 'O reconhecimento da multiplicidade de culturas que formam o Brasil (indígena, africana, europeia). O conceito de sincretismo cultural (mistura) é importante.'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 10. INGLÊS
  // =================================================================
  {
    subjectName: 'Inglês',
    themes: [
        {
            themeName: 'Interpretação de Gêneros Textuais',
            topics: [
                {
                    topicName: 'Análise de textos jornalísticos e publicitários',
                    explanation: 'O ENEM usa textos de sites de notícias como BBC e New York Times. Use as técnicas de Skimming (ideia geral) e Scanning (procurar informações específicas) para otimizar a leitura.'
                },
                {
                    topicName: 'Interpretação de tirinhas, charges e poemas',
                    explanation: 'Textos que exigem a compreensão da linguagem verbal e não-verbal. A chave é a relação entre imagem e texto. Em poemas, o foco é no sentido figurado.'
                },
                {
                    topicName: 'Compreensão de letras de música e textos literários',
                    explanation: 'Trechos que exploram temas mais subjetivos. O objetivo é captar o tema central, o sentimento do eu-lírico ou do narrador, e a mensagem principal.'
                }
            ]
        },
        {
            themeName: 'Vocabulário e Estruturas da Língua',
            topics: [
                {
                    topicName: 'Vocabulário em contexto e expressões idiomáticas',
                    explanation: 'Você não precisa saber todas as palavras, mas conseguir inferir o significado pelo contexto. Preste atenção nos cognatos (palavras parecidas com o português).'
                },
                {
                    topicName: 'Reconhecimento de "phrasal verbs" e falsos cognatos',
                    explanation: 'Falsos cognatos são "pegadinhas" comuns. Ex: "actually" (na verdade), "library" (biblioteca), "pretend" (fingir). Ter uma lista dos principais em mente ajuda muito.'
                },
                {
                    topicName: 'Tempos verbais e Conectores (linking words)',
                    explanation: 'Os conectores (however, therefore, although) são cruciais para entender a relação entre as frases (oposição, conclusão, concessão) e funcionam como as conjunções em português.'
                }
            ]
        },
        {
            themeName: 'Atualidades e Análise Crítica',
            topics: [
                {
                    topicName: 'Leitura de temas sociais, tecnologia e meio ambiente',
                    explanation: 'Os textos frequentemente abordam temas como diversidade, o impacto das redes sociais e sustentabilidade. Estar informado sobre esses assuntos em português ajuda a entender o contexto dos textos em inglês.'
                }
            ]
        }
    ]
  },
  // =================================================================
  // 11. ESPANHOL
  // =================================================================
  {
    subjectName: 'Espanhol',
    themes: [
        {
            themeName: 'Interpretação e Análise Textual',
            topics: [
                {
                    topicName: 'Leitura de notícias, artigos de opinião e publicidade',
                    explanation: 'O exame utiliza muitos textos de jornais como El País. A estratégia é a mesma do inglês: identificar a ideia central, os argumentos e a finalidade do texto.'
                },
                {
                    topicName: 'Análise de tirinhas (cómics), charges e poemas',
                    explanation: 'A personagem Mafalda, do argentino Quino, é um clássico do ENEM. Suas tirinhas são cheias de críticas sociais e reflexões filosóficas. A lógica de analisar a interação texto-imagem é fundamental.'
                },
                {
                    topicName: 'Compreensão de letras de música e fragmentos de romances',
                    explanation: 'Textos de autores latino-americanos podem aparecer. O objetivo é a compreensão do tema, dos sentimentos e do contexto social da obra.'
                }
            ]
        },
        {
            themeName: 'Léxico e Estruturas da Língua',
            topics: [
                {
                    topicName: 'Identificação de falsos cognatos (heterosemánticos)',
                    explanation: 'A maior armadilha da prova. São palavras parecidas, mas com significados diferentes. Ex: "exquisito" (delicioso), "vaso" (copo), "borracha" (bêbada), "apellido" (sobrenome), "oficina" (escritório).'
                },
                {
                    topicName: 'Vocabulário e expressões idiomáticas',
                    explanation: 'O vocabulário cobrado é geralmente relacionado a temas de atualidades. A melhor forma de se preparar é ler notícias de jornais em espanhol.'
                },
                {
                    topicName: 'Tempos verbais, Pronomes e Conjunções',
                    explanation: 'A gramática é contextual. É importante reconhecer os tempos verbais para entender a cronologia e os conectores ("pero", "sin embargo", "aunque") para entender a coesão do texto.'
                }
            ]
        },
        {
            themeName: 'Cultura e Sociedade Hispânica',
            topics: [
                {
                    topicName: 'Aspectos culturais e sociais da América Latina e Espanha',
                    explanation: 'Os textos frequentemente trazem elementos culturais, históricos e sociais dos países de língua espanhola, valorizando a diversidade e a identidade latino-americana.'
                },
                {
                    topicName: 'Identificação de variedades linguísticas',
                    explanation: 'O espanhol também tem variações. O uso do pronome "vos" em vez de "tú" (comum na Argentina) pode aparecer. O ENEM não espera que você domine, mas que reconheça como um fenômeno de diversidade.'
                }
            ]
        }
    ]
  }
];

