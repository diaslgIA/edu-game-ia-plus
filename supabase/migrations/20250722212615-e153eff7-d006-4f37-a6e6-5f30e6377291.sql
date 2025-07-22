
-- =================================================================
-- SCRIPT SQL DEFINITIVO PARA APAGAR, RECRIAR, POPULAR E CONFIGURAR O BANCO DE DADOS
-- =================================================================

-- PASSO 1: APAGAR A ESTRUTURA ANTIGA PARA GARANTIR UMA INSTALAÇÃO LIMPA
DROP TABLE IF EXISTS "public"."Answers" CASCADE;
DROP TABLE IF EXISTS "public"."Questions" CASCADE;
DROP TABLE IF EXISTS "public"."Quizzes" CASCADE;
DROP TABLE IF EXISTS "public"."Topics" CASCADE;
DROP TABLE IF EXISTS "public"."Themes" CASCADE;
DROP TABLE IF EXISTS "public"."Subjects" CASCADE;

-- PASSO 2: CRIAR A ESTRUTURA CORRETA DAS TABELAS
CREATE TABLE "public"."Subjects" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL UNIQUE,
    "description" text,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "Subjects_pkey" PRIMARY KEY (id)
);

CREATE TABLE "public"."Themes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "subject_id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "Themes_pkey" PRIMARY KEY (id),
    CONSTRAINT "Themes_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES "public"."Subjects"(id) ON DELETE CASCADE
);

CREATE TABLE "public"."Topics" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" text NOT NULL,
    "theme_id" uuid NOT NULL,
    "explanation" text,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "Topics_pkey" PRIMARY KEY (id),
    CONSTRAINT "Topics_theme_id_fkey" FOREIGN KEY (theme_id) REFERENCES "public"."Themes"(id) ON DELETE CASCADE
);

CREATE TABLE "public"."Quizzes" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "title" text NOT NULL,
    "topic_id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "Quizzes_pkey" PRIMARY KEY (id),
    CONSTRAINT "Quizzes_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES "public"."Topics"(id) ON DELETE CASCADE
);

CREATE TABLE "public"."Questions" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "question_text" text NOT NULL,
    "quiz_id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "Questions_pkey" PRIMARY KEY (id),
    CONSTRAINT "Questions_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES "public"."Quizzes"(id) ON DELETE CASCADE
);

CREATE TABLE "public"."Answers" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "answer_text" text NOT NULL,
    "is_correct" boolean NOT NULL,
    "question_id" uuid NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    CONSTRAINT "Answers_pkey" PRIMARY KEY (id),
    CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY (question_id) REFERENCES "public"."Questions"(id) ON DELETE CASCADE
);

-- PASSO 3: INSERÇÃO DE TODO O CONTEÚDO EDUCACIONAL
INSERT INTO "public"."Subjects" (name, description) VALUES
('Matemática', 'Explore o mundo dos números, formas e estruturas.'),
('Português e Literatura', 'Domine a arte da comunicação e viaje pela literatura brasileira.'),
('Física', 'Entenda as leis que regem o universo, do átomo às galáxias.'),
('Química', 'Descubra a ciência da matéria e suas transformações.'),
('Biologia', 'Aprenda sobre a vida em todas as suas formas e complexidades.'),
('História', 'Analise o passado para compreender o presente e moldar o futuro.'),
('Geografia', 'Estude a relação entre a sociedade e o espaço terrestre.'),
('Filosofia', 'Reflita sobre as grandes questões da existência, conhecimento e valores.'),
('Sociologia', 'Desenvolva um olhar crítico sobre a sociedade e suas estruturas.'),
('Inglês', 'Abra portas para o mundo com a língua mais falada globalmente.'),
('Espanhol', 'Conecte-se com a rica cultura de nossos países vizinhos.');

-- Inserção dos temas e tópicos para cada matéria
DO $$
DECLARE
    subject_id uuid;
    theme_id uuid;
    topic_id uuid;
    quiz_id uuid;
    question_id uuid;
