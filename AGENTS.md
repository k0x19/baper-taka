# AGENTS.md — Baper Taka engineering guide

This file is the working agreement for humans and AI agents contributing to
**বাপের টাকা (Baper Taka)**. Phase discipline matters more than speed: do not
implement a later phase inside an earlier one.

## 1. Project purpose

A production-oriented, **single-vendor** e-commerce platform for Bangladesh.
The owner is the only seller. Bangla is the default language, English is the
secondary language, and all prices are in BDT (৳). Planned payments: COD,
manual bKash verification, manual Nagad verification. The storefront is a
static SPA on Cloudflare Pages; Supabase is the only backend.

## 2. Approved technology stack

| Concern | Technology                                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI      | React, Vite, strict TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui primitives, Lucide React, Motion (only when an animation is justified) |
| Routing | React Router (`react-router`, data router APIs)                                                                                                         |
| Backend | Supabase (PostgreSQL, Auth, Storage, Edge Functions when needed)                                                                                        |
| State   | TanStack Query for server state; Zustand only for genuinely shared client UI state                                                                      |
| Forms   | React Hook Form + Zod (`@hookform/resolvers`)                                                                                                           |
| i18n    | i18next + react-i18next, `bn` default / `en` fallback                                                                                                   |
| Tests   | Vitest + React Testing Library; Playwright only when real journeys exist                                                                                |
| Quality | ESLint flat config, Prettier, `tsc --noEmit`                                                                                                            |
| Deploy  | Cloudflare Pages (`npm run build` → `dist`)                                                                                                             |

No Express, no separate Node.js server, no extra state library, no paid API.

## 3. Code conventions

- TypeScript strict mode; no `any`, no `@ts-ignore`, no non-null assertions
  without a clear invariant. Prefer `import type` for type-only imports.
- Use the `@/` path alias for imports inside `src/`.
- Components are named function exports. Keep one component per file unless a
  tiny local helper is clearer.
- Tailwind utility classes only; merge conflicting classes with `cn()`
  (`src/lib/utils.ts`). Reuse semantic color tokens from `src/styles/globals.css`.
- All user-visible strings live in `src/locales/bn/translation.json` **and**
  `src/locales/en/translation.json`. Never hardcode UI copy in components.
- Money formatting must go through `src/lib/currency.ts`; dates/numbers through
  `src/lib/format.ts`. Never trust client-computed totals for orders.
- Prefer server state (TanStack Query) over duplicated global state. Zustand is
  for small, real UI state only (Phase 01: language preference).
- Validate external input with Zod. Validate again server-side at trust
  boundaries.
- Keep loading, error, empty and not-found states real and accessible
  (semantic roles, labels, focus states, skip link).
- Write tests next to behaviour: `tests/unit/` for utilities and rendering.
  Avoid snapshot tests of trivial markup.

## 4. Folder structure guidance

- `src/app/` — `main.tsx`, `App.tsx`, `providers.tsx`, `router.tsx` only.
- `src/components/ui/` — shadcn/ui-compatible primitives (`components.json`).
- `src/components/layout/` — app shell, header/footer.
- `src/components/common/` — cross-feature states (loader, error, 404, notices).
- `src/features/<feature>/` — one folder per business feature; the current
  `foundation` page is temporary and must be replaced, not extended into a fake
  store.
- `src/lib/` — third-party client setup and pure domain helpers.
- `src/hooks/`, `src/stores/`, `src/types/`, `src/utils/`, `src/styles/` — shared code.
- `src/locales/{bn,en}/` — translation JSON.
- `supabase/migrations/`, `supabase/functions/`, `supabase/tests/` — database
  work; README-only until their phase.
- `tests/{unit,integration,e2e}/` — test suites.
- `docs/` — architecture, schema, security, API and phase log.

Do not create empty directories merely to match a diagram; add a short README
explaining future intent instead.

## 5. Security rules

- **RLS is mandatory** on every exposed application table, default-deny.
- Admin authorization is enforced by the backend (RLS / privileged functions),
  never by hidden UI, client flags, or local storage.
- Customers must never be able to change their own role, approve payments, read
  other customers' orders, or write product prices/stock.
- Prices, discounts and inventory are re-read and validated server-side;
  checkout runs inside one atomic transaction with locked inventory rows.
- Manual payment evidence is reviewed by an admin; approval is recorded with an
  audit trail.
- Storage buckets need explicit policies; uploads must be validated.
- No `service_role`/secret keys, database passwords, or private tokens in
  frontend code, `VITE_` variables, logs, tests, docs, or commits.
- Treat all `VITE_` values as public. Rotate any key exposed accidentally.
- Never log credentials or full payment/manual-verification payloads.

## 6. Environment variable rules

- `.env.example` is the only committed environment file. It contains only
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (empty values).
- `.env` and `.env.*` are ignored by Git. Create `.env` locally; never commit it.
- Missing/invalid variables must degrade gracefully with a developer-facing
  notice that names variables but never prints values.
- Supabase server-side secrets belong in Supabase project settings / Edge
  Function secrets, not in this repository.
- Never ask a user to paste credentials into chat.

## 7. Testing and build commands

```bash
npm ci                 # reproducible install
npm run typecheck       # tsc --noEmit, strict
npm run lint            # ESLint
npm run format:check    # Prettier
npm run test            # Vitest run
npm run build           # tsc --noEmit && vite build
npm run check           # all of the above in order
```

Verify `dist/_redirects` exists after every build. Report only commands you
actually ran, with their real results.

## 8. GitHub workflow

- Never commit directly to `main`. Work on the active session/feature branch,
  make small logical commits, and push only to that branch.
- Open one pull request per phase targeting `main`; include implemented
  features, important files, exact commands/results, limitations, required
  environment variables and a no-secrets statement.
- Do **not** merge your own PR; the project owner and external reviewer decide.
- Do not commit `node_modules/`, `dist/`, `.env`, keys, or generated reports.
- If a requested branch name conflicts with the session's fixed branch, keep
  the fixed branch and document the deviation in the PR and phase report.

## 9. Phase-by-phase implementation discipline

- **Phase 01 (current):** foundation, tooling, configuration, documentation,
  minimal routing/state shells. No business features.
- **Later phases:** database schema + RLS → auth + profiles → catalog + storage
  → cart → atomic checkout → manual payment verification → protected admin.
- Each phase must: inspect the repo first, keep scope tight, run the full
  `npm run check`, update `docs/DEVELOPMENT_LOG.md`, and wait for external
  review before starting another phase.
- Never present a placeholder as a complete feature. Clearly label planned
  work in docs and UI.
