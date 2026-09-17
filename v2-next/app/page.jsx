"use client";
import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import Portes from "@/components/Portes";

// WebGL uniquement côté client
const Butterflies = dynamic(() => import("@/components/Butterflies"), { ssr: false });

export default function Home() {
  return (
    <main style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}>
      <Intro />
      <Butterflies count={6} />
      <section style={{ position: "relative", zIndex: 2, minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "72px 20px" }}>
        <p className="eyebrow" style={{ fontSize: "1.05rem", margin: "0 0 .3rem" }}>notre monde, rien qu&apos;à nous</p>
        <h1 style={{ fontSize: "clamp(2rem,6vw,2.9rem)", color: "var(--titre)", margin: "0 0 6px" }}>Par où tu veux entrer&nbsp;?</h1>
        <p style={{ color: "var(--texte-doux)", maxWidth: "34ch", lineHeight: 1.6, margin: "0 auto 30px" }}>
          Prends ton temps. Il n&apos;y a rien à faire vite ici.
        </p>
        <div style={{ width: "100%", maxWidth: 820, marginTop: 30 }}>
          <Portes />
        </div>
        <a href="https://pour-toi-site.vercel.app/" style={{ marginTop: 34, fontSize: ".82rem", color: "rgba(199,178,230,.7)", textDecoration: "underline" }}>
          tout revoir en détail
        </a>
      </section>
    </main>
  );
}
