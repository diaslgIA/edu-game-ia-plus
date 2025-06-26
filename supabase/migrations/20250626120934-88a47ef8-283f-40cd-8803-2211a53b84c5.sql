
-- Adicionar um campo guild_code único para cada guilda (se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'guilds' AND column_name = 'guild_code') THEN
        ALTER TABLE public.guilds ADD COLUMN guild_code TEXT UNIQUE;
    END IF;
END $$;

-- Gerar códigos únicos para guildas existentes
UPDATE public.guilds 
SET guild_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8))
WHERE guild_code IS NULL;

-- Tornar o guild_code obrigatório para novas guildas (se ainda não for)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'guilds' AND column_name = 'guild_code' AND is_nullable = 'YES') THEN
        ALTER TABLE public.guilds ALTER COLUMN guild_code SET NOT NULL;
    END IF;
END $$;

-- Criar tabela para solicitações de entrada em guildas (se não existir)
CREATE TABLE IF NOT EXISTS public.guild_join_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guild_id UUID REFERENCES public.guilds(id) ON DELETE CASCADE NOT NULL,
  requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(guild_id, requester_id)
);

-- Habilitar RLS na tabela de solicitações
ALTER TABLE public.guild_join_requests ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes e recriar
DROP POLICY IF EXISTS "Users can view relevant join requests" ON public.guild_join_requests;
DROP POLICY IF EXISTS "Authenticated users can create join requests" ON public.guild_join_requests;
DROP POLICY IF EXISTS "Guild leaders can update join requests" ON public.guild_join_requests;
DROP POLICY IF EXISTS "Users can delete their own requests or guild leaders can delete" ON public.guild_join_requests;

-- Criar políticas para solicitações
CREATE POLICY "Users can view relevant join requests" ON public.guild_join_requests
  FOR SELECT USING (
    auth.uid() = requester_id OR 
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT profile_id FROM public.guild_members 
      WHERE guild_id = guild_join_requests.guild_id AND role IN ('líder', 'moderador')
    )
  );

CREATE POLICY "Authenticated users can create join requests" ON public.guild_join_requests
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Guild leaders can update join requests" ON public.guild_join_requests
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT profile_id FROM public.guild_members 
      WHERE guild_id = guild_join_requests.guild_id AND role IN ('líder', 'moderador')
    )
  );

CREATE POLICY "Users can delete their own requests or guild leaders can delete" ON public.guild_join_requests
  FOR DELETE USING (
    auth.uid() = requester_id OR
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    ) OR
    auth.uid() IN (
      SELECT profile_id FROM public.guild_members 
      WHERE guild_id = guild_join_requests.guild_id AND role IN ('líder', 'moderador')
    )
  );

-- Criar trigger se não existir
DROP TRIGGER IF EXISTS update_guild_join_requests_updated_at ON public.guild_join_requests;
CREATE TRIGGER update_guild_join_requests_updated_at
  BEFORE UPDATE ON public.guild_join_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar realtime para solicitações
ALTER TABLE public.guild_join_requests REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_join_requests;

-- Habilitar RLS na tabela guilds
ALTER TABLE public.guilds ENABLE ROW LEVEL SECURITY;

-- Remover e recriar políticas para guildas
DROP POLICY IF EXISTS "Anyone can view public guilds" ON public.guilds;
DROP POLICY IF EXISTS "Members can view their private guilds" ON public.guilds;
DROP POLICY IF EXISTS "Authenticated users can create guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can update their guilds" ON public.guilds;
DROP POLICY IF EXISTS "Guild owners can delete their guilds" ON public.guilds;

-- Política para que todos possam visualizar guildas públicas
CREATE POLICY "Anyone can view public guilds" ON public.guilds
  FOR SELECT USING (is_public = true);

-- Política para que membros vejam suas guildas privadas
CREATE POLICY "Members can view their private guilds" ON public.guilds
  FOR SELECT USING (
    is_public = false AND (
      auth.uid() = owner_id OR
      auth.uid() IN (
        SELECT profile_id FROM public.guild_members WHERE guild_id = id
      )
    )
  );

-- Política para criação de guildas (usuários autenticados)
CREATE POLICY "Authenticated users can create guilds" ON public.guilds
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Política para atualização de guildas (apenas donos)
CREATE POLICY "Guild owners can update their guilds" ON public.guilds
  FOR UPDATE USING (auth.uid() = owner_id);

-- Política para exclusão de guildas (apenas donos)
CREATE POLICY "Guild owners can delete their guilds" ON public.guilds
  FOR DELETE USING (auth.uid() = owner_id);
