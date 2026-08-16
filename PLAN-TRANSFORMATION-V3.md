# Pour toi — Audit, diagnostic & plan de transformation (V3)

*État réel du dépôt vérifié en ligne le jour de rédaction (branche `main`, ~54 fichiers, 26 pages HTML).*

---

## 1. Audit — état réel vérifié

**Nature technique**
- Site **statique HTML pur** : aucun build (pas de `package.json`, pas de Vite, pas de Next). 26 pages `.html` autonomes.
- **Supabase** : projet `jnqyjpgbmjclxbjxbnft`. Client JS avec **clé anon en clair** dans `db.js` (moderne) et `supabase.js` (ancien, doublon). C'est acceptable **uniquement parce que la RLS est stricte**.
- **Admin en lecture** : via fonctions Postgres `get_inbox` / `add_photo` (SECURITY DEFINER, protégées par un secret) → aucune `service_role` côté navigateur. `api/inbox.js` existe mais **non utilisé** (abandonné).
- **Vercel** : `vercel.json` avec rewrites (routes propres → `.html`), en-têtes de cache. Déploiement auto depuis GitHub `main`.
- **PWA** : `manifest.json`, `sw.js`, `icon.svg` en ligne → site installable.
- `.env.example` présent et correct (documente public + serveur, note que la clé anon reste côté client car RLS).
- Fichiers SQL présents : `setup-supabase.sql`, `migration-add-tables.sql`, `migration-v2-espaces-prives.sql`.

**Fragmentation des styles (point clé)**
- **Moderne `theme.css` (violet, premium, clair/sombre partiel)** : `index, toi, souhaits, mots, galerie, capsules, creations, dramas, humeurs, recu` (10).
- **Ancien `style.css`** : `admin, jeux, notre-histoire` (+ `index`/`recu` en mixte).
- **Pages autonomes à style propre** : `pour-dadoucherie, courrier, nuit, ocean, jardin, feu, reves, portrait, livre, avent, au-cas-ou, demande, univers`.
→ Trois familles visuelles = incohérence ressentie entre les pages.

---

## 2. Diagnostic

### Ce qui est déjà réussi (à conserver)
- **Accueil cinématique** : ciel animé (heure du jour), voile de lisibilité, bouton « Entrer » qui respire, fallback `prefers-reduced-motion`.
- **Séparation intro → hub → contenu** claire (bug « Accueil » corrigé), hub « Notre monde » (17 cartes).
- **Interrupteur clair / sombre** (sombre par défaut, mémorisé) sur accueil + hub + sections internes.
- **PWA installable** (plein écran, hors-ligne, chargement instantané).
- **Cœur émotionnel** : `/toi` (émotions + bien-être non-médical + « me demander » + idées), `/recu` (réception admin, à secret), `/univers`, `/souhaits`, `/mots`, `/galerie`, `/capsules`, `/dramas`, `/humeurs`, `/histoire`, `/jeux`, `/nuit`.
- **Supabase** : insertion publique + lecture bloquée + lecture admin via fonction à secret = **respect de la vie privée**.
- **Voix**, bonjours automatiques selon l'heure, bibliothèque de messages authentiques.
- **Palette violette** (plus de jaune), tirets longs nettoyés, ton sincère.

### Ce qui bloque l'immersion / est fragile
1. **Incohérence visuelle** entre les 3 familles de style. Le violet + clair/sombre n'est pleinement appliqué que sur ~10 pages ; les autres gardent un aspect différent.
2. **Toggle clair/sombre limité** à l'accueil/hub ; les pages de contenu ne le proposent pas encore.
3. **Sprawl de pages** : 26 pages, dont plusieurs redondantes ou orphelines (non liées depuis le hub) :
   - Admin dispersé : `recu` + `admin` + `courrier`.
   - `demande` vs le « me demander » de `/toi`.
   - `reves` (voyages) vs `souhaits` (rêves à deux) : chevauchement.
   - `ocean, jardin, feu, portrait, livre, avent, au-cas-ou` : anciennes « portes » probablement orphelines.
