
-- Step 1: Standardize subject names in the database
-- First, let's see what subjects we have and standardize them

-- Update subject_questions table to use consistent subject names
UPDATE subject_questions SET subject = 'Matemática' WHERE subject IN ('matematica', 'math', 'Mathematics');
UPDATE subject_questions SET subject = 'Português' WHERE subject IN ('portugues', 'portuguese', 'Portuguese');
UPDATE subject_questions SET subject = 'Física' WHERE subject IN ('fisica', 'physics', 'Physics');
UPDATE subject_questions SET subject = 'Química' WHERE subject IN ('quimica', 'chemistry', 'Chemistry');
UPDATE subject_questions SET subject = 'Biologia' WHERE subject IN ('biologia', 'biology', 'Biology');
UPDATE subject_questions SET subject = 'História' WHERE subject IN ('historia', 'history', 'History');
UPDATE subject_questions SET subject = 'Geografia' WHERE subject IN ('geografia', 'geography', 'Geography');
UPDATE subject_questions SET subject = 'Filosofia' WHERE subject IN ('filosofia', 'philosophy', 'Philosophy');
UPDATE subject_questions SET subject = 'Sociologia' WHERE subject IN ('sociologia', 'sociology', 'Sociology');

-- Update quiz_scores table to use consistent subject names
UPDATE quiz_scores SET subject = 'Matemática' WHERE subject IN ('matematica', 'math', 'Mathematics');
UPDATE quiz_scores SET subject = 'Português' WHERE subject IN ('portugues', 'portuguese', 'Portuguese');
UPDATE quiz_scores SET subject = 'Física' WHERE subject IN ('fisica', 'physics', 'Physics');
UPDATE quiz_scores SET subject = 'Química' WHERE subject IN ('quimica', 'chemistry', 'Chemistry');
UPDATE quiz_scores SET subject = 'Biologia' WHERE subject IN ('biologia', 'biology', 'Biology');
UPDATE quiz_scores SET subject = 'História' WHERE subject IN ('historia', 'history', 'History');
UPDATE quiz_scores SET subject = 'Geografia' WHERE subject IN ('geografia', 'geography', 'Geography');
UPDATE quiz_scores SET subject = 'Filosofia' WHERE subject IN ('filosofia', 'philosophy', 'Philosophy');
UPDATE quiz_scores SET subject = 'Sociologia' WHERE subject IN ('sociologia', 'sociology', 'Sociology');

-- Ensure all question options are stored as proper JSON arrays
UPDATE subject_questions 
SET options = CASE 
  WHEN jsonb_typeof(options) = 'object' AND options ? '0' THEN 
    jsonb_build_array(options->>'0', options->>'1', options->>'2', options->>'3')
  ELSE options
END
WHERE jsonb_typeof(options) = 'object' AND options ? '0';

-- Fix any RLS function conflicts by dropping and recreating simpler versions
DROP FUNCTION IF EXISTS public.is_guild_member(uuid, uuid);
DROP FUNCTION IF EXISTS public.is_guild_member_safe(uuid, uuid);
DROP FUNCTION IF EXISTS public.is_guild_owner_safe(uuid, uuid);

-- Create simplified RLS helper functions
CREATE OR REPLACE FUNCTION public.is_guild_member_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = target_guild_id AND profile_id = target_user_id
  );
$$;

CREATE OR REPLACE FUNCTION public.is_guild_owner_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE id = target_guild_id AND owner_id = target_user_id
  );
$$;

-- Add some sample questions if the table is empty
INSERT INTO subject_questions (subject, topic, question, options, correct_answer, explanation, difficulty_level) VALUES
('Matemática', 'Álgebra', 'Qual é o resultado de 2x + 3 = 11?', '["x = 4", "x = 5", "x = 3", "x = 6"]', 0, 'Para resolver 2x + 3 = 11, subtraímos 3 de ambos os lados: 2x = 8, depois dividimos por 2: x = 4', 'easy'),
('Português', 'Gramática', 'Qual é a classe gramatical da palavra "rapidamente"?', '["Advérbio", "Adjetivo", "Substantivo", "Verbo"]', 0, 'A palavra "rapidamente" é um advérbio de modo, pois indica como a ação é realizada.', 'easy'),
('História', 'Brasil Colonial', 'Quem foi Zumbi dos Palmares?', '["Líder quilombola", "Explorador português", "Jesuíta", "Bandeirante"]', 0, 'Zumbi dos Palmares foi o último líder do Quilombo dos Palmares, símbolo da resistência contra a escravidão.', 'medium')
ON CONFLICT DO NOTHING;
