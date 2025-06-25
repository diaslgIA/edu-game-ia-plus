
-- Criar bucket para arquivos da biblioteca das guildas
INSERT INTO storage.buckets (id, name, public) 
VALUES ('guild-library', 'guild-library', true);

-- Política para permitir que membros das guildas vejam arquivos
CREATE POLICY "Guild members can view files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'guild-library' AND
    EXISTS (
      SELECT 1 FROM public.guild_library_files glf
      JOIN public.guild_members gm ON gm.guild_id = glf.guild_id
      WHERE glf.storage_path = name AND gm.profile_id = auth.uid()
    )
  );

-- Política para permitir que membros das guildas façam upload
CREATE POLICY "Guild members can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'guild-library' AND
    auth.uid() IS NOT NULL
  );

-- Política para permitir que uploaders gerenciem seus próprios arquivos
CREATE POLICY "Uploaders can manage their files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'guild-library' AND
    EXISTS (
      SELECT 1 FROM public.guild_library_files 
      WHERE storage_path = name AND uploader_id = auth.uid()
    )
  );
