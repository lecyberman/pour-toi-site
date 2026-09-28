"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function dateFr(iso) { return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); }
const NOMS_ETAPES = { snap: "L'ajout Snap", lyon: "Lyon, 1er janvier 2020", nuit: "La nuit du 15 juillet", voyages: "Nos voyages" };

export default function Livre() {
  const anneeCourante = new Date().getFullYear();
  const [annee, setAnnee] = useState(anneeCourante);
  const [mots, setMots] = useState([]);
  const [infinie, setInfinie] = useState([]);
  const [qds, setQds] = useState([]);
  const [versions, setVersions] = useState([]);
  const [lettres, setLettres] = useState([]);
  const [chiffres, setChiffres] = useState([]);

  useEffect(() => {
    try { const p = new URLSearchParams(window.location.search); const a = parseInt(p.get("annee"), 10); if (a) setAnnee(a); } catch (e) {}
  }, []);

  useEffect(() => {
    const deb = annee + "-01-01", fin = (annee + 1) + "-01-01";
    (async () => {
      const { data: m } = await supabase.from("dadoucherie_mots").select("message,created_at").gte("created_at", deb).lt("created_at", fin).order("created_at", { ascending: true });
      setMots(m || []);
      const { data: li } = await supabase.from("lettre_infinie").select("texte,auteur").order("created_at", { ascending: true });
      setInfinie(li || []);
      const { data: q } = await supabase.from("qds").select("semaine,auteur,texte,created_at").gte("created_at", deb).lt("created_at", fin).order("created_at", { ascending: true });
      setQds(q || []);
      const { data: v } = await supabase.from("histoire_versions").select("etape,texte,created_at").gte("created_at", deb).lt("created_at", fin).order("created_at", { ascending: true });
      setVersions(v || []);
      const { data: l } = await supabase.from("lettres").select("titre,texte,date_ouverture").gte("date_ouverture", annee + "-01-01").lte("date_ouverture", annee + "-12-31").order("date_ouverture", { ascending: true });
      setLettres((l || []).filter((x) => new Date(x.date_ouverture + "T00:00:00") <= new Date()));
      const { data: jr } = await supabase.from("dadoucherie_journal").select("type").gte("created_at", deb).lt("created_at", fin);
      const compte = { visite: 0, coeur: 0, billets: 0 };
      (jr || []).forEach((x) => { if (compte[x.type] !== undefined) compte[x.type]++; });
      setChiffres([{ n: compte.visite, l: "visites de sa page" }, { n: compte.coeur, l: "appuis sur le cœur" }, { n: (m || []).length, l: "mots d'elle" }, { n: (li || []).length, l: "phrases du livre à deux" }]);
    })();
  }, [annee]);

  const bloc = { background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "18px 20px", marginBottom: 14 };
  const qui = { fontWeight: 700, color: "var(--accent)", fontSize: ".78rem", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 5 };
  const texte = { whiteSpace: "pre-wrap", fontSize: "1rem", color: "var(--texte)" };
  const meta = { fontSize: ".8rem", color: "var(--texte-doux)", marginTop: 10 };
  const chapitre = { marginTop: 50 };
  const chH2 = { fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.6rem", marginBottom: 6, color: "var(--titre)" };
  const chIntro = { color: "var(--texte-doux)", fontSize: ".92rem", marginBottom: 20, fontStyle: "italic" };
  const vide = <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Rien cette année-là dans ce chapitre. Les pages blanches comptent aussi.</p>;

  const semaines = {};
  qds.forEach((r) => { (semaines[r.semaine] = semaines[r.semaine] || []).push(r); });

  return (
    <main style={{ background: "var(--bg1, #EFE9F3)", minHeight: "100dvh" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--carte)", borderBottom: "1px solid var(--bord)", padding: "12px 18px", display: "flex", gap: 10, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }} className="livre-outils">
        <a href="/histoire" style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: "9px 18px", border: "1px solid var(--bord)", background: "var(--carte)", color: "var(--texte)", textDecoration: "none" }}>⌂ Notre monde</a>
        <select value={annee} onChange={(e) => { const y = e.target.value; try { window.location.search = "?annee=" + y; } catch (er) {} }} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: "9px 18px", border: "1px solid var(--bord)", background: "var(--carte)", color: "var(--texte)" }}>
          {Array.from({ length: anneeCourante - 2026 + 1 }, (_, i) => 2026 + i).map((y) => <option key={y} value={y}>Année {y}</option>)}
        </select>
        <button onClick={() => window.print()} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".9rem", borderRadius: 100, padding: "9px 18px", border: "none", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", color: "#1a1430", cursor: "pointer" }}>🖨️ Imprimer / enregistrer en PDF</button>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "30px 22px 80px" }}>
        <div style={{ textAlign: "center", padding: "70px 20px 60px" }}>
          <div style={{ fontSize: ".85rem", fontWeight: 700, letterSpacing: ".3em", color: "var(--accent)", textTransform: "uppercase" }}>{annee}</div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(2.4rem,9vw,3.6rem)", margin: "14px 0 8px", color: "var(--titre)" }}>Le livre<br />de nous</h1>
          <p style={{ color: "var(--texte-doux)", fontStyle: "italic", fontFamily: "var(--serif)", fontSize: "1.1rem" }}>Tout ce qu&apos;on s&apos;est écrit cette année-là, gardé pour toujours.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
            {chiffres.map((x, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: 110 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--accent)", fontWeight: 600 }}>{x.n}</div>
                <div style={{ fontSize: ".78rem", color: "var(--texte-doux)" }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={chapitre}>
          <h2 style={chH2}>Ses mots</h2>
          <p style={chIntro}>Ce qu&apos;elle a déposé sur la page, avec ses mots à elle.</p>
          {mots.length === 0 ? vide : mots.map((r, i) => <div key={i} style={bloc}><div style={texte}>{r.message}</div><div style={meta}>{dateFr(r.created_at)}</div></div>)}
        </div>

        <div style={chapitre}>
          <h2 style={chH2}>La lettre infinie</h2>
          <p style={chIntro}>Écrite à deux, une phrase à la fois. L&apos;encre sombre, c&apos;est Mathieu. Le rose, c&apos;est elle.</p>
          {infinie.length === 0 ? <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>La première phrase attend encore.</p> : (
            <div style={{ ...bloc, fontFamily: "var(--serif)", fontSize: "1.08rem", lineHeight: 1.85 }}>
              {infinie.map((r, i) => <span key={i} style={{ color: r.auteur === "elle" ? "#B05A7A" : "var(--texte)" }}>{r.texte + " "}</span>)}
            </div>
          )}
        </div>

        <div style={chapitre}>
          <h2 style={chH2}>Les questions du dimanche</h2>
          <p style={chIntro}>Une question par semaine, deux réponses sans se concerter.</p>
          {qds.length === 0 ? vide : Object.keys(semaines).sort().map((s) => (
            <div key={s} style={bloc}>
              <div style={qui}>Semaine {s.split("S")[1]}</div>
              {semaines[s].map((r, i) => <div key={i} style={{ ...texte, marginBottom: 8 }}>{(r.auteur === "elle" ? "Elle : " : "Mathieu : ") + r.texte}</div>)}
            </div>
          ))}
        </div>

        <div style={chapitre}>
          <h2 style={chH2}>Notre histoire, dans ses mots</h2>
          <p style={chIntro}>Les chapitres de la frise, racontés par elle.</p>
          {versions.length === 0 ? vide : versions.map((r, i) => <div key={i} style={bloc}><div style={qui}>{NOMS_ETAPES[r.etape] || r.etape}</div><div style={texte}>{r.texte}</div><div style={meta}>{dateFr(r.created_at)}</div></div>)}
        </div>

        <div style={chapitre}>
          <h2 style={chH2}>Les lettres qui se sont ouvertes</h2>
          <p style={chIntro}>Écrites à l&apos;avance, déverrouillées par le temps.</p>
          {lettres.length === 0 ? vide : lettres.map((l, i) => <div key={i} style={bloc}><div style={qui}>{l.titre}</div><div style={texte}>{l.texte}</div><div style={meta}>ouverte le {dateFr(l.date_ouverture + "T00:00:00")}</div></div>)}
        </div>

        <p style={{ textAlign: "center", marginTop: 60, paddingTop: 40, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.15rem", color: "var(--accent)" }}>Fin de l&apos;année {annee}. La suite s&apos;écrit en ce moment même. Ton Mathieu.</p>
      </div>
      <style>{`@media print{.livre-outils{display:none}}`}</style>
    </main>
  );
}
