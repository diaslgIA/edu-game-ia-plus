
-- 1. Remover TODAS as políticas existentes da tabela guilds
DROP POLICY IF EXISTS "Users can view public guilds or their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Anyone can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Public guilds are viewable by everyone" ON public.guilds;
DROP POLICY IF EXISTS "Members can view their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;

-- 2. Criar duas novas políticas de SELECT separadas

-- Política 1: Guildas públicas são visíveis para todos
CREATE POLICY "Public guilds are viewable by everyone"
ON public.guilds
FOR SELECT
USING (is_public = true);

-- Política 2: Membros podem ver suas próprias guildas
CREATE POLICY "Members can view their own guilds"
ON public.guilds
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = guilds.id AND profile_id = auth.uid()
  )
);

-- 3. Criar políticas essenciais para INSERT, UPDATE e DELETE

-- Política para permitir que usuários criem guildas
CREATE POLICY "Users can create guilds"
ON public.guilds
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

-- Política para permitir que donos atualizem suas guildas
CREATE POLICY "Guild owners can update their guilds"
ON public.guilds
FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Política para permitir que donos deletem suas guildas
CREATE POLICY "Guild owners can delete their guilds"
ON public.guilds
FOR DELETE
TO authenticated
USING (owner_id = auth.uid());
