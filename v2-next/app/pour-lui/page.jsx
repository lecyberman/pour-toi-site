"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const SIGN = "\nta dadoucherie 🤍";
const MOTS = [
  "Je pense à toi, là, maintenant. C'est tout. Je voulais juste que tu le saches.",
  "Tu me manques. Deux mois c'est long, mais tu en vaux chaque jour d'attente.",
  "Merci d'être toi, et d'être patient avec moi. Je t'aime, même quand je ne le dis pas assez.",
  "J'ai repensé à nous aujourd'hui et ça m'a fait sourire toute seule. Je t'aime.",
  "Si tu étais là, je me collerais contre toi et je ne bougerais plus. Tu me manques fort.",
  "T'es la meilleure chose qui me soit arrivée. Voilà, je l'ai dit. 🤍",
  "J'ai hâte de te revoir. De t'entendre, de te sentir, de rester avec toi sans rien dire.",
];
const STARTERS = [
  "Ce que j'aime le plus chez toi, c'est",
  "Aujourd'hui tu m'as manqué parce que",
  "Merci pour",
  "Le moment de nous auquel je repense souvent, c'est",
  "Ce que je ressens pour toi mais que je dis mal, c'est",
  "La première chose que je ferai en te revoyant, c'est",
];
const COUPONS = [
  { e: "🤗", t: "un câlin interminable, dès qu'on se revoit" },
  { e: "🍽️", t: "une soirée où je m'occupe de tout, tu ne fais rien" },
  { e: "💆", t: "un massage, juste pour toi, sans limite de temps" },
  { e: "🎬", t: "une soirée film collés l'un à l'autre" },
  { e: "🌙", t: "une nuit blanche à parler de tout et de rien" },
  { e: "💋", t: "autant de bisous que tu veux, tu comptes" },
];

