/**
 * ================================================================
 * SCRIPT.JS — Pour toi, un espace à nous
 * ----------------------------------------------------------------
 * Pour modifier le contenu du site (textes, images, messages),
 * cherche les sections marquées :
 *    ✏️  MODIFIER ICI
 * ----------------------------------------------------------------
 * Pour AJOUTER du contenu, cherche les sections marquées :
 *    ➕ AJOUTER ICI
 * ================================================================
 */

/* ================================================================
   ✏️  MODIFIER ICI — GALERIE DE LA RELATION
   ----------------------------------------------------------------
   Chaque objet contient :
   - id       : identifiant unique (ne pas changer une fois créé)
   - categorie: "debut" | "calme" | "aimer" | "voir"
   - titre    : titre de la carte
   - texte    : texte sous la carte (dans la modal)
   - image    : chemin vers l'image (ex: "assets/photo1.jpg")
                Si pas d'image, utiliser null — un emoji s'affiche
   - emoji    : emoji de remplacement si pas d'image
   ----------------------------------------------------------------
   ➕ POUR AJOUTER : copier un bloc { } et le coller dans le tableau
================================================================ */
const gallerieData = [
  {
    id: 1,
    categorie: "debut",
    titre: "Le premier soir",
    texte: "Je me souviens encore de la lumière ce jour-là. Et de toi, qui regardais ailleurs, et puis vers moi.",
    image: null,
    emoji: "🌙"
  },
  {
    id: 2,
    categorie: "debut",
    titre: "La première fois qu'on a ri",
    texte: "Ce rire inattendu, qui a tout changé. Je ne savais pas encore que c'était le début de tout.",
    image: null,
    emoji: "✨"
  },
  {
    id: 3,
    categorie: "calme",
    titre: "Un dimanche sans rien",
    texte: "Ces moments où on n'a rien à faire, rien à prouver. Juste être là. C'est ce que je préfère.",
    image: null,
    emoji: "☁️"
  },
  {
    id: 4,
    categorie: "calme",
    titre: "Le silence qu'on partage",
    texte: "Avec toi, le silence n'est pas vide. Il est doux. Il dit des choses que les mots ne sauraient pas dire.",
    image: null,
    emoji: "🕊️"
  },
  {
    id: 5,
    categorie: "calme",
    titre: "Les après-midis lents",
    texte: "Quand le temps ralentit et qu'on reste ensemble sans but. Ces instants-là, je les garde précieusement.",
    image: null,
    emoji: "🍃"
  },
  {
    id: 6,
    categorie: "aimer",
    titre: "Ta façon de te concentrer",
    texte: "Quand tu dessines, tu n'es plus tout à fait là — et pourtant tu es entièrement toi. Je pourrais te regarder faire ça des heures.",
    image: null,
    emoji: "✏️"
  },
  {
    id: 7,
    categorie: "aimer",
    titre: "Ta sensibilité",
    texte: "Tu ressens les choses profondément. Ce n'est pas une faiblesse — c'est ce qui te rend si vivante, si vraie.",
    image: null,
    emoji: "🌸"
  },
  {
    id: 8,
    categorie: "aimer",
    titre: "Ta curiosité",
    texte: "La façon dont tu observes le monde — les détails, les textures, les petits riens. Tu vois des choses que les autres ne voient pas.",
    image: null,
    emoji: "🔍"
  },
  {
    id: 9,
    categorie: "voir",
    titre: "Une force tranquille",
    texte: "Tu traverses des choses difficiles avec une grâce que tu ne vois pas en toi. Moi, je la vois.",
    image: null,
    emoji: "🌊"
  },
  {
    id: 10,
    categorie: "voir",
    titre: "Une artiste qui s'ignore",
    texte: "Ce que tu crées avec tes mains — les lignes, les formes, les couleurs — ce n'est pas « juste » du dessin. C'est une façon d'exister.",
    image: null,
    emoji: "🎨"
  },
  {
    id: 11,
    categorie: "voir",
    titre: "Quelqu'un qui mérite d'être vu",
    texte: "Pas interprété. Pas corrigé. Pas simplifié. Juste vu, tel que tu es. Et ce que je vois est beau.",
    image: null,
    emoji: "💫"
  }
];

/* ================================================================
   ✏️  MODIFIER ICI — SECTION COMPRENDRE
   ----------------------------------------------------------------
   Chaque objet contient :
   - titre : l'observation (phrase courte)
   - texte : l'explication sincère
   ----------------------------------------------------------------
   ➕ POUR AJOUTER : copier un bloc { } dans le tableau
================================================================ */
const comprendreData = [
  {
    titre: "Le monde peut être trop fort",
    texte: "Quand tout arrive en même temps — les bruits, les visages, les attentes — ce n'est pas une plainte. C'est une réalité. Et j'apprends à en tenir compte."
  },
  {
    titre: "Tu as besoin de temps pour traiter",
    texte: "Certaines conversations ont besoin de reposer avant d'être répondues. Ce n'est pas de la froideur. C'est de l'honnêteté."
  },
  {
    titre: "La routine est une ancre",
    texte: "Ce n'est pas de la rigidité. C'est une façon de garder les pieds sur terre quand le monde bouge trop vite autour de toi."
  },
  {
    titre: "Ton art parle quand les mots manquent",
    texte: "Ce que tu dessines n'est pas une décoration. C'est une traduction. Et je lis tes dessins avec autant d'attention que tes mots."
  },
  {
    titre: "Certains contacts sont trop intenses",
    texte: "Je ne prendrai jamais ton besoin d'espace comme un rejet. L'espace est parfois ce qui permet de rester ensemble vraiment."
  },
  {
    titre: "Tu n'as pas à te justifier d'être toi",
    texte: "Ici, dans cet espace, et avec moi — tu peux exister sans explications. Sans performance. Sans effort de traduction."
  }
];

/* ================================================================
   ✏️  MODIFIER ICI — UNIVERS INTERACTIF (étoiles cliquables)
   ----------------------------------------------------------------
   Chaque objet contient :
   - label   : texte affiché sous l'étoile
   - message : message affiché au clic
   - x, y    : position en % (0-100)
   - emoji   : symbole de l'étoile
   ----------------------------------------------------------------
   ➕ POUR AJOUTER : copier un bloc { } dans le tableau
================================================================ */
const universObjets = [
  {
    label: "Notre étoile",
    message: "Si on pouvait choisir une étoile à nous, ce serait une petite, discrète, mais constante. Comme nous.",
    x: 25, y: 20,
    emoji: "⭐"
  },
  {
    label: "Un souvenir doux",
    message: "Je pense parfois à ces moments où on ne faisait rien d'important, et c'était parfait.",
    x: 65, y: 15,
    emoji: "✨"
  },
  {
    label: "Un vœu",
    message: "Mon vœu, cette année encore : qu'on continue à apprendre à se connaître. Il y a encore tellement de toi à découvrir.",
    x: 45, y: 35,
    emoji: "🌟"
  },
  {
    label: "Un endroit à nous",
    message: "On n'a pas besoin d'un lieu physique. Notre endroit à nous, c'est quand on est ensemble et qu'on n'a rien à prouver.",
    x: 80, y: 40,
    emoji: "🌙"
  },
  {
    label: "Ce que je ressens",
    message: "Il y a des choses que je n'arrive pas encore bien à dire. Mais si je pouvais les dessiner, elles ressembleraient à une lumière douce qui ne s'éteint pas.",
    x: 15, y: 55,
    emoji: "💫"
  },
  {
    label: "Pour toi",
    message: "Ce site entier est une lettre. Chaque section est un paragraphe. Et le message est simple : je te vois, je te remercie d'exister.",
    x: 55, y: 60,
    emoji: "🕊️"
  },
  {
    label: "Notre futur",
    message: "Je ne sais pas où on sera dans un an. Mais je veux qu'on y soit ensemble, dans le calme, chacun avec notre espace, et les mains qui se touchent parfois.",
    x: 35, y: 75,
    emoji: "🌸"
  },
  {
    label: "Ton art",
    message: "Chaque fois que tu crées quelque chose, tu laisses une trace dans le monde. Ces traces me touchent. Elles resteront.",
    x: 75, y: 70,
    emoji: "✏️"
  }
];

/* ================================================================
   ✏️  MODIFIER ICI — TRADUCTEUR ÉMOTIONNEL
   ----------------------------------------------------------------
   Chaque clé correspond à un bouton d'émotion.
   - label    : texte du bouton
   - message  : message principal
   - mini     : tableau de petits gestes / pensées (optionnel)
   ----------------------------------------------------------------
   ➕ POUR AJOUTER une émotion : ajouter une nouvelle clé
      ET dans index.html, ajouter un data-emotion correspondant
================================================================ */
const emotionsData = {
  fatiguee: {
    label: "fatiguée",
    message: "Tu as le droit d'être fatiguée. Le monde demande beaucoup. Tu n'as rien à accomplir ce soir.",
    mini: [
      "Pose-toi quelque part de doux.",
      "Tu n'as pas besoin de parler.",
      "Si tu veux juste être là, c'est suffisant.",
      "La fatigue n'est pas un échec."
    ]
  },
  submergee: {
    label: "submergée",
    message: "Trop de choses en même temps. C'est réel. Tu n'es pas fragile — tu es humaine et sensible, et ça mérite du respect.",
    mini: [
      "Respire. Une seule chose à la fois.",
      "Tu n'as pas à tout gérer maintenant.",
      "Dis-moi ce dont tu as besoin. Ou dis rien.",
      "Je suis là, pas pour résoudre — juste pour être."
    ]
  },
  heureuse: {
    label: "heureuse",
    message: "Cette douceur que tu ressens — laisse-la être. Tu mérites le bonheur sans le questionner.",
    mini: [
      "Garde cet instant dans ta mémoire.",
      "La joie n'a pas besoin d'une raison parfaite.",
      "C'est beau, toi heureuse.",
      "Profites-en entièrement."
    ]
  },
  doute: {
    label: "dans le doute",
    message: "Le doute fait partie de toi. Il ne veut pas dire que tu te trompes — il veut dire que tu réfléchis avec soin.",
    mini: [
      "Tu n'as pas à décider maintenant.",
      "Tes questions sont valides.",
      "On peut explorer le doute ensemble.",
      "Douter de soi n'est pas la même chose que se tromper."
    ]
  },
  colere: {
    label: "en colère",
    message: "La colère t'appartient. Elle dit quelque chose d'important. Tu as le droit de la ressentir sans t'en excuser.",
    mini: [
      "Ce que tu ressens est légitime.",
      "Tu n'as pas à la faire taire.",
      "Elle passera, mais pour l'instant — laisse-la exister.",
      "Si tu veux en parler, je t'écoute."
    ]
  },
  joie: {
    label: "dans la joie",
    message: "Cette légèreté que tu ressens — c'est la tienne. Elle est vraie. Elle est belle.",
    mini: [
      "Reste dans cet instant.",
      "La joie mérite d'être célébrée.",
      "Partage-la si tu veux, garde-la si tu préfères.",
      "Je suis heureux·se pour toi."
    ]
  }
};

/* ================================================================
   ✏️  MODIFIER ICI — MESSAGES APRÈS DESSIN
   Un message est choisi aléatoirement après que tu aies dessiné.
   ➕ POUR AJOUTER : ajouter une chaîne de texte dans le tableau
================================================================ */
const messagesApresDessin = [
  "Ce que tu viens de créer n'existait pas avant. Maintenant, il est là, à cause de toi.",
  "Je ne sais pas ce que tu as dessiné, mais je sais que ça vient de toi. Et ça le rend précieux.",
  "Chaque trait que tu fais est une pensée que tu as transformée en forme. C'est de l'art.",
  "Tu pourrais faire ça mille fois et chaque fois serait différente. C'est ça, ta façon de voir le monde.",
  "Merci de m'avoir laissé voir ça.",
  "Ce dessin est à toi. Et il me touche.",
  "Parfois les mots ne suffisent pas. Les lignes, si.",
  "Je garderai ça précieusement, même si c'est invisible pour moi. Je sais que tu l'as créé."
];

/* ================================================================
   ✏️  MODIFIER ICI — TEXTE DE L'ŒUVRE FINALE
   Ce texte apparaît sur l'image générée de l'œuvre finale.
================================================================ */
const oeuvreTexteFixe = "Pour toi — avec tout ce que les mots ne savent pas dire.";
const oeuvreSignature = "Notre espace, à nous deux.";


/* ================================================================
   NE PAS MODIFIER EN DESSOUS — CODE TECHNIQUE
================================================================ */

// ── Navigation ──────────────────────────────────────────────────
let sectionActive = "accueil";

function naviguer(cible) {
  if (cible === sectionActive) return;

  const loader = document.getElementById("loader-transition");
  loader.classList.add("visible");

  setTimeout(() => {
    // Désactiver l'ancienne section
    const ancienne = document.getElementById(sectionActive);
    if (ancienne) ancienne.classList.remove("active");

    // Activer la nouvelle
    const nouvelle = document.getElementById(cible);
    if (nouvelle) nouvelle.classList.add("active");

    sectionActive = cible;

    // Afficher/masquer nav
    const nav = document.getElementById("nav-principale");
    if (cible === "accueil") {
      nav.hidden = true;
    } else {
      nav.hidden = false;
      // Marquer bouton actif
      nav.querySelectorAll("button[data-page]").forEach(btn => {
        btn.classList.toggle("actif", btn.dataset.page === cible);
      });
    }

    // Scroll en haut
    if (nouvelle) nouvelle.scrollTop = 0;

    // Init spécifique à la section
    if (cible === "galerie")   initGalerie();
    if (cible === "comprendre") initComprendre();
    if (cible === "univers")   initUnivers();
    if (cible === "dessin")    initDessin();
    if (cible === "emotions")  initEmotions();
    if (cible === "photos")    initPhotos();
    if (cible === "capsules")  initCapsules();
    if (cible === "albums")    initAlbums();
    if (cible === "voyages")   initVoyages();
    if (cible === "souhaits")  initSouhaits();

    loader.classList.remove("visible");
  }, 300);
}

