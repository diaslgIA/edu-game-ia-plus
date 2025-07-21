
-- Continuação dos conteúdos educacionais para todas as matérias do ENEM

-- FÍSICA - ELETRICIDADE E MAGNETISMO
INSERT INTO subject_contents (
  subject, grande_tema, title, description, content_type, difficulty_level, 
  estimated_time, explanation, detailed_explanation, examples, 
  practical_applications, study_tips, key_concepts, order_index
) VALUES

('Física', 'Eletricidade e Magnetismo', 'Eletrodinâmica: Circuitos e Leis de Ohm', 
'Estudo da corrente elétrica, resistência e circuitos elétricos',
'theory', 'medium', 50,
'Eletrodinâmica estuda as cargas elétricas em movimento, através dos conceitos de corrente, tensão, resistência e potência.',
'A Eletrodinâmica é o ramo da eletricidade que estuda as cargas elétricas em movimento, formando a corrente elétrica.

CONCEITOS FUNDAMENTAIS:

CORRENTE ELÉTRICA (i):
É o fluxo ordenado de cargas elétricas através de um condutor.
i = Q/t (Ampère = Coulomb/segundo)
• Corrente contínua (CC): fluxo constante em uma direção
• Corrente alternada (CA): fluxo que muda de direção periodicamente

TENSÃO OU DIFERENÇA DE POTENCIAL (U):
É a "pressão elétrica" que impulsiona as cargas.
Medida em Volts (V)
• Analogia: é como a pressão da água em um encanamento

RESISTÊNCIA ELÉTRICA (R):
É a oposição que o material oferece à passagem da corrente.
Medida em Ohms (Ω)
Fatores que afetam a resistência:
• Material (resistividade ρ)
• Comprimento (L): maior comprimento = maior resistência
• Área da seção transversal (A): maior área = menor resistência
• Temperatura: geralmente aumenta a resistência

PRIMEIRA LEI DE OHM:
"A tensão entre dois pontos de um condutor é proporcional à corrente que passa por ele"
U = R × i

SEGUNDA LEI DE OHM:
R = ρ × L/A
Onde ρ é a resistividade do material

POTÊNCIA ELÉTRICA:
É a energia consumida por unidade de tempo.
P = U × i = R × i² = U²/R
Medida em Watts (W)

ENERGIA ELÉTRICA:
E = P × t = U × i × t
Medida em Watt-hora (Wh) ou Quilowatt-hora (kWh)

ASSOCIAÇÃO DE RESISTORES:

1. EM SÉRIE:
• Mesma corrente passa por todos
• Tensão total = soma das tensões parciais
• Resistência total: Rt = R1 + R2 + R3 + ...

2. EM PARALELO:
• Mesma tensão em todos os resistores
• Corrente total = soma das correntes parciais
• Resistência total: 1/Rt = 1/R1 + 1/R2 + 1/R3 + ...

GERADORES E RECEPTORES:
• Gerador: transforma outras formas de energia em elétrica
• Receptor: transforma energia elétrica em outras formas
• Força eletromotriz (fem): tensão máxima do gerador',
'Exemplo 1: Aplicação da Lei de Ohm
Uma lâmpada de 60W conectada em 120V. Qual sua resistência e corrente?
P = U²/R → 60 = 120²/R → R = 14400/60 = 240Ω
i = U/R = 120/240 = 0,5A

Exemplo 2: Chuveiro elétrico
Por que o chuveiro na posição "inverno" consome mais energia?
Na posição inverno, a resistência é menor:
- Menor R → maior i (pela Lei de Ohm)
- Maior i → maior P (P = R × i²)
- Maior P → mais energia consumida e mais calor

Exemplo 3: Associação em série
Três resistores de 10Ω, 20Ω e 30Ω em série com bateria de 12V:
Rt = 10 + 20 + 30 = 60Ω
i = U/Rt = 12/60 = 0,2A
Tensão em cada resistor:
U1 = R1 × i = 10 × 0,2 = 2V
U2 = 20 × 0,2 = 4V
U3 = 30 × 0,2 = 6V

Exemplo 4: Conta de luz
Uma casa consome 300 kWh em um mês. Se o kWh custa R$ 0,50:
Custo = 300 × 0,50 = R$ 150,00

Exemplo 5: Fusível
Um circuito de 110V tem fusível de 15A. Potência máxima suportada:
P = U × i = 110 × 15 = 1650W = 1,65kW',
'ELETRODOMÉSTICOS:
• Chuveiro elétrico: resistência aquece água (efeito Joule)
• Ferro de passar: resistência controlada por termostato
• Lâmpadas incandescentes: filamento aquecido pela corrente
• Micro-ondas: ondas eletromagnéticas aquecem alimentos

INSTALAÇÕES ELÉTRICAS:
• Circuitos domésticos em paralelo (mesma tensão)
• Disjuntores protegem contra sobrecarga
• Fio terra para segurança
• Diferencial residual (DR) protege contra choques

VEÍCULOS ELÉTRICOS:
• Bateria fornece energia para motor elétrico
• Regeneração: motor funciona como gerador na frenagem
• Carregamento: conversão CA para CC

ELETRÔNICOS:
• Celulares: bateria de íon-lítio
• Computadores: fonte converte CA em CC
• LED: diodo emissor de luz (maior eficiência)

ECONOMIA DE ENERGIA:
• Lâmpadas LED consomem menos que incandescentes
• Aparelhos em standby consomem energia
• Isolamento térmico reduz uso de ar condicionado',
'1. Identifique se o circuito é série, paralelo ou misto
2. Em série: mesma corrente; em paralelo: mesma tensão
3. Potência alta = maior consumo de energia
4. Para economia: P = U²/R, então maior R = menor consumo
5. kWh é unidade de energia, não potência
6. Resistência de chuveiro diminui quando esquenta mais
7. Sempre verifique unidades: V, A, Ω, W, kWh
8. Efeito Joule: energia elétrica vira calor (P = R × i²)',
'["corrente elétrica", "tensão", "resistência", "Lei de Ohm", "potência elétrica", "circuitos", "efeito Joule"]', 5),

