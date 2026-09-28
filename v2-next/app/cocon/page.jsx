"use client";
import { useEffect, useRef, useState } from "react";

const CHEMINS = {
  dormir: {
    em: "🌙", titre: "Je n'arrive pas à dormir", sous: "On va ralentir, tout doucement.", pTitre: "Ferme un peu les yeux", resp: true,
    mots: [
      "Tu n'as rien à faire là, juste être. Le sommeil viendra tout seul, comme la marée.",
      "Pose ta tête. Imagine que je suis là, contre toi, ma main qui remonte lentement ton dos.",
      "Laisse tes pensées passer comme des nuages. Tu n'es pas obligée de les retenir.",
      "Écoute juste ton souffle. Un peu plus lent. Un peu plus lourd. C'est bien.",
      "Demain peut attendre. Là, tout de suite, il n'y a que toi, la nuit douce, et moi qui pense à toi.",
      "Tu es en sécurité. Tu peux lâcher. Je veille, même de loin.",
    ], musique: true,
  },
  mal: {
    em: "🤍", titre: "J'ai mal", sous: "Je reste avec toi le temps que ça passe.", pTitre: "Je suis là", resp: true,
    mots: [
      "Je ne peux pas prendre ta douleur, mais je peux rester, et ne pas te laisser seule avec elle.",
      "Respire avec moi, tout doucement. On ne combat rien, on laisse juste un peu de place.",
      "Concentre-toi sur ma voix, sur un souvenir doux : la mer à Malte, ta main dans la mienne.",
      "Tu es courageuse, même quand tu ne t'en rends pas compte. Surtout quand tu ne t'en rends pas compte.",
      "Détends une épaule. Puis l'autre. Desserre la mâchoire. Je suis fière de toi de tenir.",
      "Si c'est trop lourd, appelle-moi, à n'importe quelle heure. Vraiment. Tu n'as jamais à porter ça toute seule.",
    ], musique: true,
  },
  triste: {
    em: "💧", titre: "Je me sens triste", sous: "Tu as le droit. Je ne vais nulle part.", pTitre: "Viens là", resp: false,
    mots: [
      "Tu as le droit d'être triste. Je ne vais pas essayer de réparer, juste rester près de toi.",
      "Rappelle-toi : ce que tu ressens est vrai, mais ce n'est pas toute la vérité sur toi.",
      "Tu es aimée. Beaucoup plus que tu ne le crois, et même les soirs où tu en doutes.",
      "Pense à un truc de nous qui te fait sourire malgré tout. Moi j'en ai mille.",
      "Ça va passer. Pas parce que je le dis, mais parce que ça passe toujours, et que je serai là avant, pendant, après.",
      "Tu comptes. Pour moi, tu es ce qui rend tout le reste plus doux.",
    ], musique: true,
  },
  douceur: {
    em: "✨", titre: "J'ai juste besoin de douceur", sous: "Alors en voilà, rien que pour toi.", pTitre: "Rien que pour toi", resp: false,
    mots: [
      "Tu es la première chose belle à laquelle je pense le matin.",
      "Si je pouvais, je te garderais tout contre moi jusqu'à ce que tu ailles mieux.",
      "Tu es mon endroit préféré, même quand cet endroit est juste un message.",
      "Merci d'exister, sincèrement. Le monde est plus doux parce que tu es dedans.",
      "Un jour on repensera à ce soir, blottis quelque part, et on sera bien.",
      "Tu es aimée, tu es en sécurité, tu es à moi et je suis à toi.",
    ], musique: true,
  },
  aime: {
    em: "💗", titre: "Rappelle-moi pourquoi tu m'aimes", sous: "Autant de fois que tu veux.", pTitre: "Pourquoi je t'aime", resp: false,
    mots: [
      "Parce que tu ris à tes propres blagues avant même de les finir, et que je trouve ça adorable.",
      "Parce que tu es douce, même quand la vie ne l'est pas avec toi.",
      "Parce que tu me comprends sans que j'aie besoin de tout expliquer.",
      "Parce que ta présence, même à travers un écran, rend tout plus léger.",
      "Parce que tu es courageuse, tellement plus que tu ne le crois.",
      "Parce que tu es belle, dedans comme dehors, et que tu ne t'en rends même pas compte.",
      "Parce qu'avec toi, même les silences sont bien.",
      "Parce que tu es ma maison, où que je sois.",
      "Parce que tu m'as choisi, moi, et je n'oublie jamais la chance que c'est.",
      "Parce que je t'aime pour mille raisons, et pour aucune : je t'aime, c'est tout.",
    ], musique: false,
  },
};
const ORDRE = ["dormir", "mal", "triste", "douceur", "aime"];
function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms || 18); } catch (e) {} }

