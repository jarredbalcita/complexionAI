-- Enable necessary extensions (run once per project)
create extension if not exists "pgcrypto";  -- for gen_random_uuid()
create extension if not exists "uuid-ossp"; -- fallback if pgcrypto not available

-- 2. user_profiles table (final version)
create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  
  -- Link to Supabase Auth users table
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  
  display_name text,
  email text, -- denormalized copy of auth.users.email (optional but convenient)
  
  -- Core skincare data
  skin_type text check (skin_type in ('dry', 'oily', 'combination', 'normal', 'sensitive')),
  skin_tone text check (skin_tone in ('fair', 'light', 'medium', 'olive', 'tan', 'deep', 'very_deep')),
  main_concerns text[] default '{}',
  allergies text[] default '{}',
  
  -- Flexible preferences (you can query with @> operator later)
  preferences jsonb default '{}'::jsonb,
  
  -- Demographic (optional but useful for recommendations)
  age_range text check (age_range in ('under_18', '18-24', '25-34', '35-44', '45-54', '55+')),
  gender text check (gender in ('male', 'female', 'non_binary', 'prefer_not_to_say', 'other')),
  
  -- Patch testing history or last known safe ingredients
  patch_test_results jsonb default '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. Updated_at trigger (same as yours but safer)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Drop and recreate trigger cleanly
drop trigger if exists trg_user_profiles_updated_at on public.user_profiles;
create trigger trg_user_profiles_updated_at
  before update on public.user_profiles
  for each row
  execute function set_updated_at();

-- 4. Indexes – these will make your queries fly
create unique index if not exists idx_user_profiles_auth_user_id 
  on public.user_profiles(auth_user_id);

create index if not exists idx_user_profiles_skin_type 
  on public.user_profiles(skin_type) where skin_type is not null;

create index if not exists idx_user_profiles_concerns 
  on public.user_profiles using gin(main_concerns);

create index if not exists idx_user_profiles_allergies 
  on public.user_profiles using gin(allergies);

create index if not exists idx_user_profiles_preferences 
  on public.user_profiles using gin(preferences jsonb_path_ops);

-- 5. Row Level Security (CRITICAL for production!)
alter table public.user_profiles enable row level security;

-- Users can only see and modify their own profile
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = auth_user_id);

create policy "Users can insert their own profile"
  on public.user_profiles for insert
  with check (auth.uid() = auth_user_id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = auth_user_id)
  with check (auth.uid() = auth_user_id);

-- Optional: allow delete (usually not needed)
-- create policy "Users can delete their own profile" on public.user_profiles for delete using (auth.uid() = auth_user_id);