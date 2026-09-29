"use client";
import { useEffect, useRef, useState } from "react";

// Anniversaire de dadoucherie : le 2 octobre.
const MOIS_ANNIV = 9, JOUR_ANNIV = 2; // 9 = octobre (0-indexé)

const LETTRE = [
  "Joyeux anniversaire, ma dadoucherie.",
  "Aujourd'hui, c'est ton jour. Le jour où le monde a reçu la plus belle chose qu'il ait jamais faite, et où moi, sans le savoir encore, j'ai gagné à une loterie à laquelle je n'avais même pas joué.",
  "Je repense à tout ce chemin : un ajout sur Snap il y a des années, Lyon un 1er janvier, notre nuit du 15 juillet, Monaco, Malte, Barcelone, et ces milliers de petits riens entre les grands moments. À chaque étape, il y avait toi, et à chaque étape je me suis dit la même chose : quelle chance.",
  "La distance nous sépare aujourd'hui, mais elle n'enlève rien. Je pense à toi ce matin comme je penserai à toi ce soir, et comme je penserai à toi tous les 2 octobre de toutes les années qui viennent, parce que j'ai bien l'intention de les fêter tous avec toi.",
  "Alors souffle tes bougies, fais un vœu, et sache que le mien est déjà exaucé depuis longtemps : c'est toi.",
  "Je t'aime, joyeux anniversaire mon amour.",
];
const CADEAU = "🎟️ Bon pour : le plus grand câlin de l'histoire, un dîner où tu ne décides de rien sauf de tout, et autant de fleurs que tu voudras, dès qu'on se retrouve. À échanger quand tu veux, ma dadoucherie. Il ne périme jamais.";