// ── Particules accueil ───────────────────────────────────────────
(function initParticulesAccueil() {
  const canvas = document.getElementById("particules-canvas");
  const ctx = canvas.getContext("2d");
  let particules = [];
  let animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function creerParticules() {
    particules = [];
    const n = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < n; i++) {
      particules.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        opacite: Math.random() * 0.4 + 0.1
      });
    }
  }

  function dessiner() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particules.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 160, 140, ${p.opacite})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    animId = requestAnimationFrame(dessiner);
  }

  resize();
  creerParticules();
  dessiner();
  window.addEventListener("resize", () => { resize(); creerParticules(); });
})();

// ── Galerie ──────────────────────────────────────────────────────
let galerieFiltreActuel = "tous";

function initGalerie() {
  filtrerGalerie(galerieFiltreActuel);
}

function filtrerGalerie(categorie) {
  galerieFiltreActuel = categorie;

  // Mise à jour boutons filtres
  document.querySelectorAll(".filtre").forEach(btn => {
    btn.classList.toggle("actif", btn.dataset.cat === categorie);
  });

  const grille = document.getElementById("galerie-grille");
  const items = categorie === "tous"
    ? gallerieData
    : gallerieData.filter(item => item.categorie === categorie);

  // Effacer et re-remplir
  grille.innerHTML = "";

  const labels = { debut: "Notre début", calme: "Moments calmes", aimer: "Ce que j'aime", voir: "Ce que je vois" };

  items.forEach((item, index) => {
    const carte = document.createElement("article");
    carte.className = "galerie-carte";
    carte.setAttribute("role", "listitem");
    carte.setAttribute("tabindex", "0");
    carte.setAttribute("aria-label", item.titre);
    carte.style.animationDelay = `${index * 0.07}s`;

    // Image ou placeholder emoji
    let imageHTML = "";
    if (item.image) {
      imageHTML = `<img src="${item.image}" alt="${item.titre}" class="galerie-carte-image" loading="lazy" />`;
    } else {
      imageHTML = `<div class="galerie-placeholder" aria-hidden="true">${item.emoji || "✦"}</div>`;
    }

    carte.innerHTML = `
      ${imageHTML}
      <div class="galerie-carte-corps">
        <span class="galerie-carte-categorie">${labels[item.categorie] || item.categorie}</span>
        <h3 class="galerie-carte-titre">${item.titre}</h3>
        <p class="galerie-carte-texte">${item.texte.substring(0, 80)}…</p>
      </div>
    `;

    carte.addEventListener("click", () => ouvrirModal(item));
    carte.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") ouvrirModal(item); });

    grille.appendChild(carte);
  });
}

function ouvrirModal(item) {
  const modal = document.getElementById("modal-galerie");
  const img   = document.getElementById("modal-image");
  const titre = document.getElementById("modal-titre");
  const texte = document.getElementById("modal-texte");

  if (item.image) {
    img.src = item.image;
    img.alt = item.titre;
    img.hidden = false;
  } else {
    img.hidden = true;
  }

  titre.textContent = item.titre;
  texte.textContent = item.texte;

  modal.hidden = false;
  modal.querySelector(".modal-fermer").focus();
}

function fermerModal() {
  document.getElementById("modal-galerie").hidden = true;
}

// Fermer modal avec Échap
document.addEventListener("keydown", e => {
  if (e.key === "Escape") fermerModal();
});

// ── Comprendre ───────────────────────────────────────────────────
function initComprendre() {
  const liste = document.getElementById("comprendre-liste");
  if (liste.children.length > 0) return; // déjà initialisé

  comprendreData.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "comprendre-item";
    div.style.animationDelay = `${i * 0.12}s`;
    div.innerHTML = `<h3>${item.titre}</h3><p>${item.texte}</p>`;
    liste.appendChild(div);
  });
}

// ── Univers interactif ───────────────────────────────────────────
let cielInitialise = false;

function initUnivers() {
  // Toujours réinitialiser les objets cliquables (les données peuvent avoir changé)
  const conteneurCheck = document.getElementById("univers-objets");
  if (cielInitialise && conteneurCheck && conteneurCheck.children.length === universObjets.length) return;
  if (!cielInitialise) cielInitialise = true;

  // Canvas étoilé
  const canvas = document.getElementById("ciel-canvas");
  const ctx = canvas.getContext("2d");
  let etoiles = [];

  function resizeCiel() {
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
    genererEtoiles();
    dessinerCiel();
  }

  function genererEtoiles() {
    etoiles = [];
    const n = Math.floor((canvas.width * canvas.height) / 4000);
    for (let i = 0; i < n; i++) {
      etoiles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        opacite: Math.random() * 0.7 + 0.2,
        delai: Math.random() * 3
      });
    }
  }

  function dessinerCiel() {
    // Fond dégradé nuit
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "#050310");
    grad.addColorStop(0.5, "#0d0a1a");
    grad.addColorStop(1, "#1a0f28");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Nébuleuse douce
    const neb = ctx.createRadialGradient(
      canvas.width * 0.35, canvas.height * 0.45, 0,
      canvas.width * 0.35, canvas.height * 0.45, canvas.width * 0.4
    );
    neb.addColorStop(0, "rgba(100, 70, 150, 0.08)");
    neb.addColorStop(1, "transparent");
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Étoiles
    etoiles.forEach(e => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 200, ${e.opacite})`;
      ctx.fill();
    });
  }

  resizeCiel();
  window.addEventListener("resize", resizeCiel);

  // Animation scintillement
  let t = 0;
  function scintiller() {
    t += 0.01;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerCiel();
    // Quelques étoiles scintillent
    etoiles.forEach((e, i) => {
      if (i % 5 === 0) {
        const opaciteAnim = e.opacite * (0.5 + 0.5 * Math.sin(t + e.delai * 2));
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${opaciteAnim})`;
        ctx.fill();
      }
    });
    requestAnimationFrame(scintiller);
  }
  scintiller();

  // Objets cliquables — toujours reconstruire
  const conteneur = document.getElementById("univers-objets");
  conteneur.innerHTML = "";

  universObjets.forEach((obj, i) => {
    const btn = document.createElement("button");
    btn.className = "univers-etoile";
    btn.style.left = `${obj.x}%`;
    btn.style.top  = `${obj.y}%`;
    btn.setAttribute("aria-label", obj.label);
    btn.innerHTML = `
      <span class="etoile-inner" style="animation-delay:${i*0.3}s">${obj.emoji}</span>
      <span class="etoile-label">${obj.label}</span>
    `;
    btn.addEventListener("click", () => afficherUniversMessage(obj.message));
    conteneur.appendChild(btn);
  });
}

function afficherUniversMessage(message) {
  const div   = document.getElementById("univers-message");
  const texte = document.getElementById("univers-message-texte");
  texte.textContent = message;
  div.hidden = false;
}

function fermerUniversMessage() {
  document.getElementById("univers-message").hidden = true;
}

// ── Dessin interactif ────────────────────────────────────────────
let dessinInitialise = false;
let dessinCtx, dessinEnCours = false, dessinCouleur = "#c9a8d4", dessinTaille = 4;
let dernierX = 0, dernierY = 0;

function initDessin() {
  if (dessinInitialise) return;
  dessinInitialise = true;

  const canvas = document.getElementById("dessin-canvas");
  dessinCtx = canvas.getContext("2d");

  // Taille responsive
  function redimensionnerCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = rect.height;
    dessinCtx.fillStyle = "#fdfaf5";
    dessinCtx.fillRect(0, 0, canvas.width, canvas.height);
  }
  redimensionnerCanvas();
  window.addEventListener("resize", redimensionnerCanvas);

  // Souris
  canvas.addEventListener("mousedown",  e => { dessinEnCours = true; [dernierX, dernierY] = posCanvas(e, canvas); });
  canvas.addEventListener("mousemove",  e => { if (dessinEnCours) tracerTrait(e, canvas); });
  canvas.addEventListener("mouseup",    ()   => { dessinEnCours = false; dessinCtx.beginPath(); });
  canvas.addEventListener("mouseleave", ()   => { dessinEnCours = false; dessinCtx.beginPath(); });

  // Tactile
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    dessinEnCours = true;
    [dernierX, dernierY] = posCanvas(e.touches[0], canvas);
  }, { passive: false });
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    if (dessinEnCours) tracerTrait(e.touches[0], canvas);
  }, { passive: false });
  canvas.addEventListener("touchend", () => { dessinEnCours = false; dessinCtx.beginPath(); });
}

function posCanvas(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return [e.clientX - rect.left, e.clientY - rect.top];
}

function tracerTrait(e, canvas) {
  const [x, y] = posCanvas(e, canvas);
  dessinCtx.strokeStyle = dessinCouleur;
  dessinCtx.lineWidth   = dessinTaille;
  dessinCtx.lineCap     = "round";
  dessinCtx.lineJoin    = "round";
  dessinCtx.beginPath();
  dessinCtx.moveTo(dernierX, dernierY);
  dessinCtx.lineTo(x, y);
  dessinCtx.stroke();
  [dernierX, dernierY] = [x, y];
}

function choisirCouleur(btn) {
  dessinCouleur = btn.dataset.couleur;
  document.querySelectorAll(".couleur-btn").forEach(b => b.classList.remove("actif"));
  btn.classList.add("actif");
}

function changerTaille(val) {
  dessinTaille = parseInt(val);
}

function effacerDessin() {
  const canvas = document.getElementById("dessin-canvas");
  dessinCtx.fillStyle = "#fdfaf5";
  dessinCtx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("message-apres-dessin").hidden = true;
}

function telechargerDessin() {
  const canvas = document.getElementById("dessin-canvas");
  const lien   = document.createElement("a");
  lien.download = "mon-dessin.png";
  lien.href     = canvas.toDataURL();
  lien.click();
}

async function validerDessin() {
  const msgs = messagesApresDessin;
  const msg  = msgs[Math.floor(Math.random() * msgs.length)];
  const div  = document.getElementById("message-apres-dessin");
  document.getElementById("message-apres-texte").textContent = msg;
  div.hidden = false;
  div.scrollIntoView({ behavior: "smooth", block: "nearest" });
  // Sauvegarder dans Supabase si connecté
  await sauvegarderDessinEnLigne("dessin-canvas", "dessin", msg);
}

// ── Traducteur émotionnel ─────────────────────────────────────────
function initEmotions() {
  const conteneur = document.getElementById("emotions-boutons");
  if (conteneur.children.length > 0) return;

  Object.entries(emotionsData).forEach(([cle, val]) => {
    const btn = document.createElement("button");
    btn.className = "emotion-btn";
    btn.dataset.emotion = cle;
    btn.textContent = val.label;
    btn.setAttribute("aria-label", `Je me sens ${val.label}`);
    btn.addEventListener("click", () => afficherEmotion(cle));
    conteneur.appendChild(btn);
  });
}

function afficherEmotion(cle) {
  const data = emotionsData[cle];
  if (!data) return;

  const reponse = document.getElementById("emotions-reponse");
  document.getElementById("emotions-message").textContent = data.message;

  const minis = document.getElementById("emotions-minis");
  minis.innerHTML = "";
  (data.mini || []).forEach(m => {
    const p = document.createElement("p");
    p.className = "emotions-mini-item";
    p.textContent = "✦ " + m;
    minis.appendChild(p);
  });

  reponse.hidden = false;
  reponse.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ── Œuvre finale ─────────────────────────────────────────────────
let imageOeuvreData = null;

function chargerImageOeuvre(event) {
  const fichier = event.target.files[0];
  if (!fichier) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    imageOeuvreData = e.target.result;
    const apercu = document.getElementById("oeuvre-apercu");
    apercu.src    = e.target.result;
    apercu.hidden = false;
  };
  reader.readAsDataURL(fichier);
}

function genererOeuvre() {
  const messagePersonnel = document.getElementById("oeuvre-message-input").value.trim();
  const canvas = document.getElementById("oeuvre-canvas");
  const ctx    = canvas.getContext("2d");

  // Dimensions
  canvas.width  = 800;
  canvas.height = 600;

  // Fond papier crème
  ctx.fillStyle = "#f5f0e8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texture légère
  for (let i = 0; i < 2000; i++) {
    ctx.fillStyle = `rgba(180, 160, 140, ${Math.random() * 0.03})`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
  }

  // Bordure délicate
  ctx.strokeStyle = "#c8b49a";
  ctx.lineWidth = 1;
  ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);
  ctx.strokeStyle = "rgba(200, 180, 154, 0.4)";
  ctx.lineWidth = 0.5;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Image uploadée
  const imageY = 80;
  const imageH = messagePersonnel ? 280 : 380;

  function dessinerTextes() {
    // Texte fixe en haut
    ctx.fillStyle = "#8c7560";
    ctx.font = "italic 15px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(oeuvreTexteFixe, canvas.width / 2, 54);

    // Message personnel
    if (messagePersonnel) {
      ctx.fillStyle = "#4a3728";
      ctx.font = "16px 'Lato', sans-serif";
      const lignes = decomposerTexte(ctx, messagePersonnel, canvas.width - 120, 16);
      const yStart = imageOeuvreData ? imageY + imageH + 36 : 160;
      lignes.forEach((ligne, i) => {
        ctx.fillText(ligne, canvas.width / 2, yStart + i * 26);
      });
    }

    // Signature
    ctx.fillStyle = "#8c7560";
    ctx.font = "italic 13px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(oeuvreSignature, canvas.width / 2, canvas.height - 40);

    // Date
    const date = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillStyle = "#c8b49a";
    ctx.font = "11px 'Lato', sans-serif";
    ctx.fillText(date, canvas.width / 2, canvas.height - 20);

    // Afficher le résultat
    document.getElementById("oeuvre-resultat").hidden = false;
    document.getElementById("oeuvre-resultat").scrollIntoView({ behavior: "smooth" });
  }

  if (imageOeuvreData) {
    const img = new Image();
    img.onload = function() {
      // Cadrer l'image centrée
      const ratio   = img.width / img.height;
      const imgW    = Math.min(canvas.width - 120, imageH * ratio);
      const imgX    = (canvas.width - imgW) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imageY, imgW, imageH, 8);
      ctx.clip();
      ctx.drawImage(img, imgX, imageY, imgW, imageH);
      ctx.restore();
      dessinerTextes();
    };
    img.src = imageOeuvreData;
  } else {
    // Ornement central si pas d'image
    ctx.fillStyle = "rgba(213, 200, 232, 0.3)";
    ctx.font = "80px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦", canvas.width / 2, canvas.height / 2 - 40);
    dessinerTextes();
  }
}

