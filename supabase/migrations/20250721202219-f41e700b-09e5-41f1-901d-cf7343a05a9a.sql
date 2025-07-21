
-- Criar uma estrutura mais robusta para conteúdos educacionais
-- Primeiro, vamos adicionar mais campos à tabela subject_contents para suportar conteúdos mais ricos

ALTER TABLE subject_contents 
ADD COLUMN IF NOT EXISTS topic_name TEXT,
ADD COLUMN IF NOT EXISTS detailed_explanation TEXT,
ADD COLUMN IF NOT EXISTS examples TEXT,
ADD COLUMN IF NOT EXISTS key_concepts JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS practical_applications TEXT,
ADD COLUMN IF NOT EXISTS study_tips TEXT;

-- Inserir conteúdos completos para todas as matérias
-- MATEMÁTICA
INSERT INTO subject_contents (subject, title, description, grande_tema, topic_name, explanation, detailed_explanation, examples, key_concepts, practical_applications, study_tips, difficulty_level, estimated_time) VALUES

-- Matemática Básica e Aritmética
('Matemática', 'Operações com números reais', 'Fundamentos das operações matemáticas básicas', 'Matemática Básica e Aritmética', 'Operações com números reais',
'Os números reais (ℝ) englobam todos os números que você conhece: positivos, negativos, inteiros, frações (decimais) e até os irracionais (como π e √2).',
'Os números reais formam o conjunto mais amplo de números usado no dia a dia. Incluem números naturais (1, 2, 3...), inteiros (...-2, -1, 0, 1, 2...), racionais (frações como 1/2, 0.5) e irracionais (π, √2, e). As quatro operações básicas são: adição (+), subtração (-), multiplicação (×) e divisão (÷). A ordem das operações segue a regra PEMDAS: Parênteses, Expoentes, Multiplicação/Divisão (da esquerda para direita), Adição/Subtração (da esquerda para direita). As regras de sinais são fundamentais: (+) × (+) = (+), (-) × (-) = (+), (+) × (-) = (-), (-) × (+) = (-).',
'Exemplo 1: 2 + 3 × 4 = 2 + 12 = 14 (multiplicação primeiro). Exemplo 2: (5 - 2) × 3 = 3 × 3 = 9 (parênteses primeiro). Exemplo 3: -3 × -4 = +12 (sinais iguais, resultado positivo).',
'["Números reais", "Ordem das operações", "PEMDAS", "Regras de sinais", "Operações básicas"]',
'Cálculos de troco, orçamentos familiares, conversões de medidas, receitas culinárias.',
'Memorize a ordem PEMDAS. Pratique com números pequenos primeiro. Use calculadora para verificar resultados.',
'easy', 20),

('Matemática', 'Razão e Proporção', 'Relações entre grandezas e suas aplicações', 'Matemática Básica e Aritmética', 'Razão e Proporção',
'Razão é a divisão entre duas grandezas (a/b). Proporção é a igualdade entre duas razões (a/b = c/d).',
'A razão expressa a relação entre duas grandezas da mesma espécie. Por exemplo, se uma turma tem 15 meninos e 10 meninas, a razão meninos/meninas é 15/10 = 3/2, ou seja, para cada 3 meninos há 2 meninas. Proporção é quando duas razões são iguais. A propriedade fundamental das proporções é: a/b = c/d ⟺ a×d = b×c (multiplicação cruzada). Isso é muito útil para resolver problemas onde conhecemos três valores e queremos descobrir o quarto.',
'Exemplo 1: Se 2 kg de arroz custam R$ 8, quanto custam 5 kg? Razão: 2kg/R$8 = 5kg/x. Logo 2x = 8×5, x = 40/2 = R$ 20. Exemplo 2: Em um mapa, 1 cm representa 100 km. Qual a distância real se no mapa são 3,5 cm? 1cm/100km = 3,5cm/x, logo x = 350 km.',
'["Razão", "Proporção", "Multiplicação cruzada", "Grandezas proporcionais", "Escalas"]',
'Mapas e plantas baixas, receitas culinárias, misturas e diluições, velocidade média.',
'Identifique sempre as grandezas envolvidas. Monte a proporção organizando valores conhecidos e desconhecidos. Use multiplicação cruzada.',
'easy', 25),

