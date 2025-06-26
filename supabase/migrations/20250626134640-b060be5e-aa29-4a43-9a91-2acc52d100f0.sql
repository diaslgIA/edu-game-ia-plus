
-- Criar tabela para armazenar conteúdos das matérias
CREATE TABLE public.subject_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL DEFAULT 'theory', -- 'theory', 'exercise', 'video'
  content_data JSONB, -- Para armazenar o conteúdo estruturado
  difficulty_level TEXT DEFAULT 'medium', -- 'easy', 'medium', 'hard'
  estimated_time INTEGER DEFAULT 15, -- tempo estimado em minutos
  is_premium BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para questões de quiz por matéria
CREATE TABLE public.subject_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array de opções
  correct_answer INTEGER NOT NULL, -- Índice da resposta correta
  explanation TEXT,
  difficulty_level TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para progresso do usuário nos conteúdos
CREATE TABLE public.content_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  content_id UUID NOT NULL REFERENCES public.subject_contents(id),
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- em segundos
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.subject_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para subject_contents (público para leitura)
CREATE POLICY "Anyone can view subject contents" 
  ON public.subject_contents 
  FOR SELECT 
  USING (true);

-- Políticas para subject_questions (público para leitura)
CREATE POLICY "Anyone can view subject questions" 
  ON public.subject_questions 
  FOR SELECT 
  USING (true);

-- Políticas para content_progress (apenas o próprio usuário)
CREATE POLICY "Users can view their own content progress" 
  ON public.content_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content progress" 
  ON public.content_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content progress" 
  ON public.content_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Inserir conteúdos de exemplo para algumas matérias
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, order_index) VALUES
-- Matemática
('matematica', 'Função Quadrática', 'Aprenda sobre funções do segundo grau e suas propriedades', 'theory', '{"sections": [{"title": "Definição", "content": "Uma função quadrática é toda função f: R → R definida por f(x) = ax² + bx + c, onde a, b e c são números reais e a ≠ 0."}, {"title": "Gráfico", "content": "O gráfico de uma função quadrática é uma parábola que pode ter concavidade voltada para cima (a > 0) ou para baixo (a < 0)."}]}', 'medium', 1),
('matematica', 'Geometria Plana', 'Estude figuras geométricas no plano', 'theory', '{"sections": [{"title": "Triângulos", "content": "Figuras formadas por três lados e três ângulos."}, {"title": "Quadriláteros", "content": "Figuras com quatro lados e quatro ângulos."}]}', 'easy', 2),

-- Português
('portugues', 'Interpretação de Texto', 'Técnicas para compreender textos', 'theory', '{"sections": [{"title": "Leitura Ativa", "content": "Técnicas para uma leitura mais eficiente e compreensiva."}, {"title": "Identificação de Ideias", "content": "Como identificar ideias principais e secundárias."}]}', 'easy', 1),
('portugues', 'Gramática - Classes de Palavras', 'Substantivos, adjetivos, verbos e mais', 'theory', '{"sections": [{"title": "Substantivos", "content": "Palavras que nomeiam seres, objetos, sentimentos."}, {"title": "Adjetivos", "content": "Palavras que caracterizam os substantivos."}]}', 'medium', 2),

-- Física
('fisica', 'Cinemática', 'Estudo do movimento dos corpos', 'theory', '{"sections": [{"title": "Movimento Uniforme", "content": "Movimento com velocidade constante."}, {"title": "Movimento Uniformemente Variado", "content": "Movimento com aceleração constante."}]}', 'medium', 1),

-- Química
('quimica', 'Estrutura Atômica', 'Compreenda a estrutura dos átomos', 'theory', '{"sections": [{"title": "Prótons, Nêutrons e Elétrons", "content": "As partículas fundamentais do átomo."}, {"title": "Números Quânticos", "content": "Descrevem o estado dos elétrons no átomo."}]}', 'medium', 1),

-- Biologia
('biologia', 'Citologia', 'Estudo da célula', 'theory', '{"sections": [{"title": "Célula Procarionte", "content": "Células sem núcleo definido."}, {"title": "Célula Eucarionte", "content": "Células com núcleo definido."}]}', 'easy', 1),

-- História
('historia', 'Brasil Colônia', 'O período colonial brasileiro', 'theory', '{"sections": [{"title": "Capitanias Hereditárias", "content": "Sistema de divisão territorial."}, {"title": "Economia Colonial", "content": "Baseada na agricultura e mineração."}]}', 'easy', 1),

