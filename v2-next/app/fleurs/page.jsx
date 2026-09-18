"use client";
import { useEffect, useRef, useState } from "react";

const FLEURS = [
  { nom: "Pivoine", sens: "la tendresse et le bonheur d'aimer", col: ["#C99BE0", "#E7C6F2"], p: 16, forme: "ronde" },
  { nom: "Rose lavande", sens: "le coup de foudre, encore intact", col: ["#B49BDA", "#D9C6F0"], p: 12, forme: "rose" },
  { nom: "Lys", sens: "la pureté de ce qu'on ressent", col: ["#CBB4EC", "#EFE3FB"], p: 6, forme: "pointue" },
  { nom: "Tulipe", sens: "un amour simple et sincère", col: ["#A886DA", "#C7B2E6"], p: 6, forme: "tulipe" },
  { nom: "Marguerite", sens: "je pense à toi, tout le temps", col: ["#D7C4F0", "#F1E8FC"], p: 14, forme: "ronde" },
  { nom: "Iris", sens: "un message d'espoir : on se revoit bientôt", col: ["#8E6FBF", "#B49BDA"], p: 5, forme: "pointue" },
  { nom: "Orchidée", sens: "tu es rare, et précieuse", col: ["#BE9BE0", "#E3CDF5"], p: 5, forme: "rose" },
  { nom: "Fleur de cerisier", sens: "la douceur des instants qui passent", col: ["#E7C6F2", "#FBEEFB"], p: 5, forme: "ronde" },
];
const MOTS = [
  "Tiens, une fleur pour toi. J'aurais préféré te la tendre en vrai, mais celle-ci ne fanera pas.",
  "Je t'en offre une aujourd'hui, comme je le ferais si tu étais là, contre moi.",
  "Une fleur de plus dans ton bouquet. Une pensée de plus qui te dit : tu me manques.",
  "Pour toi, ma dadoucherie. Parce que tu mérites des fleurs, souvent, et pas seulement les grands jours.",
  "Celle-ci pousse rien que pour toi. Garde-la, elle vient de loin mais elle vient du cœur.",
  "Une petite fleur, un grand je t'aime. La distance n'y change rien.",
  "Je continuerai à t'en offrir chaque jour, jusqu'à pouvoir remplacer celles-ci par des vraies.",
];
const KEY = "bouquet_v1";

function seedJour() { const d = new Date(); return d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate(); }

function dessine(ctx, cx, cy, R, f, ouv) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = "#6f8f5f"; ctx.lineWidth = R * 0.06; ctx.beginPath();
  ctx.moveTo(cx, cy + R * 0.2); ctx.quadraticCurveTo(cx + R * 0.15, cy + R * 1.0, cx, cy + R * 1.7); ctx.stroke();
  ctx.fillStyle = "#6f8f5f"; ctx.beginPath();
  ctx.ellipse(cx + R * 0.28, cy + R * 0.95, R * 0.28, R * 0.13, -0.5, 0, 6.28); ctx.fill();
  const n = f.p, ang = (Math.PI * 2) / n;
  ctx.save(); ctx.translate(cx, cy);
  for (let i = 0; i < n; i++) {
    ctx.save(); ctx.rotate(i * ang);
    const g = ctx.createLinearGradient(0, 0, 0, -R * ouv);
    g.addColorStop(0, f.col[0]); g.addColorStop(1, f.col[1]);
    ctx.fillStyle = g; ctx.beginPath();
    if (f.forme === "pointue") { ctx.moveTo(0, 0); ctx.quadraticCurveTo(R * 0.16 * ouv, -R * 0.5 * ouv, 0, -R * ouv); ctx.quadraticCurveTo(-R * 0.16 * ouv, -R * 0.5 * ouv, 0, 0); }
    else if (f.forme === "tulipe") { ctx.moveTo(0, 0); ctx.quadraticCurveTo(R * 0.34 * ouv, -R * 0.4 * ouv, R * 0.14 * ouv, -R * 0.92 * ouv); ctx.quadraticCurveTo(0, -R * ouv, -R * 0.14 * ouv, -R * 0.92 * ouv); ctx.quadraticCurveTo(-R * 0.34 * ouv, -R * 0.4 * ouv, 0, 0); }
    else if (f.forme === "rose") { ctx.moveTo(0, 0); ctx.quadraticCurveTo(R * 0.30 * ouv, -R * 0.35 * ouv, 0, -R * 0.86 * ouv); ctx.quadraticCurveTo(-R * 0.30 * ouv, -R * 0.35 * ouv, 0, 0); }
    else { ctx.moveTo(0, 0); ctx.quadraticCurveTo(R * 0.26 * ouv, -R * 0.55 * ouv, 0, -R * ouv); ctx.quadraticCurveTo(-R * 0.26 * ouv, -R * 0.55 * ouv, 0, 0); }
    ctx.fill(); ctx.restore();
  }
  ctx.fillStyle = "#F3E6B0"; ctx.beginPath(); ctx.arc(0, 0, R * 0.2 * ouv, 0, 6.28); ctx.fill();
  ctx.fillStyle = "rgba(180,140,80,.5)";
  for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.arc(Math.cos(k) * R * 0.09 * ouv, Math.sin(k * 1.7) * R * 0.09 * ouv, R * 0.03 * ouv, 0, 6.28); ctx.fill(); }
  ctx.restore();
}

