# AUDIT_V2 — Dadoucherie / « Pour toi »

_Audit complet du repository en vue de la V2. Rédigé le 15/09/2026._

## 0. Contrainte de contexte (importante)
Au moment de cet audit, l'atelier (shell/bash) et git sont **indisponibles** (une mise à jour Windows bloque le montage des fichiers). Conséquences : impossible de lancer un build, des tests, un lint, d'installer des dépendances ou de déployer depuis cette session. Les fichiers peuvent être écrits/édités, Supabase est pilotable, et les rendus se vérifient via aperçus ou navigateur sur l'URL déjà déployée. **La refonte lourde s'implémente et se valide quand l'atelier/déploiement revient.**

## 1. Stack réelle
- **Site statique multi-pages** : HTML + CSS + JavaScript **vanilla**. Aucun framework (pas de React/Vue/Svelte), **pas de build, pas de bundler, pas de TypeScript**.
- **Hébergement** : Vercel, déployé depuis GitHub `lecyberman/pour-toi-site`. Routage par **`vercel.json` (rewrites)** vers des URLs propres (`/nuit`, `/mer`, …).
- **PWA** : `manifest.json` + `sw.js` (cache `pourtoi-v7`, réseau d'abord pour HTML/CSS/JS, cache pour médias, handlers `push`/`notificationclick`).
- **Backend** : Supabase (projet `jnqyjpgbmjclxbjxbnft`). Clé **anon publique inline** (normal, protégée par RLS). Fonctions Edge : `envoyer-rappels`, `envoyer-message`, `envoyer-signal`. **Storage** bucket public `media`. Secrets privés (VAPID privé, SECRET) **uniquement** dans les Edge Functions (bon).
- **3D** : **Three.js r128 classique** (chargé via CDN) sur `/nous-deux` et `/papillons`. (La version ES-module r160 a échoué dans cet environnement : rester en r128.)
- **Serverless** : `api/inbox.js` (lecture admin).

## 2. Conséquence architecturale majeure
Le brief V2 suppose par endroits React Three Fiber / Drei / `src/` / code-splitting / tests E2E / TypeScript. **Cette stack n'existe pas ici.** Migrer vers React maintenant = réécriture totale, non validable sans build/déploiement, et risquée sur un site aimé et fonctionnel. 
**Décision (voir ARCHITECTURE_V2.md) : NE PAS migrer vers React. Faire évoluer le site statique** avec une couche partagée (shell + registre + design tokens + transitions) et garder Three.js classique. On obtient toute la vision (3 portes, monde vivant, registre, design system, qualité adaptative) sans réécriture risquée.

## 3. Inventaire des expériences (≈45)
**Réconfort / présence** : `/cocon`, `/dormir`, `/journal`, `/toi`, `/humeurs`, `/chansons`, `/fleurs`, `/pioche`, `/ciel`, `/calin`, `/bonne-nuit`, `/au-cas-ou`, `/pour-lui`.
**Histoire / mémoire** : `/histoire` (notre-histoire), `/univers`, `/etoile`, `/nous-deux`, `/nuit`, `/galerie`, `/album` (photos+voix), `/papillons`, `/mots`, `/livre`, `/petits-riens`, `/souvenirs` (carnet), `/reves`+`/voyages`, `/fil`, `/portrait`, `/bibliotheque`.
**Découverte / futur** : `/le-15` (anniv), `/coffret`, `/capsules`, `/souhaits`, `/retrouvailles`, `/jeux`, `/dramas`, `/creations`, `/ensemble`, `/messages`, `/mer`, `/jardin`, `/feu`, `/ocean`, `/demande`, `/souhaits`.
**Système / privé** : `/` (accueil hub), `/dadoucherie` (sa page), `/courrier` (gated Mathieu), `/recu`, `/admin`, `/moi`.

## 4. Modules JS
`script.js` (~123 Ko, logique de l'accueil + sections), `app.js`, `db.js` (client Supabase partagé : select/insert/update/count), `supabase.js`, `presence.js` (identité lui/elle + présence temps réel ; désormais aussi curseur + transitions), `bonjours.js`, `ambiance.js` (audio/musiques), `rappels.js` (push client), `retour.js`, `intro.js` (intro cinématique — nouveau), `etincelles.js` (curseur étoile + poussière — nouveau), `sw.js`.

## 5. Données Supabase (tables repérées)
`etoile`, `petits_riens`, `push_subs`, `push_envois`, `retrouvailles`, `localisation`, `medias`, `messages`, `dico` (mots), `capsules`, `lettres`, `site_ideas`, `site_requests`, `wellbeing_checkins`, + tables Phase 5 (fil/câlin/coffret/signaux). RLS souvent **permissive en écriture (anon)** : choix assumé pour un site privé à deux, mais à garder en tête (n'importe qui avec la clé anon pourrait écrire). Aucune donnée sensible tierce.

## 6. Problèmes identifiés
1. **Fragmentation UX (problème n°1)** : l'accueil expose ~40 cartes → charge cognitive énorme. C'est LA cible de la V2 (3 portes).
2. **Dossier dupliqué** `pour-toi-site/pour-toi-site/` : ancienne copie partielle (~30 fichiers) qui traîne dans le repo. À supprimer (ne sert pas au déploiement, source de confusion).
3. **Client Supabase dupliqué** : beaucoup de pages redéclarent `URL_SB`/`ANON` en inline au lieu d'utiliser `db.js`. À centraliser.
4. **Boilerplate répété** : même `<head>`, mêmes polices, mêmes styles de base copiés dans chaque page (pas de partial partagé, car pas de build).
5. **Performance médias** : ~6,7 Mo de MP3, PNG d'icônes lourds, **pas de miniatures** pour la galerie, gros fichiers monolithiques (`script.js` 123 Ko, `style.css` 67 Ko, `admin.html` 93 Ko).
6. **Sécurité** : `admin.html` protège par un **PIN en clair côté client** (faible) ; à migrer vers une vérif serveur. Clé anon publique = normal.
7. **Legacy** : quelques pages/pistes anciennes (`/portrait`, `/jardin`, `/feu` en enchaînement) à intégrer dans le parcours ou rediriger.
8. **Pas de build** : impossible de faire minification/code-splitting classiques ; on optimise autrement (lazy `<script defer>`, imports dynamiques natifs `import()`, images responsives).

## 7. À conserver tel quel (déjà excellent — ne pas réécrire)
- **`/nuit`** : scène scroll nuit→aube, voie lactée, constellation « nous » interactive, filantes, lever de soleil. Remplit déjà la « Phase 3 ».
- **`/mer`** : vagues multi-couches, phase de lune réelle, bouteille à la mer, compte à rebours (+ reflet de lune ajouté).
- **`/nous-deux`** : vraies photos fondues dans un univers 3D (décision validée : garder les photos).
- **Pipeline push** (rappels + messages + signaux) : fonctionnel, secrets bien côté serveur.
- **`bonjours.js` / ambiance** : ton et voix de Mathieu.

## 8. Verdict
Le site n'a pas un problème de manque : il a un problème d'**organisation** et de **finition technique**. La V2 doit : (a) regrouper en **3 parcours** (voir migration), (b) introduire une **couche partagée** (shell + registre + design tokens) pour tuer la duplication, (c) polir la performance (miniatures, lazy, nettoyage duplicats), (d) préserver 100 % du contenu via redirections. Le tout **sans** réécriture React. Détails dans `ARCHITECTURE_V2.md` et `CONTENT_MIGRATION_MAP.md`.
