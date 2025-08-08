
-- 1) Padronização dos nomes de matérias (precisam bater com Exercises.tsx)
UPDATE public.subject_questions SET subject = 'Matemática' WHERE lower(subject) IN ('matematica');
UPDATE public.subject_questions SET subject = 'Física'     WHERE lower(subject) IN ('fisica');
UPDATE public.subject_questions SET subject = 'Química'    WHERE lower(subject) IN ('quimica');
UPDATE public.subject_questions SET subject = 'Biologia'   WHERE lower(subject) IN ('biologia');
UPDATE public.subject_questions SET subject = 'História'   WHERE lower(subject) IN ('historia');
UPDATE public.subject_questions SET subject = 'Geografia'  WHERE lower(subject) IN ('geografia');
UPDATE public.subject_questions SET subject = 'Filosofia'  WHERE lower(subject) IN ('filosofia');
UPDATE public.subject_questions SET subject = 'Sociologia' WHERE lower(subject) IN ('sociologia');
UPDATE public.subject_questions SET subject = 'Português'  WHERE lower(subject) IN ('portugues');

-- Mover conteúdo combinado para disciplina nova
UPDATE public.subject_questions
SET subject = 'Literatura'
WHERE subject IN ('Português e Literatura', 'Portugues e Literatura');

-- Opcional: marcar todas as questões existentes como hard (se desejar reforço de dificuldade visual)
-- UPDATE public.subject_questions SET difficulty_level = 'hard';

-- 2) Inserções de novas questões “Difíceis” para completar pelo menos 10 por matéria

-- 2.1 Inglês (existem 2; inserir +8)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Inglês','Condicional','Had I known you were coming, I ____ a cake.',
'["would have baked","will bake","would bake","baked"]'::jsonb,0,'Third conditional: If + past perfect, would have + past participle.','hard'),
('Inglês','Reported Speech','Choose the correct reported speech: She said, “I am studying.”',
'["She said she was studying.","She says she is studying.","She told she was studying.","She said that she has been studying."]'::jsonb,0,'Backshift to past continuous after a past reporting verb.','hard'),
('Inglês','Prepositions','Choose the best option: The solution is ____ the scope of this course.',
'["beyond","among","between","under"]'::jsonb,0,'“Beyond the scope” is the correct collocation.','hard'),
('Inglês','Advanced Vocabulary','Which word best completes: The scientist offered a ____ explanation for the anomaly.',
'["plausible","fancy","random","casual"]'::jsonb,0,'“Plausible” fits the formal/academic tone.','hard'),
('Inglês','Inversions','Choose the correct inversion: Rarely ____ such precision.',
'["have we seen","we have seen","did we see","we did see"]'::jsonb,0,'Adverbial negative fronting uses auxiliary before subject.','hard'),
('Inglês','Mixed Conditionals','If he ____ more careful, he wouldn’t be facing this issue now.',
'["had been","were","is","would be"]'::jsonb,0,'Mixed: past perfect + present result.','hard'),
('Inglês','Collocations','Choose the best collocation: She ____ the data to support her claim.',
'["marshaled","cooked","played","threw"]'::jsonb,0,'“Marshal (or marshalled) the data” is formal, appropriate.','hard'),
('Inglês','Cleft Sentences','Choose the best: ____ that convinced the committee was her methodology.',
'["What","That","Which","Whom"]'::jsonb,0,'Cleft sentence with “What … was …”.','hard');

