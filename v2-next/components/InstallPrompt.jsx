"use client";
import { useEffect, useState } from "react";

const DKEY = "install_masque_v2";

function isStandalone() {
  try { return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true; } catch (e) { return false; }
}
function isIOS() {
  try { return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream; } catch (e) { return false; }
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    if (isStandalone()) return;
    try { if (localStorage.getItem(DKEY) === "1") return; } catch (e) {}

    const onBIP = (e) => { e.preventDefault(); setDeferred(e); setIos(false); setVisible(true); };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", () => { setVisible(false); try { localStorage.setItem(DKEY, "1"); } catch (er) {} });

    // iOS Safari ne déclenche pas beforeinstallprompt : on montre les instructions
    let t = null;
    if (isIOS()) t = setTimeout(() => { if (!isStandalone()) { setIos(true); setVisible(true); } }, 3500);

    return () => { window.removeEventListener("beforeinstallprompt", onBIP); if (t) clearTimeout(t); };
  }, []);

  if (!visible) return null;

  const fermer = () => { setVisible(false); try { localStorage.setItem(DKEY, "1"); } catch (e) {} };
  const installer = async () => {
    if (deferred) { deferred.prompt(); try { await deferred.userChoice; } catch (e) {} setDeferred(null); setVisible(false); }
    else fermer();
  };

  return (
    <div style={{ position: "fixed", left: 12, right: 12, bottom: "calc(14px + env(safe-area-inset-bottom,0px))", zIndex: 2147483001, maxWidth: 440, margin: "0 auto", background: "rgba(24,22,46,.96)", border: "1px solid rgba(199,178,230,.4)", borderRadius: 18, padding: "14px 16px", boxShadow: "0 18px 50px -20px rgba(0,0,0,.7)", backdropFilter: "blur(10px)", color: "#EDE9F3", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: "1.8rem", lineHeight: 1 }}>🤍</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--serif, 'Fraunces', serif)", fontSize: "1.05rem", color: "#FBF4EA", marginBottom: 2 }}>Installe notre espace</div>
        {ios ? (
          <div style={{ fontSize: ".85rem", color: "#C9C1D8", lineHeight: 1.5 }}>Touche <b>Partager</b> ⬆️ en bas de Safari, puis <b>« Sur l&apos;écran d&apos;accueil »</b>.</div>
        ) : (
          <div style={{ fontSize: ".85rem", color: "#C9C1D8", lineHeight: 1.5 }}>Ajoute-le à ton téléphone pour l&apos;ouvrir comme une vraie app, et recevoir mes petits mots.</div>
        )}
      </div>
      {!ios && (
        <button onClick={installer} style={{ flexShrink: 0, fontFamily: "var(--sans, 'Nunito Sans', sans-serif)", fontWeight: 700, fontSize: ".9rem", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none", borderRadius: 100, padding: "10px 16px", cursor: "pointer" }}>Installer</button>
      )}
      <button onClick={fermer} aria-label="Fermer" style={{ flexShrink: 0, background: "transparent", border: "none", color: "#8E82A6", fontSize: "1.2rem", cursor: "pointer", padding: "0 2px" }}>✕</button>
    </div>
  );
}
