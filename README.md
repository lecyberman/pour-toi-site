# Pour toi — Un espace à nous
## Site web statique pour Netlify

---

## 📁 Structure du projet

```
/
├── index.html          ← structure du site
├── style.css           ← tout le design
├── script.js           ← contenu + logique
├── assets/             ← tes images et dessins
│   └── README.md
└── README.md           ← ce fichier
```

---

## ✏️ Comment modifier le contenu

Tout le contenu modifiable se trouve dans **`script.js`**, en haut du fichier.

### Modifier la galerie (photos, souvenirs)

Cherche `gallerieData` dans `script.js`. Chaque carte ressemble à :

```js
{
  id: 1,
  categorie: "debut",       // "debut" | "calme" | "aimer" | "voir"
  titre: "Le premier soir",
  texte: "Le texte qui apparaît dans la modal...",
  image: null,              // ou "assets/ma-photo.jpg"
  emoji: "🌙"              // emoji affiché si pas d'image
}
```

### Ajouter une carte dans la galerie

Copier/coller un bloc et modifier les valeurs. Donne un `id` unique (nombre).

### Modifier la section "Comprendre"

Cherche `comprendreData`. Chaque item :
```js
{
  titre: "L'observation",
  texte: "L'explication sincère..."
}
```

### Modifier les étoiles de l'univers

Cherche `universObjets`. Chaque étoile :
```js
{
  label: "Notre étoile",
  message: "Le message au clic...",
  x: 25,   // position horizontale en % (0 = gauche, 100 = droite)
  y: 20,   // position verticale en %   (0 = haut,   100 = bas)
  emoji: "⭐"
}
```

### Modifier les réponses émotionnelles

Cherche `emotionsData`. Chaque émotion :
```js
fatiguee: {
  label: "fatiguée",
  message: "Message principal...",
  mini: [
    "Petite pensée 1",
    "Petite pensée 2"
  ]
}
```

### Modifier les messages après dessin

Cherche `messagesApresDessin`. C'est un simple tableau de phrases.

### Modifier le texte de l'œuvre finale

Cherche `oeuvreTexteFixe` et `oeuvreSignature`.

---

## 🖼️ Ajouter une image dans la galerie

1. Dépose ton image dans le dossier `assets/`
2. Dans `script.js`, dans `gallerieData`, change :
   ```js
   image: null
   ```
   par :
   ```js
   image: "assets/nom-de-ton-image.jpg"
   ```

---

## 🚀 Déployer sur Netlify (drag & drop)

1. Va sur [netlify.com](https://netlify.com) et connecte-toi
2. Clique sur **"Add new site"** → **"Deploy manually"**
3. Glisse-dépose le **dossier entier** du projet dans la zone
4. Netlify génère automatiquement une URL (ex: `joyful-cake-123.netlify.app`)
5. Tu peux personnaliser l'URL dans les paramètres du site

### Pour mettre à jour le site

1. Modifie les fichiers en local
2. Retourne sur Netlify → ton site → onglet **"Deploys"**
3. Glisse à nouveau le dossier entier

---

## 💡 Conseils

- Teste toujours en local avant de déployer (ouvre `index.html` directement dans Firefox/Chrome)
- Le site fonctionne entièrement sans connexion internet (sauf les Google Fonts)
- Pour les Google Fonts hors ligne : copie les fichiers de polices localement si besoin
