# End-to-end tests

Playwright is intentionally **not** configured in Phase 01: there are no user
journeys to exercise (no catalog, cart, login or checkout), and installing
browser binaries would add complexity without testing any real behaviour.

When Phase 02+ introduces storefront journeys, add `@playwright/test` with a
small `playwright.config.ts`, run against `npm run preview`, and cover the
critical paths: browse → cart → checkout → order status, plus admin access
denial for customer accounts. E2E credentials must come from a local Supabase
instance or CI secrets, never from committed `.env` files.
