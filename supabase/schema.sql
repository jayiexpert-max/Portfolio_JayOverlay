create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  summary text not null,
  location text not null,
  email text not null,
  resume_url text not null,
  avatar_text text not null,
  socials jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  problem text not null,
  stack text[] not null default '{}',
  results text[] not null default '{}',
  status text not null check (status in ('live', 'in progress', 'archived')),
  href text,
  github text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  period text not null,
  summary text not null,
  bullets text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  type text not null,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issued_at date not null,
  credential_id text,
  pdf_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.notes enable row level security;
alter table public.media enable row level security;
alter table public.certificates enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'Public read profiles'
  ) then
    create policy "Public read profiles" on public.profiles for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'projects' and policyname = 'Public read projects'
  ) then
    create policy "Public read projects" on public.projects for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'experiences' and policyname = 'Public read experiences'
  ) then
    create policy "Public read experiences" on public.experiences for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'skills' and policyname = 'Public read skills'
  ) then
    create policy "Public read skills" on public.skills for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'notes' and policyname = 'Public read notes'
  ) then
    create policy "Public read notes" on public.notes for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'media' and policyname = 'Public read media'
  ) then
    create policy "Public read media" on public.media for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'certificates' and policyname = 'Public read certificates'
  ) then
    create policy "Public read certificates" on public.certificates for select using (true);
  end if;
end $$;
