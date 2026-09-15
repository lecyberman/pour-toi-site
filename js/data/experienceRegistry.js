/* experienceRegistry.js — SOURCE DE VÉRITÉ unique des expériences du site.
   L'accueil et les 3 portes lisent cette liste (ne plus coder de listes de liens en dur).
   Aucune donnée supprimée : chaque entrée pointe vers une route existante.
   journey: "besoin" | "histoire" | "surprise" | "systeme"
   flags: mobile, webgl, audio, phare (expérience mise en avant) */
(function (root) {
  "use strict";
  var E = [
    // ——— Parcours 1 : « J'ai besoin de toi » ———
    { id:"cocon",       title:"Ton cocon",            journey:"besoin",  route:"/cocon",       icon:"🫂", desc:"Si la nuit est dure, viens te poser." },
    { id:"dormir",      title:"Pour t'endormir",      journey:"besoin",  route:"/dormir",      icon:"🌧️", desc:"Sons doux et minuteur." },
    { id:"journal",     title:"Ton journal du soir",  journey:"besoin",  route:"/journal",     icon:"📓", desc:"Écris, puis laisse partir." },
    { id:"toi",         title:"Comment tu te sens",   journey:"besoin",  route:"/toi",         icon:"🕯️", desc:"Dis-moi, dépose un mot." },
    { id:"humeurs",     title:"Ce soir je me sens",   journey:"besoin",  route:"/humeurs",     icon:"🌙", desc:"Touche l'humeur qui te ressemble." },
    { id:"chansons",    title:"Nos chansons",         journey:"besoin",  route:"/chansons",    icon:"🎧", desc:"Tes préférées, réunies." },
    { id:"fleurs",      title:"Tes fleurs",           journey:"besoin",  route:"/fleurs",      icon:"🌷", desc:"Une nouvelle chaque jour." },
    { id:"pioche",      title:"La pioche du jour",    journey:"besoin",  route:"/pioche",      icon:"🫙", desc:"Un petit mot de moi au hasard." },
    { id:"ciel",        title:"Notre ciel partagé",   journey:"besoin",  route:"/ciel",        icon:"🌤️", desc:"La météo de nos deux villes." },
    { id:"calin",       title:"Boîte à câlins",       journey:"besoin",  route:"/calin",       icon:"🤍", desc:"Un câlin, même de loin." },
    { id:"pour-lui",    title:"Pour lui",             journey:"besoin",  route:"/pour-lui",    icon:"💗", desc:"Quand tu ne sais pas comment le dire." },
    { id:"au-cas-ou",   title:"Au cas où",            journey:"besoin",  route:"/au-cas-ou",   icon:"🎧", audio:true, desc:"Ma voix, si besoin." },

    // ——— Parcours 2 : « Retrouver notre histoire » ———
    { id:"histoire",    title:"Notre histoire",       journey:"histoire", route:"/histoire",   icon:"✨", desc:"De Snap à nous, en dates." },
    { id:"nous-deux",   title:"Nous deux, en 3D",     journey:"histoire", route:"/nous-deux",  icon:"💞", webgl:true, phare:true, desc:"Notre monde, avec nous dedans." },
    { id:"nuit",        title:"Notre nuit",           journey:"histoire", route:"/nuit",       icon:"🌌", phare:true, desc:"Le 15 juillet, notre ciel." },
    { id:"etoile",      title:"Notre étoile",         journey:"histoire", route:"/etoile",     icon:"🌟", desc:"Chaque soir, une étoile à vous." },
    { id:"univers",     title:"Notre univers",        journey:"histoire", route:"/univers",    icon:"✦", desc:"Nos moments, en constellation." },
    { id:"galerie",     title:"Notre galerie",        journey:"histoire", route:"/galerie",    icon:"📷", desc:"Nos photos, en polaroïds." },
    { id:"album",       title:"Photos & voix",        journey:"histoire", route:"/album",      icon:"🎞️", desc:"Ajoutez photos et mots vocaux." },
    { id:"papillons",   title:"Nos papillons",        journey:"histoire", route:"/papillons",  icon:"🦋", webgl:true, phare:true, desc:"Un ciel de papillons 3D." },
    { id:"mots",        title:"Nos mots",             journey:"histoire", route:"/mots",       icon:"📖", desc:"Notre dictionnaire intime." },
    { id:"livre",       title:"Le livre de nous",     journey:"histoire", route:"/livre",      icon:"📕", desc:"Tout ce qu'on s'est écrit, relié." },
    { id:"petits-riens",title:"Petits riens",         journey:"histoire", route:"/petits-riens",icon:"🍃", desc:"Les petites choses du jour." },
    { id:"souvenirs",   title:"Notre carnet",         journey:"histoire", route:"/souvenirs",  icon:"📔", desc:"Les moments qu'on met de côté." },
    { id:"voyages",     title:"Nos voyages",          journey:"histoire", route:"/reves",      icon:"🌍", desc:"Vécus et rêvés, sur un globe." },
    { id:"fil",         title:"Le fil invisible",     journey:"histoire", route:"/fil",        icon:"🧵", desc:"Ce qui nous relie, toujours." },
    { id:"bibliotheque",title:"Ta bibliothèque",      journey:"histoire", route:"/bibliotheque",icon:"📚", desc:"Tes livres, à lire ici." },

    // ——— Parcours 3 : « Surprends-moi » ———
    { id:"le-15",       title:"Le 15",                journey:"surprise", route:"/le-15",      icon:"🎁", event:"le15", desc:"Notre jour, chaque mois." },
    { id:"coffret",     title:"Le coffret",           journey:"surprise", route:"/coffret",    icon:"🎁", desc:"Le souvenir de la rencontre." },
    { id:"capsules",    title:"Nos capsules",         journey:"surprise", route:"/capsules",   icon:"✉️", desc:"À ouvrir plus tard." },
    { id:"souhaits",    title:"Nos rêves à deux",     journey:"surprise", route:"/souhaits",   icon:"🗺️", desc:"Ce qu'on veut vivre, ensemble." },
    { id:"retrouvailles",title:"Nos retrouvailles",   journey:"surprise", route:"/retrouvailles",icon:"⏳", desc:"Le décompte jusqu'à toi." },
    { id:"jeux",        title:"Nos jeux",             journey:"surprise", route:"/jeux",       icon:"🎲", desc:"Un moment léger." },
    { id:"dramas",      title:"Nos dramas",           journey:"surprise", route:"/dramas",     icon:"🍿", desc:"Nos soirées canapé." },
    { id:"creations",   title:"Nos créations",        journey:"surprise", route:"/creations",  icon:"🖼️", desc:"Ce qu'on garde, ce qu'on imagine." },
    { id:"messages",    title:"Notre chat",           journey:"surprise", route:"/messages",   icon:"💬", desc:"On discute, ça s'efface après." },
    { id:"ensemble",    title:"Ensemble, en direct",  journey:"surprise", route:"/ensemble",   icon:"💫", desc:"Quand vous êtes là tous les deux." },
    { id:"mer",         title:"Bord de mer",          journey:"surprise", route:"/mer",        icon:"🌊", phare:true, desc:"La même mer, la même lune." },
    { id:"demande",     title:"Me demander",          journey:"surprise", route:"/demande",    icon:"💭", desc:"Une envie, une idée pour le site." },

    // ——— Système / privé (hors portes) ———
    { id:"dadoucherie", title:"Ta page",              journey:"systeme",  route:"/dadoucherie", icon:"💌", desc:"Ton bonjour, ta lettre du jour." },
    { id:"courrier",    title:"Mon courrier",         journey:"systeme",  route:"/courrier",   icon:"💌", gated:"lui", desc:"Les mots qu'elle t'a laissés." }
  ];

  var API = {
    all: function(){ return E.slice(); },
    byJourney: function(j){ return E.filter(function(x){ return x.journey === j; }); },
    byId: function(id){ for (var i=0;i<E.length;i++) if (E[i].id===id) return E[i]; return null; },
    phares: function(){ return E.filter(function(x){ return x.phare; }); },
    journeys: [
      { id:"besoin",   title:"J'ai besoin de toi",       sub:"se sentir mieux, ce soir",       icon:"🫂" },
      { id:"histoire", title:"Retrouver notre histoire", sub:"notre monde, nos souvenirs",     icon:"✦" },
      { id:"surprise", title:"Surprends-moi",            sub:"quelque chose t'attend",         icon:"🎁" }
    ]
  };
  root.EXPERIENCES = API;
})(window);
