"use client";
import { useEffect, useRef, useState } from "react";

const STATIC = "https://pour-toi-site.vercel.app";
const LETTRES = [
  { salut: "Ma dadoucherie,", corps: ["On est encore le 15. Notre jour. Celui que j'ai décidé, il y a longtemps, de ne jamais laisser passer comme un jour ordinaire, parce qu'avec toi, aucun jour n'est ordinaire.", "Ça fait deux mois qu'on ne s'est pas vus, et je ne vais pas te mentir : tu me manques d'une façon que je ne savais même pas possible avant toi. Ta voix, ta façon de rire quand tu essaies de te retenir, ta main que je cherche encore parfois sans réfléchir. Tout ça me manque.", "Mais tu sais quoi ? Même à des kilomètres, tu es la première pensée qui me réveille et la dernière qui m'endort. La distance n'a rien enlevé. Elle a juste rendu chaque petit moment avec toi encore plus précieux.", "Alors aujourd'hui, laisse-moi te le redire, comme si on était l'un contre l'autre : je t'aime. Profondément, calmement, pour de vrai. Et je compte déjà les jours jusqu'à ce que je puisse t'offrir tes fleurs en vrai, et pas seulement à travers un écran."], sign: "Mathieu, à toi. 🤍" },
  { salut: "Toi que j'aime,", corps: ["Joyeux 15, ma dadoucherie. Je me suis assis un moment avant d'écrire ça, juste pour penser à nous. À tout ce chemin.", "Deux inconnus sur Snapchat, il y a des années. Un message, puis un autre. Qui aurait cru que ça deviendrait ça, toi et moi, notre monde, nos projets, nos silences qui ne sont jamais gênants ?", "Je sais que montrer ce qu'on ressent, ce n'est pas toujours facile pour toi. Et je veux que tu saches une chose : tu n'as jamais besoin de forcer quoi que ce soit avec moi. Ta présence me suffit. Un « coucou », un emoji, un rien du tout de ta part vaut plus que de grands discours.", "Tu es aimée exactement comme tu es. Pas la version parfaite de toi, toi. Celle qui doute, celle qui fatigue, celle qui rit trop fort. Toute. Et le 15 prochain, je serai encore là, à te le redire."], sign: "Ton Mathieu 🤍" },
  { salut: "Ma douce dadoucherie,", corps: ["Encore un 15. Encore une occasion de te rappeler que tu comptes, énormément, et pas seulement les jours de fête.", "Je repense souvent à Lyon, ce 1er janvier. La première fois pour de vrai. J'avais le cœur qui cognait comme un idiot. Et à notre nuit du 15 juillet, celle dont on ne parle pas trop fort, notre ciel, rien qu'à nous.", "On a Monaco, Malte, Barcelone dans nos souvenirs, et tellement d'endroits encore à ouvrir ensemble. Chaque voyage avec toi, c'est comme une parenthèse qu'on écrit à deux.", "La distance, en ce moment, c'est dur. Mais elle est temporaire, et nous, on ne l'est pas. Alors tiens bon, ma belle. Je suis là, chaque jour, même quand je ne suis pas là. Bonne fête du 15, mon amour."], sign: "Mathieu, pour toujours un peu plus. 🤍" },
  { salut: "Mon amour,", corps: ["Bonne fête, ma dadoucherie. Aujourd'hui je ne veux pas te parler de la distance, ni de ce qui manque. Je veux te parler de ce qu'on a.", "On a une conversation qui n'a jamais vraiment fini depuis le premier jour. On a des projets, des idées, des marques qu'on construit. On a cette manière de se comprendre sans tout expliquer.", "On a aussi des soirs plus lourds, les tiens et les miens. Et même ceux-là, je les prends avec toi. Parce qu'être avec quelqu'un, ce n'est pas seulement les beaux moments, c'est rester quand c'est moins beau. Et moi, je reste.", "Tu es ma personne. Mon endroit préféré. Le 15, c'est notre petit rituel, mais la vérité c'est que je te choisirais tous les autres jours aussi. Je t'aime."], sign: "Ton Mathieu 🤍" },
  { salut: "Ma dadoucherie à moi,", corps: ["Un 15 de plus, et toujours autant d'envie de te le dire : merci. Merci d'être entrée dans ma vie, merci d'y rester, merci de me supporter aussi.", "Je sais que parfois tu te demandes si tu en fais assez, si tu montres assez ce que tu ressens. Arrête de t'inquiéter pour ça. L'amour, ce n'est pas une performance. Je le vois dans les petites choses : quand tu penses à moi, quand tu m'envoies un truc « parce que ça m'a fait penser à toi ». C'est ça, l'amour. Et tu en donnes plein sans même t'en rendre compte.", "Ce soir, où que tu sois, imagine ma main dans la tienne. Je te serre fort. Vraiment fort. Tu la sens ?", "Bonne fête du 15, ma belle. On se rapproche du jour où je te reprendrai dans mes bras. Et ce jour-là, prépare-toi à beaucoup de fleurs."], sign: "Mathieu, qui t'aime. 🤍" },
  { salut: "Toi, mon 15 préféré,", corps: ["On y est encore. Notre jour. Et à chaque fois, j'ai un peu plus de choses à te dire, parce qu'à chaque fois je t'aime un peu plus.", "Si je pouvais, je téléporterais ces mots directement dans tes bras au lieu d'un écran. Je te ferais un vrai câlin, de ceux qui durent trop longtemps, où on ne veut plus se lâcher.", "En attendant, je fais ce que je peux : je t'écris, je pense à toi, je garde nos souvenirs bien au chaud et je prépare la suite. Parce qu'il y a une suite, ma dadoucherie. Une belle. Je nous la promets.", "Joyeux 15, mon amour. Tu es aimée aujourd'hui, tu l'étais hier, tu le seras demain. Rien de tout ça ne dépend d'un jour du mois, mais aujourd'hui, je te le crie un peu plus fort."], sign: "Ton Mathieu, à jamais. 🤍" },
];
const CADEAUX = [
  { emoji: "🎟️", titre: "Un bon à échanger", texte: "Ce 15-ci, je t'offre un câlin de 20 minutes non négociable, dès qu'on se revoit. Montre-moi ce message et je m'exécute, sans discuter." },
  { emoji: "🌙", titre: "Une soirée rien qu'à nous", texte: "Un bon pour une soirée entière où tu choisis tout : le film, la musique, le plat, le silence. Moi je m'occupe juste de te rendre heureuse." },
  { emoji: "💌", titre: "Une promesse", texte: "Je te promets que la prochaine fois qu'on se voit, tu auras un vrai bouquet dans les bras avant même que j'aie dit bonjour." },
  { emoji: "🎶", titre: "Ta chanson du mois", texte: "Va voir Nos chansons et mets celle que tu préfères en boucle : ce soir, imagine que je te la dédie, rien qu'à toi." },
  { emoji: "⭐", titre: "Une étoile à ton nom", texte: "J'ai décidé qu'une étoile de notre univers portait ton nom à partir d'aujourd'hui. Va la chercher dans Nous deux, elle brille pour toi." },
  { emoji: "🤍", titre: "Un mot secret", texte: "Ouvre bien tes oreilles (façon de parler) : tu es la meilleure chose qui me soit arrivée. Garde ce cadeau-là, il ne s'use jamais." },
];

