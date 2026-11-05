# বাপের টাকা — Baper Taka

> **Phase 01: Foundation & Setup.** This repository currently contains the
> technical foundation only. The temporary landing page is a development
> render/routing check — it is **not** the finished storefront. No products,
> authentication, cart, checkout, orders, payments, database migrations or
> admin features have been implemented yet.

## Project overview

Baper Taka is a production-oriented **single-vendor** e-commerce platform for
**Bangladesh**. The owner is the only seller. The UI is bilingual
(**Bangla by default, English secondary**) and all monetary amounts are in
**BDT (৳)**. Planned payment methods for later phases are Cash on Delivery,
manual bKash verification and manual Nagad verification.

Architecture: a static React SPA built by Vite and served by **Cloudflare
Pages**, with **Supabase** (PostgreSQL, Auth, Storage, and Edge Functions when
needed) as the only backend. There is no Express or separate Node.js server.

| Layer                   | Choice                                                                       |
| ----------------------- | ---------------------------------------------------------------------------- |
| Frontend                | React 19, Vite, TypeScript (strict), Tailwind CSS v4, shadcn/ui base, Lucide |
| Routing                 | React Router                                                                 |
| Server state / UI state | TanStack Query / Zustand                                                     |
| Forms                   | React Hook Form + Zod                                                        |
| i18n                    | i18next + react-i18next (`bn` default, `en` secondary)                       |
| Backend                 | Supabase (planned; client configured in Phase 01, no queries yet)            |
| Testing                 | Vitest + React Testing Library                                               |
| Quality                 | ESLint (flat config), Prettier                                               |
| Deployment              | Cloudflare Pages (not deployed in Phase 01)                                  |

## Prerequisites

- Node.js `>=22.12.0` (Vite 8 / Vitest 5 requirement)
- npm `>=10`
- A Supabase project is **optional for Phase 01** — the app renders a safe
  configuration notice when the public variables are absent.
- Cloudflare Pages account only when deployment is approved in a later phase.

## Installation

```bash
git clone https://github.com/k0x19/baper-taka.git
cd baper-taka
npm ci
```

## Environment configuration

```bash
cp .env.example .env
```

`.env.example` contains exactly two public variables:

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

- Use your project URL and **publishable (or anon) key only**.
- `.env` and all `.env.*` files except `.env.example` are git-ignored.
- Restart `npm run dev` after changing variables.
- The app validates the values with Zod, never logs them, and shows a
  developer-facing configuration notice when they are missing or invalid.
  `http://` is accepted only for a local Supabase instance; remote URLs must
  use `https://`.

> ⚠️ **Security:** everything prefixed `VITE_` is compiled into the browser
> bundle and is public. Never place a `service_role` key, secret key, database
> password, or private token in a `VITE_` variable. Delete any such key and
> rotate it immediately if it is ever exposed. Do not paste credentials into
> issues, pull requests, chat, or commits.

## Development commands

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                                |
| `npm run build`        | Type-check, then create the production bundle in `dist/` |
| `npm run preview`      | Serve the built bundle locally                           |
| `npm run typecheck`    | `tsc --noEmit` (strict mode)                             |
| `npm run lint`         | ESLint flat config                                       |
| `npm run lint:fix`     | ESLint with autofix                                      |
| `npm run format`       | Prettier write                                           |
| `npm run format:check` | Prettier verification                                    |
| `npm run test`         | Vitest + React Testing Library, single run               |
| `npm run test:watch`   | Vitest watch mode                                        |
| `npm run check`        | typecheck → lint → prettier → tests → build              |

## Cloudflare Pages configuration

| Setting                | Value                                                                     |
| ---------------------- | ------------------------------------------------------------------------- |
| Build command          | `npm run build`                                                           |
| Build output directory | `dist`                                                                    |
| Root directory         | repository root                                                           |
| Node version           | `>=22.12.0`                                                               |
| Environment variables  | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`public/_redirects` contains `/* /index.html 200` for SPA fallback and is
copied to `dist/_redirects` by Vite. Verify it after each build. **Phase 01
does not deploy the application.**

## Project structure

- `src/app/` — entry point, providers, router, app shell
- `src/components/{ui,layout,common}/` — UI primitives, layout, shared states
- `src/features/` — feature modules (`foundation` is temporary)
- `src/lib/` — Supabase client, env validation, query client, i18n, currency, formatting
- `src/locales/{bn,en}/translation.json` — translations
- `src/hooks/`, `src/stores/`, `src/types/`, `src/utils/`, `src/styles/` — shared code
- `supabase/{migrations,functions,tests}/` — future database work (README-only today)
- `tests/{unit,integration,e2e}/` — unit tests plus documented future suites
- `docs/` — blueprint, database schema, security policy, API docs, development log

See [`AGENTS.md`](./AGENTS.md) for conventions and [`docs/DEVELOPMENT_LOG.md`](./docs/DEVELOPMENT_LOG.md)
for exactly what Phase 01 did.

## Security warnings

- No RLS policies, admin roles, payment approval or checkout logic exist yet;
  do not connect this build to a production database as if it were complete.
- All authorization must be enforced by Supabase/PostgreSQL, never by UI.
- Prices and inventory must be validated server-side at checkout.
- Manual payment approval must be admin-only and auditable.
- `service_role` keys must never appear in frontend code or `VITE_` variables.

## License

Private project. No license file has been added yet.
