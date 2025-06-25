
-- Primeiro, remover todas as políticas que dependem das funções
DROP POLICY IF EXISTS "Guild owners can manage members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and moderators can create invites" ON public.guild_invites;

-- Agora remover todas as outras políticas problemáticas
DROP POLICY IF EXISTS "Anyone can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;
DROP POLICY IF EXISTS "Users can view guild members if they are members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can remove members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can update member roles" ON public.guild_members;

-- Agora podemos remover as funções
DROP FUNCTION IF EXISTS public.is_guild_member(uuid, uuid);
DROP FUNCTION IF EXISTS public.is_guild_owner(uuid, uuid);

-- Recriar as funções com parâmetros nomeados
CREATE OR REPLACE FUNCTION public.is_guild_member(target_guild_id UUID, target_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = target_guild_id AND profile_id = target_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_guild_owner(target_guild_id UUID, target_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE id = target_guild_id AND owner_id = target_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Políticas SIMPLES para a tabela guilds
CREATE POLICY "Public guilds viewable by all" ON public.guilds
  FOR SELECT USING (is_public = true);

CREATE POLICY "Authenticated users can create guilds" ON public.guilds
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Owners can update guilds" ON public.guilds
  FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete guilds" ON public.guilds
  FOR DELETE TO authenticated
  USING (auth.uid() = owner_id);

-- Políticas SIMPLES para guild_members
CREATE POLICY "Anyone can view guild members" ON public.guild_members
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can join guilds" ON public.guild_members
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can leave or owners can remove" ON public.guild_members
  FOR DELETE TO authenticated
  USING (
    auth.uid() = profile_id OR 
    public.is_guild_owner(guild_id, auth.uid())
  );

-- Recriar política para convites
CREATE POLICY "Guild owners can create invites" ON public.guild_invites
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = inviter_id AND
    public.is_guild_owner(guild_id, auth.uid())
  );
