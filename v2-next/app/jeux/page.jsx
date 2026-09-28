"use client";
import { useEffect } from "react";

const CSS = `
.jx{ --carte:#FCF8FA; --encre:#46394F; --encre-douce:#7A6E82; --corail:#E1806F; --corail-clair:#F0AFA1; --miel:#E4B266; --display:'Fraunces',Georgia,serif; --body:'Nunito Sans',system-ui,sans-serif; --ease:cubic-bezier(.22,.61,.36,1); color:var(--encre); font-family:var(--body); background:radial-gradient(120% 90% at 15% 0%, #F7ECE8 0%, transparent 55%),radial-gradient(120% 90% at 90% 100%, #EFE7F0 0%, transparent 50%),#EFE9F3; min-height:100dvh; line-height:1.6; padding:30px 18px 60px; }
.jx .page{max-width:560px;margin:0 auto;}
.jx .eyebrow{font-weight:700;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--corail);margin:0 0 10px;text-align:center;}
.jx h1{font-family:var(--display);font-weight:500;font-size:clamp(1.9rem,7vw,2.5rem);text-align:center;margin:0 0 8px;}
.jx .sous{text-align:center;color:var(--encre-douce);margin:0 0 30px;}
.jx .carte{background:var(--carte);border:1px solid rgba(70,57,79,.07);border-radius:20px;padding:26px 24px;margin:0 0 24px;box-shadow:0 18px 46px -32px rgba(70,57,79,.55);}
.jx h2{font-family:var(--display);font-weight:500;font-size:1.4rem;margin:0 0 6px;}
.jx .desc{color:var(--encre-douce);font-size:.95rem;margin:0 0 18px;}
.jx .q{font-weight:700;font-size:1.05rem;margin:0 0 12px;}
.jx .opts{display:flex;flex-direction:column;gap:9px;margin-bottom:8px;}
.jx .opt{text-align:left;font-family:var(--body);font-size:.98rem;color:var(--encre);background:#F4EEF3;border:1px solid rgba(70,57,79,.08);border-radius:13px;padding:12px 15px;cursor:pointer;}
.jx .opt.bonne{background:#E4F0DE;border-color:#9DBE8D;} .jx .opt.mauvaise{background:#F6E2DE;border-color:#E0A79C;}
.jx .commentaire{font-size:.93rem;color:var(--encre-douce);font-style:italic;margin:6px 0 0;}
.jx .btn{font-family:var(--body);font-weight:700;font-size:.98rem;border:none;border-radius:100px;padding:13px 24px;cursor:pointer;background:var(--corail);color:#fff;box-shadow:0 10px 22px -12px rgba(225,128,111,.8);}
.jx .btn:disabled{opacity:.5;cursor:default;}
.jx .btn-ligne{margin-top:14px;text-align:center;}
.jx .score{text-align:center;font-family:var(--display);font-size:1.5rem;color:var(--corail);margin:10px 0 6px;}
.jx .verdict{text-align:center;font-size:1rem;margin:0;}
.jx .duel{margin-bottom:18px;} .jx .duel .choix{display:flex;gap:8px;flex-wrap:wrap;}
.jx .duel .choix button{flex:1;min-width:90px;font-family:var(--body);font-weight:600;font-size:.92rem;background:#F4EEF3;border:1px solid rgba(70,57,79,.1);border-radius:100px;padding:10px 12px;cursor:pointer;color:var(--encre);}
.jx .duel .choix button.actif{background:var(--corail);color:#fff;border-color:var(--corail);}
.jx .duel .resultat{font-size:.9rem;color:var(--encre-douce);margin-top:7px;font-style:italic;}
.jx .qui-joue{display:flex;gap:8px;justify-content:center;margin-bottom:20px;}
.jx .qui-joue button{font-family:var(--body);font-weight:700;font-size:.92rem;border-radius:100px;padding:9px 20px;cursor:pointer;border:1px solid rgba(70,57,79,.15);background:#F4EEF3;color:var(--encre);}
.jx .qui-joue button.actif{background:var(--corail);color:#fff;border-color:var(--corail);}
.jx .qds-etat{background:#FBF2F0;border-radius:13px;padding:13px 15px;font-size:.95rem;margin-bottom:12px;}
.jx .qds-reponse{background:#F4ECF2;border-radius:13px;padding:13px 15px;margin-bottom:10px;font-size:.97rem;}
.jx .qds-reponse .a{font-weight:700;color:var(--corail);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em;}
.jx textarea{width:100%;border:1px solid rgba(70,57,79,.16);border-radius:13px;padding:12px 14px;font-family:var(--body);font-size:.98rem;color:var(--encre);background:#fff;resize:vertical;min-height:80px;margin-bottom:10px;line-height:1.5;}
.jx .piece{position:fixed;top:14px;right:14px;font-size:19px;opacity:.25;cursor:pointer;z-index:10;background:none;border:none;padding:4px;}
.jx .tresor-msg{position:fixed;top:52px;right:14px;left:14px;max-width:340px;margin-left:auto;z-index:11;background:linear-gradient(135deg,#FBF3DF,#F6E7C4);border:1px solid rgba(180,140,60,.3);border-radius:14px;padding:13px 16px;font-size:.93rem;color:#6B5320;display:none;}
.jx .liens{margin-top:36px;text-align:center;font-size:.92rem;color:var(--encre-douce);} .jx .liens a{color:var(--corail);text-decoration:none;font-weight:600;}
.jx .artisan{text-align:center;font-size:.8rem;color:var(--encre-douce);opacity:.75;margin-top:24px;font-style:italic;}
.jxconf{position:fixed;inset:0;pointer-events:none;z-index:15;overflow:hidden;}
.jxconf span{position:absolute;top:-40px;animation:jxfall linear forwards;}
@keyframes jxfall{to{transform:translateY(108dvh) rotate(50deg);opacity:0;}}
`;

