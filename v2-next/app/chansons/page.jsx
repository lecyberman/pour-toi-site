"use client";

const CHANSONS = [
  { t: "It's Not So Bad", a: "Dybbukk", id: 2141888007 },
  { t: "500% Gouyad", a: "Deejay MJ", id: 3565559721 },
  { t: "In the End", a: "Linkin Park", id: 676183 },
  { t: "So Cold", a: "Breaking Benjamin", id: 13711277 },
  { t: "Lost in You", a: "Three Days Grace", id: 15593996 },
  { t: "Demons", a: "Imagine Dragons", id: 63510361 },
  { t: "Everytime", a: "Britney Spears", id: 2168030 },
  { t: "Before You Go", a: "Lewis Capaldi", id: 807205422 },
  { t: "Homeless", a: "Marina Kaye", id: 100816096 },
  { t: "I'm Not the Only One", a: "Sam Smith", id: 111780380 },
];

export default function Chansons() {
  return (
    <main className="wrap" style={{ maxWidth: 620 }}>
      <a className="retour" href="/besoin">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 8, paddingTop: 8 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .25rem" }}>la bande-son de nous</p>
        <h1 style={{ fontSize: "clamp(1.9rem,6vw,2.7rem)", color: "var(--titre)", margin: "0 0 .5rem" }}>Nos chansons</h1>
      </div>
      <p style={{ textAlign: "center", color: "var(--texte-doux)", lineHeight: 1.7, margin: "0 auto 30px", maxWidth: 460 }}>
        Tes préférées, réunies ici. Mets-les quand tu veux, pour danser, pour pleurer un peu, ou juste pour t&apos;endormir en pensant à nous.
      </p>

      {CHANSONS.map((c, i) => (
        <div key={c.id} style={{ background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 20, padding: "16px 16px 12px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "2px 4px 12px" }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)", fontSize: "1.05rem", minWidth: "1.4em" }}>{i + 1}</span>
            <span style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.15rem", color: "var(--titre)", lineHeight: 1.2 }}>{c.t}</span>
            <span style={{ color: "var(--texte-doux)", fontSize: ".9rem", marginLeft: "auto", textAlign: "right", whiteSpace: "nowrap" }}>{c.a}</span>
          </div>
          <iframe
            title={"Deezer, " + c.t}
            loading="lazy"
            allow="encrypted-media; clipboard-write"
            src={"https://widget.deezer.com/widget/dark/track/" + c.id + "?tracklist=false&radius=true"}
            style={{ display: "block", width: "100%", height: 120, border: 0, borderRadius: 12, background: "#1b1930" }}
          />
        </div>
      ))}

      <p style={{ textAlign: "center", color: "var(--texte-doux)", fontSize: ".85rem", lineHeight: 1.6, marginTop: 26 }}>
        Les lecteurs sont ceux de Deezer. Connecte-toi à ton compte Deezer pour écouter les titres en entier (sinon, c&apos;est un extrait). Si une version n&apos;est pas la bonne, dis-le-moi et je la remplace.
      </p>
      <div style={{ textAlign: "center", marginTop: 34 }}>
        <a href="/besoin" style={{ color: "var(--accent)", textDecoration: "none", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.05rem" }}>→ Un cocon si la nuit est difficile</a>
      </div>
    </main>
  );
}
