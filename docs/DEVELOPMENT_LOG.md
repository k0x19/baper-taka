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

- Initial JS chunk was 526.74 kB minified (163.75 kB gzip), above Vite's 500 kB
  advisory threshold. **Resolved in the review follow-up (section 8):** the
  index route is now lazy-loaded, the initial chunk is 442.73 kB, and the
  advisory no longer appears. No warning limit was raised or suppressed.
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

### 8. Review follow-up improvements (2026-11-05)

The preliminary review of PR #1 requested CI and a bundle-size investigation.
Both were addressed on the same branch; no second PR was opened and `main` was
not changed.

**8.1 GitHub Actions CI — `.github/workflows/ci.yml` (created)**

- Triggers: `pull_request` targeting `main`; `push` to `main` and to the active
  development branch `arena/86840354-baper-taka`. No deployment workflow.
- `permissions: contents: read` at workflow level; `actions/checkout@v4` with
  `persist-credentials: false`; no `secrets.*` references and no environment
  credentials. The app's missing-env path is exercised in CI on purpose.
- `actions/setup-node@v4` with `node-version: '22'` (satisfies the project
  `>=22.12.0` engine requirement) and `cache: npm` keyed on the committed
  `package-lock.json`.
- Steps: `npm ci` → `npm run check` (typecheck → lint → format:check → tests →
  build), with `CI: true`. `timeout-minutes: 15`.
- CI does not require `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`;
  no real Supabase connection is attempted.

**8.2 Bundle investigation**

Method: a **temporary, uncommitted** `vite build` config with an inline
`generateBundle` plugin read Rolldown's per-module `renderedLength` values and
grouped them by package. No analysis dependency was added and the config was
deleted after use. Rendered lengths are pre-minification module contributions,
so their sum exceeds the final chunk size; the relative shares are the useful
signal. Rolldown's `output.code.length` counts UTF-16 code units, so it differs
slightly from the UTF-8 file sizes Vite reports; Vite byte sizes are used for
all before/after comparisons below.

Before the change, the single initial JS chunk (Vite file size 526,745 bytes;
`output.code.length` 524,297 code units) contained these largest groups:

| Package                | Rendered bytes | Observation                                                         |
| ---------------------- | -------------- | ------------------------------------------------------------------- |
| `react-dom`            | 536,687        | Essential React runtime; cannot be removed from the shell           |
| `react-router`         | 210,200        | Essential data router                                               |
| `zod`                  | 146,279        | **Only reachable through `ConfigurationNotice` → `FoundationPage`** |
| `i18next`              | 84,234         | Essential Bangla/English initialization                             |
| `tailwind-merge`       | 56,652         | Used by the shell's `Button`/`cn` helper                            |
| `@tanstack/query-core` | 47,876         | Essential provider                                                  |
| app source             | 25,659         | Small                                                               |

The key finding: Zod-based env validation and the configuration notice were
being pulled into the initial shell solely by the temporary landing page.

**8.3 Change made — route-level code splitting**

- `src/app/lazy-foundation-page.tsx` exports the `React.lazy(() => import(...))`
  wrapper; `src/app/router.tsx` renders it on the index route. Isolating the
  wrapper keeps the router file free of mixed component/non-component exports
  (no ESLint suppression).
- The existing `<Suspense fallback={<PageLoader />}>` in `src/app/App.tsx`
  handles the lazy boundary; no new loading UI was added.
- `RootLayout`, `RouteErrorPage` and `NotFoundPage` remain **static**: the app
  shell, error boundary and 404 route are always available immediately.
- `tests/unit/app.test.tsx` now awaits the lazy index route and explicitly
  verifies the unknown-path 404 route still works. Other tests unchanged.
- No new dependencies, no `chunkSizeWarningLimit` change, no suppressed
  warning, no changed routes.

After the change, the analysis showed `zod` (146,249 rendered bytes) and the
configuration-notice app code moved entirely into the async
`FoundationPage` chunk; the initial chunk contains only shell/runtime code.

**8.4 Measured before / after (Vite 8.3.6, `npm run build`)**

|                       | Before                                                          | After                                                                 |
| --------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| Initial JS            | `index-CPRz3SWb.js` — 526,745 bytes / 526.74 kB, gzip 163.75 kB | `index-BaaBPnlJ.js` — 442,738 bytes / 442.73 kB, gzip 139.92 kB       |
| Lazy route JS         | none                                                            | `FoundationPage-C3Q4uv3F.js` — 85,441 bytes / 85.44 kB, gzip 24.84 kB |
| Total JS              | 526,745 bytes                                                   | 528,179 bytes (+1,434 bytes / +1.44 kB chunk overhead)                |
| CSS                   | 16.62 kB (gzip 4.39 kB)                                         | 16.70 kB (gzip 4.41 kB)                                               |
| Vite >500 kB advisory | present                                                         | **gone**                                                              |

Initial payload reduced by **84,007 bytes / 84.01 kB minified** (~15.9%) and
**23.83 kB gzip**. Total JS grew slightly (+1.44 kB) because of chunk
boilerplate, but the deferred 85.44 kB is only fetched when the index route
renders. `dist/_redirects` is still copied by the build.

**8.5 Follow-up validation (actual results)**

