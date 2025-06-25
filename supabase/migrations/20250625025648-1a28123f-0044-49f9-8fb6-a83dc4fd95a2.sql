
-- Criar tabela para convites de guilda
CREATE TABLE public.guild_invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guild_id UUID REFERENCES public.guilds(id) ON DELETE CASCADE NOT NULL,
  inviter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  invited_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(guild_id, invited_user_id)
);

-- Habilitar RLS na tabela de convites
ALTER TABLE public.guild_invites ENABLE ROW LEVEL SECURITY;

-- Política para que usuários vejam convites relacionados a eles
CREATE POLICY "Users can view their own invites" ON public.guild_invites
  FOR SELECT USING (
    auth.uid() = invited_user_id OR 
    auth.uid() = inviter_id OR
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    )
  );

-- Política para criar convites (apenas donos e moderadores)
CREATE POLICY "Guild owners and moderators can create invites" ON public.guild_invites
  FOR INSERT WITH CHECK (
    auth.uid() = inviter_id AND
    (
      auth.uid() IN (SELECT owner_id FROM public.guilds WHERE id = guild_id) OR
      auth.uid() IN (
        SELECT profile_id FROM public.guild_members 
        WHERE guild_id = guild_invites.guild_id AND role IN ('líder', 'moderador')
      )
    )
  );

-- Política para atualizar convites (apenas o convidado pode aceitar/rejeitar)
CREATE POLICY "Invited users can update their invites" ON public.guild_invites
  FOR UPDATE USING (auth.uid() = invited_user_id);

-- Política para deletar convites (convidador e dono da guilda)
CREATE POLICY "Inviters and guild owners can delete invites" ON public.guild_invites
  FOR DELETE USING (
    auth.uid() = inviter_id OR
    auth.uid() IN (
      SELECT owner_id FROM public.guilds WHERE id = guild_id
    )
  );

-- Adicionar trigger para atualizar updated_at
CREATE TRIGGER update_guild_invites_updated_at
  BEFORE UPDATE ON public.guild_invites
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar realtime para convites
ALTER TABLE public.guild_invites REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.guild_invites;
