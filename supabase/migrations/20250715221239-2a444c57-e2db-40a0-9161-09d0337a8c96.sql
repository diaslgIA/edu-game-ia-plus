
-- Atualizar conteúdos de Matemática com informações detalhadas
UPDATE subject_contents 
SET content_data = '{
  "introducao": "As funções quadráticas são fundamentais na matemática e aparecem frequentemente no ENEM. Representadas pela forma f(x) = ax² + bx + c, onde a ≠ 0, essas funções descrevem parábolas e modelam diversos fenômenos do cotidiano.",
  "pontos_chave": [
    "A função quadrática tem forma geral f(x) = ax² + bx + c, com a ≠ 0",
    "O gráfico é sempre uma parábola que abre para cima (a > 0) ou para baixo (a < 0)",
    "O vértice da parábola tem coordenadas V(-b/2a, -Δ/4a), onde Δ = b² - 4ac",
    "As raízes são encontradas pela fórmula de Bhaskara: x = (-b ± √Δ)/2a",
    "O discriminante Δ determina: Δ > 0 (duas raízes), Δ = 0 (uma raiz), Δ < 0 (sem raízes reais)"
  ],
  "explicacao_detalhada": "As funções quadráticas são essenciais para resolver problemas de otimização, como encontrar o lucro máximo de uma empresa ou a altura máxima de um projétil. O coeficiente ''a'' determina a concavidade da parábola e a ''abertura'' da curva. Quando a > 0, a parábola tem concavidade voltada para cima e possui um ponto de mínimo no vértice. Quando a < 0, a concavidade é voltada para baixo e o vértice é um ponto de máximo. O vértice da parábola é um ponto crucial, pois representa o valor extremo da função. Suas coordenadas podem ser calculadas pelas fórmulas xv = -b/2a e yv = -Δ/4a. No ENEM, as funções quadráticas aparecem frequentemente em problemas contextualizados, como cálculo de áreas, trajetórias de projéteis, problemas de receita e lucro máximo. É importante dominar tanto os aspectos algébricos (resolução de equações) quanto os geométricos (análise do gráfico) dessas funções.",
  "curiosidade": "A forma parabólica das funções quadráticas é encontrada em muitos lugares na natureza e na tecnologia: desde a trajetória de uma bola de basquete até o formato de antenas parabólicas e faróis de carros, que utilizam essa forma para concentrar ou direcionar ondas e luz de forma eficiente!"
}'
WHERE subject = 'matemática' AND title = 'Funções Quadráticas';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "A trigonometria no triângulo retângulo é a base para compreender as relações entre ângulos e lados em triângulos. As razões trigonométricas seno, cosseno e tangente são ferramentas fundamentais para resolver problemas geométricos e aparecem constantemente no ENEM.",
  "pontos_chave": [
    "Seno de um ângulo = cateto oposto / hipotenusa",
    "Cosseno de um ângulo = cateto adjacente / hipotenusa", 
    "Tangente de um ângulo = cateto oposto / cateto adjacente",
    "Relação fundamental: sen²θ + cos²θ = 1",
    "Ângulos notáveis: 30°, 45° e 60° têm valores trigonométricos específicos"
  ],
  "explicacao_detalhada": "A trigonometria surgiu da necessidade de calcular distâncias inacessíveis e ângulos em diferentes contextos práticos. No triângulo retângulo, as razões trigonométricas relacionam as medidas dos lados com os ângulos agudos. O seno representa a ''altura relativa'' do ângulo, o cosseno a ''base relativa'' e a tangente a inclinação. É fundamental memorizar os valores dos ângulos notáveis: sen 30° = 1/2, cos 30° = √3/2, sen 45° = √2/2, cos 45° = √2/2, sen 60° = √3/2, cos 60° = 1/2. No ENEM, a trigonometria aparece em problemas envolvendo rampas de acessibilidade, cálculo de alturas de prédios usando sombras, análise de telhados e estruturas arquitetônicas. Também é aplicada em situações que envolvem navegação, GPS e até mesmo em ondas sonoras e luminosas. A compreensão dessas relações é essencial para resolver problemas geométricos complexos.",
  "curiosidade": "Os antigos egípcios já utilizavam conceitos trigonométricos há mais de 4000 anos para construir as pirâmides! Eles descobriram que para criar um ângulo de inclinação perfeito, precisavam usar uma relação específica entre a altura e a base, o que hoje conhecemos como tangente."
}'
WHERE subject = 'matemática' AND title = 'Trigonometria no Triângulo Retângulo';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "A análise combinatória estuda as diferentes maneiras de organizar, escolher e arranjar elementos de um conjunto. É fundamental para resolver problemas de contagem e serve de base para o estudo de probabilidade, aparecendo frequentemente em questões do ENEM.",
  "pontos_chave": [
    "Permutação: arranjo de n elementos em ordem específica, calculada por Pn = n!",
    "Arranjo: escolha e ordenação de k elementos de n disponíveis, Ak,n = n!/(n-k)!",
    "Combinação: escolha de k elementos de n disponíveis sem importar a ordem, Ck,n = n!/[k!(n-k)!]",
    "Princípio fundamental da contagem: multiplica-se as possibilidades de cada etapa",
    "Permutação com repetição: quando há elementos idênticos no conjunto"
  ],
  "explicacao_detalhada": "A análise combinatória resolve problemas do tipo ''de quantas maneiras podemos...'' que são muito comuns no cotidiano. A permutação simples calcula quantas maneiras diferentes podemos organizar todos os elementos de um conjunto, como arranjar livros numa estante. O arranjo é usado quando queremos escolher e ordenar apenas alguns elementos, como formar senhas ou selecionar representantes para cargos específicos. A combinação é aplicada quando a ordem não importa, como escolher membros para uma comissão ou formar grupos de estudo. O princípio fundamental da contagem (PFC) é a base de tudo: se uma tarefa pode ser executada em m maneiras e outra em n maneiras, então ambas juntas podem ser executadas em m × n maneiras. No ENEM, esses conceitos aparecem em problemas contextualizados como formação de placas de carros, distribuição de pessoas em mesas, criação de códigos e senhas, análise de cardápios e probabilidades de sorteios.",
  "curiosidade": "O número de maneiras de embaralhar um baralho comum de 52 cartas é aproximadamente 8 × 10⁶⁷ - um número tão grande que se cada pessoa na Terra embaralhasse um baralho por segundo desde o Big Bang, ainda não teríamos explorado todas as possibilidades!"
}'
WHERE subject = 'matemática' AND title = 'Análise Combinatória';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "A probabilidade mede a chance de ocorrência de um evento, sendo expressa por um número entre 0 e 1 (ou 0% e 100%). É amplamente aplicada no cotidiano e nas ciências, desde previsões meteorológicas até análises de risco financeiro.",
  "pontos_chave": [
    "Probabilidade = número de casos favoráveis / número de casos possíveis",
    "A probabilidade varia entre 0 (impossível) e 1 (certo)",
    "Eventos mutuamente exclusivos: P(A ou B) = P(A) + P(B)",
    "Eventos independentes: P(A e B) = P(A) × P(B)",
    "Probabilidade condicional: P(A|B) = P(A e B) / P(B)"
  ],
  "explicacao_detalhada": "A probabilidade clássica baseia-se na razão entre casos favoráveis e casos possíveis, assumindo que todos os resultados são igualmente prováveis. Em jogos de dados, cartas ou moedas, podemos calcular probabilidades exatas. A probabilidade da união de eventos (A ou B) depende se os eventos são mutuamente exclusivos (não podem ocorrer simultaneamente) ou não. Se forem exclusivos, somamos as probabilidades; se não, usamos P(A ou B) = P(A) + P(B) - P(A e B). A probabilidade condicional é crucial quando a ocorrência de um evento afeta a probabilidade de outro, como em diagnósticos médicos ou controle de qualidade. No ENEM, problemas de probabilidade frequentemente envolvem situações do cotidiano: sorteios, pesquisas de opinião, jogos, análise de defeitos em produtos, eficácia de medicamentos e fenômenos genéticos. É importante identificar se os eventos são independentes ou dependentes, exclusivos ou não exclusivos.",
  "curiosidade": "O paradoxo do aniversário mostra como nossa intuição sobre probabilidade pode falhar: em um grupo de apenas 23 pessoas, há mais de 50% de chance de duas delas fazerem aniversário no mesmo dia! Com 70 pessoas, essa probabilidade chega a 99,9%."
}'
WHERE subject = 'matemática' AND title = 'Probabilidade';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "A geometria espacial estuda as formas tridimensionais e suas propriedades, incluindo cálculos de área superficial e volume. É essencial para arquitetura, engenharia e design, e aparece constantemente em questões práticas do ENEM.",
  "pontos_chave": [
    "Prismas: Volume = área da base × altura; Área total = 2×área da base + área lateral",
    "Pirâmides: Volume = (1/3) × área da base × altura",
    "Cilindros: Volume = π × r² × h; Área total = 2πr² + 2πrh",
    "Cones: Volume = (1/3) × π × r² × h; Área total = πr² + πrl",
    "Esferas: Volume = (4/3) × π × r³; Área = 4πr²"
  ],
  "explicacao_detalhada": "A geometria espacial é fundamental para resolver problemas práticos como calcular a quantidade de tinta necessária para pintar uma casa, o volume de água em uma piscina ou a capacidade de armazenamento de um silo. Os prismas incluem formas como cubos, paralelepípedos e prismas triangulares, todos com fórmulas baseadas na área da base multiplicada pela altura. As pirâmides, incluindo a famosa pirâmide quadrada, têm volume igual a um terço do prisma correspondente. Cilindros são comuns em embalagens e tanques, com fórmulas que envolvem π devido à base circular. Cones aparecem em contextos como funis e estruturas arquitetônicas. A esfera é a forma que maximiza volume com mínima superfície, sendo encontrada na natureza e tecnologia. No ENEM, esses conceitos aparecem em problemas sobre capacidade de recipientes, consumo de materiais, otimização de espaços e cálculos arquitetônicos.",
  "curiosidade": "A forma esférica é tão eficiente que as bolhas de sabão naturalmente assumem essa geometria para minimizar a tensão superficial. Por isso, gotas de chuva no espaço (sem gravidade) são perfeitamente esféricas!"
}'
WHERE subject = 'matemática' AND title = 'Geometria Espacial';

