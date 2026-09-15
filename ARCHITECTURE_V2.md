# ARCHITECTURE_V2 — Dadoucherie / « Pour toi »

_Cible d'architecture pour la V2, adaptée à la stack réelle (site statique, pas de build). Rédigé le 15/09/2026._

## Principe directeur
QUALITÉ > QUANTITÉ. On ne rajoute pas d'expériences : on **réorganise en un monde à 3 portes**, on tue la duplication technique, on polit la performance, **sans rien perdre** et **sans migrer vers React** (impossible à valider ici, risqué). On garde HTML/CSS/JS + Three.js r128, en ajoutant une **couche partagée**.

## 1. Les 3 parcours (portes)
1. **« J'ai besoin de toi »** — réconfort / présence. Entrée : « Comment tu te sens ce soir ? » → quelques choix émotionnels visuels → **une** expérience adaptée (pas 12 boutons).
2. **« Retrouver notre histoire »** — mémoire, présentée comme un **monde navigable** (constellation = souvenirs forts, planète = voyages, lumière chaude = lettres, polaroïds = galerie, papillon = petits riens, étoile majeure = 15 juillet, chemin lumineux = chronologie).
3. **« Surprends-moi »** — découverte / jeu / futur. « Il y a quelque chose pour toi aujourd'hui. » Résultat selon jour/heure/le 15/date/hasard/présence des deux.

Le mapping exhaustif des ~45 expériences vers ces 3 portes est dans `CONTENT_MIGRATION_MAP.md`.

## 2. Arborescence cible (statique, progressive)
On n'impose pas `src/` React. On introduit des dossiers **sans casser les URLs** :
```
/                      (accueil cinématique -> 3 portes)
/index.html            (landing)
/besoin, /histoire-monde, /surprise   (les 3 hubs de parcours)
/<experiences>.html    (inchangées, réutilisées par les parcours)
/js/
  core/        shell.js, router-transition.js, quality.js, events.js, state.js
  data/        experienceRegistry.js   (SOURCE DE VÉRITÉ unique)
  3d/          three-scene.js, papillons.js
  audio/       audio.js (facultatif, off par défaut)
  ui/          (helpers partagés)
/styles/       tokens.css (design system), base.css
/assets/       img/ (+ thumbs/), audio/, models/ (glb)
```
`db.js`, `presence.js`, `sw.js`, `manifest.json` restent à la racine (déjà référencés partout).

## 3. Couche partagée (tue la duplication)
- **`experienceRegistry.js`** : liste unique de toutes les expériences (id, titre, description, journey, route, icon, theme, priority, availableOnMobile, requiresWebGL, requiresAudio, eventRules, preload). L'accueil et les hubs des 3 portes **consomment ce registre** au lieu de coder des listes de liens en dur (voir `js/data/experienceRegistry.js`).
- **`shell.js`** : injecte le head commun (polices, tokens.css), la nav discrète « rentrer à la maison » + accès aux 3 portes, monte le curseur (`etincelles.js`) et les transitions. Inclus en une ligne par page → supprime le boilerplate copié.
- **`db.js`** : unique client Supabase. Objectif : supprimer les `URL_SB/ANON` inline des pages au profit de `DB.*`.

## 4. Design system (`styles/tokens.css`)
Variables CSS déjà amorcées dans `tokens.css` ; à compléter et généraliser : couleurs (nuit profonde, violet très subtil, or chaud, lavande), espacements, typographies (Fraunces + Nunito Sans), rayons, ombres douces, z-index, **durées/easings** d'animation, niveaux de halo, opacités, breakpoints, cibles tactiles (≥ 44 px). Composants sobres réutilisables (Bouton, Carte, Feuille/Sheet, Dialog, MediaViewer, MemoryViewer, Loader, PageTransition) en CSS + petits helpers JS.

## 5. Navigation « monde », pas « pages »
- Transition globale déjà posée (`presence.js` : fondu à l'arrivée + fondu au clic sur liens internes). À enrichir par type de destination (galerie = polaroïd qui grandit, lettre = lumière qui baisse, voyage = globe qui se rapproche) via `router-transition.js`.
- Toujours une sortie discrète « rentrer ». Trois symboles persistants pour les 3 portes. Ne jamais afficher toutes les possibilités à la fois.

## 6. Qualité adaptative (`quality.js`)
Niveaux HIGH / MEDIUM / LOW déterminés par : `matchMedia(pointer)`, `deviceMemory`, `hardwareConcurrency`, DPR, et `prefers-reduced-motion`. Pilote : nombre de papillons/particules, DPR du renderer, ombres, post-process, préchargement. **Fallback** propre sans WebGL. Pause du rendu hors écran / onglet caché.

## 7. Événements spéciaux (`events.js` + config)
Config centrale `specialEvents` (id, règle de date, titre, ambiance, assets, priorité). Le monde change automatiquement le 15, aux anniversaires, à l'approche des retrouvailles (compte à rebours intégré au décor). Aucune date codée en dur dans les composants.

## 8. Jour/soir/nuit
État d'ambiance dérivé de l'heure locale (matin chaud / jour / soir rosé / nuit bleu profond / nuit tardive très lente). Déjà présent sur `/dadoucherie` (le ciel change selon l'heure) : à généraliser via une petite fonction partagée `ambiance-temps.js` alimentant tokens de couleur.

## 9. Audio (facultatif)
`audio/audio.js` : jamais d'autoplay, contrôle discret, volume/mute/crossfade, préférence persistante, respect des restrictions mobiles. Réutiliser les MP3 et `ambiance.js` existants, unifiés derrière une petite couche.

## 10. Performance
Sans build : `defer`/`import()` dynamiques pour la 3D (charger Three seulement sur les pages 3D), **miniatures** pour la galerie (thumb + full, lazy, préchargement voisin), images WebP/AVIF, GLB Draco/Meshopt quand un modèle réaliste sera fourni, nettoyage listeners/rAF/textures, ne pas charger de grosse scène sur la landing.

## 11. Migration sans perte
Toutes les routes actuelles restent valides (rewrites conservés). Quand une expérience rejoint une porte, l'ancienne URL **redirige** vers le hub/expérience correspondant (`vercel.json`). `/nous-deux`, `/nuit`, `/mer` restent des routes dédiées (expériences phares). Détail dans `CONTENT_MIGRATION_MAP.md`.

## 12. Ordre d'implémentation (quand l'atelier revient)
tokens.css + shell.js + experienceRegistry.js → 3 hubs de parcours → accueil 3 portes → transitions par type → qualité adaptative + événements → miniatures galerie → nettoyage duplicats (dossier imbriqué, clients Supabase inline) → passe accessibilité/mobile → polish. Commits logiques par étape. Aucune donnée supprimée.
