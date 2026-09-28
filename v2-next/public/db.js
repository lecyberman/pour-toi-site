/* ============================================================
   DB.JS — Client Supabase partagé (une seule source de vérité).
   Remplace les mini-clients dupliqués dans chaque page.
   La clé anon est publique par nature ; la confidentialité est
   assurée par les règles RLS côté Supabase (écriture publique,
   lecture privée sur les tables sensibles).
   Usage :
     await DB.insert('site_ideas', { category:'page', idea:'...' })
     const rows = await DB.select('dico', 'order=created_at.asc')
   ============================================================ */
(function (global) {
  var URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";

  function headers(extra) {
    var h = { "Content-Type": "application/json", "apikey": ANON, "Authorization": "Bearer " + ANON };
    for (var k in (extra || {})) h[k] = extra[k];
    return h;
  }

  var DB = {
    url: URL,

    // Lire (renvoie [] si erreur/réseau coupé — jamais de crash visible)
    select: function (table, query) {
      return fetch(URL + "/rest/v1/" + table + "?" + (query || ""), { headers: headers() })
        .then(function (r) { return r.ok ? r.json() : []; })
        .catch(function () { return []; });
    },

    // Écrire (renvoie {ok:true} / {ok:false, error})
    insert: function (table, data) {
      return fetch(URL + "/rest/v1/" + table, {
        method: "POST",
        headers: headers({ "Prefer": "return=minimal" }),
        body: JSON.stringify(data)
      }).then(function (r) {
        return r.ok ? { ok: true } : r.text().then(function (t) { return { ok: false, error: t }; });
      }).catch(function (e) { return { ok: false, error: String(e) }; });
    },

    // Mettre à jour par filtre
    update: function (table, filtre, data) {
      return fetch(URL + "/rest/v1/" + table + "?" + filtre, {
        method: "PATCH",
        headers: headers({ "Prefer": "return=minimal" }),
        body: JSON.stringify(data)
      }).then(function (r) { return { ok: r.ok }; }).catch(function () { return { ok: false }; });
    },

    // Compter (HEAD + count exact)
    count: function (table, filtre) {
      return fetch(URL + "/rest/v1/" + table + "?select=id" + (filtre ? "&" + filtre : ""), {
        method: "HEAD", headers: headers({ "Prefer": "count=exact" })
      }).then(function (r) {
        var cr = r.headers.get("content-range");
        return cr ? parseInt(cr.split("/")[1], 10) : 0;
      }).catch(function () { return 0; });
    }
  };

  global.DB = DB;
})(window);
