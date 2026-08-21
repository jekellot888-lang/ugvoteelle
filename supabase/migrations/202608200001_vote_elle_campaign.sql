create extension if not exists "pgcrypto";

create table public.supporters (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  phone text not null,
  phone_normalized text not null unique,
  email text null,
  country text not null,
  district text null,
  age_range text null,
  marketing_consent boolean default false not null,
  terms_consent boolean not null,
  terms_version text not null,
  referral_code text unique not null,
  referred_by uuid null references public.supporters(id) on delete set null,
  source text null,
  campaign text null,
  medium text null,
  content text null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.vote_clicks (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid null references public.supporters(id) on delete set null,
  anonymous_session_id text,
  vote_package integer null,
  price_usd numeric null,
  referral_code text null,
  source text null,
  device_type text null,
  country text null,
  clicked_at timestamptz default now() not null
);

create table public.vote_self_attestations (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid null references public.supporters(id) on delete set null,
  anonymous_session_id text,
  declared_voted boolean default true not null,
  created_at timestamptz default now() not null
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.supporters(id) on delete cascade,
  referred_supporter_id uuid not null references public.supporters(id) on delete cascade,
  referral_code text not null,
  status text not null check (status in ('registered', 'qualified', 'rejected')),
  created_at timestamptz default now() not null,
  unique (referrer_id, referred_supporter_id)
);

create table public.prizes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text null,
  inventory integer null,
  daily_limit integer null,
  weight numeric default 0 not null,
  is_active boolean default false not null,
  starts_at timestamptz null,
  ends_at timestamptz null,
  created_at timestamptz default now() not null
);

create table public.spin_attempts (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete cascade,
  prize_id uuid null references public.prizes(id) on delete set null,
  result_type text not null check (result_type in ('instant_win', 'draw_entry', 'non_win', 'blocked')),
  created_at timestamptz default now() not null,
  ip_hash text null,
  user_agent_hash text null
);

create table public.prize_claims (
  id uuid primary key default gen_random_uuid(),
  spin_attempt_id uuid not null references public.spin_attempts(id) on delete cascade,
  supporter_id uuid not null references public.supporters(id) on delete cascade,
  prize_id uuid not null references public.prizes(id) on delete cascade,
  claim_status text not null check (claim_status in ('pending', 'contacted', 'verified', 'fulfilled', 'cancelled')),
  claim_code text unique not null,
  notes text null,
  claimed_at timestamptz null,
  fulfilled_at timestamptz null,
  created_at timestamptz default now() not null
);

create table public.donations (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.supporters(id) on delete cascade,
  prize_claim_id uuid not null references public.prize_claims(id) on delete cascade,
  donation_type text not null,
  status text not null,
  created_at timestamptz default now() not null
);

create index supporters_referral_code_idx on public.supporters(referral_code);
create index vote_clicks_clicked_at_idx on public.vote_clicks(clicked_at);
create index vote_clicks_source_idx on public.vote_clicks(source);
create index referrals_referrer_idx on public.referrals(referrer_id);

alter table public.supporters enable row level security;
alter table public.vote_clicks enable row level security;
alter table public.vote_self_attestations enable row level security;
alter table public.referrals enable row level security;
alter table public.prizes enable row level security;
alter table public.spin_attempts enable row level security;
alter table public.prize_claims enable row level security;
alter table public.donations enable row level security;

create policy "service role manages supporters" on public.supporters for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages vote clicks" on public.vote_clicks for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages self attestations" on public.vote_self_attestations for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages referrals" on public.referrals for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages prizes" on public.prizes for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages spins" on public.spin_attempts for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages claims" on public.prize_claims for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
create policy "service role manages donations" on public.donations for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