function decomposerTexte(ctx, texte, largeurMax, taille) {
  const mots   = texte.split(" ");
  const lignes = [];
  let ligne    = "";

  mots.forEach(mot => {
    const test = ligne + (ligne ? " " : "") + mot;
    if (ctx.measureText(test).width > largeurMax && ligne) {
      lignes.push(ligne);
      ligne = mot;
    } else {
      ligne = test;
    }
  });
  if (ligne) lignes.push(ligne);
  return lignes;
}

function telechargerOeuvre() {
  const canvas = document.getElementById("oeuvre-canvas");
  const lien   = document.createElement("a");
  lien.download = "notre-oeuvre.png";
  lien.href     = canvas.toDataURL("image/png");
  lien.click();
}

function telechargerTexte() {
  const message = document.getElementById("oeuvre-message-input").value.trim();
  const contenu = `${oeuvreTexteFixe}\n\n${message || "(sans message)"}\n\n${oeuvreSignature}\n${new Date().toLocaleDateString("fr-FR")}`;
  const blob    = new Blob([contenu], { type: "text/plain;charset=utf-8" });
  const lien    = document.createElement("a");
  lien.download = "notre-message.txt";
  lien.href     = URL.createObjectURL(blob);
  lien.click();
}

// ── Polyfill roundRect si absent ─────────────────────────────────
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2*r) r = w/2;
    if (h < 2*r) r = h/2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y, x+w, y+h, r);
    this.arcTo(x+w, y+h, x, y+h, r);
    this.arcTo(x, y+h, x, y, r);
    this.arcTo(x, y, x+w, y, r);
    this.closePath();
    return this;
  };
}

// ── Initialisation gérée en bas du fichier ──

/* ================================================================
   ✏️  MODIFIER ICI — PHOTOS DE NOUS
   ----------------------------------------------------------------
   Chaque photo contient :
   - legende  : texte affiché sur la photo au survol et en modal
   - date     : date de la photo (texte libre, ex: "Juillet 2023")
   - image    : chemin vers l'image (ex: "assets/photo1.jpg")
                Si null → un placeholder coloré s'affiche
   - emoji    : emoji du placeholder si pas d'image
   - hero     : true = cette photo s'affiche en grand en haut
                (une seule photo hero à la fois)
   ----------------------------------------------------------------
   ➕ POUR AJOUTER : copier un bloc { } dans le tableau
================================================================ */
const photosData = [
  {
    legende: "Notre premier souvenir ensemble",
    date: "Le début",
    image: null,
    emoji: "🌸",
    hero: true
  },
  {
    legende: "Un moment doux",
    date: "Un jour précieux",
    image: null,
    emoji: "☀️",
    hero: false
  },
  {
    legende: "Quand on riait",
    date: "Un soir qu'on oubliera pas",
    image: null,
    emoji: "✨",
    hero: false
  },
  {
    legende: "Nos mains",
    date: "Quelque part, ensemble",
    image: null,
    emoji: "🤝",
    hero: false
  },
  {
    legende: "Un endroit à nous",
    date: "À compléter",
    image: null,
    emoji: "🏡",
    hero: false
  },
  {
    legende: "Ajoute une photo ici",
    date: "assets/votre-photo.jpg dans script.js",
    image: null,
    emoji: "📷",
    hero: false
  }
];

/* ================================================================
   ✏️  MODIFIER ICI — CAPSULES TEMPORELLES
   ----------------------------------------------------------------
   Chaque capsule contient :
   - id         : identifiant unique
   - titre      : nom de la capsule
   - dateOuvert : date de déverrouillage au format ISO "YYYY-MM-DD"
   - icone      : emoji affiché
   - contenu    : tableau de paragraphes (visibles après déverouillage)
   ----------------------------------------------------------------
   Les 3 capsules préconfigurées :
   • "anniversaire" → 15 février (chaque année, s'ouvre au 15/02)
   • "5ans"         → 5 ans après aujourd'hui
   • "10ans"        → 10 ans après aujourd'hui
   ----------------------------------------------------------------
   ⚠️  Pour la capsule anniversaire, la date se recalcule chaque
       année automatiquement — tu n'as rien à changer.
   ⚠️  Pour les capsules 5 ans / 10 ans, change les dates manuellement
       selon votre date de début de relation.
================================================================ */

// Date de début de votre relation (format: YYYY-MM-DD)
// ✏️ MODIFIER CETTE DATE selon votre vrai anniversaire de couple
const DEBUT_RELATION = "2024-02-15";

function calculerDateCapsule(annees) {
  const d = new Date(DEBUT_RELATION);
  d.setFullYear(d.getFullYear() + annees);
  return d.toISOString().split("T")[0];
}

function prochainAnniversaire() {
  const maintenant = new Date();
  const annee = maintenant.getFullYear();
  let prochain = new Date(`${annee}-02-15`);
  if (prochain <= maintenant) {
    prochain = new Date(`${annee + 1}-02-15`);
  }
  return prochain.toISOString().split("T")[0];
}

const capsulesData = [
  {
    id: "anniversaire",
    titre: "Pour notre anniversaire",
    icone: "💌",
    dateOuvert: prochainAnniversaire(), // S'ouvre chaque 15 février
    contenu: [
      "Joyeux anniversaire, mon amour.",
      "Un an de plus. Un an de douceur, de silences partagés, de moments où j'ai su — encore une fois — que c'est toi.",
      "Je ne sais pas toujours trouver les mots au bon moment. Alors je les écris ici, à l'avance, pour être sûr·e qu'ils arrivent.",
      "Merci d'être toi. Merci d'être là. Merci de me laisser être moi à côté de toi.",
      "Cette année encore, je veux apprendre. Apprendre à mieux te connaître. Apprendre à mieux t'aimer.",
      "Bonne année à nous deux. ✦"
    ]
  },
  {
    id: "5ans",
    titre: "Dans 5 ans",
    icone: "🌿",
    dateOuvert: calculerDateCapsule(5),
    contenu: [
      "Si tu lis ça, c'est qu'on a fait cinq ans ensemble. Cinq ans.",
      "Je t'écris depuis ce moment-là, ce début, où tout était encore nouveau et un peu tremblant.",
      "J'espère qu'on a voyagé. J'espère qu'on a ri. J'espère qu'on a surmonté des choses difficiles et que ça nous a rapprochés plutôt qu'éloignés.",
      "J'espère que tu dessines encore. J'espère que tu sais à quel point ton art me touche.",
      "J'espère qu'on a appris à se disputer doucement, et à se réconcilier encore plus doucement.",
      "Dans 5 ans, je ne sais pas encore où on sera. Mais je voulais te dire, depuis maintenant : je t'aime. Et je t'aimerai dans 5 ans aussi.",
      "✦ À toi, dans le futur."
    ]
  },
  {
    id: "10ans",
    titre: "Dans 10 ans",
    icone: "🌳",
    dateOuvert: calculerDateCapsule(10),
    contenu: [
      "Dix ans.",
      "Je n'arrive pas vraiment à imaginer ce que sera notre vie à ce moment-là. Peut-être qu'on a déménagé. Peut-être qu'on a construit quelque chose de grand. Peut-être que les choses ont changé d'une façon que je ne pourrais pas deviner aujourd'hui.",
      "Mais ce que je sais, c'est que je t'écris ça depuis un endroit où je t'aime profondément. Et cet amour-là, il ne disparaît pas. Il se transforme, il grandit, il apprend — mais il reste.",
      "Je voulais qu'il y ait une trace. Quelque chose qui dise : à ce moment précis, j'ai choisi de t'écrire une lettre pour dans dix ans. Parce que tu en valais la peine.",
      "Tu en vaux toujours la peine.",
      "Joyeux anniversaire de nous deux. ✦"
    ]
  }
];

/* ================================================================
   LOGIQUE — PHOTOS
================================================================ */
function initPhotos() {
  const grille = document.getElementById("photos-grille");
  if (grille.children.length > 0) return;

  // Photo hero
  const heroData = photosData.find(p => p.hero);
  if (heroData) {
    const heroDiv = document.getElementById("photos-hero");
    const heroImg = document.getElementById("photos-hero-img");
    const heroLeg = document.getElementById("photos-hero-legende");
    if (heroData.image) {
      heroImg.src = heroData.image;
      heroImg.alt = heroData.legende;
      heroDiv.hidden = false;
    }
    heroLeg.textContent = heroData.legende;
    heroDiv.addEventListener("click", () => ouvrirModalPhoto(heroData));
  }

  // Grille
  photosData.forEach((photo, i) => {
    const carte = document.createElement("div");
    carte.className = "photo-carte";
    carte.setAttribute("role", "listitem");
    carte.setAttribute("tabindex", "0");
    carte.setAttribute("aria-label", photo.legende);
    carte.style.animationDelay = `${i * 0.06}s`;

    if (photo.image) {
      carte.innerHTML = `
        <img src="${photo.image}" alt="${photo.legende}" loading="lazy" />
        <div class="photo-carte-overlay">
          <p class="photo-carte-legende">${photo.legende}</p>
        </div>`;
    } else {
      carte.innerHTML = `
        <div class="photo-carte-placeholder">
          <span>${photo.emoji || "📷"}</span>
          <span>${photo.legende}</span>
        </div>`;
    }

    carte.addEventListener("click", () => ouvrirModalPhoto(photo));
    carte.addEventListener("keydown", e => { if (e.key === "Enter") ouvrirModalPhoto(photo); });
    grille.appendChild(carte);
  });
}

function ouvrirModalPhoto(photo) {
  const modal = document.getElementById("modal-photo");
  const img   = document.getElementById("modal-photo-img");
  const leg   = document.getElementById("modal-photo-legende");
  const date  = document.getElementById("modal-photo-date");

  if (photo.image) {
    img.src    = photo.image;
    img.alt    = photo.legende;
    img.hidden = false;
  } else {
    img.hidden = true;
  }

  leg.textContent  = photo.legende;
  date.textContent = photo.date || "";
  modal.hidden = false;
  modal.querySelector(".modal-fermer").focus();
}

function fermerModalPhoto() {
  document.getElementById("modal-photo").hidden = true;
}

/* ================================================================
   LOGIQUE — CAPSULES TEMPORELLES
================================================================ */
function initCapsules() {
  const liste = document.getElementById("capsules-liste");
  if (liste.children.length > 0) return;

  const maintenant = new Date();
  maintenant.setHours(0, 0, 0, 0);

  capsulesData.forEach((capsule, i) => {
    const dateOuverture = new Date(capsule.dateOuvert);
    dateOuverture.setHours(0, 0, 0, 0);
    const estOuverte = maintenant >= dateOuverture;

    const div = document.createElement("div");
    div.className = "capsule";
    div.style.animationDelay = `${i * 0.15}s`;

    if (estOuverte) {
      // Capsule déverrouillée
      const paragraphes = capsule.contenu.map(p => `<p>${p}</p>`).join("");
      const dateStr = dateOuverture.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
      div.innerHTML = `
        <div class="capsule-ouverte">
          <div class="capsule-ouverte-header">
            <span class="capsule-verrou-icone">${capsule.icone}</span>
            <h3>${capsule.titre}</h3>
            <span class="capsule-ouverte-sstitre">Ouvert le ${dateStr}</span>
          </div>
          <div class="capsule-ouverte-corps">
            ${paragraphes}
            <span class="capsule-badge-ouvert">✓ Déverrouillé</span>
          </div>
        </div>`;
    } else {
      // Capsule verrouillée avec compte à rebours
      const dateStr = dateOuverture.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
      div.innerHTML = `
        <div class="capsule-verrou">
          <span class="capsule-verrou-icone">🔒</span>
          <h3 class="capsule-verrou-titre">${capsule.titre}</h3>
          <p class="capsule-verrou-date">S'ouvrira le ${dateStr}</p>
          <div class="capsule-compte-rebours" id="rebours-${capsule.id}">
            <div class="capsule-rebours-unite">
              <span class="capsule-rebours-nombre" id="rb-j-${capsule.id}">--</span>
              <span class="capsule-rebours-label">jours</span>
            </div>
            <div class="capsule-rebours-unite">
              <span class="capsule-rebours-nombre" id="rb-h-${capsule.id}">--</span>
              <span class="capsule-rebours-label">heures</span>
            </div>
            <div class="capsule-rebours-unite">
              <span class="capsule-rebours-nombre" id="rb-m-${capsule.id}">--</span>
              <span class="capsule-rebours-label">minutes</span>
            </div>
          </div>
        </div>`;

      // Démarrer le compte à rebours
      mettreAJourRebours(capsule.id, dateOuverture);
      setInterval(() => mettreAJourRebours(capsule.id, dateOuverture), 60000);
    }

    liste.appendChild(div);
  });
}

