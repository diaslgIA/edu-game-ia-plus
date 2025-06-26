
-- Habilitar RLS na tabela guild_members se não estiver habilitado
ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes para recriar
DROP POLICY IF EXISTS "Guild members can view their own memberships" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can view all members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can add members" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can update member roles" ON public.guild_members;
DROP POLICY IF EXISTS "Guild owners and leaders can remove members" ON public.guild_members;
DROP POLICY IF EXISTS "Members can leave guilds" ON public.guild_members;

-- Política para visualizar membros (membros podem ver outros membros da mesma guilda)
CREATE POLICY "Guild members can view their own memberships" ON public.guild_members
  FOR SELECT USING (
    auth.uid() = profile_id OR
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT gm.profile_id FROM public.guild_members gm 
      WHERE gm.guild_id = guild_members.guild_id
    )
  );

-- Política para adicionar membros (donos e líderes podem adicionar)
CREATE POLICY "Guild owners and leaders can add members" ON public.guild_members
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT gm.profile_id FROM public.guild_members gm 
      WHERE gm.guild_id = guild_members.guild_id AND gm.role IN ('líder', 'moderador')
    )
  );

-- Política para atualizar papéis (apenas donos e líderes)
CREATE POLICY "Guild owners and leaders can update member roles" ON public.guild_members
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT gm.profile_id FROM public.guild_members gm 
      WHERE gm.guild_id = guild_members.guild_id AND gm.role IN ('líder', 'moderador')
    )
  );

-- Política para remover membros (donos, líderes podem remover outros, membros podem sair)
CREATE POLICY "Guild owners and leaders can remove members" ON public.guild_members
  FOR DELETE USING (
    auth.uid() = profile_id OR
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT gm.profile_id FROM public.guild_members gm 
      WHERE gm.guild_id = guild_members.guild_id AND gm.role IN ('líder', 'moderador')
    )
  );
