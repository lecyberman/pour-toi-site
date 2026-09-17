"use client";
import { useEffect, useRef, useState } from "react";

const INVITES = [
  "Vide ce qui pèse ce soir. Écris sans te relire, sans te juger.",
  "Qu'est-ce qui t'empêche de dormir, là, maintenant ?",
  "Dis-le ici. La page ne répète rien, ne garde rien.",
  "Ce qui est trop lourd à porter, pose-le là un moment.",
  "Écris comme si personne ne devait jamais lire. Parce que personne ne lira."
];
const CLE = "journal_nuit_v1";

export default function Journal() {
  const [texte, setTexte] = useState("");
  const [invite, setInvite] = useState(INVITES[0]);
  const [msg, setMsg] = useState("");
  const [parti, setParti] = useState(false);
  const ivRef = useRef(0);

  useEffect(() => {
    const auj = new Date().toISOString().slice(0, 10);
    try {
      const brut = localStorage.getItem(CLE);
      if (brut) {
        const o = JSON.parse(brut);
        if (o && o.date === auj && o.texte) { setTexte(o.texte); setMsg("Repris là où tu t'étais arrêtée cette nuit."); }
        else localStorage.removeItem(CLE);
      }
    } catch (e) {}
    const t = setInterval(() => { ivRef.current = (ivRef.current + 1) % INVITES.length; setInvite(INVITES[ivRef.current]); }, 9000);
    return () => clearInterval(t);
  }, []);

  const auj = () => new Date().toISOString().slice(0, 10);
  const garder = () => {
    if (!texte.trim()) { setMsg("Écris d'abord quelque chose, puis je le garderai pour cette nuit."); return; }
    try { localStorage.setItem(CLE, JSON.stringify({ date: auj(), texte })); } catch (e) {}
    setMsg("Gardé pour cette nuit, juste pour toi. Ça s'effacera au matin. 🤍");
  };
  const partir = () => {
    if (!texte.trim()) { setMsg("Il n'y a rien à laisser partir pour l'instant."); return; }
    try { localStorage.removeItem(CLE); } catch (e) {}
    setParti(true);
    setMsg("");
    setTimeout(() => { setTexte(""); setParti(false); setMsg("C'est parti, comme un souffle. Tu peux respirer. 🤍"); }, 900);
  };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 14, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>rien que pour toi, personne d&apos;autre</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: 0 }}>Ton journal du soir</h1>
      </div>
      <p style={{ textAlign: "center", color: "var(--texte-doux)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem", maxWidth: "36ch", margin: "0 auto 12px", minHeight: "2.6em" }}>{invite}</p>

      <textarea
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Écris ici… ça reste entre toi et cette page."
        style={{ width: "100%", minHeight: "44vh", resize: "vertical", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, color: "var(--titre)", padding: 18, fontFamily: "var(--serif)", fontSize: "1.12rem", lineHeight: 1.8, opacity: parti ? 0 : 1, transition: "opacity .9s ease" }}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 18 }}>
        <button onClick={partir} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "13px 22px", cursor: "pointer", border: "1px solid transparent", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", boxShadow: "0 12px 28px -14px rgba(168,134,218,.8)" }}>Laisser partir</button>
        <button onClick={garder} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "13px 22px", cursor: "pointer", color: "var(--texte)", background: "var(--carte)", border: "1px solid var(--bord)" }}>Garder juste cette nuit</button>
      </div>
      <p style={{ textAlign: "center", marginTop: 14, color: "var(--accent)", fontFamily: "var(--serif)", fontStyle: "italic", minHeight: "1.3em" }}>{msg}</p>

      <p style={{ marginTop: 20, textAlign: "center", color: "var(--texte-doux)", fontSize: ".85rem", lineHeight: 1.6 }}>
        <b style={{ color: "var(--accent)" }}>Rien n&apos;est enregistré, rien n&apos;est envoyé.</b> Ce que tu écris ne quitte pas ton téléphone. « Laisser partir » efface tout. « Garder cette nuit » le garde pour toi seule, et ça s&apos;efface au lever du jour.
      </p>
    </main>
  );
}
