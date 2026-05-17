-- ================================================================
-- MIGRATION — Ajout des tables manquantes
-- ----------------------------------------------------------------
-- À exécuter UNE fois dans Supabase → SQL Editor → New query
-- Ne touche à rien d'existant. Idempotent (re-exécutable sans casser).
-- ================================================================

-- ── 1) Table voyage_photos (photos liées à un voyage) ──
create table if not exists voyage_photos (
  id         uuid default gen_random_uuid() primary key,
  voyage_id  uuid references voyages(id) on delete cascade,
  src        text,
  legende    text,
  created_at timestamptz default now()
);

-- ── 2) Table dessins (dessins & œuvres sauvegardés) ──
create table if not exists dessins (
  id         uuid default gen_random_uuid() primary key,
  image_url  text not null,
  message    text,
  type       text default 'dessin',
  created_at timestamptz default now()
);

-- ── 3) RLS + policies pour ces deux nouvelles tables ──
alter table voyage_photos enable row level security;
alter table dessins       enable row level security;

drop policy if exists "lecture publique"  on voyage_photos;
drop policy if exists "ecriture publique" on voyage_photos;
create policy "lecture publique"  on voyage_photos for select using (true);
create policy "ecriture publique" on voyage_photos for all    using (true) with check (true);

drop policy if exists "lecture publique"  on dessins;
drop policy if exists "ecriture publique" on dessins;
create policy "lecture publique"  on dessins for select using (true);
create policy "ecriture publique" on dessins for all    using (true) with check (true);

-- ✅ Terminé !