function mettreAJourRebours(id, dateCible) {
  const maintenant = new Date();
  const diff = dateCible - maintenant;

  if (diff <= 0) {
    // Recharger la section pour afficher la capsule ouverte
    document.getElementById("capsules-liste").innerHTML = "";
    initCapsules();
    return;
  }

  const jours   = Math.floor(diff / (1000 * 60 * 60 * 24));
  const heures  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  const elJ = document.getElementById(`rb-j-${id}`);
  const elH = document.getElementById(`rb-h-${id}`);
  const elM = document.getElementById(`rb-m-${id}`);

  if (elJ) elJ.textContent = jours;
  if (elH) elH.textContent = String(heures).padStart(2, "0");
  if (elM) elM.textContent = String(minutes).padStart(2, "0");
}


/* ================================================================
   ✏️  MODIFIER ICI — ALBUMS PHOTOS
   ----------------------------------------------------------------
   Structure : un album par voyage/thème, chaque album contient
   des dossiers de photos organisés par thème.

   - id       : identifiant unique (slug, pas d'espaces)
   - titre    : nom de l'album
   - lieu     : destination ou contexte
   - date     : date ou période (texte libre)
   - couverture : image de couverture (null = emoji)
   - emoji    : emoji si pas de couverture
   - couleur  : couleur d'accent de l'album (CSS hex)
   - themes   : tableau de thèmes dans l'album
       - nom    : nom du thème
       - emoji  : icône du thème
       - photos : tableau de photos { src, legende }
   ----------------------------------------------------------------
   ➕ POUR AJOUTER UN ALBUM : copier un bloc complet { id, ... }
   ➕ POUR AJOUTER UN THÈME : copier un bloc { nom, emoji, photos }
   ➕ POUR AJOUTER UNE PHOTO : { src: "assets/voyages/xxx.jpg", legende: "..." }
================================================================ */
const albumsData = [
  {
    id: "barcelone",
    titre: "Barcelone",
    lieu: "Espagne",
    date: "À compléter",
    couverture: null,
    emoji: "🇪🇸",
    couleur: "#e8a87c",
    themes: [
      { nom: "Paysages", emoji: "🏙️", photos: [
        { src: null, legende: "La Sagrada Família" },
        { src: null, legende: "Les toits depuis le Parc Güell" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Notre premier selfie là-bas" }
      ]},
      { nom: "Repas & saveurs", emoji: "🥘", photos: [
        { src: null, legende: "Les tapas du premier soir" }
      ]}
    ]
  },
  {
    id: "malte",
    titre: "Malte",
    lieu: "Malte",
    date: "À compléter",
    couverture: null,
    emoji: "🇲🇹",
    couleur: "#c8a8d4",
    themes: [
      { nom: "Paysages", emoji: "🌊", photos: [
        { src: null, legende: "La mer turquoise" },
        { src: null, legende: "La vieille ville de La Valette" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Ensemble à Malte" }
      ]}
    ]
  },
  {
    id: "mali",
    titre: "Mali",
    lieu: "Mali",
    date: "À compléter",
    couverture: null,
    emoji: "🇲🇱",
    couleur: "#d4b87c",
    themes: [
      { nom: "Paysages", emoji: "🌅", photos: [
        { src: null, legende: "Un coucher de soleil sur le fleuve" }
      ]},
      { nom: "Rencontres", emoji: "🤝", photos: [
        { src: null, legende: "Les visages croisés" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Notre séjour au Mali" }
      ]}
    ]
  },
  {
    id: "sainte-lucie",
    titre: "Sainte-Lucie",
    lieu: "Caraïbes",
    date: "À compléter",
    couverture: null,
    emoji: "🌴",
    couleur: "#7cc8a8",
    themes: [
      { nom: "Plages", emoji: "🏖️", photos: [
        { src: null, legende: "La plage de Sainte-Lucie" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Sous les cocotiers" }
      ]}
    ]
  },
  {
    id: "martinique",
    titre: "Martinique",
    lieu: "Antilles françaises",
    date: "À compléter",
    couverture: null,
    emoji: "🌺",
    couleur: "#d4a8b8",
    themes: [
      { nom: "Paysages", emoji: "🌋", photos: [
        { src: null, legende: "La Montagne Pelée" }
      ]},
      { nom: "Plages", emoji: "🏖️", photos: [
        { src: null, legende: "Les eaux claires" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "En Martinique ensemble" }
      ]}
    ]
  },
  {
    id: "monaco",
    titre: "Monaco",
    lieu: "Principauté de Monaco",
    date: "À compléter",
    couverture: null,
    emoji: "🎲",
    couleur: "#a8c0d4",
    themes: [
      { nom: "Paysages", emoji: "🌆", photos: [
        { src: null, legende: "Le port de Monaco" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Notre journée à Monaco" }
      ]}
    ]
  },
  {
    id: "portugal",
    titre: "Portugal",
    lieu: "Portugal",
    date: "À compléter",
    couverture: null,
    emoji: "🇵🇹",
    couleur: "#c8d4a8",
    themes: [
      { nom: "Paysages", emoji: "🏛️", photos: [
        { src: null, legende: "Lisbonne et ses ruelles" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Au Portugal ensemble" }
      ]}
    ]
  },
  {
    id: "nice",
    titre: "Nice",
    lieu: "Côte d'Azur, France",
    date: "À compléter",
    couverture: null,
    emoji: "☀️",
    couleur: "#d4c87c",
    themes: [
      { nom: "Promenade", emoji: "🌊", photos: [
        { src: null, legende: "La Promenade des Anglais" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Notre séjour à Nice" }
      ]}
    ]
  },
  {
    id: "togo",
    titre: "Togo",
    lieu: "Lomé, Togo",
    date: "À compléter",
    couverture: null,
    emoji: "🇹🇬",
    couleur: "#a8d4b8",
    themes: [
      { nom: "Paysages", emoji: "🌍", photos: [
        { src: null, legende: "Lomé et ses couleurs" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Notre temps au Togo" }
      ]}
    ]
  },
  {
    id: "angleterre",
    titre: "Angleterre",
    lieu: "Londres, Royaume-Uni",
    date: "À compléter",
    couverture: null,
    emoji: "🇬🇧",
    couleur: "#b8c4d4",
    themes: [
      { nom: "Londres", emoji: "🎡", photos: [
        { src: null, legende: "Big Ben et la Tamise" }
      ]},
      { nom: "Nous deux", emoji: "💑", photos: [
        { src: null, legende: "Notre séjour à Londres" }
      ]}
    ]
  }
];

/* ================================================================
   ✏️  MODIFIER ICI — VOYAGES INTERACTIFS
   ----------------------------------------------------------------
   Chaque voyage contient :
   - id        : identifiant (même que dans albumsData si lié)
   - nom       : nom affiché
   - pays      : pays
   - coords    : { lat, lng } pour la carte du monde
   - fait      : true = voyage fait, false = voyage rêvé
   - annee     : année (texte libre)
   - resume    : texte court de présentation
   - momentsForts : tableau de moments marquants (texte)
   - video     : lien YouTube embed (null si pas de vidéo)
                 Format : "https://www.youtube.com/embed/IDENTIFIANT"
   - photos    : tableau { src, legende } (quelques photos clés)
   - emoji     : emoji destination
   ----------------------------------------------------------------
   ➕ POUR AJOUTER UN VOYAGE : copier un bloc complet
================================================================ */
const voyagesData = [
  {
    id: "barcelone", nom: "Barcelone", pays: "Espagne",
    coords: { lat: 41.38, lng: 2.17 }, fait: true, annee: "À compléter",
    emoji: "🇪🇸",
    resume: "La ville de Gaudí, des tapas, et nous deux perdus dans le labyrinthe de ruelles du Barri Gòtic.",
    momentsForts: [
      "La Sagrada Família au coucher du soleil",
      "Notre premier verre de sangria ensemble",
      "Se perdre dans les ruelles du Barri Gòtic"
    ],
    video: null,
    photos: []
  },
  {
    id: "malte", nom: "Malte", pays: "Malte",
    coords: { lat: 35.93, lng: 14.37 }, fait: true, annee: "À compléter",
    emoji: "🇲🇹",
    resume: "Une île hors du temps, des eaux turquoise, et des couchers de soleil qu'on n'oubliera pas.",
    momentsForts: [
      "La vieille ville de La Valette",
      "La mer turquoise de Comino",
      "Les temples mégalithiques"
    ],
    video: null,
    photos: []
  },
  {
    id: "mali", nom: "Mali", pays: "Mali",
    coords: { lat: 12.65, lng: -8.0 }, fait: true, annee: "À compléter",
    emoji: "🇲🇱",
    resume: "Un voyage qui marque. La chaleur des gens, la lumière du fleuve Niger, des instants gravés.",
    momentsForts: [
      "Le fleuve Niger au coucher du soleil",
      "Les marchés colorés de Bamako",
      "Les rencontres inoubliables"
    ],
    video: null,
    photos: []
  },
  {
    id: "sainte-lucie", nom: "Sainte-Lucie", pays: "Caraïbes",
    coords: { lat: 13.9, lng: -60.98 }, fait: true, annee: "À compléter",
    emoji: "🌴",
    resume: "Les Pitons, les plages de sable noir, et une douceur de vivre qu'on a voulu garder avec nous.",
    momentsForts: [
      "Les Pitons vus depuis la mer",
      "Une plage de sable noir rien qu'à nous",
      "La végétation tropicale luxuriante"
    ],
    video: null,
    photos: []
  },
  {
    id: "martinique", nom: "Martinique", pays: "Antilles françaises",
    coords: { lat: 14.64, lng: -61.02 }, fait: true, annee: "À compléter",
    emoji: "🌺",
    resume: "L'île aux fleurs. Le rhum, la Montagne Pelée, et des eaux cristallines.",
    momentsForts: [
      "La route de la Trace en forêt tropicale",
      "Les couleurs de Saint-Pierre",
      "Nager dans les eaux claires"
    ],
    video: null,
    photos: []
  },
  {
    id: "monaco", nom: "Monaco", pays: "Monaco",
    coords: { lat: 43.74, lng: 7.43 }, fait: true, annee: "À compléter",
    emoji: "🎲",
    resume: "Le plus petit grand pays. Les yachts, les jardins exotiques, et nous deux dans ce décor.",
    momentsForts: [
      "Le port Hercule et ses yachts",
      "Les Jardins exotiques",
      "La vue sur la Méditerranée"
    ],
    video: null,
    photos: []
  },
  {
    id: "portugal", nom: "Portugal", pays: "Portugal",
    coords: { lat: 38.72, lng: -9.14 }, fait: true, annee: "À compléter",
    emoji: "🇵🇹",
    resume: "Lisbonne et ses trams, Porto et son vin. Le fado dans une ruelle et les pastéis de nata.",
    momentsForts: [
      "Les tramways de Lisbonne",
      "Un verre de porto à Porto",
      "Les azulejos bleus partout"
    ],
    video: null,
    photos: []
  },
  {
    id: "nice", nom: "Nice", pays: "France",
    coords: { lat: 43.71, lng: 7.26 }, fait: true, annee: "À compléter",
    emoji: "☀️",
    resume: "La lumière du Sud, la Promenade des Anglais, les marchés du Cours Saleya.",
    momentsForts: [
      "La Promenade des Anglais au soleil",
      "Le marché des fleurs",
      "La vieille ville et ses couleurs"
    ],
    video: null,
    photos: []
  },
  {
    id: "togo", nom: "Togo", pays: "Togo",
    coords: { lat: 6.14, lng: 1.22 }, fait: true, annee: "À compléter",
    emoji: "🇹🇬",
    resume: "Lomé, ses plages, son marché des fétiches, et cette chaleur humaine incomparable.",
    momentsForts: [
      "Les plages de Lomé",
      "Le marché des fétiches",
      "La route des pêcheurs"
    ],
    video: null,
    photos: []
  },
  {
    id: "angleterre", nom: "Angleterre", pays: "Royaume-Uni",
    coords: { lat: 51.51, lng: -0.12 }, fait: true, annee: "À compléter",
    emoji: "🇬🇧",
    resume: "Londres et ses mille visages. Les parcs, les musées gratuits, et le chaos magnifique de Piccadilly.",
    momentsForts: [
      "Hyde Park un dimanche matin",
      "Les musées de South Kensington",
      "Un fish & chips sur un banc"
    ],
    video: null,
    photos: []
  }
];

/* ================================================================
   ✏️  MODIFIER ICI — LISTE DE SOUHAITS (voyages rêvés)
   ----------------------------------------------------------------
   Elle peut modifier cette liste directement sur le site.
   Mais tu peux aussi pré-remplir ici des destinations.

   - id     : identifiant unique
   - nom    : nom du pays/ville
   - emoji  : drapeau ou emoji
   - note   : pourquoi ce voyage (optionnel)
   - fait   : true si déjà visité (se coche automatiquement)
================================================================ */
const souhaitsPreremplis = [
  { id: "japon",     nom: "Japon",          emoji: "🇯🇵", note: "Les cerisiers, Tokyo, la culture", fait: false },
  { id: "islande",   nom: "Islande",         emoji: "🇮🇸", note: "Les aurores boréales", fait: false },
  { id: "maroc",     nom: "Maroc",           emoji: "🇲🇦", note: "Marrakech et le désert", fait: false },
  { id: "new-york",  nom: "New York",        emoji: "🗽", note: "La ville qui ne dort jamais", fait: false },
  { id: "thailande", nom: "Thaïlande",       emoji: "🇹🇭", note: "Les temples et les plages", fait: false },
  { id: "grece",     nom: "Grèce",           emoji: "🇬🇷", note: "Santorin et ses maisons blanches", fait: false },
  { id: "perou",     nom: "Pérou",           emoji: "🇵🇪", note: "Le Machu Picchu", fait: false },
  { id: "australie", nom: "Australie",       emoji: "🇦🇺", note: "L'immensité et la faune", fait: false },
  { id: "maldives",  nom: "Maldives",        emoji: "🏝️", note: "Les bungalows sur l'eau", fait: false },
  { id: "canada",    nom: "Canada",          emoji: "🇨🇦", note: "Les forêts, le Québec", fait: false }
];

/* ================================================================
   LOGIQUE — ALBUMS PHOTOS
================================================================ */
let albumActuel = null;
let albumThemeActuel = null;

function initAlbums() {
  const grille = document.getElementById("albums-grille");
  if (!grille) return;
  if (grille.children.length > 0 && !albumActuel) return;
  afficherListeAlbums();
}

function afficherListeAlbums() {
  albumActuel = null;
  document.getElementById("albums-detail").hidden = true;
  document.getElementById("albums-liste-vue").hidden = false;

  const grille = document.getElementById("albums-grille");
  grille.innerHTML = "";

  albumsData.forEach((album, i) => {
    const total = album.themes.reduce((acc, t) => acc + t.photos.length, 0);
    const card = document.createElement("div");
    card.className = "album-carte";
    card.style.setProperty("--album-couleur", album.couleur);
    card.style.animationDelay = `${i * 0.07}s`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Album ${album.titre}`);

    card.innerHTML = `
      <div class="album-couverture" style="background: linear-gradient(135deg, ${album.couleur}40, ${album.couleur}20)">
        ${album.couverture
          ? `<img src="${album.couverture}" alt="${album.titre}" />`
          : `<span class="album-emoji">${album.emoji}</span>`}
      </div>
      <div class="album-info">
        <h3 class="album-titre">${album.titre}</h3>
        <p class="album-lieu">${album.lieu} · ${album.date}</p>
        <p class="album-compteur">${album.themes.length} thème${album.themes.length > 1 ? "s" : ""} · ${total} photo${total > 1 ? "s" : ""}</p>
      </div>`;

    card.addEventListener("click",   () => ouvrirAlbum(album.id));
    card.addEventListener("keydown", e => { if (e.key === "Enter") ouvrirAlbum(album.id); });
    grille.appendChild(card);
  });
}

function ouvrirAlbum(id) {
  albumActuel = albumsData.find(a => a.id === id);
  if (!albumActuel) return;

  document.getElementById("albums-liste-vue").hidden = true;
  const detail = document.getElementById("albums-detail");
  detail.hidden = false;

  document.getElementById("album-detail-titre").textContent = albumActuel.titre;
  document.getElementById("album-detail-lieu").textContent  = `${albumActuel.lieu} · ${albumActuel.date}`;

  // Onglets thèmes
  const onglets = document.getElementById("album-themes-onglets");
  onglets.innerHTML = "";
  albumActuel.themes.forEach((theme, i) => {
    const btn = document.createElement("button");
    btn.className = "album-theme-onglet" + (i === 0 ? " actif" : "");
    btn.innerHTML = `${theme.emoji} ${theme.nom}`;
    btn.addEventListener("click", () => afficherTheme(theme, btn));
    onglets.appendChild(btn);
  });

  // Afficher premier thème
  if (albumActuel.themes.length > 0) afficherTheme(albumActuel.themes[0], onglets.children[0]);
  detail.scrollIntoView({ behavior: "smooth" });
}

function afficherTheme(theme, btnActif) {
  albumThemeActuel = theme;
  document.querySelectorAll(".album-theme-onglet").forEach(b => b.classList.remove("actif"));
  if (btnActif) btnActif.classList.add("actif");

  const grille = document.getElementById("album-photos-grille");
  grille.innerHTML = "";

  if (theme.photos.length === 0) {
    grille.innerHTML = `<p class="album-vide">Aucune photo encore — ajoute-en dans script.js !</p>`;
    return;
  }

  theme.photos.forEach((photo, i) => {
    const div = document.createElement("div");
    div.className = "album-photo-item";
    div.style.animationDelay = `${i * 0.06}s`;

    if (photo.src) {
      div.innerHTML = `
        <img src="${photo.src}" alt="${photo.legende}" loading="lazy" />
        <div class="album-photo-overlay"><p>${photo.legende}</p></div>`;
      div.style.cursor = "pointer";
      div.addEventListener("click", () => ouvrirPhotoPleine(photo));
    } else {
      div.innerHTML = `
        <div class="album-photo-placeholder">
          <span>${albumActuel.emoji}</span>
          <span>${photo.legende}</span>
        </div>`;
    }
    grille.appendChild(div);
  });
}

let photoPleineSrc = null;
function ouvrirPhotoPleine(photo) {
  const modal = document.getElementById("modal-photo-pleine");
  document.getElementById("modal-photo-pleine-img").src = photo.src;
  document.getElementById("modal-photo-pleine-leg").textContent = photo.legende;
  modal.hidden = false;
}
function fermerPhotoPleine() {
  document.getElementById("modal-photo-pleine").hidden = true;
}

/* ================================================================
   LOGIQUE — VOYAGES INTERACTIFS
================================================================ */
let voyageActuel = null;
let carteInitialisee = false;

function initVoyages() {
  if (!carteInitialisee) {
    dessinerCarteMonde();
    carteInitialisee = true;
  }
  afficherListeCartePostales();
}

function dessinerCarteMonde() {
  const canvas = document.getElementById("carte-monde-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width  = canvas.offsetWidth  || 800;
  canvas.height = canvas.offsetHeight || 400;

  // Fond océan doux
  ctx.fillStyle = "#c8dce8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Continents simplifiés (formes approximatives)
  ctx.fillStyle = "#d4c8b0";

  // Projection simple : lon/lat → x/y
  function proj(lat, lng) {
    const x = (lng + 180) / 360 * canvas.width;
    const y = (90 - lat)  / 180 * canvas.height;
    return { x, y };
  }

  // Dessiner un continent à partir de points lat/lng
  function continent(points) {
    ctx.beginPath();
    points.forEach(([lat, lng], i) => {
      const p = proj(lat, lng);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#c0b49a";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Europe
  continent([[71,30],[71,50],[60,50],[55,25],[48,2],[43,-9],[36,-9],[36,36],[42,36],[48,40],[60,30],[70,30]]);
  // Afrique
  continent([[37,10],[37,55],[26,55],[15,42],[0,42],[-35,20],[-35,17],[0,-18],[15,-17],[26,15],[37,10]]);
  // Amérique du Nord
  continent([[70,-140],[70,-60],[50,-55],[45,-60],[25,-80],[20,-87],[15,-85],[25,-105],[32,-117],[48,-125],[70,-140]]);
  // Amérique du Sud
  continent([[12,-72],[12,-62],[0,-50],[-10,-37],[-35,-57],[-55,-68],[-55,-64],[-18,-70],[-5,-80],[12,-80],[12,-72]]);
  // Asie
  continent([[71,30],[71,180],[50,180],[40,145],[35,140],[25,122],[10,105],[5,100],[20,60],[30,50],[42,36],[48,40],[60,30],[71,30]]);
  // Australie
  continent([[-15,130],[-15,145],[-22,153],[-38,146],[-38,140],[-32,116],[-22,113],[-15,130]]);
  // Antilles (point)
  const antilles = proj(15, -65);
  ctx.beginPath(); ctx.arc(antilles.x, antilles.y, 4, 0, Math.PI*2);
  ctx.fillStyle = "#d4c8b0"; ctx.fill();

  // Points de voyage
  voyagesData.filter(v => v.fait).forEach(v => {
    const p = proj(v.coords.lat, v.coords.lng);
    // Halo
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(180, 120, 80, 0.2)";
    ctx.fill();
    // Point
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#c87840";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Rendre la carte cliquable
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top)  * (canvas.height / rect.height);

    let plusProche = null, distMin = 30;
    voyagesData.filter(v => v.fait).forEach(v => {
      const p = proj(v.coords.lat, v.coords.lng);
      const dist = Math.hypot(p.x - mx, p.y - my);
      if (dist < distMin) { distMin = dist; plusProche = v; }
    });

    if (plusProche) ouvrirCartePostale(plusProche.id);
  });

  // Curseur pointer sur les points
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top)  * (canvas.height / rect.height);
    let proche = false;
    voyagesData.filter(v => v.fait).forEach(v => {
      const p = proj(v.coords.lat, v.coords.lng);
      if (Math.hypot(p.x - mx, p.y - my) < 20) proche = true;
    });
    canvas.style.cursor = proche ? "pointer" : "default";
  });
}

function afficherListeCartePostales() {
  const grille = document.getElementById("voyages-cartes-grille");
  if (!grille || grille.children.length > 0) return;

  voyagesData.filter(v => v.fait).forEach((v, i) => {
    const card = document.createElement("div");
    card.className = "carte-postale-mini";
    card.style.animationDelay = `${i * 0.08}s`;
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Voyage à ${v.nom}`);
    card.innerHTML = `
      <span class="cp-emoji">${v.emoji}</span>
      <div class="cp-info">
        <strong>${v.nom}</strong>
        <span>${v.pays} · ${v.annee}</span>
      </div>
      <span class="cp-fleche">→</span>`;
    card.addEventListener("click",   () => ouvrirCartePostale(v.id));
    card.addEventListener("keydown", e => { if (e.key === "Enter") ouvrirCartePostale(v.id); });
    grille.appendChild(card);
  });
}

function ouvrirCartePostale(id) {
  voyageActuel = voyagesData.find(v => v.id === id);
  if (!voyageActuel) return;

  const modal = document.getElementById("modal-voyage");
  document.getElementById("mv-emoji").textContent   = voyageActuel.emoji;
  document.getElementById("mv-titre").textContent   = voyageActuel.nom;
  document.getElementById("mv-pays").textContent    = `${voyageActuel.pays} · ${voyageActuel.annee}`;
  document.getElementById("mv-resume").textContent  = voyageActuel.resume;

  // Moments forts
  const mf = document.getElementById("mv-moments");
  mf.innerHTML = voyageActuel.momentsForts.map(m => `<li>✦ ${m}</li>`).join("");

  // Vidéo
  const videoZone = document.getElementById("mv-video-zone");
  if (voyageActuel.video) {
    videoZone.hidden = false;
    document.getElementById("mv-video-iframe").src = voyageActuel.video;
  } else {
    videoZone.hidden = true;
  }

  // Photos
  const photosGrille = document.getElementById("mv-photos-grille");
  photosGrille.innerHTML = "";
  if (voyageActuel.photos && voyageActuel.photos.length > 0) {
    voyageActuel.photos.forEach(p => {
      const img = document.createElement("img");
      img.src = p.src; img.alt = p.legende;
      img.className = "mv-photo";
      photosGrille.appendChild(img);
    });
    document.getElementById("mv-photos-section").hidden = false;
  } else {
    document.getElementById("mv-photos-section").hidden = true;
  }

  // Lien vers album
  const lienAlbum = document.getElementById("mv-lien-album");
  const albumLie = albumsData.find(a => a.id === id);
  if (albumLie) {
    lienAlbum.hidden = false;
    lienAlbum.onclick = () => { fermerModalVoyage(); naviguer("albums"); setTimeout(() => ouvrirAlbum(id), 400); };
  } else {
    lienAlbum.hidden = true;
  }

  modal.hidden = false;
}

function fermerModalVoyage() {
  const iframe = document.getElementById("mv-video-iframe");
  if (iframe) iframe.src = "";
  document.getElementById("modal-voyage").hidden = true;
}

/* ================================================================
   LOGIQUE — LISTE DE SOUHAITS
   ----------------------------------------------------------------
   - Source de vérité : Supabase (table `souhaits`)
   - Cache localStorage : permet l'affichage instantané hors-ligne
   - Toute modification est répliquée en base
================================================================ */
const SOUHAITS_KEY = "souhaits_voyages_v1";

// Indique si Supabase est utilisable (configuré + reachable)
function supabaseDispo() {
  return typeof db !== "undefined"
      && typeof SUPABASE_URL === "string"
      && !SUPABASE_URL.includes("XXXXXXXXXXXX");
}

function chargerSouhaits() {
  try {
    const saved = localStorage.getItem(SOUHAITS_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return JSON.parse(JSON.stringify(souhaitsPreremplis));
}

function sauvegarderSouhaits(liste) {
  try { localStorage.setItem(SOUHAITS_KEY, JSON.stringify(liste)); } catch(e) {}
}

async function initSouhaits() {
  // Afficher d'abord la version locale (réactive)
  afficherSouhaits();
  // Puis fusionner avec Supabase si dispo
  await synchroniserSouhaitsDepuisSupabase();
  afficherSouhaits();
}

// Charge les souhaits depuis Supabase et les fusionne avec le cache local.
// La règle : Supabase fait foi pour ce qu'il contient ; les souhaits préremplis
// purement locaux (non encore synchronisés) sont poussés vers la base.
async function synchroniserSouhaitsDepuisSupabase() {
  if (!supabaseDispo()) return;
  try {
    const distants = await db.lire("souhaits");
    if (!Array.isArray(distants)) return;

    const locaux = chargerSouhaits();
    const fusion = [];
    const nomsDistants = new Set(distants.map(d => (d.nom || "").toLowerCase()));

    // 1) Tout ce qui est en base : on prend l'id UUID Supabase
    distants.forEach(d => fusion.push({
      id:    d.id,
      nom:   d.nom,
      emoji: d.emoji || "✈️",
      note:  d.note || "",
      fait:  !!d.fait
    }));

    // 2) Les souhaits locaux non encore en base (premier chargement) :
    //    on les pousse vers Supabase, puis on les ajoute à la fusion avec leur nouvel UUID
    for (const s of locaux) {
      if (nomsDistants.has((s.nom || "").toLowerCase())) continue;
      const cree = await db.inserer("souhaits", {
        nom:   s.nom,
        emoji: s.emoji || "✈️",
        note:  s.note  || "",
        fait:  !!s.fait
      });
      if (cree && cree.id) {
        fusion.push({ id: cree.id, nom: cree.nom, emoji: cree.emoji, note: cree.note || "", fait: !!cree.fait });
      }
    }

    sauvegarderSouhaits(fusion);
  } catch(e) {
    console.warn("Souhaits : sync Supabase échouée — on garde le cache local.", e);
  }
}

function afficherSouhaits() {
  const liste = chargerSouhaits();
  const conteneur = document.getElementById("souhaits-liste");
  if (!conteneur) return;
  conteneur.innerHTML = "";

  const faits   = liste.filter(s => s.fait);
  const aFaire  = liste.filter(s => !s.fait);

  // Compteur
  document.getElementById("souhaits-compteur").textContent =
    `${faits.length} visité${faits.length > 1 ? "s" : ""} · ${aFaire.length} à découvrir`;

  [...aFaire, ...faits].forEach((souhait, i) => {
    const div = document.createElement("div");
    div.className = "souhait-item" + (souhait.fait ? " souhait-fait" : "");
    div.style.animationDelay = `${i * 0.05}s`;
    // id échappé (UUID ou "custom-…") — utilisable comme attribut
    const idAttr = String(souhait.id).replace(/'/g, "\\'");
    div.innerHTML = `
      <button class="souhait-check" onclick="toggleSouhait('${idAttr}')"
              aria-label="${souhait.fait ? "Marquer comme non visité" : "Marquer comme visité"}"
              title="${souhait.fait ? "Déjà visité ✓" : "Pas encore visité"}">
        ${souhait.fait ? "✓" : "○"}
      </button>
      <span class="souhait-emoji">${souhait.emoji}</span>
      <div class="souhait-texte">
        <strong>${souhait.nom}</strong>
        ${souhait.note ? `<span>${souhait.note}</span>` : ""}
      </div>
      <button class="souhait-suppr" onclick="supprimerSouhait('${idAttr}')" aria-label="Supprimer">✕</button>`;
    conteneur.appendChild(div);
  });
}

// Heuristique : un id UUID v4 vient de Supabase ; "custom-…" ou un slug court est local.
function estIdSupabase(id) {
  return typeof id === "string"
      && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

async function toggleSouhait(id) {
  const liste = chargerSouhaits();
  const item  = liste.find(s => s.id === id);
  if (!item) return;
  item.fait = !item.fait;
  sauvegarderSouhaits(liste);
  afficherSouhaits();

  if (supabaseDispo() && estIdSupabase(id)) {
    try { await db.modifier("souhaits", id, { fait: item.fait }); }
    catch(e) { console.warn("toggleSouhait Supabase:", e); }
  }
}

async function supprimerSouhait(id) {
  const liste = chargerSouhaits().filter(s => s.id !== id);
  sauvegarderSouhaits(liste);
  afficherSouhaits();

  if (supabaseDispo() && estIdSupabase(id)) {
    try { await db.supprimer("souhaits", id); }
    catch(e) { console.warn("supprimerSouhait Supabase:", e); }
  }
}

async function ajouterSouhait() {
  const nomInput   = document.getElementById("souhait-input-nom");
  const emojiInput = document.getElementById("souhait-input-emoji");
  const noteInput  = document.getElementById("souhait-input-note");

  const nom = nomInput.value.trim();
  if (!nom) { nomInput.focus(); return; }

  const data = {
    nom:   nom,
    emoji: emojiInput.value.trim() || "✈️",
    note:  noteInput.value.trim(),
    fait:  false
  };

  // ── Tentative d'enregistrement Supabase d'abord (pour avoir l'UUID) ──
  let idFinal = "custom-" + Date.now();
  if (supabaseDispo()) {
    try {
      const cree = await db.inserer("souhaits", data);
      if (cree && cree.id) idFinal = cree.id;
    } catch(e) {
      console.warn("ajouterSouhait Supabase:", e);
    }
  }

  const liste = chargerSouhaits();
  liste.push({ id: idFinal, ...data });
  sauvegarderSouhaits(liste);

  nomInput.value   = "";
  emojiInput.value = "";
  noteInput.value  = "";
  afficherSouhaits();
}


/* ================================================================
   ✏️  MODIFIER ICI — TEXTE DU POP-UP D'ACCUEIL
   ----------------------------------------------------------------
   - titre      : phrase principale en grand
   - paragraphes: tableau de textes (chaque item = un §)
                  ajoute "accent: true" pour mettre en italique
   - signature  : phrase finale signée
   ----------------------------------------------------------------
   Le pop-up s'affiche UNE SEULE FOIS (mémorisé dans le navigateur).
   Pour le remettre à zéro (le revoir), vide le localStorage :
   dans la console du navigateur → localStorage.removeItem("popup_vu")
================================================================ */
const textePopupAccueil = {
  titre: "Ce site est né parce que je t'aime.",

  paragraphes: [
    {
      texte: "Je l'ai créé pour notre anniversaire. Mais surtout parce que je voulais qu'il existe quelque chose de permanent — un endroit où nos moments ne disparaissent pas.",
      accent: false
    },
    {
      texte: "séparateur"
    },
    {
      texte: "Ici, tu trouveras nos souvenirs, nos voyages, nos petits riens. Des choses que j'ai voulu garder, et te montrer.",
      accent: false
    },
    {
      texte: "Tu peux explorer à ton rythme. Il n'y a rien à faire, rien à comprendre vite. Juste toi, moi, et ce qu'on a construit.",
      accent: true
    },
    {
      texte: "séparateur"
    },
    {
      texte: "Ce site est aussi pour toi, dans tes moments difficiles. Pour te rappeler qu'il y a un endroit doux, qui t'attend.",
      accent: false
    }
  ],

  // ✏️ Change ça par ta façon de signer
  signature: "— avec tout mon amour"
};

/* ================================================================
   LOGIQUE — POP-UP
================================================================ */
const POPUP_KEY = "popup_vu_v1";

function afficherPopupAccueil() {
  // Ne pas afficher si déjà vu
  if (localStorage.getItem(POPUP_KEY)) return;

  const popup    = document.getElementById("popup-accueil");
  const titreEl  = document.getElementById("popup-titre");
  const corpsEl  = document.getElementById("popup-corps");
  const signEl   = document.getElementById("popup-signature");

  titreEl.textContent = textePopupAccueil.titre;
  signEl.textContent  = textePopupAccueil.signature;

  corpsEl.innerHTML = "";
  textePopupAccueil.paragraphes.forEach(item => {
    if (item.texte === "séparateur") {
      const sep = document.createElement("div");
      sep.className = "popup-separateur";
      corpsEl.appendChild(sep);
    } else {
      const p = document.createElement("p");
      if (item.accent) p.className = "popup-accent";
      p.textContent = item.texte;
      corpsEl.appendChild(p);
    }
  });

  popup.hidden = false;

  // Trap focus dans le popup
  const btn = popup.querySelector(".popup-btn");
  if (btn) setTimeout(() => btn.focus(), 800);
}

function fermerPopupAccueil() {
  const popup = document.getElementById("popup-accueil");

  // Animation de sortie douce
  popup.style.transition = "opacity 0.8s ease";
  popup.style.opacity = "0";

  setTimeout(() => {
    popup.hidden = true;
    popup.style.opacity = "";
    popup.style.transition = "";
    // Mémoriser que le popup a été vu
    try { localStorage.setItem(POPUP_KEY, "1"); } catch(e) {}
  }, 800);
}

// ── Lancer le popup au chargement ────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("accueil").classList.add("active");
  document.getElementById("nav-principale").hidden = true;

  // Charger les données depuis Supabase (si configuré)
  await chargerDepuisSupabase();

  // Afficher le popup après chargement
  setTimeout(afficherPopupAccueil, 600);
});


/* ================================================================
   CHARGEMENT DEPUIS SUPABASE
   ----------------------------------------------------------------
   Ces fonctions remplacent les données statiques par les données
   de Supabase dès que la connexion est établie.
   Si Supabase n'est pas configuré, les données statiques sont
   utilisées en fallback.
================================================================ */

async function chargerDepuisSupabase() {
  if (typeof db === "undefined" || SUPABASE_URL.includes("XXXXXXXXXXXX")) {
    console.info("Supabase non configuré — données statiques utilisées.");
    return;
  }

  try {
    // ── Popup : remplace seulement si données présentes ──
    const popupData = await db.lire("popup");
    if (popupData?.length > 0) {
      const p = popupData[0];
      if (p.titre) textePopupAccueil.titre = p.titre;
      if (p.signature) textePopupAccueil.signature = p.signature;
      if (p.paragraphes?.length > 0) {
        textePopupAccueil.paragraphes = p.paragraphes.map(item =>
          item.separateur ? { texte: "séparateur" } : { texte: item.texte, accent: !!item.accent }
        );
      }
    }

    // ── Galerie : FUSIONNE avec les données statiques ──
    const galerie = await db.lire("galerie");
    if (galerie?.length > 0) {
      // Ajouter seulement les items Supabase qui ne sont pas déjà dans le statique
      const titresExistants = new Set(gallerieData.map(g => g.titre.toLowerCase()));
      let nextId = Math.max(...gallerieData.map(g => g.id || 0), 100) + 1;
      galerie.forEach(item => {
        if (!titresExistants.has(item.titre.toLowerCase())) {
          gallerieData.push({ ...item, id: nextId++ });
        }
      });
    }

    // ── Comprendre : FUSIONNE ──
    const comprendre = await db.lire("comprendre");
    if (comprendre?.length > 0) {
      const titresExistants = new Set(comprendreData.map(c => c.titre.toLowerCase()));
      comprendre.forEach(item => {
        if (!titresExistants.has(item.titre.toLowerCase())) {
          comprendreData.push({ titre: item.titre, texte: item.texte });
        }
      });
    }

    // ── Étoiles : FUSIONNE ──
    const etoiles = await db.lire("etoiles");
    if (etoiles?.length > 0) {
      const labelsExistants = new Set(universObjets.map(e => e.label.toLowerCase()));
      etoiles.forEach(e => {
        if (!labelsExistants.has(e.label.toLowerCase())) {
          universObjets.push({ label: e.label, message: e.message, emoji: e.emoji, x: e.x, y: e.y });
        }
      });
    }

    // ── Voyages : FUSIONNE ──
    const voyages = await db.lire("voyages");
    if (voyages?.length > 0) {
      // Charger aussi les photos de voyage
      const voyagePhotos = await db.lire("voyage_photos");
      const nomsExistants = new Set(voyagesData.map(v => v.nom.toLowerCase()));
      voyages.forEach(v => {
        const vid = v.nom.toLowerCase().replace(/\s+/g, "-");
        const photos = (voyagePhotos || [])
          .filter(p => p.voyage_id === v.id)
          .map(p => ({ src: p.src, legende: p.legende }));
        if (!nomsExistants.has(v.nom.toLowerCase())) {
          voyagesData.push({
            id: vid, nom: v.nom, pays: v.pays, emoji: v.emoji, annee: v.annee,
            coords: { lat: v.lat, lng: v.lng },
            fait: v.fait, resume: v.resume,
            momentsForts: v.moments_forts || [],
            video: v.video, photos
          });
        } else {
          // Mettre à jour les photos et infos du voyage existant
          const existing = voyagesData.find(vd => vd.nom.toLowerCase() === v.nom.toLowerCase());
          if (existing) {
            if (v.annee && v.annee !== "À compléter") existing.annee = v.annee;
            if (v.resume) existing.resume = v.resume;
            if (v.moments_forts?.length) existing.momentsForts = v.moments_forts;
            if (v.video) existing.video = v.video;
            if (photos.length) existing.photos = photos;
          }
        }
      });
    }

    // ── Albums : FUSIONNE ──
    const albums = await db.lire("albums");
    if (albums?.length > 0) {
      const albumPhotos = await db.lire("album_photos");
      const titresExistants = new Set(albumsData.map(a => a.titre.toLowerCase()));
      albums.forEach(a => {
        const photosAlbum = (albumPhotos || []).filter(p => p.album_id === a.id);
        const themesMap = {};
        photosAlbum.forEach(p => {
          const k = p.theme || "Général";
          if (!themesMap[k]) themesMap[k] = { nom: k, emoji: p.theme_emoji || "📷", photos: [] };
          themesMap[k].photos.push({ src: p.src, legende: p.legende });
        });
        if (!titresExistants.has(a.titre.toLowerCase())) {
          albumsData.push({
            id: a.id, titre: a.titre, lieu: a.lieu, date: a.date,
            emoji: a.emoji, couleur: a.couleur, couverture: null,
            themes: Object.values(themesMap).length > 0
              ? Object.values(themesMap)
              : [{ nom: "Photos", emoji: "📷", photos: [] }]
          });
        } else {
          // Mettre à jour les thèmes/photos de l'album existant
          const existing = albumsData.find(ad => ad.titre.toLowerCase() === a.titre.toLowerCase());
          if (existing && Object.values(themesMap).length > 0) {
            Object.values(themesMap).forEach(theme => {
              const t = existing.themes.find(t => t.nom === theme.nom);
              if (t) {
                // Fusionner les photos sans doublons
                const srcsExistants = new Set(t.photos.map(p => p.src));
                theme.photos.forEach(p => { if (!srcsExistants.has(p.src)) t.photos.push(p); });
              } else {
                existing.themes.push(theme);
              }
            });
          }
        }
      });
    }

    // ── Photos nous deux : FUSIONNE ──
    const photos = await db.lire("photos");
    if (photos?.length > 0) {
      const legendesExistantes = new Set(photosData.map(p => p.legende?.toLowerCase()));
      photos.forEach(p => {
        if (!legendesExistantes.has(p.legende?.toLowerCase())) {
          photosData.push({ legende: p.legende, date: p.date, image: p.image, emoji: p.emoji, hero: p.hero });
        }
      });
    }

    // ── Capsules : FUSIONNE ──
    const capsules = await db.lire("capsules");
    if (capsules?.length > 0) {
      const titresExistants = new Set(capsulesData.map(c => c.titre.toLowerCase()));
      capsules.forEach(c => {
        if (!titresExistants.has(c.titre.toLowerCase())) {
          capsulesData.push({
            id: c.id, titre: c.titre, icone: c.emoji,
            dateOuvert: c.date_ouverture?.split("T")[0] || c.date_ouverture,
            contenu: c.contenu || []
          });
        }
      });
    }

    // ── Émotions : FUSIONNE ──
    const emotions = await db.lire("emotions");
    if (emotions?.length > 0) {
      emotions.forEach(e => {
        // Ajouter ou mettre à jour
        emotionsData[e.slug] = { label: e.label, message: e.message, mini: e.mini || [] };
      });
    }

    // ── Souhaits : rafraîchit le cache local dès le chargement
    //    (la synchro complète se fait dans initSouhaits si l'utilisateur visite l'onglet)
    try { await synchroniserSouhaitsDepuisSupabase(); } catch(e) {}

    console.info("✓ Données Supabase fusionnées avec données statiques");

  } catch(err) {
    console.warn("Supabase non disponible — données statiques utilisées.", err);
  }
}


/* ================================================================
   SAUVEGARDE DESSINS & ŒUVRES DANS SUPABASE
================================================================ */
async function sauvegarderDessinEnLigne(canvasId, type, message = "") {
  if (typeof db === "undefined" || SUPABASE_URL.includes("XXXXXXXXXXXX")) return null;

  try {
    const canvas = document.getElementById(canvasId);
    // Convertir canvas en blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const chemin = `${type}/${Date.now()}.png`;
    const url = await db.uploadImage("images", chemin, blob);
    if (url) {
      await db.inserer("dessins", { image_url: url, message, type });
      return url;
    }
  } catch(e) {
    console.warn("Sauvegarde dessin échouée:", e);
  }
  return null;
}


/* ════════════════════════════════════════════════════════════════
   ════════════════════════════════════════════════════════════════
                  AJOUTS V2 — PIN, capsule juillet,
              espaces privés, créations, dramas, humeurs
   ════════════════════════════════════════════════════════════════
   ════════════════════════════════════════════════════════════════ */


/* ================================================================
   PIN — Modal pavé numérique (réutilisable, accessible clavier)
================================================================ */
const PIN_SECRET      = "5922";
const PIN_SESSION_KEY = "pin_ok_v1";
let pinSaisie         = "";
let pinCallbackSucces = null;
let pinCallbackAnnule = null;

function ouvrirPin(titreTexte, callbackSucces, callbackAnnule = null) {
  pinSaisie = "";
  pinCallbackSucces = callbackSucces;
  pinCallbackAnnule = callbackAnnule;
  const modal = document.getElementById("pin-modal");
  if (!modal) return;
  document.getElementById("pin-titre").textContent = titreTexte || "Entrer le code";
  const msg = document.getElementById("pin-message");
  msg.textContent = "";
  msg.className = "pin-message";
  rafraichirPinDots();
  modal.hidden = false;
  setTimeout(() => modal.classList.add("visible"), 10);
}

function fermerPin() {
  const modal = document.getElementById("pin-modal");
  if (!modal) return;
  modal.classList.remove("visible");
  setTimeout(() => { modal.hidden = true; }, 250);
  pinSaisie = "";
  const cb = pinCallbackAnnule;
  pinCallbackSucces = null;
  pinCallbackAnnule = null;
  if (typeof cb === "function") cb();
}

function tapeChiffre(c) {
  if (pinSaisie.length >= 4) return;
  pinSaisie += c;
  rafraichirPinDots();
  const dots = document.querySelectorAll(".pin-dot");
  const dot = dots[pinSaisie.length - 1];
  if (dot) {
    dot.classList.add("pulse");
    setTimeout(() => dot.classList.remove("pulse"), 280);
  }
  if (pinSaisie.length === 4) {
    setTimeout(verifierPin, 200);
  }
}

function effacerChiffre() {
  if (pinSaisie.length === 0) return;
  pinSaisie = pinSaisie.slice(0, -1);
  rafraichirPinDots();
}

function rafraichirPinDots() {
  document.querySelectorAll(".pin-dot").forEach((d, i) => {
    d.classList.toggle("rempli", i < pinSaisie.length);
  });
}

function verifierPin() {
  const msg = document.getElementById("pin-message");
  if (pinSaisie === PIN_SECRET) {
    msg.textContent = "Bienvenue ✨";
    msg.className = "pin-message succes";
    try { sessionStorage.setItem(PIN_SESSION_KEY, "1"); } catch(e) {}
    setTimeout(() => {
      const cb = pinCallbackSucces;
      pinCallbackSucces = null;
      pinCallbackAnnule = null;
      const modal = document.getElementById("pin-modal");
      modal.classList.remove("visible");
      setTimeout(() => { modal.hidden = true; pinSaisie = ""; }, 250);
      if (typeof cb === "function") cb();
    }, 700);
  } else {
    msg.textContent = "Oups, réessaie 🌸";
    msg.className = "pin-message erreur";
    const wrap = document.querySelector(".pin-dots");
    if (wrap) wrap.classList.add("shake");
    setTimeout(() => {
      if (wrap) wrap.classList.remove("shake");
      pinSaisie = "";
      rafraichirPinDots();
      msg.textContent = "";
      msg.className = "pin-message";
    }, 800);
  }
}

function pinEstAutorise() {
  try { return sessionStorage.getItem(PIN_SESSION_KEY) === "1"; }
  catch(e) { return false; }
}

// Raccourci clavier dans la modale PIN
document.addEventListener("keydown", e => {
  const modal = document.getElementById("pin-modal");
  if (!modal || modal.hidden) return;
  if (e.key >= "0" && e.key <= "9") { tapeChiffre(e.key); e.preventDefault(); }
  else if (e.key === "Backspace")    { effacerChiffre();  e.preventDefault(); }
  else if (e.key === "Escape")       { fermerPin();       e.preventDefault(); }
});


/* ================================================================
   ACCÈS ADMIN DISCRET
   - Icône 🔑 en bas de page → PIN → admin.html
   - Triple-clic sur le titre d'accueil → idem
================================================================ */
function ouvrirAdminAvecPin() {
  if (pinEstAutorise()) { window.location.href = "admin.html"; return; }
  ouvrirPin("Accès admin", () => { window.location.href = "admin.html"; });
}

(function setupTripleClick() {
  document.addEventListener("DOMContentLoaded", () => {
    let clicks = 0, timer = null;
    const titre = document.querySelector(".accueil-titre");
    if (!titre) return;
    titre.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => clicks = 0, 700);
      if (clicks >= 3) { clicks = 0; ouvrirAdminAvecPin(); }
    });
  });
})();


/* ================================================================
   CAPSULE SPÉCIALE "POUR NOTRE HISTOIRE À DEUX 💍"
================================================================ */
const CAPSULE_JUILLET_ID   = "juillet-3ans";
const CAPSULE_JUILLET_DATE = "2026-07-15";

const CAPSULE_JUILLET_TEXTE = [
  "Il y a trois ans, tu m'as dit qu'on n'était pas compatibles. Que tu ne savais pas comment me classer. Que je n'étais pas juste un ami, mais que tu ne savais pas non plus ce que j'étais. Et moi, j'ai souri, parce que je savais déjà.",
  "Tu m'as dit que notre relation ne passerait pas un an. Tu avais tes doutes, tes questions, cette façon de tout analyser, de tout peser. Et moi je suis resté — pas parce que j'avais des certitudes, mais parce que même dans l'ambiguïté, être près de toi avait plus de sens que d'être loin.",
  "Je t'ai appris à me connaître à travers des messages, parce que tu parles mieux par texte que par les mots qu'on dit à voix haute. J'ai appris à lire entre tes lignes. J'ai appris que quand tu regardes un drama chinois en boucle, c'est que le monde dehors est trop bruyant et que tu as besoin de ta bulle. Et j'ai appris à respecter cette bulle — à ne jamais forcer la porte, juste à rester dehors au cas où tu aurais envie de l'ouvrir.",
  "Tu es restée toi-même — celle qui préfère le canapé à la rue, les histoires d'amour coréennes à la vraie vie sociale, les créations artistiques aux conversations inutiles. Celle qui dessine, qui crée, qui voit la beauté là où les autres voient du vide. Tu as fait des études de mode, tu es designeure industrielle, et tout ce que tu touches a quelque chose — une âme, une intention.",
  "On a construit ensemble. Deux entreprises au Mali — MSK Création, Genesis. Des marques de sac au Togo — Isdalinia, Elvi Creation. On a fait des projets dans des pays différents, on a porté des choses lourdes ensemble, on a avancé même quand c'était compliqué.",
  "Et pourtant tu doutes encore parfois. Je le sais. Tu réfléchis beaucoup — c'est ta nature, ce n'est pas un défaut. Mais moi je ne doute pas. Pas une seule seconde.",
  "Trois ans après le début de ce que tu refusais d'appeler une relation, je suis toujours là. Et je veux te poser une question…"
];

const LETTRE_JUILLET = [
  "Mon amour,",
  "Tu m'avais dit que ça ne durerait pas. Regarde-nous.",
  "Je t'aime dans ta façon d'être différente, dans ton monde intérieur que peu de gens ont la chance de voir. Je t'aime quand tu regardes ton drama sans dire un mot pendant trois heures. Je t'aime quand tu crées quelque chose de tes mains. Je t'aime dans tes doutes, dans tes silences, dans ta façon de tout ressentir plus fort que les autres.",
  "Aujourd'hui, le 15 juillet, je veux juste te demander une chose.",
  "Est-ce que tu veux bien rester avec moi — pour de vrai, pour toujours ?"
];

// Injection dans capsulesData
capsulesData.push({
  id: CAPSULE_JUILLET_ID,
  titre: "Pour notre histoire à deux 💍",
  icone: "💍",
  dateOuvert: CAPSULE_JUILLET_DATE,
  contenu: CAPSULE_JUILLET_TEXTE,
  special: "juillet"
});

// Override de initCapsules pour gérer la capsule spéciale et l'URL secrète
const _initCapsulesOriginal = initCapsules;
initCapsules = function() {
  const liste = document.getElementById("capsules-liste");
  if (!liste) return;
  if (liste.children.length > 0) return;

  const maintenant = new Date();
  maintenant.setHours(0, 0, 0, 0);

  const secretJuillet = location.pathname.includes("secret-juillet")
                     || location.hash === "#secret-juillet";

  capsulesData.forEach((capsule, i) => {
    const dateOuverture = new Date(capsule.dateOuvert);
    dateOuverture.setHours(0, 0, 0, 0);
    const estOuverte = maintenant >= dateOuverture
                    || (capsule.id === CAPSULE_JUILLET_ID && secretJuillet);

    const div = document.createElement("div");
    div.className = "capsule";
    div.style.animationDelay = `${i * 0.15}s`;

    if (estOuverte && capsule.special === "juillet") {
      const dateStr = dateOuverture.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
      const paragraphes = capsule.contenu.map(p => `<p>${p}</p>`).join("");
      const sstitre = (secretJuillet && maintenant < dateOuverture)
        ? "🌸 Aperçu privé"
        : "Ouvert le " + dateStr;
      div.innerHTML = `
        <div class="capsule-ouverte capsule-juillet">
          <div class="capsule-ouverte-header">
            <span class="capsule-verrou-icone">${capsule.icone}</span>
            <h3>${capsule.titre}</h3>
            <span class="capsule-ouverte-sstitre">${sstitre}</span>
          </div>
          <div class="capsule-ouverte-corps">
            ${paragraphes}
            <div class="capsule-juillet-actions">
              <button class="btn-entrer btn-juillet" onclick="ouvrirLettreJuillet()">Et si c'était pour toujours ? 💍</button>
            </div>
          </div>
        </div>`;
      liste.appendChild(div);
      return;
    }

    if (estOuverte) {
      const paragraphes = capsule.contenu.map(p => `<p>${p}</p>`).join("");
      const dateStr = dateOuverture.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
      div.innerHTML = `
        <div class="capsule-ouverte">
          <div class="capsule-ouverte-header">
            <span class="capsule-verrou-icone">${capsule.icone}</span>
            <h3>${capsule.titre}</h3>
            <span class="capsule-ouverte-sstitre">Ouvert le ${dateStr}</span>
          </div>
          <div class="capsule-ouverte-corps">
            ${paragraphes}
            <span class="capsule-badge-ouvert">✓ Déverrouillé</span>
          </div>
        </div>`;
    } else {
      const dateStr = dateOuverture.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
      div.innerHTML = `
        <div class="capsule-verrou">
          <span class="capsule-verrou-icone">🔒</span>
          <h3 class="capsule-verrou-titre">${capsule.titre}</h3>
          <p class="capsule-verrou-date">S'ouvrira le ${dateStr}</p>
          <div class="capsule-compte-rebours" id="rebours-${capsule.id}">
            <div class="capsule-rebours-unite">
              <span class="capsule-rebours-nombre" id="rb-j-${capsule.id}">--</span>
              <span class="capsule-rebours-label">jours</span>
            </div>
            <div class="capsule-rebours-unite">
              <span class="capsule-rebours-nombre" id="rb-h-${capsule.id}">--</span>
              <span class="capsule-rebours-label">heures</span>
            </div>
            <div class="capsule-rebours-unite">
              <span class="capsule-rebours-nombre" id="rb-m-${capsule.id}">--</span>
              <span class="capsule-rebours-label">minutes</span>
            </div>
          </div>
        </div>`;
      mettreAJourRebours(capsule.id, dateOuverture);
      setInterval(() => mettreAJourRebours(capsule.id, dateOuverture), 60000);
    }

    liste.appendChild(div);
  });
};

function ouvrirLettreJuillet() {
  const modal = document.getElementById("lettre-juillet");
  const corps = document.getElementById("lettre-juillet-corps");
  if (!modal || !corps) return;
  corps.innerHTML = "";
  modal.hidden = false;
  setTimeout(() => modal.classList.add("visible"), 10);
  LETTRE_JUILLET.forEach((ligne, i) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.className = "lettre-ligne";
      p.textContent = ligne;
      corps.appendChild(p);
      setTimeout(() => p.classList.add("visible"), 30);
    }, i * 1200);
  });
  setTimeout(() => {
    const bouton = document.createElement("div");
    bouton.className = "lettre-action";
    bouton.innerHTML = `<button class="btn-entrer btn-juillet-final" onclick="repondreOuiPourToujours()">Oui, pour toujours 💍</button>`;
    corps.appendChild(bouton);
    setTimeout(() => bouton.classList.add("visible"), 30);
  }, LETTRE_JUILLET.length * 1200 + 600);
}

function fermerLettreJuillet() {
  const modal = document.getElementById("lettre-juillet");
  if (!modal) return;
  modal.classList.remove("visible");
  setTimeout(() => { modal.hidden = true; }, 400);
}

function repondreOuiPourToujours() {
  const corps = document.getElementById("lettre-juillet-corps");
  if (!corps) return;
  const finale = document.createElement("div");
  finale.className = "lettre-finale";
  finale.innerHTML = `
    <div class="lettre-petales" aria-hidden="true">🌸 🌸 🌸</div>
    <p class="lettre-finale-texte">Je t'aime. Depuis le début. Pour toujours. 🌸</p>
  `;
  corps.appendChild(finale);
  setTimeout(() => finale.classList.add("visible"), 50);
}


/* ================================================================
   HELPERS communs
================================================================ */
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}


/* ================================================================
   "NOS MOTS À NOUS" — journal partagé Elle/Lui (PIN-gated)
================================================================ */
let motsAuteurCourant = "elle";
let motsImageUrl     = null;

async function initMots() {
  const gate = document.getElementById("mots-gate");
  const contenu = document.getElementById("mots-contenu");
  if (!gate || !contenu) return;
  if (!pinEstAutorise()) {
    gate.hidden = false;
    contenu.hidden = true;
    return;
  }
  gate.hidden = true;
  contenu.hidden = false;
  await chargerMots();
}

function demanderPinMots() {
  ouvrirPin("Accès à notre journal", () => initMots());
}

async function chargerMots() {
  const fil = document.getElementById("mots-fil");
  if (!fil) return;
  fil.innerHTML = "";
  let liste = [];
  if (supabaseDispo()) {
    try { liste = await db.lire("mots"); } catch(e) { console.warn("mots:", e); }
  }
  liste = (liste || []).slice().reverse();
  if (liste.length === 0) {
    fil.innerHTML = '<p class="mots-vide">Rien d\'écrit pour l\'instant. C\'est à toi.</p>';
    return;
  }
  liste.forEach(m => {
    const carte = document.createElement("article");
    carte.className = "mot-carte mot-" + (m.auteur === "elle" ? "elle" : "lui");
    const dateStr = m.created_at
      ? new Date(m.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
      : "";
    carte.innerHTML = `
      <header class="mot-header">
        <span class="mot-auteur">${m.auteur === "elle" ? "Elle" : "Lui"}</span>
        <span class="mot-date">${dateStr}</span>
      </header>
      <div class="mot-texte">${(m.texte || "").split("\n").map(l => `<p>${escapeHtml(l)}</p>`).join("")}</div>
      ${m.image ? `<img class="mot-image" src="${m.image}" alt="" loading="lazy" />` : ""}
    `;
    fil.appendChild(carte);
  });
}

function basculerAuteurMot(auteur) {
  motsAuteurCourant = auteur;
  document.querySelectorAll(".mots-auteur-btn").forEach(b => {
    b.classList.toggle("actif", b.dataset.auteur === auteur);
  });
}

async function uploadImageMot(input) {
  const fichier = input.files[0];
  if (!fichier || !supabaseDispo()) return;
  const ext = (fichier.name.split(".").pop() || "jpg");
  const chemin = `mots/${Date.now()}.${ext}`;
  const url = await db.uploadImage("images", chemin, fichier);
  if (url) {
    motsImageUrl = url;
    document.getElementById("mots-image-apercu").innerHTML =
      `<img src="${url}" alt="" /><button type="button" onclick="retirerImageMot()" class="mots-img-retirer" aria-label="Retirer l'image">✕</button>`;
  }
}

function retirerImageMot() {
  motsImageUrl = null;
  document.getElementById("mots-image-apercu").innerHTML = "";
  document.getElementById("mots-image-input").value = "";
}

async function envoyerMot() {
  const ta = document.getElementById("mots-texte");
  const texte = ta.value.trim();
  if (!texte) { ta.focus(); return; }
  const data = { auteur: motsAuteurCourant, texte, image: motsImageUrl };
  let ok = false;
  if (supabaseDispo()) {
    try {
      const res = await db.inserer("mots", data);
      if (res) ok = true;
    } catch(e) { console.warn("envoyerMot:", e); }
  }
  if (!ok) {
    const err = document.getElementById("mots-erreur");
    if (err) { err.textContent = "La sauvegarde n'a pas marché. Réessaie dans un instant 🌸"; err.classList.add("visible"); setTimeout(()=>err.classList.remove("visible"), 3000); }
    return;
  }
  ta.value = "";
  retirerImageMot();
  await chargerMots();
}


/* ================================================================
   "SES CRÉATIONS" 🎨
================================================================ */
let creationImageUrl = null;

async function initCreations() {
  await afficherCreations();
}

async function afficherCreations() {
  const grille = document.getElementById("creations-grille");
  if (!grille) return;
  grille.innerHTML = "";
  let liste = [];
  if (supabaseDispo()) {
    try { liste = await db.lire("creations"); } catch(e) {}
  }
  liste = (liste || []).slice().reverse();
  if (liste.length === 0) {
    grille.innerHTML = '<p class="section-vide">Aucune création pour l\'instant. Ce sera ton espace.</p>';
    return;
  }
  liste.forEach((c, i) => {
    const carte = document.createElement("div");
    carte.className = "creation-carte";
    carte.style.animationDelay = `${i * 0.06}s`;
    carte.innerHTML = `
      ${c.image ? `<img class="creation-image" src="${c.image}" alt="${escapeHtml(c.titre || '')}" loading="lazy" />` : `<div class="creation-placeholder">🎨</div>`}
      <div class="creation-info">
        <h3 class="creation-titre">${escapeHtml(c.titre || "Sans titre")}</h3>
        ${c.description ? `<p class="creation-description">${escapeHtml(c.description)}</p>` : ""}
      </div>
    `;
    grille.appendChild(carte);
  });
}

async function uploadImageCreation(input) {
  const fichier = input.files[0];
  if (!fichier || !supabaseDispo()) return;
  const ext = (fichier.name.split(".").pop() || "jpg");
  const chemin = `creations/${Date.now()}.${ext}`;
  const url = await db.uploadImage("images", chemin, fichier);
  if (url) {
    creationImageUrl = url;
    document.getElementById("creation-image-apercu").innerHTML = `<img src="${url}" alt="" />`;
  }
}

async function envoyerCreation() {
  const titre = document.getElementById("creation-titre-input").value.trim();
  const desc  = document.getElementById("creation-desc-input").value.trim();
  if (!titre && !creationImageUrl) return;
  const data = { titre: titre || "Sans titre", description: desc, image: creationImageUrl };
  if (supabaseDispo()) {
    try { await db.inserer("creations", data); } catch(e) {}
  }
  document.getElementById("creation-titre-input").value = "";
  document.getElementById("creation-desc-input").value = "";
  document.getElementById("creation-image-apercu").innerHTML = "";
  document.getElementById("creation-image-input").value = "";
  creationImageUrl = null;
  await afficherCreations();
}


/* ================================================================
   "NOS DRAMAS" 📺
================================================================ */
async function initDramas() {
  await afficherDramas();
}

async function afficherDramas() {
  const liste = document.getElementById("dramas-liste");
  if (!liste) return;
  liste.innerHTML = "";
  let donnees = [];
  if (supabaseDispo()) {
    try { donnees = await db.lire("dramas"); } catch(e) {}
  }
  donnees = donnees || [];
  const ordre = { "en_cours": 0, "a_voir": 1, "fini": 2 };
  donnees.sort((a, b) => (ordre[a.statut] ?? 9) - (ordre[b.statut] ?? 9));
  if (donnees.length === 0) {
    liste.innerHTML = '<p class="section-vide">Aucun drama pour l\'instant. Ajoute le premier !</p>';
    return;
  }
  const labels = { "a_voir": "À voir", "en_cours": "En cours", "fini": "Vu" };
  donnees.forEach(d => {
    const div = document.createElement("div");
    div.className = "drama-carte drama-" + (d.statut || "a_voir");
    const etoiles = (d.note != null && d.note > 0)
      ? "★".repeat(d.note) + "☆".repeat(5 - d.note)
      : "";
    div.innerHTML = `
      <div class="drama-emoji">${d.emoji || "🎬"}</div>
      <div class="drama-info">
        <h3 class="drama-titre">${escapeHtml(d.titre)}</h3>
        <div class="drama-meta">
          <span class="drama-badge drama-badge-${d.statut}">${labels[d.statut] || "À voir"}</span>
          ${etoiles ? `<span class="drama-note">${etoiles}</span>` : ""}
        </div>
        ${d.commentaire ? `<p class="drama-commentaire">${escapeHtml(d.commentaire)}</p>` : ""}
      </div>
      <button class="drama-supprimer" onclick="supprimerDrama('${d.id}')" aria-label="Supprimer">✕</button>
    `;
    liste.appendChild(div);
  });
}

async function ajouterDrama() {
  const titre = document.getElementById("drama-titre-input").value.trim();
  if (!titre) return;
  const statut = document.getElementById("drama-statut-select").value;
  const note = parseInt(document.getElementById("drama-note-input").value) || 0;
  const emoji = document.getElementById("drama-emoji-input").value.trim() || "🎬";
  const commentaire = document.getElementById("drama-commentaire-input").value.trim();
  const data = { titre, statut, note, emoji, commentaire };
  if (supabaseDispo()) {
    try { await db.inserer("dramas", data); } catch(e) {}
  }
  document.getElementById("drama-titre-input").value = "";
  document.getElementById("drama-commentaire-input").value = "";
  document.getElementById("drama-emoji-input").value = "";
  document.getElementById("drama-note-input").value = "0";
  await afficherDramas();
}

async function supprimerDrama(id) {
  if (!supabaseDispo()) return;
  try { await db.supprimer("dramas", id); } catch(e) {}
  await afficherDramas();
}


/* ================================================================
   "CE SOIR JE ME SENS…" 🌙
================================================================ */
const HUMEURS_DISPONIBLES = [
  { emoji: "🌸", label: "douce" },
  { emoji: "🌙", label: "fatiguée" },
  { emoji: "☁️", label: "lointaine" },
  { emoji: "✨", label: "légère" },
  { emoji: "🌧️", label: "triste" },
  { emoji: "🔥", label: "intense" },
  { emoji: "🍃", label: "calme" },
  { emoji: "💫", label: "rêveuse" }
];

async function initHumeurs() {
  const boutons = document.getElementById("humeurs-boutons");
  if (boutons && boutons.children.length === 0) {
    HUMEURS_DISPONIBLES.forEach(h => {
      const b = document.createElement("button");
      b.className = "humeur-btn";
      b.innerHTML = `<span class="humeur-emoji">${h.emoji}</span><span class="humeur-label">${h.label}</span>`;
      b.onclick = () => enregistrerHumeur(h.emoji, h.label);
      boutons.appendChild(b);
    });
  }
  await afficherTimelineHumeurs();
}

async function enregistrerHumeur(emoji, label) {
  if (!supabaseDispo()) return;
  try {
    await db.inserer("humeurs", { emoji, label });
    const conf = document.getElementById("humeurs-confirmation");
    if (conf) {
      conf.textContent = `${emoji} bien noté.`;
      conf.classList.add("visible");
      setTimeout(() => conf.classList.remove("visible"), 2500);
    }
    await afficherTimelineHumeurs();
  } catch(e) { console.warn("humeur:", e); }
}

async function afficherTimelineHumeurs() {
  const fil = document.getElementById("humeurs-fil");
  if (!fil) return;
  fil.innerHTML = "";
  let liste = [];
  if (supabaseDispo()) {
    try { liste = await db.lire("humeurs"); } catch(e) {}
  }
  liste = (liste || []).slice().reverse().slice(0, 14);
  if (liste.length === 0) {
    fil.innerHTML = '<p class="section-vide">Rien noté pour l\'instant.</p>';
    return;
  }
  liste.forEach(h => {
    const div = document.createElement("div");
    div.className = "humeur-ligne";
    const date = h.created_at
      ? new Date(h.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
      : "";
    div.innerHTML = `
      <span class="humeur-ligne-emoji">${h.emoji}</span>
      <span class="humeur-ligne-label">${h.label || ""}</span>
      <span class="humeur-ligne-date">${date}</span>
    `;
    fil.appendChild(div);
  });
}


/* ================================================================
   Routeur : patch de naviguer() pour brancher les nouvelles sections
================================================================ */
(function patchNaviguer() {
  if (typeof naviguer !== "function") return;
  const _ori = naviguer;
  naviguer = function(cible) {
    const r = _ori.call(this, cible);
    setTimeout(() => {
      if (cible === "mots")      initMots();
      if (cible === "creations") initCreations();
      if (cible === "dramas")    initDramas();
      if (cible === "humeurs")   initHumeurs();
    }, 350);
    return r;
  };
})();

// Auto-deep-link /secret-juillet → naviguer vers capsules
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (location.pathname.includes("secret-juillet") || location.hash === "#secret-juillet") {
      if (typeof naviguer === "function") naviguer("capsules");
    }
  }, 1500);
});
