"use client";
import dynamic from "next/dynamic";

const Butterflies = dynamic(() => import("@/components/Butterflies"), { ssr: false });

export default function Papillons() {
  return (
    <main style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}>
      <a className="retour" href="/histoire">⌂ rentrer</a>
      <Butterflies count={10} />
      <div style={{ position: "fixed", top: "max(26px,env(safe-area-inset-top))", left: 0, right: 0, textAlign: "center", zIndex: 2, pointerEvents: "none", padding: "0 20px" }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .25rem" }}>rien que pour toi</p>
        <h1 style={{ color: "var(--titre)", fontSize: "clamp(1.9rem,6vw,2.6rem)", margin: 0 }}>Nos papillons</h1>
      </div>
      <p style={{ position: "fixed", bottom: "max(20px,env(safe-area-inset-bottom))", left: 0, right: 0, textAlign: "center", color: "rgba(237,233,243,.6)", fontSize: ".82rem", zIndex: 2, pointerEvents: "none", padding: "0 20px" }}>
        Bouge le doigt : ils t&apos;évitent. Reste tranquille : ils se posent.
      </p>
    </main>
  );
}
