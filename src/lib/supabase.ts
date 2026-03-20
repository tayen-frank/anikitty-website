import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);

export function createPublicSupabaseClient() {
  if (!hasSupabaseEnv) {
    return null;
  }

  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function createBrowserSupabaseClient() {
  if (!hasSupabaseEnv) {
    return null;
  }

  return createClient(supabaseUrl!, supabaseAnonKey!);
}

export function getStorageBucket() {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "site-assets";
}
