
// Estrutura de dados local para todo o conteúdo educacional
// Nível 1: Áreas do Conhecimento
export const areasConhecimento = [
  {
    id: 'linguagens',
    name: 'Linguagens e Códigos',
    icon: '📝',
    color: 'from-blue-500 to-blue-700',
    description: 'Língua Portuguesa, Literatura, Inglês, Espanhol, Artes e Educação Física'
  },
  {
    id: 'matematica',
    name: 'Matemática',
    icon: '📐',
    color: 'from-purple-500 to-purple-700',
    description: 'Números, Álgebra, Geometria, Estatística e Probabilidade'
  },
  {
    id: 'natureza',
    name: 'Ciências da Natureza',
    icon: '🔬',
    color: 'from-green-500 to-green-700',
    description: 'Física, Química, Biologia e suas tecnologias'
  },
  {
    id: 'humanas',
    name: 'Ciências Humanas',
    icon: '🌍',
    color: 'from-orange-500 to-orange-700',
    description: 'História, Geografia, Filosofia e Sociologia'
  }
];

// Nível 2: Matérias
export const materias = [
  // Linguagens e Códigos
  { id: 'portugues', name: 'Português', area_id: 'linguagens', icon: '📚', difficulty: 'Fácil', topics: 42 },
  { id: 'literatura', name: 'Literatura', area_id: 'linguagens', icon: '📖', difficulty: 'Médio', topics: 36 },
  { id: 'ingles', name: 'Inglês', area_id: 'linguagens', icon: '🌎', difficulty: 'Médio', topics: 28 },
  { id: 'espanhol', name: 'Espanhol', area_id: 'linguagens', icon: '🇪🇸', difficulty: 'Médio', topics: 24 },
  { id: 'redacao', name: 'Redação', area_id: 'linguagens', icon: '✍️', difficulty: 'Difícil', topics: 20 },

  // Matemática
  { id: 'matematica', name: 'Matemática', area_id: 'matematica', icon: '🔢', difficulty: 'Médio', topics: 48 },

  // Ciências da Natureza
  { id: 'fisica', name: 'Física', area_id: 'natureza', icon: '⚡', difficulty: 'Difícil', topics: 38 },
  { id: 'quimica', name: 'Química', area_id: 'natureza', icon: '🧪', difficulty: 'Médio', topics: 41 },
  { id: 'biologia', name: 'Biologia', area_id: 'natureza', icon: '🧬', difficulty: 'Médio', topics: 47 },

  // Ciências Humanas
  { id: 'historia', name: 'História', area_id: 'humanas', icon: '🏛️', difficulty: 'Fácil', topics: 36 },
  { id: 'geografia', name: 'Geografia', area_id: 'humanas', icon: '🌍', difficulty: 'Fácil', topics: 33 },
  { id: 'filosofia', name: 'Filosofia', area_id: 'humanas', icon: '🤔', difficulty: 'Médio', topics: 24 },
  { id: 'sociologia', name: 'Sociologia', area_id: 'humanas', icon: '👥', difficulty: 'Fácil', topics: 28 }
];

