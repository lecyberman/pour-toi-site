"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

function quand(s) {
  if (s.date_reelle) return new Date(s.date_reelle).getTime();
  return s.created_at ? new Date(s.created_at).getTime() : 0;
}
function annee(s) { return s.date_reelle ? String(new Date(s.date_reelle).getFullYear()) : null; }
function dateLisible(d) { try { return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return d; } }
function uniques(arr, cle) { const vus = {}, out = []; arr.forEach((o) => { const v = o[cle]; if (v && !vus[v]) { vus[v] = 1; out.push(v); } }); return out; }

export default function Souvenirs() {
  const [tous, setTous] = useState(null);
  const [fEmotion, setFEmotion] = useState(null);
  const [fCategorie, setFCategorie] = useState(null);
  const [ouvert, setOuvert] = useState(null);
  const [revele, setRevele] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("souvenirs").select("*");
      setTous((data || []).sort((a, b) => quand(b) - quand(a)));
    })();
  }, []);

  const emotions = useMemo(() => (tous ? uniques(tous, "emotion") : []), [tous]);
  const categories = useMemo(() => (tous ? uniques(tous, "categorie") : []), [tous]);
  const vus = useMemo(() => (tous || []).filter((s) => (!fEmotion || s.emotion === fEmotion) && (!fCategorie || s.categorie === fCategorie)), [tous, fEmotion, fCategorie]);

  const chip = (label, actif, onClick) => (
    <button key={label} onClick={onClick} style={{ fontSize: ".82rem", fontWeight: 600, borderRadius: 100, padding: "6px 14px", cursor: "pointer", marginRight: 8, marginBottom: 8, border: actif ? "1px solid transparent" : "1px solid var(--bord)", background: actif ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", color: actif ? "#1a1430" : "var(--texte)" }}>{label}</button>
  );

  const ouvrir = (s) => { setOuvert(s); setRevele(false); };

  return (
    <main className="wrap" style={{ maxWidth: 760 }}>
      <a className="retour" href="/histoire">⌂ notre monde</a>
      <div style={{ textAlign: "center", marginBottom: 26, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>notre carnet</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Ce qu&apos;on garde</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Pas une liste, pas un album. Juste les moments que je n&apos;ai pas voulu laisser filer. Ouvre celui que tu veux, certains cachent encore quelque chose.</p>
      </div>

      {tous && (emotions.length > 1 || categories.length > 1) && (
        <div style={{ marginBottom: 24 }}>
          {emotions.length > 1 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--texte-doux)", marginBottom: 8 }}>ce qu&apos;on ressentait</div>
              {chip("tout", fEmotion === null, () => setFEmotion(null))}
              {emotions.map((v) => chip(v, fEmotion === v, () => setFEmotion(fEmotion === v ? null : v)))}
            </div>
          )}
          {categories.length > 1 && (
            <div>
              <div style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--texte-doux)", marginBottom: 8 }}>le genre de moment</div>
              {chip("tout", fCategorie === null, () => setFCategorie(null))}
              {categories.map((v) => chip(v, fCategorie === v, () => setFCategorie(fCategorie === v ? null : v)))}
            </div>
          )}
        </div>
      )}

      {tous === null && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Chargement du carnet…</p>}
      {tous !== null && tous.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px 16px" }}>
          <div style={{ fontSize: "2.2rem", opacity: .5 }}>✧</div>
          <p style={{ color: "var(--texte-doux)", maxWidth: "38ch", margin: "16px auto 0" }}>Le carnet est encore vide. Il se remplira doucement, un moment à la fois. Reviens, il y aura quelque chose.</p>
        </div>
      )}
      {tous !== null && tous.length > 0 && vus.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px 16px" }}>
          <div style={{ fontSize: "2.2rem", opacity: .5 }}>✧</div>
          <p style={{ color: "var(--texte-doux)", maxWidth: "38ch", margin: "16px auto 0" }}>Rien sous ce filtre. Retire-le, il y a autre chose à voir.</p>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {(() => {
          let anneeCourante = null; const out = [];
          vus.forEach((s) => {
            const a = annee(s);
            if (a && a !== anneeCourante) { anneeCourante = a; out.push(<div key={"an" + a} style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.35rem", color: "var(--accent)", margin: "12px 0 4px" }}>{a}</div>); }
            const meta = [];
            if (s.date_texte) meta.push(s.date_texte); else if (s.date_reelle) meta.push(dateLisible(s.date_reelle));
            if (s.lieu) meta.push(s.lieu);
            out.push(
              <button key={s.id} onClick={() => ouvrir(s)} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "start", width: "100%", textAlign: "left", background: "var(--carte)", border: s.importance === 3 ? "1px solid rgba(216,184,120,.35)" : "1px solid var(--bord)", borderRadius: 16, padding: 16, cursor: "pointer", color: "inherit", fontFamily: "inherit" }}>
                {s.image
                  ? <img src={s.image} alt="" loading="lazy" style={{ width: 74, height: 74, borderRadius: 12, objectFit: "cover", flex: "none" }} />
                  : <div style={{ width: 74, height: 74, borderRadius: 12, background: "linear-gradient(140deg, rgba(203,180,236,.28), rgba(216,184,120,.18))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flex: "none" }}>{s.message_cache ? "✦" : "✧"}</div>}
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: s.importance === 3 ? "1.28rem" : "1.15rem", lineHeight: 1.25, color: "var(--titre)" }}>{s.titre}</div>
                  {meta.length > 0 && <div style={{ fontSize: ".72rem", color: "var(--texte-doux)", marginTop: 3 }}>{meta.join(" · ")}</div>}
                  {s.description && <div style={{ fontSize: ".9rem", color: "var(--texte-doux)", marginTop: 6, lineHeight: 1.55 }}>{s.description.slice(0, 110)}{s.description.length > 110 ? "…" : ""}</div>}
                  {s.emotion && <span style={{ display: "inline-block", marginTop: 8, fontSize: ".72rem", fontWeight: 600, color: "var(--accent)", background: "rgba(203,180,236,.14)", borderRadius: 100, padding: ".22em .8em" }}>{s.emotion}</span>}
                </div>
              </button>
            );
          });
          return out;
        })()}
      </div>

      {ouvert && (
        <div onClick={() => setOuvert(null)} style={{ position: "fixed", inset: 0, background: "rgba(10,8,20,.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18, zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "var(--bg2, var(--carte))", border: "1px solid var(--bord)", borderRadius: 20, padding: 22, maxWidth: 520, width: "100%", maxHeight: "88vh", overflowY: "auto", position: "relative" }}>
            <button onClick={() => setOuvert(null)} aria-label="Fermer" style={{ position: "absolute", top: 12, right: 12, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", color: "var(--texte)" }}>✕</button>
            {ouvert.image && <img src={ouvert.image} alt={ouvert.titre} style={{ width: "100%", borderRadius: 12, marginBottom: 16, display: "block" }} />}
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.5rem", lineHeight: 1.2, paddingRight: 34, color: "var(--titre)" }}>{ouvert.titre}</h2>
            {(() => { const meta = []; if (ouvert.date_texte) meta.push(ouvert.date_texte); else if (ouvert.date_reelle) meta.push(dateLisible(ouvert.date_reelle)); if (ouvert.lieu) meta.push(ouvert.lieu); return meta.length ? <p style={{ fontSize: ".9rem", color: "var(--texte-doux)", marginTop: 8 }}>{meta.join(" · ")}</p> : null; })()}
            {ouvert.description && <div style={{ marginTop: 16, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "var(--texte)" }}>{ouvert.description}</div>}
            {ouvert.message_cache && (
              <div style={{ marginTop: 20 }}>
                {!revele
                  ? <button onClick={() => setRevele(true)} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 100, padding: "8px 16px", cursor: "pointer", color: "var(--texte)", fontSize: ".9rem" }}>il y a autre chose</button>
                  : <div style={{ marginTop: 12, fontFamily: "var(--serif)", fontStyle: "italic", lineHeight: 1.6, color: "var(--accent)", borderLeft: "2px solid rgba(203,180,236,.4)", paddingLeft: 16 }}>{ouvert.message_cache}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
