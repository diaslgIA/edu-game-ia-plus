
-- Primeiro, vamos corrigir as políticas RLS que estão causando recursão infinita
-- Remover as políticas problemáticas existentes
DROP POLICY IF EXISTS "Users can view guild members if they are members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can manage members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;

-- Criar função de segurança para verificar se usuário é dono da guilda
CREATE OR REPLACE FUNCTION public.is_guild_owner(guild_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE id = guild_id AND owner_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Criar função para verificar se usuário é membro da guilda
CREATE OR REPLACE FUNCTION public.is_guild_member(guild_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = is_guild_member.guild_id AND profile_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Recriar políticas sem recursão
CREATE POLICY "Users can view guild members if they are members" ON public.guild_members
  FOR SELECT USING (
    public.is_guild_member(guild_id, auth.uid()) OR
    public.is_guild_owner(guild_id, auth.uid())
  );

CREATE POLICY "Guild owners can manage members" ON public.guild_members
  FOR ALL USING (
    public.is_guild_owner(guild_id, auth.uid())
  );

CREATE POLICY "Users can join guilds" ON public.guild_members
  FOR INSERT WITH CHECK (
    auth.uid() = profile_id AND
    NOT public.is_guild_member(guild_id, auth.uid())
  );

-- Corrigir política de convites que também pode estar causando problemas
DROP POLICY IF EXISTS "Guild owners and moderators can create invites" ON public.guild_invites;

CREATE POLICY "Guild owners and moderators can create invites" ON public.guild_invites
  FOR INSERT WITH CHECK (
    auth.uid() = inviter_id AND
    public.is_guild_owner(guild_id, auth.uid())
  );
