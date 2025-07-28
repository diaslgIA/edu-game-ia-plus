
-- Remover políticas existentes que causam recursão
DROP POLICY IF EXISTS "guild_members_select_simple" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_simple" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_update_simple" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete_simple" ON public.guild_members;

-- Criar função SECURITY DEFINER para evitar recursão infinita
CREATE OR REPLACE FUNCTION public.is_guild_member_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = target_guild_id AND profile_id = target_user_id
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Criar função para verificar se usuário é dono da guilda
CREATE OR REPLACE FUNCTION public.is_guild_owner_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE id = target_guild_id AND owner_id = target_user_id
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Políticas simplificadas para guild_members sem recursão
CREATE POLICY "guild_members_select_policy" ON public.guild_members
FOR SELECT USING (
  profile_id = auth.uid() OR 
  is_guild_owner_safe(guild_id, auth.uid()) OR
  is_guild_member_safe(guild_id, auth.uid())
);

CREATE POLICY "guild_members_insert_policy" ON public.guild_members
FOR INSERT WITH CHECK (
  profile_id = auth.uid() OR 
  is_guild_owner_safe(guild_id, auth.uid())
);

CREATE POLICY "guild_members_update_policy" ON public.guild_members
FOR UPDATE USING (
  is_guild_owner_safe(guild_id, auth.uid()) OR
  (profile_id = auth.uid() AND role = 'líder')
);

CREATE POLICY "guild_members_delete_policy" ON public.guild_members
FOR DELETE USING (
  profile_id = auth.uid() OR 
  is_guild_owner_safe(guild_id, auth.uid())
);

-- Corrigir políticas para outras tabelas relacionadas
DROP POLICY IF EXISTS "guild_chat_members_only" ON public.guild_chat_messages;

CREATE POLICY "guild_chat_basic" ON public.guild_chat_messages
FOR ALL USING (
  is_guild_member_safe(guild_id, auth.uid())
);

-- Melhorar políticas para guild_invites
DROP POLICY IF EXISTS "guild_invites_basic" ON public.guild_invites;

CREATE POLICY "guild_invites_policy" ON public.guild_invites
FOR ALL USING (
  invited_user_id = auth.uid() OR 
  inviter_id = auth.uid() OR 
  is_guild_owner_safe(guild_id, auth.uid()) OR
  is_guild_member_safe(guild_id, auth.uid())
);

-- Políticas para guild_mural_posts
DROP POLICY IF EXISTS "guild_mural_basic" ON public.guild_mural_posts;

CREATE POLICY "guild_mural_basic" ON public.guild_mural_posts
FOR ALL USING (
  is_guild_member_safe(guild_id, auth.uid())
);

-- Políticas para guild_mural_responses
DROP POLICY IF EXISTS "guild_mural_responses_policy" ON public.guild_mural_responses;

CREATE POLICY "guild_mural_responses_policy" ON public.guild_mural_responses
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.guild_mural_posts 
    WHERE id = guild_mural_responses.post_id 
    AND is_guild_member_safe(guild_id, auth.uid())
  )
);

-- Políticas para guild_library_files
DROP POLICY IF EXISTS "guild_library_basic" ON public.guild_library_files;

CREATE POLICY "guild_library_basic" ON public.guild_library_files
FOR ALL USING (
  is_guild_member_safe(guild_id, auth.uid())
);

-- Políticas para guild_member_xp
DROP POLICY IF EXISTS "guild_member_xp_policy" ON public.guild_member_xp;

CREATE POLICY "guild_member_xp_policy" ON public.guild_member_xp
FOR ALL USING (
  user_id = auth.uid() OR 
  is_guild_member_safe(guild_id, auth.uid())
);

-- Políticas para guild_battles
DROP POLICY IF EXISTS "guild_battles_policy" ON public.guild_battles;

CREATE POLICY "guild_battles_policy" ON public.guild_battles
FOR ALL USING (
  is_guild_member_safe(challenger_guild_id, auth.uid()) OR 
  is_guild_member_safe(challenged_guild_id, auth.uid())
);

-- Políticas para guild_battle_participants
DROP POLICY IF EXISTS "guild_battle_participants_policy" ON public.guild_battle_participants;

CREATE POLICY "guild_battle_participants_policy" ON public.guild_battle_participants
FOR ALL USING (
  user_id = auth.uid() OR 
  is_guild_member_safe(guild_id, auth.uid())
);

-- Políticas para guild_mural_response_likes
DROP POLICY IF EXISTS "guild_mural_response_likes_policy" ON public.guild_mural_response_likes;

CREATE POLICY "guild_mural_response_likes_policy" ON public.guild_mural_response_likes
FOR ALL USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.guild_mural_responses gmr
    JOIN public.guild_mural_posts gmp ON gmr.post_id = gmp.id
    WHERE gmr.id = guild_mural_response_likes.response_id 
    AND is_guild_member_safe(gmp.guild_id, auth.uid())
  )
);
