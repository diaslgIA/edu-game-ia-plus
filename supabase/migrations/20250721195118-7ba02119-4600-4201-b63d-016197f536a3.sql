
-- SCRIPT SQL DEFINITIVO PARA CRIAR E POPULAR O BANCO DE DADOS
-- Instruções: Copie TODO este conteúdo, cole no SQL Editor do Supabase e clique em "RUN".

-- PASSO 1: CRIAR ESTRUTURA COMPATÍVEL COM A EXISTENTE
-- Vamos usar as tabelas que já existem e são compatíveis

-- Inserir conteúdos na tabela subject_contents (que já existe)
-- Matéria: Matemática

-- Tema: Matemática Básica e Aritmética
INSERT INTO "public"."subject_contents" 
(subject, title, description, content_type, difficulty_level, grande_tema, explanation, estimated_time, is_premium, order_index)
VALUES 
('Matemática', 'Operações com números reais', 'Fundamentos das operações matemáticas', 'theory', 'medium', 'Matemática Básica e Aritmética', 'Os números reais (ℝ) englobam todos os números que você conhece: positivos, negativos, inteiros, frações (decimais) e até os irracionais (como π e √2). As operações são as quatro básicas: adição, subtração, multiplicação e divisão. O ENEM testa sua habilidade com as regras de sinais e a ordem correta das operações (PEMDAS: Parênteses, Expoentes, Multiplicação/Divisão, Adição/Subtração). Muitas questões apresentam um texto longo descrevendo uma situação cotidiana e pedem que você modele essa situação com operações básicas para encontrar a resposta.', 30, false, 1),

('Matemática', 'Razão e Proporção', 'Conceitos de razão e proporção', 'theory', 'medium', 'Matemática Básica e Aritmética', 'Razão é a divisão entre duas grandezas (a/b). Proporção é a igualdade entre duas razões (a/b = c/d). A propriedade fundamental é a "multiplicação em cruz": a * d = b * c. Este tópico aparece em escalas de mapas, densidade demográfica, velocidade média e problemas de comparação de grandezas.', 25, false, 2),

('Matemática', 'Regra de três simples e composta', 'Aplicações de regra de três', 'theory', 'medium', 'Matemática Básica e Aritmética', 'É a ferramenta para resolver problemas de proporção. A simples envolve duas grandezas. A composta envolve três ou mais. É crucial saber identificar se as grandezas são diretamente proporcionais (ambas aumentam ou diminuem juntas) ou inversamente proporcionais (uma aumenta enquanto a outra diminui). O erro mais comum é não inverter a razão da grandeza inversa antes de calcular.', 35, false, 3),

('Matemática', 'Porcentagem', 'Cálculos com porcentagem', 'theory', 'easy', 'Matemática Básica e Aritmética', 'Porcentagem é uma razão com denominador 100. Representa uma parte de um todo. "25%" é o mesmo que 25/100 ou 0,25. Aparece em descontos, acréscimos, lucros e matemática financeira. É fundamental saber calcular aumentos e descontos sucessivos e variações percentuais.', 20, false, 4),

('Matemática', 'Juros simples e compostos', 'Matemática financeira básica', 'theory', 'medium', 'Matemática Básica e Aritmética', 'São formas de calcular o rendimento de um capital. Juros Simples: o rendimento é sempre sobre o valor inicial (J = C * i * t). Juros Compostos: o rendimento é calculado sobre o valor do mês anterior, "juros sobre juros" (M = C * (1 + i)^t). O ENEM foca mais em juros compostos, pois é o que se aplica no mundo real.', 40, false, 5),

-- Tema: Funções
('Matemática', 'Função de 1º e 2º grau', 'Funções lineares e quadráticas', 'theory', 'medium', 'Funções', 'Função de 1º Grau (Função Afim): f(x) = ax + b, seu gráfico é uma reta. Função de 2º Grau (Função Quadrática): f(x) = ax² + bx + c, seu gráfico é uma parábola. O ENEM cobra a montagem da lei de formação para o 1º grau e, para o 2º grau, o significado dos vértices (ponto de máximo ou mínimo) em problemas de otimização.', 45, false, 6),

