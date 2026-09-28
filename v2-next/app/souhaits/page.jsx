"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ORDRE = ["en cours", "à faire", "un jour", "réalisé", "secret"];
const TITRES = { "en cours": "En cours", "à faire": "À faire bientôt", "un jour": "Un jour", "réalisé": "Déjà réalisés", "secret": "Nos rêves secrets" };
const STATUTS = ["un jour", "à faire", "en cours", "réalisé", "secret"];

export default function Souhaits() {
  const [rows, setRows] = useState(null);
  const [nom, setNom] = useState("");
  const [emoji, setEmoji] = useState("");
  const [note, setNote] = useState("");
  const [statut, setStatut] = useState("un jour");
  const [imp, setImp] = useState("normal");
  const [msg, setMsg] = useState("");

  const charger = async () => {
    const { data } = await supabase.from("souhaits").select("id,nom,emoji,note,statut,importance").order("created_at", { ascending: true });
    setRows(data || []);
  };
  useEffect(() => { charger(); }, []);

  const ajouter = async () => {
    const n = nom.trim();
    if (!n) { setMsg("Écris d'abord ton rêve."); return; }
    setMsg("…");
    const { error } = await supabase.from("souhaits").insert({ nom: n, emoji: emoji.trim() || "✦", note: note.trim() || "", statut, importance: imp, fait: statut === "réalisé" });
    if (error) { setMsg("Oups, réessaie."); return; }
    setNom(""); setEmoji(""); setNote(""); setMsg("Ajouté à nos rêves. 🤍");
    charger();
  };

  const changerStatut = async (id, s) => {
    await supabase.from("souhaits").update({ statut: s, fait: s === "réalisé" }).eq("id", id);
    charger();
  };

  const field = { width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit", fontSize: "1rem" };

  const parStatut = {}; ORDRE.forEach((s) => { parStatut[s] = []; });
  (rows || []).forEach((r) => { const s = ORDRE.indexOf(r.statut) >= 0 ? r.statut : "un jour"; parStatut[s].push(r); });
  const vide = rows !== null && (rows || []).length === 0;

  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <a className="retour" href="/surprise">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>à cocher, tous les deux</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Nos rêves à deux</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Tout ce qu&apos;on veut vivre ensemble. Ajoute les tiens, et fais-les avancer. Le jour où un rêve devient réel, il s&apos;illumine.</p>
      </div>

      <div style={{ marginBottom: 26, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Un rêve (ex : un road trip en Italie)" style={{ ...field, flex: 3, minWidth: 120 }} />
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="✦" maxLength={2} style={{ ...field, flex: 0, minWidth: 64, textAlign: "center" }} />
        </div>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Un mot, pourquoi ce rêve (optionnel)" style={{ ...field, marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
          <select value={statut} onChange={(e) => setStatut(e.target.value)} style={{ ...field, flex: 1, minWidth: 120 }}>
            {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={imp} onChange={(e) => setImp(e.target.value)} style={{ ...field, flex: 1, minWidth: 120 }}>
            <option value="normal">envie normale</option>
            <option value="fort">grande envie</option>
          </select>
        </div>
        <button onClick={ajouter} style={{ width: "100%", fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: 12, cursor: "pointer" }}>Ajouter ce rêve</button>
        <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" }}>{msg}</p>
      </div>

      {rows === null && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Chargement de nos rêves…</p>}
      {vide && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Aucun rêve pour l&apos;instant. Ajoute le premier, là-haut.</p>}

      {ORDRE.map((s) => {
        const arr = parStatut[s]; if (!arr.length) return null;
        const realise = s === "réalisé";
        return (
          <div key={s} style={{ marginBottom: 22 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.35rem", display: "flex", alignItems: "center", gap: 10, margin: "0 0 12px", color: "var(--titre)" }}>
              {TITRES[s]} <span style={{ fontSize: ".8rem", color: "var(--texte-doux)", fontFamily: "var(--sans)", fontWeight: 600 }}>{arr.length}</span>
            </h2>
            {arr.map((r) => (
              <div key={r.id} style={{ background: realise ? "linear-gradient(135deg, rgba(216,184,120,.16), rgba(216,184,120,.06))" : "var(--carte)", border: realise ? "1px solid rgba(216,184,120,.35)" : "1px solid var(--bord)", borderRadius: 16, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ fontSize: "1.5rem", lineHeight: 1.2 }}>{r.emoji || "✦"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--titre)" }}>{r.nom || ""}{realise ? " ✓" : ""}</div>
                  {r.note && <div style={{ fontSize: ".92rem", color: "var(--texte-doux)", marginTop: 2 }}>{r.note}</div>}
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    {r.importance === "fort" && <span style={{ fontSize: ".72rem", padding: "3px 9px", borderRadius: 100, background: "rgba(217,162,162,.2)", color: "#e0a5a5" }}>grande envie</span>}
                    <select value={r.statut} onChange={(e) => changerStatut(r.id, e.target.value)} style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--texte)", border: "1px solid var(--bord)", borderRadius: 100, padding: "5px 12px", background: "var(--carte)", cursor: "pointer" }}>
                      {STATUTS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </main>
  );
}
