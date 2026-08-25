create extension if not exists pgcrypto;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, phone text, preferred_language text default 'en', role text default 'client' check (role in ('client','trainer','admin')),
  goals text, training_location text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null,
  name text not null, email text not null, phone text, area text, goal text not null, service text not null, message text,
  status text default 'new', created_at timestamptz default now()
);
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(), client_id uuid references auth.users(id) on delete cascade, trainer_id uuid references auth.users(id) on delete set null,
  starts_at timestamptz not null, duration_minutes int default 60, format text check(format in ('in_home','private','online')), location_notes text, status text default 'requested', created_at timestamptz default now()
);
create table if not exists public.coaching_plans (
  id uuid primary key default gen_random_uuid(), client_id uuid references auth.users(id) on delete cascade, trainer_id uuid references auth.users(id) on delete set null,
  title text not null, plan_type text check(plan_type in ('training','nutrition','habit')), content jsonb default '{}'::jsonb, active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(), client_id uuid references auth.users(id) on delete cascade, metric text not null, value numeric, note text, logged_at timestamptz default now()
);
alter table public.profiles enable row level security; alter table public.appointments enable row level security; alter table public.coaching_plans enable row level security; alter table public.progress_entries enable row level security;
create policy "profiles_self" on public.profiles for select using (auth.uid()=id);
create policy "appointments_client" on public.appointments for select using (auth.uid()=client_id or auth.uid()=trainer_id);
create policy "plans_client" on public.coaching_plans for select using (auth.uid()=client_id or auth.uid()=trainer_id);
create policy "progress_client" on public.progress_entries for all using (auth.uid()=client_id) with check (auth.uid()=client_id);
