"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const HUMEURS = [
  { e: "😊", l: "heureuse", m: "Ça illumine ma soirée de te savoir bien. Garde ce sourire.", bg: "#FBF4E4" },
  { e: "😌", l: "apaisée", m: "Le calme te va bien. Profite de ce moment, il est à toi.", bg: "#EDF2E7" },
  { e: "🥰", l: "amoureuse", m: "Deux à deux, alors. Moi aussi, à cet instant précis.", bg: "#FBECEF" },
  { e: "😴", l: "fatiguée", m: "Alors on ralentit. Tu as le droit de ne rien faire ce soir.", bg: "#ECEAF3" },
  { e: "😔", l: "triste", m: "Je suis là, même de loin. Ça passera, et je reste en attendant.", bg: "#E8EAF2" },
  { e: "😰", l: "stressée", m: "Respire. Une seule chose à la fois, et je porte le reste avec toi.", bg: "#EFE7F0" },
  { e: "🥺", l: "sensible", m: "Ta sensibilité n'est pas une faiblesse, c'est une de tes plus belles choses.", bg: "#FBEFEA" },
  { e: "🌙", l: "nostalgique", m: "Les souvenirs qui remontent sont la preuve qu'on a vécu de beaux moments.", bg: "#E9EAF5" },
  { e: "😄", l: "taquine", m: "Oh, ce soir tu cherches les ennuis. J'adore ça.", bg: "#FBF3E0" },
  { e: "🤗", l: "câline", m: "Note prise. Dès que je te vois, tu sais ce qui t'attend.", bg: "#FBEBE7" },
];

function dateFr(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  } catch (e) { return ""; }
}

export default function Humeurs() {
  const [reponse, setReponse] = useState("");
  const [recent, setRecent] = useState([]);

  const charger = async () => {
    const { data } = await supabase.from("humeurs").select("emoji,label,created_at").order("created_at", { ascending: false }).limit(8);
    setRecent(data || []);
  };

  useEffect(() => { charger(); }, []);

  const choisir = async (h) => {
    setReponse(h.m);
    await supabase.from("humeurs").insert({ emoji: h.e, label: h.l });
    charger();
  };

  return (
    <main className="wrap" style={{ maxWidth: 580 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>pas besoin de mots</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Ce soir, je me sens…</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "42ch", margin: "0 auto" }}>Touche juste celle qui te ressemble ce soir. Je la garde, et je te réponds.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 10 }}>
        {HUMEURS.map((h) => (
          <button key={h.l} onClick={() => choisir(h)} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, padding: "16px 10px", textAlign: "center", cursor: "pointer", color: "var(--texte)" }}>
            <div style={{ fontSize: "1.8rem" }}>{h.e}</div>
            <div style={{ fontSize: ".85rem", fontWeight: 600, marginTop: 4, color: "var(--titre)" }}>{h.l}</div>
          </button>
        ))}
      </div>

      {reponse && (
        <div style={{ marginTop: 20, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 18 }}>
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.25rem", color: "var(--accent)", textAlign: "center", lineHeight: 1.5 }}>{reponse}</div>
        </div>
      )}

      {recent.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.25rem", marginBottom: 12, color: "var(--titre)" }}>Tes dernières humeurs</h2>
          {recent.map((h, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--bord)" }}>
              <span style={{ fontSize: "1.3rem" }}>{h.emoji || "✦"}</span>
              <span style={{ flex: 1, color: "var(--texte)" }}>{h.label || ""}</span>
              <span style={{ fontSize: ".8rem", color: "var(--texte-doux)" }}>{dateFr(h.created_at)}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
