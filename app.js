/* ============================================================
   APP.JS — Comportements d'interface partagés (design system).
   Apparition au scroll, boutons magnétiques, parallaxe douce,
   soumission de formulaire avec états loading/succès/erreur.
   Tout respecte prefers-reduced-motion.
   ============================================================ */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Apparition au scroll (.u-reveal) --- */
  function initReveal() {
    var els = document.querySelectorAll(".u-reveal");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* --- Boutons magnétiques (.u-magnet) — desktop seulement --- */
  function initMagnet() {
    if (reduce || matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".u-magnet").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* --- Parallaxe douce d'un élément (data-parallax="0.04") --- */
  function initParallax() {
    if (reduce || matchMedia("(pointer: coarse)").matches) return;
    var els = [].slice.call(document.querySelectorAll("[data-parallax]"));
    if (!els.length) return;
    window.addEventListener("mousemove", function (e) {
      var cx = (e.clientX / window.innerWidth - 0.5);
      var cy = (e.clientY / window.innerHeight - 0.5);
      els.forEach(function (el) {
        var k = parseFloat(el.dataset.parallax) || 0.04;
        el.style.transform = "translate(" + (cx * k * 100) + "px," + (cy * k * 100) + "px)";
      });
    }, { passive: true });
  }

  /* --- Helper de soumission de formulaire avec états --- */
  // Usage : App.submit(btn, stateEl, () => DB.insert('site_ideas', {...}), 'Merci, c'est noté.')
  window.App = window.App || {};
  window.App.submit = function (btn, stateEl, action, okMsg) {
    if (btn.dataset.busy === "1") return;         // anti double-envoi
    btn.dataset.busy = "1";
    var label = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="u-spinner"></span> Envoi…';
    if (stateEl) { stateEl.textContent = ""; stateEl.className = "u-state"; }
    Promise.resolve(action()).then(function (res) {
      var ok = !res || res.ok !== false;
      btn.disabled = false; btn.dataset.busy = "0"; btn.innerHTML = label;
      if (stateEl) {
        stateEl.textContent = ok ? (okMsg || "Envoyé.") : "Un souci est survenu. Réessaie dans un instant.";
        stateEl.className = "u-state " + (ok ? "u-state--ok" : "u-state--err");
      }
      return ok;
    });
  };

  function boot() { initReveal(); initMagnet(); initParallax(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* ===== Interrupteur clair / sombre (partage) - vague Fondations ===== */
(function () {
  var K = "theme_pref_v1", root = document.documentElement;
  function cur() { var t = root.getAttribute("data-theme"); return t === "clair" ? "clair" : "sombre"; }
  function apply(t) { root.setAttribute("data-theme", t); var b = document.getElementById("bascule-theme"); if (b) b.textContent = t === "sombre" ? "\u2600" : "\u263e"; }
  var p = "sombre"; try { p = localStorage.getItem(K) || "sombre"; } catch (e) {}
  apply(p);
  function init() {
    if (document.getElementById("bascule-theme") || !document.body) return;
    var b = document.createElement("button");
    b.id = "bascule-theme"; b.type = "button";
    b.setAttribute("aria-label", "Changer le theme clair ou sombre");
    b.textContent = cur() === "sombre" ? "\u2600" : "\u263e";
    b.addEventListener("click", function () { var t = cur() === "sombre" ? "clair" : "sombre"; try { localStorage.setItem(K, t); } catch (e) {} apply(t); });
    document.body.appendChild(b);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();


/* ===== Fonctions mobiles : haptique douce, partage natif, invitation a installer ===== */
(function () {
  var HKEY = "haptique_off";
  function canBuzz(){ try { return "vibrate" in navigator && localStorage.getItem(HKEY) !== "1"; } catch (e) { return "vibrate" in navigator; } }
  function buzz(ms){ if (canBuzz()) { try { navigator.vibrate(ms || 8); } catch (e) {} } }
  window.buzzDoux = buzz;
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("button, .u-btn, .u-magnet, .kase, .h, .emo, .chip, .reve select");
    if (t) buzz(8);
  }, { passive: true });

  function initShare() {
    if (!navigator.share || document.getElementById("btn-partage")) return;
    var b = document.createElement("button");
    b.id = "btn-partage"; b.type = "button";
    b.setAttribute("aria-label", "Partager cette page");
    b.textContent = "\u2197";
    b.addEventListener("click", function () {
      buzz(10);
      navigator.share({ title: document.title, text: "Un petit bout de notre monde.", url: location.href }).catch(function(){});
    });
    document.body.appendChild(b);
  }

  var deferred = null, DKEY = "install_masque";
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; showInstall(false); });
  function isIOS(){ return /iphone|ipad|ipod/i.test(navigator.userAgent); }
  function standalone(){ return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; }
  function masque(){ try { return localStorage.getItem(DKEY) === "1"; } catch (e) { return false; } }
  function hideInstall(){ var w = document.getElementById("install-banner"); if (w) { w.classList.remove("on"); setTimeout(function(){ w.remove(); }, 400); } }
  function showInstall(ios) {
    if (standalone() || masque() || document.getElementById("install-banner")) return;
    var wrap = document.createElement("div"); wrap.id = "install-banner";
    var span = document.createElement("span");
    span.textContent = ios
      ? "Ajoute Pour toi a ton ecran d accueil : touche Partager, puis Sur l ecran d accueil."
      : "Installe Pour toi sur ton ecran d accueil, pour l ouvrir comme une vraie app.";
    wrap.appendChild(span);
    var actions = document.createElement("div"); actions.className = "ib-actions";
    if (!ios) {
      var yes = document.createElement("button"); yes.textContent = "Installer"; yes.className = "ib-yes";
      yes.addEventListener("click", function () {
        buzz(10);
        if (deferred) { deferred.prompt(); deferred.userChoice.finally(function(){ deferred = null; hideInstall(); }); } else { hideInstall(); }
      });
      actions.appendChild(yes);
    }
    var no = document.createElement("button"); no.textContent = "Plus tard"; no.className = "ib-no";
    no.addEventListener("click", function () { try { localStorage.setItem(DKEY, "1"); } catch (e) {} hideInstall(); });
    actions.appendChild(no);
    wrap.appendChild(actions);
    document.body.appendChild(wrap);
    requestAnimationFrame(function(){ wrap.classList.add("on"); });
  }

  function bootMobile() {
    initShare();
    if (isIOS() && !standalone()) setTimeout(function(){ showInstall(true); }, 4500);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootMobile); else bootMobile();
})();
