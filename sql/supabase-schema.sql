-- Toronto Performance Coaching production schema
-- Run in a new Supabase project SQL editor. Review before applying to an existing database.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at=now(); return new; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  preferred_language text not null default 'en' check (preferred_language in ('en','fa','fr','es')),
  timezone text not null default 'UTC',
  role text not null default 'client' check (role in ('client','trainer','admin')),
  goals text,
  training_location text,
  emergency_contact jsonb default '{}'::jsonb,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trainer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  display_name text not null,
  slug text unique not null,
  bio jsonb not null default '{}'::jsonb,
  specialties text[] not null default '{}',
  languages text[] not null default '{en}',
  service_areas text[] not null default '{Toronto}',
  image_url text,
  active boolean not null default true,
  accepting_clients boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title jsonb not null default '{}'::jsonb,
  short_description jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  service_type text not null default 'personal_training',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  price_cents integer not null default 0 check (price_cents >= 0),
  currency text not null default 'cad',
  billing_type text not null default 'one_time' check (billing_type in ('one_time','subscription')),
  stripe_price_id text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  area text,
  goal text not null,
  service text not null,
  message text,
  status text not null default 'new' check(status in ('new','contacted','converted','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  trainer_id uuid references public.trainer_profiles(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  starts_at timestamptz not null,
  duration_minutes integer not null default 60 check(duration_minutes between 30 and 180),
  format text not null check(format in ('in_home','private','online')),
  client_timezone text not null default 'UTC',
  location_notes text,
  status text not null default 'requested' check(status in ('requested','confirmed','completed','cancelled','no_show')),
  price_cents integer,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists appointments_client_starts_idx on public.appointments(client_id,starts_at desc);
create index if not exists appointments_trainer_starts_idx on public.appointments(trainer_id,starts_at desc);

create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  trainer_id uuid references public.trainer_profiles(id) on delete set null,
  title text not null,
  status text not null default 'draft' check(status in ('draft','active','completed','archived')),
  content jsonb not null default '{}'::jsonb,
  starts_on date,
  ends_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.nutrition_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  trainer_id uuid references public.trainer_profiles(id) on delete set null,
  title text not null,
  status text not null default 'draft' check(status in ('draft','active','completed','archived')),
  content jsonb not null default '{}'::jsonb,
  disclaimer text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  metric text not null,
  value numeric not null,
  unit text,
  note text,
  logged_at timestamptz not null default now()
);
create index if not exists progress_client_logged_idx on public.progress_entries(client_id,logged_at desc);

create table if not exists public.client_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  note text not null,
  visible_to_client boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles(id) on delete set null,
  package_id uuid references public.packages(id) on delete set null,
  provider text not null default 'stripe',
  provider_payment_id text unique,
  amount_cents integer not null default 0,
  currency text not null default 'cad',
  status text not null default 'pending',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cms_pages (
  slug text primary key,
  eyebrow jsonb not null default '{}'::jsonb,
  title jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  extra jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_entries (
  path text not null,
  locale text not null check(locale in ('en','fa','fr','es')),
  title text not null,
  description text not null,
  og_title text,
  og_description text,
  indexable boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key(path,locale)
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default 'null'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  quote jsonb not null default '{}'::jsonb,
  rating integer check(rating between 1 and 5),
  active boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);



-- Exercise library overrides. RepDB remains the source dataset; this table stores brand-owned visibility and translations.
create table if not exists public.exercise_overrides (
  source_id text primary key,
  name jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  featured boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  locale text not null default 'en',
  question text,
  answer text,
  helpful boolean,
  created_at timestamptz not null default now()
);

-- Updated-at triggers
DO $$ declare t text; begin
  foreach t in array array['profiles','trainer_profiles','services','packages','appointments','training_plans','nutrition_plans','payments','cms_pages','seo_entries','site_settings','testimonials','exercise_overrides'] loop
    execute format('drop trigger if exists set_updated_at on public.%I',t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',t);
  end loop;
end $$;

-- Automatically create a client profile on first signup.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,email,full_name)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name'))
  on conflict(id) do update set email=excluded.email;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert or update of email on auth.users for each row execute function public.handle_new_user();

-- Role helpers used by RLS.
create or replace function public.current_role() returns text language sql stable security definer set search_path=public as $$
  select coalesce((select role from public.profiles where id=auth.uid()),'client')
$$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$ select public.current_role()='admin' $$;
create or replace function public.is_staff() returns boolean language sql stable security definer set search_path=public as $$ select public.current_role() in ('admin','trainer') $$;
create or replace function public.my_trainer_profile_id() returns uuid language sql stable security definer set search_path=public as $$ select id from public.trainer_profiles where user_id=auth.uid() limit 1 $$;

alter table public.profiles enable row level security;
alter table public.trainer_profiles enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.appointment_requests enable row level security;
alter table public.appointments enable row level security;
alter table public.training_plans enable row level security;
alter table public.nutrition_plans enable row level security;
alter table public.progress_entries enable row level security;
alter table public.exercise_overrides enable row level security;
alter table public.ai_feedback enable row level security;
alter table public.client_notes enable row level security;
alter table public.payments enable row level security;
alter table public.cms_pages enable row level security;
alter table public.seo_entries enable row level security;
alter table public.site_settings enable row level security;
alter table public.testimonials enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles
create policy "profile self read" on public.profiles for select using(auth.uid()=id or public.is_staff());
create policy "profile self update" on public.profiles for update using(auth.uid()=id or public.is_admin()) with check(auth.uid()=id or public.is_admin());
create policy "profile admin insert" on public.profiles for insert with check(auth.uid()=id or public.is_admin());

-- Public catalog/content: public read, admin write.
create policy "trainer public read" on public.trainer_profiles for select using(active or public.is_staff());
create policy "trainer admin all" on public.trainer_profiles for all using(public.is_admin()) with check(public.is_admin());
create policy "services public read" on public.services for select using(active or public.is_admin());
create policy "services admin all" on public.services for all using(public.is_admin()) with check(public.is_admin());
create policy "packages public read" on public.packages for select using(active or public.is_admin());
create policy "packages admin all" on public.packages for all using(public.is_admin()) with check(public.is_admin());
create policy "cms public read" on public.cms_pages for select using(published or public.is_admin());
create policy "cms admin all" on public.cms_pages for all using(public.is_admin()) with check(public.is_admin());
create policy "seo public read" on public.seo_entries for select using(true);
create policy "seo admin all" on public.seo_entries for all using(public.is_admin()) with check(public.is_admin());
create policy "settings public read" on public.site_settings for select using(true);
create policy "settings admin all" on public.site_settings for all using(public.is_admin()) with check(public.is_admin());
create policy "testimonials public read" on public.testimonials for select using(active or public.is_admin());
create policy "testimonials admin all" on public.testimonials for all using(public.is_admin()) with check(public.is_admin());

-- Appointments
create policy "appointments client read" on public.appointments for select using(auth.uid()=client_id or public.is_staff());
create policy "appointments client create" on public.appointments for insert with check(auth.uid()=client_id or public.is_staff());
create policy "appointments staff update" on public.appointments for update using(public.is_staff()) with check(public.is_staff());
create policy "appointments admin delete" on public.appointments for delete using(public.is_admin());

-- Plans
create policy "training plan client read" on public.training_plans for select using(auth.uid()=client_id or public.is_staff());
create policy "training plan staff write" on public.training_plans for all using(public.is_staff()) with check(public.is_staff());
create policy "nutrition plan client read" on public.nutrition_plans for select using(auth.uid()=client_id or public.is_staff());
create policy "nutrition plan staff write" on public.nutrition_plans for all using(public.is_staff()) with check(public.is_staff());

-- Progress and notes
create policy "progress client read" on public.progress_entries for select using(auth.uid()=client_id or public.is_staff());
create policy "progress client insert" on public.progress_entries for insert with check(auth.uid()=client_id or public.is_staff());
create policy "progress client update" on public.progress_entries for update using(auth.uid()=client_id or public.is_staff()) with check(auth.uid()=client_id or public.is_staff());
create policy "exercise overrides public read" on public.exercise_overrides for select using(active=true or public.is_admin());
create policy "exercise overrides admin all" on public.exercise_overrides for all using(public.is_admin()) with check(public.is_admin());
create policy "ai feedback own insert" on public.ai_feedback for insert with check(user_id is null or auth.uid()=user_id);
create policy "ai feedback admin read" on public.ai_feedback for select using(public.is_admin());
create policy "notes visible read" on public.client_notes for select using(public.is_staff() or (auth.uid()=client_id and visible_to_client));
create policy "notes staff write" on public.client_notes for all using(public.is_staff()) with check(public.is_staff());

-- Payments are private to client and admins.
create policy "payments client read" on public.payments for select using(auth.uid()=client_id or public.is_admin());
create policy "payments admin write" on public.payments for all using(public.is_admin()) with check(public.is_admin());

-- Leads and audit logs are server/admin only via service role; admins can read.
create policy "lead admin read" on public.appointment_requests for select using(public.is_admin());
create policy "lead admin update" on public.appointment_requests for update using(public.is_admin()) with check(public.is_admin());
create policy "audit admin read" on public.audit_logs for select using(public.is_admin());

-- Starter content. Safe to re-run.
insert into public.cms_pages(slug,eyebrow,title,body,published) values
('home','{"en":"Personal training in Toronto","fa":"مربی خصوصی در تورنتو","fr":"Entraînement personnel à Toronto","es":"Entrenamiento personal en Toronto"}',
'{"en":"Coaching that meets you where you are.","fa":"مربیگری متناسب با زندگی و هدف شما.","fr":"Un coaching adapté à votre réalité.","es":"Coaching que se adapta a tu vida."}',
'{"en":"In-home personal training in Toronto plus worldwide online coaching, personalized workout programming and practical nutrition guidance — built around your goals, schedule and experience level.","fa":"پرسنال ترینینگ در منزل، تمرین خصوصی، کوچینگ آنلاین، برنامه تمرینی و راهنمایی تغذیه‌ای کاربردی؛ متناسب با هدف، زمان و سطح آمادگی شما.","fr":"Entraînement à domicile, séances privées, coaching en ligne et programmation selon vos objectifs.","es":"Entrenamiento a domicilio, sesiones privadas, coaching online y programación según tus objetivos."}',true),
('about','{"en":"ABOUT","fa":"درباره ما","fr":"À PROPOS","es":"SOBRE NOSOTROS"}',
'{"en":"Built around coaching quality, not complexity","fa":"کیفیت مربیگری، بدون پیچیدگی","fr":"La qualité du coaching, sans complexité","es":"Calidad de coaching, sin complejidad"}',
'{"en":"A client-first coaching platform designed to scale from founder-led training to a trusted multi-coach team.","fa":"یک پلتفرم مربیگری مشتری‌محور که از تمرین با بنیان‌گذار تا تیم چندمربی قابل توسعه است.","fr":"Une plateforme de coaching centrée sur le client, conçue pour évoluer vers une équipe de plusieurs coachs.","es":"Una plataforma centrada en el cliente, preparada para crecer a un equipo de varios entrenadores."}',true)
on conflict(slug) do nothing;

insert into public.services(slug,title,short_description,description,service_type,sort_order) values
('in-home-personal-training-toronto','{"en":"In-home personal training","fa":"پرسنال ترینینگ در منزل","fr":"Entraînement à domicile","es":"Entrenamiento a domicilio"}','{"en":"One-to-one coaching at your home or condo gym in Toronto.","fa":"تمرین خصوصی در منزل یا باشگاه کاندو در تورنتو.","fr":"Coaching individuel à domicile ou dans votre condo à Toronto.","es":"Coaching individual en casa o gimnasio de condominio en Toronto."}','{"en":"A coach comes to you for a structured session tailored to your goals, equipment, experience and schedule."}','personal_training',10),
('private-personal-training-toronto','{"en":"Private personal training","fa":"تمرین خصوصی","fr":"Entraînement privé","es":"Entrenamiento privado"}','{"en":"One-to-one training in a private setting with structured progression."}','{"en":"Private coaching focused on technique, progression, consistency and measurable results."}','personal_training',20),
('online-fitness-coaching','{"en":"Worldwide online coaching","fa":"کوچینگ آنلاین جهانی","fr":"Coaching en ligne mondial","es":"Coaching online mundial"}','{"en":"Personalized programming, check-ins and progress tracking from anywhere in the world.","fa":"برنامه شخصی و پیگیری از هر جای دنیا.","fr":"Programme personnalisé et suivi partout dans le monde.","es":"Programación personalizada y seguimiento desde cualquier país."}','{"en":"A worldwide remote coaching system with personalized workouts, accountability and ongoing adjustment."}','online_coaching',30),
('workout-programming','{"en":"Workout programming","fa":"برنامه تمرینی","fr":"Programmation d’entraînement","es":"Programación de entrenamiento"}','{"en":"Progressive training plans based on your goals, equipment and weekly schedule."}','{"en":"A clear progressive program that evolves with your performance and schedule."}','programming',40),
('nutrition-coaching','{"en":"Nutrition coaching","fa":"کوچینگ تغذیه","fr":"Coaching nutrition","es":"Coaching nutricional"}','{"en":"Practical meal structure, habits and accountability for fitness goals."}','{"en":"General fitness nutrition guidance designed to support training, consistency and body-composition goals."}','nutrition',50),
('personal-training-for-beginners-seniors','{"en":"Beginners & active aging","fa":"مبتدیان و سنین بالاتر","fr":"Débutants et vieillissement actif","es":"Principiantes y envejecimiento activo"}','{"en":"Approachable coaching for strength, mobility, confidence and consistency."}','{"en":"Progressive coaching adapted to current ability, experience and goals."}','personal_training',60)
on conflict(slug) do nothing;

insert into public.site_settings(key,value) values
('brand_name','"Toronto Performance Coaching"'::jsonb),
('service_areas','["Toronto","Selected GTA areas"]'::jsonb),
('online_coaching_worldwide','true'::jsonb),
('payments','{"stripe":true,"etransfer":true,"in_person":true}'::jsonb)
on conflict(key) do nothing;

-- IMPORTANT BOOTSTRAP STEP:
-- After you create your own account, run this ONCE with your real email:
-- update public.profiles set role='admin' where email='YOUR_EMAIL@example.com';

-- Harden sensitive mutations. Clients cannot promote themselves or directly forge booking status.
revoke update on public.profiles from authenticated;
grant update (full_name,phone,preferred_language,timezone,goals,training_location,emergency_contact,onboarding_complete,updated_at) on public.profiles to authenticated;
revoke insert on public.appointments from authenticated;

create or replace function public.admin_set_user_role(target_user uuid,new_role text)
returns void language plpgsql security definer set search_path=public as $$
begin
  if not public.is_admin() then raise exception 'admin required'; end if;
  if new_role not in ('client','trainer','admin') then raise exception 'invalid role'; end if;
  update public.profiles set role=new_role,updated_at=now() where id=target_user;
end $$;
revoke all on function public.admin_set_user_role(uuid,text) from public;
grant execute on function public.admin_set_user_role(uuid,text) to authenticated;

create or replace function public.request_appointment(
  p_starts_at timestamptz,
  p_duration_minutes integer,
  p_format text,
  p_location_notes text default null,
  p_client_timezone text default 'UTC'
) returns public.appointments
language plpgsql security definer set search_path=public as $$
declare created public.appointments;
begin
  if auth.uid() is null then raise exception 'authentication required'; end if;
  if p_duration_minutes not between 30 and 180 then raise exception 'invalid duration'; end if;
  if p_format not in ('in_home','private','online') then raise exception 'invalid format'; end if;
  if p_starts_at < now() then raise exception 'appointment must be in the future'; end if;
  insert into public.appointments(client_id,starts_at,duration_minutes,format,client_timezone,location_notes,status)
  values(auth.uid(),p_starts_at,p_duration_minutes,p_format,left(coalesce(p_client_timezone,'UTC'),80),left(coalesce(p_location_notes,''),500),'requested')
  returning * into created;
  return created;
end $$;
revoke all on function public.request_appointment(timestamptz,integer,text,text,text) from public;
grant execute on function public.request_appointment(timestamptz,integer,text,text,text) to authenticated;
