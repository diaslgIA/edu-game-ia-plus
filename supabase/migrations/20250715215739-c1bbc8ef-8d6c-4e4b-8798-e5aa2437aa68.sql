-- Adicionar colunas grande_tema nas tabelas
ALTER TABLE public.subject_contents ADD COLUMN grande_tema TEXT;
ALTER TABLE public.subject_questions ADD COLUMN grande_tema TEXT;

-- Atualizar dados existentes de subject_questions para História
UPDATE public.subject_questions 
SET grande_tema = CASE 
  WHEN topic IN ('Brasil República', 'Ditadura Militar', 'Brasil Colonial') THEN 'História do Brasil'
  WHEN topic IN ('Segunda Guerra Mundial', 'Revolução Francesa') THEN 'História Geral'
  ELSE grande_tema
END
WHERE subject = 'História';

-- Inserir conteúdos teóricos para História do Brasil
INSERT INTO public.subject_contents (subject, grande_tema, title, description, content_type, difficulty_level, estimated_time, content_data) VALUES
('História', 'História do Brasil', 'Brasil Colônia', 'Período colonial brasileiro (1500-1822) com exploração portuguesa e formação da sociedade', 'theory', 'medium', 20, '{"sections": [{"title": "Colonização", "content": "O Brasil foi colonizado pelos portugueses a partir de 1500, seguindo o modelo de exploração baseado no pacto colonial."}, {"title": "Economia Colonial", "content": "A economia se baseava na monocultura de exportação, principalmente açúcar e depois ouro."}, {"title": "Sociedade Colonial", "content": "Sociedade hierarquizada com brancos, índios, negros e mestiços em diferentes posições sociais."}]}'),
('História', 'História do Brasil', 'Brasil Império', 'Período imperial brasileiro (1822-1889) com independência e consolidação nacional', 'theory', 'medium', 25, '{"sections": [{"title": "Independência", "content": "Proclamação da Independência em 1822 por Dom Pedro I, rompendo com Portugal."}, {"title": "Primeiro Reinado", "content": "Governo de Dom Pedro I (1822-1831) marcado por conflitos políticos e abdicação."}, {"title": "Segundo Reinado", "content": "Governo de Dom Pedro II (1840-1889) com modernização e abolição da escravidão."}]}'),
('História', 'História do Brasil', 'República Velha', 'Primeira fase republicana (1889-1930) com oligarquias e política do café com leite', 'theory', 'medium', 20, '{"sections": [{"title": "Proclamação da República", "content": "Fim da monarquia em 1889 com a proclamação da República pelos militares."}, {"title": "Política do Café com Leite", "content": "Alternância no poder entre oligarquias de São Paulo e Minas Gerais."}, {"title": "Movimentos Sociais", "content": "Canudos, Contestado e revoltas urbanas marcaram o período."}]}'),
('História', 'História do Brasil', 'Era Vargas', 'Governo de Getúlio Vargas (1930-1945/1951-1954) e transformações políticas', 'theory', 'hard', 30, '{"sections": [{"title": "Revolução de 1930", "content": "Getúlio Vargas chega ao poder através de revolução, encerrando a República Velha."}, {"title": "Estado Novo", "content": "Período ditatorial (1937-1945) com centralização política e nacionalismo."}, {"title": "Trabalhismo", "content": "Criação da CLT e consolidação dos direitos trabalhistas no Brasil."}]}'),
('História', 'História do Brasil', 'Ditadura Militar', 'Regime militar brasileiro (1964-1985) com autoritarismo e repressão', 'theory', 'hard', 35, '{"sections": [{"title": "Golpe de 1964", "content": "Militares derrubam João Goulart com apoio de setores conservadores."}, {"title": "AI-5 e Repressão", "content": "Ato Institucional nº 5 endurece o regime com censura e perseguição política."}, {"title": "Abertura Política", "content": "Processo gradual de redemocratização iniciado no governo Geisel."}]}'),
('História', 'História do Brasil', 'Nova República', 'Período democrático brasileiro (1985-presente) com consolidação institucional', 'theory', 'medium', 25, '{"sections": [{"title": "Redemocratização", "content": "Fim da ditadura militar e promulgação da Constituição de 1988."}, {"title": "Plano Real", "content": "Estabilização monetária no governo Fernando Henrique Cardoso."}, {"title": "Brasil Contemporâneo", "content": "Governos Lula, Dilma e desafios democráticos atuais."}]}');

