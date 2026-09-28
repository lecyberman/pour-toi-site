/* etincelles.js — curseur mignon (petite étoile qui sourit) + poussière lumineuse.
   Sur ordinateur : remplace la flèche par une étoile souriante qui suit la souris,
   avec une traînée d'étincelles et une petite explosion au clic.
   Sur mobile : étincelles au toucher. Respecte les animations réduites. */
(function(){
  "use strict";
  if (window.__ETINCELLES_ON) return; window.__ETINCELLES_ON = true;
  var reduce = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}
  var fine = false;
  try { fine = matchMedia("(pointer: fine)").matches; } catch(e){}

  var cv = document.createElement("canvas");
  cv.setAttribute("aria-hidden","true");
  cv.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000;";
  function mount(){ (document.body||document.documentElement).appendChild(cv); if (fine){ try{ document.documentElement.style.cursor="none"; }catch(e){} } }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  var x = cv.getContext("2d");
  var W, H, dpr = Math.min(window.devicePixelRatio||1, 2);
  function resize(){ W=innerWidth; H=innerHeight; cv.width=W*dpr; cv.height=H*dpr; x.setTransform(dpr,0,0,dpr,0,0); }
  resize(); addEventListener("resize", resize);

  var parts = [], lx=0, ly=0, has=false;
  var COL = ["#E9DEF7","#CBB4EC","#B49BDA","#F3D9F0","#F2E29B"];
  // position lissée du curseur
  var cur = { x:-100, y:-100, tx:-100, ty:-100, shown:false, rot:0 };

  function emet(px, py, force){
    var d = has ? Math.hypot(px-lx, py-ly) : 0;
    if (!has || d > 6 || force){
      var n = force ? 14 : Math.min(3, 1 + (d/18)|0);
      for (var i=0;i<n;i++){
        var ang = Math.random()*6.283, sp = force ? Math.random()*2.4+0.6 : 0;
        parts.push({ x:px+(Math.random()*8-4), y:py+(Math.random()*8-4),
          vx:(Math.random()*.6-.3)+Math.cos(ang)*sp, vy:(Math.random()*.6-.3)+.15+Math.sin(ang)*sp,
          r:Math.random()*2.1+.7, vie:1, dv:Math.random()*.02+.012,
          c:COL[(Math.random()*COL.length)|0] });
      }
      if (parts.length > 200) parts.splice(0, parts.length-200);
      lx=px; ly=py; has=true;
    }
  }
  function bouge(px, py){ cur.tx=px; cur.ty=py; cur.shown=true; if(!reduce) emet(px,py,false); }
  addEventListener("mousemove", function(e){ bouge(e.clientX, e.clientY); }, {passive:true});
  addEventListener("mousedown", function(e){ emet(e.clientX, e.clientY, true); }, {passive:true});
  addEventListener("touchmove", function(e){ if(e.touches[0]) bouge(e.touches[0].clientX, e.touches[0].clientY); }, {passive:true});
  addEventListener("touchstart", function(e){ if(e.touches[0]){ cur.x=cur.tx=e.touches[0].clientX; cur.y=cur.ty=e.touches[0].clientY; emet(e.touches[0].clientX, e.touches[0].clientY, true); } }, {passive:true});

  function etoileSouriante(cx, cy, s, rot){
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
    // lueur
    var gl = x.createRadialGradient(0,0,0,0,0,26);
    gl.addColorStop(0,"rgba(242,226,155,.55)"); gl.addColorStop(1,"rgba(242,226,155,0)");
    x.fillStyle = gl; x.beginPath(); x.arc(0,0,26,0,6.283); x.fill();
    // étoile 5 branches
    x.beginPath();
    for (var i=0;i<10;i++){ var r = (i%2===0)?13:5.6, a = -Math.PI/2 + i*Math.PI/5;
      var X=Math.cos(a)*r, Y=Math.sin(a)*r; if(i===0) x.moveTo(X,Y); else x.lineTo(X,Y); }
    x.closePath();
    var g = x.createLinearGradient(-13,-13,13,13); g.addColorStop(0,"#FBE5A6"); g.addColorStop(1,"#E7B84E");
    x.fillStyle = g; x.fill();
    x.lineWidth = 1.4; x.strokeStyle = "rgba(120,80,20,.35)"; x.stroke();
    x.rotate(-rot); // visage droit
    // yeux
    x.fillStyle = "#3a2a12";
    x.beginPath(); x.arc(-3.4,-1,1.5,0,6.283); x.fill();
    x.beginPath(); x.arc(3.4,-1,1.5,0,6.283); x.fill();
    // sourire
    x.lineWidth = 1.4; x.strokeStyle = "#3a2a12"; x.beginPath(); x.arc(0,1.5,3.2,0.15*Math.PI,0.85*Math.PI); x.stroke();
    // joues
    x.fillStyle = "rgba(230,120,140,.5)";
    x.beginPath(); x.arc(-6,2.5,1.7,0,6.283); x.fill();
    x.beginPath(); x.arc(6,2.5,1.7,0,6.283); x.fill();
    x.restore();
  }

  var last = performance.now();
  function loop(now){
    requestAnimationFrame(loop);
    if (document.hidden) return;
    var dt = Math.min(0.05,(now-last)/1000); last=now;
    x.clearRect(0,0,W,H);
    // traînée
    for (var i=parts.length-1;i>=0;i--){ var p=parts[i];
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.006; p.vie-=p.dv;
      if (p.vie<=0){ parts.splice(i,1); continue; }
      x.globalAlpha=Math.max(0,p.vie)*.9; x.fillStyle=p.c;
      x.beginPath(); x.arc(p.x,p.y,p.r*p.vie+.2,0,6.283); x.fill();
    }
    x.globalAlpha=1;
    // curseur étoile (ordinateur)
    if (fine && cur.shown){
      cur.x += (cur.tx-cur.x)*0.35; cur.y += (cur.ty-cur.y)*0.35;
      cur.rot += dt*0.8;
      var bob = 1 + Math.sin(now/300)*0.06;
      etoileSouriante(cur.x, cur.y, bob, Math.sin(now/700)*0.25);
    }
  }
  requestAnimationFrame(loop);
})();
