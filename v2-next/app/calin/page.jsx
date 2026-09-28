"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const NOMS = { elle: "dadoucherie", lui: "Mathieu" };
const AUTRE = { elle: "lui", lui: "elle" };
function roleLocal() { try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; } }
function vibrer(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
function ilya(iso) { const d = (Date.now() - new Date(iso).getTime()) / 1000; if (d < 60) return "à l'instant"; if (d < 3600) return "il y a " + Math.floor(d / 60) + " min"; if (d < 86400) return "il y a " + Math.floor(d / 3600) + " h"; const j = Math.floor(d / 86400); return j === 1 ? "hier" : "il y a " + j + " j"; }

export default function Calin() {
  const [role, setRole] = useState(null);
  const [msg, setMsg] = useState("Si tu as besoin d'être serrée fort, touche le bouton. Je le saurai tout de suite.");
  const [mot, setMot] = useState("");
  const [mode, setMode] = useState("demande");
  const [appel, setAppel] = useState(null);
  const [etreinteOn, setEtreinteOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const dernierVu = useRef(null);
  const initFait = useRef(false);

  const etreinte = () => { setEtreinteOn(false); setTimeout(() => setEtreinteOn(true), 20); vibrer([60, 80, 60, 80, 120]); setTimeout(() => setEtreinteOn(false), 2400); };

  const lire = async () => { const { data } = await supabase.from("calins").select("id,de_role,type,texte,created_at").order("created_at", { ascending: false }).limit(20); return data || []; };

  const render = (rows) => {
    const moi = roleLocal(); if (!moi) return;
    const autre = AUTRE[moi];
    const demAutre = rows.find((r) => r.de_role === autre && r.type === "demande");
    const repMoi = rows.find((r) => r.de_role === moi && r.type === "reponse");
    const enAttente = demAutre && (!repMoi || new Date(repMoi.created_at) < new Date(demAutre.created_at));
    if (enAttente) { setAppel({ qui: NOMS[autre] + " a besoin d'un câlin 🤍", quand: (demAutre.texte ? "« " + demAutre.texte + " » · " : "") + ilya(demAutre.created_at) }); setMode("reponse"); }
    else { setAppel(null); setMode("demande"); }

    const maxId = rows.reduce((m, r) => Math.max(m, r.id), 0);
    if (!initFait.current) { dernierVu.current = maxId; initFait.current = true; }
    else if (maxId > dernierVu.current) {
      const nouveaux = rows.filter((r) => r.id > dernierVu.current);
      dernierVu.current = maxId;
      const recuReponse = nouveaux.some((r) => r.de_role === autre && r.type === "reponse");
      const recuDemande = nouveaux.some((r) => r.de_role === autre && r.type === "demande");
      if (recuReponse) { setMsg(NOMS[autre] + " te serre fort, là, maintenant. 🤗"); etreinte(); }
      else if (recuDemande) { setMsg(NOMS[autre] + " a besoin d'un câlin. Réponds-lui quand tu veux."); vibrer([40, 60, 40]); }
    }
  };

  const refresh = async () => { const rows = await lire(); render(rows); };

  useEffect(() => {
    setRole(roleLocal()); refresh();
    const t = setInterval(refresh, 6000);
    let canal = null;
    try { canal = supabase.channel("calins-live").on("postgres_changes", { event: "INSERT", schema: "public", table: "calins" }, () => refresh()).subscribe(); } catch (e) {}
    return () => { clearInterval(t); if (canal) try { supabase.removeChannel(canal); } catch (e) {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choisir = (r) => { try { localStorage.setItem("moi_role", r); } catch (e) {} setRole(r); refresh(); };
  const agir = async () => {
    const moi = roleLocal(); if (!moi) return;
    const t = mot.trim(); setBusy(true);
    await supabase.from("calins").insert({ de_role: moi, type: mode, texte: t || null });
    setMot("");
    if (mode === "reponse") { setMsg("Ton câlin est parti vers " + NOMS[AUTRE[moi]] + ". 🤗"); etreinte(); }
    else setMsg("C'est envoyé 🤍 " + NOMS[AUTRE[moi]] + " va recevoir ton besoin de câlin.");
    setTimeout(() => { setBusy(false); refresh(); }, 700);
  };

  return (
    <>
      {etreinteOn && (
        <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 20, pointerEvents: "none", background: "radial-gradient(circle at 50% 55%, rgba(240,196,220,.55), rgba(199,178,230,.28) 38%, rgba(13,11,26,0) 72%)" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: "6rem", filter: "drop-shadow(0 0 30px rgba(240,196,220,.8))", animation: "calinSerre 2.4s ease" }}>🤗</div>
          </div>
        </div>
      )}
      <style>{`@keyframes calinSerre{0%{transform:scale(2.2);opacity:0}30%{transform:scale(1);opacity:1}80%{transform:scale(1);opacity:1}100%{transform:scale(1.05);opacity:0}}@keyframes calinBattre{0%,100%{transform:scale(1)}15%{transform:scale(1.12)}30%{transform:scale(1)}}`}</style>

      <main className="wrap" style={{ maxWidth: 520, minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", zIndex: 1 }}>
        <a className="retour" href="/besoin">⌂ rentrer</a>
        <p className="eyebrow" style={{ fontSize: "1.08rem", margin: "0 0 .35rem" }}>quand la distance pèse un peu</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .1rem" }}>La boîte à câlins</h1>
        <div style={{ fontSize: "4.4rem", margin: "18px 0 4px", filter: "drop-shadow(0 0 22px rgba(228,180,208,.6))", animation: "calinBattre 2.6s ease-in-out infinite" }}>🫂</div>

        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--texte)", fontSize: "1.14rem", lineHeight: 1.6, margin: "14px auto 0", maxWidth: "30ch", minHeight: "3em" }}>{msg}</p>

        {appel && role && (
          <div style={{ marginTop: 20, width: "100%", maxWidth: 360, background: "linear-gradient(180deg, rgba(228,180,208,.16), rgba(228,180,208,.05))", border: "1px solid rgba(228,180,208,.4)", borderRadius: 18, padding: "16px 18px" }}>
            <div style={{ fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "1.06rem" }}>{appel.qui}</div>
            <div style={{ fontSize: ".78rem", color: "var(--texte-doux)", marginTop: 3 }}>{appel.quand}</div>
          </div>
        )}

        {role ? (
          <>
            <button onClick={agir} disabled={busy} style={{ marginTop: 22, fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1.02rem", borderRadius: 100, padding: "15px 30px", cursor: "pointer", border: "1px solid transparent", color: mode === "reponse" ? "#1a1430" : "#2a1226", background: mode === "reponse" ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "linear-gradient(135deg,#F0C4DC,#D28CB8)", opacity: busy ? .5 : 1 }}>{mode === "reponse" ? "Lui envoyer un câlin 🤗" : "J'ai besoin d'un câlin 🤍"}</button>
            <input value={mot} onChange={(e) => setMot(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") agir(); }} maxLength={120} placeholder={mode === "reponse" ? "un mot avec ton câlin (facultatif)" : "un mot, si tu veux (facultatif)"} style={{ marginTop: 14, width: "100%", maxWidth: 340, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 100, color: "var(--titre)", padding: "12px 18px", fontFamily: "inherit", fontSize: ".98rem", textAlign: "center" }} />
            <a onClick={() => { try { localStorage.removeItem("moi_role"); } catch (e) {} initFait.current = false; setRole(null); setMsg("Dis-moi qui tu es, et je saurai à qui envoyer le câlin."); }} style={{ display: "inline-block", marginTop: 16, fontSize: ".82rem", color: "var(--accent)", cursor: "pointer", opacity: .8 }}>ce n&apos;est pas toi ? changer</a>
          </>
        ) : (
          <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => choisir("lui")} style={{ fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "11px 18px", cursor: "pointer", border: "1px solid transparent", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", color: "#1a1430" }}>Je suis Mathieu</button>
            <button onClick={() => choisir("elle")} style={{ fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "11px 18px", cursor: "pointer", border: "1px solid var(--bord)", background: "var(--carte)", color: "var(--texte)" }}>Je suis dadoucherie</button>
          </div>
        )}
        <p style={{ marginTop: 16, color: "var(--texte-doux)", fontSize: ".82rem", maxWidth: "32ch", lineHeight: 1.5 }}>Un câlin demandé arrive comme une notification à l&apos;autre. Il peut t&apos;en renvoyer un : une lumière chaude, une petite vibration, et le sentiment d&apos;être serré fort.</p>
      </main>
    </>
  );
}
