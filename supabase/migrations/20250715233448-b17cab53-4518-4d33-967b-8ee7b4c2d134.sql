
-- Migração para corrigir nomes das matérias na tabela subject_contents
-- Padronizando todos os nomes para forma capitalizada

UPDATE public.subject_contents
SET subject = 'Português'
WHERE subject = 'portugues';

UPDATE public.subject_contents
SET subject = 'História'
WHERE subject = 'historia';

UPDATE public.subject_contents
SET subject = 'Geografia'
WHERE subject = 'geografia';

UPDATE public.subject_contents
SET subject = 'Filosofia'
WHERE subject = 'filosofia';

UPDATE public.subject_contents
SET subject = 'Sociologia'
WHERE subject = 'sociologia';

-- Para completar a padronização, também vamos corrigir as outras matérias se necessário
UPDATE public.subject_contents
SET subject = 'Matemática'
WHERE subject = 'matematica';

UPDATE public.subject_contents
SET subject = 'Física'
WHERE subject = 'fisica';

UPDATE public.subject_contents
SET subject = 'Química'
WHERE subject = 'quimica';

UPDATE public.subject_contents
SET subject = 'Biologia'
WHERE subject = 'biologia';
