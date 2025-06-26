
-- Corrigir as políticas RLS para permitir criação de guildas por usuários autenticados
DROP POLICY IF EXISTS "guilds_insert_owner" ON public.guilds;
DROP POLICY IF EXISTS "guild_members_insert_owner" ON public.guild_members;

-- Permitir que qualquer usuário autenticado crie guildas
CREATE POLICY "guilds_insert_authenticated" ON public.guilds
  FOR INSERT TO authenticated WITH CHECK (true);

-- Permitir que usuários autenticados se adicionem como membros OU que donos/líderes adicionem outros
CREATE POLICY "guild_members_insert_allowed" ON public.guild_members
  FOR INSERT TO authenticated WITH CHECK (
    auth.uid() = profile_id OR
    EXISTS (
      SELECT 1 FROM public.guilds 
      WHERE id = guild_id AND owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.guild_members gm 
      WHERE gm.guild_id = guild_members.guild_id 
      AND gm.profile_id = auth.uid() 
      AND gm.role IN ('líder', 'moderador')
    )
  );

-- Permitir que donos e líderes atualizem papéis de membros
DROP POLICY IF EXISTS "guild_members_update_owner" ON public.guild_members;
CREATE POLICY "guild_members_update_leaders" ON public.guild_members
  FOR UPDATE TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.guilds 
      WHERE id = guild_id AND owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.guild_members gm 
      WHERE gm.guild_id = guild_members.guild_id 
      AND gm.profile_id = auth.uid() 
      AND gm.role IN ('líder', 'moderador')
    )
  );
