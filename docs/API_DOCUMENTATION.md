# API / Supabase Integration Documentation

> **Status: planned integration approach.** Phase 01 configures a validated
> browser client but performs **no** authentication, queries, mutations,
> storage operations, RPC calls or Edge Function invocations. No endpoint in
> this document is implemented yet.

## 1. Integration model

The React SPA talks directly to Supabase over HTTPS using the official
`@supabase/supabase-js` client. There is no custom REST API or Node.js server.
Data access goes through Supabase's PostgREST surface **guarded by RLS**, while
privileged workflows go through PostgreSQL functions or Edge Functions.

```
src/lib/supabase.ts  →  Supabase JS client (publishable/anon key)
                         ├── Auth        (future: sessions, profiles)
                         ├── PostgREST   (future: catalog, orders under RLS)
                         ├── Storage     (future: product images)
                         └── Edge/RPC    (future: privileged workflows)
```

`getSupabaseClient()` returns `null` when configuration is missing or invalid;
feature code must handle that state. `isSupabaseConfigured()` is a convenience
boolean. `getSupabaseConfigurationIssues()` in `src/lib/env.ts` returns
non-secret, developer-facing messages for the configuration notice. The client
is created lazily on first use; the module never throws at import time and
never logs values.

## 2. Environment configuration

| Variable                        | Visibility       | Value                                                                                    |
| ------------------------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`             | Public (bundled) | `https://<project-ref>.supabase.co`; `http://127.0.0.1:54321` allowed for local Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public (bundled) | Supabase publishable key (`sb_publishable_…`) or legacy anon key                         |

Validation (`src/lib/env.ts`, Zod):

- both variables required and trimmed;
- remote URLs must be `https:`;
- keys containing `service_role`, `sb_secret_`, or `secret key` patterns are
  rejected;
- errors name variables only and never echo the supplied values.

Copy `.env.example` to `.env` locally. On Cloudflare Pages, set the same two
variables in the build environment. Never add server-side secrets to `VITE_`
variables. Private keys belong only in Supabase project settings / Edge
Function secrets.

## 3. Planned client-side surfaces (not implemented)

| Surface                                  | Planned use                                      | Authorization                                            |
| ---------------------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| `supabase.auth`                          | Sign in/up/out, session refresh, password reset  | Supabase Auth + RLS                                      |
| `from('products')`, `from('categories')` | Public catalog reads                             | RLS: public read for active rows                         |
| `from('orders')`, `from('order_items')`  | Own order history                                | RLS: own rows only; admin policy                         |
| `from('payments')`                       | Submit manual payment reference, read own status | RLS: own rows; admin-only approval                       |
| `storage.from('product-images')`         | Fetch product images; admin uploads              | Bucket policies                                          |
| `functions.invoke(...)` / RPC            | Checkout, payment approval, role management      | Server-side role checks; `service_role` only server-side |

## 4. Planned privileged workflows (not implemented)

- **Checkout RPC:** validates cart items, re-reads prices and stock, locks
  inventory rows, creates order + items + payment record in one transaction,
  and returns an order id. Client-submitted totals are ignored. Idempotency key
  required.
- **Payment approval RPC / Edge Function:** verifies the caller is an admin,
  records the decision and evidence, updates payment and order status, and
  writes an audit log entry. Customers cannot call it successfully.
- **Role management:** privileged, audited operation only. No client-callable
  path allows a customer to change `profiles.role`.
- **Admin reads:** use backend-enforced policies, never a service-role key in
  the browser.

## 5. Error and type strategy

- Keep database types generated into `src/types/` when the schema exists, and
  pass them as the generic to `createClient` for compile-time safety.
- TanStack Query owns loading/error/retry states for server reads; mutations
  invalidate their query keys on success.
- Zod validates input on the client for UX and again in backend functions for
  trust.
- Show generic errors to customers; never display raw server errors, tokens,
  or environment values.
- Until the schema exists, no query keys or data hooks are invented.

## 6. Phase 01 verification

- `src/lib/env.ts` and `tests/unit/env.test.ts` validate the environment
  contract, including rejection of secret/service-role keys.
- The app renders a clear, secret-free configuration notice when Supabase is
  unconfigured (`src/components/common/ConfigurationNotice.tsx`).
- No network requests to Supabase are made by the Phase 01 UI.
