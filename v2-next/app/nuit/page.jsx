"use client";
import { useEffect } from "react";

const CSS = `
.nuitp{ background:#0B1026; color:#EDE9F3; overflow-x:hidden; }
.nuitp #ciel{ position:fixed; inset:0; width:100vw; height:100vh; display:block; z-index:1; }
.nuitp .defilement{ position:relative; z-index:2; height:520vh; pointer-events:none; }
.nuitp .moment{ position:absolute; left:0; right:0; display:flex; align-items:center; justify-content:center; padding:0 22px; pointer-events:none; }
.nuitp .voile{ max-width:520px; text-align:center; opacity:0; transform:translateY(26px); transition:opacity 1.4s ease, transform 1.4s ease; }
.nuitp .moment.vu .voile{ opacity:1; transform:none; }
.nuitp .heure{ font-size:.78rem; font-weight:700; letter-spacing:.22em; text-transform:uppercase; color:#B9AECB; margin-bottom:14px; }
.nuitp p.grand{ font-family:'Fraunces',serif; font-weight:400; font-size:clamp(1.4rem,5.2vw,2rem); line-height:1.4; text-shadow:0 2px 30px rgba(0,0,0,.6); }
.nuitp p.petit{ margin-top:16px; font-size:1rem; color:#CFC7DD; line-height:1.7; text-shadow:0 2px 20px rgba(0,0,0,.6); }
.nuitp .m1{ top:16vh; height:60vh; } .nuitp .m2{ top:110vh; height:60vh; } .nuitp .m3{ top:210vh; height:60vh; } .nuitp .m4{ top:310vh; height:60vh; } .nuitp .m5{ top:430vh; height:70vh; }
.nuitp .m5 .heure{ color:#8A6A55; } .nuitp .m5 p.grand{ color:#F3E8D8; } .nuitp .m5 p.petit{ color:#D8C9BE; }
.nuitp .m5 a{ pointer-events:auto; display:inline-block; margin-top:26px; font-weight:700; font-size:.95rem; color:#F0C9A8; text-decoration:none; border:1.5px solid rgba(240,201,168,.5); border-radius:100px; padding:12px 26px; }
.nuitp .retour{ position:fixed; top:14px; left:14px; z-index:5; }
.nuitp .indice{ position:fixed; bottom:22px; left:50%; transform:translateX(-50%); z-index:3; font-size:.8rem; color:#B9AECB; opacity:.8; pointer-events:none; text-align:center; }
.nuitp .memoire{ position:fixed; z-index:4; max-width:280px; background:rgba(15,18,40,.92); border:1px solid rgba(185,174,203,.35); border-radius:14px; padding:14px 16px; backdrop-filter:blur(6px); opacity:0; pointer-events:none; transition:opacity .5s ease; }
.nuitp .memoire.visible{ opacity:1; }
.nuitp .memoire .nom{ font-family:'Fraunces',serif; font-style:italic; font-size:1.05rem; color:#F0C9A8; margin-bottom:6px; }
.nuitp .memoire .txt{ font-size:.9rem; line-height:1.55; color:#DDD5E8; }
`;

