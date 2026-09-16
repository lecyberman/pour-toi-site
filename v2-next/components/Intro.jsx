"use client";
import { useEffect, useRef, useState } from "react";

// Intro cinématique : une fois par session, respecte reduced-motion.
export default function Intro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [showEb, setShowEb] = useState(false);
  const [showPh, setShowPh] = useState(false);
  const [showGo, setShowGo] = useState(false);
  const cvRef = useRef(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("intro_vu") === "1"; } catch (e) {}
    if (seen) return;
    let reduce = false;
    try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    setVisible(true);
    document.documentElement.style.overflow = "hidden";

    const t = [];
    t.push(setTimeout(() => setShowEb(true), reduce ? 100 : 900));
    t.push(setTimeout(() => setShowPh(true), reduce ? 250 : 2600));
    t.push(setTimeout(() => setShowGo(true), reduce ? 400 : 5000));

    // canvas particules + papillon
    const cv = cvRef.current; if (!cv) return;
    const x = cv.getContext("2d");
    let W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), raf = 0;
    const rz = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); };
    rz(); addEventListener("resize", rz);
    const ps = []; for (let i = 0; i < 70; i++) ps.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + .3, v: Math.random() * .02 + .005, p: Math.random() * 6.28 });
    const pap = { on: false, x: -0.1, y: 0.42 };
    t.push(setTimeout(() => (pap.on = true), reduce ? 300 : 2200));
    const t0 = performance.now();
    const papillon = (cx, cy, s, flap) => {
      x.save(); x.translate(cx, cy); x.scale(s, s);
      const g = x.createLinearGradient(-20, -20, 20, 20); g.addColorStop(0, "#E9DEF7"); g.addColorStop(1, "#A886DA"); x.fillStyle = g; x.globalAlpha = .92;
      const w = 0.5 + Math.abs(Math.sin(flap)) * 0.6;
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach((q) => { x.save(); x.scale(q[0] * w, q[1]); x.beginPath(); x.moveTo(0, 0); x.bezierCurveTo(6, -4, 22, -10, 20, -2); x.bezierCurveTo(19, 4, 8, 4, 0, 0); x.closePath(); x.fill(); x.restore(); });
      x.fillStyle = "#241830"; x.globalAlpha = 1; x.beginPath(); x.ellipse(0, 0, 1.6, 7, 0, 0, 6.28); x.fill(); x.restore();
    };
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const tt = (now - t0) / 1000; x.clearRect(0, 0, W, H);
      const glow = Math.min(1, tt / 1.2);
      const g = x.createRadialGradient(W / 2, H * 0.46, 0, W / 2, H * 0.46, Math.min(W, H) * 0.5);
      g.addColorStop(0, "rgba(150,120,200," + (0.28 * glow) + ")"); g.addColorStop(1, "rgba(11,10,22,0)");
      x.fillStyle = g; x.fillRect(0, 0, W, H);
      for (const s of ps) { s.y -= s.v * 0.6; if (s.y < 0) { s.y = 1; s.x = Math.random(); } x.globalAlpha = Math.max(0, (0.3 + 0.5 * Math.sin(tt * 1.2 + s.p)) * glow); x.fillStyle = "#E6D8FF"; x.beginPath(); x.arc(s.x * W, s.y * H, s.r, 0, 6.28); x.fill(); }
      x.globalAlpha = 1;
      if (pap.on) { pap.x += 0.0022; papillon(pap.x * W, (pap.y + Math.sin(tt * 2.2) * 0.03) * H, Math.min(W, H) / 240, tt * 10); }
    };
    raf = requestAnimationFrame(frame);

    return () => { t.forEach(clearTimeout); cancelAnimationFrame(raf); removeEventListener("resize", rz); document.documentElement.style.overflow = ""; };
  }, []);

  const entrer = () => {
    try { sessionStorage.setItem("intro_vu", "1"); } catch (e) {}
    setLeaving(true);
    setTimeout(() => { setVisible(false); document.documentElement.style.overflow = ""; }, 1200);
  };

  if (!visible) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100000, background: "#08070f", overflow: "hidden", opacity: leaving ? 0 : 1, transform: leaving ? "scale(1.12)" : "none", transition: "opacity 1.1s ease, transform 1.1s cubic-bezier(.4,0,.2,1)", pointerEvents: leaving ? "none" : "auto", fontFamily: "'Fraunces',Georgia,serif" }}>
      <canvas ref={cvRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <button onClick={entrer} style={{ position: "absolute", right: 16, top: 16, color: "rgba(237,233,243,.55)", background: "none", border: "none", cursor: "pointer", fontFamily: "system-ui,sans-serif", fontSize: ".82rem", zIndex: 2 }}>passer</button>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", textAlign: "center", padding: "0 24px" }}>
        <p style={{ fontStyle: "italic", color: "#C7B2E6", fontSize: "1.15rem", margin: "0 0 .6rem", opacity: showEb ? 1 : 0, transition: "opacity 1.2s ease" }}>pour toi,</p>
        <p style={{ color: "#FBF4EA", fontWeight: 500, fontSize: "clamp(1.6rem,5.2vw,2.5rem)", lineHeight: 1.4, margin: "0 auto", maxWidth: "20ch", opacity: showPh ? 1 : 0, transition: "opacity 1.4s ease" }}>J&apos;ai construit un endroit où le temps ralentit.</p>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: "16%", textAlign: "center", opacity: showGo ? 1 : 0, transition: "opacity 1.1s ease" }}>
        <button onClick={entrer} style={{ fontFamily: "system-ui,sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "14px 28px", cursor: "pointer", boxShadow: "0 14px 40px -12px rgba(168,134,218,.85)" }}>Entrer, doucement</button>
      </div>
    </div>
  );
}
