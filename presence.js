/* presence.js — identité + statut de connexion de l'autre.
   Tu choisis qui tu es (Mathieu ou dadoucherie), puis tu vois si l'autre
   est connecté ou pas, en temps réel (Supabase Realtime, canal "nous-deux-live").
   Sûr : hors-ligne ou lib absente, on garde au moins le choix d'identité.
   Ne pas charger sur /ensemble (qui gère déjà sa propre présence). */
(function () {
  "use strict";
  if (!window.localStorage) return;
  if (location.pathname.indexOf("/ensemble") === 0) return;

  var URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";
  var NOMS = { elle: "dadoucherie", lui: "Mathieu" };
  var AUTRE = { elle: "lui", lui: "elle" };

  function getRole() { try { var r = localStorage.getItem("moi_role"); return (r === "elle" || r === "lui") ? r : null; } catch (e) { return null; } }
  function setRole(r) { try { localStorage.setItem("moi_role", r); } catch (e) {} }

  var badge = document.createElement("div");
  badge.id = "presence-badge";
  badge.style.cssText = "position:fixed;top:calc(10px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);z-index:9998;display:flex;align-items:center;gap:8px;background:rgba(24,22,46,.92);border:1px solid rgba(180,155,218,.4);color:#EDE9F3;font-family:'Nunito Sans',system-ui,sans-serif;font-weight:700;font-size:.83rem;padding:7px 13px;border-radius:100px;box-shadow:0 8px 24px -10px rgba(0,0,0,.7);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);max-width:94vw;white-space:nowrap;";
  function mount() { if (!document.body) { document.addEventListener("DOMContentLoaded", mount); return; } if (!badge.parentNode) document.body.appendChild(badge); }
  mount();

  var client = null, canal = null, autreEnLigne = false, souscrit = false;

  function dot(color) { return '<span style="width:8px;height:8px;border-radius:50%;background:' + color + ';box-shadow:0 0 8px ' + color + ';flex:none"></span>'; }
  function lienChanger() { return ' <a href="#" data-changer="1" style="color:#B49BDA;text-decoration:none;font-weight:600;opacity:.7;margin-left:2px">changer</a>'; }

  function render() {
    var r = getRole();
    if (!r) {
      badge.innerHTML =
        '<span style="opacity:.85">Qui es-tu&nbsp;?</span>' +
        '<button data-r="lui" style="cursor:pointer;border:none;border-radius:100px;padding:5px 12px;font-weight:700;font-family:inherit;color:#1a1430;background:linear-gradient(135deg,#CBB4EC,#A886DA)">Mathieu</button>' +
        '<button data-r="elle" style="cursor:pointer;border:1px solid rgba(255,255,255,.25);border-radius:100px;padding:5px 12px;font-weight:700;font-family:inherit;color:#EDE9F3;background:rgba(255,255,255,.06)">dadoucherie</button>';
      return;
    }
    var autre = NOMS[AUTRE[r]];
    var accord = AUTRE[r] === "elle" ? "connectée" : "connecté";
    if (!souscrit) {
      badge.innerHTML = dot("#c9a86a") + '<span>connexion…</span>' + lienChanger();
    } else if (autreEnLigne) {
      badge.innerHTML = '<a href="/ensemble" style="color:inherit;text-decoration:none;display:flex;align-items:center;gap:8px">' + dot("#8ee6a0") + '<span>' + autre + ' est là, en ce moment 🤍</span></a>' + lienChanger();
    } else {
      badge.innerHTML = dot("#6f6a80") + '<span style="opacity:.9">' + autre + " n'est pas " + accord + '</span>' + lienChanger();
    }
  }

  badge.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-r]") : null;
    if (b) { setRole(b.getAttribute("data-r")); render(); demarrer(); return; }
    var c = e.target.closest ? e.target.closest("[data-changer]") : null;
    if (c) { e.preventDefault(); try { if (canal) canal.untrack(); } catch (e2) {} try { localStorage.removeItem("moi_role"); } catch (e2) {} autreEnLigne = false; souscrit = false; render(); }
  });

  function chargerLib(cb) {
    if (window.supabase && window.supabase.createClient) return cb();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = cb; s.onerror = function () {};
    document.head.appendChild(s);
  }

  function demarrer() {
    var r = getRole(); if (!r) return;
    chargerLib(function () {
      if (!window.supabase || !window.supabase.createClient) return;
      try {
        if (!client) client = window.supabase.createClient(URL, ANON, { realtime: { params: { eventsPerSecond: 5 } } });
        if (canal) { try { canal.untrack(); client.removeChannel(canal); } catch (e) {} canal = null; }
        souscrit = false; autreEnLigne = false; render();
        canal = client.channel("nous-deux-live", { config: { presence: { key: r } } });
        canal.on("presence", { event: "sync" }, function () { maj(r); });
        canal.subscribe(function (st) {
          if (st === "SUBSCRIBED") { souscrit = true; try { canal.track({ role: r, page: location.pathname, at: Date.now() }); } catch (e) {} maj(r); }
        });
      } catch (e) {}
    });
  }

  function maj(r) {
    try { autreEnLigne = Object.keys(canal.presenceState()).indexOf(AUTRE[r]) > -1; } catch (e) { autreEnLigne = false; }
    render();
  }

  window.addEventListener("beforeunload", function () { try { if (canal) canal.untrack(); } catch (e) {} });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && getRole() && canal) { try { canal.track({ role: getRole(), page: location.pathname, at: Date.now() }); } catch (e) {} }
  });

  render();
  if (getRole()) demarrer();
})();
