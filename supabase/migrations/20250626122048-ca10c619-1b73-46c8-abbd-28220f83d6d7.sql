
-- Primeiro, remover TODAS as políticas possíveis das duas tabelas, incluindo as que podem ter sido criadas
DROP POLICY IF EXISTS "Users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Everyone can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Members can view their private guilds" ON public.guilds;
DROP POLICY IF EXISTS "Owners can update guilds" ON public.guilds;
DROP POLICY IF EXISTS "Owners can delete guilds" ON public.guilds;
DROP POLICY IF EXISTS "Public guilds are viewable by everyone" ON public.guilds;
DROP POLICY IF EXISTS "Guild members can view private guilds" ON public.guilds;
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Anyone can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Public guilds viewable by all" ON public.guilds;

DROP POLICY IF EXISTS "Members can view guild memberships" ON public.guild_members;
DROP POLICY IF EXISTS "Owners can add new members" ON public.guild_members;
DROP POLICY IF EXISTS "Owners can update member roles" ON public.guild_members;
DROP POLICY IF EXISTS "Members can leave or owners can remove" ON public.guild_members;
DROP POLICY IF EXISTS "Users can view guild members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can add members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can update member roles" ON public.guild_members;
DROP POLICY IF EXISTS "Guild members can view their own memberships" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can add members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can update member roles" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can remove members" ON public.guild_members;
DROP POLICY IF EXISTS "Anyone can view guild members" ON public.guild_members;
DROP POLICY IF EXISTS "Authenticated users can join guilds" ON public.guild_members;

-- Agora criar as políticas com nomes únicos e simples
CREATE POLICY "guilds_select_public" ON public.guilds
  FOR SELECT USING (is_public = true);

CREATE POLICY "guilds_select_private_members" ON public.guilds
  FOR SELECT USING (
    is_public = false AND (
      auth.uid() = owner_id OR
      EXISTS (
        SELECT 1 FROM public.guild_members 
        WHERE guild_id = guilds.id AND profile_id = auth.uid()
      )
    )
  );

CREATE POLICY "guilds_insert_owner" ON public.guilds
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "guilds_update_owner" ON public.guilds
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "guilds_delete_owner" ON public.guilds
  FOR DELETE USING (auth.uid() = owner_id);

-- Políticas para guild_members
CREATE POLICY "guild_members_select" ON public.guild_members
  FOR SELECT USING (
    auth.uid() = profile_id OR
    EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND owner_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.guild_members gm WHERE gm.guild_id = guild_members.guild_id AND gm.profile_id = auth.uid())
  );

CREATE POLICY "guild_members_insert_owner" ON public.guild_members
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND owner_id = auth.uid())
  );

CREATE POLICY "guild_members_update_owner" ON public.guild_members
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND owner_id = auth.uid())
  );

CREATE POLICY "guild_members_delete" ON public.guild_members
  FOR DELETE USING (
    auth.uid() = profile_id OR
    EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND owner_id = auth.uid())
  );
