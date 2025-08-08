
-- Criar tabela quiz_questions para armazenar perguntas
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID REFERENCES public.subjects(id),
  question_text TEXT NOT NULL,
  question_type TEXT DEFAULT 'multiple_choice',
  image_url TEXT,
  difficulty_level TEXT DEFAULT 'medium',
  topic TEXT,
  explanation TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela quiz_options para armazenar alternativas
CREATE TABLE public.quiz_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  feedback_image_url TEXT,
  option_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para quiz_questions
CREATE POLICY "Anyone can view quiz questions" 
  ON public.quiz_questions 
  FOR SELECT 
  USING (true);

-- Políticas RLS para quiz_options
CREATE POLICY "Anyone can view quiz options" 
  ON public.quiz_options 
  FOR SELECT 
  USING (true);

-- Migrar dados da tabela subject_questions para a nova estrutura
INSERT INTO public.quiz_questions (subject_id, question_text, difficulty_level, topic, explanation)
SELECT 
  s.id as subject_id,
  sq.question as question_text,
  sq.difficulty_level,
  sq.topic,
  sq.explanation
FROM public.subject_questions sq
JOIN public.subjects s ON LOWER(s.nome) = LOWER(sq.subject)
WHERE sq.question IS NOT NULL;

-- Migrar opções das questões existentes
INSERT INTO public.quiz_options (question_id, option_text, is_correct, option_order)
SELECT 
  qq.id as question_id,
  option_value as option_text,
  (option_index = sq.correct_answer) as is_correct,
  option_index as option_order
FROM public.quiz_questions qq
JOIN public.subject_questions sq ON qq.question_text = sq.question
CROSS JOIN LATERAL (
  SELECT 
    value as option_value,
    (row_number() OVER ()) - 1 as option_index
  FROM jsonb_array_elements_text(
    CASE 
      WHEN jsonb_typeof(sq.options) = 'array' THEN sq.options
      ELSE jsonb_build_array(sq.options->'A', sq.options->'B', sq.options->'C', sq.options->'D')
    END
  ) AS t(value)
) AS options_expanded;

-- Criar índices para melhor performance
CREATE INDEX idx_quiz_questions_subject_id ON public.quiz_questions(subject_id);
CREATE INDEX idx_quiz_questions_topic ON public.quiz_questions(topic);
CREATE INDEX idx_quiz_options_question_id ON public.quiz_options(question_id);
CREATE INDEX idx_quiz_options_is_correct ON public.quiz_options(is_correct);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_quiz_questions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_quiz_questions_updated_at
  BEFORE UPDATE ON public.quiz_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_quiz_questions_updated_at();
