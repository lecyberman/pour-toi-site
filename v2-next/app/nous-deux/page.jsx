"use client";
import { useEffect } from "react";

const STATIC = "https://pour-toi-site.vercel.app";
const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
const CSS = `
.ndp{ position:fixed; inset:0; background:#0d0b1a; color:#EDE9F3; overflow:hidden; }
.ndp #ndScene{ position:fixed; inset:0; width:100vw; height:100vh; display:block; z-index:0; touch-action:none; cursor:grab; }
.ndp #ndScene:active{ cursor:grabbing; }
.ndp .ui{ position:fixed; z-index:2; pointer-events:none; }
.ndp .tete{ top:max(20px,env(safe-area-inset-top)); left:0; right:0; text-align:center; padding:0 20px; }
.ndp .tete .eyebrow{ font-family:'Fraunces',serif; font-style:italic; color:#B49BDA; font-size:1.05rem; margin:0 0 .2rem; text-shadow:0 2px 18px rgba(0,0,0,.6); }
.ndp .tete h1{ font-family:'Fraunces',serif; font-weight:500; font-size:clamp(1.7rem,5.5vw,2.6rem); margin:0; color:#FBF4EA; text-shadow:0 4px 30px rgba(0,0,0,.6); }
.ndp .indice{ bottom:max(18px,env(safe-area-inset-bottom)); left:0; right:0; text-align:center; font-size:.82rem; color:rgba(237,233,243,.55); padding:0 20px; }
.ndp #ndCarte{ position:fixed; z-index:4; left:50%; top:50%; transform:translate(-50%,-46%) scale(.96); width:min(92vw,440px); background:rgba(24,22,46,.82); border:1px solid rgba(180,155,218,.35); border-radius:20px; padding:26px 24px 22px; backdrop-filter:blur(14px); box-shadow:0 30px 80px -30px rgba(0,0,0,.8); opacity:0; visibility:hidden; transition:opacity .45s ease, transform .45s cubic-bezier(.22,.61,.36,1); pointer-events:none; }
.ndp #ndCarte.on{ opacity:1; visibility:visible; transform:translate(-50%,-50%) scale(1); pointer-events:auto; }
.ndp #ndCarte .num{ font-family:'Fraunces',serif; font-style:italic; color:#B49BDA; font-size:.85rem; letter-spacing:.08em; }
.ndp #ndCarte h2{ font-family:'Fraunces',serif; font-weight:500; font-size:1.5rem; margin:.25rem 0 .6rem; color:#FBF4EA; line-height:1.2; }
.ndp #ndCarte p{ font-size:1rem; line-height:1.7; color:#D8D2E4; margin:0; }
.ndp #ndCarte .actions{ margin-top:20px; display:flex; gap:10px; flex-wrap:wrap; }
.ndp #ndCarte button{ font-family:'Nunito Sans',sans-serif; font-weight:700; font-size:.92rem; border-radius:100px; padding:10px 20px; cursor:pointer; border:1px solid transparent; }
.ndp #ndCarte .aller{ color:#1a1430; background:linear-gradient(180deg,#CBB4EC,#A886DA); }
.ndp #ndCarte .fermer{ color:#EDE9F3; background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.18); }
.ndp .liens{ position:fixed; z-index:3; top:max(16px,env(safe-area-inset-top)); left:16px; }
.ndp .liens a{ font-size:.9rem; color:rgba(237,233,243,.7); text-decoration:none; background:rgba(24,22,46,.55); border:1px solid rgba(255,255,255,.12); border-radius:100px; padding:7px 14px; pointer-events:auto; backdrop-filter:blur(8px); }
.ndp .sr-list{ position:fixed; z-index:3; right:16px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:6px; max-width:44vw; }
.ndp .sr-list button{ pointer-events:auto; text-align:right; font-family:'Nunito Sans',sans-serif; font-size:.82rem; color:rgba(237,233,243,.55); background:none; border:none; cursor:pointer; padding:3px 2px; }
.ndp .sr-list button:hover{ color:#C7B2E6; }
@media (max-width:640px){ .ndp .sr-list{ display:none; } }
.ndp #ndFallback{ position:fixed; inset:0; z-index:5; display:none; overflow:auto; padding:70px 20px 40px; background:radial-gradient(120% 80% at 50% -10%, #241d3f 0%, transparent 55%), #0d0b1a; }
.ndp #ndFallback.on{ display:block; }
.ndp #ndFallback .in{ max-width:560px; margin:0 auto; }
.ndp #ndFallback .f-item{ background:rgba(255,255,255,.05); border-left:3px solid #B49BDA; border-radius:14px; padding:15px 18px; margin-bottom:12px; }
.ndp #ndFallback .f-item a{ color:#FBF4EA; text-decoration:none; }
.ndp #ndFallback .f-item h3{ font-family:'Fraunces',serif; font-weight:500; margin:0 0 4px; color:#FBF4EA; }
.ndp #ndFallback .f-item p{ margin:0; color:#C9C1D8; line-height:1.6; }
.ndp #ndLoader{ position:fixed; inset:0; z-index:6; display:flex; align-items:center; justify-content:center; background:#0d0b1a; transition:opacity .8s ease; }
.ndp #ndLoader.off{ opacity:0; pointer-events:none; }
.ndp #ndLoader span{ font-family:'Fraunces',serif; font-style:italic; color:#B49BDA; font-size:1.1rem; }
`;

