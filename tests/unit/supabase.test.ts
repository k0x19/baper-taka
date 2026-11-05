import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('Supabase browser client', () => {
  it('degrades gracefully when public variables are absent', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', '');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', '');

    const { getSupabaseClient, isSupabaseConfigured } = await import('@/lib/supabase');

    expect(getSupabaseClient()).toBeNull();
    expect(isSupabaseConfigured()).toBe(false);
  });

  it('creates a client from validated public variables', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example-project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test_key');

    const { getSupabaseClient, isSupabaseConfigured } = await import('@/lib/supabase');
    const client = getSupabaseClient();

    expect(client).not.toBeNull();
    expect(client).toHaveProperty('auth');
    expect(isSupabaseConfigured()).toBe(true);
  });

  it('never accepts a service_role key', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://example-project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'service_role_secret');

    const { getSupabaseClient } = await import('@/lib/supabase');

    expect(getSupabaseClient()).toBeNull();
  });
});
