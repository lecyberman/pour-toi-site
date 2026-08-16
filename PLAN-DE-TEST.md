# Plan de test

À faire après chaque déploiement. Compte 10 minutes.

Serveur local pour tester avant de pousser :

```bash
python dev-server.py
```

**N'utilise pas `python -m http.server`.** Il sert les fichiers tels quels et ignore `vercel.json`, donc toutes les jolies routes (`/souvenirs`, `/toi`, `/histoire`…) tombent en 404 en local alors qu'elles marchent en production. On croit avoir cassé le site et on cherche un bug qui n'existe pas. `dev-server.py` lit `vercel.json` et applique les mêmes règles.

Attention aussi : `sw.js` peut servir une vieille version. Si un changement ne s'applique pas, désinscris-le (voir `DEPLOIEMENT-VERCEL.md`, section 6).

---

## 1. Routage, le plus important

Ouvrir chaque URL **et la rafraîchir** (F5). Un rewrite manquant se voit à la deuxième requête, pas à la première.

`/` · `/souvenirs` · `/galerie` · `/univers` · `/toi` · `/dadoucherie` · `/histoire` · `/nuit` · `/ocean` · `/jardin` · `/feu` · `/livre` · `/avent` · `/au-cas-ou` · `/portrait` · `/reves` · `/souhaits` · `/mots` · `/capsules` · `/dramas` · `/creations` · `/humeurs` · `/jeux` · `/recu`

✅ Aucune 404, avant comme après rafraîchissement.

---

## 2. L'entrée

- [ ] L'accueil affiche le ciel animé, le salut change selon l'heure.
- [ ] « Entrer, doucement » fait une sortie en fondu vers le hub.
- [ ] Le hub montre **4 familles** : Nous, Toi, Nos envies, Les lettres.
- [ ] Les familles arrivent en cascade, pas d'un bloc.
- [ ] Chaque carte ouvre la bonne page.
- [ ] `/?intro` rejoue l'entrée.

---

## 3. Thème clair et sombre

L'interrupteur est en bas à gauche, sur toutes les pages.

- [ ] Basculer sur `/`, `/souvenirs`, `/galerie`, `/toi`, `/souhaits`.
- [ ] **En clair, tout reste lisible.** C'est le piège : un texte ivoire sur fond ivoire donne un contraste de 1:1 et devient invisible. Regarde surtout les titres de famille du hub.
- [ ] Le choix est mémorisé au rechargement.

---

## 4. Le carnet `/souvenirs`

Vide au départ, c'est normal.

- [ ] À vide : message doux, plus une note technique pour toi.
- [ ] Avec des lignes : timeline groupée par année, tri du plus récent au plus ancien.
- [ ] Un souvenir sans `date_reelle` n'a pas de titre d'année.
- [ ] Les filtres apparaissent dès deux émotions ou deux catégories différentes.
- [ ] Clic sur une carte : la modale s'ouvre.
- [ ] Bouton « il y a autre chose » : le message caché apparaît.
- [ ] **Échap** ferme, le scroll de la page revient.

---

## 5. La galerie

- [ ] Grille en 3 colonnes sur ordinateur, 2 sur téléphone.
- [ ] Clic sur une photo : plein écran avec compteur « 2 / 5 ».
- [ ] Flèches à l'écran, et **flèches du clavier**, avec bouclage à la fin.
- [ ] **Échap** ferme.
- [ ] Sur téléphone, glisser le doigt change de photo.
- [ ] Les flèches ne sont pas cachées derrière la photo.

---

## 6. L'univers

- [ ] Sur téléphone, la constellation **descend tout l'écran**, elle ne se tasse pas en haut.
- [ ] Les libellés ne touchent pas leur étoile.
- [ ] Le titre ne passe pas sous le bouton de retour.
- [ ] Toucher une étoile ouvre sa carte, toucher le vide la referme.
- [ ] Au clavier : Tab fait apparaître les 8 étoiles une à une.

---

