"use client";
import { useRef, useState } from "react";

const STATIC = "https://pour-toi-site.vercel.app";
const DB_URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
const DB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";

const ENV = [
  { cle: "doute", quand: "Ouvre-moi si tu doutes de nous", txt: `Alors, écoute-moi bien.

Sept ans. On s'est trouvés sur une appli où tout disparaît, et on a construit la seule chose qui n'a pas disparu. Tu m'as dit toi-même que personne n'aurait parié sur nous, avec nos personnalités aux antipodes. C'est vrai. Et pourtant on est là, et chaque année on est plus solides que la précédente.

Le doute, c'est normal. C'est même bon signe : on ne doute que de ce qui compte. Mais ne doute jamais de ceci : je te choisis. Pas par défaut, pas par habitude. Je te choisis le matin, le soir, les bons jours et les mauvais. Je t'ai choisie le 1er janvier 2020 et je n'ai jamais changé d'avis une seule seconde depuis.

Maintenant respire, et viens me parler. Même à 3h du matin. Surtout à 3h du matin, c'est notre spécialité.` },
  { cle: "dispute", quand: "Ouvre-moi si on s'est disputés", txt: `Bon. On s'est disputés. Je ne sais pas pourquoi, moi non plus je ne m'en souviendrai probablement plus dans un mois.

Ce que je sais, c'est qu'en ce moment précis, pendant que tu lis ça, je suis probablement en train de tourner en rond en me repassant la conversation et en cherchant comment revenir vers toi sans perdre la face. Je suis prévisible, tu me connais.

Alors laisse-moi te dire ce que j'ai du mal à dire au milieu d'une dispute : même fâché, je t'aime. Même quand j'ai raison (rarement, d'après toi), je préfère nous à ma raison. Une dispute, c'est nous deux contre un problème. Ce n'est jamais toi contre moi.

Je viens m'excuser dans pas longtemps. Si c'est toi qui dois t'excuser, cette lettre te fournit une excellente occasion de faire le premier pas sans le dire. Je ne le saurai jamais. Enfin si, maintenant je le saurai. Viens quand même.` },
  { cle: "insomnie", quand: "Ouvre-moi si tu n'arrives pas à dormir", txt: `Encore réveillée ? Évidemment. Tu n'as jamais su te coucher, c'est une de tes signatures.

Alors puisque tu es là : pense à un truc doux. Pense à Malte, à la lumière sur l'eau. Pense à Barcelone, aux soirées qui ne finissaient pas. Pense au 15 juillet, à cette nuit où ne pas dormir était la meilleure décision de nos vies.

Les pensées qui tournent en rond à cette heure-ci mentent presque toujours. Elles sont plus grandes la nuit et minuscules le matin. Ne les crois pas. Crois plutôt ceci : quelqu'un t'aime, là, maintenant, pendant que tu lis. Il dort peut-être, mais même endormi, il t'aime. C'est un système très bien conçu, je le sais, c'est moi l'ingénieur.

Ferme le téléphone. Ferme les yeux. Je suis là demain. Comme tous les jours depuis sept ans.` },
  { cle: "manque", quand: "Ouvre-moi si je te manque", txt: `Toi aussi tu me manques. Là, maintenant, à l'instant où tu lis. Ce n'est pas de la magie, c'est des statistiques : tu me manques tellement souvent que cette phrase est vraie à peu près à n'importe quel moment.

Tu sais ce qui est fou ? On a passé des années à se manquer avant même de se rencontrer en vrai. On est diplômés en distance, toi et moi. Champions du monde. Et on a gagné à chaque fois : chaque manque s'est toujours terminé par des retrouvailles.

Celui-là aussi se terminera comme ça.

En attendant : envoie-moi un message, même juste un mot. Ou va sur la page de notre nuit et fais un vœu sur une étoile filante. Ou appuie trois fois sur le cœur de ta page, il y a un secret. Je sème des morceaux de moi partout sur ce site précisément pour les moments comme celui-là.` },
];

export default function AuCasOu() {
  const [ouvertes, setOuvertes] = useState({});
  const [voix, setVoix] = useState(false);
  const audioRef = useRef(null);

  const toggleVoix = () => {
    if (voix && audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; setVoix(false); audioRef.current = null; return; }
    const a = new Audio("/au-cas-ou.mp3"); audioRef.current = a; setVoix(true);
    a.play().catch(() => setVoix(false)); a.addEventListener("ended", () => setVoix(false));
  };
  const ouvrir = (cle) => {
    if (ouvertes[cle]) return;
    setOuvertes((o) => ({ ...o, [cle]: true }));
    fetch(DB_URL + "/rest/v1/dadoucherie_journal", { method: "POST", headers: { "Content-Type": "application/json", apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, Prefer: "return=minimal" }, body: JSON.stringify({ type: "urgence", periode: cle }) }).catch(() => {});
  };

  return (
    <main className="wrap" style={{ maxWidth: 520 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <p style={{ fontWeight: 700, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 10px", textAlign: "center" }}>à n&apos;ouvrir que si besoin</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(1.8rem,7vw,2.4rem)", textAlign: "center", margin: "0 0 10px", color: "var(--titre)" }}>Au cas où</h1>
      <p style={{ textAlign: "center", color: "var(--texte-doux)", fontSize: ".98rem", margin: "0 auto 24px", maxWidth: 440 }}>Quatre enveloppes, écrites à l&apos;avance, pour les moments où je ne suis pas là au bon moment. Tu n&apos;es pas obligée de les ouvrir. Elles ne périment jamais. Elles se rechargent à volonté.</p>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <button onClick={toggleVoix} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: voix ? "#E4B266" : "var(--accent)", color: voix ? "#4A3714" : "#1a1430", border: "none", borderRadius: 100, padding: "11px 20px", fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", cursor: "pointer" }}>🔊 avant de lire, écoute ma voix</button>
      </div>

      {ENV.map((e) => {
        const on = ouvertes[e.cle];
        return (
          <div key={e.cle} onClick={() => ouvrir(e.cle)} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 18, padding: "20px 22px", marginBottom: 16, cursor: on ? "default" : "pointer" }}>
            <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.12rem", color: "var(--accent)" }}>{e.quand}</div>
            <div style={{ fontSize: ".86rem", color: "var(--texte-doux)", marginTop: 4 }}>{on ? "ouverte · elle reste à toi pour toujours" : "enveloppe scellée · toucher pour ouvrir"}</div>
            {on && <div style={{ marginTop: 16, borderTop: "1px dashed var(--bord)", paddingTop: 16, fontSize: "1.02rem", whiteSpace: "pre-line", color: "var(--texte)", lineHeight: 1.65 }}>{e.txt}</div>}
          </div>
        );
      })}

      <p style={{ textAlign: "center", fontSize: ".88rem", color: "var(--texte-doux)", marginTop: 26 }}>Ces lettres ne s&apos;usent pas. Tu peux les rouvrir dans un an, dans dix ans : elles seront toujours vraies.</p>
    </main>
  );
}