-- Atualizar conteúdos de Português com informações detalhadas
UPDATE subject_contents 
SET content_data = '{
  "introducao": "As figuras de linguagem são recursos expressivos que conferem maior força, beleza e originalidade ao discurso. Elas exploram diferentes aspectos da linguagem - sonoros, semânticos e sintáticos - e são fundamentais para a interpretação de textos literários e não literários no ENEM.",
  "pontos_chave": [
    "Metáfora: comparação implícita entre elementos diferentes (''Meus olhos são estrelas'')",
    "Metonímia: substituição de uma palavra por outra com relação de proximidade (''Ler Machado de Assis'')",
    "Hipérbole: exagero intencional para dar ênfase (''Chorei rios de lágrimas'')",
    "Ironia: emprego de palavras com sentido contrário ao que se pensa (''Que educado!'' para alguém grosseiro)",
    "Antítese: oposição de ideias ou palavras (''O rico e o pobre'')"
  ],
  "explicacao_detalhada": "As figuras de linguagem enriquecem a comunicação ao criar efeitos de sentido específicos. A metáfora estabelece comparações poéticas sem usar conectivos como ''como'' ou ''tal qual'', criando imagens mentais poderosas. A metonímia baseia-se em relações de contiguidade: autor pela obra, continente pelo conteúdo, marca pelo produto, parte pelo todo. A hipérbole amplifica características para causar impacto emocional e é muito usada na linguagem coloquial e publicitária. A ironia cria camadas de significado, exigindo que o leitor perceba o contexto para compreender o verdadeiro sentido. No ENEM, as figuras de linguagem aparecem em textos de diversos gêneros: crônicas, poemas, charges, propagandas e artigos de opinião. É crucial identificá-las para compreender os efeitos de sentido pretendidos pelo autor e interpretar corretamente o texto. Elas também são importantes na produção da redação para tornar a argumentação mais expressiva.",
  "curiosidade": "A expressão ''pagar o pato'' é um exemplo de metonímia que vem do século XVI: em festas, quando alguém não conseguia pagar a conta, tinha que carregar um pato vivo como forma de pagamento e humilhação pública!"
}'
WHERE subject = 'português' AND title = 'Figuras de Linguagem';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "As funções da linguagem, sistematizadas por Roman Jakobson, identificam a intenção comunicativa predominante em cada texto. Compreender essas funções é essencial para interpretar diferentes gêneros textuais e situações comunicativas no ENEM.",
  "pontos_chave": [
    "Referencial: foco na informação objetiva (textos jornalísticos, científicos)",
    "Emotiva: expressa sentimentos do emissor (poemas líricos, cartas pessoais)",
    "Apelativa: busca influenciar o receptor (propagandas, discursos políticos)",
    "Fática: testa ou mantém o canal de comunicação (''Alô?'', ''Entende?'')",
    "Poética: valoriza a forma da mensagem (literatura, slogans criativos)",
    "Metalinguística: explica o próprio código linguístico (dicionários, gramáticas)"
  ],
  "explicacao_detalhada": "Cada função da linguagem está relacionada a um elemento da comunicação. A função referencial predomina quando o objetivo é informar objetivamente, usando linguagem denotativa e terceira pessoa. A função emotiva revela a subjetividade do emissor através de interjeições, adjetivos e primeira pessoa. A função apelativa utiliza imperativos, vocativos e segunda pessoa para persuadir o receptor. A função fática verifica se a comunicação está funcionando, sendo comum em cumprimentos e expressões de contato. A função poética explora a sonoridade, ritmo e estrutura da linguagem, criando efeitos estéticos. A função metalinguística ocorre quando a linguagem explica a própria linguagem. No ENEM, é fundamental identificar qual função predomina em cada texto para compreender sua intenção comunicativa. Textos podem combinar várias funções, mas sempre há uma predominante que define seu propósito principal.",
  "curiosidade": "A função fática foi assim nomeada por derivar da palavra grega ''phasis'' (falar). Curiosamente, expressões como ''né?'', ''tá?'' e ''entendeu?'' são tão universais que quase todas as línguas do mundo têm equivalentes para manter o contato comunicativo!"
}'
WHERE subject = 'português' AND title = 'Funções da Linguagem';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "A variação linguística é o fenômeno natural que demonstra como a língua se manifesta de diferentes formas conforme o contexto social, geográfico, histórico e situacional. Compreender essas variações é fundamental para respeitar a diversidade cultural e linguistic brasileira.",
  "pontos_chave": [
    "Variação histórica: mudanças da língua ao longo do tempo (''vosmecê'' → ''você'')",
    "Variação regional: diferenças geográficas (sotaques, vocabulário regional)",
    "Variação social: influência de classe, escolaridade e profissão na linguagem",
    "Variação estilística: adequação da linguagem à situação comunicativa (formal/informal)",
    "Preconceito linguístico: discriminação baseada na forma de falar de uma pessoa"
  ],
  "explicacao_detalhada": "A variação linguística é inerente a todas as línguas vivas e reflete a riqueza cultural de um povo. A variação histórica mostra como palavras, pronúncias e estruturas evoluem - o português atual é muito diferente do falado pelos primeiros colonizadores. A variação regional manifesta-se em sotaques, vocabulário (''mandioca''/''macaxeira''/''aipim'') e construções sintáticas típicas de cada região. A variação social relaciona-se ao nível de escolaridade, classe socioeconômica e grupo profissional, influenciando o vocabulário e estruturas utilizadas. A variação estilística permite adequar a linguagem ao contexto: formal em documentos oficiais, informal entre amigos. O ENEM valoriza o reconhecimento de que não existe ''erro'' de português, mas inadequação ao contexto. É importante combater o preconceito linguístico, que discrimina pessoas por sua variedade linguística, e promover o respeito à diversidade. A norma culta tem prestígio social mas não é superior às outras variedades.",
  "curiosidade": "O Brasil tem mais de 180 línguas faladas! Além do português, temos cerca de 150 línguas indígenas ainda vivas e diversas línguas de imigração, como alemão em Santa Catarina e japonês em São Paulo, criando um verdadeiro mosaico linguístico."
}'
WHERE subject = 'português' AND title = 'Variação Linguística';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "A redação do ENEM segue uma estrutura específica que avalia cinco competências fundamentais. Compreender essa estrutura e dominar cada parte é essencial para alcançar uma boa pontuação e desenvolver habilidades argumentativas sólidas.",
  "pontos_chave": [
    "Introdução: apresenta o tema, contextualiza e formula uma tese clara",
    "Desenvolvimento: dois parágrafos com argumentos e repertório sociocultural",
    "Conclusão: retoma a tese e apresenta proposta de intervenção detalhada",
    "Repertório sociocultural: conhecimentos de áreas diversas para validar argumentos",
    "Proposta de intervenção: deve conter agente, ação, meio, finalidade e detalhamento"
  ],
  "explicacao_detalhada": "A redação do ENEM é um texto dissertativo-argumentativo de 30 linhas que deve defender um ponto de vista sobre temas sociais relevantes. A introdução contextualiza o tema através de dados, citações ou situações problemáticas, culminando em uma tese clara que será defendida. O desenvolvimento apresenta dois argumentos distintos, cada um em um parágrafo, utilizando repertório sociocultural legitimado (dados estatísticos, fatos históricos, referências a obras, teorias ou pensadores) para fundamentar os pontos de vista. A conclusão retoma a tese e apresenta uma proposta de intervenção social detalhada, especificando quem deve agir, que ação deve ser tomada, como será executada e qual objetivo se pretende alcançar. É fundamental manter coesão e coerência textual, utilizar norma culta adequadamente e respeitar os direitos humanos. O domínio dessa estrutura permite organizar ideias de forma eficiente e persuasiva em qualquer contexto argumentativo.",
  "curiosidade": "Desde 1998, mais de 60 milhões de redações já foram corrigidas no ENEM! Os temas mais frequentes abordam questões como educação, violência, meio ambiente e desigualdade social, sempre buscando avaliar a capacidade dos estudantes de refletir sobre problemas contemporâneos do Brasil."
}'
WHERE subject = 'português' AND title = 'Estrutura da Redação do ENEM';

