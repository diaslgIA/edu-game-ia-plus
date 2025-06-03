
import { useState, useCallback } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}

const expandedQuestions = {
  matematica: [
    {
      id: 1,
      question: "Qual é o valor de x na equação 2x + 5 = 13?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "2x + 5 = 13 → 2x = 13 - 5 → 2x = 8 → x = 4",
      subject: "Matemática",
      topic: "Equações do 1º grau",
      difficulty: "Fácil" as const
    },
    {
      id: 2,
      question: "A função f(x) = x² - 4x + 3 tem vértice no ponto:",
      options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(-2, 1)"],
      correctAnswer: 0,
      explanation: "Para uma função quadrática f(x) = ax² + bx + c, o vértice tem coordenada x = -b/2a. Aqui: x = -(-4)/2(1) = 2. f(2) = 4 - 8 + 3 = -1",
      subject: "Matemática",
      topic: "Função Quadrática",
      difficulty: "Médio" as const
    },
    {
      id: 3,
      question: "O valor de sen(30°) é:",
      options: ["1/2", "√2/2", "√3/2", "1"],
      correctAnswer: 0,
      explanation: "O seno de 30° é um valor fundamental da trigonometria: sen(30°) = 1/2",
      subject: "Matemática",
      topic: "Trigonometria",
      difficulty: "Médio" as const
    },
    {
      id: 4,
      question: "Em uma progressão aritmética, o primeiro termo é 3 e a razão é 4. O 5º termo é:",
      options: ["17", "19", "21", "23"],
      correctAnswer: 1,
      explanation: "PA: an = a1 + (n-1).r → a5 = 3 + (5-1).4 = 3 + 16 = 19",
      subject: "Matemática",
      topic: "Progressões",
      difficulty: "Médio" as const
    },
    {
      id: 5,
      question: "Qual é a derivada de f(x) = 3x² + 2x - 1?",
      options: ["6x + 2", "3x + 2", "6x - 1", "3x² + 2"],
      correctAnswer: 0,
      explanation: "A derivada de 3x² é 6x, a derivada de 2x é 2, e a derivada de constante é 0. Portanto: f'(x) = 6x + 2",
      subject: "Matemática",
      topic: "Cálculo",
      difficulty: "Difícil" as const
    },
    {
      id: 6,
      question: "A área de um círculo com raio 5 cm é:",
      options: ["25π cm²", "10π cm²", "50π cm²", "5π cm²"],
      correctAnswer: 0,
      explanation: "A área do círculo é A = πr². Com r = 5: A = π × 5² = 25π cm²",
      subject: "Matemática",
      topic: "Geometria",
      difficulty: "Fácil" as const
    },
    {
      id: 7,
      question: "Quantas soluções tem a equação x² - 6x + 9 = 0?",
      options: ["Duas soluções distintas", "Uma solução", "Nenhuma solução real", "Infinitas soluções"],
      correctAnswer: 1,
      explanation: "Δ = b² - 4ac = 36 - 36 = 0. Como Δ = 0, há uma única solução: x = 3",
      subject: "Matemática",
      topic: "Equações do 2º grau",
      difficulty: "Médio" as const
    },
    {
      id: 8,
      question: "O logaritmo de 100 na base 10 é:",
      options: ["1", "2", "10", "100"],
      correctAnswer: 1,
      explanation: "log₁₀(100) = log₁₀(10²) = 2, pois 10² = 100",
      subject: "Matemática",
      topic: "Logaritmos",
      difficulty: "Médio" as const
    },
    {
      id: 9,
      question: "Em um triângulo retângulo, se os catetos medem 3 e 4, a hipotenusa mede:",
      options: ["5", "6", "7", "12"],
      correctAnswer: 0,
      explanation: "Pelo teorema de Pitágoras: h² = 3² + 4² = 9 + 16 = 25, logo h = 5",
      subject: "Matemática",
      topic: "Teorema de Pitágoras",
      difficulty: "Fácil" as const
    },
    {
      id: 10,
      question: "A soma dos ângulos internos de um hexágono é:",
      options: ["720°", "540°", "900°", "1080°"],
      correctAnswer: 0,
      explanation: "Para um polígono de n lados: S = (n-2) × 180°. Para hexágono (n=6): S = 4 × 180° = 720°",
      subject: "Matemática",
      topic: "Polígonos",
      difficulty: "Médio" as const
    }
  ],
  portugues: [
    {
      id: 11,
      question: "Qual figura de linguagem está presente em 'Suas palavras são punhais'?",
      options: ["Metáfora", "Metonímia", "Ironia", "Hipérbole"],
      correctAnswer: 0,
      explanation: "A metáfora é uma comparação implícita entre 'palavras' e 'punhais', indicando que as palavras machucam",
      subject: "Português",
      topic: "Figuras de Linguagem",
      difficulty: "Fácil" as const
    },
    {
      id: 12,
      question: "O período 'Quando chegou, todos já haviam saído' é classificado como:",
      options: ["Simples", "Composto por coordenação", "Composto por subordinação", "Composto misto"],
      correctAnswer: 2,
      explanation: "O período é composto por subordinação, pois a oração 'Quando chegou' é subordinada adverbial temporal",
      subject: "Português",
      topic: "Sintaxe",
      difficulty: "Médio" as const
    },
    {
      id: 13,
      question: "Em 'O livro que comprei é interessante', o termo destacado é:",
      options: ["Sujeito", "Objeto direto", "Pronome relativo", "Adjunto adnominal"],
      correctAnswer: 2,
      explanation: "'Que' é um pronome relativo que retoma o antecedente 'livro' e inicia uma oração subordinada adjetiva",
      subject: "Português",
      topic: "Morfologia",
      difficulty: "Médio" as const
    },
    {
      id: 14,
      question: "Qual é o plural correto de 'cidadão'?",
      options: ["Cidadões", "Cidadãos", "Cidadans", "Cidadões"],
      correctAnswer: 1,
      explanation: "O plural de cidadão é 'cidadãos', seguindo a regra dos substantivos terminados em -ão",
      subject: "Português",
      topic: "Morfologia",
      difficulty: "Fácil" as const
    },
    {
      id: 15,
      question: "Em 'Ele estudou muito, porém não passou', a conjunção expressa:",
      options: ["Adição", "Oposição", "Conclusão", "Explicação"],
      correctAnswer: 1,
      explanation: "'Porém' é uma conjunção coordenativa adversativa, que expressa oposição ou contraste",
      subject: "Português",
      topic: "Sintaxe",
      difficulty: "Fácil" as const
    },
    {
      id: 16,
      question: "O romance 'Dom Casmurro' foi escrito por:",
      options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"],
      correctAnswer: 1,
      explanation: "Dom Casmurro foi escrito por Machado de Assis em 1899, sendo uma de suas obras mais famosas",
      subject: "Português",
      topic: "Literatura",
      difficulty: "Fácil" as const
    },
    {
      id: 17,
      question: "Qual é a função sintática de 'rapidamente' em 'Ele correu rapidamente'?",
      options: ["Adjunto adverbial", "Predicativo", "Objeto direto", "Sujeito"],
      correctAnswer: 0,
      explanation: "'Rapidamente' modifica o verbo 'correu', sendo classificado como adjunto adverbial de modo",
      subject: "Português",
      topic: "Sintaxe",
      difficulty: "Médio" as const
    },
    {
      id: 18,
      question: "Em qual pessoa está o verbo na frase 'Venderam a casa'?",
      options: ["1ª pessoa do singular", "2ª pessoa do plural", "3ª pessoa do plural", "1ª pessoa do plural"],
      correctAnswer: 2,
      explanation: "'Venderam' está na 3ª pessoa do plural do pretérito perfeito do indicativo",
      subject: "Português",
      topic: "Morfologia",
      difficulty: "Fácil" as const
    },
    {
      id: 19,
      question: "Qual movimento literário caracteriza-se pelo nacionalismo e indianismo?",
      options: ["Barroco", "Romantismo", "Realismo", "Modernismo"],
      correctAnswer: 1,
      explanation: "O Romantismo brasileiro (séc. XIX) caracterizou-se pelo nacionalismo, indianismo e sentimentalismo",
      subject: "Português",
      topic: "Literatura",
      difficulty: "Médio" as const
    },
    {
      id: 20,
      question: "Em 'Choveu muito ontem', o sujeito é:",
      options: ["Oculto", "Simples", "Inexistente", "Composto"],
      correctAnswer: 2,
      explanation: "O verbo 'chover' é impessoal quando indica fenômeno da natureza, portanto a oração não tem sujeito",
      subject: "Português",
      topic: "Sintaxe",
      difficulty: "Médio" as const
    }
  ],
  fisica: [
    {
      id: 21,
      question: "A fórmula da velocidade média é:",
      options: ["v = s/t", "v = s*t", "v = t/s", "v = s+t"],
      correctAnswer: 0,
      explanation: "A velocidade média é calculada dividindo a distância percorrida pelo tempo gasto: v = s/t",
      subject: "Física",
      topic: "Cinemática",
      difficulty: "Fácil" as const
    },
    {
      id: 22,
      question: "A aceleração da gravidade na Terra é aproximadamente:",
      options: ["9,8 m/s", "9,8 m/s²", "9,8 km/h", "9,8 N"],
      correctAnswer: 1,
      explanation: "A aceleração da gravidade terrestre é aproximadamente 9,8 m/s² (metros por segundo ao quadrado)",
      subject: "Física",
      topic: "Gravitação",
      difficulty: "Fácil" as const
    },
    {
      id: 23,
      question: "Segundo a 1ª Lei de Newton, um corpo em repouso:",
      options: ["Sempre se move", "Tende a permanecer em repouso", "Acelera constantemente", "Muda de direção"],
      correctAnswer: 1,
      explanation: "A 1ª Lei de Newton (inércia) diz que um corpo em repouso tende a permanecer em repouso, a menos que uma força atue sobre ele",
      subject: "Física",
      topic: "Mecânica",
      difficulty: "Fácil" as const
    },
    {
      id: 24,
      question: "A unidade de energia no Sistema Internacional é:",
      options: ["Watt", "Joule", "Newton", "Ampere"],
      correctAnswer: 1,
      explanation: "O Joule (J) é a unidade de energia no Sistema Internacional de Unidades",
      subject: "Física",
      topic: "Energia",
      difficulty: "Fácil" as const
    },
    {
      id: 25,
      question: "Em um espelho plano, a imagem formada é:",
      options: ["Real e invertida", "Virtual e do mesmo tamanho", "Real e ampliada", "Virtual e reduzida"],
      correctAnswer: 1,
      explanation: "Em espelhos planos, a imagem é sempre virtual, direita e do mesmo tamanho do objeto",
      subject: "Física",
      topic: "Óptica",
      difficulty: "Médio" as const
    },
    {
      id: 26,
      question: "A frequência e o período de uma onda são grandezas:",
      options: ["Diretamente proporcionais", "Inversamente proporcionais", "Independentes", "Iguais"],
      correctAnswer: 1,
      explanation: "Frequência e período são inversamente proporcionais: f = 1/T",
      subject: "Física",
      topic: "Ondas",
      difficulty: "Médio" as const
    },
    {
      id: 27,
      question: "A lei de Ohm estabelece que:",
      options: ["V = R/I", "V = R + I", "V = R × I", "V = R - I"],
      correctAnswer: 2,
      explanation: "A lei de Ohm estabelece que V = R × I, onde V é tensão, R é resistência e I é corrente",
      subject: "Física",
      topic: "Eletricidade",
      difficulty: "Médio" as const
    },
    {
      id: 28,
      question: "A velocidade da luz no vácuo é aproximadamente:",
      options: ["300.000 km/s", "300.000.000 m/s", "300.000 m/s", "30.000 km/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vácuo é aproximadamente 300.000.000 m/s ou 3 × 10⁸ m/s",
      subject: "Física",
      topic: "Óptica",
      difficulty: "Fácil" as const
    },
    {
      id: 29,
      question: "Em um movimento uniformemente variado, a aceleração é:",
      options: ["Zero", "Variável", "Constante", "Negativa"],
      correctAnswer: 2,
      explanation: "No movimento uniformemente variado (MUV), a aceleração é constante (diferente de zero)",
      subject: "Física",
      topic: "Cinemática",
      difficulty: "Médio" as const
    },
    {
      id: 30,
      question: "A transformação de energia cinética em térmica ocorre principalmente por:",
      options: ["Atrito", "Gravidade", "Magnetismo", "Pressão"],
      correctAnswer: 0,
      explanation: "O atrito é o principal responsável pela transformação de energia cinética em energia térmica",
      subject: "Física",
      topic: "Energia",
      difficulty: "Médio" as const
    }
  ],
  quimica: [
    {
      id: 31,
      question: "A fórmula química da água é:",
      options: ["H₂O", "CO₂", "NaCl", "CH₄"],
      correctAnswer: 0,
      explanation: "A água é composta por dois átomos de hidrogênio e um de oxigênio: H₂O",
      subject: "Química",
      topic: "Química Geral",
      difficulty: "Fácil" as const
    },
    {
      id: 32,
      question: "O número atômico do carbono é:",
      options: ["4", "6", "8", "12"],
      correctAnswer: 1,
      explanation: "O carbono tem número atômico 6, ou seja, possui 6 prótons em seu núcleo",
      subject: "Química",
      topic: "Estrutura Atômica",
      difficulty: "Fácil" as const
    },
    {
      id: 33,
      question: "Em uma reação ácido-base, o pH 7 indica:",
      options: ["Solução ácida", "Solução básica", "Solução neutra", "Solução salina"],
      correctAnswer: 2,
      explanation: "pH 7 indica solução neutra (nem ácida nem básica)",
      subject: "Química",
      topic: "Ácidos e Bases",
      difficulty: "Fácil" as const
    },
    {
      id: 34,
      question: "A fórmula do ácido sulfúrico é:",
      options: ["HCl", "H₂SO₄", "HNO₃", "H₃PO₄"],
      correctAnswer: 1,
      explanation: "O ácido sulfúrico tem fórmula H₂SO₄",
      subject: "Química",
      topic: "Ácidos e Bases",
      difficulty: "Fácil" as const
    },
    {
      id: 35,
      question: "A ligação entre Na⁺ e Cl⁻ no sal de cozinha é:",
      options: ["Covalente", "Iônica", "Metálica", "Van der Waals"],
      correctAnswer: 1,
      explanation: "A ligação entre Na⁺ e Cl⁻ é iônica, formada pela transferência de elétrons",
      subject: "Química",
      topic: "Ligações Químicas",
      difficulty: "Médio" as const
    },
    {
      id: 36,
      question: "A massa molar do CO₂ é aproximadamente:",
      options: ["28 g/mol", "44 g/mol", "32 g/mol", "18 g/mol"],
      correctAnswer: 1,
      explanation: "CO₂: C(12) + 2×O(16) = 12 + 32 = 44 g/mol",
      subject: "Química",
      topic: "Estequiometria",
      difficulty: "Médio" as const
    },
    {
      id: 37,
      question: "Em uma solução 1M de NaCl, há:",
      options: ["1g de NaCl por litro", "1 mol de NaCl por litro", "1 mol de NaCl por kg", "1g de NaCl por kg"],
      correctAnswer: 1,
      explanation: "Molaridade (M) é o número de mols de soluto por litro de solução",
      subject: "Química",
      topic: "Soluções",
      difficulty: "Médio" as const
    },
    {
      id: 38,
      question: "A distribuição eletrônica do sódio (Na, Z=11) é:",
      options: ["1s² 2s² 2p⁶ 3s¹", "1s² 2s² 2p⁶ 3s²", "1s² 2s² 2p⁵ 3s²", "1s² 2s² 2p⁶ 3p¹"],
      correctAnswer: 0,
      explanation: "Sódio (Z=11): 1s² 2s² 2p⁶ 3s¹",
      subject: "Química",
      topic: "Estrutura Atômica",
      difficulty: "Difícil" as const
    },
    {
      id: 39,
      question: "A reação de combustão do metano produz:",
      options: ["CO + H₂O", "CO₂ + H₂O", "C + H₂O", "CO₂ + H₂"],
      correctAnswer: 1,
      explanation: "CH₄ + 2O₂ → CO₂ + 2H₂O (combustão completa)",
      subject: "Química",
      topic: "Reações Químicas",
      difficulty: "Médio" as const
    },
    {
      id: 40,
      question: "O principal componente do gás natural é:",
      options: ["Etano", "Propano", "Metano", "Butano"],
      correctAnswer: 2,
      explanation: "O metano (CH₄) é o principal componente do gás natural",
      subject: "Química",
      topic: "Química Orgânica",
      difficulty: "Fácil" as const
    }
  ],
  biologia: [
    {
      id: 41,
      question: "A mitose é um processo de:",
      options: ["Digestão celular", "Divisão celular", "Respiração celular", "Síntese proteica"],
      correctAnswer: 1,
      explanation: "A mitose é o processo de divisão celular que resulta em duas células filhas geneticamente idênticas",
      subject: "Biologia",
      topic: "Citologia",
      difficulty: "Fácil" as const
    },
    {
      id: 42,
      question: "A organela responsável pela produção de energia na célula é:",
      options: ["Núcleo", "Mitocôndria", "Ribossomo", "Vacúolo"],
      correctAnswer: 1,
      explanation: "A mitocôndria é responsável pela respiração celular e produção de ATP (energia)",
      subject: "Biologia",
      topic: "Citologia",
      difficulty: "Fácil" as const
    },
    {
      id: 43,
      question: "O DNA está localizado principalmente no:",
      options: ["Citoplasma", "Núcleo", "Ribossomo", "Retículo endoplasmático"],
      correctAnswer: 1,
      explanation: "O DNA está localizado principalmente no núcleo das células eucarióticas",
      subject: "Biologia",
      topic: "Genética",
      difficulty: "Fácil" as const
    },
    {
      id: 44,
      question: "A fotossíntese ocorre nos:",
      options: ["Cloroplastos", "Mitocôndrias", "Ribossomos", "Vacúolos"],
      correctAnswer: 0,
      explanation: "A fotossíntese ocorre nos cloroplastos, organelas presentes nas células vegetais",
      subject: "Biologia",
      topic: "Botânica",
      difficulty: "Fácil" as const
    },
    {
      id: 45,
      question: "Em um cruzamento Aa x Aa, a probabilidade de descendente aa é:",
      options: ["0%", "25%", "50%", "75%"],
      correctAnswer: 1,
      explanation: "No cruzamento Aa x Aa: AA(25%), Aa(50%), aa(25%)",
      subject: "Biologia",
      topic: "Genética",
      difficulty: "Médio" as const
    },
    {
      id: 46,
      question: "A função dos ribossomos é:",
      options: ["Produzir energia", "Sintetizar proteínas", "Armazenar DNA", "Digerir substâncias"],
      correctAnswer: 1,
      explanation: "Os ribossomos são responsáveis pela síntese de proteínas",
      subject: "Biologia",
      topic: "Citologia",
      difficulty: "Fácil" as const
    },
    {
      id: 47,
      question: "O sistema circulatório humano é:",
      options: ["Aberto", "Fechado", "Duplo e fechado", "Simples e aberto"],
      correctAnswer: 2,
      explanation: "O sistema circulatório humano é duplo (duas circulações) e fechado (sangue circula em vasos)",
      subject: "Biologia",
      topic: "Fisiologia",
      difficulty: "Médio" as const
    },
    {
      id: 48,
      question: "A respiração celular ocorre:",
      options: ["Apenas no núcleo", "Apenas nos cloroplastos", "Principalmente nas mitocôndrias", "Apenas no citoplasma"],
      correctAnswer: 2,
      explanation: "A respiração celular ocorre principalmente nas mitocôndrias",
      subject: "Biologia",
      topic: "Citologia",
      difficulty: "Médio" as const
    },
    {
      id: 49,
      question: "A célula animal diferencia-se da vegetal por não possuir:",
      options: ["Núcleo", "Parede celular", "Mitocôndria", "Ribossomo"],
      correctAnswer: 1,
      explanation: "A célula animal não possui parede celular, presente apenas em células vegetais",
      subject: "Biologia",
      topic: "Citologia",
      difficulty: "Fácil" as const
    },
    {
      id: 50,
      question: "O processo evolutivo que explica a origem das espécies é:",
      options: ["Seleção natural", "Deriva genética", "Mutação", "Migração"],
      correctAnswer: 0,
      explanation: "A seleção natural é o principal mecanismo evolutivo proposto por Darwin",
      subject: "Biologia",
      topic: "Evolução",
      difficulty: "Médio" as const
    }
  ],
  historia: [
    {
      id: 51,
      question: "A independência do Brasil foi proclamada em:",
      options: ["1820", "1821", "1822", "1823"],
      correctAnswer: 2,
      explanation: "A independência do Brasil foi proclamada por Dom Pedro I em 7 de setembro de 1822",
      subject: "História",
      topic: "Brasil Imperial",
      difficulty: "Fácil" as const
    },
    {
      id: 52,
      question: "A Revolução Francesa começou em:",
      options: ["1789", "1790", "1791", "1792"],
      correctAnswer: 0,
      explanation: "A Revolução Francesa iniciou-se em 1789 com a queda da Bastilha em 14 de julho",
      subject: "História",
      topic: "História Moderna",
      difficulty: "Fácil" as const
    },
    {
      id: 53,
      question: "A República foi proclamada no Brasil em:",
      options: ["1888", "1889", "1890", "1891"],
      correctAnswer: 1,
      explanation: "A República foi proclamada em 15 de novembro de 1889 pelo Marechal Deodoro da Fonseca",
      subject: "História",
      topic: "Brasil República",
      difficulty: "Fácil" as const
    },
    {
      id: 54,
      question: "A Segunda Guerra Mundial terminou em:",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      explanation: "A Segunda Guerra Mundial terminou em 1945 com a rendição do Japão",
      subject: "História",
      topic: "História Contemporânea",
      difficulty: "Fácil" as const
    },
    {
      id: 55,
      question: "O período conhecido como Era Vargas durou:",
      options: ["1930-1945", "1930-1954", "1937-1945", "1930-1950"],
      correctAnswer: 0,
      explanation: "A Era Vargas refere-se ao primeiro período de Getúlio Vargas no poder (1930-1945)",
      subject: "História",
      topic: "Brasil República",
      difficulty: "Médio" as const
    },
    {
      id: 56,
      question: "A Lei Áurea foi assinada em:",
      options: ["13 de maio de 1888", "15 de novembro de 1889", "7 de setembro de 1822", "22 de abril de 1500"],
      correctAnswer: 0,
      explanation: "A Lei Áurea, que aboliu a escravidão no Brasil, foi assinada em 13 de maio de 1888",
      subject: "História",
      topic: "Brasil Imperial",
      difficulty: "Fácil" as const
    },
    {
      id: 57,
      question: "O Império Romano foi dividido em duas partes no século:",
      options: ["III", "IV", "V", "VI"],
      correctAnswer: 1,
      explanation: "O Império Romano foi dividido em Ocidental e Oriental no século IV (395 d.C.)",
      subject: "História",
      topic: "História Antiga",
      difficulty: "Médio" as const
    },
    {
      id: 58,
      question: "A Primeira Guerra Mundial ocorreu entre:",
      options: ["1914-1918", "1912-1916", "1916-1920", "1910-1914"],
      correctAnswer: 0,
      explanation: "A Primeira Guerra Mundial durou de 1914 a 1918",
      subject: "História",
      topic: "História Contemporânea",
      difficulty: "Fácil" as const
    },
    {
      id: 59,
      question: "O descobrimento do Brasil ocorreu em:",
      options: ["1498", "1499", "1500", "1501"],
      correctAnswer: 2,
      explanation: "O Brasil foi 'descoberto' pelos portugueses em 22 de abril de 1500",
      subject: "História",
      topic: "Brasil Colônia",
      difficulty: "Fácil" as const
    },
    {
      id: 60,
      question: "A Ditadura Militar no Brasil durou:",
      options: ["1964-1985", "1960-1980", "1964-1984", "1965-1985"],
      correctAnswer: 0,
      explanation: "A Ditadura Militar no Brasil durou de 1964 a 1985",
      subject: "História",
      topic: "Brasil República",
      difficulty: "Médio" as const
    }
  ],
  geografia: [
    {
      id: 61,
      question: "A capital do Brasil é:",
      options: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
      correctAnswer: 2,
      explanation: "Brasília é a capital federal do Brasil desde 1960",
      subject: "Geografia",
      topic: "Geografia do Brasil",
      difficulty: "Fácil" as const
    },
    {
      id: 62,
      question: "O maior país do mundo em extensão territorial é:",
      options: ["China", "Estados Unidos", "Canadá", "Rússia"],
      correctAnswer: 3,
      explanation: "A Rússia é o maior país do mundo em extensão territorial",
      subject: "Geografia",
      topic: "Geografia Mundial",
      difficulty: "Fácil" as const
    },
    {
      id: 63,
      question: "A linha do Equador divide a Terra em:",
      options: ["Leste e Oeste", "Norte e Sul", "Tropical e Polar", "Continental e Oceânico"],
      correctAnswer: 1,
      explanation: "A linha do Equador divide a Terra em hemisférios Norte e Sul",
      subject: "Geografia",
      topic: "Cartografia",
      difficulty: "Fácil" as const
    },
    {
      id: 64,
      question: "O rio mais longo do mundo é:",
      options: ["Amazonas", "Nilo", "Mississipi", "Yangtzé"],
      correctAnswer: 1,
      explanation: "O rio Nilo, no nordeste da África, é considerado o mais longo do mundo",
      subject: "Geografia",
      topic: "Hidrografia",
      difficulty: "Médio" as const
    },
    {
      id: 65,
      question: "A camada da atmosfera mais próxima da Terra é:",
      options: ["Estratosfera", "Troposfera", "Mesosfera", "Termosfera"],
      correctAnswer: 1,
      explanation: "A troposfera é a camada atmosférica mais próxima da superfície terrestre",
      subject: "Geografia",
      topic: "Climatologia",
      difficulty: "Médio" as const
    },
    {
      id: 66,
      question: "O Brasil possui quantos fusos horários?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "O Brasil possui 4 fusos horários oficiais",
      subject: "Geografia",
      topic: "Geografia do Brasil",
      difficulty: "Médio" as const
    },
    {
      id: 67,
      question: "A cordilheira dos Andes localiza-se:",
      options: ["Na Ásia", "Na África", "Na América do Norte", "Na América do Sul"],
      correctAnswer: 3,
      explanation: "A cordilheira dos Andes estende-se pela costa oeste da América do Sul",
      subject: "Geografia",
      topic: "Relevo",
      difficulty: "Fácil" as const
    },
    {
      id: 68,
      question: "O fenômeno El Niño afeta principalmente:",
      options: ["As correntes marítimas", "O clima", "Os terremotos", "A vegetação"],
      correctAnswer: 1,
      explanation: "El Niño é um fenômeno climático que afeta os padrões de temperatura e precipitação",
      subject: "Geografia",
      topic: "Climatologia",
      difficulty: "Médio" as const
    },
    {
      id: 69,
      question: "A densidade demográfica é calculada pela relação:",
      options: ["População ÷ Área", "Área ÷ População", "População × Área", "População + Área"],
      correctAnswer: 0,
      explanation: "Densidade demográfica = População ÷ Área (hab/km²)",
      subject: "Geografia",
      topic: "Demografia",
      difficulty: "Fácil" as const
    },
    {
      id: 70,
      question: "O bioma brasileiro com maior biodiversidade é:",
      options: ["Cerrado", "Caatinga", "Amazônia", "Mata Atlântica"],
      correctAnswer: 2,
      explanation: "A Amazônia é o bioma brasileiro com maior biodiversidade do planeta",
      subject: "Geografia",
      topic: "Biogeografia",
      difficulty: "Fácil" as const
    }
  ]
};

export const useExpandedQuestions = () => {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  const getQuestionsBySubject = useCallback((subject: string): Question[] => {
    const subjectKey = subject.toLowerCase()
      .replace(/\s+/g, '')
      .replace('ê', 'e')
      .replace('á', 'a')
      .replace('í', 'i')
      .replace('ó', 'o')
      .replace('ú', 'u');
    
    return expandedQuestions[subjectKey as keyof typeof expandedQuestions] || [];
  }, []);

  const generateQuiz = useCallback((subject: string, count: number = 10): Question[] => {
    const questions = getQuestionsBySubject(subject);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(count, questions.length));
    setCurrentQuestions(selected);
    return selected;
  }, [getQuestionsBySubject]);

  return {
    currentQuestions,
    generateQuiz,
    getQuestionsBySubject
  };
};
