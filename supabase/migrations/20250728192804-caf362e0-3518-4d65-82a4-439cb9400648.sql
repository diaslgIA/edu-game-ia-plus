
-- Remover todas as políticas duplicadas da tabela guild_members
DROP POLICY IF EXISTS "Guild owners can add members" ON public.guild_members;
DROP POLICY IF EXISTS "Users can view guild members" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete_owner" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_delete_self" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_owner" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_self" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_insert_simple" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_select_simple" ON public.guild_members;
DROP POLICY IF EXISTS "guild_members_update_leaders" ON public.guild_members;

-- Criar função de segurança para verificar se usuário é dono da guilda
CREATE OR REPLACE FUNCTION public.is_guild_owner_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guilds 
    WHERE id = target_guild_id AND owner_id = target_user_id
  );
$$;

-- Criar função de segurança para verificar se usuário é membro da guilda (sem recursão)
CREATE OR REPLACE FUNCTION public.is_guild_member_safe(target_guild_id uuid, target_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.guild_members 
    WHERE guild_id = target_guild_id AND profile_id = target_user_id
  );
$$;

-- Criar políticas RLS simples e sem recursão para guild_members
CREATE POLICY "guild_members_select_policy" ON public.guild_members
  FOR SELECT USING (
    profile_id = auth.uid() OR 
    public.is_guild_owner_safe(guild_id, auth.uid()) OR
    public.is_guild_member_safe(guild_id, auth.uid())
  );

CREATE POLICY "guild_members_insert_policy" ON public.guild_members
  FOR INSERT WITH CHECK (
    profile_id = auth.uid() OR 
    public.is_guild_owner_safe(guild_id, auth.uid())
  );

CREATE POLICY "guild_members_update_policy" ON public.guild_members
  FOR UPDATE USING (
    public.is_guild_owner_safe(guild_id, auth.uid()) OR
    (profile_id = auth.uid() AND role IN ('líder', 'membro'))
  );

CREATE POLICY "guild_members_delete_policy" ON public.guild_members
  FOR DELETE USING (
    profile_id = auth.uid() OR 
    public.is_guild_owner_safe(guild_id, auth.uid())
  );

-- Criar tabela para respostas do mural
CREATE TABLE IF NOT EXISTS public.guild_mural_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.guild_mural_posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_pinned boolean DEFAULT false,
  likes_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Criar tabela para curtidas das respostas
CREATE TABLE IF NOT EXISTS public.guild_mural_response_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid REFERENCES public.guild_mural_responses(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(response_id, user_id)
);

-- Criar tabela para XP dos membros da guilda
CREATE TABLE IF NOT EXISTS public.guild_member_xp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guild_id uuid REFERENCES public.guilds(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp_points integer DEFAULT 0,
  level integer DEFAULT 1,
  badges jsonb DEFAULT '[]',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(guild_id, user_id)
);

-- Criar tabela para batalhas entre guildas
CREATE TABLE IF NOT EXISTS public.guild_battles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_guild_id uuid REFERENCES public.guilds(id) ON DELETE CASCADE,
  challenged_guild_id uuid REFERENCES public.guilds(id) ON DELETE CASCADE,
  battle_type text DEFAULT 'quiz_rapido',
  status text DEFAULT 'pending', -- pending, active, completed, cancelled
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  challenger_score integer DEFAULT 0,
  challenged_score integer DEFAULT 0,
  winner_guild_id uuid REFERENCES public.guilds(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Criar tabela para participantes das batalhas
CREATE TABLE IF NOT EXISTS public.guild_battle_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  battle_id uuid REFERENCES public.guild_battles(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  guild_id uuid REFERENCES public.guilds(id) ON DELETE CASCADE,
  score integer DEFAULT 0,
  answers jsonb DEFAULT '[]',
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Habilitar RLS em todas as novas tabelas
ALTER TABLE public.guild_mural_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_mural_response_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_member_xp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_battles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guild_battle_participants ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para guild_mural_responses
CREATE POLICY "guild_mural_responses_policy" ON public.guild_mural_responses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.guild_mural_posts gmp
      JOIN public.guild_members gm ON gmp.guild_id = gm.guild_id
      WHERE gmp.id = post_id AND gm.profile_id = auth.uid()
    )
  );

