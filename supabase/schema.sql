create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  live_url text,
  repo_url text,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Anyone, signed in or not, can read
create policy "Public can read projects"
  on public.projects for select
  to anon, authenticated
  using (true);

-- Only the owner can write
create policy "Owner can insert projects"
  on public.projects for insert
  to authenticated
  with check ((select auth.uid()) = 'YOUR-USER-UID'::uuid);

create policy "Owner can update projects"
  on public.projects for update
  to authenticated
  using ((select auth.uid()) = 'YOUR-USER-UID'::uuid)
  with check ((select auth.uid()) = 'YOUR-USER-UID'::uuid);

create policy "Owner can delete projects"
  on public.projects for delete
  to authenticated
  using ((select auth.uid()) = 'YOUR-USER-UID'::uuid);