-- 2.2 Espanhol (existem 0; inserir +10)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Espanhol','Subjuntivo','Elige la opción correcta: Si yo ____ más tiempo, viajaría por América Latina.',
'["tuviera","tuve","tengo","tendría"]'::jsonb,0,'Condicional hipotético usa imperfecto de subjuntivo: “tuviera”.','hard'),
('Espanhol','Pronombres','¿Cuál es correcto? “No ____ digas a nadie”.',
'["se lo","lo","le","te lo"]'::jsonb,3,'Pronombres combinados: “No te lo digas a nadie” es incorrecto; lo correcto es “No se lo digas a nadie”, pero en este contexto de mandato a “tú”: “No se lo digas a nadie.” Sin embargo, común en la norma es “No le digas a nadie” (leísmo). Usamos estándar: “No se lo digas a nadie”.','hard'),
('Espanhol','Perífrasis','Selecciona la perífrasis correcta: ____ estudiar para aprobar.',
'["Hay que","Tiene que","Debe de","Suele"]'::jsonb,0,'“Hay que” expresa obligación impersonal.','hard'),
('Espanhol','Modo y tiempo','“Cuando ____ el tren, avísame”.',
'["llegue","llegó","llegará","llegaba"]'::jsonb,0,'Futuro en cláusulas temporales usa presente de subjuntivo.','hard'),
('Espanhol','Concordancia','Escoge la opción adecuada: “La gente ____ cansada”.',
'["está","están","estuvo","estaban"]'::jsonb,0,'“La gente” es singular en español estándar: “está”.','hard'),
('Espanhol','Ser/Estar','¿Cuál es correcto? “Madrid ____ en España”.',
'["está","es","era","estaba"]'::jsonb,0,'Ubicación usa “estar”: “Madrid está en España”.','hard'),
('Espanhol','Voz pasiva','Transforma: “Los alumnos resolvieron el problema”.',
'["El problema fue resuelto por los alumnos","El problema es resuelto por los alumnos","El problema había resuelto","El problema sería resuelto"]'::jsonb,0,'Pasiva perifrástica: “fue resuelto por…”.','hard'),
('Espanhol','Leísmo','Elige la oración sin leísmo indebido:',
'["Lo vi a Juan ayer.","Le vi a Juan ayer.","Le vi ayer.","Le llamé por teléfono."]'::jsonb,0,'En norma estándar “Lo vi a Juan” es preferible; “le llamé” es aceptado por leísmo de cortesía en España.','hard'),
('Espanhol','Preposiciones','Completa: “Insiste ____ terminar el trabajo”.',
'["en","de","a","con"]'::jsonb,0,'“Insistir en” es la preposición correcta.','hard'),
('Espanhol','Conectores','Elige el mejor conector: “No vino; ____, envió un mensaje”.',
'["sin embargo","por el contrario","en cambio","además"]'::jsonb,2,'“En cambio” contrasta alternativas.','hard');

-- 2.3 Literatura (existiam 0-2 movidas; inserir +8 para atingir >=10 depois de complemento)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Literatura','Modernismo','A metáfora da “antropofagia” no Modernismo brasileiro propunha:',
'["assimilar criticamente influências externas","rejeitar toda influência europeia","retornar ao parnasianismo","adotar o simbolismo francês"]'::jsonb,0,'Manifesto Antropófago: devorar (assimilar) criticamente o estrangeiro.','hard'),
('Literatura','Realismo','Em “Dom Casmurro”, a narrativa em primeira pessoa problematiza:',
'["a confiabilidade do narrador","o tempo cronológico","o espaço urbano","a oralidade popular"]'::jsonb,0,'Bentinho é narrador não confiável; ambiguidade é central.','hard'),
('Literatura','Romantismo','A idealização feminina e o nacionalismo são marcas de:',
'["Romantismo","Realismo","Naturalismo","Parnasianismo"]'::jsonb,0,'Características centrais do Romantismo brasileiro.','hard'),
('Literatura','Poesia Concreta','A principal característica da Poesia Concreta é:',
'["a visualidade e a disposição espacial do signo","a rima rica e métrica rígida","o tom épico e narrativo","o uso de versos alexandrinos"]'::jsonb,0,'Explora materialidade do signo e espaço gráfico.','hard'),
('Literatura','Naturalismo','No Naturalismo, o comportamento humano é visto como:',
'["determinado por fatores biológicos e sociais","expressão da subjetividade romântica","resultado da inspiração divina","produto aleatório do acaso"]'::jsonb,0,'Determinismo biológico/social é marca naturalista.','hard'),
('Literatura','Vanguardas','O objetivo central do Futurismo era:',
'["exaltar a máquina e a velocidade","retomar formas clássicas","valorizar o passado colonial","defender a contemplação religiosa"]'::jsonb,0,'Culte à modernidade, máquina e dinamismo.','hard'),
('Literatura','Modernismo 2ª Fase','Em Drummond, o “sentimento do mundo” revela:',
'["consciência histórica e existencial","exaltação ufanista","evangelização simbólica","catálogo de paisagens idílicas"]'::jsonb,0,'Crítica social e angústia existencial.','hard'),
('Literatura','Barroco','O conceptismo barroco caracteriza-se por:',
'["argumentação racional e jogos de ideias","excesso de ornamentos sonoros","ausência de antíteses","simplicidade vocabular"]'::jsonb,0,'Conceptismo: lógica/argumentação, jogos intelectuais.','hard');

