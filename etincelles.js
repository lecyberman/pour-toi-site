/* etincelles.js — fine poussière lumineuse qui suit le doigt / la souris.
   Overlay transparent, ne bloque pas les clics, respecte les animations réduites. */
(function(){
  "use strict";
  try { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; } catch(e){}

  var cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden","true");
  cv.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9990;";
  function mount(){ (document.body||document.documentElement).appendChild(cv); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  var x = cv.getContext("2d");
  var W, H, dpr = Math.min(window.devicePixelRatio||1, 2);
  function resize(){ W=innerWidth; H=innerHeight; cv.width=W*dpr; cv.height=H*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  resize(); addEventListener("resize", resize);

  var parts = [], last = 0, lx = 0, ly = 0, has = false;
  var COL = ["#E9DEF7","#CBB4EC","#B49BDA","#F3D9F0"];
  function emet(px, py){
    var now = performance.now();
    var d = has ? Math.hypot(px-lx, py-ly) : 0;
    if (!has || d > 6){
      var n = Math.min(3, 1 + (d/18)|0);
      for (var i=0;i<n;i++){
        parts.push({ x:px+(Math.random()*8-4), y:py+(Math.random()*8-4),
          vx:(Math.random()*.6-.3), vy:(Math.random()*.6-.3)+.15,
          r:Math.random()*2.1+.7, vie:1, dv:Math.random()*.02+.012,
          c:COL[(Math.random()*COL.length)|0] });
      }
      if (parts.length > 160) parts.splice(0, parts.length-160);
      lx=px; ly=py; has=true;
    }
  }
  addEventListener("mousemove", function(e){ emet(e.clientX, e.clientY); }, {passive:true});
  addEventListener("touchmove", function(e){ if(e.touches[0]) emet(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
  addEventListener("touchstart", function(e){ if(e.touches[0]) emet(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});

  function loop(){
    requestAnimationFrame(loop);
    if (document.hidden) return;
    x.clearRect(0,0,W,H);
    for (var i=parts.length-1;i>=0;i--){
      var p = parts[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.006; p.vie -= p.dv;
      if (p.vie <= 0){ parts.splice(i,1); continue; }
      x.globalAlpha = Math.max(0, p.vie) * .9;
      x.fillStyle = p.c;
      x.beginPath(); x.arc(p.x, p.y, p.r*p.vie + .2, 0, 6.283); x.fill();
    }
    x.globalAlpha = 1;
  }
  requestAnimationFrame(loop);
})();
