"use client";
import { useEffect, useRef, useState } from "react";

const STATIC = "https://pour-toi-site.vercel.app";
const SOUVENIRS = [
  "Cette fois où on a ri tellement fort qu'on n'arrivait plus à respirer. Je ne me souviens même plus pourquoi. Toi si, sûrement.",
  "Nos débats à 1h du matin, que je gagne toujours. Officiellement. Ne vérifie pas.",
  "Le premier épisode de drama qu'on a regardé ensemble. Tu commentais tout. J'ai rien suivi. C'était parfait.",
  "Barcelone, le soir, quand on ne voulait pas rentrer parce que la nuit était trop douce.",
  "Malte. La lumière sur l'eau. Toi qui prends la même photo quinze fois. Moi qui te regarde toi.",
  "Monaco, quand tu as vu les yachts. Tes yeux. Je m'en souviens de tes yeux.",
  "Le 15 juillet, évidemment. Le feu d'origine. Celui qui a allumé tous les autres.",
  "Tous ces appels qui devaient durer cinq minutes. Aucun n'a duré cinq minutes.",
  "Quand tu t'endors avant la fin et que tu jures que tu ne dormais pas. Tu dormais.",
  "Ce soir où tu m'as dit que nos personnalités étaient aux antipodes. Les aimants aussi, mon amour.",
];

