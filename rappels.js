/* rappels.js, petits mots doux : bonjour, bonne nuit, et un check tout doux le soir.
   Fonctionne au mieux avec l'app installée. Utilise les "Notification Triggers"
   (programmation même app fermée) si le navigateur les gère, sinon un repli
   qui vérifie l'heure quand l'app est ouverte. Aucune donnée n'est envoyée ailleurs. */
(function () {
  "use strict";

  var KEY = "rappels_v1";

  // ----- Web Push (notifications même app fermée) -----
  var VAPID_PUBLIC = "BHfK8OjWY7LGkB57gQP_WQiWUgVA2NRpc-14WUYD1MZZ3ab8QdDAykUp7LL8KAUBfno_4LSN4SAquqmJfm1WyKE";
  var SB_URL = "https://jnqyjpgbmjclxbjxbnft.supabase.co";
  var SB_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";
  function urlB64ToUint8(base64String) {
    var padding = "=".repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    var raw = atob(base64), out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }
  function abonnerPush() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    swReady().then(function (reg) {
      return reg.pushManager.getSubscription().then(function (sub) {
        return sub || reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8(VAPID_PUBLIC) });
      });
    }).then(function (sub) {
      if (!sub) return;
      var j = sub.toJSON(); var role = null; try { role = localStorage.getItem("moi_role"); } catch (e) {}
      return fetch(SB_URL + "/rest/v1/push_subs", {
        method: "POST",
        headers: { "apikey": SB_ANON, "Authorization": "Bearer " + SB_ANON, "Content-Type": "application/json", "Prefer": "return=minimal" },
        body: JSON.stringify({ endpoint: sub.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth, role: role })
      });
      // insert simple : si l'endpoint existe déjà, le serveur renvoie 409, sans conséquence (déjà abonné).
    }).catch(function () {});
  }

  // créneaux par défaut [heure, minute]
  var HEURES = { bonjour: [8, 30], nuit: [22, 0], check: [23, 30] };

  var TITRES = { bonjour: "Un petit bonjour", nuit: "Bonne nuit", check: "Tu dors ?" };
  var URLS = { bonjour: "/dadoucherie", nuit: "/", check: "/cocon" };

  var MSG = {
    bonjour: [
      "Bonjour toi 🤍 J'espère que tu as bien dormi. Moi je pense déjà à toi.",
      "Coucou ma douce ☀️ Un nouveau jour, et toujours envie de le passer avec toi.",
      "Réveille-toi doucement 🌸 Tu es ma première belle pensée du matin."
    ],
    nuit: [
      "Bonne nuit ma douce 🌙 Dors bien, je veille sur tes rêves.",
      "Fais de beaux rêves 🤍 Je te serre fort, même de loin.",
      "La journée est finie, tu as le droit de te reposer. Bonne nuit, toi."
    ],
    check: [
      "Tu dors ? 🌙 Si tu as mal ou du mal à dormir, viens, j'ai un cocon doux pour toi.",
      "Petit coucou de la nuit 🤍 Si tu ne dors pas, on peut respirer ensemble un moment.",
      "J'espère que tu dors bien. Sinon je suis là, à un geste : viens dans le cocon."
    ]
  };

  // Le 15 de chaque mois : notre jour.
  var QUINZE = {
    heure: [9, 0],
    titre: "C'est le 15 🤍",
    url: "/le-15",
    msg: [
      "C'est le 15, notre jour 🤍 Viens voir, je t'ai préparé quelque chose rien que pour toi.",
      "Joyeux 15, ma dadoucherie. J'ai laissé une lettre et un cadeau pour toi →",
      "On est le 15 🌙 Notre rendez-vous du mois. Ouvre, c'est pour toi."
    ]
  };
  function prochainQuinze(moisPlus) {
    var d = new Date();
    d.setDate(15); d.setHours(QUINZE.heure[0], QUINZE.heure[1], 0, 0);
    if (d <= new Date()) d.setMonth(d.getMonth() + 1);
    if (moisPlus) d.setMonth(d.getMonth() + moisPlus);
    d.setDate(15);
    return d;
  }

  function cfg() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function prochain(h, m, joursPlus) {
    var d = new Date(); d.setHours(h, m, 0, 0);
    var maintenant = new Date();
    if (d <= maintenant) d.setDate(d.getDate() + 1);
    if (joursPlus) d.setDate(d.getDate() + joursPlus);
    return d;
  }

  function swReady() {
    return (navigator.serviceWorker && navigator.serviceWorker.ready)
      ? navigator.serviceWorker.ready : Promise.reject(new Error("pas de service worker"));
  }

  function optionsPour(slot) {
    return {
      body: pick(MSG[slot]),
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      data: { url: URLS[slot] },
      requireInteraction: false
    };
  }

  // Programme 5 jours à l'avance via TimestampTrigger (si dispo), marche app fermée.
  function planifierTrigger(reg) {
    if (typeof window.TimestampTrigger === "undefined") return false;
    Object.keys(HEURES).forEach(function (slot) {
      for (var j = 0; j < 5; j++) {
        var t = prochain(HEURES[slot][0], HEURES[slot][1], j);
        var o = optionsPour(slot);
        o.tag = "rappel-" + slot + "-" + t.toDateString();
        try { o.showTrigger = new window.TimestampTrigger(t.getTime()); } catch (e) { return false; }
        try { reg.showNotification(TITRES[slot], o); } catch (e) {}
      }
    });
    // les 3 prochains "15"
    for (var q = 0; q < 3; q++) {
      var tq = prochainQuinze(q);
      var oq = { body: pick(QUINZE.msg), icon: "/icon-192.png", badge: "/icon-192.png", data: { url: QUINZE.url }, tag: "quinze-" + tq.toDateString() };
      try { oq.showTrigger = new window.TimestampTrigger(tq.getTime()); reg.showNotification(QUINZE.titre, oq); } catch (e) {}
    }
    return true;
  }

  // Repli : vérifie l'heure quand l'app est ouverte (une notif par créneau et par jour).
  var boucleLancee = false;
  function boucleInterval() {
    if (boucleLancee) return; boucleLancee = true;
    function verifier() {
      var c = cfg(); if (!c.enabled || c.mode !== "interval") return;
      if (!("Notification" in window) || Notification.permission !== "granted") return;
      var n = new Date(), hh = n.getHours(), mm = n.getMinutes(), jour = n.toDateString();
      c.shown = c.shown || {};
      Object.keys(HEURES).forEach(function (slot) {
        var cible = HEURES[slot];
        if (hh === cible[0] && mm >= cible[1] && mm < cible[1] + 8) {
          var cle = slot + "-" + jour;
          if (!c.shown[cle]) {
            c.shown[cle] = 1; save(c);
            swReady().then(function (reg) { reg.showNotification(TITRES[slot], optionsPour(slot)); }).catch(function () {});
          }
        }
      });
      // le 15 a 9h (repli quand l'app est ouverte)
      if (n.getDate() === 15 && hh === QUINZE.heure[0] && mm >= QUINZE.heure[1] && mm < QUINZE.heure[1] + 8) {
        var cle15 = "quinze-" + jour;
        if (!c.shown[cle15]) {
          c.shown[cle15] = 1; save(c);
          swReady().then(function (reg) { reg.showNotification(QUINZE.titre, { body: pick(QUINZE.msg), icon: "/icon-192.png", badge: "/icon-192.png", data: { url: QUINZE.url } }); }).catch(function () {});
        }
      }
    }
    verifier(); setInterval(verifier, 60000);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) verifier(); });
  }

  function planifier() {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    swReady().then(function (reg) {
      var okTrigger = planifierTrigger(reg);
      var c = cfg(); c.enabled = true; c.mode = okTrigger ? "trigger" : "interval"; c.ts = Date.now(); save(c);
      if (!okTrigger) boucleInterval();
    }).catch(function () {
      var c = cfg(); c.enabled = true; c.mode = "interval"; save(c); boucleInterval();
    });
  }

  function activer() {
    if (!("Notification" in window)) return Promise.resolve(false);
    return Notification.requestPermission().then(function (p) {
      if (p === "granted") {
        planifier();
        abonnerPush();
        swReady().then(function (reg) {
          reg.showNotification("Je suis là 🤍", {
            body: "À partir de maintenant, je viendrai te dire bonjour, bonne nuit, et passer le soir.",
            icon: "/icon-192.png", badge: "/icon-192.png", data: { url: "/cocon" }
          });
        }).catch(function () {});
        return true;
      }
      return false;
    });
  }

  function desactiver() {
    var c = cfg(); c.enabled = false; save(c);
    if (navigator.serviceWorker) {
      swReady().then(function (reg) {
        if (reg.getNotifications) reg.getNotifications({ includeTriggered: true }).then(function (list) {
          list.forEach(function (n) { if (n.tag && n.tag.indexOf("rappel-") === 0) n.close(); });
        });
      }).catch(function () {});
    }
  }

  function tester() {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    swReady().then(function (reg) { reg.showNotification(TITRES.check, optionsPour("check")); }).catch(function () {});
  }

  // Au chargement : si déjà activé, on rafraîchit la programmation (fenêtre glissante).
  if (("Notification" in window) && Notification.permission === "granted" && cfg().enabled) {
    planifier();
    abonnerPush();
  }

  window.Rappels = { activer: activer, desactiver: desactiver, tester: tester, planifier: planifier, config: cfg };
})();
