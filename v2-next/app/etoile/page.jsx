"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const NOMS = { elle: "dadoucherie", lui: "Mathieu" };
function roleLocal() { try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; } }
function auj() { const d = new Date(), m = d.getMonth() + 1, j = d.getDate(); return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (j < 10 ? "0" : "") + j; }

export default function Etoile() {
  const [role, setRole] = useState(null);
  const [jeTouche, setJeTouche] = useState(false);
  const [autreTouche, setAutreTouche] = useState(false);
  const [msg, setMsg] = useState("Ce soir, cette étoile est la nôtre.");
  const cielRef = useRef(null);

  const refresh = async () => {
    const { data } = await supabase.from("etoile").select("role").eq("jour", auj());
    const rows = data || [];
    const moi = roleLocal();
    if (!moi) { setMsg("Dis-moi qui tu es, et cette étoile deviendra la vôtre."); return; }
    const autre = moi === "elle" ? "lui" : "elle";
    const jt = rows.some((x) => x.role === moi);
    const at = rows.some((x) => x.role === autre);
    setJeTouche(jt); setAutreTouche(at);
    const nomAutre = NOMS[autre];
    if (jt && at) setMsg("Vous avez regardé la même étoile ce soir. Où que vous soyez, vous étiez ensemble sous elle. 🤍");
    else if (jt && !at) setMsg("Tu l'as regardée ce soir. J'espère que " + nomAutre + " la regardera aussi, avant de dormir.");
    else if (!jt && at) setMsg(nomAutre + " a déjà regardé notre étoile ce soir 🤍 Regarde-la, toi aussi.");
    else setMsg("Ce soir, cette étoile est la nôtre. Regarde-la, et pense à l'autre.");
  };

  useEffect(() => { setRole(roleLocal()); refresh(); }, []);

  useEffect(() => {
    const c = cielRef.current; if (!c) return; const x = c.getContext("2d");
    let W, H, st = [], raf;
    const rz = () => { W = c.width = innerWidth; H = c.height = innerHeight; st = []; const n = Math.min(120, Math.round(W * H / 16000)); for (let i = 0; i < n; i++) st.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .2, p: Math.random() * 6.28, v: Math.random() * 1.2 + .3 }); };
    addEventListener("resize", rz); rz();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; let t = 0;
    const frame = () => { raf = requestAnimationFrame(frame); if (document.hidden) return; t += 0.016; x.clearRect(0, 0, W, H); for (let i = 0; i < st.length; i++) { const s = st[i]; const a = reduce ? 0.7 : (0.4 + 0.5 * Math.sin(t * s.v + s.p)); x.globalAlpha = a; x.fillStyle = "#e9e2f7"; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.28); x.fill(); } x.globalAlpha = 1; };
    frame();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", rz); };
  }, []);

  const choisir = (r) => { try { localStorage.setItem("moi_role", r); } catch (e) {} setRole(r); refresh(); };
  const toucher = async () => {
    const moi = roleLocal(); if (!moi) return;
    setJeTouche(true);
    await supabase.from("etoile").upsert({ jour: auj(), role: moi }, { onConflict: "jour,role", ignoreDuplicates: true });
    refresh();
  };

  return (
    <>
      <canvas ref={cielRef} style={{ position: "fixed", inset: 0, zIndex: 0 }} />
      <main className="wrap" style={{ maxWidth: 520, minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
        <a className="retour" href="/histoire">⌂ rentrer</a>
        <p className="eyebrow" style={{ fontSize: "1.08rem", margin: "0 0 .4rem" }}>chaque soir, une étoile à nous</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.7rem)", color: "var(--titre)", margin: "0 0 .2rem" }}>Notre étoile</h1>

        <div onClick={() => { if (!jeTouche && role) toucher(); }} style={{ position: "relative", width: 170, height: 170, margin: "26px auto 8px", cursor: role && !jeTouche ? "pointer" : "default" }}>
          <div style={{ position: "absolute", inset: "-40%", borderRadius: "50%", background: jeTouche ? "radial-gradient(circle, rgba(142,231,160,.5), rgba(199,178,230,.2) 45%, transparent 70%)" : "radial-gradient(circle, rgba(199,178,230,.55), rgba(180,155,218,.16) 45%, transparent 70%)", animation: "etoileRespire 4s ease-in-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", filter: "drop-shadow(0 0 18px rgba(199,178,230,.8))", animation: "etoileRespire 4s ease-in-out infinite" }}>✦</div>
        </div>
        <style>{`@keyframes etoileRespire{0%,100%{transform:scale(1);opacity:.92}50%{transform:scale(1.06);opacity:1}}`}</style>

        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--texte)", fontSize: "1.12rem", lineHeight: 1.6, margin: "10px auto 0", maxWidth: "30ch", minHeight: "3.4em" }}>{msg}</p>

        {role ? (
          <>
            <button onClick={toucher} disabled={jeTouche} style={{ marginTop: 20, fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1rem", borderRadius: 100, padding: "14px 26px", cursor: jeTouche ? "default" : "pointer", border: "1px solid transparent", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", boxShadow: "0 14px 32px -14px rgba(168,134,218,.8)", opacity: jeTouche ? .6 : 1 }}>{jeTouche ? "Tu l'as regardée ce soir 🤍" : "La regarder ce soir"}</button>
            <a onClick={() => { try { localStorage.removeItem("moi_role"); } catch (e) {} setRole(null); setMsg("Dis-moi qui tu es, et cette étoile deviendra la vôtre."); }} style={{ display: "inline-block", marginTop: 16, fontSize: ".82rem", color: "var(--accent)", cursor: "pointer", opacity: .8 }}>ce n&apos;est pas toi ? changer</a>
          </>
        ) : (
          <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => choisir("lui")} style={{ fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "11px 18px", cursor: "pointer", border: "1px solid transparent", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", color: "#1a1430" }}>Je suis Mathieu</button>
            <button onClick={() => choisir("elle")} style={{ fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "11px 18px", cursor: "pointer", border: "1px solid var(--bord)", background: "var(--carte)", color: "var(--texte)" }}>Je suis dadoucherie</button>
          </div>
        )}
        <p style={{ marginTop: 14, color: "var(--texte-doux)", fontSize: ".82rem" }}>Quand vous l&apos;avez regardée tous les deux le même soir, elle brille pour vous deux.</p>
      </main>
    </>
  );
}
