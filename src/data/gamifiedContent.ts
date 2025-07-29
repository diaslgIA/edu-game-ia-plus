
export const gamifiedContentUpdates = [
  {
    id: "gramatica-basica",
    subject: "portugues",
    title: "Gramática Básica - Classes de Palavras",
    description: "Aprenda as 10 classes gramaticais de forma interativa e divertida",
    content_type: "gamified_module",
    difficulty_level: "easy",
    estimated_time: 18,
    order_index: 1,
    content_data: {
      sections: [
        {
          title: "O que são Classes de Palavras?",
          content: "No português, organizamos as palavras em 10 classes gramaticais baseadas em suas funções na frase e características morfológicas.\n\nCada classe tem uma função específica:\n• SUBSTANTIVO: nomeia seres, objetos, lugares\n• ADJETIVO: caracteriza, qualifica substantivos\n• VERBO: expressa ação, estado ou fenômeno\n• ADVÉRBIO: modifica verbo, adjetivo ou outro advérbio\n• PRONOME: substitui ou acompanha substantivos\n• ARTIGO: determina substantivos\n• NUMERAL: indica quantidade ou ordem\n• PREPOSIÇÃO: liga palavras estabelecendo relações\n• CONJUNÇÃO: conecta orações ou termos similares\n• INTERJEIÇÃO: expressa sentimentos ou emoções"
        },
        {
          title: "Classes Variáveis vs. Invariáveis",
          content: "As classes se dividem em dois grupos:\n\n📌 VARIÁVEIS (flexionam em gênero, número, etc.):\n• Substantivo, Adjetivo, Verbo, Pronome, Artigo, Numeral\n\n📌 INVARIÁVEIS (não flexionam):\n• Advérbio, Preposição, Conjunção, Interjeição\n\nEssa classificação é fundamental para entender a concordância e regência na língua portuguesa."
        },
        {
          title: "Identificação na Prática",
          content: "Para identificar a classe de uma palavra:\n\n1️⃣ Analise sua FUNÇÃO na frase\n2️⃣ Observe suas características morfológicas\n3️⃣ Veja se pode ser substituída por outra da mesma classe\n\nExemplo: 'O aluno estudioso leu rapidamente.'\n• O = artigo (determina)\n• aluno = substantivo (nomeia)\n• estudioso = adjetivo (caracteriza)\n• leu = verbo (ação)\n• rapidamente = advérbio (modo)"
        }
      ]
    },
    interactive_activities: {
      flashcards: [
        {
          id: "fc1",
          front: "Substantivo",
          back: "Palavra que nomeia seres, objetos, lugares, sentimentos. Ex: casa, amor, João"
        },
        {
          id: "fc2", 
          front: "Adjetivo",
          back: "Palavra que caracteriza ou qualifica substantivos. Ex: bonito, inteligente, azul"
        },
        {
          id: "fc3",
          front: "Verbo", 
          back: "Palavra que expressa ação, estado ou fenômeno. Ex: correr, ser, chover"
        },
        {
          id: "fc4",
          front: "Advérbio",
          back: "Palavra que modifica verbo, adjetivo ou outro advérbio. Ex: rapidamente, muito, aqui"
        },
        {
          id: "fc5",
          front: "Pronome",
          back: "Palavra que substitui ou acompanha substantivos. Ex: ele, meu, aquele"
        },
        {
          id: "fc6",
          front: "Artigo",
          back: "Palavra que determina substantivos (definido/indefinido). Ex: o, a, um, uma"
        },
        {
          id: "fc7",
          front: "Preposição",
          back: "Palavra que liga termos estabelecendo relações. Ex: de, para, com, em"
        },
        {
          id: "fc8",
          front: "Conjunção", 
          back: "Palavra que conecta orações ou termos. Ex: e, mas, porque, quando"
        }
      ],
      drag_drop: {
        title: "Classifique as palavras nas categorias corretas",
        items: [
          { id: "i1", text: "casa", correctCategory: "substantivos" },
          { id: "i2", text: "bonita", correctCategory: "adjetivos" },
          { id: "i3", text: "correu", correctCategory: "verbos" },
          { id: "i4", text: "rapidamente", correctCategory: "advérbios" },
          { id: "i5", text: "ele", correctCategory: "pronomes" },
          { id: "i6", text: "o", correctCategory: "artigos" },
          { id: "i7", text: "de", correctCategory: "preposições" },
          { id: "i8", text: "e", correctCategory: "conjunções" },
          { id: "i9", text: "livro", correctCategory: "substantivos" },
          { id: "i10", text: "estudou", correctCategory: "verbos" }
        ],
        categories: [
          { id: "substantivos", name: "Substantivos", color: "border-blue-400" },
          { id: "adjetivos", name: "Adjetivos", color: "border-green-400" },
          { id: "verbos", name: "Verbos", color: "border-red-400" },
          { id: "advérbios", name: "Advérbios", color: "border-purple-400" },
          { id: "pronomes", name: "Pronomes", color: "border-yellow-400" },
          { id: "artigos", name: "Artigos", color: "border-pink-400" },
          { id: "preposições", name: "Preposições", color: "border-indigo-400" },
          { id: "conjunções", name: "Conjunções", color: "border-orange-400" }
        ]
      },
      fill_blanks: {
        title: "Complete as frases identificando as classes gramaticais",
        questions: [
          {
            id: "fb1",
            text: "O ____ estudioso leu o livro ____.",
            blanks: [
              { position: 0, answer: "aluno", alternatives: ["menino", "garoto", "estudante"] },
              { position: 1, answer: "rapidamente", alternatives: ["devagar", "atentamente"] }
            ]
          },
          {
            id: "fb2", 
            text: "____ casa ____ é muito bonita.",
            blanks: [
              { position: 0, answer: "A", alternatives: ["Esta", "Essa"] },
              { position: 1, answer: "dele", alternatives: ["sua", "nossa"] }
            ]
          },
          {
            id: "fb3",
            text: "João ____ Maria foram ____ escola.",
            blanks: [
              { position: 0, answer: "e", alternatives: ["com", "ou"] },
              { position: 1, answer: "para", alternatives: ["até", "à"] }
            ]
          }
        ]
      }
    },
    challenge_question: {
      question: "Analise a frase: 'Aqueles meninos inteligentes estudaram muito ontem.' Identifique CORRETAMENTE a sequência de classes gramaticais:",
      type: "complex_quiz",
      options: [
        "pronome → substantivo → adjetivo → verbo → advérbio → advérbio",
        "artigo → substantivo → adjetivo → verbo → muito → advérbio",
        "demonstrativo → nome → qualificador → ação → intensidade → tempo",
        "pronome → substantivo → verbo → adjetivo → advérbio → advérbio"
      ],
      correct_answer: 0,
      points: 25,
      badge: {
        badge_id: "gramatica_expert",
        name: "Expert em Gramática",
        description: "Dominou a identificação de classes gramaticais",
        icon: "📚"
      }
    },
    examples: "• 'O gato subiu no telhado' → artigo + substantivo + verbo + preposição + artigo + substantivo\n• 'Ela canta lindamente' → pronome + verbo + advérbio\n• 'Aquele livro interessante' → pronome demonstrativo + substantivo + adjetivo\n• 'João e Maria estudam juntos' → substantivo + conjunção + substantivo + verbo + advérbio",
    study_tips: "🎯 DICA 1: Decore as perguntas-chave:\n• Substantivo: O que é? Quem é?\n• Adjetivo: Como é?\n• Verbo: O que faz? Como está?\n• Advérbio: Como? Quando? Onde?\n\n🎯 DICA 2: Use a técnica da substituição - se puder trocar por outra palavra da mesma classe, você acertou!\n\n🎯 DICA 3: Pratique com frases do dia a dia - analise mentalmente as classes das palavras que você usa.",
    infographic_url: "/lovable-uploads/gramatica-infografico.png"
  },
  {
    id: "morfologia-avancada",
    subject: "portugues", 
    title: "Morfologia - Formação das Palavras",
    description: "Descubra como as palavras são formadas: derivação, composição e muito mais",
    content_type: "gamified_module",
    difficulty_level: "medium",
    estimated_time: 20,
    order_index: 2,
    content_data: {
      sections: [
        {
          title: "Processos de Formação",
          content: "As palavras na língua portuguesa se formam através de diferentes processos:\n\n🔹 DERIVAÇÃO: acrescentar afixos (prefixos/sufixos)\n• Prefixal: des + fazer = desfazer\n• Sufixal: livr + aria = livraria\n• Parassintética: a + not + ecer = anoitecer\n\n🔹 COMPOSIÇÃO: juntar duas ou mais palavras\n• Justaposição: guarda + chuva = guarda-chuva\n• Aglutinação: plano + alto = planalto\n\n🔹 OUTROS: onomatopeia, sigla, redução"
        },
        {
          title: "Elementos Mórficos",
          content: "Toda palavra possui elementos básicos:\n\n📌 RADICAL: parte principal, não varia\n📌 TEMA: radical + vogal temática\n📌 DESINÊNCIA: marca gênero, número, pessoa\n📌 AFIXOS: prefixos e sufixos\n\nExemplo: 'garotas'\n• garot = radical\n• a = desinência de gênero\n• s = desinência de número"
        },
        {
          title: "Famílias de Palavras",
          content: "Palavras com o mesmo radical formam famílias:\n\n🌳 TERRA: terreno, aterrar, território, subterrâneo\n🌳 AMOR: amoroso, enamorar, desamor, apaixonar\n🌳 ESCOLA: escolar, escolaridade, escolarizar\n\nReconhecer essas famílias ajuda na compreensão e ortografia!"
        }
      ]
    },
    interactive_activities: {
      flashcards: [
        {
          id: "mf1",
          front: "Derivação Prefixal",
          back: "Acréscimo de prefixo antes do radical. Ex: in + feliz = infeliz"
        },
        {
          id: "mf2",
          front: "Derivação Sufixal", 
          back: "Acréscimo de sufixo após o radical. Ex: pedr + eiro = pedreiro"
        },
        {
          id: "mf3",
          front: "Composição por Justaposição",
          back: "União de palavras mantendo a grafia. Ex: beija + flor = beija-flor"
        },
        {
          id: "mf4",
          front: "Composição por Aglutinação", 
          back: "União com alteração na grafia. Ex: perna + alto = pernalta"
        }
      ],
      drag_drop: {
        title: "Classifique os processos de formação",
        items: [
          { id: "p1", text: "desfazer", correctCategory: "prefixal" },
          { id: "p2", text: "livraria", correctCategory: "sufixal" },
          { id: "p3", text: "guarda-chuva", correctCategory: "justaposição" },
          { id: "p4", text: "planalto", correctCategory: "aglutinação" },
          { id: "p5", text: "infeliz", correctCategory: "prefixal" },
          { id: "p6", text: "passatempo", correctCategory: "justaposição" }
        ],
        categories: [
          { id: "prefixal", name: "Derivação Prefixal", color: "border-blue-400" },
          { id: "sufixal", name: "Derivação Sufixal", color: "border-green-400" },
          { id: "justaposição", name: "Justaposição", color: "border-red-400" },
          { id: "aglutinação", name: "Aglutinação", color: "border-purple-400" }
        ]
      },
      fill_blanks: {
        title: "Complete identificando os elementos mórficos",
        questions: [
          {
            id: "fm1",
            text: "A palavra 'desfazer' tem o prefixo ____ e o radical ____.",
            blanks: [
              { position: 0, answer: "des", alternatives: ["de"] },
              { position: 1, answer: "faz", alternatives: ["fazer"] }
            ]
          }
        ]
      }
    },
    challenge_question: {
      question: "Na palavra 'infelizmente', identifique todos os elementos mórficos presentes:",
      type: "complex_quiz", 
      options: [
        "prefixo 'in' + radical 'feliz' + sufixo 'mente'",
        "radical 'infeliz' + sufixo 'mente'",
        "prefixo 'in' + tema 'feliz' + desinência 'mente'",
        "somente radical 'infelizmente'"
      ],
      correct_answer: 0,
      points: 30,
      badge: {
        badge_id: "morfologia_master",
        name: "Mestre da Morfologia",
        description: "Especialista em formação de palavras",
        icon: "🔬"
      }
    },
    examples: "• Derivação: útil → inútil → inutilmente\n• Composição: porta + voz = porta-voz\n• Família: mar → marinho → submarino → marítimo",
    study_tips: "🎯 Memorize os principais prefixos e sufixos\n🎯 Pratique decompondo palavras complexas\n🎯 Observe as mudanças de classe gramatical na derivação",
    infographic_url: "/lovable-uploads/morfologia-infografico.png"
  }
];

export const updateSubjectContent = async () => {
  // Esta função será chamada para atualizar o banco de dados
  console.log("Dados gamificados preparados para inserção:", gamifiedContentUpdates);
  return gamifiedContentUpdates;
};
