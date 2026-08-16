# Supabase et RLS, Pour toi

Projet : `jnqyjpgbmjclxbjxbnft` (eu-west-1, Postgres 17). 40 tables, RLS activée partout.

---

## 1. Le principe, en une phrase

La clé anon est publiquement lisible dans `db.js`, et **c'est normal** : elle est faite pour ça. La sécurité ne vient pas de cacher la clé, elle vient **entièrement de la RLS**. Donc toute table sans policy correcte est une table ouverte à tout le monde.

---

## 2. Les trois niveaux

### Niveau 1, les tables privées : elle écrit, personne ne lit

`site_requests`, `site_ideas`, `wellbeing_checkins`.

INSERT public, et **aucune policy SELECT**. Ce qu'elle dépose là est illisible depuis un navigateur, même avec la clé anon. C'est ce qui rend le bien-être et les demandes réellement intimes.

La lecture passe par `get_inbox(p_secret)`, en `SECURITY DEFINER`, protégée par le secret de `admin_config`. C'est `/recu` qui l'utilise.

### Niveau 2, les tables de contenu : lecture et ajout publics, aucune suppression

`albums`, `album_photos`, `capsules`, `comprendre`, `creations`, `dessins`, `dramas`, `emotions`, `etoiles`, `galerie`, `humeurs`, `mots`, `photos`, `popup`, `souhaits`, `souvenirs`, `voyages`, `voyage_photos`.

SELECT public, INSERT public, UPDATE seulement là où une page en a besoin, **DELETE nulle part**.

> **Ce qui a été corrigé.** Ces 17 tables portaient une policy `FOR ALL ... USING (true)`. `ALL` inclut `DELETE`. N'importe qui pouvait envoyer `DELETE /rest/v1/photos` et vider une table. Elles étaient quasi vides au moment de la correction, donc rien n'a été perdu, mais le risque devenait réel dès que tu y mets les photos. Voir `sql/01-durcissement-rls.sql`.

### Niveau 3, les tables déjà correctes

`dadoucherie_journal` (186 lignes), `lettres_pour_mathieu`, `gratitudes`, `dico`, `premiers`, `qui_de_nous`, `lettre_infinie`, `qds`, `quiz_resultats`, `tresor`, `chansons`, `compteurs`, `arbitre`, `histoire_versions`, `mot_du_jour`, `messages_jour`, `lettres`.

Elles n'avaient que INSERT et SELECT, jamais DELETE. Rien à y faire.

---

## 3. L'écriture admin

Depuis le durcissement, le rôle anon ne peut plus rien supprimer. Ton chemin passe par deux fonctions `SECURITY DEFINER` (voir `sql/03-admin-ecriture-securisee.sql`) :

```sql
select public.admin_modifier('<secret>', 'photos', '<id>', '{"legende":"..."}'::jsonb);
select public.admin_supprimer('<secret>', 'photos', '<id>');
```

Protections en place :
- Le nom de table est validé contre une liste blanche.
- Chaque colonne est vérifiée contre le catalogue Postgres avant écriture, puis échappée avec `%I`. Une clé inconnue dans le JSON est ignorée, elle ne peut pas devenir du SQL.
- `admin_verifier` est révoquée pour `anon` et `authenticated` : sinon elle répondrait oui/non à un test de secret, ce qui permettrait de le deviner par force brute.

`admin.html` redéfinit `db.modifier` et `db.supprimer` pour passer par là. Le PIN que tu tapes **est** le secret, il n'est plus écrit dans le HTML.

### Attention, il existe un second PIN, qui n'en est pas un

`script.js` contient encore `const PIN_SECRET = "5922"`. **Ce n'est pas le secret admin** et ce n'est pas une sécurité. C'est un rideau, sur le site public, pour deux usages :

- un raccourci vers `/admin`, qui redemande ensuite le vrai secret vérifié côté Supabase, donc ce code ne donne accès à rien ;
- l'entrée du journal « nos mots », qui est une mise en scène. La table `mots` a une lecture publique de toute façon, ce code n'empêche personne de la lire via l'API.

Il est laissé volontairement : le changer par une vérification serveur obligerait à saisir le secret admin pour lire son propre journal. Mais ne compte jamais dessus pour protéger quelque chose de sensible.

### Changer le secret

```sql
update public.admin_config set secret = 'quelque-chose-de-plus-long';
```

Rien à changer dans le code, rien à redéployer. Quatre chiffres se devinent en 10 000 essais, prends plus long.

---

## 4. L'avertissement du linter Supabase

Le linter signale `get_inbox`, `add_photo`, `admin_modifier` et `admin_supprimer` comme « SECURITY DEFINER exécutable par anon ».

**C'est voulu.** Le site est statique, il n'y a pas de session authentifiée, donc l'appel part forcément du rôle anon et la porte est le secret. Sans `SECURITY DEFINER`, la fonction serait soumise à la RLS et ne pourrait rien lire ni supprimer.

Si un jour tu passes à Supabase Auth, ces fonctions pourront devenir `SECURITY INVOKER` et l'avertissement disparaîtra.

---

## 5. Ajouter une table

Ne jamais mettre une table en ligne sans RLS. Le gabarit :

```sql
create table if not exists public.ma_table (
  id uuid primary key default gen_random_uuid(),
  -- tes colonnes
  created_at timestamptz default now()
);

alter table public.ma_table enable row level security;

-- contenu visible sur le site
create policy "lire ma_table"    on public.ma_table for select using (true);
create policy "ajouter ma_table" on public.ma_table for insert with check (true);

-- seulement si une page doit modifier une ligne existante
-- create policy "modifier ma_table" on public.ma_table for update using (true) with check (true);

-- PAS de policy delete : la suppression passe par admin_supprimer
```

Pour du contenu **privé** (comme le bien-être), garder INSERT et **ne pas créer de policy SELECT**, puis étendre `get_inbox`.

Penser à ajouter le nom dans `admin_tables_autorisees()` si tu veux pouvoir l'administrer.

---

## 6. Vérifier que rien n'est ouvert

À relancer après toute modification de schéma. Doit renvoyer zéro ligne :

```sql
select tablename, policyname, cmd
  from pg_policies
 where schemaname = 'public'
   and cmd in ('ALL', 'DELETE')
   and 'public' = any(roles);
```

---

## 7. Correspondance avec les noms du brief

Le schéma est en français, on ne renomme rien.

| Brief | Réel |
|---|---|
| `memories` | `souvenirs` |
| `gallery_items` | `photos`, `galerie`, `albums` |
| `love_messages` | `mots`, `dico`, `lettres` |
| `wishes` | `souhaits` |
| `emotions` | `emotions`, `humeurs` |
| `wellbeing_checkins` | identique |
| `site_requests` | identique |
| `site_ideas` | identique |
| `admin_notes` | pas créée, `admin_config` suffit aujourd'hui |