export default function Feu() {
  const canvasRef = useRef(null);
  const [braise, setBraise] = useState("");
  const braiseTimer = useRef(null);
  const dernier = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext("2d");
    let W, H, DPR, raf;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const resize = () => { DPR = Math.min(window.devicePixelRatio || 1, 2); const r = canvas.parentElement.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); };
    const etoiles = []; for (let i = 0; i < 130; i++) etoiles.push({ x: Math.random(), y: Math.random() * 0.55, r: rnd(0.4, 1.3), ph: rnd(0, 6.28), v: rnd(0.5, 1.3) });
    let flammes = [], braises = [];
    const foyer = () => ({ x: W * 0.5, y: H * 0.72 });
    const naitreFlamme = (burst) => { const f = foyer(); flammes.push({ x: f.x + rnd(-16, 16), y: f.y + rnd(-4, 4), vx: rnd(-0.25, 0.25), vy: rnd(-1.6, -2.6) * (burst ? 1.4 : 1), r: rnd(7, 15), vie: 1, dv: rnd(0.012, 0.022) }); };
    const naitreBraise = (burst) => { const f = foyer(); braises.push({ x: f.x + rnd(-14, 14), y: f.y - rnd(0, 16), vx: rnd(-0.5, 0.5), vy: rnd(-0.9, -2.1) * (burst ? 1.6 : 1), r: rnd(1, 2.4), vie: 1, dv: rnd(0.003, 0.008), ph: rnd(0, 6.28) }); };
    const t0 = performance.now();
    const dessiner = (now) => {
      const t = (now - t0) / 1000; const f = foyer(); const puls = 0.85 + 0.15 * Math.sin(t * 3.2) + 0.06 * Math.sin(t * 7.7);
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#0D0A14"); g.addColorStop(0.6, "#171019"); g.addColorStop(1, "#241318"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < etoiles.length; i++) { const s = etoiles[i]; const a = reduce ? 0.7 : (0.4 + 0.5 * Math.sin(t * s.v + s.ph)); ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(235,225,235," + (a * 0.8) + ")"; ctx.fill(); }
      ctx.fillStyle = "#231419"; ctx.beginPath(); ctx.ellipse(W * 0.5, H * 0.78, W * 0.55, H * 0.09, 0, 0, Math.PI * 2); ctx.fill();
      const halo = ctx.createRadialGradient(f.x, f.y - 20, 0, f.x, f.y - 20, H * 0.42 * puls); halo.addColorStop(0, "rgba(255,150,60," + (0.28 * puls) + ")"); halo.addColorStop(0.4, "rgba(220,100,40," + (0.12 * puls) + ")"); halo.addColorStop(1, "rgba(220,100,40,0)"); ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
      ctx.save(); ctx.translate(f.x, f.y + 10);
      [[-0.42, "#4A2E20"], [0.42, "#3D251B"]].forEach((b) => { ctx.save(); ctx.rotate(b[0]); ctx.fillStyle = b[1]; ctx.beginPath(); const r2 = 7; ctx.roundRect ? ctx.roundRect(-46, -r2, 92, r2 * 2, r2) : ctx.rect(-46, -r2, 92, r2 * 2); ctx.fill(); ctx.restore(); });
      ctx.restore();
      if (!reduce) { for (let i = 0; i < 3; i++) naitreFlamme(false); if (Math.random() < 0.5) naitreBraise(false); }
      ctx.save(); ctx.globalCompositeOperation = "lighter";
      for (let i = flammes.length - 1; i >= 0; i--) { const p = flammes[i]; p.x += p.vx + Math.sin(t * 5 + p.y * 0.05) * 0.25; p.y += p.vy; p.vie -= p.dv; if (p.vie <= 0) { flammes.splice(i, 1); continue; } const v = p.vie; const r = p.r * v; const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2); if (v > 0.66) { grad.addColorStop(0, "rgba(255,235,170," + (0.5 * v) + ")"); grad.addColorStop(1, "rgba(255,180,70,0)"); } else if (v > 0.33) { grad.addColorStop(0, "rgba(255,170,70," + (0.4 * v) + ")"); grad.addColorStop(1, "rgba(230,90,30,0)"); } else { grad.addColorStop(0, "rgba(210,70,30," + (0.32 * v) + ")"); grad.addColorStop(1, "rgba(160,40,20,0)"); } ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2); ctx.fill(); }
      for (let i = braises.length - 1; i >= 0; i--) { const b = braises[i]; b.x += b.vx + Math.sin(t * 3 + b.ph) * 0.5; b.y += b.vy; b.vie -= b.dv; if (b.vie <= 0 || b.y < -10) { braises.splice(i, 1); continue; } const scin = 0.6 + 0.4 * Math.sin(t * 9 + b.ph); ctx.beginPath(); ctx.arc(b.x, b.y, b.r * b.vie, 0, Math.PI * 2); ctx.fillStyle = "rgba(255," + (150 + Math.floor(80 * b.vie)) + ",80," + (0.85 * b.vie * scin) + ")"; ctx.fill(); }
      ctx.restore();
      raf = requestAnimationFrame(dessiner);
    };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect(); const cx = e.clientX - r.left, cy = e.clientY - r.top; const f = foyer(); const dx = cx - f.x, dy = cy - f.y;
      if (dx * dx + dy * dy > (H * 0.28) * (H * 0.28)) return;
      for (let i = 0; i < 26; i++) naitreBraise(true); for (let i = 0; i < 10; i++) naitreFlamme(true);
      try { if (navigator.vibrate) navigator.vibrate(20); } catch (er) {}
      let idx; do { idx = Math.floor(Math.random() * SOUVENIRS.length); } while (idx === dernier.current && SOUVENIRS.length > 1); dernier.current = idx;
      setBraise(SOUVENIRS[idx]); clearTimeout(braiseTimer.current); braiseTimer.current = setTimeout(() => setBraise(""), 7500);
    };
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", resize); resize();
    if (reduce) for (let i = 0; i < 40; i++) naitreFlamme(false);
    raf = requestAnimationFrame(dessiner);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("click", onClick); clearTimeout(braiseTimer.current); };
  }, []);

  return (
    <div style={{ background: "#120D14", color: "#F3E9DC", overflowX: "hidden" }}>
      <div style={{ position: "relative", width: "100vw", height: "100dvh" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div style={{ position: "absolute", top: "8vh", left: 0, right: 0, textAlign: "center", padding: "0 22px", pointerEvents: "none" }}>
          <div style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#C99B6A", marginBottom: 10 }}>nos soirées</div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(1.7rem,6vw,2.4rem)", color: "#F6E7CF", textShadow: "0 2px 30px rgba(0,0,0,.6)" }}>Autour du feu</h1>
          <p style={{ marginTop: 10, fontSize: ".98rem", color: "#D9C3A5", maxWidth: 440, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>Nos meilleures conversations ont lieu tard, quand le monde dort. Ce feu ne s&apos;éteint jamais. Touche-le : il te rendra une braise de souvenir.</p>
        </div>
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "34vh", zIndex: 5, maxWidth: 320, width: "calc(100vw - 60px)", textAlign: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.06rem", lineHeight: 1.55, color: "#FFDFAE", textShadow: "0 2px 24px rgba(0,0,0,.8)", opacity: braise ? 1 : 0, transition: "opacity .8s ease", pointerEvents: "none" }}>{braise}</div>
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", fontSize: ".8rem", color: "#A98F72", pointerEvents: "none" }}>touche le feu 🔥</div>
      </div>
      <div style={{ background: "#1A1218", padding: "44px 22px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.7, color: "#DECBB2", marginBottom: 14 }}>Un feu, ça s&apos;entretient. Le nôtre a sept ans, il a survécu à la distance, aux personnalités aux antipodes, aux dramas (les vrais et ceux qu&apos;on regarde). Il crépite encore. C&apos;est le seul feu que je connaisse qui grandit avec le temps.</p>
          <p style={{ fontSize: ".92rem", color: "#A98F72" }}>Les braises que tu vois monter ne meurent pas : elles vont rejoindre le ciel de la page d&apos;à côté.</p>
          <a href={STATIC + "/nuit"} style={{ display: "inline-block", marginTop: 18, fontWeight: 700, fontSize: ".95rem", color: "#E8B45C", textDecoration: "none", border: "1.5px solid rgba(232,180,92,.45)", borderRadius: 100, padding: "12px 26px" }}>suivre les braises jusqu&apos;aux étoiles 🌌</a>
          <a href="/" style={{ display: "inline-block", marginTop: 18, marginLeft: 6, color: "#E8B45C", textDecoration: "none", opacity: .7 }}>· ⌂ accueil</a>
        </div>
      </div>
    </div>
  );
}
