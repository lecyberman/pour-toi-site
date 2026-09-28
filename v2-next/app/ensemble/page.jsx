"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const CSS = `
.ens{ color:#EDE9F3; font-family:'Nunito Sans',system-ui,sans-serif; background:radial-gradient(120% 80% at 50% -8%, #271f45 0%, transparent 55%),radial-gradient(90% 60% at 88% 108%, #1d2246 0%, transparent 60%),#0d0b1a; min-height:100dvh; }
.ens .wrap{ max-width:600px; margin:0 auto; padding:max(24px,env(safe-area-inset-top)) 22px 90px; }
.ens a.retour{ display:inline-block; font-size:.9rem; color:rgba(237,233,243,.72); text-decoration:none; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:100px; padding:7px 14px; margin-bottom:20px; }
.ens .tete{ text-align:center; margin-bottom:8px; }
.ens .eyebrow{ font-family:'Fraunces',serif; font-style:italic; color:#C7B2E6; font-size:1.06rem; margin:0 0 .3rem; }
.ens h1{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.9rem,7vw,2.7rem); margin:0; color:#FBF4EA; }
.ens .presence{ text-align:center; margin:16px 0 20px; padding:12px 16px; border-radius:16px; background:rgba(255,255,255,.04); border:1px solid rgba(180,155,218,.2); font-size:1rem; color:#E4DEEE; }
.ens .presence .dot{ display:inline-block; width:9px; height:9px; border-radius:50%; margin-right:6px; vertical-align:middle; }
.ens .on2{ color:#CBB4EC; font-weight:700; }
.ens .role-choix{ text-align:center; } .ens .role-choix p{ color:#C9C1D8; margin:.4rem 0 14px; } .ens .rrow{ display:flex; gap:10px; justify-content:center; }
.ens .btn{ font-family:'Nunito Sans',sans-serif; font-weight:700; font-size:.95rem; border-radius:100px; padding:12px 22px; cursor:pointer; border:1px solid transparent; }
.ens .btn.p{ color:#1a1430; background:linear-gradient(180deg,#CBB4EC,#A886DA); box-shadow:0 10px 26px -12px rgba(168,134,218,.8); }
.ens .btn.g{ color:#EDE9F3; background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.16); }
.ens .menu{ display:flex; flex-direction:column; gap:12px; }
.ens .jeu{ text-align:left; width:100%; cursor:pointer; color:#EDE9F3; background:rgba(255,255,255,.045); border:1px solid rgba(180,155,218,.22); border-radius:18px; padding:18px; display:flex; align-items:center; gap:15px; }
.ens .jeu .em{ font-size:1.7rem; } .ens .jeu .tt{ font-family:'Fraunces',serif; font-weight:500; font-size:1.2rem; color:#FBF4EA; } .ens .jeu .ss{ color:#A99CC4; font-size:.88rem; margin-top:2px; }
.ens .vue{ display:none; } .ens .vue.on{ display:block; }
.ens .barre{ display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.ens .lienretour{ cursor:pointer; color:#C7B2E6; font-size:.9rem; background:none; border:none; }
.ens .info{ text-align:center; color:#B4A9C8; font-size:.95rem; min-height:1.3em; margin-bottom:10px; }
.ens .grille{ display:grid; grid-template-columns:repeat(3,1fr); gap:8px; max-width:300px; margin:0 auto; }
.ens .cell{ aspect-ratio:1; background:rgba(255,255,255,.05); border:1px solid rgba(180,155,218,.25); border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:2.2rem; cursor:pointer; }
.ens .main-zone{ text-align:center; }
.ens .jauge{ height:22px; background:rgba(255,255,255,.08); border-radius:100px; overflow:hidden; margin:16px 0; border:1px solid rgba(180,155,218,.2); }
.ens .jauge > div{ height:100%; width:0%; background:linear-gradient(90deg,#8E6FBF,#E9DEF7); transition:width .12s linear; }
.ens .mains-etat{ display:flex; justify-content:space-around; margin:10px 0; font-size:.95rem; color:#B4A9C8; }
.ens .grosbtn{ font-size:1.1rem; padding:18px 28px; border-radius:100px; user-select:none; touch-action:none; }
.ens .bulle{ background:rgba(142,111,191,.14); border:1px solid rgba(199,178,230,.3); border-radius:16px; padding:14px 16px; min-height:3em; color:#E9DEF7; line-height:1.6; white-space:pre-wrap; margin-bottom:12px; }
.ens .bulle .lbl{ display:block; color:#A99CC4; font-size:.82rem; margin-bottom:4px; }
.ens textarea{ width:100%; background:rgba(255,255,255,.05); color:#F2ECFB; border:1px solid rgba(180,155,218,.3); border-radius:14px; padding:12px 14px; font-family:'Nunito Sans'; font-size:16px; line-height:1.6; min-height:70px; resize:vertical; }
.ens .attente{ text-align:center; color:#8E82A6; font-size:.9rem; margin-top:18px; line-height:1.6; }
.ens .chg{ text-align:center; margin:-6px 0 14px; } .ens .chg button{ background:none; border:none; color:#8E82A6; font-size:.82rem; cursor:pointer; text-decoration:underline; }
.ens .puce{ cursor:pointer; font-size:.92rem; color:#EDE9F3; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14); border-radius:100px; padding:9px 15px; }
.ens .choix{ display:flex; flex-wrap:wrap; gap:8px; }
#btnCoeur{ position:fixed; right:16px; bottom:calc(18px + env(safe-area-inset-bottom,0px)); z-index:8; width:58px; height:58px; border-radius:50%; border:1px solid rgba(199,178,230,.5); background:rgba(24,22,46,.82); color:#fff; font-size:1.6rem; cursor:pointer; }
.coeurFly{ position:fixed; z-index:9; pointer-events:none; font-size:2rem; animation:ensFly 2.2s ease-out forwards; }
@keyframes ensFly{ 0%{ transform:translateY(0) scale(.6); opacity:0; } 15%{ opacity:1; } 100%{ transform:translateY(-72vh) scale(1.3) rotate(12deg); opacity:0; } }
.ens #toile{ width:100%; height:54vh; max-height:420px; background:rgba(255,255,255,.05); border:1px solid rgba(180,155,218,.25); border-radius:16px; touch-action:none; display:block; cursor:crosshair; }
.ens .bulle-resp{ width:120px; height:120px; border-radius:50%; margin:34px auto 18px; background:radial-gradient(circle at 50% 40%, #C7B2E6, #8E6FBF 60%, rgba(142,111,191,0) 75%); box-shadow:0 0 50px -6px rgba(142,111,191,.6); transition:transform .12s linear; }
.ens .txt-resp{ font-family:'Fraunces',serif; font-style:italic; color:#C7B2E6; font-size:1.2rem; min-height:1.4em; text-align:center; }
.ens .boite-liste{ display:flex; flex-direction:column; gap:8px; max-height:50vh; overflow:auto; margin-bottom:14px; }
.ens .mot-item{ background:rgba(255,255,255,.05); border:1px solid rgba(180,155,218,.2); border-radius:14px; padding:10px 14px; color:#E4DEEE; line-height:1.5; }
.ens .mot-item.mine{ background:rgba(142,111,191,.16); border-color:rgba(199,178,230,.35); }
.ens .mot-auteur{ display:block; color:#A99CC4; font-size:.78rem; margin-bottom:2px; }
.ens .boite-form{ display:flex; gap:8px; }
.ens input.t{ flex:1; background:rgba(255,255,255,.05); color:#F2ECFB; border:1px solid rgba(180,155,218,.3); border-radius:100px; padding:11px 16px; font-family:'Nunito Sans',sans-serif; font-size:16px; }
.ens .bat-zone{ text-align:center; padding-top:26px; }
.ens .coeur-bat{ font-size:5.6rem; line-height:1; cursor:pointer; user-select:none; display:inline-block; transition:transform .12s cubic-bezier(.3,0,.3,1); filter:drop-shadow(0 0 26px rgba(214,90,120,.55)); }
.ens .coeur-bat.pulse{ transform:scale(1.32); }
.ens .bat-msg{ color:#B4A9C8; margin-top:18px; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto; }
.ens .meteo-deux{ display:flex; gap:12px; justify-content:center; margin-bottom:12px; }
.ens .meteo-bloc{ flex:1; max-width:180px; background:rgba(255,255,255,.05); border:1px solid rgba(180,155,218,.2); border-radius:16px; padding:14px; text-align:center; }
.ens .meteo-e{ font-size:2.4rem; line-height:1; } .ens .meteo-l{ font-family:'Fraunces',serif; color:#C7B2E6; margin-top:6px; } .ens .meteo-m{ color:#A99CC4; font-size:.85rem; margin-top:2px; }
.snap-ov{ position:fixed; inset:0; z-index:70; background:rgba(10,8,20,.88); display:flex; align-items:center; justify-content:center; padding:24px; backdrop-filter:blur(6px); }
.snap-card{ max-width:420px; width:100%; background:rgba(24,22,46,.96); border:1px solid rgba(199,178,230,.4); border-radius:20px; padding:24px; text-align:center; cursor:pointer; }
.snap-hd{ font-family:'Fraunces',serif; font-style:italic; color:#C7B2E6; margin-bottom:12px; }
.snap-body{ color:#F2ECFB; font-size:1.2rem; line-height:1.7; min-height:3em; display:flex; align-items:center; justify-content:center; }
.snap-bar{ height:4px; background:rgba(255,255,255,.1); border-radius:100px; margin-top:16px; overflow:hidden; }
.snap-bar>div{ height:100%; width:100%; background:linear-gradient(90deg,#8E6FBF,#E9DEF7); }
`;

export default function Ensemble() {
  useEffect(() => {
    const NOMS = { elle: "dadoucherie", lui: "Mathieu" };
    const $ = (id) => document.getElementById(id);
    const roleChoix = $("ensRoleChoix"), appli = $("ensAppli");
    let role = null, client = supabase, canal = null, autrePresent = false;
    let handler = null, onPresence = null;
    const buzz = (m) => { try { if (navigator.vibrate) navigator.vibrate(m || 14); } catch (e) {} };
    const menu = $("ensMenu"), vue = $("ensVue"), zone = $("ensZone"), info = $("ensInfo"), rejouer = $("ensRejouer");

    const popCoeur = () => { const h = document.createElement("span"); h.className = "coeurFly"; h.textContent = ["💗", "💖", "🤍", "💜", "❤️"][Math.floor(Math.random() * 5)]; h.style.left = (8 + Math.random() * 84) + "vw"; h.style.bottom = "10vh"; document.body.appendChild(h); setTimeout(() => h.remove(), 2300); };
    const montrerSnap = (texte) => {
      const ov = document.createElement("div"); ov.className = "snap-ov";
      ov.innerHTML = '<div class="snap-card"><div class="snap-hd">Un snap de ' + NOMS[role === "elle" ? "lui" : "elle"] + ' 👻</div><div class="snap-body" id="ensSnapBody">appuie pour lire…</div><div class="snap-bar"><div id="ensSnapBar"></div></div></div>';
      document.body.appendChild(ov); let lu = false;
      ov.addEventListener("click", () => { if (!lu) { lu = true; $("ensSnapBody").textContent = texte; buzz(20); const bar = $("ensSnapBar"); bar.style.transition = "width 6s linear"; requestAnimationFrame(() => { bar.style.width = "0%"; }); setTimeout(() => { if (ov.parentNode) ov.remove(); }, 6100); } else ov.remove(); });
    };
    const envoyer = (p) => { p.from = role; canal.send({ type: "broadcast", event: "jeu", payload: p }); };
    const recevoir = (p) => { if (p.from === role) return; if (p.game === "coeur") { popCoeur(); return; } if (p.game === "snap") { montrerSnap(p.texte); return; } if (typeof handler === "function") handler(p); };
    const rolesEnLigne = () => { try { return Object.keys(canal.presenceState()); } catch (e) { return []; } };
    const majPresence = () => {
      const en = rolesEnLigne(); autrePresent = en.indexOf(role === "elle" ? "lui" : "elle") > -1;
      const pres = $("ensPresence"); const moiNom = NOMS[role], autreNom = NOMS[role === "elle" ? "lui" : "elle"];
      if (autrePresent) pres.innerHTML = '<span class="dot" style="background:#8ee6a0"></span> Vous êtes <span class="on2">tous les deux là</span> 🤍, jouez en direct !';
      else pres.innerHTML = '<span class="dot" style="background:#e6c98e"></span> Toi (' + moiNom + ") es là. " + autreNom + " n'est pas encore connecté·e, dès qu'il/elle ouvre cette page, vous y serez ensemble.";
      if (typeof onPresence === "function") onPresence();
    };

    const JEUX = [
      { id: "boite", em: "💌", tt: "Notre boîte à mots", ss: "Déposez des petits mots : ils restent, pour toujours." },
      { id: "battement", em: "💓", tt: "Ton cœur, chez moi", ss: "Tape un rythme du doigt : son téléphone le ressent." },
      { id: "meteo", em: "⛅", tt: "La météo de nous", ss: "Ton humeur du moment ; l'autre la voit." },
      { id: "snap", em: "👻", tt: "Un snap", ss: "Un message qui s'affiche une fois, puis s'efface." },
      { id: "morpion", em: "❤️✦", tt: "Morpion à deux", ss: "Toi les cœurs, lui les étoiles. En direct." },
      { id: "dessin", em: "🎨", tt: "Dessinez ensemble", ss: "Un tableau partagé, vos traits en direct." },
      { id: "main", em: "🤝", tt: "Main dans la main", ss: "Tenez-vous la main en même temps." },
      { id: "respire", em: "🫧", tt: "Respirez ensemble", ss: "Une bulle synchronisée, rien qu'à vous." },
      { id: "mot", em: "✍️", tt: "Un mot en direct", ss: "Écris-lui, il te voit taper en vrai." },
    ];
    const construireMenu = () => { menu.innerHTML = ""; JEUX.forEach((j) => { const b = document.createElement("button"); b.className = "jeu"; b.type = "button"; b.innerHTML = '<span class="em">' + j.em + '</span><span><span class="tt">' + j.tt + '</span><span class="ss">' + j.ss + "</span></span>"; b.addEventListener("click", () => ouvrirJeu(j.id)); menu.appendChild(b); }); };
    $("ensRetourMenu").addEventListener("click", () => { vue.classList.remove("on"); menu.style.display = "flex"; $("ensPresence").style.display = ""; handler = null; onPresence = null; rejouer.style.display = "none"; });
    const ouvrirJeu = (id) => { menu.style.display = "none"; vue.classList.add("on"); rejouer.style.display = "none"; window.scrollTo({ top: 0, behavior: "smooth" }); ({ boite: jeuBoite, battement: jeuBattement, meteo: jeuMeteo, snap: jeuSnap, morpion: jeuMorpion, main: jeuMain, dessin: jeuDessin, respire: jeuRespire, mot: jeuMot }[id] || jeuMot)(); };

    function jeuMorpion() {
      let board = Array(9).fill(""), tour = "elle", fini = false; const MARK = { elle: "❤️", lui: "✦" };
      const rendre = () => { info.textContent = fini ? "" : (tour === role ? "À toi de jouer." : "C'est à " + NOMS[tour] + "…"); zone.innerHTML = '<div class="grille" id="ensG"></div>'; const g = $("ensG"); board.forEach((v, i) => { const c = document.createElement("div"); c.className = "cell"; c.textContent = v ? MARK[v] : ""; c.addEventListener("click", () => jouer(i)); g.appendChild(c); }); };
      const jouer = (i) => { if (fini || board[i]) return; if (tour !== role) { info.textContent = "Attends ton tour 🙂"; return; } poser(i, role); envoyer({ game: "morpion", cell: i, mark: role }); };
      const poser = (i, who) => { board[i] = who; buzz(12); const g = winner(); if (g) fini = true; else tour = (who === "elle" ? "lui" : "elle"); rendre(); if (g) { info.textContent = g === "nul" ? "Match nul 🤍 On rejoue ?" : (g === role ? "Tu as gagné ! 🎉" : NOMS[g] + " a gagné 🤍"); rejouer.style.display = ""; } };
      const winner = () => { const L = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; for (let k = 0; k < L.length; k++) { const a = L[k]; if (board[a[0]] && board[a[0]] === board[a[1]] && board[a[1]] === board[a[2]]) return board[a[0]]; } return board.every((x) => x) ? "nul" : null; };
      handler = (p) => { if (p.game === "morpion") { if (p.reset) { board = Array(9).fill(""); tour = "elle"; fini = false; rendre(); } else if (typeof p.cell === "number") poser(p.cell, p.mark); } };
      rejouer.onclick = () => { board = Array(9).fill(""); tour = "elle"; fini = false; rendre(); envoyer({ game: "morpion", reset: true }); rejouer.style.display = "none"; };
      rendre();
    }
    function jeuMain() {
      let moi = false, autre = false, fill = 0, done = false;
      zone.innerHTML = '<div class="main-zone"><div class="mains-etat"><span id="ensM1">Ta main : ✋</span><span id="ensM2">Sa main : ✋</span></div><div class="jauge"><div id="ensJb"></div></div><button class="btn p grosbtn" id="ensTenir" type="button">Tiens ma main 🤍</button><p class="attente" id="ensMmsg">Appuie et garde le doigt. Quand vous tenez tous les deux en même temps, ça se remplit.</p></div>';
      info.textContent = autrePresent ? "" : "Attends qu'il/elle soit là pour jouer ensemble.";
      const jb = $("ensJb"), m1 = $("ensM1"), m2 = $("ensM2"), mmsg = $("ensMmsg"), tenir = $("ensTenir");
      const setMoi = (v) => { if (moi === v) return; moi = v; m1.textContent = "Ta main : " + (v ? "🤝" : "✋"); envoyer({ game: "main", holding: v }); };
      tenir.addEventListener("pointerdown", (e) => { e.preventDefault(); setMoi(true); });
      ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => tenir.addEventListener(ev, () => setMoi(false)));
      handler = (p) => { if (p.game === "main") { autre = !!p.holding; m2.textContent = "Sa main : " + (autre ? "🤝" : "✋"); } };
      onPresence = () => { if (!autrePresent) { autre = false; m2.textContent = "Sa main : ✋"; } };
      const timer = setInterval(() => { if (done) return; if (moi && autre) { fill = Math.min(100, fill + 1.4); mmsg.textContent = "Vous vous tenez la main 🤍 continuez…"; } else if (fill > 0 && fill < 100) fill = Math.max(0, fill - 0.6); jb.style.width = fill + "%"; if (fill >= 100 && !done) { done = true; mmsg.textContent = "Vous l'avez rempli, ensemble. 🤍 Voilà, c'est ça, nous deux."; buzz([30, 60, 30, 60, 30]); } }, 60);
      const obs = setInterval(() => { if (!vue.classList.contains("on")) { clearInterval(timer); clearInterval(obs); setMoi(false); } }, 500);
    }
    function jeuMot() {
      zone.innerHTML = '<div class="bulle" id="ensSaBulle"><span class="lbl">' + NOMS[role === "elle" ? "lui" : "elle"] + ' écrit…</span><span id="ensSaTxt">…</span></div><textarea id="ensMonTxt" placeholder="Écris-lui quelque chose, il/elle te voit en direct…"></textarea>';
      info.textContent = "Ce que tu écris apparaît chez l'autre, lettre par lettre.";
      const monTxt = $("ensMonTxt"), saTxt = $("ensSaTxt"); let t = null;
      monTxt.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => envoyer({ game: "mot", texte: monTxt.value }), 90); });
      handler = (p) => { if (p.game === "mot") saTxt.textContent = p.texte || "…"; };
    }
    const HUMEURS = [{ e: "☀️", m: "au beau fixe" }, { e: "⛅", m: "douce" }, { e: "🌈", m: "pleine d'espoir" }, { e: "🌧️", m: "un peu grise" }, { e: "⛈️", m: "orageuse" }, { e: "🌙", m: "calme, un peu fatiguée" }, { e: "🥰", m: "amoureuse" }, { e: "🔥", m: "pleine d'énergie" }, { e: "🫧", m: "besoin de douceur" }];
    function jeuMeteo() {
      zone.innerHTML = '<div class="meteo-deux" id="ensMeteoDeux"><p class="attente">chargement…</p></div><p class="attente" style="margin:2px 0 10px">Choisis ton ciel du moment :</p><div class="choix" id="ensMeteoChoix" style="justify-content:center"></div>';
      info.textContent = "Ton humeur en un emoji. " + NOMS[role === "elle" ? "lui" : "elle"] + " la voit, et toi la sienne.";
      const deux = $("ensMeteoDeux"), ch = $("ensMeteoChoix");
      HUMEURS.forEach((h) => { const b = document.createElement("div"); b.className = "puce"; b.textContent = h.e + " " + h.m; b.addEventListener("click", () => poser(h)); ch.appendChild(b); });
      const poser = (h) => { buzz(12); client.from("meteo_humeur").upsert({ role, emoji: h.e, mot: h.m, updated_at: new Date().toISOString() }, { onConflict: "role" }).then(() => { charger(); envoyer({ game: "meteo" }); }, () => charger()); };
      const charger = () => { client.from("meteo_humeur").select("role,emoji,mot").then((res) => { const rows = (res && res.data) || [], map = {}; rows.forEach((r) => { map[r.role] = r; }); const autre = role === "elle" ? "lui" : "elle"; const bloc = (who, r) => '<div class="meteo-bloc"><div class="meteo-e">' + ((r && r.emoji) || "·") + '</div><div class="meteo-l">' + NOMS[who] + '</div><div class="meteo-m">' + ((r && r.mot) || "pas encore dit") + "</div></div>"; deux.innerHTML = bloc(role, map[role]) + bloc(autre, map[autre]); }, () => { deux.innerHTML = '<p class="attente">Connexion en cours…</p>'; }); };
      handler = (p) => { if (p.game === "meteo") charger(); }; charger();
    }
    const toast = (m) => { const t = document.createElement("div"); t.textContent = m; t.style.cssText = "position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:rgba(24,22,46,.95);border:1px solid rgba(199,178,230,.4);color:#EDE9F3;padding:12px 20px;border-radius:100px;font-size:.92rem;z-index:9"; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); };
    function jeuSnap() {
      zone.innerHTML = '<textarea id="ensSnapTxt" maxlength="300" placeholder="Un secret, une bêtise, un je t\'aime… il/elle ne le verra qu\'une seule fois."></textarea><div style="margin-top:12px"><button class="btn p" id="ensSnapSend" type="button">Envoyer le snap 👻</button></div>';
      info.textContent = autrePresent ? "Ça s'affiche une seule fois chez l'autre, puis ça disparaît. Comme au début, sur Snap." : "Attends qu'il/elle soit là, un snap ne s'envoie qu'en direct.";
      $("ensSnapSend").addEventListener("click", () => { const ta = $("ensSnapTxt"), v = (ta.value || "").trim(); if (!v) return; if (!autrePresent) { toast("Il faut être tous les deux là pour un snap 🙂"); return; } ta.value = ""; buzz(15); envoyer({ game: "snap", texte: v }); toast("Snap envoyé 👻"); });
      onPresence = () => { info.textContent = autrePresent ? "Ça s'affiche une seule fois chez l'autre, puis ça disparaît." : "Attends qu'il/elle soit là, un snap ne s'envoie qu'en direct."; };
    }
    function jeuBattement() {
      const autreNom = NOMS[role === "elle" ? "lui" : "elle"];
      zone.innerHTML = '<div class="bat-zone"><div class="coeur-bat" id="ensCbat" role="button" tabindex="0" aria-label="Tape ton rythme">💓</div><p class="bat-msg">Appuie à ton rythme, du bout du doigt. ' + autreNom + " le ressent dans sa main, en direct, comme ton cœur contre le sien.</p></div>";
      const majInfo = () => { info.textContent = autrePresent ? ("Ton cœur bat chez " + autreNom + " 🤍") : ("Dès que " + autreNom + " est là, il/elle sentira ton rythme."); }; majInfo();
      const cbat = $("ensCbat");
      const pulse = (vib) => { cbat.classList.add("pulse"); setTimeout(() => cbat.classList.remove("pulse"), 130); if (vib) buzz(45); };
      const battre = () => { pulse(false); buzz(22); envoyer({ game: "battement" }); };
      cbat.addEventListener("pointerdown", (e) => { e.preventDefault(); battre(); });
      cbat.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); battre(); } });
      handler = (p) => { if (p.game === "battement") pulse(true); }; onPresence = majInfo;
    }
    const echapMot = (s) => String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
    function jeuBoite() {
      zone.innerHTML = '<div id="ensBoiteListe" class="boite-liste"><p class="attente">chargement…</p></div><div class="boite-form"><input class="t" id="ensBoiteTxt" maxlength="500" placeholder="Un petit mot à déposer…" /><button class="btn p" id="ensBoiteAdd" type="button">Déposer 🤍</button></div>';
      info.textContent = "Chacun dépose des mots quand il veut. Ils restent, et apparaissent chez l'autre en direct.";
      const liste = $("ensBoiteListe"), champ = $("ensBoiteTxt");
      const charger = () => { client.from("boite").select("auteur,texte,created_at").order("created_at", { ascending: false }).limit(60).then((res) => { const rows = (res && res.data) || []; if (!rows.length) { liste.innerHTML = '<p class="attente">Aucun mot pour l\'instant. Dépose le premier 🤍</p>'; return; } liste.innerHTML = rows.map((r) => { const mine = r.auteur === NOMS[role]; return '<div class="mot-item ' + (mine ? "mine" : "") + '"><span class="mot-auteur">' + echapMot(r.auteur) + "</span>" + echapMot(r.texte) + "</div>"; }).join(""); }, () => { liste.innerHTML = '<p class="attente">Impossible de charger les mots. Réessaie plus tard.</p>'; }); };
      const deposer = () => { const v = (champ.value || "").trim(); if (!v) return; champ.value = ""; buzz(12); client.from("boite").insert({ auteur: NOMS[role], texte: v }).then(() => { charger(); envoyer({ game: "boite" }); }, () => charger()); };
      $("ensBoiteAdd").addEventListener("click", deposer); champ.addEventListener("keydown", (e) => { if (e.key === "Enter") deposer(); });
      handler = (p) => { if (p.game === "boite") charger(); }; charger();
    }
    function jeuDessin() {
      const COL = { elle: "#E9DEF7", lui: "#9fd0ff" };
      zone.innerHTML = '<canvas id="ensToile"></canvas><div style="margin-top:12px"><button class="btn g" id="ensEffacer" type="button">Tout effacer</button></div>';
      info.textContent = "Dessinez ensemble : tes traits apparaissent chez l'autre, en direct.";
      const cv = $("ensToile"), cx = cv.getContext("2d");
      (function fit() { const r = cv.getBoundingClientRect(); cv.width = r.width; cv.height = r.height; })();
      let drawing = false, last = null;
      const pt = (e) => { const r = cv.getBoundingClientRect(); const tt = e.touches ? e.touches[0] : e; return { x: (tt.clientX - r.left) / r.width, y: (tt.clientY - r.top) / r.height }; };
      const trait = (a, b, col) => { cx.strokeStyle = col; cx.lineWidth = 3; cx.lineCap = "round"; cx.beginPath(); cx.moveTo(a.x * cv.width, a.y * cv.height); cx.lineTo(b.x * cv.width, b.y * cv.height); cx.stroke(); };
      cv.addEventListener("pointerdown", (e) => { e.preventDefault(); drawing = true; last = pt(e); });
      cv.addEventListener("pointermove", (e) => { if (!drawing) return; const p = pt(e); trait(last, p, COL[role]); envoyer({ game: "dessin", a: last, b: p, col: COL[role] }); last = p; });
      ["pointerup", "pointercancel", "pointerleave"].forEach((ev) => cv.addEventListener(ev, () => { drawing = false; }));
      $("ensEffacer").addEventListener("click", () => { cx.clearRect(0, 0, cv.width, cv.height); envoyer({ game: "dessin", clear: true }); });
      handler = (p) => { if (p.game === "dessin") { if (p.clear) cx.clearRect(0, 0, cv.width, cv.height); else if (p.a && p.b) trait(p.a, p.b, p.col || "#fff"); } };
    }
    function jeuRespire() {
      zone.innerHTML = '<div class="main-zone"><div class="bulle-resp" id="ensBr"></div><div class="txt-resp" id="ensTr">respirez…</div><p class="attente">Même bulle, même rythme, vous respirez en même temps, où que vous soyez.</p></div>';
      info.textContent = autrePresent ? "Vous respirez ensemble 🤍" : "Respire… " + NOMS[role === "elle" ? "lui" : "elle"] + " te rejoindra.";
      const br = $("ensBr"), tr = $("ensTr"), CYCLE = 11000;
      const timer = setInterval(() => { const t = Date.now() % CYCLE; let s, txt; if (t < 4000) { s = 1 + (t / 4000) * 0.6; txt = "inspire…"; } else if (t < 6000) { s = 1.6; txt = "retiens…"; } else { s = 1.6 - ((t - 6000) / 5000) * 0.6; txt = "souffle…"; } br.style.transform = "scale(" + s.toFixed(3) + ")"; tr.textContent = txt; }, 60);
      onPresence = () => { info.textContent = autrePresent ? "Vous respirez ensemble 🤍" : "Respire… " + NOMS[role === "elle" ? "lui" : "elle"] + " te rejoindra."; };
      const obs = setInterval(() => { if (!vue.classList.contains("on")) { clearInterval(timer); clearInterval(obs); } }, 500);
    }

    const demarrer = () => {
      appli.style.display = "block";
      if (!$("btnCoeur")) { const bc = document.createElement("button"); bc.id = "btnCoeur"; bc.type = "button"; bc.setAttribute("aria-label", "Envoie-lui un cœur"); bc.textContent = "💗"; bc.addEventListener("click", () => { popCoeur(); buzz(15); envoyer({ game: "coeur" }); }); document.body.appendChild(bc); }
      const presEl = $("ensPresence");
      if (presEl && !$("ensChgRole")) { const chg = document.createElement("div"); chg.className = "chg"; chg.innerHTML = '<button type="button" id="ensChgRole">changer de rôle</button>'; presEl.insertAdjacentElement("afterend", chg); $("ensChgRole").addEventListener("click", () => { try { localStorage.removeItem("moi_role"); } catch (e) {} location.reload(); }); }
      canal = client.channel("nous-deux-live", { config: { presence: { key: role }, broadcast: { self: false } } });
      canal.on("presence", { event: "sync" }, majPresence);
      canal.on("broadcast", { event: "jeu" }, (m) => recevoir(m.payload));
      canal.subscribe((status) => { if (status === "SUBSCRIBED") { canal.track({ role, at: Date.now() }); majPresence(); } });
      construireMenu();
    };

    try { role = localStorage.getItem("moi_role"); } catch (e) {}
    if (role !== "elle" && role !== "lui") {
      roleChoix.style.display = "block";
      roleChoix.querySelectorAll("[data-role]").forEach((b) => b.addEventListener("click", () => { role = b.dataset.role; try { localStorage.setItem("moi_role", role); } catch (e) {} roleChoix.style.display = "none"; demarrer(); }));
    } else demarrer();

    return () => { try { if (canal) supabase.removeChannel(canal); } catch (e) {} const bc = document.getElementById("btnCoeur"); if (bc) bc.remove(); };
  }, []);

  return (
    <div className="ens">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wrap">
        <a className="retour" href="/surprise">⌂ rentrer</a>
        <div className="tete"><p className="eyebrow">à distance, mais en même temps</p><h1>Ensemble</h1></div>
        <div id="ensRoleChoix" className="role-choix" style={{ display: "none" }}>
          <p>Qui es-tu ?</p>
          <div className="rrow">
            <button className="btn p" data-role="elle" type="button">Moi, dadoucherie 🤍</button>
            <button className="btn g" data-role="lui" type="button">Moi, Mathieu</button>
          </div>
        </div>
        <div id="ensAppli" style={{ display: "none" }}>
          <div className="presence" id="ensPresence">connexion…</div>
          <div className="menu" id="ensMenu"></div>
          <div className="vue" id="ensVue">
            <div className="barre">
              <button className="lienretour" id="ensRetourMenu" type="button">← les jeux</button>
              <span className="lienretour" id="ensRejouer" style={{ display: "none" }}>recommencer ↺</span>
            </div>
            <div className="info" id="ensInfo"></div>
            <div id="ensZone"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