function etat() { try { return JSON.parse(localStorage.getItem(KEY)) || { total: 0, dernier: null, jours: [] }; } catch (e) { return { total: 0, dernier: null, jours: [] }; } }

export default function Fleurs() {
  const canvasRef = useRef(null);
  const jardinRef = useRef(null);
  const [revele, setRevele] = useState(false);
  const [nom, setNom] = useState("");
  const [sens, setSens] = useState("");
  const [mot, setMot] = useState("");
  const [cnt, setCnt] = useState("");
  const jour = seedJour();
  const fleur = FLEURS[jour % FLEURS.length];
  const motJour = MOTS[jour % MOTS.length];

  const majBouquet = () => {
    const c = etat();
    setCnt(c.total > 0 ? (c.total === 1 ? "1 fleur reçue de lui 🤍" : c.total + " fleurs reçues de lui 🤍") : "");
    const jardin = jardinRef.current; if (!jardin) return;
    jardin.innerHTML = "";
    if (!c.total) { jardin.innerHTML = '<span style="color:var(--texte-doux);font-size:.9rem">Ta première fleur t\'attend, juste au-dessus.</span>'; return; }
    const noms = c.jours && c.jours.length ? c.jours : [];
    const toShow = Math.min(c.total, 40);
    for (let i = 0; i < toShow; i++) {
      let f = FLEURS[(jour + i) % FLEURS.length];
      const nm = noms[noms.length - 1 - i];
      if (nm) { for (let z = 0; z < FLEURS.length; z++) { if (FLEURS[z].nom === nm) { f = FLEURS[z]; break; } } }
      const mc = document.createElement("canvas"); mc.width = mc.height = 68; mc.style.width = mc.style.height = "34px";
      dessine(mc.getContext("2d"), 34, 30, 22, f, 1); jardin.appendChild(mc);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    dessine(ctx, 230, 210, 150, fleur, 0.12);
    majBouquet();
  }, []);

  const reveler = () => {
    if (revele) return;
    setRevele(true); setNom(fleur.nom); setSens(fleur.sens); setMot(motJour);
    const ctx = canvasRef.current.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { dessine(ctx, 230, 210, 150, fleur, 1); }
    else { let t = 0; (function anim() { t += 0.045; const o = Math.min(1, t); const e = 1 - Math.pow(1 - o, 3); dessine(ctx, 230, 210, 150, fleur, e); if (o < 1) requestAnimationFrame(anim); })(); }
    try { if (navigator.vibrate) navigator.vibrate([15, 40, 15]); } catch (e) {}
    const c = etat(); const cle = new Date().toDateString();
    if (c.dernier !== cle) { c.total = (c.total || 0) + 1; c.dernier = cle; c.jours = c.jours || []; c.jours.push(fleur.nom); if (c.jours.length > 60) c.jours = c.jours.slice(-60); try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
    majBouquet();
  };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <p className="eyebrow" style={{ fontSize: "1.08rem", margin: "0 0 .3rem" }}>parce que je t&apos;en offre, même de loin</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.9rem)", color: "var(--titre)", margin: 0 }}>Tes fleurs</h1>
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <canvas ref={canvasRef} width={460} height={460} style={{ width: 230, height: 230, maxWidth: "70vw" }} />
        <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--titre)", fontSize: "1.25rem", margin: "2px 0", minHeight: "1.4em" }}>{nom}</div>
        <div style={{ color: "var(--texte-doux)", fontSize: ".92rem", margin: "0 0 6px", minHeight: "1.2em" }}>{sens}</div>
        <div style={{ color: "var(--texte)", fontSize: "1.06rem", lineHeight: 1.8, maxWidth: 440, margin: "14px auto 0", minHeight: "2em" }}>{mot}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 24 }}>
          <button onClick={reveler} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "12px 22px", cursor: "pointer", border: "1px solid transparent", color: "#1a1430", background: "linear-gradient(180deg,#CBB4EC,#A886DA)", boxShadow: "0 10px 26px -12px rgba(168,134,218,.8)" }}>Reçois ta fleur du jour</button>
          <a href="/le-15" style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "12px 22px", cursor: "pointer", textDecoration: "none", color: "var(--texte)", background: "var(--carte)", border: "1px solid var(--bord)" }}>Notre 15</a>
        </div>
      </div>

      <div style={{ marginTop: 38, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "20px 18px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.2rem", color: "var(--titre)", margin: "0 0 4px" }}>Ton bouquet</h2>
        <div style={{ color: "var(--accent)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem", margin: "0 0 12px" }}>{cnt}</div>
        <div ref={jardinRef} style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }} />
      </div>
    </main>
  );
}
