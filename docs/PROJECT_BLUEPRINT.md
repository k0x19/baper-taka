# Project Blueprint — বাপের টাকা (Baper Taka)

**Status:** Phase 01 (Foundation & Setup) only. This document describes the
intended product and architecture; sections marked _planned_ are not built yet.

## 1. Vision and goals

Build a dependable, maintainable, Bangladeshi online shop for **one seller**.
The owner manages products, inventory, orders and payment verification. The
customer gets a fast, bilingual, mobile-friendly storefront with clear prices
in BDT and locally relevant payment options.

Goals:

1. Static, cheap-to-host frontend with no server to operate.
2. Backend authorization enforced by Supabase/PostgreSQL, not by the browser.
3. Correct money and inventory handling under concurrent orders.
4. Bangla-first UX with a complete English alternative.
5. Incremental, reviewable phases with tests and documentation.

Non-goals for the platform: multi-vendor marketplace, third-party sellers,
automatic payment gateway integration in early phases, and a separate Node/API
server.

## 2. Business model and market

| Aspect           | Decision                                                                             |
| ---------------- | ------------------------------------------------------------------------------------ |
| Model            | Single vendor; the owner is the only seller                                          |
| Market           | Bangladesh                                                                           |
| Languages        | Bangla (`bn`, default) and English (`en`)                                            |
| Currency         | BDT (৳), two decimal places for display                                              |
| Time zone        | Asia/Dhaka for business dates                                                        |
| Initial payments | Cash on Delivery; manual bKash verification; manual Nagad verification (all planned) |
| Fulfilment       | Owner-managed order status (planned)                                                 |

Manual payment verification means a customer submits a transaction reference;
an admin reviews it and approves or rejects it. Customers never approve their
own payments.

## 3. Architecture

```
Browser (Cloudflare Pages, static SPA)
   │  HTTPS, public publishable/anon key only
   ▼
Supabase
   ├── Auth            (customer sessions; admin sessions)
   ├── PostgreSQL      (catalog, orders, payments; RLS on every table)
   ├── Storage         (product images; explicit bucket policies)
   └── Edge Functions  (privileged workflows when needed)
```

- The SPA is built by Vite (`npm run build` → `dist`) and served by Cloudflare
  Pages. `public/_redirects` supplies `/* /index.html 200` for client routing.
- There is no Express or Node.js server in this repository.
- The browser uses only `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_PUBLISHABLE_KEY`. `service_role` keys stay server-side.
- Server state is fetched with TanStack Query; small client state lives in
  Zustand. Forms use React Hook Form + Zod. i18next provides `bn`/`en`.

## 4. Phase 01 foundations (implemented)

- Strict TypeScript, Vite, Tailwind CSS v4 Vite plugin, ESLint flat config,
  Prettier, `@/` alias.
- React Router data router with root layout, temporary development landing
  page, route error boundary, 404 page and loading fallback.
- Shared TanStack Query client, Zustand language-preference store, i18next with
  Bangla default and English secondary, React Hook Form + Zod resolver verified
  by a unit test.
- Validated, gracefully degrading Supabase client; no queries or credentials.
- BDT currency, number, date and date-time formatters.
- Vitest + React Testing Library unit tests.
- Brand assets, accessible neutral design tokens, responsive shell,
  `public/_redirects`, `.env.example`, `.gitignore`, documentation.

Motion is installed for future justified animation work but is intentionally
unused in Phase 01. Playwright is deferred until real journeys exist.

## 5. Planned modules (not implemented)

| Module            | Responsibility                                            | Depends on      |
| ----------------- | --------------------------------------------------------- | --------------- |
| Schema + RLS      | Tables, constraints, policies, privileged functions       | Phase 02        |
| Auth + profiles   | Supabase Auth, customer profile, protected admin identity | Schema          |
| Catalog + Storage | Categories, products, images, inventory display           | Schema, Storage |
| Cart              | Client cart + server-validated item data                  | Catalog         |
| Checkout          | Atomic order creation, server-side price/stock validation | Cart, Auth      |
| Payments          | COD and manual bKash/Nagad submissions, admin approval    | Checkout        |
| Orders            | Status history, customer order views, owner fulfilment    | Checkout        |
| Admin dashboard   | Protected CRUD, verification queue, audit views           | RLS, Auth       |
| Observability     | Error reporting, structured audit logs                    | Later           |

## 6. Quality and delivery

- Every phase runs `npm run check` (typecheck, lint, Prettier, tests, build).
- Every phase updates `docs/DEVELOPMENT_LOG.md` and opens a PR for review;
  agents do not merge PRs.
- Cloudflare Pages deployment happens only after explicit approval; Phase 01
  does not deploy.
- Database migrations, policies and API contracts are documented before they
  are implemented (see `DATABASE_SCHEMA.md`, `SECURITY_POLICY.md`,
  `API_DOCUMENTATION.md`).

## 7. Key decisions and trade-offs

- **Supabase over a custom backend:** RLS, Auth and Storage remove the need to
  operate a server while keeping authorization close to the data.
- **Cloudflare Pages:** static SPA hosting with simple SPA fallback; no SSR
  requirement for the storefront.
- **Bangla-first i18n:** translations are bundled JSON, so no runtime language
  service or paid dependency is needed.
- **Manual payments first:** avoids gateway fees and integration risk, at the
  cost of an admin verification step that must be tightly secured.
