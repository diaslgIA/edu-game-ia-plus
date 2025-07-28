
-- Corrigir políticas RLS para guild_members (resolvendo erros 406)
DROP POLICY IF EXISTS "guild_members_select_policy" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_policy" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_update_policy" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete_policy" ON public.guild_members;

-- Políticas simplificadas para guild_members
CREATE POLICY "guild_members_select_simple" ON public.guild_members
FOR SELECT USING (
  profile_id = auth.uid() OR 
  guild_id IN (
    SELECT id FROM public.guilds WHERE owner_id = auth.uid()
  ) OR
  guild_id IN (
    SELECT guild_id FROM public.guild_members WHERE profile_id = auth.uid()
  )
);

CREATE POLICY "guild_members_insert_simple" ON public.guild_members
FOR INSERT WITH CHECK (
  profile_id = auth.uid() OR 
  guild_id IN (
    SELECT id FROM public.guilds WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "guild_members_update_simple" ON public.guild_members
FOR UPDATE USING (
  guild_id IN (
    SELECT id FROM public.guilds WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "guild_members_delete_simple" ON public.guild_members
FOR DELETE USING (
  profile_id = auth.uid() OR 
  guild_id IN (
    SELECT id FROM public.guilds WHERE owner_id = auth.uid()
  )
);

-- Corrigir políticas para guild_chat_messages (resolvendo erro 403)
DROP POLICY IF EXISTS "guild_chat_basic" ON public.guild_chat_messages;

CREATE POLICY "guild_chat_members_only" ON public.guild_chat_messages
FOR ALL USING (
  guild_id IN (
    SELECT guild_id FROM public.guild_members WHERE profile_id = auth.uid()
  )
);

-- Melhorar políticas para profiles (busca de usuários)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view other profiles for guild invites" ON public.profiles
FOR SELECT USING (
  auth.uid() IS NOT NULL AND (
    auth.uid() = id OR
    auth.uid() IN (
      SELECT owner_id FROM public.guilds
      UNION
      SELECT profile_id FROM public.guild_members WHERE role IN ('líder', 'dono')
    )
  )
);
