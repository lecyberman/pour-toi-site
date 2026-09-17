"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const NOMS = { lui: "Mathieu", elle: "dadoucherie" };
function roleLocal() { try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; } }

function meteoInfo(code) {
  if (code === 0) return { ic: "☀️", t: "ciel dégagé", g: "soleil" };
  if (code === 1 || code === 2) return { ic: "🌤️", t: "quelques nuages", g: "doux" };
  if (code === 3) return { ic: "☁️", t: "ciel couvert", g: "gris" };
  if (code === 45 || code === 48) return { ic: "🌫️", t: "brouillard", g: "brume" };
  if (code >= 51 && code <= 57) return { ic: "🌦️", t: "bruine", g: "pluie" };
  if (code >= 61 && code <= 67) return { ic: "🌧️", t: "pluie", g: "pluie" };
  if (code >= 71 && code <= 77) return { ic: "❄️", t: "neige", g: "neige" };
  if (code >= 80 && code <= 82) return { ic: "🌧️", t: "averses", g: "pluie" };
  if (code === 85 || code === 86) return { ic: "🌨️", t: "averses de neige", g: "neige" };
  if (code >= 95) return { ic: "⛈️", t: "orage", g: "orage" };
  return { ic: "🌡️", t: "", g: "doux" };
}
async function meteo(v) {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${v.lat}&longitude=${v.lon}&current=temperature_2m,weather_code,is_day&timezone=auto`);
    const j = await r.json(); const c = j && j.current; if (!c) return null;
    return { temp: Math.round(c.temperature_2m), code: c.weather_code, heure: c.time };
  } catch (e) { return null; }
}
async function geocoder(nom) {
  try {
    const r = await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&language=fr&format=json&name=" + encodeURIComponent(nom));
    const j = await r.json(); const x = j && j.results && j.results[0]; if (!x) return null;
    return { ville: x.name, lat: x.latitude, lon: x.longitude };
  } catch (e) { return null; }
}

export default function Ciel() {
  const [role, setRole] = useState(null);
  const [loc, setLoc] = useState({ elle: null, lui: null });
  const [meteoElle, setMeteoElle] = useState(null);
  const [meteoLui, setMeteoLui] = useState(null);
  const [mot, setMot] = useState("Où que soient nos deux ciels, ils regardent la même lune.");
  const [ville, setVille] = useState("");
  const [info, setInfo] = useState("");
  const locRef = useRef({ elle: null, lui: null });

  const rendre = async (l) => {
    const mE = l.elle && l.elle.lat != null ? await meteo(l.elle) : null;
    const mL = l.lui && l.lui.lat != null ? await meteo(l.lui) : null;
    setMeteoElle(mE); setMeteoLui(mL);
    const gE = mE ? meteoInfo(mE.code).g : null;
    const gL = mL ? meteoInfo(mL.code).g : null;
    const meme = l.elle && l.lui && Math.abs(l.elle.lat - l.lui.lat) < 0.4 && Math.abs(l.elle.lon - l.lui.lon) < 0.4;
    if (gE && gL) {
      let m;
      if (meme) m = "Vous êtes sous le même ciel en ce moment. Profite, c'est rare et précieux. 🤍";
      else if (gE === "pluie" || gE === "orage") m = "Il pleut sur ton ciel. Imagine que je tiens le parapluie, tout contre toi.";
      else if (gE === "neige") m = "Il neige chez toi. Mets-toi au chaud, je te réchaufferais si j'étais là.";
      else if (gE === "soleil" && gL !== "soleil") m = "Tu as le soleil, j'ai le gris. Garde-m'en un peu pour la prochaine fois.";
      else if (gE === "soleil" && gL === "soleil") m = "Le même soleil sur nous deux aujourd'hui. C'est déjà un peu être ensemble.";
      else m = "Deux ciels différents, une seule pensée : toi.";
      setMot(m);
    }
  };

  const charger = async () => {
    const { data } = await supabase.from("localisation").select("role,ville,lat,lon");
    const l = { elle: null, lui: null };
    (data || []).forEach((x) => { l[x.role] = x; });
    locRef.current = l; setLoc(l); rendre(l);
  };

  useEffect(() => { setRole(roleLocal()); charger(); }, []);

  const enregistrer = async (v) => {
    const moi = roleLocal(); if (!moi) { setInfo("Dis d'abord qui tu es (badge)."); return; }
    setInfo("…");
    const { error } = await supabase.from("localisation").upsert({ role: moi, ville: v.ville, lat: v.lat, lon: v.lon, updated_at: new Date().toISOString() });
    if (error) { setInfo("Oups, réessaie."); return; }
    setInfo("C'est posé 🤍"); charger();
  };
  const poser = async () => {
    if (!ville.trim()) { setInfo("Écris une ville d'abord."); return; }
    setInfo("je cherche…"); const g = await geocoder(ville.trim());
    if (!g) { setInfo("Ville introuvable, réessaie."); return; } enregistrer(g);
  };
  const maPosition = () => {
    if (!navigator.geolocation) { setInfo("Position non disponible."); return; }
    setInfo("je te localise…");
    navigator.geolocation.getCurrentPosition(
      (p) => enregistrer({ ville: "ma position", lat: p.coords.latitude, lon: p.coords.longitude }),
      () => setInfo("Localisation refusée. Écris ta ville."), { timeout: 10000 }
    );
  };

  const carte = (pref, r, m) => {
    const v = loc[r];
    const qui = pref === "elle" ? (role === "elle" ? "chez toi" : "chez dadoucherie") : (role === "lui" ? "chez toi" : "chez Mathieu");
    const info2 = v && v.lat != null && m ? meteoInfo(m.code) : null;
    return (
      <div style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "20px 16px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontSize: ".95rem", margin: "0 0 2px" }}>{qui}</p>
        <p style={{ fontWeight: 700, color: "var(--titre)", fontSize: "1.05rem", margin: "0 0 10px", minHeight: "1.25em" }}>{v && v.ville ? v.ville : "à définir"}</p>
        <div style={{ fontSize: "3.2rem", lineHeight: 1, margin: "4px 0 6px", minHeight: "3.2rem" }}>{info2 ? info2.ic : "…"}</div>
        <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "2rem", color: "var(--titre)" }}>{m ? m.temp + "°" : ""}</div>
        <div style={{ color: "var(--texte-doux)", fontSize: ".9rem", marginTop: 4, minHeight: "1.2em" }}>{info2 ? info2.t : (role === r ? "dis-moi où tu es 👇" : "en attente de sa ville")}</div>
      </div>
    );
  };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 20, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.06rem", margin: "0 0 .3rem" }}>le même moment, deux ciels</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: 0 }}>Notre ciel partagé</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {carte("elle", "elle", meteoElle)}
        {carte("lui", "lui", meteoLui)}
      </div>
      <div style={{ textAlign: "center", margin: "22px auto 0" }}>
        <div style={{ fontSize: "1.4rem" }}>🤍</div>
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--texte)", fontSize: "1.14rem", lineHeight: 1.7, maxWidth: "34ch", margin: "10px auto 0" }}>{mot}</p>
      </div>
      <div style={{ margin: "24px auto 0", maxWidth: 400, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: 16 }}>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.02rem", color: "var(--titre)", margin: "0 0 10px" }}>Où es-tu en ce moment ?</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={ville} onChange={(e) => setVille(e.target.value)} placeholder="ta ville (Marseille, Lyon, Paris…)" style={{ flex: 1, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit" }} />
          <button onClick={poser} style={{ fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "11px 16px", cursor: "pointer" }}>Poser</button>
        </div>
        <button onClick={maPosition} style={{ marginTop: 10, width: "100%", background: "var(--carte)", color: "var(--texte)", border: "1px solid var(--bord)", borderRadius: 100, padding: 11, cursor: "pointer" }}>📍 utiliser ma position</button>
        <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" }}>{info}</p>
        <p style={{ color: "var(--texte-doux)", fontSize: ".8rem", marginTop: 8 }}>Pour que ce soit enregistré comme ta ville, sois sur ton identité (badge). Tu peux la changer autant que tu veux.</p>
      </div>
    </main>
  );
}
