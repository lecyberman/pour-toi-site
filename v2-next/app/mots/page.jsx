"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Mots() {
  const [rows, setRows] = useState(null);
  const [auteur, setAuteur] = useState("elle");
  const [mot, setMot] = useState("");
  const [def, setDef] = useState("");
  const [msg, setMsg] = useState("");

  const charger = async () => {
    const { data } = await supabase.from("dico").select("mot,definition,auteur,created_at").order("created_at", { ascending: true });
    setRows(data || []);
  };
  useEffect(() => { charger(); }, []);

  const ajouter = async () => {
    const m = mot.trim(), d = def.trim();
    if (!m || !d) { setMsg("Il faut un mot et sa définition."); return; }
    setMsg("…");
    const { error } = await supabase.from("dico").insert({ mot: m, definition: d, auteur });
    if (error) { setMsg("Oups, réessaie."); return; }
    setMot(""); setDef(""); setMsg("Ajouté à notre langue. 🤍");
    charger();
  };

  const field = { width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit", fontSize: "1rem" };
  const quiBtn = (on) => ({ flex: 1, fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: 9, cursor: "pointer", border: on ? "1px solid transparent" : "1px solid var(--bord)", background: on ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", color: on ? "#1a1430" : "var(--texte)" });

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>notre langue à nous</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Nos mots à nous</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Un carnet secret. Les mots, les surnoms, les private jokes qui n&apos;appartiennent qu&apos;à nous, avec leur vraie définition.</p>
      </div>

      <div>
        {rows === null && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>J&apos;ouvre le carnet…</p>}
        {rows !== null && rows.length === 0 && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Le carnet est vierge. Écris le premier mot, en dessous.</p>}
        {(rows || []).map((m, i) => (
          <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "18px 20px", marginBottom: 12 }}>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 600, fontSize: "1.35rem", color: "var(--accent)" }}>{m.mot}</div>
            <div style={{ fontSize: "1.02rem", lineHeight: 1.65, marginTop: 6, color: "var(--texte)" }}>{m.definition}</div>
            <div style={{ fontSize: ".78rem", color: "var(--texte-doux)", marginTop: 8, letterSpacing: ".04em" }}>ajouté par {m.auteur === "elle" ? "elle" : "Mathieu"}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setAuteur("elle")} style={quiBtn(auteur === "elle")}>c&apos;est elle qui écrit</button>
          <button onClick={() => setAuteur("mathieu")} style={quiBtn(auteur === "mathieu")}>c&apos;est Mathieu</button>
        </div>
        <input value={mot} onChange={(e) => setMot(e.target.value)} placeholder="Le mot ou l'expression" style={{ ...field, marginBottom: 10 }} />
        <textarea value={def} onChange={(e) => setDef(e.target.value)} placeholder="Sa définition à nous…" style={{ ...field, marginBottom: 10, minHeight: 80, resize: "vertical", fontFamily: "var(--serif)" }} />
        <button onClick={ajouter} style={{ width: "100%", fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: 12, cursor: "pointer" }}>Ajouter au dictionnaire</button>
        <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" }}>{msg}</p>
      </div>
    </main>
  );
}
