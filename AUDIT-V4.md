# Pour toi, audit V4 : diagnostic réel, plan de transformation, étapes

*Vérifié directement sur le dépôt local et sur la base Supabase `jnqyjpgbmjclxbjxbnft` (lecture des policies, des tables et des advisors), pas sur mémoire.*

---

## 1. Audit, état réel

**Nature technique**
- Site **statique HTML pur**. Aucun `package.json`, aucun build, ni Vite ni Next. 26 pages `.html` autonomes, 11 400 lignes de HTML au total.
- **Supabase** `jnqyjpgbmjclxbjxbnft` (eu-west-1, Postgres 17, actif). 39 tables, RLS activée partout.
- **Deux clients Supabase coexistent, et les deux servent** :
  - `db.js` (moderne, `DB.select/insert/update/count`), utilisé par 8 pages.
  - `supabase.js` (ancien, `db.lire/inserer/modifier/supprimer/uploadImage`), utilisé par `script.js` (31 appels) et `admin.html` (32 appels).
  → Le plan V3 disait que `supabase.js` était mort. **C'est faux.** Le retirer casserait l'accueil et l'admin.
- `api/inbox.js` existe, est correct, et n'est **pas commité** (dossier `api/` non suivi). La réception `/recu` passe en réalité par la fonction Postgres `get_inbox(p_secret)`.
- **Vercel** : `vercel.json` avec 26 rewrites et en-têtes de cache. Déploiement auto depuis `main`.
- **PWA** : `manifest.json`, `sw.js` (réseau d'abord pour le HTML, cache d'abord pour les médias), installable.

**Trois familles visuelles cohabitent**
| Famille | Pages |
|---|---|
| `theme.css` (design system, violet, clair/sombre) | index, toi, souhaits, mots, galerie, capsules, creations, dramas, humeurs, recu |
| `style.css` (ancien) | admin, jeux, notre-histoire (+ index et recu en mixte) |
| CSS propre à la page | pour-dadoucherie, courrier, nuit, ocean, jardin, feu, reves, portrait, livre, avent, au-cas-ou, demande, univers |

---

## 2. Diagnostic

### Ce qui est déjà réussi, à ne pas toucher
- **L'accueil est vraiment bon.** Ciel canvas qui suit l'heure, voile de lisibilité, bouton qui respire, sortie en fondu, repli propre en `prefers-reduced-motion`. C'est la partie la plus aboutie du site.
- **`/univers`** : voie lactée pré-rendue sur canvas séparé (bon réflexe de perf), profondeurs multiples, comète, lune, parallaxe, et une liste de boutons focusables hors écran pour l'accès clavier. Rare et bien vu.
- **Le modèle de vie privée est juste** : `site_requests`, `site_ideas`, `wellbeing_checkins` ont INSERT public et **aucune policy SELECT**. Ce qu'elle dépose est illisible depuis le navigateur, même avec la clé anon. La lecture passe par `get_inbox(p_secret)` en SECURITY DEFINER. C'est la bonne architecture.
- `app.js` avec `App.submit()` qui gère déjà loading, succès, erreur et anti double-envoi.
- Le ton des textes existants est sincère et personnel, pas générique.

### Problèmes réels trouvés

**1. RLS trop permissive sur 17 tables. C'est le vrai point technique du projet.**
Ces tables portent une policy `FOR ALL ... USING (true)` : `albums`, `album_photos`, `capsules`, `comprendre`, `creations`, `dessins`, `dramas`, `emotions`, `etoiles`, `galerie`, `humeurs`, `mots`, `photos`, `popup`, `souhaits`, `voyages`, `voyage_photos`.

