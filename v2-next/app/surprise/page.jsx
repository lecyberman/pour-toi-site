import JourneyHub from "@/components/JourneyHub";

export const metadata = { title: "Surprends-moi" };

export default function Surprise() {
  return (
    <main className="wrap">
      <a className="retour" href="/">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem" }}>il y a quelque chose pour toi</p>
        <h1 style={{ fontSize: "clamp(2rem,6.5vw,2.7rem)", color: "var(--titre)", margin: 0 }}>Surprends-moi</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "42ch", margin: ".6rem auto 0", lineHeight: 1.6 }}>
          Approche une lumière. Selon le jour, l&apos;heure, ou le 15, elle ne montre pas toujours la même chose.
        </p>
      </div>
      <JourneyHub journey="surprise" />
    </main>
  );
}
