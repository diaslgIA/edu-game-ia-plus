
-- Função RPC para criar guilda e adicionar dono como membro atomicamente
CREATE OR REPLACE FUNCTION public.create_guild_with_owner(
  guild_name text,
  guild_description text,
  guild_code text,
  owner_id uuid,
  is_public boolean
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_guild_id uuid;
  result jsonb;
BEGIN
  -- Criar a guilda
  INSERT INTO public.guilds (name, description, guild_code, owner_id, is_public, total_points)
  VALUES (guild_name, guild_description, guild_code, owner_id, is_public, 0)
  RETURNING id INTO new_guild_id;
  
  -- Adicionar o dono como membro com privilégios de SECURITY DEFINER
  INSERT INTO public.guild_members (guild_id, profile_id, role, joined_at)
  VALUES (new_guild_id, owner_id, 'dono', now());
  
  -- Retornar informações da guilda criada
  SELECT jsonb_build_object(
    'id', new_guild_id,
    'name', guild_name,
    'success', true
  ) INTO result;
  
  RETURN result;
END;
$$;
