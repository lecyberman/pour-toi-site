"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const EMOS = {
  "heureuse": { m: "Ça me rend heureux que tu le sois. Garde cette lumière un peu pour toi aujourd'hui.", a: "Dis-toi une chose dont tu es fière, là, maintenant." },
  "fatiguée": { m: "Alors on ralentit. Tu n'as rien à prouver aujourd'hui.", a: "Bois un verre d'eau, respire trois fois, et offre-toi cinq minutes de rien." },
  "triste": { m: "Je suis là, même de loin. La tristesse a le droit d'exister, elle finit toujours par passer.", a: "Écris-moi ce qui pèse, ou pose ton téléphone et respire un peu." },
  "stressée": { m: "On défait le nœud, doucement. Une seule chose à la fois.", a: "Nomme la plus petite étape possible, et fais seulement celle-là." },
  "seule": { m: "Tu ne l'es pas. Je pense à toi à cet instant précis.", a: "Ouvre 'au cas où', l'enveloppe 'si je te manque' est écrite pour ce moment." },
  "nostalgique": { m: "Les souvenirs qui remontent sont la preuve qu'on a vécu de belles choses.", a: "Va relire notre histoire, ou regarde nos rêves à venir." },
  "inquiète": { m: "Respire. La plupart des choses qu'on redoute n'arrivent jamais.", a: "Écris ton inquiétude ici : la sortir de ta tête l'allège déjà." },
  "besoin de calme": { m: "D'accord. Le monde peut attendre.", a: "Active le mode douceur sur ta page, et ne fais rien d'autre un moment." },
  "besoin de rire": { m: "Alors viens, on va s'en occuper.", a: "Passe par nos jeux ou nos dramas, c'est fait exactement pour ça." },
  "besoin d'être rassurée": { m: "Tu es aimée, exactement comme tu es, exactement aujourd'hui.", a: "Écoute ma voix sur ta page, ou dis-moi ce qui te tracasse." },
  "besoin de parler": { m: "Je t'écoute. Vraiment, sans te presser.", a: "Écris-moi un mot juste en dessous, il arrive directement chez moi." },
  "besoin d'attention": { m: "Tu l'as, toute.", a: "Envoie-moi une demande d'appel ou de moment à deux, un peu plus bas." },
};

