"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const NOMS = { elle: "dadoucherie", lui: "Mathieu" };
function roleLocal() { try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; } }
function ilya(iso) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return "à l'instant";
  if (d < 3600) return "il y a " + Math.floor(d / 60) + " min";
  if (d < 86400) return "il y a " + Math.floor(d / 3600) + " h";
  const j = Math.floor(d / 86400); return j === 1 ? "hier" : "il y a " + j + " jours";
}

export default function PetitsRiens() {
  const [role, setRole] = useState(null);
  const [rows, setRows] = useState([]);
  const [texte, setTexte] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const { data } = await supabase.from("petits_riens").select("role,texte,created_at").order("created_at", { ascending: false }).limit(60);
    setRows(data || []);
  };
  useEffect(() => { setRole(roleLocal()); refresh(); const t = setInterval(refresh, 20000); return () => clearInterval(t); }, []);

  const choisir = (r) => { try { localStorage.setItem("moi_role", r); } catch (e) {} setRole(r); };
  const deposer = async () => {
    const moi = roleLocal(); if (!moi) { setRole(null); return; }
    const t = texte.trim(); if (!t) return;
    setBusy(true);
    await supabase.from("petits_riens").insert({ role: moi, texte: t });
    setTexte(""); setBusy(false); refresh();
  };

  const btnR = (on) => ({ fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: "9px 16px", cursor: "pointer", border: on ? "1px solid transparent" : "1px solid var(--bord)", background: on ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", color: on ? "#1a1430" : "var(--texte)" });

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 16, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>les petites choses qu&apos;on oublie de se dire</p>
        <h1 style={{ fontSize: "clamp(1.8rem,6.5vw,2.4rem)", color: "var(--titre)", margin: 0, lineHeight: 1.15 }}>Le tiroir des petits riens</h1>
        <p style={{ color: "var(--texte-doux)", fontSize: ".92rem", margin: ".5rem auto 0", maxWidth: "38ch", lineHeight: 1.5 }}>Une pensée minuscule, un détail du jour, un « j&apos;ai pensé à toi ». Dépose-le ici, il se posera dans notre tiroir.</p>
      </div>

      {!role ? (
        <div style={{ textAlign: "center", margin: "8px 0 4px", color: "var(--texte-doux)", fontSize: ".9rem" }}>
          Pour déposer un petit rien, dis-moi qui tu es :
          <div style={{ display: "inline-flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => choisir("lui")} style={btnR(true)}>Mathieu</button>
            <button onClick={() => choisir("elle")} style={btnR(false)}>dadoucherie</button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: 8, margin: "20px 0 8px" }}>
            <input value={texte} onChange={(e) => setTexte(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") deposer(); }} maxLength={180} placeholder="j'ai vu un chien qui te ressemblait…" style={{ flex: 1, minWidth: 0, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 100, color: "var(--titre)", padding: "13px 16px", fontFamily: "inherit", fontSize: "1rem" }} />
            <button onClick={deposer} disabled={busy} style={{ fontFamily: "inherit", fontWeight: 700, fontSize: ".95rem", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "0 20px", cursor: "pointer", flexShrink: 0, opacity: busy ? .6 : 1 }}>Déposer</button>
          </div>
          <a onClick={() => { try { localStorage.removeItem("moi_role"); } catch (e) {} setRole(null); }} style={{ display: "block", textAlign: "center", margin: "6px 0 0", fontSize: ".8rem", color: "var(--accent)", cursor: "pointer", opacity: .8 }}>changer d&apos;identité</a>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {rows.length === 0 && <p style={{ textAlign: "center", color: "var(--texte-doux)", fontStyle: "italic", fontSize: ".92rem", padding: "24px 10px" }}>Le tiroir est encore vide. Dépose le premier petit rien.</p>}
        {rows.map((r, i) => (
          <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "13px 16px" }}>
            <div style={{ fontSize: "1.02rem", color: "var(--texte)", lineHeight: 1.5 }}>{r.texte}</div>
            <div style={{ marginTop: 6, fontSize: ".78rem", color: "var(--texte-doux)" }}>déposé par <b style={{ color: "var(--accent)" }}>{NOMS[r.role] || "quelqu'un"}</b> · {ilya(r.created_at)}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
