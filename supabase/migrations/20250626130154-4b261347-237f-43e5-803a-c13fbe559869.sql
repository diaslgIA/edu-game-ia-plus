
-- =================================================================
-- PASSO 1: Remover TODAS as políticas e a função auxiliar para um recomeço limpo.
-- Isto garante que nenhuma regra antiga e conflituosa permaneça ativa.
-- =================================================================
DROP POLICY IF EXISTS "Public guilds are viewable by everyone." ON public.guilds;
DROP POLICY IF EXISTS "Members can view their own private guilds." ON public.guilds;
DROP POLICY IF EXISTS "Users can create their own guilds." ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their own guilds." ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their own guilds." ON public.guilds;

DROP POLICY IF EXISTS "Members can see the member list of their guilds." ON public.guild_members;
DROP POLICY IF EXISTS "Users can join public guilds." ON public.guild_members;
DROP POLICY IF EXISTS "Users can leave their guilds." ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can add new members." ON public.guild_members;
DROP POLICY IF EXISTS "Admins can remove members from their guild." ON public.guild_members;

DROP FUNCTION IF EXISTS public.is_member_of_guild(uuid);

-- =================================================================
-- PASSO 2: Criar uma função auxiliar com SECURITY DEFINER.
-- Esta é a chave para quebrar o ciclo de recursão. A função é executada com
-- privilégios de superusuário, ignorando as políticas da tabela que consulta,
-- o que impede o loop infinito.
-- =================================================================
CREATE OR REPLACE FUNCTION public.is_member_of_guild(g_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.guild_members
    WHERE guild_id = g_id AND profile_id = auth.uid()
  );
$$;

-- =================================================================
-- PASSO 3: Recriar as políticas de segurança da forma correta.
-- Estas regras são seguras, eficientes e não causam recursão.
-- =================================================================

-- Políticas para a tabela 'guilds'
CREATE POLICY "Public guilds are viewable by everyone."
ON public.guilds FOR SELECT
USING (is_public = true);

CREATE POLICY "Members can view their own private guilds."
ON public.guilds FOR SELECT
USING (public.is_member_of_guild(id));

CREATE POLICY "Users can create their own guilds."
ON public.guilds FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Guild owners can update their own guilds."
ON public.guilds FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Guild owners can delete their own guilds."
ON public.guilds FOR DELETE
USING (auth.uid() = owner_id);

-- Políticas para a tabela 'guild_members'
CREATE POLICY "Members can see the member list of their guilds."
ON public.guild_members FOR SELECT
USING (public.is_member_of_guild(guild_id));

CREATE POLICY "Users can join public guilds."
ON public.guild_members FOR INSERT
WITH CHECK (
  auth.uid() = profile_id AND
  (SELECT is_public FROM public.guilds WHERE id = guild_id) = true
);

-- ESTA É A POLÍTICA CRÍTICA CORRIGIDA:
-- Permite ao dono da guilda adicionar membros (incluindo a si mesmo na criação).
CREATE POLICY "Guild owners can add new members."
ON public.guild_members FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.guilds
    WHERE id = guild_id AND owner_id = auth.uid()
  )
);

CREATE POLICY "Users can leave their guilds."
ON public.guild_members FOR DELETE
USING (auth.uid() = profile_id);

CREATE POLICY "Admins can remove members from their guild."
ON public.guild_members FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.guild_members
        WHERE guild_id = guild_members.guild_id
        AND profile_id = auth.uid()
        AND role = 'admin'
    )
);
