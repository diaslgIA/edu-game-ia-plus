
-- 1) Criar bucket público para avatares
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- 2) Permitir leitura pública dos arquivos do bucket 'avatars'
create policy "Public read for avatars"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

-- 3) Permitir upload (insert) apenas pelo usuário autenticado como owner
create policy "Avatar uploads by authenticated users"
  on storage.objects
  for insert
  with check (bucket_id = 'avatars' and auth.uid() = owner);

-- 4) Permitir atualização (update) somente pelo dono do arquivo
create policy "Avatar updates by owner"
  on storage.objects
  for update
  using (bucket_id = 'avatars' and auth.uid() = owner)
  with check (bucket_id = 'avatars' and auth.uid() = owner);

-- 5) Permitir exclusão (delete) somente pelo dono do arquivo
create policy "Avatar deletions by owner"
  on storage.objects
  for delete
  using (bucket_id = 'avatars' and auth.uid() = owner);
