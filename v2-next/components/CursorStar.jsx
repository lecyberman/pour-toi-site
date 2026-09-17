"use client";
import { useEffect } from "react";

// Curseur mignon (étoile qui sourit) + poussière d'étincelles. Desktop : remplace la flèche.
export default function CursorStar() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let reduce = false, fine = false;
    try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    try { fine = matchMedia("(pointer: fine)").matches; } catch (e) {}

    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000;";
    document.body.appendChild(cv);
    if (fine) document.documentElement.style.cursor = "none";
    const x = cv.getContext("2d");
    let W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), raf = 0, last = performance.now();
    const resize = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); addEventListener("resize", resize);

    const COL = ["#E9DEF7", "#CBB4EC", "#B49BDA", "#F3D9F0", "#F2E29B"];
    let parts = [], lx = 0, ly = 0, has = false;
    const cur = { x: -100, y: -100, tx: -100, ty: -100, shown: false };
    const emet = (px, py, force) => {
      const d = has ? Math.hypot(px - lx, py - ly) : 0;
      if (!has || d > 6 || force) {
        const n = force ? 14 : Math.min(3, 1 + ((d / 18) | 0));
        for (let i = 0; i < n; i++) {
          const a = Math.random() * 6.283, sp = force ? Math.random() * 2.4 + 0.6 : 0;
          parts.push({ x: px, y: py, vx: (Math.random() * .6 - .3) + Math.cos(a) * sp, vy: (Math.random() * .6 - .3) + .15 + Math.sin(a) * sp, r: Math.random() * 2.1 + .7, vie: 1, dv: Math.random() * .02 + .012, c: COL[(Math.random() * COL.length) | 0] });
        }
        if (parts.length > 200) parts.splice(0, parts.length - 200);
        lx = px; ly = py; has = true;
      }
    };
    const bouge = (px, py) => { cur.tx = px; cur.ty = py; cur.shown = true; if (!reduce) emet(px, py, false); };
    const onMove = (e) => bouge(e.clientX, e.clientY);
    const onDown = (e) => emet(e.clientX, e.clientY, true);
    const onTouch = (e) => { if (e.touches[0]) bouge(e.touches[0].clientX, e.touches[0].clientY); };
    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mousedown", onDown, { passive: true });
    addEventListener("touchmove", onTouch, { passive: true });

    const star = (cx, cy, s, rot, now) => {
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
      const gl = x.createRadialGradient(0, 0, 0, 0, 0, 26);
      gl.addColorStop(0, "rgba(242,226,155,.55)"); gl.addColorStop(1, "rgba(242,226,155,0)");
      x.fillStyle = gl; x.beginPath(); x.arc(0, 0, 26, 0, 6.283); x.fill();
      x.beginPath();
      for (let i = 0; i < 10; i++) { const r = (i % 2 === 0) ? 13 : 5.6, a = -Math.PI / 2 + i * Math.PI / 5; const X = Math.cos(a) * r, Y = Math.sin(a) * r; i === 0 ? x.moveTo(X, Y) : x.lineTo(X, Y); }
      x.closePath();
      const g = x.createLinearGradient(-13, -13, 13, 13); g.addColorStop(0, "#FBE5A6"); g.addColorStop(1, "#E7B84E");
      x.fillStyle = g; x.fill(); x.lineWidth = 1.4; x.strokeStyle = "rgba(120,80,20,.35)"; x.stroke();
      x.rotate(-rot);
      x.fillStyle = "#3a2a12";
      x.beginPath(); x.arc(-3.4, -1, 1.5, 0, 6.283); x.fill();
      x.beginPath(); x.arc(3.4, -1, 1.5, 0, 6.283); x.fill();
      x.lineWidth = 1.4; x.strokeStyle = "#3a2a12"; x.beginPath(); x.arc(0, 1.5, 3.2, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke();
      x.fillStyle = "rgba(230,120,140,.5)";
      x.beginPath(); x.arc(-6, 2.5, 1.7, 0, 6.283); x.fill();
      x.beginPath(); x.arc(6, 2.5, 1.7, 0, 6.283); x.fill();
      x.restore();
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      last = now;
      x.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.006; p.vie -= p.dv;
        if (p.vie <= 0) { parts.splice(i, 1); continue; }
        x.globalAlpha = Math.max(0, p.vie) * .9; x.fillStyle = p.c;
        x.beginPath(); x.arc(p.x, p.y, p.r * p.vie + .2, 0, 6.283); x.fill();
      }
      x.globalAlpha = 1;
      if (fine && cur.shown) {
        cur.x += (cur.tx - cur.x) * 0.35; cur.y += (cur.ty - cur.y) * 0.35;
        star(cur.x, cur.y, 1 + Math.sin(now / 300) * 0.06, Math.sin(now / 700) * 0.25, now);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mousedown", onDown);
      removeEventListener("touchmove", onTouch);
      if (fine) document.documentElement.style.cursor = "";
      cv.remove();
    };
  }, []);
  return null;
}
