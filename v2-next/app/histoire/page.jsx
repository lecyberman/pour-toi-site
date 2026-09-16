import JourneyHub from "@/components/JourneyHub";

export const metadata = { title: "Retrouver notre histoire" };

export default function Histoire() {
  return (
    <main className="wrap">
      <a className="retour" href="/">⌂ rentrer</a>
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem" }}>notre monde, rien qu&apos;à nous</p>
        <h1 style={{ fontSize: "clamp(2rem,6.5vw,2.7rem)", color: "#FBF4EA", margin: 0 }}>Retrouver notre histoire</h1>
        <p style={{ color: "#B7ACCB", maxWidth: "42ch", margin: ".6rem auto 0", lineHeight: 1.6 }}>
          Nos souvenirs, nos lumières, nos étoiles. Entre, et laisse-toi guider de l&apos;un à l&apos;autre.
        </p>
      </div>
      <JourneyHub journey="histoire" />
    </main>
  );
}
