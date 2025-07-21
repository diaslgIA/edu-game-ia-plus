
-- Inserir conteúdos detalhados de Física
INSERT INTO subject_contents (
  subject, grande_tema, title, description, content_type, difficulty_level, 
  estimated_time, explanation, detailed_explanation, examples, 
  practical_applications, study_tips, key_concepts, order_index
) VALUES

-- FÍSICA - MECÂNICA
('Física', 'Mecânica', 'Cinemática: Velocidade, Aceleração e MUV', 
'Estudo do movimento sem considerar suas causas - conceitos de posição, velocidade e aceleração',
'theory', 'medium', 45,
'A Cinemática descreve o movimento sem se preocupar com suas causas. Conceitos-chave: posição, deslocamento, velocidade (média e instantânea) e aceleração.',
'A Cinemática é o ramo da Mecânica que descreve o movimento dos corpos sem se preocupar com as causas que os provocam. É fundamental compreender que movimento é relativo - depende do referencial escolhido.

CONCEITOS FUNDAMENTAIS:
• Posição: localização de um objeto no espaço em relação a um ponto de referência
• Deslocamento: mudança de posição (Δs = sf - si)
• Velocidade média: Vm = Δs/Δt (indica rapidez da mudança de posição)
• Velocidade instantânea: velocidade em um instante específico
• Aceleração: taxa de variação da velocidade (a = Δv/Δt)

MOVIMENTOS FUNDAMENTAIS:
1. Movimento Uniforme (MU): velocidade constante, aceleração zero
   - Função horária: s = s0 + vt
   - Gráfico v×t: linha horizontal
   - Gráfico s×t: linha inclinada

2. Movimento Uniformemente Variado (MUV): aceleração constante
   - Funções horárias: v = v0 + at; s = s0 + v0t + ½at²
   - Equação de Torricelli: v² = v0² + 2aΔs
   - Gráfico v×t: linha inclinada
   - Gráfico s×t: parábola

INTERPRETAÇÃO DE GRÁFICOS:
• No gráfico v×t: a inclinação representa a aceleração
• No gráfico v×t: a área sob a curva representa o deslocamento
• No gráfico s×t: a inclinação representa a velocidade

QUEDA LIVRE:
Caso especial de MUV onde a aceleração é a gravidade (g ≈ 10 m/s²), sempre vertical e para baixo.',
'Exemplo 1: Carro partindo do repouso
Um carro acelera uniformemente de 0 a 60 km/h em 10 segundos.
- Velocidade inicial: v0 = 0
- Velocidade final: v = 60 km/h = 16,7 m/s  
- Tempo: t = 10s
- Aceleração: a = (16,7-0)/10 = 1,67 m/s²

Exemplo 2: Encontro de dois veículos
Dois carros partem de pontos distantes 120 km, um em direção ao outro. O primeiro a 80 km/h e o segundo a 40 km/h. Quando se encontram?
- Velocidade relativa de aproximação: 80 + 40 = 120 km/h
- Tempo de encontro: t = 120 km ÷ 120 km/h = 1 hora

Exemplo 3: Interpretação gráfica
Em um gráfico v×t que mostra uma linha reta de 0 a 20 m/s em 4 segundos:
- Aceleração: a = 20/4 = 5 m/s²
- Deslocamento: área do triângulo = (20×4)/2 = 40 m',
'No ENEM, a Cinemática aparece principalmente em situações cotidianas:
• Análise de acidentes de trânsito (distância de frenagem)
• Movimento de projéteis (alcance máximo de um tiro)
• Elevadores em edifícios
• Competições esportivas (corrida, salto)
• Gráficos de velocidade de veículos em viagens

O foco está na interpretação de gráficos e na compreensão dos conceitos, não apenas no uso de fórmulas. As questões frequentemente apresentam gráficos de v×t ou s×t e pedem para calcular:
- Aceleração (inclinação do gráfico v×t)
- Deslocamento (área sob o gráfico v×t)
- Velocidade em determinado instante
- Instante ou posição de encontro de dois móveis',
'1. Sempre desenhe o gráfico quando não for fornecido - visualizar ajuda muito
2. Identifique o tipo de movimento antes de escolher a equação
3. Para encontro de móveis, iguale as funções horárias das posições
4. Lembre-se: no gráfico v×t, área = deslocamento; inclinação = aceleração
5. Converta unidades quando necessário (km/h para m/s: divida por 3,6)
6. Em queda livre, use g = 10 m/s² (aproximação do ENEM)
7. Atenção aos sinais: movimento no sentido positivo da trajetória é (+)',
'["posição", "velocidade", "aceleração", "MUV", "gráficos cinemáticos", "queda livre", "encontro de móveis"]', 1),