-- 2.4 Geografia (existia 1; inserir +9)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Geografia','Climatologia','O El Niño tende a provocar no Brasil:',
'["aumento de chuvas no Sul e secas no Norte/Nordeste","nevadas extensas no Centro-Oeste","queda uniforme de temperatura","furacões no Sudeste"]'::jsonb,0,'Padrões típicos: Sul mais chuvoso, Norte/Nordeste mais seco.','hard'),
('Geografia','Cartografia','Em mapas temáticos, a anamorfose busca:',
'["proporcionalizar áreas à variável representada","manter áreas e formas exatas","representar relevo com curvas de nível","exibir altitudes por camada hipsométrica"]'::jsonb,0,'Anamorfose distorce áreas conforme o dado.','hard'),
('Geografia','Geopolítica','A “Rota do Ártico” interessa às potências porque:',
'["reduz distâncias marítimas e acesso a recursos","substitui o Canal de Suez","garante clima amigável","elimina disputas territoriais"]'::jsonb,0,'Derretimento amplia navegação e exploração.','hard'),
('Geografia','Urbanização','A gentrificação implica:',
'["substituição de populações de menor renda por maior renda","expansão agrícola","êxodo rural","estagnação imobiliária"]'::jsonb,0,'Processo de valorização e expulsão indireta.','hard'),
('Geografia','Geomorfologia','O intemperismo químico é favorecido por:',
'["climas quentes e úmidos","climas frios e secos","altitudes extremas","desertos frios"]'::jsonb,0,'Água e calor aceleram reações químicas.','hard'),
('Geografia','Recursos Hídricos','O Aquífero Guarani estende-se por:',
'["Brasil, Argentina, Paraguai e Uruguai","Brasil, Chile e Peru","Brasil e Bolívia","Brasil, Colômbia e Venezuela"]'::jsonb,0,'Quatro países do Cone Sul.','hard'),
('Geografia','Agronegócio','A expansão da soja no Cerrado relaciona-se a:',
'["correção de solos, mecanização e logística","expansão de neve sazonal","declínio de exportações","barreiras tecnológicas intransponíveis"]'::jsonb,0,'Tecnologia e infraestrutura foram chave.','hard'),
('Geografia','Indústria','Distritos industriais tecnificados tendem a:',
'["atrair mão de obra qualificada e P&D","reduzir inovação","depender apenas de matéria-prima local","evitar clusters"]'::jsonb,0,'Clustering e P&D são comuns em polos tecnificados.','hard'),
('Geografia','População','A transição demográfica resulta em:',
'["queda de natalidade e envelhecimento populacional","aumento de mortalidade infantil","explosões migratórias compulsórias","estagnação econômica garantida"]'::jsonb,0,'Fases avançadas: natalidade baixa e envelhecimento.','hard');

