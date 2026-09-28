"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const AMBIANCES = [
  { id: "pluie", ic: "🌧️", nom: "Pluie douce" },
  { id: "orage", ic: "⛈️", nom: "Orage" },
  { id: "ocean", ic: "🌊", nom: "Océan" },
  { id: "vent", ic: "🍃", nom: "Vent" },
  { id: "feu", ic: "🔥", nom: "Feu de bois" },
  { id: "nuit", ic: "🌙", nom: "Nuit d'été" },
];
const TEMPS = [15, 30, 45, 60, 90];

export default function Dormir() {
  const [enLecture, setEnLecture] = useState(false);
  const [choisis, setChoisis] = useState({});
  const [hint, setHint] = useState("Touche pour lancer. Mélange ce que tu veux.");
  const [minActif, setMinActif] = useState(null);
  const [minInfo, setMinInfo] = useState("");
  const [ecoutes, setEcoutes] = useState(null);
  const [ecTitre, setEcTitre] = useState("");
  const [ecUrl, setEcUrl] = useState("");

  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const bruitRef = useRef(null);
  const actifs = useRef({});
  const timers = useRef({ minuteurId: null, fondu: null, tick: null, finPrevue: null });

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem("dormir_choix") || "{}") || {}; setChoisis(s); } catch (e) {}
    chargerEc();
    return () => { Object.keys(actifs.current).forEach(desactiver); annulerMinuteur(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sauverChoix = (obj) => { try { localStorage.setItem("dormir_choix", JSON.stringify(obj)); } catch (e) {} };

  const initCtx = () => {
    if (ctxRef.current) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC();
    const master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination);
    const n = ctx.sampleRate * 2; const bruit = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = bruit.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    ctxRef.current = ctx; masterRef.current = master; bruitRef.current = bruit;
  };
  const source = () => { const ctx = ctxRef.current; const s = ctx.createBufferSource(); s.buffer = bruitRef.current; s.loop = true; s.start(0); return s; };
  const gain = (v) => { const g = ctxRef.current.createGain(); g.gain.value = v; return g; };
  const lfo = (freq, min, max, cible, param) => { const ctx = ctxRef.current; const o = ctx.createOscillator(); o.frequency.value = freq; const g = ctx.createGain(); g.gain.value = (max - min) / 2; o.connect(g); g.connect(cible[param]); cible[param].value = (max + min) / 2; o.start(0); return o; };

  const BUILDERS = {
    pluie: () => { const s = source(); const hp = ctxRef.current.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 500; const lp = ctxRef.current.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 6500; const g = gain(0.5); s.connect(hp); hp.connect(lp); lp.connect(g); const mod = lfo(0.15, 0.4, 0.6, g, "gain"); return { out: g, extra: [s, mod] }; },
    ocean: () => { const ctx = ctxRef.current; const s = source(); const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 500; const g = gain(0.0001); s.connect(lp); lp.connect(g); const o = ctx.createOscillator(); o.frequency.value = 0.11; const og = ctx.createGain(); og.gain.value = 0.32; o.connect(og); og.connect(g.gain); g.gain.value = 0.34; o.start(0); return { out: g, extra: [s, o] }; },
    orage: () => { const ctx = ctxRef.current; const s = source(); const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 420; const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 6000; const g = gain(0.45); s.connect(hp); hp.connect(lp); lp.connect(g); let vivant = true; const tonnerre = () => { if (!vivant) return; const ts = source(); const tl = ctx.createBiquadFilter(); tl.type = "lowpass"; tl.frequency.value = 180; const tg = ctx.createGain(); tg.gain.value = 0.0001; ts.connect(tl); tl.connect(tg); tg.connect(g); const t = ctx.currentTime; tg.gain.setValueAtTime(0.0001, t); tg.gain.exponentialRampToValueAtTime(0.9, t + 0.08); tg.gain.exponentialRampToValueAtTime(0.0002, t + 1.6 + Math.random()); ts.stop(t + 3); setTimeout(tonnerre, 9000 + Math.random() * 16000); }; setTimeout(tonnerre, 4000 + Math.random() * 6000); return { out: g, extra: [s], arret: () => { vivant = false; } }; },
    vent: () => { const ctx = ctxRef.current; const s = source(); const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 500; bp.Q.value = 0.7; const g = gain(0.4); s.connect(bp); bp.connect(g); const o = ctx.createOscillator(); o.frequency.value = 0.08; const og = ctx.createGain(); og.gain.value = 280; o.connect(og); og.connect(bp.frequency); o.start(0); return { out: g, extra: [s, o] }; },
    feu: () => { const ctx = ctxRef.current; const s = source(); const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 430; const g = gain(0.4); s.connect(lp); lp.connect(g); let vivant = true; const crepite = () => { if (!vivant) return; const cs = source(); const chp = ctx.createBiquadFilter(); chp.type = "highpass"; chp.frequency.value = 1500; const cg = ctx.createGain(); cg.gain.value = 0.0001; cs.connect(chp); chp.connect(cg); cg.connect(g); const t = ctx.currentTime; cg.gain.setValueAtTime(0.0001, t); cg.gain.exponentialRampToValueAtTime(0.25 + Math.random() * 0.3, t + 0.01); cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.06 + Math.random() * 0.08); cs.stop(t + 0.3); setTimeout(crepite, 120 + Math.random() * 400); }; setTimeout(crepite, 300); return { out: g, extra: [s], arret: () => { vivant = false; } }; },
    nuit: () => { const ctx = ctxRef.current; const s = source(); const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 350; const g = gain(0.18); s.connect(lp); lp.connect(g); const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = 4600; const og = ctx.createGain(); og.gain.value = 0.0001; o.connect(og); og.connect(g); o.start(0); const lo = ctx.createOscillator(); lo.type = "square"; lo.frequency.value = 8; const log = ctx.createGain(); log.gain.value = 0.06; lo.connect(log); log.connect(og.gain); og.gain.value = 0.06; lo.start(0); return { out: g, extra: [s, o, lo] }; },
  };

  const activer = (id, vol) => { if (actifs.current[id]) return; const b = BUILDERS[id](); const vg = ctxRef.current.createGain(); vg.gain.value = vol != null ? vol : 0.7; b.out.connect(vg); vg.connect(masterRef.current); actifs.current[id] = { vg, b }; };
  const desactiver = (id) => { const a = actifs.current[id]; if (!a) return; try { if (a.b.arret) a.b.arret(); } catch (e) {} try { a.b.out.disconnect(); } catch (e) {} (a.b.extra || []).forEach((n) => { try { n.stop && n.stop(); } catch (e) {} try { n.disconnect && n.disconnect(); } catch (e) {} }); try { a.vg.disconnect(); } catch (e) {} delete actifs.current[id]; };
  const setVol = (id, v) => { if (actifs.current[id]) actifs.current[id].vg.gain.value = v; };

  const majHint = (lecture, obj) => { const n = Object.keys(obj).length; if (!lecture) setHint(n ? "Touche ▶ pour lancer ta nuit." : "Choisis un ou plusieurs sons, puis touche ▶."); else setHint(n ? "Bonne nuit, toi. 🤍" : "Choisis un son ci-dessous."); };

  const toggleAmb = (id) => {
    setChoisis((prev) => {
      const next = { ...prev };
      if (next[id] != null) { delete next[id]; desactiver(id); }
      else { const v = 0.7; next[id] = v; if (enLecture) activer(id, v); }
      sauverChoix(next); majHint(enLecture, next); return next;
    });
  };
  const changeVol = (id, v) => { setChoisis((prev) => { const next = { ...prev, [id]: v }; setVol(id, v); sauverChoix(next); return next; }); };

  const togglePlay = () => {
    initCtx();
    if (!enLecture) {
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
      let obj = choisis;
      Object.keys(choisis).forEach((id) => activer(id, choisis[id]));
      if (Object.keys(choisis).length === 0) { activer("pluie", 0.7); obj = { pluie: 0.7 }; setChoisis(obj); sauverChoix(obj); }
      setEnLecture(true); majHint(true, obj);
    } else {
      Object.keys(actifs.current).slice().forEach(desactiver);
      if (ctxRef.current) ctxRef.current.suspend();
      annulerMinuteur(); setMinActif(null);
      setEnLecture(false); majHint(false, choisis);
    }
  };

  const annulerMinuteur = () => { const t = timers.current; clearTimeout(t.minuteurId); clearTimeout(t.fondu); clearInterval(t.tick); t.minuteurId = t.fondu = t.tick = t.finPrevue = null; };

  const poserMinuteur = (min) => {
    setMinActif(min);
    if (!enLecture) togglePlay();
    annulerMinuteur();
    if (min === 0) { setMinInfo("Aucun minuteur. Les sons tourneront tant que tu veux."); return; }
    const fin = Date.now() + min * 60000; timers.current.finPrevue = fin;
    timers.current.tick = setInterval(() => { const reste = Math.max(0, fin - Date.now()); const mm = Math.floor(reste / 60000), ss = Math.floor((reste % 60000) / 1000); setMinInfo("Extinction dans " + mm + " min " + (ss < 10 ? "0" : "") + ss + " s 🌙"); }, 1000);
    const avant = Math.max(0, min * 60000 - 30000);
    timers.current.fondu = setTimeout(() => { if (masterRef.current) { try { masterRef.current.gain.setTargetAtTime(0.0001, ctxRef.current.currentTime, 8); } catch (e) {} } }, avant);
    timers.current.minuteurId = setTimeout(() => {
      Object.keys(actifs.current).slice().forEach(desactiver);
      if (ctxRef.current) { ctxRef.current.suspend(); if (masterRef.current) masterRef.current.gain.value = 0.9; }
      setEnLecture(false); annulerMinuteur(); setMinActif(null); setMinInfo("C'est éteint. Dors bien, toi. 🤍"); majHint(false, choisis);
    }, min * 60000);
  };

  const normUrl = (u) => { u = (u || "").trim(); if (!u) return ""; if (!/^https?:\/\//i.test(u)) u = "https://" + u; return u; };
  const chargerEc = async () => { const { data } = await supabase.from("ecoutes").select("*").order("created_at", { ascending: false }); setEcoutes(data || []); };
  const ajouterEc = async () => { const t = ecTitre.trim(); const u = normUrl(ecUrl); if (!t || !u) return; await supabase.from("ecoutes").insert({ titre: t, url: u }); setEcTitre(""); setEcUrl(""); chargerEc(); };
  const retirerEc = async (id) => { await supabase.from("ecoutes").delete().eq("id", id); chargerEc(); };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 16, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>quand le sommeil ne vient pas</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.7rem)", color: "var(--titre)", margin: 0 }}>Pour t&apos;endormir</h1>
        <p style={{ color: "var(--texte-doux)", fontSize: ".95rem", margin: ".5rem 0 0" }}>Choisis tes sons, pose un minuteur, et laisse-toi couler doucement.</p>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0 8px" }}>
        <button onClick={togglePlay} aria-label="Lancer les sons" style={{ width: 96, height: 96, borderRadius: "50%", border: "none", cursor: "pointer", color: "#1a1430", background: "radial-gradient(circle at 40% 35%, #E9DEF7, #A886DA)", fontSize: "2rem", boxShadow: "0 18px 40px -14px rgba(168,134,218,.8)" }}>{enLecture ? "❚❚" : "▶"}</button>
        <p style={{ color: "var(--texte-doux)", fontSize: ".85rem", marginTop: 10, minHeight: "1.2em" }}>{hint}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginTop: 18 }}>
        {AMBIANCES.map((a) => {
          const actif = choisis[a.id] != null;
          return (
            <div key={a.id} style={{ background: actif ? "rgba(180,155,218,.12)" : "var(--carte)", border: actif ? "1px solid rgba(168,134,218,.6)" : "1px solid var(--bord)", borderRadius: 16, padding: 14 }}>
              <div onClick={() => toggleAmb(a.id)} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <span style={{ fontSize: "1.5rem" }}>{a.ic}</span>
                <span style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--titre)" }}>{a.nom}</span>
              </div>
              {actif && <input type="range" min={0} max={1} step={0.01} value={choisis[a.id]} onChange={(e) => changeVol(a.id, parseFloat(e.target.value))} aria-label={"Volume " + a.nom} style={{ width: "100%", marginTop: 10, accentColor: "#A886DA" }} />}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.2rem", color: "var(--titre)", margin: "0 0 4px" }}>Minuteur de sommeil</h2>
        <p style={{ color: "var(--texte-doux)", fontSize: ".85rem", margin: "0 0 12px" }}>Le son s&apos;éteindra tout seul, en fondu. Pas besoin d&apos;y penser.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {TEMPS.map((m) => {
            const on = minActif === m;
            return <button key={m} onClick={() => poserMinuteur(m)} style={{ fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: "9px 16px", cursor: "pointer", color: on ? "#1a1430" : "var(--texte)", background: on ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", border: on ? "1px solid transparent" : "1px solid var(--bord)" }}>{m} min</button>;
          })}
          <button onClick={() => poserMinuteur(0)} style={{ fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: "9px 16px", cursor: "pointer", color: minActif === 0 ? "#1a1430" : "var(--texte)", background: minActif === 0 ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", border: minActif === 0 ? "1px solid transparent" : "1px solid var(--bord)" }}>∞ sans fin</button>
        </div>
        <div style={{ marginTop: 12, color: "var(--accent)", fontFamily: "var(--serif)", fontStyle: "italic", minHeight: "1.3em" }}>{minInfo}</div>
      </div>

      <div style={{ marginTop: 34, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "18px 16px" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.2rem", color: "var(--titre)", margin: "0 0 4px", textAlign: "center" }}>Tes écoutes du soir</h2>
        <p style={{ color: "var(--texte-doux)", fontSize: ".82rem", textAlign: "center", margin: "0 0 14px", lineHeight: 1.5 }}>Range ici tes liens (podcasts, documentaires, pluie sur YouTube…). Un seul appui pour les rouvrir le soir.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
          <input value={ecTitre} onChange={(e) => setEcTitre(e.target.value)} placeholder="Nom (ex : mon podcast true crime)" style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 13px", fontFamily: "inherit", fontSize: ".95rem" }} />
          <input value={ecUrl} onChange={(e) => setEcUrl(e.target.value)} placeholder="Colle le lien ici (https://…)" inputMode="url" style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 13px", fontFamily: "inherit", fontSize: ".95rem" }} />
          <button onClick={ajouterEc} style={{ alignSelf: "flex-start", fontFamily: "inherit", fontWeight: 700, fontSize: ".9rem", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "10px 18px", cursor: "pointer" }}>Ranger ce lien</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(!ecoutes || ecoutes.length === 0) && <p style={{ color: "var(--texte-doux)", fontStyle: "italic", fontSize: ".88rem", textAlign: "center" }}>Rien encore. Ajoute ta première écoute du soir.</p>}
          {(ecoutes || []).map((e) => (
            <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, padding: "10px 12px" }}>
              <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, color: "var(--texte)", textDecoration: "none", fontWeight: 600, fontSize: ".95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>🎧 {e.titre}</a>
              <button onClick={() => retirerEc(e.id)} style={{ background: "transparent", border: "1px solid var(--bord)", color: "var(--texte-doux)", borderRadius: 100, padding: "5px 11px", fontSize: ".8rem", cursor: "pointer" }}>retirer</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