('Física', 'Mecânica', 'Leis de Newton e Dinâmica', 
'As três leis que explicam as causas do movimento e suas aplicações práticas',
'theory', 'medium', 50,
'A Dinâmica estuda as causas do movimento através das Três Leis de Newton: Inércia, Princípio Fundamental (F=ma) e Ação-Reação.',
'A Dinâmica é o ramo da Mecânica que estuda as causas dos movimentos. Isaac Newton formulou três leis fundamentais que explicam todos os movimentos:

PRIMEIRA LEI DE NEWTON (LEI DA INÉRCIA):
"Todo corpo tende a manter seu estado de movimento: se está em repouso, tende a continuar em repouso; se está em movimento retilíneo uniforme, tende a continuar assim, a menos que uma força externa atue sobre ele."

Conceitos importantes:
• Inércia: propriedade da matéria de resistir a mudanças no estado de movimento
• Quanto maior a massa, maior a inércia
• Aplicações: cinto de segurança, freadas bruscas, curvas em alta velocidade

SEGUNDA LEI DE NEWTON (PRINCÍPIO FUNDAMENTAL):
"A força resultante sobre um corpo é igual ao produto de sua massa pela aceleração"
F = ma (em forma vetorial: F⃗ = ma⃗)

Conceitos importantes:
• Força é uma grandeza vetorial (tem direção e sentido)
• A aceleração tem sempre a mesma direção da força resultante
• Quando F = 0, a = 0 (primeira lei)
• Peso é força: P = mg

TERCEIRA LEI DE NEWTON (AÇÃO E REAÇÃO):
"Para toda ação existe uma reação de mesma intensidade, mesma direção e sentido oposto"

Características do par ação-reação:
• Atuam em corpos diferentes
• Têm sempre a mesma intensidade
• Têm sempre a mesma direção
• Têm sempre sentidos opostos
• Não se anulam (atuam em corpos diferentes)

TIPOS DE FORÇA:
• Força peso: P = mg (sempre vertical, para baixo)
• Força normal: perpendicular à superfície de contato
• Força de atrito: paralela à superfície, oposta ao movimento
• Força de tração: exercida por fios, cordas, cabos
• Força elástica: exercida por molas (F = kx)',
'Exemplo 1: Aplicação da Segunda Lei
Um bloco de 2 kg é empurrado com força de 10 N sobre uma superfície sem atrito.
- Força resultante: Fr = 10 N
- Massa: m = 2 kg
- Aceleração: a = F/m = 10/2 = 5 m/s²

Exemplo 2: Força de atrito
Um bloco de 5 kg é empurrado com 20 N, mas acelera apenas 2 m/s².
- Força aplicada: 20 N
- Aceleração: 2 m/s²
- Força resultante: Fr = ma = 5 × 2 = 10 N
- Força de atrito: Fat = 20 - 10 = 10 N

Exemplo 3: Terceira Lei (Ação e Reação)
Uma pessoa de 60 kg está em pé sobre o chão.
- Ação: peso da pessoa sobre o chão = 60 × 10 = 600 N (para baixo)
- Reação: força do chão sobre a pessoa = 600 N (para cima)

Exemplo 4: Sistema de blocos
Dois blocos ligados por um fio: m1 = 2 kg, m2 = 3 kg, força aplicada = 15 N.
- Sistema total: m = 5 kg
- Aceleração do sistema: a = 15/5 = 3 m/s²
- Tração no fio: T = m2 × a = 3 × 3 = 9 N',
'As Leis de Newton explicam fenômenos cotidianos fundamentais:

SEGURANÇA NO TRÂNSITO:
• Cinto de segurança: impede que a inércia lance o passageiro para frente
• Air bag: aumenta o tempo de frenagem, reduzindo a força
• Distância de frenagem: depende da força de atrito dos pneus

ESPORTES:
• Salto em altura: o atleta aplica força no chão (ação) e o chão o impulsiona (reação)
• Natação: nadador empurra a água para trás (ação) e é impulsionado para frente (reação)
• Corrida: corredor empurra o chão para trás e para baixo, o chão o empurra para frente e para cima

LOCOMOÇÃO:
• Caminhada: empurramos o chão para trás, o chão nos empurra para frente
• Foguetes: expelem gases para baixo (ação), são impulsionados para cima (reação)
• Barcos: hélice empurra água para trás, barco é empurrado para frente

ELEVADORES:
• Subindo acelerado: sensação de ficar "mais pesado" (força normal > peso)
• Descendo acelerado: sensação de ficar "mais leve" (força normal < peso)',
'1. Sempre identifique todas as forças que atuam no corpo
2. Desenhe o diagrama de forças (diagrama de corpo livre)
3. Escolha um sistema de coordenadas e decomponha as forças se necessário
4. Aplique a Segunda Lei: ΣF = ma
5. Para a Terceira Lei, lembre-se: as forças do par ação-reação NUNCA atuam no mesmo corpo
6. Peso sempre aponta para o centro da Terra
7. Força normal é sempre perpendicular à superfície de contato
8. Atrito estático impede movimento; atrito cinético se opõe ao movimento',
'["inércia", "força resultante", "massa", "aceleração", "peso", "força normal", "atrito", "ação e reação"]', 2),

