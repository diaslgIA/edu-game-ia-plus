
-- Corrigir a função is_guild_member que tem referência ambígua
DROP FUNCTION IF EXISTS public.is_guild_member(uuid, uuid);

CREATE OR REPLACE FUNCTION public.is_guild_member(input_guild_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = input_guild_id AND profile_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recriar a política que usa esta função
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;

CREATE POLICY "Users can join guilds" ON public.guild_members
  FOR INSERT WITH CHECK (
    auth.uid() = profile_id
  );

-- Adicionar política para visualizar membros da guilda
DROP POLICY IF EXISTS "Users can view guild members if they are members" ON public.guild_members;

CREATE POLICY "Users can view guild members if they are members" ON public.guild_members
  FOR SELECT USING (
    public.is_guild_member(guild_id, auth.uid()) OR
    public.is_guild_owner(guild_id, auth.uid())
  );
