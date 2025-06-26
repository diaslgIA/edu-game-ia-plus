
-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Users can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can view their own guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can insert guilds" ON public.guilds;
DROP POLICY IF EXISTS "Users can update their own guilds" ON public.guilds;

-- Habilitar RLS na tabela guilds
ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;

-- Política para visualizar guildas públicas e próprias guildas
CREATE POLICY "Users can view accessible guilds" ON public.guilds
FOR SELECT USING (
  is_public = true OR 
  owner_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = guilds.id AND profile_id = auth.uid()
  )
);

-- Política para inserir guildas (apenas usuários autenticados)
CREATE POLICY "Authenticated users can create guilds" ON public.guilds
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND owner_id = auth.uid());

-- Política para atualizar apenas suas próprias guildas
CREATE POLICY "Users can update their own guilds" ON public.guilds
FOR UPDATE USING (owner_id = auth.uid());

-- Política para deletar apenas suas próprias guildas
CREATE POLICY "Users can delete their own guilds" ON public.guilds
FOR DELETE USING (owner_id = auth.uid());

-- Garantir que a tabela guild_members também tenha as políticas corretas
DROP POLICY IF EXISTS "Users can view guild members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can join guilds" ON public.guild_members;

ALTER TABLE public.guild_members ENABLE ROW LEVEL SECURITY;

-- Política para visualizar membros de guildas acessíveis
CREATE POLICY "Users can view guild members" ON public.guild_members
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE guilds.id = guild_members.guild_id 
    AND (
      guilds.is_public = true OR 
      guilds.owner_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.guild_members gm2 
        WHERE gm2.guild_id = guilds.id AND gm2.profile_id = auth.uid()
      )
    )
  )
);

-- Política para inserir membros (apenas donos ou através da função RPC)
CREATE POLICY "Guild owners can add members" ON public.guild_members
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE guilds.id = guild_members.guild_id 
    AND guilds.owner_id = auth.uid()
  )
);