-- Inserir conteúdos teóricos para História Geral
INSERT INTO public.subject_contents (subject, grande_tema, title, description, content_type, difficulty_level, estimated_time, content_data) VALUES
('História', 'História Geral', 'Antiguidade Clássica', 'Civilizações antigas: Grécia e Roma e suas contribuições para a cultura ocidental', 'theory', 'medium', 25, '{"sections": [{"title": "Grécia Antiga", "content": "Berço da democracia, filosofia e teatro, com pólis como Atenas e Esparta."}, {"title": "Roma Antiga", "content": "Império que dominou o Mediterrâneo, criando direito romano e infraestrutura."}, {"title": "Legado Cultural", "content": "Influências na política, arte, filosofia e direito até os dias atuais."}]}'),
('História', 'História Geral', 'Idade Média', 'Período medieval (séc. V-XV) com feudalismo e poder da Igreja Católica', 'theory', 'medium', 30, '{"sections": [{"title": "Feudalismo", "content": "Sistema político e econômico baseado na terra e relações de vassalagem."}, {"title": "Igreja Medieval", "content": "Poder temporal e espiritual da Igreja Católica na Europa medieval."}, {"title": "Cruzadas", "content": "Expedições militares cristãs para reconquistar a Terra Santa."}]}'),
('História', 'História Geral', 'Idade Moderna', 'Período moderno (séc. XV-XVIII) com descobrimentos e absolutismo', 'theory', 'medium', 25, '{"sections": [{"title": "Grandes Navegações", "content": "Expansão marítima europeia e descobrimento da América."}, {"title": "Absolutismo", "content": "Concentração do poder real com Luís XIV como exemplo máximo."}, {"title": "Reforma Protestante", "content": "Movimento religioso que dividiu a cristandade europeia."}]}'),
('História', 'História Geral', 'Revolução Industrial', 'Transformações econômicas e sociais (séc. XVIII-XIX) com mecanização', 'theory', 'hard', 30, '{"sections": [{"title": "Primeira Revolução", "content": "Início na Inglaterra com máquina a vapor e produção têxtil."}, {"title": "Transformações Sociais", "content": "Surgimento da classe operária e burguesia industrial."}, {"title": "Consequências", "content": "Urbanização, poluição e novos movimentos sociais."}]}'),
('História', 'História Geral', 'Guerras Mundiais e Guerra Fria', 'Conflitos do século XX que redefiniram o mundo contemporâneo', 'theory', 'hard', 35, '{"sections": [{"title": "Primeira Guerra Mundial", "content": "Grande Guerra (1914-1918) que devastou a Europa e mudou fronteiras."}, {"title": "Segunda Guerra Mundial", "content": "Conflito global (1939-1945) com nazismo, fascismo e Holocausto."}, {"title": "Guerra Fria", "content": "Tensão entre EUA e URSS (1947-1991) dividindo o mundo em blocos."}]}');

-- Inserir questões para História do Brasil - Brasil Colônia
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História do Brasil', 'Brasil Colônia', 'Qual foi o principal sistema econômico implantado no Brasil durante o período colonial?', '["Capitalismo industrial", "Pacto Colonial", "Socialismo agrário", "Feudalismo tropical"]', 1, 'O Pacto Colonial foi o sistema que regulamentava a relação entre metrópole e colônia, estabelecendo que a colônia só podia comercializar com a metrópole.', 'medium'),
('História', 'História do Brasil', 'Brasil Colônia', 'As Capitanias Hereditárias foram criadas por qual rei português?', '["Dom Pedro I", "Dom João III", "Dom Manuel I", "Dom Sebastião"]', 1, 'Dom João III criou as Capitanias Hereditárias em 1534 como tentativa de colonizar o Brasil através da iniciativa privada.', 'medium');