-- PORTUGUÊS E LITERATURA
('Português e Literatura', 'Interpretação de textos verbais e não-verbais', 'Compreensão e análise de diferentes tipos de texto', 'Interpretação e Análise Textual', 'Leitura e interpretação de textos',
'É a habilidade de extrair informações e sentidos de diferentes formas de comunicação, incluindo textos escritos e imagens.',
'A interpretação textual é uma competência fundamental que envolve compreender não apenas o que está explicitamente dito, mas também o que está implícito. Textos verbais usam palavras, enquanto textos não-verbais usam imagens, símbolos, cores, gestos. Textos mistos combinam ambos (charges, infográficos, anúncios). Para interpretar bem: 1) Identifique o tema central, 2) Reconheça a opinião do autor, 3) Perceba ironias e ambiguidades, 4) Relacione com o contexto, 5) Identifique o público-alvo e a intenção comunicativa.',
'Exemplo 1: Uma charge mostrando um político subindo uma escada em direção a um cofre gigante. A imagem critica a corrupção sem usar palavras. Exemplo 2: "Que bela surpresa!" pode ser irônico dependendo do contexto. Exemplo 3: Um anúncio de perfume com uma mulher elegante vende não só o produto, mas um estilo de vida.',
'["Tema central", "Implícito e explícito", "Ironia", "Contexto", "Intenção comunicativa", "Público-alvo"]',
'Leitura de jornais, redes sociais, interpretação de filmes, análise de propagandas, compreensão de textos acadêmicos.',
'Leia sempre duas vezes: primeiro para entender o geral, depois para detalhes. Questione-se: "Por que o autor escreveu isso?" e "Para quem?"',
'medium', 30),

-- FÍSICA
('Física', 'Cinemática - Movimento Uniforme', 'Estudo do movimento sem considerar suas causas', 'Mecânica', 'Cinemática',
'A cinemática descreve o movimento dos corpos, focando em posição, velocidade e aceleração, sem considerar as forças.',
'A cinemática é o ramo da mecânica que estuda o movimento. Movimento Uniforme (MU) é quando a velocidade é constante. A equação é: S = S₀ + vt, onde S é posição final, S₀ é posição inicial, v é velocidade e t é tempo. Movimento Uniformemente Variado (MUV) tem aceleração constante. Equações: v = v₀ + at e S = S₀ + v₀t + ½at². Em gráficos: no MU, o gráfico v×t é uma linha horizontal; no MUV é uma linha inclinada. A área sob o gráfico v×t representa o deslocamento.',
'Exemplo 1: Um carro viaja a 60 km/h por 2 horas. Distância = 60 × 2 = 120 km. Exemplo 2: Uma pedra cai do repouso (v₀=0) por 3s. Com g=10m/s²: h = ½gt² = ½×10×9 = 45m. Exemplo 3: Um carro acelera de 0 a 30 m/s em 10s. Aceleração = (30-0)/10 = 3 m/s².',
'["Movimento uniforme", "Aceleração", "Velocidade", "Gráficos de movimento", "Equações horárias"]',
'Cálculo de tempo de viagem, análise de acidentes de trânsito, esportes (corrida, arremessos), elevadores.',
'Identifique sempre o tipo de movimento. Organize os dados conhecidos. Use as equações adequadas. Interprete gráficos com atenção.',
'medium', 35),

