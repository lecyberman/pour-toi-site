"use client";
import { useEffect } from "react";

const CSS = `
.ocp{ background:#062A3E; color:#F3EFE8; overflow-x:hidden; }
.ocp #mer{ position:fixed; inset:0; width:100vw; height:100vh; display:block; z-index:1; }
.ocp .defilement{ position:relative; z-index:2; height:520vh; pointer-events:none; }
.ocp .moment{ position:absolute; left:0; right:0; display:flex; align-items:center; justify-content:center; padding:0 22px; }
.ocp .voile{ max-width:520px; text-align:center; opacity:0; transform:translateY(24px); transition:opacity 1.3s ease, transform 1.3s ease; }
.ocp .moment.vu .voile{ opacity:1; transform:none; }
.ocp .heure{ font-size:.78rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:rgba(255,244,225,.75); margin-bottom:14px; }
.ocp p.grand{ font-family:'Fraunces',serif; font-weight:400; font-size:clamp(1.35rem,5vw,1.95rem); line-height:1.42; text-shadow:0 2px 26px rgba(0,20,35,.65); }
.ocp p.petit{ margin-top:15px; font-size:1rem; line-height:1.7; color:rgba(240,240,235,.92); text-shadow:0 2px 18px rgba(0,20,35,.65); }
.ocp .m1{ top:14vh; height:62vh; } .ocp .m2{ top:112vh; height:60vh; } .ocp .m3{ top:212vh; height:60vh; } .ocp .m4{ top:312vh; height:60vh; } .ocp .m5{ top:428vh; height:72vh; }
.ocp .m5 a{ pointer-events:auto; display:inline-block; margin-top:24px; font-weight:700; font-size:.95rem; color:#BFE8E2; text-decoration:none; border:1.5px solid rgba(191,232,226,.5); border-radius:100px; padding:12px 26px; }
.ocp .retour{ position:fixed; top:14px; left:14px; z-index:5; }
.ocp .indice{ position:fixed; bottom:22px; left:50%; transform:translateX(-50%); z-index:3; font-size:.8rem; color:rgba(255,255,255,.75); pointer-events:none; text-align:center; }
`;

