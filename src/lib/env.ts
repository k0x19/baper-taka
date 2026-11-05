import { z } from 'zod';

/** The only two Supabase values allowed in browser code. Both are public. */
export const SUPABASE_ENV_VARIABLES = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
] as const;

function isSafeSupabaseUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    return url.protocol === 'https:' || (isLocal && url.protocol === 'http:');
  } catch {
    return false;
  }
}

const supabaseUrlSchema = z
  .string()
  .trim()
  .min(1, 'VITE_SUPABASE_URL is required. Copy .env.example to .env and set it.')
  .refine(
    isSafeSupabaseUrl,
    'VITE_SUPABASE_URL must be an https URL (http is allowed only for a local Supabase instance).',
  );

const publishableKeySchema = z
  .string()
  .trim()
  .min(
    1,
    'VITE_SUPABASE_PUBLISHABLE_KEY is required. Use only a publishable or anon key in browser code.',
  )
  .refine(
    (key) => !/service[_-]?role|sb_secret_|secret[_-]?key/i.test(key),
    'VITE_SUPABASE_PUBLISHABLE_KEY must be a publishable/anon key. Never expose a service_role or secret key in VITE_ variables.',
  );

export const supabaseEnvSchema = z.object({
  url: supabaseUrlSchema,
  publishableKey: publishableKeySchema,
});

export type SupabaseConfig = z.infer<typeof supabaseEnvSchema>;

export type SupabaseEnvResult =
  | { status: 'configured'; config: SupabaseConfig }
  | { status: 'unconfigured'; issues: readonly string[] };

/**
 * Validate raw environment values without ever returning them in an error.
 * Error messages name variables only, never the supplied values.
 */
export function validateSupabaseEnv(
  rawUrl: string | undefined,
  rawKey: string | undefined,
): SupabaseEnvResult {
  const parsed = supabaseEnvSchema.safeParse({
    url: rawUrl ?? '',
    publishableKey: rawKey ?? '',
  });

  if (parsed.success) {
    return { status: 'configured', config: parsed.data };
  }

  return {
    status: 'unconfigured',
    issues: parsed.error.issues.map((issue) => issue.message),
  };
}

export function readSupabaseEnv(): SupabaseEnvResult {
  return validateSupabaseEnv(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  );
}

/** Non-secret messages for the developer-facing configuration notice. */
export function getSupabaseConfigurationIssues(): readonly string[] {
  const result = readSupabaseEnv();
  return result.status === 'unconfigured' ? result.issues : [];
}