UPDATE subject_contents 
SET content_data = '{
  "introducao": "O Modernismo brasileiro, iniciado com a Semana de Arte Moderna de 1922, revolucionou a literatura nacional ao buscar uma identidade genuinamente brasileira, rompendo com padrões europeus e valorizando nossa cultura popular e linguagem coloquial.",
  "pontos_chave": [
    "Semana de 22: marco inicial, realizada no Teatro Municipal de São Paulo",
    "Primeira fase (1922-1930): ruptura radical, nacionalismo crítico, experimentação",
    "Segunda fase (1930-1945): consolidação, romance social e regional, Graciliano Ramos",
    "Terceira fase (1945-1960): universalismo, introspecção psicológica, Clarice Lispector",
    "Características: liberdade formal, verso livre, linguagem cotidiana, temas nacionais"
  ],
  "explicacao_detalhada": "A Semana de Arte Moderna foi organizada por intelectuais como Mário de Andrade, Oswald de Andrade e Menotti del Picchia, causando polêmica ao propor uma arte genuinamente nacional. A primeira fase caracterizou-se pela irreverência e experimentação formal, produzindo obras como ''Pauliceia Desvairada'' e ''Macunaíma''. Os autores adotaram o verso livre, a linguagem coloquial e temas do cotidiano brasileiro. A segunda fase aprofundou a análise social, com romances que retratavam problemas regionais e urbanos, destacando-se ''Vidas Secas'' e ''O Cortiço''. A terceira fase, também chamada Pós-Modernismo, voltou-se para questões universais e sondagem psicológica, com autores como Clarice Lispector e Guimarães Rosa renovando a linguagem narrativa. O movimento modernista estabeleceu as bases da literatura brasileira contemporânea, influenciando gerações posteriores e consolidando nossa independência cultural. No ENEM, é importante reconhecer características modernistas em textos e relacionar o movimento ao contexto histórico brasileiro.",
  "curiosidade": "Durante a Semana de 22, o público vaiou tanto as apresentações que os organizadores chegaram a contratar uma claque (grupo de pessoas pagas para aplaudir) para equilibrar as reações! Ironicamente, o que era considerado ''escândalo'' tornou-se o marco da arte brasileira moderna."
}'
WHERE subject = 'português' AND title = 'Movimentos Literários - Modernismo no Brasil';
