"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Badge d'identité + présence de l'autre, en haut de chaque page.
// Tu choisis qui tu es (Mathieu / dadoucherie), puis tu vois en temps réel
// si l'autre est connecté. Sur /ensemble on ne l'affiche pas (cette page
// gère déjà sa propre présence).
const NOMS = { elle: "dadoucherie", lui: "Mathieu" };
const AUTRE = { elle: "lui", lui: "elle" };

export default function Presence() {
  const pathname = usePathname() || "";
  const cache = pathname.indexOf("/ensemble") === 0;
  const [role, setRole] = useState(null);
  const [souscrit, setSouscrit] = useState(false);
  const [autreEnLigne, setAutreEnLigne] = useState(false);
  const canalRef = useRef(null);

  useEffect(() => {
    try { const r = localStorage.getItem("moi_role"); if (r === "elle" || r === "lui") setRole(r); } catch (e) {}
  }, []);

  useEffect(() => {
    if (!role || cache) return;
    let canal;
    setSouscrit(false); setAutreEnLigne(false);
    try {
      canal = supabase.channel("nous-deux-live", { config: { presence: { key: role } } });
      canalRef.current = canal;
      const maj = () => { try { setAutreEnLigne(Object.keys(canal.presenceState()).indexOf(AUTRE[role]) > -1); } catch (e) { setAutreEnLigne(false); } };
      canal.on("presence", { event: "sync" }, maj);
      canal.subscribe((st) => { if (st === "SUBSCRIBED") { setSouscrit(true); try { canal.track({ role, page: pathname, at: Date.now() }); } catch (e) {} maj(); } });
    } catch (e) {}
    return () => { try { if (canal) { canal.untrack(); supabase.removeChannel(canal); } } catch (e) {} canalRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, cache]);

  if (cache) return null;

  const choisir = (r) => { try { localStorage.setItem("moi_role", r); } catch (e) {} setRole(r); };
  const changer = () => { try { const c = canalRef.current; if (c) c.untrack(); } catch (e) {} try { localStorage.removeItem("moi_role"); } catch (e) {} setSouscrit(false); setAutreEnLigne(false); setRole(null); };

  const wrap = { position: "fixed", top: "calc(10px + env(safe-area-inset-top,0px))", left: "50%", transform: "translateX(-50%)", zIndex: 9998, display: "flex", alignItems: "center", gap: 8, background: "rgba(24,22,46,.92)", border: "1px solid rgba(180,155,218,.4)", color: "#EDE9F3", fontFamily: "'Nunito Sans',system-ui,sans-serif", fontWeight: 700, fontSize: ".83rem", padding: "7px 13px", borderRadius: 100, boxShadow: "0 8px 24px -10px rgba(0,0,0,.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", maxWidth: "94vw", whiteSpace: "nowrap" };
  const dot = (c) => <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: "0 0 8px " + c, flex: "none" }} />;
  const lienChanger = <a href="#" onClick={(e) => { e.preventDefault(); changer(); }} style={{ color: "#B49BDA", textDecoration: "none", fontWeight: 600, opacity: .7, marginLeft: 2 }}>changer</a>;

  if (!role) {
    return (
      <div style={wrap}>
        <span style={{ opacity: .85 }}>Qui es-tu&nbsp;?</span>
        <button onClick={() => choisir("lui")} style={{ cursor: "pointer", border: "none", borderRadius: 100, padding: "5px 12px", fontWeight: 700, fontFamily: "inherit", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)" }}>Mathieu</button>
        <button onClick={() => choisir("elle")} style={{ cursor: "pointer", border: "1px solid rgba(255,255,255,.25)", borderRadius: 100, padding: "5px 12px", fontWeight: 700, fontFamily: "inherit", color: "#EDE9F3", background: "rgba(255,255,255,.06)" }}>dadoucherie</button>
      </div>
    );
  }

  const autre = NOMS[AUTRE[role]];
  const accord = AUTRE[role] === "elle" ? "connectée" : "connecté";
  return (
    <div style={wrap}>
      {!souscrit ? (<>{dot("#c9a86a")}<span>connexion…</span>{lienChanger}</>)
        : autreEnLigne ? (<><a href="/ensemble" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>{dot("#8ee6a0")}<span>{autre} est là, en ce moment 🤍</span></a>{lienChanger}</>)
        : (<>{dot("#6f6a80")}<span style={{ opacity: .9 }}>{autre} n&apos;est pas {accord}</span>{lienChanger}</>)}
    </div>
  );
}