('Física', 'Eletricidade e Magnetismo', 'Eletrostática: Cargas e Campo Elétrico', 
'Estudo das cargas elétricas em repouso e suas interações',
'theory', 'medium', 45,
'Eletrostática estuda cargas elétricas em repouso, processos de eletrização e campos elétricos.',
'A Eletrostática estuda os fenômenos relacionados às cargas elétricas em repouso.

CARGA ELÉTRICA:
Propriedade fundamental da matéria, pode ser positiva ou negativa.
• Elétron: carga negativa (-e = -1,6 × 10⁻¹⁹ C)
• Próton: carga positiva (+e = +1,6 × 10⁻¹⁹ C)
• Princípio da conservação: carga total se conserva
• Quantização: Q = n × e (n = número inteiro)

PROCESSOS DE ELETRIZAÇÃO:

1. ELETRIZAÇÃO POR ATRITO:
• Dois corpos neutros são atritados
• Um perde elétrons (fica positivo)
• Outro ganha elétrons (fica negativo)
• Exemplo: pentear cabelo seco, varinha de vidro com seda

2. ELETRIZAÇÃO POR CONTATO:
• Corpo eletrizado toca corpo neutro
• Cargas se redistribuem
• Ambos ficam com cargas de mesmo sinal
• Exemplo: tocar maçaneta após caminhar em tapete

3. ELETRIZAÇÃO POR INDUÇÃO:
• Corpo eletrizado se aproxima de condutor neutro
• Cargas do condutor se reorganizam
• Conecta-se temporariamente à terra
• Remove-se a conexão e depois o indutor
• Exemplo: para-raios

LEI DE COULOMB:
"A força entre duas cargas é proporcional ao produto das cargas e inversamente proporcional ao quadrado da distância"

F = k × |q1 × q2|/d²

Onde:
• k = 9 × 10⁹ N⋅m²/C² (constante eletrostática)
• F = força elétrica (N)
• q1, q2 = cargas (C)
• d = distância entre cargas (m)

CAMPO ELÉTRICO:
Região ao redor de uma carga onde outra carga sofre força elétrica.

E = F/q = k × Q/d²

Características:
• Grandeza vetorial
• Linhas de força saem de cargas positivas
• Linhas de força chegam em cargas negativas
• Quanto mais próximas as linhas, mais intenso o campo

POTENCIAL ELÉTRICO:
Energia potencial elétrica por unidade de carga.
V = k × Q/d
• Medido em Volts (V)
• Superfícies equipotenciais: mesmo potencial
• Campo elétrico aponta no sentido de diminuição do potencial',
'Exemplo 1: Força entre cargas
Duas cargas de +2μC estão separadas por 30cm. Qual a força entre elas?
F = k × q1 × q2/d²
F = 9×10⁹ × 2×10⁻⁶ × 2×10⁻⁶/(0,3)²
F = 36×10⁻³/0,09 = 0,4 N (repulsiva)

Exemplo 2: Eletrização por atrito
Cabelo seco atritado com pente plástico:
- Pente retira elétrons do cabelo
- Cabelo fica positivo, pente negativo
- Cabelo é atraído pelo pente

Exemplo 3: Para-raios
Nuvem carregada negativamente induz cargas positivas na ponta do para-raios:
- Campo elétrico intenso na ponta
- Ioniza o ar ao redor
- Cria caminho para descarga elétrica

Exemplo 4: Impressora jato de tinta
- Gotículas de tinta são carregadas eletricamente
- Campo elétrico dirige as gotículas
- Forma caracteres no papel

Exemplo 5: Xerox (fotocópia)
- Tambor recebe carga uniforme
- Luz remove cargas de certas regiões
- Toner adere apenas às regiões carregadas',
'FENÔMENOS COTIDIANOS:
• Choque ao tocar maçaneta (descarga eletrostática)
• Cabelo arrepiado depois de escorregar no plástico
• Papel atraído por caneta atritada
• Roupa grudando no corpo (eletricidade estática)

TECNOLOGIA:
• Impressoras a laser e jato de tinta
• Máquinas de xerox
• Filtros eletrostáticos (purificação de ar)
• Pintura eletrostática (carros)

PROTEÇÃO:
• Para-raios protegem edifícios
• Aterramento de equipamentos eletrônicos
• Pulseiras antiestáticas para eletrônicos
• Umidificadores reduzem eletricidade estática

MEDICINA:
• Eletrocardiograma (ECG)
• Desfibrilador (choque controlado)
• Eletroencefalograma (EEG)',
'1. Cargas iguais se repelem, diferentes se atraem
2. Em condutores, cargas se movem livremente
3. Em isolantes, cargas ficam onde foram colocadas
4. Campo elétrico sai de (+) e chega em (-)
5. Força coulombiana diminui com quadrado da distância
6. Para-raios funcionam por indução eletrostática
7. Umidade do ar facilita escoamento de cargas
8. Aterramento é fundamental para segurança',
'["carga elétrica", "eletrização", "Lei de Coulomb", "campo elétrico", "potencial elétrico", "condutor", "isolante"]', 6),