('Física', 'Mecânica', 'Trabalho e Energia', 
'Conceitos de trabalho, energia cinética, potencial e conservação da energia',
'theory', 'medium', 55,
'Trabalho é a transferência de energia através de uma força. Energia é a capacidade de realizar trabalho.',
'CONCEITO DE TRABALHO:
Trabalho é a grandeza física que mede a transferência de energia quando uma força atua sobre um corpo e o desloca.

Fórmula: W = F × d × cos θ
Onde:
• W = trabalho (Joule)
• F = força aplicada (Newton)
• d = deslocamento (metro)
• θ = ângulo entre força e deslocamento

Condições para realização de trabalho:
• Deve haver força aplicada
• Deve haver deslocamento
• A força deve ter componente na direção do deslocamento

TIPOS DE TRABALHO:
• Trabalho motor (W > 0): força favorece o movimento
• Trabalho resistente (W < 0): força se opõe ao movimento
• Trabalho nulo (W = 0): força perpendicular ao deslocamento

ENERGIA CINÉTICA (Ec):
É a energia associada ao movimento.
Ec = ½mv²

Teorema da Energia Cinética:
"O trabalho da força resultante é igual à variação da energia cinética"
W = ΔEc = Ecf - Eci

ENERGIA POTENCIAL:
1. Energia Potencial Gravitacional (Epg):
   Epg = mgh (h = altura em relação a um referencial)

2. Energia Potencial Elástica (Epe):
   Epe = ½kx² (k = constante elástica, x = deformação)

ENERGIA MECÂNICA:
Em = Ec + Ep (soma das energias cinética e potencial)

PRINCÍPIO DA CONSERVAÇÃO DA ENERGIA MECÂNICA:
"Em sistemas conservativos (sem atrito), a energia mecânica total permanece constante"
Emi = Emf
Eci + Epi = Ecf + Epf

POTÊNCIA:
É a rapidez com que se realiza trabalho ou transfere energia.
P = W/t = F × v (quando F e v têm mesma direção)',
'Exemplo 1: Trabalho de uma força
Uma força de 50 N empurra um bloco por 4 metros na horizontal.
W = F × d = 50 × 4 = 200 J

Exemplo 2: Montanha-russa (Conservação de Energia)
Um carrinho de 500 kg parte do repouso de uma altura de 20 m. Qual sua velocidade na base?
No topo: Ec = 0, Epg = mgh = 500 × 10 × 20 = 100.000 J
Na base: Epg = 0, Ec = ½mv²
Por conservação: 100.000 = ½ × 500 × v²
v² = 400 → v = 20 m/s

Exemplo 3: Pêndulo
Uma bola presa a um fio oscila entre dois pontos. Na posição mais alta tem apenas energia potencial, na mais baixa apenas energia cinética.

Exemplo 4: Mola comprimida
Uma mola de constante k = 200 N/m é comprimida 0,1 m.
Epe = ½kx² = ½ × 200 × (0,1)² = 1 J

Exemplo 5: Potência de um motor
Um motor eleva um objeto de 100 kg a 10 m de altura em 5 segundos.
W = mgh = 100 × 10 × 10 = 10.000 J
P = W/t = 10.000/5 = 2.000 W = 2 kW',
'APLICAÇÕES NO ENEM:

MONTANHAS-RUSSAS:
• No ponto mais alto: máxima energia potencial, mínima cinética
• No ponto mais baixo: máxima energia cinética, mínima potencial
• Velocidade mínima no topo de um loop para não cair

ESPORTES:
• Salto com vara: energia cinética da corrida se transforma em potencial na altura máxima
• Pêndulo de Newton: demonstra conservação de energia e momentum
• Esqui aquático: trabalho do barco transfere energia para o esquiador

USINAS HIDRELÉTRICAS:
• Energia potencial da água represada → energia cinética da queda → energia elétrica
• Altura da represa determina a energia potencial disponível

VEÍCULOS:
• Freios convertem energia cinética em calor (trabalho de atrito)
• Subida de ladeira: energia cinética se transforma em potencial
• Motores: potência determina capacidade de acelerar

MÁQUINAS:
• Guindaste: trabalho para erguer cargas (força × altura)
• Martelo: energia potencial se transforma em cinética no impacto',
'1. Identifique o sistema e defina o referencial para energia potencial (geralmente o solo)
2. Use conservação de energia quando não há atrito ou outras forças dissipativas
3. Para problemas com atrito, lembre-se: energia dissipada = trabalho do atrito
4. Em molas: energia potencial elástica máxima quando velocidade = 0
5. Potência relaciona energia e tempo: altos valores de potência = transferência rápida
6. Unidades: Trabalho e Energia em Joules (J), Potência em Watts (W)
7. Energia nunca se perde, apenas se transforma',
'["trabalho", "energia cinética", "energia potencial", "conservação de energia", "potência", "energia mecânica"]', 3),