export default function Le15() {
  const [etat, setEtat] = useState(null);
  const [cadOuvert, setCadOuvert] = useState(false);
  const [paquet, setPaquet] = useState("🎁");
  const [secoue, setSecoue] = useState(false);
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const idx = (now.getFullYear() * 12 + now.getMonth()) % LETTRES.length;
    const idxC = (now.getFullYear() * 12 + now.getMonth()) % CADEAUX.length;
    let estLe15 = now.getDate() === 15;
    if (typeof location !== "undefined" && location.search.indexOf("preview") > -1) estLe15 = true;
    const joursEns = Math.floor((Date.now() - new Date(2020, 0, 1).getTime()) / 86400000);
    const joursDansMois = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    if (estLe15) setEtat({ mode: "15", L: LETTRES[idx], C: CADEAUX[idxC], joursEns });
    else {
      const j = now.getDate(); const reste = j < 15 ? 15 - j : joursDansMois(now) - j + 15;
      const pensees = ["Ce n'est pas encore notre jour… mais tu sais quoi ? Je pense à toi quand même, comme tous les jours.", "Reviens le 15, j'ai préparé quelque chose. En attendant, sache juste que tu me manques.", "Chaque jour qui passe, c'est un jour de plus vers le moment où je te reprends dans mes bras.", "Tu es aimée aujourd'hui aussi, même si ce n'est pas marqué sur le calendrier."];
      setEtat({ mode: "attente", reste, pensee: pensees[now.getDate() % pensees.length], joursEns });
    }
  }, []);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return; const x = cv.getContext("2d"); let W, H, parts = [], raf;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const couleurs = ["#C7B2E6", "#B49BDA", "#E9DEF7", "#8E6FBF", "#DCC9F5"];
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const petale = (x0, y0, burst) => ({ x: x0, y: y0, r: Math.random() * 5 + 3, c: couleurs[Math.floor(Math.random() * couleurs.length)], vx: (Math.random() - 0.5) * (burst ? 7 : 1.1), vy: burst ? (-Math.random() * 7 - 2) : (Math.random() * 1.1 + 0.5), a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.15, life: burst ? 150 : 99999 });
    const ambient = reduce ? 0 : (innerWidth < 640 ? 14 : 26);
    for (let i = 0; i < ambient; i++) parts.push(petale(Math.random() * W, Math.random() * H, false));
    confettiRef.current = () => { if (reduce) return; for (let i = 0; i < 90; i++) parts.push(petale(W / 2, H * 0.4, true)); };
    const draw = () => { x.clearRect(0, 0, W, H); for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.x += p.vx; p.y += p.vy; p.a += p.va; if (p.life < 90000) { p.vy += 0.12; p.life--; } if (p.life < 90000 && (p.life <= 0 || p.y > H + 20)) { parts.splice(i, 1); continue; } if (p.life > 90000) { if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; } if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10; } x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.globalAlpha = p.life < 90000 ? Math.max(0, Math.min(1, p.life / 60)) : 0.55; x.fillStyle = p.c; x.beginPath(); x.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.28); x.fill(); x.restore(); } raf = requestAnimationFrame(draw); };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  const ouvrirCadeau = () => { if (cadOuvert) return; setCadOuvert(true); try { if (navigator.vibrate) navigator.vibrate([20, 50, 20]); } catch (e) {} setSecoue(true); setTimeout(() => { setPaquet("🎉"); if (confettiRef.current) confettiRef.current(); setSecoue(false); }, 620); };

  const btn = (primary) => ({ fontFamily: "var(--sans)", fontWeight: 700, fontSize: ".95rem", borderRadius: 100, padding: "11px 20px", cursor: "pointer", border: "1px solid transparent", textDecoration: "none", color: primary ? "#1a1430" : "#EDE9F3", background: primary ? "linear-gradient(180deg,#CBB4EC,#A886DA)" : "rgba(255,255,255,.07)", ...(primary ? {} : { borderColor: "rgba(255,255,255,.16)" }) });

  return (
    <div style={{ color: "#EDE9F3", background: "radial-gradient(120% 80% at 50% -8%, #2a1f47 0%, transparent 55%),radial-gradient(90% 60% at 88% 108%, #1d2144 0%, transparent 60%),#0d0b1a", minHeight: "100dvh", overflowX: "hidden" }}>
      <style>{`@keyframes le15Secoue{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg)}40%{transform:rotate(7deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(4deg)}}`}</style>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "max(24px,env(safe-area-inset-top)) 22px 90px" }}>
        <a className="retour" href="/surprise" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", color: "rgba(237,233,243,.72)" }}>⌂ rentrer</a>

        {!etat ? null : etat.mode === "15" ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#C7B2E6", fontSize: "1.1rem", margin: "0 0 .3rem" }}>on est le 15, notre jour</p>
              <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(2.1rem,7.5vw,3.1rem)", margin: 0, color: "#FBF4EA" }}>Joyeux 15 🤍</h1>
            </div>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#B49BDA", fontSize: "1.15rem", textAlign: "center", margin: "6px 0 0" }}>Notre premier vrai jour, c&apos;était il y a {etat.joursEns} jours 🤍</p>
            <div style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(180,155,218,.22)", borderRadius: 22, padding: "26px 24px", margin: "26px 0 0" }}>
              <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.4rem", color: "#E9DEF7", margin: "0 0 14px" }}>{etat.L.salut}</p>
              {etat.L.corps.map((p, i) => <p key={i} style={{ fontSize: "1.06rem", lineHeight: 1.85, color: "#E2DCEC", margin: "0 0 15px" }}>{p}</p>)}
              <p style={{ textAlign: "right", fontFamily: "var(--serif)", fontStyle: "italic", color: "#C7B2E6", fontSize: "1.1rem", marginTop: 10 }}>{etat.L.sign}</p>
            </div>
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <div role="button" tabIndex={0} onClick={ouvrirCadeau} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") ouvrirCadeau(); }} style={{ fontSize: "4.6rem", lineHeight: 1, cursor: "pointer", display: "inline-block", filter: "drop-shadow(0 10px 24px rgba(142,111,191,.5))", animation: secoue ? "le15Secoue .6s ease" : "none" }}>{paquet}</div>
              <div style={{ color: "#A99CC4", fontSize: ".95rem", marginTop: 10 }}>{cadOuvert ? "rien que pour toi." : "touche le cadeau pour l'ouvrir"}</div>
              {cadOuvert && (
                <div style={{ marginTop: 22, background: "linear-gradient(180deg, rgba(142,111,191,.18), rgba(142,111,191,.06))", border: "1px solid rgba(199,178,230,.4)", borderRadius: 20, padding: "24px 22px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "1.4rem", color: "#FBF4EA", margin: "0 0 10px" }}>{etat.C.emoji} {etat.C.titre}</div>
                  <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#E4DEEE", margin: 0 }}>{etat.C.texte}</p>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 26 }}>
              <a style={btn(false)} href={STATIC + "/nous-deux"}>Notre monde en 3D</a>
              <a style={btn(false)} href="/chansons">Nos chansons</a>
              <a style={btn(true)} href="/fleurs">Tes fleurs du jour</a>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#C7B2E6", fontSize: "1.1rem", margin: "0 0 .3rem" }}>notre rendez-vous mensuel</p>
              <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(2.1rem,7.5vw,3.1rem)", margin: 0, color: "#FBF4EA" }}>Le 15</h1>
            </div>
            <div style={{ fontSize: "3.4rem", margin: "18px 0 8px" }}>🌙</div>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "#B49BDA", fontSize: "1.15rem", textAlign: "center" }}>{etat.reste === 1 ? "plus qu'un jour" : "plus que " + etat.reste + " jours"} avant notre 15</p>
            <p style={{ marginTop: 22, fontFamily: "var(--serif)", fontStyle: "italic", color: "#D8CBEF", fontSize: "1.12rem", lineHeight: 1.7, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>{etat.pensee}</p>
            <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: ".96rem", color: "#B49BDA", lineHeight: 1.7, maxWidth: 460, margin: "8px auto 0" }}>Et ça fait déjà {etat.joursEns} jours qu&apos;on s&apos;aime.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 26 }}>
              <a style={btn(false)} href="/fleurs">Tes fleurs du jour</a>
              <a style={btn(false)} href="/chansons">Nos chansons</a>
              <a style={btn(true)} href="/cocon">Un cocon si besoin</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
