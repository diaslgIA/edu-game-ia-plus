
-- Migração completa para adicionar conteúdos detalhados de Física, Química, Biologia, Geografia, Filosofia e Sociologia

-- FÍSICA
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('fisica', 'Leis de Newton', 'Fundamentos da mecânica clássica', 'theory', '{
  "introducao": "As três Leis de Newton constituem a base da mecânica clássica e são fundamentais para compreender o movimento dos corpos. Formuladas por Isaac Newton no século XVII, essas leis explicam desde o movimento de objetos cotidianos até fenômenos astronômicos, sendo amplamente cobradas no ENEM.",
  "pontos_chave": [
    "1ª Lei (Inércia): Um corpo em repouso permanece em repouso, e um corpo em movimento retilíneo uniforme permanece assim, a menos que uma força externa atue sobre ele",
    "2ª Lei (Fundamental): A aceleração de um corpo é diretamente proporcional à força resultante e inversamente proporcional à sua massa (F = m.a)",
    "3ª Lei (Ação e Reação): Para toda ação existe uma reação de mesma intensidade, mesma direção e sentido oposto",
    "Força resultante nula implica em equilíbrio (repouso ou movimento retilíneo uniforme)",
    "A massa é uma medida da inércia do corpo - quanto maior a massa, maior a resistência à mudança de movimento"
  ],
  "explicacao_detalhada": "A primeira lei, conhecida como Lei da Inércia, explica por que os passageiros de um ônibus são jogados para frente quando ele freia bruscamente - seus corpos tendem a manter o movimento. A segunda lei estabelece a relação matemática entre força, massa e aceleração, sendo essencial para resolver problemas de dinâmica. Quando empurramos um carrinho de supermercado, a força que aplicamos resulta em aceleração proporcional à nossa força e inversamente proporcional à massa do carrinho. A terceira lei é observada quando caminhamos: empurramos o chão para trás (ação) e o chão nos empurra para frente (reação), permitindo nosso deslocamento. No ENEM, essas leis aparecem em contextos como segurança no trânsito, esportes, funcionamento de foguetes e situações do cotidiano. É importante compreender que as forças sempre atuam aos pares e que a ausência de força resultante não significa ausência de forças, mas sim que elas se equilibram.",
  "curiosidade": "O airbag dos carros funciona baseado na primeira lei de Newton! Quando o carro para subitamente em uma colisão, seu corpo continua se movendo pela inércia. O airbag infla rapidamente para criar uma superfície que diminui gradualmente sua velocidade, evitando o impacto direto com o painel."
}', 'medium', 20, 1, 'Mecânica')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('fisica', 'Termodinâmica', 'Leis que governam as transformações de energia térmica', 'theory', '{
  "introducao": "A termodinâmica estuda as relações entre calor, trabalho e energia interna dos sistemas. Suas leis fundamentais explicam desde o funcionamento de motores até processos biológicos, sendo essencial para compreender fenômenos térmicos no ENEM.",
  "pontos_chave": [
    "1ª Lei: A energia não pode ser criada nem destruída, apenas transformada (ΔU = Q - W)",
    "2ª Lei: O calor flui espontaneamente do corpo mais quente para o mais frio",
    "Energia interna (U) está relacionada à agitação molecular",
    "Calor (Q) é energia térmica em trânsito entre corpos com temperaturas diferentes",
    "Trabalho (W) pode ser realizado por ou sobre um gás durante expansão/compressão"
  ],
  "explicacao_detalhada": "A primeira lei da termodinâmica é uma aplicação do princípio de conservação de energia aos sistemas térmicos. Quando aquecemos um gás em um cilindro com pistão móvel, parte da energia fornecida aumenta a energia interna (elevando a temperatura) e parte é convertida em trabalho mecânico (movimentando o pistão). A segunda lei explica por que precisamos de refrigeradores para manter alimentos frios - o calor não flui espontaneamente do ambiente mais frio (interior da geladeira) para o mais quente (cozinha). Os motores térmicos, como os de automóveis, convertem energia térmica em trabalho mecânico, mas sempre com limitações impostas pela segunda lei. No ENEM, esses conceitos aparecem em questões sobre eficiência energética, aquecimento global, funcionamento de máquinas térmicas e processos industriais. É fundamental compreender que nenhuma máquina térmica pode ter eficiência de 100%, sempre há perda de energia.",
  "curiosidade": "Seu corpo é uma máquina térmica! Você consome energia química dos alimentos (cerca de 2000 kcal/dia), converte parte em trabalho mecânico para se mover e elimina o restante como calor - por isso sua temperatura corporal é sempre maior que a do ambiente."
}', 'hard', 25, 2, 'Termologia')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('fisica', 'Eletromagnetismo', 'Relação entre eletricidade e magnetismo', 'theory', '{
  "introducao": "O eletromagnetismo unifica os fenômenos elétricos e magnéticos, mostrando que são manifestações de uma mesma força fundamental. Descoberto por cientistas como Faraday e Maxwell, é a base de tecnologias modernas como motores, geradores e dispositivos eletrônicos.",
  "pontos_chave": [
    "Cargas elétricas em movimento geram campos magnéticos",
    "Campos magnéticos variáveis induzem campos elétricos (Lei de Faraday)",
    "Lei de Lenz: a corrente induzida se opõe à variação do fluxo magnético que a originou",
    "Força magnética sobre cargas: F = q.v.B.senθ",
    "Ondas eletromagnéticas: luz, rádio, raios-X são da mesma natureza"
  ],
  "explicacao_detalhada": "A descoberta de que eletricidade e magnetismo estão interconectados revolucionou a ciência e a tecnologia. Quando movemos uma espira condutora próxima a um ímã, a variação do campo magnético induz uma corrente elétrica - princípio dos geradores elétricos. Inversamente, ao passar corrente por um fio próximo a um ímã, surge uma força que pode causar movimento - base dos motores elétricos. A Lei de Lenz garante a conservação de energia: se a corrente induzida favorecesse a variação que a originou, teríamos energia infinita. As ondas eletromagnéticas, previstas teoricamente por Maxwell, incluem desde ondas de rádio (frequências baixas) até raios gama (frequências altíssimas). No ENEM, o eletromagnetismo aparece em questões sobre geração de energia elétrica, funcionamento de aparelhos, radiações eletromagnéticas e suas aplicações médicas. É importante compreender que muitas tecnologias modernas, desde o celular até a ressonância magnética, baseiam-se nesses princípios.",
  "curiosidade": "O cartão magnético do seu banco funciona graças ao eletromagnetismo! A tarja magnética armazena informações através da orientação de partículas magnéticas microscópicas. Quando você passa o cartão, o leitor detecta as variações do campo magnético, convertendo-as em sinais elétricos que representam seus dados."
}', 'hard', 25, 3, 'Eletricidade')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('fisica', 'Óptica Geométrica', 'Estudo da propagação da luz usando conceitos geométricos', 'theory', '{
  "introducao": "A óptica geométrica estuda o comportamento da luz utilizando conceitos geométricos, considerando-a como raios que se propagam em linha reta. É fundamental para compreender fenômenos visuais e o funcionamento de instrumentos ópticos presentes no cotidiano.",
  "pontos_chave": [
    "Princípio da propagação retilínea: a luz se propaga em linha reta em meios homogêneos",
    "Lei da reflexão: ângulo de incidência = ângulo de reflexão",
    "Lei de Snell para refração: n₁.senθ₁ = n₂.senθ₂",
    "Espelhos planos formam imagens virtuais, direitas e do mesmo tamanho",
    "Lentes convergentes podem formar imagens reais ou virtuais dependendo da posição do objeto"
  ],
  "explicacao_detalhada": "A propagação retilínea da luz explica a formação de sombras e o funcionamento da câmara escura. Quando a luz encontra uma superfície, pode ser refletida (como em espelhos) ou refratada (como ao passar do ar para a água). A reflexão em espelhos planos produz imagens que parecem estar atrás do espelho, mas são virtuais - não podem ser projetadas em uma tela. A refração ocorre quando a luz muda de meio, alterando sua velocidade e direção, explicando por que objetos submersos parecem estar em posições diferentes. As lentes convergentes, como as de óculos para hipermetropia, concentram os raios luminosos, podendo formar imagens reais (projetáveis) quando o objeto está além da distância focal. No ENEM, a óptica aparece em questões sobre defeitos visuais, instrumentos ópticos (microscópio, telescópio), funcionamento de câmeras e fenômenos atmosféricos como arco-íris e miragens.",
  "curiosidade": "Seus olhos funcionam como câmeras fotográficas sofisticadas! A córnea e o cristalino agem como lentes convergentes que focam a luz na retina, formando uma imagem real e invertida. Seu cérebro processa essa imagem e a ''vira'' para que você veja tudo na posição correta."
}', 'medium', 20, 4, 'Ondulatória')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

