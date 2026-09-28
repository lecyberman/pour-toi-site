"use client";
import { useEffect } from "react";

const CSS = `
.cour{--carte:#FCF8FA;--encre:#46394F;--encre-douce:#7A6E82;--corail:#E1806F;--corail-clair:#F0AFA1;--miel:#E4B266;--display:'Fraunces',Georgia,serif;--body:'Nunito Sans',system-ui,sans-serif;--ease:cubic-bezier(.22,.61,.36,1);
 color:var(--encre);font-family:var(--body);background:radial-gradient(120% 90% at 15% 0%, #F7ECE8 0%, transparent 55%),radial-gradient(120% 90% at 90% 100%, #EFE7F0 0%, transparent 50%),#EFE9F3;min-height:100dvh;padding:30px 18px 60px;line-height:1.6;}
.cour .page{max-width:560px;margin:0 auto;}
.cour .eyebrow{font-weight:700;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--corail);margin:0 0 10px;text-align:center;}
.cour h1{font-family:var(--display);font-weight:500;font-size:clamp(1.8rem,7vw,2.4rem);text-align:center;margin:0 0 8px;color:var(--encre);}
.cour .sous{text-align:center;color:var(--encre-douce);margin:0 0 28px;font-size:.95rem;}
.cour .carte{background:var(--carte);border:1px solid rgba(70,57,79,.07);border-radius:20px;padding:24px;margin:0 0 22px;box-shadow:0 18px 46px -32px rgba(70,57,79,.55);}
.cour h2{font-family:var(--display);font-weight:500;font-size:1.3rem;margin:0 0 12px;color:var(--encre);}
.cour .mot{background:#FBF2F0;border-radius:14px;padding:16px 18px;margin:0 0 14px;}
.cour .mot .texte{font-size:1rem;white-space:pre-wrap;}
.cour .mot .meta{font-size:.8rem;color:var(--encre-douce);margin-top:10px;}
.cour .mot .meta .lu{color:#6a8f5f;font-weight:600;}
.cour .vide{color:var(--encre-douce);font-style:italic;font-size:.95rem;}
.cour input[type="password"],.cour textarea,.cour input[type="text"]{width:100%;border:1px solid rgba(70,57,79,.16);border-radius:13px;padding:12px 14px;font-family:var(--body);font-size:1rem;color:var(--encre);background:#fff;margin-bottom:10px;}
.cour textarea{resize:vertical;min-height:70px;line-height:1.5;}
.cour .btn{font-family:var(--body);font-weight:700;font-size:.98rem;border:none;border-radius:100px;padding:12px 22px;cursor:pointer;background:var(--corail);color:#fff;box-shadow:0 10px 22px -12px rgba(225,128,111,.8);}
.cour .stats{display:flex;flex-wrap:wrap;gap:10px;}
.cour .stat{flex:1;min-width:100px;background:#F4EEF3;border-radius:14px;padding:12px;text-align:center;}
.cour .stat .n{font-family:var(--display);font-size:1.4rem;color:var(--corail);font-weight:600;}
.cour .stat .l{font-size:.75rem;color:var(--encre-douce);margin-top:2px;}
.cour .ok{color:#6a8f5f;font-size:.9rem;margin-top:8px;display:none;}
.cour #courContenu{display:none;}
.cour .note{font-size:.85rem;color:var(--encre-douce);}
`;

