"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STATUTS = ["à voir", "en cours", "terminé", "coup de cœur", "abandonné"];

function etoilesTxt(n) { n = +n || 0; return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }

export default function Dramas() {
  const [rows, setRows] = useState(null);
  const [titre, setTitre] = useState("");
  const [emoji, setEmoji] = useState("");
  const [statut, setStatut] = useState("à voir");
  const [note, setNote] = useState(0);
  const [com, setCom] = useState("");
  const [msg, setMsg] = useState("");

  const charger = async () => {
    const { data } = await supabase.from("dramas").select("titre,emoji,statut,note,commentaire,created_at").order("created_at", { ascending: false });
    setRows(data || []);
  };

  useEffect(() => { charger(); }, []);

  const ajouter = async () => {
    const t = titre.trim();
    if (!t) { setMsg("Il faut au moins un titre."); return; }
    setMsg("…");
    const { error } = await supabase.from("dramas").insert({ titre: t, emoji: emoji.trim() || "📺", statut, note: note || null, commentaire: com.trim() || null });
    if (error) { setMsg("Oups, réessaie."); return; }
    setTitre(""); setEmoji(""); setStatut("à voir"); setNote(0); setCom("");
    setMsg("Ajouté à nos soirées. 🍿");
    charger();
  };

  const field = { background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit", fontSize: "1rem" };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/surprise">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>nos petits épisodes</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Nos dramas</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Ce qu&apos;on regarde, ce qu&apos;on a aimé, ce qu&apos;on veut voir. Nos soirées canapé, en une liste.</p>
      </div>

      <div>
        {rows === null && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Chargement…</p>}
        {rows !== null && rows.length === 0 && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Aucun drama pour l&apos;instant. Ajoute le premier.</p>}
        {(rows || []).map((d, i) => {
          const col = d.statut === "terminé" ? { background: "rgba(140,200,120,.18)", color: "#8ec878" } : d.statut === "coup de cœur" ? { background: "rgba(217,162,162,.2)", color: "#e0a5a5" } : { background: "var(--carte)", color: "var(--texte-doux)" };
          return (
            <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "15px 17px", marginBottom: 11, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: "1.6rem" }}>{d.emoji || "📺"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.12rem", color: "var(--titre)" }}>{d.titre || ""}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: ".74rem", padding: "3px 10px", borderRadius: 100, ...col }}>{d.statut || ""}</span>
                  {d.note ? <span style={{ color: "#d8b878", fontSize: ".95rem", letterSpacing: "1px" }}>{etoilesTxt(d.note)}</span> : null}
                </div>
                {d.commentaire && <div style={{ fontSize: ".9rem", color: "var(--texte-doux)", marginTop: 5, fontStyle: "italic" }}>« {d.commentaire} »</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 22, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Le titre" style={{ ...field, flex: 3, minWidth: 120 }} />
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="📺" maxLength={2} style={{ ...field, flex: 0, minWidth: 64, textAlign: "center" }} />
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <select value={statut} onChange={(e) => setStatut(e.target.value)} style={{ ...field, flex: 1, minWidth: 120 }}>
            {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <div style={{ flex: 1, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center", gap: 2, ...field }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setNote(n)} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: n <= note ? "#d8b878" : "var(--bord)", padding: "0 1px" }}>★</button>
            ))}
          </div>
        </div>
        <input value={com} onChange={(e) => setCom(e.target.value)} placeholder="Un commentaire (optionnel)" style={{ ...field, width: "100%", marginBottom: 10 }} />
        <button onClick={ajouter} style={{ width: "100%", fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: 12, cursor: "pointer" }}>Ajouter</button>
        <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" }}>{msg}</p>
      </div>
    </main>
  );
}
