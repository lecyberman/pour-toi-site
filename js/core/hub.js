/* hub.js — rend les expériences d'un parcours à partir du registre unique.
   La page déclare <body data-journey="besoin|histoire|surprise"> et un <div id="hub"></div>. */
(function(){
  "use strict";
  function go(){
    var j = document.body.getAttribute("data-journey");
    var host = document.getElementById("hub");
    if (!window.EXPERIENCES || !host || !j) return;
    var items = window.EXPERIENCES.byJourney(j);
    var reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}
    items.forEach(function(x, i){
      var a = document.createElement("a");
      a.href = x.route; a.className = "xp";
      a.innerHTML = '<span class="ic">'+x.icon+'</span><span class="t">'+x.title+'</span><span class="d">'+(x.desc||"")+'</span>';
      host.appendChild(a);
      if (reduce) { a.classList.add("vu"); }
      else { setTimeout(function(){ a.classList.add("vu"); }, 60 + i*55); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go); else go();
})();
