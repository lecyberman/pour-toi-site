"use client";
import { useEffect, useState } from "react";

// Une raison par jour. Repli 100% local (aucune base) : la raison du jour
// dépend de la date, et elle peut relire toutes les précédentes.
const DEBUT = new Date(2026, 8, 1); // 1er septembre 2026 : quelques raisons déjà là au premier passage

const RAISONS = [
  "Parce que ton rire, celui que tu essaies de cacher derrière ta main, est mon son préféré au monde.",
  "Parce que tu me racontes tes journées dans le désordre et que j'adore reconstituer l'histoire.",
  "Parce que tu me choisis, encore, même les jours où je ne suis pas facile.",
  "Parce que tu as une façon de dire mon prénom qui n'appartient qu'à toi.",
  "Parce qu'avec toi, même une soirée sans rien faire devient un souvenir.",
  "Parce que tu es tendre même quand tu es fatiguée, et ça, c'est rare.",
  "Parce que tu me comprends d'un seul regard, à des kilomètres de distance.",
  "Parce que tu prends soin des gens sans jamais le réclamer en retour.",
  "Parce que tu es la première personne à qui je veux tout raconter.",
  "Parce que ton sourire le matin vaut tous les cafés du monde.",
  "Parce que tu me rends meilleur sans même essayer.",
  "Parce que tu gardes tout : les tickets, les photos, les petits riens. Comme moi.",
  "Parce que tu t'inquiètes pour moi, et que ça me touche à chaque fois.",
  "Parce que tu es belle quand tu ne te trouves pas belle, surtout à ce moment-là.",
  "Parce que tu chantes faux avec une confiance que j'admire sincèrement.",
  "Parce que tu me fais rire quand je m'y attends le moins.",
  "Parce que ta main dans la mienne, c'est mon endroit préféré.",
  "Parce que tu as ce cœur immense que tu crois savoir mal montrer, alors que je le vois tout le temps.",
  "Parce que tu es curieuse de tout, et que le monde est plus grand avec toi.",
  "Parce que tu me pardonnes mes maladresses, et j'en ai.",
  "Parce que tu es courageuse bien plus que tu ne le penses.",
  "Parce que la distance ne t'a jamais fait lâcher ma main.",
  "Parce que tu me manques même quand on vient de se parler.",
  "Parce que tu as gardé cette âme d'enfant que rien n'a abîmée.",
  "Parce que tu es la maison vers laquelle je reviens, où que je sois.",
  "Parce que tu dis « je t'aime » avec les yeux avant de le dire avec les mots.",
  "Parce que tu me connais mieux que moi-même, et tu restes quand même.",
  "Parce que tu transformes mes mauvais jours en jours supportables.",
  "Parce que tu es fière de moi, et que ça me donne envie de mériter ce regard.",
  "Parce que tu ranges mal mais que tu aimes fort, et je prends le tout.",
  "Parce que tu as cette patience avec moi que je n'aurais pas toujours avec moi-même.",
  "Parce que tu me trouves des surnoms ridicules que j'adore en secret.",
  "Parce que tu es la preuve que la plus belle histoire peut commencer par un simple ajout.",
  "Parce que tu me donnes envie de construire, pas juste de rêver.",
  "Parce que ta bonne humeur est contagieuse, même par écran.",
  "Parce que tu es exactement toi, et que c'est ça que j'ai choisi.",
  "Parce que tu me fais confiance, et que je ne veux jamais décevoir cette confiance.",
  "Parce que tu es douce avec le monde alors que le monde n'est pas toujours doux avec toi.",
  "Parce que sept ans plus tard, je te regarde encore comme au premier jour.",
  "Parce que tu es mon plus beau hasard devenu ma plus sûre évidence.",
  "Parce que tu tiens à nous autant que moi, et que ça se sent.",
  "Parce que même tes défauts, je les aime, ils font partie de toi.",
  "Parce que tu es la personne avec qui je veux vieillir, sans hésiter une seconde.",
  "Parce que quand tu es heureuse, tout le reste me semble simple.",
  "Parce qu'il n'y a pas assez de jours dans une vie pour toutes les raisons, mais on va essayer.",
];

export default function Raisons() {
  const [jour, setJour] = useState(0);

  useEffect(() => {
    const auj = new Date(); const d0 = new Date(auj.getFullYear(), auj.getMonth(), auj.getDate());
    const idx = Math.floor((d0 - DEBUT) / 86400000);
    setJour(Math.max(0, idx));
  }, []);

  const total = RAISONS.length;
  const dernierIndex = Math.min(jour, total - 1); // n° de la raison du jour (bornée à la liste)
  const boucle = jour >= total; // liste terminée : on reboucle en douceur
  const idxDuJour = boucle ? (jour % total) : dernierIndex;
  // Collection : toutes celles déjà dévoilées jusqu'à aujourd'hui.
  const revele = [];
  for (let i = 0; i <= Math.min(jour, total - 1); i++) revele.push(i);
  const passees = revele.filter((i) => i !== idxDuJour).reverse();

  return (
    <main className="wrap" style={{ maxWidth: 620, paddingTop: 40, paddingBottom: 60 }}>
      <a className="retour" href="/dadoucherie">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p className="eyebrow" style={{ margin: "0 0 .3rem" }}>chaque jour, une de plus</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, color: "var(--titre)", fontSize: "clamp(2rem,7vw,2.6rem)", margin: 0 }}>Pourquoi je t&apos;aime</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "40ch", margin: "10px auto 0" }}>Une nouvelle raison t&apos;attend chaque jour. Celles d&apos;avant restent là, tu peux les relire quand tu veux.</p>
      </div>

      <div style={{ background: "linear-gradient(180deg, rgba(142,111,191,.16), rgba(142,111,191,.05))", border: "1px solid rgba(199,178,230,.4)", borderRadius: 22, padding: "30px 26px", textAlign: "center", marginBottom: 26 }}>
        <div style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".12em", color: "var(--accent)", marginBottom: 12 }}>raison n° {idxDuJour + 1}{boucle ? " (et on recommence, la liste ne s'arrête jamais)" : ""}</div>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", lineHeight: 1.6, color: "var(--titre)", margin: 0 }}>{RAISONS[idxDuJour]}</p>
        <p style={{ marginTop: 16, fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)" }}>Ton Mathieu</p>
      </div>

      {passees.length > 0 && (
        <>
          <p style={{ textAlign: "center", color: "var(--texte-doux)", fontSize: ".9rem", margin: "0 0 12px" }}>Celles des jours d&apos;avant</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {passees.map((i) => (
              <div key={i} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 14, padding: "14px 16px" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: ".8rem", marginRight: 8 }}>n° {i + 1}</span>
                <span style={{ color: "var(--texte)", lineHeight: 1.6 }}>{RAISONS[i]}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
