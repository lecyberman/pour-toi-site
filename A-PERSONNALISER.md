# Ce qu'il te reste à remplir

Tout le technique est fait. Les pages sont construites, testées, et elles attendent ton contenu. Rien ne casse si tu ne remplis rien : chaque page a un état vide écrit avec soin, qui ne ressemble pas à une erreur.

Ordre conseillé : commence par les souvenirs, c'est ce qui change le plus la page.

---

## 1. Les souvenirs (le plus important)

Table Supabase : **`souvenirs`**. Page : `/souvenirs`.

Une ligne = un moment. Tu peux tout remplir ou presque rien, la page s'adapte.

| Colonne | À quoi ça sert | Obligatoire |
|---|---|---|
| `titre` | Le nom du moment | **oui** |
| `date_texte` | « un mardi de novembre », « le soir où il pleuvait ». Une date floue vaut mieux qu'une date fausse | non |
| `date_reelle` | Format `2024-11-12`. Sert au tri et au titre d'année | non |
| `lieu` | Paris, Lyon, chez toi | non |
| `description` | Le texte du souvenir. C'est là que tu écris | non |
| `image` | URL d'une photo | non |
| `emotion` | Un mot. Devient un filtre automatiquement | non |
| `categorie` | Un mot. Devient un filtre automatiquement | non |
| `importance` | 1, 2 ou 3. Un 3 s'affiche en plus grand | non |
| `message_cache` | Le petit mot qu'elle ne voit qu'en cliquant « il y a autre chose » | non |

Les filtres apparaissent tout seuls dès que tu as au moins deux émotions ou deux catégories différentes. Tu n'as rien à configurer.

Exemple, à adapter :

```sql
insert into public.souvenirs
  (titre, date_texte, date_reelle, lieu, description, emotion, categorie, importance, message_cache)
values
  ('...', 'un mardi de novembre', '2024-11-12', '...', '...', 'douceur', 'quotidien', 2, '...');
```

---

## 2. Les photos

Table **`photos`**. Page : `/galerie`.

`image` (l'URL), `legende`, `date`. La table `galerie` marche aussi, avec `image`, `titre`, `texte`.

Pour héberger les images : Supabase Storage, ou n'importe quelle URL publique. Les quatre premières se chargent immédiatement, les suivantes à l'approche du doigt, donc tu peux en mettre beaucoup sans ralentir la page.

Tu peux aussi passer par `/admin`, qui a un formulaire d'upload.

---

## 3. Le prénom dans le bien-être ✅ réglé

C'est bien **Mathieu**. « Andile » était un artefact de gabarit dans le brief.

Rien à changer : le mot n'apparaissait nulle part dans le code. `/toi` dit « Je veux qu'il le sache » et signe « quoi qu'il se passe, tu es aimée. Ton Mathieu. » C'était déjà juste.

---

## 4. L'univers

Les huit jalons sont écrits en dur dans `univers.html`, tableau `C` vers la ligne 97. Ils sont déjà personnalisés (Snap, Lyon, le 15 juillet, Monaco, Malte, Barcelone, le oui, la suite). Relis-les, ils datent d'une session précédente.

---

## 5. Le secret admin

Quatre chiffres, ça se devine. Pour le rallonger :

```sql
update public.admin_config set secret = 'quelque-chose-de-plus-long';
```

Rien à changer dans le code, ni à redéployer.

---

## 6. Les autres pages qui attendent du contenu

| Page | Table | État |
|---|---|---|
| `/souhaits` | `souhaits` | 1 ligne |
| `/mots` | `dico` | 3 lignes |
| `/capsules` | `capsules`, `lettres` | vide |
| `/reves` | `voyages` | vide |
| `/dramas` | `dramas` | vide |
| `/creations` | `creations` | vide |

Aucune ne plante à vide.

---

## Une remarque

Ne remplis pas tout d'un coup. Un carnet qui se remplit lentement, où elle trouve une chose nouvelle de temps en temps, vaut mieux qu'un carnet livré complet le premier jour. Le site est fait pour qu'on y revienne.
