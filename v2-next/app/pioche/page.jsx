"use client";
import { useMemo, useRef, useState } from "react";

const MOTS = [
  "Si tu lis ça, c'est que tu me manques. Et si tu ne lis pas ça, tu me manques quand même.",
  "Je t'aime les jours faciles, et je t'aime encore plus les jours compliqués.",
  "Où que je sois, une partie de moi est toujours restée à côté de toi.",
  "Tu es la première belle pensée de mes matins et la dernière de mes nuits.",
  "Je ne compte pas les kilomètres entre nous. Je compte les fois où je vais te serrer fort.",
  "Ton rire, c'est ma chanson préférée. Je la connais par cœur et je ne m'en lasse pas.",
  "Merci d'exister exactement comme tu es. Je ne changerais rien.",
  "Quand tu doutes de toi, souviens-toi que moi, je n'ai jamais douté de toi une seule seconde.",
  "Tu es mon endroit préféré, même quand on est loin.",
  "Je t'ai choisie, et je te rechoisis chaque jour, sans hésiter.",
  "Respire. Je suis là, à un message, à une pensée, à un bocal de distance.",
  "Tu n'as pas à être forte tout le temps. Avec moi, tu as le droit d'être juste toi.",
  "Sept ans, et tu me fais toujours le même effet. C'est toi, c'est comme ça.",
  "Si un jour tu te sens seule, ouvre ce bocal : je serai toujours dedans.",
  "Je suis fier de toi. De tout ce que tu traverses, de tout ce que tu es.",
  "Tu es belle quand tu ris, belle quand tu boudes, belle même quand tu ne me crois pas.",
  "On a construit quelque chose que la distance n'arrive pas à casser. C'est rare. C'est nous.",
  "Ce soir, où que tu sois, tu es aimée. Garde ça avec toi pour dormir.",
  "Je pense à toi plus souvent que tu ne l'imagines. Là, par exemple.",
  "Ma place préférée au monde, c'est tout contre toi. Le reste, c'est juste en attendant.",
  "Tu comptes plus que tout ce que je pourrais écrire dans ce petit bocal.",
  "Prends soin de toi comme je prendrais soin de toi si j'étais là.",
  "Un jour, il n'y aura plus d'écran entre nous. En attendant, il y a ce mot, et tout mon amour dedans.",
  "Je t'aime. Simplement, entièrement, sans date d'expiration."
];

function melange() {
  const d = MOTS.map((_, i) => i);
  for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
  return d;
}

export default function Pioche() {
  const deck = useRef(melange());
  const [mot, setMot] = useState(null);
  const [reste, setReste] = useState(MOTS.length);
  const [on, setOn] = useState(false);

  const coeurs = useMemo(() => {
    const ic = ["🤍", "💜", "✨", "💫"];
    return Array.from({ length: 7 }, (_, i) => ({
      c: ic[i % ic.length],
      left: 12 + Math.random() * 72,
      top: 18 + Math.random() * 60,
      delay: (Math.random() * 4).toFixed(2),
      dur: (4 + Math.random() * 3).toFixed(2)
    }));
  }, []);

  const piocher = () => {
    if (deck.current.length === 0) deck.current = melange();
    const idx = deck.current.pop();
    setOn(false);
    setTimeout(() => { setMot(MOTS[idx]); setOn(true); }, 160);
    setReste(deck.current.length);
  };

  return (
    <main className="wrap" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <p className="eyebrow" style={{ fontSize: "1.08rem", margin: "0 0 .35rem" }}>quand tu veux entendre que je t&apos;aime</p>
      <h1 style={{ fontSize: "clamp(2rem,7vw,2.7rem)", color: "var(--titre)", margin: "0 0 .3rem" }}>La pioche du jour</h1>
      <p style={{ color: "var(--texte-doux)", maxWidth: "30ch", margin: 0 }}>Touche le bocal. Il en sort un petit mot de moi, au hasard, rien que pour toi.</p>

      <div onClick={piocher} role="button" aria-label="Piocher un petit mot"
        style={{ position: "relative", width: 186, height: 210, margin: "30px auto 6px", cursor: "pointer" }}>
        <div style={{ position: "absolute", left: "50%", top: 12, transform: "translateX(-50%)", width: 120, height: 22, borderRadius: 10, background: "linear-gradient(180deg,#CBB4EC,#A886DA)", boxShadow: "0 6px 16px -8px rgba(168,134,218,.9)", zIndex: 2 }} />
        <div style={{ position: "absolute", left: "50%", top: 26, transform: "translateX(-50%)", width: 150, height: 170, borderRadius: "22px 22px 28px 28px", background: "linear-gradient(180deg, rgba(203,180,236,.16), rgba(168,134,218,.10))", border: "2px solid rgba(203,180,236,.5)", boxShadow: "inset 0 10px 30px rgba(255,255,255,.12), 0 18px 40px -18px rgba(168,134,218,.7)", overflow: "hidden" }}>
          {coeurs.map((h, i) => (
            <i key={i} style={{ position: "absolute", left: h.left + "%", top: h.top + "%", fontSize: "1.1rem", fontStyle: "normal", animation: `pflotte ${h.dur}s ease-in-out ${h.delay}s infinite` }}>{h.c}</i>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "34ch", width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "22px 20px", margin: "14px auto 0", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(10px)", transition: "opacity .5s ease, transform .5s cubic-bezier(.22,.61,.36,1)", minHeight: mot ? "auto" : 0 }}>
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.16rem", lineHeight: 1.7, color: "var(--titre)", margin: 0 }}>{mot}</p>
        <span style={{ display: "block", marginTop: 12, fontSize: ".82rem", color: "var(--accent)" }}>Mathieu 🤍</span>
      </div>

      <button onClick={piocher} style={{ marginTop: 22, fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1rem", borderRadius: 100, padding: "14px 26px", cursor: "pointer", border: "1px solid transparent", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", boxShadow: "0 14px 32px -14px rgba(168,134,218,.8)" }}>
        {mot ? "En piocher un autre" : "Piocher un mot"}
      </button>
      <p style={{ marginTop: 14, color: "var(--texte-doux)", fontSize: ".8rem", opacity: .7, minHeight: "1.1em" }}>{mot ? `Il en reste ${reste} avant d'avoir fait le tour.` : ""}</p>

      <style>{`@keyframes pflotte{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-8px) rotate(4deg)}}`}</style>
    </main>
  );
}
