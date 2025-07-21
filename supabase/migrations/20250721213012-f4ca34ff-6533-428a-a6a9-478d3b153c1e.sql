
-- Remover políticas problemáticas que causam recursão
DROP POLICY IF EXISTS "guild_members_select" ON guild_members;
DROP POLICY IF EXISTS "guild_members_insert_allowed" ON guild_members;
DROP POLICY IF EXISTS "guild_members_select_all" ON guild_members;

-- Criar políticas mais simples e diretas para evitar recursão
CREATE POLICY "guild_members_select_simple" ON guild_members
FOR SELECT USING (
  profile_id = auth.uid() OR 
  guild_id IN (
    SELECT id FROM guilds WHERE owner_id = auth.uid()
  )
);

CREATE POLICY "guild_members_insert_simple" ON guild_members
FOR INSERT WITH CHECK (
  profile_id = auth.uid() OR 
  guild_id IN (
    SELECT id FROM guilds WHERE owner_id = auth.uid()
  )
);

-- Simplificar a política de atualização para guildas também
DROP POLICY IF EXISTS "guilds_select_private_members" ON guilds;
CREATE POLICY "guilds_select_members_simple" ON guilds
FOR SELECT USING (
  is_public = true OR 
  owner_id = auth.uid() OR
  id IN (
    SELECT DISTINCT guild_id FROM guild_members WHERE profile_id = auth.uid()
  )
);
