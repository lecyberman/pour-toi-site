"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const STATIC = "https://pour-toi-site.vercel.app";
const ARTISANS = [
  "fait main, pour toi, depuis 2020, aujourd'hui encore.",
  "chaque pixel de cette page a pensé à toi avant toi.",
  "site garanti sans intelligence artificielle dans les sentiments.",
  "construit un soir où tu me manquais.",
  "aucune étoile n'a été maltraitée pour cette page.",
  "relu douze fois. pensé à toi les douze fois.",
  "version " + (new Date().getFullYear() - 2019) + ".0 de nous. mises à jour illimitées.",
];

function SaVersion({ etape }) {
  const [existant, setExistant] = useState(undefined);
  const [txt, setTxt] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    (async () => { const { data } = await supabase.from("histoire_versions").select("texte").eq("etape", etape).order("created_at", { ascending: false }).limit(1); setExistant(data && data.length ? data[0].texte : null); })();
  }, [etape]);
  const confier = async () => { const t = txt.trim(); if (!t) return; setBusy(true); await supabase.from("histoire_versions").insert({ etape, auteur: "elle", texte: t }); setExistant(t); setBusy(false); };
  return (
    <div style={{ marginTop: 16, borderTop: "1px dashed var(--bord)", paddingTop: 14 }}>
      <div style={{ fontSize: ".8rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>Ta version à toi</div>
      {existant === undefined ? null : existant ? (
        <>
          <div style={{ background: "rgba(203,180,236,.12)", borderRadius: 12, padding: "12px 14px", fontSize: ".98rem", fontStyle: "italic", color: "var(--texte)" }}>« {existant} »</div>
          <p style={{ color: "var(--texte-doux)", fontSize: ".94rem", marginTop: 8 }}>Merci de l&apos;avoir écrit. Je le relis, tu sais.</p>
        </>
      ) : (
        <>
          <textarea value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Raconte ce moment avec tes mots à toi…" style={{ width: "100%", border: "1px solid var(--bord)", borderRadius: 12, padding: "12px 14px", fontFamily: "var(--sans)", fontSize: ".98rem", color: "var(--titre)", background: "var(--carte)", resize: "vertical", minHeight: 70, marginBottom: 8, lineHeight: 1.5 }} />
          <button onClick={confier} disabled={busy} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", border: "none", borderRadius: 100, padding: "11px 20px", cursor: "pointer", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", color: "#1a1430", opacity: busy ? .6 : 1 }}>{busy ? "Envoi…" : "Je te le confie"}</button>
        </>
      )}
    </div>
  );
}

function Voix({ src }) {
  const [joue, setJoue] = useState(false);
  const audioRef = useRef(null);
  const toggle = () => {
    if (joue && audioRef.current) { audioRef.current.pause(); setJoue(false); return; }
    const a = new Audio(src); audioRef.current = a; setJoue(true);
    a.play().catch(() => setJoue(false)); a.addEventListener("ended", () => setJoue(false));
  };
  return <button onClick={toggle} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: joue ? "#E4B266" : "var(--accent)", color: joue ? "#4A3714" : "#1a1430", border: "none", borderRadius: 100, padding: "9px 16px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".88rem", cursor: "pointer", marginTop: 10 }}>🔊 {src.includes("nuit") ? "écoute-moi te raconter notre nuit" : "écoute-moi te raconter ce jour"}</button>;
}