('Matemática', 'Análise de gráficos', 'Interpretação de gráficos matemáticos', 'theory', 'easy', 'Funções', 'É a habilidade de "ler" as informações contidas em um gráfico (linhas, barras, pizza, etc.). O ENEM te dá um gráfico e faz perguntas sobre ele. Você precisa identificar intervalos de crescimento, pontos de máximo e mínimo, e relacionar as informações dos eixos com o contexto do problema. É pura interpretação.', 30, false, 7),

('Matemática', 'Função Exponencial', 'Crescimentos exponenciais', 'theory', 'hard', 'Funções', 'Uma função onde a variável está no expoente: f(x) = a^x. Descreve crescimentos ou decrescimentos muito rápidos, como crescimento de populações, juros compostos e decaimento radioativo. O ENEM geralmente fornece a fórmula e pede para você aplicá-la.', 35, false, 8),

('Matemática', 'Função Logarítmica', 'Logaritmos e suas aplicações', 'theory', 'hard', 'Funções', 'É a função inversa da exponencial: f(x) = log_a(x). Logaritmos são usados para trabalhar com números muito grandes ou muito pequenos, transformando multiplicações em somas e potências em multiplicações. Aparecem em escalas como a Richter (terremotos) e pH (acidez).', 40, false, 9),

-- Tema: Geometria
('Matemática', 'Geometria Plana', 'Figuras geométricas em 2D', 'theory', 'medium', 'Geometria', 'O estudo de figuras em duas dimensões (2D). Perímetro é a soma dos lados. Área é a medida da superfície. É preciso saber as fórmulas de área das principais figuras: quadrado, retângulo, triângulo, trapézio, losango e círculo. Questões com figuras compostas são comuns.', 35, false, 10),

('Matemática', 'Geometria Espacial', 'Sólidos geométricos em 3D', 'theory', 'hard', 'Geometria', 'O estudo de sólidos em 3D. O volume é o espaço que um sólido ocupa. A fórmula para prismas e cilindros é Área da Base x Altura. Para cones e pirâmides, é (Área da Base x Altura) / 3. O ENEM adora problemas sobre a capacidade de recipientes.', 40, false, 11),

('Matemática', 'Trigonometria no triângulo retângulo', 'Relações trigonométricas básicas', 'theory', 'medium', 'Geometria', 'O estudo das relações entre os ângulos e os lados de um triângulo retângulo. As três razões básicas são: Seno (Cateto Oposto / Hipotenusa), Cosseno (Cateto Adjacente / Hipotenusa) e Tangente (Cateto Oposto / Cateto Adjacente). É usada para resolver problemas de altura e distância inacessíveis.', 30, false, 12);

-- Inserir questões de quiz para Matemática
INSERT INTO "public"."subject_questions"
(subject, topic, question, options, correct_answer, explanation, difficulty_level, quiz_title, grande_tema)
VALUES 
('Matemática', 'Operações com números reais', 'Qual é o resultado da expressão 10 + 4 × 2 - (6 ÷ 3)?', '["16", "26", "12", "20"]'::jsonb, 0, 'Aplicando a ordem das operações (PEMDAS): primeiro parênteses (6÷3=2), depois multiplicação (4×2=8), então 10+8-2=16', 'medium', 'Quiz sobre Operações com números reais', 'Matemática Básica e Aritmética'),

('Matemática', 'Operações com números reais', 'Em uma receita, são necessários 2,5 kg de farinha para fazer 10 bolos. Quantos quilos de farinha serão necessários para fazer 15 bolos?', '["3,75 kg", "3,5 kg", "4 kg", "3,25 kg"]'::jsonb, 0, 'Usando regra de três: 2,5 kg → 10 bolos; x kg → 15 bolos. x = (2,5 × 15) ÷ 10 = 3,75 kg', 'medium', 'Quiz sobre Operações com números reais', 'Matemática Básica e Aritmética'),

('Matemática', 'Razão e Proporção', 'Se 3 pedreiros constroem um muro em 8 dias, quantos dias 4 pedreiros levariam para construir o mesmo muro?', '["6 dias", "10,7 dias", "8 dias", "4 dias"]'::jsonb, 0, 'Grandezas inversamente proporcionais: 3×8 = 4×x, então x = 24÷4 = 6 dias', 'medium', 'Quiz sobre Razão e Proporção', 'Matemática Básica e Aritmética'),