-- QUÍMICA
('Química', 'Estrutura Atômica e Tabela Periódica', 'Fundamentos da estrutura da matéria', 'Química Geral e Físico-Química', 'Estrutura atômica',
'Compreender como os átomos são formados e organizados na tabela periódica é fundamental para entender as propriedades da matéria.',
'O átomo é formado por prótons (carga +, no núcleo), nêutrons (sem carga, no núcleo) e elétrons (carga -, na eletrosfera). O número atômico (Z) é o número de prótons e identifica o elemento. A massa atômica é prótons + nêutrons. A distribuição eletrônica segue a ordem: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰... A tabela periódica organiza elementos por ordem crescente de Z. Propriedades periódicas: raio atômico diminui da esquerda para direita e de baixo para cima; eletronegatividade aumenta da esquerda para direita e de baixo para cima.',
'Exemplo 1: Carbono (C) tem Z=6, então 6 prótons. Distribuição: 1s² 2s² 2p². Exemplo 2: Sódio (Na) tem menor eletronegatividade que cloro (Cl), por isso Na doa elétron para Cl formando NaCl. Exemplo 3: Gases nobres (última coluna) são estáveis pois têm 8 elétrons na última camada.',
'["Prótons", "Elétrons", "Distribuição eletrônica", "Número atômico", "Propriedades periódicas", "Eletronegatividade"]',
'Formação de íons, ligações químicas, propriedades dos materiais, medicina nuclear.',
'Memorize a ordem de preenchimento dos orbitais. Use a tabela periódica como guia para propriedades.',
'medium', 40),

-- BIOLOGIA
('Biologia', 'Cadeia Alimentar e Fluxo de Energia', 'Relações tróficas nos ecossistemas', 'Ecologia e Meio Ambiente', 'Cadeias alimentares',
'As cadeias alimentares mostram como a energia flui através dos diferentes níveis tróficos em um ecossistema.',
'Uma cadeia alimentar é a sequência de transferência de energia entre os seres vivos. Inicia com produtores (plantas que fazem fotossíntese), passa pelos consumidores primários (herbívoros), secundários (carnívoros que comem herbívoros), terciários (carnívoros que comem outros carnívoros) e termina com decompositores (bactérias e fungos). A energia diminui a cada nível (apenas 10% passa para o próximo nível - regra dos 10%). Bioacumulação é o acúmulo de substâncias tóxicas ao longo da cadeia, sendo maior nos predadores do topo.',
'Exemplo 1: Capim → Boi → Humano (cadeia simples). Exemplo 2: Fitoplâncton → Zooplâncton → Peixe pequeno → Peixe grande → Tubarão. Exemplo 3: Pesticidas usados em plantas se concentram mais em aves de rapina (bioacumulação).',
'["Produtores", "Consumidores", "Níveis tróficos", "Fluxo de energia", "Bioacumulação", "Decompositores"]',
'Agricultura sustentável, controle de pragas, conservação de espécies, poluição ambiental.',
'Sempre identifique quem produz energia (plantas) e siga o fluxo. Lembre-se: energia diminui, toxinas aumentam.',
'medium', 30),

-- HISTÓRIA
('História', 'Brasil Colonial - Sistema Colonial', 'Organização política e econômica do Brasil colônia', 'História do Brasil', 'Brasil Colônia',
'O período colonial brasileiro (1500-1822) foi marcado pelo sistema de exploração portuguesa baseado no Pacto Colonial.',
'O sistema colonial português no Brasil baseava-se na exploração da colônia para enriquecer a metrópole. Características principais: 1) Pacto Colonial - colônia só podia comercializar com a metrópole; 2) Plantation - sistema de grandes propriedades monocultoras usando mão de obra escrava; 3) Sociedade patriarcal e escravista com senhores de engenho no topo; 4) Três pilares econômicos: pau-brasil (séc. XVI), açúcar (séc. XVI-XVII) e ouro (séc. XVIII). A mineração deslocou o eixo econômico do Nordeste para o Sudeste e levou à interiorização da ocupação.',
'Exemplo 1: Engenhos de açúcar eram autossuficientes, com casa-grande, senzala, capela e moenda. Exemplo 2: Bandeirantes paulistas buscaram ouro e apresaram índios. Exemplo 3: Vila Rica (Ouro Preto) tornou-se rica com a mineração.',
'["Pacto Colonial", "Plantation", "Sociedade estamental", "Ciclos econômicos", "Escravidão", "Bandeirantes"]',
'Compreensão das desigualdades sociais atuais, formação territorial brasileira, diversidade cultural.',
'Conecte os ciclos econômicos com a ocupação territorial. Entenda como a economia moldou a sociedade.',
'medium', 35),

