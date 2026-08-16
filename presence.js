/* presence.js, un badge discret quand l'autre est sur le site en ce moment.
   Utilise Supabase Realtime presence (canal partagé "nous-deux-live").
   Sûr : si hors-ligne ou lib absente, il ne se passe rien. Aucune donnée envoyée ailleurs.
   Ne pas charger sur /ensemble (qui gère déjà sa propre présence). */
(function () {
  "use strict";
  if (!window.localStorage) return;
  if (location.pathname.indexOf("/ensemble") === 0) return;

  var URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";
  var NOMS = { elle: "dadoucherie", lui: "Mathieu" };

  function moiRole() {
    try { var r = localStorage.getItem("moi_role"); if (r === "elle" || r === "lui") return r; } catch (e) {}
    var id; try { id = localStorage.getItem("presence_id"); if (!id) { id = "visiteur-" + Math.random().toString(36).slice(2, 8); localStorage.setItem("presence_id", id); } } catch (e) { id = "visiteur"; }
    return id;
  }
  var moi = moiRole();
  var estRole = (moi === "elle" || moi === "lui");

  function charger(cb) {
    if (window.supabase && window.supabase.createClient) return cb();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = cb; s.onerror = function () {};
    document.head.appendChild(s);
  }

  charger(function () {
    if (!window.supabase || !window.supabase.createClient) return;
    var client, canal;
    try {
      client = window.supabase.createClient(URL, ANON, { realtime: { params: { eventsPerSecond: 5 } } });
      canal = client.channel("nous-deux-live", { config: { presence: { key: moi } } });
    } catch (e) { return; }

    canal.on("presence", { event: "sync" }, maj);
    canal.subscribe(function (st) { if (st === "SUBSCRIBED") { try { canal.track({ role: moi, page: location.pathname, at: Date.now() }); } catch (e) {} maj(); } });

    var badge = null, masque = false;

    function autresClefs() { try { return Object.keys(canal.presenceState()).filter(function (k) { return k !== moi; }); } catch (e) { return []; } }
    function autrePresent() {
      var k = autresClefs();
      if (estRole) return k.indexOf(moi === "elle" ? "lui" : "elle") > -1;
      return k.length > 0;
    }
    function autreNom() {
      if (estRole) return NOMS[moi === "elle" ? "lui" : "elle"];
      var o = autresClefs()[0];
      return (o === "elle" || o === "lui") ? NOMS[o] : "Quelqu'un";
    }

    function maj() {
      if (masque) return;
      var on = autrePresent();
      if (on) {
        if (!badge) {
          badge = document.createElement("a");
          badge.href = "/ensemble";
          badge.id = "presence-badge";
          badge.style.cssText = "position:fixed;top:calc(10px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);z-index:60;display:flex;align-items:center;gap:8px;background:rgba(24,22,46,.92);border:1px solid rgba(142,231,160,.5);color:#EDE9F3;text-decoration:none;font-family:'Nunito Sans',system-ui,sans-serif;font-weight:700;font-size:.85rem;padding:8px 14px;border-radius:100px;box-shadow:0 8px 24px -10px rgba(0,0,0,.7);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);animation:presFade .5s ease;";
          document.body.appendChild(badge);
          if (!document.getElementById("presStyle")) { var st = document.createElement("style"); st.id = "presStyle"; st.textContent = "@keyframes presFade{from{opacity:0;transform:translate(-50%,-6px)}to{opacity:1;transform:translateX(-50%)}}"; document.head.appendChild(st); }
        }
        badge.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#8ee6a0;box-shadow:0 0 8px #8ee6a0"></span> ' + autreNom() + ' est là, en ce moment 🤍';
      } else if (badge) { badge.remove(); badge = null; }
    }

    window.addEventListener("beforeunload", function () { try { canal.untrack(); } catch (e) {} });
    document.addEventListener("visibilitychange", function () { if (!document.hidden) maj(); });
  });
})();
