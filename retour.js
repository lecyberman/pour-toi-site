/* ============================================================
   RETOUR.JS — Un chemin de sortie sur les pages qui n'en ont pas.
   ------------------------------------------------------------
   Certaines pages ont leur propre CSS et ne chargent pas theme.css,
   donc la classe .u-retour n'y est pas disponible. Le style est
   écrit ici en dur pour que le lien fonctionne partout sans
   dépendre de la feuille de la page.

   Ne fait rien si la page a déjà un retour visible : on ne veut
   pas deux boutons qui se superposent.
   ============================================================ */
(function () {
  function dejaPresent() {
    var liens = document.querySelectorAll('a[href="/"], a[href="index.html"], a[href="/index.html"]');
    for (var i = 0; i < liens.length; i++) {
      // un lien caché ou hors écran ne compte pas comme une sortie
      var r = liens[i].getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return true;
    }
    return false;
  }

  function init() {
    if (!document.body || document.getElementById("retour-monde")) return;
    if (dejaPresent()) return;

    var a = document.createElement("a");
    a.id = "retour-monde";
    a.href = "/";
    a.setAttribute("aria-label", "Retour à notre monde");
    a.textContent = "⌂ notre monde";
    a.style.cssText = [
      "position:fixed", "top:16px", "left:16px", "z-index:9998",
      "display:inline-flex", "align-items:center", "gap:.4em",
      "background:rgba(16,20,44,.72)", "color:#EDE9F3",
      "border:1px solid rgba(255,255,255,.16)", "border-radius:100px",
      "font-family:'Nunito Sans',system-ui,sans-serif", "font-weight:600",
      "font-size:.85rem", "padding:.5em .95em", "text-decoration:none",
      "backdrop-filter:blur(8px)", "-webkit-backdrop-filter:blur(8px)",
      "box-shadow:0 10px 26px -14px rgba(0,0,0,.7)",
      "transition:transform .2s ease, border-color .2s ease",
      "-webkit-tap-highlight-color:transparent"
    ].join(";");

    a.addEventListener("mouseenter", function () {
      a.style.transform = "translateY(-1px)";
      a.style.borderColor = "rgba(180,155,218,.5)";
    });
    a.addEventListener("mouseleave", function () {
      a.style.transform = "";
      a.style.borderColor = "rgba(255,255,255,.16)";
    });

    document.body.appendChild(a);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
