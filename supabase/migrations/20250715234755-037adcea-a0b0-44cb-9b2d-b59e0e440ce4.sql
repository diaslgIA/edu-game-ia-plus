
-- Migração para associar conteúdos existentes aos seus respectivos grandes temas

-- ===================================
-- ATUALIZAÇÃO PARA FÍSICA
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Mecânica' WHERE subject = 'Física' AND title = 'Leis de Newton';
UPDATE public.subject_contents SET grande_tema = 'Termologia' WHERE subject = 'Física' AND title = 'Termodinâmica';
UPDATE public.subject_contents SET grande_tema = 'Eletricidade' WHERE subject = 'Física' AND title = 'Eletromagnetismo';
UPDATE public.subject_contents SET grande_tema = 'Ondulatória' WHERE subject = 'Física' AND title = 'Óptica Geométrica';

-- ===================================
-- ATUALIZAÇÃO PARA QUÍMICA
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Química Geral' WHERE subject = 'Química' AND title IN ('Estrutura Atômica e Tabela Periódica', 'Ligações Químicas e Forças Intermoleculares');
UPDATE public.subject_contents SET grande_tema = 'Físico-Química' WHERE subject = 'Química' AND title = 'Estequiometria';
UPDATE public.subject_contents SET grande_tema = 'Química Orgânica' WHERE subject = 'Química' AND title = 'Funções Orgânicas';

-- ===================================
-- ATUALIZAÇÃO PARA BIOLOGIA
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Biologia Celular' WHERE subject = 'Biologia' AND title = 'Organelas Celulares';
UPDATE public.subject_contents SET grande_tema = 'Genética e Evolução' WHERE subject = 'Biologia' AND title = 'Leis de Mendel';
UPDATE public.subject_contents SET grande_tema = 'Ecologia' WHERE subject = 'Biologia' AND title = 'Ciclos Biogeoquímicos';
UPDATE public.subject_contents SET grande_tema = 'Corpo Humano' WHERE subject = 'Biologia' AND title = 'Fisiologia Humana - Sistema Nervoso';

-- ===================================
-- ATUALIZAÇÃO PARA GEOGRAFIA
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Geografia Geral' WHERE subject = 'Geografia' AND title = 'Geopolítica e Globalização';
UPDATE public.subject_contents SET grande_tema = 'Geografia do Brasil' WHERE subject = 'Geografia' AND title IN ('Urbanização Brasileira', 'Climas do Brasil');

-- ===================================
-- ATUALIZAÇÃO PARA FILOSOFIA
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'História da Filosofia' WHERE subject = 'Filosofia' AND title IN ('Filosofia Antiga - Platão e Aristóteles', 'Filosofia Moderna - Contratualistas');
UPDATE public.subject_contents SET grande_tema = 'Ética e Política' WHERE subject = 'Filosofia' AND title = 'Ética e Moral (Kant e Utilitarismo)';

-- ===================================
-- ATUALIZAÇÃO PARA SOCIOLOGIA
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Teoria Sociológica' WHERE subject = 'Sociologia' AND title = 'Clássicos da Sociologia (Durkheim, Weber, Marx)';
UPDATE public.subject_contents SET grande_tema = 'Cultura e Sociedade' WHERE subject = 'Sociologia' AND title = 'Indústria Cultural e Cultura de Massa';
UPDATE public.subject_contents SET grande_tema = 'Sociedade Brasileira' WHERE subject = 'Sociologia' AND title = 'Movimentos Sociais e Cidadania';

-- ===================================
-- ATUALIZAÇÃO PARA MATEMÁTICA (se existir)
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Álgebra' WHERE subject = 'Matemática' AND title LIKE '%Função%' OR title LIKE '%Equação%';
UPDATE public.subject_contents SET grande_tema = 'Geometria' WHERE subject = 'Matemática' AND title LIKE '%Geometria%' OR title LIKE '%Área%' OR title LIKE '%Volume%';
UPDATE public.subject_contents SET grande_tema = 'Estatística' WHERE subject = 'Matemática' AND title LIKE '%Estatística%' OR title LIKE '%Probabilidade%';

-- ===================================
-- ATUALIZAÇÃO PARA PORTUGUÊS (se existir)
-- ===================================
UPDATE public.subject_contents SET grande_tema = 'Literatura' WHERE subject = 'Português' AND title LIKE '%Literatura%' OR title LIKE '%Escolas Literárias%';
UPDATE public.subject_contents SET grande_tema = 'Gramática' WHERE subject = 'Português' AND title LIKE '%Gramática%' OR title LIKE '%Sintaxe%' OR title LIKE '%Morfologia%';
UPDATE public.subject_contents SET grande_tema = 'Redação' WHERE subject = 'Português' AND title LIKE '%Redação%' OR title LIKE '%Texto%' OR title LIKE '%Dissertação%';
