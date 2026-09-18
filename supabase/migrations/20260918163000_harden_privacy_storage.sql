-- Endurece privacidad de contacto y Storage. Pegar también en el SQL Editor de Supabase.

alter table public.profiles enable row level security;
alter table public.publicaciones enable row level security;

alter table public.publicaciones add column if not exists cantidad integer not null default 1;
alter table public.publicaciones add column if not exists imagenes jsonb not null default '[]'::jsonb;

drop policy if exists "Public can read publications" on public.publicaciones;
drop policy if exists "publications_select_public" on public.publicaciones;
drop policy if exists "Anon reads catalog without contact" on public.publicaciones;
drop policy if exists "Authenticated reads publications" on public.publicaciones;

create policy "Anon reads catalog without contact"
  on public.publicaciones for select to anon
  using (estado in ('activo', 'pausado'));

create policy "Authenticated reads publications"
  on public.publicaciones for select to authenticated
  using (
    auth.uid() = usuario_id
    or estado in ('activo', 'pausado', 'reservado', 'vendido', 'donado')
  );

revoke all on table public.publicaciones from anon, public;
grant select (
  id, titulo, descripcion, precio, talla, categoria, condicion,
  imagen_url, imagenes, tipo, estado, created_at, usuario_id, cantidad
) on table public.publicaciones to anon;
grant select, insert, update, delete on table public.publicaciones to authenticated;

drop policy if exists "Public reads uniform images" on storage.objects;
drop policy if exists "uniformes_read_public" on storage.objects;
create policy "uniformes_read_public"
  on storage.objects for select
  using (bucket_id = 'uniformes');

drop policy if exists "uniformes_insert_own_folder" on storage.objects;
create policy "uniformes_insert_own_folder"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'uniformes'
    and (storage.foldername(name))[1] = auth.uid()::text
    and lower(right(name, 4)) in ('.jpg', '.png', 'webp', 'jpeg')
  );
