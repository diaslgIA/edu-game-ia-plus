
-- Criar tabela para rankings em tempo real
CREATE TABLE public.user_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL DEFAULT 0,
  title TEXT,
  badge TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_user_rankings_points ON public.user_rankings(total_points DESC);
CREATE INDEX idx_user_rankings_position ON public.user_rankings(position);
CREATE UNIQUE INDEX idx_user_rankings_user_id ON public.user_rankings(user_id);

-- Habilitar RLS
ALTER TABLE public.user_rankings ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos os usuários autenticados vejam o ranking
CREATE POLICY "Users can view rankings" 
  ON public.user_rankings 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Função para recalcular todos os rankings
CREATE OR REPLACE FUNCTION public.recalculate_all_rankings()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Atualizar posições e títulos para todos os usuários
  WITH ranked_users AS (
    SELECT 
      id,
      user_id,
      total_points,
      ROW_NUMBER() OVER (ORDER BY total_points DESC, updated_at ASC) as new_position
    FROM public.user_rankings
  )
  UPDATE public.user_rankings ur
  SET 
    position = ru.new_position,
    title = CASE 
      WHEN ru.new_position = 1 THEN 'Herói da Educação'
      WHEN ru.new_position = 2 THEN 'Guardião do Conhecimento'
      WHEN ru.new_position = 3 THEN 'Mestre dos Estudos'
      WHEN ru.new_position <= 5 THEN 'Especialista Acadêmico'
      WHEN ru.new_position <= 10 THEN 'Estudante Exemplar'
      WHEN ru.new_position <= 20 THEN 'Aprendiz Dedicado'
      ELSE 'Explorador do Saber'
    END,
    badge = CASE 
      WHEN ru.new_position = 1 THEN '🏆'
      WHEN ru.new_position = 2 THEN '🥈'
      WHEN ru.new_position = 3 THEN '🥉'
      WHEN ru.new_position <= 5 THEN '⭐'
      WHEN ru.new_position <= 10 THEN '🌟'
      WHEN ru.new_position <= 20 THEN '💫'
      ELSE '📚'
    END,
    updated_at = now()
  FROM ranked_users ru
  WHERE ur.id = ru.id;
END;
$$;

-- Função trigger para atualizar rankings
CREATE OR REPLACE FUNCTION public.update_user_rankings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Inserir ou atualizar o ranking do usuário
  INSERT INTO public.user_rankings (user_id, full_name, total_points)
  SELECT 
    p.id,
    p.full_name,
    p.points
  FROM public.profiles p
  WHERE p.id = NEW.id
  ON CONFLICT (user_id) 
  DO UPDATE SET
    full_name = EXCLUDED.full_name,
    total_points = EXCLUDED.total_points,
    updated_at = now();

  -- Recalcular todas as posições
  PERFORM public.recalculate_all_rankings();

  RETURN NEW;
END;
$$;

-- Trigger para atualizar rankings quando os pontos mudarem
CREATE TRIGGER update_rankings_on_points_change
  AFTER UPDATE OF points ON public.profiles
  FOR EACH ROW
  WHEN (OLD.points IS DISTINCT FROM NEW.points)
  EXECUTE FUNCTION public.update_user_rankings();

-- Trigger para criar ranking inicial quando um perfil é criado
CREATE TRIGGER create_initial_ranking
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_rankings();

-- Habilitar realtime para a tabela de rankings
ALTER TABLE public.user_rankings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_rankings;

-- Popular rankings iniciais para usuários existentes
INSERT INTO public.user_rankings (user_id, full_name, total_points)
SELECT id, full_name, points 
FROM public.profiles
ON CONFLICT (user_id) DO NOTHING;

-- Executar recálculo inicial dos rankings
SELECT public.recalculate_all_rankings();
