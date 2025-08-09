
-- Habilitar RLS (idempotente) nas tabelas usadas
ALTER TABLE public.user_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_progress ENABLE ROW LEVEL SECURITY;

-- user_rankings: leitura pública (ranking é informação agregada, sem dados sensíveis do usuário)
DO $$
BEGIN
  CREATE POLICY "Public can read user_rankings"
  ON public.user_rankings
  FOR SELECT
  USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- subject_contents: leitura pública de conteúdos
DO $$
BEGIN
  CREATE POLICY "Anyone can read subject_contents"
  ON public.subject_contents
  FOR SELECT
  USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- subject_questions: leitura apenas para usuários autenticados
DO $$
BEGIN
  CREATE POLICY "Authenticated can read subject_questions"
  ON public.subject_questions
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- guilds: leitura se pública ou se o usuário for membro
DO $$
BEGIN
  CREATE POLICY "Read public guilds or own memberships"
  ON public.guilds
  FOR SELECT
  USING (
    is_public = true
    OR EXISTS (
      SELECT 1 FROM public.guild_members gm
      WHERE gm.guild_id = guilds.id AND gm.profile_id = auth.uid()
    )
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- guild_members: leitura somente das linhas do próprio usuário
DO $$
BEGIN
  CREATE POLICY "Users can read own guild memberships"
  ON public.guild_members
  FOR SELECT
  USING (profile_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- user_activities: leitura somente das atividades do próprio usuário
DO $$
BEGIN
  CREATE POLICY "Users can read own activities"
  ON public.user_activities
  FOR SELECT
  USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- content_progress: ler/insert/update somente do próprio usuário
DO $$
BEGIN
  CREATE POLICY "Users can read own content_progress"
  ON public.content_progress
  FOR SELECT
  USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Users can insert own content_progress"
  ON public.content_progress
  FOR INSERT
  WITH CHECK (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE POLICY "Users can update own content_progress"
  ON public.content_progress
  FOR UPDATE
  USING (user_id = auth.uid());
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Realtime para ranking (idempotente)
ALTER TABLE public.user_rankings REPLICA IDENTITY FULL;
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.user_rankings;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