-- 2.5 Filosofia (existia 1; inserir +9)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Filosofia','Ética','Para Kant, um ato moral é aquele:',
'["conforme o dever e por dever","que gera maior felicidade","aprovado socialmente","determinado por inclinações"]'::jsonb,0,'Deontologia kantiana: dever e imperativo categórico.','hard'),
('Filosofia','Epistemologia','Para Descartes, a primeira verdade indubitável é:',
'["penso, logo existo","Deus existe","o mundo é real","as ideias são inatas"]'::jsonb,0,'Cogito como fundamento da certeza.','hard'),
('Filosofia','Política','Em Hobbes, o estado de natureza é:',
'["guerra de todos contra todos","comunidade harmoniosa","um contrato perfeito","liberdade sem medo"]'::jsonb,0,'Leviatã: necessidade do soberano.','hard'),
('Filosofia','Antiguidade','O método maiêutico de Sócrates consiste em:',
'["parir ideias por diálogo","impor verdades","memorizar dogmas","escrever tratados longos"]'::jsonb,0,'Indução de conhecimento via perguntas.','hard'),
('Filosofia','Utilitarismo','Para Mill, a ação correta maximiza:',
'["a felicidade geral","a virtude","a fama","o poder"]'::jsonb,0,'Princípio da maior felicidade.','hard'),
('Filosofia','Fenomenologia','Husserl propõe a redução para:',
'["suspender o juízo e descrever a experiência","negar a existência do mundo","provar Deus","fundar ciência natural"]'::jsonb,0,'Epoché e retorno às coisas mesmas.','hard'),
('Filosofia','Existencialismo','Para Sartre, a existência precede:',
'["a essência","a liberdade","a moral","a consciência"]'::jsonb,0,'Liberdade e responsabilidade radical.','hard'),
('Filosofia','Linguagem','Wittgenstein (II) defende que o sentido está:',
'["no uso","na referência direta","nas ideias platônicas","na mente privada"]'::jsonb,0,'Jogos de linguagem: sentido no uso.','hard'),
('Filosofia','Ciência','Para Popper, teorias científicas devem ser:',
'["falseáveis","verificáveis apenas","indiscutíveis","compatíveis com dogmas"]'::jsonb,0,'Cientificidade pela falseabilidade.','hard');

-- 2.6 Sociologia (existia 1; inserir +9)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Sociologia','Clássicos','Para Durkheim, fato social é:',
'["exterior e coercitivo","apenas subjetivo","meramente biológico","um mito"]'::jsonb,0,'Exterioridade e coercitividade definem.','hard'),
('Sociologia','Ação Social','Para Weber, a ação social é orientada por:',
'["sentidos atribuídos pelos atores","instintos biológicos","leis naturais","determinismo econômico absoluto"]'::jsonb,0,'Compreensão (Verstehen) dos sentidos.','hard'),
('Sociologia','Materialismo','Para Marx, a história é movida por:',
'["luta de classes","vontade divina","ideias puras","genética social"]'::jsonb,0,'Conflito entre classes sociais.','hard'),
('Sociologia','Estratificação','Mobilidade social refere-se à:',
'["mudança de posição na hierarquia","migração geográfica","mudança de profissão apenas","transformação biológica"]'::jsonb,0,'Transição entre estratos sociais.','hard'),
('Sociologia','Cultura','Etnocentrismo é:',
'["julgar o outro por padrões próprios","valorar todas culturas igualmente","relativismo cultural","cosmopolitismo"]'::jsonb,0,'Foco em valores do próprio grupo.','hard'),
('Sociologia','Desigualdade','Capital cultural (Bourdieu) está ligado a:',
'["recursos simbólicos e educacionais","riqueza natural","força física","hereditariedade genética"]'::jsonb,0,'Habitus e capitais simbólicos.','hard'),
('Sociologia','Modernidade','Anomia (Merton) ocorre quando:',
'["há ruptura entre metas e meios","existe disciplina rígida","há coesão total","leis perfeitas"]'::jsonb,0,'Estrutura social desalinhada com objetivos.','hard'),
('Sociologia','Deviância','Teoria do etiquetamento sugere que:',
'["rótulos moldam identidades desviantes","desvio é inato","biologia define o crime","não há construção social"]'::jsonb,0,'Labelling é chave na construção do desvio.','hard'),
('Sociologia','Globalização','A compressão espaço-tempo (Harvey) explica:',
'["aceleração de fluxos e conexões","isolamento territorial","fim do capitalismo","retorno ao feudalismo"]'::jsonb,0,'Conectividade e velocidade global.','hard');

-- 2.7 Biologia (existia 6; inserir +4)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Biologia','Genética','Em cruzamento Aa x Aa, a probabilidade de aa é:',
'["25%","50%","75%","0%"]'::jsonb,0,'Quadrado de Punnett: 1/4 aa.','hard'),
('Biologia','Fisiologia','A hemoglobina tem maior afinidade por O2 quando:',
'["pH elevado e temperatura baixa","pH baixo e temperatura alta","pH baixo e temperatura baixa","pH elevado e temperatura alta"]'::jsonb,0,'Efeito Bohr desloca curva para direita com pH baixo.','hard'),
('Biologia','Ecologia','A produtividade primária líquida é definida como:',
'["PBruta - Respiração","Respiração - PBruta","Biomassa total","Aporte de nutrientes"]'::jsonb,0,'PPL = PB - R.','hard'),
('Biologia','Bioquímica','A fosforilação oxidativa ocorre principalmente em:',
'["cristas mitocondriais","citoplasma","núcleo","cloroplastos"]'::jsonb,0,'Cadeia transportadora na membrana interna mitocondrial.','hard');