export default function NousDeux() {
  useEffect(() => {
    let cleanup = () => {};
    const run = () => { cleanup = init() || (() => {}); };
    if (window.THREE) run();
    else { const s = document.createElement("script"); s.src = THREE_SRC; s.onload = run; s.onerror = run; document.head.appendChild(s); }
    return () => { try { cleanup(); } catch (e) {} };
  }, []);

  return (
    <div className="ndp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <canvas id="ndScene" aria-label="Notre monde en 3D avec nous deux" />
      <div className="ui tete"><p className="eyebrow">notre monde, rien qu&apos;à nous</p><h1>Nous deux</h1></div>
      <nav className="liens"><a href="/histoire">⌂ rentrer</a></nav>
      <div className="sr-list" id="ndSrList" aria-label="Explorer notre monde"></div>
      <div className="ui indice" id="ndIndice">Fais tourner du doigt · touche une lumière pour l&apos;ouvrir</div>
      <div id="ndCarte" role="dialog" aria-modal="false">
        <div className="num" id="ndCarteNum"></div>
        <h2 id="ndCarteTitre"></h2>
        <p id="ndCarteTxt"></p>
        <div className="actions">
          <button className="aller" id="ndCarteAller" type="button" style={{ display: "none" }}>Y aller ✧</button>
          <button className="fermer" id="ndCarteFermer" type="button">Rester ici</button>
        </div>
      </div>
      <section id="ndFallback"><div className="in"><div className="ui tete" style={{ position: "static", marginBottom: 22 }}><p className="eyebrow">notre monde, rien qu&apos;à nous</p><h1>Nous deux</h1></div><div id="ndFallbackList"></div></div></section>
      <div id="ndLoader"><span>on allume les étoiles…</span></div>
    </div>
  );

  function init() {
    const THREE = window.THREE;
    const MOMENTS = [
      { nom: "Là où tout a commencé", txt: "Un message sur Snapchat, il y a des années. Deux inconnus, et une conversation qui n'a jamais vraiment fini." },
      { nom: "Notre premier vrai jour", txt: "Lyon, 1er janvier 2020. La première fois pour de vrai. Le début d'une année, et le début de nous." },
      { nom: "Notre nuit", txt: "15 juillet 2023. Celle dont on ne parle pas trop fort. Notre ciel, rien qu'à nous." },
      { nom: "Nos ailleurs", txt: "Monaco, Malte, Barcelone… des parenthèses ouvertes juste pour nous deux." },
      { nom: "La suite", txt: "Une étoile encore un peu floue. Mais elle brille déjà, et je sais qu'on va la rejoindre." },
    ];
    const PORTAILS = [
      { nom: "Ta page", txt: "Ton bonjour, ta lettre du jour, ma voix.", url: STATIC + "/dadoucherie" },
      { nom: "Notre histoire", txt: "De Snap à nous, en dates et en souvenirs.", url: "/histoire" },
      { nom: "Notre galerie", txt: "Nos photos, nos instants gardés.", url: "/galerie" },
      { nom: "Notre nuit", txt: "Notre ciel, notre moment à nous.", url: "/nuit" },
      { nom: "Nos rêves", txt: "Les voyages et la vie qu'on s'imagine.", url: "/reves" },
      { nom: "Nos jeux", txt: "Le quiz de nous, la question du dimanche.", url: "/jeux" },
    ];
    const $ = (id) => document.getElementById(id);
    const canvas = $("ndScene");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 640;
    const hasWebGL = () => { try { const c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); } catch (e) { return false; } };
    const showFallback = () => {
      const list = $("ndFallbackList");
      MOMENTS.forEach((m) => { const d = document.createElement("div"); d.className = "f-item"; const h = document.createElement("h3"); h.textContent = m.nom; const p = document.createElement("p"); p.textContent = m.txt; d.appendChild(h); d.appendChild(p); list.appendChild(d); });
      PORTAILS.forEach((m) => { const d = document.createElement("div"); d.className = "f-item"; const a = document.createElement("a"); a.href = m.url; const h = document.createElement("h3"); h.textContent = m.nom + " →"; const p = document.createElement("p"); p.textContent = m.txt; a.appendChild(h); a.appendChild(p); d.appendChild(a); list.appendChild(d); });
      $("ndFallback").classList.add("on"); canvas.style.display = "none"; const ind = $("ndIndice"); if (ind) ind.style.display = "none"; const ld = $("ndLoader"); if (ld) ld.classList.add("off");
    };
    if (!hasWebGL() || typeof THREE === "undefined") { showFallback(); return; }
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false }); } catch (e) { showFallback(); return; }
    renderer.setClearColor(0x0d0b1a, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, (matchMedia && matchMedia("(pointer: coarse)").matches) ? 1.5 : 2));
    try { renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12; } catch (e) {}
    const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x0d0b1a, 0.006);
    const CENTER = new THREE.Vector3(0, 8, 0);
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 2000);
    scene.add(new THREE.AmbientLight(0x5a4d80, 0.9));
    const key = new THREE.PointLight(0xE6D8FF, 1.15, 260); key.position.set(18, 40, 26); scene.add(key);
    const fill = new THREE.PointLight(0x8E6FBF, 0.75, 240); fill.position.set(-30, 16, -10); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xBFA8F0, 0.5); rim.position.set(0, 10, -30); scene.add(rim);
    const warm = new THREE.PointLight(0xFFD9C0, 0.55, 130); warm.position.set(0, 15, 22); scene.add(warm);
    const dot = (hex) => { const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d"); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, hex + "ff"); g.addColorStop(0.25, hex + "cc"); g.addColorStop(1, hex + "00"); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); };
    const texStar = dot("#e9e2f7"), texGlow = dot("#c7b2e6");
    const heartTex = () => { const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d"); const g = x.createRadialGradient(64, 60, 6, 64, 64, 62); g.addColorStop(0, "#ffd9ec"); g.addColorStop(0.35, "#e3b8f0"); g.addColorStop(1, "rgba(199,178,230,0)"); x.fillStyle = g; x.beginPath(); const s = 42, cx = 64, cy = 52; x.moveTo(cx, cy + s * 0.75); x.bezierCurveTo(cx - s, cy - s * 0.35, cx - s * 0.5, cy - s, cx, cy - s * 0.35); x.bezierCurveTo(cx + s * 0.5, cy - s, cx + s, cy - s * 0.35, cx, cy + s * 0.75); x.closePath(); x.fill(); return new THREE.CanvasTexture(c); };
    const labelSprite = (txt) => { const c = document.createElement("canvas"); c.width = 256; c.height = 64; const x = c.getContext("2d"); x.font = "600 30px 'Nunito Sans', sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.shadowColor = "rgba(0,0,0,.7)"; x.shadowBlur = 8; x.fillStyle = "#F2ECFB"; x.fillText(txt, 128, 34); const t = new THREE.CanvasTexture(c); const m = new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false }); const sp = new THREE.Sprite(m); sp.scale.set(15, 3.75, 1); return sp; };
    const starField = (count, rmin, rmax, size, color, opacity) => { const g = new THREE.BufferGeometry(), pos = new Float32Array(count * 3); for (let i = 0; i < count; i++) { const r = rmin + Math.random() * (rmax - rmin); const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2; pos[i * 3] = r * Math.sin(th) * Math.cos(ph); pos[i * 3 + 1] = Math.abs(r * Math.cos(th)) * 0.6 + 4; pos[i * 3 + 2] = r * Math.sin(th) * Math.sin(ph); } g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); const m = new THREE.PointsMaterial({ size, map: texStar, color: new THREE.Color(color), transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }); return new THREE.Points(g, m); };
    scene.add(starField(small ? 700 : 1300, 120, 620, 2.6, 0xcfc6e6, 0.75));
    [[0x8E6FBF, 0.20, 190, 8, 60, -40], [0x6E52A8, 0.16, 150, -70, 40, -20], [0xB49BDA, 0.12, 120, 40, 20, -60]].forEach((n) => { const m = new THREE.SpriteMaterial({ map: texGlow, color: n[0], transparent: true, opacity: n[1], depthWrite: false, blending: THREE.AdditiveBlending }); const sp = new THREE.Sprite(m); sp.scale.set(n[2], n[2], 1); sp.position.set(n[3], n[4], n[5]); scene.add(sp); });
    const floorMat = new THREE.MeshBasicMaterial({ map: dot("#7c5fb0"), color: 0x8E6FBF, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), floorMat); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.02; scene.add(floor);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xC7B2E6, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(11, 11.6, 64), ringMat); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.05; scene.add(ring);
    const texLoader = new THREE.TextureLoader();
    const chargePhoto = (url) => { const t = texLoader.load(url); try { t.encoding = THREE.sRGBEncoding; } catch (e) {} t.anisotropy = 4; return t; };
    const planePhoto = (url, w, ratio) => new THREE.Mesh(new THREE.PlaneGeometry(w, w * ratio), new THREE.MeshBasicMaterial({ map: chargePhoto(url), transparent: true, depthWrite: false, side: THREE.DoubleSide }));
    const haloSprite = (color, sx, sy, op) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlow, color, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending })); sp.scale.set(sx, sy, 1); return sp; };
    const couple = new THREE.Group(); scene.add(couple); const billboards = []; const photosCibles = [];
    const glowCouple = haloSprite(0xC7B2E6, 13, 20, 0.5); glowCouple.position.set(0, 7.6, -0.5); couple.add(glowCouple);
    const photoCouple = planePhoto("/img/nous/vous-deux.webp", 6.2, 1303 / 640); photoCouple.position.set(0, 7.6, 0); photoCouple.userData = { type: "photo", nom: "Nous deux", txt: "Toi et moi, front contre front. Où que je sois, c'est là que je veux être : tout contre toi. 🤍" }; couple.add(photoCouple); billboards.push(photoCouple); photosCibles.push(photoCouple);
    const medaillon = (url, ratio, w, x, y, z, nom, txt) => { const g = new THREE.Group(); g.position.set(x, y, z); g.add(haloSprite(0xB49BDA, w * 1.7, w * ratio * 1.5, 0.4)); const p = planePhoto(url, w, ratio); p.userData = { type: "photo", nom, txt }; g.add(p); scene.add(g); billboards.push(g); photosCibles.push(p); return g; };
    const medElle = medaillon("/img/nous/elle.webp", 442 / 420, 3.4, -10.5, 10, 2, "Ton sourire", "Ce sourire-là. Celui qui me fait tout oublier. Je le regarde, et je suis bien.");
    const medLui = medaillon("/img/nous/lui.webp", 498 / 420, 3.4, 10.5, 9.5, 2, "Moi, qui pense à toi", "Même quand je fais autre chose, une part de moi est toujours en train de penser à toi.");
    const medSouv = medaillon("/img/nous/souvenir1.webp", 832 / 460, 3.0, -12, 4.5, -2, "Notre journée", "Ce jour-là, avec toi, au bord de l'eau. Un des moments que je garde le plus précieusement.");
    const medSouv2 = medaillon("/img/nous/souvenir2.webp", 574 / 440, 3.0, 12, 5, -1.5, "Ton rire", "Ce rire-là, c'est ma chose préférée au monde. Il me suffit pour être bien.");
    const coeurMat = new THREE.SpriteMaterial({ map: heartTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.95 });
    const coeur = new THREE.Sprite(coeurMat); coeur.scale.set(5, 5, 1); coeur.position.set(0, 15.5, 0); scene.add(coeur);
    const cibles = []; photosCibles.forEach((p) => cibles.push(p));
    const CADEAUX3D = ["J'ai laissé ça pour toi, ici, dans notre monde. Ouvre-le : tu es, chaque jour, la plus belle chose de ma vie. 🤍", "Dans cette boîte, il n'y a pas d'objet. Il y a juste tout mon amour, en entier, rien que pour toi.", "Petit cadeau de nous : un bon pour un câlin infini dès qu'on se revoit. Je te le dois, et j'ai hâte. 🤍", "Ouvre : voilà une promesse. La prochaine fois, je t'attends avec des fleurs plein les bras.", "Un secret rien qu'à nous : même à des kilomètres, tu es la personne la plus proche de mon cœur.", "Ce cadeau-là ne s'use jamais : où que tu sois, tu es aimée, tu es en sécurité, et tu es à moi. 🤍"];
    const moisCad = (new Date().getFullYear() * 12 + new Date().getMonth()) % CADEAUX3D.length;
    const cadeauG = new THREE.Group(); cadeauG.position.set(8.6, 1.6, 3.4);
    const boite = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.2, 2.4), new THREE.MeshStandardMaterial({ color: 0x8E6FBF, roughness: 0.5, emissive: 0x2a1f45, emissiveIntensity: 0.4 })); cadeauG.add(boite);
    const rV = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.25, 2.46), new THREE.MeshStandardMaterial({ color: 0xE9DEF7, roughness: 0.4 })); cadeauG.add(rV);
    const rH = new THREE.Mesh(new THREE.BoxGeometry(2.46, 2.25, 0.5), new THREE.MeshStandardMaterial({ color: 0xE9DEF7, roughness: 0.4 })); cadeauG.add(rH);
    const noeud = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 12), new THREE.MeshStandardMaterial({ color: 0xC7B2E6, roughness: 0.35, emissive: 0x6E52A8, emissiveIntensity: 0.5 })); noeud.position.y = 1.35; cadeauG.add(noeud);
    const haloCad = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlow, color: 0xC7B2E6, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })); haloCad.scale.set(7.5, 7.5, 1); cadeauG.add(haloCad);
    const labCad = labelSprite("Ton cadeau 🎁"); labCad.position.set(0, 3.2, 0); cadeauG.add(labCad);
    boite.userData = { type: "cadeau", nom: "Un cadeau, rien que pour toi", txt: CADEAUX3D[moisCad], _burst: true }; noeud.userData = boite.userData; haloCad.userData = boite.userData;
    scene.add(cadeauG); cibles.push(boite); cibles.push(noeud); cibles.push(haloCad);
    const bursts = [];
    const burstCoeurs = () => { if (reduce) return; for (let b = 0; b < 16; b++) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: coeurMat.map, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 1 })); const sc = 1.4 + Math.random() * 1.6; sp.scale.set(sc, sc, 1); sp.position.copy(cadeauG.position); sp.position.y += 1.2; sp.userData = { vx: (Math.random() - 0.5) * 0.5, vy: 0.25 + Math.random() * 0.35, vz: (Math.random() - 0.5) * 0.5, life: 1 }; scene.add(sp); bursts.push(sp); } };
    MOMENTS.forEach((m, i) => { const a = (i / MOMENTS.length) * Math.PI * 2 + 0.4; const mat = new THREE.SpriteMaterial({ map: texGlow, color: 0xDCC9F5, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending }); const sp = new THREE.Sprite(mat); sp.position.set(Math.cos(a) * 15, 12 + (i % 3) * 3.2, Math.sin(a) * 15); sp.scale.set(4.4, 4.4, 1); sp.userData = { type: "moment", base: 4.4, nom: m.nom, txt: m.txt, i }; scene.add(sp); cibles.push(sp); });
    PORTAILS.forEach((p, i) => { const a = (i / PORTAILS.length) * Math.PI * 2 + 0.15; const g = new THREE.Group(); const x = Math.cos(a) * 23, z = Math.sin(a) * 23, y = 7 + (i % 3) * 4.5; g.position.set(x, y, z); const torus = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.32, 14, 40), new THREE.MeshStandardMaterial({ color: 0xB49BDA, emissive: 0x6E52A8, emissiveIntensity: 0.9, roughness: 0.4 })); g.add(torus); const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texGlow, color: 0xC7B2E6, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending })); halo.scale.set(6.5, 6.5, 1); g.add(halo); const lab = labelSprite(p.nom); lab.position.set(0, 4.4, 0); g.add(lab); g.lookAt(CENTER.x, y, CENTER.z); g.userData = { type: "lien", nom: p.nom, txt: p.txt, url: p.url, spin: (i % 2 ? 1 : -1) }; torus.userData = g.userData; halo.userData = g.userData; scene.add(g); cibles.push(torus); cibles.push(halo); g.userData._torus = torus; });
    const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
    let theta = 0.5, elev = 0.42; const RAD = small ? 62 : 52; let targetTheta = 0.5, targetElev = 0.42;
    let dragging = false, moved = false, lastX = 0, lastY = 0, auto = !reduce, idleT = 0;
    const point = (e) => { const t = e.touches ? e.touches[0] : e; return { x: t.clientX, y: t.clientY }; };
    const onDown = (e) => { dragging = true; moved = false; auto = false; idleT = 0; const p = point(e); lastX = p.x; lastY = p.y; };
    const onMove = (e) => { if (!dragging) return; const p = point(e), dx = p.x - lastX, dy = p.y - lastY; if (Math.abs(dx) + Math.abs(dy) > 3) moved = true; targetTheta -= dx * 0.006; targetElev += dy * 0.005; targetElev = Math.max(0.08, Math.min(1.25, targetElev)); lastX = p.x; lastY = p.y; };
    const onUp = (e) => { if (dragging && !moved) pick(e); dragging = false; idleT = 0; };
    canvas.addEventListener("mousedown", onDown); window.addEventListener("mousemove", onMove, { passive: true }); window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", (e) => onDown(e), { passive: true }); canvas.addEventListener("touchmove", (e) => onMove(e), { passive: true }); canvas.addEventListener("touchend", (e) => onUp(e.changedTouches ? { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY } : e), { passive: true });
    const filantes = [];
    const lancerFilante = () => { const mat = new THREE.SpriteMaterial({ map: texStar, color: 0xffffff, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending }); const sp = new THREE.Sprite(mat); sp.position.set(-34 + Math.random() * 22, 40 + Math.random() * 28, -25 + Math.random() * 50); sp.userData = { v: new THREE.Vector3(2.1 + Math.random() * 0.9, -1.3 - Math.random() * 0.7, (Math.random() - 0.5) * 0.5), life: 1 }; scene.add(sp); filantes.push(sp); };
    const pick = (e) => { const t = e.changedTouches ? e.changedTouches[0] : e; const rect = canvas.getBoundingClientRect(); pointer.x = ((t.clientX - rect.left) / rect.width) * 2 - 1; pointer.y = -((t.clientY - rect.top) / rect.height) * 2 + 1; raycaster.setFromCamera(pointer, camera); raycaster.params.Sprite = { threshold: 0 }; const hit = raycaster.intersectObjects(cibles, false); if (hit.length) ouvrir(hit[0].object.userData); else if (!reduce) lancerFilante(); };
    const carte = $("ndCarte"), elNum = $("ndCarteNum"), elTit = $("ndCarteTitre"), elTxt = $("ndCarteTxt"), btnAller = $("ndCarteAller"), btnFermer = $("ndCarteFermer");
    let urlCourant = null;
    const ouvrir = (d) => { if (d.type === "lien") { elNum.textContent = "· un endroit de notre monde ·"; btnAller.style.display = ""; urlCourant = d.url; btnFermer.textContent = "Rester ici"; } else if (d.type === "cadeau") { elNum.textContent = "· un cadeau, rien que pour toi ·"; btnAller.style.display = "none"; urlCourant = null; btnFermer.textContent = "Merci 🤍"; if (d._burst) burstCoeurs(); } else { elNum.textContent = "· un de nos souvenirs ·"; btnAller.style.display = "none"; urlCourant = null; btnFermer.textContent = "Fermer doucement"; } elTit.textContent = d.nom; elTxt.textContent = d.txt; carte.classList.add("on"); };
    const fermer = () => carte.classList.remove("on");
    btnFermer.addEventListener("click", fermer); btnAller.addEventListener("click", () => { if (urlCourant) window.location.href = urlCourant; });
    const onKey = (e) => { if (e.key === "Escape") fermer(); }; window.addEventListener("keydown", onKey);
    const srl = $("ndSrList");
    const addSr = (nom, data) => { const b = document.createElement("button"); b.type = "button"; b.textContent = nom; b.addEventListener("click", () => ouvrir(data)); srl.appendChild(b); };
    MOMENTS.forEach((m) => addSr("✦ " + m.nom, { type: "moment", nom: m.nom, txt: m.txt }));
    PORTAILS.forEach((p) => addSr("◍ " + p.nom, { type: "lien", nom: p.nom, txt: p.txt, url: p.url }));
    addSr("🎁 Ton cadeau", { type: "cadeau", nom: "Un cadeau, rien que pour toi", txt: CADEAUX3D[moisCad] });
    const PC = small ? 90 : 170; const pg = new THREE.BufferGeometry(), pp = new Float32Array(PC * 3), psp = new Float32Array(PC);
    for (let i = 0; i < PC; i++) { pp[i * 3] = (Math.random() - 0.5) * 70; pp[i * 3 + 1] = Math.random() * 40; pp[i * 3 + 2] = (Math.random() - 0.5) * 70; psp[i] = 0.04 + Math.random() * 0.09; }
    pg.setAttribute("position", new THREE.BufferAttribute(pp, 3));
    const particles = new THREE.Points(pg, new THREE.PointsMaterial({ size: 1.1, map: texStar, color: 0xE6D8FF, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })); scene.add(particles);
    const resize = () => { const w = window.innerWidth, h = window.innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    window.addEventListener("resize", resize); resize();
    const frameCam = () => { theta += (targetTheta - theta) * 0.06; elev += (targetElev - elev) * 0.06; camera.position.set(CENTER.x + RAD * Math.cos(elev) * Math.sin(theta), CENTER.y + RAD * Math.sin(elev), CENTER.z + RAD * Math.cos(elev) * Math.cos(theta)); camera.lookAt(CENTER.x, CENTER.y, CENTER.z); };
    let clock = 0, raf, vivant = true;
    const loop = () => {
      raf = requestAnimationFrame(loop); if (document.hidden) return; clock += 0.016;
      if (!dragging) { idleT += 0.016; if (idleT > 2.4) auto = !reduce; }
      if (auto) targetTheta += 0.0016; frameCam();
      if (!reduce) {
        couple.position.y = Math.sin(clock * 0.7) * 0.35;
        for (let bb = 0; bb < billboards.length; bb++) billboards[bb].lookAt(camera.position);
        const puls = 1 + Math.sin(clock * 0.9) * 0.015; photoCouple.scale.set(puls, puls, 1);
        glowCouple.material.opacity = 0.42 + Math.sin(clock * 1.3) * 0.1;
        medElle.position.y = 10 + Math.sin(clock * 0.8) * 0.5; medLui.position.y = 9.5 + Math.sin(clock * 0.8 + 2) * 0.5; medSouv.position.y = 4.5 + Math.sin(clock * 0.7 + 1) * 0.4; medSouv2.position.y = 5 + Math.sin(clock * 0.75 + 3) * 0.4;
        cadeauG.rotation.y += 0.012; cadeauG.position.y = 1.6 + Math.sin(clock * 1.3 + 1) * 0.18; haloCad.material.opacity = 0.45 + Math.sin(clock * 2.2) * 0.12;
        for (let bi = bursts.length - 1; bi >= 0; bi--) { const bs = bursts[bi], u = bs.userData; bs.position.x += u.vx; bs.position.y += u.vy; bs.position.z += u.vz; u.vy -= 0.006; u.life -= 0.02; bs.material.opacity = Math.max(0, u.life); if (u.life <= 0) { scene.remove(bs); bursts.splice(bi, 1); } }
        for (let fi = filantes.length - 1; fi >= 0; fi--) { const f = filantes[fi], uf = f.userData; f.position.add(uf.v); uf.life -= 0.014; f.material.opacity = Math.max(0, uf.life); const sc = 2.4 * (0.5 + uf.life * 0.7); f.scale.set(sc * 1.8, sc * 0.55, 1); if (uf.life <= 0) { scene.remove(f); filantes.splice(fi, 1); } }
        coeur.position.y = 15.5 + Math.sin(clock * 1.4) * 0.5; coeur.material.opacity = 0.8 + Math.sin(clock * 2.0) * 0.18; const cs = 5 + Math.sin(clock * 2.0) * 0.5; coeur.scale.set(cs, cs, 1);
        for (let i = 0; i < cibles.length; i++) { const s = cibles[i]; if (s.userData && s.userData.type === "moment") { const k = 1 + Math.sin(clock * 1.5 + i) * 0.14; s.scale.set(s.userData.base * k, s.userData.base * k, 1); } }
        scene.children.forEach((o) => { if (o.userData && o.userData._torus) o.userData._torus.rotation.z += 0.01 * o.userData.spin; });
        const pos = particles.geometry.attributes.position.array; for (let j = 0; j < PC; j++) { pos[j * 3 + 1] += psp[j]; if (pos[j * 3 + 1] > 42) { pos[j * 3 + 1] = 0; pos[j * 3] = (Math.random() - 0.5) * 70; pos[j * 3 + 2] = (Math.random() - 0.5) * 70; } } particles.geometry.attributes.position.needsUpdate = true;
        ring.material.opacity = 0.35 + Math.sin(clock * 0.9) * 0.15;
      }
      renderer.render(scene, camera);
    };
    frameCam(); renderer.render(scene, camera); loop();
    const ld = $("ndLoader"); setTimeout(() => { if (ld) ld.classList.add("off"); }, 500);
    return () => { vivant = false; cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); window.removeEventListener("keydown", onKey); window.removeEventListener("resize", resize); try { renderer.dispose(); } catch (e) {} };
  }
}
