"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function texteDe(contenu) {
  if (!contenu) return "";
  if (typeof contenu === "string") return contenu;
  if (contenu.texte) return contenu.texte;
  if (Array.isArray(contenu.paragraphes)) return contenu.paragraphes.map((p) => p.texte || p).join("\n\n");
  if (Array.isArray(contenu)) return contenu.map((p) => p.texte || p).join("\n\n");
  return "";
}
function dateFr(d) { return new Date(d + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); }

function dansUnAn() { const d = new Date(); d.setFullYear(d.getFullYear() + 1); return d.toISOString().slice(0, 10); }

export default function Capsules() {
  const [rows, setRows] = useState(null);
  const [ouvertes, setOuvertes] = useState({});
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [emoji, setEmoji] = useState("✉️");
  const [dateOuv, setDateOuv] = useState("");
  const [msg, setMsg] = useState("");

  const charger = async () => {
    const { data } = await supabase.from("capsules").select("*").order("date_ouverture", { ascending: true });
    setRows(data || []);
  };
  useEffect(() => { charger(); }, []);

  const sceller = async () => {
    const t = titre.trim(), c = contenu.trim();
    if (!t || !c || !/^\d{4}-\d{2}-\d{2}$/.test(dateOuv)) { setMsg("Il manque un titre, un message ou une date."); return; }
    const { error } = await supabase.from("capsules").insert({ titre: t, emoji: emoji.trim() || "✉️", contenu: c, date_ouverture: dateOuv });
    if (error) { setMsg("Oups, ça n'a pas été scellé. Réessaie."); return; }
    setTitre(""); setContenu(""); setEmoji("✉️"); setDateOuv(""); setMsg("Scellée. Le temps fera le reste. 🤍");
    setTimeout(() => setMsg(""), 4000); charger();
  };

  const field = { padding: "11px 14px", borderRadius: 12, border: "1px solid var(--bord)", background: "var(--carte)", color: "var(--texte)", font: "inherit" };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/surprise">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>certaines choses méritent d&apos;attendre</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Nos capsules</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Des messages scellés jusqu&apos;à leur date. Impossible d&apos;ouvrir en avance, la patience fait partie du cadeau.</p>
      </div>

      <div style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "20px 20px", marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--titre)", marginBottom: 4 }}>Sceller une nouvelle capsule</div>
        <p style={{ color: "var(--texte-doux)", fontSize: ".9rem", margin: "0 0 12px" }}>Écris un mot à rouvrir plus tard. Elle restera scellée jusqu&apos;à la date choisie.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={2} style={{ ...field, width: 60, textAlign: "center" }} />
          <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Titre (ex : Pour nous, dans un an)" style={{ ...field, flex: 1, minWidth: 0 }} />
        </div>
        <textarea value={contenu} onChange={(e) => setContenu(e.target.value)} placeholder="Le message à sceller. Écris au futur, pour celui ou celle qui l'ouvrira…" style={{ ...field, width: "100%", minHeight: 110, boxSizing: "border-box", marginBottom: 8 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <input value={dateOuv} onChange={(e) => setDateOuv(e.target.value)} placeholder="AAAA-MM-JJ" inputMode="numeric" style={{ ...field, flex: 1, minWidth: 130 }} />
          <button onClick={() => setDateOuv(dansUnAn())} style={{ ...field, cursor: "pointer", fontWeight: 700, color: "var(--accent)" }}>dans 1 an</button>
          <button onClick={sceller} style={{ fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "12px 22px", cursor: "pointer" }}>Sceller 🔒</button>
        </div>
        {msg && <p style={{ color: "var(--accent)", fontSize: ".9rem", marginTop: 10 }}>{msg}</p>}
      </div>

      {rows === null && <p style={{ color: "var(--texte-doux)", fontStyle: "italic", textAlign: "center" }}>J&apos;ouvre le coffre…</p>}
      {rows !== null && rows.length === 0 && <p style={{ color: "var(--texte-doux)", fontStyle: "italic", textAlign: "center" }}>Aucune capsule pour l&apos;instant.</p>}

      {(rows || []).map((c, i) => {
        const ouverte = new Date(c.date_ouverture + "T00:00:00") <= new Date();
        const estOuverte = ouvertes[i];
        return (
          <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "20px 22px", marginBottom: 14, textAlign: "center", opacity: ouverte ? 1 : .9 }}>
            <div style={{ fontSize: "2rem" }}>{c.emoji || (ouverte ? "📬" : "✉️")}</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", margin: "6px 0 4px", color: "var(--titre)" }}>{c.titre || "Une capsule"}</div>
            {!ouverte ? (
              (() => {
                const dodos = Math.ceil((new Date(c.date_ouverture + "T00:00:00") - Date.now()) / 86400000);
                return (
                  <>
                    <div style={{ fontSize: ".9rem", color: "var(--texte-doux)" }}>scellée jusqu&apos;au {dateFr(c.date_ouverture)}</div>
                    <div style={{ fontSize: ".82rem", color: "#c9a94a", marginTop: 8, background: "rgba(216,184,120,.15)", borderRadius: 100, display: "inline-block", padding: "4px 14px" }}>encore {dodos} dodo{dodos > 1 ? "s" : ""}</div>
                  </>
                );
              })()
            ) : (
              <>
                <div style={{ fontSize: ".9rem", color: "var(--texte-doux)" }}>prête à s&apos;ouvrir</div>
                {!estOuverte
                  ? <div style={{ marginTop: 12 }}><button onClick={() => setOuvertes((o) => ({ ...o, [i]: true }))} style={{ fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "11px 22px", cursor: "pointer" }}>Ouvrir la capsule</button></div>
                  : <div style={{ marginTop: 14, borderTop: "1px dashed var(--bord)", paddingTop: 14, fontSize: "1.04rem", lineHeight: 1.7, whiteSpace: "pre-line", textAlign: "left", color: "var(--texte)" }}>{texteDe(c.contenu)}</div>}
              </>
            )}
          </div>
        );
      })}
    </main>
  );
}
