/* intro.js — séquence d'entrée cinématique de l'accueil.
   Autonome : crée son propre overlay + styles. S'affiche une fois par session,
   se désactive si l'utilisatrice préfère les animations réduites. Léger (canvas 2D). */
(function(){
  "use strict";
  try {
    if (sessionStorage.getItem("intro_vu") === "1") return;
  } catch(e){}
  var reduce = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}

  // ----- styles -----
  var css = document.createElement("style");
  css.textContent =
    "#intro-cine{position:fixed;inset:0;z-index:100000;background:#08070f;overflow:hidden;"+
    "opacity:1;transition:opacity 1.1s ease, transform 1.1s cubic-bezier(.4,0,.2,1);}"+
    "#intro-cine.partir{opacity:0;transform:scale(1.12);pointer-events:none;}"+
    "#intro-cine canvas{position:absolute;inset:0;width:100%;height:100%;display:block;}"+
    "#intro-cine .txt{position:absolute;left:0;right:0;top:50%;transform:translateY(-50%);text-align:center;padding:0 24px;}"+
    "#intro-cine .eb{font-family:'Fraunces',Georgia,serif;font-style:italic;color:#C7B2E6;font-size:1.15rem;letter-spacing:.02em;opacity:0;transition:opacity 1.2s ease;margin:0 0 .6rem;}"+
    "#intro-cine .ph{font-family:'Fraunces',Georgia,serif;font-weight:500;color:#FBF4EA;font-size:clamp(1.6rem,5.2vw,2.5rem);line-height:1.4;opacity:0;transition:opacity 1.4s ease;margin:0 auto;max-width:20ch;}"+
    "#intro-cine .go{position:absolute;left:0;right:0;bottom:16%;text-align:center;opacity:0;transition:opacity 1.1s ease;}"+
    "#intro-cine .go button{font-family:'Nunito Sans',system-ui,sans-serif;font-weight:700;font-size:1rem;color:#1a1430;"+
    "background:linear-gradient(135deg,#CBB4EC,#A886DA);border:none;border-radius:100px;padding:14px 28px;cursor:pointer;"+
    "box-shadow:0 14px 40px -12px rgba(168,134,218,.85);}"+
    "#intro-cine .skip{position:absolute;right:16px;top:calc(14px + env(safe-area-inset-top,0px));color:rgba(237,233,243,.55);"+
    "font-family:'Nunito Sans',system-ui,sans-serif;font-size:.82rem;background:none;border:none;cursor:pointer;z-index:2;}"+
    "#intro-cine .on{opacity:1;}";
  document.head.appendChild(css);

  var ov = document.createElement("div"); ov.id = "intro-cine";
  ov.innerHTML =
    '<canvas></canvas>'+
    '<button class="skip" type="button">passer</button>'+
    '<div class="txt"><p class="eb">pour toi,</p><p class="ph">J\'ai construit un endroit où le temps ralentit.</p></div>'+
    '<div class="go"><button type="button">Entrer, doucement</button></div>';
  (document.body || document.documentElement).appendChild(ov);
  try { document.documentElement.style.overflow = "hidden"; } catch(e){}

  var eb = ov.querySelector(".eb"), ph = ov.querySelector(".ph"), go = ov.querySelector(".go");
  var canvas = ov.querySelector("canvas"), x = canvas.getContext("2d");
  var W, H, dpr = Math.min(window.devicePixelRatio||1, 2);
  function resize(){ W=innerWidth; H=innerHeight; canvas.width=W*dpr; canvas.height=H*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  resize(); addEventListener("resize", resize);

  // particules + une petite lumière centrale
  var parts = [];
  for (var i=0;i<70;i++) parts.push({ x:Math.random(), y:Math.random(), r:Math.random()*1.6+.3, v:Math.random()*.02+.005, p:Math.random()*6.28 });
  // papillon 2D qui traverse
  var pap = { on:false, t:0, x:-0.1, y:0.42 };

  function dessinePapillon(cx, cy, s, flap){
    x.save(); x.translate(cx, cy); x.scale(s, s);
    var grad = x.createLinearGradient(-20,-20,20,20);
    grad.addColorStop(0,"#E9DEF7"); grad.addColorStop(1,"#A886DA");
    x.fillStyle = grad; x.globalAlpha = .92;
    var w = 0.5 + Math.abs(Math.sin(flap))*0.6; // ouverture des ailes
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){
      x.save(); x.scale(q[0]*w, q[1]);
      x.beginPath(); x.moveTo(0,0);
      x.bezierCurveTo(6,-4, 22,-10, 20,-2);
      x.bezierCurveTo(19,4, 8,4, 0,0);
      x.closePath(); x.fill(); x.restore();
    });
    x.fillStyle = "#241830"; x.globalAlpha = 1;
    x.beginPath(); x.ellipse(0,0,1.6,7,0,0,6.28); x.fill();
    x.restore();
  }

  var t0 = performance.now(), running = true;
  function frame(now){
    if (!running) return;
    requestAnimationFrame(frame);
    var t = (now - t0)/1000;
    x.clearRect(0,0,W,H);
    // halo central
    var g = x.createRadialGradient(W/2, H*0.46, 0, W/2, H*0.46, Math.min(W,H)*0.5);
    var glow = Math.min(1, t/1.2);
    g.addColorStop(0, "rgba(150,120,200,"+(0.28*glow)+")");
    g.addColorStop(1, "rgba(11,10,22,0)");
    x.fillStyle = g; x.fillRect(0,0,W,H);
    // particules
    for (var i=0;i<parts.length;i++){ var s=parts[i]; s.y -= s.v*0.6; if (s.y<0){ s.y=1; s.x=Math.random(); }
      var a = (0.3 + 0.5*Math.sin(t*1.2 + s.p)) * glow;
      x.globalAlpha = Math.max(0,a); x.fillStyle="#E6D8FF";
      x.beginPath(); x.arc(s.x*W, s.y*H, s.r, 0, 6.28); x.fill(); }
    x.globalAlpha = 1;
    // papillon qui traverse
    if (pap.on){ pap.x += 0.0022; var yy = pap.y + Math.sin(t*2.2)*0.03;
      dessinePapillon(pap.x*W, yy*H, Math.min(W,H)/240, t*10); }
  }
  requestAnimationFrame(frame);

  function planifie(ms, fn){ return setTimeout(fn, reduce ? Math.min(ms,300) : ms); }

  planifie(900,  function(){ eb.classList.add("on"); });
  planifie(2200, function(){ pap.on = true; });
  planifie(2600, function(){ ph.classList.add("on"); });
  planifie(reduce?600:5000, function(){ go.classList.add("on"); });

  function entrer(){
    if (!ov._done){ ov._done = true; try{ sessionStorage.setItem("intro_vu","1"); }catch(e){}
      ov.classList.add("partir");
      setTimeout(function(){ running=false; try{ document.documentElement.style.overflow=""; }catch(e){} if(ov.parentNode) ov.parentNode.removeChild(ov); }, 1200);
    }
  }
  go.querySelector("button").addEventListener("click", entrer);
  ov.querySelector(".skip").addEventListener("click", entrer);
})();
