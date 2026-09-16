import JourneyHub from "@/components/JourneyHub";

export const metadata = { title: "J'ai besoin de toi" };

export default function Besoin() {
  return (
    <main className="wrap">
      <a className="retour" href="/">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem" }}>je suis là, tout près</p>
        <h1 style={{ fontSize: "clamp(2rem,6.5vw,2.7rem)", color: "#FBF4EA", margin: 0 }}>J&apos;ai besoin de toi</h1>
        <p style={{ color: "#B7ACCB", maxWidth: "42ch", margin: ".6rem auto 0", lineHeight: 1.6 }}>
          Choisis ce qui te ferait du bien, là, maintenant. Rien à réussir : juste te sentir un peu mieux.
        </p>
      </div>
      <JourneyHub journey="besoin" />
    </main>
  );
}