4. **`pour-dadoucherie` (« Ta page », 1re carte)** : garde un accent doré résiduel, style propre (pas clair/sombre, pas pleinement violet), fichier volumineux.
5. **Doublon de client Supabase** (`db.js` + `supabase.js`) + `api/inbox.js` mort.
6. **Mobile / perf / accessibilité** non audités page par page ; scènes canvas à vérifier ; `prefers-reduced-motion` partiel.
7. **Personnalisation** : beaucoup de placeholders (photos, souvenirs, constellation, dates d'histoire) en attente de ton contenu.

### Risques Vercel / Supabase
- Ne pas réintroduire `cleanUrls` dans `vercel.json` (avait cassé les rewrites → 404).
- Garder la `service_role` hors du navigateur (OK aujourd'hui).
- Toute nouvelle table doit avoir sa **RLS** avant mise en ligne.
- Netlify est abandonné/bloqué : ne rien y déployer.

---

## 3. Architecture Vercel + Supabase (reco)
- **Garder le statique HTML** (rapide, simple, zéro build) — ne pas migrer vers un framework pour ce projet.
- **Unifier le client Supabase** sur `db.js` seul ; retirer `supabase.js` (doublon) et `api/inbox.js` (mort).
- **Admin** : rester sur les fonctions Postgres à secret (déjà en place), une seule page `/recu` comme cockpit.
- `.env.example` : garder tel quel (public + serveur documentés).

---

## 4. Tables & RLS — mapping existant → cible
Le brief liste des noms « cible » ; le site utilise déjà des équivalents. Reco : **ne pas renommer** (casserait le code), mais documenter le mapping.

| Brief (cible) | Existant réel | Action |
|---|---|---|
| `wellbeing_checkins` | `wellbeing_checkins` | OK |
| `site_requests` | `site_requests` | OK |
| `site_ideas` | `site_ideas` | OK |
| `love_messages` / mots | `mots` | garder |
| `emotions` / humeurs | `humeurs` | garder |
| `wishes` | `souhaits` | garder |
| `capsules` | `capsules` | vérifier |
| `gallery_items` / photos | `photos` + `galerie` | garder |
| `memories` | (à confirmer) | créer si absent |
| `admin_notes` | (à confirmer) | créer si utile |

**RLS voulue** : INSERT public sur `site_requests`, `site_ideas`, `wellbeing_checkins` ; SELECT public bloqué ; lecture admin via fonction à secret ; pas de DELETE/UPDATE public.

---

## 5. Plan page-par-page
*Objectif émotionnel · Visuel · UX · Technique · Données · Interaction · Priorité.*

### Fondations (transverse) — priorité **haute**
- **Design system unique** : faire de `theme.css` + `data-theme` (clair/sombre) le seul système. Migrer les pages autonomes et `style.css` vers les tokens. Retirer `supabase.js` et `api/inbox.js`.
- **Toggle clair/sombre global** : le porter sur toutes les pages (via un petit script partagé + palette sombre complète dans `theme.css`).
- **Micro-interactions cohérentes** : reveal au scroll, boutons magnétiques, halos — homogènes partout.

### Accueil — priorité **moyenne** (déjà fort)
- Émotionnel : entrée douce. Visuel : ciel OK. UX : intro une fois. Tech : OK. Data : salut selon l'heure. Interaction : parallaxe souris. *Reste* : polir mobile + variantes de ciel plus riches (option).

### Hub « Notre monde » — priorité **moyenne**
- Réorganiser les 17 cartes en **familles** (Nous / Toi / Explorer / Nous demander), pour guider sans surcharger. Rendre chaque carte « respirante » et cohérente en clair/sombre.

### Ta page (`/dadoucherie`) — priorité **haute**
- Harmoniser au violet + clair/sombre, retirer l'accent doré résiduel, alléger/vérifier le fichier. C'est la 1re carte : elle doit être irréprochable.

### Univers — priorité **moyenne/haute**
- Ciel de profondeur, constellations personnalisées, lune/comète, souvenirs cachés cliquables, focus/zoom, clavier, perf. Données : `universeItems[]` avec placeholders élégants.

### Souvenirs / Galerie / Photos / Albums — priorité **haute**
- Créer une vraie **section Souvenirs** type carnet vivant (timeline : titre, date, lieu, émotion, message caché) distincte de la galerie polaroïd. Lazy-loading, modal plein écran, filtres. Données : `photos`/`galerie` (+ `memories` si créé). **Tes photos requises.**

### Émotions / Bien-être / Me demander / Idées (`/toi`) — priorité **moyenne** (déjà bon)
- Polir le ton, ajouter petites actions, garder non-médical (phrase de prudence seule si douleur forte). Vérifier états loading/success/error partout.

### Souhaits / Mots / Capsules — priorité **moyenne**
- Souhaits = « rêves à deux » (statuts à faire/en cours/réalisé/un jour/secret). Mots = dico intime. Capsules = verrou + compte à rebours + ouverture animée. Harmoniser visuellement.

### Dramas / Humeurs / Créations — priorité **basse/moyenne**
- Garder léger/complice. Humeurs : ambiance qui change (sobre). Harmoniser.

### Voyages (`/reves`) — priorité **moyenne**
- Fusionner la logique avec Souhaits ou clarifier la différence. Cartes élégantes, lieux rêvés, statut.

### Pages « portes » legacy (`nuit, ocean, jardin, feu, portrait, livre, avent, au-cas-ou, courrier, demande`) — priorité **à décider**
- Décider **garder / fusionner / retirer**. Beaucoup sont orphelines (non liées au hub). Recommandation : garder `nuit` (belle), fusionner `demande`→`/toi`, `courrier`→`/recu`, et retirer ou transformer les autres si sans usage réel.

### Admin (`/recu`) — priorité **moyenne**
- Cockpit unique : demandes, idées, bien-être, photos, souhaits, mots. Retirer `admin.html` legacy. Protection par secret (déjà en place) — envisager Supabase Auth plus tard.

---

## 6. Étapes (vagues testables — le site reste fonctionnel après chacune)
1. **Fondations** : unifier design system + toggle global + nettoyage Supabase (db unique). *Test : chaque page en clair/sombre, aucune régression.*
2. **Ta page + Hub** : harmonisation + regroupement des cartes.
3. **Souvenirs / Galerie** : nouvelle section carnet + galerie premium.
4. **Univers** : profondeur + interactions + perf.
5. **Souhaits / Mots / Capsules / Voyages** : montée de niveau + cohérence.
6. **Consolidation pages legacy** (garder/fusionner/retirer selon ta réponse).
7. **Mobile / perf / accessibilité** : passe globale + `prefers-reduced-motion`.
8. **Docs finales** : déploiement Vercel, Supabase, RLS, plan de test, données à personnaliser.

---

## 7. Données personnelles à me fournir (sinon placeholders élégants)
- Photos (galerie, souvenirs, voyages).
- Textes de souvenirs (titre, date, lieu, ressenti).
- Milestones de l'univers (dates/évènements de votre relation).
- Dates clés de « Notre histoire ».
- Le **prénom réel** à notifier dans le bien-être « je veux que … sache » (le brief dit « Andile » = artefact de gabarit, à corriger).
- Éventuels mots du dico / capsules / souhaits déjà en tête.

---

## 8. Améliorations futures possibles
- Ambiance sonore optionnelle globale (déjà partielle sur Ta page) — off par défaut.
- Icône PNG dédiée pour l'écran d'accueil iOS.
- Notifications (email/push) quand elle laisse un message/bien-être.
- Supabase Auth pour l'admin.
- Domaine personnalisé (retirer l'URL Vercel).

---

## 9. Questions bloquantes (uniquement le nécessaire)
1. **Périmètre de cette vague** : je commence par les **Fondations** (cohérence globale + toggle partout + nettoyage), recommandé — ou une page précise d'abord ?
2. **Pages legacy** : OK pour **fusionner/retirer** les pages orphelines (`ocean, jardin, feu, portrait, livre, avent, au-cas-ou, courrier, demande, admin`), ou tu veux **tout garder** ?
3. **Notification bien-être** : « je veux que … sache » = **toi (Mathieu)** ? Et l'inbox `/recu` te suffit, ou tu veux être prévenu autrement (email) ?
4. **Contenu perso** : tu me fournis photos/textes maintenant, ou je continue avec **placeholders** + liste à personnaliser ?
