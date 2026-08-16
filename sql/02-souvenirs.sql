-- ============================================================
--  02 — TABLE SOUVENIRS (le carnet vivant)
--  ✅ DÉJÀ APPLIQUÉ sur le projet jnqyjpgbmjclxbjxbnft.
--  Ce fichier est la trace de ce qui a été exécuté.
-- ------------------------------------------------------------
--  Le brief parlait de « memories ». Le reste du schéma est en
--  français (mots, souhaits, humeurs, dico, premiers), donc on
--  reste cohérent : la table s'appelle « souvenirs ».
--
--  Elle est distincte de « photos » / « galerie » :
--    photos    = une image et sa légende
--    souvenirs = un moment (date, lieu, ressenti), avec ou sans image
--
--  Idempotent : réexécutable sans erreur.
-- ============================================================

create table if not exists public.souvenirs (
  id           uuid primary key default gen_random_uuid(),
  titre        text not null,
  date_texte   text,            -- « un mardi de novembre » compte autant qu'une date exacte
  date_reelle  date,            -- pour le tri chronologique quand elle est connue
  lieu         text,
  description  text,
  image        text,            -- URL (Supabase Storage ou externe)
  emotion      text,            -- douceur, rire, vertige, calme, fierté, manque…
  importance   int default 2 check (importance between 1 and 3),
  categorie    text,            -- premiere-fois, voyage, quotidien, nuit, fete…
  message_cache text,           -- ce qu'on ne découvre qu'en ouvrant le souvenir
  created_at   timestamptz default now()
);

comment on table public.souvenirs is 'Carnet vivant : les moments, pas seulement les images.';

-- Tri chronologique rapide
create index if not exists souvenirs_date_idx on public.souvenirs (date_reelle desc nulls last, created_at desc);

alter table public.souvenirs enable row level security;

-- Lecture et ajout publics, aucune suppression anonyme (cf. 01)
drop policy if exists "lire souvenirs" on public.souvenirs;
create policy "lire souvenirs" on public.souvenirs for select using (true);

drop policy if exists "ajouter souvenirs" on public.souvenirs;
create policy "ajouter souvenirs" on public.souvenirs for insert with check (true);

drop policy if exists "modifier souvenirs" on public.souvenirs;
create policy "modifier souvenirs" on public.souvenirs for update using (true) with check (true);