export default function Nuit() {
  useEffect(() => {
    const canvas = document.getElementById("nuitCiel"); if (!canvas) return;
    const ctx = canvas.getContext("2d"); let W, H, DPR, raf;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const etoiles = []; for (let i = 0; i < 340; i++) etoiles.push({ x: Math.random(), y: Math.random() * 0.92, r: rnd(0.4, 1.5), tw: rnd(0, Math.PI * 2), v: rnd(0.4, 1.4), couche: Math.random() < 0.3 ? 2 : 1 });
    const C = [
      { x: .30, y: .30, nom: "L'ajout Snap", txt: "Il y a 7 ans, une notification. La première étoile, on ne savait pas encore qu'on dessinait une constellation." },
      { x: .40, y: .22, nom: "Lyon", txt: "1er janvier 2020. La première fois que je te vois en vrai. J'ai su. Cette étoile-là brille plus fort que les autres." },
      { x: .52, y: .28, nom: "Cette nuit", txt: "15 juillet 2023. La nuit que tu es en train de revivre, exactement. C'est elle, le centre de tout." },
      { x: .62, y: .20, nom: "Monaco · Malte · Barcelone", txt: "Trois villes, mille souvenirs. Nos échappées ont leur propre lumière." },
      { x: .72, y: .27, nom: "Le oui", txt: "Juillet 2026. Je n'en dis pas plus, même aux étoiles. Elles ont vu, de toute façon." },
      { x: .80, y: .19, nom: "La suite", txt: "Cette étoile n'a pas encore de nom. C'est la place de tout ce qui nous reste à vivre. On la nommera ensemble." },
    ];
    const vl = document.createElement("canvas");
    const peindreVL = () => { vl.width = W; vl.height = H; const c = vl.getContext("2d"); c.clearRect(0, 0, W, H); const n = 900; for (let i = 0; i < n; i++) { const t = i / n; const bx = t * W * 1.3 - W * 0.15; const by = H * 0.55 - t * H * 0.42 + Math.sin(t * 9) * H * 0.03; const x = bx + rnd(-W * 0.09, W * 0.09); const y = by + rnd(-H * 0.075, H * 0.075); const r = rnd(0.3, 1.1); const a = rnd(0.03, 0.16); c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = "rgba(" + (200 + Math.floor(rnd(0, 55))) + "," + (195 + Math.floor(rnd(0, 40))) + ",255," + a + ")"; c.fill(); } };
    const resize = () => { DPR = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight; canvas.width = W * DPR; canvas.height = H * DPR; canvas.style.width = W + "px"; canvas.style.height = H + "px"; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); peindreVL(); };
    const lerp = (a, b, t) => a + (b - a) * t; const lerpC = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)]; const css = (c) => "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")";
    const phases = [{ p: 0, h: [7, 9, 28], m: [13, 16, 42], b: [20, 24, 56] }, { p: 0.55, h: [7, 9, 28], m: [13, 16, 42], b: [20, 24, 56] }, { p: 0.72, h: [16, 18, 48], m: [38, 32, 74], b: [74, 56, 92] }, { p: 0.86, h: [44, 38, 84], m: [122, 80, 110], b: [214, 140, 110] }, { p: 1, h: [126, 126, 178], m: [232, 166, 120], b: [255, 214, 150] }];
    const cielCouleurs = (p) => { for (let i = 0; i < phases.length - 1; i++) { if (p >= phases[i].p && p <= phases[i + 1].p) { const t = (p - phases[i].p) / (phases[i + 1].p - phases[i].p); return { h: lerpC(phases[i].h, phases[i + 1].h, t), m: lerpC(phases[i].m, phases[i + 1].m, t), b: lerpC(phases[i].b, phases[i + 1].b, t) }; } } const d = phases[phases.length - 1]; return { h: d.h, m: d.m, b: d.b }; };
    let filante = null;
    const lancerFilante = () => { filante = { x: rnd(0.15, 0.75) * W, y: rnd(0.08, 0.3) * H, vx: rnd(6, 10), vy: rnd(2.4, 4), vie: 1 }; };
    const fInt = setInterval(() => { if (reduce) return; if (progression > 0.15 && progression < 0.8 && !filante && Math.random() < 0.5) lancerFilante(); }, 7000);
    let mx = 0.5, my = 0.5; const onMove = (e) => { mx = e.clientX / W; my = e.clientY / H; }; window.addEventListener("mousemove", onMove);
    let progression = 0;
    const majP = () => { const el = document.getElementById("nuitDef"); const max = el.offsetHeight - H; progression = Math.min(1, Math.max(0, window.scrollY / max)); };
    window.addEventListener("scroll", majP, { passive: true });
    const t0 = performance.now();
    const dessiner = (now) => {
      const t = (now - t0) / 1000; const p = progression; const c = cielCouleurs(p);
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, css(c.h)); g.addColorStop(0.55, css(c.m)); g.addColorStop(1, css(c.b)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const nuit = p < 0.72 ? 1 : Math.max(0, 1 - (p - 0.72) / 0.2);
      const vlAlpha = nuit * (p < 0.3 ? 0.5 + p : Math.max(0.4, 1.1 - p));
      if (vlAlpha > 0.02) { ctx.globalAlpha = Math.min(0.85, vlAlpha); ctx.drawImage(vl, (mx - 0.5) * -8, (my - 0.5) * -5); ctx.globalAlpha = 1; }
      if (nuit > 0.02) for (let i = 0; i < etoiles.length; i++) { const s = etoiles[i]; const scint = reduce ? 1 : (0.6 + 0.4 * Math.sin(t * s.v + s.tw)); const px = s.x * W + (mx - 0.5) * -14 * s.couche; const py = s.y * H + (my - 0.5) * -9 * s.couche; ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(235,235,255," + (scint * nuit * 0.9).toFixed(3) + ")"; ctx.fill(); }
      const lp = Math.min(1, Math.max(0, (p - 0.18) / 0.24));
      if (lp > 0 && nuit > 0.02) { ctx.save(); ctx.strokeStyle = "rgba(240,201,168," + (0.55 * nuit * Math.min(1, lp * 1.2)).toFixed(3) + ")"; ctx.lineWidth = 1; ctx.beginPath(); const totalSeg = C.length - 1; const segVis = lp * totalSeg; for (let i = 0; i < totalSeg; i++) { const a1 = C[i], a2 = C[i + 1]; const x1 = a1.x * W, y1 = a1.y * H, x2 = a2.x * W, y2 = a2.y * H; if (i < Math.floor(segVis)) { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); } else if (i === Math.floor(segVis)) { const f = segVis - i; ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f); } } ctx.stroke(); for (let i = 0; i < C.length; i++) { const e = C[i]; const vis = Math.min(1, Math.max(0, lp * C.length - i)); if (vis <= 0) continue; const puls = reduce ? 1 : (0.75 + 0.25 * Math.sin(t * 1.6 + i)); const x = e.x * W, y = e.y * H; const halo = ctx.createRadialGradient(x, y, 0, x, y, 14); halo.addColorStop(0, "rgba(240,201,168," + (0.8 * vis * nuit).toFixed(3) + ")"); halo.addColorStop(1, "rgba(240,201,168,0)"); ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, 2.4 * puls, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,235,215," + (vis * nuit).toFixed(3) + ")"; ctx.fill(); } ctx.restore(); }
      if (filante) { ctx.save(); const f = filante; const grad = ctx.createLinearGradient(f.x, f.y, f.x - f.vx * 9, f.y - f.vy * 9); grad.addColorStop(0, "rgba(255,255,255," + (0.9 * f.vie * nuit).toFixed(3) + ")"); grad.addColorStop(1, "rgba(255,255,255,0)"); ctx.strokeStyle = grad; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(f.x - f.vx * 9, f.y - f.vy * 9); ctx.stroke(); ctx.restore(); f.x += f.vx; f.y += f.vy; f.vie -= 0.016; if (f.vie <= 0 || f.x > W + 80) filante = null; }
      if (p > 0.82) { const sp = (p - 0.82) / 0.18; const sx = W * 0.5, sy = H * 1.05 - sp * H * 0.33; const rayon = Math.max(W, H) * 0.5; const soleil = ctx.createRadialGradient(sx, sy, 0, sx, sy, rayon); soleil.addColorStop(0, "rgba(255,236,190," + (0.95 * sp).toFixed(3) + ")"); soleil.addColorStop(0.12, "rgba(255,214,150," + (0.6 * sp).toFixed(3) + ")"); soleil.addColorStop(1, "rgba(255,214,150,0)"); ctx.fillStyle = soleil; ctx.fillRect(0, 0, W, H); ctx.beginPath(); ctx.arc(sx, sy, 34, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,248,225," + (0.95 * sp).toFixed(3) + ")"; ctx.fill(); }
      raf = requestAnimationFrame(dessiner);
    };
    const memoire = document.getElementById("nuitMem"); let memTimer = null;
    const onClick = (e) => { const cx = e.clientX, cy = e.clientY; for (let i = 0; i < C.length; i++) { const el = C[i]; const dx = cx - el.x * W, dy = cy - el.y * H; if (dx * dx + dy * dy < 28 * 28) { memoire.querySelector(".nom").textContent = el.nom; memoire.querySelector(".txt").textContent = el.txt; memoire.style.left = Math.min(W - 300, Math.max(12, el.x * W - 140)) + "px"; memoire.style.top = (el.y * H + 22) + "px"; memoire.classList.add("visible"); clearTimeout(memTimer); memTimer = setTimeout(() => memoire.classList.remove("visible"), 6500); return; } } memoire.classList.remove("visible"); };
    window.addEventListener("click", onClick);
    const verifier = () => { document.querySelectorAll(".nuitp .moment").forEach((m) => { const r = m.getBoundingClientRect(); if (r.top < H * 0.8 && r.bottom > H * 0.2) m.classList.add("vu"); }); };
    window.addEventListener("scroll", verifier, { passive: true }); const vInt = setInterval(verifier, 700); verifier();
    const onScrollInd = () => { const ind = document.getElementById("nuitInd"); if (ind) ind.style.display = window.scrollY > H * 0.3 ? "none" : ""; };
    window.addEventListener("scroll", onScrollInd, { passive: true });
    window.addEventListener("resize", resize); resize(); majP();
    if (reduce) { document.querySelectorAll(".nuitp .moment").forEach((m) => m.classList.add("vu")); progression = 0.3; dessiner(performance.now()); }
    else raf = requestAnimationFrame(dessiner);
    return () => { cancelAnimationFrame(raf); clearInterval(fInt); clearInterval(vInt); window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", majP); window.removeEventListener("scroll", verifier); window.removeEventListener("scroll", onScrollInd); window.removeEventListener("click", onClick); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="nuitp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <canvas id="nuitCiel" />
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <div className="defilement" id="nuitDef">
        <section className="moment m1"><div className="voile"><div className="heure">15 juillet 2023 · 23 h</div><p className="grand">Il est tard.<br />On devrait dormir.<br />On ne dort pas.</p><p className="petit">C&apos;est la deuxième fois qu&apos;on se voit en vrai. Dehors, la nuit est posée sur tout, et nous, on commence à peine à parler. Descends doucement, cette page dure toute la nuit, comme nous.</p></div></section>
        <section className="moment m2"><div className="voile"><div className="heure">1 h · les mots qui comptent</div><p className="grand">Chaque chose qu&apos;on osait se dire<br />allumait quelque chose là-haut.</p><p className="petit">Regarde notre constellation, juste au-dessus. Chaque étoile est un chapitre de nous, touche-les, elles se souviennent. Cette nuit-là, on les a allumées une par une.</p></div></section>
        <section className="moment m3"><div className="voile"><div className="heure">3 h · le monde dort, pas nous</div><p className="grand">On a parlé de nos peurs,<br />de nos envies, de tout.</p><p className="petit">À cette heure-là, il n&apos;y a plus de masque, plus de pudeur, plus de calcul. Il ne restait que nous deux et la vérité. Si tu vois une étoile filer, tu sais quoi faire. Moi, mon vœu, je l&apos;ai fait cette nuit-là. Et il s&apos;est réalisé.</p></div></section>
        <section className="moment m4"><div className="voile"><div className="heure">5 h · le ciel hésite</div><p className="grand">On aurait pu s&apos;arrêter là.<br />On a continué.</p><p className="petit">Le noir devient bleu, le bleu devient pâle. On le voyait par la fenêtre et on faisait comme si de rien n&apos;était, parce qu&apos;aucun de nous deux ne voulait que ça se termine. Continue de descendre. Le jour arrive.</p></div></section>
        <section className="moment m5"><div className="voile"><div className="heure">6 h 12 · le soleil se lève</div><p className="grand">Le soleil s&apos;est levé,<br />et on parlait encore.</p><p className="petit">C&apos;est cette nuit-là que « toi et moi » est devenu « nous ». Trois ans plus tard, je n&apos;ai toujours pas fini de te parler. Alors je te construis des ciels, en attendant la prochaine nuit blanche.</p><a href="/histoire">revenir à notre histoire ✨</a></div></section>
      </div>
      <div className="indice" id="nuitInd">descends dans la nuit ↓</div>
      <div className="memoire" id="nuitMem"><div className="nom"></div><div className="txt"></div></div>
    </div>
  );
}
