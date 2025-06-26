
-- Corrigir TODAS as políticas que podem causar recursão infinita

-- 1. Remover TODAS as políticas problemáticas das duas tabelas
DROP POLICY IF EXISTS "Users can view public guilds or their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Anyone can view public guilds" ON public.guilds; 
DROP POLICY IF EXISTS "Public guilds are viewable by everyone" ON public.guilds;
DROP POLICY IF EXISTS "Members can view their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;

-- Remover políticas de guild_members que podem causar recursão
DROP POLICY IF EXISTS "Users can view guild members if they are members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can view guild members if guild is public or they are members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and members can manage guild_members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can manage members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can remove members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners can update member roles" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and moderators can create invites" ON public.guild_invites;

-- 2. Criar políticas simples e seguras para GUILDS (sem recursão)

-- Política 1: Qualquer um pode ver guildas públicas
CREATE POLICY "Anyone can view public guilds" ON public.guilds
FOR SELECT
USING (is_public = true);

-- Política 2: Donos podem ver suas próprias guildas 
CREATE POLICY "Owners can view their own guilds" ON public.guilds
FOR SELECT
USING (owner_id = auth.uid());

-- Política 3: Usuários autenticados podem criar guildas
CREATE POLICY "Authenticated users can create guilds" ON public.guilds
FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

-- Política 4: Donos podem atualizar suas guildas
CREATE POLICY "Guild owners can update their guilds" ON public.guilds
FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Política 5: Donos podem deletar suas guildas
CREATE POLICY "Guild owners can delete their guilds" ON public.guilds
FOR DELETE
TO authenticated
USING (owner_id = auth.uid());

-- 3. Criar políticas simples para GUILD_MEMBERS (sem recursão)

-- Política 1: Membros podem ver outros membros da mesma guilda através de função segura
CREATE POLICY "Guild members can view other members" ON public.guild_members
FOR SELECT
TO authenticated
USING (
  -- Verifica se a guilda é pública OU se o usuário é membro/dono
  EXISTS (
    SELECT 1 FROM public.guilds g 
    WHERE g.id = guild_id 
    AND (g.is_public = true OR g.owner_id = auth.uid())
  )
  OR profile_id = auth.uid()
);

-- Política 2: Usuários podem se juntar a guildas
CREATE POLICY "Users can join guilds" ON public.guild_members
FOR INSERT
TO authenticated
WITH CHECK (profile_id = auth.uid());

-- Política 3: Donos e o próprio usuário podem remover membros
CREATE POLICY "Owners and self can remove members" ON public.guild_members
FOR DELETE
TO authenticated
USING (
  profile_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND owner_id = auth.uid())
);

-- Política 4: Donos podem atualizar papéis
CREATE POLICY "Guild owners can update member roles" ON public.guild_members
FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.guilds WHERE id = guild_id AND owner_id = auth.uid())
);
