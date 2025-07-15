-- Atualizar conteúdos de História do Brasil com JSON estruturado e detalhado

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "O período colonial brasileiro (1500-1822) marca o início da formação da sociedade brasileira sob domínio português. Durante mais de três séculos, o Brasil foi explorado através do sistema colonial, que transformou profundamente a paisagem, a economia e a população do território.",
  "pontos_chave": [
    "Pacto Colonial: monopólio comercial da metrópole sobre a colônia",
    "Economia baseada em plantation (latifúndio, monocultura, escravidão)",
    "Sociedade hierarquizada: brancos, índios, negros e mestiços",
    "Ciclos econômicos: pau-brasil, açúcar, ouro e diamantes",
    "Processo de miscigenação e formação da identidade brasileira"
  ],
  "explicacao_detalhada": "A colonização portuguesa seguiu o modelo de exploração, onde a colônia existia para enriquecer a metrópole. O Pacto Colonial estabelecia que o Brasil só podia comercializar com Portugal, garantindo lucros exclusivos à Coroa. A economia colonial se estruturou em grandes propriedades (latifúndios) que produziam um único produto (monocultura) para exportação, utilizando mão de obra escrava africana. Essa estrutura econômica criou uma sociedade profundamente desigual, onde a posição social dependia da cor da pele e da origem. Os ciclos econômicos - pau-brasil (1500-1530), açúcar (1530-1700) e ouro (1700-1780) - moldaram diferentes regiões do país. O açúcar concentrou-se no Nordeste, criando uma elite açucareira poderosa, enquanto a mineração deslocou o eixo econômico para Minas Gerais e promoveu o desenvolvimento urbano. Durante todo esse período, ocorreu intensa miscigenação entre portugueses, indígenas e africanos, criando uma sociedade multirracial única, mas marcada por profundas desigualdades que persistem até hoje.",
  "curiosidade": "Durante o período colonial, estima-se que cerca de 4 milhões de africanos foram trazidos como escravos para o Brasil - mais de 10 vezes o número de portugueses que emigraram para cá no mesmo período. Isso explica por que o Brasil hoje tem a maior população afrodescendente fora da África."
}'
WHERE subject = 'História' AND title = 'Brasil Colônia';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "O Brasil Império (1822-1889) representa a fase de construção da nacionalidade brasileira. Iniciado com a Independência proclamada por Dom Pedro I, o período imperial consolidou a unidade territorial e estabeleceu as bases do Estado brasileiro moderno.",
  "pontos_chave": [
    "Independência em 1822: rompimento pacífico com Portugal",
    "Primeiro Reinado (1822-1831): consolidação da independência",
    "Período Regencial (1831-1840): experiências políticas e revoltas",
    "Segundo Reinado (1840-1889): estabilidade e modernização",
    "Abolição da escravidão (1888) e Proclamação da República (1889)"
  ],
  "explicacao_detalhada": "A Independência do Brasil em 1822 foi um processo complexo, influenciado pelas guerras napoleônicas e pela permanência da família real portuguesa no Rio de Janeiro desde 1808. Dom Pedro I proclamou a independência para manter a unidade do território e evitar a fragmentação que ocorreu na América espanhola. O Primeiro Reinado foi marcado por conflitos entre brasileiros e portugueses, culminando na abdicação de Pedro I em 1831. O Período Regencial (1831-1840) foi uma fase de instabilidade, com várias revoltas provinciais que ameaçaram a unidade nacional, como a Cabanagem no Pará e a Farroupilha no Rio Grande do Sul. O Segundo Reinado, sob Dom Pedro II, representou a idade de ouro do Império. O imperador promoveu a modernização do país: chegada da ferrovia, telégrafo, iluminação a gás e incentivo à imigração europeia. A abolição da escravidão ocorreu gradualmente através das leis abolicionistas: Lei do Ventre Livre (1871), Lei dos Sexagenários (1885) e Lei Áurea (1888). A abolição, sem indenização aos proprietários, gerou descontentamento na elite rural, que apoiou a proclamação da República em 1889.",
  "curiosidade": "Dom Pedro II foi coroado imperador aos 14 anos, mas só assumiu o poder efetivamente aos 23. Ele foi um dos monarcas mais cultos de sua época, dominando várias línguas e mantendo correspondência com cientistas como Louis Pasteur. Ironicamente, foi deposto por ser considerado avançado demais para sua época!"
}'
WHERE subject = 'História' AND title = 'Brasil Império';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A República Velha (1889-1930) marca a primeira fase republicana brasileira. Caracterizada pelo domínio das oligarquias agrárias, especialmente os cafeicultores de São Paulo e os pecuaristas de Minas Gerais, este período consolidou uma república federativa, mas excludente.",
  "pontos_chave": [
    "Proclamação da República (1889): movimento militar e civil",
    "República da Espada (1889-1894): governos militares de transição",
    "República Oligárquica (1894-1930): domínio das elites agrárias", 
    "Política do café com leite: alternância entre SP e MG",
    "Movimentos sociais: Canudos, Contestado, greves operárias"
  ],
  "explicacao_detalhada": "A Proclamação da República em 15 de novembro de 1889 foi resultado da aliança entre militares positivistas, fazendeiros descontentes com a abolição e republicanos urbanos. O novo regime adotou o federalismo, dando autonomia às províncias (agora estados), o que beneficiou as oligarquias regionais. A República da Espada (1889-1894), sob Deodoro da Fonseca e Floriano Peixoto, enfrentou revoltas como a Revolução Federalista no Sul. A partir de 1894, com Prudente de Morais, iniciou-se a República Oligárquica, dominada pela aliança entre São Paulo (café) e Minas Gerais (leite), conhecida como política do café com leite. O sistema eleitoral, baseado no voto aberto e masculino (excluindo analfabetos, mulheres e mendigos), garantia o controle político das elites rurais através do coronelismo e do voto de cabresto. Movimentos populares como Canudos (1896-1897), liderado por Antônio Conselheiro, e Contestado (1912-1916) demonstraram a resistência das populações marginalizadas. Nas cidades, o crescimento industrial promoveu o surgimento da classe operária, que organizou as primeiras greves, como a Greve Geral de 1917 em São Paulo.",
  "curiosidade": "A República foi proclamada na Praça da Aclamação (atual Praça da República) no Rio de Janeiro, mas Dom Pedro II estava em Petrópolis. Quando soube da notícia, o imperador teria dito simplesmente: Se é assim, será; e partiu para o exílio na França sem resistência, demonstrando seu caráter pacífico."
}'
WHERE subject = 'História' AND title = 'República Velha';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Era Vargas (1930-1945, 1951-1954) transformou profundamente o Brasil, marcando a transição de uma economia agrário-exportadora para uma sociedade urbano-industrial. Getúlio Vargas revolucionou a política brasileira, criando um Estado forte e intervencionista.",
  "pontos_chave": [
    "Revolução de 1930: fim da República Velha e das oligarquias",
    "Governo Provisório (1930-1934): centralização política",
    "Estado Novo (1937-1945): ditadura nacionalista e trabalhista",
    "Criação da CLT (1943): consolidação dos direitos trabalhistas",
    "Industrialização: criação da CSN e outras estatais"
  ],
  "explicacao_detalhada": "A Revolução de 1930 foi desencadeada pela crise do café após a quebra da Bolsa de Nova York (1929) e pela ruptura da política do café com leite, quando as oligarquias paulistas lançaram Júlio Prestes em vez de apoiar o mineiro Antônio Carlos. Getúlio Vargas, apoiado pela Aliança Liberal, chegou ao poder prometendo modernizar o país. Durante o Governo Provisório (1930-1934), centralizou o poder, nomeou interventores para os estados e criou novos ministérios. A Constituição de 1934 estabeleceu direitos trabalhistas e o voto feminino. O Estado Novo (1937-1945) foi uma ditadura inspirada no fascismo europeu, mas com características próprias: nacionalismo econômico, trabalhismo e repressão política. Vargas criou o DIP (Departamento de Imprensa e Propaganda) para controlar a informação e perseguiu opositores. Economicamente, promoveu a industrialização através da substituição de importações, criando a CSN (Companhia Siderúrgica Nacional) e a Petrobrás. A CLT (Consolidação das Leis do Trabalho) de 1943 estabeleceu direitos como salário mínimo, férias, 8 horas de trabalho e previdência social, criando as bases do trabalhismo brasileiro.",
  "curiosidade": "Getúlio Vargas foi chamado de Pai dos Pobres e Mãe dos Ricos pela elite, devido à sua política de conciliar interesses dos trabalhadores (direitos sociais) com os dos empresários (proteção à indústria nacional). Sua habilidade política era tanta que conseguiu governar por 19 anos em épocas diferentes!"
}'
WHERE subject = 'História' AND title = 'Era Vargas';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Ditadura Militar brasileira (1964-1985) foi um período autoritário que durou 21 anos. Iniciada com o golpe que derrubou João Goulart, caracterizou-se pela repressão política, censura, violação dos direitos humanos e, paradoxalmente, pelo crescimento econômico conhecido como milagre brasileiro.",
  "pontos_chave": [
    "Golpe de 1964: militares derrubam João Goulart",
    "AI-5 (1968): endurecimento do regime e supressão das liberdades",
    "Milagre Econômico (1968-1973): crescimento do PIB acima de 10%",
    "Repressão política: censura, tortura e perseguição aos opositores",
    "Abertura lenta e gradual: retorno à democracia (1974-1985)"
  ],
  "explicacao_detalhada": "O golpe militar de 31 de março de 1964 foi justificado como necessário para combater a ameaça comunista e a corrupção. Na realidade, refletia o medo das elites conservadoras diante das reformas de base propostas por João Goulart (reforma agrária, urbana, bancária). Os Estados Unidos apoiaram o golpe através da Operação Brother Sam. O regime militar passou por diferentes fases: Castelo Branco (1964-1967) tentou uma liberalização rápida, mas Costa e Silva (1967-1969) endureceu com o AI-5 em dezembro de 1968, que fechou o Congresso, suspendeu direitos políticos e institucionalizou a censura. Médici (1969-1974) foi o período mais repressivo, mas também do milagre econômico, quando o PIB cresceu mais de 10% ao ano. Geisel (1974-1979) iniciou a abertura lenta, gradual e segura, revogando o AI-5. Figueiredo (1979-1985) completou a transição com a Lei da Anistia (1979) e as Diretas Já (1984). A ditadura deixou marcas profundas: mais de 400 mortos e desaparecidos políticos, mas também modernização da economia com grandes obras como Itaipu, Transamazônica e o desenvolvimento da indústria automobilística e petroquímica.",
  "curiosidade": "Durante a ditadura, o Brasil ganhou 3 Copas do Mundo (1962, 1970, 1994). O governo usou o futebol como instrumento de propaganda: durante a Copa de 1970, a vitória brasileira foi amplamente explorada com o slogan Brasil, ame-o ou deixe-o, associando o sucesso no esporte ao regime militar."
}'
WHERE subject = 'História' AND title = 'Ditadura Militar';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Nova República (1985-presente) marca o período democrático brasileiro atual. Iniciada com o fim da ditadura militar, caracteriza-se pela consolidação das instituições democráticas, estabilização econômica e grandes transformações sociais, mas também por crises políticas e desafios persistentes.",
  "pontos_chave": [
    "Redemocratização (1985): fim da ditadura militar",
    "Constituição de 1988: Constituição Cidadã e direitos fundamentais",
    "Plano Real (1994): estabilização monetária e controle da inflação",
    "Governos democráticos: alternância no poder e consolidação institucional",
    "Programas sociais: redução da pobreza e inclusão social"
  ],
  "explicacao_detalhada": "A Nova República começou com a eleição indireta de Tancredo Neves, que morreu antes da posse, levando José Sarney ao poder (1985-1990). Sarney enfrentou a hiperinflação descontrolada, que chegou a mais de 1000% ao ano, criando vários planos econômicos fracassados. A promulgação da Constituição de 1988, conhecida como Constituição Cidadã, estabeleceu direitos fundamentais, fortaleceu o federalismo e criou instrumentos de participação democrática. Fernando Collor (1990-1992) tentou modernizar a economia, mas foi impedido por corrupção. Itamar Franco (1992-1995) preparou o Plano Real. Fernando Henrique Cardoso (1995-2003) consolidou a estabilidade monetária e modernizou o Estado. Luiz Inácio Lula da Silva (2003-2011) promoveu inclusão social através de programas como Bolsa Família, ProUni e expansão do ensino técnico. Dilma Rousseff (2011-2016) enfrentou crise econômica e foi impedida. Michel Temer (2016-2018) e Jair Bolsonaro (2019-2022) representaram períodos de instabilidade. Luiz Inácio Lula da Silva retornou em 2023. O período se caracteriza pela alternância democrática no poder, mas também por crises recorrentes, polarização política e desafios como desigualdade, violência urbana e questões ambientais.",
  "curiosidade": "O Brasil é uma das democracias mais jovens do mundo - nossa Constituição atual tem apenas 35 anos! Apesar disso, já tivemos 13 presidentes eleitos (incluindo reeleições) e realizamos mais de 30 eleições nacionais, estaduais e municipais, demonstrando a consolidação do sistema democrático brasileiro."
}'
WHERE subject = 'História' AND title = 'Nova República';