-- 2.8 Física (existia 6; inserir +4)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Física','Cinemática','Um projétil lançado a 45° sem resistência tem alcance proporcional a:',
'["v^2/g","v/g","v^2/2g","v^2/4g"]'::jsonb,0,'Alcance R = v^2/g para 45°.','hard'),
('Física','Dinâmica','Um bloco em plano inclinado com atrito estático μs move-se quando:',
'["mg senθ > μs mg cosθ","mg cosθ > μs mg senθ","mg senθ = 0","μs < 0"]'::jsonb,0,'Condição de deslizamento: componente tangencial > força máxima de atrito.','hard'),
('Física','Energia','Com atrito, a energia mecânica:',
'["não se conserva, parte vira térmica","conserva-se sempre","aumenta espontaneamente","é nula"]'::jsonb,0,'Atrito dissipa energia em calor.','hard'),
('Física','Eletricidade','A capacitância de um capacitor plano é proporcional a:',
'["área e inversamente à distância","distância e inversamente à área","quadrado da distância","raiz da área"]'::jsonb,0,'C = εA/d.','hard');

-- 2.9 Química (existia 6; inserir +4)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Química','Equilíbrio','Pelo princípio de Le Châtelier, aumentar a T em reação exotérmica desloca:',
'["para reagentes","para produtos","não altera","depende da pressão"]'::jsonb,0,'Exotérmica: calor é produto; aumentar T favorece reagentes.','hard'),
('Química','Estequiometria','Em reação com reagente limitante, a massa de produto depende de:',
'["quantidade do limitante","soma de todos reagentes","excesso","catalisador apenas"]'::jsonb,0,'O limitante determina o máximo de produto.','hard'),
('Química','pH e soluções tampão','Adicionar pequena quantidade de ácido forte a tampão ácido fraco/base conjugada causa:',
'["pequena variação de pH","grande variação de pH","precipitação imediata","aumento de basicidade"]'::jsonb,0,'Tampões resistem a variações de pH.','hard'),
('Química','Cinética','Aumentar a temperatura geralmente:',
'["eleva a constante de velocidade","diminui a constante","não altera","inverte a reação"]'::jsonb,0,'Mais colisões efetivas e energia.','hard');

-- 2.10 Português (existia 6 após normalização; inserir +4)
INSERT INTO public.subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level)
VALUES
('Português','Regência','Assinale a alternativa correta quanto à regência:',
'["Assisti ao filme ontem.","Assisti o filme ontem.","Visamos melhorar as notas ao aluno.","Preferi mais estudar do que ler."]'::jsonb,0,'“Assistir” no sentido de ver é transitivo indireto: assistir a.','hard'),
('Português','Crase','Emprega-se crase em:',
'["Fui à Roma Antiga em estudo.","Fui a pé ao trabalho.","Obedeço à professora.","Refiro-me a aquela questão."]'::jsonb,2,'Verbos que exigem preposição + artigo feminino: “à professora”.','hard'),
('Português','Concordância','A concordância correta é:',
'["Fazem anos que não te vejo.","Faz anos que não te vejo.","Houveram problemas na prova.","Haviam muitos alunos."]'::jsonb,1,'“Faz” e “há” são impessoais no sentido de tempo decorrido.','hard'),
('Português','Colocação Pronominal','A próclise é obrigatória em:',
'["Não me disseram a verdade.","Disseram-me a verdade ontem.","Dirão-me a verdade.","Entregar-me-ão a carta."]'::jsonb,0,'Palavra negativa atrai pronome (próclise).','hard');

-- 2.11 Sociologia/Geografia/… já completados acima.
-- 2.12 Matemática e História já possuem >= 10; mantidos (poderíamos incluir mais difíceis em nova leva).

-- Observação: Todas as opções estão como JSONB array e correct_answer é 0-based,
-- compatível com o componente SubjectQuiz/QuizQuestion atual.