BEGIN
    -- MATEMÁTICA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Matemática';
    
    -- Tema: Álgebra
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Álgebra', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Equações do 1º Grau', theme_id, 'Equações do primeiro grau são expressões matemáticas que apresentam uma igualdade e uma incógnita de expoente 1.'),
        ('Equações do 2º Grau', theme_id, 'Equações do segundo grau são expressões algébricas que apresentam uma incógnita com expoente máximo igual a 2.'),
        ('Funções', theme_id, 'Uma função é uma relação entre dois conjuntos onde cada elemento do primeiro conjunto está associado a exatamente um elemento do segundo conjunto.');

    -- Tema: Geometria
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Geometria', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Geometria Plana', theme_id, 'A geometria plana estuda figuras geométricas que possuem duas dimensões: comprimento e largura.'),
        ('Geometria Espacial', theme_id, 'A geometria espacial estuda objetos tridimensionais, ou seja, que possuem comprimento, largura e altura.'),
        ('Trigonometria', theme_id, 'A trigonometria é o ramo da matemática que estuda as relações entre os ângulos e lados dos triângulos.');

    -- PORTUGUÊS E LITERATURA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Português e Literatura';
    
    -- Tema: Gramática
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Gramática', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Classes de Palavras', theme_id, 'As classes de palavras são categorias que agrupam palavras com características semelhantes: substantivo, adjetivo, verbo, advérbio, etc.'),
        ('Sintaxe', theme_id, 'A sintaxe estuda a organização das palavras na frase e as relações estabelecidas entre elas.'),
        ('Concordância', theme_id, 'A concordância é a correspondência de flexão entre termos da oração, podendo ser nominal ou verbal.');

    -- Tema: Literatura
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Literatura', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Romantismo', theme_id, 'O Romantismo foi um movimento literário que valorizava o sentimentalismo, o nacionalismo e a natureza.'),
        ('Realismo', theme_id, 'O Realismo buscava retratar a realidade social de forma objetiva, criticando os costumes da época.'),
        ('Modernismo', theme_id, 'O Modernismo brasileiro rompeu com os padrões estéticos tradicionais, valorizando a liberdade de expressão.');

    -- FÍSICA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Física';
    
    -- Tema: Mecânica
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Mecânica', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Cinemática', theme_id, 'A cinemática estuda o movimento dos corpos sem se preocupar com as causas que o produzem.'),
        ('Dinâmica', theme_id, 'A dinâmica estuda o movimento dos corpos e as forças que causam esse movimento.'),
        ('Estática', theme_id, 'A estática estuda as condições de equilíbrio dos corpos em repouso ou em movimento retilíneo uniforme.');

    -- Tema: Eletromagnetismo
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Eletromagnetismo', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Eletrostática', theme_id, 'A eletrostática estuda os fenômenos relacionados às cargas elétricas em repouso.'),
        ('Eletrodinâmica', theme_id, 'A eletrodinâmica estuda os fenômenos relacionados às cargas elétricas em movimento.'),
        ('Magnetismo', theme_id, 'O magnetismo estuda os fenômenos magnéticos e suas relações com a eletricidade.');

    -- QUÍMICA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Química';
    
    -- Tema: Química Geral
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Química Geral', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Estrutura Atômica', theme_id, 'A estrutura atômica descreve a organização dos prótons, nêutrons e elétrons no átomo.'),
        ('Tabela Periódica', theme_id, 'A tabela periódica organiza os elementos químicos em ordem crescente de número atômico.'),
        ('Ligações Químicas', theme_id, 'As ligações químicas são forças que mantêm os átomos unidos formando moléculas e compostos.');

    -- Tema: Química Orgânica
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Química Orgânica', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Hidrocarbonetos', theme_id, 'Os hidrocarbonetos são compostos orgânicos formados exclusivamente por carbono e hidrogênio.'),
        ('Funções Orgânicas', theme_id, 'As funções orgânicas são grupos de compostos com propriedades químicas semelhantes.'),
        ('Isomeria', theme_id, 'A isomeria é o fenômeno em que compostos com a mesma fórmula molecular apresentam propriedades diferentes.');

    -- BIOLOGIA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Biologia';
    
    -- Tema: Citologia
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Citologia', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Célula Procariótica', theme_id, 'Células procarióticas são aquelas que não possuem núcleo organizado por membrana nuclear.'),
        ('Célula Eucariótica', theme_id, 'Células eucarióticas possuem núcleo organizado e delimitado por membrana nuclear.'),
        ('Organelas Celulares', theme_id, 'As organelas são estruturas especializadas presentes no citoplasma das células eucarióticas.');

    -- Tema: Genética
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Genética', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Leis de Mendel', theme_id, 'As Leis de Mendel explicam como as características hereditárias são transmitidas dos pais para os filhos.'),
        ('DNA e RNA', theme_id, 'O DNA e RNA são ácidos nucleicos responsáveis pelo armazenamento e transmissão da informação genética.'),
        ('Mutações', theme_id, 'As mutações são alterações na sequência do DNA que podem ser transmitidas para as gerações seguintes.');

    -- HISTÓRIA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'História';
    
    -- Tema: História do Brasil
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('História do Brasil', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Brasil Colônia', theme_id, 'O período colonial brasileiro (1500-1822) foi marcado pela exploração portuguesa e pelo sistema de plantation.'),
        ('Brasil Império', theme_id, 'O Império brasileiro (1822-1889) foi caracterizado pela monarquia constitucional e pela abolição da escravidão.'),
        ('Brasil República', theme_id, 'A República brasileira iniciou em 1889 e passou por diferentes fases políticas até os dias atuais.');

    -- Tema: História Geral
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('História Geral', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Idade Antiga', theme_id, 'A Idade Antiga compreende o período das primeiras civilizações até a queda do Império Romano.'),
        ('Idade Média', theme_id, 'A Idade Média foi caracterizada pelo feudalismo, pela Igreja Católica e pelas Cruzadas.'),
        ('Idade Moderna', theme_id, 'A Idade Moderna foi marcada pelas Grandes Navegações, Renascimento e Reforma Protestante.');

    -- GEOGRAFIA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Geografia';
    
    -- Tema: Geografia Física
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Geografia Física', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Relevo', theme_id, 'O relevo são as diferentes formas da superfície terrestre, como montanhas, planícies e planaltos.'),
        ('Clima', theme_id, 'O clima é o conjunto de condições atmosféricas que caracterizam uma região ao longo do tempo.'),
        ('Hidrografia', theme_id, 'A hidrografia estuda as águas continentais e oceânicas da Terra.');

    -- Tema: Geografia Humana
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Geografia Humana', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('População', theme_id, 'A geografia da população estuda a distribuição, crescimento e características demográficas.'),
        ('Urbanização', theme_id, 'A urbanização é o processo de crescimento das cidades e concentração populacional urbana.'),
        ('Globalização', theme_id, 'A globalização é o processo de integração econômica, política e cultural mundial.');

    -- FILOSOFIA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Filosofia';
    
    -- Tema: Filosofia Antiga
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Filosofia Antiga', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Sócrates', theme_id, 'Sócrates desenvolveu o método dialético e defendia que "só sei que nada sei".'),
        ('Platão', theme_id, 'Platão criou a Teoria das Ideias e fundou a Academia em Atenas.'),
        ('Aristóteles', theme_id, 'Aristóteles sistematizou o conhecimento e criou a lógica formal.');

    -- Tema: Filosofia Moderna
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Filosofia Moderna', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Descartes', theme_id, 'René Descartes é considerado o pai da filosofia moderna com seu método da dúvida.'),
        ('Kant', theme_id, 'Immanuel Kant revolucionou a filosofia com sua Crítica da Razão Pura.'),
        ('Iluminismo', theme_id, 'O Iluminismo defendia a razão, a ciência e o progresso humano.');

    -- SOCIOLOGIA
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Sociologia';
    
    -- Tema: Fundamentos da Sociologia
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Fundamentos da Sociologia', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Auguste Comte', theme_id, 'Auguste Comte é considerado o fundador da Sociologia e criador do Positivismo.'),
        ('Émile Durkheim', theme_id, 'Durkheim estudou os fatos sociais e desenvolveu a teoria da solidariedade social.'),
        ('Max Weber', theme_id, 'Weber analisou a ação social e desenvolveu a teoria da dominação.');

    -- Tema: Sociedade Contemporânea
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Sociedade Contemporânea', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Classes Sociais', theme_id, 'As classes sociais são grupos de pessoas com características socioeconômicas semelhantes.'),
        ('Movimentos Sociais', theme_id, 'Os movimentos sociais são ações coletivas que buscam mudanças na sociedade.'),
        ('Cultura e Sociedade', theme_id, 'A cultura é o conjunto de valores, crenças e práticas de uma sociedade.');

    -- INGLÊS
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Inglês';
    
    -- Tema: Grammar
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Grammar', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Verb Tenses', theme_id, 'Verb tenses indicate when an action occurs: past, present, or future.'),
        ('Modal Verbs', theme_id, 'Modal verbs express necessity, possibility, permission, or ability.'),
        ('Conditionals', theme_id, 'Conditional sentences express hypothetical situations and their consequences.');

    -- Tema: Reading Comprehension
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Reading Comprehension', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Text Analysis', theme_id, 'Text analysis involves understanding main ideas, supporting details, and author''s purpose.'),
        ('Vocabulary in Context', theme_id, 'Understanding word meanings through context clues and surrounding text.'),
        ('Reading Strategies', theme_id, 'Effective reading strategies include skimming, scanning, and inferencing.');

    -- ESPANHOL
    SELECT id INTO subject_id FROM "public"."Subjects" WHERE name = 'Espanhol';
    
    -- Tema: Gramática
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Gramática', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Tiempos Verbales', theme_id, 'Los tiempos verbales indican cuándo ocurre una acción: pasado, presente o futuro.'),
        ('Artículos y Sustantivos', theme_id, 'Los artículos acompañan a los sustantivos y concuerdan en género y número.'),
        ('Ser y Estar', theme_id, 'Los verbos ser y estar expresan diferentes tipos de estados y características.');

    -- Tema: Cultura Hispana
    INSERT INTO "public"."Themes" (name, subject_id) VALUES ('Cultura Hispana', subject_id) RETURNING id INTO theme_id;
    INSERT INTO "public"."Topics" (name, theme_id, explanation) VALUES 
        ('Literatura Hispanoamericana', theme_id, 'La literatura hispanoamericana incluye obras de autores de toda América Latina.'),
        ('Tradiciones y Festivales', theme_id, 'Las tradiciones hispanas reflejan la rica diversidad cultural de los países hispanohablantes.'),
        ('Historia de España', theme_id, 'La historia de España abarca desde las civilizaciones antiguas hasta la época contemporánea.');

END $$;

-- PASSO 4: APLICAR AS POLÍTICAS DE SEGURANÇA (RLS)
ALTER TABLE "public"."Subjects" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Themes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Topics" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Quizzes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Questions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Answers" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access" ON "public"."Subjects";
DROP POLICY IF EXISTS "Public read access" ON "public"."Themes";
DROP POLICY IF EXISTS "Public read access" ON "public"."Topics";
DROP POLICY IF EXISTS "Public read access" ON "public"."Quizzes";
DROP POLICY IF EXISTS "Public read access" ON "public"."Questions";
DROP POLICY IF EXISTS "Public read access" ON "public"."Answers";

CREATE POLICY "Public read access" ON "public"."Subjects" FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "public"."Themes" FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "public"."Topics" FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "public"."Quizzes" FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "public"."Questions" FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "public"."Answers" FOR SELECT USING (true);