-- Atualizar conteúdos de História Geral com JSON estruturado e detalhado

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Antiguidade Clássica (séc. VIII a.C. - V d.C.) representa o período de florescimento das civilizações grega e romana, que estabeleceram os fundamentos da cultura ocidental. Suas contribuições em política, filosofia, arte e direito influenciam o mundo até hoje.",
  "pontos_chave": [
    "Grécia Antiga: berço da democracia, filosofia e teatro",
    "Pólis gregas: Atenas (democracia) e Esparta (militarismo)",
    "Roma Antiga: da República ao Império, conquista do Mediterrâneo",
    "Direito Romano: base do sistema jurídico ocidental",
    "Legado cultural: influência na arte, arquitetura e pensamento"
  ],
  "explicacao_detalhada": "A civilização grega desenvolveu-se em pólis (cidades-estado) independentes, sendo Atenas e Esparta as mais importantes. Atenas criou a democracia direta no século V a.C., onde os cidadãos (excluindo mulheres, escravos e estrangeiros) participavam das decisões políticas na Ágora. A filosofia grega, com Sócrates, Platão e Aristóteles, estabeleceu as bases do pensamento racional ocidental. O teatro grego criou a tragédia e a comédia, enquanto a arquitetura desenvolveu as ordens dórica, jônica e coríntia. Roma inicialmente era uma cidade-estado que se expandiu militarmente, conquistando toda a bacia do Mediterrâneo. A República Romana (509-27 a.C.) desenvolveu instituições como o Senado e os cônsules, mas sucumbiu às guerras civis. O Império Romano (27 a.C.-476 d.C.) unificou o mundo mediterrâneo sob uma administração eficiente, construindo estradas, aquedutos e estabelecendo o direito romano. O cristianismo surgiu no Império Romano e se tornou religião oficial no século IV. A queda de Roma em 476 d.C. marcou o fim da Antiguidade e o início da Idade Média na Europa Ocidental.",
  "curiosidade": "A palavra democracia vem do grego demos (povo) + kratos (poder), mas na democracia ateniense apenas 10% da população tinha direito ao voto! Mulheres, escravos, estrangeiros e menores de 18 anos estavam excluídos. Mesmo assim, foi revolucionário para a época permitir que cidadãos comuns participassem das decisões políticas."
}'
WHERE subject = 'História' AND title = 'Antiguidade Clássica';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Idade Média (séc. V-XV) foi o período de transição entre a Antiguidade e a Modernidade na Europa. Caracterizada pelo feudalismo, pelo poder da Igreja Católica e pela ruralização, essa época foi fundamental para a formação da identidade europeia e cristã ocidental.",
  "pontos_chave": [
    "Feudalismo: sistema político, econômico e social baseado na terra",
    "Igreja Católica: poder espiritual e temporal dominante",
    "Sociedade estamental: clero, nobreza e servos",
    "Cruzadas: expedições militares cristãs à Terra Santa",
    "Renascimento urbano e comercial (séc. XI-XIII)"
  ],
  "explicacao_detalhada": "A Idade Média iniciou-se com a queda do Império Romano do Ocidente (476 d.C.) e as invasões bárbaras. O feudalismo emergiu como resposta à insegurança, organizando a sociedade em torno da posse da terra. O sistema feudal baseava-se nas relações de vassalagem: o senhor feudal oferecia proteção e terra (feudo) em troca de fidelidade e serviços militares do vassalo. A sociedade medieval era estamental e estática: o clero (orava), a nobreza (guerreava) e os servos (trabalhavam). A Igreja Católica exercia imenso poder espiritual e temporal, controlando a educação, a cultura e influenciando a política. Os mosteiros preservaram o conhecimento clássico durante a Alta Idade Média. As Cruzadas (1095-1291) foram expedições militares para reconquistar a Terra Santa dos muçulmanos, promovendo trocas comerciais e culturais. A partir do século XI, o renascimento urbano e comercial reativou as cidades, surgindo uma nova classe social: a burguesia. As universidades medievais, criadas nos séculos XII-XIII, desenvolveram a filosofia escolástica, que conciliava razão e fé. A Peste Negra (1347-1351) devastou a Europa, matando um terço da população e acelerando as transformações que levariam ao fim do feudalismo.",
  "curiosidade": "Ao contrário do que muitos pensam, as pessoas na Idade Média não acreditavam que a Terra era plana! Os estudiosos medievais sabiam que ela era redonda desde a Antiguidade. A ideia da Terra plana medieval é um mito criado no século XIX. Na verdade, Colombo enfrentou resistência não por acharem que ele cairia da Terra, mas por calcularem (corretamente) que a distância até a Ásia era muito maior do que ele imaginava!"
}'
WHERE subject = 'História' AND title = 'Idade Média';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Idade Moderna (séc. XV-XVIII) marca a transição do mundo medieval para o moderno. Caracterizada pelas Grandes Navegações, pelo absolutismo monárquico e pelo mercantilismo, esse período testemunhou a expansão europeia pelo mundo e profundas transformações culturais e religiosas.",
  "pontos_chave": [
    "Grandes Navegações: expansão marítima europeia",
    "Descobrimento da América (1492): novo continente",
    "Absolutismo: concentração do poder real",
    "Mercantilismo: política econômica protecionista",
    "Reforma Protestante: divisão da cristandade europeia"
  ],
  "explicacao_detalhada": "A Idade Moderna começou com as Grandes Navegações dos séculos XV-XVI, quando portugueses e espanhóis buscaram rotas alternativas para o Oriente após a tomada de Constantinopla pelos turcos (1453). Portugal pioneirizou as navegações com a Escola de Sagres e as viagens de Bartolomeu Dias e Vasco da Gama. Cristóvão Colombo, navegando para a Espanha, descobriu a América em 1492, iniciando a colonização do Novo Mundo. O absolutismo monárquico centralizou o poder nas mãos dos reis, como Luís XIV na França (Rei Sol), que declarava: O Estado sou eu. O mercantilismo orientou a política econômica, priorizando o acúmulo de metais preciosos e o protecionismo. A Reforma Protestante (1517) iniciou-se com Martinho Lutero questionando práticas da Igreja Católica, dividindo a cristandade europeia. A Contrarreforma católica respondeu com o Concílio de Trento e a Inquisição. As guerras religiosas devastaram a Europa, terminando com a Paz de Westfália (1648), que estabeleceu o princípio da soberania nacional. O Renascimento cultural promoveu o humanismo e o antropocentrismo, questionando o teocentrismo medieval. A Revolução Científica, com Copérnico, Galileu e Newton, estabeleceu o método científico e questionou verdades aceitas pela Igreja.",
  "curiosidade": "Durante a Idade Moderna, a batata foi considerada alimento do diabo na Europa! Trazida da América, ela demorou séculos para ser aceita. Na França, o farmacêutico Antoine-Augustin Parmentier promoveu seu cultivo colocando guardas armados durante o dia em campos de batata, despertando a curiosidade popular. À noite, as pessoas roubavam as batatas, espalhando seu cultivo!"
}'
WHERE subject = 'História' AND title = 'Idade Moderna';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "A Revolução Industrial (séc. XVIII-XIX) transformou radicalmente a humanidade, marcando a transição da economia agrária e manufatureira para a mecanizada e fabril. Iniciada na Inglaterra, essa revolução mudou as relações de trabalho, a estrutura social e o meio ambiente.",
  "pontos_chave": [
    "Primeira Revolução Industrial (1760-1840): máquina a vapor e têxtil",
    "Surgimento da classe operária e da burguesia industrial",
    "Urbanização acelerada e crescimento populacional",
    "Transformações nas relações de trabalho: do artesão ao operário",
    "Impactos ambientais: poluição e exploração de recursos naturais"
  ],
  "explicacao_detalhada": "A Revolução Industrial começou na Inglaterra devido a fatores como disponibilidade de carvão e ferro, capital acumulado pelo comércio colonial, revolução agrícola que liberou mão de obra e estabilidade política. A invenção da máquina a vapor por James Watt (1769) revolucionou a produção e os transportes. A indústria têxtil foi pioneira, com máquinas como a spinning jenny e o tear mecânico multiplicando a produção. As ferrovias, surgidas na década de 1820, aceleraram o transporte de mercadorias e pessoas. A Segunda Revolução Industrial (1870-1914) trouxe eletricidade, aço, produtos químicos e o motor a combustão. O sistema fabril concentrou trabalhadores sob um mesmo teto, criando a classe operária. As condições de trabalho eram péssimas: jornadas de 14-16 horas, trabalho infantil, salários baixos e ambientes insalubres. A burguesia industrial emergiu como nova classe dominante, acumulando grandes fortunas. A urbanização acelerada criou problemas sociais: superpopulação, poluição, doenças e criminalidade. Movimentos operários surgiram demandando melhores condições: ludismo (quebra de máquinas), cartismo (direitos políticos) e socialismo. A Revolução Industrial espalhou-se pela Europa, América do Norte e depois pelo mundo, transformando-se no modelo de desenvolvimento econômico moderno.",
  "curiosidade": "A expressão horário de rush vem da Revolução Industrial! Como as fábricas tinham horários fixos, milhares de operários saíam ao mesmo tempo, criando o primeiro rush hour da história. Antes disso, o trabalho artesanal seguia o ritmo natural do sol, sem horários rígidos. A Revolução Industrial literalmente inventou o relógio de ponto e a vida moderna controlada pelo tempo!"
}'
WHERE subject = 'História' AND title = 'Revolução Industrial';

