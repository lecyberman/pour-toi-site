"use client";
import { useEffect, useState } from "react";

// Bascule jour/nuit, préférence partagée (clé theme_pref_v1), appliquée sur <html data-theme>.
export default function ThemeToggle() {
  const [theme, setTheme] = useState("sombre");
  useEffect(() => {
    let p = "sombre";
    try { p = localStorage.getItem("theme_pref_v1") || "sombre"; } catch (e) {}
    document.documentElement.setAttribute("data-theme", p);
    setTheme(p);
  }, []);
  const toggle = () => {
    const n = theme === "sombre" ? "clair" : "sombre";
    try { localStorage.setItem("theme_pref_v1", n); } catch (e) {}
    document.documentElement.setAttribute("data-theme", n);
    setTheme(n);
  };
  return (
    <button
      onClick={toggle}
      aria-label="Changer le thème clair ou sombre"
      style={{
        position: "fixed", left: 16, bottom: "max(16px,env(safe-area-inset-bottom))", zIndex: 2147482000,
        width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--bord)",
        background: "var(--carte)", color: "var(--texte)", fontSize: "1.15rem", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 8px 24px -12px rgba(0,0,0,.5)"
      }}
    >
      {theme === "sombre" ? "☀" : "☾"}
    </button>
  );
}
