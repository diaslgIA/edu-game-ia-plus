
-- Inserir conteúdos teóricos para todas as matérias
INSERT INTO public.subject_contents (subject, title, description, content_type, difficulty_level, estimated_time, order_index, content_data) VALUES

-- Matemática
('Matemática', 'Números e Operações', 'Fundamentos dos números naturais, inteiros e racionais', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Números Naturais", "content": "Os números naturais são os números que usamos para contar: 1, 2, 3, 4, 5..."}, {"title": "Operações Básicas", "content": "Adição, subtração, multiplicação e divisão são as operações fundamentais"}]}'),
('Matemática', 'Álgebra Básica', 'Introdução às equações e expressões algébricas', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Variáveis", "content": "Uma variável é um símbolo que representa um número desconhecido"}, {"title": "Equações", "content": "Uma equação é uma igualdade que contém uma ou mais variáveis"}]}'),
('Matemática', 'Geometria Plana', 'Figuras geométricas e suas propriedades', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Triângulos", "content": "Triângulos são polígonos de três lados"}, {"title": "Quadriláteros", "content": "Quadriláteros são polígonos de quatro lados"}]}'),

-- Português
('Português', 'Gramática Básica', 'Classes de palavras e estrutura da língua', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Substantivos", "content": "Substantivos são palavras que nomeiam seres, objetos, lugares"}, {"title": "Adjetivos", "content": "Adjetivos são palavras que caracterizam os substantivos"}]}'),
('Português', 'Literatura Brasileira', 'Principais movimentos literários do Brasil', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Romantismo", "content": "O Romantismo foi um movimento literário do século XIX"}, {"title": "Realismo", "content": "O Realismo retratava a sociedade de forma crítica"}]}'),
('Português', 'Interpretação de Textos', 'Técnicas de leitura e compreensão textual', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Leitura Crítica", "content": "A leitura crítica envolve análise e interpretação"}, {"title": "Tipos de Texto", "content": "Narrativo, descritivo, dissertativo e injuntivo"}]}'),

-- Física
('Física', 'Mecânica Clássica', 'Movimento dos corpos e forças', 'theory', 'medium', 25, 1, '{"slides": [{"title": "Cinemática", "content": "Estudo do movimento sem considerar suas causas"}, {"title": "Dinâmica", "content": "Estudo das forças e suas relações com o movimento"}]}'),
('Física', 'Termodinâmica', 'Calor, temperatura e energia térmica', 'theory', 'hard', 30, 2, '{"slides": [{"title": "Temperatura", "content": "Medida do grau de agitação das moléculas"}, {"title": "Calor", "content": "Transferência de energia térmica entre corpos"}]}'),
('Física', 'Eletromagnetismo', 'Fenômenos elétricos e magnéticos', 'theory', 'hard', 35, 3, '{"slides": [{"title": "Corrente Elétrica", "content": "Movimento ordenado de cargas elétricas"}, {"title": "Campo Magnético", "content": "Região onde se manifestam forças magnéticas"}]}'),

-- Química
('Química', 'Átomos e Moléculas', 'Estrutura da matéria', 'theory', 'medium', 25, 1, '{"slides": [{"title": "Estrutura Atômica", "content": "O átomo é formado por prótons, nêutrons e elétrons"}, {"title": "Ligações Químicas", "content": "Como os átomos se unem para formar moléculas"}]}'),
('Química', 'Reações Químicas', 'Transformações da matéria', 'theory', 'medium', 30, 2, '{"slides": [{"title": "Tipos de Reações", "content": "Síntese, decomposição, simples e dupla troca"}, {"title": "Balanceamento", "content": "Lei da conservação das massas"}]}'),
('Química', 'Química Orgânica', 'Compostos do carbono', 'theory', 'hard', 35, 3, '{"slides": [{"title": "Hidrocarbonetos", "content": "Compostos formados apenas por carbono e hidrogênio"}, {"title": "Grupos Funcionais", "content": "Álcoois, aldeídos, cetonas e ácidos"}]}'),

-- Biologia
('Biologia', 'Células e Tecidos', 'Unidades básicas da vida', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Célula Procariótica", "content": "Células sem núcleo organizado"}, {"title": "Célula Eucariótica", "content": "Células com núcleo organizado"}]}'),
('Biologia', 'Genética Básica', 'Hereditariedade e variação', 'theory', 'medium', 25, 2, '{"slides": [{"title": "DNA e RNA", "content": "Ácidos nucleicos que carregam informações genéticas"}, {"title": "Leis de Mendel", "content": "Princípios básicos da hereditariedade"}]}'),
('Biologia', 'Ecologia', 'Relações entre organismos e ambiente', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Ecossistemas", "content": "Conjunto de seres vivos e meio ambiente"}, {"title": "Cadeia Alimentar", "content": "Transferência de energia entre organismos"}]}'),

-- História
('História', 'História Antiga', 'Civilizações da Antiguidade', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Egito Antigo", "content": "Civilização às margens do Rio Nilo"}, {"title": "Grécia Antiga", "content": "Berço da democracia e filosofia"}]}'),
('História', 'Idade Média', 'Período entre a Antiguidade e Modernidade', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Feudalismo", "content": "Sistema político e econômico medieval"}, {"title": "Igreja Medieval", "content": "Poder religioso na Idade Média"}]}'),
('História', 'História do Brasil', 'Formação e desenvolvimento do Brasil', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Colonização", "content": "Período colonial brasileiro (1500-1822)"}, {"title": "Independência", "content": "Processo de independência do Brasil"}]}');

-- Inserir questões de quiz para todas as matérias
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level) VALUES

-- Matemática
('Matemática', 'Números', 'Qual é o resultado de 15 + 8?', '["20", "23", "25", "28"]', 1, 'A soma de 15 + 8 = 23. Somamos unidade com unidade: 5 + 8 = 13 (3 na unidade e 1 vai para dezena). Dezenas: 1 + 0 + 1 = 2.', 'easy'),
('Matemática', 'Álgebra', 'Se x + 5 = 12, qual é o valor de x?', '["5", "7", "8", "10"]', 1, 'Para resolver x + 5 = 12, subtraímos 5 de ambos os lados: x = 12 - 5 = 7.', 'medium'),
('Matemática', 'Geometria', 'Qual é a área de um quadrado com lado de 4 cm?', '["8 cm²", "12 cm²", "16 cm²", "20 cm²"]', 2, 'A área do quadrado é lado × lado = 4 × 4 = 16 cm².', 'medium'),
('Matemática', 'Frações', 'Quanto é 1/2 + 1/4?', '["1/6", "2/6", "3/4", "5/8"]', 2, 'Para somar frações, precisamos do mesmo denominador: 1/2 = 2/4. Então 2/4 + 1/4 = 3/4.', 'medium'),
('Matemática', 'Porcentagem', 'Quanto é 25% de 80?', '["15", "20", "25", "30"]', 1, '25% de 80 = 25/100 × 80 = 0,25 × 80 = 20.', 'easy'),

-- Português
('Português', 'Gramática', 'Qual classe de palavra é bonito?', '["Substantivo", "Adjetivo", "Verbo", "Advérbio"]', 1, 'A palavra bonito é um adjetivo, pois caracteriza ou qualifica um substantivo.', 'easy'),
('Português', 'Literatura', 'Quem escreveu O Cortiço?', '["Machado de Assis", "Aluísio Azevedo", "José de Alencar", "Eça de Queirós"]', 1, 'Aluísio Azevedo é o autor de O Cortiço, obra importante do Naturalismo brasileiro.', 'medium'),
('Português', 'Sintaxe', 'Na frase O menino correu, qual é o sujeito?', '["correu", "O menino", "menino", "Não há sujeito"]', 1, 'O sujeito da frase é O menino, pois é quem pratica a ação de correr.', 'easy'),
('Português', 'Interpretação', 'O que significa a expressão tempestade em copo de agua?', '["Grande chuva", "Problema sem importância", "Recipiente quebrado", "Fenômeno natural"]', 1, 'A expressão significa dar grande importância a algo insignificante ou criar confusão por pouca coisa.', 'medium'),
('Português', 'Ortografia', 'Qual a grafia correta?', '["Excessão", "Exceção", "Eceção", "Excesão"]', 1, 'A grafia correta é exceção, com x e ç.', 'easy'),

-- Física
('Física', 'Mecânica', 'Qual é a unidade de medida da força no SI?', '["Joule", "Watt", "Newton", "Pascal"]', 2, 'A unidade de força no Sistema Internacional é o Newton (N), em homenagem a Isaac Newton.', 'easy'),
('Física', 'Cinemática', 'Se um carro percorre 100 km em 2 horas, qual sua velocidade média?', '["40 km/h", "50 km/h", "60 km/h", "80 km/h"]', 1, 'Velocidade média = distância/tempo = 100 km / 2 h = 50 km/h.', 'easy'),
('Física', 'Termodinâmica', 'Em que temperatura a água ferve ao nível do mar?', '["90°C", "95°C", "100°C", "105°C"]', 2, 'A água ferve a 100°C (373 K) ao nível do mar, sob pressão atmosférica normal.', 'easy'),
('Física', 'Eletricidade', 'Qual lei relaciona tensão, corrente e resistência?', '["Lei de Newton", "Lei de Ohm", "Lei de Faraday", "Lei de Coulomb"]', 1, 'A Lei de Ohm estabelece que V = R × I, relacionando tensão, resistência e corrente.', 'medium'),
('Física', 'Óptica', 'O que acontece com a luz branca ao passar por um prisma?', '["É absorvida", "Se decompõe em cores", "Fica mais intensa", "Muda de velocidade"]', 1, 'A luz branca se decompõe nas cores do espectro visível devido à dispersão no prisma.', 'medium'),

-- Química
('Química', 'Estrutura Atômica', 'Quantos prótons tem o elemento carbono?', '["4", "6", "8", "12"]', 1, 'O carbono tem número atômico 6, portanto possui 6 prótons no núcleo.', 'easy'),
('Química', 'Tabela Periódica', 'Qual é o símbolo químico do ouro?', '["Go", "Au", "Or", "Ag"]', 1, 'O símbolo do ouro é Au, do latim aurum.', 'easy'),
('Química', 'Ligações Químicas', 'Que tipo de ligação existe no NaCl?', '["Covalente", "Iônica", "Metálica", "Dipolo"]', 1, 'O NaCl (cloreto de sódio) possui ligação iônica entre o metal sódio e o não-metal cloro.', 'medium'),
('Química', 'Reações', 'O que é uma reação de combustão?', '["Quebra de moléculas", "Reação com oxigênio", "Mudança de estado", "Dissolução"]', 1, 'Combustão é uma reação química com oxigênio que libera energia na forma de calor e luz.', 'medium'),
('Química', 'pH', 'Uma solução com pH 7 é:', '["Ácida", "Básica", "Neutra", "Salina"]', 2, 'pH 7 indica uma solução neutra, nem ácida nem básica.', 'easy'),

-- Biologia
('Biologia', 'Citologia', 'Qual organela é responsável pela respiração celular?', '["Núcleo", "Mitocôndria", "Ribossomo", "Vacúolo"]', 1, 'A mitocôndria é responsável pela respiração celular e produção de energia (ATP).', 'medium'),
('Biologia', 'Genética', 'Quantos cromossomos tem uma célula humana normal?', '["23", "44", "46", "48"]', 2, 'Células humanas normais possuem 46 cromossomos (23 pares).', 'easy'),
('Biologia', 'Evolução', 'Quem propôs a teoria da evolução por seleção natural?', '["Mendel", "Darwin", "Lamarck", "Watson"]', 1, 'Charles Darwin propôs a teoria da evolução por seleção natural.', 'easy'),
('Biologia', 'Ecologia', 'O que são seres autotróficos?', '["Que se alimentam de outros", "Que produzem próprio alimento", "Que vivem em grupos", "Que se reproduzem assexuadamente"]', 1, 'Seres autotróficos produzem seu próprio alimento, como as plantas através da fotossíntese.', 'medium'),
('Biologia', 'Anatomia', 'Qual órgão produz a insulina?', '["Fígado", "Pâncreas", "Rim", "Estômago"]', 1, 'O pâncreas produz a insulina, hormônio que regula os níveis de glicose no sangue.', 'medium'),

-- História
('História', 'História Antiga', 'Em que país se desenvolveu a civilização egípcia?', '["Iraque", "Egito", "Grécia", "Itália"]', 1, 'A civilização egípcia desenvolveu-se no Egito, às margens do Rio Nilo.', 'easy'),
('História', 'Idade Média', 'O que caracterizava o sistema feudal?', '["Comércio intenso", "Poder descentralizado", "Democracia", "Industrialização"]', 1, 'O feudalismo caracterizava-se pelo poder político descentralizado em feudos.', 'medium'),
('História', 'Brasil Colonial', 'Em que ano o Brasil foi descoberto?', '["1498", "1500", "1502", "1505"]', 1, 'O Brasil foi descoberto pelos portugueses em 1500, com a chegada de Pedro Álvares Cabral.', 'easy'),
('História', 'Idade Moderna', 'O que foram as Grandes Navegações?', '["Guerras religiosas", "Expedições marítimas", "Movimentos artísticos", "Reformas políticas"]', 1, 'As Grandes Navegações foram expedições marítimas dos séculos XV e XVI para explorar novos territórios.', 'medium'),
('História', 'Brasil Império', 'Quem foi o primeiro imperador do Brasil?', '["Dom Pedro I", "Dom Pedro II", "Dom João VI", "Getúlio Vargas"]', 0, 'Dom Pedro I foi o primeiro imperador do Brasil (1822-1831).', 'easy');
