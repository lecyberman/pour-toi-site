"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

// Elle appuie quand il lui manque : ça notifie Mathieu (via calins + cron
// envoyer-signal), et elle reçoit aussitôt un mot tendre de sa part.
const REPONSES = [
  "Toi aussi tu me manques. Là, tout de suite, j'ai pensé à toi.",
  "Ferme les yeux : je te serre fort. Tu le sens ?",
  "La distance, c'est juste des kilomètres. Mon cœur, lui, est déjà chez toi.",
  "Je suis là. Toujours. Même quand l'écran est éteint.",
  "Respire. Je pense à toi plus souvent que tu ne l'imagines.",
  "Bientôt, plus d'écran entre nous. En attendant, je te tiens la main de loin.",
  "Tu viens d'illuminer ma journée sans le savoir. Merci d'être toi.",
  "Où que tu sois, tu es ma maison. Je t'aime.",
];

export default function TuMeManques() {
  const [etat, setEtat] = useState("pret"); // pret | envoi | envoye
  const [reponse, setReponse] = useState("");

  const envoyer = async () => {
    if (etat === "envoi") return;
    setEtat("envoi");
    let role = "elle"; try { const r = localStorage.getItem("moi_role"); if (r === "elle" || r === "lui") role = r; } catch (e) {}
    try { await supabase.from("calins").insert({ de_role: role, type: "manque", texte: "Tu me manques 🤍", envoye: false, lu: false }); } catch (e) {}
    setReponse(REPONSES[Math.floor(Math.random() * REPONSES.length)]);
    setEtat("envoye");
    try { if (navigator.vibrate) navigator.vibrate([15, 40, 15]); } catch (e) {}
  };

  return (
    <main className="wrap" style={{ maxWidth: 520, minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", paddingTop: 40, paddingBottom: 60 }}>
      <a className="retour" href="/dadoucherie">⌂ rentrer</a>
      <p className="eyebrow" style={{ margin: "0 0 .3rem" }}>quand la distance pèse</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "clamp(2rem,7vw,2.7rem)", margin: "0 0 10px" }}>Tu me manques</h1>

      {etat !== "envoye" ? (
        <>
          <p style={{ color: "var(--texte-doux)", maxWidth: "34ch", margin: "0 auto 26px", lineHeight: 1.7 }}>Appuie sur le cœur. Il le saura tout de suite, où qu&apos;il soit, et il te répondra.</p>
          <div>
            <button onClick={envoyer} disabled={etat === "envoi"} aria-label="Lui dire qu'il me manque"
              style={{ width: 150, height: 150, borderRadius: "50%", border: "none", cursor: "pointer", fontSize: "3.4rem", color: "#fff", background: "radial-gradient(circle at 40% 35%, #CBB4EC, #A886DA 55%, #8E6FBF)", boxShadow: "0 18px 40px -16px rgba(142,111,191,.9)", transition: "transform .2s ease", transform: etat === "envoi" ? "scale(.94)" : "scale(1)" }}>
              🤍
            </button>
          </div>
          <p style={{ color: "var(--texte-doux)", fontSize: ".9rem", marginTop: 18 }}>{etat === "envoi" ? "je le préviens…" : "un seul appui suffit"}</p>
        </>
      ) : (
        <>
          <div style={{ fontSize: "3rem", marginBottom: 8 }}>🤍</div>
          <div style={{ background: "linear-gradient(180deg, rgba(142,111,191,.16), rgba(142,111,191,.05))", border: "1px solid rgba(199,178,230,.4)", borderRadius: 20, padding: "24px 22px", margin: "0 auto", maxWidth: 420 }}>
            <p style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", lineHeight: 1.6, color: "var(--titre)", margin: 0 }}>{reponse}</p>
            <p style={{ marginTop: 14, fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)" }}>Ton Mathieu</p>
          </div>
          <p style={{ color: "var(--texte-doux)", fontSize: ".9rem", marginTop: 18 }}>Il vient de recevoir ta pensée sur son téléphone. 🤍</p>
          <div style={{ marginTop: 20 }}>
            <button onClick={() => { setEtat("pret"); setReponse(""); }} style={{ background: "none", border: "1px solid var(--bord)", borderRadius: 100, padding: "10px 20px", color: "var(--texte)", cursor: "pointer", font: "inherit", fontWeight: 700 }}>encore une fois</button>
          </div>
        </>
      )}
    </main>
  );
}
