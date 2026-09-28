"use client";
import { useEffect, useRef, useState } from "react";

const CONTINENTS = [
  "M120,90 L200,80 L250,110 L240,160 L200,210 L170,200 L150,150 L120,130 Z",
  "M240,250 L290,240 L300,300 L280,370 L250,400 L235,340 L245,290 Z",
  "M470,95 L540,85 L560,120 L530,150 L490,150 L465,125 Z",
  "M480,180 L560,170 L580,230 L560,310 L510,340 L485,290 L475,220 Z",
  "M580,80 L780,70 L860,110 L840,180 L760,200 L660,180 L600,150 L575,110 Z",
  "M640,200 L720,195 L760,230 L730,270 L680,255 L650,225 Z",
  "M800,320 L870,310 L890,350 L860,385 L810,375 L795,345 Z",
];
const REVES = [
  { nom: "Polynésie française", lon: -149.4, lat: -17.5, quoi: "lagons & bungalows sur l'eau", txt: "Le rêve turquoise. Un lagon si clair qu'on verra le fond, un bungalow sur pilotis, et rien d'autre à faire que d'être là, ensemble. Le genre d'endroit qu'on regarde en photo en se disant « un jour ». Ce jour, on le mettra dans le calendrier." },
  { nom: "Chine", lon: 104, lat: 35, quoi: "la Grande Muraille & les lanternes", txt: "Marcher sur quelque chose qu'on voit depuis l'espace, main dans la main. Se perdre dans une mégapole illuminée. Manger des choses qu'on ne sait pas nommer et adorer ça. La Chine, c'est le dépaysement total, et j'ai envie de le vivre avec toi." },
  { nom: "Corée du Sud", lon: 127.8, lat: 36.5, quoi: "Séoul, la nuit qui ne dort jamais", txt: "Séoul illuminée, les palais anciens à côté des néons, la street food à minuit. Un pays qui ne dort jamais, donc parfait pour deux insomniaques comme nous. On y traînera jusqu'à l'aube, notre spécialité." },
  { nom: "Croisière transatlantique", lon: -40, lat: 38, quoi: "traverser un océan, à deux", txt: "Ton rêve à toi : traverser l'Atlantique en bateau. Plusieurs jours entre deux continents, juste de l'eau à l'horizon, et nous au milieu. Rappelle-toi la lettre de la mer : ce qu'il y a tout au fond, c'est toi. Là, on sera dessus, ensemble, pendant des jours." },
  { nom: "Carnaval de Rio", lon: -43.2, lat: -22.9, quoi: "la plus grande fête du monde", txt: "Le carnaval de Rio. Les couleurs, la musique qui fait vibrer le sol, la foule en joie. Toi qui aimes danser, moi qui te regarderai danser. La fête la plus intense de la planète, à cocher ensemble." },
  { nom: "Festival Yi Peng, Thaïlande", lon: 98.98, lat: 18.79, quoi: "mille lanternes dans le ciel", txt: "Chiang Mai, le festival Yi Peng. Des milliers de lanternes qui montent dans la nuit en même temps. On en tiendra une chacun, on fera un vœu, et on la lâchera. Je te préviens tout de suite : mon vœu sera déjà exaucé, parce que tu seras à côté de moi." },
  { nom: "Champs de tulipes, Pays-Bas", lon: 4.6, lat: 52.27, quoi: "des fleurs à perte de vue", txt: "Les champs de tulipes de Keukenhof au printemps. Des kilomètres de fleurs, toutes les couleurs qui existent, alignées sous un ciel doux. Toi qui aimes les fleurs et les jolis décors de film : celui-là est réel, et il t'attend." },
  { nom: "Jérusalem", lon: 35.2, lat: 31.78, quoi: "trois mille ans d'histoire", txt: "Marcher dans une ville où chaque pierre a vu passer des millénaires. Jérusalem, ses ruelles, sa lumière particulière, son poids d'histoire. Un voyage qui n'est pas seulement beau : il fait réfléchir. On en reviendra un peu différents, tous les deux." },
  { nom: "Tanzanie", lon: 34.9, lat: -6.4, quoi: "safari & Kilimandjaro", txt: "L'Afrique, la vraie, immense. Un safari où on retient notre souffle devant les lions, le Kilimandjaro qui domine tout, des couchers de soleil comme on n'en verra nulle part ailleurs. La nature à son état le plus spectaculaire, partagée avec toi." },
  { nom: "Japon", lon: 138, lat: 36.5, quoi: "cerisiers, temples & néons", txt: "Le Japon, notre grand classique du rêve. Les cerisiers au printemps (les pétales qui tombent, comme sur ta page), les temples silencieux, Tokyo en folie, un bol de ramen à deux un soir de pluie. Le pays où la douceur et l'intensité cohabitent, comme nous." },
  { nom: "Égypte", lon: 30, lat: 26.8, quoi: "les pyramides & le Nil", txt: "Se tenir devant les pyramides, ces trucs qu'on apprend à l'école et qu'on n'ose pas croire réels. Naviguer sur le Nil au coucher du soleil. Toucher du doigt cinq mille ans d'histoire. Un rêve d'enfant qu'on réalisera en adultes, main dans la main." },
];
function proj(lon, lat) { return { x: (lon + 180) / 360 * 1000, y: (90 - lat) / 180 * 500 }; }