-- GEOGRAFIA
('Geografia', 'Urbanização Brasileira', 'Processo de crescimento das cidades no Brasil', 'Geografia do Brasil', 'Urbanização brasileira',
'A urbanização brasileira foi um processo acelerado que transformou o país de rural em urbano em poucas décadas.',
'A urbanização brasileira intensificou-se após 1950, quando o país era majoritariamente rural. Hoje, mais de 80% da população vive em cidades. Causas: industrialização, êxodo rural, modernização agrícola expulsou trabalhadores do campo. Características: crescimento desordenado, formação de metrópoles, conurbação (cidades que se juntam), segregação socioespacial (favelas vs. bairros nobres). Problemas urbanos: déficit habitacional, poluição, trânsito, violência, falta de saneamento. Rede urbana: hierarquia entre cidades (metrópoles globais, nacionais, regionais, cidades médias, pequenas).',
'Exemplo 1: São Paulo: de vila a maior metrópole do país em 150 anos. Exemplo 2: Grande ABC paulista: conurbação industrial. Exemplo 3: Brasília: cidade planejada vs. ocupação espontânea do entorno.',
'["Êxodo rural", "Metrópoles", "Conurbação", "Segregação socioespacial", "Rede urbana", "Planejamento urbano"]',
'Políticas habitacionais, transporte público, gestão de resíduos, planejamento territorial.',
'Relacione industrialização com urbanização. Analise mapas e gráficos. Compare diferentes regiões.',
'medium', 30);

-- Continuar inserindo para todas as outras matérias...
-- FILOSOFIA
INSERT INTO subject_contents (subject, title, description, grande_tema, topic_name, explanation, detailed_explanation, examples, key_concepts, practical_applications, study_tips, difficulty_level, estimated_time) VALUES

('Filosofia', 'Sócrates e o Conhecimento de Si', 'O método socrático e a busca pela sabedoria', 'Filosofia Antiga e Medieval', 'Sócrates',
'Sócrates revolucionou a filosofia ao focar no conhecimento humano e na ética, criando o método dialético.',
'Sócrates (470-399 a.C.) é considerado o fundador da filosofia moral. Sua frase "Só sei que nada sei" expressa a humildade intelectual e o início da sabedoria. O método socrático usa perguntas para levar o interlocutor a descobrir contradições em suas crenças e chegar ao conhecimento. A maiêutica (arte de parir ideias) compara o filósofo a uma parteira que ajuda a dar à luz o conhecimento que já existe na alma. Sócrates acreditava que "ninguém faz o mal voluntariamente" - o mal é fruto da ignorância. O "cuidado de si" envolve o autoconhecimento e o aperfeiçoamento moral.',
'Exemplo 1: Ao perguntar "O que é coragem?", Sócrates mostra que respostas superficiais são insuficientes. Exemplo 2: No diálogo com Eutífron sobre piedade, expõe contradições nas definições tradicionais. Exemplo 3: Prefere morrer a abandonar seus princípios, mostrando coerência entre vida e filosofia.',
'["Conhece-te a ti mesmo", "Maiêutica", "Método dialético", "Ignorância sábia", "Ética do conhecimento"]',
'Educação crítica, psicoterapia, coaching, desenvolvimento pessoal, metodologias ativas de ensino.',
'Pratique questionar suas próprias crenças. Use perguntas para explorar conceitos. Busque definições precisas.',
'medium', 35),

