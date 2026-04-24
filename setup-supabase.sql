-- ================================================================
-- SETUP SUPABASE — Notre espace à nous
-- ----------------------------------------------------------------
-- Colle ce script dans l'éditeur SQL de Supabase
-- (Supabase → SQL Editor → New query → colle tout → Run)
-- ================================================================

-- Galerie de la relation
create table if not exists galerie (
  id          uuid default gen_random_uuid() primary key,
  titre       text not null,
  texte       text,
  categorie   text default 'debut',
  emoji       text default '✦',
  image       text,
  created_at  timestamptz default now()
);

-- Section Comprendre
create table if not exists comprendre (
  id         uuid default gen_random_uuid() primary key,
  titre      text not null,
  texte      text,
  created_at timestamptz default now()
);

-- Étoiles de l'univers
create table if not exists etoiles (
  id         uuid default gen_random_uuid() primary key,
  label      text not null,
  message    text,
  emoji      text default '⭐',
  x          integer default 50,
  y          integer default 50,
  created_at timestamptz default now()
);

-- Voyages
create table if not exists voyages (
  id             uuid default gen_random_uuid() primary key,
  nom            text not null,
  pays           text,
  emoji          text default '✈️',
  annee          text,
  lat            float,
  lng            float,
  resume         text,
  moments_forts  jsonb default '[]',
  video          text,
  fait           boolean default true,
  created_at     timestamptz default now()
);

-- Albums
create table if not exists albums (
  id         uuid default gen_random_uuid() primary key,
  titre      text not null,
  lieu       text,
  date       text,
  emoji      text default '📷',
  couleur    text default '#c9a8d4',
  created_at timestamptz default now()
);

-- Photos dans les albums
create table if not exists album_photos (
  id          uuid default gen_random_uuid() primary key,
  album_id    uuid references albums(id) on delete cascade,
  theme       text default 'Général',
  theme_emoji text default '📷',
  src         text,
  legende     text,
  created_at  timestamptz default now()
);

-- Photos "Nous deux"
create table if not exists photos (
  id         uuid default gen_random_uuid() primary key,
  legende    text,
  date       text,
  emoji      text default '📷',
  image      text,
  hero       boolean default false,
  created_at timestamptz default now()
);

-- Capsules temporelles
create table if not exists capsules (
  id             uuid default gen_random_uuid() primary key,
  titre          text not null,
  emoji          text default '💌',
  date_ouverture date not null,
  contenu        jsonb default '[]',
  created_at     timestamptz default now()
);

-- Traducteur émotionnel
create table if not exists emotions (
  id         uuid default gen_random_uuid() primary key,
  slug       text not null unique,
  label      text not null,
  message    text,
  mini       jsonb default '[]',
  created_at timestamptz default now()
);

-- Pop-up d'accueil
create table if not exists popup (
  id          uuid default gen_random_uuid() primary key,
  titre       text,
  signature   text,
  paragraphes jsonb default '[]',
  created_at  timestamptz default now()
);

-- Souhaits de voyages
create table if not exists souhaits (
  id         uuid default gen_random_uuid() primary key,
  nom        text not null,
  emoji      text default '✈️',
  note       text,
  fait       boolean default false,
  created_at timestamptz default now()
);

-- ================================================================
-- BUCKET STORAGE pour les images
-- (à créer manuellement dans Supabase → Storage)
-- Nom du bucket : "images"
-- Accès : Public
-- ================================================================

-- ================================================================
-- POLITIQUES RLS (Row Level Security)
-- Permet la lecture publique + écriture depuis le site
-- ================================================================
alter table galerie     enable row level security;
alter table comprendre  enable row level security;
alter table etoiles     enable row level security;
alter table voyages     enable row level security;
alter table albums      enable row level security;
alter table album_photos enable row level security;
alter table photos      enable row level security;
alter table capsules    enable row level security;
alter table emotions    enable row level security;
alter table popup       enable row level security;
alter table souhaits    enable row level security;

-- Lecture publique pour toutes les tables
do $$ declare t text;
begin
  foreach t in array array['galerie','comprendre','etoiles','voyages','albums','album_photos','photos','capsules','emotions','popup','souhaits']
  loop
    execute format('create policy "lecture publique" on %I for select using (true)', t);
    execute format('create policy "ecriture publique" on %I for all using (true) with check (true)', t);
  end loop;
end $$;

-- ================================================================
-- DONNÉES PAR DÉFAUT — Pop-up
-- ================================================================
insert into popup (titre, signature, paragraphes) values (
  'Ce site est né parce que je t''aime.',
  '— avec tout mon amour',
  '[
    {"texte": "Je l''ai créé pour notre anniversaire. Mais surtout parce que je voulais qu''il existe quelque chose de permanent — un endroit où nos moments ne disparaissent pas."},
    {"separateur": true},
    {"texte": "Ici, tu trouveras nos souvenirs, nos voyages, nos petits riens. Des choses que j''ai voulu garder, et te montrer."},
    {"texte": "Tu peux explorer à ton rythme. Il n''y a rien à faire, rien à comprendre vite. Juste toi, moi, et ce qu''on a construit.", "accent": true},
    {"separateur": true},
    {"texte": "Ce site est aussi pour toi, dans tes moments difficiles. Pour te rappeler qu''il y a un endroit doux, qui t''attend."}
  ]'
);

-- ================================================================
-- ✅ C'est tout !
-- Retourne sur le site et tout sera connecté.
-- ================================================================