('Matemática', 'Porcentagem', 'Um produto custava R$ 200,00 e teve um aumento de 15%. Depois, teve um desconto de 10%. Qual o preço final?', '["R$ 207,00", "R$ 210,00", "R$ 200,00", "R$ 195,00"]'::jsonb, 0, 'Aumento: 200 × 1,15 = 230. Desconto: 230 × 0,90 = 207', 'medium', 'Quiz sobre Porcentagem', 'Matemática Básica e Aritmética'),

('Matemática', 'Função de 1º e 2º grau', 'Uma função do 1º grau tem f(0) = 3 e f(2) = 7. Qual é f(5)?', '["13", "11", "15", "12"]'::jsonb, 0, 'f(x) = ax + b. f(0) = 3 → b = 3. f(2) = 7 → 2a + 3 = 7 → a = 2. Logo f(x) = 2x + 3 e f(5) = 13', 'medium', 'Quiz sobre Função de 1º e 2º grau', 'Funções');

-- PORTUGUÊS E LITERATURA
INSERT INTO "public"."subject_contents" 
(subject, title, description, content_type, difficulty_level, grande_tema, explanation, estimated_time, is_premium, order_index)
VALUES 
('Português e Literatura', 'Leitura e interpretação de textos', 'Compreensão textual', 'theory', 'medium', 'Interpretação e Análise Textual', 'É a habilidade de extrair informações e sentidos de diferentes formas de comunicação. Textos verbais usam a palavra escrita. Textos não-verbais usam imagens. O ENEM ama textos mistos (charges, tirinhas, anúncios), que combinam os dois. O segredo é entender não apenas o que está dito, mas por que está dito daquela forma, identificando a ideia principal, a opinião do autor, ironias e ambiguidades.', 30, false, 1),

('Português e Literatura', 'Gêneros textuais', 'Tipos e funções dos textos', 'theory', 'easy', 'Interpretação e Análise Textual', 'São as "formas" que os textos assumem na sociedade para cumprir uma função. Você precisa reconhecer a função de cada gênero: uma notícia informa, uma propaganda persuade, uma receita instrui, um poema emociona. O ENEM cobra que você identifique o gênero para entender seu objetivo, público-alvo e linguagem.', 25, false, 2),

('Português e Literatura', 'Funções da linguagem', 'Objetivos comunicativos', 'theory', 'medium', 'Interpretação e Análise Textual', 'São as diferentes intenções de um ato de comunicação. Referencial (informar), Emotiva (expressar sentimentos), Apelativa (convencer), Poética (foco na forma), Fática (testar o canal) e Metalinguística (língua explicando a si mesma). Identificar a função predominante ajuda a desvendar a intenção do autor.', 30, false, 3),

('Português e Literatura', 'Coesão e coerência', 'Articulação textual', 'theory', 'medium', 'Gramática e Norma Culta', 'Coesão é a "costura" gramatical do texto, a ligação entre as partes feita por conectivos, pronomes, etc. Coerência é a lógica, o sentido do texto. O ENEM adora questões sobre o papel dos conectivos (mas, portanto, embora), exigindo que você identifique o sentido que eles estabelecem entre as frases.', 35, false, 4),

('Português e Literatura', 'Modernismo', 'Literatura moderna brasileira', 'theory', 'hard', 'Literatura Brasileira', 'O movimento mais cobrado. 1ª Fase (1922-30): Ruptura, experimentalismo, versos livres, linguagem coloquial (Mário de Andrade, Oswald de Andrade). 2ª Fase (1930-45): Consolidação, poesia reflexiva (Drummond) e prosa regionalista de denúncia social (Graciliano Ramos, Jorge Amado). 3ª Fase (Pós-1945): Experimentalismo na prosa (Clarice Lispector, Guimarães Rosa) e rigor formal na poesia (João Cabral de Melo Neto).', 45, false, 5);

-- Questões de Português
INSERT INTO "public"."subject_questions"
(subject, topic, question, options, correct_answer, explanation, difficulty_level, quiz_title, grande_tema)
VALUES 
('Português e Literatura', 'Gêneros textuais', 'Uma receita de bolo, com lista de ingredientes e modo de preparo, pertence predominantemente a qual gênero textual?', '["Instrucional", "Narrativo", "Descritivo", "Argumentativo"]'::jsonb, 0, 'A receita tem função instrucional, ensinando como fazer algo passo a passo', 'easy', 'Quiz sobre Gêneros textuais', 'Interpretação e Análise Textual'),