-- SOCIOLOGIA
('Sociologia', 'Fato Social de Durkheim', 'Os fenômenos sociais como objeto de estudo científico', 'Conceitos Fundamentais e Clássicos', 'Fato Social',
'Durkheim estabeleceu a sociologia como ciência ao definir o fato social como objeto de estudo específico.',
'Émile Durkheim (1858-1917) definiu fato social como maneiras de agir, pensar e sentir que são exteriores ao indivíduo, gerais na sociedade e coercitivas. EXTERIORIDADE: existem antes e independente do indivíduo (a língua, as leis). GENERALIDADE: são compartilhados por grande parte do grupo social. COERCITIVIDADE: exercem pressão sobre o indivíduo, que sente obrigação de seguir. Os fatos sociais devem ser tratados como "coisas", ou seja, estudados objetivamente. Tipos: materiais (arquitetura, tecnologia) e imateriais (normas, valores, crenças).',
'Exemplo 1: A moda é um fato social - exterior (criada pela sociedade), geral (seguida por muitos) e coercitiva (pressão para seguir). Exemplo 2: A linguagem existe antes do indivíduo nascer e continua após sua morte. Exemplo 3: Leis de trânsito coagem comportamentos independente da vontade individual.',
'["Exterioridade", "Generalidade", "Coercitividade", "Objetividade científica", "Solidariedade social"]',
'Análise de comportamentos coletivos, políticas públicas, estudos de mercado, educação.',
'Identifique os três elementos do fato social. Diferencie individual de social. Observe pressões sociais no cotidiano.',
'medium', 25),

-- INGLÊS
('Inglês', 'Reading Comprehension Strategies', 'Técnicas para compreensão de textos em inglês', 'Interpretação de Gêneros Textuais', 'Estratégias de leitura',
'Desenvolver estratégias eficazes de leitura é essencial para compreender textos em inglês sem traduzir palavra por palavra.',
'Estratégias principais: 1) SKIMMING - leitura rápida para captar ideia geral (títulos, primeiro e último parágrafos); 2) SCANNING - busca específica de informações (nomes, datas, números); 3) COGNATOS - palavras similares ao português (hospital, family, animal); 4) CONTEXTO - inferir significado de palavras desconhecidas pelo contexto; 5) ESTRUTURA TEXTUAL - reconhecer organização (introdução, desenvolvimento, conclusão). Evite tradução literal. Foque na mensagem principal. Use conhecimento prévio sobre o tema.',
'Exemplo 1: "The hospital is located downtown" - "hospital" e "located" são cognatos. Exemplo 2: Em "She felt blue after the news", "blue" significa triste (contexto emocional). Exemplo 3: Conectivos como "however", "therefore" indicam relações entre ideias.',
'["Skimming", "Scanning", "Cognatos", "Inferência contextual", "Conectivos", "Estrutura textual"]',
'Leitura de sites internacionais, manuais técnicos, artigos científicos, redes sociais globais.',
'Não traduza palavra por palavra. Identifique cognatos primeiro. Use o contexto para palavras desconhecidas.',
'medium', 30),

-- ESPANHOL
('Espanhol', 'Falsos Cognatos - Heterosemánticos', 'Palavras similares com significados diferentes', 'Léxico e Estruturas da Língua', 'Falsos cognatos',
'Os falsos cognatos são armadilhas comuns para brasileiros aprendendo espanhol, pois parecem com português mas têm significados diferentes.',
'Falsos cognatos (heterosemánticos) são palavras que têm grafia similar entre português e espanhol, mas significados diferentes. Principais exemplos: RATO (momento) vs. RATO (animal), BORRAR (apagar) vs. BORRAR (sujar), ESCOBA (vassoura) vs. ESCOVA (cepillo), SALADA (salgada) vs. SALADA (ensalada), EXQUISITO (delicioso) vs. ESQUISITO (raro). Estratégias: 1) Memorizar os principais falsos cognatos; 2) Sempre verificar o contexto; 3) Usar dicionário quando em dúvida; 4) Praticar com textos autênticos.',
'Exemplo 1: "La comida está muy salada" = A comida está muito salgada. Exemplo 2: "Voy a borrar la pizarra" = Vou apagar o quadro. Exemplo 3: "¡Qué rato más largo!" = Que momento mais longo!',
'["Heterosemánticos", "Contexto", "Falsos amigos", "Interferência linguística", "Léxico contrastivo"]',
'Tradução de documentos, comunicação internacional, turismo, negócios com países hispânicos.',
'Crie lista dos principais falsos cognatos. Sempre desconfie de palavras "fáceis demais". Pratique com textos reais.',
'easy', 20);