-- QUÍMICA
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('quimica', 'Estrutura Atômica e Tabela Periódica', 'Organização dos elementos químicos e estrutura dos átomos', 'theory', '{
  "introducao": "A estrutura atômica e a tabela periódica são os pilares da química moderna. Compreender como os átomos se organizam e como suas propriedades se relacionam com sua posição na tabela é essencial para prever comportamentos químicos e resolver questões do ENEM.",
  "pontos_chave": [
    "Átomo: núcleo (prótons e nêutrons) + eletrosfera (elétrons em orbitais)",
    "Número atômico (Z) = número de prótons = número de elétrons (átomo neutro)",
    "Configuração eletrônica segue o diagrama de Linus Pauling",
    "Propriedades periódicas: raio atômico, energia de ionização, eletronegatividade",
    "Famílias (grupos): elementos com propriedades químicas semelhantes"
  ],
  "explicacao_detalhada": "A descoberta da estrutura atômica revelou que os átomos não são indivisíveis, mas compostos por partículas subatômicas. Os elétrons ocupam regiões específicas chamadas orbitais, organizados em níveis e subníveis de energia. A configuração eletrônica determina o comportamento químico dos elementos - elementos com a mesma configuração na camada de valência pertencem à mesma família e têm propriedades similares. As propriedades periódicas variam de forma previsível: o raio atômico aumenta descendo na família e diminui da esquerda para direita no período; a eletronegatividade tem comportamento oposto. A energia de ionização (energia para remover um elétron) aumenta da esquerda para direita e de baixo para cima. No ENEM, esses conceitos aparecem em questões sobre classificação de elementos, previsão de propriedades, formação de íons e ligações químicas. É fundamental memorizar as configurações eletrônicas dos primeiros 20 elementos e compreender as tendências periódicas.",
  "curiosidade": "Se um átomo fosse ampliado ao tamanho de um estádio de futebol, seu núcleo seria do tamanho de uma bola de gude no centro do campo! Isso mostra que os átomos são constituídos principalmente de espaço vazio, uma descoberta que revolucionou nossa compreensão da matéria."
}', 'medium', 25, 1, 'Química Geral')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('quimica', 'Ligações Químicas e Forças Intermoleculares', 'Como os átomos se unem para formar compostos', 'theory', '{
  "introducao": "As ligações químicas explicam como os átomos se combinam para formar moléculas e compostos, determinando as propriedades dos materiais. Compreender esses mecanismos é fundamental para prever comportamentos químicos e físicos das substâncias.",
  "pontos_chave": [
    "Ligação iônica: transferência de elétrons entre metal e ametal",
    "Ligação covalente: compartilhamento de elétrons entre ametais",
    "Ligação metálica: ''mar de elétrons'' que confere propriedades aos metais",
    "Forças intermoleculares: dipolo-dipolo, London e ligações de hidrogênio",
    "Geometria molecular determina polaridade e propriedades físicas"
  ],
  "explicacao_detalhada": "As ligações químicas resultam da tendência dos átomos em adquirir configuração eletrônica estável (regra do octeto). Na ligação iônica, metais cedem elétrons para ametais, formando íons que se atraem eletrostaticamente, criando compostos como NaCl com altos pontos de fusão. Na ligação covalente, átomos compartilham pares de elétrons para completar suas camadas de valência, formando moléculas como H₂O e CO₂. A ligação metálica explica propriedades como condutividade elétrica e maleabilidade dos metais. As forças intermoleculares, embora mais fracas que as ligações, determinam pontos de ebulição e solubilidade. A água tem ponto de ebulição anormalmente alto devido às ligações de hidrogênio entre suas moléculas. No ENEM, esses conceitos aparecem em questões sobre propriedades de materiais, solubilidade, condutividade e comportamento de substâncias em diferentes estados físicos. É importante relacionar tipo de ligação com propriedades macroscópicas.",
  "curiosidade": "O grafeno, material mais resistente conhecido, deve sua força extraordinária às ligações covalentes entre átomos de carbono dispostos em hexágonos. Uma folha de grafeno da espessura de um filme plástico suportaria o peso de um elefante sem se romper!"
}', 'medium', 25, 2, 'Química Geral')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('quimica', 'Estequiometria', 'Cálculos quantitativos em reações químicas', 'theory', '{
  "introducao": "A estequiometria permite calcular quantidades de reagentes e produtos em reações químicas, sendo essencial para a química quantitativa. É fundamental para resolver problemas práticos em laboratório, indústria e questões do ENEM.",
  "pontos_chave": [
    "Lei de Lavoisier: a massa se conserva nas reações químicas",
    "Mol: quantidade de matéria que contém 6,02 × 10²³ entidades (número de Avogadro)",
    "Massa molar: massa de 1 mol de uma substância (g/mol)",
    "Proporções molares: coeficientes da equação balanceada indicam a proporção entre as substâncias",
    "Reagente limitante: substância que se esgota primeiro, limitando a quantidade de produto"
  ],
  "explicacao_detalhada": "A estequiometria baseia-se na Lei de Lavoisier - nas reações químicas, a massa total dos reagentes equals a massa total dos produtos. O conceito de mol permite relacionar quantidades microscópicas (átomos, moléculas) com quantidades macroscópicas (gramas). Para resolver problemas estequiométricos, primeiro balanceamos a equação química, depois convertemos as quantidades dadas em mols, aplicamos as proporções da equação e convertemos para a unidade desejada. O reagente limitante é crucial em processos industriais - é como uma receita de bolo: se temos farinha para 10 bolos mas ovos apenas para 8, conseguiremos fazer só 8 bolos (os ovos são o reagente limitante). No ENEM, a estequiometria aparece em questões sobre rendimento de reações, pureza de reagentes, análise de combustíveis e processos industriais. É importante dominar conversões entre massa, mol, número de moléculas e, para gases, volume nas CNTP.",
  "curiosidade": "Se você pudesse contar as moléculas de água em um copo (250 mL) na velocidade de uma por segundo, levaria mais de 400 trilhões de anos para terminar - muito mais que a idade do universo! Isso mostra a magnitude do número de Avogadro."
}', 'hard', 30, 3, 'Físico-Química')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('quimica', 'Funções Orgânicas', 'Classificação e propriedades dos compostos de carbono', 'theory', '{
  "introducao": "As funções orgânicas classificam compostos de carbono baseando-se em grupos funcionais característicos. Compreender essas funções é essencial para entender a química da vida, pois praticamente todas as moléculas biológicas são compostos orgânicos.",
  "pontos_chave": [
    "Hidrocarbonetos: apenas C e H (alcanos, alcenos, alcinos, aromáticos)",
    "Funções oxigenadas: álcoois, aldeídos, cetonas, ácidos carboxílicos, ésteres",
    "Funções nitrogenadas: aminas, amidas",
    "Grupos funcionais determinam propriedades químicas e físicas",
    "Nomenclatura IUPAC segue regras sistemáticas para nomear compostos"
  ],
  "explicacao_detalhada": "Os compostos orgânicos são classificados em funções baseando-se nos grupos funcionais presentes. Os hidrocarbonetos são os mais simples, servindo de ''esqueleto'' para outras funções. O metano (CH₄) é o alcano mais simples e principal componente do gás natural. Os álcoois contêm o grupo -OH ligado a carbono saturado, como o etanol presente nas bebidas alcoólicas. Os aldeídos e cetonas contêm o grupo carbonila (C=O), sendo os aldeídos responsáveis por muitos aromas. Os ácidos carboxílicos, como o ácido acético do vinagre, contêm o grupo -COOH. Os ésteres, formados pela reação entre ácidos e álcoois, são responsáveis pelo aroma de frutas. No ENEM, as funções orgânicas aparecem em questões sobre combustíveis, polímeros, medicamentos, cosméticos e processos biológicos. É importante memorizar os principais grupos funcionais e suas propriedades, como solubilidade e pontos de ebulição.",
  "curiosidade": "O aroma característico da banana vem do acetato de isoamila, um éster. Ironicamente, esse mesmo composto é usado como ''aroma artificial de banana'', mas as variedades modernas de banana têm composição aromática diferente, por isso o aroma artificial ''não combina'' com bananas reais!"
}', 'medium', 25, 4, 'Química Orgânica')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