export default function Ocean() {
  useEffect(() => {
    const canvas = document.getElementById("ocMer"); if (!canvas) return;
    const ctx = canvas.getContext("2d"); let W, H, DPR, raf;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const lerp = (a, b, t) => a + (b - a) * t; const lerpC = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
    const css = (c, a) => "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + (a === undefined ? 1 : a) + ")";
    const resize = () => { DPR = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight; canvas.width = W * DPR; canvas.height = H * DPR; canvas.style.width = W + "px"; canvas.style.height = H + "px"; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); };
    const bulles = []; for (let i = 0; i < 40; i++) bulles.push({ x: Math.random(), y: Math.random(), r: rnd(1.5, 5), v: rnd(0.25, 0.8), ph: rnd(0, 6.28) });
    const poissons = []; for (let i = 0; i < 9; i++) poissons.push({ x: Math.random(), y: rnd(0.25, 0.85), t: rnd(8, 20), dir: Math.random() < 0.5 ? 1 : -1, v: rnd(0.0004, 0.0011), ph: rnd(0, 6.28), prof: rnd(0.4, 1) });
    let progression = 0;
    const majP = () => { const el = document.getElementById("ocDef"); const max = el.offsetHeight - H; progression = Math.min(1, Math.max(0, window.scrollY / max)); };
    window.addEventListener("scroll", majP, { passive: true });
    const t0 = performance.now();
    const dessiner = (now) => {
      const t = (now - t0) / 1000; const p = progression; const plongee = Math.min(1, Math.max(0, (p - 0.12) / 0.75));
      const haut1 = [24, 124, 138], bas1 = [10, 72, 96], haut2 = [6, 44, 66], bas2 = [3, 20, 38]; const hautS = [247, 196, 145];
      let haut, bas;
      if (plongee < 0.5) { const q = plongee / 0.5; haut = lerpC(haut1, haut2, q * 0.5); bas = lerpC(bas1, bas2, q * 0.6); }
      else { const q = (plongee - 0.5) / 0.5; haut = lerpC(lerpC(haut1, haut2, 0.5), haut2, q); bas = lerpC(lerpC(bas1, bas2, 0.6), bas2, q); }
      if (plongee <= 0.001) {
        const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, css(hautS)); g.addColorStop(0.52, css([250, 220, 170])); g.addColorStop(0.55, css([50, 140, 150])); g.addColorStop(1, css([16, 90, 110])); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        const sx = W * 0.5, sy = H * 0.38; const so = ctx.createRadialGradient(sx, sy, 0, sx, sy, H * 0.3); so.addColorStop(0, "rgba(255,246,214,.95)"); so.addColorStop(0.2, "rgba(255,226,170,.5)"); so.addColorStop(1, "rgba(255,226,170,0)"); ctx.fillStyle = so; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.arc(sx, sy, 26, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,250,235,.96)"; ctx.fill();
        for (let l = 0; l < 4; l++) { ctx.beginPath(); const baseY = H * 0.55 + l * H * 0.055; ctx.moveTo(0, H); ctx.lineTo(0, baseY); for (let x = 0; x <= W; x += 8) { const y = baseY + Math.sin(x * 0.011 + t * (0.7 + l * 0.18) + l * 2.1) * (5 + l * 3.2) + Math.sin(x * 0.027 - t * (0.5 + l * 0.12)) * (2.4 + l * 1.2); ctx.lineTo(x, y); } ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = "rgba(" + (18 + l * 6) + "," + (96 + l * 14) + "," + (112 + l * 14) + "," + (0.5 + l * 0.14) + ")"; ctx.fill(); }
        for (let i = 0; i < 26; i++) { const ry = H * 0.56 + i * H * 0.015; const largeur = (30 - i) * (2.4 + Math.sin(t * 2 + i) * 0.9); if (largeur < 2) continue; ctx.fillStyle = "rgba(255,232,180," + (0.20 - i * 0.006) + ")"; ctx.fillRect(sx - largeur / 2 + Math.sin(t * 1.4 + i * 1.7) * 6, ry, largeur, 2.2); }
      } else {
        const g2 = ctx.createLinearGradient(0, 0, 0, H); g2.addColorStop(0, css(haut)); g2.addColorStop(1, css(bas)); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
        const luz = Math.max(0, 1 - plongee * 1.25);
        if (luz > 0.02) { ctx.save(); ctx.globalCompositeOperation = "lighter"; for (let i = 0; i < 5; i++) { const lx = W * (0.15 + i * 0.18) + Math.sin(t * 0.3 + i) * 30; const pente = Math.sin(t * 0.18 + i * 1.3) * 0.12 + 0.12; const lg = ctx.createLinearGradient(lx, 0, lx + W * pente, H); lg.addColorStop(0, "rgba(190,235,225," + (0.10 * luz) + ")"); lg.addColorStop(1, "rgba(190,235,225,0)"); ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(lx - 18, 0); ctx.lineTo(lx + 18, 0); ctx.lineTo(lx + W * pente + 70, H); ctx.lineTo(lx + W * pente - 70, H); ctx.closePath(); ctx.fill(); } ctx.restore(); }
        for (let i = 0; i < poissons.length; i++) { const f = poissons[i]; f.x += f.v * f.dir * (reduce ? 0 : 1); if (f.x > 1.15) f.x = -0.15; if (f.x < -0.15) f.x = 1.15; const fx = f.x * W, fy = f.y * H + Math.sin(t * 1.2 + f.ph) * 8; const s = f.t * (0.7 + 0.3 * f.prof); const alpha = 0.28 * f.prof + 0.1; ctx.save(); ctx.translate(fx, fy); ctx.scale(f.dir, 1); ctx.fillStyle = "rgba(10,40,58," + alpha + ")"; ctx.beginPath(); ctx.ellipse(0, 0, s, s * 0.38, 0, 0, Math.PI * 2); ctx.fill(); const q = Math.sin(t * 6 + f.ph) * 0.35; ctx.beginPath(); ctx.moveTo(-s * 0.85, 0); ctx.lineTo(-s * 1.45, -s * 0.34 + q * s * 0.3); ctx.lineTo(-s * 1.45, s * 0.34 + q * s * 0.3); ctx.closePath(); ctx.fill(); ctx.restore(); }
        for (let i = 0; i < bulles.length; i++) { const b = bulles[i]; b.y -= b.v * 0.003 * (reduce ? 0 : 1); if (b.y < -0.05) { b.y = 1.05; b.x = Math.random(); } const bx = b.x * W + Math.sin(t * 1.5 + b.ph) * 7; ctx.beginPath(); ctx.arc(bx, b.y * H, b.r, 0, Math.PI * 2); ctx.strokeStyle = "rgba(220,245,240,0.28)"; ctx.lineWidth = 1; ctx.stroke(); }
        if (plongee > 0.82) { const fp = (plongee - 0.82) / 0.18; const sableY = H * (1.25 - fp * 0.35); const sg = ctx.createLinearGradient(0, sableY - 40, 0, H); sg.addColorStop(0, "rgba(60,58,70,0)"); sg.addColorStop(1, "rgba(88,80,84," + (0.85 * fp) + ")"); ctx.fillStyle = sg; ctx.fillRect(0, sableY - 40, W, H); const px = W * 0.5, py = sableY + H * 0.06; if (py < H + 30) { const lum = 0.5 + 0.5 * Math.sin(t * 2); const pg = ctx.createRadialGradient(px, py, 0, px, py, 36); pg.addColorStop(0, "rgba(255,250,240," + (0.85 * fp) + ")"); pg.addColorStop(1, "rgba(255,250,240,0)"); ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 36, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(px, py, 7 + lum * 1.6, 0, Math.PI * 2); ctx.fillStyle = "rgba(250,246,240," + (0.9 * fp) + ")"; ctx.fill(); } }
      }
      raf = requestAnimationFrame(dessiner);
    };
    const verifier = () => { document.querySelectorAll(".ocp .moment").forEach((m) => { const r = m.getBoundingClientRect(); if (r.top < H * 0.8 && r.bottom > H * 0.2) m.classList.add("vu"); }); };
    window.addEventListener("scroll", verifier, { passive: true }); const vInt = setInterval(verifier, 700);
    const onScrollInd = () => { const ind = document.getElementById("ocInd"); if (ind) ind.style.display = window.scrollY > H * 0.3 ? "none" : ""; };
    window.addEventListener("scroll", onScrollInd, { passive: true });
    window.addEventListener("resize", resize); resize(); majP(); verifier(); raf = requestAnimationFrame(dessiner);
    return () => { cancelAnimationFrame(raf); clearInterval(vInt); window.removeEventListener("scroll", majP); window.removeEventListener("scroll", verifier); window.removeEventListener("scroll", onScrollInd); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="ocp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <canvas id="ocMer" />
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <div className="defilement" id="ocDef">
        <section className="moment m1"><div className="voile"><div className="heure">au bord de l&apos;eau</div><p className="grand">On a vu trois mers ensemble.<br />La même, en vrai.</p><p className="petit">Monaco, Malte, Barcelone. À chaque fois le même rituel : on s&apos;arrête, on regarde l&apos;eau, on ne dit rien pendant dix secondes. C&apos;est notre silence préféré. Cette lettre se lit comme on plonge, descends quand tu es prête.</p></div></section>
        <section className="moment m2"><div className="voile"><div className="heure">juste sous la surface</div><p className="grand">Vu de dehors, on est un couple<br />normal. C&apos;est un déguisement.</p><p className="petit">La surface, c&apos;est ce que les gens voient : deux personnes aux antipodes l&apos;une de l&apos;autre, comme tu dis si bien. Personne n&apos;aurait parié sur nous, même pas toi. Et pourtant, il suffit de descendre d&apos;un mètre pour voir tout ce qui circule entre nous.</p></div></section>
        <section className="moment m3"><div className="voile"><div className="heure">plus profond</div><p className="grand">Sept ans que je descends,<br />je n&apos;ai pas encore vu le fond.</p><p className="petit">Chaque année je me dis que je te connais entièrement. Chaque année tu me prouves le contraire. Un rire nouveau, un courage que je ne t&apos;avais jamais vu, une douceur qui arrive sans prévenir. Tu es la seule personne que je connais qui devient plus profonde avec le temps.</p></div></section>
        <section className="moment m4"><div className="voile"><div className="heure">là où la lumière arrive à peine</div><p className="grand">Il y a eu des moments difficiles.<br />On a plongé dedans ensemble.</p><p className="petit">Tu me l&apos;as écrit toi-même : je t&apos;accompagne dans les moments joyeux mais aussi difficiles. C&apos;est la phrase qui m&apos;a le plus touché. Parce que c&apos;est ça, le vrai contrat : pas les couchers de soleil, mais tenir la main de l&apos;autre là où on ne voit plus très clair.</p></div></section>
        <section className="moment m5"><div className="voile"><div className="heure">le fond, et le trésor</div><p className="grand">Voilà ce qu&apos;il y a tout au fond :<br />toi. Il n&apos;y a que toi.</p><p className="petit">On remontera à la surface dans une seconde, et on refera semblant d&apos;être un couple normal. Mais maintenant tu sais ce qu&apos;il y a en dessous. Prochaine mer : à toi de choisir la ville.</p><a href="/histoire">remonter à la surface ✨</a></div></section>
      </div>
      <div className="indice" id="ocInd">plonge ↓</div>
    </div>
  );
}