// Nível 3: Tópicos/Temas
export const topicos = [
  // Português
  {
    id: 'gramatica-basica-pt',
    title: 'Gramática Básica',
    description: 'Classes de palavras, concordância e regência',
    subject_id: 'portugues',
    grande_tema: 'Gramática',
    difficulty_level: 'easy',
    estimated_time: 25,
    content_data: {
      sections: [
        {
          title: "O que é Gramática?",
          content: "A gramática é o conjunto de regras que regem o uso correto da língua portuguesa. Ela engloba desde a classificação das palavras até a estruturação das frases e textos.\n\nAs principais áreas da gramática são:\n• MORFOLOGIA: estuda a estrutura e formação das palavras\n• SINTAXE: analisa a organização das palavras na frase\n• SEMÂNTICA: trata do significado das palavras e frases\n• FONOLOGIA: estuda os sons da língua\n• PRAGMÁTICA: analisa o uso da língua em contextos específicos"
        },
        {
          title: "Foco no ENEM",
          content: "No ENEM, a gramática aparece principalmente integrada à interpretação de textos e à análise linguística. Os tópicos mais cobrados incluem:\n\n📌 CONCORDÂNCIA VERBAL E NOMINAL\n📌 REGÊNCIA VERBAL E NOMINAL\n📌 COLOCAÇÃO PRONOMINAL\n📌 CRASE\n📌 PONTUAÇÃO\n📌 FIGURAS DE LINGUAGEM\n\nA prova valoriza o conhecimento aplicado, ou seja, saber usar as regras gramaticais para compreender e produzir textos eficazes."
        },
        {
          title: "Exemplo Prático",
          content: "Vejamos um exemplo de questão do ENEM:\n\n'Considere a frase: Os meninos que chegaram atrasados perderam a explicação.'\n\n1️⃣ CONCORDÂNCIA: 'meninos' (plural) concorda com 'chegaram' (plural)\n2️⃣ PRONOME RELATIVO: 'que' retoma 'meninos'\n3️⃣ REGÊNCIA: 'perderam' (verbo transitivo direto) + 'a explicação' (objeto direto)\n\nEsse tipo de análise ajuda na compreensão textual e na produção da redação."
        }
      ]
    }
  },
  {
    id: 'interpretacao-textual-pt',
    title: 'Interpretação de Textos',
    description: 'Estratégias para compreender diferentes gêneros textuais',
    subject_id: 'portugues',
    grande_tema: 'Leitura e Interpretação',
    difficulty_level: 'medium',
    estimated_time: 30,
    content_data: {
      sections: [
        {
          title: "O que é Interpretação Textual?",
          content: "Interpretar um texto significa compreender não apenas o que está escrito explicitamente, mas também as informações implícitas, as intenções do autor e o contexto de produção.\n\nElementos fundamentais:\n• COMPREENSÃO: entender o sentido literal do texto\n• INTERPRETAÇÃO: captar sentidos implícitos e subentendidos\n• ANÁLISE CRÍTICA: avaliar argumentos e posicionamentos\n• CONTEXTUALIZAÇÃO: relacionar o texto com seu contexto histórico e social"
        },
        {
          title: "Foco no ENEM",
          content: "O ENEM trabalha com diversos gêneros textuais e cobra habilidades específicas:\n\n📖 GÊNEROS MAIS COBRADOS:\n• Crônicas, contos e romances\n• Artigos de opinião e editoriais\n• Charges, cartuns e infográficos\n• Textos publicitários\n• Documentos históricos\n\n🎯 HABILIDADES TESTADAS:\n• Identificar tema central e ideias secundárias\n• Reconhecer estratégias argumentativas\n• Comparar diferentes pontos de vista\n• Analisar recursos expressivos"
        },
        {
          title: "Exemplo Prático",
          content: "Estratégia para resolver questões de interpretação:\n\n1️⃣ PRIMEIRA LEITURA: leia o texto completo para ter uma visão geral\n\n2️⃣ LEIA A PERGUNTA: entenda exatamente o que está sendo solicitado\n\n3️⃣ SEGUNDA LEITURA: releia o texto buscando as informações específicas\n\n4️⃣ ELIMINE ALTERNATIVAS: descarte opções claramente incorretas\n\n5️⃣ JUSTIFIQUE COM O TEXTO: toda resposta deve ter base no texto apresentado\n\n💡 DICA: Cuidado com alternativas que usam palavras do texto mas alteram o sentido!"
        }
      ]
    }
  },

  // Matemática
  {
    id: 'funcoes-matematica',
    title: 'Funções',
    description: 'Conceitos fundamentais e tipos de funções',
    subject_id: 'matematica',
    grande_tema: 'Álgebra',
    difficulty_level: 'medium',
    estimated_time: 35,
    content_data: {
      sections: [
        {
          title: "O que são Funções?",
          content: "Uma função é uma relação matemática que associa cada elemento de um conjunto (domínio) a um único elemento de outro conjunto (contradomínio).\n\nNotação: f(x) = y\n• x é a variável independente (entrada)\n• y é a variável dependente (saída)\n• f é a regra que define a relação\n\nExemplo: f(x) = 2x + 1\nSe x = 3, então f(3) = 2(3) + 1 = 7\n\nTipos principais:\n• FUNÇÃO LINEAR: f(x) = ax + b\n• FUNÇÃO QUADRÁTICA: f(x) = ax² + bx + c\n• FUNÇÃO EXPONENCIAL: f(x) = aˣ\n• FUNÇÃO LOGARÍTMICA: f(x) = log_a(x)"
        },
        {
          title: "Foco no ENEM",
          content: "As funções são um dos tópicos mais importantes do ENEM, aparecendo em:\n\n📊 APLICAÇÕES PRÁTICAS:\n• Análise de gráficos e tabelas\n• Problemas de otimização\n• Modelagem de situações reais\n• Progressões aritméticas e geométricas\n\n🎯 COMPETÊNCIAS AVALIADAS:\n• Interpretar gráficos de funções\n• Resolver equações e inequações\n• Calcular máximos e mínimos\n• Aplicar funções em contextos diversos\n\n📈 DICA: Pratique sempre a interpretação gráfica, pois é muito cobrada!"
        },
        {
          title: "Exemplo Prático",
          content: "Problema típico do ENEM:\n\n'Uma empresa de telefonia cobra uma taxa fixa de R$ 30,00 mais R$ 0,50 por minuto de ligação.'\n\n1️⃣ MODELAGEM: f(x) = 30 + 0,5x\n• x = minutos de ligação\n• f(x) = valor da conta\n\n2️⃣ INTERPRETAÇÃO:\n• Taxa fixa = R$ 30,00 (quando x = 0)\n• Custo por minuto = R$ 0,50 (coeficiente de x)\n\n3️⃣ APLICAÇÃO:\n• Para 100 minutos: f(100) = 30 + 0,5(100) = R$ 80,00\n• Esta é uma função afim (linear) com aplicação prática!"
        }
      ]
    }
  },
  {
    id: 'geometria-plana-matematica',
    title: 'Geometria Plana',
    description: 'Áreas, perímetros e propriedades das figuras geométricas',
    subject_id: 'matematica',
    grande_tema: 'Geometria',
    difficulty_level: 'medium',
    estimated_time: 40,
    content_data: {
      sections: [
        {
          title: "O que é Geometria Plana?",
          content: "A Geometria Plana estuda figuras bidimensionais, suas propriedades, áreas e perímetros.\n\n🔺 FIGURAS PRINCIPAIS:\n• TRIÂNGULOS: 3 lados e 3 ângulos\n• QUADRILÁTEROS: 4 lados (quadrados, retângulos, losangos, trapézios)\n• CÍRCULOS: figura definida por todos os pontos equidistantes do centro\n• POLÍGONOS REGULARES: figuras com lados e ângulos iguais\n\n📏 CONCEITOS FUNDAMENTAIS:\n• PERÍMETRO: soma de todos os lados\n• ÁREA: medida da superfície ocupada pela figura\n• ÂNGULOS: medida da abertura entre duas retas"
        },
        {
          title: "Foco no ENEM",
          content: "A Geometria Plana no ENEM enfatiza aplicações práticas:\n\n🏠 SITUAÇÕES COTIDIANAS:\n• Cálculo de áreas de terrenos e construções\n• Otimização de espaços\n• Problemas com plantas baixas\n• Ladrilhamento e pavimentação\n\n🎯 FÓRMULAS ESSENCIAIS:\n• Triângulo: A = (b × h)/2\n• Retângulo: A = b × h\n• Quadrado: A = l²\n• Círculo: A = πr²\n• Trapézio: A = (B + b) × h/2\n\n💡 Sempre relate as fórmulas com situações reais!"
        },
        {
          title: "Exemplo Prático",
          content: "Problema contextualizado:\n\n'Um arquiteto precisa calcular a área de um terreno irregular formado por um retângulo de 20m × 15m com um semicírculo de raio 5m em uma das extremidades.'\n\n📐 RESOLUÇÃO:\n1️⃣ Área do retângulo: A₁ = 20 × 15 = 300 m²\n\n2️⃣ Área do semicírculo: A₂ = (π × 5²)/2 = 25π/2 ≈ 39,27 m²\n\n3️⃣ Área total: A = 300 + 39,27 = 339,27 m²\n\n🎯 ESTRATÉGIA: Decomponha figuras complexas em figuras simples conhecidas!"
        }
      ]
    }
  },

  // Física
  {
    id: 'cinematica-fisica',
    title: 'Cinemática',
    description: 'Estudo do movimento sem considerar suas causas',
    subject_id: 'fisica',
    grande_tema: 'Mecânica',
    difficulty_level: 'medium',
    estimated_time: 30,
    content_data: {
      sections: [
        {
          title: "O que é Cinemática?",
          content: "A Cinemática é a área da Física que estuda o movimento dos corpos sem se preocupar com as causas que o produzem.\n\n🎯 GRANDEZAS FUNDAMENTAIS:\n• POSIÇÃO (S): localização do objeto em relação a um referencial\n• DESLOCAMENTO (ΔS): variação da posição\n• VELOCIDADE (v): rapidez da variação da posição\n• ACELERAÇÃO (a): rapidez da variação da velocidade\n\n📊 TIPOS DE MOVIMENTO:\n• MOVIMENTO UNIFORME (MU): velocidade constante\n• MOVIMENTO UNIFORMEMENTE VARIADO (MUV): aceleração constante\n• MOVIMENTO CIRCULAR: trajetória circular"
        },
        {
          title: "Foco no ENEM",
          content: "A Cinemática no ENEM é sempre contextualizada:\n\n🚗 APLICAÇÕES COMUNS:\n• Movimento de veículos em estradas\n• Queda livre de objetos\n• Lançamento de projéteis\n• Análise de gráficos de movimento\n\n📝 EQUAÇÕES PRINCIPAIS:\n• MU: S = S₀ + v.t\n• MUV: S = S₀ + v₀.t + (a.t²)/2\n• Torricelli: v² = v₀² + 2.a.ΔS\n\n💡 DICA: Sempre identifique primeiro que tipo de movimento está sendo descrito!"
        },
        {
          title: "Exemplo Prático",
          content: "Problema típico:\n\n'Um carro parte do repouso e acelera uniformemente a 2 m/s² por 10 segundos. Qual a distância percorrida?'\n\n📐 ANÁLISE:\n• Movimento: MUV (aceleração constante)\n• Dados: v₀ = 0, a = 2 m/s², t = 10 s\n• Incógnita: ΔS\n\n🧮 RESOLUÇÃO:\nS = S₀ + v₀.t + (a.t²)/2\nΔS = 0 + 0.(10) + (2.(10)²)/2\nΔS = 0 + 0 + 100 = 100 m\n\n✅ RESPOSTA: O carro percorre 100 metros."
        }
      ]
    }
  },
  {
    id: 'termodinamica-fisica',
    title: 'Termodinâmica',
    description: 'Estudo das relações entre calor, temperatura e energia',
    subject_id: 'fisica',
    grande_tema: 'Térmica',
    difficulty_level: 'hard',
    estimated_time: 35,
    content_data: {
      sections: [
        {
          title: "O que é Termodinâmica?",
          content: "A Termodinâmica estuda as relações entre calor, temperatura, energia e trabalho em sistemas físicos.\n\n🌡️ CONCEITOS BÁSICOS:\n• TEMPERATURA: medida da agitação molecular\n• CALOR: energia em trânsito devido à diferença de temperatura\n• ENERGIA INTERNA: energia total das moléculas do sistema\n• TRABALHO TERMODINÂMICO: energia transferida por processos mecânicos\n\n⚖️ LEIS DA TERMODINÂMICA:\n• LEI ZERO: equilíbrio térmico\n• PRIMEIRA LEI: conservação de energia (ΔU = Q - W)\n• SEGUNDA LEI: entropia sempre aumenta\n• TERCEIRA LEI: entropia mínima no zero absoluto"
        },
        {
          title: "Foco no ENEM",
          content: "No ENEM, a Termodinâmica aparece em contextos práticos:\n\n🏭 APLICAÇÕES TECNOLÓGICAS:\n• Motores térmicos e refrigeradores\n• Processos industriais\n• Aquecimento global e efeito estufa\n• Eficiência energética\n\n🔬 TÓPICOS IMPORTANTES:\n• Dilatação térmica dos materiais\n• Calorimetria e mudanças de estado\n• Gases ideais e transformações\n• Máquinas térmicas e rendimento\n\n💡 Relacione sempre com questões ambientais e tecnológicas!"
        },
        {
          title: "Exemplo Prático",
          content: "Aplicação em máquinas térmicas:\n\n'Uma máquina térmica recebe 1000 J de uma fonte quente e rejeita 600 J para uma fonte fria. Qual seu rendimento?'\n\n🔧 ANÁLISE:\n• Calor absorvido: Q₁ = 1000 J\n• Calor rejeitado: Q₂ = 600 J\n• Trabalho realizado: W = Q₁ - Q₂\n\n📊 CÁLCULO:\nW = 1000 - 600 = 400 J\nRendimento = W/Q₁ = 400/1000 = 0,4 = 40%\n\n🌍 SIGNIFICADO: Apenas 40% da energia é convertida em trabalho útil, o resto é perdido como calor."
        }
      ]
    }
  },

  // História
  {
    id: 'brasil-colonial-historia',
    title: 'Brasil Colonial',
    description: 'Período da colonização portuguesa (1500-1822)',
    subject_id: 'historia',
    grande_tema: 'História do Brasil',
    difficulty_level: 'easy',
    estimated_time: 30,
    content_data: {
      sections: [
        {
          title: "O que foi o Brasil Colonial?",
          content: "O período colonial brasileiro (1500-1822) marca os 322 anos em que o Brasil esteve sob domínio português.\n\n🚢 FASES DA COLONIZAÇÃO:\n• PRÉ-COLONIAL (1500-1530): exploração do pau-brasil\n• COLONIAL PROPRIAMENTE DITA (1530-1815): colonização efetiva\n• REINO UNIDO (1815-1822): Brasil elevado à categoria de Reino\n\n🏛️ ESTRUTURAS COLONIAIS:\n• CAPITANIAS HEREDITÁRIAS: divisão administrativa inicial\n• GOVERNO-GERAL: centralização administrativa\n• CÂMARAS MUNICIPAIS: administração local\n• PACTO COLONIAL: exclusivo metropolitano"
        },
        {
          title: "Foco no ENEM",
          content: "O Brasil Colonial no ENEM enfatiza:\n\n🎯 TEMAS PRINCIPAIS:\n• Escravidão africana e resistência\n• Economia açucareira e mineração\n• Miscigenação e formação étnica\n• Movimentos nativistas e separatistas\n• Influência da Igreja Católica\n\n📊 ASPECTOS SOCIAIS:\n• Sociedade estamental e hierarquizada\n• Papel da mulher colonial\n• Quilombos e resistência negra\n• Bandeirismo e expansão territorial\n\n💡 Conecte sempre com a formação da sociedade brasileira atual!"
        },
        {
          title: "Exemplo Prático",
          content: "Análise da sociedade colonial:\n\n'A sociedade colonial brasileira era estratificada e hierarquizada:'\n\n👑 TOPO DA PIRÂMIDE:\n• Grandes proprietários rurais\n• Alto clero e autoridades coloniais\n• Grandes comerciantes\n\n🏘️ CAMADAS MÉDIAS:\n• Pequenos proprietários\n• Artesãos e profissionais liberais\n• Clero baixo\n\n⛓️ BASE DA PIRÂMIDE:\n• Escravos africanos (maioria da população)\n• Indígenas aldeados\n• Pobres livres\n\n🎯 LEGADO: Esta estrutura influenciou profundamente as desigualdades sociais no Brasil."
        }
      ]
    }
  },
  {
    id: 'revolucao-industrial-historia',
    title: 'Revolução Industrial',
    description: 'Transformações econômicas e sociais nos séculos XVIII-XIX',
    subject_id: 'historia',
    grande_tema: 'História Moderna',
    difficulty_level: 'medium',
    estimated_time: 35,
    content_data: {
      sections: [
        {
          title: "O que foi a Revolução Industrial?",
          content: "A Revolução Industrial foi um conjunto de transformações técnicas, econômicas e sociais que alterou profundamente a sociedade ocidental a partir do século XVIII.\n\n⚙️ FASES PRINCIPAIS:\n• PRIMEIRA REVOLUÇÃO (1760-1840): máquina a vapor, têxtil, carvão\n• SEGUNDA REVOLUÇÃO (1840-1914): eletricidade, petróleo, química\n• TERCEIRA REVOLUÇÃO (1950-): informática, automação\n\n🏭 CARACTERÍSTICAS:\n• Mecanização da produção\n• Urbanização acelerada\n• Divisão do trabalho\n• Capitalismo industrial\n• Novas classes sociais: burguesia industrial e proletariado"
        },
        {
          title: "Foco no ENEM",
          content: "A Revolução Industrial no ENEM aborda:\n\n🌍 IMPACTOS GLOBAIS:\n• Imperialismo e colonialismo do século XIX\n• Transformações no mundo do trabalho\n• Movimentos operários e sindicalismo\n• Questões ambientais e poluição\n\n📈 CONSEQUÊNCIAS SOCIAIS:\n• Êxodo rural e crescimento urbano\n• Condições de trabalho e vida operária\n• Movimentos sociais e ideologias\n• Transformações na família e educação\n\n💡 Relacione com problemas atuais: desemprego, automação, meio ambiente!"
        },
        {
          title: "Exemplo Prático",
          content: "Análise das transformações sociais:\n\n'A industrialização criou uma nova dinâmica social:'\n\n🏭 ANTES (Sociedade Agrária):\n• Produção artesanal e doméstica\n• Ritmo natural (estações, luz solar)\n• Família como unidade produtiva\n• Poucos centros urbanos\n\n⚙️ DEPOIS (Sociedade Industrial):\n• Produção mecanizada em fábricas\n• Disciplina de horários rígidos\n• Separação trabalho-família\n• Explosão demográfica urbana\n\n🎯 LEGADO: Essas transformações criaram o mundo moderno e seus desafios atuais."
        }
      ]
    }
  }
];

// Estrutura unificada para exportação
export const conteudoLocal = {
  areasConhecimento,
  materias,
  topicos
};

export default conteudoLocal;