-- BIOLOGIA
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('biologia', 'Organelas Celulares', 'Estruturas especializadas no interior das células', 'theory', '{
  "introducao": "As organelas celulares são estruturas especializadas que desempenham funções específicas dentro das células eucarióticas. Cada organela tem uma função particular, trabalhando em conjunto para manter a célula viva e funcional, sendo fundamentais para compreender os processos vitais.",
  "pontos_chave": [
    "Núcleo: controla atividades celulares e contém DNA",
    "Mitocôndrias: respiração celular e produção de ATP",
    "Retículo endoplasmático: síntese de proteínas (rugoso) e lipídios (liso)",
    "Complexo de Golgi: modificação e transporte de proteínas",
    "Ribossomos: síntese de proteínas"
  ],
  "explicacao_detalhada": "O núcleo é o ''centro de controle'' da célula, contendo o DNA que determina todas as características e funções celulares. As mitocôndrias são as ''usinas de energia'', convertendo glicose e oxigênio em ATP através da respiração celular. O retículo endoplasmático rugoso, com ribossomos aderidos, sintetiza proteínas destinadas à secreção ou membranas, enquanto o liso produz lipídios e detoxifica substâncias. O complexo de Golgi funciona como um ''centro de distribuição'', modificando proteínas vindas do retículo e as empacotando em vesículas para transporte. Os lisossomos contêm enzimas digestivas que degradam materiais indesejados, sendo chamados de ''sistema digestivo celular''. As células vegetais possuem organelas exclusivas como cloroplastos (fotossíntese) e vacúolo central (manutenção da pressão osmótica). No ENEM, as organelas aparecem em questões sobre metabolismo, doenças genéticas, biotecnologia e diferenças entre células animais e vegetais.",
  "curiosidade": "As mitocôndrias têm seu próprio DNA, separado do DNA nuclear! Isso acontece porque elas eram bactérias independentes que foram ''engolidas'' por células primitivas há bilhões de anos, estabelecendo uma parceria que beneficia ambas - a teoria endossimbiótica."
}', 'easy', 20, 1, 'Biologia Celular')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('biologia', 'Leis de Mendel', 'Princípios fundamentais da hereditariedade', 'theory', '{
  "introducao": "As Leis de Mendel, descobertas através de experimentos com ervilhas, estabeleceram os princípios básicos da hereditariedade. Essas leis explicam como características são transmitidas de pais para filhos e são fundamentais para compreender genética humana, melhoramento genético e biotecnologia.",
  "pontos_chave": [
    "1ª Lei (Segregação): cada característica é determinada por um par de fatores que se separam na formação dos gametas",
    "2ª Lei (Segregação Independente): características diferentes são herdadas independentemente",
    "Dominância: alelo dominante se expressa em homozigose e heterozigose",
    "Fenótipo: característica observável; Genótipo: constituição genética",
    "Cruzamento-teste: cruzamento com homozigoto recessivo para determinar genótipo"
  ],
  "explicacao_detalhada": "Mendel descobriu que as características hereditárias são determinadas por ''fatores'' (hoje chamados genes) que existem aos pares nos indivíduos. Na formação dos gametas, esses pares se separam (1ª Lei), garantindo que cada gameta receba apenas um fator de cada par. Quando características diferentes são analisadas simultaneamente, elas se segregam independentemente (2ª Lei), desde que estejam em cromossomos diferentes. A dominância explica por que algumas características ''saltam gerações'' - um alelo recessivo só se expressa quando está em dose dupla. O quadro de Punnett é uma ferramenta útil para prever proporções em cruzamentos. A 2ª Lei tem exceções quando genes estão ligados no mesmo cromossomo. No ENEM, as leis de Mendel aparecem em questões sobre herança de doenças genéticas, grupos sanguíneos, genealogias (heredogramas) e melhoramento genético de plantas e animais. É fundamental compreender probabilidade e saber interpretar cruzamentos.",
  "curiosidade": "Mendel escolheu ervilhas por acaso, mas foi uma escolha genial! Elas têm características bem definidas (alta/baixa, lisa/rugosa), reprodução rápida, muitos descendentes e, principalmente, autofecundação natural - permitindo obter linhagens puras facilmente."
}', 'medium', 25, 2, 'Genética e Evolução')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('biologia', 'Ciclos Biogeoquímicos', 'Circulação de elementos químicos na natureza', 'theory', '{
  "introducao": "Os ciclos biogeoquímicos descrevem a circulação de elementos químicos essenciais entre os componentes bióticos e abióticos dos ecossistemas. Esses ciclos garantem a reciclagem constante de nutrientes, sendo fundamentais para a manutenção da vida na Terra.",
  "pontos_chave": [
    "Ciclo do carbono: fotossíntese remove CO₂, respiração e decomposição devolvem",
    "Ciclo do nitrogênio: fixação, nitrificação, desnitrificação e amonificação",
    "Ciclo do fósforo: não tem fase gasosa, circula via rochas e sedimentos",
    "Ciclo da água: evaporação, condensação, precipitação e infiltração",
    "Atividade humana altera ciclos naturais causando desequilíbrios ambientais"
  ],
  "explicacao_detalhada": "O ciclo do carbono é crucial para o clima global - plantas retiram CO₂ da atmosfera na fotossíntese, incorporando carbono em suas estruturas. Quando organismos respiram, queimam combustíveis ou se decompoem, devolvem CO₂ à atmosfera. O ciclo do nitrogênio é complexo porque o N₂ atmosférico é inerte - apenas bactérias fixadoras e processos industriais conseguem convertê-lo em formas utilizáveis (amônia, nitrato). O ciclo do fósforo é o mais ''lento'' porque não tem fase gasosa significativa, dependendo do intemperismo de rochas para disponibilizar fosfatos. A água circula entre oceanos, atmosfera, rios e organismos vivos. As atividades humanas intensificaram esses ciclos: queima de combustíveis aumenta CO₂ atmosférico, fertilizantes alteram ciclos de nitrogênio e fósforo, desmatamento afeta o ciclo da água. No ENEM, esses ciclos aparecem em questões sobre mudanças climáticas, eutrofização, desmatamento e sustentabilidade. É importante compreender como as ações humanas interferem nos ciclos naturais.",
  "curiosidade": "O oxigênio que você está respirando agora pode ter sido produzido por uma árvore há décadas ou por fitoplâncton marinho há anos! Os átomos de oxigênio circulam constantemente entre a atmosfera, água e seres vivos através dos ciclos biogeoquímicos."
}', 'medium', 25, 3, 'Ecologia')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('biologia', 'Fisiologia Humana - Sistema Nervoso', 'Funcionamento do sistema de controle do corpo humano', 'theory', '{
  "introducao": "O sistema nervoso é responsável pelo controle e coordenação das funções corporais, processamento de informações e geração de respostas. Compreender seu funcionamento é essencial para entender como percebemos o mundo e como o corpo responde a estímulos.",
  "pontos_chave": [
    "Sistema nervoso central: encéfalo (cérebro, cerebelo, tronco) + medula espinhal",
    "Sistema nervoso periférico: nervos que conectam SNC ao resto do corpo",
    "Neurônios: células especializadas na transmissão de impulsos elétricos",
    "Sinapse: transmissão química de informações entre neurônios",
    "Sistema autônomo: controla funções involuntárias (simpático e parassimpático)"
  ],
  "explicacao_detalhada": "O cérebro processa informações conscientes, controla movimentos voluntários e abriga funções superiores como memória e raciocínio. O cerebelo coordena movimentos e equilíbrio. O tronco cerebral controla funções vitais como respiração e batimentos cardíacos. A medula espinhal transmite informações entre cérebro e corpo, além de controlar reflexos. Os neurônios transmitem impulsos elétricos através de suas membranas, e a comunicação entre eles ocorre nas sinapses através de neurotransmissores químicos. O sistema nervoso autônomo tem duas divisões: simpático (prepara o corpo para situações de estresse - ''luta ou fuga'') e parassimpático (promove relaxamento e digestão). Drogas psicoativas agem alterando a transmissão sináptica. No ENEM, o sistema nervoso aparece em questões sobre reflexos, drogas, doenças neurológicas, percepção sensorial e coordenação motora. É importante compreender a integração entre estrutura e função.",
  "curiosidade": "Seu cérebro consome cerca de 20% de toda energia do seu corpo, apesar de representar apenas 2% do peso corporal! Ele é tão ''fomininha'' que mesmo durante o sono mantém alta atividade metabólica, consolidando memórias e ''limpando'' toxinas acumuladas."
}', 'medium', 25, 4, 'Corpo Humano')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