-- Inserir questões para História do Brasil - Brasil Império  
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História do Brasil', 'Brasil Império', 'Em que ano foi proclamada a Independência do Brasil?', '["1820", "1821", "1822", "1823"]', 2, 'A Independência do Brasil foi proclamada em 7 de setembro de 1822 por Dom Pedro I às margens do Ipiranga.', 'easy'),
('História', 'História do Brasil', 'Brasil Império', 'Qual foi a principal causa da abdicação de Dom Pedro I?', '["Pressão popular", "Guerra do Paraguai", "Crise econômica", "Conflitos políticos internos"]', 3, 'Dom Pedro I abdicou em 1831 devido aos crescentes conflitos políticos internos e perda de apoio das elites brasileiras.', 'medium');

-- Inserir questões para História do Brasil - República Velha
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História do Brasil', 'República Velha', 'A política do "café com leite" se referia à alternância no poder entre quais estados?', '["Rio de Janeiro e Bahia", "São Paulo e Minas Gerais", "São Paulo e Rio Grande do Sul", "Minas Gerais e Rio de Janeiro"]', 1, 'A política do café com leite era a alternância no poder entre as oligarquias de São Paulo (café) e Minas Gerais (leite).', 'medium'),
('História', 'História do Brasil', 'República Velha', 'Qual movimento social ocorreu no sertão da Bahia liderado por Antônio Conselheiro?', '["Contestado", "Canudos", "Cangaço", "Revolta da Vacina"]', 1, 'A Guerra de Canudos (1896-1897) foi um conflito no sertão baiano liderado por Antônio Conselheiro contra as forças republicanas.', 'medium');

-- Inserir questões para História do Brasil - Era Vargas
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História do Brasil', 'Era Vargas', 'O Estado Novo de Getúlio Vargas durou de 1937 até que ano?', '["1943", "1944", "1945", "1946"]', 2, 'O Estado Novo durou de 1937 a 1945, quando Vargas foi deposto pelos militares ao final da Segunda Guerra Mundial.', 'medium'),
('História', 'História do Brasil', 'Era Vargas', 'Qual legislação trabalhista foi criada durante a Era Vargas?', '["Código Civil", "CLT", "Constituição de 1934", "Lei Áurea"]', 1, 'A Consolidação das Leis do Trabalho (CLT) foi criada em 1943, estabelecendo direitos trabalhistas no Brasil.', 'easy');

-- Inserir questões para História do Brasil - Ditadura Militar
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História do Brasil', 'Ditadura Militar', 'O AI-5 foi decretado durante o governo de qual presidente militar?', '["Castelo Branco", "Costa e Silva", "Médici", "Geisel"]', 1, 'O Ato Institucional nº 5 foi decretado em dezembro de 1968 durante o governo do general Costa e Silva.', 'medium'),
('História', 'História do Brasil', 'Ditadura Militar', 'Qual movimento estudantil marcou o ano de 1968 no Brasil?', '["Passeata dos Cem Mil", "Diretas Já", "Caras Pintadas", "UNE"]', 0, 'A Passeata dos Cem Mil foi uma manifestação estudantil no Rio de Janeiro em junho de 1968 contra a ditadura militar.', 'medium');

-- Inserir questões para História do Brasil - Nova República
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História do Brasil', 'Nova República', 'A Constituição brasileira atual foi promulgada em que ano?', '["1985", "1986", "1988", "1989"]', 2, 'A Constituição Federal foi promulgada em 5 de outubro de 1988, sendo conhecida como "Constituição Cidadã".', 'easy'),
('História', 'História do Brasil', 'Nova República', 'Qual plano econômico conseguiu controlar a hiperinflação no Brasil?', '["Plano Collor", "Plano Real", "Plano Bresser", "Plano Verão"]', 1, 'O Plano Real, implementado em 1994 no governo Itamar Franco, conseguiu controlar definitivamente a hiperinflação brasileira.', 'medium');