UPDATE public.subject_contents 
SET content_data = '{
  "introducao": "As Guerras Mundiais e a Guerra Fria (1914-1991) definiram o século XX como o mais violento da história humana. Esses conflitos globais redefiniram fronteiras, criaram novas potências mundiais e estabeleceram a ordem internacional contemporânea.",
  "pontos_chave": [
    "Primeira Guerra Mundial (1914-1918): Grande Guerra devastou a Europa",
    "Segunda Guerra Mundial (1939-1945): conflito global e Holocausto",
    "Guerra Fria (1947-1991): bipolarização entre EUA e URSS",
    "Corrida armamentista e espacial: bomba atômica e conquista lunar",
    "Descolonização da África e Ásia após as guerras"
  ],
  "explicacao_detalhada": "A Primeira Guerra Mundial eclodiu devido às tensões imperialistas, nacionalistas e ao sistema de alianças europeias. O assassinato do arquiduque Francisco Ferdinando em Sarajevo (1914) foi o estopim. A guerra revolucionou a arte militar com trincheiras, armas químicas e aviação. Os EUA entraram em 1917, decidindo o conflito. O Tratado de Versalhes (1919) humilhou a Alemanha, criando ressentimentos que contribuíram para a Segunda Guerra. A crise de 1929 e a ascensão do nazismo na Alemanha levaram ao segundo conflito global. Hitler iniciou a guerra invadindo a Polônia (1939). A Segunda Guerra foi marcada pelo Holocausto (extermínio de 6 milhões de judeus), pela participação global e pelo uso de bombas atômicas no Japão (1945). Após 1945, emerge a bipolarização entre EUA (capitalista) e URSS (socialista). A Guerra Fria caracterizou-se pela corrida armamentista nuclear, conquista espacial, guerras por procuração (Coreia, Vietnã, Afeganistão) e construção de blocos militares (OTAN vs. Pacto de Varsóvia). A crise dos mísseis em Cuba (1962) quase provocou guerra nuclear. A détente nos anos 1970 reduziu tensões, mas a corrida armamentista continuou. A Guerra Fria terminou com a glasnost e perestroika de Gorbachev, a queda do Muro de Berlim (1989) e o fim da URSS (1991).",
  "curiosidade": "Durante a Guerra Fria, EUA e URSS nunca se enfrentaram diretamente, mas gastaram trilhões em armamentos. Se todo o dinheiro gasto na corrida armamentista tivesse sido usado para desenvolvimento, a fome mundial poderia ter sido erradicada várias vezes! O nome Guerra Fria vem justamente do fato de ser uma guerra que nunca esquentou - isto é, nunca houve confronto militar direto entre as superpotências."
}'
WHERE subject = 'História' AND title = 'Guerras Mundiais e Guerra Fria';