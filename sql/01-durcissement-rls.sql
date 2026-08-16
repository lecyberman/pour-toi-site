-- ============================================================
--  01 — DURCISSEMENT RLS
--  ✅ DÉJÀ APPLIQUÉ sur le projet jnqyjpgbmjclxbjxbnft.
--  Vérifié : plus aucune policy ALL ou DELETE ouverte au rôle public.
--  Ce fichier est la trace de ce qui a été exécuté.
-- ------------------------------------------------------------
--  PROBLÈME CORRIGÉ
--  17 tables portent une policy « ecriture publique » de type
--  FOR ALL ... USING (true) WITH CHECK (true).
--  « ALL » = SELECT + INSERT + UPDATE + DELETE. Comme la clé anon
--  est publiquement lisible dans db.js (c'est normal et voulu),
--  n'importe qui peut aujourd'hui envoyer :
--      DELETE /rest/v1/photos
--  et vider une table entière. Aujourd'hui ces tables sont quasi
--  vides, donc le risque est théorique. Il devient réel dès que
--  les photos et les souvenirs y sont.
--
--  CE QUE FAIT CETTE MIGRATION
--  Remplace chaque policy ALL par des droits explicites :
--    SELECT public  : oui (le site doit afficher le contenu)
--    INSERT public  : oui (elle doit pouvoir ajouter)
--    UPDATE public  : oui uniquement là où une page en a besoin
--    DELETE public  : NON, jamais. La suppression passe par une
--                     fonction protégée par secret (voir 03).
--
--  DÉPENDANCE (traitée)
--  admin.html supprimait ses lignes avec la clé anon (db.supprimer).
--  Après cette migration ces boutons échouaient. C'est réglé par 03 :
--  admin.html appelle maintenant admin_modifier / admin_supprimer,
--  protégées par le secret de admin_config. Toujours exécuter 01 et 03
--  ensemble.
--
--  Les tables sensibles (dadoucherie_journal, lettres_pour_mathieu,
--  gratitudes, dico, premiers, lettre_infinie…) sont DÉJÀ correctes :
--  elles n'ont que INSERT + SELECT, pas de DELETE. Rien à y faire.
--
--  Idempotent : réexécutable sans erreur.
-- ============================================================

begin;

do $$
declare
  t text;
  -- tables portant une policy ALL à remplacer
  tables_lecture text[] := array[
    'albums','album_photos','capsules','comprendre','creations','dessins',
    'dramas','emotions','etoiles','galerie','humeurs','mots','photos',
    'popup','souhaits','voyages','voyage_photos'
  ];
  -- sous-ensemble où une page a réellement besoin de modifier une ligne
  tables_update text[] := array['souhaits','capsules','mots','albums','photos','galerie'];
begin
  foreach t in array tables_lecture loop

    -- 1. retirer les policies trop larges (noms constatés en base)
    execute format('drop policy if exists %I on public.%I', 'ecriture publique', t);
    execute format('drop policy if exists %I on public.%I', 'ecriture dessins', t);
    execute format('drop policy if exists %I on public.%I', 'ecriture voyage_photos', t);

    -- 2. lecture publique explicite
    execute format('drop policy if exists %I on public.%I', 'lire ' || t, t);
    execute format('create policy %I on public.%I for select using (true)', 'lire ' || t, t);

    -- 3. insertion publique explicite
    execute format('drop policy if exists %I on public.%I', 'ajouter ' || t, t);
    execute format('create policy %I on public.%I for insert with check (true)', 'ajouter ' || t, t);

    -- 4. mise à jour seulement là où c'est nécessaire
    execute format('drop policy if exists %I on public.%I', 'modifier ' || t, t);
    if t = any(tables_update) then
      execute format('create policy %I on public.%I for update using (true) with check (true)', 'modifier ' || t, t);
    end if;

    -- 5. aucune policy DELETE créée : la suppression anonyme est bloquée
  end loop;
end $$;

commit;

-- ------------------------------------------------------------
--  VÉRIFICATION (doit renvoyer zéro ligne)
-- ------------------------------------------------------------
-- select tablename, policyname, cmd
--   from pg_policies
--  where schemaname = 'public'
--    and cmd in ('ALL','DELETE')
--    and 'public' = any(roles);
