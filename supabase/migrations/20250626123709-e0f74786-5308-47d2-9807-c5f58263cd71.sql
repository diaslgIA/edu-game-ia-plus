
-- Primeiro, vamos remover todas as políticas existentes que podem estar causando recursão
DROP POLICY IF EXISTS "Users can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can view their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;

-- Remover políticas de guild_members que podem estar causando recursão
DROP POLICY IF EXISTS "Users can view guild members if they are members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can manage members" ON public.guild_members;

-- Criar função security definer para verificar se usuário é membro da guilda
CREATE OR REPLACE FUNCTION public.is_guild_member_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = target_guild_id AND profile_id = target_user_id
  );
$$;

-- Criar função security definer para verificar se usuário é dono da guilda
CREATE OR REPLACE FUNCTION public.is_guild_owner_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE id = target_guild_id AND owner_id = target_user_id
  );
$$;

-- Políticas simples para guilds (sem recursão)
CREATE POLICY "Anyone can view public guilds"
ON public.guilds
FOR SELECT
USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "Authenticated users can create guilds"
ON public.guilds
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Guild owners can update their guilds"
ON public.guilds
FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Guild owners can delete their guilds"
ON public.guilds
FOR DELETE
TO authenticated
USING (owner_id = auth.uid());

-- Políticas para guild_members (usando funções security definer)
CREATE POLICY "Users can view guild members if guild is public or they are members"
ON public.guild_members
FOR SELECT
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND is_public = true)
  OR public.is_guild_member_safe(guild_id, auth.uid())
);

CREATE POLICY "Users can join guilds"
ON public.guild_members
FOR INSERT
TO authenticated
WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Guild owners and members can manage guild_members"
ON public.guild_members
FOR ALL
TO authenticated
USING (
  public.is_guild_owner_safe(guild_id, auth.uid()) 
  OR profile_id = auth.uid()
);
