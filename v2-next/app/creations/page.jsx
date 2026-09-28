"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Creations() {
  const [rows, setRows] = useState(null);
  const [titre, setTitre] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState("");

  const charger = async () => {
    const { data } = await supabase.from("creations").select("titre,description,image,created_at").order("created_at", { ascending: false });
    setRows(data || []);
  };
  useEffect(() => { charger(); }, []);

  const ajouter = async () => {
    const t = titre.trim();
    if (!t) { setMsg("Donne un titre à ta création."); return; }
    setMsg("…");
    const { error } = await supabase.from("creations").insert({ titre: t, description: desc.trim() || null, image: img.trim() || null });
    if (error) { setMsg("Oups, réessaie."); return; }
    setTitre(""); setDesc(""); setImg(""); setMsg("Ajouté. J'adore déjà. 🤍");
    charger();
  };

  const field = { width: "100%", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit", fontSize: "1rem" };

  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <a className="retour" href="/surprise">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 28, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>ce qui te rend unique</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Ses créations</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "46ch", margin: "0 auto" }}>Ce que tu fais, ce que tu crées, ce que tu inventes. Un espace à toi, pour montrer ce dont tu es fière.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
        {rows === null && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Chargement…</p>}
        {rows !== null && rows.length === 0 && <p style={{ color: "var(--texte-doux)", fontStyle: "italic" }}>Rien encore. Ajoute ta première création, en dessous.</p>}
        {(rows || []).map((c, i) => (
          <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 16, overflow: "hidden" }}>
            {c.image
              ? <img src={c.image} alt={c.titre} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
              : <div style={{ width: "100%", aspectRatio: "4/3", background: "linear-gradient(135deg, rgba(203,180,236,.28), rgba(216,184,120,.18))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.4rem", color: "var(--accent)" }}>✦</div>}
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--titre)" }}>{c.titre || ""}</div>
              {c.description && <div style={{ fontSize: ".94rem", color: "var(--texte-doux)", marginTop: 4, lineHeight: 1.55 }}>{c.description}</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 16 }}>
        <input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Le titre de ta création" style={{ ...field, marginBottom: 10 }} />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Raconte-la…" style={{ ...field, marginBottom: 10, minHeight: 70, resize: "vertical" }} />
        <input value={img} onChange={(e) => setImg(e.target.value)} placeholder="Lien d'une image (optionnel)" style={{ ...field, marginBottom: 10 }} />
        <button onClick={ajouter} style={{ width: "100%", fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: 12, cursor: "pointer" }}>Ajouter ma création</button>
        <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 10, minHeight: "1em" }}>{msg}</p>
      </div>
    </main>
  );
}
