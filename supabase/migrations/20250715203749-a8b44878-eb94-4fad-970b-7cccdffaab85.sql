-- Criar tabela para registrar atividades detalhadas do usuário
CREATE TABLE public.user_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'quiz_question', 'quiz_complete', 'content_view', etc.
  subject TEXT NOT NULL,
  topic TEXT,
  question_id UUID,
  user_answer INTEGER,
  correct_answer INTEGER,
  is_correct BOOLEAN,
  points_earned INTEGER DEFAULT 0,
  time_spent INTEGER, -- em segundos
  metadata JSONB, -- dados adicionais flexíveis
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar índices para melhor performance
CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_subject ON public.user_activities(subject);
CREATE INDEX idx_user_activities_created_at ON public.user_activities(created_at);
CREATE INDEX idx_user_activities_type ON public.user_activities(activity_type);

-- Habilitar RLS
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS
CREATE POLICY "Users can view their own activities" 
ON public.user_activities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities" 
ON public.user_activities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Criar função para registrar atividade de questão
CREATE OR REPLACE FUNCTION public.register_quiz_question_activity(
  p_subject TEXT,
  p_topic TEXT,
  p_question_id UUID,
  p_user_answer INTEGER,
  p_correct_answer INTEGER,
  p_time_spent INTEGER
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.user_activities (
    user_id,
    activity_type,
    subject,
    topic,
    question_id,
    user_answer,
    correct_answer,
    is_correct,
    points_earned,
    time_spent
  ) VALUES (
    auth.uid(),
    'quiz_question',
    p_subject,
    p_topic,
    p_question_id,
    p_user_answer,
    p_correct_answer,
    p_user_answer = p_correct_answer,
    CASE WHEN p_user_answer = p_correct_answer THEN 10 ELSE 0 END,
    p_time_spent
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;