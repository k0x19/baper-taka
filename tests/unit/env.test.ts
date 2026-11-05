import { describe, expect, it } from 'vitest';

import { SUPABASE_ENV_VARIABLES, validateSupabaseEnv } from '@/lib/env';

const VALID_URL = 'https://example-project.supabase.co';
const VALID_KEY = 'sb_publishable_example-public-key';

function issuesOf(url: string | undefined, key: string | undefined): string {
  const result = validateSupabaseEnv(url, key);
  expect(result.status).toBe('unconfigured');
  if (result.status !== 'unconfigured') {
    throw new Error('Expected an unconfigured result');
  }
  return result.issues.join(' ');
}

describe('validateSupabaseEnv', () => {
  it('accepts an https URL and a publishable key', () => {
    const result = validateSupabaseEnv(VALID_URL, VALID_KEY);
    expect(result.status).toBe('configured');
    if (result.status === 'configured') {
      expect(result.config).toEqual({ url: VALID_URL, publishableKey: VALID_KEY });
    }
  });

  it('accepts http only for a local Supabase instance', () => {
    expect(validateSupabaseEnv('http://127.0.0.1:54321', VALID_KEY).status).toBe('configured');
    expect(issuesOf('http://example.supabase.co', VALID_KEY)).toContain('https');
  });

  it('reports both missing variables by name', () => {
    const issues = issuesOf(undefined, undefined);
    expect(issues).toContain('VITE_SUPABASE_URL');
    expect(issues).toContain('VITE_SUPABASE_PUBLISHABLE_KEY');
  });

  it('rejects a service_role key without echoing it', () => {
    const secret = 'service_role_super_secret_value';
    const issues = issuesOf(VALID_URL, secret);
    expect(issues).not.toContain(secret);
    expect(issues).toMatch(/service_role|secret/i);
  });

  it('rejects a Supabase secret key format', () => {
    expect(issuesOf(VALID_URL, 'sb_secret_do_not_use_in_browser')).toContain(
      'VITE_SUPABASE_PUBLISHABLE_KEY',
    );
  });

  it('exposes exactly the two public variables', () => {
    expect(SUPABASE_ENV_VARIABLES).toEqual(['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY']);
  });
});
