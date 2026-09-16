# Pour toi — V2 (Next.js)

Fondation de la V2 immersive en **Next.js (App Router) + React Three Fiber + Supabase**.
Ce dossier est **séparé du site actuel** : le site live (statique, à la racine) continue de tourner tel quel. On ne bascule Vercel sur cette V2 **qu'une fois testée au vert**.

## Pourquoi un dossier séparé
Le site actuel est un site statique. Y déposer un projet Next au même endroit ferait échouer/écraser le déploiement. Donc la V2 vit dans `v2-next/`, on la teste isolément, puis on bascule (voir « Déploiement »). Aucun contenu existant n'est touché.

## Lancer en local (nécessite Node 18+)
```bash
cd v2-next
npm install
npm run dev
# ouvrir http://localhost:3000
```
> Important : ce scaffold a été écrit **sans pouvoir être compilé** (terminal indisponible au moment de l'écriture). Le premier `npm run dev` révélera probablement quelques ajustements (imports, typos) : c'est normal pour une fondation. On itère jusqu'au vert avant tout déploiement.

## Ce qui est en place
- **Design system** : `app/globals.css` (couleurs nuit/violet/or, typographies Fraunces + Nunito Sans, ombres, easings, cibles tactiles, respect `prefers-reduced-motion`).
- **Registre unique** : `lib/experienceRegistry.js` (source de vérité des expériences + 3 parcours). L'accueil et les hubs le consomment (plus de listes de liens en double).
- **Accueil cinématique** : `app/page.jsx` → `Intro` (une fois par session) + `Butterflies` (R3F) + `Portes` (les 3 portes).
- **3 parcours** : `/besoin`, `/histoire`, `/surprise` → `components/JourneyHub` rend les expériences du parcours depuis le registre.
- **Papillons 3D** : `components/Butterflies.jsx` (React Three Fiber, logique validée : vols organiques, profondeur, évitement du curseur, se posent près d'une fleur ; nombre réduit sur mobile).
- **Curseur signature** : `components/CursorStar.jsx` (étoile souriante + poussière).
- **Supabase** : `lib/supabase.js` (mêmes tables/Storage/Edge Functions que le site actuel, inchangés).

## Migration sans perte (stratégie)
Pendant la transition, les cartes des 3 parcours pointent vers les **routes existantes** du site actuel (`/nuit`, `/mer`, `/galerie`, …). On porte ensuite chaque expérience en composant Next **une par une**, en gardant l'ancienne vivante jusqu'à ce que la nouvelle soit validée. Détails : `../CONTENT_MIGRATION_MAP.md`.

## Prochaines étapes (quand `npm run dev` tourne)
1. Corriger les éventuelles erreurs de build (première passe).
2. Porter les expériences phares en composants : `/nous-deux` (R3F), `/nuit`, `/mer`, `/papillons`.
3. Transitions cinématiques entre parcours (GSAP possible).
4. Qualité adaptative (HIGH/MEDIUM/LOW selon l'appareil) + fallback sans WebGL.
5. Galerie optimisée (miniatures, lightbox, lazy).
6. Événements spéciaux (le 15, anniversaires) via config centrale.
7. PWA (manifest, service worker), audio facultatif.
8. Migrer chaque page restante du registre.

## Déploiement (plus tard, une fois testé)
Option recommandée : **nouveau projet Vercel** pointant sur ce sous-dossier (`Root Directory = v2-next`), sur une branche `v2`, avec un domaine de préversion. On vérifie tout, puis on bascule le domaine principal. Le site actuel reste le filet de sécurité jusqu'à la bascule. Aucune donnée Supabase à migrer (schéma inchangé).

## Statut honnête
Fondation **écrite** et cohérente, **pas encore compilée/testée** (terminal indisponible). Ce n'est pas encore une V2 finie : c'est le socle propre sur lequel on construit, page par page, en vérifiant à chaque étape.
