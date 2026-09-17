"use client";
import Link from "next/link";
import { useState } from "react";
import { JOURNEYS } from "@/lib/experienceRegistry";

function Porte({ j }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={j.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", flex: "1 1 200px", maxWidth: 250, minWidth: 160, textDecoration: "none",
        textAlign: "center", padding: "26px 18px 22px", borderRadius: 18,
        background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
        border: "1px solid " + (hover ? j.color : "rgba(255,255,255,.14)"),
        backdropFilter: "blur(6px)",
        transform: hover ? "translateY(-8px)" : "none",
        boxShadow: hover ? "0 30px 60px -28px " + j.color + "99" : "0 20px 50px -30px rgba(0,0,0,.8)",
        transition: "transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s, border-color .5s"
      }}
    >
      <span style={{ position: "absolute", left: "50%", top: -32, transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: "radial-gradient(circle," + j.color + "66,transparent 70%)", filter: "blur(4px)" }} />
      <span style={{ display: "block", fontFamily: "system-ui,sans-serif", fontWeight: 700, color: "var(--titre)", fontSize: "1.05rem", lineHeight: 1.3 }}>{j.title}</span>
      <span style={{ display: "block", fontFamily: "'Fraunces',Georgia,serif", fontStyle: "italic", color: j.color, fontSize: ".88rem", marginTop: 6 }}>{j.sub}</span>
    </Link>
  );
}

export default function Portes() {
  return (
    <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap", padding: "0 18px" }}>
      {JOURNEYS.map((j) => <Porte key={j.id} j={j} />)}
    </div>
  );
}
