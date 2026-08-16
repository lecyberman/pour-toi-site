/* ============================================================
   /api/inbox — Fonction serverless Vercel (lecture admin sécurisée).
   Lit les tables privées (demandes, idées, bien-être) avec la clé
   SERVICE ROLE, côté serveur uniquement. Jamais exposée au client.
   Protégée par un mot de passe (variable d'environnement).

   Variables d'environnement requises (Vercel > Settings > Env) :
     SUPABASE_URL                = https://xxxx.supabase.co
     SUPABASE_SERVICE_ROLE_KEY   = (clé service_role, SECRÈTE)
     ADMIN_PASSWORD              = (ton mot de passe de réception)
   ============================================================ */

export default async function handler(req, res) {
  const URL = process.env.SUPABASE_URL;
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const PWD = process.env.ADMIN_PASSWORD;

  if (!URL || !KEY || !PWD) {
    return res.status(503).json({
      error: "config",
      message: "Variables d'environnement manquantes sur Vercel : SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD."
    });
  }

  // Mot de passe : en-tête ou query
  const given = req.headers["x-admin-password"] || (req.query && req.query.pw) || "";
  if (given !== PWD) {
    return res.status(401).json({ error: "auth", message: "Mot de passe incorrect." });
  }

  const headers = {
    apikey: KEY,
    Authorization: "Bearer " + KEY,
    "Content-Type": "application/json"
  };

  async function read(table) {
    const r = await fetch(URL + "/rest/v1/" + table + "?select=*&order=created_at.desc", { headers });
    return r.ok ? r.json() : [];
  }

  try {
    // Action : marquer une demande comme lue
    if (req.method === "POST" && req.query && req.query.action === "read") {
      const id = req.query.id;
      if (id) {
        await fetch(URL + "/rest/v1/site_requests?id=eq." + id, {
          method: "PATCH",
          headers: { ...headers, Prefer: "return=minimal" },
          body: JSON.stringify({ read_by_me: true })
        });
      }
      return res.status(200).json({ ok: true });
    }

    const [requests, ideas, wellbeing] = await Promise.all([
      read("site_requests"),
      read("site_ideas"),
      read("wellbeing_checkins")
    ]);

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ requests, ideas, wellbeing });
  } catch (e) {
    return res.status(500).json({ error: "server", message: String(e) });
  }
}