| Command                       | Result                                                                                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci --no-audit --no-fund` | passed, `added 281 packages`                                                                                                                        |
| `npm run typecheck`           | passed (`tsc --noEmit`), exit 0                                                                                                                     |
| `npm run lint`                | passed (`eslint .`), exit 0, **0 warnings** (a transient `react-refresh` warning in the first router draft was fixed by isolating the lazy wrapper) |
| `npm run format`              | passed; workflow, router, tests and docs formatted                                                                                                  |
| `npm run format:check`        | passed, `All matched files use Prettier code style!`                                                                                                |
| `npm run test`                | passed: 7 files / 26 tests (one new 404-route test), no warnings                                                                                    |
| `npm run build`               | passed; sizes above; no chunk-size advisory                                                                                                         |
| `npm run check`               | passed: typecheck → lint → format:check → tests → build                                                                                             |
| `cat dist/_redirects`         | `/* /index.html 200`                                                                                                                                |
| secret/env scan               | no `.env`, no `service_role`/secret key values, only `.env.example` tracked                                                                         |

**8.6 Remaining issues after the follow-up**

- `react-dom` + `react-router` still dominate the initial shell; further
  vendor splitting would only redistribute bytes that are all needed on first
  paint, so it was not done.
- The total JS is ~1.44 kB larger due to the extra chunk; this is expected and
  is outweighed by the smaller initial payload. CSS is 16.70 kB (0.08 kB above
  the pre-follow-up build); Tailwind v4 scans project text files by default,
  so the new CI/docs files account for the small change.
- The lazy route adds one additional network request for the index page; it is
  covered by the existing Suspense loading fallback.
- No live Supabase credentials, no real backend/RLS tests, no Playwright/E2E,
  no Cloudflare Pages deployment, and no later-phase business features — all
  unchanged and still out of scope.

### 9. Final re-verification for review (2026-11-05)

The review task was repeated after the CI and bundle-split commits were already
on PR #1. This section records the remote-branch verification and a fresh local
run. It is the only documentation-only change in this pass; no source, config
or lockfile was altered.

**9.1 Remote PR branch verification**

- `git rev-parse HEAD` and
  `git ls-remote --heads origin arena/86840354-baper-taka` both reported
  `127b81daf22b56a72c03189f6b90d68ae21d93c5` before this entry.
- GitHub Contents API
  `repos/k0x19/baper-taka/contents/.github/workflows/ci.yml?ref=arena/86840354-baper-taka`
  returned `path: .github/workflows/ci.yml`, `type: file`, `size: 751`, blob
  `ad75bcae89b3e1068f0c31b6b90248c3db1c00c5`.
  `git show origin/arena/86840354-baper-taka:.github/workflows/ci.yml` also
  printed the workflow. The CI file is therefore present, committed and pushed
  on the actual PR branch, not only in the local workspace.
- `gh pr view 1` reported exactly one open PR: `OPEN`, base `main`, head
  `arena/86840354-baper-taka`, `mergeable`, not merged. Local `main` remained
  at `c080932`.

**9.2 GitHub Actions runs for PR #1**

- Runs created by the improvement commits: push run `41993304451` and
  `pull_request` run `41993305499`, both `completed / success`; PR check
  `Typecheck, lint, format, test and build` → `pass`.
- This documentation-only commit triggers a fresh push + PR synchronize run.
  Its run URL and the final commit SHA are recorded in PR #1's description
  after the push (they cannot be embedded in the commit that creates them).

**9.3 Fresh local validation (results observed in this pass)**

| Command / check               | Result                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm ci --no-audit --no-fund` | passed, `added 281 packages`                                                                                       |
| `npm run typecheck`           | passed, exit 0                                                                                                     |
| `npm run lint`                | passed, exit 0, 0 warnings                                                                                         |
| `npm run format`              | passed, no changes needed                                                                                          |
| `npm run format:check`        | passed, `All matched files use Prettier code style!`                                                               |
| `npm run test`                | passed: 7 files / 26 tests, no failures or warnings                                                                |
| `npm run build`               | passed; measurements below                                                                                         |
| `npm run check`               | passed: typecheck → lint → format:check → tests → build                                                            |
| `cat dist/_redirects`         | `/* /index.html 200`                                                                                               |
| env/secret scan               | no `.env`; only `.env.example` tracked with empty values; no credential-like values; no `secrets.*` in CI workflow |

After adding this entry, `npm run format` and `npm run check` were run again
and passed before the commit was created.

**9.4 Verified production bundle measurements**

| Output                                     | Size                                  |
| ------------------------------------------ | ------------------------------------- |
| Initial JS `index-BaaBPnlJ.js`             | 442,738 B / 442.73 kB, gzip 139.92 kB |
| Lazy route JS `FoundationPage-C3Q4uv3F.js` | 85,441 B / 85.44 kB, gzip 24.84 kB    |
| Total JS                                   | 528,179 B / 528.18 kB                 |
| CSS `index-0bsr7c1d.css`                   | 16,701 B / 16.70 kB, gzip 4.41 kB     |
| Vite >500 kB advisory                      | none                                  |

Compared with the pre-split single chunk (`index-CPRz3SWb.js`, 526,745 B /
526.74 kB, gzip 163.75 kB), the initial payload is 84,007 B / 84.01 kB
smaller (23.83 kB smaller gzipped). No new remaining issues were introduced;
see section 8.6.

### 10. Next recommended step

Await external review of the updated PR #1. Do not merge it. After approval,
begin Phase 02 with the schema, RLS policies and privileged checkout design
documented in `docs/DATABASE_SCHEMA.md` and `docs/SECURITY_POLICY.md`.