export default function Histoire() {
  const [premiers, setPremiers] = useState([]);
  const [pTitre, setPTitre] = useState("");
  const [pHist, setPHist] = useState("");
  const [artisan, setArtisan] = useState("");
  const jour = 86400000;
  const cLyon = Math.floor((Date.now() - new Date(2020, 0, 1).getTime()) / jour);
  const cNuit = Math.floor((Date.now() - new Date(2023, 6, 15).getTime()) / jour);

  const chargerPremiers = async () => { const { data } = await supabase.from("premiers").select("titre,histoire").order("created_at", { ascending: true }); setPremiers(data || []); };
  useEffect(() => { chargerPremiers(); setArtisan(ARTISANS[new Date().getDay()]); }, []);
  const ajouterPremier = async () => { const t = pTitre.trim(); if (!t) return; await supabase.from("premiers").insert({ titre: t, histoire: pHist.trim() || null, auteur: "elle" }); setPTitre(""); setPHist(""); chargerPremiers(); };

  const chap = { position: "relative", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "24px 24px 20px", margin: "0 0 26px", boxShadow: "0 18px 46px -32px rgba(0,0,0,.4)" };
  const quand = { fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontSize: "1.05rem", margin: "0 0 8px" };
  const h2 = { fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.45rem", margin: "0 0 12px", lineHeight: 1.2, color: "var(--titre)" };
  const soft = { color: "var(--texte-doux)", fontSize: ".94rem" };
  const lien = { color: "var(--accent)", fontWeight: 700, textDecoration: "none" };
  const champ = { width: "100%", border: "1px solid var(--bord)", borderRadius: 12, padding: "12px 14px", fontFamily: "var(--sans)", fontSize: ".96rem", background: "var(--carte)", color: "var(--titre)", marginBottom: 8 };

  return (
    <main className="wrap" style={{ maxWidth: 640 }}>
      <a className="retour" href="/">⌂ rentrer</a>
      <p style={{ fontWeight: 700, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 10px", textAlign: "center" }}>chapitre par chapitre</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(1.9rem,7vw,2.6rem)", textAlign: "center", margin: "0 0 8px", color: "var(--titre)" }}>Notre histoire</h1>
      <p style={{ textAlign: "center", color: "var(--texte-doux)", fontSize: "1rem", margin: "0 0 30px" }}>Elle continue de s&apos;écrire pendant que tu lis.</p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", margin: "0 0 40px" }}>
        {[[cLyon, "jours depuis Lyon"], [cNuit, "jours depuis notre nuit"], ["∞", "jours devant nous"]].map((c, i) => (
          <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "16px 22px", textAlign: "center", minWidth: 140 }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "1.9rem", color: "var(--accent)", fontWeight: 600, lineHeight: 1.1 }}>{c[0]}</div>
            <div style={{ fontSize: ".8rem", color: "var(--texte-doux)", marginTop: 4 }}>{c[1]}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", paddingLeft: 26 }}>
        <div style={{ position: "absolute", left: 8, top: 10, bottom: 10, width: 2, background: "rgba(168,134,218,.5)", borderRadius: 2 }} />

        <div style={chap}>
          <p style={quand}>il y a 7 ans</p>
          <h2 style={h2}>Un ajout sur Snap</h2>
          <p style={{ margin: "0 0 13px", fontSize: "1.02rem", color: "var(--texte)" }}>Tout commence par une notification. Une parmi des centaines ce jour-là, sauf que celle-là allait changer toute la suite. On s&apos;est mis à se parler, puis à se parler tous les jours, puis à ne plus savoir s&apos;arrêter. Les messages disparaissaient en dix secondes ; toi, tu es restée.</p>
          <p style={soft}>Le meilleur ajout de ma vie, et j&apos;ai pourtant ajouté beaucoup de monde.</p>
          <SaVersion etape="snap" />
        </div>

        <div style={chap}>
          <p style={quand}>1er janvier 2020 · Lyon</p>
          <h2 style={h2}>La première fois en vrai</h2>
          <p style={{ margin: "0 0 13px", fontSize: "1.02rem", color: "var(--texte)" }}>Premier jour de l&apos;année, première fois de nous. Le monde entier prenait des résolutions qu&apos;il allait abandonner en février ; moi j&apos;en ai pris une seule en te voyant arriver, et je la tiens encore. Il n&apos;y a pas eu d&apos;effet spécial, pas de musique de film. Juste une certitude, arrivée sans prévenir : c&apos;était toi.</p>
          <span style={{ display: "inline-block", background: "rgba(203,180,236,.14)", borderRadius: 100, padding: "6px 14px", fontSize: ".86rem", color: "var(--texte-doux)", marginTop: 4 }}>🎵 notre chanson de cette époque : à toi de me la rappeler</span><br />
          <Voix src="/souvenir-lyon.mp3" />
          <SaVersion etape="lyon" />
        </div>

        <div style={chap}>
          <p style={quand}>15 juillet 2023</p>
          <h2 style={h2}>La nuit où on s&apos;est tout dit</h2>
          <p style={{ margin: "0 0 13px", fontSize: "1.02rem", color: "var(--texte)" }}>La deuxième fois qu&apos;on se voyait. On a parlé. De nos sentiments, de nos peurs, de nos envies, de tout ce qu&apos;on gardait depuis des années. Le soleil s&apos;est levé et on parlait encore. Certaines nuits font plus avancer une vie que des années entières : celle-là est la nôtre.</p>
          <p style={soft}>C&apos;est cette nuit-là que « toi et moi » est devenu « nous ».</p>
          <p><a href={STATIC + "/nuit"} style={lien}>🌌 revivre cette nuit, minute par minute →</a></p>
          <Voix src="/souvenir-nuit.mp3" />
          <SaVersion etape="nuit" />
        </div>

        <div style={chap}>
          <p style={quand}>Monaco · Malte · Barcelone</p>
          <h2 style={h2}>Nos échappées</h2>
          <p style={{ margin: "0 0 13px", fontSize: "1.02rem", color: "var(--texte)" }}>Trois villes, trois ambiances, une constante : toi en face de moi. Monaco et ses billets qui t&apos;ont fait rêver tout haut (je note tout, tu sais). Malte et sa lumière. Barcelone et ses soirées qui ne voulaient pas finir. On a ramené mille souvenirs et zéro regret.</p>
          <p style={soft}>La liste des prochaines villes est ouverte. Elle est même déjà commencée.</p>
          <p><a href={STATIC + "/ocean"} style={lien}>🌊 lire la lettre de la mer →</a></p>
          <SaVersion etape="voyages" />
        </div>

        <div style={chap}>
          <p style={quand}>juillet 2026</p>
          <h2 style={h2}>Le plus beau chapitre</h2>
          <p style={{ margin: "0 0 13px", fontSize: "1.02rem", color: "var(--texte)" }}>Je n&apos;en dis pas plus ici. Tu sais. Nous savons.</p>
          <p style={soft}>💍</p>
        </div>

        <div style={chap}>
          <p style={quand}>aujourd&apos;hui</p>
          <h2 style={h2}>Et ça continue</h2>
          <p style={{ margin: "0 0 13px", fontSize: "1.02rem", color: "var(--texte)" }}>Cette page s&apos;allongera avec nous. De nouveaux chapitres viendront s&apos;écrire ici, les uns après les autres, et un jour on relira tout ça ensemble en se disant qu&apos;on ne savait encore rien de la suite. J&apos;ai hâte d&apos;avoir la suite.</p>
          <p><a href={STATIC + "/jardin"} style={lien}>🌸 visiter le jardin qui pousse tout seul →</a><br /><a href={STATIC + "/feu"} style={lien}>🔥 s&apos;asseoir autour de notre feu →</a></p>
        </div>
      </div>

      <div style={{ ...chap, marginTop: 34 }}>
        <p style={quand}>collection en cours</p>
        <h2 style={h2}>Les premiers de chaque chose</h2>
        <p style={soft}>Les « premières fois » sont l&apos;ADN d&apos;un couple. On les collectionne ici, et la liste n&apos;est jamais finie : ajoute les tiens.</p>
        <div style={{ marginTop: 14 }}>
          {premiers.map((p, i) => (
            <div key={i} style={{ background: "rgba(203,180,236,.1)", borderRadius: 13, padding: "13px 16px", marginBottom: 10 }}>
              <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontSize: "1.02rem", marginBottom: 3 }}>✦ {p.titre}</div>
              <div style={{ fontSize: ".95rem", color: "var(--texte)" }}>{p.histoire || ""}</div>
            </div>
          ))}
          <input value={pTitre} onChange={(e) => setPTitre(e.target.value)} placeholder="Un premier à ajouter (ex : Premier fou rire)" style={champ} />
          <textarea value={pHist} onChange={(e) => setPHist(e.target.value)} placeholder="Raconte-le en deux phrases…" style={{ ...champ, resize: "vertical", minHeight: 60, lineHeight: 1.5 }} />
          <button onClick={ajouterPremier} style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", border: "none", borderRadius: 100, padding: "11px 20px", cursor: "pointer", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", color: "#1a1430" }}>Ajouter à la collection</button>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: ".8rem", color: "var(--texte-doux)", opacity: .75, marginTop: 26, fontStyle: "italic" }}>{artisan}</p>
    </main>
  );
}