-- GEOGRAFIA
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('geografia', 'Geopolítica e Globalização', 'Relações de poder e integração mundial', 'theory', '{
  "introducao": "A geopolítica estuda as relações de poder entre Estados e a influência do espaço geográfico nas decisões políticas. A globalização intensificou essas relações, criando um mundo interconectado economicamente, mas ainda marcado por desigualdades e conflitos.",
  "pontos_chave": [
    "Globalização: integração econômica, cultural e comunicacional mundial",
    "Blocos econômicos: acordos para facilitar comércio entre países",
    "Organismos internacionais: ONU, FMI, Banco Mundial regulam relações globais",
    "Conflitos geopolíticos: disputas por recursos, territórios e influência",
    "Nova ordem mundial: multipolaridade substitui bipolaridade da Guerra Fria"
  ],
  "explicacao_detalhada": "A globalização, intensificada após a Guerra Fria, conectou economias através de tecnologia, comunicação e transporte. Empresas multinacionais operam globalmente, aproveitando vantagens de cada região - produção na Ásia, design na Europa, comercialização nas Américas. Os blocos econômicos como MERCOSUL, União Europeia e NAFTA facilitam comércio regional, mas podem criar barreiras para terceiros. Organismos internacionais tentam regular a economia global, mas frequentemente refletem interesses das potências dominantes. A nova ordem mundial é multipolar, com Estados Unidos ainda dominantes, mas China, Rússia e União Europeia exercendo crescente influência. Conflitos atuais envolvem controle de recursos (petróleo, água, terras raras), rotas comerciais e áreas de influência. No ENEM, geopolítica aparece em questões sobre comércio internacional, conflitos regionais, organismos internacionais e impactos da globalização. É crucial compreender a distribuição desigual de poder no mundo contemporâneo.",
  "curiosidade": "Se a economia global fosse uma pizza, os 26 homens mais ricos do mundo possuiriam uma fatia maior que a metade mais pobre da humanidade (3,8 bilhões de pessoas)! Isso ilustra como a globalização, apesar de conectar o mundo, ainda mantém enormes desigualdades."
}', 'medium', 25, 1, 'Geografia Geral')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('geografia', 'Urbanização Brasileira', 'Processo de crescimento das cidades no Brasil', 'theory', '{
  "introducao": "A urbanização brasileira foi um processo acelerado e tardio, concentrando mais de 80% da população em cidades. Esse fenômeno transformou profundamente a organização espacial, criando megalópoles, mas também problemas urbanos característicos de países em desenvolvimento.",
  "pontos_chave": [
    "Urbanização tardia: intensificou-se após 1950 com industrialização",
    "Êxodo rural: migração do campo para cidade em busca de oportunidades",
    "Concentração urbana: poucas metrópoles concentram grande parte da população",
    "Problemas urbanos: déficit habitacional, transporte, saneamento, violência",
    "Hierarquia urbana: metrópoles globais, nacionais, regionais e centros locais"
  ],
  "explicacao_detalhada": "O Brasil passou de país rural (1940: 70% no campo) para urbano (2010: 84% nas cidades) em apenas 70 anos. Esse processo foi impulsionado pela industrialização, que concentrou empregos nas cidades, especialmente no Sudeste. O êxodo rural intensificou-se com a modernização agrícola, que dispensou mão de obra. A urbanização concentrou-se em poucas metrópoles: São Paulo e Rio de Janeiro formam megalópoles com mais de 10 milhões de habitantes cada. Esse crescimento acelerado criou problemas: periferias sem infraestrutura, favelização, trânsito caótico, poluição e violência urbana. A hierarquia urbana brasileira tem São Paulo como metrópole global, Rio de Janeiro e outras capitais como metrópoles nacionais, e cidades médias assumindo crescente importância. No ENEM, urbanização aparece em questões sobre migração, planejamento urbano, problemas ambientais urbanos, desigualdades socioespaciais e políticas habitacionais. É importante compreender causas, consequências e possíveis soluções para os problemas urbanos.",
  "curiosidade": "Se a Grande São Paulo fosse um país, seria a 30ª economia mundial, maior que a Argentina! Com seus 22 milhões de habitantes, seria o 56º país mais populoso, à frente da Austrália e do Sri Lanka."
}', 'easy', 20, 2, 'Geografia do Brasil')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('geografia', 'Climas do Brasil', 'Diversidade climática do território brasileiro', 'theory', '{
  "introducao": "O Brasil possui grande diversidade climática devido à sua extensão territorial, posição geográfica e fatores como latitude, altitude, maritimidade e continentalidade. Compreender essa diversidade é essencial para entender a distribuição da vegetação, agricultura e população no país.",
  "pontos_chave": [
    "Clima equatorial: quente e úmido, chuvas abundantes na Amazônia",
    "Clima tropical: duas estações definidas (seca e chuvosa) no Centro-Oeste",
    "Clima semiárido: quente e seco no interior do Nordeste",
    "Clima subtropical: temperado no Sul, com chuvas bem distribuídas",
    "Fatores climáticos: latitude, altitude, massas de ar, maritimidade"
  ],
  "explicacao_detalhada": "O clima equatorial domina a região amazônica, caracterizado por altas temperaturas (médias de 26°C) e chuvas abundantes (mais de 2000mm anuais) bem distribuídas. O clima tropical abrange a maior parte do território, com duas estações bem definidas: verão chuvoso e inverno seco, típico do cerrado. O semiárido nordestino sofre influência da zona de alta pressão subtropical e recebe pouca umidade, resultando em chuvas escassas e irregulares. O clima subtropical no Sul tem temperaturas mais amenas devido à latitude e influência de massas de ar polares, com chuvas bem distribuídas ao longo do ano. As massas de ar (equatorial continental e marítima, tropical atlântica e continental, polar atlântica) influenciam diretamente o tempo e o clima. A altitude ameniza temperaturas em regiões serranas. No ENEM, climas aparecem em questões sobre agricultura, distribuição populacional, recursos hídricos e impactos das mudanças climáticas. É fundamental relacionar clima com vegetação e atividades econômicas.",
  "curiosidade": "O Brasil é o único país do mundo que possui todos os tipos de clima, exceto o polar! Essa diversidade permite que tenhamos desde a floresta tropical úmida da Amazônia até vinhedos no clima subtropical do Sul, passando pela caatinga seca do semiárido nordestino."
}', 'easy', 20, 3, 'Geografia do Brasil')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