## 7. Les formulaires

Sur `/toi`, tester les quatre : émotion, bien-être, une demande, une idée.

- [ ] Bouton en état « Envoi… » pendant l'envoi.
- [ ] Message de confirmation doux.
- [ ] Double clic rapide : **un seul envoi**.
- [ ] Vérifier l'arrivée dans `/recu`.
- [ ] Couper le wifi et envoyer : message d'erreur clair, pas de page cassée.

---

## 8. Vie privée, à vérifier une fois

Le point le plus important du site. Depuis la console d'un navigateur :

```js
fetch('https://jnqyjpgbmjclxbjxbnft.supabase.co/rest/v1/wellbeing_checkins?select=*',
  { headers: { apikey: 'LA_CLE_ANON', Authorization: 'Bearer LA_CLE_ANON' } })
  .then(r => r.json()).then(console.log)
```

✅ Doit renvoyer une erreur ou un tableau vide. **Jamais son contenu.**

Même test avec une suppression sur une table de contenu :

```js
fetch('https://jnqyjpgbmjclxbjxbnft.supabase.co/rest/v1/photos?id=eq.UN_ID',
  { method: 'DELETE', headers: { apikey: 'LA_CLE_ANON', Authorization: 'Bearer LA_CLE_ANON' } })
```

✅ Ne doit rien supprimer.

---

## 9. L'admin

- [ ] `/admin`, le bon code ouvre.
- [ ] **Un mauvais code refuse.**
- [ ] Modifier une ligne : ça marche.
- [ ] Supprimer une ligne : ça marche.
- [ ] Se déconnecter, revenir : le code est redemandé.
- [ ] `/recu` affiche demandes, idées et bien-être avec le secret.

---

## 10. Mobile

À 375 px de large, sur les pages principales.

- [ ] **Aucun défilement horizontal.** Vérifiable en console :
      `document.documentElement.scrollWidth - innerWidth` doit valoir `0`.
- [ ] Les boutons se touchent facilement.
- [ ] Les modales s'ouvrent et se ferment.
- [ ] Les textes restent lisibles.

---

## 11. Immersion : transitions et lumière de l'heure

- [ ] Cliquer une carte du hub : la page part en fondu, la suivante arrive en fondu. Pas de coupure blanche.
- [ ] **Le plus important : les liens marchent toujours.** Si une transition se bloque, un repli à 340 ms force la navigation. Vérifie que rien ne reste coincé.
- [ ] Retour arrière du navigateur : la page revient **visible**, jamais voilée.
- [ ] Ctrl+clic ou clic milieu : ouvre bien un nouvel onglet, sans transition.
- [ ] Un lien externe n'est pas intercepté.
- [ ] Sur les pages à CSS propre (`/nuit`, `/ocean`, `/univers`), le voile prend la couleur de **leur** fond, pas un gris générique.
- [ ] Le fond n'a pas la même teinte le matin et le soir. Pour le vérifier sans attendre, en console :
      `document.documentElement.style.setProperty('--amb-a','226,135,130')` (soir)

---

## 12. Mouvement réduit

Activer « réduire les animations » dans les réglages du système.

- [ ] Aucune animation agressive.
- [ ] Le contenu reste visible et accessible, rien ne disparaît.
- [ ] **Aucune transition de page** : `ambiance.js` s'arrête avant de créer le voile, les liens redeviennent des liens ordinaires.

---

## Ce qui a été vérifié et mesuré

| Point | Mesure |
|---|---|
| Contraste des titres de famille, thème clair | 10,96 (AA demande 4,5) |
| Contraste des descriptions, thème clair | 5,44 |
| Débordement horizontal à 375 px | 0 px |
| Chargement complet de l'accueil | 100 ms (était 195 ms) |
| Requêtes base bloquant l'accueil | 1 (était 11) |
| Champs sans nom accessible | 0 (était 41) |
| Policies `ALL` ou `DELETE` publiques | 0 (était 17 tables) |
