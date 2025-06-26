
-- Solução definitiva: Remover TODAS as dependências primeiro

-- Remover políticas que dependem das funções que queremos dropar
DROP POLICY IF EXISTS "Guild owners can create invites" ON public.guild_invites;
DROP POLICY IF EXISTS "Guild owners and moderators can create invites" ON public.guild_invites;

-- Remover todas as outras políticas das tabelas relacionadas
DROP POLICY IF EXISTS "Guild members can view chat messages" ON public.guild_chat_messages;
DROP POLICY IF EXISTS "Guild members can send messages" ON public.guild_chat_messages;
DROP POLICY IF EXISTS "Guild members can view mural posts" ON public.guild_mural_posts;
DROP POLICY IF EXISTS "Guild members can create posts" ON public.guild_mural_posts;
DROP POLICY IF EXISTS "Post authors can update their posts" ON public.guild_mural_posts;
DROP POLICY IF EXISTS "Guild members can view library files" ON public.guild_library_files;
DROP POLICY IF EXISTS "Guild members can upload files" ON public.guild_library_files;

-- Agora remover todas as políticas das tabelas principais
DROP POLICY IF EXISTS "Public guilds are viewable by everyone." ON public.guilds;
DROP POLICY IF EXISTS "Members can view their own private guilds." ON public.guilds;
DROP POLICY IF EXISTS "Users can create their own guilds." ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their own guilds." ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their own guilds." ON public.guilds;
DROP POLICY IF EXISTS "Anyone can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Owners can view their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "guilds_select_public" ON public.guilds;
DROP POLICY IF EXISTS "guilds_select_owner" ON public.guilds;
DROP POLICY IF EXISTS "guilds_insert" ON public.guilds;
DROP POLICY IF EXISTS "guilds_update" ON public.guilds;
DROP POLICY IF EXISTS "guilds_delete" ON public.guilds;

DROP POLICY IF EXISTS "Members can see the member list of their guilds." ON public.guild_members;
DROP POLICY IF EXISTS "Users can join public guilds." ON public.guild_members;
DROP POLICY IF EXISTS "Users can leave their guilds." ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can add new members." ON public.guild_members;
DROP POLICY IF EXISTS "Admins can remove members from their guild." ON public.guild_members;
DROP POLICY IF EXISTS "Guild members can view other members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;
DROP POLICY IF EXISTS "Owners and self can remove members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can update member roles" ON public.guild_members;
DROP POLICY IF EXISTS "Anyone can view guild members" ON public.guild_members;
DROP POLICY IF EXISTS "Authenticated users can join guilds" ON public.guild_members;
DROP POLICY IF EXISTS "Users can leave or owners can remove" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_select_all" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_self" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_owner" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete_self" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete_owner" ON public.guild_members;

-- Remover todas as funções auxiliares
DROP FUNCTION IF EXISTS public.is_member_of_guild(uuid);
DROP FUNCTION IF EXISTS public.is_guild_member(uuid, uuid);
DROP FUNCTION IF EXISTS public.is_guild_owner(uuid, uuid);
DROP FUNCTION IF EXISTS public.check_guild_membership(uuid, uuid);

-- Políticas SIMPLES e SEGURAS para guilds
CREATE POLICY "guilds_select_public" ON public.guilds
  FOR SELECT 
  USING (is_public = true);

CREATE POLICY "guilds_select_owner" ON public.guilds
  FOR SELECT 
  USING (auth.uid() = owner_id);

CREATE POLICY "guilds_insert" ON public.guilds
  FOR INSERT 
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "guilds_update" ON public.guilds
  FOR UPDATE 
  USING (auth.uid() = owner_id);

CREATE POLICY "guilds_delete" ON public.guilds
  FOR DELETE 
  USING (auth.uid() = owner_id);

-- Políticas SIMPLES e SEGURAS para guild_members
CREATE POLICY "guild_members_select_all" ON public.guild_members
  FOR SELECT 
  USING (true);

CREATE POLICY "guild_members_insert_self" ON public.guild_members
  FOR INSERT 
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "guild_members_insert_owner" ON public.guild_members
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.guilds 
      WHERE id = guild_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "guild_members_delete_self" ON public.guild_members
  FOR DELETE 
  USING (auth.uid() = profile_id);

CREATE POLICY "guild_members_delete_owner" ON public.guild_members
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.guilds 
      WHERE id = guild_id AND owner_id = auth.uid()
    )
  );

-- Políticas básicas para outras tabelas relacionadas (sem funções auxiliares)
CREATE POLICY "guild_invites_basic" ON public.guild_invites
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.guilds 
      WHERE id = guild_id AND owner_id = auth.uid()
    ) OR invited_user_id = auth.uid()
  );

CREATE POLICY "guild_chat_basic" ON public.guild_chat_messages
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.guild_members 
      WHERE guild_id = guild_chat_messages.guild_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "guild_mural_basic" ON public.guild_mural_posts
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.guild_members 
      WHERE guild_id = guild_mural_posts.guild_id AND profile_id = auth.uid()
    )
  );

CREATE POLICY "guild_library_basic" ON public.guild_library_files
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.guild_members 
      WHERE guild_id = guild_library_files.guild_id AND profile_id = auth.uid()
    )
  );
