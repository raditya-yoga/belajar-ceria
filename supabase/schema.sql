-- =====================================================================
-- Belajar Ceria — skema database Supabase
-- Jalankan seluruh file ini di Supabase Dashboard → SQL Editor → Run.
-- Aman dijalankan ulang (idempotent).
-- =====================================================================

-- ---------------------------------------------------------------------
-- A. Tabel profiles: data akun + status premium
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

comment on column public.profiles.is_premium is
  'Hanya boleh diubah oleh Edge Function confirm-payment (service role). Klien tidak diberi hak UPDATE kolom ini.';

-- ---------------------------------------------------------------------
-- B. Tabel transactions: satu baris per QRIS yang dibuat
-- ---------------------------------------------------------------------
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  user_id uuid not null references public.profiles (id) on delete cascade,
  amount integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'expired')),
  created_at timestamptz not null default now()
);

create index if not exists transactions_user_id_created_at_idx
  on public.transactions (user_id, created_at desc);

-- ---------------------------------------------------------------------
-- C. Trigger: buat baris profiles otomatis setiap user baru mendaftar
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- D. Row Level Security
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.transactions enable row level security;

-- profiles: user hanya boleh MELIHAT barisnya sendiri.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- profiles: user boleh mengubah barisnya sendiri (nama panggilan), TIDAK is_premium.
-- Pembatasan kolom dilakukan lewat GRANT kolom di bawah, bukan lewat policy,
-- karena policy tidak bisa membandingkan nilai lama dan nilai baru.
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;

-- transactions: user hanya boleh MELIHAT transaksinya sendiri.
-- Tidak ada policy INSERT/UPDATE: pembuatan & pembaruan transaksi hanya
-- lewat Edge Function yang memakai SERVICE ROLE KEY.
drop policy if exists "transactions_select_own" on public.transactions;
create policy "transactions_select_own"
  on public.transactions for select
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- E. Aktifkan Realtime pada tabel profiles
--    (agar gembok materi di laptop terbuka tepat saat HP menekan tombol bayar)
-- ---------------------------------------------------------------------
alter table public.profiles replica identity full;

do $$
begin
  alter publication supabase_realtime add table public.profiles;
exception
  when duplicate_object then null; -- sudah terdaftar, abaikan
end;
$$;