-- FILOSOFIA
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('filosofia', 'Filosofia Antiga - Platão e Aristóteles', 'Fundamentos do pensamento filosófico ocidental', 'theory', '{
  "introducao": "Platão e Aristóteles estabeleceram as bases do pensamento filosófico ocidental, criando sistemas que influenciam até hoje áreas como política, ética, lógica e teoria do conhecimento. Suas ideias moldaram profundamente a cultura e o pensamento científico.",
  "pontos_chave": [
    "Platão: Teoria das Ideias (mundo sensível é cópia imperfeita do mundo das ideias)",
    "Alegoria da Caverna: ilustra a passagem da ignorância ao conhecimento",
    "Aristóteles: conhecimento vem da experiência, critica o mundo das ideias platônico",
    "Lógica aristotélica: silogismo como forma de raciocínio válido",
    "Política: Platão propõe Estado ideal, Aristóteles analisa regimes existentes"
  ],
  "explicacao_detalhada": "Platão, discípulo de Sócrates, desenvolveu a Teoria das Ideias, segundo a qual o mundo que percebemos é apenas uma cópia imperfeita de um mundo perfeito de ideias ou formas. A Alegoria da Caverna ilustra como a educação nos liberta das ''sombras'' da ignorância para a luz do conhecimento verdadeiro. Para Platão, apenas através da razão podemos acessar o conhecimento verdadeiro. Aristóteles, discípulo de Platão, discordou de seu mestre, argumentando que o conhecimento vem da experiência sensorial. Ele criou a lógica formal, estabelecendo regras para o raciocínio válido através do silogismo. Em política, Platão imaginou uma ''República'' ideal governada por filósofos-reis, enquanto Aristóteles analisou empiricamente diferentes formas de governo. Suas ideias sobre ética (virtudes como meio-termo) e classificação do conhecimento (teórico, prático, produtivo) permanecem influentes. No ENEM, aparecem em questões sobre teoria do conhecimento, ética, política e fundamentos da ciência.",
  "curiosidade": "A palavra ''escola'' vem do grego ''skholé'', que significa ''ócio''! Para os gregos antigos, especialmente Aristóteles, o aprendizado verdadeiro só era possível quando se tinha tempo livre das necessidades básicas da vida - o ócio era considerado essencial para a filosofia e contemplação."
}', 'medium', 25, 1, 'História da Filosofia')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('filosofia', 'Filosofia Moderna - Contratualistas', 'Teorias sobre origem e legitimidade do Estado', 'theory', '{
  "introducao": "Os contratualistas dos séculos XVI-XVIII desenvolveram teorias sobre a origem da sociedade e do Estado através de um ''contrato social''. Hobbes, Locke e Rousseau ofereceram diferentes visões sobre a natureza humana e a legitimidade do poder político, influenciando profundamente o pensamento político moderno.",
  "pontos_chave": [
    "Hobbes: estado de natureza é ''guerra de todos contra todos'', Estado absoluto necessário",
    "Locke: direitos naturais (vida, liberdade, propriedade), governo limitado pelo consentimento",
    "Rousseau: ''homem nasce bom, sociedade o corrompe'', soberania popular",
    "Contrato social: acordo hipotético que funda a sociedade política",
    "Influência: base teórica para democracias modernas e direitos humanos"
  ],
  "explicacao_detalhada": "Thomas Hobbes, escrevendo durante a Guerra Civil Inglesa, via o estado de natureza como caótico e violento, onde a vida seria ''solitária, pobre, sórdida, brutal e curta''. Para escapar dessa condição, os homens firmariam um contrato, cedendo todos os direitos a um soberano absoluto (Leviatã) em troca de proteção. John Locke, mais otimista, argumentava que os homens possuem direitos naturais inalienáveis e que o governo existe para protegê-los, podendo ser destituído se falhar nessa função - base teórica das revoluções liberais. Jean-Jacques Rousseau defendia que o homem nasce naturalmente bom, mas a sociedade o corrompe através da propriedade privada e desigualdade. Seu contrato social busca conciliar liberdade individual com necessidade de ordem coletiva através da ''vontade geral''. No ENEM, os contratualistas aparecem em questões sobre democracia, direitos humanos, legitimidade política e fundamentos do Estado moderno.",
  "curiosidade": "A famosa frase ''o homem é o lobo do homem'' é de Hobbes, mas ele estava citando o dramaturgo romano Plauto! Hobbes usou essa imagem para ilustrar como os seres humanos podem ser cruéis uns com os outros quando não há um poder superior para controlá-los."
}', 'medium', 25, 2, 'História da Filosofia')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('filosofia', 'Ética e Moral (Kant e Utilitarismo)', 'Principais teorias sobre ação moral correta', 'theory', '{
  "introducao": "A ética kantiana e o utilitarismo representam duas abordagens fundamentais para determinar o que é moralmente correto. Kant enfatiza o dever e a intenção, enquanto os utilitaristas focam nas consequências das ações, gerando debates que permanecem relevantes na bioética, política e direito contemporâneos.",
  "pontos_chave": [
    "Kant: ética do dever, ações morais baseadas na boa vontade e razão",
    "Imperativo categórico: ''aja como se sua ação fosse lei universal''",
    "Utilitarismo: ação correta é aquela que maximiza felicidade geral",
    "Bentham e Mill: ''maior bem para o maior número de pessoas''",
    "Conflito: intenção versus consequências, dever versus utilidade"
  ],
  "explicacao_detalhada": "Immanuel Kant revolucionou a ética ao argumentar que a moralidade não depende de consequências, mas da boa vontade e do dever. Segundo o imperativo categórico, devemos agir apenas segundo máximas que poderíamos querer que se tornassem leis universais. Por exemplo, mentir é sempre errado porque não podemos querer que todos mintam. Kant também defende que devemos tratar as pessoas sempre como fins em si mesmas, nunca apenas como meios. O utilitarismo, desenvolvido por Jeremy Bentham e John Stuart Mill, argumenta que a ação correta é aquela que produz as melhores consequências - maior felicidade para o maior número. Mill refinou a teoria distinguindo prazeres superiores (intelectuais) dos inferiores (físicos). Esses sistemas éticos frequentemente entram em conflito: Kant proibiria mentir mesmo para salvar uma vida, enquanto utilitaristas permitiriam se isso maximizasse o bem-estar geral. No ENEM, aparecem em questões sobre bioética, direitos humanos, política pública e dilemas morais contemporâneos.",
  "curiosidade": "Kant era tão pontual em suas caminhadas diárias em Königsberg que os vizinhos acertavam seus relógios por ele! Essa rigidez refletia sua filosofia: acreditava que a moralidade, como seu horário, deveria ser baseada em princípios racionais universais, não em caprichos ou circunstâncias."
}', 'hard', 30, 3, 'Ética e Política')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

