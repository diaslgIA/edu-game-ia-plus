
-- Inserir conteúdos para matérias que estão faltando
INSERT INTO public.subject_contents (subject, title, description, content_type, difficulty_level, estimated_time, order_index, content_data) VALUES

-- Inglês
('Inglês', 'Basic Grammar', 'Fundamentos da gramática inglesa', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Present Tense", "content": "The present tense is used to describe actions happening now or habitual actions."}, {"title": "Articles", "content": "A, an, and the are articles used before nouns in English."}]}'),
('Inglês', 'Vocabulary Building', 'Construção de vocabulário essencial', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Common Words", "content": "Learning the most frequently used English words helps build a strong foundation."}, {"title": "Word Families", "content": "Understanding word families helps you learn multiple related words efficiently."}]}'),
('Inglês', 'Reading Comprehension', 'Compreensão de textos em inglês', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Reading Strategies", "content": "Skimming and scanning are essential reading techniques for better comprehension."}, {"title": "Context Clues", "content": "Use context clues to understand the meaning of unknown words."}]}'),

-- Espanhol
('Espanhol', 'Gramática Básica', 'Fundamentos da gramática espanhola', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Artículos", "content": "Los artículos en español son: el, la, los, las, un, una, unos, unas."}, {"title": "Verbos Regulares", "content": "Los verbos regulares siguen patrones predecibles de conjugación."}]}'),
('Espanhol', 'Vocabulario Esencial', 'Vocabulário básico em espanhol', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Familia y Casa", "content": "Vocabulario relacionado con la familia y las partes de la casa."}, {"title": "Comida y Bebida", "content": "Palabras esenciales sobre alimentos y bebidas en español."}]}'),
('Espanhol', 'Conversación', 'Técnicas de conversação em espanhol', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Saludos", "content": "Formas formales e informales de saludar en español."}, {"title": "Expresiones Cotidianas", "content": "Frases útiles para conversaciones del día a día."}]}'),

-- Literatura
('Literatura', 'Literatura Clássica', 'Grandes obras da literatura mundial', 'theory', 'medium', 25, 1, '{"slides": [{"title": "Épocas Literárias", "content": "Principais períodos da literatura: Classicismo, Romantismo, Realismo, Modernismo."}, {"title": "Gêneros Literários", "content": "Épico, lírico e dramático são os três gêneros fundamentais da literatura."}]}'),
('Literatura', 'Análise Literária', 'Técnicas de análise de textos literários', 'theory', 'hard', 30, 2, '{"slides": [{"title": "Figuras de Linguagem", "content": "Metáfora, metonímia, hipérbole e outras figuras enriquecem o texto literário."}, {"title": "Estrutura Narrativa", "content": "Enredo, personagens, tempo, espaço e narrador são elementos da narrativa."}]}'),
('Literatura', 'Literatura Brasileira', 'Evolução da literatura no Brasil', 'theory', 'medium', 35, 3, '{"slides": [{"title": "Barroco", "content": "Gregório de Matos e Padre Antônio Vieira são grandes nomes do Barroco brasileiro."}, {"title": "Modernismo", "content": "A Semana de Arte Moderna de 1922 revolucionou a literatura brasileira."}]}'),

-- Redação
('Redação', 'Estrutura Textual', 'Como organizar um texto', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Introdução", "content": "A introdução apresenta o tema e desperta o interesse do leitor."}, {"title": "Desenvolvimento", "content": "O desenvolvimento expõe os argumentos e ideias principais do texto."}]}'),
('Redação', 'Tipos de Texto', 'Diferentes modalidades textuais', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Dissertação", "content": "Texto argumentativo que defende uma tese com base em argumentos sólidos."}, {"title": "Narração", "content": "Texto que conta uma história com personagens, enredo e desfecho."}]}'),
('Redação', 'Técnicas de Argumentação', 'Como construir argumentos eficazes', 'theory', 'hard', 30, 3, '{"slides": [{"title": "Dados e Estatísticas", "content": "Uso de dados concretos para fortalecer a argumentação."}, {"title": "Exemplificação", "content": "Exemplos ajudam a esclarecer e comprovar os argumentos apresentados."}]}'),

-- Geografia
('Geografia', 'Geografia Física', 'Aspectos naturais do planeta', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Relevo", "content": "Montanhas, planícies, planaltos e depressões formam o relevo terrestre."}, {"title": "Clima", "content": "Fatores como latitude, altitude e maritimidade influenciam o clima."}]}'),
('Geografia', 'Geografia Humana', 'População e sociedade', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Demografia", "content": "Estudo da população: crescimento, distribuição e características."}, {"title": "Urbanização", "content": "Processo de crescimento das cidades e migração rural-urbana."}]}'),
('Geografia', 'Geopolítica', 'Relações políticas e territoriais', 'theory', 'hard', 30, 3, '{"slides": [{"title": "Blocos Econômicos", "content": "União Europeia, MERCOSUL e outros blocos de integração econômica."}, {"title": "Conflitos Territoriais", "content": "Disputas por território, recursos e fronteiras ao redor do mundo."}]}'),

-- Filosofia
('Filosofia', 'História da Filosofia', 'Evolução do pensamento filosófico', 'theory', 'medium', 25, 1, '{"slides": [{"title": "Filosofia Antiga", "content": "Sócrates, Platão e Aristóteles fundaram as bases do pensamento ocidental."}, {"title": "Filosofia Medieval", "content": "Santo Agostinho e São Tomás de Aquino conciliaram fé e razão."}]}'),
('Filosofia', 'Ética e Moral', 'Princípios do comportamento humano', 'theory', 'medium', 30, 2, '{"slides": [{"title": "Dilemas Éticos", "content": "Situações que exigem reflexão sobre o certo e o errado."}, {"title": "Teorias Éticas", "content": "Utilitarismo, deontologia e ética das virtudes são principais correntes."}]}'),
('Filosofia', 'Filosofia Política', 'Reflexões sobre poder e sociedade', 'theory', 'hard', 35, 3, '{"slides": [{"title": "Contrato Social", "content": "Hobbes, Locke e Rousseau teorizaram sobre a origem do Estado."}, {"title": "Democracia", "content": "Formas de participação política e representação democrática."}]}'),

-- Sociologia
('Sociologia', 'Fundamentos da Sociologia', 'Bases da ciência social', 'theory', 'easy', 20, 1, '{"slides": [{"title": "Fato Social", "content": "Émile Durkheim definiu fato social como fenômeno coletivo e coercitivo."}, {"title": "Ação Social", "content": "Max Weber estudou as motivações e significados das ações humanas."}]}'),
('Sociologia', 'Estrutura Social', 'Organização da sociedade', 'theory', 'medium', 25, 2, '{"slides": [{"title": "Classes Sociais", "content": "Divisão da sociedade baseada em critérios econômicos e sociais."}, {"title": "Estratificação", "content": "Hierarquização social baseada em poder, prestígio e riqueza."}]}'),
('Sociologia', 'Movimentos Sociais', 'Transformações e mudanças sociais', 'theory', 'medium', 30, 3, '{"slides": [{"title": "Movimentos de Direitos", "content": "Lutas por direitos civis, trabalhistas e sociais ao longo da história."}, {"title": "Globalização", "content": "Processo de integração mundial e seus impactos sociais."}]}');

-- Inserir questões de quiz para todas as matérias
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level) VALUES

-- Inglês
('Inglês', 'Grammar', 'What is the correct form of the verb "to be" for "I"?', '["am", "is", "are", "be"]', 0, 'The correct form is "I am". The verb "to be" conjugates as: I am, you are, he/she/it is.', 'easy'),
('Inglês', 'Vocabulary', 'What does "beautiful" mean?', '["Feio", "Bonito", "Grande", "Pequeno"]', 1, '"Beautiful" means "bonito" in Portuguese. It describes something attractive or pleasing.', 'easy'),
('Inglês', 'Reading', 'What is the main idea in a text?', '["The title", "The central message", "The first sentence", "The conclusion"]', 1, 'The main idea is the central message or theme that the author wants to convey throughout the text.', 'medium'),
('Inglês', 'Grammar', 'Which is the past tense of "go"?', '["goed", "went", "going", "goes"]', 1, 'The past tense of "go" is "went". This is an irregular verb that doesn\'t follow standard patterns.', 'medium'),
('Inglês', 'Vocabulary', 'What is a synonym for "happy"?', '["Sad", "Angry", "Joyful", "Tired"]', 2, 'A synonym for "happy" is "joyful". Both words express positive emotions and contentment.', 'easy'),

-- Espanhol
('Espanhol', 'Gramática', '¿Cuál es el artículo definido masculino singular?', '["la", "el", "los", "las"]', 1, 'El artículo definido masculino singular es "el". Se usa antes de sustantivos masculinos singulares.', 'easy'),
('Espanhol', 'Vocabulario', '¿Cómo se dice "casa" en español?', '["house", "casa", "hogar", "todas"]', 1, '"Casa" se dice "casa" en español. Es una palabra que se mantiene igual.', 'easy'),
('Espanhol', 'Verbos', '¿Cuál es la conjugación de "hablar" para "yo"?', '["hablas", "habla", "hablo", "hablan"]', 2, 'La conjugación de "hablar" para "yo" es "hablo". Los verbos en -ar terminan en -o para la primera persona.', 'medium'),
('Espanhol', 'Cultura', '¿En qué continente está España?', '["Asia", "África", "Europa", "América"]', 2, 'España está en Europa. Es un país localizado en la Península Ibérica, en el sudoeste europeo.', 'easy'),
('Espanhol', 'Gramática', '¿Cuál es el plural de "libro"?', '["libros", "libres", "libras", "libritos"]', 0, 'El plural de "libro" es "libros". Se forma añadiendo -s a los sustantivos terminados en vocal.', 'medium'),

-- Literatura
('Literatura', 'Gêneros', 'O que caracteriza o gênero épico?', '["Subjetividade", "Narrativa heroica", "Diálogo teatral", "Lirismo"]', 1, 'O gênero épico caracteriza-se pela narrativa heroica, contando feitos grandiosos de heróis ou povos.', 'medium'),
('Literatura', 'Figuras', 'O que é uma metáfora?', '["Comparação com "como"", "Comparação direta", "Exagero", "Repetição"]', 1, 'Metáfora é uma comparação implícita, direta, sem uso de conectivos como "como" ou "tal qual".', 'medium'),
('Literatura', 'Movimentos', 'Quando ocorreu o Romantismo no Brasil?', '["Século XVII", "Século XVIII", "Século XIX", "Século XX"]', 2, 'O Romantismo brasileiro ocorreu no século XIX, tendo início em 1836 com "Suspiros Poéticos" de Gonçalves de Magalhães.', 'hard'),
('Literatura', 'Autores', 'Quem escreveu "O Guarani"?', '["Machado de Assis", "José de Alencar", "Castro Alves", "Gonçalves Dias"]', 1, 'José de Alencar escreveu "O Guarani", romance indianista que retrata a relação entre índios e colonizadores.', 'medium'),
('Literatura', 'Análise', 'O que é o clímax de uma narrativa?', '["Início da história", "Momento de maior tensão", "Final da história", "Apresentação dos personagens"]', 1, 'O clímax é o momento de maior tensão da narrativa, onde o conflito atinge seu ponto máximo.', 'easy'),

-- Redação
('Redação', 'Estrutura', 'Quantos parágrafos deve ter uma dissertação?', '["2", "3", "4 ou 5", "Não importa"]', 2, 'Uma dissertação deve ter entre 4 e 5 parágrafos: introdução, 2-3 de desenvolvimento e conclusão.', 'medium'),
('Redação', 'Argumentação', 'O que é uma tese?', '["Exemplo", "Opinião defendida", "Conclusão", "Pergunta"]', 1, 'A tese é a opinião ou ponto de vista que será defendido ao longo da dissertação argumentativa.', 'easy'),
('Redação', 'Coesão', 'Para que servem os conectivos?', '["Decorar o texto", "Ligar ideias", "Contar palavras", "Fazer rimas"]', 1, 'Os conectivos servem para ligar ideias e dar coesão ao texto, criando relações lógicas entre as partes.', 'medium'),
('Redação', 'Tipos', 'O que caracteriza um texto narrativo?', '["Opinião", "Sequência de fatos", "Descrição", "Argumentos"]', 1, 'O texto narrativo caracteriza-se pela sequência de fatos organizados no tempo, contando uma história.', 'easy'),
('Redação', 'Conclusão', 'Como deve ser a conclusão de uma dissertação?', '["Repetir a introdução", "Apresentar nova tese", "Retomar e propor solução", "Fazer perguntas"]', 2, 'A conclusão deve retomar a tese defendida e propor soluções ou reflexões sobre o tema abordado.', 'medium'),

-- Geografia
('Geografia', 'Cartografia', 'O que é latitude?', '["Distância ao Equador", "Distância ao meridiano", "Altitude do relevo", "Profundidade oceânica"]', 0, 'Latitude é a distância em graus de qualquer ponto da Terra em relação à linha do Equador.', 'medium'),
('Geografia', 'Clima', 'Qual fator NÃO influencia o clima?', '["Latitude", "Altitude", "Maritimidade", "Idioma local"]', 3, 'O idioma local não influencia o clima. Os fatores climáticos são latitude, altitude, maritimidade, relevo, etc.', 'easy'),
('Geografia', 'População', 'O que é densidade demográfica?', '["Total de habitantes", "Habitantes por km²", "Taxa de natalidade", "Expectativa de vida"]', 1, 'Densidade demográfica é o número de habitantes por quilômetro quadrado em uma determinada área.', 'medium'),
('Geografia', 'Relevo', 'Qual é a maior cadeia montanhosa do mundo?', '["Alpes", "Andes", "Himalaia", "Apalaches"]', 2, 'O Himalaia é a maior cadeia montanhosa do mundo, localizada na Ásia, onde está o Monte Everest.', 'medium'),
('Geografia', 'Hidrografia', 'Qual é o maior rio do mundo em volume?', '["Nilo", "Amazonas", "Yangtzé", "Mississippi"]', 1, 'O Rio Amazonas é o maior do mundo em volume de água, localizado na América do Sul.', 'easy'),

-- Filosofia
('Filosofia', 'Antiga', 'Quem foi o mestre de Aristóteles?', '["Sócrates", "Platão", "Tales", "Pitágoras"]', 1, 'Platão foi o mestre de Aristóteles. A sequência é: Sócrates → Platão → Aristóteles.', 'medium'),
('Filosofia', 'Ética', 'O que estuda a ética?', '["A natureza", "O comportamento moral", "As leis", "A matemática"]', 1, 'A ética estuda o comportamento moral, analisando o que é certo e errado nas ações humanas.', 'easy'),
('Filosofia', 'Política', 'Quem escreveu "O Príncipe"?', '["Maquiavel", "Hobbes", "Locke", "Rousseau"]', 0, 'Nicolau Maquiavel escreveu "O Príncipe", obra fundamental da filosofia política moderna.', 'medium'),
('Filosofia', 'Conhecimento', 'O que é epistemologia?', '["Estudo do ser", "Estudo do conhecimento", "Estudo da beleza", "Estudo da linguagem"]', 1, 'Epistemologia é o ramo da filosofia que estuda o conhecimento, sua origem e validade.', 'hard'),
('Filosofia', 'Moderna', 'Qual frase é de Descartes?', '["Sei que nada sei", "Penso, logo existo", "O homem é bom", "Tudo flui"]', 1, '"Penso, logo existo" (Cogito ergo sum) é a famosa frase de René Descartes.', 'medium'),

-- Sociologia
('Sociologia', 'Fundadores', 'Quem é considerado o fundador da Sociologia?', '["Max Weber", "Auguste Comte", "Karl Marx", "Émile Durkheim"]', 1, 'Auguste Comte é considerado o fundador da Sociologia, tendo criado o termo e sistematizado a disciplina.', 'medium'),
('Sociologia', 'Conceitos', 'O que é fato social segundo Durkheim?', '["Ação individual", "Fenômeno coletivo", "Lei natural", "Comportamento animal"]', 1, 'Para Durkheim, fato social é um fenômeno coletivo, exterior ao indivíduo e dotado de poder coercitivo.', 'hard'),
('Sociologia', 'Estratificação', 'O que determina a classe social?', '["Apenas renda", "Apenas educação", "Fatores múltiplos", "Apenas profissão"]', 2, 'A classe social é determinada por múltiplos fatores: renda, educação, ocupação, prestígio social, etc.', 'medium'),
('Sociologia', 'Mudança', 'O que são movimentos sociais?', '["Partidos políticos", "Ações coletivas", "Leis governamentais", "Teorias acadêmicas"]', 1, 'Movimentos sociais são ações coletivas que buscam mudanças sociais, políticas ou culturais.', 'easy'),
('Sociologia', 'Weber', 'O que Weber estudou principalmente?', '["Economia apenas", "Ação social", "Biologia", "Física social"]', 1, 'Max Weber estudou principalmente a ação social, analisando os significados das ações humanas.', 'medium');