-- Inserir questões para História Geral - Antiguidade Clássica
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História Geral', 'Antiguidade Clássica', 'Qual cidade-estado grega é considerada o berço da democracia?', '["Esparta", "Atenas", "Tebas", "Corinto"]', 1, 'Atenas desenvolveu a democracia direta no século V a.C., onde os cidadãos participavam diretamente das decisões políticas.', 'easy'),
('História', 'História Geral', 'Antiguidade Clássica', 'O Império Romano foi dividido em duas partes por qual imperador?', '["Júlio César", "Augusto", "Teodósio", "Constantino"]', 2, 'O imperador Teodósio dividiu o Império Romano em 395 d.C. entre seus filhos, criando o Império Romano do Ocidente e do Oriente.', 'medium');

-- Inserir questões para História Geral - Idade Média
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História Geral', 'Idade Média', 'O feudalismo baseava-se principalmente em qual tipo de economia?', '["Comercial", "Industrial", "Agrária", "Financeira"]', 2, 'O feudalismo baseava-se numa economia agrária de subsistência, onde a terra era a principal fonte de riqueza e poder.', 'easy'),
('História', 'História Geral', 'Idade Média', 'As Cruzadas foram expedições militares organizadas principalmente pela:', '["Igreja Católica", "Império Bizantino", "Reino da França", "Sacro Império"]', 0, 'As Cruzadas foram expedições militares organizadas pela Igreja Católica para reconquistar a Terra Santa dos muçulmanos.', 'medium');

-- Inserir questões para História Geral - Idade Moderna
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História Geral', 'Idade Moderna', 'Qual navegador português chegou ao Brasil em 1500?', '["Vasco da Gama", "Pedro Álvares Cabral", "Bartolomeu Dias", "Fernando de Magalhães"]', 1, 'Pedro Álvares Cabral chegou ao Brasil em 22 de abril de 1500, oficialmente "descobrindo" as terras brasileiras para Portugal.', 'easy'),
('História', 'História Geral', 'Idade Moderna', 'A Reforma Protestante foi iniciada por:', '["João Calvino", "Henrique VIII", "Martinho Lutero", "Ulrico Zuínglio"]', 2, 'Martinho Lutero iniciou a Reforma Protestante em 1517 ao questionar práticas da Igreja Católica com suas 95 teses.', 'medium');

-- Inserir questões para História Geral - Revolução Industrial
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História Geral', 'Revolução Industrial', 'A Primeira Revolução Industrial teve início em qual país?', '["França", "Alemanha", "Inglaterra", "Estados Unidos"]', 2, 'A Primeira Revolução Industrial começou na Inglaterra no século XVIII, impulsionada pela máquina a vapor e indústria têxtil.', 'easy'),
('História', 'História Geral', 'Revolução Industrial', 'Qual foi uma das principais consequências sociais da Revolução Industrial?', '["Fim da escravidão", "Surgimento da classe operária", "Abolição da monarquia", "Criação das universidades"]', 1, 'A Revolução Industrial levou ao surgimento da classe operária urbana, que trabalhava nas fábricas em condições precárias.', 'medium');

-- Inserir questões para História Geral - Guerras Mundiais e Guerra Fria
INSERT INTO public.subject_questions (subject, grande_tema, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('História', 'História Geral', 'Guerras Mundiais e Guerra Fria', 'A Primeira Guerra Mundial ocorreu entre quais anos?', '["1912-1916", "1914-1918", "1916-1920", "1918-1922"]', 1, 'A Primeira Guerra Mundial ocorreu de 1914 a 1918, sendo conhecida inicialmente como "A Grande Guerra".', 'easy'),
('História', 'História Geral', 'Guerras Mundiais e Guerra Fria', 'Qual evento marcou o início da Guerra Fria?', '["Bomba de Hiroshima", "Plano Marshall", "Discurso de Churchill", "Doutrina Truman"]', 3, 'A Doutrina Truman (1947) marcou oficialmente o início da Guerra Fria ao estabelecer a política de contenção ao comunismo.', 'hard');