export default function Jeux() {
  useEffect(() => {
    const DB_URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
    const DB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";
    const hdrs = (extra) => { const h = { apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, "Content-Type": "application/json" }; for (const k in (extra || {})) h[k] = extra[k]; return h; };
    const dbLire = (t, f) => fetch(DB_URL + "/rest/v1/" + t + "?" + (f || ""), { headers: hdrs() }).then((r) => r.json()).catch(() => []);
    const dbInserer = (t, d) => fetch(DB_URL + "/rest/v1/" + t, { method: "POST", headers: hdrs({ Prefer: "return=minimal" }), body: JSON.stringify(d) }).catch(() => {});
    const $ = (id) => document.getElementById(id);
    const pluie = (chars, n) => { const layer = document.createElement("div"); layer.className = "jxconf"; for (let i = 0; i < n; i++) { const s = document.createElement("span"); s.textContent = chars[Math.floor(Math.random() * chars.length)]; s.style.left = Math.random() * 100 + "vw"; s.style.fontSize = (15 + Math.random() * 14) + "px"; s.style.animationDuration = (2.6 + Math.random() * 2.4) + "s"; s.style.animationDelay = (Math.random() * .6) + "s"; layer.appendChild(s); } document.body.appendChild(layer); setTimeout(() => layer.remove(), 7000); };

    const quiz = [
      { q: "Où est-ce qu'on s'est parlé pour la toute première fois ?", opts: ["Sur Snapchat", "Sur Instagram", "À une soirée", "Dans une autre vie"], bonne: 0, com: "Un ajout Snap. La meilleure décision de nos deux téléphones." },
      { q: "Quel jour je t'ai vue pour la première fois en vrai ?", opts: ["Le 14 février 2020", "Le 1er janvier 2020", "Le 15 juillet 2020", "Un mardi quelconque"], bonne: 1, com: "Premier jour de l'année. Meilleure résolution de ma vie." },
      { q: "Dans quelle ville ?", opts: ["Paris", "Barcelone", "Lyon", "Monaco"], bonne: 2, com: "Lyon. Depuis, cette ville a un statut spécial dans mon cœur." },
      { q: "Que s'est-il passé le 15 juillet 2023 ?", opts: ["On a raté un avion", "On a parlé toute la nuit", "On a gagné au loto", "Rien, journée normale"], bonne: 1, com: "On s'est tout dit jusqu'au lever du soleil. La plus grande nuit blanche de l'histoire." },
      { q: "Lequel de ces endroits on n'a PAS encore visité ensemble ?", opts: ["Monaco", "Malte", "Barcelone", "Tokyo"], bonne: 3, com: "Pas encore. Note bien le « encore »." },
      { q: "Quand je bosse, je pense à…", opts: ["Mon code", "Toi", "Ma pause déjeuner", "Rien, je suis concentré"], bonne: 1, com: "Bug connu depuis des années. Correctif refusé définitivement." },
      { q: "Qu'est-ce qui fait briller tes yeux presque autant que moi ?", opts: ["Les fleurs", "Les papillons", "Les billets", "Les couchers de soleil"], bonne: 2, com: "On se dit tout ici. Et je t'aime aussi pour ça. 💸" },
      { q: "Combien de temps je compte te garder ?", opts: ["Encore quelques années", "Jusqu'à la retraite", "Le temps que ça dure", "L'infini, et on renégociera à la fin"], bonne: 3, com: "Contrat signé le 1er janvier 2020. Sans clause de sortie." },
    ];
    let qi = 0, score = 0; const quizZone = $("jxQuizZone");
    const montrerQuestion = () => {
      quizZone.innerHTML = ""; if (qi >= quiz.length) { montrerScore(); return; }
      const item = quiz[qi]; const q = document.createElement("p"); q.className = "q"; q.textContent = (qi + 1) + "/" + quiz.length + ", " + item.q; quizZone.appendChild(q);
      const opts = document.createElement("div"); opts.className = "opts";
      item.opts.forEach((o, idx) => { const b = document.createElement("button"); b.className = "opt"; b.textContent = o; b.addEventListener("click", () => { if (quizZone.dataset.repondu) return; quizZone.dataset.repondu = "1"; opts.children[item.bonne].classList.add("bonne"); if (idx === item.bonne) score++; else b.classList.add("mauvaise"); const c = document.createElement("p"); c.className = "commentaire"; c.textContent = item.com; quizZone.appendChild(c); const suite = document.createElement("div"); suite.className = "btn-ligne"; const sb = document.createElement("button"); sb.className = "btn"; sb.textContent = (qi < quiz.length - 1) ? "Question suivante" : "Mon score"; sb.addEventListener("click", () => { qi++; delete quizZone.dataset.repondu; montrerQuestion(); }); suite.appendChild(sb); quizZone.appendChild(suite); }); opts.appendChild(b); });
      quizZone.appendChild(opts);
    };
    const montrerScore = () => {
      const s = document.createElement("p"); s.className = "score"; s.textContent = score + " / " + quiz.length;
      const v = document.createElement("p"); v.className = "verdict";
      if (score === quiz.length) { v.textContent = "Perfection. Évidemment. Viens réclamer ton bisou d'excellence, il est déjà prêt."; pluie(["🤍", "✨", "🩷"], 24); }
      else if (score >= 6) v.textContent = "Très fort. Les points perdus seront révisés ensemble, en tête-à-tête, conditions à définir.";
      else if (score >= 4) v.textContent = "Hmm. Correct, mais je vais devoir te raconter notre histoire plus souvent. Quel dommage. Vraiment.";
      else v.textContent = "Bon. On reprend tout depuis le début : il était une fois un ajout Snap…";
      quizZone.appendChild(s); quizZone.appendChild(v);
      const r = document.createElement("div"); r.className = "btn-ligne"; const rb = document.createElement("button"); rb.className = "btn"; rb.textContent = "Rejouer"; rb.addEventListener("click", () => { qi = 0; score = 0; montrerQuestion(); }); r.appendChild(rb); quizZone.appendChild(r);
      dbInserer("quiz_resultats", { score, total: quiz.length });
    };
    montrerQuestion();

    // machine à sous
    (function () { const sym = ["🍒", "💎", "🔔", "⭐", "🍀", "💰"]; const slotBtn = $("jxSlotBtn"), verdict = $("jxSlotVerdict"); let enCours = false; slotBtn.addEventListener("click", () => { if (enCours) return; enCours = true; verdict.textContent = ""; const duree = [900, 1400, 2000]; [0, 1, 2].forEach((i) => { const el = $("jxr" + i); const fin = Date.now() + duree[i]; const tour = setInterval(() => { el.textContent = sym[Math.floor(Math.random() * sym.length)]; if (Date.now() >= fin) { clearInterval(tour); el.textContent = "🤍"; if (i === 2) setTimeout(() => { verdict.textContent = "🎉 JACKPOT : 🤍🤍🤍, tu m'as gagné, moi. Le plus gros lot de la maison, et il est déjà à toi."; pluie(["🤍", "💰", "🪙", "✨", "💗"], 40); enCours = false; }, 300); } }, 80); }); }); })();

    // pierre-feuille-ciseaux
    (function () { const emoji = { pierre: "✊", feuille: "✋", ciseaux: "✌️" }; const bat = { pierre: "ciseaux", feuille: "pierre", ciseaux: "feuille" }; const verdict = $("jxPfcVerdict"), scoreEl = $("jxPfcScore"); let sc; try { sc = JSON.parse(localStorage.getItem("pfc_score") || '{"toi":0,"site":0}'); } catch (e) { sc = { toi: 0, site: 0 }; } const maj = () => { scoreEl.textContent = "Score : toi " + sc.toi + ", le site " + sc.site + ". Le perdant fait la vaisselle. C'est la règle, je l'ai écrite."; }; maj(); document.querySelectorAll("[data-pfc]").forEach((b) => b.addEventListener("click", () => { const ct = b.dataset.pfc; const opts = ["pierre", "feuille", "ciseaux"]; const cs = opts[Math.floor(Math.random() * 3)]; let txt = "Toi " + emoji[ct] + " contre " + emoji[cs] + ", "; if (ct === cs) txt += "égalité. On rejoue, personne n'échappe à la vaisselle comme ça."; else if (bat[ct] === cs) { sc.toi++; txt += "gagné ! La vaisselle est pour l'autre. Savoure."; pluie(["✨", "🤍"], 8); } else { sc.site++; txt += "perdu. Les gants t'attendent. Courage, mon amour."; } verdict.textContent = txt; try { localStorage.setItem("pfc_score", JSON.stringify(sc)); } catch (e) {} maj(); })); })();

    // qui de nous deux + joueur partagé
    let joueur = "elle";
    const quiJoue = $("jxQuiJoue");
    quiJoue.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { quiJoue.querySelectorAll("button").forEach((x) => x.classList.remove("actif")); b.classList.add("actif"); joueur = b.dataset.a; }));
    const duels = [{ id: "tetu", q: "Qui est le plus têtu ?" }, { id: "retard", q: "Qui est le plus souvent en retard ?" }, { id: "dodo", q: "Qui s'endort en premier devant un drama ?" }, { id: "debat", q: "Qui gagne les débats (officiellement) ?" }, { id: "gourmand", q: "Qui est le plus gourmand ?" }, { id: "argent", q: "Qui aime le plus l'argent ? (question piège)" }];
    const duelZone = $("jxDuelZone");
    duels.forEach((d) => { const w = document.createElement("div"); w.className = "duel"; const q = document.createElement("p"); q.className = "q"; q.textContent = d.q; const ch = document.createElement("div"); ch.className = "choix"; const res = document.createElement("p"); res.className = "resultat"; ["Elle", "Mathieu", "Les deux"].forEach((o) => { const b = document.createElement("button"); b.textContent = o; b.addEventListener("click", () => { ch.querySelectorAll("button").forEach((x) => x.classList.remove("actif")); b.classList.add("actif"); dbInserer("qui_de_nous", { question_id: d.id, auteur: joueur, choix: o }).then(majResultat); }); ch.appendChild(b); }); const majResultat = () => { dbLire("qui_de_nous", "question_id=eq." + d.id + "&order=created_at.desc").then((rows) => { const dernier = {}; (rows || []).forEach((r) => { if (!dernier[r.auteur]) dernier[r.auteur] = r.choix; }); if (dernier.elle && dernier.mathieu) { res.textContent = dernier.elle === dernier.mathieu ? "Verdict : vous dites pareil (« " + dernier.elle + " »). Rare moment d'unanimité, à encadrer." : "Divergence détectée : elle dit « " + dernier.elle + " », Mathieu dit « " + dernier.mathieu + " ». Débat obligatoire au prochain dîner."; } else if (dernier.elle || dernier.mathieu) res.textContent = (dernier.elle ? "Elle a" : "Mathieu a") + " répondu. On attend l'autre pour le verdict…"; }); }; majResultat(); w.appendChild(q); w.appendChild(ch); w.appendChild(res); duelZone.appendChild(w); });

    // question du dimanche
    const qdsListe = ["C'était quoi ton moment préféré de la semaine ?", "Une chose que l'autre a faite cette semaine et qui t'a fait sourire ?", "Si on partait demain matin, tu choisis quelle ville ?", "Un truc que tu n'as jamais osé me demander ?", "Qu'est-ce qui t'a manqué cette semaine ?", "On gagne 10 000 € aujourd'hui : on en fait quoi ? (réponse attendue avec impatience)", "Quel souvenir de nous tu rejouerais ce soir si tu pouvais ?", "Une chose que tu veux qu'on fasse avant la fin de l'année ?", "Qu'est-ce que je fais qui te rend fière de nous ?", "Si notre histoire était un film, il s'appellerait comment ?", "Le petit détail de l'autre que tu ne dis jamais à voix haute ?", "De quoi tu as envie pour nous, là, maintenant ?"];
    const numSemaine = () => { const d = new Date(); const debut = new Date(d.getFullYear(), 0, 1); const s = Math.ceil(((d - debut) / 86400000 + debut.getDay() + 1) / 7); return d.getFullYear() + "-S" + s; };
    const semaine = numSemaine(); const idxQ = parseInt(semaine.split("S")[1], 10) % qdsListe.length; $("jxQdsQuestion").textContent = qdsListe[idxQ]; const qdsZone = $("jxQdsZone");
    const chargerQds = () => { qdsZone.innerHTML = ""; dbLire("qds", "semaine=eq." + semaine + "&order=created_at.asc").then((rows) => { const dernier = {}; (rows || []).forEach((r) => { dernier[r.auteur] = r.texte; }); if (dernier.elle && dernier.mathieu) { ["elle", "mathieu"].forEach((a) => { const d = document.createElement("div"); d.className = "qds-reponse"; d.innerHTML = '<div class="a">' + (a === "elle" ? "Elle" : "Mathieu") + "</div>"; const t = document.createElement("div"); t.textContent = dernier[a]; d.appendChild(t); qdsZone.appendChild(d); }); const f = document.createElement("p"); f.className = "desc"; f.textContent = "Les deux réponses sont là. Nouvelle question dimanche prochain."; qdsZone.appendChild(f); return; } const moi = joueur; if (dernier[moi]) { const e = document.createElement("div"); e.className = "qds-etat"; e.textContent = "Ta réponse est déposée 🤍 Elle se dévoilera quand l'autre aura répondu aussi."; qdsZone.appendChild(e); return; } if (dernier.elle || dernier.mathieu) { const e2 = document.createElement("div"); e2.className = "qds-etat"; e2.textContent = (dernier.elle ? "Elle a" : "Mathieu a") + " déjà répondu… sa réponse t'attend derrière la tienne."; qdsZone.appendChild(e2); } const ta = document.createElement("textarea"); ta.placeholder = "Ta réponse, sans filtre…"; const b = document.createElement("button"); b.className = "btn"; b.textContent = "Je dépose ma réponse"; b.addEventListener("click", () => { const t = ta.value.trim(); if (!t) return; b.disabled = true; dbInserer("qds", { semaine, auteur: joueur, texte: t }).then(chargerQds); }); qdsZone.appendChild(ta); qdsZone.appendChild(b); }); };
    chargerQds();

    // dico
    const chargerDico = () => { const z = $("jxDicoZone"); dbLire("dico", "order=created_at.asc").then((rows) => { z.innerHTML = ""; (rows || []).forEach((m) => { const d = document.createElement("div"); d.className = "qds-reponse"; d.innerHTML = '<div class="a"></div><div></div>'; d.querySelector(".a").textContent = m.mot; d.children[1].textContent = m.definition; z.appendChild(d); }); const im = document.createElement("input"); im.type = "text"; im.placeholder = "Le mot ou l'expression"; im.style.cssText = "width:100%;border:1px solid rgba(70,57,79,.16);border-radius:13px;padding:12px 14px;font-family:inherit;font-size:.98rem;margin-bottom:8px;"; const ta = document.createElement("textarea"); ta.placeholder = "Sa définition officielle…"; ta.style.minHeight = "52px"; const b = document.createElement("button"); b.className = "btn"; b.textContent = "Ajouter au dictionnaire"; b.addEventListener("click", () => { const mot = im.value.trim(), def = ta.value.trim(); if (!mot || !def) return; b.disabled = true; dbInserer("dico", { mot, definition: def, auteur: joueur }).then(chargerDico); }); z.appendChild(im); z.appendChild(ta); z.appendChild(b); }); };
    chargerDico();

    // arbitre
    const statsArbitre = () => { dbLire("arbitre", "select=choix").then((rows) => { rows = rows || []; let e = 0, m = 0; rows.forEach((r) => { if (r.choix === "elle") e++; else m++; }); if (rows.length) $("jxArbStats").textContent = "Historique : elle a décidé " + e + " fois, Mathieu " + m + " fois. L'arbitre veille à l'équilibre."; }); };
    statsArbitre();
    $("jxArbBtn").addEventListener("click", () => { const sujet = $("jxArbSujet").value.trim() || "la décision du soir"; dbLire("arbitre", "select=choix&order=created_at.desc&limit=6").then((rows) => { rows = rows || []; let e = 0, m = 0; rows.forEach((r) => { if (r.choix === "elle") e++; else m++; }); let pElle = 0.5 + (m - e) * 0.12; pElle = Math.max(0.12, Math.min(0.88, pElle)); const gagnant = Math.random() < pElle ? "elle" : "mathieu"; dbInserer("arbitre", { choix: gagnant, sujet }); const v = $("jxArbVerdict"); v.textContent = "⚖️ Verdict pour « " + sujet + "» : c'est " + (gagnant === "elle" ? "ELLE" : "MATHIEU") + " qui décide. Sans appel. Le perdant a droit à un câlin de consolation."; v.style.display = "block"; pluie(["⚖️", "✨"], 10); setTimeout(statsArbitre, 400); }); });

    // gratitude
    const chargerGrat = () => { const z = $("jxGratZone"); dbLire("gratitudes", "order=created_at.desc").then((rows) => { z.innerHTML = ""; rows = rows || []; const c = document.createElement("p"); c.className = "desc"; c.textContent = rows.length ? ("Le pot contient " + rows.length + " merci" + (rows.length > 1 ? "s" : "") + ". Il déborde ? Parfait, c'est le but.") : "Le pot est vide. Quelqu'un doit commencer. Pas de pression. (Un peu de pression.)"; z.appendChild(c); rows.slice(0, 6).forEach((g) => { const d = document.createElement("div"); d.className = "qds-reponse"; d.innerHTML = '<div class="a">' + (g.auteur === "elle" ? "Elle" : "Mathieu") + "</div>"; const t = document.createElement("div"); t.textContent = "Merci pour " + g.texte; d.appendChild(t); z.appendChild(d); }); const ta = document.createElement("textarea"); ta.placeholder = "Merci pour… (complète la phrase)"; ta.style.minHeight = "52px"; const b = document.createElement("button"); b.className = "btn"; b.textContent = "Je le mets dans le pot"; b.addEventListener("click", () => { const t = ta.value.trim(); if (!t) return; b.disabled = true; dbInserer("gratitudes", { auteur: joueur, texte: t }).then(chargerGrat); }); z.appendChild(ta); z.appendChild(b); }); };
    chargerGrat();

    // lettre infinie
    const chargerLI = () => { const z = $("jxLiZone"); dbLire("lettre_infinie", "order=created_at.asc").then((rows) => { z.innerHTML = ""; if (!rows) rows = []; const td = document.createElement("div"); td.style.cssText = "background:#FBF6F1;border-radius:14px;padding:16px 18px;margin-bottom:12px;font-family:var(--display);font-size:1.05rem;line-height:1.8;"; rows.forEach((r) => { const s = document.createElement("span"); s.textContent = r.texte + " "; s.style.color = (r.auteur === "elle") ? "#B05A7A" : "#46394F"; td.appendChild(s); }); z.appendChild(td); const leg = document.createElement("p"); leg.className = "desc"; leg.innerHTML = '<span style="color:#46394F;">■</span> Mathieu · <span style="color:#B05A7A;">■</span> elle · ' + rows.length + " phrase" + (rows.length > 1 ? "s" : "") + " pour l'instant"; z.appendChild(leg); const dernierAuteur = rows.length ? rows[rows.length - 1].auteur : null; if (dernierAuteur === joueur) { const a = document.createElement("p"); a.className = "desc"; a.textContent = "La dernière phrase est de toi. C'est à l'autre d'écrire la suite : chacun son tour, c'est la règle."; z.appendChild(a); return; } const ta = document.createElement("textarea"); ta.placeholder = "La phrase suivante (une seule, choisis-la bien)…"; ta.style.minHeight = "58px"; const b = document.createElement("button"); b.className = "btn"; b.textContent = "Ajouter ma phrase"; b.addEventListener("click", () => { const t = ta.value.trim(); if (!t) return; b.disabled = true; dbInserer("lettre_infinie", { auteur: joueur, texte: t }).then(chargerLI); }); z.appendChild(ta); z.appendChild(b); }); };
    chargerLI();
    quiJoue.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => setTimeout(chargerLI, 50)));

    // pièce d'or
    const piece = $("jxPiece"), msg = $("jxTresor");
    piece.addEventListener("click", () => { piece.style.display = "none"; if (navigator.vibrate) navigator.vibrate(30); dbInserer("tresor", { piece: "jeux" }).then(() => dbLire("tresor", "select=piece")).then((rows) => { const u = {}; (rows || []).forEach((r) => { u[r.piece] = 1; }); const n = Object.keys(u).length; if (n >= 3) { msg.textContent = "🏆 3 pièces sur 3 ! Trésor complet. Va dire « jackpot » à Mathieu : il te doit une vraie récompense, et il sait très bien laquelle."; pluie(["🪙", "💰", "✨"], 28); } else msg.textContent = "🪙 Une pièce dorée ! (" + n + "/3) Les autres sont cachées ailleurs… une par page, ouvre l'œil."; msg.style.display = "block"; setTimeout(() => { msg.style.display = "none"; }, 9000); }); });

    const artisans = ["fait main, pour toi, depuis 2020, aujourd'hui encore.", "les jeux sont truqués : tu gagnes mon cœur à tous les coups.", "site garanti sans tricheur (sauf peut-être Mathieu au quiz).", "construit un soir où tu me manquais.", "règle n°1 : le perdant a droit à un câlin de consolation.", "relu douze fois. pensé à toi les douze fois.", "version " + (new Date().getFullYear() - 2019) + ".0 de nous. mises à jour illimitées."];
    $("jxArtisan").textContent = artisans[new Date().getDay()];
  }, []);

  return (
    <div className="jx">
      <style>{CSS}</style>
      <div className="page">
        <p className="eyebrow">rien que pour nous</p>
        <h1>Nos jeux</h1>
        <p className="sous">Interdits à toute personne qui n&apos;est pas nous.</p>

        <div className="carte"><h2>Le quiz de nous</h2><p className="desc">Huit questions. Aucune triche possible : les réponses sont dans ta mémoire (et dans mon cœur).</p><div id="jxQuizZone"></div></div>

        <div className="carte"><h2>La machine à sous de l&apos;amour 🎰</h2><p className="desc">Un clin d&apos;œil à Monaco et à ton amour des jolies choses qui brillent. Tire le levier. La maison paie toujours, ici.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", fontSize: "2.6rem", margin: "8px 0 14px" }}><span id="jxr0">🍒</span><span id="jxr1">💎</span><span id="jxr2">🔔</span></div>
          <button className="btn" id="jxSlotBtn">Tirer le levier 🎰</button>
          <p id="jxSlotVerdict" style={{ fontFamily: "var(--display)", fontSize: "1.15rem", color: "var(--corail)", marginTop: 12, minHeight: 26 }}></p></div>

        <div className="carte"><h2>Pierre-feuille-ciseaux des corvées ✊</h2><p className="desc">Pour trancher qui fait la vaisselle sans se disputer. Le perdant s&apos;exécute (en principe).</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 10 }}>
            <button className="opt" data-pfc="pierre" style={{ flex: 0, fontSize: "1.6rem", padding: "10px 16px" }}>✊</button>
            <button className="opt" data-pfc="feuille" style={{ flex: 0, fontSize: "1.6rem", padding: "10px 16px" }}>✋</button>
            <button className="opt" data-pfc="ciseaux" style={{ flex: 0, fontSize: "1.6rem", padding: "10px 16px" }}>✌️</button>
          </div>
          <p id="jxPfcVerdict" style={{ textAlign: "center", fontSize: "1rem", minHeight: 24 }}></p>
          <p className="desc" id="jxPfcScore" style={{ textAlign: "center" }}></p></div>

        <div className="carte"><h2>Qui de nous deux ?</h2><p className="desc">Réponds honnêtement. On comparera. Les désaccords se règleront autour d&apos;un dîner.</p>
          <div className="qui-joue" id="jxQuiJoue"><button data-a="elle" className="actif">C&apos;est elle qui joue</button><button data-a="mathieu">C&apos;est Mathieu</button></div>
          <div id="jxDuelZone"></div></div>

        <div className="carte"><h2>La lettre infinie</h2><p className="desc">Une lettre qu&apos;on écrit à deux, une phrase à la fois, chacun son tour. Dans dix ans, ce sera notre livre.</p><div id="jxLiZone"></div></div>

        <div className="carte"><h2>Le dictionnaire de nous 📖</h2><p className="desc">Notre langue privée, mot par mot. Chaque couple a la sienne : la nôtre mérite un dictionnaire officiel.</p><div id="jxDicoZone"></div></div>

        <div className="carte"><h2>L&apos;arbitre du soir ⚖️</h2><p className="desc">Qui choisit le film ? Le resto ? Le drama ? L&apos;arbitre tranche, et il a de la mémoire : il rééquilibre tout seul.</p>
          <input type="text" id="jxArbSujet" placeholder="On décide quoi ? (ex : le film de ce soir)" style={{ width: "100%", border: "1px solid rgba(70,57,79,.16)", borderRadius: 13, padding: "12px 14px", fontFamily: "inherit", fontSize: ".98rem", marginBottom: 10 }} />
          <button className="btn" id="jxArbBtn">Tranche pour nous</button>
          <p id="jxArbVerdict" style={{ fontFamily: "var(--display)", fontSize: "1.15rem", color: "var(--corail)", marginTop: 12, display: "none" }}></p>
          <p className="desc" id="jxArbStats" style={{ marginTop: 8 }}></p></div>

        <div className="carte"><h2>Le pot de gratitude 🫙</h2><p className="desc">On y dépose des « merci pour… ». Le pot ne se vide jamais. Les jours gris, on vient piocher dedans.</p><div id="jxGratZone"></div></div>

        <div className="carte"><h2>La question du dimanche</h2><p className="desc">Une question par semaine. Les réponses ne se dévoilent que quand on a répondu tous les deux.</p><p className="q" id="jxQdsQuestion"></p><div id="jxQdsZone"></div></div>

        <p className="liens"><a href="/">⌂ accueil</a> · d&apos;autres portes : <a href="/surprise">pour toi</a> · <a href="/histoire">notre histoire</a></p>
        <p className="artisan" id="jxArtisan"></p>
      </div>
      <button className="piece" id="jxPiece" aria-label="une pièce dorée">🪙</button>
      <div className="tresor-msg" id="jxTresor"></div>
    </div>
  );
}
