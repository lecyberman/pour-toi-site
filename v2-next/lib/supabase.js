import { createClient } from "@supabase/supabase-js";

// Clé anon publique (déjà publique dans le site actuel ; protégée par RLS).
// Pour une config plus propre, déplacer vers .env.local :
//   NEXT_PUBLIC_SUPABASE_URL=... / NEXT_PUBLIC_SUPABASE_ANON_KEY=...
const URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jnqyjpgbmjclxbjxbnft.supabase.co";
const ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXlqcGdibWpjbHhianhibmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTg0ODIsImV4cCI6MjA5MjYzNDQ4Mn0.zr0iYxqubZwH34Lj61QGo4yS7ScldKNVxrK7rnMw9E8";

export const supabase = createClient(URL, ANON);
