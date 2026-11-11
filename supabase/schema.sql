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

alter table public.projects
  add column slug text unique,
  add column problem text,
  add column role text,
  add column stack text[] not null default '{}',
  add column next_steps text,
  add column video_url text,
  add column screenshots text[] not null default '{}',
  add column is_capstone boolean not null default false;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  subject text check (subject is null or char_length(subject) <= 150),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Visitors can add a message, and nothing else
create policy "Anyone can send a message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (char_length(message) between 1 and 5000);

-- Only the owner can read
create policy "Owner can read messages"
  on public.contact_messages for select
  to authenticated
  using ((select auth.uid()) = 'YOUR-USER-UID'::uuid);

-- Only the owner can delete (no update policy, so nobody can edit messages)
create policy "Owner can delete messages"
  on public.contact_messages for delete
  to authenticated
  using ((select auth.uid()) = 'YOUR-USER-UID'::uuid);

create or replace function public.limit_contact_messages()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.contact_messages
      where created_at > now() - interval '1 minute') >= 5 then
    raise exception 'Too many messages, please try again shortly';
  end if;
  return new;
end;
$$;

revoke execute on function public.limit_contact_messages() from public, anon, authenticated;

create trigger contact_messages_rate_limit
  before insert on public.contact_messages
  for each row execute function public.limit_contact_messages();
