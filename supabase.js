/**
 * ================================================================
 * SUPABASE.JS — Configuration de la base de données
 * ----------------------------------------------------------------
 * ✏️  MODIFIER ICI après avoir créé ton projet Supabase :
 *
 *   1. Va sur https://supabase.com → New project
 *   2. Copie ton "Project URL" et "anon public key"
 *   3. Remplace les valeurs ci-dessous
 *
 * ⚠️  La clé "anon" est publique — c'est normal de la mettre ici.
 *     Elle permet seulement de lire/écrire selon les règles RLS.
 * ================================================================
 */

// ✏️ REMPLACE CES DEUX VALEURS PAR LES TIENNES
const SUPABASE_URL  = "https://XXXXXXXXXXXX.supabase.co";
const SUPABASE_ANON = "eyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

// ================================================================
// NE PAS MODIFIER EN DESSOUS
// ================================================================

// Client Supabase léger (sans SDK — appels fetch directs)
const db = {
  url:  SUPABASE_URL,
  key:  SUPABASE_ANON,

  headers() {
    return {
      "Content-Type":  "application/json",
      "apikey":        this.key,
      "Authorization": "Bearer " + this.key,
      "Prefer":        "return=representation"
    };
  },

  // Lire toutes les lignes d'une table (avec filtre optionnel)
  async lire(table, filtre = "") {
    const r = await fetch(`${this.url}/rest/v1/${table}?${filtre}&order=created_at.asc`, {
      headers: this.headers()
    });
    if (!r.ok) { console.error("Supabase lire:", await r.text()); return []; }
    return r.json();
  },

  // Insérer une ligne
  async inserer(table, data) {
    const r = await fetch(`${this.url}/rest/v1/${table}`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(data)
    });
    if (!r.ok) { console.error("Supabase inserer:", await r.text()); return null; }
    const res = await r.json();
    return Array.isArray(res) ? res[0] : res;
  },

  // Mettre à jour une ligne par id
  async modifier(table, id, data) {
    const r = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
      method: "PATCH",
      headers: this.headers(),
      body: JSON.stringify(data)
    });
    if (!r.ok) { console.error("Supabase modifier:", await r.text()); return null; }
    const res = await r.json();
    return Array.isArray(res) ? res[0] : res;
  },

  // Supprimer une ligne par id
  async supprimer(table, id) {
    const r = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
      method: "DELETE",
      headers: this.headers()
    });
    if (!r.ok) { console.error("Supabase supprimer:", await r.text()); return false; }
    return true;
  },

  // Upload d'image dans Supabase Storage
  async uploadImage(bucket, chemin, fichier) {
    const r = await fetch(`${this.url}/storage/v1/object/${bucket}/${chemin}`, {
      method: "POST",
      headers: {
        "apikey":        this.key,
        "Authorization": "Bearer " + this.key,
        "Content-Type":  fichier.type,
        "x-upsert":      "true"
      },
      body: fichier
    });
    if (!r.ok) { console.error("Supabase upload:", await r.text()); return null; }
    return `${this.url}/storage/v1/object/public/${bucket}/${chemin}`;
  }
};
