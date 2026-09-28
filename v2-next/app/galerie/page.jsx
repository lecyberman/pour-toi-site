"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

function compresser(file, cb) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 1100; let w = img.width, h = img.height;
      if (w > h && w > max) { h = Math.round(h * max / w); w = max; }
      else if (h >= w && h > max) { w = Math.round(w * max / h); h = max; }
      const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      try { cb(cv.toDataURL("image/jpeg", 0.82)); } catch (e) { cb(reader.result); }
    };
    img.onerror = () => cb(reader.result);
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

const PLACEHOLDERS = [["🌙", "Le premier soir"], ["✨", "La première fois qu'on a ri"], ["🌊", "Malte, la lumière"], ["🎆", "Barcelone, la nuit"], ["🕯️", "Un dimanche sans rien"], ["💫", "Notre nuit"]];

export default function Galerie() {
  const [items, setItems] = useState(null);
  const [placeholders, setPlaceholders] = useState(false);
  const [plein, setPlein] = useState(null);
  const [dataURL, setDataURL] = useState(null);
  const [leg, setLeg] = useState("");
  const [etat, setEtat] = useState("");
  const fileRef = useRef(null);

  const charger = async () => {
    const [p, g] = await Promise.all([
      supabase.from("photos").select("image,legende,date,emoji").order("created_at", { ascending: false }),
      supabase.from("galerie").select("image,titre,texte,emoji").order("created_at", { ascending: false }),
    ]);
    const arr = [];
    (p.data || []).forEach((x) => arr.push({ image: x.image, leg: x.legende, dt: x.date, emoji: x.emoji }));
    (g.data || []).forEach((x) => arr.push({ image: x.image, leg: x.titre, dt: "", emoji: x.emoji, texte: x.texte }));
    if (!arr.length) { setPlaceholders(true); setItems(PLACEHOLDERS.map((p) => ({ image: null, leg: p[1], emoji: p[0] }))); }
    else { setPlaceholders(false); setItems(arr); }
  };
  useEffect(() => { charger(); }, []);

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    setEtat("Préparation de la photo…");
    compresser(f, (url) => { setDataURL(url); setEtat(""); });
  };
  const garder = async () => {
    if (!dataURL) return;
    setEtat("…");
    const dateStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const { error } = await supabase.from("photos").insert({ image: dataURL, legende: leg.trim() || null, date: dateStr });
    if (error) { setEtat("Un souci est survenu. Réessaie."); return; }
    setDataURL(null); setLeg(""); setEtat(""); if (fileRef.current) fileRef.current.value = ""; charger();
  };

  return (
    <main className="wrap" style={{ maxWidth: 940 }}>
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 22, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>des instants précieux</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.6rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Notre galerie</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "46ch", margin: "0 auto" }}>Chaque photo est un souvenir gardé, pas une image jetée sur une page. Ajoute les tiennes, touche-en une pour la voir en grand.</p>
      </div>

      <div style={{ textAlign: "center", margin: "0 0 26px" }}>
        <button onClick={() => fileRef.current && fileRef.current.click()} style={{ display: "inline-flex", alignItems: "center", gap: ".5em", fontFamily: "var(--sans)", fontWeight: 700, fontSize: "1rem", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "13px 24px", cursor: "pointer" }}>📷 Ajouter une photo</button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        {dataURL && (
          <div style={{ maxWidth: 360, margin: "16px auto 0", background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: 14 }}>
            <img src={dataURL} alt="Aperçu" style={{ width: "100%", borderRadius: 10, display: "block", aspectRatio: "4/5", objectFit: "cover" }} />
            <input value={leg} onChange={(e) => setLeg(e.target.value)} placeholder="Une légende, un mot… (facultatif)" maxLength={120} style={{ width: "100%", marginTop: 12, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 12, color: "var(--titre)", padding: "11px 12px", fontFamily: "inherit" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={garder} style={{ flex: 2, fontFamily: "var(--sans)", fontWeight: 700, color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: 10, cursor: "pointer" }}>Garder ce souvenir</button>
              <button onClick={() => { setDataURL(null); setLeg(""); if (fileRef.current) fileRef.current.value = ""; }} style={{ flex: 1, background: "transparent", color: "var(--texte-doux)", border: "1px solid var(--bord)", borderRadius: 100, padding: 10, cursor: "pointer", fontFamily: "var(--sans)", fontWeight: 600 }}>Annuler</button>
            </div>
            <p style={{ color: "#8ee6a0", fontSize: ".82rem", marginTop: 8, minHeight: "1em" }}>{etat}</p>
          </div>
        )}
      </div>

      <div style={{ columns: "3 220px", columnGap: 16 }}>
        {(items || []).map((it, i) => (
          <div key={i} onClick={() => setPlein(it)} style={{ breakInside: "avoid", margin: "0 0 16px", background: "#fff", padding: "10px 10px 14px", borderRadius: 6, boxShadow: "0 14px 34px -24px rgba(0,0,0,.5)", cursor: "pointer", transform: "rotate(" + (((i % 3) - 1) * 1.4) + "deg)" }}>
            {it.image
              ? <img src={it.image} alt={it.leg || "souvenir"} loading="lazy" style={{ width: "100%", borderRadius: 3, display: "block", aspectRatio: "4/5", objectFit: "cover" }} />
              : <div style={{ width: "100%", borderRadius: 3, aspectRatio: "4/5", background: "linear-gradient(135deg,#EFE3EC,#F6DED8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.4rem", color: "#C9A9C0" }}>{it.emoji || "✦"}</div>}
            {it.leg && <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: ".95rem", color: "#46394F", textAlign: "center", marginTop: 10, padding: "0 4px" }}>{it.leg}</div>}
            {it.dt && <div style={{ fontSize: ".74rem", color: "#7A6E82", textAlign: "center", marginTop: 3 }}>{it.dt}</div>}
          </div>
        ))}
      </div>

      {placeholders && <p style={{ textAlign: "center", fontSize: ".9rem", color: "var(--texte-doux)", marginTop: 26 }}>Aucune vraie photo pour l&apos;instant. Ajoute la première avec le bouton 📷 juste au-dessus.</p>}

      {plein && (
        <div onClick={() => setPlein(null)} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(16,14,28,.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <button onClick={() => setPlein(null)} aria-label="Fermer" style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "#fff", fontSize: "1.6rem", cursor: "pointer" }}>✕</button>
          {plein.image
            ? <img src={plein.image} alt={plein.leg || ""} style={{ maxWidth: "min(92vw,700px)", maxHeight: "78vh", borderRadius: 8 }} />
            : <div style={{ width: "min(80vw,420px)", aspectRatio: "4/5", background: "linear-gradient(135deg,#3A3150,#5A4A55)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", color: "#B79FB0" }}>{plein.emoji || "✦"}</div>}
          {(plein.texte || plein.leg) && <div style={{ position: "absolute", bottom: "6vh", left: 0, right: 0, textAlign: "center", color: "#F3EEF6", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.2rem", padding: "0 20px" }}>{plein.texte || plein.leg}</div>}
        </div>
      )}
    </main>
  );
}
