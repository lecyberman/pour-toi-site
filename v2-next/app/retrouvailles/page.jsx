"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

function roleLocal() {
  try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; }
}
function motPour(j) {
  if (j <= 0) return "C'est aujourd'hui. Va te préparer, j'arrive te serrer fort. 🤍";
  if (j === 1) return "Demain. Demain, je te retrouve. Je n'ai jamais aussi bien dormi qu'avant un jour pareil.";
  if (j <= 7) return "Plus que quelques jours. Je compte les heures comme un gamin avant Noël.";
  if (j <= 30) return "On y est presque. Chaque jour qui passe est un jour de moins à être loin de toi.";
  return "C'est encore un peu loin, mais c'est écrit maintenant. Et tout ce qui est écrit avec toi finit par arriver.";
}

export default function Retrouvailles() {
  const [role, setRole] = useState(null);
  const [cible, setCible] = useState(null);
  const [lieu, setLieu] = useState(null);
  const [reste, setReste] = useState({ j: 0, h: 0, m: 0, s: 0 });
  const [aDate, setADate] = useState(false);
  const [ouvertReg, setOuvertReg] = useState(false);
  const [inDate, setInDate] = useState("");
  const [inLieu, setInLieu] = useState("");
  const [ok, setOk] = useState("");
  const tick = useRef(null);

  const charger = async () => {
    const { data } = await supabase.from("retrouvailles").select("date_cible,lieu").eq("id", 1).maybeSingle();
    if (data && data.date_cible) {
      setADate(true); setLieu(data.lieu || null);
      setCible(new Date(data.date_cible + "T12:00:00"));
      setInDate(data.date_cible); if (data.lieu) setInLieu(data.lieu);
    } else { setADate(false); setCible(null); }
  };

  useEffect(() => { setRole(roleLocal()); charger(); }, []);

  useEffect(() => {
    if (!cible) return;
    const maj = () => {
      let diff = Math.max(0, cible.getTime() - Date.now());
      let s = Math.floor(diff / 1000);
      const j = Math.floor(s / 86400); s -= j * 86400;
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      setReste({ j, h, m, s });
    };
    maj(); tick.current = setInterval(maj, 1000);
    return () => clearInterval(tick.current);
  }, [cible]);

  const enregistrer = async () => {
    if (!inDate) { setOk("Choisis une date d'abord."); return; }
    setOk("…");
    const { error } = await supabase.from("retrouvailles").update({ date_cible: inDate, lieu: inLieu || null, updated_at: new Date().toISOString() }).eq("id", 1);
    if (error) setOk("Oups, réessaie."); else { setOk("C'est noté 🤍"); charger(); }
  };

  const joursRest = cible ? Math.ceil((cible.getTime() - Date.now()) / 86400000) : 0;
  const bloc = (n, l) => (
    <div style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "14px 10px", minWidth: 74 }}>
      <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: "2rem", color: "var(--titre)", lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: ".72rem", color: "var(--texte-doux)", marginTop: 6, textTransform: "uppercase", letterSpacing: ".08em" }}>{l}</div>
    </div>
  );

  return (
    <main className="wrap" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <a className="retour" href="/surprise">⌂ rentrer</a>
      <p className="eyebrow" style={{ fontSize: "1.08rem", margin: "0 0 .35rem" }}>le prochain moment tout contre toi</p>
      <h1 style={{ fontSize: "clamp(2rem,7vw,2.7rem)", color: "var(--titre)", margin: "0 0 .1rem" }}>Nos retrouvailles</h1>
      {lieu && <p style={{ color: "var(--accent)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem", margin: ".3rem 0 0" }}>à {lieu}</p>}

      {aDate && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "28px 0 6px", flexWrap: "wrap" }}>
          {bloc(reste.j, "jours")}{bloc(reste.h, "heures")}{bloc(reste.m, "min")}{bloc(reste.s, "sec")}
        </div>
      )}

      {aDate
        ? <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--texte)", fontSize: "1.16rem", lineHeight: 1.7, maxWidth: "32ch", margin: "20px auto 0" }}>{motPour(joursRest)}</p>
        : <p style={{ color: "var(--texte-doux)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "32ch", margin: "16px auto 0" }}>{role === "lui" ? "Aucune date posée pour l'instant. Règle-la ci-dessous 🤍" : "Aucune date n'est encore posée. Bientôt, promis, je nous en fixe une."}</p>}

      {role === "lui" && (
        <>
          <a onClick={() => setOuvertReg(!ouvertReg)} style={{ display: "inline-block", marginTop: 18, fontSize: ".8rem", color: "var(--accent)", cursor: "pointer", textDecoration: "underline" }}>régler la date</a>
          {ouvertReg && (
            <div style={{ marginTop: 14, width: "100%", maxWidth: 360, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: 16, textAlign: "left" }}>
              <label style={{ display: "block", fontSize: ".82rem", color: "var(--texte-doux)", margin: "0 0 4px" }}>La date où on se retrouve</label>
              <input type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} style={{ width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit" }} />
              <label style={{ display: "block", fontSize: ".82rem", color: "var(--texte-doux)", margin: "10px 0 4px" }}>Où (facultatif)</label>
              <input type="text" value={inLieu} onChange={(e) => setInLieu(e.target.value)} placeholder="ex : chez toi, à la gare, dans le sud…" style={{ width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit" }} />
              <button onClick={enregistrer} style={{ marginTop: 14, width: "100%", fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: 12, cursor: "pointer" }}>Enregistrer</button>
              <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" }}>{ok}</p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
