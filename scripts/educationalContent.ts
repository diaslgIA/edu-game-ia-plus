
// Estrutura de dados com todo o conteúdo educacional detalhado
export const educationalContent = [
  {
    subjectName: 'Matemática',
    themes: [
      {
        themeName: 'Matemática Básica e Aritmética',
        topics: [
          {
            topicName: 'Operações com números reais',
            explanation: `Os números reais (ℝ) englobam todos os números que podem ser expressos como decimais finitos ou infinitos. Incluem os números naturais (1, 2, 3...), inteiros (..., -2, -1, 0, 1, 2...), racionais (frações como 1/2, 3/4) e irracionais (como π e √2).

As operações fundamentais com números reais são:

1. **Adição e Subtração**: Seguem as propriedades comutativa (a + b = b + a), associativa ((a + b) + c = a + (b + c)) e elemento neutro (a + 0 = a).

2. **Multiplicação**: Possui propriedades comutativa (a × b = b × a), associativa ((a × b) × c = a × (b × c)), distributiva (a × (b + c) = a × b + a × c) e elemento neutro (a × 1 = a).

3. **Divisão**: É a operação inversa da multiplicação. Para a ≠ 0, temos a ÷ a = 1. A divisão por zero é indefinida.

4. **Potenciação**: Representa multiplicações repetidas. a^n = a × a × ... × a (n vezes). Propriedades importantes: a^m × a^n = a^(m+n), (a^m)^n = a^(m×n), a^0 = 1 (para a ≠ 0).

5. **Radiciação**: É a operação inversa da potenciação. ⁿ√a = b significa que b^n = a.

Essas operações são fundamentais para resolver problemas matemáticos complexos e aparecem frequentemente no ENEM.`
          },
          {
            topicName: 'Razão e Proporção',
            explanation: `Razão é a comparação entre duas grandezas através da divisão. Se temos duas grandezas a e b (b ≠ 0), a razão entre a e b é expressa como a/b ou a:b.

**Conceitos importantes:**

1. **Razão**: Expressa quantas vezes uma grandeza contém a outra. Por exemplo, se uma sala tem 20 meninos e 15 meninas, a razão entre meninos e meninas é 20:15 = 4:3.

2. **Proporção**: É a igualdade entre duas razões. Se a/b = c/d, então temos uma proporção. Os termos a e d são chamados extremos, e b e c são os meios.

3. **Propriedade fundamental das proporções**: Em toda proporção, o produto dos meios é igual ao produto dos extremos: a/b = c/d ⟹ a × d = b × c.

4. **Grandezas diretamente proporcionais**: Quando uma aumenta, a outra também aumenta na mesma proporção. Exemplo: velocidade e distância (tempo constante).

5. **Grandezas inversamente proporcionais**: Quando uma aumenta, a outra diminui na mesma proporção. Exemplo: velocidade e tempo (distância constante).

6. **Regra de três simples**: Método para resolver problemas envolvendo duas grandezas proporcionais.

7. **Regra de três composta**: Usada quando temos três ou mais grandezas relacionadas.

Aplicações no ENEM incluem problemas de escala, densidade demográfica, concentração de soluções e análise de gráficos.`
          }
        ]
      },
      {
        themeName: 'Funções',
        topics: [
          {
            topicName: 'Função Afim',
            explanation: `A função afim, também conhecida como função de primeiro grau, é definida por f(x) = ax + b, onde a e b são números reais e a ≠ 0.

**Características principais:**

1. **Coeficiente angular (a)**: Determina a inclinação da reta. Se a > 0, a função é crescente; se a < 0, é decrescente.

2. **Coeficiente linear (b)**: Indica onde a reta intercepta o eixo y (quando x = 0).

3. **Gráfico**: É sempre uma reta que não passa pela origem (exceto quando b = 0).

4. **Zero da função**: É o valor de x onde f(x) = 0. Calculado por x = -b/a.

5. **Taxa de variação**: Constante e igual ao coeficiente angular a.

**Aplicações práticas:**
- Conversão de temperaturas (Celsius para Fahrenheit)
- Cálculo de tarifas (telefone, táxi, energia elétrica)
- Depreciação linear de bens
- Crescimento populacional linear

**Interpretação gráfica:**
- Se a > 0: função crescente, reta "sobe"
- Se a < 0: função decrescente, reta "desce"
- Quanto maior |a|, mais inclinada é a reta

No ENEM, problemas com função afim aparecem em contextos de economia, física (movimento uniforme), e análise de dados.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'Física',
    themes: [
      {
        themeName: 'Mecânica',
        topics: [
          {
            topicName: 'Cinemática',
            explanation: `A cinemática é o ramo da mecânica que estuda o movimento dos corpos sem considerar as causas que o produzem.

**Conceitos fundamentais:**

1. **Posição**: Localização de um objeto no espaço em relação a um referencial.

2. **Deslocamento**: Variação da posição (Δs = s_final - s_inicial).

3. **Velocidade**: Taxa de variação da posição no tempo. Velocidade média: v_m = Δs/Δt.

4. **Aceleração**: Taxa de variação da velocidade no tempo. Aceleração média: a_m = Δv/Δt.

**Movimento Retilíneo Uniforme (MRU):**
- Velocidade constante (a = 0)
- Equação: s = s₀ + vt
- Gráfico s×t: reta inclinada
- Gráfico v×t: reta horizontal

**Movimento Retilíneo Uniformemente Variado (MRUV):**
- Aceleração constante
- Equações: v = v₀ + at; s = s₀ + v₀t + ½at²; v² = v₀² + 2aΔs
- Gráfico v×t: reta inclinada
- Gráfico s×t: parábola

**Queda livre:**
- Caso especial de MRUV com a = g ≈ 10 m/s²
- Desprezando a resistência do ar

**Lançamento vertical:**
- Movimento de subida e descida com aceleração g

Aplicações no ENEM incluem análise de gráficos de movimento, cálculos de tempo de viagem e problemas envolvendo queda livre.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'Química',
    themes: [
      {
        themeName: 'Química Geral',
        topics: [
          {
            topicName: 'Estrutura Atômica',
            explanation: `O átomo é a menor unidade da matéria que conserva as propriedades químicas de um elemento.

**Constituição do átomo:**

1. **Núcleo**: Região central, muito pequena e densa, contém:
   - **Prótons**: Partículas com carga positiva (+1e)
   - **Nêutrons**: Partículas sem carga elétrica

2. **Eletrosfera**: Região ao redor do núcleo onde estão os:
   - **Elétrons**: Partículas com carga negativa (-1e)

**Números fundamentais:**
- **Número atômico (Z)**: Quantidade de prótons
- **Número de massa (A)**: Soma de prótons e nêutrons
- **Número de nêutrons (N)**: A - Z

**Isótopos**: Átomos do mesmo elemento com números de massa diferentes.

**Distribuição eletrônica:**
- Elétrons ocupam níveis de energia (K, L, M, N, O, P, Q)
- Subníveis: s, p, d, f
- Diagrama de Linus Pauling para ordem de preenchimento

**Propriedades periódicas:**
- Raio atômico
- Energia de ionização
- Eletronegatividade
- Eletroafinidade

**Ligações químicas:**
- Iônica: transferência de elétrons
- Covalente: compartilhamento de elétrons
- Metálica: "mar de elétrons"

A estrutura atômica é fundamental para compreender as propriedades dos elementos e suas reações químicas.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'Biologia',
    themes: [
      {
        themeName: 'Citologia',
        topics: [
          {
            topicName: 'Estrutura Celular',
            explanation: `A célula é a unidade fundamental da vida. Todos os seres vivos são constituídos por células, que podem ser procarióticas ou eucarióticas.

**Células Procarióticas:**
- Não possuem núcleo organizado
- Material genético disperso no citoplasma
- Exemplos: bactérias e arqueas
- Estruturas: parede celular, membrana plasmática, citoplasma, ribossomos

**Células Eucarióticas:**
- Núcleo organizado e delimitado por carioteca
- Organelas membranosas
- Exemplos: células animais, vegetais, fungos e protozoários

**Organelas e suas funções:**

1. **Núcleo**: Controla atividades celulares, contém DNA
2. **Retículo Endoplasmático**: 
   - Rugoso (RER): síntese de proteínas
   - Liso (REL): síntese de lipídios
3. **Complexo de Golgi**: processamento e empacotamento
4. **Mitocôndrias**: respiração celular, produção de ATP
5. **Ribossomos**: síntese de proteínas
6. **Lisossomos**: digestão intracelular
7. **Vacúolos**: armazenamento (principalmente em vegetais)
8. **Cloroplastos**: fotossíntese (apenas em vegetais)

**Membrana plasmática:**
- Modelo mosaico fluido
- Bicamada fosfolipídica
- Permeabilidade seletiva
- Transporte: passivo (difusão, osmose) e ativo

A compreensão da estrutura celular é essencial para entender processos como metabolismo, reprodução e hereditariedade.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'História',
    themes: [
      {
        themeName: 'Brasil Colonial',
        topics: [
          {
            topicName: 'Período Pré-Colonial e Início da Colonização',
            explanation: `O período pré-colonial brasileiro (1500-1530) foi marcado pela exploração inicial do território e pelo estabelecimento gradual do sistema colonial português.

**Contexto histórico:**
- Descobrimento em 1500 por Pedro Álvares Cabral
- Expansão marítima europeia e busca por novas rotas comerciais
- Tratado de Tordesilhas (1494) já havia dividido as terras

**Período Pré-Colonial (1500-1530):**
1. **Exploração do pau-brasil**: Principal atividade econômica
2. **Escambo com indígenas**: Troca de produtos europeus por pau-brasil
3. **Feitorias**: Estabelecimentos para armazenar produtos
4. **Expedições exploratórias**: Mapeamento da costa

**Início da Colonização (1530):**
- **Expedição de Martim Afonso de Sousa**: Marco do início da colonização efetiva
- **Fundação de São Vicente (1532)**: Primeira vila brasileira
- **Introdução da cana-de-açúcar**: Início da agricultura de plantation

**Sistema de Capitanias Hereditárias (1534):**
- Divisão do território em 15 capitanias
- Doação a donatários da pequena nobreza portuguesa
- Objetivos: povoamento e defesa do território
- Resultados limitados: apenas Pernambuco e São Vicente prosperaram

**Governo-Geral (1549):**
- Criação devido ao fracasso das capitanias
- Primeiro governador-geral: Tomé de Sousa
- Fundação de Salvador (1549): primeira capital
- Centralização administrativa

Este período estabeleceu as bases do sistema colonial que duraria três séculos.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'Geografia',
    themes: [
      {
        themeName: 'Geografia Física',
        topics: [
          {
            topicName: 'Clima e Tempo',
            explanation: `Clima e tempo são conceitos fundamentais em geografia física, frequentemente confundidos, mas com significados distintos.

**Tempo Atmosférico:**
- Estado momentâneo da atmosfera em um local específico
- Características: temperatura, umidade, pressão, vento, precipitação
- Varia rapidamente (horas, dias)
- Objeto de estudo da meteorologia

**Clima:**
- Sucessão habitual de tipos de tempo em uma região
- Média das condições atmosféricas durante 30+ anos
- Características mais estáveis e previsíveis
- Objeto de estudo da climatologia

**Fatores climáticos:**

1. **Latitude**: 
   - Determina a quantidade de radiação solar recebida
   - Zonas térmicas: tropical, temperada, polar

2. **Altitude**: 
   - A cada 200m, temperatura diminui ~1°C
   - Influencia pressão atmosférica e umidade

3. **Maritimidade e Continentalidade**:
   - Proximidade do mar modera temperaturas
   - Interior continental tem maior amplitude térmica

4. **Correntes marítimas**:
   - Quentes: elevam temperatura e umidade
   - Frias: diminuem temperatura e umidade

5. **Massas de ar**:
   - Grandes porções de ar com características homogêneas
   - Movimentam-se e influenciam o tempo

6. **Relevo**:
   - Barlavento: vertente que recebe chuvas
   - Sotavento: vertente seca (sombra de chuva)

**Elementos climáticos:**
- Temperatura, precipitação, umidade, pressão atmosférica, ventos

**Tipos climáticos brasileiros:**
- Equatorial, tropical, semiárido, subtropical, tropical de altitude

A compreensão desses conceitos é essencial para análise de paisagens e problemas ambientais.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'Português',
    themes: [
      {
        themeName: 'Gramática',
        topics: [
          {
            topicName: 'Classes de Palavras',
            explanation: `As classes de palavras, também chamadas de classes gramaticais, são categorias em que se dividem as palavras da língua portuguesa segundo suas características morfológicas, sintáticas e semânticas.

**Classes Variáveis:**

1. **Substantivo**: Nomeia seres, objetos, qualidades, ações
   - Classificação: próprio/comum, concreto/abstrato, primitivo/derivado
   - Flexões: gênero, número, grau

2. **Artigo**: Determina e especifica substantivos
   - Definido: o, a, os, as
   - Indefinido: um, uma, uns, umas

3. **Adjetivo**: Caracteriza ou qualifica substantivos
   - Classificação: uniforme/biforme, primitivo/derivado
   - Flexões: gênero, número, grau (comparativo, superlativo)

4. **Numeral**: Indica quantidade, ordem, multiplicação, fração
   - Cardinais, ordinais, multiplicativos, fracionários

5. **Pronome**: Substitui ou acompanha substantivos
   - Pessoais, possessivos, demonstrativos, indefinidos, interrogativos, relativos

6. **Verbo**: Indica ação, estado, fenômeno natural
   - Flexões: pessoa, número, tempo, modo, voz
   - Tempos: presente, pretérito, futuro
   - Modos: indicativo, subjuntivo, imperativo

**Classes Invariáveis:**

7. **Advérbio**: Modifica verbo, adjetivo ou outro advérbio
   - Circunstâncias: tempo, lugar, modo, intensidade, afirmação, negação, dúvida

8. **Preposição**: Liga palavras estabelecendo relações
   - Essenciais: a, ante, após, até, com, contra, de, desde, em, entre, para, por, sem, sob, sobre, trás
   - Acidentais: conforme, durante, exceto, mediante, segundo

9. **Conjunção**: Liga orações ou palavras de mesma função
   - Coordenativas: aditivas, adversativas, alternativas, conclusivas, explicativas
   - Subordinativas: causais, condicionais, concessivas, comparativas, conformativas, consecutivas, finais, temporais, proporcionais

10. **Interjeição**: Exprime emoções, sentimentos
    - Alegria: ah!, oh!, oba!
    - Dor: ai!, ui!
    - Espanto: nossa!, puxa!

O domínio das classes de palavras é fundamental para análise sintática e interpretação textual.`
          }
        ]
      }
    ]
  },
  {
    subjectName: 'Sociologia',
    themes: [
      {
        themeName: 'Teorias Sociológicas Clássicas',
        topics: [
          {
            topicName: 'Durkheim e o Fato Social',
            explanation: `Émile Durkheim (1858-1917) foi um dos fundadores da sociologia moderna e estabeleceu as bases científicas da disciplina através do conceito de fato social.

**Contexto histórico:**
- França do século XIX: industrialização e transformações sociais
- Necessidade de compreender cientificamente a sociedade
- Positivismo como corrente de pensamento dominante

**Conceito de Fato Social:**
Fenômenos que existem independentemente da vontade individual e exercem coerção sobre os indivíduos.

**Características dos fatos sociais:**

1. **Exterioridade**: 
   - Existem fora da consciência individual
   - Precedem o nascimento dos indivíduos
   - Exemplo: a linguagem existe antes de aprendermos a falar

2. **Coercitividade**:
   - Exercem pressão sobre os indivíduos
   - Forçam conformidade com normas sociais
   - Sanções para quem não segue as regras

3. **Generalidade**:
   - São compartilhados pelo grupo social
   - Têm caráter coletivo
   - Manifestam-se de forma similar em toda sociedade

**Exemplos de fatos sociais:**
- Normas jurídicas e morais
- Costumes e tradições
- Sistemas educacionais
- Religião
- Moda
- Linguagem

**Tipos de solidariedade:**

1. **Solidariedade Mecânica**:
   - Sociedades tradicionais/primitivas
   - Semelhança entre indivíduos
   - Consciência coletiva forte
   - Pouca divisão do trabalho

2. **Solidariedade Orgânica**:
   - Sociedades modernas/complexas
   - Diferenciação entre indivíduos
   - Interdependência funcional
   - Divisão do trabalho desenvolvida

**O Suicídio como fato social:**
Durkheim demonstrou que até o ato aparentemente individual do suicídio possui causas sociais, identificando tipos: egoísta, altruísta, anômico e fatalista.

Sua obra influenciou toda a sociologia posterior e estabeleceu métodos de investigação social ainda utilizados hoje.`
          }
        ]
      }
    ]
  }
];