export default function Cocon() {
  const [courant, setCourant] = useState(null);
  const [idxMot, setIdxMot] = useState(0);
  const [mot, setMot] = useState("");
  const [respTxt, setRespTxt] = useState("on respire ensemble ?");
  const [bulleEtat, setBulleEtat] = useState("");
  const respTimer = useRef(null);

  const c = courant ? CHEMINS[courant] : null;

  const stopResp = () => { if (respTimer.current) { clearTimeout(respTimer.current); respTimer.current = null; } setBulleEtat(""); setRespTxt("on respire ensemble ?"); };
  const cycle = () => {
    setRespTxt("inspire…"); setBulleEtat("in");
    respTimer.current = setTimeout(() => {
      setRespTxt("retiens…");
      respTimer.current = setTimeout(() => {
        setRespTxt("souffle…"); setBulleEtat("out");
        respTimer.current = setTimeout(cycle, 6000);
      }, 2000);
    }, 4000);
  };

  useEffect(() => () => stopResp(), []);
  useEffect(() => {
    if (c && c.resp) { stopResp(); cycle(); } else { stopResp(); }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courant]);

  const ouvrir = (k) => { setCourant(k); setIdxMot(0); setMot(CHEMINS[k].mots[0]); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const fermer = () => { setCourant(null); stopResp(); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };
  const encore = () => { const n = idxMot + 1; setIdxMot(n); setMot(c.mots[n % c.mots.length]); buzz(12); };
  const tenirMain = () => { buzz([20, 60, 20]); setMot("Je te serre fort. Là. Tu la sens ?"); };

  const btn = (txt, primary, fn) => (
    <button onClick={fn} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".94rem", borderRadius: 100, padding: "11px 20px", cursor: "pointer", border: primary ? "1px solid transparent" : "1px solid var(--bord)", color: primary ? "#1a1430" : "var(--texte)", background: primary ? "linear-gradient(180deg,#CBB4EC,#A886DA)" : "var(--carte)" }}>{txt}</button>
  );

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>

      {!courant && (
        <>
          <div style={{ textAlign: "center", marginBottom: 26 }}>
            <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>quand la nuit est un peu difficile</p>
            <h1 style={{ fontSize: "clamp(2rem,7vw,2.9rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Ton cocon</h1>
            <p style={{ color: "var(--texte-doux)", lineHeight: 1.7, margin: ".4rem auto 0", maxWidth: 440 }}>Viens là. Il n&apos;y a rien à faire, rien à réussir. Choisis juste ce que tu ressens, et laisse-moi rester avec toi un moment.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 10 }}>
            {ORDRE.map((k) => {
              const ch = CHEMINS[k];
              return (
                <button key={k} onClick={() => ouvrir(k)} style={{ textAlign: "left", width: "100%", cursor: "pointer", color: "var(--texte)", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: "1.9rem", lineHeight: 1 }}>{ch.em}</span>
                  <span>
                    <span style={{ display: "block", fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.25rem", color: "var(--titre)" }}>{ch.titre}</span>
                    <span style={{ display: "block", color: "var(--texte-doux)", fontSize: ".9rem", marginTop: 2 }}>{ch.sous}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 34 }}>
            <a href="/chansons" style={{ color: "var(--accent)", textDecoration: "none", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.02rem" }}>→ Nos chansons, si tu veux de la musique</a>
          </div>
        </>
      )}

      {c && (
        <div>
          <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.5rem", color: "var(--titre)", textAlign: "center", margin: "6px 0 4px" }}>{c.pTitre}</div>
          {c.resp && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "14px 0 6px" }}>
              <div style={{ width: 150, height: 150, borderRadius: "50%", margin: "8px 0 10px", background: "radial-gradient(circle at 50% 40%, #C7B2E6 0%, #8E6FBF 45%, rgba(142,111,191,0) 72%)", boxShadow: "0 0 60px -6px rgba(142,111,191,.6)", opacity: .92, transition: "transform 4s cubic-bezier(.4,0,.4,1), opacity 1s", transform: bulleEtat === "in" ? "scale(1.5)" : "scale(1)" }} />
              <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontSize: "1.15rem", minHeight: "1.4em", letterSpacing: ".02em" }}>{respTxt}</div>
            </div>
          )}
          <div style={{ minHeight: "5.5em", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: "1.12rem", lineHeight: 1.75, color: "var(--texte)", padding: "6px 6px 0" }}>{mot}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 22 }}>
            {btn("Encore un mot", false, encore)}
            {c.musique && btn("Mets une chanson", false, () => { window.location.href = "/chansons"; })}
            {btn("Tiens ma main", false, tenirMain)}
            {btn("Revenir", true, fermer)}
          </div>
        </div>
      )}
    </main>
  );
}