export default function Reves() {
  const [detail, setDetail] = useState(null);
  const [etoiles, setEtoiles] = useState([]);

  useEffect(() => {
    const arr = []; for (let i = 0; i < 70; i++) arr.push({ left: Math.random() * 100, top: Math.random() * 100, delay: Math.random() * 3, scale: 0.5 + Math.random() * 1.5 });
    setEtoiles(arr);
    const t = setTimeout(() => setDetail(REVES[Math.floor(Math.random() * REVES.length)]), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100dvh", background: "radial-gradient(120% 80% at 80% 0%, #1E3050 0%, transparent 55%), radial-gradient(100% 70% at 15% 100%, #172742 0%, transparent 60%), #0F1B30", color: "#EAF0F6", padding: "28px 14px 60px", overflowX: "hidden", position: "relative" }}>
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {etoiles.map((s, i) => <span key={i} style={{ position: "absolute", left: s.left + "vw", top: s.top + "vh", width: 2, height: 2, background: "#fff", borderRadius: "50%", opacity: .5, transform: "scale(" + s.scale + ")", animation: "revScint 3s ease-in-out infinite", animationDelay: s.delay + "s" }} />)}
      </div>
      <style>{`@keyframes revScint{0%,100%{opacity:.2}50%{opacity:.7}}`}</style>

      <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 20px", position: "relative", zIndex: 2 }}>
        <a className="retour" href="/histoire" style={{ color: "#E8B45C" }}>⌂ rentrer</a>
        <p style={{ fontWeight: 700, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#E8B45C", margin: "10px 0 10px" }}>là où on ira</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 500, fontSize: "clamp(1.8rem,7vw,2.5rem)", margin: "0 0 8px" }}>La carte de nos rêves</h1>
        <p style={{ color: "#A9B6CC", fontSize: ".96rem", lineHeight: 1.6 }}>Chaque étoile dorée est un endroit qu&apos;on s&apos;est promis. Touche-les. Le jour où on en décroche un, il rejoindra nos souvenirs, et la carte s&apos;allègera d&apos;un rêve, parce qu&apos;il sera devenu réel.</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <svg viewBox="0 0 1000 500" role="img" aria-label="Carte du monde de nos destinations de rêve" style={{ width: "100%", height: "auto", display: "block" }}>
          <g>{CONTINENTS.map((d, i) => <path key={i} d={d} fill="#24374F" stroke="#33496A" strokeWidth="0.4" />)}</g>
          <g>
            {REVES.map((r, i) => {
              const p = proj(r.lon, r.lat);
              return (
                <g key={i} transform={"translate(" + p.x + "," + p.y + ")"} style={{ cursor: "pointer" }} onClick={() => setDetail(r)}>
                  <circle r="11" fill="#E8B45C" opacity="0.18"><animate attributeName="r" values="7;13;7" dur={(2.4 + i * 0.15) + "s"} repeatCount="indefinite" /></circle>
                  <circle r="3.4" fill="#FFF4E0" stroke="#E8B45C" strokeWidth="1.4" />
                  <text y="-14" fill="#EAF0F6" fontSize="8" fontWeight="600" textAnchor="middle" style={{ pointerEvents: "none", opacity: .85 }}>{r.nom.split(",")[0].split(" ")[0]}</text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {detail && (
        <div style={{ maxWidth: 560, margin: "22px auto 0", background: "rgba(20,32,54,.75)", border: "1px solid rgba(232,180,92,.3)", borderRadius: 18, padding: "22px 24px", backdropFilter: "blur(6px)", position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", color: "#E8B45C", marginBottom: 4 }}>{detail.nom}</div>
          <div style={{ fontSize: ".82rem", color: "#A9B6CC", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12 }}>{detail.quoi}</div>
          <div style={{ fontSize: "1.02rem", lineHeight: 1.65 }}>{detail.txt}</div>
        </div>
      )}

      <p style={{ textAlign: "center", marginTop: 18, color: "#A9B6CC", fontSize: ".9rem", position: "relative", zIndex: 2 }}>{REVES.length} rêves sur la carte. Zéro cliché : ce sont les tiens, les vrais. On les décrochera un par un.</p>
    </div>
  );
}
