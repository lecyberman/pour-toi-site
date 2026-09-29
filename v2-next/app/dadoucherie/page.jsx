"use client";
import { useEffect, useRef } from "react";
import { BONJOURS, BONNES_NUITS } from "@/lib/bonjours";

const CSS = `
.ddw{--brume:#EFE9F3;--brume-2:#F7ECE8;--carte:#FCF8FA;--encre:#46394F;--encre-douce:#7A6E82;--dehors:#7A6E82;--corail:#8E6FBF;--corail-clair:#F0AFA1;--miel:#E4B266;--display:'Fraunces',Georgia,serif;--body:'Nunito Sans',system-ui,sans-serif;--r:22px;--ease:cubic-bezier(.22,.61,.36,1);
  font-family:var(--body);color:var(--encre);
  background:radial-gradient(120% 90% at 15% 0%, var(--brume-2) 0%, transparent 55%),radial-gradient(120% 90% at 90% 100%, #EFE7F0 0%, transparent 50%),var(--brume);
  min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:18px 18px 40px;line-height:1.62;overflow-x:hidden;transition:background 1.2s ease;position:relative;}
.ddw.t-aube{--brume:#F6EAE4;--brume-2:#FBE3D6;--corail:#DE8A63;--corail-clair:#F2BC9C;--miel:#E8B45C;--dehors:#8A7268;background:radial-gradient(130% 80% at 50% 110%, #FBD9BC 0%, transparent 60%),radial-gradient(110% 90% at 80% 0%, #EFDDE8 0%, transparent 55%),linear-gradient(180deg,#EEE3EE 0%, #F8E6D6 100%);}
.ddw.t-matin{--brume:#EDF2E7;--brume-2:#F6EEE3;--corail:#D9836F;--corail-clair:#EFB3A3;--miel:#DFB35F;--dehors:#77806B;background:radial-gradient(120% 90% at 15% 0%, #F7F0DF 0%, transparent 55%),radial-gradient(120% 90% at 90% 100%, #E3EEDD 0%, transparent 50%),#EDF2E7;}
.ddw.t-apresmidi{--brume:#F3EBE0;--brume-2:#FAE8D8;--corail:#8E6FBF;--corail-clair:#F0AFA1;--miel:#E4A94F;--dehors:#8A7A68;background:radial-gradient(120% 90% at 20% 0%, #FBEAD3 0%, transparent 55%),radial-gradient(120% 90% at 85% 100%, #F4DFD3 0%, transparent 50%),#F3EBE0;}
.ddw.t-soir{--brume:#EFE3EC;--brume-2:#F6DEDD;--corail:#D9707E;--corail-clair:#EFA9B0;--miel:#E0A15E;--dehors:#7E687C;background:radial-gradient(130% 80% at 50% 115%, #F4C9B8 0%, transparent 55%),radial-gradient(110% 90% at 85% 0%, #D9CBE4 0%, transparent 55%),linear-gradient(180deg,#E4D5E8 0%, #F2DCD8 100%);}
.ddw.t-nuit{--brume:#2B2743;--brume-2:#3A3157;--corail:#E79BAB;--corail-clair:#B98CA8;--miel:#E5C273;--dehors:#B9AECB;--carte:#FBF7FA;--encre:#3a3157;background:radial-gradient(120% 80% at 80% 0%, #443A6B 0%, transparent 55%),radial-gradient(100% 70% at 15% 100%, #33294E 0%, transparent 60%),#262239;}
.ddw #scene{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;display:block;}
.ddw .step{background:rgba(252,248,250,.80) !important;backdrop-filter:blur(13px) saturate(1.08);}
.ddw.t-nuit .step{background:rgba(250,246,250,.86) !important;}
.ddw .ciel{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;}
.ddw .ciel .flotte{position:absolute;top:-6vh;animation:ddDerive linear forwards;will-change:transform;}
@keyframes ddDerive{0%{transform:translateY(0) translateX(0) rotate(0deg);}25%{transform:translateY(28vh) translateX(3.5vw) rotate(12deg);}50%{transform:translateY(56vh) translateX(-3vw) rotate(-8deg);}75%{transform:translateY(84vh) translateX(3vw) rotate(10deg);}100%{transform:translateY(115vh) translateX(-2vw) rotate(-6deg);}}
.ddw .ciel .vole{position:absolute;left:-8vw;animation:ddTraverse linear forwards;will-change:transform;}
.ddw .ciel .vole .aile{display:inline-block;animation:ddBattement .55s ease-in-out infinite alternate;}
@keyframes ddTraverse{0%{transform:translateX(0) translateY(0);}20%{transform:translateX(24vw) translateY(-6vh);}40%{transform:translateX(46vw) translateY(3vh);}60%{transform:translateX(68vw) translateY(-5vh);}80%{transform:translateX(90vw) translateY(2vh);}100%{transform:translateX(118vw) translateY(-3vh);}}
@keyframes ddBattement{from{transform:scaleX(1) rotate(-4deg);}to{transform:scaleX(.72) rotate(6deg);}}
.ddw .ciel .scintille{position:absolute;animation:ddScintiller ease-in-out forwards;}
@keyframes ddScintiller{0%{opacity:0;transform:scale(.4);}30%{opacity:.95;transform:scale(1.05);}70%{opacity:.8;transform:scale(.95);}100%{opacity:0;transform:scale(.5);}}
.ddw .rail{width:100%;max-width:520px;margin:14px auto 30px;display:flex;align-items:center;justify-content:center;position:relative;height:26px;z-index:2;}
.ddw .rail .track{position:absolute;left:8%;right:8%;top:50%;height:2px;background:var(--corail-clair);opacity:.45;transform:translateY(-50%);border-radius:2px;}
.ddw .rail .thread{position:absolute;left:8%;top:50%;height:2px;width:0%;background:var(--corail);transform:translateY(-50%);border-radius:2px;transition:width .6s var(--ease);}
.ddw .dot{width:11px;height:11px;border-radius:50%;background:var(--carte);border:2px solid var(--corail-clair);position:relative;z-index:2;margin:0 5%;transition:transform .4s var(--ease), background .4s var(--ease), border-color .4s var(--ease);}
.ddw .dot.done{background:var(--corail);border-color:var(--corail);}
.ddw .dot.current{transform:scale(1.5);border-color:var(--corail);box-shadow:0 0 0 5px rgba(142,111,191,.14);}
.ddw .stage{width:100%;max-width:520px;position:relative;flex:1;display:flex;align-items:flex-start;justify-content:center;z-index:2;}
.ddw .step{display:none;width:100%;background:var(--carte);border:1px solid rgba(70,57,79,.07);border-radius:var(--r);padding:34px 26px 30px;box-shadow:0 18px 50px -30px rgba(40,32,50,.55);animation:ddRise .55s var(--ease) both;}
.ddw .step.is-active{display:block;}
@keyframes ddRise{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
.ddw .eyebrow{font-family:var(--body);font-weight:700;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--corail);margin:0 0 14px;}
.ddw h1,.ddw h2{font-family:var(--display);font-weight:500;line-height:1.15;color:var(--encre);margin:0 0 16px;letter-spacing:-.01em;}
.ddw h1{font-size:clamp(1.7rem,7vw,2.35rem);}
.ddw h2{font-size:clamp(1.45rem,6vw,2rem);}
.ddw p{margin:0 0 15px;font-size:1.06rem;color:var(--encre);}
.ddw p.soft{color:var(--encre-douce);font-size:.97rem;}
.ddw .big-heart{color:var(--corail);font-style:italic;}
.ddw .actions{margin-top:26px;display:flex;flex-direction:column;gap:12px;}
.ddw .btn{font-family:var(--body);font-weight:700;font-size:1.02rem;border:none;border-radius:100px;padding:15px 26px;cursor:pointer;transition:transform .18s var(--ease), box-shadow .25s var(--ease), background .25s;}
.ddw .btn-primary{background:var(--corail);color:#fff;box-shadow:0 12px 26px -12px rgba(142,111,191,.8);}
.ddw .btn-primary:hover{transform:translateY(-2px);}
.ddw .btn-gold{background:linear-gradient(135deg,#B49BDA,#D9A13E);color:#4A3714;box-shadow:0 12px 26px -12px rgba(217,161,62,.85);}
.ddw .btn-ghost{background:none;color:var(--corail);}
.ddw .backrow{margin-top:6px;text-align:center;}
.ddw .back{background:none;border:none;cursor:pointer;color:var(--encre-douce);font-family:var(--body);font-size:.9rem;padding:8px 12px;border-radius:100px;}
.ddw .back:hover{color:var(--corail);}
.ddw .term{background:#efe6ee;border:1px solid rgba(70,57,79,.1);border-radius:16px;padding:18px 18px 16px;margin:6px 0 18px;font-family:'Nunito Sans',ui-monospace,monospace;font-size:.93rem;color:var(--encre);line-height:1.75;}
.ddw .term .prompt{color:var(--corail);font-weight:700;}
.ddw .term .ok{color:#6a8f5f;font-weight:700;}
.ddw .term .arrow{color:var(--encre-douce);}
.ddw .tl{list-style:none;margin:6px 0 4px;padding:0;position:relative;}
.ddw .tl:before{content:"";position:absolute;left:8px;top:6px;bottom:6px;width:2px;background:var(--corail-clair);border-radius:2px;}
.ddw .tl li{position:relative;padding:0 0 22px 32px;}
.ddw .tl li:last-child{padding-bottom:0;}
.ddw .tl li:before{content:"";position:absolute;left:2px;top:4px;width:14px;height:14px;border-radius:50%;background:var(--corail);border:3px solid var(--carte);}
.ddw .tl .when{font-family:var(--display);font-style:italic;color:var(--corail);font-size:1.02rem;}
.ddw .tl .what{color:var(--encre);}
.ddw .compteur{background:linear-gradient(135deg,#FBF3DF,#F6E7C4);border:1px solid rgba(180,140,60,.25);border-radius:16px;padding:18px;margin:6px 0 18px;text-align:center;}
.ddw .compteur .label{font-size:.78rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9A7B3A;margin-bottom:6px;}
.ddw .compteur .valeur{font-family:var(--display);font-size:1.5rem;color:#6B5320;font-weight:600;overflow-wrap:anywhere;}
.ddw .special{background:linear-gradient(135deg,#FDEEF3,#F4E2F0);border:1px solid rgba(217,112,126,.28);border-radius:14px;padding:13px 16px;font-size:.99rem;margin:0 0 15px;}
.ddw .repondre{margin-top:26px;text-align:left;}
.ddw .repondre textarea{width:100%;border:1px solid rgba(70,57,79,.16);border-radius:14px;padding:14px 16px;font-family:var(--body);font-size:1rem;color:var(--encre);background:#fff;resize:vertical;min-height:120px;margin-bottom:10px;line-height:1.55;}
.ddw .sound{position:fixed;top:16px;right:16px;z-index:20;background:var(--carte);border:1px solid rgba(70,57,79,.12);border-radius:100px;padding:9px 15px;font-family:var(--body);font-weight:600;font-size:.85rem;color:var(--encre-douce);cursor:pointer;box-shadow:0 8px 20px -12px rgba(70,57,79,.5);display:flex;align-items:center;gap:7px;}
.ddw .sound:hover{color:var(--corail);}
.ddw .finalwrap{text-align:center;}
.ddw .heartsvg{width:96px;height:96px;margin:4px auto 8px;display:block;}
.ddw .heartsvg path{fill:none;stroke:var(--corail);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:400;stroke-dashoffset:400;}
.ddw .heartsvg.draw path{animation:ddSew 1.6s var(--ease) forwards;}
@keyframes ddSew{to{stroke-dashoffset:0;}}
.ddw .signoff{font-family:var(--display);font-style:italic;font-size:1.25rem;color:var(--corail);margin-top:10px;opacity:0;transition:opacity .6s ease .3s;}
.ddw .signoff.show{opacity:1;}
.ddw .piece{position:fixed;bottom:12px;right:14px;font-size:19px;opacity:.22;cursor:pointer;z-index:10;transition:opacity .3s, transform .3s;background:none;border:none;padding:4px;}
.ddw .piece:hover{opacity:.9;transform:scale(1.2) rotate(12deg);}
.ddw .tresor-msg{position:fixed;bottom:52px;right:14px;left:14px;max-width:340px;margin-left:auto;z-index:11;background:linear-gradient(135deg,#FBF3DF,#F6E7C4);border:1px solid rgba(180,140,60,.3);border-radius:14px;padding:13px 16px;font-size:.93rem;color:#6B5320;box-shadow:0 14px 30px -18px rgba(107,83,32,.5);display:none;}
.ddw .portes{text-align:center;font-size:.9rem;color:var(--encre-douce);margin:26px 0 0;z-index:2;}
.ddw .portes a{color:var(--corail);text-decoration:none;font-weight:600;}
.ddw .artisan{text-align:center;font-size:.78rem;color:var(--encre-douce);opacity:.75;margin:10px 0 0;font-style:italic;z-index:2;}
.ddw .secret{background:#FBF2F0;border-radius:13px;padding:13px 16px;font-size:.96rem;font-style:italic;margin-top:12px;text-align:left;}
.ddw .lettre-jour{background:linear-gradient(160deg, rgba(252,248,250,.9), rgba(247,236,232,.85));border:1px solid rgba(142,111,191,.22);border-radius:18px;padding:22px 22px 20px;margin:4px 0 18px;box-shadow:0 16px 40px -30px rgba(70,57,79,.55);}
.ddw .lettre-jour .lj-tete{font-weight:700;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--corail);margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.ddw .lettre-jour .lj-texte{font-size:1.06rem;line-height:1.75;white-space:pre-line;}
.ddw .lettre-jour .lj-sign{margin-top:14px;font-family:var(--display);font-style:italic;color:var(--corail);font-size:1.02rem;}
.ddw .voix{display:inline-flex;align-items:center;gap:8px;background:var(--corail);color:#fff;border:none;border-radius:100px;padding:11px 20px;font-family:var(--body);font-weight:700;font-size:.95rem;cursor:pointer;margin:2px 0 8px;box-shadow:0 10px 22px -12px rgba(142,111,191,.8);transition:transform .18s var(--ease);}
.ddw .voix.joue{background:var(--miel);color:#4A3714;}
.ddw .voix .onde{display:inline-flex;gap:2px;align-items:flex-end;height:14px;}
.ddw .voix .onde i{width:3px;background:currentColor;border-radius:2px;height:5px;}
.ddw .voix.joue .onde i{animation:ddOnde .8s ease-in-out infinite;}
.ddw .voix .onde i:nth-child(2){animation-delay:.15s;}
.ddw .voix .onde i:nth-child(3){animation-delay:.3s;}
.ddw .voix .onde i:nth-child(4){animation-delay:.45s;}
@keyframes ddOnde{0%,100%{height:5px;}50%{height:14px;}}
.ddw.douceur{--corail:#D9917F;--corail-clair:#EBBCA9;}
.ddw.douceur .step{font-size:1.08em;line-height:1.75;}
.ddw.douceur .rail{opacity:.3;}
.ddw .btn-douceur{position:fixed;bottom:12px;left:14px;z-index:20;background:var(--carte);border:1px solid rgba(70,57,79,.12);border-radius:100px;padding:8px 14px;font-family:var(--body);font-weight:600;font-size:.8rem;color:var(--encre-douce);cursor:pointer;box-shadow:0 8px 20px -12px rgba(70,57,79,.5);}
.ddw .cocon{background:#FBF2F0;border-radius:14px;padding:15px 17px;font-size:1rem;line-height:1.7;margin:14px 0 0;display:none;}
.ddw.douceur .cocon{display:block;}
.ddw .enveloppes{margin-top:18px;}
.ddw .env{background:#F7EFF5;border:1px solid rgba(70,57,79,.1);border-radius:14px;padding:14px 16px;margin-bottom:10px;}
.ddw .env .t{font-weight:700;font-size:.98rem;}
.ddw .env .etat{font-size:.86rem;color:var(--encre-douce);margin-top:3px;}
.ddw .env button{margin-top:9px;font-family:var(--body);font-weight:700;font-size:.9rem;background:var(--corail);color:#fff;border:none;border-radius:100px;padding:9px 18px;cursor:pointer;}
.ddw .env .contenu{margin-top:12px;font-size:1rem;white-space:pre-wrap;border-top:1px dashed rgba(70,57,79,.18);padding-top:12px;}
.ddconfetti{position:fixed;inset:0;pointer-events:none;z-index:15;overflow:hidden;}
.ddconfetti span{position:absolute;top:-40px;font-size:20px;animation:ddFall linear forwards;opacity:.95;}
@keyframes ddFall{to{transform:translateY(108dvh) rotate(50deg);opacity:0;}}
.ddw .retour-lien{position:fixed;top:16px;left:16px;z-index:20;font-size:.9rem;color:var(--encre-douce);text-decoration:none;background:var(--carte);border:1px solid rgba(70,57,79,.12);border-radius:100px;padding:8px 14px;}
`;