('Português e Literatura', 'Funções da linguagem', 'Em "Olá, você está me ouvindo?", qual função da linguagem predomina?', '["Fática", "Referencial", "Emotiva", "Poética"]'::jsonb, 0, 'Função fática: testa o canal de comunicação', 'medium', 'Quiz sobre Funções da linguagem', 'Interpretação e Análise Textual');

-- FÍSICA
INSERT INTO "public"."subject_contents" 
(subject, title, description, content_type, difficulty_level, grande_tema, explanation, estimated_time, is_premium, order_index)
VALUES 
('Física', 'Cinemática', 'Estudo do movimento', 'theory', 'medium', 'Mecânica', 'Descreve o movimento. Foco na interpretação de gráficos (posição x tempo, velocidade x tempo). A inclinação do gráfico v x t é a aceleração, e a área sob ele é o deslocamento. As funções horárias (sorvete, sorvetão) modelam situações-problema.', 35, false, 1),

('Física', 'Leis de Newton e Dinâmica', 'Causas do movimento', 'theory', 'medium', 'Mecânica', 'Estuda as causas do movimento. 1ª Lei (Inércia - muito cobrada conceitualmente, ex: cinto de segurança). 2ª Lei (F=ma - principal ferramenta de cálculo). 3ª Lei (Ação e Reação - conceitual, pares atuam em corpos diferentes).', 40, false, 2),

('Física', 'Eletrodinâmica', 'Corrente elétrica e circuitos', 'theory', 'hard', 'Eletricidade e Magnetismo', 'O assunto de física que mais cai. Foco em análise de circuitos com resistores em série e paralelo. 1ª Lei de Ohm (U = R.i) e Potência Elétrica (P = U.i) são essenciais. Questões sobre chuveiros, consumo de energia (kWh) e aparelhos domésticos são muito comuns.', 45, false, 3);

-- INGLÊS (já que o usuário está na rota de inglês)
INSERT INTO "public"."subject_contents" 
(subject, title, description, content_type, difficulty_level, grande_tema, explanation, estimated_time, is_premium, order_index)
VALUES 
('Inglês', 'Análise de textos jornalísticos e publicitários', 'Compreensão de mídia em inglês', 'theory', 'medium', 'Interpretação de Gêneros Textuais', 'O ENEM usa textos de sites de notícias como BBC e New York Times. Use as técnicas de Skimming (ideia geral) e Scanning (procurar informações específicas) para otimizar a leitura.', 30, false, 1),

('Inglês', 'Interpretação de tirinhas, charges e poemas', 'Textos visuais e literários', 'theory', 'medium', 'Interpretação de Gêneros Textuais', 'Textos que exigem a compreensão da linguagem verbal e não-verbal. A chave é a relação entre imagem e texto. Em poemas, o foco é no sentido figurado.', 25, false, 2),

('Inglês', 'Vocabulário em contexto e expressões idiomáticas', 'Compreensão lexical', 'theory', 'easy', 'Vocabulário e Estruturas da Língua', 'Você não precisa saber todas as palavras, mas conseguir inferir o significado pelo contexto. Preste atenção nos cognatos (palavras parecidas com o português).', 20, false, 3),

('Inglês', 'Falsos cognatos', 'Armadilhas do vocabulário', 'theory', 'medium', 'Vocabulário e Estruturas da Língua', 'Falsos cognatos são "pegadinhas" comuns. Ex: "actually" (na verdade), "library" (biblioteca), "pretend" (fingir). Ter uma lista dos principais em mente ajuda muito.', 25, false, 4);

-- Questões de Inglês
INSERT INTO "public"."subject_questions"
(subject, topic, question, options, correct_answer, explanation, difficulty_level, quiz_title, grande_tema)
VALUES 
('Inglês', 'Falsos cognatos', 'What does the word "actually" mean in English?', '["Na verdade", "Atualmente", "Eventualmente", "Principalmente"]'::jsonb, 0, '"Actually" significa "na verdade", não "atualmente" como muitos pensam', 'medium', 'Quiz sobre Falsos cognatos', 'Vocabulário e Estruturas da Língua'),

('Inglês', 'Vocabulário em contexto', 'In the sentence "The book is on the library shelf", what does "library" mean?', '["Livraria", "Biblioteca", "Literatura", "Libertação"]'::jsonb, 1, '"Library" significa biblioteca, não livraria (que seria "bookstore")', 'easy', 'Quiz sobre Vocabulário em contexto', 'Vocabulário e Estruturas da Língua');