-- Geografia
('geografia', 'Cartografia', 'Representação da Terra', 'theory', '{"sections": [{"title": "Projeções Cartográficas", "content": "Formas de representar a Terra em mapas."}, {"title": "Coordenadas Geográficas", "content": "Sistema de localização na Terra."}]}', 'medium', 1),

-- Filosofia
('filosofia', 'Filosofia Antiga', 'Pensadores da Antiguidade', 'theory', '{"sections": [{"title": "Sócrates", "content": "Método socrático e o conhecimento."}, {"title": "Platão", "content": "Teoria das Ideias e a República."}]}', 'medium', 1),

-- Sociologia
('sociologia', 'Introdução à Sociologia', 'Conceitos básicos da sociologia', 'theory', '{"sections": [{"title": "O que é Sociologia", "content": "Ciência que estuda a sociedade."}, {"title": "Fato Social", "content": "Conceito desenvolvido por Durkheim."}]}', 'easy', 1);

-- Inserir questões de exemplo
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
-- Matemática
('matematica', 'Função Quadrática', 'Qual é o vértice da parábola y = x² - 4x + 3?', '["(2, -1)", "(2, 1)", "(-2, -1)", "(4, 3)"]', 0, 'O vértice de uma parábola y = ax² + bx + c tem coordenada x = -b/2a. Para y = x² - 4x + 3: x = -(-4)/2(1) = 2. Substituindo: y = 4 - 8 + 3 = -1.', 'medium'),
('matematica', 'Geometria', 'A área de um triângulo de base 6 cm e altura 4 cm é:', '["12 cm²", "24 cm²", "10 cm²", "14 cm²"]', 0, 'A área do triângulo é calculada por: A = (base × altura) / 2 = (6 × 4) / 2 = 12 cm².', 'easy'),

-- Português
('portugues', 'Interpretação de Texto', 'Em "O menino estudioso sempre tira boas notas", a palavra "estudioso" é:', '["Substantivo", "Adjetivo", "Verbo", "Advérbio"]', 1, 'A palavra "estudioso" caracteriza o substantivo "menino", sendo portanto um adjetivo.', 'easy'),

-- Física
('fisica', 'Cinemática', 'Um corpo percorre 100m em 10s com velocidade constante. Sua velocidade é:', '["10 m/s", "100 m/s", "1000 m/s", "1 m/s"]', 0, 'Velocidade = distância / tempo = 100m / 10s = 10 m/s.', 'easy'),

-- Química
('quimica', 'Estrutura Atômica', 'O número atômico representa:', '["Número de prótons", "Número de nêutrons", "Número de elétrons", "Massa do átomo"]', 0, 'O número atômico (Z) representa o número de prótons no núcleo do átomo.', 'easy'),

-- Biologia
('biologia', 'Citologia', 'Qual organela é responsável pela respiração celular?', '["Núcleo", "Mitocôndria", "Ribossomo", "Vacúolo"]', 1, 'A mitocôndria é a organela responsável pela respiração celular e produção de ATP.', 'easy'),

-- História
('historia', 'Brasil Colônia', 'As Capitanias Hereditárias foram criadas em que século?', '["XV", "XVI", "XVII", "XVIII"]', 1, 'As Capitanias Hereditárias foram criadas no século XVI (1534) por D. João III.', 'medium'),

-- Geografia
('geografia', 'Cartografia', 'As coordenadas geográficas são formadas por:', '["Latitude e longitude", "Norte e sul", "Leste e oeste", "Meridianos apenas"]', 0, 'As coordenadas geográficas são formadas pela interseção de latitude (paralelos) e longitude (meridianos).', 'easy'),

-- Filosofia
('filosofia', 'Filosofia Antiga', 'Qual filósofo criou o método maiêutica?', '["Platão", "Aristóteles", "Sócrates", "Tales"]', 2, 'Sócrates criou o método maiêutico, que consiste em fazer perguntas para levar o interlocutor ao conhecimento.', 'medium'),

-- Sociologia
('sociologia', 'Conceitos Básicos', 'Quem é considerado o fundador da Sociologia?', '["Karl Marx", "Max Weber", "Auguste Comte", "Émile Durkheim"]', 2, 'Auguste Comte é considerado o fundador da Sociologia, tendo cunhado o termo "sociologia".', 'easy');
