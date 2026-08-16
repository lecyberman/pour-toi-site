/* ============================================================
   AMBIANCE.JS — Ce qui fait que le site est un lieu, pas des pages.

   Deux choses, volontairement peu :

   1. TRANSITIONS. Le site est fait de 27 fichiers HTML séparés, donc
      chaque clic était une coupure blanche. Ici la page arrive en
      fondu et repart en fondu : on ne traverse plus des documents,
      on se déplace dans un même endroit.

   2. LUMIÈRE DE L'HEURE. Les nappes de fond (.u-ambient) changent de
      couleur selon le moment de la journée. À 7h ce n'est pas la
      même lumière qu'à 23h. Rien de spectaculaire, juste le
      sentiment que l'endroit est vivant et qu'il l'attend.

   Règles de sûreté :
   - prefers-reduced-motion coupe tout mouvement.
   - Si le JS échoue, la navigation marche quand même (repli minuté).
   - Le retour arrière du navigateur ne laisse jamais un écran vide.
   ============================================================ */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var racine = document.documentElement;

  /* ---------------------------------------------------------
     1. La lumière de l'heure
     --------------------------------------------------------- */
  // Chaque moment donne deux teintes : la nappe chaude et la nappe froide.
  // Valeurs en composantes RVB, pour rester compatibles avec les rgba()
  // déjà utilisées dans theme.css.
  // Les teintes doivent VRAIMENT s'écarter : une première version allait de
  // 214,158,168 le matin à 196,142,168 le soir, soit 24 unités RVB d'écart.
  // À 15 % d'opacité sur fond sombre, c'était rigoureusement invisible.
  // Ici on alterne chaud et froid, pour que 8h et 20h ne se ressemblent pas.
  var MOMENTS = [
    { h: 5,  nom: "aube",      a: "232,160,140", b: "190,150,200" }, // pêche, la lumière qui se lève
    { h: 8,  nom: "matin",     a: "150,180,220", b: "185,200,225" }, // bleu clair, franc
    { h: 12, nom: "journee",   a: "190,165,215", b: "210,180,200" }, // lilas doux
    { h: 18, nom: "soir",      a: "226,135,130", b: "150,110,190" }, // corail chaud
    { h: 21, nom: "nuit",      a: "130,85,180",  b: "80,90,170"   }, // violet profond
    { h: 24, nom: "nuit_tard", a: "78,72,148",   b: "60,66,130"   }  // indigo, presque éteint
  ];

  function momentCourant() {
    var heure = new Date().getHours();
    var choisi = MOMENTS[MOMENTS.length - 1];
    for (var i = 0; i < MOMENTS.length; i++) {
      if (heure >= MOMENTS[i].h) choisi = MOMENTS[i];
    }
    // avant 5h du matin : on reste dans la nuit profonde
    if (heure < 5) choisi = MOMENTS[MOMENTS.length - 1];
    return choisi;
  }

  function poserLumiere() {
    var m = momentCourant();
    racine.style.setProperty("--amb-a", m.a);
    racine.style.setProperty("--amb-b", m.b);
    racine.setAttribute("data-moment", m.nom);
  }
  poserLumiere();
  // Si elle laisse l'onglet ouvert longtemps, la lumière suit quand même.
  setInterval(poserLumiere, 10 * 60 * 1000);

  /* ---------------------------------------------------------
     2. Les transitions entre pages
     --------------------------------------------------------- */
  if (reduce) return;   // aucun mouvement demandé : on s'arrête là

  var DUREE_SORTIE = 340;   // doit rester sous la durée du repli
  var voile = null;

  /* On ne touche NI au body NI à sa mise en page : un voile par-dessus,
     de la couleur réelle du fond de la page. Chaque page a son propre CSS,
     donc cette couleur est lue au moment voulu plutôt que devinée. */
  function couleurDuFond() {
    var els = [document.body, document.documentElement];
    for (var i = 0; i < els.length; i++) {
      if (!els[i]) continue;
      var c = getComputedStyle(els[i]).backgroundColor;
      if (c && c !== "transparent" && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(c)) return c;
    }
    return "#14162E";   // fond nocturne du site, dernier recours
  }

  function creerVoile() {
    if (voile) return voile;
    voile = document.createElement("div");
    voile.id = "amb-voile";
    voile.setAttribute("aria-hidden", "true");
    voile.style.cssText =
      "position:fixed;inset:0;z-index:99999;pointer-events:none;" +
      "background:" + couleurDuFond() + ";opacity:0;" +
      "transition:opacity .34s cubic-bezier(.4,0,.2,1);";
    document.body.appendChild(voile);
    return voile;
  }

  function entrer() {
    if (!document.body) return;
    var v = creerVoile();
    v.style.transition = "none";
    v.style.opacity = "1";
    // deux frames : le temps que le navigateur prenne l'état opaque,
    // sinon la transition ne part pas et la page apparaît d'un coup
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        v.style.transition = "opacity .5s cubic-bezier(.4,0,.2,1)";
        v.style.opacity = "0";
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", entrer);
  else entrer();

  // Retour arrière depuis le cache du navigateur : la page revenait figée
  // en état de sortie, donc entièrement voilée. On la redécouvre.
  window.addEventListener("pageshow", function (e) {
    if (e.persisted && voile) { voile.style.transition = "none"; voile.style.opacity = "0"; }
  });

  function interne(a) {
    if (!a || !a.getAttribute) return false;
    var href = a.getAttribute("href");
    if (!href) return false;
    if (href.charAt(0) === "#") return false;                 // ancre
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
    if (a.target && a.target !== "_self") return false;       // nouvel onglet
    if (a.hasAttribute("download")) return false;
    // même origine seulement
    try {
      var u = new URL(a.href, location.href);
      if (u.origin !== location.origin) return false;
      // même page, seulement le hash qui change : pas de transition
      if (u.pathname === location.pathname && u.search === location.search) return false;
      return true;
    } catch (e) { return false; }
  }

  document.addEventListener("click", function (e) {
    // clic milieu, Ctrl, Cmd, Maj : l'utilisateur veut un autre onglet
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var a = e.target.closest && e.target.closest("a[href]");
    if (!interne(a)) return;

    e.preventDefault();
    var destination = a.href;
    var parti = false;
    function partir() {
      if (parti) return;
      parti = true;
      location.href = destination;
    }

    var v = creerVoile();
    v.style.transition = "opacity " + (DUREE_SORTIE / 1000) + "s cubic-bezier(.4,0,.2,1)";
    v.style.opacity = "1";
    // Repli : même si la transition ne se termine jamais (onglet en
    // arrière-plan, animation coupée), on part quand même.
    setTimeout(partir, DUREE_SORTIE);
  }, false);
})();
