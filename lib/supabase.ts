import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid throwing at import time in Next.js edge/runtime, but log for visibility
  console.warn(
    "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export type Deal = {
  id: string;
  subject: string;
};

export type DealFlight = {
  id: string;
  deal_id: string;
  dateRange: string; // e.g. "Sun 23 Nov – Mon 1 Dec"
  airline: string;
  stops: string;
  duration: string; // "YWG–PUJ · 9 hrs"
  price: number; // CAD
  discount?: number; // Optional amount to subtract from price
  link: string; // booking URL
};

// Server-side admin client for inserts/updates via API routes
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  return createClient(supabaseUrl || "", serviceRoleKey || "");
}