export default function Toi() {
  const [emo, setEmo] = useState(null);
  const [repState, setRepState] = useState("");

  const [energie, setEnergie] = useState(3);
  const [stress, setStress] = useState(2);
  const [mal, setMal] = useState(false);
  const [malZone, setMalZone] = useState("");
  const [malInt, setMalInt] = useState(2);
  const [malade, setMalade] = useState(false);
  const [besoin, setBesoin] = useState("");
  const [bienMsg, setBienMsg] = useState("");
  const [prevenir, setPrevenir] = useState(true);
  const [bienState, setBienState] = useState("");

  const [demType, setDemType] = useState("page");
  const [demTitre, setDemTitre] = useState("");
  const [demMsg, setDemMsg] = useState("");
  const [demPrio, setDemPrio] = useState("normal");
  const [demDate, setDemDate] = useState("");
  const [demState, setDemState] = useState("");

  const [ideeCat, setIdeeCat] = useState("page");
  const [ideeTxt, setIdeeTxt] = useState("");
  const [ideeRaison, setIdeeRaison] = useState("");
  const [ideeState, setIdeeState] = useState("");

  const prudence = (mal && malInt >= 4) || malade;

  const savoirEmo = async () => {
    if (!emo) return;
    setRepState("…");
    const { error } = await supabase.from("wellbeing_checkins").insert({ mood: emo, need_type: emo, wants_me_to_know: true });
    setRepState(error ? "Oups, réessaie." : "C'est noté, il le saura. 🤍");
  };
  const deposerBien = async () => {
    setBienState("…");
    const { error } = await supabase.from("wellbeing_checkins").insert({
      energy_level: +energie, stress_level: +stress, has_pain: mal,
      pain_location: mal ? (malZone.trim() || null) : null, pain_intensity: mal ? +malInt : null,
      is_sick: malade, message: bienMsg.trim() || null, need_type: besoin || null, wants_me_to_know: prevenir,
    });
    setBienState(error ? "Oups, réessaie." : "Ton point est déposé. Merci de me laisser entrer un peu. 🤍");
  };
  const envoyerDem = async () => {
    if (!demTitre.trim()) { setDemState("Ajoute au moins un petit titre."); return; }
    setDemState("…");
    const { error } = await supabase.from("site_requests").insert({ type: demType, title: demTitre.trim(), message: demMsg.trim() || null, priority: demPrio, desired_date: demDate || null });
    if (error) { setDemState("Oups, réessaie."); return; }
    setDemTitre(""); setDemMsg(""); setDemDate(""); setDemState("Reçu. Je m'en occupe, promis. 🤍");
  };
  const proposerIdee = async () => {
    if (!ideeTxt.trim()) { setIdeeState("Écris ton idée d'abord."); return; }
    setIdeeState("…");
    const { error } = await supabase.from("site_ideas").insert({ category: ideeCat, idea: ideeTxt.trim(), reason: ideeRaison.trim() || null });
    if (error) { setIdeeState("Oups, réessaie."); return; }
    setIdeeTxt(""); setIdeeRaison(""); setIdeeState("Belle idée. Je la garde précieusement. ✨");
  };

  const card = { background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 20, marginBottom: 26 };
  const field = { width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit", fontSize: "1rem" };
  const h2 = { fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.4rem", margin: "0 0 4px", color: "var(--titre)" };
  const desc = { color: "var(--texte-doux)", fontSize: ".94rem", margin: "0 0 16px" };
  const lab = { display: "block", fontWeight: 700, fontSize: ".82rem", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 };
  const btn = { fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "12px 22px", cursor: "pointer" };
  const state = { color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 34, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .4rem" }}>rien que pour toi</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Comment tu te sens ?</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "44ch", margin: "0 auto" }}>Un endroit à toi, sans jugement, sans effort. Dis ce que tu veux, ou juste ce qui est vrai là, maintenant. Ce que tu déposes ici n&apos;est lu que par moi.</p>
      </div>

      <div style={card}>
        <h2 style={h2}>Là, tout de suite</h2>
        <p style={desc}>Touche ce qui te ressemble le plus en ce moment.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
          {Object.keys(EMOS).map((k) => {
            const on = emo === k;
            return <button key={k} onClick={() => { setEmo(k); setRepState(""); }} style={{ fontWeight: 600, fontSize: ".95rem", borderRadius: 100, padding: ".6em 1.05em", cursor: "pointer", border: on ? "1px solid transparent" : "1px solid var(--bord)", background: on ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", color: on ? "#1a1430" : "var(--texte)" }}>{k}</button>;
          })}
        </div>
        {emo && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: "1.06rem", lineHeight: 1.7, color: "var(--texte)" }}>{EMOS[emo].m}</div>
            <div style={{ marginTop: 10, fontSize: ".96rem", color: "var(--texte-doux)" }}><b style={{ color: "var(--accent)", fontWeight: 700 }}>essaie :</b> {EMOS[emo].a}</div>
            <button onClick={savoirEmo} style={{ ...btn, marginTop: 14, fontSize: ".95rem" }}>je veux qu&apos;il le sache</button>
            <p style={state}>{repState}</p>
          </div>
        )}
      </div>

      <div style={card}>
        <h2 style={h2}>Un vrai point, si tu veux</h2>
        <p style={desc}>Ce n&apos;est pas médical, juste un moment pour toi. Rien n&apos;est obligatoire.</p>
        <div style={{ marginBottom: 14 }}>
          <label style={lab}>Ton énergie</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="range" min={1} max={5} value={energie} onChange={(e) => setEnergie(+e.target.value)} style={{ flex: 1, accentColor: "#A886DA" }} />
            <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--accent)", minWidth: "1.5em", textAlign: "center" }}>{energie}</span>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lab}>Ton niveau de stress</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input type="range" min={1} max={5} value={stress} onChange={(e) => setStress(+e.target.value)} style={{ flex: 1, accentColor: "#A886DA" }} />
            <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--accent)", minWidth: "1.5em", textAlign: "center" }}>{stress}</span>
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "var(--texte)" }}><input type="checkbox" checked={mal} onChange={(e) => setMal(e.target.checked)} style={{ width: 20, height: 20, accentColor: "#A886DA" }} /> J&apos;ai un petit mal quelque part</label>
          {mal && (
            <div style={{ marginTop: 10, paddingLeft: 14, borderLeft: "2px solid var(--bord)" }}>
              <div style={{ marginBottom: 14 }}><label style={lab}>Où ?</label><input value={malZone} onChange={(e) => setMalZone(e.target.value)} placeholder="tête, ventre, dos…" style={field} /></div>
              <div><label style={lab}>Intensité</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="range" min={1} max={5} value={malInt} onChange={(e) => setMalInt(+e.target.value)} style={{ flex: 1, accentColor: "#A886DA" }} />
                  <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--accent)", minWidth: "1.5em", textAlign: "center" }}>{malInt}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "var(--texte)" }}><input type="checkbox" checked={malade} onChange={(e) => setMalade(e.target.checked)} style={{ width: 20, height: 20, accentColor: "#A886DA" }} /> Je me sens malade</label>
        </div>
        {prudence && <div style={{ marginBottom: 14, background: "rgba(217,162,162,.12)", border: "1px solid rgba(217,162,162,.35)", borderRadius: 12, padding: "12px 14px", fontSize: ".92rem", color: "#d9a2a2" }}>Si la douleur est forte, inhabituelle ou inquiétante, préviens vite quelqu&apos;un de confiance ou un professionnel de santé. Prends soin de toi, pour de vrai.</div>}
        <div style={{ marginBottom: 14 }}>
          <label style={lab}>De quoi tu aurais besoin, là ?</label>
          <select value={besoin} onChange={(e) => setBesoin(e.target.value)} style={field}>
            <option value="">…</option>
            <option value="parler">parler</option>
            <option value="calme">du calme</option>
            <option value="rire">rire un peu</option>
            <option value="rassuree">être rassurée</option>
            <option value="attention">de l&apos;attention</option>
            <option value="rien">juste que tu saches</option>
          </select>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lab}>Un mot, si tu veux</label>
          <textarea value={bienMsg} onChange={(e) => setBienMsg(e.target.value)} placeholder="ce que tu veux, ou rien du tout…" style={{ ...field, minHeight: 70, resize: "vertical" }} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 14, color: "var(--texte)" }}><input type="checkbox" checked={prevenir} onChange={(e) => setPrevenir(e.target.checked)} style={{ width: 20, height: 20, accentColor: "#A886DA" }} /> Je veux qu&apos;il le sache</label>
        <button onClick={deposerBien} style={btn}>Déposer mon point</button>
        <p style={state}>{bienState}</p>
      </div>

      <div style={card}>
        <h2 style={h2}>Demande-moi quelque chose</h2>
        <p style={desc}>Une page, une photo, une musique, un appel, un moment à deux… tout ce que tu veux. Ça arrive directement chez moi.</p>
        <div style={{ marginBottom: 14 }}>
          <label style={lab}>Quoi</label>
          <select value={demType} onChange={(e) => setDemType(e.target.value)} style={field}>
            <option value="page">une nouvelle page</option>
            <option value="photo">ajouter une photo</option>
            <option value="musique">une musique</option>
            <option value="souvenir">un souvenir à garder</option>
            <option value="capsule">une capsule</option>
            <option value="appel">un appel</option>
            <option value="moment">un moment à deux</option>
            <option value="surprise">une surprise</option>
            <option value="note">juste te laisser une note</option>
            <option value="autre">autre chose</option>
          </select>
        </div>
        <div style={{ marginBottom: 14 }}><label style={lab}>En un titre</label><input value={demTitre} onChange={(e) => setDemTitre(e.target.value)} placeholder="ex : un appel ce soir" style={field} /></div>
        <div style={{ marginBottom: 14 }}><label style={lab}>Dis-m&apos;en plus</label><textarea value={demMsg} onChange={(e) => setDemMsg(e.target.value)} placeholder="explique comme tu veux…" style={{ ...field, minHeight: 70, resize: "vertical" }} /></div>
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}><label style={lab}>Priorité</label>
            <select value={demPrio} onChange={(e) => setDemPrio(e.target.value)} style={field}><option value="tranquille">tranquille</option><option value="normal">normale</option><option value="vite">j&apos;aimerais vite</option></select>
          </div>
          <div style={{ flex: 1 }}><label style={lab}>Pour quand ?</label><input type="date" value={demDate} onChange={(e) => setDemDate(e.target.value)} style={field} /></div>
        </div>
        <button onClick={envoyerDem} style={btn}>Envoyer ma demande</button>
        <p style={state}>{demState}</p>
      </div>

      <div style={card}>
        <h2 style={h2}>Une idée pour notre espace</h2>
        <p style={desc}>Ce site est aussi le tien. Si tu imagines quelque chose, dis-le.</p>
        <div style={{ marginBottom: 14 }}>
          <label style={lab}>Catégorie</label>
          <select value={ideeCat} onChange={(e) => setIdeeCat(e.target.value)} style={field}>
            <option value="page">une page</option>
            <option value="jeu">un jeu</option>
            <option value="surprise">une surprise</option>
            <option value="souvenir">un souvenir</option>
            <option value="animation">une animation</option>
            <option value="musique">une musique</option>
            <option value="voyage">un voyage</option>
            <option value="autre">autre</option>
          </select>
        </div>
        <div style={{ marginBottom: 14 }}><label style={lab}>Ton idée</label><textarea value={ideeTxt} onChange={(e) => setIdeeTxt(e.target.value)} placeholder="raconte…" style={{ ...field, minHeight: 70, resize: "vertical" }} /></div>
        <div style={{ marginBottom: 14 }}><label style={lab}>Pourquoi (optionnel)</label><input value={ideeRaison} onChange={(e) => setIdeeRaison(e.target.value)} placeholder="ce que ça t'apporterait" style={field} /></div>
        <button onClick={proposerIdee} style={btn}>Proposer l&apos;idée</button>
        <p style={state}>{ideeState}</p>
      </div>

      <p style={{ textAlign: "center", fontStyle: "italic", fontFamily: "var(--serif)", color: "var(--accent)", marginTop: 22 }}>quoi qu&apos;il se passe, tu es aimée. Ton Mathieu.</p>
    </main>
  );
}
