import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { readSupabaseEnv } from '@/lib/env';

let client: SupabaseClient | null = null;

/**
 * Lazily create the browser Supabase client. Feature modules will call this
 * when they actually need data; Phase 01 makes no Supabase requests.
 *
 * Only the validated publishable/anon key is used here. service_role and
 * secret keys belong in server-side Supabase code, never in browser code.
 * Returns null instead of throwing when configuration is missing or invalid.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (client !== null) {
    return client;
  }

  const envResult = readSupabaseEnv();
  if (envResult.status !== 'configured') {
    return null;
  }

  try {
    client = createClient(envResult.config.url, envResult.config.publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch {
    // Keep the SPA renderable; the configuration notice explains the state.
    return null;
  }

  return client;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}
