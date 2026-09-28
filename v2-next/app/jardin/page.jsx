"use client";
import { useEffect, useRef, useState } from "react";

const MOIS_FR = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const PALETTE = [[233, 160, 180], [224, 140, 150], [238, 190, 150], [205, 160, 210], [240, 205, 120], [190, 170, 220], [236, 150, 130]];

export default function Jardin() {
  const canvasRef = useRef(null);
  const [eti, setEti] = useState(null);
  const etiTimer = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext("2d");
    let W, H, DPR, raf, fleurs = [];
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const graine = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
    const nbMois = () => { const n = new Date(); return (n.getFullYear() - 2020) * 12 + n.getMonth() + 1; };
    const estDoree = (i) => { const y = 2020 + Math.floor(i / 12), m = i % 12; return (m === 0 && y === 2020) || (m === 6 && y === 2023) || (m === 6 && y === 2026); };
    const planter = () => {
      fleurs = []; const n = nbMois(); const solY = H * 0.9;
      for (let i = 0; i < n; i++) {
        const g1 = graine(i + 1), g2 = graine(i * 3 + 7), g3 = graine(i * 7 + 13);
        const x = W * 0.06 + g1 * W * 0.88; const rangee = Math.floor(g2 * 3); const y = solY - rangee * H * 0.045 - g3 * H * 0.02; const doree = estDoree(i);
        fleurs.push({ i, x, y, tige: H * (0.09 + g2 * 0.075) * (doree ? 1.25 : 1), taille: (9 + g3 * 6) * (doree ? 1.5 : 1) * Math.min(1.6, W / 900 + 0.7), petales: 5 + Math.floor(g1 * 3), c: doree ? [244, 196, 92] : PALETTE[Math.floor(g2 * PALETTE.length)], coeur: doree ? [180, 120, 40] : [120, 90, 60], ph: g1 * 6.28, doree, naissance: i * 0.05 });
      }
    };
    const resize = () => { DPR = Math.min(window.devicePixelRatio || 1, 2); const r = canvas.parentElement.getBoundingClientRect(); W = r.width; H = r.height; canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); planter(); };
    const papillons = []; for (let i = 0; i < 3; i++) papillons.push({ x: rnd(0.2, 0.8), y: rnd(0.25, 0.5), a: rnd(0, 6.28), v: rnd(0.0008, 0.0015), pose: 0, cible: null, ph: rnd(0, 6.28), teinte: i });
    const t0 = performance.now(); let chargement = 0;

    const dessinerFleur = (f, t) => {
      const pousse = reduce ? 1 : Math.min(1, Math.max(0, (chargement - f.naissance) / 0.9)); if (pousse <= 0) return;
      const sway = reduce ? 0 : Math.sin(t * 1.1 + f.ph) * 0.05; const hx = f.x + Math.sin(t * 0.9 + f.ph) * (reduce ? 0 : 2.5); const tigeH = f.tige * pousse; const topY = f.y - tigeH;
      ctx.strokeStyle = "rgba(96,120,72,.85)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.quadraticCurveTo(f.x + sway * 40, f.y - tigeH * 0.55, hx + sway * 30, topY); ctx.stroke();
      ctx.fillStyle = "rgba(110,140,80,.8)"; ctx.beginPath(); ctx.ellipse(f.x + 4, f.y - tigeH * 0.4, 6 * pousse, 2.6 * pousse, 0.6, 0, Math.PI * 2); ctx.fill();
      const cx = hx + sway * 30, cy = topY; const s = f.taille * pousse; const rot = sway;
      for (let p = 0; p < f.petales; p++) { const ang = rot + p * (Math.PI * 2 / f.petales) + (f.doree ? t * 0.15 * (reduce ? 0 : 1) : 0); ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang); ctx.fillStyle = "rgba(" + f.c[0] + "," + f.c[1] + "," + f.c[2] + ",.92)"; ctx.beginPath(); ctx.ellipse(0, -s * 0.55, s * 0.34, s * 0.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      if (f.doree) { const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, s * 1.7); halo.addColorStop(0, "rgba(250,215,120,.35)"); halo.addColorStop(1, "rgba(250,215,120,0)"); ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, s * 1.7, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = "rgba(" + f.coeur[0] + "," + f.coeur[1] + "," + f.coeur[2] + ",1)"; ctx.beginPath(); ctx.arc(cx, cy, s * 0.24, 0, Math.PI * 2); ctx.fill();
      f.cx = cx; f.cy = cy; f.s = s;
    };
    const dessinerPapillon = (b, t) => {
      if (!reduce) {
        if (b.pose > 0) { b.pose -= 0.008; if (b.cible) { b.x += (b.cible.cx / W - b.x) * 0.08; b.y += ((b.cible.cy - 8) / H - b.y) * 0.08; } }
        else { if (Math.random() < 0.002 && fleurs.length) { b.cible = fleurs[Math.floor(Math.random() * fleurs.length)]; b.pose = 1; } b.a += (graine(Math.floor(t) + b.teinte) - 0.5) * 0.3; b.x += Math.cos(b.a) * b.v; b.y += Math.sin(b.a) * b.v * 0.6; if (b.x < 0.05 || b.x > 0.95) b.a = Math.PI - b.a; if (b.y < 0.15 || b.y > 0.75) b.a = -b.a; }
      }
      const x = b.x * W, y = b.y * H + (b.pose > 0 ? 0 : Math.sin(t * 3 + b.ph) * 4); const flap = b.pose > 0 ? 0.25 + 0.1 * Math.sin(t * 4) : Math.abs(Math.sin(t * 10 + b.ph));
      const couleurs = [[236, 150, 170], [150, 170, 230], [240, 200, 110]]; const c = couleurs[b.teinte % 3];
      ctx.save(); ctx.translate(x, y);
      for (let cote = -1; cote <= 1; cote += 2) { ctx.save(); ctx.scale(cote * (0.4 + 0.6 * flap), 1); ctx.fillStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",.85)"; ctx.beginPath(); ctx.ellipse(6, -3, 6, 4.4, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.ellipse(5, 3, 4.6, 3.4, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      ctx.fillStyle = "rgba(70,60,55,.9)"; ctx.beginPath(); ctx.ellipse(0, 0, 1.5, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    };
    const dessiner = (now) => {
      const t = (now - t0) / 1000; chargement = Math.min(5, t * 0.9);
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#DFECF2"); g.addColorStop(0.55, "#EAF0E2"); g.addColorStop(1, "#E2EAD4"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const so = ctx.createRadialGradient(W * 0.82, H * 0.16, 0, W * 0.82, H * 0.16, H * 0.24); so.addColorStop(0, "rgba(255,244,200,.8)"); so.addColorStop(1, "rgba(255,244,200,0)"); ctx.fillStyle = so; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#D3DFBC"; ctx.beginPath(); ctx.moveTo(0, H * 0.86); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, H * 0.86 + Math.sin(x * 0.004) * H * 0.02); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#C6D4AC"; ctx.beginPath(); ctx.moveTo(0, H * 0.92); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, H * 0.92 + Math.sin(x * 0.006 + 2) * H * 0.015); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(110,140,80,.4)"; ctx.lineWidth = 1;
      for (let i = 0; i < 60; i++) { const gx = graine(i + 500) * W, gy = H * 0.9 + graine(i + 900) * H * 0.06; const sw = reduce ? 0 : Math.sin(t * 1.3 + i) * 2; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.quadraticCurveTo(gx + sw, gy - 8, gx + sw * 1.6, gy - 14); ctx.stroke(); }
      fleurs.slice().sort((a, b) => a.y - b.y).forEach((f) => dessinerFleur(f, t));
      papillons.forEach((b) => dessinerPapillon(b, t));
      raf = requestAnimationFrame(dessiner);
    };
    const toucher = (cx, cy) => {
      let meilleure = null, dmin = 1e9;
      fleurs.forEach((f) => { if (f.cx === undefined) return; const dx = cx - f.cx, dy = cy - f.cy, d = dx * dx + dy * dy; if (d < dmin) { dmin = d; meilleure = f; } });
      if (!meilleure || dmin > 45 * 45) { setEti(null); return; }
      const y = 2020 + Math.floor(meilleure.i / 12), m = meilleure.i % 12; const num = meilleure.i + 1;
      let txt;
      if (meilleure.doree && y === 2020) txt = "La toute première. Lyon, la première fois que je t'ai vue. Évidemment qu'elle est dorée.";
      else if (meilleure.doree && y === 2023) txt = "Le mois de notre nuit. Celle où on s'est tout dit jusqu'au matin.";
      else if (meilleure.doree && y === 2026) txt = "Tu sais très bien pourquoi celle-là brille. 💍";
      else txt = "Notre " + num + "e mois. Fleur n°" + num + ", poussée toute seule, comme nous.";
      setEti({ mois: MOIS_FR[m] + " " + y, txt, left: Math.min(W - 250, Math.max(10, meilleure.cx - 115)), top: Math.max(10, meilleure.cy - 105) });
      clearTimeout(etiTimer.current); etiTimer.current = setTimeout(() => setEti(null), 5000);
    };
    const onClick = (e) => { const r = canvas.getBoundingClientRect(); toucher(e.clientX - r.left, e.clientY - r.top); };
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", resize); resize(); raf = requestAnimationFrame(dessiner);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("click", onClick); clearTimeout(etiTimer.current); };
  }, []);

  return (
    <div style={{ background: "#EAF0E2", color: "#3E4636", overflowX: "hidden" }}>
      <div style={{ position: "relative", width: "100vw", height: "100dvh" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
        <div style={{ position: "absolute", top: "9vh", left: 0, right: 0, textAlign: "center", padding: "0 22px", pointerEvents: "none" }}>
          <div style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#7C8B67", marginBottom: 10 }}>il pousse tout seul</div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(1.7rem,6vw,2.4rem)", color: "#44503A" }}>Le jardin de nous</h1>
          <p style={{ marginTop: 10, fontSize: ".98rem", color: "#5E6B4F", maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>Une fleur s&apos;ouvre ici chaque mois depuis le 1er janvier 2020, à Lyon. Personne ne les plante, personne ne peut les cueillir. Touche-les : chacune se souvient de son mois.</p>
        </div>
        {eti && (
          <div style={{ position: "absolute", zIndex: 5, maxWidth: 230, background: "rgba(252,251,246,.95)", border: "1px solid rgba(90,100,70,.2)", borderRadius: 13, padding: "11px 14px", boxShadow: "0 14px 30px -18px rgba(60,70,45,.5)", left: eti.left, top: eti.top }}>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#A8683F", fontSize: "1rem", marginBottom: 3 }}>{eti.mois}</div>
            <div style={{ fontSize: ".85rem", color: "#5E6B4F", lineHeight: 1.5 }}>{eti.txt}</div>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", fontSize: ".8rem", color: "#7C8B67", pointerEvents: "none" }}>touche une fleur 🌸</div>
      </div>
      <div style={{ background: "#F4F6EC", padding: "44px 22px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <p style={{ fontSize: "1.02rem", lineHeight: 1.7, color: "#4A5540", marginBottom: 14 }}>Les fleurs dorées, tu les reconnaîtras : ce sont nos dates. Janvier 2020. Juillet 2023. Juillet 2026. Les papillons, eux, font ce qu&apos;ils veulent, comme toi.</p>
          <p style={{ fontSize: ".92rem", color: "#7C8B67" }}>Reviens le mois prochain : une nouvelle fleur t&apos;attendra. C&apos;est mathématique, donc c&apos;est une promesse d&apos;ingénieur.</p>
          <a href="/histoire" style={{ display: "inline-block", marginTop: 18, fontWeight: 700, fontSize: ".95rem", color: "#A8683F", textDecoration: "none", border: "1.5px solid rgba(168,104,63,.45)", borderRadius: 100, padding: "12px 26px" }}>retourner à notre histoire ✨</a>
          <a href="/" style={{ display: "inline-block", marginTop: 18, marginLeft: 6, color: "#A8683F", textDecoration: "none", opacity: .7 }}>· ⌂ accueil</a>
        </div>
      </div>
    </div>
  );
}
