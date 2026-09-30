"use client";
import { useEffect, useRef, useState } from "react";

// Carte à gratter. Le lot du jour dépend de la date (renouvelé chaque jour).
const LOTS = [
  "🎟️ Bon pour un câlin de trois minutes chrono, sans lâcher.",
  "💌 Tu es la plus belle chose qui me soit arrivée. Voilà, c'est dit.",
  "🍽️ Bon pour un dîner où tu ne décides de rien, sauf du dessert.",
  "🌷 Bon pour un bouquet, le vrai, à la prochaine occasion.",
  "🎬 Bon pour une soirée film collée-serrée, télécommande interdite pour toi.",
  "☎️ Bon pour un appel surprise, juste pour entendre ta voix.",
  "🤍 Je pense à toi bien plus souvent que tu ne l'imagines.",
  "😴 Bon pour une grasse matinée sans culpabilité, je gère le reste.",
  "🧖‍♀️ Bon pour un moment rien qu'à toi, et moi qui m'occupe de tout.",
  "🎶 Bon pour une chanson que je te dédie, choisie rien que pour toi.",
  "🫶 Tu me rends meilleur. Je ne te le dis pas assez, alors : merci.",
  "🍫 Bon pour une envie sucrée exaucée, quelle qu'elle soit.",
  "✈️ Bon pour une prochaine escapade à deux, on choisit ensemble.",
  "😘 Bon pour autant de bisous que tu veux, sans compter.",
  "🌙 Bon pour une nuit où je reste au téléphone jusqu'à ce que tu dormes.",
  "💬 Bon pour une vraie conversation, longue, comme le 15 juillet.",
  "🥰 Rappelle-toi : même à distance, tu n'es jamais seule. Je suis là.",
  "🎁 Bon pour une petite surprise, un jour où tu t'y attends le moins.",
];

export default function Gratter() {
  const canvasRef = useRef(null);
  const [lot, setLot] = useState("");
  const [revele, setRevele] = useState(false);
  const stateRef = useRef({ down: false, ratioDone: false });

  useEffect(() => {
    const auj = new Date(); const jour = Math.floor(new Date(auj.getFullYear(), auj.getMonth(), auj.getDate()) / 86400000);
    setLot(LOTS[jour % LOTS.length]);
  }, []);

  useEffect(() => {
    if (!lot) return;
    const cv = canvasRef.current; if (!cv) return;
    const x = cv.getContext("2d");
    const rect = cv.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = rect.width * dpr; cv.height = rect.height * dpr; x.scale(dpr, dpr);
    const W = rect.width, H = rect.height;
    // Couche à gratter
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#B49BDA"); g.addColorStop(1, "#8E6FBF");
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = "rgba(255,255,255,.9)"; x.font = "700 18px 'Nunito Sans',system-ui,sans-serif"; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText("🪙 Gratte avec le doigt", W / 2, H / 2);
    x.font = "600 13px 'Nunito Sans',system-ui,sans-serif"; x.fillStyle = "rgba(255,255,255,.7)";
    x.fillText("un petit mot t'attend dessous", W / 2, H / 2 + 26);

    const pos = (e) => { const r = cv.getBoundingClientRect(); const t = e.touches ? e.touches[0] : e; return { x: t.clientX - r.left, y: t.clientY - r.top }; };
    const gratte = (p) => { x.globalCompositeOperation = "destination-out"; x.beginPath(); x.arc(p.x, p.y, 22, 0, 6.28); x.fill(); x.globalCompositeOperation = "source-over"; };
    const check = () => {
      try {
        const img = x.getImageData(0, 0, cv.width, cv.height).data; let clairs = 0;
        for (let i = 3; i < img.length; i += 40) if (img[i] === 0) clairs++;
        const ratio = clairs / (img.length / 40);
        if (ratio > 0.5 && !stateRef.current.ratioDone) { stateRef.current.ratioDone = true; setRevele(true); }
      } catch (e) {}
    };
    const down = (e) => { stateRef.current.down = true; gratte(pos(e)); };
    const move = (e) => { if (!stateRef.current.down) return; e.preventDefault(); gratte(pos(e)); };
    const up = () => { if (stateRef.current.down) { stateRef.current.down = false; check(); } };
    cv.addEventListener("mousedown", down); cv.addEventListener("mousemove", move); window.addEventListener("mouseup", up);
    cv.addEventListener("touchstart", down, { passive: false }); cv.addEventListener("touchmove", move, { passive: false }); window.addEventListener("touchend", up);
    return () => { cv.removeEventListener("mousedown", down); cv.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); cv.removeEventListener("touchstart", down); cv.removeEventListener("touchmove", move); window.removeEventListener("touchend", up); };
  }, [lot]);

  const toutReveler = () => { const cv = canvasRef.current; if (cv) { const x = cv.getContext("2d"); x.clearRect(0, 0, cv.width, cv.height); } setRevele(true); };

  return (
    <main className="wrap" style={{ maxWidth: 520, paddingTop: 40, paddingBottom: 60, textAlign: "center" }}>
      <a className="retour" href="/dadoucherie">⌂ rentrer</a>
      <p className="eyebrow" style={{ margin: "0 0 .3rem" }}>ta carte du jour</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "clamp(1.9rem,6vw,2.5rem)", margin: "0 0 6px" }}>À gratter 🪙</h1>
      <p style={{ color: "var(--texte-doux)", maxWidth: "38ch", margin: "0 auto 22px" }}>Une nouvelle carte chaque jour. Gratte avec le doigt pour découvrir ce qui se cache dessous.</p>

      <div style={{ position: "relative", width: "100%", aspectRatio: "3/2", borderRadius: 18, overflow: "hidden", border: "1px solid var(--bord)", boxShadow: "0 14px 30px -18px rgba(142,111,191,.7)" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", background: "var(--carte)" }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", lineHeight: 1.5, color: "var(--titre)", margin: 0 }}>{lot}</p>
        </div>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none", cursor: "pointer", opacity: revele ? 0 : 1, transition: "opacity .5s ease", pointerEvents: revele ? "none" : "auto" }} />
      </div>

      {!revele
        ? <button onClick={toutReveler} style={{ marginTop: 18, background: "none", border: "none", color: "var(--accent)", textDecoration: "underline", cursor: "pointer", font: "inherit" }}>ou révéler tout de suite</button>
        : <p style={{ marginTop: 18, color: "var(--texte-doux)", fontStyle: "italic" }}>Reviens demain, il y en aura une nouvelle. 🤍</p>}
    </main>
  );
}
