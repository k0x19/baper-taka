# Development Log

## Phase 01 — Foundation, Tooling & Repository Setup

**Date:** 2026-11-05
**Branch:** `arena/86840354-baper-taka` (Arena session branch; see deviation note)
**Status:** implemented, configured and validated locally. **Not deployed.**

### 1. Repository inspection (performed before any change)

- Repository was effectively empty: one tracked file, `baper-taka`, containing a
  single newline; no `package.json`, lockfile, `src/`, config, or docs.
- `main` at `c080932` ("baper-taka"); working branch
  `arena/86840354-baper-taka`; `gh` authenticated; no other branches locally.
- No lockfile → npm chosen. Node `v22.22.3`, npm `10.9.8`.
- `registry.npmjs.org` reachable. No existing code was overwritten; the
  pre-existing `baper-taka` newline file was left untouched.

### 2. Actually implemented

**Tooling / configuration**

- `package.json` + `package-lock.json`, npm scripts (`dev`, `build`, `preview`,
  `typecheck`, `lint`, `lint:fix`, `format`, `format:check`, `test`,
  `test:watch`, `check`).
- Strict TypeScript (`tsconfig.json`, `strict: true`, extra unused/fallthrough
  checks, `verbatimModuleSyntax`, `@/*` alias), `src/vite-env.d.ts` typed env.
- Vite 8 + `@vitejs/plugin-react` 6 + `@tailwindcss/vite` 4 (Tailwind CSS v4,
  no legacy config files).
- ESLint 10 flat config with `@eslint/js`, `typescript-eslint`,
  `react-hooks`, `react-refresh`, `eslint-config-prettier`; Prettier 3 config.
- Vitest 5 + jsdom 30 + React Testing Library 16 + jest-dom; `tests/setup.ts`.
- `components.json` (shadcn/ui CLI-compatible config) and one hand-authored,
  CVA-based `Button` primitive. The shadcn CLI was not run.
- `.env.example`, `.gitignore`, `.prettierignore`, `.editorconfig`,
  `index.html`, `public/favicon.svg`, `public/logo.svg`, `public/_redirects`.

**Application foundation**

- `src/app/`: `main.tsx`, `App.tsx`, `providers.tsx`, `router.tsx`.
- React Router 8 data router with `RootLayout`, temporary Phase 01 landing
  page, route error boundary, 404 page, Suspense/`PageLoader` fallback, skip
  link and responsive header/footer.
- TanStack Query shared client; Zustand store holding only the real shared UI
  state (language preference); `useLanguage` hook + `LanguageSwitcher`.
- i18next + react-i18next with bundled `bn` (default) and `en` translations in
  `src/locales/{bn,en}/translation.json`; `initAsync: false` for synchronous
  init; language preference persisted safely in `localStorage`.
- React Hook Form + `@hookform/resolvers` + Zod configured; the resolver wiring
  is verified by a unit test instead of by inventing a fake production form.
  Zod is also used for real environment validation.
- `src/lib/env.ts`: Zod validation of the two public variables, rejects
  `service_role` / `sb_secret_` / secret-key patterns, errors name variables
  only and never echo values; `getSupabaseConfigurationIssues()`.
- `src/lib/supabase.ts`: **lazy** browser client using only the validated
  publishable/anon key; returns `null` gracefully when unconfigured; no
  network calls, no service-role key, no import-time throw. The SDK is not in
  the Phase 01 landing bundle because no feature imports it yet.
- `src/lib/currency.ts` (`CURRENCY_CODE`, `CURRENCY_SYMBOL`, `formatBDT`) and
  `src/lib/format.ts` (`formatNumber`, `formatDate`, `formatDateTime`,
  Asia/Dhaka default).
- Accessible neutral design tokens in `src/styles/globals.css`; brand assets;
  no animations added (Motion installed for later, intentionally unused).
- `ConfigurationNotice` renders a clear, secret-free developer-facing error
  when Supabase env is missing/invalid.

**Tests and documentation**

- 7 unit test files / 25 tests: currency, formatting, env validation, Supabase
  client (stubbed env), React Hook Form + Zod resolver, foundation UI
  (Bangla + English, config notice, loading, 404), and full App routing.
- `AGENTS.md`, `README.md`, `docs/PROJECT_BLUEPRINT.md`,
  `docs/DATABASE_SCHEMA.md`, `docs/SECURITY_POLICY.md`,
  `docs/API_DOCUMENTATION.md`, this log; README-only placeholders in
  `supabase/{migrations,functions,tests}/`, `tests/integration/`,
  `tests/e2e/` explaining future intent (no empty folders pretending to be work).
- `public/_redirects` → verified copied to `dist/_redirects`.

### 3. Decisions, compatibility notes and deviations