`ALL` inclut `DELETE`. La clé anon est publiquement lisible dans `db.js` (c'est normal, elle est faite pour ça), donc aujourd'hui n'importe qui peut envoyer `DELETE /rest/v1/photos` et vider une table.

Nuance importante : **ces tables sont quasi vides** (albums 1, souhaits 1, humeurs 2, tout le reste 0). Le risque est donc théorique aujourd'hui. Il devient réel dès que tu y mets les photos et les souvenirs. À corriger **avant** de remplir, pas après.

Bonne nouvelle : les tables qui contiennent vraiment quelque chose sont **déjà protégées**. `dadoucherie_journal` (186 lignes), `lettres_pour_mathieu`, `gratitudes`, `dico`, `premiers`, `qui_de_nous`, `lettre_infinie` n'ont que INSERT et SELECT, pas de DELETE.

**2. Le PIN admin `5922` est en clair dans `admin.html`, et il ne protège rien.**
Ce n'est pas le PIN le problème, c'est qu'il est purement décoratif : la page écrit et supprime avec la clé anon, donc la sécurité réelle vient à 100 % de la RLS. Le PIN empêche juste un regard par-dessus l'épaule.
Conséquence à connaître : durcir la RLS (point 1) **cassera les boutons de suppression de `admin.html`**. Les deux chantiers sont liés, ils doivent être séquencés ensemble.

**3. Un clone du dépôt dans le dépôt.**
`pour-toi-site/pour-toi-site/` est une copie complète du projet, au même commit, identique au caractère de fin de ligne près. Non suivi par git. C'est un piège à erreurs : une modification faite dans le mauvais dossier est silencieusement perdue.

**4. `_redirects` est un fichier Netlify, mort sur Vercel, et désynchronisé.**
Il liste 15 routes, `vercel.json` en liste 26. Le premier n'a aucun effet, le second est la vraie source. Garder les deux garantit qu'un jour on éditera le mauvais.

**5. `manifest.json` n'utilisait pas les icônes PNG.** `icon-192.png` et `icon-512.png` existent sur le disque mais le manifeste ne référençait que le SVG, que plusieurs Android ignorent pour l'écran d'accueil.

**6. Bug visuel discret dans le design system.** Les ombres des boutons de `theme.css` étaient codées en dur en `rgba(222,126,107,…)`, un corail orangé hérité de l'ancienne palette, alors que les boutons sont violets depuis. Chaque bouton projetait une ombre d'une autre couleur que lui.

**7. `theme.css` commençait par `/* PASTE_TEST_123 */`**, un artefact de test resté en production.

**8. Points d'immersion secondaires**
- La galerie n'a ni navigation clavier dans le plein écran, ni passage d'une photo à l'autre, ni fermeture par Échap.
- L'univers étale 8 étoiles de x=0,22 à x=0,90 avec leurs labels. Sur un écran de téléphone, ça se chevauche.
- 26 pages dont plusieurs orphelines, non liées depuis le hub : `ocean`, `jardin`, `feu`, `portrait`, `livre`, `avent`, `au-cas-ou`, `courrier`, `demande`, `admin`.
- Le hub aligne 17 cartes à plat, sans hiérarchie. Elle doit tout lire pour choisir.

### Risques Vercel à ne pas réintroduire
- Ne pas remettre `cleanUrls` dans `vercel.json`, ça avait cassé les rewrites (404).
- Ne rien déployer sur Netlify, abandonné.
- Toute nouvelle table doit avoir sa RLS avant la mise en ligne.

---

## 3. Architecture retenue (Vercel + Supabase)

**Garder le statique HTML.** Zéro build, chargement instantané, aucune dépendance à mettre à jour. Migrer vers un framework coûterait des semaines pour un gain nul ici. Ce n'est pas un compromis, c'est le bon choix pour ce projet.

Conséquence directe sur les variables d'environnement : **le navigateur ne lit aucune variable d'environnement**. Les préfixes `VITE_` et `NEXT_PUBLIC_` du brief ne s'appliquent pas. La répartition réelle est :

| Où | Quoi | Pourquoi c'est sûr |
|---|---|---|
| `db.js`, en clair | URL Supabase + clé **anon** | La clé anon est publique par conception. La sécurité vient de la RLS. |
| Table `admin_config` | secret de `get_inbox` | Jamais dans le code, RLS en refus total. |
| Vercel > Env Variables | `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` | Lues uniquement par `/api`, côté serveur. |

Aucune clé privée n'est commitée. `.gitignore` bloque désormais `.env`.

**Deux clients Supabase, unification progressive.** `supabase.js` sert encore `script.js` et `admin.html`. On l'unifie vers `db.js` quand ces deux fichiers seront repris (vague 5), pas avant.

---

## 4. Tables : correspondance brief / réel

Le schéma existant est en français. On ne renomme rien, ça casserait 26 pages. Correspondance :

| Brief | Existant | Action |
|---|---|---|
| `wellbeing_checkins` | `wellbeing_checkins` | en place, RLS correcte |
| `site_requests` | `site_requests` | en place, RLS correcte |
| `site_ideas` | `site_ideas` | en place, RLS correcte |
| `love_messages` | `mots`, `dico`, `lettres` | garder |
| `emotions` | `emotions`, `humeurs` | garder |
| `wishes` | `souhaits` | garder |
| `capsules` | `capsules` | garder |
| `gallery_items` | `photos`, `galerie`, `albums` | garder |
| `memories` | **absent** | créer sous le nom `souvenirs` (`sql/02`) |
| `admin_notes` | **absent** | à créer en vague 5, si le cockpit en a besoin |

---

## 5. Plan page par page

Format : *objectif émotionnel · visuel · UX · technique · données · interaction · priorité*.

### Fondations (transverse), priorité **haute**
Design system unique, tokens clair/sombre propres, primitives partagées (modale accessible, puces de filtre, timeline, squelette de chargement, fond vivant). Interrupteur clair/sombre sur toutes les pages. Hygiène du dépôt.

### Accueil, priorité **moyenne** (déjà fort)
Émotionnel : elle doit sentir qu'elle entre chez elle. Il ne manque que le polish mobile et une variation de ciel plus riche. Ne pas casser ce qui marche.

### Hub « Notre monde », priorité **haute**
17 cartes à plat, aucune hiérarchie. Regrouper en 4 familles : **Nous** (histoire, univers, nuit, galerie, souvenirs), **Toi** (ta page, comment tu te sens, humeurs, créations), **Explorer** (souhaits, voyages, mots, capsules, dramas, jeux), **Me dire** (me demander, une idée). Chaque carte respire, réagit au toucher, et existe en clair comme en sombre.

### Ta page `/dadoucherie`, priorité **haute**
Première carte du hub, donc irréprochable obligatoire. Aujourd'hui : accent doré résiduel, style propre, 1 764 lignes, ni clair/sombre ni tokens. À harmoniser et alléger.

### Souvenirs (nouveau) + Galerie, priorité **haute**
Le manque le plus visible. Créer un carnet vivant : timeline, carte par souvenir (titre, date, lieu, ressenti, message caché), modale immersive, filtres par émotion et par catégorie. Galerie : polaroïd discret, plein écran avec flèches et Échap, lazy-loading, légendes. Données : table `souvenirs` (`sql/02`) + `photos`/`galerie`. **Bloqué sur tes vraies photos et tes textes**, placeholders élégants en attendant.

### Univers, priorité **moyenne / haute**
Base excellente. Ajouter : positions responsives (les labels se chevauchent sur téléphone), zoom au focus d'une étoile, étoiles verrouillées jusqu'à une date, lien vers un souvenir.

### Émotions / bien-être / me demander / une idée (`/toi`), priorité **moyenne**
Déjà bon et déjà branché. Polir le ton, ajouter une petite action concrète par émotion, garder strictement non médical (une seule phrase de prudence si la douleur est forte, jamais de diagnostic).

### Souhaits, mots, capsules, voyages, priorité **moyenne**
Souhaits en « rêves à deux » avec statuts (à faire, en cours, réalisé, un jour, secret). Mots en dictionnaire intime. Capsules avec verrou, compte à rebours et ouverture animée. Voyages avec cartes élégantes et statut.

### Dramas, humeurs, créations, priorité **basse / moyenne**
Garder léger et complice. Humeurs : l'ambiance de la page change selon l'humeur choisie, sobrement.

### Pages orphelines, priorité **à décider avec toi**
`ocean`, `jardin`, `feu`, `portrait`, `livre`, `avent`, `au-cas-ou`, `courrier`, `demande`, `admin`. Non liées depuis le hub. Recommandation : garder `nuit` et `portrait`, fusionner `demande` dans `/toi` et `courrier` dans `/recu`, décider du reste.

### Admin, priorité **moyenne**
Un seul cockpit `/recu`. Retirer le PIN décoratif, router les écritures admin par une fonction à secret. Retirer `admin.html`.

---

## 6. Étapes (chaque vague laisse le site fonctionnel)

1. **Fondations** : hygiène du dépôt + design system étendu. ✅ *fait*
2. **Sécurité base** : durcissement RLS + chemin admin sécurisé. *SQL prêt, en attente de ton feu vert*
3. **Accueil + hub par familles + navigation cohérente.**
4. **Souvenirs + galerie premium.**
5. **Univers, `/toi`, souhaits, mots, capsules, voyages.**
6. **Consolidation des pages orphelines** (selon ta décision).
7. **Passe mobile, performance, accessibilité.**
8. **Documentation finale et plan de test.**

---

## 7. Ce que je dois avoir de toi

Sans ça, je mets des placeholders élégants et je continue le technique.

- **Photos** : galerie, souvenirs, voyages.
- **Souvenirs** : titre, date (même floue, « un mardi de novembre » suffit), lieu, ce que tu as ressenti.
- **Dates clés** de « Notre histoire ».
- ~~Le prénom à notifier dans le bien-être.~~ **Réglé : c'est Mathieu.** « Andile » était un artefact de gabarit du brief, il n'apparaissait dans aucun fichier du site.
- Mots du dico, capsules, souhaits déjà en tête.

---

## 8. Améliorations futures

- Ambiance sonore optionnelle globale, coupée par défaut.
- Notification email quand elle dépose un message ou un check-in bien-être.
- Supabase Auth pour l'admin, à la place du secret.
- Domaine personnalisé.
- Compression des médias : 6,4 Mo de MP3 dans le dépôt (5 ambiances de 689 Ko, bien distinctes, plus 4 voix). Encodés plus bas en débit, ils tiendraient en moitié moins sans différence audible sur téléphone.
