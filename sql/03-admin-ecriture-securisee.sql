-- ============================================================
--  03 — ÉCRITURE ADMIN PROTÉGÉE PAR SECRET
--  ✅ DÉJÀ APPLIQUÉ sur le projet jnqyjpgbmjclxbjxbnft.
--  Ce fichier est la trace de ce qui a été exécuté.
-- ------------------------------------------------------------
--  POURQUOI
--  Depuis 01, le rôle anon n'a plus aucune policy DELETE, et
--  UPDATE n'est ouvert que sur les tables où une page publique
--  en a besoin. Il fallait donc un chemin d'écriture pour toi.
--
--  Avant, admin.html comparait un PIN "5922" écrit en clair dans
--  le HTML, puis écrivait avec la clé anon. Le PIN ne protégeait
--  rien : toute la sécurité venait de la RLS, qui était ouverte.
--  Maintenant, le code saisi EST le secret qui ouvre ces
--  fonctions. Un mauvais code n'écrit rien.
--
--  Le secret vit dans admin_config, jamais dans le code.
--  Pour le changer :
--      update public.admin_config set secret = 'nouveau-code';
--
--  NOTE SUR L'ADVISOR SUPABASE
--  Le linter signale ces fonctions comme "SECURITY DEFINER
--  exécutable par anon". C'est voulu et c'est le même schéma que
--  get_inbox : le site est statique, il n'y a pas de session
--  authentifiée, donc l'appel part forcément du rôle anon et la
--  porte est le secret. Sans SECURITY DEFINER, la fonction serait
--  soumise à la RLS et ne pourrait rien supprimer.
--
--  Idempotent : réexécutable sans erreur.
-- ============================================================

-- Liste blanche partagée par les deux fonctions admin.
create or replace function public.admin_tables_autorisees()
returns text[] language sql immutable as $$
  select array[
    'albums','album_photos','capsules','comprendre','creations','dessins',
    'dramas','emotions','etoiles','galerie','humeurs','mots','photos',
    'popup','souhaits','souvenirs','voyages','voyage_photos',
    'site_requests','site_ideas'
  ];
$$;

-- Vérifie le secret admin (le même que get_inbox).
create or replace function public.admin_verifier(p_secret text)
returns boolean language sql security definer set search_path = public as $$
  select exists (select 1 from public.admin_config where secret = p_secret);
$$;

-- ------------------------------------------------------------
-- Mise à jour d'une ligne.
-- Le nom de table est validé contre la liste blanche, et chaque
-- colonne est vérifiée contre le catalogue avant d'être écrite,
-- puis échappée avec %I. Une clé inconnue dans le JSON est
-- ignorée, elle ne peut pas devenir du SQL.
-- ------------------------------------------------------------
create or replace function public.admin_modifier(
  p_secret text, p_table text, p_id text, p_data jsonb
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  set_clause text;
  nb int;
begin
  if not public.admin_verifier(p_secret) then
    return jsonb_build_object('ok', false, 'erreur', 'secret');
  end if;
  if not (p_table = any(public.admin_tables_autorisees())) then
    return jsonb_build_object('ok', false, 'erreur', 'table');
  end if;

  select string_agg(format('%I = ($1->>%L)::%s', c.column_name, c.column_name, c.udt_name), ', ')
    into set_clause
    from information_schema.columns c
   where c.table_schema = 'public'
     and c.table_name = p_table
     and c.column_name <> 'id'
     and c.column_name = any (select jsonb_object_keys(p_data));

  if set_clause is null then
    return jsonb_build_object('ok', false, 'erreur', 'aucune colonne valide');
  end if;

  execute format('update public.%I set %s where id::text = $2', p_table, set_clause)
    using p_data, p_id;
  get diagnostics nb = row_count;
  return jsonb_build_object('ok', true, 'lignes', nb);
end $$;

-- ------------------------------------------------------------
-- Suppression d'une ligne. Seul chemin de suppression du site.
-- ------------------------------------------------------------
create or replace function public.admin_supprimer(
  p_secret text, p_table text, p_id text
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare nb int;
begin
  if not public.admin_verifier(p_secret) then
    return jsonb_build_object('ok', false, 'erreur', 'secret');
  end if;
  if not (p_table = any(public.admin_tables_autorisees())) then
    return jsonb_build_object('ok', false, 'erreur', 'table');
  end if;

  execute format('delete from public.%I where id::text = $1', p_table) using p_id;
  get diagnostics nb = row_count;
  return jsonb_build_object('ok', true, 'lignes', nb);
end $$;

-- admin_verifier ne doit pas être appelable seule depuis le navigateur :
-- elle répondrait oui/non à un test de secret, donc permettrait de le deviner
-- par force brute. Elle reste utilisable à l'intérieur des deux fonctions.
revoke execute on function public.admin_verifier(text) from anon, authenticated;

-- ------------------------------------------------------------
--  L'écran de connexion de admin.html teste le code ainsi :
--    select public.admin_supprimer('<code>', '__sonde__', '0');
--  réponse {"erreur":"secret"} = mauvais code
--  réponse {"erreur":"table"}  = bon code
--  Aucune donnée lue, aucune ligne touchée.
-- ------------------------------------------------------------
