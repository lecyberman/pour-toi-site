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
  if (cielInitialise) return;
  cielInitialise = true;

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

  // Objets cliquables
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

function validerDessin() {
  const msgs  = messagesApresDessin;
  const msg   = msgs[Math.floor(Math.random() * msgs.length)];
  const div   = document.getElementById("message-apres-dessin");
  document.getElementById("message-apres-texte").textContent = msg;
  div.hidden = false;
  div.scrollIntoView({ behavior: "smooth", block: "nearest" });
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

// ── Initialisation au chargement ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Section accueil active par défaut
  document.getElementById("accueil").classList.add("active");
  document.getElementById("nav-principale").hidden = true;
});