export default function Anniversaire() {
  const [etat, setEtat] = useState(null); // {mode:'fete'|'attente', reste}
  const [bougies, setBougies] = useState(3);
  const [voeu, setVoeu] = useState(false);
  const [lettreOuverte, setLettreOuverte] = useState(false);
  const [cadeauOuvert, setCadeauOuvert] = useState(false);
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const estAnniv = now.getMonth() === MOIS_ANNIV && now.getDate() === JOUR_ANNIV;
    const preview = typeof location !== "undefined" && location.search.indexOf("preview") > -1;
    if (estAnniv || preview) setEtat({ mode: "fete" });
    else {
      let cible = new Date(now.getFullYear(), MOIS_ANNIV, JOUR_ANNIV);
      if (cible < new Date(now.getFullYear(), now.getMonth(), now.getDate())) cible = new Date(now.getFullYear() + 1, MOIS_ANNIV, JOUR_ANNIV);
      const reste = Math.ceil((cible - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
      setEtat({ mode: "attente", reste });
    }
  }, []);

  // confettis (canvas)
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return; const x = cv.getContext("2d"); let W, H, parts = [], raf;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cols = ["#C7B2E6", "#B49BDA", "#E9DEF7", "#8E6FBF", "#F0C4DC", "#E4B266", "#8ee6a0"];
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const mk = (x0, y0, burst) => ({ x: x0, y: y0, r: Math.random() * 6 + 3, c: cols[(Math.random() * cols.length) | 0], vx: (Math.random() - 0.5) * (burst ? 9 : 1.2), vy: burst ? (-Math.random() * 9 - 3) : (Math.random() * 1.4 + 0.6), a: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.2, life: burst ? 170 : 99999 });
    const ambient = reduce ? 0 : (innerWidth < 640 ? 16 : 30);
    for (let i = 0; i < ambient; i++) parts.push(mk(Math.random() * W, Math.random() * H, false));
    confettiRef.current = () => { if (reduce) return; for (let i = 0; i < 120; i++) parts.push(mk(W / 2, H * 0.42, true)); };
    const draw = () => {
      x.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.x += p.vx; p.y += p.vy; p.a += p.va; if (p.life < 90000) { p.vy += 0.14; p.life--; } if (p.life < 90000 && (p.life <= 0 || p.y > H + 20)) { parts.splice(i, 1); continue; } if (p.life > 90000) { if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; } } x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.globalAlpha = p.life < 90000 ? Math.max(0, Math.min(1, p.life / 60)) : 0.6; x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5); x.restore(); }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, [etat]);

  // rafale de confettis à l'ouverture de la fête
  useEffect(() => { if (etat && etat.mode === "fete") { const t = setTimeout(() => confettiRef.current && confettiRef.current(), 400); return () => clearTimeout(t); } }, [etat]);

  const souffler = () => {
    if (bougies <= 0) return;
    try { if (navigator.vibrate) navigator.vibrate(20); } catch (e) {}
    const n = bougies - 1; setBougies(n);
    if (n === 0) { setVoeu(true); if (confettiRef.current) confettiRef.current(); }
  };
  const ouvrirCadeau = () => { if (cadeauOuvert) return; setCadeauOuvert(true); if (confettiRef.current) confettiRef.current(); try { if (navigator.vibrate) navigator.vibrate([20, 50, 20]); } catch (e) {} };

  const btn = (primary) => ({ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".98rem", borderRadius: 100, padding: "13px 26px", cursor: "pointer", border: "1px solid transparent", color: primary ? "#1a1430" : "var(--texte)", background: primary ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", ...(primary ? {} : { borderColor: "var(--bord)" }) });

  return (
    <div style={{ minHeight: "100dvh", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
      <main className="wrap" style={{ maxWidth: 600, position: "relative", zIndex: 1, textAlign: "center", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 40, paddingBottom: 60 }}>
        <a className="retour" href="/dadoucherie">⌂ rentrer</a>

        {!etat ? null : etat.mode === "attente" ? (
          <>
            <div style={{ fontSize: "3.4rem", margin: "10px 0" }}>🎁</div>
            <p className="eyebrow" style={{ fontSize: "1.06rem", margin: "0 0 .3rem" }}>quelque chose se prépare</p>
            <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(2rem,7vw,2.7rem)", color: "var(--titre)", margin: "0 0 .3rem" }}>Bientôt ton anniversaire</h1>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontSize: "1.2rem" }}>{etat.reste === 1 ? "plus qu'un jour 🤍" : "plus que " + etat.reste + " jours 🤍"}</p>
            <p style={{ color: "var(--texte-doux)", lineHeight: 1.7, maxWidth: "34ch", margin: "16px auto 0" }}>Reviens le 2 octobre : je t&apos;ai préparé une fête, une lettre et un cadeau, rien que pour toi.</p>
          </>
        ) : (
          <>
            <div style={{ fontSize: "1.6rem", letterSpacing: ".2em" }}>🎈🎈🎈</div>
            <p className="eyebrow" style={{ fontSize: "1.08rem", margin: "6px 0 .3rem" }}>on est le 2 octobre</p>
            <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(2.1rem,8vw,3rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Joyeux anniversaire 🤍</h1>

            <div style={{ margin: "10px auto 4px", userSelect: "none" }}>
              <div style={{ fontSize: "4.4rem", lineHeight: 1, cursor: bougies > 0 ? "pointer" : "default" }} onClick={souffler} role="button" aria-label="Souffle les bougies">
                {bougies > 0 ? "🎂" : "🍰"}<span style={{ fontSize: "1.4rem" }}>{" " + "🕯️".repeat(bougies)}</span>
              </div>
              <p style={{ color: "var(--texte-doux)", fontSize: ".95rem", marginTop: 8 }}>
                {voeu ? "Voilà. Ton vœu est parti là-haut 🤍 (le mien, c'est déjà toi)." : (bougies === 3 ? "Touche le gâteau pour souffler les bougies…" : "Encore " + bougies + " …")}
              </p>
            </div>

            {!lettreOuverte ? (
              <div><button onClick={() => setLettreOuverte(true)} style={{ ...btn(true), marginTop: 10 }}>Lire ta lettre 💌</button></div>
            ) : (
              <div style={{ margin: "12px auto 0", maxWidth: 500, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "24px 22px", textAlign: "left" }}>
                {LETTRE.map((p, i) => <p key={i} style={{ fontSize: i === 0 ? "1.25rem" : "1.04rem", fontFamily: i === 0 ? "var(--serif)" : "inherit", fontStyle: i === 0 ? "italic" : "normal", color: i === 0 ? "var(--accent)" : "var(--texte)", lineHeight: 1.8, margin: "0 0 14px" }}>{p}</p>)}
                <p style={{ textAlign: "right", fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)" }}>Ton Mathieu</p>
              </div>
            )}

            <div style={{ marginTop: 22 }}>
              {!cadeauOuvert ? (
                <button onClick={ouvrirCadeau} style={btn(false)}>🎁 Ouvrir ton cadeau</button>
              ) : (
                <div style={{ margin: "0 auto", maxWidth: 460, background: "linear-gradient(180deg, rgba(142,111,191,.16), rgba(142,111,191,.05))", border: "1px solid rgba(199,178,230,.4)", borderRadius: 18, padding: "20px 20px" }}>
                  <p style={{ fontSize: "1.04rem", lineHeight: 1.8, color: "var(--texte)", margin: 0 }}>{CADEAU}</p>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 26 }}>
              <a style={btn(false)} href="/fleurs">Tes fleurs 🌷</a>
              <a style={btn(false)} href="/chansons">Nos chansons 🎧</a>
              <a style={btn(false)} href="/nous-deux">Notre monde ✨</a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