- **TypeScript pinned to `~5.9.3`** (not the latest 7.x): `typescript-eslint`
  8.x declares a `typescript` peer range `<6.1.0`; strict mode is still fully
  enabled. This is a documented compatibility choice, not a downgrade in
  strictness.
- **i18next 26 removed `initImmediate`**; used the current `initAsync: false`
  option after a build-time type error surfaced it.
- **Zod 4** uses `z.email()` instead of deprecated `z.string().email()`.
- **React Router 8** is imported from `react-router` (current unified package),
  not the older `react-router-dom` alias.
- **Single root `tsconfig.json`** instead of Vite's split
  `tsconfig.app.json`/`tsconfig.node.json`: one strict config covers `src`,
  `tests` and `vite.config.ts`, which is simpler for this phase.
- **Playwright deferred:** no real user journeys exist yet and browser
  binaries would add complexity without testing behaviour. Documented in
  `tests/e2e/README.md`.
- **Motion installed but unused**: no unnecessary animations in Phase 01.
- **Branch deviation:** the request named `phase-01/foundation-setup`, but this
  Arena session is pinned to `arena/86840354-baper-taka` and cannot create,
  switch to, or push other branches. All work and commits are on the session
  branch; the PR targets `main`. No direct commits to `main`.
- **`baper-taka` file** (single newline, pre-existing) was intentionally not
  modified or deleted.

### 4. Commands executed and observed results

| Command                                                          | Result                                                                                                         |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `git status`, `git branch -a`, `git log`, `git ls-files`, `find` | Repo empty except one newline file; branch/main identified                                                     |
| `node -v` / `npm -v`                                             | `v22.22.3` / `10.9.8`                                                                                          |
| `npm install --no-audit --no-fund`                               | passed, `added 275 packages`                                                                                   |
| `npm ci --no-audit --no-fund` (first attempt)                    | **failed**: lock missing `json-schema-traverse@0.4.1`                                                          |
| `npm install --package-lock-only --no-audit --no-fund`           | passed; lockfile repaired                                                                                      |
| `npm ci --no-audit --no-fund` (final)                            | passed, `added 281 packages`                                                                                   |
| `npm run format`                                                 | passed (formatted project files)                                                                               |
| `npm run format:check`                                           | passed, `All matched files use Prettier code style!`                                                           |
| `npm run typecheck`                                              | passed, `tsc --noEmit`, exit 0                                                                                 |
| `npm run lint`                                                   | passed, `eslint .`, exit 0                                                                                     |
| `npm run test`                                                   | passed, 7 files / 25 tests, no warnings                                                                        |
| `npm run build`                                                  | passed, `tsc --noEmit && vite build`; `dist/assets/index-CPRz3SWb.js` 526.74 kB (gzip 163.75 kB), CSS 16.62 kB |
| `npm run check` (after final `npm ci`)                           | passed: typecheck → lint → format:check → tests → build                                                        |
| `cat dist/_redirects`                                            | `/* /index.html 200` present                                                                                   |
| `git check-ignore -v .env .env.local dist node_modules`          | all four ignored                                                                                               |

The production build emits one **non-fatal** Vite advisory: a chunk larger than
500 kB after minification. The build still succeeds.

### 5. Known issues / outstanding items

- Initial JS chunk is 526.74 kB minified (163.75 kB gzip), above Vite's 500 kB
  advisory threshold. No route-level code splitting yet; revisit when real
  feature routes exist rather than hiding the warning with a raised limit.
- No live Supabase project URL/key was available or requested, so **no
  real backend, Auth, RLS or network integration test was run**. Env validation
  and client creation were tested with stubbed values only.
- No Playwright/E2E suite (deferred with rationale).
- No Cloudflare Pages deployment (explicitly out of scope for Phase 01).
- No generated Supabase database types yet (no schema exists).

### 6. Incomplete / deliberately not implemented (later phases)

Database migrations, RLS policies and admin authorization; authentication and
profiles; product catalog, Storage and inventory; cart; atomic checkout; COD /
manual bKash / manual Nagad payment submission and admin verification; orders
and status history; protected admin dashboard; audit logging; security headers;
generated database types; E2E journeys.

### 7. Environment variables required

- `VITE_SUPABASE_URL` — public project URL (https; local `http://127.0.0.1:54321` allowed)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public publishable/anon key only

Optional in Phase 01: the app shows a safe configuration notice when both are
absent. Never add `service_role`, secret keys or database passwords to `VITE_`
variables; `.env` is git-ignored.

### 8. Next recommended step

Await external review of the Phase 01 PR. Do not merge it. After approval,
begin Phase 02 with the schema, RLS policies and privileged checkout design
documented in `docs/DATABASE_SCHEMA.md` and `docs/SECURITY_POLICY.md`.