('Física', 'Mecânica', 'Gravitação Universal', 
'Leis de Kepler e Lei da Gravitação Universal - movimento de planetas e satélites',
'theory', 'medium', 40,
'Estudo da força de atração entre corpos com massa e do movimento de planetas e satélites.',
'A Gravitação Universal é o fenômeno pelo qual todos os corpos com massa se atraem mutuamente. Este é um dos pilares da física, unificando os movimentos terrestres e celestes.

LEIS DE KEPLER:

1ª LEI (LEI DAS ÓRBITAS):
"Os planetas descrevem órbitas elípticas, com o Sol ocupando um dos focos da elipse"
• Na prática, muitas órbitas são quase circulares
• Ponto mais próximo do Sol: periélio
• Ponto mais distante do Sol: afélio

2ª LEI (LEI DAS ÁREAS):
"A linha que liga o planeta ao Sol varre áreas iguais em tempos iguais"
• Quando o planeta está mais próximo do Sol, move-se mais rapidamente
• Quando está mais distante, move-se mais lentamente
• A velocidade orbital varia ao longo da órbita

3ª LEI (LEI DOS PERÍODOS):
"O quadrado do período é proporcional ao cubo do raio médio da órbita"
T² ∝ R³ ou T²/R³ = constante
• Planetas mais distantes levam mais tempo para completar uma órbita
• Permite calcular período orbital conhecendo a distância

LEI DA GRAVITAÇÃO UNIVERSAL (NEWTON):
"Todos os corpos se atraem mutuamente com força proporcional ao produto de suas massas e inversamente proporcional ao quadrado da distância"

F = G × (m₁ × m₂)/d²

Onde:
• G = constante gravitacional = 6,67 × 10⁻¹¹ N⋅m²/kg²
• m₁, m₂ = massas dos corpos
• d = distância entre os centros dos corpos

CARACTERÍSTICAS DA FORÇA GRAVITACIONAL:
• Sempre atrativa (nunca repulsiva)
• Atua à distância (não precisa de contato)
• Obedece ao princípio da ação e reação
• Diminui com o quadrado da distância

CAMPO GRAVITACIONAL:
g = GM/d²
• g = aceleração da gravidade local
• M = massa do corpo que cria o campo
• d = distância do centro do corpo

SATÉLITES:
Para um satélite em órbita circular:
• Força centrípeta = Força gravitacional
• mv²/r = GMm/r²
• Velocidade orbital: v = √(GM/r)
• Período orbital: T = 2π√(r³/GM)',
'Exemplo 1: Comparação de planetas
Júpiter está 5 vezes mais distante do Sol que a Terra. Qual seu período orbital?
Pela 3ª Lei de Kepler: T² ∝ R³
TJúpiter²/TTerra² = (5)³ = 125
TJúpiter = √125 × 1 ano ≈ 11,2 anos

Exemplo 2: Gravidade em diferentes planetas
Na Lua, g = 1,6 m/s² (cerca de 1/6 da Terra)
Um objeto que pesa 60 N na Terra pesará na Lua:
PLua = PTerra × (gLua/gTerra) = 60 × (1,6/10) = 9,6 N

Exemplo 3: Satélite geoestacionário
Satélite que permanece sempre sobre o mesmo ponto da Terra.
• Período orbital = 24 horas
• Altitude ≈ 36.000 km acima da superfície
• Usado em comunicações e GPS

Exemplo 4: Velocidade de escape
Velocidade mínima para um objeto escapar da atração gravitacional terrestre:
ve = √(2GM/R) ≈ 11,2 km/s

Exemplo 5: Maré oceânica
Causada pela diferença da força gravitacional da Lua em diferentes partes da Terra.
• Lado voltado para a Lua: força maior (maré alta)
• Lado oposto: força menor (maré alta também)
• Lados perpendiculares: maré baixa',
'APLICAÇÕES PRÁTICAS:

SATÉLITES ARTIFICIAIS:
• GPS: constelação de satélites para navegação
• Comunicação: transmissão de sinais TV, internet, telefone
• Meteorologia: monitoramento do clima
• Espionagem militar: observação da Terra

EXPLORAÇÃO ESPACIAL:
• Trajetórias de sondas interplanetárias
• Manobras de assistência gravitacional (estilingue gravitacional)
• Órbitas de transferência para outros planetas

FENÔMENOS NATURAIS:
• Marés oceânicas: causadas pela Lua e Sol
• Precessão dos equinócios: movimento do eixo terrestre
• Órbita da Lua ao redor da Terra

TECNOLOGIA:
• Lançamento de foguetes: necessário vencer gravidade terrestre
• Estações espaciais: órbita baixa ao redor da Terra
• Telescópios espaciais: posicionamento fora da atmosfera

NAVEGAÇÃO:
• Determinação de posição usando estrelas
• Cálculo de trajetórias de navios e aviões
• Sistema GPS baseado em relatividade e gravitação',
'1. Lembre-se: gravitação sempre atrai, nunca repele
2. 2ª Lei de Kepler: planeta mais rápido quando mais próximo do Sol
3. 3ª Lei de Kepler: período aumenta com distância (T² ∝ R³)
4. Força gravitacional diminui com quadrado da distância
5. Na superfície terrestre, g ≈ 10 m/s²
6. Satélite geoestacionário tem período de 24 horas
7. Marés são causadas pela diferença de força gravitacional
8. Velocidade orbital diminui com altitude',
'["Leis de Kepler", "gravitação universal", "órbitas elípticas", "satélites", "campo gravitacional", "marés"]', 4);