-- SOCIOLOGIA
INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('sociologia', 'Clássicos da Sociologia (Durkheim, Weber, Marx)', 'Fundadores da sociologia como ciência', 'theory', '{
  "introducao": "Émile Durkheim, Max Weber e Karl Marx são considerados os fundadores da sociologia moderna. Cada um desenvolveu abordagens distintas para compreender a sociedade, criando ferramentas teóricas que ainda hoje são utilizadas para analisar fenômenos sociais contemporâneos.",
  "pontos_chave": [
    "Durkheim: sociedade como organismo, fatos sociais, solidariedade mecânica e orgânica",
    "Weber: ação social, tipos ideais, ética protestante e capitalismo",
    "Marx: materialismo histórico, luta de classes, mais-valia, alienação",
    "Métodos: Durkheim (positivista), Weber (compreensivo), Marx (dialético)",
    "Influência: base teórica para análise de instituições, economia e conflitos sociais"
  ],
  "explicacao_detalhada": "Émile Durkheim estabeleceu a sociologia como ciência, definindo ''fatos sociais'' como fenômenos externos e coercitivos que influenciam comportamentos individuais. Estudou a evolução social da solidariedade mecânica (sociedades tradicionais unidas por semelhanças) para orgânica (sociedades modernas unidas pela divisão do trabalho). Max Weber enfatizou a importância de compreender o sentido das ações sociais, criando ''tipos ideais'' como ferramentas analíticas. Sua obra ''A Ética Protestante e o Espírito do Capitalismo'' mostra como valores religiosos influenciaram o desenvolvimento econômico. Karl Marx analisou a sociedade através do materialismo histórico, argumentando que conflitos entre classes sociais (baseados na posição econômica) são o motor da história. Conceitos como mais-valia e alienação explicam a exploração no capitalismo. No ENEM, esses autores aparecem em questões sobre instituições sociais, religião, trabalho, desigualdade e mudança social. É fundamental compreender suas diferentes perspectivas sobre como a sociedade funciona e se transforma.",
  "curiosidade": "Marx nunca usou o termo ''capitalismo'' em seus escritos - ele preferia ''modo de produção capitalista''! O termo ''capitalismo'' só se popularizou no século XX, mas as análises de Marx sobre esse sistema econômico continuam influenciando debates políticos e econômicos mundiais."
}', 'medium', 30, 1, 'Teoria Sociológica')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('sociologia', 'Indústria Cultural e Cultura de Massa', 'Produção e consumo cultural na sociedade moderna', 'theory', '{
  "introducao": "A indústria cultural, conceito desenvolvido pela Escola de Frankfurt, analisa como a cultura se tornou uma mercadoria produzida em massa. Esse fenômeno transformou profundamente as formas de entretenimento, comunicação e formação de identidades na sociedade contemporânea.",
  "pontos_chave": [
    "Indústria cultural: produção padronizada de bens culturais para consumo de massa",
    "Adorno e Horkheimer: cultura vira mercadoria, perde função crítica",
    "Meios de comunicação de massa: rádio, TV, cinema, internet moldam opiniões",
    "Homogeneização cultural: padronização de gostos e comportamentos",
    "Resistência: culturas alternativas e movimentos contraculturais"
  ],
  "explicacao_detalhada": "Theodor Adorno e Max Horkheimer, da Escola de Frankfurt, cunharam o termo ''indústria cultural'' para criticar a transformação da cultura em mercadoria. Segundo eles, produtos culturais (filmes, música, programas de TV) são produzidos segundo lógica industrial: padronização, previsibilidade e lucro. Isso resulta em entretenimento alienante que não estimula reflexão crítica, mas conformismo. Os meios de comunicação de massa amplificam esse processo, criando ''necessidades'' artificiais e homogeneizando gostos culturais globalmente. A cultura de massa pode ser vista tanto como democratização (acesso amplo à cultura) quanto como manipulação (controle de consciências). Walter Benjamin ofereceu visão mais otimista, vendo potencial emancipatório na reprodutibilidade técnica da arte. Movimentos contraculturais e culturas alternativas representam formas de resistência à homogeneização. No ENEM, esses conceitos aparecem em questões sobre mídia, consumo, globalização cultural e manipulação ideológica.",
  "curiosidade": "Netflix tem mais de 15.000 categorias secretas para classificar conteúdo, como ''Filmes de Ação Estrangeiros com Final Forte''! Isso exemplifica como a indústria cultural atual usa algoritmos sofisticados para padronizar e direcionar nossos gostos, confirmando as previsões da Escola de Frankfurt sobre personalização da massificação."
}', 'medium', 25, 2, 'Cultura e Sociedade')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;

