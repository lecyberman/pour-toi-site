"use client";
import { useEffect, useRef, useState } from "react";

const MOTS_MER = [
  "La mer t'a apporté ça : où que tu ailles, tu me ramènes toujours à toi.",
  "Un jour, on marchera pieds nus au bord de l'eau, ta main dans la mienne, sans compter les heures.",
  "Tu es comme la mer : douce, immense, et je pourrais te regarder pendant des heures.",
  "Cette bouteille a voyagé loin pour te dire une chose toute simple : je t'aime.",
  "Ferme les yeux, écoute les vagues. C'est le bruit de moi qui pense à toi.",
  "Promis : bientôt, la mer, le sel, le soleil, et nous deux, juste nous deux.",
  "Même les océans ne sont pas assez grands pour tout ce que je ressens pour toi.",
];
const CIBLE = new Date("2026-08-16T20:53:00+02:00").getTime();

export default function Mer() {
  const cielRef = useRef(null), merRef = useRef(null);
  const [cr, setCr] = useState({ html: "", titre: "Bientôt, toi et moi", eyebrow: "on se retrouve" });
  const [lune, setLune] = useState({ e: "🌙", nom: "…" });
  const [iB, setIB] = useState(() => Math.floor(Math.random() * MOTS_MER.length));
  const [mot, setMot] = useState("");
  const [ouvB, setOuvB] = useState(false);
  const [secoue, setSecoue] = useState(false);
  const reduce = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const deux = (n) => (n < 10 ? "0" : "") + n;
    const bloc = (n, u) => '<div style="min-width:66px;background:rgba(255,255,255,.06);border:1px solid rgba(174,199,245,.28);border-radius:16px;padding:12px 8px"><div style="font-family:var(--serif);font-weight:500;font-size:2rem;color:#F3F7FF;line-height:1">' + n + '</div><div style="font-size:.72rem;color:#9FB4DA;text-transform:uppercase;letter-spacing:.08em;margin-top:6px">' + u + "</div></div>";
    const rendre = () => {
      const d = CIBLE - Date.now();
      if (d > 0) {
        let s = Math.floor(d / 1000); const j = Math.floor(s / 86400); s -= j * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
        const horloge = '<div style="display:flex;gap:10px;justify-content:center;margin:14px 0 10px;flex-wrap:wrap">' + (j > 0 ? bloc(j, "jours") : "") + bloc(deux(h), "heures") + bloc(deux(m), "min") + bloc(deux(s), "sec") + "</div>";
        let m2; if (d < 36e5) m2 = "Plus qu'une poignée de minutes… j'ai le cœur qui s'emballe."; else if (d < 108e5) m2 = "Ça approche. Prépare-toi à la reprendre dans tes bras."; else m2 = "Son train arrive à 20h53. Après deux mois, elle sera enfin là, contre toi.";
        setCr({ html: horloge + '<p style="color:#C7D4EC;font-size:1rem;line-height:1.7;max-width:440px;margin:6px auto 0">' + m2 + "</p>", titre: "Bientôt, toi et moi", eyebrow: "on se retrouve aujourd'hui" });
      } else if (d > -108e5) {
        setCr({ html: '<div style="font-size:3rem;margin:6px 0">🚆</div><p style="color:#C7D4EC;font-size:1rem;line-height:1.7;max-width:440px;margin:6px auto 0">C\'est l\'heure 🤍 Son train arrive. Va la guetter sur le quai, et si le train a un peu de retard, respire : elle arrive, c\'est sûr.</p>', titre: "Elle arrive", eyebrow: "enfin" });
      } else {
        setCr({ html: '<div style="font-size:3rem;margin:6px 0">🤍</div><p style="color:#C7D4EC;font-size:1rem;line-height:1.7;max-width:440px;margin:6px auto 0">Vous êtes ensemble. Profite de chaque seconde, vous l\'avez tellement mérité.</p>', titre: "Vous y êtes", eyebrow: "toi et elle, enfin réunis" });
      }
    };
    rendre(); const t = setInterval(rendre, 1000);

    const lp = 2551442.8, ref = Date.UTC(2000, 0, 6, 18, 14, 0) / 1000;
    const age = (((Date.now() / 1000 - ref) % lp) + lp) % lp; const f = age / lp; const idx = Math.floor(f * 8 + 0.5) % 8;
    const EM = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]; const NOM = ["nouvelle lune", "premier croissant", "premier quartier", "lune gibbeuse croissante", "pleine lune", "lune gibbeuse décroissante", "dernier quartier", "dernier croissant"];
    setLune({ e: EM[idx], nom: NOM[idx] });

    // ciel
    const cv = cielRef.current, x = cv.getContext("2d"); let W, H, stars = [], raf1;
    const init = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; stars = []; const n = Math.min(90, Math.floor(W * H / 16000)); for (let i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H * 0.6, r: Math.random() * 1.2 + .3, a: Math.random(), s: Math.random() * .02 + .004 }); };
    const draw = () => { x.clearRect(0, 0, W, H); for (let i = 0; i < stars.length; i++) { const st = stars[i]; if (!reduce) { st.a += st.s; if (st.a > 1 || st.a < 0) st.s = -st.s; } x.globalAlpha = .25 + Math.abs(st.a) * .6; x.fillStyle = "#cfe0ff"; x.beginPath(); x.arc(st.x, st.y, st.r, 0, 6.28); x.fill(); } x.globalAlpha = 1; raf1 = requestAnimationFrame(draw); };
    init(); draw(); addEventListener("resize", init);

    // vagues
    const cm = merRef.current, xm = cm.getContext("2d"); let Wm, Hm, tt = 0, raf2;
    const fit = () => { Wm = cm.width = innerWidth; Hm = cm.height = Math.round(innerHeight * 0.42); };
    fit(); addEventListener("resize", fit);
    const couches = [{ amp: 14, len: 0.012, sp: 0.02, col: "rgba(120,150,220,.20)", y: 0.45 }, { amp: 20, len: 0.009, sp: 0.015, col: "rgba(100,130,210,.28)", y: 0.62 }, { amp: 26, len: 0.007, sp: 0.010, col: "rgba(80,110,190,.40)", y: 0.80 }];
    const drawM = () => { xm.clearRect(0, 0, Wm, Hm); if (!reduce) tt += 1; const cx = Wm * 0.5; for (let k = 0; k < Hm; k += 7) { const wob = Math.sin(k * 0.06 + tt * 0.05) * 10 + Math.sin(k * 0.13 - tt * 0.03) * 5; const aa = 0.12 * (1 - k / Hm); if (aa > 0.004) { xm.fillStyle = "rgba(210,224,255," + aa.toFixed(3) + ")"; xm.fillRect(cx - 14 + wob, k, 28, 3); } } couches.forEach((c) => { xm.beginPath(); xm.moveTo(0, Hm); for (let i = 0; i <= Wm; i += 6) { const y = Hm * c.y + Math.sin(i * c.len + tt * c.sp) * c.amp + Math.sin(i * c.len * 0.5 - tt * c.sp * 0.7) * c.amp * 0.4; xm.lineTo(i, y); } xm.lineTo(Wm, Hm); xm.closePath(); xm.fillStyle = c.col; xm.fill(); }); raf2 = requestAnimationFrame(drawM); };
    drawM();
    return () => { clearInterval(t); cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); removeEventListener("resize", init); removeEventListener("resize", fit); };
  }, []);

  const cliquerB = () => {
    if (!ouvB) { try { if (navigator.vibrate) navigator.vibrate([15, 40, 15]); } catch (e) {} if (!reduce) setSecoue(true); setTimeout(() => { setMot(MOTS_MER[iB % MOTS_MER.length]); setOuvB(true); setSecoue(false); }, reduce ? 0 : 700); }
    else { const n = iB + 1; setIB(n); setMot(""); setTimeout(() => setMot(MOTS_MER[n % MOTS_MER.length]), 250); }
  };

  const btn = (primary) => ({ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "11px 20px", cursor: "pointer", border: "1px solid transparent", textDecoration: "none", color: primary ? "#0d1230" : "#EAF0FA", background: primary ? "linear-gradient(180deg,#CFE0FF,#9DBBF0)" : "rgba(255,255,255,.07)", ...(primary ? {} : { borderColor: "rgba(255,255,255,.16)" }) });
  const section = { marginTop: 40, background: "rgba(255,255,255,.04)", border: "1px solid rgba(174,199,245,.18)", borderRadius: 20, padding: "22px 20px", textAlign: "center" };

  return (
    <div style={{ color: "#EAF0FA", background: "radial-gradient(120% 70% at 50% -6%, #2a2450 0%, transparent 52%),radial-gradient(90% 60% at 82% 8%, #23325e 0%, transparent 55%),linear-gradient(180deg, #0d1230 0%, #0a1026 55%, #0a1a30 100%)", minHeight: "100dvh", overflowX: "hidden" }}>
      <style>{`@keyframes merTangue{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}50%{transform:rotate(8deg)}75%{transform:rotate(-5deg)}}`}</style>
      <canvas ref={cielRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
      <canvas ref={merRef} style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: "42vh", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", padding: "max(24px,env(safe-area-inset-top)) 22px 70px" }}>
        <a className="retour" href="/surprise" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", color: "rgba(234,240,250,.75)" }}>⌂ rentrer</a>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#AEC7F5", fontSize: "1.08rem", margin: "0 0 .3rem" }}>{cr.eyebrow}</p>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(2rem,7vw,2.9rem)", margin: 0, color: "#F3F7FF" }}>{cr.titre}</h1>
        </div>
        <div style={{ textAlign: "center", margin: "26px 0 10px" }} dangerouslySetInnerHTML={{ __html: cr.html }} />

        <div style={section}>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.35rem", color: "#F3F7FF", margin: "0 0 6px" }}>La même lune, ce soir 🌙</h2>
          <div style={{ fontSize: "3.4rem", lineHeight: 1, margin: "6px 0 4px" }}>{lune.e}</div>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#AEC7F5" }}>{lune.nom}</div>
          <p style={{ color: "#C7D4EC", lineHeight: 1.7, margin: ".3rem auto 0", maxWidth: 440 }}>Où que tu sois quand on n&apos;est pas ensemble, lève les yeux : c&apos;est la même lune au-dessus de vous deux. On ne regarde jamais seuls.</p>
        </div>

        <div style={section}>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.35rem", color: "#F3F7FF", margin: "0 0 6px" }}>Une bouteille à la mer 🌊</h2>
          <div role="button" tabIndex={0} onClick={cliquerB} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cliquerB(); } }} style={{ fontSize: "3.6rem", cursor: "pointer", display: "inline-block", filter: "drop-shadow(0 8px 20px rgba(120,160,230,.4))", animation: secoue ? "merTangue 1s ease" : "none" }}>🍾</div>
          <p style={{ color: "#C7D4EC", lineHeight: 1.7, margin: ".3rem auto 0", maxWidth: 440 }}>{ouvB ? "encore un mot ?" : "touche la bouteille, la mer t'a apporté un mot"}</p>
          {mot && <div style={{ marginTop: 16, background: "linear-gradient(180deg, rgba(174,199,245,.14), rgba(174,199,245,.05))", border: "1px solid rgba(174,199,245,.35)", borderRadius: 16, padding: "16px 18px", color: "#EAF0FA", fontSize: "1.05rem", lineHeight: 1.8 }}>{mot}</div>}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 22 }}>
          <a style={btn(false)} href="/ocean">La lettre de la mer</a>
          <a style={btn(false)} href="/chansons">Nos chansons</a>
          <a style={btn(true)} href="/ensemble">Ensemble, en direct</a>
        </div>
      </div>
    </div>
  );
}
