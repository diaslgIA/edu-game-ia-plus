
-- Remover políticas existentes que podem estar causando problemas
DROP POLICY IF EXISTS "Public guilds are viewable by everyone" ON public.guilds;
DROP POLICY IF EXISTS "Users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;

-- Habilitar RLS nas tabelas se não estiver habilitado
ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;

-- Políticas para tabela guilds
CREATE POLICY "Anyone can view public guilds" ON public.guilds
  FOR SELECT USING (is_public = true);

CREATE POLICY "Authenticated users can create guilds" ON public.guilds
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Guild owners can update their guilds" ON public.guilds
  FOR UPDATE USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Guild owners can delete their guilds" ON public.guilds
  FOR DELETE USING (auth.uid() = owner_id);

-- Políticas para tabela guild_members (já corrigidas acima, mas garantindo que estão certas)
-- A política "Users can join guilds" permite inserção apenas se o usuário não for já membro
CREATE OR REPLACE POLICY "Users can join guilds" ON public.guild_members
  FOR INSERT WITH CHECK (
    auth.uid() = profile_id
  );

-- Permitir que donos de guilda removam membros
CREATE POLICY "Guild owners can remove members" ON public.guild_members
  FOR DELETE USING (
    public.is_guild_owner(guild_id, auth.uid()) OR
    auth.uid() = profile_id
  );

-- Permitir que donos atualizem roles dos membros
CREATE POLICY "Guild owners can update member roles" ON public.guild_members
  FOR UPDATE USING (
    public.is_guild_owner(guild_id, auth.uid())
  );
