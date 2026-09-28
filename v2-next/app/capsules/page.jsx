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

export default function Capsules() {
  const [rows, setRows] = useState(null);
  const [ouvertes, setOuvertes] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("capsules").select("*").order("date_ouverture", { ascending: true });
      setRows(data || []);
    })();
  }, []);

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/surprise">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>certaines choses méritent d&apos;attendre</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Nos capsules</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Des messages scellés jusqu&apos;à leur date. Impossible d&apos;ouvrir en avance, la patience fait partie du cadeau.</p>
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