export default function Dadoucherie() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") { window.BONJOURS = BONJOURS; window.BONNES_NUITS = BONNES_NUITS; }
    const root = rootRef.current;
    const timers = [];
    const rafs = [];
    const listeners = [];
    const onWin = (ev, fn, opt) => { window.addEventListener(ev, fn, opt); listeners.push([window, ev, fn]); };
    const onDoc = (ev, fn) => { document.addEventListener(ev, fn); listeners.push([document, ev, fn]); };
    const setI = (fn, ms) => { const id = setInterval(fn, ms); timers.push(id); return id; };
    const rAF = (fn) => { const id = requestAnimationFrame(fn); rafs.push(id); return id; };
    const $ = (id) => document.getElementById(id);

    /* ============ IIFE PRINCIPALE ============ */
    (function () {
      const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      const h = new Date().getHours();
      const periode = (h >= 5 && h < 8) ? "aube" : (h >= 8 && h < 12) ? "matin" : (h >= 12 && h < 18) ? "apresmidi" : (h >= 18 && h < 23) ? "soir" : "nuit";
      root.classList.add("t-" + periode);

      const salutations = {
        aube: { eyebrow: "l'aube se lève", titre: "Coucou toi,<br>déjà réveillée ?", paras: ["Il est tôt. Le ciel hésite encore entre la nuit et le jour, tout est calme, et toi tu es déjà là, sur ce site, probablement encore dans le lit avec les cheveux dans tous les sens. Et tu sais quoi ? Même comme ça, surtout comme ça, tu es la plus belle chose que cette journée verra passer, et elle ne fait que commencer.", "J'aime cette heure-là. Le monde n'a pas encore mis son masque, tout est doux, tout est possible. Un peu comme nous au tout début, sur Snap, quand chaque notification me faisait sourire bêtement devant mon écran. Sept ans plus tard, devine quoi : ça n'a pas changé.", "Prends ton temps ce matin. Respire. Et souviens-toi en buvant ton premier verre d'eau ou ton café que quelque part, quelqu'un a pensé à toi avant même que le soleil se lève complètement. Ce quelqu'un, c'est moi. Comme d'habitude."] },
        matin: { eyebrow: "bonjour bonjour", titre: "Bonjour,<br>ma dadouchérie", paras: ["Bonjour toi. Oui, toi. La personne qui illumine mes journées depuis maintenant sept ans et qui, si tout va bien, vient d'ouvrir ce site avec un petit sourire en coin. Ne nie pas, je te vois d'ici.", "J'espère que tu as bien dormi, que tu as rêvé de choses douces : de nous à Barcelone, de nous à Malte, ou soyons fous, de nous à Monaco avec beaucoup trop d'argent. J'espère surtout que ta journée sera à ta hauteur : belle, lumineuse, et un peu extraordinaire. Comme toi.", "Regarde autour de toi sur cette page : il y a des fleurs, des papillons, de la lumière. J'ai essayé de mettre un matin de film dans une page web, parce que c'est ce que tu mérites tous les jours. Allez, avance, j'ai des choses à te dire."] },
        apresmidi: { eyebrow: "en pleine journée", titre: "Coucou,<br>ma dadouchérie", paras: ["Coucou toi. Il est l'après-midi, tu es sûrement en train de courir partout ou de faire semblant de travailler. Dans les deux cas, merci de faire une pause ici, avec moi. C'est officiellement le meilleur moment de ta journée. Je dis ça en toute objectivité, évidemment.", "Tu sais ce que je fais, moi, l'après-midi ? Je bosse, et à un moment, sans prévenir, tu débarques dans ma tête. Un souvenir de Lyon, ton rire, un truc que tu m'as dit il y a trois ans et qui me revient d'un coup. C'est le bug le plus agréable que je connaisse, et crois-moi, en tant qu'ingénieur, j'en ai vu des bugs.", "Alors voilà : ce site, c'est ma façon de débarquer dans TA tête en pleine journée. Chacun son tour. Installe-toi deux minutes, le soleil est haut, les papillons volent, et moi je t'aime."] },
        soir: { eyebrow: "le soir tombe", titre: "Bonsoir,<br>ma dadouchérie", paras: ["Bonsoir toi. Le ciel devient rose et doré. Regarde, même la page a rougi. Elle fait ça tous les soirs, je l'ai programmée comme ça, parce que c'est exactement l'effet que tu me fais depuis le 1er janvier 2020, à Lyon, la première fois que je t'ai vue en vrai.", "J'espère que ta journée a été douce. Et si elle ne l'a pas été, viens, pose tout ici. C'est l'heure où le monde ralentit, où la lumière pardonne tout, où les plus belles conversations commencent. On en sait quelque chose, non ? Une certaine nuit de juillet 2023, on a laissé le soir devenir le matin sans s'en rendre compte, juste en se parlant. Je rejouerais cette nuit-là mille fois.", "Alors ce soir, offre-toi cinq minutes. Il y a des pétales qui tombent, des mots que j'ai choisis un par un, et au bout, un cœur qui t'attend. Il est à toi depuis longtemps de toute façon."] },
        nuit: { eyebrow: "sous les étoiles", titre: "Toujours debout,<br>dadouchérie ?", paras: ["Il est tard, toi. Très tard. Le monde dort, les étoiles sont sorties (regarde, j'en ai mis partout sur la page, juste pour toi) et évidemment, tu es encore réveillée. Je ne suis même pas surpris. Tu n'as jamais su te coucher tôt, et entre nous, c'est une de nos plus belles qualités communes.", "Les nuits, c'est notre spécialité. C'est en pleine nuit qu'on s'est tout dit, un 15 juillet, il y a des années. On a parlé de nos sentiments, de nos peurs, de tout, jusqu'à ce que le soleil se lève. Depuis, chaque fois qu'il est tard et que je ne dors pas, je pense à cette nuit-là. Et donc à toi. Donc en fait je pense à toi tout le temps, la démonstration est faite.", "Alors puisque tu es là, à cette heure impossible : lis ce que j'ai à te dire, souris, et après, promis, tu vas dormir. Les étoiles veilleront sur toi. Et moi aussi, comme toujours, même de loin."] },
      };
      const g = salutations[periode];
      $("greetEyebrow").textContent = g.eyebrow;
      $("greetTitle").innerHTML = g.titre;
      const body = $("greetBody");
      g.paras.forEach((t) => { const p = document.createElement("p"); p.textContent = t; body.appendChild(p); });

      const maintenant = new Date();
      if (maintenant.getHours() === 0 && maintenant.getMinutes() < 15) { const p25 = document.createElement("p"); p25.textContent = "Et puisque tu es là entre minuit et minuit et quart, tu as droit au message de la 25e heure, que presque personne ne verra jamais : c'est toujours à cette heure-ci que tu me manques le plus fort. Voilà. Maintenant file dormir."; p25.style.fontStyle = "italic"; body.appendChild(p25); }
      const pensees = ["Pensée du dimanche : les dimanches ont ton visage, je n'y peux rien.", "Pensée du lundi : la semaine commence, et toi tu es déjà ma meilleure nouvelle.", "Pensée du mardi : j'ai vérifié, tu me manques même le mardi. C'est dire.", "Pensée du mercredi : mi-semaine. Pile le bon moment pour te dire je t'aime.", "Pensée du jeudi : jeudi, presque vendredi, bientôt toi.", "Pensée du vendredi : ce soir, le programme c'est nous.", "Pensée du samedi : les samedis sont fabriqués pour les gens comme nous."];
      const pj = document.createElement("p"); pj.className = "soft"; pj.textContent = pensees[maintenant.getDay()]; body.appendChild(pj);

      /* CIEL FÉÉRIQUE */
      const ciel = $("ciel");
      const decors = { aube: { tombe: ["🌸", "🌷", "✨", "💮"], vole: ["🦋"], brille: ["✨"] }, matin: { tombe: ["🌸", "🌼", "🌷", "💮"], vole: ["🦋", "🦋", "🐝"], brille: ["✨"] }, apresmidi: { tombe: ["🌺", "🌸", "🌻"], vole: ["🦋", "🦋"], brille: ["✨"] }, soir: { tombe: ["🌸", "🌹", "💮", "✨"], vole: ["🦋"], brille: ["✨", "💫"] }, nuit: { tombe: ["💫", "✨"], vole: ["🦋"], brille: ["⭐", "✨", "🌟"] } };
      const elemFlotte = () => { const d = decors[periode]; const s = document.createElement("span"); s.className = "flotte"; s.textContent = d.tombe[Math.floor(Math.random() * d.tombe.length)]; s.style.left = Math.random() * 100 + "vw"; s.style.fontSize = (13 + Math.random() * 14) + "px"; s.style.opacity = (0.55 + Math.random() * 0.4); s.style.animationDuration = (11 + Math.random() * 10) + "s"; ciel.appendChild(s); s.addEventListener("animationend", () => s.remove()); };
      const elemVole = () => { const d = decors[periode]; const s = document.createElement("span"); s.className = "vole"; const a = document.createElement("span"); a.className = "aile"; a.textContent = d.vole[Math.floor(Math.random() * d.vole.length)]; s.appendChild(a); s.style.top = (5 + Math.random() * 70) + "vh"; s.style.fontSize = (16 + Math.random() * 12) + "px"; s.style.animationDuration = (13 + Math.random() * 12) + "s"; ciel.appendChild(s); s.addEventListener("animationend", () => s.remove()); };
      const elemBrille = () => { const d = decors[periode]; const s = document.createElement("span"); s.className = "scintille"; s.textContent = d.brille[Math.floor(Math.random() * d.brille.length)]; s.style.left = Math.random() * 100 + "vw"; s.style.top = Math.random() * 90 + "vh"; s.style.fontSize = (9 + Math.random() * 12) + "px"; s.style.animationDuration = (2.5 + Math.random() * 3) + "s"; ciel.appendChild(s); s.addEventListener("animationend", () => s.remove()); };
      if (!reduce) { for (let i = 0; i < 6; i++) setTimeout(elemBrille, i * 300); elemVole(); setI(() => { if (ciel.childElementCount > 30) return; elemFlotte(); if (Math.random() < 0.5) elemBrille(); if (Math.random() < 0.16) elemVole(); }, 1100); }

      /* NAVIGATION */
      const steps = Array.prototype.slice.call(root.querySelectorAll(".step"));
      const dots = Array.prototype.slice.call(root.querySelectorAll(".dot"));
      const thread = $("thread");
      const total = steps.length;
      let current = 0;
      const render = () => {
        steps.forEach((s) => s.classList.toggle("is-active", +s.dataset.step === current));
        dots.forEach((d, i) => { d.classList.toggle("done", i < current); d.classList.toggle("current", i === current); });
        thread.style.width = (total > 1 ? (current / (total - 1)) * 84 : 0) + "%";
        const active = steps[current]; if (active) active.focus({ preventScroll: false });
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (current === total - 1) drawHeart();
        if (current === 4) lancerCompteur();
      };
      const go = (n) => { n = Math.max(0, Math.min(total - 1, n)); current = n; try { localStorage.setItem("dadou_etape", String(current)); } catch (e) {} render(); };
      try { const derniere = parseInt(localStorage.getItem("dadou_etape") || "0", 10); if (derniere > 0 && derniere < total) { const actions0 = root.querySelector('[data-step="0"] .actions'); const rb = document.createElement("button"); rb.className = "btn btn-ghost"; rb.textContent = "reprendre où tu t'étais arrêtée 🤍"; rb.addEventListener("click", () => go(derniere)); actions0.appendChild(rb); } } catch (e) {}
      root.querySelectorAll("[data-go]").forEach((btn) => btn.addEventListener("click", () => go(+btn.dataset.go)));

      /* COMPTEUR & PLUIE */
      const valeurEl = $("valeur"); let compteurLance = false;
      const lancerCompteur = () => { if (compteurLance) return; compteurLance = true; const etapes = ["calcul en cours…", "1 000 000 €…", "999 000 000 €…", "99 999 999 999 €…", "ERREUR : nombre trop grand 😌", "∞ € (et encore, c'est sous-estimé)"]; let i = 0; const t = setI(() => { valeurEl.textContent = etapes[i]; i++; if (i >= etapes.length) clearInterval(t); }, 800); };
      const pluie = (chars, nombre, taille) => { if (reduce) return; const layer = document.createElement("div"); layer.className = "ddconfetti"; for (let i = 0; i < nombre; i++) { const s = document.createElement("span"); s.textContent = chars[Math.floor(Math.random() * chars.length)]; s.style.left = Math.random() * 100 + "vw"; s.style.fontSize = (taille + Math.random() * taille * 0.9) + "px"; s.style.animationDuration = (2.6 + Math.random() * 2.6) + "s"; s.style.animationDelay = (Math.random() * 0.8) + "s"; layer.appendChild(s); } document.body.appendChild(layer); setTimeout(() => layer.remove(), 7000); };
      $("moneyBtn").addEventListener("click", () => pluie(["💶", "💵", "💰", "🪙", "💎", "🤑", "💸"], 34, 18));

      /* CŒUR FINAL */
      const heart = $("heart"); let heartDrawn = false;
      const drawHeart = () => { if (heartDrawn) return; heartDrawn = true; heart.classList.remove("draw"); void heart.offsetWidth; heart.classList.add("draw"); };
      const loveBtn = $("loveBtn"); const signoff = $("signoff"); let clicsCoeur = [];
      loveBtn.addEventListener("click", () => { signoff.classList.add("show"); pluie(["🤍", "💗", "🩷", "✨", "🦋", "🌸"], 26, 16); const t = Date.now(); clicsCoeur = clicsCoeur.filter((x) => t - x < 2500); clicsCoeur.push(t); if (clicsCoeur.length >= 3) $("secret").hidden = false; });
      $("restart").addEventListener("click", () => { heartDrawn = false; compteurLance = false; valeurEl.textContent = "calcul en cours…"; signoff.classList.remove("show"); go(0); });

      /* MÉMOIRE */
      const joursLyon = Math.floor((Date.now() - new Date(2020, 0, 1).getTime()) / 86400000);
      $("uptime").textContent = joursLyon; $("joursLyon").textContent = joursLyon;
      const auj0 = new Date(); const jourSpecial = $("jourSpecial");
      if (auj0.getMonth() === 0 && auj0.getDate() === 1) { jourSpecial.textContent = "Au fait… bonne année. Et surtout : joyeux anniversaire de nous. Un 1er janvier exactement comme aujourd'hui, à Lyon, je te voyais pour la toute première fois. Je n'ai jamais retrouvé une meilleure façon de commencer une année, et pourtant j'ai eu " + (auj0.getFullYear() - 2020) + " essais depuis. 🥂"; jourSpecial.hidden = false; }
      else if (auj0.getMonth() === 6 && auj0.getDate() === 15) { jourSpecial.textContent = "Au fait… on est le 15 juillet. Notre nuit. Celle où on a parlé jusqu'au lever du soleil et où tout a vraiment commencé. Bon anniversaire à nous, mon amour. 🌙"; jourSpecial.hidden = false; }
      else if (auj0.getMonth() === 9 && auj0.getDate() === 2) {
        jourSpecial.textContent = "Au fait… c'est ton anniversaire aujourd'hui. 🎂 Joyeux anniversaire, ma dadoucherie. Je t'ai préparé quelque chose, rien que pour toi.";
        jourSpecial.hidden = false;
        try {
          const a = document.createElement("a"); a.href = "/anniversaire"; a.textContent = "Ouvrir ta surprise d'anniversaire 🎁";
          a.style.cssText = "display:inline-block;margin:2px 0 15px;padding:12px 22px;border-radius:100px;font-weight:700;text-decoration:none;color:#1a1430;background:linear-gradient(135deg,#CBB4EC,#A886DA);";
          jourSpecial.insertAdjacentElement("afterend", a);
        } catch (e) {}
      }
      else if (auj0.getMonth() === 9 && auj0.getDate() <= 1) { const reste = 2 - auj0.getDate(); jourSpecial.textContent = reste === 1 ? "Au fait… demain, c'est ton anniversaire. Je compte les heures. 🤍" : "Au fait… dans deux jours, c'est ton anniversaire. Quelque chose t'attend. 🎁"; jourSpecial.hidden = false; }

      const DB_URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
      const DB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";
      const dbInserer = (table, data) => fetch(DB_URL + "/rest/v1/" + table, { method: "POST", headers: { "Content-Type": "application/json", apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, Prefer: "return=minimal" }, body: JSON.stringify(data) }).catch(() => {});
      const dbCompter = (table, filtre) => fetch(DB_URL + "/rest/v1/" + table + "?select=id" + (filtre ? "&" + filtre : ""), { method: "HEAD", headers: { apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, Prefer: "count=exact" } }).then((r) => { const cr = r.headers.get("content-range"); return cr ? parseInt(cr.split("/")[1], 10) : null; }).catch(() => null);
      const dbLireDadou = (table, filtre) => fetch(DB_URL + "/rest/v1/" + table + "?" + filtre, { headers: { apikey: DB_KEY, Authorization: "Bearer " + DB_KEY } }).then((r) => r.json()).catch(() => []);

      /* LETTRE DU JOUR */
      (function () {
        const estNuit = (periode === "soir" || periode === "nuit");
        const type = estNuit ? "bonne_nuit" : "bonjour";
        const lettreJour = $("lettreJour"), ljTete = $("ljTete"), ljTexte = $("ljTexte");
        const d = new Date(); const debutAnnee = new Date(d.getFullYear(), 0, 0); const jourAnnee = Math.floor((d - debutAnnee) / 86400000);
        const biblio = estNuit ? (window.BONNES_NUITS || []) : (window.BONJOURS || []);
        const texteBiblio = biblio.length ? biblio[jourAnnee % biblio.length] : "";
        const teteMatin = "☀️ ton bonjour du jour", teteNuit = "🌙 ta bonne nuit";
        const afficher = (texte, deLui) => { ljTete.textContent = estNuit ? teteNuit : teteMatin; if (deLui) ljTete.textContent += " · écrit pour toi aujourd'hui"; ljTexte.textContent = texte; lettreJour.hidden = false; };
        const auj = d.toISOString().slice(0, 10);
        dbLireDadou("messages_jour", "type=eq." + type + "&pour_date=eq." + auj + "&order=created_at.desc&limit=1").then((rows) => {
          if (rows && rows.length) { afficher(rows[0].message ? rows[0].message : rows[0].texte, true); if (!rows[0].lu_le) { fetch(DB_URL + "/rest/v1/messages_jour?id=eq." + rows[0].id, { method: "PATCH", headers: { "Content-Type": "application/json", apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, Prefer: "return=minimal" }, body: JSON.stringify({ lu_le: new Date().toISOString() }) }).catch(() => {}); } }
          else if (texteBiblio) afficher(texteBiblio, false);
        });
      })();

      dbLireDadou("mot_du_jour", "order=created_at.desc&limit=1").then((rows) => { if (!rows || !rows.length) return; const age = Date.now() - new Date(rows[0].created_at).getTime(); if (age > 3 * 86400000) return; const m = $("motDuJour"); m.textContent = "📌 Mathieu a épinglé ça pour toi : « " + rows[0].texte + " »"; m.hidden = false; });
      dbLireDadou("dadoucherie_mots", "order=created_at.desc&limit=1").then((rows) => { if (!rows || !rows.length) return; const a = $("accuse"); if (rows[0].lu_le) { const d = new Date(rows[0].lu_le); a.textContent = "Ton dernier mot a été lu par Mathieu 🤍 (le " + d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) + " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + "). Connaissant l'individu, il l'a relu plusieurs fois."; } else a.textContent = "Ton dernier mot est bien arrivé. Il attend Mathieu dans sa boîte 🤍"; a.hidden = false; });

      /* MODE DOUCEUR */
      (function () { const btn = $("btnDouceur"); const cocon = document.createElement("p"); cocon.className = "cocon"; cocon.textContent = "D'accord. On ralentit tout. Respire un coup. Quoi qu'il se passe aujourd'hui, ça ne change rien à l'essentiel : tu es aimée, exactement comme tu es, exactement aujourd'hui. Le reste peut attendre demain. Reste ici le temps qu'il faut, la page ne bouge pas, moi non plus."; $("greetBody").appendChild(cocon); btn.addEventListener("click", () => { const actif = root.classList.toggle("douceur"); btn.textContent = actif ? "🕯️ douceur activée" : "🕯️ j'ai besoin de douceur"; if (actif && navigator.vibrate) navigator.vibrate(15); if (actif) dbInserer("dadoucherie_journal", { type: "douceur", periode: periode }); }); })();

      /* TOAST DU VENDREDI SOIR */
      (function () { const d = new Date(); if (d.getDay() !== 5 || d.getHours() < 17) return; dbLireDadou("gratitudes", "order=created_at.desc&limit=1").then((rows) => { const p = document.createElement("p"); p.className = "soft"; if (rows && rows.length) p.textContent = "🥂 C'est vendredi soir : on trinque. Cette semaine, on lève nos verres à ceci, pioché dans notre pot de gratitude : « merci pour " + rows[0].texte + " ». Santé, nous."; else p.textContent = "🥂 C'est vendredi soir : on trinque. À nous, à cette semaine qui se termine, et au pot de gratitude qui attend son premier merci dans nos jeux."; $("greetBody").appendChild(p); }); })();

      /* TAP SECRET */
      (function () { let taps = []; $("greetTitle").addEventListener("click", () => { const t = Date.now(); taps = taps.filter((x) => t - x < 3000); taps.push(t); if (taps.length >= 5) { taps = []; pluie(["🤍", "💗", "🦋", "✨", "🌸", "🪙", "💌"], 60, 18); if (navigator.vibrate) navigator.vibrate([20, 40, 20]); } }); })();

      /* MOIS-ANNIVERSAIRES */
      (function () { const d = new Date(); let ligne = null; if (d.getDate() === 1 && !(d.getMonth() === 0)) { const mLyon = (d.getFullYear() - 2020) * 12 + d.getMonth(); ligne = "🌙 On est le 1er : ça fait " + mLyon + " mois pile que je t'ai vue pour la première fois à Lyon. Oui, je compte. Évidemment que je compte."; } else if (d.getDate() === 15 && !(d.getMonth() === 6)) { const mNuit = (d.getFullYear() - 2023) * 12 + d.getMonth() - 6; if (mNuit > 0) ligne = "🌙 On est le 15 : ça fait " + mNuit + " mois pile depuis notre nuit. Je lève mon café (ou ma tisane, selon l'heure) à nous."; } if (ligne) { const p = document.createElement("p"); p.className = "soft"; p.textContent = ligne; $("greetBody").appendChild(p); } })();

      /* EMMÈNE-MOI QUELQUE PART */
      (function () { const actions0 = root.querySelector('[data-step="0"] .actions'); const b = document.createElement("button"); b.className = "btn btn-ghost"; b.textContent = "emmène-moi quelque part 🎲"; b.addEventListener("click", () => { const portes = ["/nuit", "/ocean", "/jardin", "/feu", "/histoire", "/jeux"]; location.href = portes[Math.floor(Math.random() * portes.length)]; }); actions0.appendChild(b); })();

      /* SAISONS */
      (function () { const mois = new Date().getMonth(); if (mois === 11 || mois === 0) { decors[periode].tombe = decors[periode].tombe.concat(["❄️", "❄️", "⛄"]); if (mois === 11) { const p = document.createElement("p"); p.className = "soft"; p.textContent = "C'est décembre : la page a sorti les décorations toute seule. Les guirlandes sont invisibles mais je te jure qu'elles y sont."; $("greetBody").appendChild(p); } } else if (mois >= 2 && mois <= 4) decors[periode].tombe = decors[periode].tombe.concat(["🌷", "🌼", "🌺"]); else if (mois === 9 || mois === 10) decors[periode].tombe = decors[periode].tombe.concat(["🍂", "🍁"]); })();

      /* ABSENCE */
      try { const cle = "dadou_derniere_visite"; const derniereVisite = parseInt(localStorage.getItem(cle) || "0", 10); if (derniereVisite) { const joursAbsente = Math.floor((Date.now() - derniereVisite) / 86400000); if (joursAbsente >= 7) { const pa = document.createElement("p"); pa.className = "soft"; pa.textContent = joursAbsente + " jours sans toi ici. Tout allait bien ? Moi je t'attendais, tranquillement, comme les étoiles. Elles ne s'impatientent jamais, elles brillent, c'est tout."; $("greetBody").appendChild(pa); } } localStorage.setItem(cle, String(Date.now())); } catch (e) {}

      /* MÉTÉO VIVANTE */
      (function () { const appliquerMeteo = (code) => { const pluieuse = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95; const neigeuse = (code >= 71 && code <= 77) || code === 85 || code === 86; if (!pluieuse && !neigeuse) return; const msg = document.createElement("p"); msg.className = "soft"; if (neigeuse) { msg.textContent = "Au fait, il neige chez toi. J'ai vérifié, oui. Regarde par la fenêtre, puis reviens : la page neige aussi, en solidarité."; decors[periode].tombe = ["❄️", "❄️", "✨"]; } else { msg.textContent = "Au fait, il pleut chez toi en ce moment. J'ai vérifié, oui, la page regarde le ciel. Programme officiel : plaid, boisson chaude, et moi qui t'aime depuis ici."; decors[periode].tombe = ["💧", "💧", "🌸"]; } $("greetBody").appendChild(msg); }; const chercher = (lat, lon) => { fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&current=weather_code").then((r) => r.json()).then((d) => { if (d && d.current) appliquerMeteo(d.current.weather_code); }).catch(() => {}); }; if (navigator.geolocation) navigator.geolocation.getCurrentPosition((pos) => chercher(pos.coords.latitude, pos.coords.longitude), () => chercher(45.75, 4.85), { timeout: 4000, maximumAge: 600000 }); else chercher(45.75, 4.85); })();

      dbLireDadou("chansons", "order=created_at.desc&limit=1").then((rows) => { if (!rows || !rows.length) return; const c = rows[0]; const p = document.createElement("p"); p.className = "soft"; p.textContent = "🎵 En ce moment, cette chanson me fait penser à toi : « " + c.titre + " »." + (c.note ? " " + c.note : ""); $("greetBody").appendChild(p); });
      dbLireDadou("compteurs", "date_cible=gte." + new Date().toISOString().slice(0, 10) + "&order=date_cible.asc&limit=1").then((rows) => { if (!rows || !rows.length) return; const c = rows[0]; const dodos = Math.ceil((new Date(c.date_cible + "T00:00:00") - Date.now()) / 86400000); const p = document.createElement("p"); p.className = "soft"; p.textContent = "⏳ Prochain rendez-vous heureux : " + c.label + ", dans " + dodos + " dodo" + (dodos > 1 ? "s" : "") + "."; $("greetBody").appendChild(p); });
      (function () { const d = new Date(); const ilYaUnAn = (d.getFullYear() - 1) + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); dbLireDadou("dadoucherie_mots", "created_at=gte." + ilYaUnAn + "T00:00:00&created_at=lt." + ilYaUnAn + "T23:59:59&limit=1").then((rows) => { if (!rows || !rows.length) return; const extrait = rows[0].message.slice(0, 120) + (rows[0].message.length > 120 ? "…" : ""); const p = document.createElement("p"); p.className = "soft"; p.textContent = "🕰️ Il y a un an jour pour jour, tu m'écrivais ici : « " + extrait + " ». Le temps passe, pas nous."; $("greetBody").appendChild(p); }); })();
      if (new Date().getMonth() === 11) { const portesEl = root.querySelector(".portes"); if (portesEl) { const a = document.createElement("a"); a.href = "/avent"; a.textContent = " · le calendrier de l'avent 🎄"; portesEl.appendChild(a); } }

      /* CAPSULE POUR MATHIEU */
      (function () { const rep = $("repondre"); const lien = document.createElement("p"); lien.className = "soft"; lien.innerHTML = 'Ou alors… <a href="#" id="capsuleLien" style="color:var(--corail);font-weight:600;">scelle une lettre à retardement pour Mathieu 🕰️</a> : il ne pourra l\'ouvrir qu\'à la date que tu choisis.'; rep.appendChild(lien); const form = document.createElement("div"); form.hidden = true; form.innerHTML = '<textarea id="capsuleTexte" placeholder="Ta lettre pour lui, il ne la verra pas avant la date choisie…" style="width:100%;border:1px solid rgba(70,57,79,.16);border-radius:14px;padding:14px 16px;font-family:inherit;font-size:1rem;resize:vertical;min-height:100px;margin:8px 0;line-height:1.55;"></textarea><input id="capsuleDate" type="date" style="width:100%;border:1px solid rgba(70,57,79,.16);border-radius:14px;padding:12px 16px;font-family:inherit;font-size:1rem;margin-bottom:10px;" />'; const bt = document.createElement("button"); bt.className = "btn btn-primary"; bt.textContent = "Je scelle 🔒"; form.appendChild(bt); const merci = document.createElement("p"); merci.className = "soft"; merci.hidden = true; merci.textContent = "Scellée. Il va devenir fou d'impatience, c'est exactement le but. 🤍"; rep.appendChild(form); rep.appendChild(merci); $("capsuleLien").addEventListener("click", (e) => { e.preventDefault(); form.hidden = false; lien.hidden = true; }); bt.addEventListener("click", () => { const t = $("capsuleTexte").value.trim(); const dte = $("capsuleDate").value; if (!t || !dte) return; bt.disabled = true; dbInserer("lettres_pour_mathieu", { texte: t, date_ouverture: dte }).then(() => { form.hidden = true; merci.hidden = false; pluie(["🔒", "💌", "✨"], 16, 15); }); }); })();

      /* LETTRES À RETARDEMENT */
      dbLireDadou("lettres", "order=date_ouverture.asc").then((rows) => { if (!rows || !rows.length) return; const zone = $("enveloppes"); rows.forEach((l) => { const env = document.createElement("div"); env.className = "env"; const ouverte = new Date(l.date_ouverture + "T00:00:00") <= new Date(); if (!ouverte) { const dodos = Math.ceil((new Date(l.date_ouverture + "T00:00:00") - Date.now()) / 86400000); env.innerHTML = '<div class="t">✉️ Une lettre scellée t\'attend</div><div class="etat">Elle s\'ouvrira dans ' + dodos + " dodo" + (dodos > 1 ? "s" : "") + ", le " + new Date(l.date_ouverture + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) + ". Impossible de tricher, j'ai vérifié.</div>"; } else { env.innerHTML = '<div class="t">📬 « ' + l.titre.replace(/</g, "&lt;") + ' »</div><div class="etat">Cette lettre vient de se déverrouiller. Elle a attendu ce jour exact pour toi.</div>'; const b = document.createElement("button"); b.textContent = "Ouvrir la lettre"; b.addEventListener("click", () => { b.style.display = "none"; const c = document.createElement("div"); c.className = "contenu"; c.textContent = l.texte; env.appendChild(c); pluie(["💌", "🤍", "✨"], 20, 15); if (!l.lue_le) fetch(DB_URL + "/rest/v1/lettres?id=eq." + l.id, { method: "PATCH", headers: { "Content-Type": "application/json", apikey: DB_KEY, Authorization: "Bearer " + DB_KEY, Prefer: "return=minimal" }, body: JSON.stringify({ lue_le: new Date().toISOString() }) }).catch(() => {}); }); env.appendChild(b); } zone.appendChild(env); }); });

      /* VISITES / BILLETS / CŒUR (compteurs) */
      dbInserer("dadoucherie_journal", { type: "visite", periode: periode }).then(() => dbCompter("dadoucherie_journal", "type=eq.visite")).then((n) => { if (!n || n < 2) return; const v = $("visites"); v.textContent = "Au fait : c'est la " + n + "e fois que cette page s'ouvre. À chaque fois, quelque part, mon cœur reçoit une petite notification. Et à chaque fois, il est content."; v.hidden = false; });
      $("moneyBtn").addEventListener("click", () => { dbInserer("dadoucherie_journal", { type: "billets", periode: periode }).then(() => dbCompter("dadoucherie_journal", "type=eq.billets")).then((n) => { if (!n) return; const p = $("pluies"); p.textContent = n + (n === 1 ? "re" : "e") + " pluie de billets déclenchée sur cette page. À ce rythme, on n'a plus le choix : on va devoir devenir riches pour de vrai."; p.hidden = false; }); });
      $("loveBtn").addEventListener("click", () => { dbInserer("dadoucherie_journal", { type: "coeur", periode: periode }).then(() => dbCompter("dadoucherie_journal", "type=eq.coeur")).then((n) => { if (!n) return; const c = $("coeurCompte"); c.textContent = "Tu as appuyé " + n + " fois sur mon cœur en tout. Il tient le coup, ne t'inquiète pas. Il a l'habitude, avec toi."; c.hidden = false; }); });

      /* ELLE ME RÉPOND */
      const motBtn = $("motBtn"), motTexte = $("motTexte");
      motBtn.addEventListener("click", () => { const txt = motTexte.value.trim(); if (!txt) return; motBtn.disabled = true; motBtn.textContent = "Envoi…"; dbInserer("dadoucherie_mots", { message: txt }).then(() => { motTexte.value = ""; motTexte.hidden = true; motBtn.hidden = true; $("motMerci").hidden = false; pluie(["💌", "🤍", "🦋", "✨"], 20, 15); }); });

      /* PIÈCE D'OR */
      const piece = $("piece"), tresorMsg = $("tresorMsg");
      piece.addEventListener("click", () => { piece.style.display = "none"; if (navigator.vibrate) navigator.vibrate(30); dbInserer("tresor", { piece: "dadoucherie" }).then(() => fetch(DB_URL + "/rest/v1/tresor?select=piece", { headers: { apikey: DB_KEY, Authorization: "Bearer " + DB_KEY } }).then((r) => r.json()).catch(() => [])).then((rows) => { const u = {}; (rows || []).forEach((r) => { u[r.piece] = 1; }); const n = Object.keys(u).length; if (n >= 3) { tresorMsg.textContent = "🏆 3 pièces sur 3 ! Le trésor est complet. Va dire « jackpot » à Mathieu : il te doit une vraie récompense, et il sait laquelle."; pluie(["🪙", "💰", "✨"], 28, 16); } else tresorMsg.textContent = "🪙 Une pièce dorée ! (" + n + "/3) Il y en a d'autres cachées sur le site, une par page. Ouvre l'œil…"; tresorMsg.style.display = "block"; setTimeout(() => { tresorMsg.style.display = "none"; }, 9000); }); });

      const artisans = ["fait main, pour toi, depuis 2020, aujourd'hui encore.", "chaque pixel de cette page a pensé à toi avant toi.", "site garanti sans mensonge : tout est vérifié dans mon cœur.", "construit un soir où tu me manquais.", "aucun papillon n'a été maltraité pour cette page.", "relu douze fois. pensé à toi les douze fois.", "version " + (new Date().getFullYear() - 2019) + ".0 de nous. mises à jour illimitées."];
      $("artisan").textContent = artisans[new Date().getDay()];

      /* BOUTONS VOIX */
      (function () { let lecteurActuel = null, boutonActuel = null; root.querySelectorAll(".voix").forEach((btn) => { btn.addEventListener("click", () => { if (boutonActuel === btn && lecteurActuel && !lecteurActuel.paused) { lecteurActuel.pause(); lecteurActuel.currentTime = 0; btn.classList.remove("joue"); lecteurActuel = null; boutonActuel = null; return; } if (lecteurActuel) lecteurActuel.pause(); if (boutonActuel) boutonActuel.classList.remove("joue"); lecteurActuel = new Audio(btn.dataset.audio); boutonActuel = btn; btn.classList.add("joue"); lecteurActuel.play().catch(() => btn.classList.remove("joue")); lecteurActuel.addEventListener("ended", () => btn.classList.remove("joue")); dbInserer("dadoucherie_journal", { type: "voix", periode: btn.dataset.audio.split("/").pop() }); }); }); })();

      /* AMBIANCE SONORE */
      const audio = $("audioAmb"), soundBtn = $("soundBtn");
      audio.src = "/musique-" + periode + ".mp3"; audio.volume = 0.55;
      const nomsAmbiance = { aube: "ambiance de l'aube", matin: "ambiance du matin", apresmidi: "ambiance du jour", soir: "ambiance du soir", nuit: "ambiance de la nuit" };
      let on = false;
      soundBtn.addEventListener("click", () => { on = !on; soundBtn.setAttribute("aria-pressed", on ? "true" : "false"); if (on) audio.play().then(() => { soundBtn.textContent = "🔊 " + nomsAmbiance[periode]; }).catch(() => { on = false; soundBtn.setAttribute("aria-pressed", "false"); soundBtn.textContent = "🔇 ambiance"; }); else { audio.pause(); soundBtn.textContent = "🔇 ambiance"; } });

      render();
    })();

    /* ============ SCÈNE IMMERSIVE ============ */
    (function () {
      const cv = $("scene"); if (!cv) return; const ctx = cv.getContext("2d");
      const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      let W, H, DPR;
      const h = new Date().getHours();
      const per = (h >= 5 && h < 8) ? "aube" : (h >= 8 && h < 12) ? "matin" : (h >= 12 && h < 18) ? "apresmidi" : (h >= 18 && h < 23) ? "soir" : "nuit";
      const resize = () => { DPR = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight; cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); };
      onWin("resize", resize); resize();
      const rnd = (a, b) => a + Math.random() * (b - a);
      const PAL = { aube: ["#232A52", "#7A5578", "#F4C79A"], matin: ["#A7CCEC", "#D7E6E9", "#F7F0DD"], apresmidi: ["#9FC6EC", "#CFE2EE", "#F3E7D2"], soir: ["#352C56", "#B5567C", "#F1A65E"], nuit: ["#0B1026", "#161C3C", "#28213E"] };
      const pal = PAL[per]; const estNuit = (per === "nuit"); const estJour = (per === "matin" || per === "apresmidi");
      const soleil = { aube: { x: 0.5, y: 0.92, r: 52, c: "#FFE7B8", glow: "#F7B96A" }, matin: { x: 0.78, y: 0.24, r: 42, c: "#FFF6E0", glow: "#FFE29A" }, apresmidi: { x: 0.62, y: 0.16, r: 40, c: "#FFFAEC", glow: "#FFEDBB" }, soir: { x: 0.5, y: 0.86, r: 66, c: "#FFF0D0", glow: "#F4934E" } }[per];
      const etoiles = []; if (estNuit) for (let i = 0; i < 220; i++) etoiles.push({ x: Math.random(), y: Math.random() * 0.85, r: rnd(0.4, 1.6), tw: rnd(0, 6.3), v: rnd(0.5, 1.4) });
      const motes = []; if (!estNuit) for (let i = 0; i < 34; i++) motes.push({ x: Math.random(), y: Math.random(), r: rnd(0.8, 2.4), v: rnd(0.02, 0.06), ph: rnd(0, 6.3) });
      const nuages = []; if (!estNuit) { const nn = estJour ? 3 : 2; for (let i = 0; i < nn; i++) nuages.push({ x: Math.random(), y: rnd(0.12, 0.4), s: rnd(0.6, 1.2), v: rnd(0.006, 0.014), o: rnd(0.10, 0.22) }); }
      let filante = null;
      setI(() => { if (estNuit && !reduce && !filante && Math.random() < 0.6) filante = { x: rnd(0.1, 0.7) * W, y: rnd(0.05, 0.3) * H, vx: rnd(7, 11), vy: rnd(2.5, 4), vie: 1 }; }, 6500);
      let vol = null;
      setI(() => { if ((per === "aube" || per === "soir" || estJour) && !reduce && !vol && Math.random() < 0.5) vol = { x: -0.1, y: rnd(0.2, 0.55), v: rnd(0.0011, 0.0019), ph: rnd(0, 6.3), up: Math.random() < 0.5 ? 1 : -1 }; }, 5200);
      let mx = 0.5, my = 0.5; onWin("mousemove", (e) => { mx = e.clientX / W; my = e.clientY / H; }, { passive: true });
      const hexA = (hex, a) => { let c = hex.replace("#", ""); if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]; const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16); return "rgba(" + r + "," + g + "," + b + "," + a + ")"; };
      const dessinerNuage = (x, y, s, o) => { ctx.save(); ctx.globalAlpha = o; ctx.fillStyle = "#FFFFFF"; [[0, 0, 34], [26, 4, 26], [-26, 4, 26], [12, -8, 22], [-12, -6, 20]].forEach((b) => { ctx.beginPath(); ctx.ellipse(x + b[0] * s, y + b[1] * s, b[2] * s, b[2] * s * 0.62, 0, 0, 6.283); ctx.fill(); }); ctx.restore(); };
      const dessinerVol = (x, y, t, per) => { if (per === "soir" || per === "aube") { ctx.strokeStyle = "rgba(40,30,45,.4)"; ctx.lineWidth = 2; const w = 7 + Math.sin(t * 6) * 3; ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.quadraticCurveTo(x - 4, y - w, x, y); ctx.quadraticCurveTo(x + 4, y - w, x + 10, y); ctx.stroke(); } else { const flap = Math.abs(Math.sin(t * 9)); ctx.save(); ctx.translate(x, y); for (let c = -1; c <= 1; c += 2) { ctx.save(); ctx.scale(c * (0.4 + 0.6 * flap), 1); ctx.fillStyle = "rgba(236,150,170,.75)"; ctx.beginPath(); ctx.ellipse(6, -3, 6, 4.4, -0.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.ellipse(5, 3, 4.6, 3.4, 0.4, 0, 6.283); ctx.fill(); ctx.restore(); } ctx.restore(); } };
      const t0 = performance.now();
      const frame = (now) => {
        const t = (now - t0) / 1000;
        const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, pal[0]); g.addColorStop(0.55, pal[1]); g.addColorStop(1, pal[2]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        if (estNuit) {
          for (let i = 0; i < etoiles.length; i++) { const s = etoiles[i]; const sc = reduce ? 0.8 : (0.55 + 0.45 * Math.sin(t * s.v + s.tw)); ctx.beginPath(); ctx.arc(s.x * W + (mx - 0.5) * -10, s.y * H + (my - 0.5) * -6, s.r, 0, 6.283); ctx.fillStyle = "rgba(236,236,255," + (sc * 0.9).toFixed(3) + ")"; ctx.fill(); }
          const lx = W * 0.76, ly = H * 0.2, lr = 44; const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr * 2.4); lg.addColorStop(0, "rgba(245,242,255,.5)"); lg.addColorStop(1, "rgba(245,242,255,0)"); ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(lx, ly, lr * 2.4, 0, 6.283); ctx.fill(); ctx.beginPath(); ctx.arc(lx, ly, lr, 0, 6.283); ctx.fillStyle = "#F3F0FA"; ctx.fill(); ctx.beginPath(); ctx.arc(lx + 16, ly - 6, lr, 0, 6.283); ctx.fillStyle = pal[0]; ctx.globalAlpha = 0.5; ctx.fill(); ctx.globalAlpha = 1;
          if (filante) { const f = filante; const grd = ctx.createLinearGradient(f.x, f.y, f.x - f.vx * 9, f.y - f.vy * 9); grd.addColorStop(0, "rgba(255,255,255," + (0.9 * f.vie) + ")"); grd.addColorStop(1, "rgba(255,255,255,0)"); ctx.strokeStyle = grd; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(f.x - f.vx * 9, f.y - f.vy * 9); ctx.stroke(); f.x += f.vx; f.y += f.vy; f.vie -= 0.016; if (f.vie <= 0 || f.x > W + 60) filante = null; }
        } else {
          const sx = soleil.x * W, sy = soleil.y * H; const rayonHalo = Math.max(W, H) * (per === "soir" || per === "aube" ? 0.8 : 0.55);
          const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, rayonHalo); halo.addColorStop(0, hexA(soleil.glow, 0.55)); halo.addColorStop(0.25, hexA(soleil.glow, 0.22)); halo.addColorStop(1, hexA(soleil.glow, 0)); ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);
          if (!reduce) { ctx.save(); ctx.translate(sx, sy); ctx.rotate(t * 0.02); for (let r = 0; r < 12; r++) { ctx.rotate(6.283 / 12); const rg = ctx.createLinearGradient(0, 0, 0, -rayonHalo); rg.addColorStop(0, hexA(soleil.glow, per === "soir" ? 0.10 : 0.07)); rg.addColorStop(1, hexA(soleil.glow, 0)); ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(14, 0); ctx.lineTo(60, -rayonHalo); ctx.lineTo(-60, -rayonHalo); ctx.closePath(); ctx.fill(); } ctx.restore(); }
          nuages.forEach((n) => { n.x += n.v * 0.004 * (reduce ? 0 : 1); if (n.x > 1.25) n.x = -0.25; dessinerNuage(n.x * W, n.y * H, n.s, n.o); });
          const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, soleil.r * 1.4); sg.addColorStop(0, soleil.c); sg.addColorStop(0.7, soleil.c); sg.addColorStop(1, hexA(soleil.glow, 0.2)); ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, soleil.r, 0, 6.283); ctx.fill();
          for (let i = 0; i < motes.length; i++) { const m = motes[i]; m.y -= m.v * 0.004 * (reduce ? 0 : 1); if (m.y < -0.05) { m.y = 1.05; m.x = Math.random(); } const mxp = m.x * W + Math.sin(t * 0.6 + m.ph) * 8; ctx.beginPath(); ctx.arc(mxp, m.y * H, m.r, 0, 6.283); ctx.fillStyle = "rgba(255,248,220," + (per === "soir" ? 0.35 : 0.28) + ")"; ctx.fill(); }
        }
        if (vol) { vol.x += vol.v * (reduce ? 0 : 1); const vx = vol.x * W, vy = vol.y * H + Math.sin(t * 1.4 + vol.ph) * 14 * vol.up; dessinerVol(vx, vy, t, per); if (vol.x > 1.15) vol = null; }
        rAF(frame);
      };
      rAF(frame);
    })();

    return () => { timers.forEach(clearInterval); rafs.forEach(cancelAnimationFrame); listeners.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn)); };
  }, []);

  return (
    <div className="ddw" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <canvas id="scene" aria-hidden="true" />
      <audio id="audioAmb" loop preload="none" />
      <button className="sound" id="soundBtn" aria-pressed="false">🔇 ambiance</button>
      <a className="retour-lien" href="/">⌂ l&apos;accueil</a>
      <div className="ciel" id="ciel" aria-hidden="true" />

      <nav className="rail" aria-hidden="true">
        <div className="track" /><div className="thread" id="thread" />
        <span className="dot" /><span className="dot" /><span className="dot" /><span className="dot" /><span className="dot" /><span className="dot" />
      </nav>

      <main className="stage" aria-live="polite">
        <section className="step is-active" data-step="0" tabIndex={-1}>
          <p className="eyebrow" id="greetEyebrow">pour toi</p>
          <h1 id="greetTitle">Coucou,<br />dadouchérie</h1>
          <p className="special" id="jourSpecial" hidden />
          <p className="special" id="motDuJour" hidden />
          <div className="lettre-jour" id="lettreJour" hidden>
            <div className="lj-tete" id="ljTete" /><div className="lj-texte" id="ljTexte" /><div className="lj-sign">Ton Mathieu</div>
          </div>
          <div id="greetBody" />
          <button className="voix" data-audio="/bonjour.mp3"><span className="onde"><i /><i /><i /><i /></span> écoute mon bonjour</button>
          <p className="soft" id="visites" hidden />
          <div className="enveloppes" id="enveloppes" />
          <p className="soft">Petit secret : ce site vit à la même heure que toi. Ouvre-le un matin, il sera doux et fleuri. Ouvre-le un soir, il rougit. Ouvre-le en pleine nuit, il allume les étoiles. Comme moi, en fait : je change d&apos;humeur, mais je t&apos;aime à toutes les heures.</p>
          <div className="actions"><button className="btn btn-primary" data-go="1">Je commence</button></div>
        </section>

        <section className="step" data-step="1" tabIndex={-1}>
          <p className="eyebrow">simplement</p>
          <h2>Ce que je veux te dire</h2>
          <p>Je t&apos;aime. Voilà, c&apos;est dit, et je pourrais m&apos;arrêter là. Mais tu me connais, et surtout je te connais : tu aimes les longs messages, ceux qu&apos;on lit deux fois, ceux qu&apos;on garde. Alors installe-toi.</p>
          <p>Je t&apos;aime, et pas seulement les jours faciles. Je t&apos;aime les jours en désordre, les jours à cent à l&apos;heure, les jours où tout va de travers et où on se comprend quand même d&apos;un regard. Je t&apos;aime quand tu ris tellement fort que tu essaies de te cacher derrière ta main (raté, d&apos;ailleurs, ça marche jamais). Je t&apos;aime quand tu me racontes ta journée dans le désordre le plus total et que je dois reconstituer l&apos;histoire comme un puzzle. Je t&apos;aime même quand tu as raison alors que j&apos;étais sûr d&apos;avoir raison, ce qui, statistiquement, arrive bien trop souvent.</p>
          <p>Sept ans que tu es dans ma vie. Sept ans, tu te rends compte ? Il y a des gens qui ne gardent pas un téléphone aussi longtemps. Et moi, chaque matin, je te choisis encore. Pas par habitude, par évidence. Toi, exactement comme tu es. C&apos;est <em className="big-heart">ça</em> que je choisis.</p>
          <button className="voix" data-audio="/je-taime.mp3"><span className="onde"><i /><i /><i /><i /></span> écoute-moi te le dire</button>
          <div className="actions"><button className="btn btn-primary" data-go="2">Continuer</button></div>
          <div className="backrow"><button className="back" data-go="0">← revenir</button></div>
        </section>

        <section className="step" data-step="2" tabIndex={-1}>
          <p className="eyebrow">côté ingénieur</p>
          <h2>Bulletin technique<br />de mon cœur</h2>
          <div className="term">
            <div><span className="prompt">$</span> status --coeur</div>
            <div><span className="ok">●</span> connexion d&apos;origine : Snapchat, il y a 7 ans</div>
            <div><span className="arrow">&nbsp;&nbsp;&nbsp;→ meilleur ajout de toute ma vie, et de loin</span></div>
            <div><span className="ok">●</span> en service officiel depuis le 01/01/2020, zéro panne majeure</div>
            <div><span className="ok">●</span> uptime : <span id="uptime">beaucoup de</span> jours depuis Lyon, et ça tourne toujours</div>
            <div><span className="ok">●</span> batterie : rechargée à chaque fois que tu ris</div>
            <div><span className="ok">●</span> mise à jour installée : « je t&apos;aime » v.∞</div>
            <div><span className="ok">●</span> bug connu : je pense à toi même quand je bosse</div>
            <div><span className="arrow">&nbsp;&nbsp;&nbsp;→ correctif prévu : aucun. on garde.</span></div>
            <div><span className="ok">●</span> solde du compte affectif : illimité</div>
            <div><span className="arrow">&nbsp;&nbsp;&nbsp;→ pour l&apos;autre compte, on y travaille 💪</span></div>
          </div>
          <p className="soft">Oui, je suis ingénieur. Non, je ne sais pas le dire autrement. Mais crois-moi, chaque ligne est vérifiée, testée, et validée en production depuis des années.</p>
          <div className="actions"><button className="btn btn-primary" data-go="3">Continuer</button></div>
          <div className="backrow"><button className="back" data-go="1">← revenir</button></div>
        </section>

        <section className="step" data-step="3" tabIndex={-1}>
          <p className="eyebrow">nous</p>
          <h2>Notre histoire,<br />en vrai</h2>
          <ul className="tl">
            <li><span className="when">il y a 7 ans · Snapchat</span><br /><span className="what">Tout commence par un ajout sur Snap. Franchement, qui aurait parié qu&apos;une appli où les messages disparaissent en 10 secondes me donnerait la personne la plus permanente de ma vie ?</span></li>
            <li><span className="when">1er janvier 2020 · Lyon</span><br /><span className="what">La première fois que je te vois en vrai. Premier jour de l&apos;année, première fois de nous. Et là, sans effet spécial, sans prévenir : j&apos;ai su. Le monde entier prenait de bonnes résolutions, moi j&apos;en ai pris une seule, et je la tiens encore.</span></li>
            <li><span className="when">15 juillet 2023 · notre nuit</span><br /><span className="what">La deuxième fois qu&apos;on se voit. On a passé la nuit ensemble à parler, à tout se dire : nos sentiments, nos peurs, nos envies. Le soleil s&apos;est levé et on parlait encore. C&apos;est cette nuit-là que « toi et moi » est devenu « nous ».</span></li>
            <li><span className="when">Monaco · Malte · Barcelone</span><br /><span className="what">Nos échappées. Trois villes, mille souvenirs, et toujours la même conclusion : peu importe la destination, ma plus belle vue c&apos;est toi en face de moi.</span></li>
            <li><span className="when">aujourd&apos;hui</span><br /><span className="what">Et je te choisis encore. Ça fait exactement <span id="joursLyon">…</span> jours que je t&apos;ai vue pour la première fois, et je compte bien au moins doubler ce chiffre. Puis le redoubler. Tu es prévenue.</span></li>
          </ul>
          <div className="actions"><button className="btn btn-primary" data-go="4">Continuer</button></div>
          <div className="backrow"><button className="back" data-go="2">← revenir</button></div>
        </section>

        <section className="step" data-step="4" tabIndex={-1}>
          <p className="eyebrow">soyons honnêtes</p>
          <h2>La partie que<br />tu attendais</h2>
          <p>Bon. On se connaît depuis 7 ans, alors je vais pas te mentir : je sais très bien que les fleurs, les papillons et les jolis mots, ça te fait fondre… mais qu&apos;il y a une autre chose qui fait briller tes yeux presque autant que moi. Presque.</p>
          <p>Alors j&apos;ai fait ce que tout homme amoureux et un minimum lucide aurait fait : j&apos;ai mis de l&apos;argent dans ce site. Pas beaucoup, on se calme. Mais appuie sur le bouton doré et regarde ce que ça donne.</p>
          <div className="compteur"><div className="label">Ta valeur estimée à mes yeux</div><div className="valeur" id="valeur">calcul en cours…</div></div>
          <p className="soft" id="pluies" hidden />
          <div className="actions"><button className="btn btn-gold" id="moneyBtn">Fais pleuvoir 💸</button><button className="btn btn-primary" data-go="5">Continuer</button></div>
          <div className="backrow"><button className="back" data-go="3">← revenir</button></div>
        </section>

        <section className="step" data-step="5" tabIndex={-1}>
          <p className="eyebrow">une dernière chose</p>
          <h2>Et j&apos;arrête<br />de t&apos;embêter</h2>
          <p>Merci d&apos;être toi. Merci pour Lyon, pour Monaco, pour Malte, pour Barcelone, pour cette nuit de juillet où on s&apos;est tout dit. Merci pour les sept ans qui viennent de passer, et pardon d&apos;avance pour les soixante-dix qui arrivent : tu vas devoir me supporter encore longtemps, c&apos;est écrit noir sur blanc ici, ça fait foi.</p>
          <p>Merci de me laisser t&apos;aimer à ma façon, avec des sites web, des mots un peu maladroits, des blagues d&apos;ingénieur, et beaucoup de patience de ta part.</p>
          <p>Je t&apos;aime, dadouchérie. Aujourd&apos;hui, et encore demain. Et le jour d&apos;après aussi, mais je vais pas tous les lister, le site deviendrait trop long même pour toi.</p>
          <div className="finalwrap">
            <svg className="heartsvg" id="heart" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 82 C50 82 12 58 12 34 C12 20 24 14 34 18 C42 21 50 32 50 32 C50 32 58 21 66 18 C76 14 88 20 88 34 C88 58 50 82 50 82 Z" /></svg>
            <button className="btn btn-primary" id="loveBtn">Appuie ici 🤍</button>
            <p className="signoff" id="signoff">Ton Mathieu</p>
            <p className="soft" id="coeurCompte" hidden />
            <p className="secret" id="secret" hidden>Trois fois sur mon cœur ? Alors tu as trouvé le passage secret. Ce message n&apos;était pas prévu pour être lu, mais puisque tu es là : parfois je te regarde quand tu ne le vois pas, et je me dis que j&apos;ai une chance folle. Voilà. C&apos;était le secret. Il est à toi maintenant.</p>
          </div>
          <div className="repondre" id="repondre">
            <p className="soft">Et si tu veux me répondre, c&apos;est juste ici. Prends toute la place qu&apos;il te faut : tu sais très bien que j&apos;aime tes pavés autant que tu aimes les miens. Ce que tu écris arrive directement chez moi, et nulle part ailleurs.</p>
            <p className="soft" id="accuse" hidden />
            <textarea id="motTexte" placeholder="Écris-moi ce que tu veux, mon amour…" />
            <button className="btn btn-primary" id="motBtn">Je t&apos;envoie ça 💌</button>
            <p className="soft" id="motMerci" hidden>C&apos;est parti. Je vais le lire, le relire, puis le relire encore. Merci mon amour.</p>
          </div>
          <div className="backrow"><button className="back" id="restart">recommencer depuis le début</button></div>
        </section>
      </main>

      <p className="portes"><a href="/">⌂ l&apos;accueil du site</a> · psst… il existe d&apos;autres portes : <a href="/histoire">notre histoire</a> · <a href="/jeux">nos jeux</a> · <a href="/nuit">notre nuit 🌌</a> · <a href="/ocean">la mer 🌊</a> · <a href="/jardin">le jardin 🌸</a> · <a href="/feu">le feu 🔥</a> · <a href="/au-cas-ou">au cas où 🕊️</a> · <a href="/reves">nos rêves 🗺️</a> · <a href="/toi">comment tu te sens</a> · <a href="/souhaits">nos rêves à deux</a></p>
      <p className="artisan" id="artisan" />

      <button className="btn-douceur" id="btnDouceur">🕯️ j&apos;ai besoin de douceur</button>
      <button className="piece" id="piece" aria-label="une pièce dorée">🪙</button>
      <div className="tresor-msg" id="tresorMsg" />
    </div>
  );
}
