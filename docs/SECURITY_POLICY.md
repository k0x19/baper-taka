# Security Policy — requirements for future implementation

> **Status: requirements only.** Phase 01 intentionally implements no
> authentication, database tables, RLS policies, checkout, or payment
> approval. The items below are mandatory for later phases. Nothing here
> should be read as already enforced.

## 1. Foundational rules

1. **Row Level Security (RLS)** is enabled on **every** exposed application
   table, with default-deny and explicit, narrowly scoped policies. Policies
   are reviewed with each migration.
2. **Admin authorization is enforced by the backend.** Admin status must come
   from a protected server-side role check (for example a `SECURITY DEFINER`
   function or an Edge Function). Hiding buttons, client route guards or
   localStorage flags are UX only, never authorization.
3. **Customers must not change their own role.** The `role` column must be
   excluded from customer-writable policies and from any client-callable RPC;
   role changes happen only through privileged, audited backend operations.
4. **Customers must not approve payments.** Payment status transitions to
   `approved` / `rejected` are admin-only, recorded with admin identity,
   decision, note and timestamp in an immutable audit trail.
5. **Prices and inventory are validated server-side.** Checkout must re-read
   product prices, active state, discounts and delivery fees from PostgreSQL;
   client-submitted totals, product IDs and quantities are untrusted input.
6. **Checkout uses one atomic database transaction.** Create the order, order
   items (with price snapshots), payment record and stock decrement together,
   locking inventory rows (`FOR UPDATE`) so concurrent orders cannot oversell.
   A retry must be idempotent. Any failure rolls back the whole operation.
7. **No `service_role` key in frontend code.** The browser uses only
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (publishable/anon).
   `service_role`, secret keys, database passwords and private tokens belong
   only in server-side Supabase configuration and must never be committed.

## 2. Environment and secret handling

- `.env.example` lists only public variables with empty values; `.env` and
  `.env.*` are git-ignored.
- All `VITE_` values are compiled into the public bundle: treat them as public.
- The app must degrade gracefully when configuration is missing and must never
  print, log or display secret values — error messages name variables only.
- Reject `service_role`/secret key formats in browser env validation.
- Rotate any key that is accidentally exposed; never paste keys into chat,
  issues, PR descriptions or logs.
- Edge Function secrets are set in Supabase project settings, not in this repo.
- Cloudflare Pages environment variables must contain public values only.

## 3. Identity, sessions and data access

- Use Supabase Auth; never invent password handling or custom session storage.
- Profile creation happens through a backend-controlled trigger/function so a
  new signup cannot self-assign `admin`.
- Customers may read only their own orders, addresses and payment statuses.
- Sanitize and Zod-validate all external input on both client and server.
- Never trust redirect URLs, file names, MIME types, or user-supplied metadata.
- Log security-relevant admin actions to an append-only audit table.

## 4. Payments and manual verification

- `payments.status` starts as `pending`; only an admin decision changes it.
- Store only the minimum manual-payment evidence required; restrict access to
  the submitting customer and admins.
- Record who approved/rejected, when, and why. Rejections must not silently
  cancel an order without a status event.
- COD orders must have explicit fulfilment rules and no implicit approval.

## 5. Storage and content

- Product images live in a dedicated bucket with public read for published
  assets and admin-only write/delete.
- Validate file type, size and dimensions server-side; generate safe object
  paths; never trust client-provided paths.
- Escape user-controlled strings; never render raw HTML. Keep i18next
  escaping/interpolation configured safely.

## 6. Frontend hardening

- Keep dependencies updated and review lockfile changes.
- Use HTTPS-only remote URLs; no mixed content.
- Accessible focus states and semantic roles; no security-sensitive state in
  `localStorage` beyond a language preference.
- Add Cloudflare security headers (CSP, `X-Content-Type-Options`,
  `Referrer-Policy`, `frame-ancestors`) when deployment is approved.
- Errors shown to users must be generic; detailed diagnostics stay in
  server-side logs.

## 7. Verification before any production claim

- Migrations reviewed and applied to a local Supabase instance first.
- Automated tests proving: customer cannot escalate role, customer cannot
  approve payment, customer cannot read another customer's order, checkout
  rejects tampered prices, concurrent checkout cannot oversell.
- `npm run check` passes; `dist/_redirects` present; no secrets in the bundle.
- Security review signed off by the project owner before enabling real
  payments.
