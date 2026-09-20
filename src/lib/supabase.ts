import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

export function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }
  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey);
}
