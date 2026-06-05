-- ================================================================
-- MIGRATION V2 — Espaces privés (PIN), journal partagé,
-- créations, dramas, humeurs
-- ----------------------------------------------------------------
-- À exécuter UNE fois dans Supabase → SQL Editor → New query
-- Idempotent (re-exécutable sans rien casser).
-- ================================================================

-- ── 1) "Nos mots à nous" — journal partagé Elle/Lui ──
create table if not exists mots (
  id         uuid default gen_random_uuid() primary key,
  auteur     text not null check (auteur in ('elle','lui')),
  texte      text not null,
  image      text,
  created_at timestamptz default now()
);

-- ── 2) "Ses créations" — galerie d'art personnelle ──
create table if not exists creations (
  id          uuid default gen_random_uuid() primary key,
  titre       text not null,
  description text,
  image       text,
  created_at  timestamptz default now()
);

-- ── 3) "Nos dramas" — liste collaborative ──
create table if not exists dramas (
  id          uuid default gen_random_uuid() primary key,
  titre       text not null,
  statut      text default 'a_voir' check (statut in ('a_voir','en_cours','fini')),
  note        integer check (note between 0 and 5),
  emoji       text default '🎬',
  commentaire text,
  created_at  timestamptz default now()
);

-- ── 4) "Ce soir je me sens…" — humeurs douces ──
create table if not exists humeurs (
  id         uuid default gen_random_uuid() primary key,
  emoji      text not null,
  label      text,
  note       text,
  created_at timestamptz default now()
);

-- ── 5) RLS + politiques (idempotentes) ──
alter table mots      enable row level security;
alter table creations enable row level security;
alter table dramas    enable row level security;
alter table humeurs   enable row level security;

do $$ declare t text;
begin
  foreach t in array array['mots','creations','dramas','humeurs']
  loop
    execute format('drop policy if exists "lecture publique"  on %I', t);
    execute format('drop policy if exists "ecriture publique" on %I', t);
    execute format('create policy "lecture publique"  on %I for select using (true)', t);
    execute format('create policy "ecriture publique" on %I for all    using (true) with check (true)', t);
  end loop;
end $$;

-- ✅ Terminé !