-- QUÍMICA - QUÍMICA GERAL
('Química', 'Química Geral', 'Estrutura Atômica e Tabela Periódica', 
'Compreensão do átomo e organização dos elementos químicos',
'theory', 'medium', 60,
'Estudo da estrutura interna do átomo e como os elementos se organizam na Tabela Periódica.',
'A estrutura atômica é fundamental para compreender o comportamento químico dos elementos.

ESTRUTURA DO ÁTOMO:

PARTÍCULAS FUNDAMENTAIS:
• Prótons: carga positiva (+1), massa ≈ 1u, localização: núcleo
• Nêutrons: sem carga (0), massa ≈ 1u, localização: núcleo
• Elétrons: carga negativa (-1), massa ≈ 1/1836u, localização: eletrosfera

CARACTERÍSTICAS ATÔMICAS:
• Número atômico (Z): número de prótons
• Número de massa (A): prótons + nêutrons
• Átomo neutro: número de prótons = número de elétrons
• Íon: átomo que ganhou ou perdeu elétrons

MODELOS ATÔMICOS (EVOLUÇÃO HISTÓRICA):
1. Dalton (1808): átomo como esfera indivisível
2. Thomson (1897): modelo do "pudim de passas"
3. Rutherford (1911): modelo planetário
4. Bohr (1913): níveis de energia quantizados
5. Modelo atual: orbital atômico (mecânica quântica)

DISTRIBUIÇÃO ELETRÔNICA:
Organização dos elétrons em níveis e subníveis de energia.

Níveis de energia (camadas): K, L, M, N, O, P, Q (1, 2, 3, 4, 5, 6, 7)
Subníveis: s, p, d, f
Capacidade máxima:
• s: 2 elétrons
• p: 6 elétrons  
• d: 10 elétrons
• f: 14 elétrons

Ordem energética: 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p

TABELA PERIÓDICA:

ORGANIZAÇÃO:
• Períodos (horizontais): mesmo número de níveis eletrônicos
• Famílias/Grupos (verticais): mesmo número de elétrons na camada de valência

PRINCIPAIS FAMÍLIAS:
• Família 1A: Metais alcalinos (1 elétron de valência)
• Família 2A: Metais alcalino-terrosos (2 elétrons)
• Família 6A: Calcogênios (6 elétrons)
• Família 7A: Halogênios (7 elétrons)
• Família 8A: Gases nobres (8 elétrons - estáveis)

PROPRIEDADES PERIÓDICAS:

1. RAIO ATÔMICO:
• Aumenta de cima para baixo (mais níveis)
• Diminui da esquerda para direita (mais prótons)

2. ENERGIA DE IONIZAÇÃO:
• Energia para remover um elétron
• Aumenta da esquerda para direita
• Diminui de cima para baixo

3. ELETRONEGATIVIDADE:
• Tendência de atrair elétrons
• Aumenta da esquerda para direita
• Diminui de cima para baixo
• Flúor é o mais eletronegativo (4,0)',
'Exemplo 1: Distribuição eletrônica
Ferro (Fe, Z=26):
1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶
Camada de valência: 4s² 3d⁶ (8 elétrons)

Exemplo 2: Íons
Sódio (Na, Z=11): 1s² 2s² 2p⁶ 3s¹
Na⁺ (perde 1 elétron): 1s² 2s² 2p⁶ (configuração do neônio)

Exemplo 3: Propriedades periódicas
Compare Li, Na, K (mesma família):
- Raio atômico: Li < Na < K
- Energia de ionização: Li > Na > K
- Todos têm 1 elétron de valência

Exemplo 4: Previsão de comportamento
Elementos da família 7A (halogênios):
- Tendem a ganhar 1 elétron
- Formam íons com carga -1
- São muito reativos

Exemplo 5: Gases nobres
Hélio (2 elétrons), Neônio (8 elétrons):
- Camadas completas
- Muito estáveis
- Não reagem facilmente',
'MEDICINA NUCLEAR:
• Isótopos radioativos para diagnóstico
• Iodo-131 para tireoide
• Tecnécio-99m para imagens médicas

DATAÇÃO ARQUEOLÓGICA:
• Carbono-14 para datar fósseis
• Meia-vida permite calcular idade

ENERGIA NUCLEAR:
• Urânio-235 em usinas nucleares
• Fusão nuclear no Sol (hidrogênio → hélio)

AGRICULTURA:
• Fertilizantes baseados em nitrogênio, fósforo, potássio
• Isótopos para estudar absorção de nutrientes

TECNOLOGIA:
• Semicondutores (silício, germânio)
• Supercondutores (terras raras)
• Baterias (lítio, cobalto)',
'1. Número atômico determina identidade do elemento
2. Distribuição eletrônica explica propriedades químicas
3. Elementos da mesma família têm comportamento similar
4. Metais perdem elétrons, não-metais ganham
5. Gases nobres são estáveis (camadas completas)
6. Eletronegatividade cresce para flúor
7. Use o diagrama de Pauling para distribuição eletrônica
8. Íons têm tamanhos diferentes dos átomos neutros',
'["próton", "nêutron", "elétron", "distribuição eletrônica", "propriedades periódicas", "família", "período"]', 1),

