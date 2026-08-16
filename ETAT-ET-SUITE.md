# Où on en est — Pour toi (note de reprise)

*Site statique HTML, déployé sur Vercel (auto-deploy depuis GitHub `lecyberman/pour-toi-site`).*
*URL de prod (toujours à jour) : `pour-toi-site-git-main-projet6.vercel.app`*
*Base : Supabase `jnqyjpgbmjclxbjxbnft` (RLS activée).*

## Fondations en place
- `vercel.json` : rewrites des jolies routes (sans lui, 404 sur Vercel). NE PAS remettre `cleanUrls`.
- `theme.css` : design system central (tokens + primitives `.u-card`, `.u-btn`, `.u-field`, `.u-reveal`, halos). À charger avant le CSS de page.
- `db.js` : client Supabase partagé (`DB.insert/select/update/count`).
- `app.js` : comportements (apparition au scroll `.u-reveal`, boutons `.u-magnet`, parallaxe `[data-parallax]`, `App.submit(btn,state,action,okMsg)` avec loading/succès/erreur + anti-double-envoi).
- `.env.example`, `DEPLOIEMENT-VERCEL.md`, `AUDIT-ET-PLAN.md` (plan complet page par page).
- Protection SSO Vercel **désactivée** (sinon elle ne peut pas accéder). Cache HTML en no-cache.

## Pages déjà refaites (premium, sur le design system) — en ligne et vérifiées
- **Accueil `/`** : entrée cinématique (canvas `#accueil-ciel` = ciel selon l'heure, halo, parallaxe), titre Fraunces, bouton doré qui respire, entrée fondue puis `naviguer('galerie')`. Popup 1re visite harmonisé (or). Menu masqué sur l'accueil.
- **`/toi`** (« Comment tu te sens ») : émotions (réponse douce + action + « je veux qu'il le sache »), bien-être NON médical (énergie/stress/mal+zone+intensité/malade/message/besoin/prévenir → `wellbeing_checkins`), « me demander » → `site_requests`, « une idée » → `site_ideas`.
- **`/recu`** : réception admin de Mathieu. Lecture via fonction Postgres `get_inbox(p_secret)` (SECURITY DEFINER, secret dans table `admin_config`, secret actuel = `5922`). Les 3 tables privées ont INSERT public mais **SELECT bloqué** (privacy).
- **`/univers`** : constellation des jalons (Snap, Lyon, 15 juillet, Monaco, Malte, Barcelone, le oui, « la suite »), lune, comète, parallaxe, clic → carte, accès clavier.

## Nouvelles tables Supabase
- `wellbeing_checkins`, `site_requests`, `site_ideas` : INSERT public, **pas de policy SELECT** (privé). Lecture admin via `get_inbox`.
- `admin_config(secret)` : secret admin (RLS deny). Fonction `get_inbox(p_secret text)` renvoie les 3 tables en JSON si le secret matche.

## Reste à faire (prochaines étapes du plan)
1. **Souvenirs / Photos / Albums** : galerie premium (grille responsive, effet polaroïd discret, plein écran, légendes, lazy-load). Charger depuis `galerie` / `photos` / `albums` ou URLs ; placeholders élégants si pas de photos. → besoin des vraies photos de Mathieu.
2. **Souhaits** → « liste de rêves à deux » (statuts à faire/en cours/réalisé/un jour/secret).
3. **Mots** → dictionnaire intime (table `dico` existe déjà).
4. **Capsules** : ouverture datée + compte à rebours (tables `capsules`, `lettres`).
5. **Créations / Dramas / Humeurs** : montée en gamme légère.
6. **Admin** : migrer le PIN en dur `5922` de `admin.html` vers une vérif serveur (ou garder `get_inbox`). Brancher un lien vers `/recu` depuis le courrier.
7. **Autres pages satellites** (`/histoire`, `/jeux`, `/nuit`, `/ocean`, `/jardin`, `/feu`, `/reves`) : déjà jolies (sessions précédentes), à harmoniser sur `theme.css` si on veut l'unité totale.

## Règles de style (important)
- Ton : romantique mature, sincère, la voix de Mathieu (humour « vampire émotionnel », poète, café d'elle vs petit-déj de lui, Paris/sud, casaniers). Voir `bonjours.js`.
- **Aucun tiret cadratin `—`** dans les textes (Mathieu déteste, ça fait IA). Utiliser virgules/points.
- Pas de rose flashy, pas d'emojis à outrance, pas de kitsch.

## Déploiement
- Éditer les fichiers → commit/push sur `main` → Vercel déploie tout seul.
- Vérifier sur `pour-toi-site-git-main-projet6.vercel.app` (pas les URLs figées `-xxxx-projet6`).
