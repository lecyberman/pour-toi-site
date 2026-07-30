# Déploiement Vercel + Supabase — Pour toi

## 1. Pourquoi ce fichier
Le site était prévu pour Netlify (`_redirects`). Sur **Vercel**, `_redirects` est ignoré : sans configuration, toutes les jolies routes (`/dadoucherie`, `/histoire`, `/jeux`, `/nuit`…) renvoient une **404**. Le fichier `vercel.json` ajouté à la racine règle ça (rewrites). Les deux fichiers peuvent coexister : chaque hébergeur lit le sien.

## 2. Connecter le dépôt à Vercel (une seule fois)
1. Aller sur https://vercel.com → **Add New… > Project**.
2. **Import Git Repository** → choisir `lecyberman/pour-toi-site`.
3. **Framework Preset : Other** (c'est un site statique, pas de build).
4. **Build Command : (vide)** · **Output Directory : (vide, racine)**.
5. **Deploy**.

À partir de là, **chaque push sur `main` redéploie automatiquement** (pas de limite de build bloquante comme Netlify).

## 3. Variables d'environnement (Vercel > Settings > Environment Variables)
Pour l'instant le site statique n'en a pas besoin (la clé anon est dans `db.js`, protégée par la RLS). Elles deviendront nécessaires quand on ajoutera l'**admin sécurisé** via une fonction serveur :

| Variable | Portée | Rôle |
|---|---|---|
| `SUPABASE_URL` | Public | URL du projet Supabase |
| `SUPABASE_ANON_KEY` | Public | Clé publique (lecture/écriture selon RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Serveur uniquement** | Lecture admin protégée. **Jamais côté client.** |
| `ADMIN_PASSWORD` | **Serveur uniquement** | Mot de passe de l'espace admin |

Voir `.env.example`.

## 4. Vérifier que tout marche
Après déploiement, tester ces URL (elles ne doivent PAS faire 404) :
`/` · `/dadoucherie` · `/histoire` · `/jeux` · `/nuit` · `/ocean` · `/jardin` · `/feu` · `/reves` · `/portrait` · `/livre` · `/avent` · `/au-cas-ou` · `/courrier` · `/demande`

Rafraîchir chaque page (F5) : toujours pas de 404 → le routing est bon.

## 5. Supabase
- Projet : `jnqyjpgbmjclxbjxbnft`.
- Accès en REST direct depuis `db.js` (client partagé).
- RLS activée sur toutes les tables.
- Tables privées (écriture publique, **lecture bloquée**) : `site_requests`, `site_ideas`, `wellbeing_checkins`. Personne ne peut lire ce qu'elle y dépose ; la lecture admin passera par une fonction serveur avec la clé service role.

## 6. Note sécurité admin
Le PIN admin est aujourd'hui en clair dans `admin.html` (`5922`). À corriger : déplacer la vérification dans une **fonction Vercel `/api`** qui compare `ADMIN_PASSWORD` (env var) et pose un cookie signé, ou utiliser **Supabase Auth**. Chantier prévu à l'étape « Admin ».

## 7. Design system (nouveau)
- `theme.css` : tokens + primitives (`.u-card`, `.u-btn`, `.u-field`, `.u-reveal`, halos…). À charger avant le CSS de chaque page.
- `db.js` : client Supabase partagé.
- `app.js` : comportements (apparition au scroll, boutons magnétiques, parallaxe, soumission avec états). À charger en fin de `<body>`.