('Química', 'Química Geral', 'Ligações Químicas e Forças Intermoleculares', 
'Como os átomos se unem e as forças entre moléculas',
'theory', 'hard', 65,
'Estudo de como átomos se ligam para formar compostos e as forças entre as moléculas.',
'As ligações químicas explicam como átomos se unem para formar substâncias.

REGRA DO OCTETO:
"Átomos tendem a ganhar, perder ou compartilhar elétrons para adquirir 8 elétrons na camada de valência"
Exceções: Hidrogênio (2 elétrons), elementos do 3º período em diante podem expandir.

TIPOS DE LIGAÇÃO QUÍMICA:

1. LIGAÇÃO IÔNICA:
• Entre metal e não-metal
• Transferência de elétrons
• Metal vira cátion (+), não-metal vira ânion (-)
• Forma cristais iônicos
• Exemplo: NaCl (Na⁺ + Cl⁻)

Propriedades dos compostos iônicos:
- Sólidos em temperatura ambiente
- Altos pontos de fusão e ebulição
- Conduzem eletricidade quando fundidos ou em solução
- Solúveis em solventes polares (água)

2. LIGAÇÃO COVALENTE:
• Entre não-metais
• Compartilhamento de elétrons
• Forma moléculas

Tipos:
- Simples: 1 par de elétrons compartilhado (H-H)
- Dupla: 2 pares compartilhados (O=O)
- Tripla: 3 pares compartilhados (N≡N)

Propriedades dos compostos covalentes:
- Podem ser gases, líquidos ou sólidos
- Pontos de fusão e ebulição variáveis
- Não conduzem eletricidade (exceto grafite)
- Solubilidade depende da polaridade

3. LIGAÇÃO METÁLICA:
• Entre metais
• "Mar de elétrons" deslocalizado
• Exemplo: ferro, alumínio

Propriedades:
- Condutividade elétrica e térmica
- Brilho metálico
- Maleabilidade e ductilidade

POLARIDADE DAS LIGAÇÕES:
• Ligação apolar: eletronegatividades iguais
• Ligação polar: diferença de eletronegatividade
• Dipolo: separação de cargas (δ+ e δ-)

GEOMETRIA MOLECULAR:
Teoria VSEPR (Valence Shell Electron Pair Repulsion):
• Linear: 2 ligações (CO₂)
• Angular: 2 ligações + pares solitários (H₂O)
• Trigonal plana: 3 ligações (BF₃)
• Piramidal: 3 ligações + 1 par solitário (NH₃)
• Tetraédrica: 4 ligações (CH₄)

POLARIDADE MOLECULAR:
Depende da geometria e polaridade das ligações:
• Molécula apolar: momento dipolar = 0
• Molécula polar: momento dipolar ≠ 0

FORÇAS INTERMOLECULARES:

1. FORÇAS DE VAN DER WAALS (LONDON):
• Entre moléculas apolares
• Dipolos instantâneos e induzidos
• Mais fracas
• Exemplo: gases nobres

2. DIPOLO-DIPOLO:
• Entre moléculas polares
• Atração entre extremidades opostas
• Intensidade média
• Exemplo: HCl

3. LIGAÇÃO DE HIDROGÊNIO:
• H ligado a F, O ou N interage com par solitário
• Mais forte que dipolo-dipolo
• Exemplo: H₂O, NH₃, HF

PROPRIEDADES INFLUENCIADAS:
• Ponto de fusão e ebulição
• Solubilidade
• Viscosidade
• Tensão superficial',
'Exemplo 1: Ligação iônica
NaCl: Na (1 elétron de valência) → Na⁺ + e⁻
      Cl (7 elétrons de valência) + e⁻ → Cl⁻
Cristal iônico com forte atração eletrostática.

Exemplo 2: Polaridade molecular
H₂O: ligações O-H polares + geometria angular = molécula polar
CO₂: ligações C=O polares + geometria linear = molécula apolar

Exemplo 3: Ligação de hidrogênio
Água tem ponto de ebulição alto (100°C) comparado ao H₂S (-60°C):
H₂O faz ligações de hidrogênio (mais energia para quebrar)

Exemplo 4: Solubilidade
"Semelhante dissolve semelhante":
- Sal (iônico) dissolve em água (polar)
- Óleo (apolar) não dissolve em água (polar)
- Óleo dissolve em gasolina (ambos apolares)

Exemplo 5: Condutividade
Grafite conduz eletricidade (elétrons deslocalizados)
Diamante não conduz (todos elétrons localizados)',
'MATERIAIS:
• Cerâmicas: ligações iônicas (isolantes, duros)
• Metais: ligações metálicas (condutores, maleáveis)
• Plásticos: ligações covalentes (isolantes, flexíveis)

SOLVENTES:
• Água dissolve substâncias polares e iônicas
• Álcool dissolve algumas substâncias polares
• Gasolina dissolve substâncias apolares

DETERGENTES:
• Moléculas anfifílicas (parte polar e apolar)
• Parte apolar interage com gordura
• Parte polar interage com água

FARMACOLOGIA:
• Solubilidade determina absorção de medicamentos
• Moléculas polares não atravessam membranas facilmente
• Medicamentos lipofílicos atravessam barreiras

COSMÉTICOS:
• Cremes: emulsão de substâncias polares e apolares
• Protetor solar: moléculas que absorvem UV',
'1. Metal + não-metal = ligação iônica
2. Não-metal + não-metal = ligação covalente
3. Geometria molecular determina polaridade
4. Ligação de hidrogênio é mais forte que dipolo-dipolo
5. Semelhante dissolve semelhante
6. Forças intermoleculares afetam pontos de fusão/ebulição
7. Água é polar por ser angular
8. CO₂ é apolar por ser linear',
'["ligação iônica", "ligação covalente", "polaridade", "geometria molecular", "forças intermoleculares", "ligação de hidrogênio"]', 2);
