// Abonnement Web Push V2 — même VAPID + table push_subs + Edge Functions que le site actuel
import { supabase } from "@/lib/supabase";

const VAPID_PUBLIC = "BHfK8OjWY7LGkB57gQP_WQiWUgVA2NRpc-14WUYD1MZZ3ab8QdDAykUp7LL8KAUBfno_4LSN4SAquqmJfm1WyKE";

function urlB64ToUint8(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64), out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
function roleLocal() { try { const r = localStorage.getItem("moi_role"); return r === "elle" || r === "lui" ? r : null; } catch (e) { return null; } }

async function registerSW() {
  if (!("serviceWorker" in navigator)) return null;
  try { await navigator.serviceWorker.register("/sw.js"); return await navigator.serviceWorker.ready; } catch (e) { return null; }
}

async function souscrire(reg) {
  if (!reg || !("PushManager" in window)) return null;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8(VAPID_PUBLIC) });
  if (!sub) return null;
  const j = sub.toJSON();
  const row = { endpoint: sub.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth };
  const r = roleLocal(); if (r) row.role = r; // ne pas écraser un rôle déjà connu par null
  try { await supabase.from("push_subs").upsert(row, { onConflict: "endpoint" }); } catch (e) {}
  return sub;
}

// Synchro silencieuse : si déjà autorisé, on s'assure que l'abonnement existe (au bon origin)
export async function ensureSubscribed() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  const reg = await registerSW(); if (reg) souscrire(reg);
}

// Activation explicite (bouton) : demande la permission puis abonne
export async function activerPush() {
  if (!("Notification" in window)) return false;
  const p = await Notification.requestPermission();
  if (p !== "granted") return false;
  const reg = await registerSW();
  if (reg) { await souscrire(reg); try { reg.showNotification("Je suis là 🤍", { body: "À partir de maintenant, je viendrai te dire bonjour, bonne nuit, et passer le soir.", icon: "/icon-192.png", badge: "/icon-192.png", data: { url: "/cocon" } }); } catch (e) {} }
  return true;
}
