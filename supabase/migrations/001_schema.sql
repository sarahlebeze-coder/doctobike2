-- DOCTOBIKE — Schéma Supabase
-- Coller dans SQL Editor > Run

create table public.availabilities (
  id          uuid primary key default gen_random_uuid(),
  date        date not null,
  start_time  time not null,
  duration    int  not null default 45,
  is_active   boolean not null default true,
  created_at  timestamptz default now(),
  unique(date, start_time)
);

create table public.bookings (
  id                    uuid primary key default gen_random_uuid(),
  availability_id       uuid references public.availabilities(id) on delete cascade,
  client_name           text not null,
  client_email          text not null,
  problem_description   text,
  status                text not null default 'confirmed'
                          check (status in ('confirmed','cancelled','completed')),
  stripe_payment_intent text unique,
  stripe_status         text default 'authorized'
                          check (stripe_status in ('authorized','captured','refunded')),
  amount_cents          int not null default 4500,
  google_event_id       text,
  meet_link             text,
  created_at            timestamptz default now()
);

create table public.settings (
  key    text primary key,
  value  text not null
);

insert into public.settings (key, value) values
  ('price_cents', '4500'),
  ('session_duration', '45'),
  ('booking_active', 'true'),
  ('repairer_email', 'reparateur@doctobike.fr'),
  ('repairer_name', 'Antoine');

alter table public.availabilities enable row level security;
alter table public.bookings enable row level security;
alter table public.settings enable row level security;

create policy "availabilities_public_read" on public.availabilities
  for select using (true);
create policy "availabilities_admin_write" on public.availabilities
  for all using (auth.role() = 'service_role');
create policy "bookings_admin_read" on public.bookings
  for select using (auth.role() = 'service_role');
create policy "bookings_public_insert" on public.bookings
  for insert with check (true);
create policy "settings_public_read" on public.settings
  for select using (true);
create policy "settings_admin_write" on public.settings
  for all using (auth.role() = 'service_role');

create or replace function public.book_slot(p_availability_id uuid)
returns void as $$
begin
  update public.availabilities set is_active = false where id = p_availability_id;
end;
$$ language plpgsql security definer;
