"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

function roleLocal() { try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; } }
const GRACE_MS = 10000;

export default function Messages() {
  const [role, setRole] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [texte, setTexte] = useState("");
  const filRef = useRef(null);

  const setRoleAndReload = (r) => { try { localStorage.setItem("moi_role", r); } catch (e) {} setRole(r); };

  const cycle = async () => {
    const moi = roleLocal();
    const { data } = await supabase.from("messages").select("id,texte,de_role,lu,lu_at,created_at").order("created_at", { ascending: true });
    const rows = data || [];
    setMsgs(rows);
    if (moi) {
      const aLire = rows.filter((m) => m.de_role !== moi && !m.lu).map((m) => m.id);
      if (aLire.length) await supabase.from("messages").update({ lu: true, lu_at: new Date().toISOString() }).in("id", aLire);
    }
    const seuil = new Date(Date.now() - GRACE_MS).toISOString();
    await supabase.from("messages").delete().eq("lu", true).lt("lu_at", seuil);
  };

  useEffect(() => {
    setRole(roleLocal());
    cycle();
    const t = setInterval(cycle, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { if (filRef.current) filRef.current.scrollTop = filRef.current.scrollHeight; }, [msgs]);

  const envoyer = async () => {
    const t = texte.trim(); const moi = roleLocal();
    if (!t || !moi) return;
    setTexte("");
    await supabase.from("messages").insert({ texte: t, de_role: moi });
    cycle();
  };
  const toutEffacer = async () => {
    if (!confirm("Tout effacer, pour vous deux ?")) return;
    await supabase.from("messages").delete().not("id", "is", null);
    cycle();
  };

  const moi = role;
  const hhmm = (iso) => { try { return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); } catch (e) { return ""; } };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "calc(10px + env(safe-area-inset-top)) 14px 10px", borderBottom: "1px solid var(--bord)" }}>
        <a className="retour" href="/surprise" style={{ position: "static" }}>⌂</a>
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.25rem", margin: 0, color: "var(--titre)" }}>Notre chat</h1>
          <div style={{ fontSize: ".72rem", color: "var(--texte-doux)" }}>ça se lit, puis ça s&apos;efface</div>
        </div>
        <button onClick={toutEffacer} title="Tout effacer" style={{ fontSize: ".8rem", color: "#d9a2a2", background: "var(--carte)", border: "1px solid rgba(217,162,162,.3)", borderRadius: 100, padding: "6px 11px", cursor: "pointer" }}>🔥</button>
      </div>

      {!moi ? (
        <div style={{ margin: "auto", textAlign: "center", padding: 30 }}>
          <p style={{ color: "var(--texte-doux)", marginBottom: 12 }}>Qui es-tu ?</p>
          <button onClick={() => setRoleAndReload("lui")} style={{ fontWeight: 700, borderRadius: 100, padding: "11px 18px", margin: "0 5px", cursor: "pointer", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", border: "none" }}>Mathieu</button>
          <button onClick={() => setRoleAndReload("elle")} style={{ fontWeight: 700, borderRadius: 100, padding: "11px 18px", margin: "0 5px", cursor: "pointer", color: "var(--texte)", background: "var(--carte)", border: "1px solid var(--bord)" }}>dadoucherie</button>
        </div>
      ) : (
        <>
          <div ref={filRef} style={{ flex: 1, overflowY: "auto", padding: "16px 14px 8px", display: "flex", flexDirection: "column", gap: 8 }}>
            {msgs.length === 0 && <p style={{ margin: "auto", textAlign: "center", color: "var(--texte-doux)", fontStyle: "italic", lineHeight: 1.7 }}>Écris le premier mot 🤍<br />Ce qui se dit ici s&apos;efface une fois lu.</p>}
            {msgs.map((m) => {
              const mine = m.de_role === moi;
              return (
                <div key={m.id} style={{ maxWidth: "78%", padding: "11px 15px", borderRadius: 20, fontSize: "1.04rem", lineHeight: 1.5, whiteSpace: "pre-line", wordWrap: "break-word", alignSelf: mine ? "flex-end" : "flex-start", color: mine ? "#1a1430" : "var(--texte)", background: mine ? "linear-gradient(135deg,#CBB4EC,#A886DA)" : "var(--carte)", border: mine ? "none" : "1px solid var(--bord)", borderBottomRightRadius: mine ? 6 : 20, borderBottomLeftRadius: mine ? 20 : 6 }}>
                  {m.texte}
                  <span style={{ display: "block", marginTop: 5, fontSize: ".68rem", opacity: .6, textAlign: "right" }}>{hhmm(m.created_at)}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, padding: "10px 12px calc(12px + env(safe-area-inset-bottom))", borderTop: "1px solid var(--bord)" }}>
            <input value={texte} onChange={(e) => setTexte(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); envoyer(); } }} placeholder="Écris un mot…" autoComplete="off" style={{ flex: 1, background: "var(--carte)", border: "1px solid var(--bord)", borderRadius: 100, color: "var(--titre)", padding: "13px 16px", fontFamily: "inherit", fontSize: "1rem" }} />
            <button onClick={envoyer} aria-label="Envoyer" style={{ border: "none", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", color: "#1a1430", background: "linear-gradient(135deg,#CBB4EC,#A886DA)", fontSize: "1.2rem" }}>➤</button>
          </div>
        </>
      )}
    </div>
  );
}
