"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

const PIN = "5922";

// Redimensionne une image (fichier) en dataURL JPEG, comme /galerie.
function fichierEnDataURL(file, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 1400; let { width: w, height: h } = img;
      if (w > max || h > max) { const r = Math.min(max / w, max / h); w = Math.round(w * r); h = Math.round(h * r); }
      const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      try { cb(cv.toDataURL("image/jpeg", 0.82)); } catch (e) { cb(reader.result); }
    };
    img.onerror = () => cb(reader.result);
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

const STATUTS = ["un jour", "à faire", "en cours", "réalisé", "secret"];

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => { try { if (localStorage.getItem("admin_ok_v2") === "1") setOk(true); } catch (e) {} }, []);
  const entrer = () => { if (code.trim() === PIN) { try { localStorage.setItem("admin_ok_v2", "1"); } catch (e) {} setOk(true); } else { setErr("Code incorrect."); setCode(""); } };

  if (!ok) {
    return (
      <main className="wrap" style={{ maxWidth: 420, minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <a className="retour" href="/">⌂ rentrer</a>
        <div style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "26px 24px", textAlign: "center" }}>
          <p className="eyebrow" style={{ margin: "0 0 .3rem" }}>réservé</p>
          <h1 style={{ fontFamily: "var(--serif)", color: "var(--titre)", fontWeight: 500, margin: "0 0 1rem" }}>Tableau de bord</h1>
          <input type="password" value={code} inputMode="numeric" placeholder="Code…" onChange={(e) => { setCode(e.target.value); setErr(""); }} onKeyDown={(e) => { if (e.key === "Enter") entrer(); }}
            style={{ width: "100%", padding: "13px 15px", borderRadius: 12, border: "1px solid var(--bord)", background: "var(--fond,#fff)", color: "var(--texte)", font: "inherit", textAlign: "center", marginBottom: 12 }} />
          <button onClick={entrer} style={{ width: "100%", padding: "13px", borderRadius: 100, border: "none", fontWeight: 700, cursor: "pointer", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)" }}>Entrer</button>
          {err && <p style={{ color: "#e0a5a5", fontSize: ".85rem", marginTop: 10 }}>{err}</p>}
        </div>
      </main>
    );
  }
  return <Dashboard />;
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [images, setImages] = useState([]);
  const [souhaits, setSouhaits] = useState([]);
  const [msg, setMsg] = useState("");
  const fileRef = useRef(null);
  const [nom, setNom] = useState(""); const [emoji, setEmoji] = useState(""); const [note, setNote] = useState(""); const [statut, setStatut] = useState("un jour");

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(""), 3500); };

  const chargerStats = async () => {
    const c = async (type) => (await supabase.from("dadoucherie_journal").select("id", { count: "exact", head: true }).eq("type", type)).count || 0;
    const cnt = async (table) => (await supabase.from(table).select("id", { count: "exact", head: true })).count || 0;
    setStats({
      visites: await c("visite"), coeurs: await c("coeur"), billets: await c("billets"),
      photos: (await cnt("photos")) + (await cnt("galerie")), souhaits: await cnt("souhaits"), mots: await cnt("dadoucherie_mots"),
    });
  };
  const chargerImages = async () => {
    const [p, g] = await Promise.all([
      supabase.from("photos").select("id,image,legende,date,emoji").order("created_at", { ascending: false }),
      supabase.from("galerie").select("id,image,titre,emoji").order("created_at", { ascending: false }),
    ]);
    const arr = [];
    (p.data || []).forEach((x) => arr.push({ table: "photos", id: x.id, image: x.image, leg: x.legende, emoji: x.emoji }));
    (g.data || []).forEach((x) => arr.push({ table: "galerie", id: x.id, image: x.image, leg: x.titre, emoji: x.emoji }));
    setImages(arr);
  };
  const chargerSouhaits = async () => { const { data } = await supabase.from("souhaits").select("id,nom,emoji,note,statut,importance").order("created_at", { ascending: true }); setSouhaits(data || []); };

  useEffect(() => { chargerStats(); chargerImages(); chargerSouhaits(); }, []);

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    fichierEnDataURL(f, async (dataURL) => {
      const { error } = await supabase.from("photos").insert({ image: dataURL, legende: null, date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) });
      if (error) flash("Erreur à l'ajout de la photo."); else { flash("Photo ajoutée à votre galerie. 🤍"); chargerImages(); chargerStats(); }
    });
    e.target.value = "";
  };
  const supprimerImage = async (it) => { if (!confirm("Retirer cette image de la galerie ?")) return; await supabase.from(it.table).delete().eq("id", it.id); chargerImages(); chargerStats(); };

  const ajouterSouhait = async () => {
    const n = nom.trim(); if (!n) return;
    const imp = "normal";
    const { error } = await supabase.from("souhaits").insert({ nom: n, emoji: emoji.trim() || "✦", note: note.trim() || "", statut, importance: imp, fait: statut === "réalisé" });
    if (error) { flash("Erreur à l'ajout."); return; }
    setNom(""); setEmoji(""); setNote(""); setStatut("un jour"); flash("Ajouté à vos rêves. 🤍"); chargerSouhaits(); chargerStats();
  };
  const changerStatut = async (id, s) => { await supabase.from("souhaits").update({ statut: s, fait: s === "réalisé" }).eq("id", id); chargerSouhaits(); };
  const supprimerSouhait = async (id) => { if (!confirm("Supprimer ce souhait ?")) return; await supabase.from("souhaits").delete().eq("id", id); chargerSouhaits(); chargerStats(); };

  const carte = { background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "22px 20px", marginBottom: 20 };
  const h2 = { fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "1.35rem", margin: "0 0 14px" };
  const field = { padding: "11px 14px", borderRadius: 12, border: "1px solid var(--bord)", background: "var(--fond,#fff)", color: "var(--texte)", font: "inherit" };
  const btnP = { padding: "12px 22px", borderRadius: 100, border: "none", fontWeight: 700, cursor: "pointer", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)" };
  const lien = { padding: "11px 18px", borderRadius: 100, border: "1px solid var(--bord)", background: "var(--carte)", color: "var(--texte)", textDecoration: "none", fontWeight: 700, fontSize: ".92rem" };

  return (
    <main className="wrap" style={{ maxWidth: 760, paddingTop: 40, paddingBottom: 60 }}>
      <a className="retour" href="/">⌂ rentrer</a>
      <p className="eyebrow" style={{ margin: "0 0 .2rem" }}>coulisses</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "clamp(1.9rem,6vw,2.5rem)", margin: "0 0 6px" }}>Tableau de bord</h1>
      <p style={{ color: "var(--texte-doux)", margin: "0 0 22px" }}>Le centre de contrôle de votre espace. Tout est à jour, rien que l&apos;utile.</p>

      {msg && <p style={{ background: "rgba(142,230,160,.14)", border: "1px solid rgba(142,230,160,.4)", color: "var(--texte)", borderRadius: 12, padding: "10px 14px", marginBottom: 16 }}>{msg}</p>}

      <div style={carte}>
        <h2 style={h2}>En un coup d&apos;œil</h2>
        {!stats ? <p style={{ color: "var(--texte-doux)" }}>Chargement…</p> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 12 }}>
            {[["visites de sa page", stats.visites], ["appuis sur le cœur", stats.coeurs], ["pluies de billets", stats.billets], ["photos en galerie", stats.photos], ["souhaits", stats.souhaits], ["mots reçus d'elle", stats.mots]].map((s, i) => (
              <div key={i} style={{ textAlign: "center", background: "rgba(142,111,191,.08)", borderRadius: 14, padding: "14px 8px" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.7rem", color: "var(--accent)" }}>{s[1]}</div>
                <div style={{ fontSize: ".78rem", color: "var(--texte-doux)", marginTop: 2 }}>{s[0]}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={carte}>
        <h2 style={h2}>La galerie 🖼️</h2>
        <p style={{ color: "var(--texte-doux)", fontSize: ".92rem", margin: "0 0 12px" }}>Ce que vous ajoutez ici apparaît sur la page /galerie. Touche une image pour la retirer.</p>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        <button onClick={() => fileRef.current && fileRef.current.click()} style={{ ...btnP, marginBottom: 14 }}>+ Ajouter une photo</button>
        {images.length === 0 ? <p style={{ color: "var(--texte-doux)" }}>Aucune photo pour l&apos;instant.</p> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 8 }}>
            {images.map((it) => (
              <button key={it.table + it.id} onClick={() => supprimerImage(it)} title="Retirer" style={{ padding: 0, border: "1px solid var(--bord)", borderRadius: 10, overflow: "hidden", cursor: "pointer", background: "none", position: "relative", aspectRatio: "1/1" }}>
                {it.image ? <img src={it.image} alt={it.leg || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <span style={{ fontSize: "1.6rem" }}>{it.emoji || "🖼️"}</span>}
                <span style={{ position: "absolute", top: 3, right: 3, background: "rgba(20,16,40,.75)", color: "#fff", borderRadius: 100, width: 20, height: 20, fontSize: 13, lineHeight: "20px" }}>✕</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={carte}>
        <h2 style={h2}>Vos souhaits & rêves ✦</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="✦" style={{ ...field, width: 64, textAlign: "center" }} maxLength={2} />
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Un rêve (ex : un road trip en Italie)" style={{ ...field, flex: 3, minWidth: 140 }} />
        </div>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Un mot, pourquoi ce rêve (optionnel)" style={{ ...field, width: "100%", marginBottom: 8, boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <select value={statut} onChange={(e) => setStatut(e.target.value)} style={{ ...field, cursor: "pointer" }}>{STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}</select>
          <button onClick={ajouterSouhait} style={btnP}>Ajouter</button>
        </div>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {souhaits.length === 0 ? <p style={{ color: "var(--texte-doux)" }}>Aucun souhait pour l&apos;instant.</p> : souhaits.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(142,111,191,.06)", borderRadius: 12, padding: "10px 12px" }}>
              <span style={{ fontSize: "1.2rem" }}>{r.emoji || "✦"}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "var(--titre)", fontWeight: 600 }}>{r.nom}</div>
                {r.note && <div style={{ fontSize: ".85rem", color: "var(--texte-doux)" }}>{r.note}</div>}
              </div>
              <select value={r.statut || "un jour"} onChange={(e) => changerStatut(r.id, e.target.value)} style={{ ...field, padding: "6px 10px", fontSize: ".82rem", cursor: "pointer" }}>{STATUTS.map((o) => <option key={o} value={o}>{o}</option>)}</select>
              <button onClick={() => supprimerSouhait(r.id)} title="Supprimer" style={{ background: "none", border: "none", color: "#e0a5a5", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div style={carte}>
        <h2 style={h2}>Raccourcis</h2>
        <p style={{ color: "var(--texte-doux)", fontSize: ".92rem", margin: "0 0 12px" }}>Le quotidien (ses mots, tes bonjours, tes vocaux, sa lettre d&apos;anniversaire) se gère dans ta boîte.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/courrier" style={lien}>💌 Ma boîte (courrier)</a>
          <a href="/galerie" style={lien}>🖼️ Voir la galerie</a>
          <a href="/souhaits" style={lien}>✦ Voir les souhaits</a>
          <a href="/ensemble" style={lien}>✨ Notre salon</a>
        </div>
      </div>
    </main>
  );
}