-- Políticas RLS para guild_mural_response_likes
CREATE POLICY "guild_mural_response_likes_policy" ON public.guild_mural_response_likes
  FOR ALL USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.guild_mural_responses gmr
      JOIN public.guild_mural_posts gmp ON gmr.post_id = gmp.id
      JOIN public.guild_members gm ON gmp.guild_id = gm.guild_id
      WHERE gmr.id = response_id AND gm.profile_id = auth.uid()
    )
  );

-- Políticas RLS para guild_member_xp
CREATE POLICY "guild_member_xp_policy" ON public.guild_member_xp
  FOR ALL USING (
    user_id = auth.uid() OR
    public.is_guild_member_safe(guild_id, auth.uid())
  );

-- Políticas RLS para guild_battles
CREATE POLICY "guild_battles_policy" ON public.guild_battles
  FOR ALL USING (
    public.is_guild_member_safe(challenger_guild_id, auth.uid()) OR
    public.is_guild_member_safe(challenged_guild_id, auth.uid())
  );

-- Políticas RLS para guild_battle_participants
CREATE POLICY "guild_battle_participants_policy" ON public.guild_battle_participants
  FOR ALL USING (
    user_id = auth.uid() OR
    public.is_guild_member_safe(guild_id, auth.uid())
  );

-- Função para atualizar XP do usuário
CREATE OR REPLACE FUNCTION public.update_guild_member_xp(
  p_guild_id uuid,
  p_user_id uuid,
  p_xp_gain integer,
  p_reason text DEFAULT 'activity'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_xp integer;
  new_level integer;
BEGIN
  -- Inserir ou atualizar XP
  INSERT INTO public.guild_member_xp (guild_id, user_id, xp_points, level)
  VALUES (p_guild_id, p_user_id, p_xp_gain, 1)
  ON CONFLICT (guild_id, user_id)
  DO UPDATE SET
    xp_points = guild_member_xp.xp_points + p_xp_gain,
    level = GREATEST(1, FLOOR((guild_member_xp.xp_points + p_xp_gain) / 100) + 1),
    updated_at = now()
  RETURNING xp_points INTO current_xp;
  
  -- Calcular novo nível
  new_level := GREATEST(1, FLOOR(current_xp / 100) + 1);
  
  -- Atualizar nível se necessário
  UPDATE public.guild_member_xp 
  SET level = new_level
  WHERE guild_id = p_guild_id AND user_id = p_user_id;
END;
$$;

-- Trigger para dar XP quando alguém responde no mural
CREATE OR REPLACE FUNCTION public.award_xp_for_mural_response()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  guild_id_var uuid;
BEGIN
  -- Buscar guild_id do post
  SELECT gmp.guild_id INTO guild_id_var
  FROM public.guild_mural_posts gmp
  WHERE gmp.id = NEW.post_id;
  
  -- Dar XP para quem respondeu
  PERFORM public.update_guild_member_xp(guild_id_var, NEW.author_id, 10, 'mural_response');
  
  RETURN NEW;
END;
$$;

-- Criar trigger para XP no mural
CREATE TRIGGER award_xp_mural_response
  AFTER INSERT ON public.guild_mural_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.award_xp_for_mural_response();

-- Habilitar realtime para as novas tabelas
ALTER TABLE public.guild_mural_responses REPLICA IDENTITY FULL;
ALTER TABLE public.guild_mural_response_likes REPLICA IDENTITY FULL;
ALTER TABLE public.guild_member_xp REPLICA IDENTITY FULL;
ALTER TABLE public.guild_battles REPLICA IDENTITY FULL;
ALTER TABLE public.guild_battle_participants REPLICA IDENTITY FULL;

-- Adicionar tabelas ao realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_mural_responses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_mural_response_likes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_member_xp;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_battles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_battle_participants;
