
-- Expandir a tabela subject_contents para incluir atividades interativas e desafios
ALTER TABLE public.subject_contents 
ADD COLUMN IF NOT EXISTS interactive_activities jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS challenge_question jsonb DEFAULT NULL,
ADD COLUMN IF NOT EXISTS available_badges jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS infographic_url text DEFAULT NULL;

-- Criar tabela para rastrear badges/conquistas dos usuários
CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  badge_id text NOT NULL,
  badge_name text NOT NULL,
  badge_description text,
  badge_icon text DEFAULT '🏆',
  subject text NOT NULL,
  content_id uuid REFERENCES public.subject_contents(id),
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  points_awarded integer DEFAULT 0,
  UNIQUE(user_id, badge_id, content_id)
);

-- Habilitar RLS na tabela user_badges
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para user_badges
CREATE POLICY "Users can view their own badges" ON public.user_badges
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own badges" ON public.user_badges
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Adicionar índices para performance
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_subject ON public.user_badges(subject);
CREATE INDEX IF NOT EXISTS idx_user_badges_content_id ON public.user_badges(content_id);

-- Expandir a tabela user_activities para incluir atividades interativas
ALTER TABLE public.user_activities 
ADD COLUMN IF NOT EXISTS activity_subtype text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS interaction_data jsonb DEFAULT NULL;

-- Criar função para atualizar pontos quando usuário ganha badge
CREATE OR REPLACE FUNCTION public.award_badge_points()
RETURNS trigger AS $$
BEGIN
  -- Atualizar pontos do usuário
  UPDATE public.profiles 
  SET 
    points = COALESCE(points, 0) + COALESCE(NEW.points_awarded, 0),
    level = GREATEST(1, FLOOR((COALESCE(points, 0) + COALESCE(NEW.points_awarded, 0)) / 100) + 1),
    updated_at = now()
  WHERE id = NEW.user_id;
  
  -- Atualizar ranking
  INSERT INTO public.user_rankings (user_id, full_name, total_points)
  SELECT 
    p.id,
    p.full_name,
    p.points
  FROM public.profiles p
  WHERE p.id = NEW.user_id
  ON CONFLICT (user_id) 
  DO UPDATE SET
    total_points = EXCLUDED.total_points,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Criar trigger para dar pontos automaticamente quando badge é ganho
DROP TRIGGER IF EXISTS trigger_award_badge_points ON public.user_badges;
CREATE TRIGGER trigger_award_badge_points
  AFTER INSERT ON public.user_badges
  FOR EACH ROW
  EXECUTE FUNCTION public.award_badge_points();