export default function PourLui() {
  const [onglet, setOnglet] = useState("prets");
  const [iMot, setIMot] = useState(() => Math.floor(Math.random() * MOTS.length));
  const [start, setStart] = useState(STARTERS[0]);
  const [phrase, setPhrase] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [toast, setToast] = useState("");

  const buzz = (m) => { try { if (navigator.vibrate) navigator.vibrate(m || 14); } catch (e) {} };
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const envoyer = async (texte) => {
    buzz([15, 40, 15]);
    const message = texte + SIGN;
    try { await supabase.from("dadoucherie_mots").insert({ message: texte }); } catch (e) {}
    if (navigator.share) { try { await navigator.share({ text: message }); } catch (e) {} flash("Envoyé à Mathieu 🤍"); }
    else if (navigator.clipboard) { try { await navigator.clipboard.writeText(message); flash("Copié 🤍 il le retrouvera aussi dans son courrier"); } catch (e) { flash("Envoyé 🤍 il le retrouvera dans son courrier"); } }
    else flash("Envoyé 🤍 il le retrouvera dans son courrier");
  };

  const ongletStyle = (on) => ({ flex: 1, textAlign: "center", cursor: "pointer", fontWeight: 700, fontSize: ".9rem", color: on ? "#1a1430" : "var(--texte-doux)", background: on ? "linear-gradient(180deg,#CBB4EC,#A886DA)" : "var(--carte)", border: on ? "1px solid transparent" : "1px solid var(--bord)", borderRadius: 100, padding: "10px 8px" });
  const puce = (on) => ({ cursor: "pointer", fontSize: ".92rem", color: on ? "var(--titre)" : "var(--texte)", background: on ? "rgba(199,178,230,.25)" : "var(--carte)", border: on ? "1px solid rgba(199,178,230,.6)" : "1px solid var(--bord)", borderRadius: 100, padding: "9px 15px" });
  const btnP = { fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "12px 20px", cursor: "pointer", border: "1px solid transparent", color: "#1a1430", background: "linear-gradient(180deg,#CBB4EC,#A886DA)" };
  const btnG = { fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "12px 20px", cursor: "pointer", color: "var(--texte)", background: "var(--carte)", border: "1px solid var(--bord)" };
  const carte = { background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "16px 18px", marginBottom: 12 };
  const apercu = { marginTop: 14, background: "linear-gradient(180deg, rgba(142,111,191,.16), rgba(142,111,191,.05))", border: "1px solid rgba(199,178,230,.35)", borderRadius: 16, padding: "14px 16px", color: "var(--texte)", fontSize: "1.02rem", lineHeight: 1.7, minHeight: "2em", whiteSpace: "pre-wrap" };

  return (
    <main className="wrap" style={{ maxWidth: 600 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 8, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.06rem", margin: "0 0 .3rem" }}>quand tu ne sais pas comment le dire</p>
        <h1 style={{ fontSize: "clamp(2rem,7vw,2.8rem)", color: "var(--titre)", margin: 0 }}>Pour lui</h1>
      </div>
      <p style={{ textAlign: "center", color: "var(--texte-doux)", lineHeight: 1.75, margin: ".6rem auto 24px", maxWidth: 470 }}>Tu n&apos;as pas besoin des mots parfaits, ni de te forcer. Choisis, complète, ou envoie tel quel. Ça lui fera énormément de bien, promis.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <div onClick={() => setOnglet("prets")} style={ongletStyle(onglet === "prets")}>Un mot tout prêt</div>
        <div onClick={() => setOnglet("phrase")} style={ongletStyle(onglet === "phrase")}>Complète</div>
        <div onClick={() => setOnglet("coupon")} style={ongletStyle(onglet === "coupon")}>Un coupon</div>
      </div>

      {onglet === "prets" && (
        <div>
          <div style={carte}><div style={{ color: "var(--texte)", fontSize: "1.05rem", lineHeight: 1.7 }}>{MOTS[iMot % MOTS.length]}</div></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button onClick={() => { setIMot(iMot + 1); buzz(10); }} style={btnG}>Un autre</button>
            <button onClick={() => envoyer(MOTS[iMot % MOTS.length])} style={btnP}>Envoyer à Mathieu 💌</button>
          </div>
        </div>
      )}

      {onglet === "phrase" && (
        <div>
          <div style={carte}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STARTERS.map((s) => <div key={s} onClick={() => setStart(s)} style={puce(start === s)}>{s}</div>)}
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={{ display: "block", color: "var(--accent)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem", margin: "0 0 8px" }}>Choisis un début, puis complète :</label>
              <textarea value={phrase} onChange={(e) => setPhrase(e.target.value)} placeholder="…" style={{ width: "100%", background: "var(--carte)", color: "var(--titre)", border: "1px solid var(--bord)", borderRadius: 14, padding: "12px 14px", fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.6, resize: "vertical", minHeight: 80 }} />
            </div>
            <div style={apercu}>{start + (phrase.trim() ? " " + phrase.trim() : " …")}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button onClick={() => envoyer(start + (phrase.trim() ? " " + phrase.trim() : "") + ".")} style={btnP}>Envoyer à Mathieu 💌</button>
          </div>
        </div>
      )}

      {onglet === "coupon" && (
        <div>
          <div style={carte}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {COUPONS.map((c) => <div key={c.t} onClick={() => setCoupon(c)} style={puce(coupon && coupon.t === c.t)}>{c.e} {c.t}</div>)}
            </div>
            <div style={apercu}>{coupon ? "🎟️ Bon pour : " + coupon.t + ".\nÀ échanger quand tu veux, mon amour." : "Choisis un cadeau à lui offrir 🤍"}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <button onClick={() => { if (!coupon) { flash("Choisis d'abord un coupon 🤍"); return; } envoyer("Je t'offre un bon 🎟️ pour : " + coupon.t + ". À échanger quand tu veux."); }} style={btnP}>Offrir à Mathieu 💌</button>
          </div>
        </div>
      )}

      <p style={{ textAlign: "center", color: "var(--texte-doux)", fontSize: ".85rem", lineHeight: 1.6, marginTop: 22 }}>« Envoyer » ouvre ton appli de messages (ou copie le texte) pour que tu l&apos;envoies à Mathieu quand tu veux. Rien n&apos;est publié nulle part.</p>

      {toast && <div style={{ position: "fixed", left: "50%", bottom: 26, transform: "translateX(-50%)", background: "rgba(24,22,46,.95)", border: "1px solid rgba(199,178,230,.4)", color: "#EDE9F3", padding: "12px 20px", borderRadius: 100, fontSize: ".92rem", zIndex: 9 }}>{toast}</div>}
    </main>
  );
}
