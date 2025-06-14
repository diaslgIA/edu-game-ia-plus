
-- Adicionar colunas para rastrear o login consecutivo dos usuários
ALTER TABLE public.profiles
ADD COLUMN last_login TIMESTAMPTZ,
ADD COLUMN login_streak INTEGER DEFAULT 0;