export default function Courrier() {
  useEffect(() => {
    try { if (localStorage.getItem("moi_role") === "elle") { location.replace("/"); return; } } catch (e) {}
    const DB_URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
    const DB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";
    const hdrs = (extra) => { const h = { apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, "Content-Type": "application/json" }; for (const k in (extra || {})) h[k] = extra[k]; return h; };
    const dbLire = (t, f) => fetch(DB_URL + "/rest/v1/" + t + "?" + (f || ""), { headers: hdrs() }).then((r) => r.json()).catch(() => []);
    const dbInserer = (t, d) => fetch(DB_URL + "/rest/v1/" + t, { method: "POST", headers: hdrs({ Prefer: "return=minimal" }), body: JSON.stringify(d) }).catch(() => {});
    const dbPatch = (t, f, d) => fetch(DB_URL + "/rest/v1/" + t + "?" + f, { method: "PATCH", headers: hdrs({ Prefer: "return=minimal" }), body: JSON.stringify(d) }).catch(() => {});
    const dbCompter = (t, f) => fetch(DB_URL + "/rest/v1/" + t + "?select=id" + (f ? "&" + f : ""), { method: "HEAD", headers: hdrs({ Prefer: "count=exact" }) }).then((r) => { const c = r.headers.get("content-range"); return c ? parseInt(c.split("/")[1], 10) : 0; }).catch(() => 0);
    const dateFr = (iso) => { const d = new Date(iso); return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) + " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); };
    const $ = (id) => document.getElementById(id);
    const CODE = "2020";
    const porte = $("courPorte"), contenu = $("courContenu");
    const ouvrir = () => { porte.style.display = "none"; contenu.style.display = "block"; try { localStorage.setItem("courrier_ok", "1"); } catch (e) {} charger(); };
    $("courEntrer").addEventListener("click", () => { if ($("courCode").value.trim() === CODE) ouvrir(); else $("courCode").value = ""; });
    $("courCode").addEventListener("keydown", (e) => { if (e.key === "Enter") $("courEntrer").click(); });
    try { if (localStorage.getItem("courrier_ok") === "1") ouvrir(); } catch (e) {}
    const auj = () => new Date().toISOString().slice(0, 10);
    const chargerMessagesJour = () => { dbLire("messages_jour", "pour_date=eq." + auj() + "&order=created_at.desc").then((rows) => { rows = rows || []; const bj = rows.find((r) => r.type === "bonjour"); const bn = rows.find((r) => r.type === "bonne_nuit"); const etat = $("bjEtat"); const parts = []; parts.push(bj ? "☀️ Bonjour du jour : publié" + (bj.lu_le ? " · lu ✓" : " · pas encore lu") : "☀️ Bonjour du jour : pas encore écrit (le site mettra une lettre de la bibliothèque)"); parts.push(bn ? "🌙 Bonne nuit : publiée" + (bn.lu_le ? " · lue ✓" : " · pas encore lue") : "🌙 Bonne nuit : pas encore écrite"); etat.innerHTML = parts.join("<br>"); if (bj) $("bjTexte").value = bj.texte; if (bn) $("bnTexte").value = bn.texte; }); };
    $("bjBtn").addEventListener("click", () => { const t = $("bjTexte").value.trim(); if (!t) return; dbInserer("messages_jour", { type: "bonjour", texte: t, pour_date: auj() }).then(() => { const ok = $("bjOk"); ok.style.display = "block"; setTimeout(() => { ok.style.display = "none"; }, 4000); chargerMessagesJour(); }); });
    $("bnBtn").addEventListener("click", () => { const t = $("bnTexte").value.trim(); if (!t) return; dbInserer("messages_jour", { type: "bonne_nuit", texte: t, pour_date: auj() }).then(() => { const ok = $("bnOk"); ok.style.display = "block"; setTimeout(() => { ok.style.display = "none"; }, 4000); chargerMessagesJour(); }); });
    const charger = () => {
      chargerMessagesJour(); chargerLettres(); chargerLpm(); chargerChansons(); chargerCompteurs();
      dbLire("dadoucherie_mots", "order=created_at.desc").then((rows) => { const z = $("motsZone"); z.innerHTML = ""; if (!rows || !rows.length) { z.innerHTML = '<p class="vide">Rien pour l\'instant. Elle n\'a pas encore écrit, patience, ça viendra.</p>'; return; } rows.forEach((m) => { const d = document.createElement("div"); d.className = "mot"; const t = document.createElement("div"); t.className = "texte"; t.textContent = m.message; const meta = document.createElement("div"); meta.className = "meta"; meta.innerHTML = "reçu le " + dateFr(m.created_at) + (m.lu_le ? ' · <span class="lu">lu ✓</span>' : ""); d.appendChild(t); d.appendChild(meta); z.appendChild(d); }); dbPatch("dadoucherie_mots", "lu_le=is.null", { lu_le: new Date().toISOString() }); });
      Promise.all([dbCompter("dadoucherie_journal", "type=eq.visite"), dbCompter("dadoucherie_journal", "type=eq.coeur"), dbCompter("dadoucherie_journal", "type=eq.billets"), dbLire("tresor", "select=piece")]).then((r) => { const pieces = {}; (r[3] || []).forEach((x) => { pieces[x.piece] = 1; }); const s = $("stats"); const data = [{ n: r[0], l: "visites de sa page" }, { n: r[1], l: "appuis sur ton cœur" }, { n: r[2], l: "pluies de billets" }, { n: Object.keys(pieces).length + "/3", l: "pièces d'or trouvées" }]; s.innerHTML = ""; data.forEach((x) => { const d = document.createElement("div"); d.className = "stat"; d.innerHTML = '<div class="n">' + x.n + '</div><div class="l">' + x.l + "</div>"; s.appendChild(d); }); });
      Promise.all([dbLire("histoire_versions", "order=created_at.desc&limit=5"), dbLire("qds", "auteur=eq.elle&order=created_at.desc&limit=3")]).then((r) => { const z = $("autresZone"); z.innerHTML = ""; let rien = true; (r[0] || []).forEach((v) => { rien = false; const d = document.createElement("div"); d.className = "mot"; d.innerHTML = '<div class="texte"></div><div class="meta">sa version du chapitre « ' + v.etape + " » · " + dateFr(v.created_at) + "</div>"; d.querySelector(".texte").textContent = v.texte; z.appendChild(d); }); (r[1] || []).forEach((v) => { rien = false; const d = document.createElement("div"); d.className = "mot"; d.innerHTML = '<div class="texte"></div><div class="meta">sa réponse du dimanche (' + v.semaine + ") · " + dateFr(v.created_at) + "</div>"; d.querySelector(".texte").textContent = v.texte; z.appendChild(d); }); if (rien) z.innerHTML = '<p class="vide">Rien encore dans la frise ni au jeu du dimanche.</p>'; });
    };
    const chargerLettres = () => { dbLire("lettres", "order=date_ouverture.asc").then((rows) => { const z = $("lettresZone"); z.innerHTML = ""; if (!rows || !rows.length) return; rows.forEach((l) => { const d = document.createElement("div"); d.className = "mot"; const ouverte = new Date(l.date_ouverture + "T00:00:00") <= new Date(); const etat = ouverte ? (l.lue_le ? "ouverte et lue par elle ✓" : "déverrouillée, pas encore lue") : "scellée jusqu'au " + new Date(l.date_ouverture + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); d.innerHTML = '<div class="texte" style="font-weight:700;"></div><div class="meta">' + etat + "</div>"; d.querySelector(".texte").textContent = (ouverte ? "📬 " : "✉️ ") + l.titre; z.appendChild(d); }); }); };
    $("lBtn").addEventListener("click", () => { const titre = $("lTitre").value.trim(); const texte = $("lTexte").value.trim(); const date = $("lDate").value.trim(); if (!titre || !texte || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return; dbInserer("lettres", { titre, texte, date_ouverture: date }).then(() => { $("lTitre").value = ""; $("lTexte").value = ""; $("lDate").value = ""; const ok = $("lOk"); ok.style.display = "block"; setTimeout(() => { ok.style.display = "none"; }, 4000); chargerLettres(); }); });
    const chargerLpm = () => { dbLire("lettres_pour_mathieu", "order=date_ouverture.asc").then((rows) => { const z = $("lpmZone"); z.innerHTML = ""; if (!rows || !rows.length) { z.innerHTML = '<p class="vide">Aucune pour l\'instant. Elle ne sait peut-être pas encore qu\'elle peut : la fonction est au bas de sa page.</p>'; return; } rows.forEach((l) => { const d = document.createElement("div"); d.className = "mot"; const ouverte = new Date(l.date_ouverture + "T00:00:00") <= new Date(); if (!ouverte) { const dodos = Math.ceil((new Date(l.date_ouverture + "T00:00:00") - Date.now()) / 86400000); d.innerHTML = '<div class="texte" style="font-weight:700;">✉️ Une lettre d\'elle, scellée</div><div class="meta">ouverture dans ' + dodos + " dodo" + (dodos > 1 ? "s" : "") + ", le " + dateFr(l.date_ouverture + "T00:00:00").split(" à ")[0] + ". Patience. Elle a le droit de te faire attendre aussi.</div>"; } else { d.innerHTML = '<div class="texte"></div><div class="meta">déverrouillée le ' + dateFr(l.date_ouverture + "T00:00:00").split(" à ")[0] + (l.lue_le ? " · lue ✓" : "") + "</div>"; d.querySelector(".texte").textContent = l.texte; if (!l.lue_le) dbPatch("lettres_pour_mathieu", "id=eq." + l.id, { lue_le: new Date().toISOString() }); } z.appendChild(d); }); }); };
    const chargerChansons = () => { dbLire("chansons", "order=created_at.desc&limit=5").then((rows) => { const z = $("chListe"); z.innerHTML = ""; (rows || []).forEach((c, i) => { const d = document.createElement("div"); d.className = "mot"; d.innerHTML = '<div class="texte"></div><div class="meta">' + dateFr(c.created_at) + (i === 0 ? " · en ce moment sur sa page" : "") + "</div>"; d.querySelector(".texte").textContent = "🎵 " + c.titre + (c.note ? ", " + c.note : ""); z.appendChild(d); }); }); };
    $("chBtn").addEventListener("click", () => { const t = $("chTitre").value.trim(); if (!t) return; dbInserer("chansons", { titre: t, note: $("chNote").value.trim() || null }).then(() => { $("chTitre").value = ""; $("chNote").value = ""; const ok = $("chOk"); ok.style.display = "block"; setTimeout(() => { ok.style.display = "none"; }, 4000); chargerChansons(); }); });
    const chargerCompteurs = () => { dbLire("compteurs", "order=date_cible.asc").then((rows) => { const z = $("cptListe"); z.innerHTML = ""; (rows || []).forEach((c) => { const dodos = Math.ceil((new Date(c.date_cible + "T00:00:00") - Date.now()) / 86400000); const d = document.createElement("div"); d.className = "mot"; d.innerHTML = '<div class="texte"></div><div class="meta">' + (dodos >= 0 ? "dans " + dodos + " dodo" + (dodos > 1 ? "s" : "") : "passé, à transformer en souvenir") + "</div>"; d.querySelector(".texte").textContent = "⏳ " + c.label + " · " + c.date_cible; z.appendChild(d); }); }); };
    $("cptBtn").addEventListener("click", () => { const l = $("cptLabel").value.trim(); const dte = $("cptDate").value.trim(); if (!l || !/^\d{4}-\d{2}-\d{2}$/.test(dte)) return; dbInserer("compteurs", { label: l, date_cible: dte }).then(() => { $("cptLabel").value = ""; $("cptDate").value = ""; chargerCompteurs(); }); });
    $("mdjBtn").addEventListener("click", () => { const t = $("mdjTexte").value.trim(); if (!t) return; dbInserer("mot_du_jour", { texte: t }).then(() => { $("mdjTexte").value = ""; const ok = $("mdjOk"); ok.style.display = "block"; setTimeout(() => { ok.style.display = "none"; }, 4000); }); });
  }, []);

  return (
    <div className="cour">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="page">
        <p className="eyebrow">réservé au facteur en chef</p>
        <h1>Le courrier</h1>
        <p className="sous">Tout ce qu&apos;elle dépose sur le site arrive ici.</p>

        <div className="carte" id="courPorte">
          <h2>Code d&apos;accès</h2>
          <input type="password" id="courCode" placeholder="Le code…" inputMode="numeric" />
          <button className="btn" id="courEntrer">Entrer</button>
          <p className="note" style={{ marginTop: 10 }}>Indice pour toi seul : l&apos;année où tout est devenu officiel, à Lyon.</p>
        </div>

        <div id="courContenu">
          <div className="carte">
            <h2>Le bonjour &amp; la bonne nuit du jour ☀️🌙</h2>
            <p className="note" style={{ marginBottom: 12 }}>Écris ici ton message du jour. Le matin, elle verra ton bonjour ; le soir, ta bonne nuit. Si tu ne mets rien, le site affiche une belle lettre de ta bibliothèque à ta place, mais rien ne vaut ta plume à toi, aujourd&apos;hui.</p>
            <p style={{ fontWeight: 700, color: "var(--corail)", fontSize: ".85rem", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>☀️ Le bonjour d&apos;aujourd&apos;hui</p>
            <textarea id="bjTexte" placeholder="Ton bonjour romantique du jour, aussi long que tu veux…" style={{ minHeight: 120 }} />
            <button className="btn" id="bjBtn">Publier le bonjour</button>
            <p className="ok" id="bjOk">Publié. Elle le lira en ouvrant sa page ce matin. ☀️</p>
            <p style={{ fontWeight: 700, color: "var(--corail)", fontSize: ".85rem", textTransform: "uppercase", letterSpacing: ".08em", margin: "16px 0 6px" }}>🌙 La bonne nuit d&apos;aujourd&apos;hui</p>
            <textarea id="bnTexte" placeholder="Ta bonne nuit romantique du jour…" style={{ minHeight: 120 }} />
            <button className="btn" id="bnBtn">Publier la bonne nuit</button>
            <p className="ok" id="bnOk">Publié. Elle la lira ce soir. 🌙</p>
            <div id="bjEtat" className="note" style={{ marginTop: 12 }} />
          </div>

          <div className="carte">
            <h2>Ses mots 💌</h2>
            <div id="motsZone"><p className="vide">Je regarde la boîte aux lettres…</p></div>
            <p className="note">Ouvrir cette page marque ses mots comme lus : elle verra « lu par Mathieu » sur sa page. C&apos;est l&apos;accusé de lecture amoureux.</p>
          </div>

          <div className="carte">
            <h2>Épingler le mot du jour 📌</h2>
            <p className="note" style={{ marginBottom: 10 }}>Ce que tu écris ici devient la première chose qu&apos;elle voit en ouvrant sa page.</p>
            <textarea id="mdjTexte" placeholder="Une phrase pour elle, là, maintenant…" />
            <button className="btn" id="mdjBtn">Épingler</button>
            <p className="ok" id="mdjOk">Épinglé. Elle le verra à sa prochaine visite. 🤍</p>
          </div>

          <div className="carte">
            <h2>Lettres à retardement 🕰️</h2>
            <p className="note" style={{ marginBottom: 10 }}>Écris maintenant, elle ouvrira à la date choisie. D&apos;ici là, elle voit une enveloppe scellée avec un compte à rebours en dodos.</p>
            <input type="text" id="lTitre" placeholder="Titre de la lettre (ex : Pour ton 1er janvier)" />
            <textarea id="lTexte" placeholder="La lettre elle-même. Prends ton temps, tu écris au futur…" style={{ minHeight: 110 }} />
            <input type="text" id="lDate" placeholder="Date d'ouverture (AAAA-MM-JJ, ex : 2027-01-01)" inputMode="numeric" />
            <button className="btn" id="lBtn">Sceller la lettre</button>
            <p className="ok" id="lOk">Scellée. Le temps fera le reste. 🕰️</p>
            <div id="lettresZone" style={{ marginTop: 16 }} />
          </div>

          <div className="carte"><h2>Le tableau de bord</h2><div className="stats" id="stats" /></div>

          <div className="carte"><h2>Ses réponses ailleurs</h2><div id="autresZone"><p className="vide">Chargement…</p></div></div>

          <div className="carte">
            <h2>Ses lettres scellées pour toi 🔒</h2>
            <p className="note" style={{ marginBottom: 10 }}>Elle peut te sceller des lettres à retardement depuis sa page. Les voici. Pas de triche possible, même pour toi.</p>
            <div id="lpmZone"><p className="vide">Je regarde…</p></div>
          </div>

          <div className="carte">
            <h2>La chanson du moment 🎵</h2>
            <p className="note" style={{ marginBottom: 10 }}>« En ce moment, cette chanson me fait penser à toi. » Elle s&apos;affiche sur sa page.</p>
            <input type="text" id="chTitre" placeholder="Titre et artiste" />
            <input type="text" id="chNote" placeholder="Pourquoi cette chanson, en une phrase (optionnel)" />
            <button className="btn" id="chBtn">C&apos;est celle-là en ce moment</button>
            <p className="ok" id="chOk">Enregistrée. Elle la verra sur sa page. 🎵</p>
            <div id="chListe" style={{ marginTop: 12 }} />
          </div>

          <div className="carte">
            <h2>Les comptes à rebours ⏳</h2>
            <p className="note" style={{ marginBottom: 10 }}>Vos prochains rendez-vous heureux. Le plus proche s&apos;affiche sur sa page, compté en dodos.</p>
            <input type="text" id="cptLabel" placeholder="L'événement (ex : notre week-end à Rome)" />
            <input type="text" id="cptDate" placeholder="La date (AAAA-MM-JJ)" inputMode="numeric" />
            <button className="btn" id="cptBtn">Ajouter</button>
            <div id="cptListe" style={{ marginTop: 12 }} />
          </div>

          <div className="carte">
            <h2>Le livre de l&apos;année 📖</h2>
            <p className="note" style={{ marginBottom: 12 }}>Tout ce que vous écrivez sur le site, compilé en album.</p>
            <a className="btn" href="/livre" style={{ display: "inline-block", textDecoration: "none" }}>Ouvrir le livre de nous</a>
          </div>
        </div>
      </div>
    </div>
  );
}
