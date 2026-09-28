"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const URL_SB = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
const BUCKET = "livres";
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function taille(n) { if (!n) return ""; if (n < 1048576) return Math.round(n / 1024) + " Ko"; return (n / 1048576).toFixed(1) + " Mo"; }
function urlPublique(chemin) { return URL_SB + "/storage/v1/object/public/" + BUCKET + "/" + chemin.split("/").map(encodeURIComponent).join("/"); }
function safe(s) { return (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "livre"; }

export default function Bibliotheque() {
  const [livres, setLivres] = useState(null);
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [fichier, setFichier] = useState(null);
  const [msg, setMsg] = useState({ t: "", cls: "" });
  const [busy, setBusy] = useState(false);
  const [lecteur, setLecteur] = useState(null); // {titre}
  const [pg, setPg] = useState("–");
  const fileRef = useRef(null);
  const canvasRef = useRef(null);
  const pdf = useRef({ doc: null, num: 1, rendering: false, attente: null, livre: null, sauvT: null });

  useEffect(() => {
    if (!window.pdfjsLib) { const s = document.createElement("script"); s.src = PDFJS; s.onload = () => { if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER; }; document.head.appendChild(s); }
    else window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    charger();
    const onKey = (e) => { if (!pdf.current.doc) return; if (e.key === "ArrowLeft") aller(pdf.current.num - 1); else if (e.key === "ArrowRight") aller(pdf.current.num + 1); else if (e.key === "Escape") fermer(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const charger = async () => { const { data } = await supabase.from("livres").select("*").order("created_at", { ascending: false }); setLivres(data || []); };
  const retirer = async (l) => { if (!confirm("Retirer « " + l.titre + " » de ta bibliothèque ?")) return; await supabase.storage.from(BUCKET).remove([l.chemin]); await supabase.from("livres").delete().eq("id", l.id); charger(); };

  const onFile = (e) => { const f = e.target.files && e.target.files[0] ? e.target.files[0] : null; setFichier(f); if (f && !titre.trim()) setTitre(f.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " ").trim()); };
  const envoyer = async () => {
    setMsg({ t: "", cls: "" });
    if (!fichier) { setMsg({ t: "Choisis d'abord un fichier PDF.", cls: "err" }); return; }
    if (fichier.type && fichier.type.indexOf("pdf") === -1) { setMsg({ t: "Ce fichier n'est pas un PDF.", cls: "err" }); return; }
    if (fichier.size > 52428800) { setMsg({ t: "Ce livre fait " + taille(fichier.size) + ", au-delà de 50 Mo. Compresse-le puis réessaie.", cls: "err" }); return; }
    const t = titre.trim() || fichier.name.replace(/\.pdf$/i, "");
    setBusy(true); setMsg({ t: "Envoi en cours… (les gros livres prennent un moment, ne ferme pas la page)", cls: "" });
    const chemin = Date.now() + "_" + safe(t) + ".pdf";
    const up = await supabase.storage.from(BUCKET).upload(chemin, fichier, { contentType: "application/pdf", upsert: false });
    if (up.error) { setBusy(false); setMsg({ t: "L'envoi n'a pas marché : " + (up.error.message || "réessaie") + ".", cls: "err" }); return; }
    const ins = await supabase.from("livres").insert({ titre: t, auteur: auteur.trim() || null, chemin, taille: fichier.size });
    if (ins.error) { setBusy(false); setMsg({ t: "L'envoi n'a pas marché : " + (ins.error.message || "réessaie") + ".", cls: "err" }); return; }
    setTitre(""); setAuteur(""); setFichier(null); if (fileRef.current) fileRef.current.value = ""; setBusy(false); setMsg({ t: "Ajouté 🤍", cls: "ok" }); charger();
    setTimeout(() => setMsg({ t: "", cls: "" }), 3500);
  };

  const rendre = (n) => {
    const P = pdf.current; if (!P.doc) return; P.rendering = true;
    P.doc.getPage(n).then((page) => {
      const zone = document.getElementById("biblioZone"); const dispo = zone.clientWidth - 28;
      const brut = page.getViewport({ scale: 1 }); const scale = Math.max(0.2, Math.min(3, dispo / brut.width)); const vp = page.getViewport({ scale });
      const canvas = canvasRef.current, ctx = canvas.getContext("2d"); const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(vp.width * dpr); canvas.height = Math.floor(vp.height * dpr); canvas.style.width = Math.floor(vp.width) + "px"; canvas.style.height = Math.floor(vp.height) + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      page.render({ canvasContext: ctx, viewport: vp }).promise.then(() => { P.rendering = false; if (P.attente !== null) { const p = P.attente; P.attente = null; rendre(p); } });
      setPg(n + " / " + P.doc.numPages); zone.scrollTop = 0; sauverPos(n);
    });
  };
  const aller = (n) => { const P = pdf.current; if (!P.doc || n < 1 || n > P.doc.numPages) return; P.num = n; if (P.rendering) P.attente = n; else rendre(n); };
  const sauverPos = (n) => { const P = pdf.current; if (!P.livre) return; try { localStorage.setItem("livre_pos_" + P.livre.id, String(n)); } catch (e) {} clearTimeout(P.sauvT); P.sauvT = setTimeout(() => { supabase.from("livres").update({ page_lue: n }).eq("id", P.livre.id); }, 1200); };

  const ouvrirLivre = (l) => {
    setLecteur({ titre: l.titre }); setPg("–"); document.body.style.overflow = "hidden";
    const P = pdf.current; P.doc = null; P.livre = l;
    let depart = 1; try { const loc = localStorage.getItem("livre_pos_" + l.id); if (loc) depart = parseInt(loc, 10); } catch (e) {}
    if (l.page_lue && l.page_lue > depart) depart = l.page_lue;
    const go = () => window.pdfjsLib.getDocument({ url: urlPublique(l.chemin) }).promise.then((doc) => { P.doc = doc; P.num = Math.min(Math.max(1, depart || 1), doc.numPages); rendre(P.num); }).catch(() => setPg("erreur"));
    if (window.pdfjsLib) go(); else setTimeout(go, 600);
  };
  const fermer = () => { setLecteur(null); document.body.style.overflow = ""; pdf.current.doc = null; charger(); };

  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 18, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>tes lectures, avec toi partout</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.7rem)", color: "var(--titre)", margin: 0 }}>Ta bibliothèque</h1>
        <p style={{ color: "var(--texte-doux)", fontSize: ".95rem", margin: ".5rem 0 0" }}>Ajoute tes livres en PDF, et lis-les ici, tranquillement.</p>
      </div>

      <details style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "4px 16px", margin: "8px 0 22px" }}>
        <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--titre)", padding: "12px 0" }}>+ Ajouter un livre</summary>
        <label style={{ display: "block", fontSize: ".82rem", color: "var(--texte-doux)", margin: "8px 0 4px" }}>Titre</label>
        <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Le titre du livre" style={{ width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "12px 14px", fontFamily: "inherit", fontSize: "1rem", marginBottom: 6 }} />
        <label style={{ display: "block", fontSize: ".82rem", color: "var(--texte-doux)", margin: "8px 0 4px" }}>Auteur (facultatif)</label>
        <input value={auteur} onChange={(e) => setAuteur(e.target.value)} placeholder="L'auteur" style={{ width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "12px 14px", fontFamily: "inherit", fontSize: "1rem", marginBottom: 6 }} />
        <div style={{ margin: "8px 0" }}>
          <label style={{ display: "inline-block", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 100, padding: "11px 18px", cursor: "pointer", fontWeight: 700, fontSize: ".9rem", color: "var(--texte)" }}>Choisir le PDF<input ref={fileRef} type="file" accept="application/pdf,.pdf" onChange={onFile} style={{ display: "none" }} /></label>
          <span style={{ display: "block", fontSize: ".82rem", color: "var(--texte-doux)", marginTop: 6 }}>{fichier ? fichier.name : "Aucun fichier choisi"}</span>
        </div>
        <p style={{ fontSize: ".8rem", color: "var(--texte-doux)", margin: "8px 0 4px", lineHeight: 1.5 }}>Jusqu&apos;à 50 Mo par livre. Si un livre est plus lourd, tu peux le compresser (par ex. sur ilovepdf.com) avant de l&apos;ajouter.</p>
        <button onClick={envoyer} disabled={busy} style={{ fontFamily: "inherit", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "12px 22px", cursor: "pointer", border: "none", color: "#1a1430", background: "linear-gradient(135deg,#C7B2E6,#8E6FBF)", opacity: busy ? .55 : 1 }}>Ajouter à ma bibliothèque</button>
        <p style={{ fontSize: ".9rem", marginTop: 10, minHeight: "1.2em", color: msg.cls === "err" ? "#F0AFA1" : msg.cls === "ok" ? "#8ee6a0" : "var(--texte-doux)" }}>{msg.t}</p>
      </details>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {livres === null && <p style={{ textAlign: "center", color: "var(--texte-doux)", fontStyle: "italic", padding: "26px 10px" }}>Je regarde tes étagères…</p>}
        {livres !== null && livres.length === 0 && <p style={{ textAlign: "center", color: "var(--texte-doux)", fontStyle: "italic", padding: "26px 10px" }}>Ta bibliothèque est encore vide. Ajoute ton premier livre, en haut.</p>}
        {(livres || []).map((l) => (
          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "14px 16px" }}>
            <div style={{ fontSize: "1.8rem", flexShrink: 0 }}>📖</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "1.1rem", lineHeight: 1.25 }}>{l.titre}</div>
              {l.auteur && <div style={{ color: "var(--texte-doux)", fontSize: ".85rem", marginTop: 2 }}>{l.auteur}</div>}
              <div style={{ color: "var(--texte-doux)", fontSize: ".76rem", marginTop: 3, opacity: .8 }}>{taille(l.taille)}{l.page_lue > 1 ? " · reprise page " + l.page_lue : ""}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
              <button onClick={() => ouvrirLivre(l)} style={{ fontFamily: "inherit", fontSize: ".82rem", fontWeight: 700, borderRadius: 100, padding: "8px 14px", cursor: "pointer", border: "1px solid transparent", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)" }}>Lire</button>
              <button onClick={() => retirer(l)} style={{ fontFamily: "inherit", fontSize: ".82rem", fontWeight: 700, borderRadius: 100, padding: "8px 14px", cursor: "pointer", color: "var(--texte-doux)", background: "transparent", border: "1px solid var(--bord)" }}>Retirer</button>
            </div>
          </div>
        ))}
      </div>

      {lecteur && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0b0a16", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "calc(8px + env(safe-area-inset-top)) 12px 8px", background: "rgba(18,16,34,.96)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <button onClick={fermer} style={{ fontFamily: "inherit", fontSize: ".85rem", fontWeight: 700, color: "#EDE9F3", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "8px 12px", cursor: "pointer" }}>‹ Retour</button>
            <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--serif)", fontSize: "1rem", color: "#FBF4EA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lecteur.titre}</span>
          </div>
          <div id="biblioZone" style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: 14 }}>
            <canvas ref={canvasRef} style={{ maxWidth: "100%", height: "auto", boxShadow: "0 20px 50px -20px rgba(0,0,0,.8)", borderRadius: 4, background: "#fff" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "10px 12px calc(10px + env(safe-area-inset-bottom))", background: "rgba(18,16,34,.96)", borderTop: "1px solid rgba(255,255,255,.08)" }}>
            <button onClick={() => aller(pdf.current.num - 1)} style={{ fontFamily: "inherit", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "11px 20px", cursor: "pointer", fontSize: "1rem" }}>‹</button>
            <span style={{ color: "#C9C1D8", fontSize: ".9rem", minWidth: 90, textAlign: "center" }}>{pg}</span>
            <button onClick={() => aller(pdf.current.num + 1)} style={{ fontFamily: "inherit", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "11px 20px", cursor: "pointer", fontSize: "1rem" }}>›</button>
          </div>
        </div>
      )}
    </main>
  );
}
