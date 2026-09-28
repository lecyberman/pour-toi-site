"use client";
import { useEffect } from "react";
import { ensureSubscribed } from "@/lib/push";

// Enregistre le service worker et, si les notifications sont déjà autorisées,
// s'assure que l'abonnement push existe (au bon origin). Silencieux.
export default function PushSync() {
  useEffect(() => { ensureSubscribed(); }, []);
  return null;
}
