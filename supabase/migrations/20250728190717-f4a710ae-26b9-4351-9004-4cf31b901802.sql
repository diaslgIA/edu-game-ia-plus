
-- Remover todas as políticas RLS duplicadas da tabela guilds
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can delete their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can update their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can view accessible guilds" ON public.guilds;
DROP POLICY IF EXISTS "guilds_delete" ON public.guilds;
DROP POLICY IF EXISTS "guilds_delete_owner" ON public.guilds;
DROP POLICY IF EXISTS "guilds_insert" ON public.guilds;
DROP POLICY IF EXISTS "guilds_insert_authenticated" ON public.guilds;
DROP POLICY IF EXISTS "guilds_select_members_simple" ON public.guilds;
DROP POLICY IF EXISTS "guilds_select_owner" ON public.guilds;
DROP POLICY IF EXISTS "guilds_select_public" ON public.guilds;
DROP POLICY IF EXISTS "guilds_update" ON public.guilds;
DROP POLICY IF EXISTS "guilds_update_owner" ON public.guilds;

-- Criar função de segurança para verificar se usuário é membro da guilda
CREATE OR REPLACE FUNCTION public.is_guild_member(guild_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_members.guild_id = $1 AND guild_members.profile_id = $2
  );
$$;

-- Criar políticas RLS simples e sem recursão
CREATE POLICY "guilds_select_policy" ON public.guilds
  FOR SELECT USING (
    is_public = true OR 
    owner_id = auth.uid() OR 
    public.is_guild_member(id, auth.uid())
  );

CREATE POLICY "guilds_insert_policy" ON public.guilds
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND owner_id = auth.uid()
  );

CREATE POLICY "guilds_update_policy" ON public.guilds
  FOR UPDATE USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "guilds_delete_policy" ON public.guilds
  FOR DELETE USING (owner_id = auth.uid());