INSERT INTO public.subject_contents (subject, title, description, content_type, content_data, difficulty_level, estimated_time, order_index, grande_tema)
VALUES 
('sociologia', 'Movimentos Sociais e Cidadania', 'Ação coletiva e participação política na democracia', 'theory', '{
  "introducao": "Os movimentos sociais são formas de ação coletiva que buscam mudanças sociais, políticas ou culturais. No Brasil, desempenharam papel fundamental na redemocratização e na construção da cidadania, lutando por direitos e representando diferentes grupos da sociedade.",
  "pontos_chave": [
    "Movimentos sociais: ação coletiva organizada por mudança social",
    "Tipos: movimentos operários, feministas, ambientais, étnicos, urbanos",
    "Cidadania: conjunto de direitos civis, políticos e sociais",
    "Participação política: voto, manifestações, organizações da sociedade civil",
    "Democracia participativa: complementa representativa através da participação direta"
  ],
  "explicacao_detalhada": "Os movimentos sociais surgem quando grupos organizados identificam problemas sociais e mobilizam recursos para transformá-los. No Brasil, o movimento operário do início do século XX lutou por direitos trabalhistas, enquanto movimentos rurais como MST reivindicam reforma agrária. O movimento feminista conquistou direitos como voto feminino, igualdade jurídica e combate à violência doméstica. Movimentos ambientais denunciam degradação ecológica e propõem desenvolvimento sustentável. A cidadania, conceito desenvolvido por T.H. Marshall, inclui direitos civis (liberdades individuais), políticos (participação no poder) e sociais (bem-estar econômico). No Brasil, a construção da cidadania foi historicamente limitada, com movimentos sociais pressionando por inclusão e direitos. A democracia participativa valoriza engajamento direto dos cidadãos através de conselhos, audiências públicas e manifestações. No ENEM, esses temas aparecem em questões sobre participação política, direitos humanos, desigualdades sociais e funcionamento da democracia.",
  "curiosidade": "O movimento das ''Diretas Já'' (1983-1984) mobilizou mais de 1 milhão de pessoas em uma única manifestação em São Paulo! Foi um dos maiores movimentos da história brasileira, mostrando como a participação popular pode pressionar por mudanças políticas fundamentais na democracia."
}', 'easy', 25, 3, 'Sociedade Brasileira')
ON CONFLICT (subject, title) DO UPDATE SET
content_data = EXCLUDED.content_data,
description = EXCLUDED.description,
grande_tema = EXCLUDED.grande_tema;
