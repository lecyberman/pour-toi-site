/* rappels.js — petits mots doux : bonjour, bonne nuit, et un check tout doux le soir.
   Fonctionne au mieux avec l'app installée. Utilise les "Notification Triggers"
   (programmation même app fermée) si le navigateur les gère, sinon un repli
   qui vérifie l'heure quand l'app est ouverte. Aucune donnée n'est envoyée ailleurs. */
(function () {
  "use strict";

  var KEY = "rappels_v1";

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
      "Tu dors ? 🌙 Si tu as mal ou du mal à dormir, viens — j'ai un cocon doux pour toi.",
      "Petit coucou de la nuit 🤍 Si tu ne dors pas, on peut respirer ensemble un moment.",
      "J'espère que tu dors bien. Sinon je suis là, à un geste : viens dans le cocon."
    ]
  };

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

  // Programme 5 jours à l'avance via TimestampTrigger (si dispo) — marche app fermée.
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
  }

  window.Rappels = { activer: activer, desactiver: desactiver, tester: tester, planifier: planifier, config: cfg };
})();
